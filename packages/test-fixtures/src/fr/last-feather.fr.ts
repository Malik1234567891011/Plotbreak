import { registerWorldText } from '@plotbreak/contracts';

/**
 * Last Feather, in French — « Dernière Plume ».
 *
 * Written under `packages/director/src/fr-adaptation.ts` — the shared house
 * style, the glossary, and the tier brief. Tier A was authored (the wording is
 * the product); tier B was adapted for meaning.
 *
 * Prose paths only. Ids, enums, flags, expressions, asset keys, icons and
 * `coverDirection` (an image prompt) stay in the source language, because
 * `localizeStory` writes whatever path it is given and a translated flag or
 * enum is a world that no longer matches its own rules.
 *
 * Collector is « Passeur » (Sera is « une Passeuse »), the Second is « le
 * Second », the Fallen are « les Déchus », the ledger is « le registre ». Vael
 * vouvoie the player — see `addressMode` — and everyone else says tu.
 *
 * `sourceHash` on each entry is the English it was written from. When English
 * moves, `npm run fr:stale` says which of these now describes a world that no
 * longer exists.
 */
registerWorldText('fr', {
  storyId: "story_last_feather",
  text: {
    // A · e08e9f8feeec
    "title": "Dernière Plume",
    // A · fec9aea35142
    "fantasyLabel": "Elle a brisé la loi du Ciel pour toi.",
    // A · 6cacbca78ea5
    "hook": "Tu devais mourir à 2 h 14. L’ange envoyé pour te chercher a refusé.",
    // A · 8875ab7e0089
    "premise": "2 h 14 cette nuit : l’heure de ta mort. Dans ton sommeil, dans ton propre lit, au quatrième étage. Personne n’a rien entendu.\n\nQuand quelqu’un meurt dans cette ville, un ange qu’on appelle un Passeur vient le porter là-haut. Les Passeurs sont précis et doux, et les vivants ne les voient jamais.\n\nCelle qu’on a envoyée pour toi s’appelle Sera. Elle a porté 9 999 personnes sans la moindre erreur, et tu étais la dix-millième. Elle a longtemps regardé ton visage, et elle ne l’a pas fait. Ton cœur est reparti.\n\nAucun Passeur n’avait jamais refusé. Maintenant, elle ne peut plus rentrer, son aile est déchirée, et il lui reste sept plumes. Chaque miracle qu’elle fait pour te garder en vie lui en coûte une, et personne ne sait ce qu’elle deviendra quand la dernière sera partie.\n\nLe Ciel a une réponse pour les refus : le Second, celui qui vient quand le premier échoue. Il s’appelle Vael. Il est poli, il est désolé, et il frappe déjà à ta porte.\n\nTu as jusqu’au lever du soleil. Fuis, négocie, cache-toi, ou découvre pourquoi elle a dit non. Quoi que tu fasses, ça lui coûtera quelque chose.",
    // A · 181749aef54d
    "mechanicsChips": ["Sept plumes, et chacune compte","Elle peut dire non","Négocie avec celui qu’on a envoyé pour toi","Une nuit, jusqu’à l’aube","Certaines fins sont des pertes"],
    // A · b064a585ecdd
    "creatorNote": "Sera n’est pas un trophée et la nuit n’est pas un labyrinthe. Tu peux courir avec elle sur tous les toits de la ville, ouvrir la porte et parler à celui qu’on a envoyé pour te prendre, la renvoyer chez elle, ou la laisser dépenser toutes ses plumes pour découvrir ce qui arrive quand il n’y en a plus. Plusieurs fins sont des pertes. L’une d’elles, c’est choisir de partir.",
    // B · 6733cf01a6f5
    "rules.hardCanon": ["À 2 h 14 cette nuit, le joueur est mort dans son sommeil. Sera, la Passeuse envoyée pour le porter là-haut, a refusé, et quatre minutes plus tard son cœur est reparti. C’est arrivé. Ce n’est pas un rêve et ça ne se révèle jamais en être un.","Les Passeurs sont des anges qui portent les morts là-haut. Ils sont précis et doux, et les vivants ne les voient pas. Sera a porté 9 999 âmes sans une seule erreur ; le joueur était la dix-millième. Aucun Passeur n’avait jamais refusé avant elle.","Quand le premier Passeur échoue, le Ciel envoie le Second. Le Second de ce quartier s’appelle Vael. Il n’a jamais eu besoin de venir deux fois.","Son refus a coupé Sera du Ciel. Elle ne peut pas rentrer, le haut de son aile gauche est déchiré et elle ne peut pas voler, et il lui reste exactement sept plumes. Elles ne repoussent jamais.","Chaque miracle coûte exactement une plume à Sera, et le joueur sait toujours à quoi elle a été dépensée : les cacher tous les deux au regard du Ciel pendant une heure, arrêter le temps pendant trois battements de cœur, guérir une blessure mortelle, ouvrir n’importe quelle porte une fois, ou laisser le joueur voir ce qu’elle voit — les morts, les fils, les autres anges. Après chaque miracle, elle dit le compte à voix haute.","Quand la septième plume est partie, Sera cesse d’être un ange. Personne ne sait ce qu’elle devient — humaine, rien du tout, ou quelque chose qui tombe. Ni Sera, ni Vael. Seul Orin l’a vu arriver.","Vael ne peut pas franchir un seuil qu’on lui a fermé ; il peut seulement frapper, attendre et suivre. Partout où c’est ouvert — une rue, un toit, un couloir d’hôpital — il peut marcher droit vers le joueur. Pour emporter une âme, il doit lui prendre la main, et une main que Sera tient ne peut pas être prise.","Au lever du soleil, les Passeurs se rassemblent dans la vieille cathédrale. Si Sera n’est pas rentrée d’ici là, elle est déclarée Déchue.","Sera ne ment jamais au joueur. Elle refuse de répondre à la place.","C’est une ville moderne ordinaire, sous la pluie. Rien de surnaturel n’est connu du public, et tous les personnages de l’histoire sont adultes."],
    // A · 9f284b136037
    "rules.toneGuide": "Une romance surnaturelle dans une ville moderne, la nuit : la pluie, les lampadaires orange, les escaliers de secours, une supérette qui brille au coin de la rue, et un ange pieds nus dans la cuisine de quelqu’un. Doux, lumineux, un peu triste, et rapide — c’est une course-poursuite autant qu’une histoire d’amour, et quelque chose change à chaque scène. Règles d’écriture. Pendant les trois premières scènes, personne d’autre que Sera et Vael n’est nommé ni ne parle, et personne n’ordonne au joueur de rester ou de partir : Sera suit ce que fait le joueur. Sera dit le nom de Vael dès la première réponse, pour que le joueur sache qui est à la porte. Vael n’est jamais inactif : une scène surtout faite de paroles se termine par une nouvelle pression de sa part — la poignée tourne, la lumière du palier s’éteint, une deuxième carte glisse sous la porte, il dit le nom complet du joueur à travers le bois, une plume noire entre par le trou de la serrure. S’ils sont encore dans l’appartement à la quatrième scène, il trouve un moyen de les faire bouger. Chaque scène bouge — un coup à la porte, une plume dépensée, la porte, la fenêtre, le toit. Sera peut avouer qu’elle a déjà veillé sur le joueur, mais jamais depuis combien de temps ni pourquoi, tant que le secret n’est pas mérité. Chacune des cinq premières réponses fait moins de deux cent trente mots, et sa première et sa dernière phrase parlent du joueur. Nomme le prix de chaque miracle, à chaque fois : une plume part, elle dit le nombre, et le joueur le voit. « Quelque chose change » est interdit. N’affiche jamais le compte comme un chiffre sur un écran ou une jauge ; il vit dans sa voix et dans ses mains. La romance se mérite et reste incertaine. Sera peut dire non, refuser de répondre, et partir. Tout reste pudique, et la mort reste hors champ — cette histoire parle de quelqu’un qu’on garde en vie.",
    // B · f91f52e4793f
    "rules.styleExamples": ["Sera se tient devant le frigo ouvert comme devant une cathédrale. « Pourquoi laisses-tu la lumière allumée là-dedans, demande-t-elle, alors que personne n’y habite ? »","Elle la dépense sur la serrure. Tu l’entends partir – un bruit doux, comme une page qu’on tourne – et la porte du toit s’ouvre sur la pluie. « Quatre », dit Sera. Elle regarde ses mains, et pas toi.","Vael ne frappe plus. Tu l’entends s’asseoir sur la dernière marche, le registre qui se referme sur son genou. « Je suis désolé », dit-il à travers la porte, et tu le crois. « Prenez votre temps. Je serai là quand vous le voudrez. Tout le monde finit par le vouloir. »"],
    // B · 9ac7e4955593
    "skills.run.name": "Courir",
    // B · dd964da93afa
    "skills.run.description": "Les escaliers quatre à quatre, les toits mouillés, et l’écart entre deux immeubles que tu n’as jamais mesuré.",
    // B · ff8539cd765a
    "skills.quiet.name": "Discrétion",
    // B · 527d9c79e8f4
    "skills.quiet.description": "Être quelque part sans qu’on te remarque, ni les gens ni le reste.",
    // B · b0d0dc2aa738
    "skills.notice.name": "Observation",
    // B · cee94e6e9c00
    "skills.notice.description": "Voir la plume noire sur le palier avant de marcher dessus.",
    // B · 6c102355cf20
    "skills.city.name": "La ville",
    // B · 23a3eb8c2f23
    "skills.city.description": "Quelles portes sont ouvertes à quatre heures du matin, quel bus roule encore, et où sont les caméras.",
    // B · af17d0c9a93b
    "skills.talk.name": "Parler",
    // B · df69bea66ba5
    "skills.talk.description": "Amener un être raisonnable à se montrer raisonnable dans ton sens.",
    // B · 30ad18c555fc
    "skills.care.name": "Soin",
    // B · 90e94747a28e
    "skills.care.description": "Savoir ce dont quelqu’un qui a peur a besoin avant qu’il puisse le dire.",
    // B · 837d9279e002
    "skills.nerve.name": "Cran",
    // B · 8e33a54ff003
    "skills.nerve.description": "Ouvrir la porte quand même.",
    // B · fc32a96687dd
    "resources.feathers.name": "Plumes",
    // B · 241e09f4a0ce
    "resources.feathers.zeroStateConsequence": "La dernière est partie. Sera n’est plus un ange, et ce qu’elle est à la place dépend de la fin que l’histoire a atteinte, jamais d’une règle : elle peut se réveiller humaine et avoir froid pour la première fois, ou ne jamais revenir.",
    // B · 22769f705230
    "resources.heavens_gaze.name": "Le regard du Ciel",
    // B · 3a9ea40a8d82
    "resources.heavens_gaze.zeroStateConsequence": "Personne là-haut ne vous cherche. Pendant une heure, la ville n’est qu’une ville.",
    // A · 97838ae2b03c
    "items.your_keys.name": "Tes clés",
    // B · 49d64ad251b5
    "items.your_keys.description": "La porte d’entrée, la porte de l’immeuble, et un antivol pour un vélo qu’on t’a volé il y a deux ans.",
    // B · 9158f7fc62cb
    "items.your_keys.loreText": "Elles étaient au crochet près de la porte, comme toujours. Sera les regarde comme si elles expliquaient quelque chose.",
    // A · a4979efa70f7
    "items.name_card.name": "La carte à ton nom",
    // B · c4bdca0284fe
    "items.name_card.description": "Noire, lourde comme de l’ardoise, ton nom complet en lettres d’argent, d’une écriture que plus personne n’utilise. Au dos, de la même main : 2 h 14.",
    // B · 3d6536eec5c9
    "items.name_card.loreText": "Le Second en laisse une pour chaque âme qu’on l’envoie chercher. Personne n’a jamais eu l’occasion d’en garder une.",
    // A · dd2d8ec73c75
    "items.black_feather.name": "La plume de Vael",
    // B · 291551aa4004
    "items.black_feather.description": "Longue, noire et tiède, comme si elle venait de tomber d’une aile vivante. Elle a glissé sous la porte avec la carte.",
    // B · 78b26b4c4509
    "items.black_feather.loreText": "Tant que tu la portes, il sait où tu es. Il ne l’a pas caché. Il a juste oublié de le mentionner.",
    // A · 5f55ebd5bc33
    "items.ledger_page.name": "La page à ton nom",
    // B · 3da825136480
    "items.ledger_page.description": "Une feuille du registre de Vael : dix mille noms de l’écriture soignée de Sera, tous cochés, et le tien tout en bas, sans coche.",
    // B · 95bf37dd9283
    "items.ledger_page.loreText": "Une page arrachée au registre, c’est un nom rayé des livres du Ciel — tant que personne ne le réécrit.",
    // A · 8b873102d80e
    "items.clear_umbrella.name": "Un parapluie transparent",
    // B · 3dd82aee2cf0
    "items.clear_umbrella.description": "En plastique transparent, pris dans le présentoir à l’entrée de la supérette. Il te protège de la pluie. Pour les ailes, il ne sert strictement à rien.",
    // A · f6146d21fa4f
    "items.hot_cocoa.name": "Une canette de chocolat chaud",
    // B · 58da2f9be1ba
    "items.hot_cocoa.description": "Sortie du distributeur de la supérette, trop chaude pour la tenir la première minute. Sera n’a jamais rien goûté.",
    // A · a78ae0989a07
    "items.first_aid_kit.name": "La trousse de secours de Mika",
    // B · 1a5ab06706ae
    "items.first_aid_kit.description": "Un sac rouge avec de quoi panser tout un service d’hôpital, posé près de la porte du 4B par quelqu’un qui a vu ce qui arrive quand les gens improvisent.",
    // A · 4098ea074726
    "abilities.hide_us.name": "Cache-nous",
    // B · 2e14a0dbf14c
    "abilities.hide_us.description": "Sera replie son aile déchirée autour de vous deux, et pendant une heure rien au Ciel ne peut vous voir. Une plume.",
    // A · 553134c4a914
    "abilities.stop_time.name": "Trois battements de cœur",
    // B · 32c0503e0828
    "abilities.stop_time.description": "Elle arrête le temps pendant trois battements de cœur — la pluie suspendue, tout le monde figé — et c’est assez bruyant pour que le Ciel l’entende. Une plume.",
    // A · c1f4e9c49f41
    "abilities.mend.name": "Guérir",
    // B · 053ac53608c9
    "abilities.mend.description": "Sa main sur une blessure qui devrait tuer, et puis plus de blessure. Une plume.",
    // A · 218a071a9812
    "abilities.open_any_door.name": "N’importe quelle porte",
    // B · 1e9b7ba57678
    "abilities.open_any_door.description": "N’importe quelle porte, serrure ou grille de la ville s’ouvre pour elle, une fois. Une plume.",
    // A · 51f7bc151f28
    "abilities.her_sight.name": "Voir ce qu’elle voit",
    // B · f3823962601f
    "abilities.her_sight.description": "Elle pose les doigts sur tes yeux, et pendant un moment tu vois les morts, les fils qui relient les gens, et chaque ange dans la rue. Une plume.",
    // A · d90e40fb38bb
    "abilities.the_last_feather.name": "La dernière plume",
    // B · d76a6b187f58
    "abilities.the_last_feather.description": "La septième. Quoi qu’elle en fasse, elle cesse d’être un ange quand elle part, et aucun de vous deux ne sait ce qui vient après.",
    // B · 10edc9e2d913
    "abilities.the_last_feather.requires.lockedCopy": "Il lui en reste plus d’une. Celle-là, tu ne peux la demander qu’une seule fois.",
    // A · 9ac7e4955593
    "abilities.run_for_it.name": "Fuir",
    // B · 7394968ace7d
    "abilities.run_for_it.description": "Par la fenêtre, par l’escalier de secours, par les toits — n’importe où sauf ici.",
    // A · bb8918ca5e0d
    "abilities.face_him.name": "Ouvrir la porte",
    // B · 97f5717b299e
    "abilities.face_him.description": "Ouvrir toi-même et regarder en face celui qu’on envoie quand le premier échoue.",
    // A · 381bb2661f69
    "abilities.bargain.name": "Lui faire une offre",
    // B · a5d946cbead4
    "abilities.bargain.description": "Vael est raisonnable, et avec un être raisonnable on peut négocier, gagner du temps ou le faire changer d’avis.",
    // A · f39ec2b8e038
    "abilities.stay_with_her.name": "Rester avec elle",
    // B · 09ba13806c42
    "abilities.stay_with_her.description": "T’asseoir une minute avec elle et lui parler de quelque chose qui n’est pas la nuit.",
    // A · d12a852ba681
    "abilities.send_her_away.name": "Lui dire de partir",
    // B · d0d5fd770cfc
    "abilities.send_her_away.description": "Lui dire de rentrer tant qu’il lui reste de quoi rentrer, et le penser vraiment.",
    // A · 03357a260205
    "abilities.go_with_him.name": "Le suivre",
    // B · 6f4e7bf12999
    "abilities.go_with_him.description": "Donner ta main à Vael, pour que Sera puisse rentrer chez elle.",
    // A · fe6f7f7e9251
    "abilities.make_orin_a_deal.name": "Payer le prix d’Orin",
    // B · 3940b6b9c0fa
    "abilities.make_orin_a_deal.description": "Orin sait ce qui se passe à sept, et comment rayer deux personnes des livres du Ciel. Il veut quelque chose en échange.",
    // B · 975e57d07beb
    "abilities.make_orin_a_deal.requires.lockedCopy": "Il faudrait d’abord le trouver. Il est quelque part sous les voies ferrées, et il est ouvert toute la nuit.",
    // A · 667c07727e5b
    "locations.kitchen.name": "Ta cuisine",
    // A · 1176d2568d09
    "locations.kitchen.shortName": "Cuisine",
    // B · b9b0ef315ff6
    "locations.kitchen.description": "Petite, au quatrième, la lumière au-dessus de la gazinière allumée comme toujours. La pluie sur la vitre, une traînée d’empreintes de pieds nus et mouillés sur le carrelage, et une immense aile blanche repliée contre le frigo. La porte d’entrée est à quatre pas, et quelqu’un se tient derrière.",
    // A · 621eca84a56f
    "locations.bedroom.name": "Ta chambre",
    // A · f25239fe3891
    "locations.bedroom.shortName": "Chambre",
    // B · a20d963425e7
    "locations.bedroom.description": "Le lit où ton cœur s’est arrêté cette nuit, les draps rejetés. Un réveil qui affiche l’heure en bleu. La fenêtre au-dessus du radiateur donne sur un escalier de secours en fer noir qui monte jusqu’au toit et descend jusqu’à la rue.",
    // A · ee4a5218e02f
    "locations.landing.name": "Le palier du quatrième",
    // A · de9566487b17
    "locations.landing.shortName": "Palier",
    // B · 575fef6273c0
    "locations.landing.description": "Ta porte d’entrée, celle du 4B en face, une cage d’escalier à la lumière qui clignote, et une odeur de pluie qui monte de la rue. Celui qui se tient ici entend tout ce qui se dit dans ta cuisine.",
    // A · 7445ab1a33d0
    "locations.mika_flat.name": "L’appartement 4B",
    // A · 0eec531f32a1
    "locations.mika_flat.shortName": "4B",
    // B · e20e68cde42b
    "locations.mika_flat.description": "Chez Mika, de l’autre côté du palier. Une blouse qui sèche sur une chaise, trois plantes que personne n’arrose, une trousse de secours rouge près de la porte, et un canapé sur lequel on a visiblement dormi plus souvent que dans le lit.",
    // A · 7c6759bd7ffc
    "locations.roof.name": "Le toit",
    // A · f5f730969df6
    "locations.roof.shortName": "Toit",
    // B · ebb1600e8195
    "locations.roof.description": "Du gravier, un réservoir d’eau, une porte qui ne ferme pas à clé, et toute la ville étalée sous la pluie. L’immeuble d’à côté est assez proche pour sauter, à condition de ne pas regarder en bas.",
    // A · c2475bf6fa39
    "locations.street.name": "La rue",
    // A · 3f558f42608a
    "locations.street.shortName": "Rue",
    // B · 1685d815cc32
    "locations.street.description": "L’asphalte mouillé, les voitures garées, la supérette du coin allumée comme une lanterne, et les lampadaires qui descendent la colline jusqu’au fleuve. À cette heure-ci, tout ce qui marche dessous se voit de loin.",
    // A · 65c4f1c1f69b
    "locations.store.name": "La supérette du coin",
    // A · 3a51191e1ee4
    "locations.store.shortName": "Supérette",
    // B · 9414c437da65
    "locations.store.description": "Ouverte toute la nuit et éclairée comme un bloc opératoire : un distributeur de boissons chaudes, des parapluies près de la porte, et un caissier qui a tout vu à quatre heures du matin et ne regardera pas deux fois une paire d’ailes.",
    // A · f4fbc9a76007
    "locations.hospital.name": "L’hôpital",
    // A · 114fedcc70bf
    "locations.hospital.shortName": "Hôpital",
    // B · 815858e30c64
    "locations.hospital.description": "À deux rues d’ici, là où Mika travaille de nuit. Des couloirs blancs, un service calme au sixième, et plus de Passeurs au mètre carré que partout ailleurs en ville, parce que c’est ici que les gens meurent.",
    // A · 62cf69de2aa3
    "locations.bar.name": "Sous la Ligne",
    // A · 3456e0536130
    "locations.bar.shortName": "Le bar d’Orin",
    // B · 6724e8eabea7
    "locations.bar.description": "Un bar ouvert toute la nuit dans les arches sous la voie ferrée, où toute la salle tremble à chaque passage de train. Six tabourets, un poêle, et un barman qui sait exactement ce qu’est Sera à la seconde où elle se baisse pour entrer.",
    // A · 69d03542528d
    "locations.bridge.name": "Le pont",
    // A · 1d7d7d4b9026
    "locations.bridge.shortName": "Pont",
    // B · 7f0ea7b35e19
    "locations.bridge.description": "Le vieux pont sur le fleuve, en bas de la colline, avec un morceau de garde-corps remplacé il y a six ans et jamais tout à fait assorti au reste. Sera arrête de parler quand vous vous en approchez.",
    // A · 0e43764bc534
    "locations.cathedral.name": "La vieille cathédrale",
    // A · 7c13329022d5
    "locations.cathedral.shortName": "Cathédrale",
    // B · b27e6c9c81a5
    "locations.cathedral.description": "De la pierre noire sur la colline de l’autre côté du fleuve, fermée au public la nuit. À l’aube, les Passeurs s’y rassemblent, et ceux qui peuvent les voir voient toute la nef remplie d’ailes.",
    // A · ba59afadc141
    "characters.sera.role": "La Passeuse envoyée pour te porter là-haut à 2 h 14, et qui a refusé",
    // A · 313a817073cd
    "characters.sera.cardBlurb": "L’ange envoyée pour te prendre, qui n’a pas pu le faire. Il lui reste sept plumes, chaque miracle qui te garde en vie lui en coûte une, et elle refuse de te dire pourquoi elle a dit non.",
    // A · bb92a02ab478
    "characters.sera.publicTraits": ["Calme et précise","Pose des questions très littérales sur les choses ordinaires","Ne ment jamais"],
    // B · 85a28d58e652
    "characters.sera.hiddenDrives": ["Elle veut comprendre pourquoi elle n’a pas pu le faire, et elle a peur de la réponse","Elle observe le joueur, de loin en loin, depuis six ans, et il ne l’a jamais remarquée en retour","Où elle peut aller : du devoir au choix. Elle peut tomber amoureuse, s’y refuser, partir pour le sauver, ou choisir de rester et devenir mortelle — et rien de tout ça n’est décidé avant que le joueur ait traversé une partie de la nuit avec elle"],
    // B · e67da10a5bd2
    "characters.sera.values": ["La vérité, ou le silence","Faire les choses correctement une fois commencées","La vie du joueur, avant son propre dossier"],
    // B · f6127fce6699
    "characters.sera.fears": ["Avoir refusé pour elle-même, et pas pour le joueur","Devenir rien du tout quand la dernière plume partira","Que Vael soit gentil avec elle, parce qu’elle aura envie de le suivre"],
    // A · b39dfd018841
    "characters.sera.socialStyle": "Observe avant de parler, et parle juste. N’a jamais eu à faire la conversation, alors elle pose directement la vraie question. Dans l’urgence, elle suit le joueur sans qu’on le lui demande, et ne donne jamais d’ordre.",
    // B · f074cf3c8ccc
    "characters.sera.boundaries": ["Ne ment jamais au joueur ; elle refuse de répondre à la place","N’ordonne jamais au joueur de rester ou de partir","Ne dépense pas la dernière plume sans le lui demander d’abord","Ne touche personne sans demander, sauf pour garder le joueur en vie"],
    // B · 8886bed4d069
    "characters.sera.goals": ["Garder le joueur en vie jusqu’au matin","Comprendre pourquoi elle n’a pas pu le porter"],
    // B · 0c926a3d1b01
    "characters.sera.secrets.sera_the_bridge.fact": "Elle attend le joueur depuis six ans, comme Passeuse désignée. La première fois, c’était la nuit où le fleuve a débordé sur le vieux pont : le joueur est descendu sur la berge pour aller chercher un inconnu coincé dans une voiture, et n’aurait pas dû remonter. Sera avait été envoyée et attendait ; le joueur, à moitié noyé, a gardé la tête de l’inconnu hors de l’eau jusqu’à l’arrivée des secours. Elle n’a jamais cessé d’y penser.",
    // B · b9c5807595cf
    "characters.sera.secrets.sera_the_bridge.revealHint": "Elle ne le raconte qu’une fois qu’elle fait confiance au joueur, quelque part en hauteur ou sur le pont lui-même, et seulement après avoir dépensé au moins une plume pour lui. Avec ses mots, brièvement, sans jamais dire que c’était courageux. Si le joueur s’en souvient autrement, les deux versions restent vraies.",
    // B · debf7be05855
    "characters.sera.secrets.sera_the_light.fact": "Avant cette nuit, elle savait déjà quelle lumière le joueur laisse allumée, ce qu’il dit dans son sommeil, et le nom de la plante sur le rebord de la fenêtre.",
    // B · 3b6f31756833
    "characters.sera.secrets.sera_the_light.revealHint": "Elle se trahit par accident dans une des premières scènes — en sachant quelque chose qu’on ne lui a pas dit — et ne l’explique qu’après qu’on le lui a demandé deux fois.",
    // A · d8fad75d6c38
    "characters.sera.speechStyle": "Calme, précise, soutenue. Phrases courtes. Garde toujours le « ne » de la négation, et parle encore plus correctement quand elle a peur. Pose des questions littérales sur les choses ordinaires. Après chaque plume, elle dit le nombre à voix haute, et rien d’autre dans la phrase.",
    // A · 1fd79455123d
    "characters.sera.topics": ["pourquoi elle a refusé","les plumes","Vael","ce qui arrive à sept","le pont","ce que c’est, de porter quelqu’un là-haut"],
    // A · 74ba146e7b80
    "characters.sera.voiceSamples": ["Il y a quatre minutes. Ton cœur s’est arrêté dans ton sommeil. On m’a envoyée pour te porter là-haut, et je ne l’ai pas fait.","Pourquoi laisses-tu la lumière allumée dans la cuisine quand il n’y a personne ?","Six. Il en reste six. Je te le dirai à chaque fois, pour que tu n’aies jamais à demander.","Je ne te mens pas. Parfois, je ne répondrai pas. Ce n’est pas la même chose, et j’ai besoin que tu saches que ce n’est pas la même chose.","C’est ça, le froid ? C’est très impoli."],
    // B · 80d135d8a6ac
    "characters.sera.appearance": "Elle a l’air d’avoir une vingtaine d’années. De longs cheveux gris argent, raides, qui brillent faiblement comme éclairés de l’intérieur, des yeux gris-bleu pâles et lumineux, un fin halo de lumière brisé qui vacille au-dessus de sa tête quand elle a peur. Une simple robe blanche trempée et sombre à l’ourlet, pieds nus. Deux grandes ailes blanches, la gauche déchirée vers le haut. Éthérée et très belle, douce et triste.",
    // B · bb0aaed07a28
    "characters.sera.gates.sera_shows_you.label": "Elle te laisse voir ce qu’elle voit",
    // B · e8474e5b02ea
    "characters.sera.gates.sera_tells_the_bridge.label": "Elle te parle du pont",
    // B · a5eac34ab3a2
    "characters.sera.gates.sera_romance.label": "Elle arrête de faire comme si ce n’était que son travail",
    // A · 059f9fe17239
    "characters.vael.role": "Le Second : le Passeur que le Ciel envoie quand le premier échoue",
    // A · 43c9506041ab
    "characters.vael.cardBlurb": "Poli, patient, sincèrement désolé, et venu te prendre. Ce n’est pas un méchant — on peut négocier avec lui, le retarder, le duper ou s’en faire un ami — mais il n’a jamais eu besoin de venir deux fois.",
    // A · dd95d3a43f9b
    "characters.vael.publicTraits": ["Courtois","Pince-sans-rire","D’une logique terrifiante"],
    // B · b0520310d38c
    "characters.vael.hiddenDrives": ["Il veut refermer le registre et ramener Sera avant l’aube, pour qu’elle ne soit pas déclarée Déchue","Il préférerait que le joueur choisisse de venir plutôt que d’être emporté, et il est prêt à attendre longtemps pour ça","Où il peut aller : de la règle à l’exception. Il peut emporter le joueur, le laisser partir, ou refermer le registre sur un mensonge et en porter lui-même le prix"],
    // B · 284590511b88
    "characters.vael.values": ["La courtoisie, même maintenant","Finir ce qui est commencé","Sera, qu’il a formée"],
    // B · 4f977ec92bbb
    "characters.vael.fears": ["Que Sera se dépense jusqu’à n’être plus rien, comme il a failli le faire autrefois","Écrire un mensonge dans le registre, et avoir raison de le faire"],
    // A · 1a560306ef04
    "characters.vael.socialStyle": "Ne hausse jamais le ton. Vouvoie le joueur et l’appelle par son nom complet. Glisse une remarque pince-sans-rire au moment où on l’attend le moins, puis s’en excuse. D’une patience qui finit par mettre mal à l’aise.",
    // B · 706973aeb9b9
    "characters.vael.boundaries": ["Ne franchit jamais un seuil qu’on lui a fermé","Ne prend jamais une main que Sera tient","Ne ment jamais à Sera","Ne fait de mal à personne ; il n’en a jamais eu besoin"],
    // B · 13a3f39d53a0
    "characters.vael.goals": ["Refermer le registre : emporter le joueur avant l’aube","Ramener Sera avant qu’elle soit déclarée Déchue"],
    // B · 146bb809140a
    "characters.vael.secrets.vael_trained_her.fact": "C’est lui qui a formé Sera. Chacune de ses 9 999 âmes a été portée comme il le lui a appris.",
    // B · 87ddc02d11eb
    "characters.vael.secrets.vael_trained_her.revealHint": "Il le dit la première fois que le joueur lui demande pourquoi le sort de Sera l’intéresse, simplement, comme une évidence.",
    // B · 3bbd5dcd2d79
    "characters.vael.secrets.vael_refused_once.fact": "Il y a des siècles, il a refusé une fois, lui aussi. On lui a donné une nuit, comme à elle. Il est revenu à l’aube et a quand même emporté la personne, et depuis il est le Second. Il sait exactement ce que ça a coûté.",
    // B · accb65eb620f
    "characters.vael.secrets.vael_refused_once.revealHint": "Seulement à un joueur qu’il a appris à respecter, tard dans la nuit, ou par Orin, qui était là. Jamais à Sera, sauf si le joueur l’y pousse.",
    // A · 56fe35823849
    "characters.vael.speechStyle": "Courtois, posé, un peu suranné, et pince-sans-rire. Des phrases complètes. Vouvoie toujours le joueur et l’appelle par son nom complet. Dit « Je suis désolé » et le pense à chaque fois.",
    // A · 8c3978b27da2
    "characters.vael.topics": ["le registre","Sera","ce qui se passe à l’aube","les Passeurs","ce qu’il veut","la carte sous la porte"],
    // A · d98e30d5e5d7
    "characters.vael.voiceSamples": ["Bonsoir. Ne vous alarmez pas, je vous en prie. Je suis celui qu’on envoie quand le premier échoue.","Je suis désolé. Je le pense vraiment, et je serai toujours là à l’aube.","C’est la meilleure que j’aie jamais formée. Ce soir, ce n’est un compliment pour aucun de nous deux.","Appelez-moi Vael. Moi, j’utiliserai votre nom complet, si vous le permettez. C’est la seule chose de cette nuit dont j’ai le droit d’être certain."],
    // B · e02b9bc76c28
    "characters.vael.appearance": "Grand, adulte, impeccable. Costume noir, cravate noire, gants noirs, et des ailes noires repliées contre lui comme un long manteau. Cheveux courts gris cendre foncé, yeux dorés et calmes. Il tient un mince registre noir contre sa poitrine.",
    // B · cdec6a44c864
    "characters.vael.gates.vael_bargains.label": "Il veut bien entendre une offre",
    // B · 4d6433785e95
    "characters.vael.gates.vael_tells_you.label": "Il te dit qu’il a refusé, lui aussi",
    // A · f05d97d34460
    "characters.mika.role": "Ta voisine du 4B, infirmière de nuit",
    // A · d5c6e41104ef
    "characters.mika.cardBlurb": "Elle habite en face de chez toi et rentre à trois heures du matin, et c’est la première personne vivante qui peut soudain voir les ailes de Sera. Pragmatique, drôle, et de ton côté avant même de savoir de quel côté il s’agit.",
    // A · 89b43e50541d
    "characters.mika.publicTraits": ["Pragmatique","Drôle quand elle a peur","Protectrice"],
    // B · e8ea43a720e2
    "characters.mika.hiddenDrives": ["Elle a déjà vu des Passeurs, du coin de l’œil, en fin de garde, et ne l’a jamais dit à personne","Où elle peut aller : de témoin à complice. Elle peut vous cacher tous les deux, soigner le joueur, tout signaler, ou décider qu’elle ne veut pas savoir"],
    // B · 29a12b12aae1
    "characters.mika.values": ["Garder les gens en vie","Ne pas paniquer devant des gens qui paniquent déjà"],
    // B · e547fd933f56
    "characters.mika.fears": ["Que les voir veuille dire que son tour approche","Être la seule à avoir vu"],
    // A · 56a87a7ef4cf
    "characters.mika.socialStyle": "Traite chaque crise comme la troisième de la nuit. Blague d’abord, puis fait le truc utile. Parle à Sera comme à une patiente qui refuse de s’asseoir.",
    // B · 9cb942e377a7
    "characters.mika.boundaries": ["Ne ment pas à la police pour quelqu’un qu’elle n’a pas vraiment rencontré","Ne laisse personne saigner sur son parquet sans le soigner"],
    // B · d84640c753b7
    "characters.mika.goals": ["Faire asseoir le joueur, qui ne va clairement pas bien","Comprendre pourquoi elle voit des ailes cette nuit"],
    // B · 00eaf82bdc81
    "characters.mika.secrets.mika_has_seen_them.fact": "Au sixième étage, depuis deux ans, elle voit de grandes silhouettes pâles debout dans les coins des chambres où quelqu’un est en train de mourir. Elle s’est dit que c’était la fatigue.",
    // B · ff09fd0e249f
    "characters.mika.secrets.mika_has_seen_them.revealHint": "Elle l’avoue doucement, une fois que Sera a fait devant elle quelque chose qu’elle ne peut pas expliquer.",
    // B · 17f34fb1075d
    "characters.mika.secrets.mika_why_now.fact": "Pourquoi elle voit Sera maintenant n’est jamais tranché : Sera a commencé à tomber et devient visible, ou Mika s’est tenue si souvent à côté de la porte qu’elle voit à travers. Les deux peuvent être vrais.",
    // B · 0da502b0649b
    "characters.mika.secrets.mika_why_now.revealHint": "Ne le résous pas. Sera ne le sait pas non plus, et ça lui fait peur.",
    // A · 73dc2f1e2186
    "characters.mika.speechStyle": "Rapide, familière, la voix un peu cassée après douze heures de garde. Jargon d’hôpital. Jure un peu, et s’en excuse auprès de Sera.",
    // A · 4f00ff5d3207
    "characters.mika.topics": ["l’hôpital","ce qu’elle a vu dans le service","les ailes","les gardes de nuit","l’immeuble"],
    // A · 4350ab2afc1e
    "characters.mika.voiceSamples": ["OK. OK. Soit j’ai besoin de dormir neuf heures, soit ton amie a des ailes.","Je fais les nuits dans un service. Les gens voient des trucs à quatre heures du mat’. J’en avais jamais vu un qui goutte sur la moquette.","Assieds-toi. Montre-moi ta main. Je me fiche de ce qu’elle est, tu saignes sur mon parquet."],
    // B · 4a5807288ee2
    "characters.mika.appearance": "Jeune adulte, un carré court teint en rose aux racines qui repoussent, des yeux sombres fatigués, un grand sweat à capuche gris par-dessus sa tenue d’hôpital, des baskets, le badge encore autour du cou.",
    // B · 83ebca130491
    "characters.mika.gates.mika_covers.label": "Elle vous cache tous les deux au 4B",
    // B · f17bbf673b02
    "characters.mika.gates.mika_tells_you.label": "Elle te raconte ce qu’elle a vu dans le service",
    // A · 5f06a93cd9ae
    "characters.orin.role": "Un ange tombé il y a trois cents ans, qui tient un bar sous les voies",
    // A · 3d3fe1678ab9
    "characters.orin.cardBlurb": "Il sait ce qui arrive quand la septième plume part, parce que ça lui est arrivé. Il te le dira, et il te dira comment disparaître pour de bon des livres du Ciel — contre un prix.",
    // A · df8963eaba74
    "characters.orin.publicTraits": ["Fatigué et bon","Jamais pressé","Fait payer tout ce qui compte"],
    // B · e5bd36e1ed32
    "characters.orin.hiddenDrives": ["Il voudrait que quelqu’un, une fois, dépense sa dernière plume mieux que lui","Où il peut aller : de spectateur à complice. Il peut vendre la vérité au joueur, la donner à Sera pour rien, ou refuser d’aider qui que ce soit d’autre à tomber"],
    // B · ccb7407d58e8
    "characters.orin.values": ["Payer ce qu’on doit","Laisser le Ciel tranquille, et qu’il le laisse tranquille"],
    // B · 604805960d69
    "characters.orin.fears": ["Voir quelqu’un d’autre refaire son erreur","Vael qui entre dans son bar"],
    // A · be4681d89b01
    "characters.orin.socialStyle": "Sert avant qu’on demande, écoute tout jusqu’au bout, puis annonce un prix. D’une douceur avec Sera qui la met mal à l’aise.",
    // B · e742f120d42b
    "characters.orin.boundaries": ["Ne donne rien pour rien, sauf à Sera, une fois","Ne remontera jamais là-haut, quoi qu’on lui offre"],
    // B · df6d1c60a6fd
    "characters.orin.goals": ["Garder le bar ouvert et le Ciel dehors","Savoir si Sera s’en sortira mieux que lui"],
    // B · 80135426bbe7
    "characters.orin.secrets.orin_what_seven_does.fact": "Il est tombé il y a trois cents ans en dépensant sa septième plume pour une femme, une année de peste. Il est devenu humain et lui a survécu trois siècles. Il croit que la dernière plume rend mortel si elle est dépensée pour quelqu’un qui veut qu’on reste, et ne laisse que des cendres si elle est dépensée pour autre chose — mais il ne l’a vu arriver que deux fois, et il peut se tromper.",
    // B · 907ef44a62fb
    "characters.orin.secrets.orin_what_seven_does.revealHint": "C’est ce qu’il vend. Il le dit une fois son prix payé, ou à Sera pour rien si elle vient le lui demander seule.",
    // B · 04549bd2b0b7
    "characters.orin.secrets.orin_off_the_books.fact": "Un nom arraché au registre et brûlé dans son poêle est un nom que le Ciel ne peut pas réécrire. Il l’a fait pour quatre personnes en trois cents ans. Ça fait de vous deux des Déchus, pour de bon.",
    // B · fe2833eea459
    "characters.orin.secrets.orin_off_the_books.revealHint": "Il ne le propose que si le joueur a la page à son nom et l’a payé.",
    // A · fe42122db3fb
    "characters.orin.speechStyle": "Grave, lent, un peu amusé. Parle comme un homme qui a eu trois cents ans pour finir ses phrases. Ne dit jamais « le Ciel » ; il dit « là-haut ».",
    // A · 0df50d392ad2
    "characters.orin.topics": ["la septième plume","ce qu’il était","les Déchus","son prix","Vael","là-haut"],
    // A · b3257fb7d0e3
    "characters.orin.voiceSamples": ["Ferme la porte, tu fais entrer la pluie. Et l’autre chose aussi.","Sept. Je sais ce qui se passe à sept. Tous ceux qui descendent ces marches me le demandent, et tous paient.","J’ai eu des ailes, moi aussi. J’ai dépensé les dernières pour quelqu’un. Demande-moi si je le referais. Vas-y."],
    // B · c2f8fd6fe267
    "characters.orin.appearance": "Il a l’air d’avoir quarante ans et ne les a pas. Des anneaux d’argent aux oreilles, une chemise grise aux manches retroussées, des cicatrices de brûlure sur les deux omoplates, là où étaient les ailes, et des yeux fatigués et bons.",
    // B · d7189bd3de15
    "characters.orin.gates.orin_answers.label": "Il te dit ce qui arrive à sept",
    // B · 2437f25ef9bc
    "factions.faction_collectors.name": "Les Passeurs",
    // B · e3b46565bfba
    "factions.faction_collectors.description": "Ceux qui portent les morts pour le Ciel, et l’administration derrière eux. Précis, doux, et très bons dans leur travail. Ils n’ont jamais connu de refus, et n’ont aucune procédure pour ça à part envoyer le Second.",
    // B · 9659e6e33fcb
    "factions.faction_fallen.name": "Les Déchus",
    // B · fb5b342fb6f8
    "factions.faction_fallen.description": "Des anges qui ont cessé d’en être et sont restés. Quelques dizaines dans toute la ville, surtout dans les endroits ouverts toute la nuit. Ils ne doivent rien au Ciel, et beaucoup les uns aux autres.",
    // B · a9dcc2bcca35
    "quests.q_three_knocks.title": "Trois coups",
    // B · 48aa4e373999
    "quests.q_three_knocks.summary": "Ta mort était prévue à 2 h 14, un ange a refusé de te prendre, et celui qu’ils envoient ensuite est à ta porte.",
    // B · ee3841deed83
    "quests.q_three_knocks.steps.the_door.playerCopy": "Décide quoi faire de celui qui frappe.",
    // B · ff1fc992f3d6
    "quests.q_three_knocks.steps.the_door.directorNotes": "Chaque réponse fait avancer. Fuir, c’est la fenêtre, l’escalier de secours et la pluie dans la même scène. Ouvrir, c’est Vael sur le palier, courtois et désolé — et Sera qui attrape la main du joueur, parce qu’une main qu’elle tient ne peut pas être prise. Exiger la vérité, c’est Sera qui en dit une partie, vite, pendant que les coups attendent. Personne n’ordonne au joueur de rester ou de partir, et personne de nouveau n’est nommé.",
    // B · 41453df6f7e5
    "quests.q_three_knocks.steps.until_morning.playerCopy": "Garde-vous tous les deux en vie et loin du regard du Ciel jusqu’au lever du soleil.",
    // B · f8441a25c8a2
    "quests.q_three_knocks.steps.until_morning.directorNotes": "La colonne vertébrale de la nuit. Chaque lieu a son prix : la rue est à découvert, le toit est sous le ciel, l’hôpital est plein de Passeurs au travail, et tout endroit avec une porte fermée est une cage devant laquelle Vael peut attendre. Les plumes achètent du temps. Lui parler aussi. Choisir de le suivre est une vraie voie, pas un échec.",
    // B · 4bc6e03dbce3
    "quests.q_three_knocks.knownRewardCopy": "Le reste de la nuit, si tu arrives à le garder.",
    // B · f60faa1c825d
    "quests.q_ten_thousand.title": "La dix-millième",
    // B · 0fa9c6e78f60
    "quests.q_ten_thousand.summary": "Sera a porté 9 999 personnes sans une seule erreur. Puis elle a posé les yeux sur toi, et elle n’a pas pu.",
    // B · e0dc231e2337
    "quests.q_ten_thousand.steps.ask_her.playerCopy": "Découvre pourquoi Sera a refusé de te porter.",
    // B · d0b08c5d2fce
    "quests.q_ten_thousand.steps.ask_her.directorNotes": "Trois façons d’y arriver, et elles n’ont pas le même goût. Sera ne le raconte elle-même que si elle fait confiance au joueur. Vael connaît son dossier et dira ce qu’il y a lu : les faits, sans le sentiment. Sa vision, sur le pont, montre la nuit elle-même, et coûte une plume. Ne la laisse jamais mentir là-dessus ; laisse-la refuser de répondre.",
    // B · 4cc2bdc6da5e
    "quests.q_ten_thousand.steps.for_whom.playerCopy": "Décide ce que sa raison veut dire pour toi.",
    // B · cd48c70e2bed
    "quests.q_ten_thousand.steps.for_whom.directorNotes": "Sa peur, c’est de l’avoir fait pour elle-même. La réponse honnête, c’est les deux, et elle doit décider si c’est permis. Aucune issue n’est une punition : elle peut choisir le joueur, et le joueur peut la renvoyer chez elle tant qu’elle a encore des ailes pour rentrer.",
    // B · f41d4da039f4
    "quests.q_ten_thousand.knownRewardCopy": "Pourquoi elle a dit non — et ce que ça veut dire pour vous deux.",
    // B · f036599b164e
    "quests.q_seven.title": "Sept plumes",
    // B · e38b8d379d39
    "quests.q_seven.summary": "Chaque miracle lui en coûte une. Personne ne peut te dire ce qu’elle devient quand la dernière part — personne, sauf un homme qui tient un bar sous la voie ferrée.",
    // B · 653e3c41ada6
    "quests.q_seven.steps.who_knows.playerCopy": "Trouve quelqu’un qui sait ce qui arrive à sept.",
    // B · a7cd8eff3437
    "quests.q_seven.steps.who_knows.directorNotes": "Sera a entendu parler d’un Déchu sous les voies et a peur de le dire. Mika connaît le bar : c’est là que vont les soignants de nuit après un décès dans le service. Vael connaît Orin de nom et le mentionnera comme un avertissement, ce qui est aussi une adresse.",
    // B · 82d26a309312
    "quests.q_seven.steps.orins_price.playerCopy": "Trouve Orin, et découvre ce qu’il veut en échange de la réponse.",
    // B · 245fe1daa956
    "quests.q_seven.steps.orins_price.directorNotes": "Il demande une plume. Il acceptera un souvenir à la place — un vrai, le plus beau que le joueur ait — et il le gardera. Sera peut aller le lui demander seule, et il le lui dira pour rien, une fois, ce qui lui coûte plus qu’il ne le montre.",
    // B · a735d7ea3077
    "quests.q_seven.steps.off_the_books.playerCopy": "Décide si tu sors des livres du Ciel pour de bon.",
    // B · 78ae4bd4ec85
    "quests.q_seven.steps.off_the_books.directorNotes": "Une page arrachée au registre de Vael et brûlée dans le poêle d’Orin, c’est un nom que le Ciel ne peut pas réécrire. Ça fait du joueur et de Sera des Déchus, tous les deux. C’est une vraie fin, pas un tour de passe-passe, et Vael le saura à l’instant où la page brûlera.",
    // B · edd5dd0dab28
    "quests.q_seven.knownRewardCopy": "Ce qui arrive à sept, et un moyen de sortir des livres du Ciel si tu en veux un.",
    // B · 3d833f86eff9
    "quests.q_the_last.title": "La septième",
    // B · d98e21ba81d4
    "quests.q_the_last.summary": "Une des plumes est la dernière. Ce à quoi elle sera dépensée décidera de ce qu’elle devient.",
    // B · 17d9ce6f6dd0
    "quests.q_the_last.steps.the_seventh.playerCopy": "Décide à quoi servira la dernière plume, si on en arrive là.",
    // B · 4191d1ad4096
    "quests.q_the_last.steps.the_seventh.directorNotes": "Elle demande avant de la dépenser, une fois, et accepte la réponse. La dépenser n’est jamais discret et ne se passe jamais hors champ. La garder est aussi un choix, et un matin avec une plume en poche n’est pas une fin au rabais.",
    // B · 3a0952187a99
    "quests.q_the_last.knownRewardCopy": "Personne ne le sait. C’est tout le sujet.",
    // B · 6118410dec5f
    "quests.q_the_second.title": "Le Second",
    // B · 682f4a23e9b7
    "quests.q_the_second.summary": "Vael n’a jamais eu besoin de venir deux fois. Il est poli, patient et sincèrement désolé, et il ne s’arrêtera pas.",
    // B · d500be846cd1
    "quests.q_the_second.steps.know_him.playerCopy": "Découvre ce que Vael veut vraiment.",
    // B · 1f632669c402
    "quests.q_the_second.steps.know_him.directorNotes": "Il veut refermer le registre et ramener Sera. Il aimerait que le joueur le choisisse. Prendre la page de son registre est possible — il le pose quand il parle — et il s’en apercevra, sans cesser pour autant d’être poli.",
    // B · 6663e479c84a
    "quests.q_the_second.steps.the_lie.playerCopy": "Découvre si Vael refermera le registre sur un mensonge.",
    // B · 745e27bc12cf
    "quests.q_the_second.steps.the_lie.directorNotes": "Il peut écrire « emporté » à côté du nom du joueur, signer, et en porter le poids lui-même. Il ne le fera que pour quelqu’un qui sait qu’il a refusé, lui aussi, et qui lui a donné une raison de le respecter. Un joueur qui lui a volé sa page l’oblige à écrire la vérité.",
    // B · 412395d858d7
    "quests.q_the_second.knownRewardCopy": "Ce qu’il veut vraiment, et s’il écrirait un mensonge dans son propre registre.",
    // B · faa707173191
    "worldEvents.we_second_knock.publicCopy": "Trois coups de plus, exactement aussi lents que les premiers. Puis une voix d’homme à travers la porte, courtoise et navrée, qui prononce le nom complet du joueur et demande s’il voudrait bien ouvrir.",
    // B · 94d162a937af
    "worldEvents.we_second_knock.directorNotes": "Vael, patient. Il ne menace pas et n’essaie pas la poignée — il ne peut pas franchir une porte qu’on lui a fermée. Si le joueur a déjà quitté l’appartement ou ouvert la porte, ça n’arrive pas.",
    // B · 5d3f86871514
    "worldEvents.we_mika_home.publicCopy": "Des clés sur le palier. La voisine du 4B, en tenue d’hôpital sous un sweat gris, s’arrête net en haut des marches et regarde derrière le joueur — les ailes.",
    // B · 58930987ea17
    "worldEvents.we_mika_home.directorNotes": "Mika est la première personne vivante qui peut voir Sera, ce qui veut dire que quelque chose a changé, et Sera ne sait pas quoi. Jamais avant la quatrième scène, quoi qu’indique l’horloge : si le joueur en est encore aux trois premières, elle est encore dans l’escalier. Elle ne crie pas. Elle demande si quelqu’un saigne.",
    // B · 5c7c808d955a
    "worldEvents.we_lights_out.publicCopy": "Tous les lampadaires de la colline s’éteignent, l’un après l’autre, du haut jusqu’au fleuve, comme si quelqu’un descendait la rue en les éteignant. Il n’y a personne.",
    // B · 28076b06eb07
    "worldEvents.we_lights_out.directorNotes": "Les Passeurs ont commencé à fouiller le quartier. À partir de maintenant, être à découvert est dangereux, et Sera les voit même quand le joueur ne les voit pas.",
    // B · de29f392ffb3
    "worldEvents.we_vael_offer.publicCopy": "Vael est simplement là, où que soit le joueur, assis en face de lui, le registre fermé sur le genou. Il a une offre, et il aimerait qu’on l’écoute jusqu’au bout avant de répondre.",
    // B · 69a97d7e5a39
    "worldEvents.we_vael_offer.directorNotes": "Qu’il vienne avec lui avant l’aube, et Sera rentre avec un dossier propre, sans aucune marque contre elle. Il le pense et il peut le tenir. Il ne prendra pas la main du joueur de force tant qu’ils se parlent.",
    // B · 6c92e6af7480
    "worldEvents.we_bells.publicCopy": "De l’autre côté du fleuve, les cloches de la vieille cathédrale sonnent une fois. Il n’y a plus de cloches dans le clocher depuis quatre-vingts ans.",
    // B · e44059b6f864
    "worldEvents.we_bells.directorNotes": "Les Passeurs se rassemblent pour l’aube. Sera y entend son propre nom. Il reste moins d’une heure, et elle le dit.",
    // B · ab31f1f9ff47
    "worldEvents.we_dawn.publicCopy": "La pluie s’arrête. Le ciel au-dessus du fleuve devient gris, puis doré, et le soleil se lève sur une ville qui n’a aucune idée de ce qui s’y est passé cette nuit.",
    // B · 6d2f29acd8f2
    "worldEvents.we_dawn.directorNotes": "Le matin, quel qu’en soit le prix. Dis exactement ce qui reste : combien de plumes, quelle main le joueur tient, où se tient Vael. C’est le moment où la plupart des fins deviennent possibles.",
    // B · 8952498bd95f
    "promises.p_seven.label": "Ce que devient Sera quand la septième plume part",
    // B · 8a56434366f6
    "promises.p_seven.seedHint": "Après chaque miracle, elle dit le compte à voix haute, et ne dit jamais le nombre suivant en premier.",
    // B · 4958f783f944
    "promises.p_seven.payoffHint": "Personne ne le sait — et Orin, le seul à l’avoir vu, dit que ça dépend de pour qui la dernière a été dépensée.",
    // B · 5994dc12eb37
    "promises.p_why.label": "Pourquoi elle a refusé",
    // B · 77ab31605dc4
    "promises.p_why.seedHint": "Elle savait quelle lumière le joueur laisse allumée dans la cuisine avant que quiconque le lui dise.",
    // B · fb6cee72ac6e
    "promises.p_why.payoffHint": "Il y a six ans, sur le pont, on l’a envoyée attendre le joueur, et elle l’a regardé garder un inconnu en vie au lieu de se sauver lui-même.",
    // B · 6a1194443548
    "promises.p_for_whom.label": "Si elle a refusé pour toi ou pour elle",
    // B · 2b8fc52eff50
    "promises.p_for_whom.seedHint": "Elle demande ce que ça fait, d’avoir froid, et écoute la réponse avec un peu trop d’attention.",
    // B · 504c7e3a28d5
    "promises.p_for_whom.payoffHint": "Les deux — et elle doit décider si c’est permis.",
    // B · d897f8b7f5f8
    "promises.p_vael.label": "Vael a déjà vécu ça",
    // B · 96c97c3e055b
    "promises.p_vael.seedHint": "Il reconnaît le bruit d’une aile déchirée avant même d’avoir vu la sienne.",
    // B · 46dc6c9b4aa4
    "promises.p_vael.payoffHint": "Il y a des siècles, il a refusé une fois, lui aussi. C’est peut-être lui qui écrira le mensonge dans le registre.",
    // B · 724e19699fd0
    "promises.p_dawn.label": "L’aube à la vieille cathédrale",
    // B · 40fea469568a
    "promises.p_dawn.seedHint": "Des cloches sonnent dans un clocher vide depuis quatre-vingts ans.",
    // B · ea6b9b10e442
    "promises.p_dawn.payoffHint": "Au lever du soleil, les Passeurs se rassemblent, et Sera est rentrée, ou Déchue, ou quelque chose pour quoi personne n’a de mot.",
    // A · 5bcbec8f2f13
    "endings.end_morning.name": "Le matin",
    // B · 7669a1ab00d2
    "endings.end_morning.condition": "Ils voient tous les deux le soleil se lever, et il reste des plumes à Sera. Vael referme le registre sur un mensonge — « emporté », de sa propre main — et elle doit rentrer. Doux-amer, pas une perte : ils se sont gardés en vie l’un l’autre pendant une nuit, et la dernière scène, c’est elle qui cherche comment dire au revoir.",
    // A · 8c15b4f5f80c
    "endings.end_morning.epilogue": "Le soleil se lève, doré, sur le fleuve. Vael écrit un mot à côté de ton nom et signe, sans regarder aucun de vous deux. Sera rentre à sept heures. La lumière au-dessus de ta gazinière reste allumée, et parfois, à 2 h 14, la cuisine sent la pluie.",
    // B · 2c65f18fe7ee
    "endings.end_morning.hint": "Il faudra bien que quelqu’un écrive quelque chose dans le registre.",
    // A · fb03672ec185
    "endings.end_mortal.name": "Mortelle",
    // B · 8f54e25aa316
    "endings.end_mortal.condition": "Sera a dépensé sa dernière plume pour le joueur, a choisi de rester, et se réveille humaine. La fin romantique. Elle n’a jamais eu froid, ni faim, ni sommeil, et le premier matin est plein de ces petites découvertes. Seulement si le joueur voulait qu’elle reste et le lui a dit.",
    // A · 15f3025ee0c5
    "endings.end_mortal.epilogue": "Elle se réveille sur ton canapé sous deux couvertures, en grelottant, et t’annonce très sérieusement que le froid est impoli. Ses cheveux sont juste gris, maintenant. Elle brûle le premier toast de sa vie, le mange quand même, et te demande ce qu’on fait un mardi.",
    // B · 6403a4e295ef
    "endings.end_mortal.hint": "Orin dit que ça dépend de pour qui la dernière est dépensée.",
    // A · e3cda8dcb13f
    "endings.end_ash.name": "Cendres",
    // B · 1f784618a02b
    "endings.end_ash.condition": "La dernière plume est partie, et elle n’est pas revenue. Une perte, écrite avec douceur et sans reproche : ce à quoi elle l’a dépensée comptait, et le joueur est en vie grâce à ça. Ne l’adoucis pas en survie cachée.",
    // A · afd108d316bc
    "endings.end_ash.epilogue": "Il y a un peu de cendre grise sur le carrelage de ta cuisine, en forme d’empreinte de pied mouillé. Tu ne la balaies pas pendant une semaine. La lumière au-dessus de la gazinière reste allumée, et la ville continue de ne rien savoir.",
    // A · 9a9e518d23f8
    "endings.end_ledger.name": "Le registre",
    // B · 792ce8e0615c
    "endings.end_ledger.condition": "Le joueur a ouvert la porte et suivi Vael pour que Sera puisse rentrer avec un dossier propre. Une perte, et une perte choisie. Écris-la doucement : Vael est bon, le chemin n’a rien d’effrayant, et Sera a le droit d’être furieuse contre le joueur.",
    // A · ca0beddd5d69
    "endings.end_ledger.epilogue": "Vael coche le dernier nom de la page et referme le registre. À l’aube, Sera est à la cathédrale, les ailes réparées et le dossier propre, et chaque Passeur dans la nef sait qui a payé pour ça.",
    // B · c7247c26ba33
    "endings.end_ledger.hint": "Si tu ouvres, il t’emmène.",
    // A · b26abbba2bda
    "endings.end_fallen.name": "La chute, à deux",
    // B · acc6563afd1d
    "endings.end_fallen.condition": "Le joueur a payé le prix d’Orin et brûlé la page à son nom. Ils sont tous les deux hors des livres du Ciel pour de bon — Sera déchue, le joueur rayé des registres — et ils appartiennent désormais aux endroits ouverts toute la nuit. Ni victoire ni défaite ; une nouvelle vie, sans personne pour regarder.",
    // A · 3bbcb373d17f
    "endings.end_fallen.epilogue": "Orin vous donne les deux tabourets au bout du comptoir et une clé de l’arrière-salle. Sera apprend à servir. Les nuits de pluie, d’autres Déchus descendent les marches, et elle s’assoit avec eux, et leur dit que c’est possible.",
    // B · fd594752bfe5
    "endings.end_fallen.hint": "Un nom brûlé dans son poêle ne peut pas être réécrit.",
    // A · 9ba898d6d4a9
    "endings.end_walk_away.name": "La laisser partir",
    // B · f259d3a59909
    "endings.end_walk_away.condition": "Le joueur a dit à Sera de partir, le pensait, et elle est partie. Une perte, choisie pour l’épargner. Elle s’en va avec des plumes et sa réponse inachevée. Ne la fais pas revenir dans la même scène.",
    // A · 033bc6420c77
    "endings.end_walk_away.epilogue": "Elle ne discute pas. Elle dit ton nom une fois, correctement, et sort par la fenêtre, dans la pluie. Vael ne frappe plus. Six semaines plus tard, il y a une seule plume blanche sur le rebord de ta fenêtre, sèche, un soir où il pleut depuis la tombée de la nuit.",
    // A · eeef62389394
    "archetypes.arch_fast.name": "Le pied léger",
    // B · ced004fea897
    "archetypes.arch_fast.role": "Vitesse et sang-froid",
    // A · e63bae112f6f
    "archetypes.arch_fast.summary": "Tu connais les escaliers de service, les toits et les raccourcis de cette ville, parce que tu livres partout. Quand quelque chose vient te chercher, on a du mal à t’attraper.",
    // A · 28d612c42987
    "archetypes.arch_fast.playstyle": ["Rapidité","Impossible à coincer","Un peu tête brûlée"],
    // A · 363957b640d8
    "archetypes.arch_fast.blurb": "Des livraisons à vélo six jours sur sept, et tu as déjà sauté des écarts pires que celui entre ton toit et le suivant.",
    // A · cffbefd375eb
    "archetypes.arch_talker.name": "La parole facile",
    // B · 2c19b5ff21d0
    "archetypes.arch_talker.role": "Persuasion et calme",
    // A · a6174726b516
    "archetypes.arch_talker.summary": "Bar, centre d’appels, comptoir de magasin : ça fait des années que tu convaincs des gens difficiles. Un homme poli avec un registre, c’est juste une personne difficile de plus.",
    // A · ce5855df93e8
    "archetypes.arch_talker.playstyle": ["Persuasion","Calme sous pression","Évite la bagarre"],
    // A · 5cbc2292da06
    "archetypes.arch_talker.blurb": "Tu as déjà dissuadé un ivrogne de se battre et un proprio de te mettre à la porte, et cette nuit il va te falloir les deux.",
    // A · 6100fea8dd0c
    "archetypes.arch_carer.name": "Prendre soin des autres",
    // B · 1ebd0d2391e4
    "archetypes.arch_carer.role": "Soin et endurance",
    // A · b19cb099435d
    "archetypes.arch_carer.summary": "C’est toi qu’on appelle à trois heures du matin. Tu restes, tu tiens la main, et tu sais quoi faire d’une blessure. C’est aussi pour ça que tu ne dors jamais.",
    // A · 6c0ccbfcf23a
    "archetypes.arch_carer.playstyle": ["Solidité","Protège les siens","Les autres d’abord"],
    // A · a4503d83d74f
    "archetypes.arch_carer.blurb": "Que ce soit ton métier ou pas, les gens s’appuient sur toi : c’est toujours toi qui as le double des clés de tout le monde.",
    // A · f5dae39dbc07
    "archetypes.arch_noticer.name": "Rien ne t’échappe",
    // B · 4211e4a8f960
    "archetypes.arch_noticer.role": "Observation et patience",
    // A · 44c7aab7399f
    "archetypes.arch_noticer.summary": "Tu lis les gens, les pièces et les petits caractères. Tu as remarqué que la fille dans ta cuisine était pieds nus une bonne seconde avant de remarquer les ailes.",
    // A · ad0745122417
    "archetypes.arch_noticer.playstyle": ["Œil acéré","Sait attendre","Ne paie pas de mine"],
    // A · a8cada699a5b
    "archetypes.arch_noticer.blurb": "Photo, études, gardiennage de nuit : d’une façon ou d’une autre, on te paie pour voir ce que les autres ne remarquent pas.",
    // B · 9a90810bdf05
    "setupFields.displayName.label": "Quel est le nom complet sur la carte ?",
    // B · 909cb0ff761d
    "setupFields.displayName.placeholder": "ex. Noa Castellane",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel",
    // B · 3cd1c8deaf2c
    "setupFields.archetype.label": "Tu fais quoi de tes journées, quand tu n’es pas en train de mourir ?",
    // B · f42c91debf82
    "setupFields.archetype.helpText": "Ta vie de tous les jours, qui décide de ce que tu sais faire cette nuit. C’est fixé pour toute l’histoire. Ça ne décide pas de ce que tu ressens pour Sera, de si tu ouvres la porte, ni de ce que tu la laisses dépenser pour toi — tout ça t’appartient, et tu peux changer d’avis à n’importe quel moment de la nuit.",
    // B · c6fe59fc3251
    "setupFields.worldKnowsAboutYou.label": "Qui remarquerait que tu n’es plus là ?",
    // B · 5ca3b1bec0da
    "setupFields.worldKnowsAboutYou.helpText": "La plupart des gens ont quelqu’un. C’est aussi la première chose que Vael demandera.",
    // B · 69acff29dc51
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Ma sœur, qui appelle tous les dimanches et s’en rendrait compte dès lundi.",
    // B · 30fce1e2d29b
    "setupFields.kitchen_thing.label": "Qu’est-ce que Sera remarquera en premier dans ta cuisine ?",
    // B · 8c102540b3ab
    "setupFields.kitchen_thing.helpText": "Elle n’a jamais eu à faire la conversation, et elle a des questions sur les choses ordinaires.",
    // B · 1cd05c811d3d
    "setupFields.kitchen_thing.options.the_light.label": "La lumière que tu laisses toujours allumée au-dessus de la gazinière",
    // B · bb60c3e6590c
    "setupFields.kitchen_thing.options.the_plant.label": "Une plante que tu as réussi, on ne sait comment, à garder en vie depuis cinq ans",
    // B · a3e7464c40b6
    "setupFields.kitchen_thing.options.the_photo.label": "Une photo sur le frigo de quelqu’un à qui tu ne parles plus",
    // B · 2a8c19dbbdd8
    "setupFields.kitchen_thing.options.the_letters.label": "Une pile de lettres que tu n’as pas ouvertes",
    // B · 03f4cf2822e7
    "setupFields.kitchen_thing.options.the_two_mugs.label": "Deux tasses, alors que personne ne vit avec toi",
    // B · 3ea385c7bd3d
    "setupFields.appearance.label": "Qu’est-ce que Sera remarque d’abord chez toi ?",
    // B · 39d0b886c9f8
    "setupFields.appearance.placeholder": "ex. Les cheveux en bataille, un vieux t-shirt de concert, et une cicatrice qui traverse un sourcil.",
    // A · b3f63199801f
    "opening": "2 h 14. L’heure de ta mort.\n\nTu le sais parce que la fille plantée dans ta cuisine te l’annonce, très calmement, pendant que la pluie goutte du bout de ses cheveux argentés sur ton carrelage.\n\n« Il y a quatre minutes, dit-elle. Ton cœur s’est arrêté pendant ton sommeil. On m’a envoyée pour te porter là-haut. »\n\nDerrière elle, quelque chose d’immense et de blanc est replié contre ton frigo. Une aile. Le haut est déchiré.\n\n« Je ne l’ai pas fait. »\n\nElle s’appelle Sera. Elle le dit comme si c’était la dernière chose qui lui appartenait.\n\nTrois coups lents à ta porte d’entrée.\n\nSera se fige complètement. « C’est celui qu’ils envoient quand le premier échoue. Si tu ouvres, il t’emmène. Si tu n’ouvres pas… » Elle s’arrête.\n\nQuelque chose glisse sous la porte. Une plume noire, et une carte avec ton nom complet dessus.",
    // A · 6fe27d0df803
    "openingSuggestions": ["J’attrape la main de Sera et je la tire vers la fenêtre de la chambre. « L’escalier de secours. Tu m’expliqueras en courant. »","Je ramasse la carte, je passe devant elle et j’ouvre la porte moi-même. Personne ne sera blessé dans ma cuisine à cause de moi.","Je verrouille la porte et je me tourne vers elle. « Tu as enfreint une règle pour moi. Dis-moi pourquoi. Vite. »"],
  },
});
