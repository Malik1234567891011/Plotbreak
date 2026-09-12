import StoreKit
import StoreKitTest
import XCTest
@testable import Plotbreak

/// What the app tells the server about a purchase.
///
/// This is the decision that decides whether money that moved ever becomes
/// credits: pick the wrong platform and the server asks a verifier that cannot
/// check it — or, in production, one that does not exist.
final class PurchaseSyncRequestTests: XCTestCase {
    func testTestFlightAndProductionBothGoToTheAppStoreVerifier() {
        // A TestFlight purchase reports `.sandbox`. It is a real Apple
        // transaction with a real signed JWS, and `AppStoreVerifier` is the
        // only thing that can check it — the server points that verifier at
        // Apple's sandbox when it is not in production.
        for environment in [StoreKit.AppStore.Environment.sandbox, .production] {
            let request = Purchases.syncRequest(
                productId: "crd_2000", transactionId: 12345, environment: environment, jws: "signed"
            )
            XCTAssertEqual(request.platform, .APP_STORE, "\(environment) must be verified by Apple")
            XCTAssertEqual(request.storeTransactionId, "12345", "the store's own id, unaltered")
            XCTAssertEqual(request.receipt, "signed")
        }
    }

    /// Only StoreKit Testing claims SANDBOX, and it has to shape the id to suit
    /// `SandboxStoreVerifier`, which refuses anything not matching `sandbox_…`.
    func testLocalStoreKitTestingClaimsSandboxAndShapesTheId() {
        let request = Purchases.syncRequest(
            productId: "crd_2000", transactionId: 7, environment: .xcode, jws: "signed"
        )
        XCTAssertEqual(request.platform, .SANDBOX)
        XCTAssertEqual(request.storeTransactionId, "sandbox_tx_7")
    }
}

/// The real thing, against the local `Plotbreak.storekit` products.
///
/// Buys a credit pack the way the wallet does and checks what the app would
/// send. Everything up to the network is exercised: the product loads, the
/// purchase completes, the transaction verifies, and the sync request is
/// shaped so our own dev verifier will accept it.
@MainActor
final class LocalStorePurchaseTests: XCTestCase {
    private var session: SKTestSession!

    override func setUp() async throws {
        try await super.setUp()
        session = try SKTestSession(configurationFileNamed: "Plotbreak")
        session.resetToDefaultState()
        session.disableDialogs = true
        session.clearTransactions()
    }

    override func tearDown() async throws {
        session.clearTransactions()
        session = nil
        try await super.tearDown()
    }

    func testEveryOfferInTheContractHasAProduct() async throws {
        // The ids the server sells, from `STORE_OFFERS` + `FIRST_PURCHASE_OFFER`.
        // A pack the store has never heard of fails at the moment of payment,
        // which is the worst moment to find out.
        let ids = ["crd_2000", "crd_10000", "crd_20000", "crd_50000", "crd_100000", "crd_first_21000"]
        let products = try await Product.products(for: ids)
        XCTAssertEqual(Set(products.map(\.id)), Set(ids))
        XCTAssertTrue(products.allSatisfy { $0.type == .consumable }, "credits are spent, so every pack is consumable")
    }

    func testBuyingProducesASyncRequestOurDevVerifierAccepts() async throws {
        let products = try await Product.products(for: ["crd_2000"])
        let product = try XCTUnwrap(products.first)
        let result = try await product.purchase()

        guard case .success(let verification) = result,
              case .verified(let transaction) = verification else {
            return XCTFail("the local store refused a purchase it is configured to allow")
        }

        let request = Purchases.syncRequest(
            productId: transaction.productID,
            transactionId: transaction.id,
            environment: transaction.environment,
            jws: verification.jwsRepresentation
        )

        XCTAssertEqual(request.productId, "crd_2000")
        XCTAssertEqual(request.platform, .SANDBOX)
        // `SandboxStoreVerifier` in services/api/src/store-verifier.ts.
        XCTAssertTrue(
            request.storeTransactionId.range(of: "^sandbox_[A-Za-z0-9_-]{4,}$", options: .regularExpression) != nil,
            "the dev verifier rejects any id that is not sandbox_…, and got \(request.storeTransactionId)"
        )
        XCTAssertFalse(request.receipt?.isEmpty ?? true, "the server needs the signed payload")

        await transaction.finish()
    }
}
