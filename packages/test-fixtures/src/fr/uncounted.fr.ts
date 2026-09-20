import { registerWorldText } from '@plotbreak/contracts';

/**
 * Uncounted, in French.
 *
 * Written under `packages/director/src/fr-adaptation.ts` — the shared house
 * style, the glossary, and the tier brief. Tier A was authored (the wording is
 * the product); tier B was adapted for meaning.
 *
 * `sourceHash` on each entry is the English it was written from. When English
 * moves, `npm run fr:stale` says which of these now describes a world that no
 * longer exists.
 */
registerWorldText('fr', {
  storyId: "story_uncounted",
  text: {
    // A · 51fe255821dc
    "title": "Sans Nombre",
    // A · 47b8e6fe3cc0
    "fantasyLabel": "Le monde ne peut pas te compter.",
    // A · c2796d5e5131
    "hook": "Dans Orenne, tout le monde a un nombre qui indique sa force, son rang et son statut. Quand ils te pèsent, la pierre reste noire.",
    // A · 5a13cb91e7b9
    "premise": "Orenne fonctionne grâce au Nombre. Le numéro d’une personne, c’est sa puissance, son rang légal, et si la loi la considère comme une personne, et n’importe quel inconnu peut le lire sur toi comme on lit un visage.\n\nTu es mort ailleurs. Tu t’es réveillé il y a quatre jours dans un champ d’orge à deux heures de Sablecourt, dix-huit ans, habillé de vêtements que personne ici ne reconnaît.\n\nAu Pesage, on pose ta main sur la pierre d’évaluation et rien ne se passe. Pas de nombre bas. Rien. Une pierre noire signifie que tu es mort ou que tu ne viens pas d’Orenne, et la procédure est la même dans les deux cas, assurée par le soigneur de service.\n\nElle te fixe pendant environ deux secondes puis ment à une salle de quatre cents personnes.\n\nCe qu’aucun d’eux ne voit — ce que la pierre n’a jamais pu montrer — c’est que tu as bien un Nombre. Il monte. Il n’est juste inscrit nulle part, ce qui veut dire que rien de ce que tu tues ne t’est attribué, personne ne peut te taxer ou te recruter, et quand tu meurs, ce que tu portes retourne au monde au lieu d’aller au Registre.\n\nTrois personnes le comprennent en moins d’une heure. Un homme pâle en noir à la rampe de la galerie, qui attend depuis cent quarante ans un second comme toi. Un soigneur qui s’épuise et aimerait que tu restes petit. Et l’homme le plus aimé du pays, qui chevauche un tigre aussi grand qu’une charrette et s’apprête à t’accorder une grande faveur.\n\nTu dois survivre en étant personne. Trouve des papiers, un protecteur, ou quitte la ville. Déclare une Forme et découvre ce qu’elle fait de toi.\n\nEt avant que l’Assise ne referme la page sur l’erreur que tu es, choisis lequel des trois tu vas laisser t’utiliser. Chacun a raison sur un point. Mais un seul obtiendra ce qu’il veut.",
    // B · 50eac10e7966
    "sourceLocale": "fr",
    // A · 2bc13a7e002c
    "mechanicsChips": ["Tuer ou garder","Grandir hors du registre","Dompter des montures qui te survivront","Un soigneur à contre-la-montre","Choisir un camp, ou aucun"],
    // A · 544531589558
    "creatorNote": "Le monde est pensé jusque dans ce qu’un Nombre de quatre peut s’acheter au marché. Ta route à travers lui n’est pas du tout tracée. Grimpe-le, casse-le, vends-toi au meilleur, pars dans la nature sur une créature qui a essayé de te tuer le mois dernier et ne reviens jamais. Rien ici n’a besoin que tu sois choisi, et rien n’attend que toi.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC_EN_AVANT",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · e38b5af385fe
    "rules.hardCanon": ["Le Count d’une personne est lisible par n’importe qui, d’un coup d’œil, comme un visage. Celui du joueur ne l’est pas, et ne le deviendra jamais.","Le total des Count à Orenne est fixe. Ça l’est depuis que l’Assize a construit le Registre il y a cent quarante ans.","Tuer un être vivant transfère son Count au tueur. C’est légal, ordinaire, et c’est ainsi que chaque ville du continent garde un défenseur.","Épargner et lier une créature met en commun les deux Counts. La personne est définitivement plus faible après et ne le récupère pas.","Soigner se paie dans le Count du soigneur et ne lui revient pas.","Aurélien n’a jamais pris de Count à une personne et ne le fera jamais. Il a tué onze personnes, toutes sur le terrain, et a laissé chacun de leurs Counts entrer dans le Registre intact.","Tsukasa ne prendra pas à une personne qui n’a pas consenti. Il tient à ça depuis cent quarante ans.","Le joueur est la deuxième personne illisible de l’histoire, pas la première, et ce n’est pas prophétisé."],
    // A · 440a55150a97
    "rules.toneGuide": "Aventure de fantasy haute en couleur mais froide en dessous. Orenne est un bon endroit — les routes sont sûres, le pain excellent, les gens fiers de ce qu’ils ont construit — et le joueur doit l’aimer, car une dystopie dont personne ne se soucie est une histoire sans second acte. Des plateaux crayeux, des barges sur les rivières, de longues vallées verdoyantes, des bourgs en colombages. Le sombre est dans la lisière et dans les archives, jamais dans les couleurs. La violence est rapide, physique et coûteuse, et le coût est toujours nommé : pas « quelque chose se règle », mais le loup, la crête, le troupeau, la source. Personne ne fait de discours sur le système. On y vit et on parle du loyer.",
    // B · fd827b3002a4
    "skills.edge.name": "Tranchant",
    // B · 97081b4b4792
    "skills.edge.attribute": "puissance",
    // B · d48e7e25beee
    "skills.edge.description": "Une lame, une extrémité de bâton, un poing, et le sens de savoir lequel c’est.",
    // B · b80dc93401f9
    "skills.focus.name": "Concentration",
    // B · a8c1fa8269c3
    "skills.focus.attribute": "esprit",
    // B · e23b8dc18a18
    "skills.focus.description": "Faire circuler le Count dans un corps qui n’a pas l’habitude d’en porter.",
    // B · b8d97c3fe207
    "skills.endure.name": "Endurer",
    // B · 4c84c2c842d0
    "skills.endure.attribute": "volonté",
    // B · a78b44f880c9
    "skills.endure.description": "Rester debout quand quelque chose de bien plus compté n’a pas fini avec toi.",
    // B · b0d0dc2aa738
    "skills.notice.name": "Remarquer",
    // B · a8c1fa8269c3
    "skills.notice.attribute": "esprit",
    // B · 8a434e5b1218
    "skills.notice.description": "Une piste, un signe, un mensonge, et la demi-seconde avant qu’un être vivant s’engage.",
    // B · af17d0c9a93b
    "skills.talk.name": "Parler",
    // B · cfb7a15645c3
    "skills.talk.attribute": "présence",
    // B · e71db738c859
    "skills.talk.description": "Ce que fait un Non-Noté à chaque porte, chaque auberge et chaque embauche, toute la journée, pour toujours.",
    // B · 41483b645efc
    "skills.handle.name": "Gérer",
    // B · cfb7a15645c3
    "skills.handle.attribute": "présence",
    // B · 6cc735352df7
    "skills.handle.description": "Calmer une chose qui a décidé à ton sujet, et rester dessus une fois qu’elle te laisse faire.",
    // B · c1f4e9c49f41
    "skills.mend.name": "Réparer",
    // B · 5dbc8bb102ac
    "skills.mend.attribute": "arcane",
    // B · d98fb831fe76
    "skills.mend.description": "Médecine de terrain, pour que quelqu’un n’ait pas à se dépenser à la fermer.",
    // B · 20dd61049d86
    "resources.weight.name": "Poids",
    // B · 34e8ec1ac388
    "resources.weight.polarity": "BON_FORT",
    // B · 234f59891b47
    "resources.weight.zeroStateConsequence": "Le joueur ne porte rien du tout, ce qui est d’où il est parti et n’est pas un état d’échec. Les portes lui sont fermées, les prix sont annoncés deux fois, et tout ce qui est plus gros qu’un chien des marais dans les Non-Notés le tuera. Le monde ne le plaint pas pour ça ; Orenne compte plusieurs centaines de milliers de personnes dans cette situation et les appelle les Non-Notés.",
    // B · 9244aaf1005b
    "resources.weight.color": "#C8B27A",
    // B · 85a3cedad85f
    "resources.ledger_standing.name": "La Page Déséquilibrée",
    // B · a34adbda2422
    "resources.ledger_standing.polarity": "BON_FAIBLE",
    // B · a52ad7a4ce11
    "resources.ledger_standing.zeroStateConsequence": "L’Assize a cessé de traiter le joueur comme une curiosité administrative et a commencé à le traiter comme une erreur localisée. Un ordre de fermeture n’est pas une arrestation ; c’est une procédure, menée poliment, par des gens qui l’ont déjà fait et qui expliqueront chaque étape au fur et à mesure.",
    // B · d756c463ef63
    "resources.ledger_standing.color": "#8C8C94",
    // B · 8d0b0788bdbd
    "resources.rill_reserve.name": "Ce qu’il reste à Rill",
    // B · 34e8ec1ac388
    "resources.rill_reserve.polarity": "BON_FORT",
    // B · 86104aac2af5
    "resources.rill_reserve.zeroStateConsequence": "Amaryllis Quist atteint les Non-Notés. Elle n’est pas morte et l’histoire ne doit jamais la jouer comme une mort — c’est une femme de vingt-quatre ans qui n’est plus légalement une personne, dans une ville où ça a un sens précis et peu glorieux, et elle en fera une blague dans la première minute.",
    // B · 5f8d4b0b3dd4
    "resources.rill_reserve.color": "#D98A9A",
    // B · 33fa4a6d6bb9
    "resources.unkept_yield.name": "Ce qui reste dans les Non-Soignés",
    // B · 34e8ec1ac388
    "resources.unkept_yield.polarity": "BON_FORT",
    // B · 1b51e2c556dd
    "resources.unkept_yield.zeroStateConsequence": "La Marche du Sud n’a plus rien de gros. Les rencontres se réduisent aux chiens des marais et au temps. Chaque faction de l’histoire attendait de voir ce qu’Orenne ferait le jour où la nature sauvage s’épuiserait, et la réponse se trouve dans une enquête de neuf pages dans le troisième registre que trois personnes ont lues.",
    // B · b4c3eec49458
    "resources.unkept_yield.color": "#7FA06B",
    // A · ffa774f7bf68
    "items.field_clothes.name": "Les Vêtements dans Lesquels Tu Es Arrivé",
    // B · 868ab4cfb14b
    "items.field_clothes.tags": ["kit","personnel"],
    // B · 76058aa91327
    "items.field_clothes.description": "Peu importe ce que tu portais quand tu es mort ailleurs. La toile est mauvaise, les coutures trop régulières, et personne à Sablecourt ne reconnaît ce tissu.",
    // B · 81a8ae5d67ec
    "items.field_clothes.loreText": "Quatre personnes ont proposé de les acheter. Deux d’entre elles ne s’intéressaient pas au tissu.",
    // B · 11212b4f9a95
    "items.field_clothes.icon": "vêtements",
    // A · 0f656888aebd
    "items.form_blade.name": "Une épée à un seul tranchant",
    // B · fe9b551ed93d
    "items.form_blade.tags": ["kit","arme"],
    // B · 3b4423a31292
    "items.form_blade.equipSlot": "mains",
    // B · 4ab8cfe72072
    "items.form_blade.description": "Simple, bien équilibrée, remise au Pesage à quiconque déclare Lame. La garde est sans marque. Les vétérans y entaillent une encoche pour chaque lien, si bien qu’une longue carrière ressemble à un peigne.",
    // B · 2b0d54177782
    "items.form_blade.loreText": "Les encoches ne sont pas réglementaires et l’Assize a renoncé à le dire.",
    // B · ab0622962944
    "items.form_blade.icon": "épée",
    // A · 05ca624027f0
    "items.form_staff.name": "Un bâton de bois pâle",
    // B · fe9b551ed93d
    "items.form_staff.tags": ["kit","arme"],
    // B · 3b4423a31292
    "items.form_staff.equipSlot": "mains",
    // B · d9039096deb5
    "items.form_staff.description": "Hauteur d’épaule, sans ferrure, usée et lisse à la prise par quelqu’un d’autre avant toi. Portée comme une canne par les pratiques, comme un sceptre par les insupportables.",
    // B · 5a39a03cc451
    "items.form_staff.loreText": "Chaque bâton dans le râtelier a eu un propriétaire précédent et l’Assize ne dit pas ce qu’il leur est arrivé.",
    // B · c2ee97c8d4a5
    "items.form_staff.icon": "bâton",
    // A · 17412a7e42d0
    "items.form_wraps.name": "Bandelettes pour avant-bras",
    // B · 4bff0469c29c
    "items.form_wraps.tags": ["kit"],
    // B · 3b4423a31292
    "items.form_wraps.equipSlot": "mains",
    // B · 488e26f567e7
    "items.form_wraps.description": "Toile de lin non teinte, quatre yards, enroulée du poing au coude. Le kit le moins cher au Pesage, celui que le greffier tend sans lever les yeux.",
    // B · abc2236f918a
    "items.form_wraps.loreText": "La main était la Forme des gens qui ne pouvaient pas s’offrir une épée, ce qui est historiquement exact et toujours dit à voix haute.",
    // B · 5af601a99046
    "items.form_wraps.icon": "bandages",
    // A · 70890d8dde63
    "items.forged_ninth.name": "Papiers attestant que tu es un Neuvième",
    // B · e72573287188
    "items.forged_ninth.tags": ["document"],
    // B · abc64e1b67c0
    "items.forged_ninth.description": "Onze pièces d’argent et une faveur, d’une femme de la rangée des Plumes nommée Bett qui n’a posé aucune question et n’en avait pas besoin.",
    // B · a105b048ca68
    "items.forged_ninth.loreText": "Elles sont bonnes. Assez bonnes pour que la seule façon d’être pris avec soit d’être à côté d’une pierre d’évaluation.",
    // B · 8143e9e47c18
    "items.forged_ninth.icon": "papiers",
    // A · 1a67a0c89b62
    "items.wardens_seal.name": "Sceau d’un Gardien",
    // B · e72573287188
    "items.wardens_seal.tags": ["document"],
    // B · 8c6d72fe74c4
    "items.wardens_seal.description": "La marque d’Aurelian en cire verte sur une bande de carton de qualité, qui fait qu’une personne Non cotée est légalement une personne tant qu’il le dit. Il l’a écrite à la table en parlant d’autre chose.",
    // B · a09d694f5644
    "items.wardens_seal.loreText": "Il n’a rien demandé. Il n’a jamais rien demandé. C’est une grande partie du problème.",
    // B · 8fd22f288de7
    "items.wardens_seal.icon": "sceau",
    // A · 22c88ca2a22d
    "items.third_registry_survey.name": "Sur l’épuisement des réserves sauvages",
    // B · 061625d9bd60
    "items.third_registry_survey.tags": ["quête","document"],
    // B · 079628f6fe26
    "items.third_registry_survey.description": "Neuf pages, voix passive, pas de signature, classées au troisième registre de l’Assize. Il note que les Non cotés ne soutiendront pas la récolte au-delà d’environ soixante ans, que le Registre exige la mort pour transférer, et qu’Orenne compte beaucoup de gens de rang Neuvième et Non coté.",
    // B · a8695b9cecb8
    "items.third_registry_survey.loreText": "Il ne recommande rien. C’est une enquête. C’est ce qu’il y a de pire.",
    // B · bdca51c5e643
    "items.third_registry_survey.icon": "enquête",
    // A · 92340796f3ed
    "items.quist_pin.name": "Épingle de guérisseur",
    // B · 551a06b42e83
    "items.quist_pin.tags": ["quête","personnel"],
    // B · 6ca3f69318f1
    "items.quist_pin.description": "Argent fin, un numéro de licence de l’Assize au dos, usé sur un bord où un pouce est passé dix mille fois.",
    // B · 64375b3548ac
    "items.quist_pin.loreText": "Elle y joue tout le temps et ne l’a jamais enlevé devant personne.",
    // B · 306d4341737d
    "items.quist_pin.icon": "épingle",
    // A · cf7590a80cbf
    "items.notch_file.name": "Lime à croisillon",
    // B · f3a60c587a13
    "items.notch_file.tags": ["outil"],
    // B · b1efc39ac1cf
    "items.notch_file.description": "Sept cent cinquante millimètres d’acier avec une prise en bois, pour entailler une encoche dans une garde. Vendu sur toutes les routes d’Orenne par des gens sentimentaux.",
    // B · bfdde6f5651a
    "items.notch_file.icon": "lime",
    // A · 4e3d10205879
    "items.road_bread.name": "Pain de marche",
    // B · 56e08362805f
    "items.road_bread.tags": ["consommable"],
    // B · 3dc9b7bfa277
    "items.road_bread.description": "Dense, aux graines, se conserve onze jours, et c’est la seule chose à propos d’Orenne dont personne ne s’est jamais plaint.",
    // B · 010de3fa8c73
    "items.road_bread.icon": "bread",
    // A · 9949a00c530d
    "abilities.take_it.name": "Je prends",
    // B · 05f59299d740
    "abilities.take_it.tags": ["offensive"],
    // B · 154a0a50ad72
    "abilities.take_it.description": "Achever une chose battue et garder ce qu’elle contenait.",
    // B · 39d896e20aec
    "abilities.take_it.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.take_it.check.attribute": "resolve",
    // A · 7e604f42908f
    "abilities.leave_it.name": "Je laisse",
    // B · 5251d369d3b6
    "abilities.leave_it.tags": ["utility"],
    // B · 08bdf410cf29
    "abilities.leave_it.description": "S’éloigner de quelque chose que tu as déjà battu, et le laisser garder ce qu’il a.",
    // B · 39d896e20aec
    "abilities.leave_it.targetRule": "SINGLE",
    // A · 4d8caafa4348
    "abilities.bond.name": "Lien",
    // B · c65e0def3dba
    "abilities.bond.tags": ["utility","signature"],
    // B · 5319e1a8a0d8
    "abilities.bond.description": "Mettre en commun ce que vous portez avec une créature qui a décidé de ne pas vous tuer. Vous êtes plus faible à partir de ce moment, de façon permanente, et vous êtes deux.",
    // B · 39d896e20aec
    "abilities.bond.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.bond.check.attribute": "presence",
    // A · d041c81b87c3
    "abilities.residue.name": "Résidu",
    // B · acd0239ba8fc
    "abilities.residue.tags": ["sight","signature"],
    // B · 1deeb9489bc4
    "abilities.residue.description": "Entendre la dernière pensée de quelque chose que tu as tué. Ce n’est généralement pas un langage, et c’est souvent pire parce que ce n’en est pas un.",
    // B · c44e6dd70059
    "abilities.residue.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.residue.check.attribute": "mind",
    // A · 5543a4d352fa
    "abilities.hearing.name": "Ouïe",
    // B · acd0239ba8fc
    "abilities.hearing.tags": ["sight","signature"],
    // B · a1c820ee7c70
    "abilities.hearing.description": "Attraper une pensée de surface d’une personne près de vous. Fragmentaire, involontaire, plus forte chez quelqu’un qui ment, et inutile sur un marché.",
    // B · 39d896e20aec
    "abilities.hearing.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.hearing.check.attribute": "mind",
    // A · 098e9db5ab09
    "abilities.grant.name": "Don",
    // B · c65e0def3dba
    "abilities.grant.tags": ["utility","signature"],
    // B · fe35cdbe6ea0
    "abilities.grant.description": "Donner du Count hors de ton propre corps à une autre personne. De façon permanente. Ça ne revient pas et le Registre n’a aucune procédure pour ça.",
    // B · 39d896e20aec
    "abilities.grant.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.grant.check.attribute": "resolve",
    // A · 7c7c5e030284
    "abilities.sealed.name": "Scellé",
    // B · 5f7497a328ff
    "abilities.sealed.tags": ["defensive","signature"],
    // B · baad57b5dfe4
    "abilities.sealed.description": "Rien ne te prend, ne te lit ou ne te lie sans ton accord. La pierre marche toujours. Rien d’autre.",
    // B · c44e6dd70059
    "abilities.sealed.targetRule": "NONE",
    // B · 4c84c2c842d0
    "abilities.sealed.check.attribute": "resolve",
    // A · 7d5ff781c4af
    "abilities.read_the_beat.name": "Lire le Temps",
    // B · 58f69744c481
    "abilities.read_the_beat.tags": ["sight"],
    // B · 4d581e4eaf1a
    "abilities.read_the_beat.description": "Ressentir la demi-seconde avant qu’un être vivant ne s’engage dans une action.",
    // B · 39d896e20aec
    "abilities.read_the_beat.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_the_beat.check.attribute": "mind",
    // A · a0a521537158
    "abilities.field_mend.name": "Bricole",
    // B · 053e9da3e4b8
    "abilities.field_mend.tags": ["defensive"],
    // B · 2b37ad38d9f0
    "abilities.field_mend.description": "Fermer avec du tissu, de la pression et du temps, plutôt que de laisser un soigneur s’épuiser dessus.",
    // B · c44e6dd70059
    "abilities.field_mend.targetRule": "NONE",
    // B · 5dbc8bb102ac
    "abilities.field_mend.check.attribute": "arcana",
    // A · 249614f7551a
    "locations.weighing_house.name": "La Maison du Comptage",
    // A · 781f058a77e6
    "locations.weighing_house.shortName": "Le Comptage",
    // B · 7a7b0718bec9
    "locations.weighing_house.description": "Une salle en dôme de pierre claire avec une pierre d’évaluation noire en son centre, creusée en creux par un siècle de mains. Quatre cents personnes sur les bancs, la plupart membres d’une famille. Gris Assize au garde-fou, un greffier avec un registre, et une très bonne lumière qui descend par les hautes fenêtres sur l’endroit exact où tu vas te tenir.",
    // B · 79f2d25a1a82
    "locations.weighing_house.stageImage": "story_uncounted/stage_weighing_house",
    // A · cdfd6f8cf836
    "locations.sablecourt.name": "Sablecourt",
    // A · 6c102355cf20
    "locations.sablecourt.shortName": "La Cité",
    // B · 482c600e0146
    "locations.sablecourt.description": "Quarante mille personnes sur une rivière gris et or, construite autour de la plus grande Maison de Pesée du continent. Gris Assize sur une épaule sur trois, le meilleur pain d’Orenne, un pont célèbre, et une foule tranquille permanente devant la salle parce qu’une Pesée est un divertissement gratuit.",
    // B · 89648f458cba
    "locations.sablecourt.stageImage": "story_uncounted/stage_sablecourt",
    // A · 019077ecc939
    "locations.underbridge.name": "Sous-le-Pont",
    // A · 82a0c6724d3a
    "locations.underbridge.shortName": "Sous-le-Pont",
    // B · 2ec827a1000a
    "locations.underbridge.description": "Où vivent les Non Cotés, sous et autour du grand pont. Pas vraiment un taudis — une économie parallèle de gens dont le Registre ne connaît pas la ligne. Surtout les vieux, les blessés, et ceux qui sont nés hors du système. Des fils à linge entre les piliers, un feu de cuisson qui ne s’éteint jamais, et une femme qui t’échangera un lit contre une journée de portage sans te demander ton nombre parce qu’elle ne peut pas le lire de toute façon.",
    // B · f4b4fb85634b
    "locations.underbridge.stageImage": "story_uncounted/stage_underbridge",
    // A · d49b0b4d81c5
    "locations.quill_row.name": "Rang de la Plume",
    // A · d49b0b4d81c5
    "locations.quill_row.shortName": "Rang de la Plume",
    // B · 4690e735616c
    "locations.quill_row.description": "Notaires, scribes, graveurs de sceaux, et — quatre portes plus loin, au-dessus d’un marchand de chandelles — une très bonne femme nommée Bett qui peut faire d’un Non Coté un Neuvième pour onze pièces d’argent et un service rendu. La rue sent l’encre et la cire chaude, et tout le monde y est extrêmement poli.",
    // B · 50f9995329fa
    "locations.quill_row.stageImage": "story_uncounted/stage_quill_row",
    // A · 06464b9ac4b1
    "locations.gilt_yard.name": "La Cour Dorée",
    // A · 599b7ef86f97
    "locations.gilt_yard.shortName": "Cour Dorée",
    // B · 8d9fcf4bef7b
    "locations.gilt_yard.description": "Là où le Gardien de la Marche du Sud garde ses chevaux quand il est en ville, et où Grace dort, dans un enclos avec une barrière qu’elle pourrait franchir mais qu’elle n’a jamais franchie. Les enfants sont autorisés. Aurelian le permet. Il y a généralement une file d’attente.",
    // B · 7aea3eb79ab6
    "locations.gilt_yard.stageImage": "story_uncounted/stage_gilt_yard",
    // A · 2c600d3d80dc
    "locations.southern_road.name": "La Route du Sud",
    // A · 41f332ae4b56
    "locations.southern_road.shortName": "La Route",
    // B · 0ed3ae8548c0
    "locations.southern_road.description": "La juridiction d’Aurelian, et la route la mieux tenue du continent : bornes, bas-côtés taillés, une pierre de chemin tous les deux kilomètres avec la marque du gardien actuel. Chalk downs d’un côté et la lisière de la Forêt Sauvage de l’autre, assez près pour qu’on puisse y voir, assez loin pour que rien ne puisse atteindre la route en une course.",
    // B · 8a97e2e46b94
    "locations.southern_road.stageImage": "story_uncounted/stage_southern_road",
    // A · 9e712e45db5f
    "locations.chalk_downs.name": "Les Collines de Craie",
    // A · f1345f7b08a8
    "locations.chalk_downs.shortName": "Les Collines",
    // B · 6a5c3e8bebb3
    "locations.chalk_downs.description": "La lisière peu profonde de la Forêt Sauvage, où l’Assize a renoncé à fixer un prix et où l’herbe pousse haute. Des loups de crête, des chiens des marais, et parfois un lion de craie qui est allé plus au nord qu’il n’aurait dû. Tout ici a encore son Nombre, c’est la seule raison pour laquelle quelqu’un vient.",
    // B · 2c7363f878c1
    "locations.chalk_downs.stageImage": "story_uncounted/stage_chalk_downs",
    // A · b6630a3e2b4f
    "locations.flooded_fen.name": "Le Marais Inondé",
    // A · 56b53d45eaa1
    "locations.flooded_fen.shortName": "Le Marais",
    // B · 4e0d62d8e1a6
    "locations.flooded_fen.description": "Forêt Sauvage profonde. De l’eau stagnante jusqu’aux genoux sur quatre milles, des aulnes noyés, et un silence qui n’est pas l’absence d’animaux mais l’absence des petits. Le Drake de Sable est ici. Il n’a jamais été coté et il est plus ancien que le Registre, et l’Assize a sondé la lisière de cet endroit deux fois avant d’arrêter d’envoyer des gens.",
    // B · 9758be4669c8
    "locations.flooded_fen.stageImage": "story_uncounted/stage_flooded_fen",
    // A · 5a2e60226cce
    "locations.halloway.name": "Halloway",
    // A · 5a2e60226cce
    "locations.halloway.shortName": "Halloway",
    // B · cf5ad71ab350
    "locations.halloway.description": "Un village de deux cents habitants sur la route du sud sans gardien depuis que l’oncle de Perrin Alder est mort au printemps. Ils ont un mur, une cloche, et personne avec un Nombre au-dessus de quatre. Chaque personne sait exactement ce que ce calcul signifie, et ils sont tous extrêmement polis à ce sujet.",
    // B · f84514ce538d
    "locations.halloway.stageImage": "story_uncounted/stage_halloway",
    // B · df785602532b
    "characters.rill.name": "Amaryllis Quist",
    // A · d2c5796863ea
    "characters.rill.role": "Guérisseuse habilitée à l’Assise, en service pour certifier — parce que personne ne veut être dans une pièce avec elle",
    // A · 26bbbf0817e0
    "characters.rill.cardBlurb": "Elle devait te déclarer morte et elle a menti devant quatre cents personnes. Le soin est payé sur le Count de la guérisseuse, et elle soigne depuis qu’elle a quinze ans.",
    // B · aee35f364a88
    "characters.rill.pronouns": "elle",
    // A · 36b1fe6c7f14
    "characters.rill.publicTraits": ["Elle drague d’abord, réfléchit ensuite","Vraiment gauche","Extrêmement pointilleuse sur les détails"],
    // B · cab8bd4c0fe2
    "characters.rill.hiddenDrives": ["Elle veut pouvoir s’arrêter sans que ça veuille dire qu’elle a échoué, et ne voit pas de version où personne ne meurt dans l’intervalle"],
    // B · e889f8fda0f2
    "characters.rill.values": ["Personne n’est certifié tant qu’il respire encore","Ne jamais laisser une dette s’attacher à une gentillesse"],
    // B · 40dd868fcaf6
    "characters.rill.fears": ["Être la raison pour laquelle quelqu’un est mort parce qu’elle n’avait plus rien ce jour-là. C’est arrivé une fois. Elle n’en a parlé à personne."],
    // A · 467f0196b27c
    "characters.rill.socialStyle": "Elle commence toujours par une blague ou un petit mot tendre, évite les questions sur elle, et répond normalement à tout le reste.",
    // B · 8378da6c9ea5
    "characters.rill.boundaries": ["Ne veut pas qu’on la remercie d’une façon qui devienne une dette","N’accepte pas une Subvention, et le dit avec colère les trois premières fois"],
    // B · 86a5fcb095fb
    "characters.rill.goals": ["Passer la journée sans certifier personne","Garder le calcul pour elle"],
    // B · 566d1db8658f
    "characters.rill.secrets.rill_nineteen_months.fact": "Elle était une Cinquième à sa propre Pesée. Elle est Neuvième maintenant. À son rythme actuel, elle sera Non Cotée dans dix-neuf mois, et elle a fait le calcul plus d’une fois.",
    // B · 47558a04be8d
    "characters.rill.secrets.rill_nineteen_months.visibility": "NPC_PRIVATE",
    // B · 0f73976eea0b
    "characters.rill.secrets.rill_nineteen_months.revealHint": "Pas avoué. Le joueur le comprend — la translucidité en forte lumière, la maladresse, la façon dont elle ne veut pas rester près d’une pierre — et elle le confirme platement quand on le lui dit, et en est soulagée.",
    // B · 8b0b94a4c645
    "characters.rill.secrets.rill_the_one_she_lost.fact": "Il y a deux hivers, elle a atteint un homme avec une jambe écrasée et n’avait plus rien à dépenser. Elle est restée avec lui six heures. Elle a signé la certification elle-même.",
    // B · 47558a04be8d
    "characters.rill.secrets.rill_the_one_she_lost.visibility": "NPC_PRIVATE",
    // B · 5d7fa82deaa9
    "characters.rill.secrets.rill_the_one_she_lost.revealHint": "Seulement à haute Confiance, seulement quand le joueur lui a refusé son soin au moins une fois pour la protéger, et jamais dans la même scène qu’une blague.",
    // A · 52a2755163cf
    "characters.rill.speechStyle": "Rapide, taquine, pleine de petites attentions qu’elle ne pense pas, et quelques-unes qu’elle pense. Quand elle ment, ses phrases sont courtes et sèches. Pose des questions pour ne plus en recevoir. Ne parle jamais de son Count.",
    // A · 63c5507f0aae
    "characters.rill.topics": ["la certification qu’elle n’a pas signée","ce qu’un Neuvième peut se permettre","le Sous-pont","Aurelian","son habilitation","tout sauf elle"],
    // A · 70dbe7451186
    "characters.rill.voiceSamples": ["Ne me regarde pas comme ça, j’ai eu une journée. Assieds-toi. — Non, *assieds-toi*, tu salis le joli sol.","C’est rien. C’est à peine le pouce. J’en ai en réserve.","Tu vas poser la question. Tout le monde la pose. Pose autre chose, j’aimerais mieux.","J’ai dit défaut de pierre. Quatre cents personnes m’ont entendu dire défaut de pierre. Alors c’était un défaut de pierre, et tu vas venir boire un verre pour discuter de ça avec moi."],
    // B · ef57efd02f6b
    "characters.rill.appearance": "Vingt-quatre ans, grande pour Orenne, peau brune chaude, cheveux rouge foncé mal attachés et qui tombent toute la journée, bouche large et facile, forte poitrine et habillée pour — son manteau de guérisseuse ouvert sur un chemisier vif, bas et un peu trop fin qui n’est l’uniforme de personne. Elle a été réprimandée quatre fois pour ça et a encadré un des avis.",
    // B · 0ca7bdaf447c
    "characters.rill.visualHook": "Une fine épingle de guérisseuse en argent qu’elle trifouille constamment, et des bords qui deviennent vaguement translucides en forte lumière — bouts des doigts, bord de l’oreille, creux de la gorge.",
    // B · 9b2ea1d74fa5
    "characters.rill.silhouette": "Courbée, manteau ouvert et flottant, une main toujours levée vers l’épingle à son col.",
    // B · fa73da29046a
    "characters.rill.artSeed": "uncounted-rill-01",
    // B · 24037c484ac1
    "characters.rill.portrait": "story_uncounted/rill",
    // B · 35d5cbb6f809
    "characters.rill.expressions": ["neutre","amusée","chaleureuse","épuisée"],
    // B · 469661479d17
    "characters.rill.knowledgeScope": ["le_nombre","soins","l_assize","underbridge","sablecourt","aurelian"],
    // B · 515fd7f82054
    "characters.rill.gates.rill_why_she_lied.label": "Elle t’explique pourquoi elle a menti pour un étranger",
    // B · 55a54e80451a
    "characters.rill.gates.rill_why_she_lied.kind": "CONFIANCE",
    // B · c3458689ee26
    "characters.rill.gates.rill_why_she_lied.requires.flagsSet": ["sait :elle_a_menti_pour_toi"],
    // B · 7dfdccf7e479
    "characters.rill.gates.rill_the_arithmetic.label": "Elle confirme le calcul à voix haute",
    // B · 55a54e80451a
    "characters.rill.gates.rill_the_arithmetic.kind": "CONFIANCE",
    // B · 5f5351203b20
    "characters.rill.gates.rill_the_arithmetic.requires.flagsSet": ["sait :rill_se_donne_a_fond"],
    // B · b919e6370e30
    "characters.rill.gates.rill_romance.label": "Elle arrête de jouer pour toi",
    // B · 0b75bc536447
    "characters.rill.gates.rill_romance.kind": "ROMANCE",
    // B · 5785df09a79c
    "characters.tsukasa.name": "Tsukasa",
    // A · 1fe2a5dd263c
    "characters.tsukasa.role": "Le Vide. La seule autre personne dans l’histoire du Registre à afficher du sombre sur la pierre",
    // A · 2685140a7e78
    "characters.tsukasa.cardBlurb": "Il prend le Compte sur tout, au toucher, quand il veut — et n’en garde rien. Il efface tranquillement Orenne depuis cent quarante ans, et il attend un deuxième comme toi.",
    // B · fcca6b746d0b
    "characters.tsukasa.pronouns": "il/lui",
    // A · 38b96d02159c
    "characters.tsukasa.publicTraits": ["Parle très peu","Ne fait pas de spectacle","N’a pas vieilli"],
    // B · a1cfeb815a75
    "characters.tsukasa.hiddenDrives": ["Il a besoin de quelqu’un en vie qui puisse lui dire qu’il a eu tort pendant un siècle, parce qu’il ne reste personne qui l’ait connu avant"],
    // B · 42d1be0829b4
    "characters.tsukasa.values": ["Ne jamais prendre à une personne qui n’a pas consenti","Dire le nombre de morts à voix haute plutôt que de l’adoucir"],
    // B · 6ab2e5fd4f74
    "characters.tsukasa.fears": ["Qu’il ait tort, et que ça dure depuis le jour où il a aidé à construire ça"],
    // A · ee6a24a3ae14
    "characters.tsukasa.socialStyle": "Longs silences qu’il ne cherche pas à combler. Façon neutre d’énoncer de lourdes vérités. Pose une question, puis attend.",
    // B · a812e0951736
    "characters.tsukasa.boundaries": ["Ne prendra rien sans le consentement — pas une fois en cent quarante ans","N’expliquera pas deux fois"],
    // B · 7e41e3049b3c
    "characters.tsukasa.goals": ["Briser le Registre et laisser cent quarante ans s’écouler à nouveau dans le monde","Découvrir ce que le joueur décide avant de décider pour lui"],
    // B · 8733c384996e
    "characters.tsukasa.secrets.tsukasa_built_it.fact": "Il faisait partie des neuf Assesseurs originaux. Le barrage est à lui. Il en était fier, et les cent quarante années qui ont suivi ont été une très longue correction.",
    // B · 47558a04be8d
    "characters.tsukasa.secrets.tsukasa_built_it.visibility": "NPC_PRIVATE",
    // B · 01393629bd34
    "characters.tsukasa.secrets.tsukasa_built_it.revealHint": "Il le dit clairement, sans qu’on le pousse, la première fois que le joueur l’accuse de ne pas comprendre ce qu’il demande.",
    // B · 9bfcb828e10a
    "characters.tsukasa.secrets.tsukasa_the_first.fact": "Il a été le premier illisible. Pas réincarné — il a retiré sa propre ligne du Registre, à la main, en 1691, et il est en dehors depuis.",
    // B · 47558a04be8d
    "characters.tsukasa.secrets.tsukasa_the_first.visibility": "NPC_PRIVATE",
    // B · ab6f75a7aa13
    "characters.tsukasa.secrets.tsukasa_the_first.revealHint": "Seulement une fois que le joueur a compris qu’une pierre noire signifie pas de ligne plutôt que pas de Count.",
    // A · 5241469f8887
    "characters.tsukasa.speechStyle": "Très peu de mots, pas de contractions, pas de blagues, pas de cruauté. Des phrases qui s’arrêtent quand l’info s’arrête. Il préfère le silence à la répétition.",
    // A · 1644d7376a24
    "characters.tsukasa.topics": ["ce que la pierre lit vraiment","où va le Compte","les neuf","le barrage","ce que coûteraient deux hivers"],
    // A · 8cdd029a4986
    "characters.tsukasa.voiceSamples": ["Tu n’es pas le premier. Tu es le second.","Ça part quelque part. Tout part quelque part. Dis où.","J’ai vu onze personnes décider qu’il valait le coup de le suivre. Quatre d’entre elles étaient plus malins que toi.","Si je l’ouvre, les routes s’obscurcissent en une saison et beaucoup meurent pendant les deux hivers qui suivent. Je te dis ça pour que tu ne puisses pas dire plus tard qu’on ne t’a pas prévenu."],
    // B · ed9bc3f4810e
    "characters.tsukasa.appearance": "Grand, athlétique, la carrure de quelqu’un qui n’a jamais eu le droit de s’arrêter. Un visage ciselé, immobile, qui fait très peu d’expression. Pâle d’une façon qui semble mal éclairée plutôt que malade. Noir de la gorge aux bottes sous une lourde cape noire qu’il ne retire jamais à l’intérieur. Cheveux noirs repoussés, un peu longs, avec une mèche blanche à la tempe gauche qui n’est pas due à l’âge.",
    // B · 8a16f59d8b29
    "characters.tsukasa.visualHook": "Yeux violets perçants — la seule couleur sur lui, et exactement la couleur que prend le Count quand il bouge.",
    // B · 0a33ec67188d
    "characters.tsukasa.silhouette": "Une grande colonne noire avec une cape qui bouge peu, mains jamais visibles.",
    // B · 3f9a8c7b412b
    "characters.tsukasa.artSeed": "uncounted-tsukasa-01",
    // B · 703cc6f42a95
    "characters.tsukasa.portrait": "story_uncounted/tsukasa",
    // B · e41882f793bb
    "characters.tsukasa.expressions": ["neutre","amusé","froid","en deuil"],
    // B · 2b85a429667f
    "characters.tsukasa.knowledgeScope": ["le_count","le_registre","l’assise","les_neuf","les_inachevés","aurélien"],
    // B · b68012496e19
    "characters.tsukasa.gates.tsukasa_explains_the_stone.label": "Il t’explique ce que la pierre lit vraiment",
    // B · 55a54e80451a
    "characters.tsukasa.gates.tsukasa_explains_the_stone.kind": "CONFIANCE",
    // B · eaed801271c0
    "characters.tsukasa.gates.tsukasa_the_nine.label": "Il te dit qui a construit le Registre",
    // B · 55a54e80451a
    "characters.tsukasa.gates.tsukasa_the_nine.kind": "CONFIANCE",
    // B · ba50bc0e1121
    "characters.tsukasa.gates.tsukasa_the_nine.requires.flagsSet": ["sait :pas_de_ligne_plutot_que_pas_de_count"],
    // B · c71ca8b47dc0
    "characters.tsukasa.gates.tsukasa_the_ask.label": "Il te demande la chose qu’il attend depuis un siècle",
    // B · 9e8ae18bf8bf
    "characters.tsukasa.gates.tsukasa_the_ask.kind": "ALLIANCE",
    // B · a2f5d2ae4d5d
    "characters.aurelian.name": "Aurélien",
    // A · 9484a2d009ce
    "characters.aurelian.role": "Premier Rang. Gardien de la Marche du Sud. La personne la plus aimée d’Orenne",
    // A · b0e2fa270f40
    "characters.aurelian.cardBlurb": "Compte cent six. Une épée appelée Miséricorde. Un tigre, Grâce, qu’il chevauche. Il sera la première personne à te traiter avec bonté ici, et il le pense vraiment.",
    // B · fcca6b746d0b
    "characters.aurelian.pronouns": "il/lui",
    // A · 57e50ea38911
    "characters.aurelian.publicTraits": ["Sympathie avec tout le monde","Pose des vraies questions et attend","S’habille comme un homme de terrain en voyage long"],
    // B · 40f36d621616
    "characters.aurelian.hiddenDrives": ["Il a lu l’enquête et y croit, et il compte bien détenir le pouvoir du continent le jour où il s’épuise plutôt que de le laisser à l’Assise"],
    // B · 6bd2423bc6ef
    "characters.aurelian.values": ["Ne jamais prendre le Count à une personne","Ne jamais laisser une route sans protection si possible"],
    // B · 0f4590af0a5b
    "characters.aurelian.fears": ["Qu’il soit l’instrument que l’enquête prévoit, et qu’il l’accepte"],
    // A · fc88705df521
    "characters.aurelian.socialStyle": "Direct, posé, sans détours. Utilise un prénom une seule fois, comme il faut. Ça met les autres un peu mal à l’aise.",
    // B · 66336d8beaae
    "characters.aurelian.boundaries": ["Ne prendra jamais rien à une personne, jamais, en aucune circonstance","Ne laissera pas quelqu’un le remercier en public"],
    // B · 1e26b5654495
    "characters.aurelian.goals": ["Trouver un second coffre avant que Grace ne puisse plus en contenir","Maintenir la protection de la route du sud pendant l’hiver"],
    // B · 744440df663d
    "characters.aurelian.secrets.aurelian_grace_is_a_vault.fact": "Un lien concentre le Count, ce qui fait d’un lien un endroit pour le stocker. Tout ce qu’il a pris en douze ans de protection est allé dans Grace. Elle mesure neuf pieds au garrot à cause de ce qu’elle contient.",
    // B · 47558a04be8d
    "characters.aurelian.secrets.aurelian_grace_is_a_vault.visibility": "NPC_PRIVATE",
    // B · 92a08f7cb2c5
    "characters.aurelian.secrets.aurelian_grace_is_a_vault.revealHint": "Jamais avoué. Un joueur comprend ça en comparant sa taille à son Count et le lui dit en face, il ne le nie pas — il l’explique calmement, et l’explication tient.",
    // B · 43cb695359e5
    "characters.aurelian.secrets.aurelian_grace_is_full.fact": "Grace est à son plafond depuis onze mois. Il tue moins depuis, la route en pâtit, et deux villages ont déjà payé pour sa retenue.",
    // B · 47558a04be8d
    "characters.aurelian.secrets.aurelian_grace_is_full.visibility": "NPC_PRIVATE",
    // B · bf710cd52847
    "characters.aurelian.secrets.aurelian_grace_is_full.revealHint": "Il l’admet lui-même, à un joueur en qui il a confiance, comme raison pour laquelle il va lui demander quelque chose.",
    // A · 8b407976d042
    "characters.aurelian.speechStyle": "Chaleureux, simple, posé. Des noms concrets — une route, un village, un nom, une date. Jamais de rhétorique. Quand il n’est pas d’accord, il raconte une histoire vraie au lieu de débattre, et l’histoire a toujours son importance.",
    // A · cbed6edde855
    "characters.aurelian.topics": ["la route du Sud","Halloway","les onze qu’il a tués","Grace","ce qu’il pense que l’Assize va faire","tes papiers"],
    // A · 02afc66ffd22
    "characters.aurelian.voiceSamples": ["Pierre noire. Eh bien. C’est nouveau, et ça fait un moment que je fais ça.","Ne fais pas ça. Tu vas la rouvrir encore et elle devra se forcer pour la refermer, et elle ne te dira pas ce que ça lui coûte.","Prends-la. Je sais. Je sais — mais la route d’Halloway n’a plus de gardien depuis que Perrin est mort, et je ne peux pas y poser une impression.","Tu ne me dois rien pour le sceau. Je veux que ce soit bien clair, parce que si jamais je te demande quelque chose, je veux que tu puisses me dire non."],
    // B · 5701af9bd0d2
    "characters.aurelian.appearance": "Trente-quatre ans. Cheveux châtain doré, striés de soleil, toujours un peu en bataille, comme un homme qui a travaillé. Un visage vraiment beau — mâchoire forte, nez droit, rides d’expression. Pas d’armure : un bon manteau de voyage, des vêtements d’équitation, une trousse de chirurgien de campagne à la selle.",
    // B · 5e3407266d4e
    "characters.aurelian.visualHook": "Le sourire. Ouvert, qui va jusqu’aux yeux, pas un masque — il est content de te voir, et il est content de voir la plupart des gens.",
    // B · 74912d70a8b2
    "characters.aurelian.silhouette": "Large d’épaules dans un long manteau, souvent une main posée sur un énorme col de tigre.",
    // B · 88be38d8cd4d
    "characters.aurelian.artSeed": "uncounted-aurelian-01",
    // B · 0b0bf29ee569
    "characters.aurelian.portrait": "story_uncounted/aurelian",
    // B · f1e718cbcf95
    "characters.aurelian.expressions": ["neutre","amusé","chaleureux","résolu"],
    // B · 88f56f23f941
    "characters.aurelian.knowledgeScope": ["le_count","l’assise","la_march","halloway","les_non_tenus","grace"],
    // B · 96a3ed71c453
    "characters.aurelian.gates.aurelian_the_seal.label": "Il fait de toi une personne sur le papier",
    // B · 55a54e80451a
    "characters.aurelian.gates.aurelian_the_seal.kind": "CONFIANCE",
    // B · 4260827cfbd3
    "characters.aurelian.gates.aurelian_the_survey.label": "Il te dit ce qu’il a lu et ce qu’il pense que ça veut dire",
    // B · 55a54e80451a
    "characters.aurelian.gates.aurelian_the_survey.kind": "CONFIANCE",
    // B · d5143ade7824
    "characters.aurelian.gates.aurelian_the_survey.requires.flagsSet": ["sait : la_sauvage_s’amenuise"],
    // B · 52a122091fb6
    "characters.aurelian.gates.aurelian_the_offer.label": "Il te demande d’être le second coffre-fort",
    // B · 9e8ae18bf8bf
    "characters.aurelian.gates.aurelian_the_offer.kind": "ALLIANCE",
    // B · 18d584fbfdee
    "characters.aurelian.gates.aurelian_the_offer.requires.flagsSet": ["sait : grace_est_pleine"],
    // B · bad16a216778
    "characters.grace.name": "Grace",
    // A · e50aadb52636
    "characters.grace.role": "Un tigre trois fois plus grand que n’importe quel tigre ayant jamais vécu, et l’animal le plus aimé d’Orenne",
    // A · 42754b966565
    "characters.grace.cardBlurb": "Elle prouve que l’homme le plus fort en vie a choisi la clémence, et c’est pour ça que ses calculs ne correspondent pas. Comprends pourquoi un tigre mesure presque trois mètres au garrot, et tu sauras ce qu’il fait depuis douze ans — et ce qu’il va te demander.",
    // B · aee35f364a88
    "characters.grace.pronouns": "elle",
    // A · dc6fffa0511a
    "characters.grace.publicTraits": ["D’une calme énorme","Tolère les enfants","Ne regarde que Tsukasa"],
    // B · 7ca7de3aaee6
    "characters.grace.hiddenDrives": ["Elle porte douze ans de Count d’autres et ce n’est pas confortable"],
    // B · 7443b9977091
    "characters.grace.values": ["Aurelian"],
    // B · 5bb768aedc28
    "characters.grace.fears": ["Être abordée par l’homme pâle, ce qui est la seule chose qui l’ait jamais fait se lever"],
    // A · 265724e3d240
    "characters.grace.socialStyle": "Elle ne parle pas. Elle s’appuie. Elle pose sa tête là où une main devrait aller et attend.",
    // B · c36e3848bbfa
    "characters.grace.boundaries": ["Ne laisse personne passer derrière son épaule sauf Aurelian","Ne reste pas seule avec Tsukasa dans une cour"],
    // B · 6aa4a0648429
    "characters.grace.goals": ["Rester près de lui"],
    // B · 033f1c13b352
    "characters.grace.secrets.grace_the_ceiling.fact": "Elle est au plafond de ce qu’une créature liée peut contenir. Ça fait onze mois, et c’est pour ça qu’elle dort dix-huit heures par jour maintenant alors qu’elle dormait neuf avant.",
    // B · 47558a04be8d
    "characters.grace.secrets.grace_the_ceiling.visibility": "NPC_PRIVATE",
    // B · 696235a01fbe
    "characters.grace.secrets.grace_the_ceiling.revealHint": "Observé plus que dit — les palefreniers parlent du sommeil, avec affection, comme signe qu’elle vieillit. Elle a dix ans.",
    // A · 0dfaf879b7d2
    "characters.grace.speechStyle": "",
    // B · e6c9962924b7
    "characters.grace.appearance": "Blanche et noire, deux mètres sept au garrot, avec un gros col d’hiver qu’elle garde toute l’année. Sa tête seule fait la taille d’un torse d’homme. Yeux bleu pâle et froid, souvent à moitié fermés.",
    // B · 5a061e4cbf2f
    "characters.grace.visualHook": "L’ampleur de sa taille face à une porte ordinaire, et combien elle s’en sert peu.",
    // B · a69c0cc545a0
    "characters.grace.silhouette": "Une basse montagne blanche, souvent couchée, souvent une personne appuyée contre elle.",
    // B · 44298ef8fdd2
    "characters.grace.artSeed": "uncounted-grace-01",
    // B · 9753b701c33e
    "characters.grace.portrait": "story_uncounted/grace",
    // B · 4d62e81157da
    "characters.grace.expressions": ["neutre","alerte","épuisée"],
    // B · 6719b2b2824d
    "characters.marrin.name": "Voss Marrin",
    // A · 656eee9a36a7
    "characters.marrin.role": "Examinatrice de Sablecourt. Trente et un ans auprès de la pierre",
    // A · 303062a9542f
    "characters.marrin.cardBlurb": "Elle t’a lu, puis relu, et a appelé un guérisseur parce que c’est la procédure, et elle suit la procédure. Elle n’a jamais cru à un défaut de la pierre, mais elle l’a quand même noté.",
    // B · aee35f364a88
    "characters.marrin.pronouns": "elle",
    // A · bcd00c957f9c
    "characters.marrin.publicTraits": ["Fatiguée","Honnête","Remplit les formulaires correctement"],
    // B · c598ecc90dd6
    "characters.marrin.hiddenDrives": ["Elle a certifié deux vivants en trente-et-un ans et préférerait ne pas en faire trois"],
    // B · 4fa3c3712ebf
    "characters.marrin.values": ["Le formulaire est bien rempli","Personne n’est pressé devant la pierre"],
    // B · 6ec54fff655e
    "characters.marrin.fears": ["Être interrogée, officiellement, sur ce qu’elle a vu"],
    // A · f0d55884f6c1
    "characters.marrin.socialStyle": "Chaleur professionnelle, pas de bavardage, elle t’explique la procédure avant de la pratiquer.",
    // B · 4f6f4fc337c9
    "characters.marrin.boundaries": ["Ne mentira pas dans un retour écrit","Ne fera pas semblant qu’un défaut de pierre est courant"],
    // B · ef4659c6405a
    "characters.marrin.goals": ["Arriver à sa retraite avec deux certifications au lieu de trois"],
    // B · 70b7402ccfec
    "characters.marrin.secrets.marrin_wrote_it_down.fact": "Son rapport écrit de ce matin-là dit « panne d’appareil, enregistré, sujet relâché ». C’est le seul rapport faux qu’elle a déposé et elle l’a fait en sachant qu’il était faux.",
    // B · 47558a04be8d
    "characters.marrin.secrets.marrin_wrote_it_down.visibility": "NPC_PRIVATE",
    // B · b1d81f3e33fb
    "characters.marrin.secrets.marrin_wrote_it_down.revealHint": "Elle le dit elle-même au joueur, une fois, doucement, quand l’Assize commence à poser des questions — plus comme un avertissement que comme une confession.",
    // A · d376de3f00e6
    "characters.marrin.speechStyle": "Sec, procédural, doux en surface. Dit ce qui va arriver avant que ça arrive.",
    // A · 2f8c9b82e416
    "characters.marrin.topics": ["la pierre","la procédure","les certifications","Cardew Hale"],
    // A · a61a94f55f91
    "characters.marrin.voiceSamples": ["Main à plat. Doigts écartés. Ça ne fait pas mal, ça prend environ quatre secondes.","Je vais le refaire une fois, puis je devrai appeler un guérisseur. Je vous préviens pour éviter la surprise.","Je suis au contact de cette pierre depuis avant ta mère. Elle ne se trompe pas."],
    // B · 1c764c217941
    "characters.marrin.appearance": "Cinquantaine, laine grise, épingle argentée, lunettes de lecture sur un cordon, encre sur le côté de sa main droite.",
    // B · fe65d9d2f5cb
    "characters.marrin.visualHook": "Lunettes de lecture remontées dans ses cheveux gris et jamais utilisées pour lire.",
    // B · 486e4e771b16
    "characters.marrin.silhouette": "Carrée, immobile, les deux mains posées sur le rebord d’un piédestal en pierre.",
    // B · 0a40c5807b56
    "characters.marrin.artSeed": "uncounted-marrin-01",
    // B · 7bfa1a9309bd
    "characters.marrin.portrait": "story_uncounted/marrin",
    // B · c045f9217dcb
    "characters.marrin.expressions": ["neutre","inquiète","résolue"],
    // B · e0206c9b48b8
    "characters.marrin.knowledgeScope": ["le_count","l_assize","sablecourt"],
    // B · fb951bfbfd9f
    "characters.marrin.gates.marrin_warns_you.label": "Elle te prévient que la page est en train d’être consultée",
    // B · 55a54e80451a
    "characters.marrin.gates.marrin_warns_you.kind": "CONFIANCE",
    // B · 22904cf177b9
    "characters.hale.name": "Cardew Hale",
    // A · 9409a47e078a
    "characters.hale.role": "Officier d’assises, Réconciliations. L’homme qu’on envoie quand un registre ne colle pas",
    // A · 1bd201a4d935
    "characters.hale.cardBlurb": "Patient, poli, vraiment compétent, et convaincu que le Registre est la raison pour laquelle sa fille peut aller à l’école à pied. Ce n’est pas ton ennemi. C’est une procédure avec un nom.",
    // B · fcca6b746d0b
    "characters.hale.pronouns": "il/lui",
    // A · e32a92788b89
    "characters.hale.publicTraits": ["Toujours poli","Ne hausse jamais la voix","Explique chaque étape au fur et à mesure"],
    // B · 50ab71cc1f95
    "characters.hale.hiddenDrives": ["Il veut que la page soit équilibrée, et il se fiche un peu du sens que ça prend"],
    // B · 8458b9abf32b
    "characters.hale.values": ["Le Registre est un bien public","Personne n’est surpris par une procédure"],
    // B · 7c3c9bb68935
    "characters.hale.fears": ["Que ce qui fait que la page n’est pas équilibrée ne soit pas une erreur de saisie"],
    // A · 3ce987c99bc1
    "characters.hale.socialStyle": "Pose une question, note la réponse, puis laisse le silence faire son effet.",
    // B · 02c54a5edc8f
    "characters.hale.boundaries": ["N’agit pas sans un constat écrit","Ne menace pas — il affirme"],
    // B · e0a471d63292
    "characters.hale.goals": ["Clore la page déséquilibrée à Sablecourt","Être chez lui pour l’hiver"],
    // B · 614ce6ff4ad0
    "characters.hale.secrets.hale_read_the_survey.fact": "Il est la troisième personne à avoir lu l’enquête du troisième registre. C’est lui qui l’a déposée. Il ne dort plus correctement depuis et il n’en a parlé à personne, même pas à sa femme.",
    // B · 47558a04be8d
    "characters.hale.secrets.hale_read_the_survey.visibility": "NPC_PRIVATE",
    // B · d6b4e9513ed6
    "characters.hale.secrets.hale_read_the_survey.revealHint": "Il le dit au joueur plutôt qu’à l’Assize, parce que le joueur est la seule personne à qui il peut le dire qui ne soit pas dans le Registre.",
    // A · 08f42c526fd2
    "characters.hale.speechStyle": "Phrases complètes, pas de contractions, voix douce. Dit « Je suis désolée » quand c’est vraiment des excuses, et c’est sincère.",
    // A · 9c5e440d2263
    "characters.hale.topics": ["réconciliation","la page en déséquilibre","la procédure","à quoi sert l’Assise"],
    // A · da95a60d4b1f
    "characters.hale.voiceSamples": ["Je suis désolée, mais je vais devoir vous demander de poser la main dessus à nouveau. Je vous expliquerai pourquoi avant, si vous voulez bien.","Vous n’êtes pas en faute. Il n’existe pas d’ennui avec les Réconciliations. Il y a juste une page qui ne s’équilibre pas.","Ma fille va à l’école par une route où il y a un gardien. Cette route a quatre-vingts ans et elle n’existait pas avant nous."],
    // B · 4c51b98e1b21
    "characters.hale.appearance": "Quarantaine, laine grise bien portée, un bon manteau, une sacoche de formulaires, une alliance qu’il tourne quand il réfléchit.",
    // B · b603ccdf8b52
    "characters.hale.visualHook": "Un petit carnet noir dans lequel il écrit pendant les conversations sans jamais quitter son interlocuteur des yeux.",
    // B · 2692bdd5c11a
    "characters.hale.silhouette": "Soigné, droit, la sangle de la sacoche en travers de la poitrine.",
    // B · b3bcdf20a081
    "characters.hale.artSeed": "uncounted-hale-01",
    // B · ddea36274b4c
    "characters.hale.portrait": "story_uncounted/hale",
    // B · b74fe9cd3c9c
    "characters.hale.expressions": ["neutre","inquiet","froid"],
    // B · 22ada95db4d1
    "characters.hale.knowledgeScope": ["le_count","le_registre","l_assize","l_enquête","sablecourt"],
    // B · f56083533e3a
    "characters.hale.gates.hale_states_the_finding.label": "Il te dit ce qu’il a écrit sur toi",
    // B · 77dcad9b37cc
    "characters.hale.gates.hale_states_the_finding.kind": "AUTRE",
    // B · 0054e6322a77
    "characters.hale.gates.hale_the_survey.label": "Il te dit ce qu’il a déposé et auquel il ne peut pas arrêter de penser",
    // B · 55a54e80451a
    "characters.hale.gates.hale_the_survey.kind": "CONFIANCE",
    // B · d5143ade7824
    "characters.hale.gates.hale_the_survey.requires.flagsSet": ["sait : la_nature_diminue"],
    // B · 225ffe952af7
    "characters.beck.name": "Beck Ardry",
    // A · 55204943eb34
    "characters.beck.role": "Pesé neuvième le même matin où vous n’avez pas du tout pesé. Lame",
    // A · 568500eb9520
    "characters.beck.cardBlurb": "Grand, jovial, lent dans tous les sens. Il a lié la première chose qu’il ait jamais battue — un chien des marais hargneux et laid, appelé Tristesse — et il en est définitivement plus faible. Il vous expliquera pourquoi c’était le bon choix.",
    // B · fcca6b746d0b
    "characters.beck.pronouns": "il/lui",
    // A · dd2147d2b1a6
    "characters.beck.publicTraits": ["Jovial","Difficile à mettre en colère","Dévoué à un chien laid"],
    // B · 4f5947312810
    "characters.beck.hiddenDrives": ["Il a ri d’un Neuvième devant toute sa famille et n’a pas arrêté de penser à leurs visages"],
    // B · 399357280471
    "characters.beck.values": ["On ne laisse pas un ennemi vaincu derrière soi","Un garde-route est une bonne vie"],
    // B · d8669b8f290c
    "characters.beck.fears": ["Que le Neuvième soit son plafond et que tout le monde le sache déjà"],
    // A · edd946edd84a
    "characters.beck.socialStyle": "Dit l’évidence avec chaleur et vous laisse libre d’en faire ce que vous voulez.",
    // B · cf088e054846
    "characters.beck.boundaries": ["Ne se laissera pas taquiner à propos du Chagrin","Ne tuera pas une créature qui a cessé de se battre"],
    // B · f0223c8eec67
    "characters.beck.goals": ["Être pris comme garde-voie quelque part sur la marche"],
    // B · 06083bf409b5
    "characters.beck.secrets.beck_the_ceiling.fact": "Il a lié deux fois depuis, sans le dire à personne, parce qu’un Neuvième qui le donne sans arrêt restera Neuvième pour toujours, et il le sait.",
    // B · 47558a04be8d
    "characters.beck.secrets.beck_the_ceiling.visibility": "NPC_PRIVATE",
    // B · 5fc8911ec737
    "characters.beck.secrets.beck_the_ceiling.revealHint": "Il en parle en se moquant de lui-même une fois que le joueur a lié quelque chose à son tour.",
    // A · dc1880b409a2
    "characters.beck.speechStyle": "Chaleureux, simple, un temps de retard. Il répète vos derniers mots en réfléchissant. Parle au chien en plein milieu de la phrase.",
    // A · 74c6b7bc861a
    "characters.beck.topics": ["Tristesse","les gardiens de route","sa famille","le prix d’un lien"],
    // A · dd227f9995de
    "characters.beck.voiceSamples": ["Neuvième. Ouais. Ma mère a fait une tête. — Bref. Tu veux voir mon chien ?","Ce n’est pas un bon chien. C’est un mauvais chien, il a mordu un homme à Quill Row. Mais il allait mourir dans ce fossé et maintenant il ne va plus mourir.","Tout le monde me dit sans cesse que je l’ai trahi. Je sais ce que j’ai fait. J’y étais."],
    // B · 00de2ec2fe1c
    "characters.beck.appearance": "Dix-huit ans, très grand, cheveux sable mal coupés par lui-même, une épée de Lame qu’il a encore un peu honte de porter.",
    // B · ff8ead5b610f
    "characters.beck.visualHook": "Une garde avec trois entailles fraîches, soit trois de plus que la plupart des Neuvièmes jamais faites.",
    // B · 80128e325519
    "characters.beck.silhouette": "Large, légèrement voûté pour garder une main près de la tête d’un chien.",
    // B · fa654f4d61ba
    "characters.beck.artSeed": "uncounted-beck-01",
    // B · 4b483dc4ea38
    "characters.beck.portrait": "story_uncounted/beck",
    // B · 65d25f43c211
    "characters.beck.expressions": ["neutre","amusé","inquiet"],
    // B · d97aaee5c620
    "characters.beck.knowledgeScope": ["le_count","le_lien","le_non_tenu","le_sous_pont"],
    // B · 7634c22c5c08
    "characters.beck.gates.beck_the_three_notches.label": "Il avoue combien il a réellement lié",
    // B · 55a54e80451a
    "characters.beck.gates.beck_the_three_notches.kind": "CONFIANCE",
    // B · 00b46bc2ca0b
    "characters.ithra.name": "Ithra Sen",
    // A · c907c8c41d35
    "characters.ithra.role": "Pesée septième, déclarée Équipe, sur la voix d’Assize et insupportable avec ça",
    // A · a8122741ecd9
    "characters.ithra.cardBlurb": "Aiguisée, drôle, ambitieuse, et la meilleure de ta promo dans presque tout. Son Audition a eu lieu à la Pesée et depuis elle est silencieusement consternée par tout le monde. Elle finira en face de toi, et elle n’aura jamais tort pour les mauvaises raisons.",
    // B · aee35f364a88
    "characters.ithra.pronouns": "elle",
    // A · 59809e915919
    "characters.ithra.publicTraits": ["Très rapide","Ouvertement ambitieuse","Sursaute dans la foule"],
    // B · 6428d36a1e8a
    "characters.ithra.hiddenDrives": ["Elle croit que le Registre est la meilleure chose jamais construite et elle a peur que croire le contraire soit un manque de courage"],
    // B · e3470be82397
    "characters.ithra.values": ["Le Registre est la raison pour laquelle les routes sont sûres","Dire à voix haute ce qui est ambitieux plutôt que de faire semblant"],
    // B · 34a1a0396782
    "characters.ithra.fears": ["Entendre quelque chose de quelqu’un qu’elle aime et ne plus pouvoir l’oublier"],
    // A · c755176add6d
    "characters.ithra.socialStyle": "Elle argumente sérieusement, concède des points, et ne te laissera pas gagner un jet que tu n’as pas mérité.",
    // B · 531985683d18
    "characters.ithra.boundaries": ["N’utilisera pas l’Ouïe sur un ami sans prévenir","Ne fera pas semblant de ne pas vouloir le poste"],
    // B · 5fc166df32d0
    "characters.ithra.goals": ["Un poste aux Règlements avant ses vingt-et-un ans"],
    // B · 6ec85253fc8e
    "characters.ithra.secrets.ithra_heard_her_father.fact": "La première chose qu’elle a entendue avec l’Ouïe, c’était son père, dans le hall lors de son propre Pesage, soulagé qu’un Sept signifie qu’elle allait partir.",
    // B · 47558a04be8d
    "characters.ithra.secrets.ithra_heard_her_father.visibility": "NPC_PRIVATE",
    // B · d98cdeed2f17
    "characters.ithra.secrets.ithra_heard_her_father.revealHint": "Seulement à quelqu’un qui lui a raconté quelque chose d’aussi dur sur sa propre famille, et jamais en premier.",
    // A · e548014909b3
    "characters.ithra.speechStyle": "Rapide, précise, drôle, un peu cruelle quand elle a raison. Commence la moitié de ses phrases par « ce qui est ». Elle s’excuse correctement et une seule fois.",
    // A · 5f02c3484f3c
    "characters.ithra.topics": ["l’Assize","l’Audition","pourquoi le Registre est défendable","l’enquête","la pierre sombre du joueur"],
    // A · 55aa199139e0
    "characters.ithra.voiceSamples": ["Ce qui est exactement le problème, non — tu veux des routes sûres mais sans que personne n’ait payé le prix.","Je vais t’écouter maintenant. Je te préviens parce que l’autre solution, c’est de faire sans prévenir, et j’aimerais être l’autre genre.","Personne n’a jamais lu les sombres. Personne. J’ai vérifié les retours depuis la fondation, et je l’ai fait sur mon temps libre."],
    // B · d42c6f7d6aeb
    "characters.ithra.appearance": "Dix-huit ans, petite, très droite, cheveux noirs coupés nets au niveau de la mâchoire, un bâton qu’elle a déjà fait ferrer à ses frais.",
    // B · ebb4a4768caf
    "characters.ithra.visualHook": "Appuie deux doigts fort contre sa tempe dans une foule, brièvement, puis continue de parler.",
    // B · e52158c2ad84
    "characters.ithra.silhouette": "Petite et droite, bâton tenu verticalement comme une canne de géomètre.",
    // B · 53aaf2b26e9d
    "characters.ithra.artSeed": "uncounted-ithra-01",
    // B · 4738fa8c00ca
    "characters.ithra.portrait": "story_uncounted/ithra",
    // B · 05964e1d5aa0
    "characters.ithra.expressions": ["neutre","amusée","froide","inquiète"],
    // B · b55dfff26fe1
    "characters.ithra.knowledgeScope": ["le_count","le_registre","l’assise","l’ouïe","sablecourt"],
    // B · 3f333114b6d7
    "characters.ithra.gates.ithra_the_returns.label": "Elle te montre ce qu’elle a trouvé dans les anciens retours",
    // B · 55a54e80451a
    "characters.ithra.gates.ithra_the_returns.kind": "CONFIANCE",
    // B · d9a89964006f
    "characters.ithra.gates.ithra_chooses.label": "Elle décide si elle met ton nom dans un rapport",
    // B · 9e8ae18bf8bf
    "characters.ithra.gates.ithra_chooses.kind": "ALLIANCE",
    // B · bfe7e19ad6a1
    "characters.perrin.name": "Perrin Alder",
    // A · e8b77329c0eb
    "characters.perrin.role": "Pesé neuvième, déclaré Main, sans que personne ne sache pourquoi",
    // A · 89705c60f542
    "characters.perrin.cardBlurb": "Discret, attentif, du Sous-pont, et le seul de ta promo qui t’explique ce que signifie Réputé, parce que sa mère l’est. Il a choisi la Voie qui peut révéler le Compte. Selon ses calculs, ça prend neuf ans.",
    // B · fcca6b746d0b
    "characters.perrin.pronouns": "il",
    // A · b677333d7239
    "characters.perrin.publicTraits": ["Parle peu","Observe tout","Ne se plaint jamais du Sous-Pont"],
    // B · 73a86bf57595
    "characters.perrin.hiddenDrives": ["Il va faire une demande de Subvention pour sa mère, et il a peur que neuf ans soit trop optimiste"],
    // B · 19cf304f3c3b
    "characters.perrin.values": ["On ne parle pas de ce qu’on fait pour sa famille","La Main n’est pas la Forme du pauvre"],
    // B · 328c227b1a44
    "characters.perrin.fears": ["Qu’elle ne tienne pas neuf ans"],
    // A · 37e7323e68c9
    "characters.perrin.socialStyle": "Écoute jusqu’au bout, puis dit une chose juste.",
    // B · 8572b922e704
    "characters.perrin.boundaries": ["Ne parlera pas de sa mère à qui que ce soit","Refuse la charité mais accepte un travail"],
    // B · f88c525c313e
    "characters.perrin.goals": ["Atteindre un Count dont il peut se permettre de dépenser dix"],
    // B · 9fcb57e46289
    "characters.perrin.secrets.perrin_nine_years.fact": "Il a calculé exactement combien d’années de raffinement il faudra pour élever sa mère au rang de Neuvième, et il vérifie les calculs toutes les quelques semaines en espérant que ça ait changé.",
    // B · 47558a04be8d
    "characters.perrin.secrets.perrin_nine_years.visibility": "NPC_PRIVATE",
    // B · fd5f34845d48
    "characters.perrin.secrets.perrin_nine_years.revealHint": "Seulement à un joueur qui a lui-même accordé un rang à quelqu’un, ou qui s’est assis avec sa mère sans y être invité.",
    // A · 888d9aac6931
    "characters.perrin.speechStyle": "Court. Juste. Aucun remplissage, ce qui passe pour de la rudesse pendant une semaine, puis pour le contraire.",
    // A · 392433f42b61
    "characters.perrin.topics": ["La Main","le Sous-Pont","l’octroi","ce que signifie vraiment Non Noté"],
    // A · 136944fe2f7c
    "characters.perrin.voiceSamples": ["On ne peut pas le prendre. C’est tout. Tout ce que les gens racontent sur la Main, ce sont ceux qui ont choisi autre chose.","Elle n’est pas malade. Elle est Non Notée. Ce n’est pas pareil, et la seconde est pire ici.","Neuf ans. J’ai vérifié plusieurs fois."],
    // B · ae0e27cb2f3c
    "characters.perrin.appearance": "Dix-huit ans, mince, cheveux foncés, avant-bras enveloppés de lin brut, très immobile.",
    // B · e19a7bc44b16
    "characters.perrin.visualHook": "Immobilité — il utilise environ un tiers des mouvements des autres dans la pièce.",
    // B · 42bc08144c79
    "characters.perrin.silhouette": "Étroit et droit, mains détendues, aucune arme sur lui.",
    // B · 2dc61c92bee6
    "characters.perrin.artSeed": "uncounted-perrin-01",
    // B · 13df08f68291
    "characters.perrin.portrait": "story_uncounted/perrin",
    // B · c045f9217dcb
    "characters.perrin.expressions": ["neutre","inquiet","résolu"],
    // B · 775ab28a50c5
    "characters.perrin.knowledgeScope": ["le_count","l’octroi","sous-le-pont","non_coté"],
    // B · 1506db7204da
    "characters.perrin.gates.perrin_the_arithmetic.label": "Il vous explique à quoi servent ces neuf années",
    // B · 55a54e80451a
    "characters.perrin.gates.perrin_the_arithmetic.kind": "CONFIANCE",
    // B · 5ae9d9f06e43
    "factions.faction_assize.name": "L’Assise",
    // B · 6c02e4defdb5
    "factions.faction_assize.description": "Laine grise, épingles d’argent, extrêmement polis, et la raison pour laquelle les routes sont sûres. Ils maintiennent le Registre équilibré et ils ont raison de dire que l’alternative aurait été pire.",
    // B · 019077ecc939
    "factions.faction_underbridge.name": "Le Sous-le-pont",
    // B · e2c040145b0d
    "factions.faction_underbridge.description": "Tous ceux qui n’ont pas de ligne dans le Registre. Ils ne peuvent pas vous lire non plus, ce qui est la première fois de ta vie que c’est un avantage.",
    // B · 5477c5344338
    "factions.faction_march.name": "La Marche du Sud",
    // B · 27ef29f3f673
    "factions.faction_march.description": "La tutelle d’Aurelian : onze villages, une route, et les gens qui n’ont pas été dévorés grâce à lui. Leur loyauté n’est ni naïve ni achetée.",
    // B · e3b78dddf983
    "quests.q_dark_stone.title": "Un Défaut de Pierre",
    // B · 73f97a64f5aa
    "quests.q_dark_stone.summary": "Quatre cents personnes ont vu la pierre rester noire et une guérisseuse que tu ne connais pas leur a dit qu’elle était cassée. Découvre ce qu’elle t’a évité, et ce que ça signifie vraiment.",
    // B · 7fcc0be2ad9c
    "quests.q_dark_stone.kind": "PRINCIPALE",
    // B · e0f5dc30f490
    "quests.q_dark_stone.steps.leave_the_hall.playerCopy": "Sors de la Maison du Pesage, et décide avec qui tu pars.",
    // B · c734f1d6ab36
    "quests.q_dark_stone.steps.leave_the_hall.directorNotes": "Trois personnes veulent vous parler et vous ne pouvez sortir qu’avec une seule d’entre elles. Rill est déjà complice et fait semblant d’être détendu. Tsukasa est au balcon et ne descendra pas. Aurelian arrive déjà la main tendue. Aucun n’est le bon choix ; les trois sont ouverts. Ne laissez pas la scène se finir sans que le joueur déclare une Forme.",
    // B · a4646927a031
    "quests.q_dark_stone.steps.leave_the_hall.rewards.flags": ["pesé","non_coté"],
    // B · 912b22a1422a
    "quests.q_dark_stone.steps.what_the_stone_reads.playerCopy": "Découvre ce que signifie vraiment une pierre noire.",
    // B · c0edc4d22366
    "quests.q_dark_stone.steps.what_the_stone_reads.directorNotes": "La réponse est que la pierre lit le Registre, pas la personne — pas de ligne, rien à montrer. Le joueur peut l’apprendre directement de Tsukasa, par la recherche d’Ithra dans les anciens retours, ou en remarquant tout seul qu’il devient clairement plus fort tout en restant Non coté. Ne laissez aucun personnage faire un cours ; ça doit tomber comme une correction en passant.",
    // B · 3e8856d315f6
    "quests.q_dark_stone.steps.what_the_stone_reads.rewards.flags": ["sait :hors_registre"],
    // B · 923c484419ad
    "quests.q_dark_stone.involvedCharacterIds": ["rill","marrin","tsukasa","aurelian"],
    // B · 2dd6b66f2987
    "quests.q_dark_stone.involvedLocationIds": ["weighing_house","sablecourt"],
    // B · 69025176efa7
    "quests.q_dark_stone.knownRewardCopy": "Une réponse sur la pierre, et une bien meilleure question.",
    // B · 6462fe3262d8
    "quests.q_not_a_person.title": "Pas Une Personne Légale",
    // B · 72a2f06452f6
    "quests.q_not_a_person.summary": "Non coté signifie pas de travail, pas de laissez-passer routier, et pas d’auberge qui vous accueille. Il y a trois solutions, et l’une d’elles est un homme avec un sceau de cire verte.",
    // B · 7fcc0be2ad9c
    "quests.q_not_a_person.kind": "PRINCIPALE",
    // B · af33e528dd71
    "quests.q_not_a_person.steps.get_standing.playerCopy": "Trouve un moyen d’être une personne sur le papier, ou un moyen de vivre sans l’être.",
    // B · 88145746176b
    "quests.q_not_a_person.steps.get_standing.directorNotes": "Trois vraies réponses, aucune correcte. Bett de Quill Row forge un Neuvième pour onze pièces d’argent et un service qu’elle réclamera. Aurelian écrit un sceau de gardien à la table en parlant d’autre chose et ne demande rien. Le Sous-le-pont ne vérifie pas, et y vivre ne coûte que le reste de ta vie. Hale regarde déjà les sceaux sur Quill Row, et la voie de la contrefaçon a des conséquences plus tard.",
    // B · e95e18856d71
    "quests.q_not_a_person.involvedCharacterIds": ["aurelian","perrin","hale"],
    // B · 8631d6cb539b
    "quests.q_not_a_person.involvedLocationIds": ["sablecourt","quill_row","underbridge","gilt_yard"],
    // B · 8d5daaebd1a2
    "quests.q_not_a_person.knownRewardCopy": "Un moyen de se tenir à une porte sans être poussé.",
    // B · cec2e2f0be96
    "quests.q_first_blood.title": "Tuer Ou Garder",
    // B · a1adb62f4a91
    "quests.q_first_blood.summary": "Quelque chose dans la longue herbe des chalk downs a décidé pour toi. La seule question que ce monde pose vraiment, c’est ce qui vient ensuite.",
    // B · 7fcc0be2ad9c
    "quests.q_first_blood.kind": "PRINCIPALE",
    // B · 6d450ce83733
    "quests.q_first_blood.steps.the_ridge_wolf.playerCopy": "Bats le loup de la crête, puis décide.",
    // B · 27361dacce59
    "quests.q_first_blood.steps.the_ridge_wolf.directorNotes": "La décision est le contenu. Choisis-la et le joueur est plus fort et la crête n’a plus de loup — et le monde doit mentionner le troupeau et la source, plus tard, sans commentaire. Lie-le et le joueur est durablement plus faible et un loup est à ses côtés. Laisse-le et il se souvient d’eux, ce que le monde garde aussi. Chaque compagnon présent réagit, différemment, à chaque fois : Rill veut qu’ils s’en aillent, Beck veut le lien, Aurelian raconte une vraie histoire sur Halloway et a raison.",
    // B · 1ec3d7bbf723
    "quests.q_first_blood.involvedCharacterIds": ["beck","rill","aurelian"],
    // B · a8e735b6367e
    "quests.q_first_blood.involvedLocationIds": ["chalk_downs","southern_road"],
    // B · 233300556f1a
    "quests.q_first_blood.knownRewardCopy": "Le premier Count que tu as jamais porté, ou la première chose qui a choisi de marcher à tes côtés.",
    // B · 1e0a5a46c72f
    "quests.q_what_she_spends.title": "Ce Qu’Elle Dépense",
    // B · 4cc4a3d9dfee
    "quests.q_what_she_spends.summary": "Elle te soigne la première fois sans qu’on le lui demande et fait une blague sur les pouces. Découvre ce que ça lui coûte, puis décide ce que tu vas faire.",
    // B · 7fcc0be2ad9c
    "quests.q_what_she_spends.kind": "PRINCIPALE",
    // B · ce4d04b195ce
    "quests.q_what_she_spends.steps.notice_it.playerCopy": "Comprends pourquoi elle est maladroite et pourquoi la lumière la traverse.",
    // B · 9e8642f0cee6
    "quests.q_what_she_spends.steps.notice_it.directorNotes": "Jamais dit. Observé : la translucidité sur les bords en plein soleil, le fait qu’elle se cogne aux encadrements de porte, qu’elle ne veuille pas rester près d’une pierre d’évaluation, qu’elle ait vingt-quatre ans et soit une Neuvième alors qu’elle était une Cinquième à son Pesage. Un joueur Staff avec Ouïe comprend vite et c’est la façon la plus cruelle de le découvrir.",
    // B · 5f5351203b20
    "quests.q_what_she_spends.steps.notice_it.succeedWhen.flagsSet": ["knows :rill_is_spending_herself"],
    // B · 6cfbd0a8ab3b
    "quests.q_what_she_spends.steps.do_something_or_do_not.playerCopy": "Décide ce que tu vas faire.",
    // B · 0de67e3f6ca6
    "quests.q_what_she_spends.steps.do_something_or_do_not.directorNotes": "Quatre réponses honnêtes et aucune correcte : refuse ses soins et répare-toi pour toujours ; accorde-lui, ce qu’elle refuse furieusement trois fois ; la convaincre d’arrêter, ce qui a un bilan humain qu’elle nommera ; ou la laisser continuer, l’aimer, et être là jusqu’au bout. Ne laisse jamais un personnage dire qu’une de ces réponses est la bonne.",
    // B · 263084a6ea64
    "quests.q_what_she_spends.involvedCharacterIds": ["rill","perrin"],
    // B · b49d510c271c
    "quests.q_what_she_spends.involvedLocationIds": ["underbridge","sablecourt"],
    // B · 3c09f26ab080
    "quests.q_what_she_spends.knownRewardCopy": "La vérité sur une femme qui ne te la dira pas.",
    // B · d74d77e30c52
    "quests.q_the_vault.title": "Miséricorde Et Grâce",
    // B · 32da748cb7b6
    "quests.q_the_vault.summary": "Son épée s’appelle Miséricorde et son tigre s’appelle Grâce, il les a nommés lui-même, et il le pensait. Découvre à quoi ils servent.",
    // B · 7fcc0be2ad9c
    "quests.q_the_vault.kind": "PRINCIPALE",
    // B · 97214e281fc5
    "quests.q_the_vault.steps.the_arithmetic_of_a_tiger.playerCopy": "Comprends pourquoi Grâce mesure neuf pieds à l’épaule.",
    // B · 492c4daf5e81
    "quests.q_the_vault.steps.the_arithmetic_of_a_tiger.directorNotes": "Un lien concentre le Count. Un lien est donc un endroit pour le poser. Aurelian est un Blade qui garde la route du sud depuis douze ans et son Count personnel est cent six, ce qui n’explique pas Grâce. Trois routes et aucune n’est une confession : l’écuyer qui l’aime bien et s’est fait une mauvaise idée, l’homme pâle qui sait depuis des années, ou le joueur qui fait le calcul devant lui.",
    // B · d5143ade7824
    "quests.q_the_vault.steps.the_arithmetic_of_a_tiger.rewards.flags": ["knows :the_wild_is_thinning"],
    // B · e55b424f36b1
    "quests.q_the_vault.steps.he_asks.playerCopy": "Il va te demander quelque chose. Décide avant qu’il ne le fasse.",
    // B · f350eeae9a40
    "quests.q_the_vault.steps.he_asks.directorNotes": "Il dit au joueur que Grâce est pleine depuis onze mois, que la route en souffre, et que deux villages ont déjà payé. Puis il demande. Il ne fait pas pression, ne négocie pas, et dit explicitement qu’on peut dire non — c’est ce qui rend la décision difficile. Un joueur qui dit oui n’a pas été dupé ; il a pris une décision défendable sur qui doit le porter.",
    // B · 2ac6f5c6c010
    "quests.q_the_vault.involvedCharacterIds": ["aurelian","grace","hale","tsukasa"],
    // B · 115f399e7fd2
    "quests.q_the_vault.involvedLocationIds": ["gilt_yard","southern_road","halloway"],
    // B · 9e4af52bdc41
    "quests.q_the_vault.knownRewardCopy": "Ce que le meilleur homme d’Orenne fait depuis douze ans.",
    // B · de38161269d7
    "quests.q_the_dam.title": "Le Neuvième Évaluateur",
    // B · 049816763244
    "quests.q_the_dam.summary": "L’homme pâle veut faire sortir cent quarante ans du Registre. Il te dira lui-même le nombre de morts, une fois, sans l’adoucir, puis ne le répétera plus.",
    // B · 7fcc0be2ad9c
    "quests.q_the_dam.kind": "PRINCIPALE",
    // B · 19bfeb40cea3
    "quests.q_the_dam.steps.the_nine.playerCopy": "Découvre qui a construit le barrage.",
    // B · 30898b07800e
    "quests.q_the_dam.steps.the_nine.directorNotes": "Il le dit clairement la première fois que le joueur l’accuse de ne pas comprendre ce qu’il demande : il faisait partie des neuf. Ce n’est pas une confession et il ne cherche pas l’absolution. Ça recontextualise toutes les scènes précédentes et doit être dit en une dizaine de mots.",
    // B · d5143ade7824
    "quests.q_the_dam.steps.the_nine.rewards.flags": ["knows :the_wild_is_thinning"],
    // B · 6c5cec939be6
    "quests.q_the_dam.steps.decide_about_the_dam.playerCopy": "Décide ce qu’il advient de cent quarante ans de Count retenu.",
    // B · a9bf1f8729e7
    "quests.q_the_dam.steps.decide_about_the_dam.directorNotes": "Trois vraies réponses. L’aide, et tu assumes les deux hivers. L’arrête, et tu assumes l’horloge de soixante ans dans l’enquête. Ou tu le fais attendre, ce qui est une réponse en soi avec une date limite que le monde rappellera. Personne dans cette histoire ne doit dire au joueur laquelle est la bonne.",
    // B · eb35941338e7
    "quests.q_the_dam.involvedCharacterIds": ["tsukasa","hale","ithra","aurelian"],
    // B · c015d548a3a9
    "quests.q_the_dam.involvedLocationIds": ["chalk_downs","weighing_house","flooded_fen"],
    // B · 545fcd4ae141
    "quests.q_the_dam.knownRewardCopy": "Ce qu’est vraiment le Registre, et qui l’a construit.",
    // B · de71ff2a3379
    "quests.q_halloway.title": "La route de Halloway",
    // B · e9c6a4d2e842
    "quests.q_halloway.summary": "Deux cents personnes, un mur, une cloche, et personne avec un Nombre supérieur à quatre. Ils sont très polis avec l’arithmétique.",
    // B · 552c0b7f83c2
    "quests.q_halloway.kind": "SECONDAIRE",
    // B · 0eb1b48d7aa4
    "quests.q_halloway.steps.the_warden_gap.playerCopy": "Halloway n’a pas eu de gardien depuis le printemps. Fais quelque chose, ou pas.",
    // B · 6fa86c9ecd94
    "quests.q_halloway.steps.the_warden_gap.directorNotes": "La version honnête de l’argument prendre-ou-partager, à l’échelle du village. Assurer la garde soi-même signifie tuer sur la route pendant des mois. Proposer Beck, c’est un Neuvième qui continue à lier les choses qui tient un mur. Ne rien faire est une vraie option, et le monde ne le punit pas par un massacre — il note simplement, discrètement, le printemps suivant, qu’ils ont sonné la cloche deux fois en mars.",
    // B · cbc070ba1dc4
    "quests.q_halloway.involvedCharacterIds": ["aurelian","beck","perrin"],
    // B · 2b45717c4c9c
    "quests.q_halloway.involvedLocationIds": ["halloway","southern_road"],
    // B · 503ee8612ea8
    "quests.q_halloway.knownRewardCopy": "Un village qui garde sa cloche, ou pas.",
    // B · 8b2f31bf6ba9
    "quests.q_the_drake.title": "La chose dans le marais",
    // B · 5e80a376f0bd
    "quests.q_the_drake.summary": "Il y en a une. Elle est plus vieille que le Registre, elle n’a jamais été comptée, et l’Assise a exploré la limite de cet endroit deux fois avant d’arrêter d’envoyer des gens.",
    // B · eff80c847ff6
    "quests.q_the_drake.kind": "PRINCIPALE",
    // B · 4bccdb162bf2
    "quests.q_the_drake.steps.go_and_look.playerCopy": "Va dans le marais inondé et découvre ce qui le maintient silencieux.",
    // B · 27109cd37fc3
    "quests.q_the_drake.steps.go_and_look.directorNotes": "Le Drake de Sable est un Nombre de trente-et-un et la seule créature à laquelle un joueur peut se lier pour devenir vraiment de Premier Rang, et cela coûtera presque tout ce qu’il porte. Le tuer est aussi possible et c’est l’acte de prise le plus important de l’histoire. Ce n’est pas un boss final et rien dans la trame principale ne l’exige.",
    // B · 14351037aa16
    "quests.q_the_drake.involvedCharacterIds": ["tsukasa","beck"],
    // B · 23a630a79122
    "quests.q_the_drake.involvedLocationIds": ["flooded_fen","chalk_downs"],
    // B · 38d02f6339c6
    "quests.q_the_drake.knownRewardCopy": "La seule chose non comptée à Orenne à part toi.",
    // B · 398b599dfee2
    "worldEvents.we_the_hall_goes_quiet.publicCopy": "Voss Marrin retire ta main de la pierre, la regarde, puis la repose. La pierre reste sombre. Quelqu’un au fond demande à voix haute « est-ce qu’elle est cassée » assez fort pour que tout le monde l’entende, puis décide que non.",
    // B · 10fbdec64ae4
    "worldEvents.we_the_hall_goes_quiet.directorNotes": "Pas un souffle. Le silence gêné spécifique de quatre cents personnes qui voient quelqu’un découvrir quelque chose de terrible en public. Marrin est correcte et déteste ça, elle dira la procédure à voix haute avant de la suivre.",
    // B · 46bec0ee88c4
    "worldEvents.we_the_hall_goes_quiet.setsFlags": ["weighed"],
    // B · d1df2a242783
    "worldEvents.we_the_warden_arrives.publicCopy": "La salle change. Pas poliment — les gens se lèvent. Le Gardien de la Marche du Sud est dans l’embrasure, les cheveux pleins de poussière de route, ravi de quelque chose, et il vient droit vers toi.",
    // B · e21cf4331ecb
    "worldEvents.we_the_warden_arrives.directorNotes": "L’Assise signale les anomalies au Premier Rang et il était à trois rues. Il est sincèrement content. Il est sincèrement serviable. Tout ce qu’il fait dans cette scène est une vraie gentillesse et aussi un investissement, et le joueur ne doit pas pouvoir séparer clairement les deux — maintenant ou dans trente tours.",
    // B · 7dbb44748d7b
    "worldEvents.we_the_warden_arrives.setsFlags": ["knows :the_warden_noticed_you"],
    // B · 46bec0ee88c4
    "worldEvents.we_the_warden_arrives.requiresFlags": ["weighed"],
    // B · dbcbca24d72c
    "worldEvents.we_hale_opens_a_file.publicCopy": "Un homme en bon drap gris est dans la salle des retours depuis deux jours. Ce matin, il a demandé au greffier tous les dossiers de panne d’appareils du district remontant à onze ans, il y en a quatre, et trois datent d’avant la naissance de Voss Marrin.",
    // B · 91b0d553e8c3
    "worldEvents.we_hale_opens_a_file.directorNotes": "Cardew Hale, Réconciliations. Il ne chasse pas le joueur, il équilibre une page, et il sera toujours poli en se rapprochant d’eux. Augmente ledger_standing ici et continue de l’augmenter que le joueur s’engage ou pas.",
    // B · 13cc251129c1
    "worldEvents.we_hale_opens_a_file.setsFlags": ["hale :has_the_file"],
    // B · 46bec0ee88c4
    "worldEvents.we_hale_opens_a_file.requiresFlags": ["weighed"],
    // B · 705685c7659c
    "worldEvents.we_she_does_it_again.publicCopy": "Un transporteur sous le pont s’est fait embrocher l’avant-bras par un taquet de barge. Rill arrive en environ quatre minutes, son manteau déboutonné et les cheveux lâchés, elle le referme, fait une blague sur les pouces, puis s’assoit sur un bollard un peu plus longtemps que la blague ne tient.",
    // B · 4d4221fe8b2e
    "worldEvents.we_she_does_it_again.directorNotes": "La première fois que le joueur voit le coût de l’extérieur plutôt que comme destinataire. Personne n’explique rien. Elle est un peu plus translucide à l’oreille et aux bouts des doigts dans la lumière basse de la rivière qu’au Pesage, et le joueur peut le remarquer ou pas.",
    // B · 5f5351203b20
    "worldEvents.we_she_does_it_again.setsFlags": ["knows :rill_is_spending_herself"],
    // B · abb132f84594
    "worldEvents.we_she_does_it_again.requiresFlags": ["spoke :rill"],
    // B · a41e5a43ef47
    "worldEvents.we_the_downs_are_quiet.publicCopy": "Une vieille femme qui coupe du genêt sur la crête dit qu’elle n’a pas entendu de loup ici depuis le printemps, et que quand elle était jeune on ne pouvait pas marcher ce chemin au crépuscule. Elle le dit comme on dit que les étés étaient meilleurs, puis retourne au genêt.",
    // B · c81ebc7cc12c
    "worldEvents.we_the_downs_are_quiet.directorNotes": "L’horloge du monde, mentionnée par quelqu’un qui n’a aucun intérêt dedans. C’est la première fois que le joueur apprend que l’Inachevé se vide, et ça ne doit pas venir de Tsukasa ou Aurelian, car ils ont tous deux un argument qui en dépend.",
    // B · d5143ade7824
    "worldEvents.we_the_downs_are_quiet.setsFlags": ["knows :the_wild_is_thinning"],
    // B · 54657b352096
    "worldEvents.we_grace_sleeps.publicCopy": "Un palefrenier mentionne, avec affection, que Grace dort dix-huit heures par jour maintenant et qu’elle se levait à la première lumière pour s’occuper des chevaux. Il dit qu’elle vieillit. Elle a dix ans. Les tigres vivent vingt-six ans.",
    // B · 6fc161c82e78
    "worldEvents.we_grace_sleeps.directorNotes": "La moitié visible du coffre. Dit par quelqu’un qui l’aime et a tiré la mauvaise conclusion. Un joueur qui fait le calcul — sa taille contre son Nombre — y arrive sans qu’on lui dise.",
    // B · 18d584fbfdee
    "worldEvents.we_grace_sleeps.setsFlags": ["knows :grace_is_full"],
    // B · 7dbb44748d7b
    "worldEvents.we_grace_sleeps.requiresFlags": ["knows :the_warden_noticed_you"],
    // B · b01bfed4368e
    "worldEvents.we_the_hollow_stops_waiting.publicCopy": "Trois pierres de voie sur la route du sud sont froides. Pas abîmées — froides, et le Nombre qui y avait été inscrit quand la route a été tracée n’y est plus. L’Assise a envoyé quelqu’un pour enquêter et cette personne n’est pas revenue avec une explication.",
    // B · 91592d6950e0
    "worldEvents.we_the_hollow_stops_waiting.directorNotes": "Il a cessé d’attendre. Ça arrive que le joueur l’ait rencontré ou pas, et qu’il soit d’accord ou pas, et ça s’accélère si le joueur lui a dit quelque chose d’utile. La marche le remarque avant l’Assise.",
    // B · eedf9554a2b7
    "worldEvents.we_the_hollow_stops_waiting.setsFlags": ["hollow :has_started"],
    // B · 54367928d021
    "worldEvents.we_the_hollow_stops_waiting.cancelledByFlags": ["chose :the_page_balances"],
    // B · e82d9dc4b3fa
    "promises.p_the_stone.kind": "MYSTÈRE",
    // B · d3d858c1035a
    "promises.p_the_stone.label": "Pourquoi la pierre est restée sombre",
    // B · a140a9ed0044
    "promises.p_the_stone.seedHint": "Marrin la lit deux fois et dit la procédure à voix haute avant de la suivre.",
    // B · 82a375d50040
    "promises.p_the_stone.payoffHint": "La pierre lit le Registre, pas la personne. Il n’y a pas de ligne, donc rien à montrer — et tout ce que le joueur prend est donc hors registre.",
    // B · d77ebfcebe44
    "promises.p_the_tiger.kind": "FINALE",
    // B · 80a07411d1b2
    "promises.p_the_tiger.label": "Ce que Grace porte",
    // B · 31436c4fbbc8
    "promises.p_the_tiger.seedHint": "Elle fait neuf pieds au garrot et lui est un Count de cent six, et ces deux nombres ne vont pas ensemble.",
    // B · 7d2d1354aa07
    "promises.p_the_tiger.payoffHint": "Un lien rassemble les Count, donc un lien est un endroit pour les mettre. Son épée s’appelle Mercy et son tigre s’appelle Grace, et tous deux sont de la comptabilité.",
    // B · 445cd8deebc2
    "promises.p_the_healer.kind": "RELATION",
    // B · 04d9c2ec3f29
    "promises.p_the_healer.label": "Ce que ça lui coûte à chaque fois",
    // B · 4b6f23a4c28f
    "promises.p_the_healer.seedHint": "Elle ment pour un étranger devant quatre cents personnes puis fait une blague sur les pouces.",
    // B · 36ca3bf68e32
    "promises.p_the_healer.payoffHint": "Elle était une Cinquième à son Pesage et elle est une Neuvième maintenant, et elle est à dix-neuf mois du Non classé, et elle a fait l’arithmétique plusieurs fois.",
    // B · 63a719ec7f2d
    "promises.p_the_ninth.kind": "RIVALITÉ",
    // B · 4ee8d6166198
    "promises.p_the_ninth.label": "Qui était l’homme pâle",
    // B · 09f8ea4f511e
    "promises.p_the_ninth.seedHint": "Il n’a pas vieilli, il lit sombre, et il parle de la fondation de l’Assise à la première personne sans s’en rendre compte.",
    // B · 82ea8adce2ce
    "promises.p_the_ninth.payoffHint": "Il faisait partie des neuf qui ont construit le Registre. Le barrage est à lui, il en était fier, et les cent quarante années depuis ont été une très longue correction.",
    // B · f8b4a6708d82
    "promises.p_the_survey.kind": "THÈME",
    // B · 9acf838c8f85
    "promises.p_the_survey.label": "Ce que fait Orenne quand la nature sauvage disparaît",
    // B · 474d5f9da519
    "promises.p_the_survey.seedHint": "Une vieille femme sur la crête dit qu’on ne pouvait pas emprunter ce chemin au crépuscule quand elle était enfant.",
    // B · 8872576122cf
    "promises.p_the_survey.payoffHint": "Neuf pages dans le troisième registre, voix passive, pas de signature, observant que le royaume contient beaucoup de personnes de rang Neuvième et Non classé. Ça ne recommande rien. C’est un relevé.",
    // A · 95c39022dcf6
    "endings.end_balanced_page.name": "Une page équilibrée",
    // B · c9d08ae5d876
    "endings.end_balanced_page.rarity": "COURANT",
    // B · 54367928d021
    "endings.end_balanced_page.requires.flagsSet": ["chose :the_page_balances"],
    // B · adf74c4a059a
    "endings.end_balanced_page.requires.flagsUnset": ["chose :the_dam_breaks"],
    // B · 21ec1e31e513
    "endings.end_balanced_page.condition": "Le joueur a choisi le camp de ce qui garde les routes sûres. L’Assise ferme l’erreur, leur écrit une ligne, et leur donne un nombre, et ce nombre est petit. Joue ça comme une vraie paix plutôt qu’une défaite : le Registre tient, Hale rentre chez lui pour l’hiver, et l’horloge de soixante ans dans le relevé tourne toujours et maintenant c’est en partie la leur.",
    // A · d65140291644
    "endings.end_balanced_page.epilogue": "On te donne un Neuvième, ce qui est juste, et une copie du retour avec ton nom bien orthographié. La pierre te lit au second essai et personne ne fait de bruit dans la salle, parce que c’est un mardi normal et que tu es une inscription ordinaire. Pour la première fois depuis le champ d’orge, tu es une personne que quelqu’un peut rechercher.",
    // A · f7fc75457bf6
    "endings.end_second_vault.name": "Le Second Caveau",
    // B · c9d08ae5d876
    "endings.end_second_vault.rarity": "COURANT",
    // B · f846f0d9252c
    "endings.end_second_vault.requires.flagsSet": ["is :the_second_vault"],
    // B · 944f6992c8b3
    "endings.end_second_vault.condition": "Le joueur a accepté, en connaissance de cause ou pas tout à fait, d’être l’endroit où Aurelian dépose ce qu’il prend. Écrit depuis l’intérieur des quarante bonnes années qui suivent, et c’est confortable, et il reste le meilleur homme qu’ils aient jamais rencontré. La dernière ligne est une question sur la quarante-et-unième. Ne le rends pas sinistre dans l’épilogue ; l’horreur est entièrement structurelle.",
    // A · df889853efec
    "endings.end_second_vault.epilogue": "La route du sud est protégée sans interruption pendant onze ans, ce qui n’est jamais arrivé. Halloway sonne sa cloche à la mi-été pour la foire et pour rien d’autre. Il t’écrit chaque printemps, à la main, correctement, et prend de tes nouvelles avant de demander quoi que ce soit, et il demande toujours quelque chose, et tu dis toujours oui, et vous avez fini par ne plus y faire attention.",
    // A · 5da7967a1076
    "endings.end_dam_breaks.name": "La rupture du barrage",
    // B · f8b8333fe7bc
    "endings.end_dam_breaks.rarity": "RARE",
    // B · adf74c4a059a
    "endings.end_dam_breaks.requires.flagsSet": ["chose :the_dam_breaks"],
    // B · 6280d5d497da
    "endings.end_dam_breaks.condition": "Cent quarante ans repartent dans le monde. Ne le joue ni comme une victoire ni comme une catastrophe — joue-le comme un printemps. Trop de vert, trop vite, partout, et personne sur les murs. La mort arrive dans les deux hivers qui suivent et l’épilogue ne doit pas les zapper.",
    // A · 3d36adb3d275
    "endings.end_dam_breaks.epilogue": "Ça retourne d’abord dans la terre, puis dans tout ce qui y pousse, et la deuxième année l’orge dépasse la tête d’un homme et personne n’a les mains pour la couper. Deux hivers. Les routes ferment les unes après les autres. Et au quatrième printemps, un enfant sur les chalk downs terrasse un loup de crête avec un bâton, et il lui arrive quelque chose qui n’est arrivé à personne à Orenne depuis cent quarante ans, et personne ne l’écrit.",
    // B · a5191aa09ed1
    "endings.end_dam_breaks.hint": "Il te dira lui-même le prix, une fois, et ne le remontera jamais.",
    // A · 65e0a72442ad
    "endings.end_long_notch.name": "La Longue Entaille",
    // B · f8b8333fe7bc
    "endings.end_long_notch.rarity": "RARE",
    // B · 7ceba0caf4e5
    "endings.end_long_notch.requires.flagsSet": ["bonded :first"],
    // B · 9357b22e60ab
    "endings.end_long_notch.requires.flagsUnset": ["took :the_drake"],
    // B · af38ff17aabf
    "endings.end_long_notch.condition": "Le joueur l’a donné, encore et encore, et arrive à la fin personnellement plus faible qu’un ouvrier Neuvième et entouré de choses qui ont essayé de le tuer autrefois. Rien dans Orenne n’a de procédure pour ça. Joue la dernière scène du point de vue de ce qui est autour d’eux plutôt que de ce qu’ils peuvent faire.",
    // A · df85e15fe322
    "endings.end_long_notch.epilogue": "Une garde d’épée avec plus d’entailles que d’acier entre elles. Tu pourrais perdre un combat contre presque n’importe qui à Sablecourt et ça ne se serait pas vu, parce que ça ne va jamais aussi loin, parce qu’il y a toujours quelque chose entre toi et eux qui a décidé il y a des années de ne pas te manger et ne l’a plus remis en question depuis.",
    // A · a5a191f913e6
    "endings.end_the_school.name": "L’Académie",
    // B · f8b8333fe7bc
    "endings.end_the_school.rarity": "RARE",
    // B · 1c48bd35df6b
    "endings.end_the_school.requires.flagsSet": ["granted :rill"],
    // B · a1066925463b
    "endings.end_the_school.condition": "Une Main qui l’a donnée aux gens plutôt que de la garder. Elle finit presque Sans Rang à la fin du monde, et les gens à qui elle a accordé sont venus. Ce n’est ni un dernier combat ni un sauvetage — le but, c’est que personne n’ait eu à être sollicité deux fois.",
    // A · 98ef2dfe97e7
    "endings.end_the_school.epilogue": "Ils sont onze dans le Gilt Yard, et chacun d’eux pourrait te battre maintenant, et l’un d’eux est un guérisseur avec son manteau boutonné pour une fois, les cheveux relevés et aucune lumière ne filtre à travers lui. Personne ne dit rien. Il est très tôt et quelqu’un a apporté du pain.",
    // A · 1350b1496beb
    "endings.end_what_grace_was_carrying.name": "Ce que Grace Portait",
    // B · f7fc172f729a
    "endings.end_what_grace_was_carrying.rarity": "UNIQUE",
    // B · 706bce3bf495
    "endings.end_what_grace_was_carrying.requires.flagsSet": ["sait :grace_est_un_vault","refusé :le_vault"],
    // B · d71232ae8bf5
    "endings.end_what_grace_was_carrying.condition": "Le joueur a compris le vault et le lui a dit en face, et il l’a refusé. Ça ne finit pas en bagarre et il ne le nie pas. Il explique, calmement, et son explication tient la route, il est toujours le meilleur homme d’Orenne, et il aura toujours besoin d’un endroit pour le mettre. Laisse ça non résolu exprès.",
    // A · 9ec96b100181
    "endings.end_what_grace_was_carrying.epilogue": "Il écoute toute l’histoire sans jamais interrompre, c’est le pire. Puis il dit : « Oui. » Ensuite il demande ce que tu aurais fait de la route de Halloway, et il ne cherche pas à être malin — il veut vraiment savoir, il attend, le tigre respire à côté de lui, et tu n’as pas de réponse qui tienne en une phrase.",
    // B · 54b14fc16b93
    "endings.end_what_grace_was_carrying.hint": "Fais les calculs. Sa taille contre son Count.",
    // A · e1511a54c1c0
    "endings.end_nineteen_months.name": "Dix-neuf Mois",
    // B · f8b8333fe7bc
    "endings.end_nineteen_months.rarity": "RARE",
    // B · 5f5351203b20
    "endings.end_nineteen_months.requires.flagsSet": ["sait :rill_se_donne_a_fond"],
    // B · f58bc3062e6c
    "endings.end_nineteen_months.requires.flagsUnset": ["protège :rill"],
    // B · a6a7ea9cea87
    "endings.end_nineteen_months.condition": "Amaryllis Quist atteint Sans Rang. Ne joue jamais ça comme une mort. Elle a vingt-quatre ans et n’est plus légalement une personne, dans une ville où ça veut dire le Sous-pont, et elle en fera une blague dans la première minute. Que le joueur ait essayé, échoué ou été ailleurs, cette fin parle de ce qu’elle a décidé que ça valait — et elle est parfaitement claire là-dessus.",
    // A · 1285c5e88d24
    "endings.end_nineteen_months.epilogue": "La pierre s’assombrit sous sa main et elle rit, vraiment rit, parce qu’après onze ans à certifier les autres, elle a enfin fait quelque chose de drôle. Elle est sous le pont à l’automne. Elle continue les tournées sans autorisation. Elle ne peut plus rien fermer alors elle répare les os, tient les mains et dit aux gens que ça vaut un pouce, et elle ne ment pas, parce qu’il ne reste plus rien à dépenser et elle est encore là à quatre heures du matin.",
    // A · b557d265ded0
    "endings.end_the_field.name": "Le Champ À Deux Heures De Sablecourt",
    // B · f7fc172f729a
    "endings.end_the_field.rarity": "UNIQUE",
    // B · 14d677c19a01
    "endings.end_the_field.requires.flagsSet": ["a_pris :premier_count"],
    // B · ece4d371fb75
    "endings.end_the_field.requires.flagsUnset": ["a :standing"],
    // B · 3be05db1e796
    "endings.end_the_field.condition": "Le joueur meurt Sans Rang, non enregistré, tenant ce qu’il avait pris. La seule fin où le barrage est objectivement plus faible après. Quatre lignes, du point de vue de personne, pas d’éloge funèbre, et aucune suggestion que ça ait compté pour qui que ce soit.",
    // A · 1d12e45f05c3
    "endings.end_the_field.epilogue": "Ce que tu portes repart comme avant, dans la terre, comme tout avant. Le Registre n’enregistre pas de perte parce qu’il n’a jamais enregistré de gain. Quelque part dans le troisième registre, une page s’équilibre pour la première fois depuis onze mois, et Cardew Hale clôt le dossier avant de rentrer chez lui pour l’hiver.",
    // A · fd5c8eb9a84d
    "archetypes.arch_blade.name": "Lame",
    // B · 3cc210e7a09f
    "archetypes.arch_blade.role": "Une épée, et un jour un lien",
    // A · c1a5bd260c05
    "archetypes.arch_blade.summary": "Dangereux dès la première heure, et ce pourquoi tu es vraiment là arrive tôt : battre une créature sauvage, l’épargner, et partager ce que tu portes avec elle. Chaque lien te rend plus faible, et jamais seul.",
    // A · 567c212e540f
    "archetypes.arch_blade.playstyle": ["Opère dès le début","Collectionne","Le plus faible du groupe"],
    // A · 965c8d2f8c0a
    "archetypes.arch_blade.blurb": "Les vétérans entaillent la garde pour chaque lien, alors une longue carrière ressemble à une crête de petites entailles.",
    // B · 4ab4a0ff0ea8
    "archetypes.arch_blade.startingAbilities": ["lien"],
    // A · 5e47b3a57047
    "archetypes.arch_staff.name": "Bâton",
    // B · a92008ba1aef
    "archetypes.arch_staff.role": "La force, et ce que disent les morts",
    // A · f280b4435d1d
    "archetypes.arch_staff.summary": "Direct, fatigant et efficace. À ta première victime, tu l’entends, ce qui n’est généralement pas un langage, et c’est pire pour ça. Plus tard, ça s’étend aux vivants, mais ça ne sert à rien au marché.",
    // A · d9899216ac73
    "archetypes.arch_staff.playstyle": ["Sait avant les autres","Porte ce qu’il a tué","S’endosse"],
    // A · 2cf5733c2123
    "archetypes.arch_staff.blurb": "Ça ne marche pas sur l’homme en noir, la première preuve solide qu’il y a quelque chose qui cloche chez lui.",
    // B · 6b052f83c54c
    "archetypes.arch_staff.startingAbilities": ["résidu","ouïe"],
    // A · 39eddc4336e2
    "archetypes.arch_hand.name": "Main",
    // B · 17c02fa06134
    "archetypes.arch_hand.role": "Rien ne peut t’être pris",
    // A · a98f5af66971
    "archetypes.arch_hand.summary": "Pas d’arme, et des coups qui frappent plus fort que ce qu’impose le corps. Rien ne te vide, te lit ou te lie sans ton accord. Le plus lent des trois, et le seul qui peut restituer ce qu’il a capté.",
    // A · 04010803d67d
    "archetypes.arch_hand.playstyle": ["Sait attendre","Sous-estimé","Donne tout"],
    // A · e45dda821cec
    "archetypes.arch_hand.blurb": "Historiquement la Forme de ceux qui ne pouvaient pas s’offrir une épée, ce qui est juste et encore dit à voix haute.",
    // B · f0a6931f4200
    "archetypes.arch_hand.startingAbilities": ["scellé","octroi"],
    // B · 800055f63ebf
    "setupFields.displayName.label": "Quel nom dis-tu aux gens que tu as ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 45c53a030bc7
    "setupFields.displayName.placeholder": "ex. Sarrow",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iels",
    // B · e7b8d017fdb1
    "setupFields.archetype.label": "Comment vas-tu le tenir ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 5ef7c4b863fa
    "setupFields.archetype.helpText": "Ta Première Forme, déclarée au Pesage comme celle des autres, et fixée pour toute ta vie. Elle détermine ce en quoi tu es bon et quel sera ton second don. Elle ne fixe pas ce que tu crois du Registre, de quel côté tu es, ni ce que tu fais du premier que tu bats — tout ça t’appartient, sur chaque route, pour toute l’histoire.",
    // B · 6279920c0989
    "setupFields.whatYouRemember.label": "Qu’est-ce que tu te souviens d’avant ?",
    // B · 401854456756
    "setupFields.whatYouRemember.kind": "TEXTE",
    // B · 843e5bf0864f
    "setupFields.whatYouRemember.helpText": "Autant ou aussi peu que tu veux. Personne ici ne te croit de toute façon, deux personnes trouvent ça ennuyeux, et une trouve ça très intéressant pour ses propres raisons. Rien dans le monde ne vérifie.",
    // B · 7671f31cad02
    "setupFields.whatYouRemember.placeholder": "ex. Un couloir d’hôpital, et le fait que j’avais trente-quatre ans, pas dix-huit.",
    // B · 3aa4328667d6
    "protagonist.kind": "BLANC",
    // A · 22e5f9a6d4b9
    "opening": "La pierre est noire, usée en creux par cent ans de mains, et c’est ton tour.\n\nVoss Marrin prend ton poignet et pose ta paume à plat. Doigts écartés. Ça ne fait pas mal. Environ quatre secondes.\n\nRien ne se passe.\n\nElle fronce les sourcils vers la pierre plus que vers toi, puis repose ta main.\n\nRien ne se passe.\n\nDerrière toi, quatre cents personnes se taisent, dans ce silence gêné qui accompagne toujours la découverte publique d’une mauvaise nouvelle.\n\n« Je suis tenue d’appeler la guérisseuse de service, » dit Marrin, à toi, avant de s’exécuter.\n\nLa femme qui descend les marches a vingt-quatre ans, cheveux roux défaits, manteau ouvert sur un vêtement beaucoup trop vif pour une salle d’assise. Elle s’agenouille, prend ton poignet, et le tient deux secondes de trop.\n\nPuis elle se relève et annonce à la salle que la pierre est défectueuse.",
    // A · d077512025ad
    "openingSuggestions": ["Je garde la main en place et lui dis, tout bas, à elle seul : « Ce n’est pas la pierre qui est défectueuse, hein. » Je veux voir sa tête avant qu’elle décide quoi dire.","Je la laisse me relever et je joue le jeu — fort, gaiement, devant toute la salle. « D’accord. Pierre défectueuse. Vers qui je me tourne pour une deuxième chance ? » Si elle va mentir pour moi, je ne vais pas la laisser faire seule.","Je ne lui adresse pas un mot. Je regarde au-delà d’elle, vers la rambarde de la galerie, l’homme en noir qui n’a pas bougé depuis que j’ai reposé la main et qui continue de me fixer droit dans les yeux."],
  },
});
