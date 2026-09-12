import Foundation
import StoreKit

// MARK: - Purchases (spec §20.6, §33.5)
//
// StoreKit 2 decides whether money moved. This module's only job is to open the
// sheet, hand what the store gives us to our server, and finish the transaction
// once the server says the credits landed.
//
//   A transaction is never finished until the server has credited it.
//
// An unfinished consumable is redelivered by StoreKit on every launch, so a
// purchase that Apple took and our server never heard about comes back by
// itself. Finishing early to make an error go away is how a player pays and
// gets nothing.

struct StoreProduct: Identifiable, Hashable {
    var id: String { productId }
    let productId: String
    /// The store's own localised price string. Never our own formatting.
    let displayPrice: String
    let title: String
}

enum PurchaseOutcome: Equatable {
    case credited(credits: Int, balance: Int)
    case alreadyCredited(balance: Int)
    case cancelled
    case pending
    case unavailable(message: String)
    case failed(message: String, charged: Bool)
}

struct RestoreOutcome: Equatable {
    let verified: Int
    let restored: Int
    let creditsRestored: Int
    let balance: Int?
}

struct PurchaseError: Error {
    let message: String
}

@MainActor
final class Purchases {
    private let api: APIClient
    var translator = Translator(locale: .en)
    private var products: [String: Product] = [:]
    private var updates: Task<Void, Never>?
    private var buying = false
    private(set) var available = true

    init(api: APIClient) {
        self.api = api
    }

    /// The store's own prices, which are the only correct ones to show.
    func products(for productIds: [String]) async -> [StoreProduct] {
        guard !productIds.isEmpty else { return [] }
        do {
            let fetched = try await Product.products(for: productIds)
            for product in fetched { products[product.id] = product }
            available = true
            return productIds.compactMap { id in
                products[id].map { StoreProduct(productId: $0.id, displayPrice: $0.displayPrice, title: $0.displayName) }
            }
        } catch {
            available = false
            return []
        }
    }

    /// Starts listening for transactions StoreKit delivers outside a purchase
    /// (Ask to Buy approvals, anything left unfinished). Safe to call repeatedly.
    func connect() {
        guard updates == nil else { return }
        updates = Task { [weak self] in
            for await result in Transaction.updates {
                guard let self else { return }
                await self.handle(result, silent: true)
            }
        }
        Task { await drainUnfinished() }
    }

    /// Re-sends transactions the store still holds because we never finished them.
    func drainUnfinished() async {
        for await result in Transaction.unfinished {
            await handle(result, silent: true)
        }
    }

    /// Opens the native sheet and resolves once the outcome is settled — which
    /// means credited by our server, refused by the store, or cancelled.
    func buy(_ productId: String) async -> PurchaseOutcome {
        if buying { return .failed(message: translator("store.purchase_in_progress"), charged: false) }
        buying = true
        defer { buying = false }

        var product = products[productId]
        if product == nil {
            _ = await products(for: [productId])
            product = products[productId]
        }
        guard let product else {
            return available
                ? .failed(message: translator("store.item_unavailable"), charged: false)
                : .unavailable(message: translator("store.purchases_unavailable"))
        }

        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                return await handle(verification, silent: false) ?? .failed(message: translator("store.purchase_failed"), charged: false)
            case .userCancelled:
                return .cancelled
            case .pending:
                return .pending
            @unknown default:
                return .failed(message: translator("store.purchase_failed"), charged: false)
            }
        } catch StoreKitError.networkError {
            return .failed(message: translator("store.network_error"), charged: false)
        } catch StoreKitError.notAvailableInStorefront {
            return .failed(message: translator("store.item_unavailable"), charged: false)
        } catch {
            return .failed(message: error.localizedDescription.isEmpty ? translator("store.purchase_failed") : error.localizedDescription, charged: false)
        }
    }

    /// Spec §20.6 — `Restore purchases`. Credits are consumable, so this is the
    /// recovery path for "the store charged and reconciliation never finished".
    func restore() async -> RestoreOutcome {
        try? await StoreKit.AppStore.sync()
        var held: [(Transaction, String)] = []
        for await result in Transaction.unfinished {
            if case .verified(let transaction) = result {
                held.append((transaction, result.jwsRepresentation))
            }
        }
        for await result in Transaction.all {
            if case .verified(let transaction) = result, transaction.revocationDate == nil,
               !held.contains(where: { $0.0.id == transaction.id }) {
                held.append((transaction, result.jwsRepresentation))
            }
        }
        guard !held.isEmpty else { return RestoreOutcome(verified: 0, restored: 0, creditsRestored: 0, balance: nil) }

        do {
            let outcome = try await api.restorePurchases(held.prefix(100).map { syncRequest($0.0, jws: $0.1) })
            if outcome.verified > 0 {
                for (transaction, _) in held { await transaction.finish() }
            }
            return RestoreOutcome(verified: outcome.verified, restored: outcome.restored, creditsRestored: outcome.creditsRestored, balance: outcome.balance)
        } catch {
            return RestoreOutcome(verified: 0, restored: 0, creditsRestored: 0, balance: nil)
        }
    }

    @discardableResult
    private func handle(_ result: VerificationResult<Transaction>, silent: Bool) async -> PurchaseOutcome? {
        guard case .verified(let transaction) = result else {
            return silent ? nil : .failed(message: translator("store.purchase_failed"), charged: false)
        }
        if transaction.revocationDate != nil {
            await transaction.finish()
            return silent ? nil : .failed(message: translator("store.purchase_failed"), charged: false)
        }
        do {
            let synced = try await api.syncPurchase(syncRequest(transaction, jws: result.jwsRepresentation))
            await transaction.finish()
            if silent { return nil }
            return synced.duplicate ? .alreadyCredited(balance: synced.balance) : .credited(credits: synced.credited, balance: synced.balance)
        } catch {
            // Deliberately not finished: the store keeps it, and the next launch
            // or the next Restore tries again.
            if silent { return nil }
            return .failed(message: (error as? APIError)?.message ?? translator("store.sync_unconfirmed"), charged: true)
        }
    }

    private func syncRequest(_ transaction: Transaction, jws: String) -> PurchaseSyncRequest {
        PurchaseSyncRequest(
            productId: transaction.productID,
            storeTransactionId: String(transaction.id),
            platform: transaction.environment == .production ? .APP_STORE : .SANDBOX,
            receipt: jws
        )
    }
}
