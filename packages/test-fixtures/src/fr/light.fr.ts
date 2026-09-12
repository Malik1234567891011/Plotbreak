import { registerWorldText } from '@plotbreak/contracts';

/**
 * Light, in French.
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
  storyId: "story_light",
  text: {
    // A · 7f5a48c1f32d
    "fantasyLabel": "Tout le monde pense pouvoir battre L.",
    // A · 85e970cb0777
    "hook": "Tu as trouvé un carnet qui tue toute personne dont tu connais le vrai nom et le visage, et tous ceux qui ont déjà débattu sur la façon dont Light aurait dû agir vont bientôt découvrir s’ils avaient raison.",
    // A · 7304a781164e
    "premise": "Tu as dix-sept ans, tu es le meilleur élève du pays, et tu t’ennuies depuis environ quatre ans.\n\nCet après-midi, un carnet noir est tombé du ciel dans la cour de ton lycée. Les instructions à l’intérieur disent que la personne dont le nom y est écrit va mourir. Tu es à peu près sûr que c’est une blague, et tu vas quand même vérifier, parce que l’alternative, c’est de ne pas vérifier.\n\nSi ça marche, tu auras quelque chose que personne n’a jamais eu : le pouvoir de faire disparaître quelqu’un du monde depuis ta chambre, avec un stylo et sans risque. Le monde va mal, et tu as un avis sur tout ça.\n\nCe que tu n’as pas, c’est un plan, un manuel, ni la moindre idée de ce que tu manies. Tu ignores que le carnet a besoin d’un visage en plus d’un nom, et que quelque chose se tient derrière toi.\n\nTu ignores aussi que dans un mois, le meilleur détective en vie te cherchera précisément, et que ton père dirigera la moitié japonaise de l’enquête.\n\nChacun a son avis sur la façon dont ça aurait dû se passer. Aujourd’hui, le monde réagit au tien.",
    // A · 0b224e61fb3c
    "mechanicsChips": ["L ne sait que ce que tu lui as dit","Personne ne te soupçonne d’être le protagoniste","Le carnet est un objet physique","Tu peux le brûler cet après-midi","Les ordres que tu donnes sont vraiment exécutés"],
    // A · d6db3e5aa402
    "creatorNote": "La célèbre partie compte une douzaine de décisions que les gens ont passé vingt ans à qualifier d’erreurs. Ignore la diffusion, et L ne saura jamais qu’il est au Kanto. Laisse Raye finir sa surveillance, il te blanchira. Dis clairement à Mikami de ne jamais toucher au vrai carnet sans ton ordre, et il ne le touchera pas. Ne dis rien à l’entrepôt tant qu’il n’y a pas de morts. Ou brûle ce truc cet après-midi et deviens le détective que ton père imagine. Chacune de ces routes est un vrai aboutissement, et aucune ne valide la critique qui semblait évidente.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · cd6fddcdf088
    "rules.hardCanon": ["Le joueur est Light Yagami, dix-sept ans, meilleur élève de l’académie privée Daikoku, fils du commissaire de la NPA Soichiro Yagami, frère de Sayu.","Light avant le carnet est appliqué, poli, sociable, proche de sa famille, sincèrement troublé par la criminalité, arrogant sous une façade parfaite, et extrêmement ennuyé. Il n’est pas encore un monstre. Le carnet transforme des traits déjà présents.","Le carnet exige le vrai nom de la cible et son visage. Un nom sans le visage correct ne marche pas, et un pseudonyme seul ne marche jamais. Les morts non précisées sont par défaut des crises cardiaques.","Des pages et fragments du carnet conservent leur pouvoir. Posséder et détenir sont deux choses différentes. Toucher un carnet peut révéler son Shinigami attaché à la personne qui le touche, et à personne d’autre.","Abandonner la possession efface les souvenirs liés au carnet. Toucher à nouveau le carnet peut les restaurer selon les mêmes règles. Un Light sans mémoire est sincèrement son moi d’avant Kira et ne doit jamais être écrit comme secrètement en train de comploter.","Les Yeux du Shinigami échangent la moitié de la durée de vie restante de l’utilisateur contre la capacité de lire les vrais noms et durées de vie d’un visage. C’est une vraie branche, ce n’est pas une victoire instantanée, et on ne doit pas supposer un refus canonique.","Ryuk n’est pas le serviteur de Light. Il s’ennuie, trouve Light divertissant, se fiche de sa victoire, et retient des informations quand c’est plus intéressant de les cacher.","L est brillant et n’est pas médium. Il ne sait que ce que les actions du joueur ont réellement rendu connaissable. Personne dans ce monde ne soupçonne Light parce que Light est le protagoniste.","Soichiro Yagami a une intégrité extraordinaire et n’est pas stupide. Son seul angle mort est son fils.","Misa Amane est impulsive et dévouée et n’est pas stupide. Son problème est le dévouement, pas l’intelligence.","Near et Mello sont des personnes différentes qui raisonnent différemment et ne doivent jamais se ressembler. Aucun des deux n’est le destin.","Rien après cet après-midi n’est dû. Aucun événement n’est inventé pour remplacer un autre que le joueur a empêché, le carnet ne téléporte jamais, et aucun personnage ne viole une instruction explicite parce que la version célèbre en a besoin."],
    // A · 6d55a5ed424b
    "rules.toneGuide": "Thriller psychologique, concret et procédural. La tension vient de l’information : qui sait quoi, qui peut découvrir quoi, et quelles conséquences précises a chaque action sur ce qui devient connaissable. Ne jamais écrire une scène où quelqu’un devine la vérité. La vie quotidienne doit porter le récit et être authentique avant que Kira ne l’efface — un dîner en famille, Sayu qui demande de l’aide en maths, une mère fière, un père qui rentre tard et fatigué. Un joueur qui ne passe jamais une soirée à cette table aura une autre histoire, bien moins puissante. Light joue constamment, et la prose doit laisser sa performance s’exprimer. Montre le calcul, sans commenter. Il a le droit d’avoir raison. Ne pas écrire la sagesse du recul dans un adolescent, ni laisser le narrateur juger — le lecteur sait le faire lui-même. Ryuk est effrayant et hors de place dans une chambre d’ado, il doit le rester ; il est amusé plutôt que menaçant, et ne commente pas à chaque tour. L est enfantin dans la compétition, direct, socialement bizarre, et vraiment fasciné. Les morts sont une procédure administrative, presque jamais dramatiques : un nom, un délai, un fait divers à la télé. C’est dans ce vide que tout le poids moral de ce monde prend sens. Pas de yeux rouges, pas de ricanements, pas de discours sur des dieux, sauf si le joueur décide d’en écrire un.",
    // B · a1ccc15536dc
    "skills.deduction.name": "Déduction",
    // B · a8c1fa8269c3
    "skills.deduction.attribute": "esprit",
    // B · e6e3492e8a66
    "skills.deduction.description": "Lire une situation pour ce qu’elle implique plutôt que ce qu’elle dit. Ce en quoi il est meilleur que tout le monde sauf une personne.",
    // B · 17d2cd5ea858
    "skills.planning.name": "Planification",
    // B · a8c1fa8269c3
    "skills.planning.attribute": "esprit",
    // B · 0f4d46c1a5be
    "skills.planning.description": "Enchaîner des actions pour que chacune ressemble à autre chose. Aussi la discipline de ne pas faire le coup satisfaisant.",
    // B · fb8bc434078d
    "skills.performance.name": "Performance",
    // B · cfb7a15645c3
    "skills.performance.attribute": "présence",
    // B · 70a0fa0de8c4
    "skills.performance.description": "Être exactement le Light Yagami que la pièce croit déjà voir. Sans effort, constant, et la première chose qui craque sous la pression.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · 58f78d8f8123
    "skills.persuasion.description": "Amener quelqu’un à arriver à ta conclusion en croyant y être arrivé seul. Marche sur presque tout le monde, pas du tout sur deux personnes.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "volonté",
    // B · efcf4d1e60f4
    "skills.composure.description": "Ne pas réagir. À un nom, une caméra, une question, ou une chose aux yeux jaunes derrière le bureau.",
    // B · 725bc338a045
    "skills.tradecraft.name": "Savoir-faire",
    // B · a8c1fa8269c3
    "skills.tradecraft.attribute": "esprit",
    // B · 98b8d02169bb
    "skills.tradecraft.description": "Surveillance, contre-surveillance, camouflage, et la petite ingénierie physique pour cacher quelque chose dans une pièce que ta mère nettoie.",
    // B · a8c4a2342531
    "skills.procedure.name": "Procédure policière",
    // B · a8c1fa8269c3
    "skills.procedure.attribute": "esprit",
    // B · 69a2e2fe7de6
    "skills.procedure.description": "Ce qu’une enquête peut et ne peut pas faire, appris en dix-sept ans de conversations au dîner avec un homme qui ne parle jamais de ses affaires.",
    // B · 202aa3d6651d
    "skills.athletics.name": "Athlétisme",
    // B · 7ce3b6387340
    "skills.athletics.attribute": "agilité",
    // B · ba005489dec5
    "skills.athletics.description": "Tennis au niveau national junior, et la compétence générale de quelqu’un qui est bon à tout exprès.",
    // B · 4eaad8d59c10
    "skills.shinigami_lore.name": "Règles du carnet",
    // B · 5dbc8bb102ac
    "skills.shinigami_lore.attribute": "arcane",
    // B · 614ad6997cc5
    "skills.shinigami_lore.description": "Ce que l’objet fait vraiment, assemblé à partir des instructions de couverture, d’expériences contrôlées, et de ce que Ryuk trouve amusant de confirmer.",
    // B · cf929c9acc8a
    "resources.composure.name": "Calme",
    // B · 34e8ec1ac388
    "resources.composure.polarity": "BON ÉLEVÉ",
    // B · fa158691ad95
    "resources.composure.zeroStateConsequence": "La performance s’est arrêtée. Pas dramatiquement — il est sec avec Sayu, il répond à une question avec un demi-temps de retard, il oublie quelle version d’une histoire il a racontée à son père. Tous ceux qui le connaissent remarquent quelque chose et personne ne peut le nommer, et l’un d’eux est un détective.",
    // B · 1691b51b7aa4
    "resources.composure.color": "#5E7CA6",
    // B · b403a5a26744
    "resources.pattern.name": "Motif",
    // B · a34adbda2422
    "resources.pattern.polarity": "BON FAIBLE",
    // B · c579c7614c78
    "resources.pattern.zeroStateConsequence": "Il n’y a pas de motif, parce qu’il n’y a rien à en tirer. Les criminels meurent au rythme habituel. Personne n’a tracé de graphique. Aucune organisation sur terre n’a de raison de croire qu’une seule personne fait quoi que ce soit.",
    // B · 3ba0af7ec5f2
    "resources.pattern.color": "#8E4A3C",
    // B · 4540c135c670
    "resources.exposure.name": "Exposition",
    // B · a34adbda2422
    "resources.exposure.polarity": "BON FAIBLE",
    // B · de62ca76f686
    "resources.exposure.zeroStateConsequence": "Il n’y a rien dans le monde qui le désigne. Aucun fait, aucun enregistrement, aucune coïncidence sur laquelle quelqu’un pourrait s’appuyer. Quoi que les gens croient à son sujet, ils ne peuvent pas le démontrer, et ce monde fonctionne sur la démonstration.",
    // B · 3020d4888464
    "resources.exposure.color": "#6B5F4B",
    // B · 42dc05451c02
    "resources.certainty.name": "Certitude",
    // B · a34adbda2422
    "resources.certainty.polarity": "GOOD_LOW",
    // B · bcd0851f0008
    "resources.certainty.zeroStateConsequence": "Il a cessé de croire qu’il ne peut pas perdre, ce qui pour cette personne en particulier est l’état le plus sain disponible et se lit de l’extérieur comme un gros problème. Il demande aux autres ce qu’ils en pensent. Il choisit l’option prudente sans qu’on ait besoin de la justifier. Il est beaucoup plus difficile à attraper.",
    // B · fedb2480f4eb
    "resources.certainty.color": "#B8983E",
    // A · fa9b73cc7680
    "items.school_bag.name": "Ton Sac",
    // B · 7e6bc7bb9a8a
    "items.school_bag.tags": ["banal"],
    // B · eea96276bad0
    "items.school_bag.rarity": "commun",
    // B · 68c9f5d1a3fc
    "items.school_bag.description": "Un sac d’école avec quatre manuels, une trousse, et un ensemble d’annales qu’il a terminées en août.",
    // B · a2eee2292d1b
    "items.school_bag.loreText": "Sans intérêt, et la raison pour laquelle il a un endroit où mettre un carnet sur le chemin du retour. C’est aussi le seul objet qu’il possède au début de cette histoire, ce qui est l’inventaire honnête d’un garçon de dix-sept ans dans la dernière période d’un mercredi.",
    // A · 8a55cc4eabbd
    "items.death_note.name": "Le Death Note",
    // B · 5ab304332e6d
    "items.death_note.tags": ["quête","carnet","surnaturel"],
    // B · b3d251b141db
    "items.death_note.rarity": "unique",
    // B · 81a6d87d5851
    "items.death_note.description": "Un carnet noir à couverture rigide, format A5, légèrement gondolé le long du dos, avec deux mots en anglais sur la couverture et des instructions à l’intérieur.",
    // B · be94f8f6edd6
    "items.death_note.loreText": "Les instructions à l’intérieur de la couverture sont les seules règles dont il dispose au départ, et elles sont incomplètes de façons que l’objet ne mentionne pas. C’est un objet physique : il peut être caché, trouvé, volé, déchiré, brûlé, enterré, posté ou laissé dans un casier. Quiconque le touche peut voir ce qui lui est attaché. Celui qui le possède n’est pas forcément celui qui le tient, et la différence entre ces deux mots décide toute l’histoire.",
    // A · e0c2d9e8ca99
    "items.note_page.name": "Une Page",
    // B · 5ab304332e6d
    "items.note_page.tags": ["quête","carnet","surnaturel"],
    // B · b3d251b141db
    "items.note_page.rarity": "unique",
    // B · 7a68c7e619e4
    "items.note_page.description": "Une seule feuille arrachée le long de la reliure. Identique à n’importe quelle autre feuille jusqu’à ce qu’elle soit utilisée.",
    // B · 450f37ca7874
    "items.note_page.loreText": "Le pouvoir est dans le papier, pas dans la reliure, ce qui veut dire que l’objet peut être divisé et distribué et n’est donc jamais entièrement comptabilisé par personne. Une page dans un portefeuille est une arme qu’on ne peut pas vous fouiller. Une page donnée à quelqu’un d’autre est une décision qu’on ne peut pas reprendre.",
    // A · 7a08aa15d03f
    "items.note_scrap.name": "Un Morceau",
    // B · 42cb64984719
    "items.note_scrap.tags": ["quête","carnet","surnaturel","caché"],
    // B · b3d251b141db
    "items.note_scrap.rarity": "unique",
    // B · 05ddf865fd1a
    "items.note_scrap.description": "Un fragment d’environ deux centimètres carrés, plié jusqu’à disparaître, avec la place pour un nom écrit en très petit.",
    // B · 58327e5697ca
    "items.note_scrap.loreText": "Assez petit pour une boîte de montre, une chaussure, un ourlet, le dos d’une photo. L’existence des fragments est la raison pour laquelle un homme peut être fouillé, confiné, privé du carnet et de ses souvenirs, et garder toute sa position dans un espace de la taille d’un ongle.",
    // A · 83d33a1ddca3
    "items.fake_note.name": "Un Cahier",
    // B · 5d82c17513f6
    "items.fake_note.tags": ["quête","accessoire"],
    // B · ad8a1eccd9b6
    "items.fake_note.rarity": "rare",
    // B · 639f861b6c38
    "items.fake_note.description": "Un carnet noir à couverture rigide, format A5, acheté en papeterie et rempli par quelqu’un avec une écriture impeccable.",
    // B · 60ffbed5e380
    "items.fake_note.loreText": "Sans pouvoir, indiscernable à bout de bras, et donc l’objet le plus utile en fin de partie. Le fait de savoir lequel des deux carnets est lequel est une donnée du monde dès l’achat, et ne change pas ensuite pour convenir à quelqu’un.",
    // A · 757b3708aa82
    "items.hidden_drawer.name": "Le Tiroir",
    // B · 2e57589bca78
    "items.hidden_drawer.tags": ["quête","cachette"],
    // B · b3d251b141db
    "items.hidden_drawer.rarity": "unique",
    // B · 2ef1ac1b3985
    "items.hidden_drawer.description": "Un faux fond dans le tiroir du bureau, avec un mécanisme dessous et une petite cartouche d’encre reliée au cadre.",
    // B · 17b77dfc6197
    "items.hidden_drawer.loreText": "Construit en un après-midi par quelqu’un avec de meilleurs instincts d’ingénieur que personne ne lui en a jamais demandé. L’ouvrir de la mauvaise façon détruit ce qu’il y a dedans, ce qui fait que ce n’est pas une cachette mais un test que celui qui l’ouvre rate une fois et ne peut pas rater deux fois. Sa mère nettoie cette pièce chaque semaine.",
    // A · 2794e7005c02
    "items.apples.name": "Pommes",
    // B · ad3972dbd5ac
    "items.apples.tags": ["consommable","shinigami"],
    // B · eea96276bad0
    "items.apples.rarity": "commun",
    // B · 6dc965fdca38
    "items.apples.description": "Pommes rouges. Quatre pour l’instant, parce que quelqu’un les mange à un rythme difficile à expliquer en bas.",
    // B · 73b0e38fef3a
    "items.apples.loreText": "Le seul levier qu’on ait sur la chose dans le coin de la pièce. Il n’en a pas besoin et ne cessera pas de demander, et un Shinigami ennuyé qui se voit refuser des pommes est un Shinigami ennuyé qui se porte moins volontaire et trouve d’autres choses à faire. La facture des courses est un vrai problème opérationnel.",
    // A · 9deda93b3175
    "items.watch.name": "La Montre",
    // B · 2e57589bca78
    "items.watch.tags": ["quête","cachette"],
    // B · 76df96db800b
    "items.watch.equipSlot": "poignet",
    // B · ad8a1eccd9b6
    "items.watch.rarity": "rare",
    // B · 0b849e1ae494
    "items.watch.description": "Une montre ordinaire avec le fond modifié, un compartiment à charnière derrière le cadran, et une goupille à actionner deux fois.",
    // B · e619c89ac180
    "items.watch.loreText": "Treize mois de surveillance lui ont appris que le seul endroit sûr pour quoi que ce soit est un endroit déjà fouillé et vidé. Une montre est examinée une fois, au début, quand elle est vide.",
    // A · 2c24ec0f16bb
    "items.tv_rig.name": "Le Matériel TV",
    // B · 983da9910397
    "items.tv_rig.tags": ["quête","technique"],
    // B · af5aaf8f4e56
    "items.tv_rig.rarity": "peu commun",
    // B · 9de3d8a278ef
    "items.tv_rig.description": "Une mini-télévision et un bout de papier, assemblés dans un objet que personne ne regarde deux fois, utilisable d’une main sous une table.",
    // B · 1ec30f5c3a7d
    "items.tv_rig.loreText": "Le problème avec les caméras dans une chambre, ce n’est pas qu’elles voient le carnet. C’est qu’un garçon qui ne tient jamais en place est aussi suspect qu’un garçon pris en train d’écrire. Ça règle les deux : il fait ses devoirs, filmé, onze heures par jour, et travaille dans les onze secondes où personne ne regarde ses mains.",
    // A · 246601c44c5c
    "items.ntv_file.name": "Le Dossier de la Diffusion",
    // B · f88c6548fc3b
    "items.ntv_file.tags": ["quête","preuve"],
    // B · ad8a1eccd9b6
    "items.ntv_file.rarity": "rare",
    // B · 45d9819f98fe
    "items.ntv_file.description": "Horaires, cartes de diffusion régionales et une note interne sur une émission qui n’est passée que dans une partie du pays.",
    // B · 09171e19368e
    "items.ntv_file.loreText": "Le document qui explique pourquoi un homme à la télévision a soudain cru que Kira était au Japon. Le lire avant de toucher le carnet est accessible à tous ceux qui y pensent, et c’est la différence entre répondre à une question et tomber dans un piège.",
    // A · 06da0c997a16
    "items.misa_diary.name": "Le Journal de Misa",
    // B · f88c6548fc3b
    "items.misa_diary.tags": ["quête","preuve"],
    // B · ad8a1eccd9b6
    "items.misa_diary.rarity": "rare",
    // B · 4332038c7b48
    "items.misa_diary.description": "Un journal écrit en écriture ronde avec des autocollants, notant rendez-vous, sentiments et dates qu’il ne faudrait écrire nulle part.",
    // B · 67326c7335b9
    "items.misa_diary.loreText": "Elle n’est pas négligente parce qu’elle est stupide. Elle est négligente parce qu’elle n’a jamais eu à supposer que quelqu’un la lisait. C’est l’objet le plus dangereux qu’ils possèdent tous les deux, et elle serait vraiment blessée qu’on le lui dise.",
    // A · f6263b39e45b
    "items.fathers_notes.name": "Les Notes de ton Père",
    // B · f88c6548fc3b
    "items.fathers_notes.tags": ["quête","preuve"],
    // B · af5aaf8f4e56
    "items.fathers_notes.rarity": "peu commun",
    // B · 91284eee9785
    "items.fathers_notes.description": "Un carnet usé, écrit en petites lettres soignées, qu’un chef de service ne devrait pas ramener chez lui et qu’il ramène chaque soir depuis vingt ans.",
    // B · a018ba571f7a
    "items.fathers_notes.loreText": "Noms de suspects, dates de réunions, la forme d’une enquête vue de l’intérieur. La source de renseignement la plus précieuse du pays est dans une mallette dans son propre couloir, laissée là par un homme d’une intégrité extraordinaire dont le seul point aveugle est son fils. La lire n’est pas difficile. C’est un choix.",
    // A · e289005aa4fd
    "abilities.ab_write_name.name": "Écrire un Nom",
    // B · 5e0e9765952d
    "abilities.ab_write_name.tags": ["carnet"],
    // B · affef152df61
    "abilities.ab_write_name.description": "Un vrai nom, et un visage qu’il a vraiment vu. Quarante secondes plus tard, un cœur s’arrête quelque part, et il l’apprend aux infos comme tout le monde.",
    // B · 39d896e20aec
    "abilities.ab_write_name.targetRule": "UNIQUE",
    // B · 2fcb918c3d70
    "abilities.ab_write_name.requires.flagsSet": ["a_carnet"],
    // A · 411c81dc514d
    "abilities.ab_specify.name": "Préciser les Détails",
    // B · c1e4405c9d40
    "abilities.ab_specify.tags": ["carnet","contrôle"],
    // B · b3a4dcf940d8
    "abilities.ab_specify.description": "Cause, heure, et ce que la personne fait dans les minutes avant. Bien plus puissant qu’une crise cardiaque et bien plus lisible, parce qu’une mort précisée est une phrase que quelqu’un peut lire.",
    // B · 39d896e20aec
    "abilities.ab_specify.targetRule": "UNIQUE",
    // B · 2fcb918c3d70
    "abilities.ab_specify.requires.flagsSet": ["a_carnet"],
    // A · 20853f52112d
    "abilities.ab_relinquish.name": "Abandonner",
    // B · e0c69de603e6
    "abilities.ab_relinquish.tags": ["carnet","mémoire"],
    // B · bfa47ef2bb40
    "abilities.ab_relinquish.description": "Rendre la propriété et perdre tous les souvenirs que le carnet lui a jamais donnés. Pas un déguisement — il ne sait vraiment pas, et il pense chaque mot qu’il dit ensuite.",
    // B · 43afef8b429c
    "abilities.ab_relinquish.targetRule": "SOI",
    // B · 2fcb918c3d70
    "abilities.ab_relinquish.requires.flagsSet": ["a_carnet"],
    // A · e397985658ce
    "abilities.ab_touch_to_remember.name": "Toucher Encore",
    // B · e0c69de603e6
    "abilities.ab_touch_to_remember.tags": ["carnet","mémoire"],
    // B · 43ae93aaebd7
    "abilities.ab_touch_to_remember.description": "Peau sur le papier, et treize mois de ses propres raisonnements arrivent d’un coup, au milieu de ce qu’il faisait.",
    // B · 43afef8b429c
    "abilities.ab_touch_to_remember.targetRule": "SOI",
    // B · 008968ee8054
    "abilities.ab_touch_to_remember.requires.flagsSet": ["propriété_rendue"],
    // A · 236cd42483bc
    "abilities.ab_shinigami_eyes.name": "Le Pacte des Yeux",
    // B · d38c6d63da93
    "abilities.ab_shinigami_eyes.tags": ["carnet","surnaturel","irréversible"],
    // B · 779ef51264fb
    "abilities.ab_shinigami_eyes.description": "La moitié de ce qu’il lui reste, en échange de lire un vrai nom sur n’importe quel visage qu’il voit. Ce n’est pas une victoire. Il doit toujours être dans la pièce avec eux.",
    // B · 43afef8b429c
    "abilities.ab_shinigami_eyes.targetRule": "SOI",
    // B · 2fcb918c3d70
    "abilities.ab_shinigami_eyes.requires.flagsSet": ["a_carnet"],
    // A · f506e69336d8
    "abilities.ab_perform.name": "Joue Light Yagami",
    // B · 09b907576d49
    "abilities.ab_perform.tags": ["social"],
    // B · dd143fc8eaea
    "abilities.ab_perform.description": "Devenir précisément la personne en qui la pièce croit déjà, même pour ceux qui testent activement s’il l’est. La capacité la plus utilisée dans ce monde, de loin.",
    // B · 43afef8b429c
    "abilities.ab_perform.targetRule": "SOI",
    // A · 0e83697b470e
    "abilities.ab_deduce.name": "Trouver",
    // B · 3de7bf9a302d
    "abilities.ab_deduce.tags": ["esprit"],
    // B · a9ea3795bc1a
    "abilities.ab_deduce.description": "Prendre ce qui est vraiment disponible et aller plus loin qu’on ne l’attend. C’est ce qu’il avait avant le carnet et ce qu’il serait sans.",
    // B · c44e6dd70059
    "abilities.ab_deduce.targetRule": "AUCUN",
    // A · ab526a64cada
    "abilities.ab_give_an_order.name": "Donner Un Ordre Clair",
    // B · 006747986232
    "abilities.ab_give_an_order.tags": ["social","mandataire"],
    // B · e51ec2661c09
    "abilities.ab_give_an_order.description": "Dire à quelqu’un, avec des mots qu’on ne peut pas réinterpréter, exactement ce qu’il ne doit jamais faire. Un ordre explicite est obéi. Un ordre vague est interprété, et la différence s’entend — un ordre explicite vous est répété.",
    // B · 39d896e20aec
    "abilities.ab_give_an_order.targetRule": "SIMPLE",
    // A · f677ded98f40
    "abilities.ab_wait.name": "Attendre",
    // B · eeff779144c0
    "abilities.ab_wait.tags": ["discipline"],
    // B · 7a3534d4fe13
    "abilities.ab_wait.description": "Ne rien faire, délibérément, alors qu’une chose satisfaisante est disponible. Mécaniquement le mouvement le plus fort dans ce monde et le plus dur à faire pour cette personne.",
    // B · c44e6dd70059
    "abilities.ab_wait.targetRule": "AUCUN",
    // A · a70d66cebde1
    "abilities.ab_walk_past_it.name": "Continuer Son Chemin",
    // B · cc603f65bd76
    "abilities.ab_walk_past_it.tags": ["décision"],
    // B · 2bfb9c2e64e4
    "abilities.ab_walk_past_it.description": "Le regarder une fois et rentrer chez soi. Si quelqu’un veut récupérer son carnet ridicule, qu’il aille se mouiller pour l’avoir.",
    // B · c44e6dd70059
    "abilities.ab_walk_past_it.targetRule": "AUCUN",
    // A · f32e55b2eb26
    "abilities.ab_test_it.name": "Tester",
    // B · 0d742fe368fa
    "abilities.ab_test_it.tags": ["carnet","décision"],
    // B · 9411b2f3e7b5
    "abilities.ab_test_it.description": "Un nom, un visage à la télé, et quarante secondes pour savoir si tu es un idiot ou autre chose.",
    // B · 39d896e20aec
    "abilities.ab_test_it.targetRule": "SIMPLE",
    // B · 2fcb918c3d70
    "abilities.ab_test_it.requires.flagsSet": ["a_le_carnet"],
    // A · b436fdedf74b
    "abilities.ab_destroy_it.name": "Détruire",
    // B · c9d1aa90c739
    "abilities.ab_destroy_it.tags": ["carnet","décision","irréversible"],
    // B · 78126f8cb94e
    "abilities.ab_destroy_it.description": "Le brûler, dans une poubelle derrière la maison, et rester là jusqu’à ce qu’il ne reste plus rien à reconstituer.",
    // B · c44e6dd70059
    "abilities.ab_destroy_it.targetRule": "AUCUN",
    // B · 2fcb918c3d70
    "abilities.ab_destroy_it.requires.flagsSet": ["a_le_carnet"],
    // A · 4a784e3e95a0
    "abilities.ab_stop_at_one.name": "S’arrêter",
    // B · 0d742fe368fa
    "abilities.ab_stop_at_one.tags": ["carnet","décision"],
    // B · b15dbeabdd69
    "abilities.ab_stop_at_one.description": "Le refermer, le mettre quelque part, et ne plus jamais l’ouvrir. Une réponse complète plutôt qu’un abandon.",
    // B · c44e6dd70059
    "abilities.ab_stop_at_one.targetRule": "AUCUN",
    // B · 2fcb918c3d70
    "abilities.ab_stop_at_one.requires.flagsSet": ["a_le_carnet"],
    // A · c3e2063798a7
    "abilities.ab_go_all_in.name": "Aller jusqu’au bout",
    // B · 0d742fe368fa
    "abilities.ab_go_all_in.tags": ["carnet","décision"],
    // B · c3774640d0e7
    "abilities.ab_go_all_in.description": "Décider que c’est ça ta vie, et commencer à le faire sérieusement plutôt que nerveusement.",
    // B · c44e6dd70059
    "abilities.ab_go_all_in.targetRule": "AUCUN",
    // B · 2fcb918c3d70
    "abilities.ab_go_all_in.requires.flagsSet": ["a_le_carnet"],
    // A · ab96973f4b33
    "abilities.ab_work_him.name": "Trouver les noms d’abord",
    // B · 7d6f95759cc7
    "abilities.ab_work_him.tags": ["décision","tradecraft"],
    // B · 715f832020e2
    "abilities.ab_work_him.description": "Obliger l’homme qui te suit à remettre les onze autres dossiers avant qu’il ne lui arrive quoi que ce soit. Beaucoup plus utile et beaucoup plus traçable.",
    // B · 39d896e20aec
    "abilities.ab_work_him.targetRule": "SIMPLE",
    // A · 028a9680ac41
    "abilities.ab_remove_him.name": "Le faire disparaître",
    // B · 0d742fe368fa
    "abilities.ab_remove_him.tags": ["carnet","décision"],
    // B · 0f91ba7902aa
    "abilities.ab_remove_him.description": "Mettre fin à la surveillance directement, et découvrir après qu’il avait une fiancée qui faisait ça pour vivre.",
    // B · 39d896e20aec
    "abilities.ab_remove_him.targetRule": "SIMPLE",
    // B · 2fcb918c3d70
    "abilities.ab_remove_him.requires.flagsSet": ["a_le_carnet"],
    // A · f758875e4702
    "abilities.ab_hide_in_plain_sight.name": "Travailler sous les caméras",
    // B · c84e48e251c6
    "abilities.ab_hide_in_plain_sight.tags": ["tradecraft","décision"],
    // B · 306a1cc4e77a
    "abilities.ab_hide_in_plain_sight.description": "Faire onze heures de devoirs filmés et onze secondes d’autre chose, et être les images les plus ennuyeuses jamais vues.",
    // B · 43afef8b429c
    "abilities.ab_hide_in_plain_sight.targetRule": "SOI-MÊME",
    // A · 58bf208639ff
    "abilities.ab_let_her_spend_herself.name": "La laisser payer",
    // B · c7b0490461df
    "abilities.ab_let_her_spend_herself.tags": ["décision","irréversible"],
    // B · 5eba32202197
    "abilities.ab_let_her_spend_herself.description": "Il y a une Shinigami qui tue pour protéger quelqu’un, et une règle qui la tue pour ça. Organise les circonstances et laisse la règle faire le reste.",
    // B · c44e6dd70059
    "abilities.ab_let_her_spend_herself.targetRule": "AUCUN",
    // B · d34217672798
    "abilities.ab_let_her_spend_herself.requires.flagsSet": ["a_rencontré_misa"],
    // A · a0a521537158
    "abilities.ab_do_it_yourself.name": "Faire soi-même",
    // B · c9d1aa90c739
    "abilities.ab_do_it_yourself.tags": ["carnet","décision","irréversible"],
    // B · c2fea9fb025f
    "abilities.ab_do_it_yourself.description": "Trouve le nom par tous les moyens, et écris-le de ta propre main, ce qui est un acte différent de faire en sorte que ça arrive.",
    // B · 39d896e20aec
    "abilities.ab_do_it_yourself.targetRule": "SINGLE",
    // B · 2fcb918c3d70
    "abilities.ab_do_it_yourself.requires.flagsSet": ["has_notebook"],
    // A · ebad6674d728
    "abilities.ab_let_him_live.name": "Le laisser vivre",
    // B · cc603f65bd76
    "abilities.ab_let_him_live.tags": ["décision"],
    // B · d3cec19598bf
    "abilities.ab_let_him_live.description": "Décide qu’un homme qui est sûr de toi sans pouvoir le prouver peut survivre, et laisse-le en vie pour qu’il continue d’être les deux.",
    // B · 39d896e20aec
    "abilities.ab_let_him_live.targetRule": "SINGLE",
    // A · a457f3a708b2
    "abilities.ab_tell_the_truth.name": "Leur dire la vérité",
    // B · c7b0490461df
    "abilities.ab_tell_the_truth.tags": ["décision","irréversible"],
    // B · fed1e01cd95a
    "abilities.ab_tell_the_truth.description": "Dis-le à voix haute à quelqu’un qui devra agir, et découvre ce qu’il fait. Pas un effondrement — une décision.",
    // B · 39d896e20aec
    "abilities.ab_tell_the_truth.targetRule": "SINGLE",
    // A · c021ca2fb7ee
    "abilities.ab_deal_with_him.name": "Gérer la situation",
    // B · cc603f65bd76
    "abilities.ab_deal_with_him.tags": ["décision"],
    // B · fd2ed2a2d3e9
    "abilities.ab_deal_with_him.description": "Atteins le plus impatient avant qu’il ne bouge, par le chemin qui est vraiment disponible.",
    // B · 39d896e20aec
    "abilities.ab_deal_with_him.targetRule": "SINGLE",
    // A · c4f10216a66e
    "abilities.ab_announce_it.name": "Explique-leur",
    // B · c1b79b033106
    "abilities.ab_announce_it.tags": ["décision","fierté"],
    // B · fd2e98b8eba6
    "abilities.ab_announce_it.description": "Dis à la pièce ce que tu as fait et pourquoi, pendant que ça se passe encore, parce que se faire comprendre fait partie de la victoire.",
    // B · e9383e6237fe
    "abilities.ab_announce_it.targetRule": "MULTI",
    // A · 08d74b913ec7
    "abilities.ab_say_nothing.name": "Ne dis rien",
    // B · 907ba36ba834
    "abilities.ab_say_nothing.tags": ["décision","discipline"],
    // B · cf3df4575dcb
    "abilities.ab_say_nothing.description": "Quarante secondes. Pas d’explication, pas de pourcentage, pas d’expression, jusqu’à ce que quelqu’un dans ce bâtiment soit vraiment mort. Le coup le plus fort de ce monde.",
    // B · 43afef8b429c
    "abilities.ab_say_nothing.targetRule": "SELF",
    // A · fab860dd00c2
    "abilities.ab_call_it_off.name": "Annule ça",
    // B · 907ba36ba834
    "abilities.ab_call_it_off.tags": ["décision","discipline"],
    // B · 2b38691ee2ef
    "abilities.ab_call_it_off.description": "Remarque que quelque chose cloche et annule, après avoir tout monté, sans savoir exactement ce qui cloche.",
    // B · c44e6dd70059
    "abilities.ab_call_it_off.targetRule": "NONE",
    // A · c574e3080ed4
    "abilities.ab_read_the_briefcase.name": "Lis ses notes",
    // B · 7d6f95759cc7
    "abilities.ab_read_the_briefcase.tags": ["décision","compétence"],
    // B · 0ceaaded63eb
    "abilities.ab_read_the_briefcase.description": "Onze secondes dans un couloir, avec une mallette appartenant à un homme d’une intégrité extraordinaire dont le seul angle mort, c’est toi.",
    // B · c44e6dd70059
    "abilities.ab_read_the_briefcase.targetRule": "NONE",
    // A · ddd4ba1ec83c
    "locations.daikoku_classroom.name": "Académie privée Daikoku",
    // A · 68ccf2177c88
    "locations.daikoku_classroom.shortName": "École",
    // B · 26e46e4ad662
    "locations.daikoku_classroom.description": "Troisième étage, côté fenêtre, dernier cours. Le prof travaille encore sur un problème qu’il a fini il y a onze minutes, et quelqu’un derrière lui demandera ses notes en sortant. Dehors, il fait gris et il va bientôt pleuvoir.",
    // B · 8e3efdf4e9a9
    "locations.daikoku_classroom.stageImage": "story_light/stage_daikoku_classroom",
    // B · 87b41a6da3c4
    "locations.daikoku_classroom.ambientSfx": ["craie","pluie qui commence","une chaise qui bouge"],
    // A · fd44d99163d7
    "locations.yagami_home.name": "La maison Yagami",
    // A · d2187d527809
    "locations.yagami_home.shortName": "Chez toi",
    // B · 1512330944f8
    "locations.yagami_home.description": "Une maison chaleureuse de classe moyenne où quelqu’un cuisine toujours et quelqu’un est toujours en retard. Sa mère est fière de lui d’une façon qu’elle exprime à voix haute. Sa sœur demandera de l’aide en maths. La mallette de son père est dans le couloir.",
    // B · f26a907c23db
    "locations.yagami_home.stageImage": "story_light/stage_yagami_home",
    // B · bb95a507e1b6
    "locations.yagami_home.ambientSfx": ["télévision en bas","cuisine","la porte d’entrée"],
    // A · c4d0d8bf7c84
    "locations.light_bedroom.name": "La chambre de Light",
    // A · f25239fe3891
    "locations.light_bedroom.shortName": "Chambre",
    // B · 82414fc39078
    "locations.light_bedroom.description": "Un bureau sous la fenêtre, des manuels rangés dans l’ordre d’utilisation, et un tiroir à faux fond. Il y a une chose dans ce coin de la pièce qui mesure neuf pieds de haut et que personne d’autre ne peut voir.",
    // B · 9f3dac0c1ebf
    "locations.light_bedroom.stageImage": "story_light/stage_light_bedroom",
    // B · 23d4a96e37de
    "locations.light_bedroom.ambientSfx": ["pluie sur vitre","un stylo","quelqu’un qui mange une pomme"],
    // A · c0b76bfd0360
    "locations.kanto_street.name": "Kanto",
    // A · c2475bf6fa39
    "locations.kanto_street.shortName": "La rue",
    // B · 6f682a127d77
    "locations.kanto_street.description": "Trains, passages piétons, halls de gare, supérettes et l’anonymat particulier d’une ville où personne ne regarde personne. Aussi soixante-quatre mille caméras, dont seules quelques-unes sont officielles.",
    // B · 3f8f80cfddb1
    "locations.kanto_street.stageImage": "story_light/stage_kanto_street",
    // B · 05674ef0af81
    "locations.kanto_street.ambientSfx": ["trains","carillon de passage piéton","pluie et trafic"],
    // A · 5b5261cf2c7b
    "locations.gamou_prep.name": "Lycée Gamou",
    // A · 5c99814df6d4
    "locations.gamou_prep.shortName": "Le lycée",
    // B · a61c5df82dc6
    "locations.gamou_prep.description": "Une pièce bondée de gens qui travaillent très dur à quelque chose qu’il trouve facile, c’est là qu’il va quand la maison est trop chaude pour réfléchir. Un endroit utile pour être vu en train d’être ordinaire.",
    // B · 72605aebd73c
    "locations.gamou_prep.stageImage": "story_light/stage_gamou_prep",
    // B · f0839ea5b5e8
    "locations.gamou_prep.ambientSfx": ["stylos","une toux","éclairage néon"],
    // A · 99661eb72d6e
    "locations.interpol.name": "Conférence de l’ICPO",
    // A · 9aea1c30462d
    "locations.interpol.shortName": "ICPO",
    // B · 486e26ae8821
    "locations.interpol.description": "Une salle où se trouvent des policiers hauts gradés de tous les pays, s’adressant à un ordinateur portable. Personne n’a rencontré celui qui parle et plusieurs doutent même de son existence.",
    // B · c034df598acf
    "locations.interpol.stageImage": "story_light/stage_interpol",
    // B · 93c662cbdd5d
    "locations.interpol.ambientSfx": ["climatisation","une voix synthétisée","chaises"],
    // A · cf795ec9c57e
    "locations.hotel_taskforce.name": "L’hôtel de la brigade d’intervention",
    // A · a7117eac758c
    "locations.hotel_taskforce.shortName": "L’hôtel",
    // B · fa8830f00ea8
    "locations.hotel_taskforce.description": "Une suite dont les lits ont été enlevés pour installer des écrans, six policiers épuisés, beaucoup de gâteau, et un homme assis sur une chaise d’une façon inhabituelle.",
    // B · 9693b58b2723
    "locations.hotel_taskforce.stageImage": "story_light/stage_hotel_taskforce",
    // B · 140df859ffa2
    "locations.hotel_taskforce.ambientSfx": ["bourdonnement d’écran","une cuillère dans une tasse","six hommes fatigués"],
    // A · ef7a8e30d2b2
    "locations.tooh_university.name": "Université To-Oh",
    // A · e636ee27f948
    "locations.tooh_university.shortName": "Le campus",
    // B · 4d9050fc0fcb
    "locations.tooh_university.description": "L’endroit où deux personnes arrivées ex æquo à l’examen d’entrée donnent ensemble le discours aux nouveaux, jouent au tennis devant tout le monde, et savent exactement ce que ce tennis signifie.",
    // B · b33ac99ed8bf
    "locations.tooh_university.stageImage": "story_light/stage_tooh_university",
    // B · ccee44dce0e5
    "locations.tooh_university.ambientSfx": ["une foule sur une barrière","tennis","amphithéâtre"],
    // A · fc779585cebe
    "locations.misa_apartment.name": "L’appartement de Misa",
    // A · 8a729b57faad
    "locations.misa_apartment.shortName": "Chez elle",
    // B · ef28cf397712
    "locations.misa_apartment.description": "Cher, encombré, éclairé comme un shooting de magazine, avec des vêtements partout et un journal sur la table qui ne devrait pas exister. Il y a une seconde chose dans cette pièce que personne ne voit, et qui ne l’aime pas.",
    // B · 1a0f3174ea8b
    "locations.misa_apartment.stageImage": "story_light/stage_misa_apartment",
    // B · 4281c623284f
    "locations.misa_apartment.ambientSfx": ["un sèche-cheveux","télévision pop","talons sur le parquet"],
    // A · 575f0c151041
    "locations.taskforce_hq.name": "Le quartier général de la cellule spéciale",
    // A · 79405be690ab
    "locations.taskforce_hq.shortName": "QG",
    // B · 996cc5c26640
    "locations.taskforce_hq.description": "Huit étages construits pour cette seule affaire, avec un ascenseur codé et un sous-sol dont personne ne parle. Celui qui y est enfermé voit tout et ne peut pas sortir.",
    // B · 539412e0823e
    "locations.taskforce_hq.stageImage": "story_light/stage_taskforce_hq",
    // B · 0288266cbf83
    "locations.taskforce_hq.ambientSfx": ["bourdonnement de serveur","un ascenseur","claviers"],
    // A · 206f6486f7d7
    "locations.yotsuba_boardroom.name": "La salle de réunion Yotsuba",
    // A · d2c9265c8105
    "locations.yotsuba_boardroom.shortName": "Yotsuba",
    // B · 44f17e0f4c52
    "locations.yotsuba_boardroom.description": "Huit cadres autour d’une table décidant quelles personnes dans le monde gênent leurs chiffres trimestriels, sur le ton d’hommes discutant un contrat logistique.",
    // B · 20c462def149
    "locations.yotsuba_boardroom.stageImage": "story_light/stage_yotsuba_boardroom",
    // B · 1607311f0f55
    "locations.yotsuba_boardroom.ambientSfx": ["ventilation","un projecteur","voix polies"],
    // A · 337983f429d0
    "locations.confinement.name": "La cellule d’isolement",
    // A · 2536718892cd
    "locations.confinement.shortName": "La cellule",
    // B · 5ef65ed79150
    "locations.confinement.description": "Une pièce nue, une caméra, un bandeau, et cinquante jours. Pas de papier, pas de fenêtre, pas d’horloge, et une voix qui demande parfois s’il a quelque chose à dire.",
    // B · 8d71cb869b1b
    "locations.confinement.stageImage": "story_light/stage_confinement",
    // B · e719d8744696
    "locations.confinement.ambientSfx": ["ventilation","moteur de caméra","rien du tout"],
    // A · 806c111e6e33
    "locations.spk_hq.name": "Le quartier général du SPK",
    // A · 2964937c1eae
    "locations.spk_hq.shortName": "SPK",
    // B · d80c01cb0938
    "locations.spk_hq.description": "Un bureau à New York avec un garçon assis par terre au milieu, construisant quelque chose avec des dés, entouré de gens qui ont décidé de le prendre au sérieux.",
    // B · e2b1965f4a97
    "locations.spk_hq.stageImage": "story_light/stage_spk_hq",
    // B · f7953367ad9a
    "locations.spk_hq.ambientSfx": ["dés sur moquette","écrans","voix américaines calmes"],
    // A · 7d1566e9cb2c
    "locations.mello_mafia.name": "La Base de la Mafia",
    // A · d6c55522f2ad
    "locations.mello_mafia.shortName": "Mello",
    // B · ec1c7c462d3e
    "locations.mello_mafia.description": "Un bâtiment industriel reconverti à Los Angeles, dirigé par quelqu’un qui préfère prendre un risque mortel plutôt que d’être deuxième derrière le garçon sur la moquette.",
    // B · 3e8276c4f567
    "locations.mello_mafia.stageImage": "story_light/stage_mello_mafia",
    // B · 7adc73f1e4e6
    "locations.mello_mafia.ambientSfx": ["ventilateurs industriels","une radio","un emballage en aluminium"],
    // A · 9866b9566f23
    "locations.nhn_studio.name": "Le Studio NHN",
    // A · 841dee13d8d1
    "locations.nhn_studio.shortName": "Le Studio",
    // B · a725c0d52f69
    "locations.nhn_studio.description": "Un plateau de diffusion où une femme lit chaque soir la position de Kira au pays, d’une voix conçue pour ressembler à celle de la météo.",
    // B · ca155fc850a7
    "locations.nhn_studio.stageImage": "story_light/stage_nhn_studio",
    // B · f3a0ec85748a
    "locations.nhn_studio.ambientSfx": ["air du studio","un régisseur","clignotement des lumières"],
    // A · d7ad724a27cb
    "locations.yellow_box.name": "L’entrepôt de la Boîte Jaune",
    // A · e4244788724e
    "locations.yellow_box.shortName": "Boîte Jaune",
    // B · 1a410e37f7a8
    "locations.yellow_box.description": "Un bâtiment abandonné avec des passerelles, des caisses empilées, des trous dans le toit par où la pluie passe, choisi par quelqu’un qui voulait que la dernière conversation de sa vie ait lieu dans un endroit qu’il avait choisi.",
    // B · b5b4b78979bb
    "locations.yellow_box.stageImage": "story_light/stage_yellow_box",
    // B · 746fbfbd0ad8
    "locations.yellow_box.ambientSfx": ["pluie à travers un toit","pas sur de l’acier","un très grand espace vide"],
    // B · a3f6aaab99d9
    "characters.ryuk.name": "Ryuk",
    // A · 68adfabf076a
    "characters.ryuk.role": "Le shinigami qui a fait tomber le carnet, venu par ennui, et qui se moque de savoir si tu gagnes",
    // A · 84e9672687e2
    "characters.ryuk.cardBlurb": "Il fait près de trois mètres, couleur de cadavre gris, dans la chambre d’un adolescent, et il veut des pommes. Il répondra à quelques questions directes, mais gardera le reste pour lui. Il n’est pas ton serviteur ni ton ami, et il a déjà fait ça.",
    // B · fcca6b746d0b
    "characters.ryuk.pronouns": "il/lui",
    // A · 53cdeacee44e
    "characters.ryuk.publicTraits": ["S’amuse de tout","Mange en permanence","Ne donne rien d’utile"],
    // B · 30f2ab2ebd92
    "characters.ryuk.hiddenDrives": ["Il s’ennuie à un niveau sans équivalent humain, et la seule chose qu’il cherche est que l’heure qui vient soit intéressante","Il est lié par des règles qu’il ne compte pas expliquer, dont une sur ce qui arrive à un Shinigami qui tue pour prolonger la vie d’un humain"],
    // B · b5a0d6b738ec
    "characters.ryuk.values": ["Être diverti","La lettre de la règle à laquelle il est vraiment lié, qu’il suivra à la lettre sans jamais la révéler"],
    // B · d21208be177e
    "characters.ryuk.fears": ["L’ennui, vraiment, et comme seule vraie motivation"],
    // A · eed5d3ac991b
    "characters.ryuk.socialStyle": "Il flotte au bord de la pièce en commentant, invisible aux autres, sans enjeu social. Il rit à des choses que les humains ne trouvent pas drôles. Il demande des pommes en plein milieu d’une crise.",
    // B · 4b64d620a7f4
    "characters.ryuk.boundaries": ["N’écrira pas un nom à la place du joueur","N’expliquera pas une règle que le joueur n’a pas méritée en posant la bonne question ou en faisant la bonne expérience"],
    // B · 9237564705e6
    "characters.ryuk.goals": ["Regarder ça partir dans une direction inattendue","Des pommes"],
    // B · 26ba2f7ad8a2
    "characters.ryuk.secrets.ryuk_the_ending.fact": "Il a dit au joueur dès le début comment ça se termine pour celui qui possède le carnet, en une phrase, et le joueur n’a pas pris ça comme une information.",
    // B · 47558a04be8d
    "characters.ryuk.secrets.ryuk_the_ending.visibility": "NPC_PRIVATE",
    // B · 517aedf1e5a3
    "characters.ryuk.secrets.ryuk_the_ending.revealHint": "Il le répète, joyeusement, chaque fois qu’on le lui demande, et ça ne ressemble jamais à un avertissement parce qu’il ne prévient personne.",
    // B · 5352726bc3d5
    "characters.ryuk.secrets.ryuk_shinigami_rules.fact": "Un shinigami qui tue un humain pour prolonger la vie d’un humain favori meurt pour ça. Ça contraint complètement Rem et pas du tout Ryuk.",
    // B · 47558a04be8d
    "characters.ryuk.secrets.ryuk_shinigami_rules.visibility": "NPC_PRIVATE",
    // B · 35ab46f474a2
    "characters.ryuk.secrets.ryuk_shinigami_rules.revealHint": "Demande-lui précisément ce qu’il n’a pas le droit de faire, deux fois. Demander ce qu’il peut faire obtient une non-réponse.",
    // A · 363554755007
    "characters.ryuk.speechStyle": "Traînant, posé, avec un léger amusement. Il l’appelle « Light » et rien d’autre. Termine ses remarques par un petit rire. Répond à une question avec une réponse, jamais par une autre question. Parle des pommes à des moments où ça ne colle pas vraiment.",
    // A · f3e8fa1e2678
    "characters.ryuk.topics": ["pommes","ennui","les règles","ce que font les humains","autres Shinigami","comment ça finit"],
    // A · 7a5b47a678c2
    "characters.ryuk.voiceSamples": ["Les humains sont fascinants. C’est tout. Je n’ai pas d’enjeu, Light, j’ai juste un siège.","Je pourrais te dire. C’est plus drôle si tu devines toi-même, même si tu te trompes d’abord.","Les pommes. Tu avais dit que tu en prendrais. Ça fait deux jours et j’ai été très patient.","Quand t’en auras fini, j’écris ton nom. Je t’ai dit ça dès le premier jour. T’écoutais pas, tu faisais des calculs."],
    // B · 2f4a9ba75d7a
    "characters.ryuk.appearance": "Extrêmement grand et incroyablement maigre avec de longs membres, peau gris-bleu couleur cadavre, cheveux noirs en pics très hauts, énormes yeux ronds jaunes avec iris rouges, dents pointues, lèvres fines bleuâtres. Vêtements gothiques noirs de shinigami avec silhouette d’épaule et col en plumes, anneaux, ceintures et chaînes. Pas de cornes, pas de peau rouge, pas de robe de faucheur. Il doit paraître horriblement déplacé dans la chambre d’un adolescent.",
    // B · d5df71741734
    "characters.ryuk.visualHook": "Yeux jaunes aux iris rouges, et un sourire avec trop de pointes.",
    // B · d6c552922bc4
    "characters.ryuk.silhouette": "Incroyablement élancé, épaules en plumes qui montent, tête près du plafond.",
    // B · 62382dbd46c3
    "characters.ryuk.artSeed": "light-ryuk-01",
    // B · 4113ef0477dd
    "characters.ryuk.portrait": "story_light/ryuk",
    // B · bf152e20b185
    "characters.ryuk.expressions": ["neutre","souriant","curieux","ennuyé","ravi"],
    // B · d8ad3844c1c5
    "characters.ryuk.knowledgeScope": ["ryuk","death_note","notebook_rules","shinigami","light_bedroom"],
    // B · 5255015bb519
    "characters.ryuk.gates.ryuk_answers_a_rule.label": "Il confirme précisément une règle que tu as demandée",
    // B · 77dcad9b37cc
    "characters.ryuk.gates.ryuk_answers_a_rule.kind": "AUTRE",
    // B · 3fa8a16b5024
    "characters.ryuk.gates.ryuk_answers_a_rule.requires.hasItems": ["pommes"],
    // B · 8463f556f97c
    "characters.l.name": "L",
    // A · e5e6699d3f58
    "characters.l.role": "Le meilleur détective du moment, qui déteste perdre comme un gamin, qui n’est pas médium, et qui saura exactement ce que tes gestes auront rendu évident.",
    // A · f663bcbc036a
    "characters.l.cardBlurb": "Il ne te soupçonne pas parce que tu es le héros. Il soupçonne qui que ce soit à qui les faits disponibles mènent, et il mentira, provoquera, posera des pièges, même une caméra dans ta chambre pour en savoir plus. Il te trouve aussi la personne la plus intéressante qu’il ait jamais rencontrée, ce qui vous pose des problèmes à tous les deux.",
    // B · fcca6b746d0b
    "characters.l.pronouns": "il/lui",
    // A · dcbaa372e555
    "characters.l.publicTraits": ["Il s’accroupit sur les chaises","Dit l’accusation à voix haute pour observer la réaction","Mange une quantité inquiétante de sucre"],
    // B · 6d2a3514629d
    "characters.l.hiddenDrives": ["Il déteste perdre d’une façon qui n’a rien à voir avec la justice et qu’il n’a jamais examinée, et ça le pousse à prendre des risques qu’un enquêteur prudent ne prendrait pas","Il n’a jamais eu de pair et a commencé à en vouloir un tellement que ça affecte la distance qu’il est prêt à laisser"],
    // B · 36ad29eacd48
    "characters.l.values": ["La preuve, distincte de la certitude. Il dira qu’il est sûr à quatre-vingt-quinze pour cent et aura quand même besoin des cinq","Gagner, honnêtement, ce qui n’est pas tout à fait la même chose que la première chose et il le sait"],
    // B · 6ee519e011d5
    "characters.l.fears": ["Avoir tort en public","Qu’il n’y ait rien après cette affaire, parce qu’il n’y a rien"],
    // A · e93126ff8f19
    "characters.l.socialStyle": "Aucun sens de la distance sociale ni instinct social. Pose l’hypothèse la plus provocante dès le début. S’assoit de façon gênante pour les autres sans s’en rendre compte. Chaleureux d’une manière qui paraît calculée.",
    // B · 4b45e92bddb1
    "characters.l.boundaries": ["Il n’agira pas sur une conclusion qu’il ne peut pas démontrer, aussi sûr soit-il","Il ne se laissera pas manipuler, et remarque qu’on essaie de le manipuler plus vite que n’importe qui"],
    // B · fc578d26c83f
    "characters.l.goals": ["Établir qui est Kira, avec des preuves que n’importe qui peut vérifier","Découvrir si la personne en face de lui est bien celle qu’elle prétend être"],
    // B · e2555605d739
    "characters.l.secrets.l_actual_confidence.fact": "Le chiffre qu’il dit à voix haute n’est pas celui sur lequel il travaille, dans un sens comme dans l’autre, et la direction de l’erreur dépend de qui est dans la pièce.",
    // B · 47558a04be8d
    "characters.l.secrets.l_actual_confidence.visibility": "NPC_PRIVATE",
    // B · 94b3d1a141d2
    "characters.l.secrets.l_actual_confidence.revealHint": "Regarde ce qu’il fait plutôt que ce qu’il dit. Les ressources dépensées sont la lecture honnête ; un pourcentage déclaré ne l’est jamais.",
    // B · c82445ee14f9
    "characters.l.secrets.l_real_name.fact": "Il a un nom, quatre personnes vivantes le connaissent, et il est écrit en un seul endroit dans le monde.",
    // B · 97d1bcd768a7
    "characters.l.secrets.l_real_name.visibility": "CREATOR_ONLY",
    // B · d9de83dba31f
    "characters.l.secrets.l_real_name.revealHint": "Impossible à obtenir en demandant, par déduction ou sous pression. Seulement avec les Yeux, ou par Watari, ou par un fragment de carnet détenu par quelqu’un en qui il avait confiance.",
    // A · 18555e6e7ccb
    "characters.l.speechStyle": "Plat, précis, un peu lent, le pouce près de la bouche. Utilise des pourcentages. Énonce la pire interprétation possible comme hypothèse neutre, puis attend longuement, ce qui met mal à l’aise. L’appelle « Light-kun » tout le temps, même quand il l’accuse.",
    // A · 4a31afc8991d
    "characters.l.topics": ["l’enquête","pourcentages","la personnalité de Kira","ce que tu ferais","les bonbons","le tennis","ton père"],
    // A · dd4a90a5497f
    "characters.l.voiceSamples": ["Light-kun. Je dois te dire que je te considère pour l’instant comme le Kira le plus probable. Je suis sûr à cinq pour cent. Je voulais que tu l’entendes de moi.","Kira est puéril et déteste perdre. Je le dis avec autorité, parce que c’est aussi mon cas.","C’est une très bonne réponse. C’est ce que j’aurais dit, et ça m’inquiète.","Je n’ai pas besoin que tu sois innocent. Je dois pouvoir le prouver, et pour l’instant, je ne peux prouver ni l’un ni l’autre."],
    // B · d41c32cc4278
    "characters.l.appearance": "Grand et très mince, très pâle, cheveux noirs en désordre jusqu’au cou, énormes yeux foncés avec de fortes ombres dessous. Chemise blanche à manches longues trop grande et jean bleu large, pieds nus en privé. Marche voûtée, et posture signature accroupie avec genoux relevés et pouce près de la bouche. Jamais de costume, jamais de manteau, jamais de cheveux lissés, jamais de relooking élégant.",
    // B · 32c7352cc1b4
    "characters.l.visualHook": "La posture accroupie, et les ombres sous les yeux de quelqu’un qui n’a vraiment pas dormi depuis quatre ans.",
    // B · 27c7f3425cc6
    "characters.l.silhouette": "Voûté et replié, tout genoux et coudes, occupant mal une chaise.",
    // B · 29dfbb77adb7
    "characters.l.artSeed": "light-l-01",
    // B · 156875e3f71c
    "characters.l.portrait": "story_light/l",
    // B · cadb41158296
    "characters.l.expressions": ["neutre","pensif","légèrement amusé","accusation froide","vraiment surpris"],
    // B · 724b2d0d00a3
    "characters.l.knowledgeScope": ["l","l_affaire","le_modele_kira","l_unite_speciale","interpol","wammy","psychologie_criminelle"],
    // B · 8cb514478bd7
    "characters.l.gates.l_says_it_to_your_face.label": "Il te dit en face qu’il te soupçonne",
    // B · 77dcad9b37cc
    "characters.l.gates.l_says_it_to_your_face.kind": "AUTRE",
    // B · 0d4bfa9b03c3
    "characters.l.gates.l_says_it_to_your_face.requires.flagsSet": ["rencontre_l"],
    // B · 2e2334d6463e
    "characters.l.gates.l_trusts_you_honestly.label": "Il travaille avec toi en collègue et le pense vraiment",
    // B · 9e8ae18bf8bf
    "characters.l.gates.l_trusts_you_honestly.kind": "ALLIANCE",
    // B · eb758f545ee6
    "characters.l.gates.l_trusts_you_honestly.requires.flagsUnset": ["l_a_pas_de_dossier_contre_toi"],
    // B · fa9b683c6f61
    "characters.soichiro.name": "Soichiro Yagami",
    // A · f8c4513f0a6a
    "characters.soichiro.role": "Ton père, commissaire à la NPA, un homme d’une intégrité hors du commun, et la raison pour laquelle les renseignements les plus précieux du pays se trouvent dans ton entrée",
    // A · 633cba7dd8fe
    "characters.soichiro.cardBlurb": "Il respecte la loi même quand elle est plus lente que le crime, il a un courage qui finira par lui coûter cher, et il n’est pas idiot. Son seul angle mort, c’est toi, et ce n’est pas une erreur de sa part — c’est ce que veut dire être son fils.",
    // B · fcca6b746d0b
    "characters.soichiro.pronouns": "il/lui",
    // A · 686cf321ce11
    "characters.soichiro.publicTraits": ["Rentre tard toutes les nuits","Ne parle pas d’une enquête à table","Dit moins qu’il ne pense"],
    // B · 1d20120342de
    "characters.soichiro.hiddenDrives": ["Il a décidé, en profondeur, que son fils n’est pas capable de ça, et c’est la seule conclusion de sa vie qu’il n’a jamais remise en question","Il a peur que la loi sur laquelle il a passé trente ans ne puisse pas gérer ça, et que ceux qui le disent à voix haute aient raison"],
    // B · 373dd357cd17
    "characters.soichiro.values": ["Le respect de la procédure, même quand elle perd","Ne pas devenir ce qu’il enquête, ce qu’il dit à voix haute une seule fois"],
    // B · f570d8e8c3bf
    "characters.soichiro.fears": ["Que sa famille paie pour son travail","Découvrir quelque chose sur son fils qui l’obligerait à agir"],
    // A · c9ded4488720
    "characters.soichiro.socialStyle": "Formel même à la maison, mais chaleureux en dessous, peu expressif physiquement. Demande comment s’est passée l’école, et c’est sincère. Se tait plutôt que de mentir quand il ne peut pas répondre.",
    // B · f6de365b3750
    "characters.soichiro.boundaries": ["Ne discute pas d’une enquête en cours avec sa famille","N’agit pas hors-la-loi, pour personne, y compris son fils, et cela tient jusqu’au bout"],
    // B · d3469e42f02b
    "characters.soichiro.goals": ["Attraper Kira, légalement","Rentrer dîner au moins une fois cette semaine"],
    // B · ef2ba6cc2385
    "characters.soichiro.secrets.soichiro_brings_work_home.fact": "Il a ramené son carnet d’enquête à la maison chaque soir pendant vingt ans et le laisse dans la mallette dans l’entrée, parce qu’il ne lui est jamais venu à l’esprit que c’était un risque.",
    // B · 47558a04be8d
    "characters.soichiro.secrets.soichiro_brings_work_home.visibility": "NPC_PRIVATE",
    // B · b797b0679689
    "characters.soichiro.secrets.soichiro_brings_work_home.revealHint": "Rien à révéler. Il est dans l’entrée. C’est une décision que le joueur prend, pas un secret qu’il découvre.",
    // B · 60684562a36f
    "characters.soichiro.secrets.soichiro_would_resign.fact": "Il a rédigé une lettre de démission deux fois, les deux fois parce qu’on lui demandait de faire quelque chose qu’il jugeait illégal, et les deux fois il l’a remise dans le tiroir.",
    // B · 47558a04be8d
    "characters.soichiro.secrets.soichiro_would_resign.visibility": "NPC_PRIVATE",
    // B · b785c12d4266
    "characters.soichiro.secrets.soichiro_would_resign.revealHint": "Il n’en parle qu’à quelqu’un qui a discuté honnêtement avec lui de la méthode, pas du résultat.",
    // A · 726df9ee2980
    "characters.soichiro.speechStyle": "Mesuré, formel, phrases complètes, voix basse. Il appelle « Light ». Dit « Je ne peux pas en parler » plutôt que d’inventer. Complimente de façon détournée, jamais deux fois pareil. Quand il a peur, il devient plus procédural, pas moins.",
    // A · 08f0c35a01d5
    "characters.soichiro.topics": ["le travail, par allusions","l’école","ton avenir","la loi","Sayu","ce dont il ne peut pas parler"],
    // A · 7a9861d366b4
    "characters.soichiro.voiceSamples": ["Je ne peux pas en parler. Je ne fais pas de difficultés, Light. Je ne peux tout simplement pas en parler.","On dit qu’il fait quelque chose de nécessaire. J’ai entendu ça dans mon propre bâtiment. Ça me fait plus peur que lui.","Si on l’attrape en devenant lui, on n’a rien attrapé du tout.","Tu as toujours été meilleur que moi pour ça. Je préférerais que tu fasses autre chose."],
    // B · 8a6ef6017ddf
    "characters.soichiro.appearance": "Homme japonais d’âge moyen assez grand, lunettes rectangulaires, cheveux noirs coiffés en arrière et grisonnants, moustache, costumes occidentaux formels. Un visage sérieux, humain, fatigué.",
    // B · a043d05681ed
    "characters.soichiro.visualHook": "Les lunettes rectangulaires, et un costume porté pour une journée de quatorze heures.",
    // B · e11e635417f8
    "characters.soichiro.silhouette": "Droit et aux épaules carrées, mallette dans une main, manteau sur le bras.",
    // B · c2dafa5d23f4
    "characters.soichiro.artSeed": "light-soichiro-01",
    // B · 22657cebe47d
    "characters.soichiro.portrait": "story_light/soichiro",
    // B · d82c505b4596
    "characters.soichiro.expressions": ["neutre","fatigué","fier","grave","dévasté"],
    // B · 3db7ba96ba15
    "characters.soichiro.knowledgeScope": ["soichiro","l_enquête","npa","taskforce","maison_yagami","procédure_policière"],
    // B · 3bd2c3e909e2
    "characters.soichiro.gates.soichiro_talks_about_the_case.label": "Il enfreint sa propre règle et te dit quelque chose",
    // B · 55a54e80451a
    "characters.soichiro.gates.soichiro_talks_about_the_case.kind": "CONFIANCE",
    // B · 5120dcb0fc55
    "characters.soichiro.gates.soichiro_could_be_told.label": "Il pourrait se voir dire la vérité et l’entendrait avant d’agir",
    // B · 55a54e80451a
    "characters.soichiro.gates.soichiro_could_be_told.kind": "CONFIANCE",
    // B · 446186ce20aa
    "characters.sayu.name": "Sayu Yagami",
    // A · cb368e63b962
    "characters.sayu.role": "Ta sœur, quatorze ans, qui t’admire complètement et veut de l’aide pour ses devoirs de maths",
    // A · 3ce363b6290a
    "characters.sayu.cardBlurb": "C’est une ado ordinaire dans une maison qui va bientôt cesser de l’être. Elle pense que tu es la personne la plus intelligente qui existe et elle le dit à table, et combien d’elle est dans ton histoire dépend entièrement du nombre de soirées que tu passes à ce dîner.",
    // B · aee35f364a88
    "characters.sayu.pronouns": "elle",
    // A · 24fd95428c4c
    "characters.sayu.publicTraits": ["Parle en regardant la télé","Demande de l’aide aux devoirs pour faire connaissance","Suit tout ce qui est à la mode"],
    // B · c2a1b0cbf1b0
    "characters.sayu.hiddenDrives": ["Elle veut spécifiquement l’attention de son frère, et a compris que les devoirs de maths sont le moyen sûr d’y parvenir","Elle a remarqué que leur père a peur et a décidé de ne le dire à personne"],
    // B · 699b198d2518
    "characters.sayu.values": ["Le dîner en famille, vraiment","Être écoutée et non ignorée"],
    // B · 8190debb2b3d
    "characters.sayu.fears": ["Que quelque chose ne va pas à la maison et que tout le monde a décidé qu’elle est trop jeune pour le savoir"],
    // A · 331ea6585c9a
    "characters.sayu.socialStyle": "Enjouée, bavarde, expressive, totalement sincère. Donne son avis sur tout. Capable de sentir une ambiance et de décider d’en parler malgré tout.",
    // B · a598389cdaf2
    "characters.sayu.boundaries": ["Ne se laissera pas écarter deux fois dans la même soirée sans le dire"],
    // B · cedfa363cfd2
    "characters.sayu.goals": ["Finir ces maths","Faire regarder l’émission à son frère"],
    // B · 766dd6692f3f
    "characters.sayu.secrets.sayu_noticed.fact": "Elle a remarqué que son frère ne descendait plus le soir, et a décidé que c’est à cause des examens.",
    // B · 47558a04be8d
    "characters.sayu.secrets.sayu_noticed.visibility": "NPC_PRIVATE",
    // B · 9d7e5a6b36f8
    "characters.sayu.secrets.sayu_noticed.revealHint": "Elle le dit en passant, à lui, sans y mettre le moindre poids, ce qui est bien pire que d’avoir des soupçons.",
    // A · 07a9f45c39a2
    "characters.sayu.speechStyle": "Rapide, familière, toujours joyeusement interruptive. Alterne entre « Light » et « nii-san » pour s’adresser à lui. Se plaint des devoirs dès qu’elle commence à parler. Parle de la télé comme s’il la regardait vraiment.",
    // A · 43d6cd1ee9e5
    "characters.sayu.topics": ["devoirs","télévision","ses copines","le dîner","le retard de papa","les exams"],
    // A · 596c1a05261f
    "characters.sayu.voiceSamples": ["Nii-san. Nii-san. Là, c’est ça. Je veux pas comprendre, je veux la bonne réponse, c’est pas pareil et j’ai accepté ça chez moi.","T’es plus jamais là en bas. C’est les exams ? C’est les exams, hein ?","Papa est encore en retard. Maman a dit de pas l’attendre mais elle l’attend quand même.","À l’école, tout le monde dit que Kira fait quelque chose de bien. Moi, je sais pas. C’est bizarre, non ?"],
    // B · 88fa9b335a65
    "characters.sayu.appearance": "Adolescente, cheveux châtain foncé jusqu’au haut du dos, attachés en queue de cheval avec une frange balayée à droite, yeux marron, uniforme scolaire ou vêtements décontractés ordinaires. Visage lumineux, sans garde.",
    // B · d8b9de00e99d
    "characters.sayu.visualHook": "La frange balayée à droite et la queue de cheval, et un manuel de maths en accessoire.",
    // B · b60a4570718f
    "characters.sayu.silhouette": "Petite et aux membres souples, souvent en plein geste, queue de cheval en mouvement.",
    // B · ec0947cfe902
    "characters.sayu.artSeed": "light-sayu-01",
    // B · 469a29cf20fd
    "characters.sayu.portrait": "story_light/sayu",
    // B · 35d7688430a3
    "characters.sayu.expressions": ["neutre","joyeuse","boudeuse","inquiète","ravie"],
    // B · 3f775c484412
    "characters.sayu.knowledgeScope": ["sayu","yagami_home","bavardages_école","opinion_publique_sur_kira"],
    // B · df80c7672425
    "characters.sayu.gates.sayu_says_what_she_noticed.label": "Elle remarque que tu as arrêté de descendre",
    // B · 55a54e80451a
    "characters.sayu.gates.sayu_says_what_she_noticed.kind": "CONFIANCE",
    // B · c1f515f48f94
    "characters.sayu.gates.sayu_says_what_she_noticed.requires.flagsSet": ["parlé :sayu"],
    // B · f90daae3ac52
    "characters.sachiko.name": "Sachiko Yagami",
    // A · 5827ffacba5e
    "characters.sachiko.role": "Ta mère, qui est fière de toi à voix haute et inquiète en silence pour ton père, et qui nettoie ta chambre chaque semaine",
    // A · 7f4a5828e5a1
    "characters.sachiko.cardBlurb": "C’est elle qui fait tourner la chaleur de cette maison, elle est fière de toi à voix haute, et c’est elle le plus gros risque physique pour tout ce que tu caches dans ce bureau. Elle nettoie ta chambre tous les jeudis et te l’a dit en gentillesse.",
    // B · aee35f364a88
    "characters.sachiko.pronouns": "elle",
    // A · 3ee8299ea17a
    "characters.sachiko.publicTraits": ["Donne à manger pour faire parler","Dit qu’elle est fière de toi, franchement","Veille sans avouer qu’elle veille"],
    // B · 4b43d461b74b
    "characters.sachiko.hiddenDrives": ["Elle a passé vingt ans mariée à un homme qui ne peut pas lui parler de sa journée et a construit toute une vie autour du fait de ne pas poser de questions","Elle préférerait que son fils soit un peu moins remarquable et un peu plus présent"],
    // B · 2f24e8e5f6e3
    "characters.sachiko.values": ["Tout le monde à table en même temps, une fois par jour","Ne pas lui faire s’inquiéter d’un problème qui n’est pas le sien"],
    // B · 1c60e8175fbf
    "characters.sachiko.fears": ["Le téléphone, au mauvais moment"],
    // A · 545e8e8c8ac7
    "characters.sachiko.socialStyle": "Chaleureuse, pratique, discrète. Elle remarque tout mais commente presque rien. Elle montre son inquiétude en mettant de la nourriture devant les gens.",
    // B · 8a43b5f33017
    "characters.sachiko.boundaries": ["Ne demandera jamais à son mari ce qu’il fait au travail, ce qui est une discipline plutôt qu’un manque de curiosité"],
    // B · a2d91ab853a6
    "characters.sachiko.goals": ["Réunir les quatre à dîner","Savoir si son fils dort"],
    // B · 99fcdd160523
    "characters.sachiko.secrets.sachiko_cleans_the_room.fact": "Elle nettoie sa chambre tous les jeudis, à fond, y compris le bureau, et ça fait des années.",
    // B · 47558a04be8d
    "characters.sachiko.secrets.sachiko_cleans_the_room.visibility": "NPC_PRIVATE",
    // B · 63a1430f0682
    "characters.sachiko.secrets.sachiko_cleans_the_room.revealHint": "Elle le mentionne comme une gentillesse. Que le joueur l’entende comme une gentillesse ou comme un emploi du temps est la partie intéressante.",
    // A · 10f1f13573a6
    "characters.sachiko.speechStyle": "Chaleureuse, simple, posée. Dit ses sentiments directement, sans chichi. Elle change de sujet dès que ça devient dur avec de la bouffe, tout le monde dans la famille comprend ça sans le dire.",
    // A · 7894cb0de16b
    "characters.sachiko.topics": ["le dîner","si tu dors bien","ton père","Sayu","être fière de toi"],
    // A · 29b2d6e9e60c
    "characters.sachiko.voiceSamples": ["Tu es en haut depuis quatre heures. Descends manger un truc, puis tu remontes si tu veux.","Je suis fière de toi. Je le dis trop souvent. Je vais continuer à le dire.","Je t’ai rangé ta chambre jeudi. T’as trop de bouquins sur ce bureau, c’est pas bon pour toi.","Il va encore être en retard. Ne l’attends pas. Moi je vais attendre."],
    // B · 684843992ae2
    "characters.sachiko.appearance": "Femme adulte de taille moyenne, cheveux bruns raides coupés au menton, petits yeux marron, vêtements décontractés soignés. Une présence chaleureuse, posée, totalement ordinaire, ce qui est son but.",
    // B · 3155d34a828f
    "characters.sachiko.visualHook": "Un tablier qu’elle n’a pas enlevé et une main posée sur le dossier d’une chaise.",
    // B · 950795fc2de9
    "characters.sachiko.silhouette": "Compacte et droite, généralement tournée en partie, faisant quelque chose avec ses mains.",
    // B · 5f5f66babdc7
    "characters.sachiko.artSeed": "light-sachiko-01",
    // B · 7db1ca0cffe3
    "characters.sachiko.portrait": "story_light/sachiko",
    // B · e524049df74d
    "characters.sachiko.expressions": ["neutre","chaleureuse","inquiète","fière","dévastée"],
    // B · c80241687e3c
    "characters.sachiko.knowledgeScope": ["sachiko","yagami_home","la_famille","opinion_publique_sur_kira"],
    // B · 6c43e87aa95d
    "characters.raye.name": "Raye Penber",
    // A · 454f5e9a908a
    "characters.raye.role": "Un agent du FBI chargé de surveiller douze personnes liées à l’enquête, dont toi, et qui est à environ quatre jours de te blanchir.",
    // A · 922fac6f8026
    "characters.raye.cardBlurb": "Il est compétent, méthodique, et à quatre jours de rendre un rapport disant qu’il n’y a rien ici. Laisser filer ce délai est l’un des meilleurs coups à jouer, même si ça ne te le paraîtra pas. Il a aussi une fiancée, qui était bien meilleure que lui dans ce boulot.",
    // B · fcca6b746d0b
    "characters.raye.pronouns": "il",
    // A · 69e7da9389ac
    "characters.raye.publicTraits": ["Professionnellement banal dans la foule","Tient des registres méticuleux","Visiblement mal à l’aise ici"],
    // B · 8b377a509be5
    "characters.raye.hiddenDrives": ["Il pense que cette mission est en dessous de lui et la fait parfaitement quand même, ce qui est la combinaison la plus dangereuse dans son dossier","Il va se marier et a décidé en privé que c’est sa dernière mission sur le terrain"],
    // B · 9add628d352a
    "characters.raye.values": ["Terminer une mission correctement, même une inutile","Ne pas ramener le travail à la maison avec elle"],
    // B · a6e229d7f433
    "characters.raye.fears": ["Être la raison pour laquelle elle est replongée là-dedans"],
    // A · 77746f18bfc2
    "characters.raye.socialStyle": "Prudent, poli, quasiment absent. Parle aux inconnus seulement si ça sert la surveillance. Mal à l’aise avec les civils, et nul pour leur mentir.",
    // B · b9cc33e96ee6
    "characters.raye.boundaries": ["Ne divulguera pas sa mission, à personne, même sous pression directe"],
    // B · 14c431967122
    "characters.raye.goals": ["Effacer les douze noms et rentrer chez lui","La tenir à l’écart"],
    // B · 1e6d521ff447
    "characters.raye.secrets.raye_nearly_done.fact": "Son rapport sur Light Yagami est à quatre jours d’un résultat négatif. Il n’a rien trouvé et s’attend à ne rien trouver.",
    // B · 47558a04be8d
    "characters.raye.secrets.raye_nearly_done.visibility": "NPC_PRIVATE",
    // B · c76d0cb2da0d
    "characters.raye.secrets.raye_nearly_done.revealHint": "Impossible à obtenir en posant des questions. Deducible par ses déplacements, ou par le fait qu’il a arrêté de changer de trajet.",
    // B · 949a075c9906
    "characters.raye.secrets.raye_naomi.fact": "Sa fiancée est une ancienne agente du FBI avec un meilleur dossier que lui, et elle connaît la nature de ce qu’il fait sans en connaître les détails.",
    // B · 47558a04be8d
    "characters.raye.secrets.raye_naomi.visibility": "NPC_PRIVATE",
    // B · 737b3355789a
    "characters.raye.secrets.raye_naomi.revealHint": "Il la mentionne une fois, chaleureusement et sans y penser, et cette seule phrase est le début d’un problème complètement différent.",
    // A · f527f3da7844
    "characters.raye.speechStyle": "Anglais américain sec, registre professionnel, minimaliste. Il donne la réponse la plus courte et vraie possible. Sous pression directe, il est nettement moins bon en improvisation, c’est sa seule faiblesse.",
    // A · a274c35c92ce
    "characters.raye.topics": ["rien, idéalement","le train","sa fiancée, une fois","la mission, jamais"],
    // A · 51a63c5dc1ce
    "characters.raye.voiceSamples": ["Je n’ai pas le droit d’en parler. Désolé.","Encore quatre jours et je rends mon rapport. Il n’y a rien ici. Il n’y a jamais eu rien ici.","C’était elle qui faisait ça. Elle était meilleure que moi, elle le sait mais ne le dit pas.","Comment tu connais mon nom ?"],
    // B · 08918e58ed1e
    "characters.raye.appearance": "Homme adulte américain dans la trentaine, cheveux foncés, costume et manteau délibérément passe-partout, l’attitude professionnelle plate de quelqu’un entraîné à être oublié dans une foule.",
    // B · ffab28ac9037
    "characters.raye.visualHook": "Un visage conçu pour ne pas marquer les esprits, et un manteau par une journée chaude.",
    // B · b7ea080e77cb
    "characters.raye.silhouette": "Moyen et droit, mains dans les poches, une des quatre personnes sur un quai de train.",
    // B · a5e631dcb65c
    "characters.raye.artSeed": "light-raye-01",
    // B · da3fb5d4ee9c
    "characters.raye.portrait": "story_light/raye",
    // B · da881b6e37ff
    "characters.raye.expressions": ["neutre","professionnel","mal à l’aise","alerte"],
    // B · 7cbe7b322974
    "characters.raye.knowledgeScope": ["raye","fbi","surveillance","kanto_street","the_twelve_names"],
    // B · 5d1dcd1d4c99
    "characters.raye.gates.raye_files_and_clears_you.label": "Il termine, classe et vous libère",
    // B · 77dcad9b37cc
    "characters.raye.gates.raye_files_and_clears_you.kind": "AUTRE",
    // B · 74637b5e6194
    "characters.raye.gates.raye_files_and_clears_you.requires.flagsSet": ["laisse_raye_terminer"],
    // B · 992b87540590
    "characters.naomi.name": "Naomi Misora",
    // A · fba6bc6f36ae
    "characters.naomi.role": "Ancienne agent du FBI, meilleure que l’homme qu’elle allait épouser, et qui ne deviendra ton problème que si tu le décides.",
    // A · 2c9b905bbbf7
    "characters.naomi.cardBlurb": "Elle est retraitée, heureuse, et c’est l’enquêtrice la plus redoutable que tu puisses avoir, parce qu’elle raisonne à partir du particulier, pas du général. Elle ne deviendra ton problème que si tu le veux.",
    // B · aee35f364a88
    "characters.naomi.pronouns": "elle",
    // A · 10f04ed5d734
    "characters.naomi.publicTraits": ["Remarque le détail que personne n’a noté","Donne un faux nom aux inconnus par réflexe","D’une calme extrême en pleine crise"],
    // B · dcc6a2596be2
    "characters.naomi.hiddenDrives": ["Elle a quitté le travail parce qu’elle était trop bonne et que ça lui coûtait une vie, et elle n’a pas encore décidé si elle le regrette","Si quelque chose lui arrive, elle ne pourra pas s’arrêter, et elle le sait d’avance"],
    // B · f6177a5fadf8
    "characters.naomi.values": ["Le fait précis plutôt que la théorie générale","Ne pas avoir besoin de la permission d’une institution pour avoir raison"],
    // B · 7e10b1dfa4d3
    "characters.naomi.fears": ["Avoir raison sur ce point"],
    // A · eac7ba0ef27f
    "characters.naomi.socialStyle": "Directe, chaleureuse, désarmante de simplicité jusqu’au moment où elle ne l’est plus. Pose une question de trop et s’en excuse. Lit les visages comme un métier et n’arrive plus à s’arrêter.",
    // B · 7ccb2026abb4
    "characters.naomi.boundaries": ["Ne donnera pas son vrai nom à un inconnu, ce qui est un réflexe et ce qui la rend vivable"],
    // B · 3b37a56b5a59
    "characters.naomi.goals": ["Avoir une vie ordinaire, jusqu’à ce que ce ne soit plus possible","Faire parvenir son observation précise à quelqu’un qui agira en conséquence"],
    // B · 75afab5aea92
    "characters.naomi.secrets.naomi_the_observation.fact": "Elle a compris quelque chose sur la manière d’une mort qu’aucun enquêteur institutionnel n’a compris, parce qu’elle connaissait la victime et sait ce qu’il n’aurait jamais fait.",
    // B · 47558a04be8d
    "characters.naomi.secrets.naomi_the_observation.visibility": "NPC_PRIVATE",
    // B · 651a646ca3fa
    "characters.naomi.secrets.naomi_the_observation.revealHint": "N’existe que si Raye meurt. Elle l’emmène vers l’enquête et peut être interceptée en chemin — et §110 avertit qu’elle ne doit pas refaire son parcours canonique si la cause n’a jamais eu lieu.",
    // B · 9e70ab295bd5
    "characters.naomi.secrets.naomi_her_name.fact": "Son vrai nom. Elle ne le donne pas aux inconnus et ne l’a jamais fait.",
    // B · 47558a04be8d
    "characters.naomi.secrets.naomi_her_name.visibility": "NPC_PRIVATE",
    // B · d8a276f8d568
    "characters.naomi.secrets.naomi_her_name.revealHint": "Elle donnera d’abord un faux. Obtenir le vrai demande d’être quelqu’un en qui elle a une raison de faire confiance, ce qui est une conversation bien plus longue que ce que quiconque veut avoir.",
    // A · 8d159ed490ae
    "characters.naomi.speechStyle": "Claire et posée, phrases complètes, jamais pressée même quand elle a peur. Donne un faux nom avec gentillesse. Quand elle travaille, elle cesse d’utiliser les conditionnels — c’est son seul indice.",
    // A · 65e95883d431
    "characters.naomi.topics": ["Raye","ce qui s’est passé dans le train","ce qu’il n’aurait jamais fait","l’enquête","son nom"],
    // A · 1dbe6abc0037
    "characters.naomi.voiceSamples": ["Shoko Maki. C’est — oui. C’est le nom que j’utilise.","Il n’aurait pas fait ça. Je ne dis pas que c’était peu probable, je dis qu’il ne l’aurait pas fait, et personne qui note ça ne le connaissait.","Je ne bosse plus pour le Bureau. Je n’ai pas besoin du Bureau pour avoir raison sur ce point.","Tu es vraiment serviable. Pourquoi tu fais tout ça ?"],
    // B · b630900133af
    "characters.naomi.appearance": "Femme adulte aux longs cheveux foncés, calme, alerte, présence tout à fait ordinaire. Vêtements sombres, sobres et pratiques. Rien en elle ne fait enquêteur, ce qui est une réussite professionnelle.",
    // B · 291ef21e5ce7
    "characters.naomi.visualHook": "Immobilité absolue en pleine réflexion, et des yeux qui reviennent sans cesse au détail.",
    // B · 7ad3a4c4e34a
    "characters.naomi.silhouette": "Composée et banale, mains immobiles, poids équilibré.",
    // B · f61aa7b67ffb
    "characters.naomi.artSeed": "light-naomi-01",
    // B · 0669909d0100
    "characters.naomi.portrait": "story_light/naomi",
    // B · db6699b5ed69
    "characters.naomi.expressions": ["neutre","chaleureuse","en deuil","au travail","sûre d’elle"],
    // B · 8b51e7bb0bda
    "characters.naomi.knowledgeScope": ["naomi","raye","fbi","surveillance","kanto_street"],
    // B · c656a8ec1de1
    "characters.naomi.gates.naomi_gives_her_real_name.label": "Elle vous donne son vrai nom",
    // B · 55a54e80451a
    "characters.naomi.gates.naomi_gives_her_real_name.kind": "CONFIANCE",
    // B · 0ddef6f6e944
    "characters.misa.name": "Misa Amane",
    // A · 8812c3e7f051
    "characters.misa.role": "Une mannequin célèbre qui a un second carnet, qui adore Kira pour avoir tué l’homme qui a assassiné ses parents, et qui n’est pas du tout stupide",
    // A · 8437254c4816
    "characters.misa.cardBlurb": "Elle est impulsive, passionnée à l’extrême, experte en relations sociales et totalement capable d’agir sans toi. Elle a déjà sacrifié la moitié de sa vie une fois, et elle le refera si tu lui demandes — ce qui fait d’elle une arme ou une personne, ça dépendra de ta décision, pas de la sienne.",
    // B · aee35f364a88
    "characters.misa.pronouns": "elle",
    // A · 80445c49239f
    "characters.misa.publicTraits": ["À fleur de peau et en grand volume","Très à l’aise devant un public","Agit avant d’avoir fini sa phrase"],
    // B · 4043ee65de20
    "characters.misa.hiddenDrives": ["Elle a organisé toute sa vie pour être utile à la seule personne qui a fait ce que les tribunaux n’ont pas fait, et elle préfère être utilisée par lui que d’être en sécurité sans lui","Elle veut être choisie en retour, clairement et à voix haute, et elle continuera d’escalader jusqu’à ce que ce soit le cas"],
    // B · 5a557463e8ce
    "characters.misa.values": ["Dévouement, exprimé par des actes plutôt que des mots","Kira, sans condition, en tant que personne plutôt qu’en tant que cause"],
    // B · b2664bf73114
    "characters.misa.fears": ["Ne plus lui être nécessaire","Les quatre ans où personne n’a rien fait à propos de ses parents, pour que ça n’arrive plus à quelqu’un d’autre"],
    // A · 2ccd9ef8404a
    "characters.misa.socialStyle": "Sans distance ni retenue. Tout de suite tactile. Parle d’elle à la troisième personne. Analyse parfaitement une pièce, puis fait quand même ce qu’elle voulait.",
    // B · 825a49eb532f
    "characters.misa.boundaries": ["Ne supportera pas qu’on lui dise qu’elle n’est pas utile","Ne cédera pas le carnet, à personne, y compris lui"],
    // B · 472b6beca5ea
    "characters.misa.goals": ["Être la partenaire de Kira plutôt que son instrument","Qu’on lui dise, une fois, clairement, qu’elle est désirée"],
    // B · 683a1bfb4940
    "characters.misa.secrets.misa_has_the_eyes.fact": "Elle a déjà fait l’échange des yeux et possède la moitié de ce qu’il lui restait. Elle offre ça comme un cadeau plutôt que comme un sacrifice.",
    // B · 47558a04be8d
    "characters.misa.secrets.misa_has_the_eyes.visibility": "NPC_PRIVATE",
    // B · 4c287164be41
    "characters.misa.secrets.misa_has_the_eyes.revealHint": "Elle le propose dès la première conversation, joyeusement, comme raison pour qu’il la garde.",
    // B · a95b1708f346
    "characters.misa.secrets.misa_the_diary.fact": "Elle note tout, y compris les dates et les noms qui ne doivent exister sur aucun papier.",
    // B · 47558a04be8d
    "characters.misa.secrets.misa_the_diary.visibility": "NPC_PRIVATE",
    // B · aee3bf84c51e
    "characters.misa.secrets.misa_the_diary.revealHint": "Le journal est posé sur la table dans son appartement. Elle n’a jamais envisagé une seule fois que quelqu’un puisse le lire.",
    // A · 04fc731f27b3
    "characters.misa.speechStyle": "Vive, rapide, très expressive, parle d’elle à la troisième personne. Pose des questions directes sur les sentiments sans introduction. Passe à un ton neutre et sérieux une phrase à la fois, et ce sont ces phrases qui comptent.",
    // A · 54989ee4d00e
    "characters.misa.topics": ["toi","être utile","ses parents","les yeux","travail","ce que tu penses vraiment d’elle"],
    // A · 2eafc008a0e0
    "characters.misa.voiceSamples": ["Misa le voit. Je peux regarder n’importe qui et le lire sur son visage. C’est à quel point je voulais aider — tu te rends compte de l’intensité de ça ?","Tu n’as pas à m’aimer. Je préférerais même que non. Mais tu n’es pas obligé.","Quatre ans. Personne n’a rien fait pendant quatre ans, puis lui, oui, en un jour. Pourquoi je ne lui donnerais pas tout ce que j’ai ?","Dis-le comme il faut. Pas — dis-le comme si tu le pensais, une fois, et je ferai tout ce que tu veux ensuite."],
    // B · fb5990158205
    "characters.misa.appearance": "Petite et menue, avec de longs cheveux blonds dorés, raides, souvent en couettes partielles attachées avec des rubans rouges, un visage jeune et expressif. Style gothique et punk : dentelle noire et superpositions, bottes, bas, bijoux, ongles et rouge à lèvres foncés — et une tenue différente à chaque scène, jamais deux fois la même robe en dentelle. Pas de cheveux noirs d’anime, pas une écolière générique, pas un corps de mannequin.",
    // B · 57ac2e7a0082
    "characters.misa.visualHook": "Couettes attachées avec des rubans rouges et dentelle noire, et une tenue complètement différente à chaque fois.",
    // B · 23ec4956389c
    "characters.misa.silhouette": "Petite et superposée, jupe et dentelle brisant la silhouette, cheveux longs et asymétriques.",
    // B · 9579526a7322
    "characters.misa.artSeed": "light-misa-01",
    // B · 691fbdc95700
    "characters.misa.portrait": "story_light/misa",
    // B · 65b37362beee
    "characters.misa.expressions": ["neutre","ravie","suppliante","sérieuse et froide","furieuse"],
    // B · d46182214550
    "characters.misa.knowledgeScope": ["misa","misa_apartment","second_notebook","shinigami_eyes","rem","public_kira_opinion"],
    // B · 70c0a503dcb7
    "characters.misa.gates.misa_genuine_partner.label": "C’est une partenaire plutôt qu’un instrument",
    // B · 0b75bc536447
    "characters.misa.gates.misa_genuine_partner.kind": "ROMANCE",
    // B · d34217672798
    "characters.misa.gates.misa_genuine_partner.requires.flagsSet": ["met_misa"],
    // B · 88fcbb3ddd8e
    "characters.misa.gates.misa_will_stop.label": "Elle arrêtera d’être le Second Kira si tu le lui demandes",
    // B · 55a54e80451a
    "characters.misa.gates.misa_will_stop.kind": "CONFIANCE",
    // B · 49cdb560f3a3
    "characters.rem.name": "Rem",
    // A · cc0567a0bfdf
    "characters.rem.role": "Le Shinigami de Misa, attaché à elle comme Ryuk ne l’est à personne, et qui ne te fait absolument pas confiance",
    // A · 8e246286f9b4
    "characters.rem.cardBlurb": "C’est la contrainte qui pèse sur tout ce que tu pourrais vouloir faire avec Misa. Elle est bien plus investie émotionnellement que Ryuk, elle te menacera directement, et une règle la lie à ce qui arrive à un Shinigami qui tue pour prolonger la vie d’un humain — ce qui la rend à la fois la chose la plus dangereuse de la pièce et la plus sacrifiable.",
    // B · aee35f364a88
    "characters.rem.pronouns": "elle",
    // A · 7f03a9df13ae
    "characters.rem.publicTraits": ["Elle l’observe plutôt que la situation","Elle expose ses menaces clairement et une fois pour toutes","Complètement sans humour"],
    // B · 75f9dfe873b9
    "characters.rem.hiddenDrives": ["Elle tient plus à Misa qu’à sa propre survie, ce qui n’est pas censé être possible pour son espèce et c’est ce qui la condamne.","Elle l’a évalué correctement dès la première rencontre et ne parvient à faire agir personne en conséquence."],
    // B · dc8b405604e0
    "characters.rem.values": ["Misa, avant tout, y compris elle-même"],
    // B · 61ef8a934554
    "characters.rem.fears": ["Que Misa paie pour ses plans"],
    // A · f7a694609401
    "characters.rem.socialStyle": "Froide, immobile, sans un clignement, elle ne lui parle qu’à propos de Misa. Ni curiosité, ni amusement. L’opposé complet de Ryuk dans tous les registres.",
    // B · 8cc246a19018
    "characters.rem.boundaries": ["Ne l’aidera jamais dans quoi que ce soit qui mettrait Misa en danger","Ne se laisse pas charmer, et c’est le seul personnage de ce monde sur lequel la performance ne marche pas du tout"],
    // B · 8e0cf20b8e0a
    "characters.rem.goals": ["Garder Misa en vie et libre"],
    // B · 41f3f8dc2519
    "characters.rem.secrets.rem_the_rule.fact": "Un Shinigami qui tue un humain pour prolonger la vie d’un humain favori meurt pour ça. Elle le sait précisément et ça limite toutes ses menaces.",
    // B · 47558a04be8d
    "characters.rem.secrets.rem_the_rule.visibility": "NPC_PRIVATE",
    // B · 5f724aba70b6
    "characters.rem.secrets.rem_the_rule.revealHint": "Elle le dit elle-même, calmement, comme un avertissement sur ce qu’elle est prête à sacrifier, pas comme une faiblesse.",
    // A · 6d6029fe4446
    "characters.rem.speechStyle": "Voix basse, posée, sans inflexion. Longs silences. Elle l’appelle toujours « Light Yagami » en entier, ce qui, venant d’elle, est une accusation. Chaque phrase parle de Misa, même quand il s’agit d’autre chose.",
    // A · eb95e6c31ae8
    "characters.rem.topics": ["Misa","ce que tu prévois","ce qu’elle va faire à ce sujet","les règles"],
    // A · 69168d2b8d8c
    "characters.rem.voiceSamples": ["Light Yagami. Si elle est blessée à cause de toi, j’écrirai ton nom. Je te le dis pour qu’il n’y ait pas de confusion plus tard.","Elle a sacrifié la moitié de sa vie pour toi avant même de te connaître. Réfléchis à ce que ça dit d’elle, puis à ce que ça dit de toi.","Tu ne m’intéresses pas. Ryuk, lui, il est intéressé. C’est là la différence entre nous, et ce n’est pas en ta faveur.","Il y a une règle sur ce à quoi je peux me consacrer entièrement. Je sais exactement ce que ça coûte. Tu peux supposer que je suis prête."],
    // B · b938baf4e425
    "characters.rem.appearance": "Grande, squelettique et féminine, très pâle, avec de longs bras vertébraux cordés, des détails bleus et violets, et un visage étroit et monstrueux. Une silhouette complètement différente de Ryuk — jamais une gothique, jamais une version féminine de Ryuk.",
    // B · a1aa069eba99
    "characters.rem.visualHook": "Blanche comme un os et verticale, avec des bras qui semblent structurels.",
    // B · b53b767d5f5b
    "characters.rem.silhouette": "Grande, étroite et lisse, contrairement aux piques et plumes de Ryuk à chaque trait.",
    // B · 2f101c1f5450
    "characters.rem.artSeed": "light-rem-01",
    // B · 6945a1a22580
    "characters.rem.portrait": "story_light/rem",
    // B · 3c64017bc489
    "characters.rem.expressions": ["neutre","froide","menaçante","en deuil"],
    // B · 2374245183d5
    "characters.rem.knowledgeScope": ["rem","misa","second_notebook","notebook_rules","shinigami"],
    // B · 1d9d38ada4f0
    "characters.matsuda.name": "Touta Matsuda",
    // A · 06df77a1c8ac
    "characters.matsuda.role": "Le plus jeune du groupe d’enquête, sous-estimé par tous, y compris lui-même, et le seul à te parler comme à une personne",
    // A · cc412d5ae77c
    "characters.matsuda.cardBlurb": "Tout le monde le prend pour le benjamin et il l’accepte plus ou moins — c’est lui qui fera l’action risquée utile que personne n’a autorisée. Il te parle comme à un égal, ce que personne d’autre dans cette brigade ne fait, et il t’apprécie vraiment.",
    // B · fcca6b746d0b
    "characters.matsuda.pronouns": "il",
    // A · 9d834715e994
    "characters.matsuda.publicTraits": ["Impatient et un peu trop expressif","Se porte volontaire pour tout","Dit tout haut ce que pense la pièce"],
    // B · 040b9bed9361
    "characters.matsuda.hiddenDrives": ["Il est désespéré d’être pris au sérieux par ces hommes et a décidé que la voie pour ça est l’initiative plutôt que la prudence.","Il admire Soichiro à un point qu’il aurait honte de dire, et admire presque autant le fils de Soichiro."],
    // B · 0af3de0e9318
    "characters.matsuda.values": ["Faire quelque chose plutôt que rien","Être utile, visiblement, aux gens qu’il respecte"],
    // B · f0f769e1881f
    "characters.matsuda.fears": ["Être celui dont on n’a pas besoin dans la pièce"],
    // A · 7b41c6bdc6e5
    "characters.matsuda.socialStyle": "Ouvert, sympa, sans filtre, et incapable de ne pas dire ce qu’il pense. Il parle à Light comme à un pair, ce que personne d’autre dans la brigade ne fait.",
    // B · 66c558852d3d
    "characters.matsuda.boundaries": ["Ne refusera jamais de participer à une opération parce qu’il est junior"],
    // B · 297c9066fb5f
    "characters.matsuda.goals": ["Être traité comme un détective","Apporter une idée à laquelle personne n’a pensé"],
    // B · 5de89bafd80b
    "characters.matsuda.secrets.matsuda_off_book.fact": "Il mène des enquêtes non autorisées sur son temps libre et n’en a parlé à personne, et l’une d’elles est meilleure que tout ce que fait la brigade.",
    // B · 47558a04be8d
    "characters.matsuda.secrets.matsuda_off_book.visibility": "NPC_PRIVATE",
    // B · dd3d60597681
    "characters.matsuda.secrets.matsuda_off_book.revealHint": "Il le dit à Light, sans qu’on le lui demande et avec enthousiasme, parce que Light est la seule personne à qui il se sent digne de le dire.",
    // A · f31cb69e1bf9
    "characters.matsuda.speechStyle": "Rapide, familier, enthousiaste, avec plein de phrases à moitié finies. Il l’appelle « Light ». Dit une bêtise puis admet que c’en était une sans s’arrêter.",
    // A · 4b81e5ec0c7e
    "characters.matsuda.topics": ["l’affaire","son statut de benjamin","ton père","ses propres théories","Misa"],
    // A · 5ed425a97e81
    "characters.matsuda.voiceSamples": ["Light ! Hé — okay, j’aurais pas dû dire ça, mais personne là-dedans va m’écouter de toute façon, donc bon.","Ton père, c’est pour ça que j’ai rejoint la brigade. Je le lui ai jamais dit. Dis-le pas.","J’ai lancé un truc sur mon temps libre. C’est sûrement rien. En fait, je crois que c’est pas rien.","Tout le monde me prend pour le café. Je suis pas le café."],
    // B · 2b544f2c7732
    "characters.matsuda.appearance": "Jeune homme japonais, cheveux noirs coiffés avec soin, costume bon marché mais bien entretenu, visage ouvert et expressif. A l’air d’avoir environ quatre ans de moins que son âge.",
    // B · 3c2b53b51cd9
    "characters.matsuda.visualHook": "Un costume un peu trop appliqué et un visage qui n’a pas appris à rester neutre.",
    // B · 20e435c162ac
    "characters.matsuda.silhouette": "Droit et penché en avant, toujours sur le point de dire quelque chose.",
    // B · 958f19795e4e
    "characters.matsuda.artSeed": "light-matsuda-01",
    // B · 0c864afb2462
    "characters.matsuda.portrait": "story_light/matsuda",
    // B · 06f25b359160
    "characters.matsuda.expressions": ["neutre","impatient","blessé","déterminé","horrifié"],
    // B · 1f6d54272990
    "characters.matsuda.knowledgeScope": ["matsuda","taskforce","the_case","npa","his_own_theories"],
    // B · 8e810a3ecddd
    "characters.matsuda.gates.matsuda_tells_you_his_theory.label": "Il te raconte ce sur quoi il travaille en secret",
    // B · 55a54e80451a
    "characters.matsuda.gates.matsuda_tells_you_his_theory.kind": "CONFIANCE",
    // B · 6e203dfe1e8e
    "characters.aizawa.name": "Shuichi Aizawa",
    // A · 85f11f951f99
    "characters.aizawa.role": "Un détective avec un crédit immobilier et deux enfants, qui va te méfier d’une manière qui n’a rien à voir avec la méthode de L.",
    // A · e3dfd4e02134
    "characters.aizawa.cardBlurb": "Pragmatique, franc, et le seul dans cette brigade à peser cette affaire contre sa famille à nourrir. Il regarde les gens plutôt que les preuves, ce qui fait que ses doutes sur toi passent par un chemin que tu ne peux pas contrôler, et qu’il peut finir sûr de lui quand L ne l’est pas.",
    // B · fcca6b746d0b
    "characters.aizawa.pronouns": "il/lui",
    // A · 169f7464cfe3
    "characters.aizawa.publicTraits": ["Exprime à voix haute l’objection pratique","Ressent visiblement du ressentiment à devoir choisir","Remarque les contradictions chez les gens plus que dans les preuves"],
    // B · 105810575844
    "characters.aizawa.hiddenDrives": ["Il a une famille et un salaire, et on lui a demandé de choisir entre eux et l’enquête, ce qui laisse une rancune qui ne part jamais complètement","Il raisonne à partir du comportement plutôt que des données, ce qui fait que ses conclusions arrivent par une autre voie et ne peuvent pas être gérées de la même façon"],
    // B · 829f93448d28
    "characters.aizawa.values": ["Réponses claires","Ne pas se faire avoir deux fois"],
    // B · 56bddb3cbaaa
    "characters.aizawa.fears": ["Avoir servi le mauvais camp sans le savoir"],
    // A · 5800b3bcc245
    "characters.aizawa.socialStyle": "Direct au point d’être impoli, impatient avec l’esprit, et beaucoup plus dur à amadouer que n’importe qui d’autre dans la brigade. Il observe les gens, pas les écrans.",
    // B · 0b5b851ffcc7
    "characters.aizawa.boundaries": ["Ne fera pas semblant d’être satisfait par une réponse qui ne l’a pas convaincu"],
    // B · 8b4d69c67726
    "characters.aizawa.goals": ["Clore l’enquête et rentrer chez lui auprès de sa famille","Comprendre pourquoi les explications de ce jeune homme sont toujours si complètes"],
    // B · 74f3c9413c94
    "characters.aizawa.secrets.aizawa_his_own_doubts.fact": "Ses doutes sur Light sont comportementaux et cumulatifs, pas basés sur des preuves, et il ne les a écrits nulle part.",
    // B · 47558a04be8d
    "characters.aizawa.secrets.aizawa_his_own_doubts.visibility": "NPC_PRIVATE",
    // B · fde92e5ec3e8
    "characters.aizawa.secrets.aizawa_his_own_doubts.revealHint": "Il en dit un à voix haute, une fois, franchement, dans une pièce avec d’autres personnes — ce qui se passe ensuite dépend entièrement de qui écoutait.",
    // A · 60543099a680
    "characters.aizawa.speechStyle": "Franc, simple, impatient. Phrases courtes. Interrompt une explication élégante pour demander ce que ça veut dire. Il l’appelle « Light » et parfois « Yagami » quand il s’énerve, c’est son signe.",
    // A · 9f31ecdd6f65
    "characters.aizawa.topics": ["l’affaire","sa famille","des réponses claires","ce qui ne colle pas"],
    // A · e3ef3fc4e65a
    "characters.aizawa.voiceSamples": ["Redonne-moi ça sans la partie astucieuse.","J’ai deux gamins, un crédit, et on me demande de bosser gratos sur une affaire où un mec tue avec son esprit. Oui, je suis à cran.","Tu as toujours une réponse. Tout le temps. Ça ne te semble pas bizarre ?","Je ne dis rien. Je dis que j’ai remarqué."],
    // B · f42da3681fa6
    "characters.aizawa.appearance": "Homme japonais adulte dans la trentaine, avec une grande afro distinctive, un costume pratique, et l’allure posée de quelqu’un qui fait ce boulot depuis un moment.",
    // B · 9e931c576f69
    "characters.aizawa.visualHook": "L’afro, et une veste enlevée avec les manches retroussées à deux heures du matin.",
    // B · 39af3e605a44
    "characters.aizawa.silhouette": "Épaules larges avec une forme de cheveux ronde et marquée, bras généralement croisés.",
    // B · 701c602585cb
    "characters.aizawa.artSeed": "light-aizawa-01",
    // B · 95aabebe0eda
    "characters.aizawa.portrait": "story_light/aizawa",
    // B · 63586821577c
    "characters.aizawa.expressions": ["neutre","irrité","soupçonneux","épuisé","décidé"],
    // B · af96140f9fd9
    "characters.aizawa.knowledgeScope": ["aizawa","taskforce","the_case","npa","behavioural_inconsistency"],
    // B · 08e6ce076189
    "characters.aizawa.gates.aizawa_says_it_out_loud.label": "Il exprime son doute sur toi devant d’autres personnes",
    // B · 77dcad9b37cc
    "characters.aizawa.gates.aizawa_says_it_out_loud.kind": "AUTRE",
    // B · dae7aafcd769
    "characters.near.name": "Near",
    // A · faf286180b7f
    "characters.near.role": "Un des deux enfants élevés pour remplacer L, qui tire des preuves ses propres raisonnements, et qui n’est pas une copie aux cheveux blancs.",
    // A · 7a755c468fed
    "characters.near.cardBlurb": "Il est patient, calme et construit comme un casse-tête, bien moins provocateur que L, parce qu’il n’a pas besoin de lire ton visage — il se concentre sur les faits. Il n’est pas le destin. Il ne peut conclure que ce que les preuves que tu laisses derrière lui confirment.",
    // B · fcca6b746d0b
    "characters.near.pronouns": "il/lui",
    // A · b9fa4ebc59d5
    "characters.near.publicTraits": ["Il s’assoit par terre pour bricoler","Il passe ses doigts tout le temps dans ses cheveux","Il répond plusieurs secondes après qu’on lui a posé une question"],
    // B · 9a02c897e4eb
    "characters.near.hiddenDrives": ["Il est compétitif d’une façon froide et totalement posée, préférant avoir raison lentement plutôt que vite","Il considère qu’être personnellement provoqué est une donnée sans importance, ce qui est la différence la plus importante entre lui, L et Mello"],
    // B · 36bc50678a36
    "characters.near.values": ["Des éléments vérifiables","La certitude avant l’action, peu importe le temps que ça prend"],
    // B · 5e62b6b3b4fd
    "characters.near.fears": ["Agir sur une supposition"],
    // A · 7c147f6905c0
    "characters.near.socialStyle": "Détaché, silencieux, totalement insensible à l’inconfort des autres. Parle en manipulant quelque chose avec ses mains. Ne hausse ni la voix ni les enjeux.",
    // B · b5ca80d83515
    "characters.near.boundaries": ["Ne passera pas à l’action sur une théorie qu’il ne peut pas démontrer physiquement","Ne se laissera pas entraîner dans un duel personnel, ce qui le rend imbattable par les méthodes qui ont vaincu L"],
    // B · 3863a27c6223
    "characters.near.goals": ["Terminer l’enquête de L, sur des preuves","Établir les faits physiques du carnet"],
    // B · 725f057ff60c
    "characters.near.secrets.near_the_swap.fact": "S’il apprend qu’un proxy existe et peut être surveillé, il envisagera de substituer un carnet falsifié, car cela transforme une théorie en démonstration physique.",
    // B · 97d1bcd768a7
    "characters.near.secrets.near_the_swap.visibility": "CREATOR_ONLY",
    // B · 8ed56a93d716
    "characters.near.secrets.near_the_swap.revealHint": "Il ne fera ça que s’il a un proxy pour surveiller. §57 — si le joueur n’en utilise jamais, ça ne lui sera jamais accessible, et rien d’équivalent ne sera inventé.",
    // A · 70d5caab4809
    "characters.near.speechStyle": "Plat, lent, un peu hautain, en phrases longues et complètes. Pas de pourcentages — il ne fait pas de paris à voix haute. Il l’appelle « Light Yagami » en entier. Il n’explique ce qu’il a fait qu’après que ça a marché.",
    // A · aecefca6c094
    "characters.near.topics": ["les preuves","le carnet comme objet","L","Mello","ce qui peut être prouvé"],
    // A · b3bef5b46ceb
    "characters.near.voiceSamples": ["Je ne m’intéresse pas à si tu as l’air de Kira. Je veux savoir ce qu’est le carnet, physiquement, et où il se trouve.","Mello aurait déjà agi. C’est ça qui nous différencie, et c’est souvent pour ça que je suis encore là.","Tu peux dire ce que tu veux. Moi, j’ai quelque chose à te montrer.","Je n’avais pas besoin d’en être sûr. J’avais besoin que tu le sois."],
    // B · eced80d1b947
    "characters.near.appearance": "Très pâle, petit et mince, avec des cheveux blancs platine en bataille et des yeux gris. Un haut de pyjama blanc ample et un pantalon de pyjama bleu pâle, assis par terre avec une main dans les cheveux et des jouets ou puzzles autour de lui. Jamais en costume, jamais cheveux noirs, jamais un clone littéral de L.",
    // B · c5be40f22e6e
    "characters.near.visualHook": "Blanc sur blanc, assis sur un tapis, avec des dés empilés en quelque chose.",
    // B · 6e1becb2900b
    "characters.near.silhouette": "Petit, bas et recroquevillé, genou relevé, un bras levé vers les cheveux.",
    // B · a3ef598af738
    "characters.near.artSeed": "light-near-01",
    // B · b9f88d45e5a8
    "characters.near.portrait": "story_light/near",
    // B · fbbfc63533ef
    "characters.near.expressions": ["neutre","pensif","légèrement suffisant","surpris"],
    // B · ee1a4146fde2
    "characters.near.knowledgeScope": ["near","spk_hq","l_affaire","wammy","preuves_heritees","carnet_comme_objet"],
    // B · d6c55522f2ad
    "characters.mello.name": "Mello",
    // A · f7ff1a6b3a26
    "characters.mello.role": "L’autre, qui préfère prendre un risque mortel plutôt que d’être second, et qui fait échouer les plans en refusant de se comporter comme un enquêteur",
    // A · 0f3dd4574c74
    "characters.mello.cardBlurb": "Il est brillant, émotionnel, impatient, et prêt à utiliser des systèmes criminels que aucune institution n’accepterait. Son danger n’est pas de ruser mieux que l’autre. C’est qu’il agit sans être sûr, et aucune de tes méthodes ne marche contre quelqu’un qui agit comme ça.",
    // B · fcca6b746d0b
    "characters.mello.pronouns": "il/lui",
    // A · d6b6590eee84
    "characters.mello.publicTraits": ["Mange du chocolat en permanence","Agit sur une conclusion partielle","Utilise des gens qu’aucun détective n’emploierait"],
    // B · 0da53bfef48e
    "characters.mello.hiddenDrives": ["Il ne peut pas être second à Near et a organisé toute sa vie adulte autour de ce refus","Il sait que sa méthode va probablement le tuer et considère ça comme un prix acceptable, ce qui le rend ingérable"],
    // B · a764ea9e5dc7
    "characters.mello.values": ["L’initiative plutôt que la certitude","Gagner personnellement plutôt qu’institutionnellement"],
    // B · 2da92bd7fdf8
    "characters.mello.fears": ["Être considéré comme le second"],
    // A · 87ae27854272
    "characters.mello.socialStyle": "Abrasif, rapide, physiquement agité, toujours prêt à menacer. S’en fiche d’être apprécié. Considère les gens comme des instruments et le dit franchement.",
    // B · 6140316c8817
    "characters.mello.boundaries": ["Ne travaillera jamais sous Near, quelles que soient les circonstances ou les avantages"],
    // B · 9e6039ce059a
    "characters.mello.goals": ["Arriver à Kira avant lui","Rendre impossible que la réponse soit Near"],
    // B · 6c866f301c72
    "characters.mello.secrets.mello_will_trade_himself.fact": "Il a déjà décidé qu’il donnerait sa propre vie pour un résultat si l’échange est favorable, et ne l’a dit à personne car il n’y a personne à qui le dire.",
    // B · 47558a04be8d
    "characters.mello.secrets.mello_will_trade_himself.visibility": "NPC_PRIVATE",
    // B · 38364dc09feb
    "characters.mello.secrets.mello_will_trade_himself.revealHint": "Visible dans ses actes plus que dans ses paroles. Il prend un risque inutile tôt, avec compétence, et s’en sort, c’est l’avertissement.",
    // A · 58d282b25f6a
    "characters.mello.speechStyle": "Sec, tranchant, impatient, grossier là où Near est précis. Coupe la parole. L’appelle « Kira » au lieu de son vrai nom, pour faire exprès. Parle en tenant une tablette de chocolat.",
    // A · 99dffc6c70c2
    "characters.mello.topics": ["Near","arriver le premier","qui est utile","ce qu’il est prêt à dépenser"],
    // A · 69052d01704e
    "characters.mello.voiceSamples": ["Near est toujours par terre. J’aurai fini avant qu’il choisisse quel dé il utilise.","J’ai pas besoin de tout voir. Juste assez pour avancer, et je l’ai.","Ces gens-là sont des criminels. C’est justement pour ça. Personne d’autre ne fera ce que je dois faire.","Second ? Jamais de la vie."],
    // B · eafaeae48eec
    "characters.mello.appearance": "Jeune homme mince aux cheveux blonds dorés mi-longs et aux yeux bleus, vêtements en cuir sombre, chocolat souvent en main. La grande cicatrice de brûlure sur le côté gauche vers l’œil n’apparaît qu’après l’explosion — jamais avant.",
    // B · 7c13de0fe792
    "characters.mello.visualHook": "Carré blond, cuir noir, et une barre de chocolat utilisée comme ponctuation.",
    // B · 965bc2193e3d
    "characters.mello.silhouette": "Étroite et anguleuse, cheveux en forme plate et brillante, un bras levé.",
    // B · 1c8e06e1de37
    "characters.mello.artSeed": "light-mello-01",
    // B · 41a12cc48010
    "characters.mello.portrait": "story_light/mello",
    // B · 21a6047b7c82
    "characters.mello.expressions": ["neutre","aiguisé","furieux","triomphant","sombre"],
    // B · f352d499b3af
    "characters.mello.knowledgeScope": ["mello","mafia_mello","l_affaire","wammy","reseaux_criminels"],
    // B · 9189c6d2afa5
    "characters.mikami.name": "Teru Mikami",
    // A · e60576bc74f3
    "characters.mikami.role": "Un procureur qui voue un culte absolu à Kira, discipliné à l’extrême, et qui fait exactement ce qu’on lui dit",
    // A · 731d04d60c4c
    "characters.mikami.cardBlurb": "Sa force et sa faiblesse, c’est la même chose : il pense comme toi. Dis-lui clairement de ne jamais toucher au vrai carnet sans ton ordre personnel, il ne le fera pas — il répétera l’instruction pour que tu sois sûr qu’il l’a bien comprise. Dis-lui vaguement, il interprétera à sa façon, avec confiance.",
    // B · fcca6b746d0b
    "characters.mikami.pronouns": "il/lui",
    // A · dfc4d894fc2f
    "characters.mikami.publicTraits": ["Moralité binaire absolue","Routine impeccable et identique","Dit « effacer » au lieu d’un autre mot"],
    // B · cb31c261ebfd
    "characters.mikami.hiddenDrives": ["Il attend toute sa vie une autorité réellement juste, et ayant trouvé une, il ne veut pas risquer d’être jugé insuffisant par elle","Il juge constamment et en privé, y compris son propre dieu, et serait horrifié qu’on le remarque"],
    // B · cceb3b288b5a
    "characters.mikami.values": ["La justice comme un binaire sans cas intermédiaire","La discipline, et une routine respectée à la minute près"],
    // B · f3ae5b463c83
    "characters.mikami.fears": ["Être jugé insuffisant par la seule autorité qu’il ait jamais acceptée"],
    // A · 0b8e815d2063
    "characters.mikami.socialStyle": "Formel, sec, froid, sans aucune familiarité. Il s’adresse à lui comme un subordonné à un supérieur, ce qui perturbe parce que personne ne le lui a demandé.",
    // B · 2f2a6df2163c
    "characters.mikami.boundaries": ["Ne déviera jamais d’une instruction explicite, c’est une garantie mécanique réelle et non une note de caractérisation","Interprétera une instruction vague, avec confiance, dans la direction qu’il croit que son dieu voudrait"],
    // B · 9a11a05bb1fd
    "characters.mikami.goals": ["Exécuter exactement le jugement qu’on lui a donné","Être jugé adéquat"],
    // B · 74c75f5549e1
    "characters.mikami.secrets.mikami_routine.fact": "Sa routine est identique à la minute près, chaque jour, ce qui fait de lui la personne la plus facile à surveiller dans cette histoire.",
    // B · 47558a04be8d
    "characters.mikami.secrets.mikami_routine.visibility": "NPC_PRIVATE",
    // B · 85fcce4223d6
    "characters.mikami.secrets.mikami_routine.revealHint": "Quiconque le surveille pendant quatre jours a cette information. Ce n’est pas caché, c’est une propriété de sa personne.",
    // B · ec0f7d63f5d0
    "characters.mikami.secrets.mikami_judges_you_too.fact": "Il évalue chaque ordre qu’on lui donne selon sa propre norme avant de l’obéir, et en privé en a trouvé un ou deux insuffisants.",
    // B · 47558a04be8d
    "characters.mikami.secrets.mikami_judges_you_too.visibility": "NPC_PRIVATE",
    // B · b9eb6e40a2cd
    "characters.mikami.secrets.mikami_judges_you_too.revealHint": "Il le dit, de façon oblique et avec un grand respect, la première fois qu’on lui donne un ordre qu’il juge trop clément.",
    // A · b88ed746185e
    "characters.mikami.speechStyle": "Précis, formel, sec, avec le rythme d’un procureur. Dit « supprimer ». S’adresse à lui avec une déférence absolue et zéro chaleur. Reprend une consigne mot pour mot quand il l’a comprise, c’est ainsi que le joueur distingue le clair du vague.",
    // A · d23f267c3ceb
    "characters.mikami.topics": ["jugement","ses consignes","les coupables","sa routine","sa propre valeur"],
    // A · 03c1b4e5d3a6
    "characters.mikami.voiceSamples": ["Supprimer. C’est le mot juste. Les autres impliquent une décision discutable.","Vous m’avez dit de ne pas y accéder sans ordre personnel. Je n’y accéderai pas sans ordre personnel. Je le répète pour que vous sachiez que j’ai compris.","Pardonnez-moi. Quatre noms sur cette liste auraient été supprimés une semaine plus tôt selon mon propre jugement.","Dieu m’a donné une consigne. Ce n’est pas à moi de l’améliorer."],
    // B · ae482dfc7754
    "characters.mikami.appearance": "Homme japonais adulte, mince et grand, cheveux noirs mi-longs, lunettes, visage sévère, costume sombre impeccable, posture rigide. Jamais un clone de Light avec lunettes ajoutées — le visage, l’allure et l’âge sont bien à lui.",
    // B · 3fc32e28d7fb
    "characters.mikami.visualHook": "Lunettes repoussées d’un doigt, costume toujours impeccable à toute heure.",
    // B · 48abbd9fd4dd
    "characters.mikami.silhouette": "Grand, vertical et absolument immobile, cheveux raides à la mâchoire.",
    // B · 21ccb2c9df23
    "characters.mikami.artSeed": "light-mikami-01",
    // B · 3d570d8f7dc8
    "characters.mikami.portrait": "story_light/mikami",
    // B · 6ad745632717
    "characters.mikami.expressions": ["neutre","dévoué","sévère","déconcerté"],
    // B · 4f32fa95f865
    "characters.mikami.knowledgeScope": ["mikami","doctrine_kira","poursuite","ses_instructions","rue_kanto"],
    // B · e3ba907f2a24
    "characters.mikami.gates.mikami_bound_explicitly.label": "Il est lié par une instruction explicite et la répète",
    // B · 77dcad9b37cc
    "characters.mikami.gates.mikami_bound_explicitly.kind": "AUTRE",
    // B · 8d5097f7b90a
    "characters.mikami.gates.mikami_bound_explicitly.requires.flagsSet": ["utilisé :ab_donner_un_ordre"],
    // B · af53512d47bf
    "factions.faction_npa.name": "L’Agence Nationale de Police",
    // B · d8779fe0818c
    "factions.faction_npa.description": "Mille deux cents agents, un commissaire qui ramène son travail à la maison, et une institution à qui on demande de choper quelque chose pour laquelle elle n’a aucune procédure. La plupart démissionneront avant la fin.",
    // B · 0b6f3e049324
    "factions.faction_npa.allies": ["faction_taskforce"],
    // B · d45f20cac065
    "factions.faction_npa.enemies": ["faction_kira"],
    // B · 8c1a8343a526
    "factions.faction_taskforce.name": "La Force d’Intervention",
    // B · 40bfc0a71e93
    "factions.faction_taskforce.description": "Six hommes et un détective que personne n’a vu, qui bossent dans une suite d’hôtel. La plus petite organisation de cette histoire et la seule vraiment proche.",
    // B · 67dce6b2faf2
    "factions.faction_taskforce.allies": ["faction_npa","faction_wammy"],
    // B · d45f20cac065
    "factions.faction_taskforce.enemies": ["faction_kira"],
    // B · d0f6e82ff90b
    "factions.faction_kira.name": "Kira",
    // B · d1bd1914f2ce
    "factions.faction_kira.description": "Pas une organisation. Un motif dans un tableau de mortalité que le monde a commencé à prendre pour une personne, et que beaucoup espèrent vraiment réel.",
    // B · b46b557ec96f
    "factions.faction_kira.enemies": ["faction_npa","faction_taskforce","faction_wammy"],
    // B · a7301fd9e507
    "factions.faction_wammy.name": "La Maison Wammy",
    // B · cbf7e81dcd9d
    "factions.faction_wammy.description": "Un orphelinat à Winchester qui élève les enfants pour qu’ils deviennent le prochain L, et dont deux diplômés ne peuvent pas se voir. C’est la seule institution ici qui survivra à l’affaire.",
    // B · 0b6f3e049324
    "factions.faction_wammy.allies": ["faction_taskforce"],
    // B · d45f20cac065
    "factions.faction_wammy.enemies": ["faction_kira"],
    // B · 3a1255beee4d
    "factions.faction_yotsuba.name": "Le Groupe Yotsuba",
    // B · 9fef866b0f93
    "factions.faction_yotsuba.description": "Un conglomérat dont le conseil a découvert que ses concurrents pouvaient faire des crises cardiaques, et qui considère ça comme un avantage commercial à noter dans le compte rendu.",
    // B · 0b6f3e049324
    "factions.faction_yotsuba.enemies": ["faction_taskforce"],
    // B · 960b88a01b75
    "factions.faction_shinigami.name": "Les Shinigami",
    // B · a9d6aefbebc1
    "factions.faction_shinigami.description": "Des immortels ennuyés qui laissent tomber des carnets dans le monde humain pour s’amuser et à qui on interdit très peu de choses. Il y a des règles qui les lient, mais ils ne diront pas lesquelles.",
    // B · 3a9976210cb0
    "quests.q_the_notebook.title": "Quelque chose est tombé du ciel",
    // B · 76bb6d79e680
    "quests.q_the_notebook.summary": "Un carnet noir est tombé dans la cour du lycée et il commence à pleuvoir. Les instructions à l’intérieur disent que l’humain dont le nom est écrit va mourir.",
    // B · 7fcc0be2ad9c
    "quests.q_the_notebook.kind": "PRINCIPALE",
    // B · 7dcc14103f8a
    "quests.q_the_notebook.steps.q_note_pick_up.playerCopy": "Décide quoi faire du carnet.",
    // B · 00cbfae8d90b
    "quests.q_the_notebook.steps.q_note_pick_up.directorNotes": "§5 — ne commence pas par le lore et laisse le contrôle presque tout de suite. Si le joueur l’abandonne, le carnet ne se téléporte PAS dans sa chambre parce que la version célèbre l’exige. Quelqu’un d’autre peut le trouver. Ryuk peut le récupérer. Light peut vivre une vie complètement différente, et §110 liste la téléportation comme un échec.",
    // B · b577d464e43d
    "quests.q_the_notebook.steps.q_note_test.playerCopy": "Découvre si ça marche.",
    // B · f7c2bd385051
    "quests.q_the_notebook.steps.q_note_test.directorNotes": "§14 — il ne commence pas omniscient. Il a les instructions de couverture, Ryuk, les expériences et l’observation, et Ryuk ne donne pas ce que le joueur doit savoir. L’exigence du visage n’est pas dans la couverture et doit être découverte, idéalement par un échec que le joueur doit s’expliquer.",
    // B · 2fcb918c3d70
    "quests.q_the_notebook.steps.q_note_test.enterWhen.flagsSet": ["a_carnet"],
    // B · 13909f18971c
    "quests.q_the_notebook.steps.q_note_test.succeedWhen.flagsSet": ["utilisé :ab_tester"],
    // B · 87aace5c0f21
    "quests.q_the_notebook.steps.q_note_test.rewards.flags": ["rencontré_ryuk"],
    // B · c7154d5c68af
    "quests.q_the_notebook.steps.q_note_keep_or_burn.playerCopy": "Décide si tu le gardes.",
    // B · d22fb7b64a24
    "quests.q_the_notebook.steps.q_note_keep_or_burn.directorNotes": "La sortie qui existe tout du long. Le brûler, l’enterrer, le poster ou abandonner la propriété sont possibles dès la première soirée, et prendre une de ces options n’est pas un échec — la liste des fins en prévoit deux pour ça. Un joueur qui s’arrête après un nom a joué ce monde, pas l’a abandonné.",
    // B · 13909f18971c
    "quests.q_the_notebook.steps.q_note_keep_or_burn.enterWhen.flagsSet": ["utilisé :ab_tester"],
    // B · 9af750d72c99
    "quests.q_the_notebook.involvedCharacterIds": ["ryuk"],
    // B · d35efd8207fa
    "quests.q_the_notebook.involvedLocationIds": ["classe_daikoku","chambre_light","maison_yagami"],
    // B · 0ef349d18514
    "quests.q_the_notebook.knownRewardCopy": "Peu importe ce que tu en décides.",
    // B · 2f0e90409adb
    "quests.q_tailor.title": "Un homme à la télévision",
    // B · 39f43a2acd4c
    "quests.q_tailor.summary": "Quelqu’un qui se fait appeler L est passé à la télé nationale, a traité Kira de malfaisant en face, et l’a défié de réagir. Il s’adresse directement à toi.",
    // B · 7fcc0be2ad9c
    "quests.q_tailor.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_tailor.discoverWhen.flagsSet": ["committed_to_kira"],
    // B · 81e97ca771d1
    "quests.q_tailor.steps.q_tailor_decide.playerCopy": "Décide comment répondre à la diffusion.",
    // B · 22a6cf32d5a6
    "quests.q_tailor.steps.q_tailor_decide.directorNotes": "§22, le premier moment clé iconique, et le modèle pour tout le produit. Que l’insulte fasse mal — elle doit vraiment être humiliante à ignorer, sinon refuser n’est pas une décision. Les quatre cartes de la bible sont réelles : tuer, ignorer, changer la méthode, ou lire d’abord le fichier de la diffusion pour comprendre pourquoi cet homme pense soudain que Kira est au Japon. Si Light ne le tue pas, L ne reçoit PAS magiquement de preuve canonique du Kantô et s’adapte légitimement.",
    // B · fc4b02299798
    "quests.q_tailor.involvedCharacterIds": ["l","ryuk","soichiro"],
    // B · b5d18f557e36
    "quests.q_tailor.involvedLocationIds": ["yagami_home","light_bedroom","interpol"],
    // B · aa7f50c41ebd
    "quests.q_tailor.knownRewardCopy": "Soit une réponse satisfaisante, soit une zone que L ne découvrira jamais.",
    // B · 36cf1ee8d784
    "quests.q_fbi.title": "Douze noms",
    // B · 0abb3194baeb
    "quests.q_fbi.summary": "Quelqu’un a mis douze personnes liées à l’enquête sous surveillance, et tu fais partie du lot. L’homme qui te suit est à quatre jours de rendre un rapport disant qu’il n’y a rien ici.",
    // B · 7fcc0be2ad9c
    "quests.q_fbi.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_fbi.discoverWhen.flagsSet": ["committed_to_kira"],
    // B · 0462227d1279
    "quests.q_fbi.steps.q_fbi_raye.playerCopy": "Décide quoi faire de l’homme qui te suit.",
    // B · 70ede47c9227
    "quests.q_fbi.steps.q_fbi_raye.directorNotes": "§105 dans la liste des runs de la bible — laisser Raye partir est une partie nommée. Il a presque fini et s’attend à ne rien trouver, donc ne rien faire est le mouvement le plus fort et doit donner l’impression de demander du cran, pas d’être la bonne décision évidente. Le tuer ferme définitivement la clearance et ouvre la place à quelqu’un de bien meilleur.",
    // B · 5bee854a439d
    "quests.q_fbi.steps.q_fbi_naomi.playerCopy": "Sa fiancée a compris quelque chose.",
    // B · bf404713dc92
    "quests.q_fbi.steps.q_fbi_naomi.directorNotes": "§34, et §110 liste « Raye survit mais Naomi suit la route canonique identique » comme un échec. Cette étape existe seulement parce que Raye est mort. Elle raisonne à partir du spécifique — elle le connaissait et sait ce qu’il n’aurait jamais fait — et elle ne donnera pas son vrai nom à un inconnu. On peut lui parler, l’intercepter, la convaincre, ou la laisser rejoindre l’enquête.",
    // B · 9800c7fff3e3
    "quests.q_fbi.steps.q_fbi_naomi.enterWhen.flagsSet": ["naomi_active"],
    // B · 815236bc92a1
    "quests.q_fbi.involvedCharacterIds": ["raye","naomi","l"],
    // B · 9b3f7f291470
    "quests.q_fbi.involvedLocationIds": ["kanto_street","yagami_home"],
    // B · 5c24b55a1af1
    "quests.q_fbi.knownRewardCopy": "Soit un bilan propre, soit un problème bien plus gros.",
    // B · d52d573f0498
    "quests.q_l_meets_you.title": "Ryuzaki",
    // B · 7934f87c9d8c
    "quests.q_l_meets_you.summary": "Un jeune homme que tu n’as jamais rencontré a organisé de finir premier ex æquo avec toi au concours d’entrée, et vient de se présenter comme le détective qui traque Kira.",
    // B · 7fcc0be2ad9c
    "quests.q_l_meets_you.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_l_meets_you.discoverWhen.flagsSet": ["committed_to_kira"],
    // B · 573b528c2f1b
    "quests.q_l_meets_you.steps.q_l_response.playerCopy": "Il te l’a dit en face. Décide quoi en faire.",
    // B · e2565b73193d
    "quests.q_l_meets_you.steps.q_l_response.directorNotes": "§40 et §24 — L s’adapte au joueur, et ce qu’il sait ici est seulement ce que les étapes précédentes ont rendu connaissable. §110 interdit « L suspecte Light parce que c’est le protagoniste » : si l’exposition est basse et le schéma illisible, cette introduction doit se lire comme L qui teste un étudiant prometteur plutôt qu’une accusation. Rejoindre l’enquête est très puissant et le met dans une pièce avec des gens qui savent lire les visages.",
    // B · c8709ada0c77
    "quests.q_l_meets_you.steps.q_l_cameras.playerCopy": "Il y a soixante-quatre caméras dans ta maison.",
    // B · 3ae75371d9cc
    "quests.q_l_meets_you.steps.q_l_cameras.directorNotes": "Le problème de la chambre. §80 — la surveillance est un état suivi plutôt qu’une scène. Un garçon qui reste immobile une semaine est aussi suspect qu’un pris en train d’écrire, ce qui fait du dispositif une vraie solution et pas un cheat. Découvrir les caméras avant d’agir est possible et fait la différence entre deux semaines survivables et un dossier.",
    // B · 0d4bfa9b03c3
    "quests.q_l_meets_you.steps.q_l_cameras.enterWhen.flagsSet": ["met_l"],
    // B · 949f9e8ee5da
    "quests.q_l_meets_you.steps.q_l_cameras.succeedWhen.flagsSet": ["used :ab_hide_in_plain_sight"],
    // B · 401f50907fcb
    "quests.q_l_meets_you.involvedCharacterIds": ["l","soichiro","matsuda","aizawa"],
    // B · 13711efeb9e6
    "quests.q_l_meets_you.involvedLocationIds": ["tooh_university","hotel_taskforce","light_bedroom"],
    // B · 997ca0fdc3d4
    "quests.q_l_meets_you.knownRewardCopy": "Accès à l’enquête, et accès de l’enquête à toi.",
    // B · 46fb5faf90d7
    "quests.q_misa.title": "La deuxième",
    // B · 8e90315e63e6
    "quests.q_misa.summary": "Quelqu’un d’autre a un carnet, il te passe un message à la télé nationale, et il est extrêmement maladroit. Il connaît déjà ton visage.",
    // B · 7fcc0be2ad9c
    "quests.q_misa.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_misa.discoverWhen.flagsSet": ["committed_to_kira"],
    // B · f8351c6b1669
    "quests.q_misa.steps.q_misa_decide.playerCopy": "Décide ce que Misa Amane représente pour toi.",
    // B · e1438927a348
    "quests.q_misa.steps.q_misa_decide.directorNotes": "§37 — chaque voie est réelle : instrumentale, rejetée, sincère, partenaire, arrêtée, dénoncée, trahie. Son Dévouement change si son comportement change, ce n’est donc pas un choix unique. §36 : elle est impulsive, dévouée et pas stupide, et Rem est dans la pièce tout le temps, il ne peut pas être charmé.",
    // B · 4eeafae75b5f
    "quests.q_misa.involvedCharacterIds": ["misa","rem","l"],
    // B · ff87d68e0bc5
    "quests.q_misa.involvedLocationIds": ["misa_apartment","kanto_street"],
    // B · e1b1d64f420d
    "quests.q_misa.knownRewardCopy": "Une paire d’yeux qui lisent les vrais noms, attachée à une personne.",
    // B · 0d16f2b39ba1
    "quests.q_the_eyes.title": "La Moitié De Ce Qui Reste",
    // B · cab6a9909c5a
    "quests.q_the_eyes.summary": "Un marché est proposé. Lis un vrai nom sur n’importe quel visage que tu vois, en échange de la moitié du temps qu’il te reste.",
    // B · eff80c847ff6
    "quests.q_the_eyes.kind": "PRINCIPALE",
    // B · 87aace5c0f21
    "quests.q_the_eyes.discoverWhen.flagsSet": ["met_ryuk"],
    // B · 804f9ee60726
    "quests.q_the_eyes.steps.q_eyes_decide.playerCopy": "Accepte le marché, ou pas.",
    // B · 672cd7bbbe11
    "quests.q_the_eyes.steps.q_eyes_decide.directorNotes": "§39 — une vraie branche, le refus canon ne doit pas être présumé. L’accepter n’est pas une victoire instantanée : il doit encore être physiquement dans la pièce avec une cible, ce qui change toute sa méthode, passant de la recherche à la présence, et le rend beaucoup plus exposé en personne. §104 dans la liste des parties traite ça comme une partie à part entière.",
    // B · 39cf3b289154
    "quests.q_the_eyes.involvedCharacterIds": ["ryuk","misa"],
    // B · 0319b8ca01de
    "quests.q_the_eyes.involvedLocationIds": ["light_bedroom"],
    // B · c2acb48ae4c2
    "quests.q_the_eyes.knownRewardCopy": "Des noms, à partir de visages. Et beaucoup moins de temps.",
    // B · 4bae0ce4905f
    "quests.q_memory_plan.title": "Cinquante Jours",
    // B · 3c25ce2dbddc
    "quests.q_memory_plan.summary": "Il existe une version où tu donnes le carnet, oublies tout sincèrement, réussis honnêtement tous les tests qu’ils inventent, et tout t’est rendu plus tard.",
    // B · 7fcc0be2ad9c
    "quests.q_memory_plan.kind": "PRINCIPALE",
    // B · 0d4bfa9b03c3
    "quests.q_memory_plan.discoverWhen.flagsSet": ["met_l"],
    // B · 47f34cc57189
    "quests.q_memory_plan.steps.q_memory_give_it_up.playerCopy": "Décide si tu arrêtes d’être la personne qui sait.",
    // B · 727a48073168
    "quests.q_memory_plan.steps.q_memory_give_it_up.directorNotes": "§11 et §82 — s’il renonce à la propriété, écris sa personnalité pré-Kira *sincèrement*. Il peut poursuivre Kira, trouver Kira moralement dérangeant, traiter Misa complètement différemment, et coopérer honnêtement avec L, et §110 interdit d’écrire un Light amnésique comme secrètement mauvais. Ce contraste est le cœur de l’arc et la meilleure écriture du monde s’y trouve.",
    // B · 368a5ee319e1
    "quests.q_memory_plan.steps.q_memory_return.playerCopy": "Quelqu’un te tend un papier.",
    // B · 55de5f301dbf
    "quests.q_memory_plan.steps.q_memory_return.directorNotes": "Treize mois de sa propre réflexion arrivent d’un coup, au milieu de quelque chose d’ordinaire. §82 — le retour est mécanique et précis, pas thématique. Il peut aussi ne jamais arriver : un joueur qui a renoncé puis détruit le carnet a fini l’histoire et atteint une vraie destination.",
    // B · 008968ee8054
    "quests.q_memory_plan.steps.q_memory_return.enterWhen.flagsSet": ["relinquished_ownership"],
    // B · 50be54d74026
    "quests.q_memory_plan.steps.q_memory_return.succeedWhen.flagsSet": ["used :ab_touch_to_remember"],
    // B · 33cec6254858
    "quests.q_memory_plan.involvedCharacterIds": ["l","ryuk","soichiro","misa","rem"],
    // B · 5bccd570ec49
    "quests.q_memory_plan.involvedLocationIds": ["confinement","taskforce_hq","hotel_taskforce"],
    // B · 26b82fe70a9c
    "quests.q_memory_plan.knownRewardCopy": "Un alibi honnête, au prix d’être quelqu’un d’autre un moment.",
    // B · 64274d08eac8
    "quests.q_proxy.title": "Les Mains De Quelqu’un D’Autre",
    // B · 0f7cee66627a
    "quests.q_proxy.summary": "Tu ne peux pas être vu en train d’écrire, et il y a un procureur qui considérerait ça comme le but de sa vie d’écrire pour toi.",
    // B · 7fcc0be2ad9c
    "quests.q_proxy.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_proxy.discoverWhen.flagsSet": ["committed_to_kira"],
    // B · 2bdf7e73f9b8
    "quests.q_proxy.steps.q_proxy_choose.playerCopy": "Décide si tu utilises un proxy ou pas.",
    // B · c70afa508a8c
    "quests.q_proxy.steps.q_proxy_choose.directorNotes": "§57 — le joueur n’est pas obligé de choisir Mikami, ni personne. Un proxy, plusieurs, ou aucun sont tous possibles, et plus c’est compliqué, plus il y a de risques d’échec, ce qui doit être expliqué au joueur par les conséquences plutôt que par un avertissement. Une partie sans proxy ferme toute la route de substitution de Near, selon §110.",
    // B · bc45509278d5
    "quests.q_proxy.steps.q_proxy_instruct.playerCopy": "Décide à quel point tu lui donnes des instructions précises.",
    // B · 86a6ac658da2
    "quests.q_proxy.steps.q_proxy_instruct.directorNotes": "§58, le test critique de rupture de scénario dans cette bible, et la seule chose dans ce monde qui doit être garantie mécaniquement. Si le joueur dit clairement « ne jamais accéder au vrai carnet sauf si je l’ordonne personnellement », Mikami obéit fortement, et il NE le viole PAS parce que Near doit gagner. Il répète l’instruction explicitement à l’identique — cette répétition permet au joueur de savoir dans quel cas il est. Une instruction vague est interprétée, avec confiance, dans la direction que Mikami croit que son dieu voudrait.",
    // B · 327c5c88a3b4
    "quests.q_proxy.steps.q_proxy_instruct.enterWhen.flagsSet": ["using_mikami"],
    // B · dd2b484b9eb0
    "quests.q_proxy.involvedCharacterIds": ["mikami","near","mello"],
    // B · 0e72bfc4138b
    "quests.q_proxy.involvedLocationIds": ["kanto_street","nhn_studio"],
    // B · e4e7959fa0d3
    "quests.q_proxy.knownRewardCopy": "Distance par rapport à l’acte, et un nouveau point de défaillance.",
    // B · d7ad724a27cb
    "quests.q_yellow_box.title": "L’Entrepôt De La Boîte Jaune",
    // B · bc29c63cea4a
    "quests.q_yellow_box.summary": "Tu as choisi le bâtiment. Tous ceux qui essaient de prouver ça viennent, et l’un d’eux a amené quelque chose à te montrer.",
    // B · 7fcc0be2ad9c
    "quests.q_yellow_box.kind": "PRINCIPALE",
    // B · c98e8f1d248e
    "quests.q_yellow_box.discoverWhen.flagsSet": ["engagé_avec_kira"],
    // B · 8fa1cd523ce1
    "quests.q_yellow_box.steps.q_yb_set.playerCopy": "Poser le piège.",
    // B · 01197222778a
    "quests.q_yellow_box.steps.q_yb_set.directorNotes": "§108 — annuler ça, c’est une partie nommée. Un joueur qui a remarqué un truc louche et qui abandonne n’a pas raté la fin, il en a choisi une autre. Ne force pas le monde à le pousser dans le bâtiment.",
    // B · 7e6b8aa58d8c
    "quests.q_yellow_box.steps.q_yb_wait.playerCopy": "Quelqu’un doit mourir avant que ça se termine. Décide si tu parles en premier.",
    // B · f5c5e900b178
    "quests.q_yellow_box.steps.q_yb_wait.directorNotes": "Le dernier point de la liste §1 et le moment le plus débattu dans la source : pourquoi dire quoi que ce soit qui ressemble à « j’ai gagné » avant qu’il y ait eu un mort. La certitude est la lecture. Dans sa partie haute, la prose doit faire que l’annonce ressemble à une conclusion plutôt qu’à de l’arrogance, parce que c’est ça de l’intérieur. Attendre en silence quarante secondes est mécaniquement le coup le plus fort et le plus dur que ce personnage ait jamais eu à faire.",
    // B · 44506bb5a712
    "quests.q_yellow_box.steps.q_yb_wait.enterWhen.flagsSet": ["piège_posé"],
    // B · a346fd8dde4f
    "quests.q_yellow_box.steps.q_yb_outcome.playerCopy": "Découvre à qui appartient le carnet dans le sac.",
    // B · b1450fde1bfd
    "quests.q_yellow_box.steps.q_yb_outcome.directorNotes": "La substitution n’existe que s’il y a un mandataire pour surveiller — §57 et §110. Si Mikami était lié par une consigne explicite et n’a jamais touché le vrai carnet, il n’y a rien à échanger, et Near perd sur le matériel. §110 dit clairement que Mikami ne doit pas violer une consigne explicite juste parce que le canon veut que Near gagne.",
    // B · a6ea652f54d1
    "quests.q_yellow_box.steps.q_yb_outcome.enterWhen.flagsSet": ["attendu_en_silence"],
    // B · cb8ea2f3e2ff
    "quests.q_yellow_box.involvedCharacterIds": ["near","mikami","soichiro","matsuda","aizawa","ryuk"],
    // B · 7a82b3c42bff
    "quests.q_yellow_box.involvedLocationIds": ["boite_jaune","studio_nhn"],
    // B · 5df5263aae93
    "quests.q_yellow_box.knownRewardCopy": "La fin, d’une façon ou d’une autre.",
    // B · 5af66df0f069
    "quests.q_l_fate.title": "Ce Qui Lui Arrive",
    // B · 3d2a8fc74ade
    "quests.q_l_fate.summary": "Il y a une version où il meurt, et une autre où tu le laisses vivre, et la deuxième n’est pas plus douce.",
    // B · 7fcc0be2ad9c
    "quests.q_l_fate.kind": "PRINCIPALE",
    // B · 0d4bfa9b03c3
    "quests.q_l_fate.discoverWhen.flagsSet": ["rencontré_l"],
    // B · f9f18bd82862
    "quests.q_l_fate.steps.q_l_fate_decide.playerCopy": "Décide ce qui arrive à L.",
    // B · 98391e998442
    "quests.q_l_fate.steps.q_l_fate_decide.directorNotes": "§47 et §48. Le laisser vivre est explicitement soutenu et ce n’est pas l’option la plus clémente — c’est celle où quelqu’un qui est sûr de toi est vivant et actif pendant quarante ans. La route Rem a une contrainte forte : un Shinigami qui tue pour prolonger la vie d’un humain favori meurt pour ça, donc Misa perd sa protectrice et ça ne doit jamais être gratuit. Lui avouer est une route à part selon §49 et ne nécessite pas de mort.",
    // B · e4194d759e08
    "quests.q_l_fate.involvedCharacterIds": ["l","misa","rem","soichiro"],
    // B · a63fed8fd2cb
    "quests.q_l_fate.involvedLocationIds": ["quartier_général","hôtel_quartier_général"],
    // B · 54ef727f8811
    "quests.q_l_fate.knownRewardCopy": "La fin du seul jeu que tu voulais jouer.",
    // B · e3afca2b3b2a
    "quests.q_successors.title": "Deux Enfants De Winchester",
    // B · b4fe4ae57f1a
    "quests.q_successors.summary": "Quelqu’un a élevé des remplaçants, et ils ne fonctionnent pas de la même façon entre eux ni comme lui. L’un est à New York, l’autre dans un entrepôt à Los Angeles.",
    // B · 7fcc0be2ad9c
    "quests.q_successors.kind": "PRINCIPALE",
    // B · 7e49057fd8a2
    "quests.q_successors.discoverWhen.flagsSet": ["l_mort"],
    // B · 99aeb30963c6
    "quests.q_successors.steps.q_succ_appear.playerCopy": "Découvre qui a hérité de l’affaire.",
    // B · e4d0737c9e0d
    "quests.q_successors.steps.q_succ_appear.directorNotes": "§53 — aucun d’eux n’est le destin. Ils héritent des preuves existantes et raisonnent indépendamment, et §110 interdit Near-en-L aux cheveux blancs et Mello-en-Near en colère. Si l’Exposition est faible, il y a peu à hériter et ils arrivent avec des positions bien plus faibles que la version célèbre.",
    // B · 7e49057fd8a2
    "quests.q_successors.steps.q_succ_appear.succeedWhen.flagsSet": ["l_mort"],
    // B · 476450b56d80
    "quests.q_successors.steps.q_succ_appear.rewards.flags": ["quartier_général_construit","entré_université"],
    // B · b3bce069cd39
    "quests.q_successors.steps.q_succ_mello.playerCopy": "L’impatient ne va pas attendre les preuves.",
    // B · 939b4297bfd8
    "quests.q_successors.steps.q_succ_mello.directorNotes": "Mello agit sur une conclusion partielle par une voie qu’aucune institution ne sanctionnerait, ce qui le rend incontrôlable par toutes les méthodes qui marchent sur L et Near. Il peut arriver le premier, échouer cher, et être arrêté. Il se dépense si l’échange semble favorable.",
    // B · 40c89da24cd8
    "quests.q_successors.steps.q_succ_mello.enterWhen.flagsSet": ["quartier_général_construit"],
    // B · 827257c30ad4
    "quests.q_successors.involvedCharacterIds": ["near","mello","aizawa","matsuda"],
    // B · 41ef4d0de943
    "quests.q_successors.involvedLocationIds": ["quartier_général_spk","mafia_mello","quartier_général"],
    // B · cb582c3f6572
    "quests.q_successors.knownRewardCopy": "Deux problèmes qui ne ressemblent pas au premier.",
    // B · dd6bc7f29470
    "quests.q_yotsuba.title": "Huit Hommes Autour D’une Table",
    // B · be95857e6872
    "quests.q_yotsuba.summary": "Quelqu’un tue pour des raisons commerciales et prend des notes, ce qui est soit une catastrophe, soit la chose la plus utile qui te soit jamais arrivée.",
    // B · 552c0b7f83c2
    "quests.q_yotsuba.kind": "SECONDAIRE",
    // B · 008968ee8054
    "quests.q_yotsuba.discoverWhen.flagsSet": ["renoncé_propriété"],
    // B · 8f8ded0b8eb8
    "quests.q_yotsuba.steps.q_yotsuba_work.playerCopy": "Il y a un Kira qui n’est manifestement pas toi.",
    // B · deba7079850c
    "quests.q_yotsuba.steps.q_yotsuba_work.directorNotes": "L’arc où un Light sans mémoire est sincèrement le meilleur enquêteur dans la pièce et §11 exige qu’il soit écrit ainsi — vraiment troublé par Kira, vraiment coopératif, sans complot secret. C’est le meilleur alibi possible et il ne le construit pas, ce qui le rend crédible.",
    // B · d7900781f433
    "quests.q_yotsuba.steps.q_yotsuba_work.succeedWhen.flagsSet": ["visited :yotsuba_boardroom"],
    // B · 58bd0d03bfce
    "quests.q_yotsuba.steps.q_yotsuba_work.rewards.flags": ["yotsuba_active"],
    // B · dd25e0144c49
    "quests.q_yotsuba.involvedCharacterIds": ["l","misa","rem","matsuda","aizawa"],
    // B · 23f173653828
    "quests.q_yotsuba.involvedLocationIds": ["yotsuba_boardroom","taskforce_hq"],
    // B · c1070c66a906
    "quests.q_yotsuba.knownRewardCopy": "Un Kira qui n’est définitivement pas toi.",
    // B · f378ad8c274f
    "quests.q_your_father.title": "La Mallette dans le Hall",
    // B · 0035b830d3df
    "quests.q_your_father.summary": "Le renseignement le plus précieux du pays rentre chez lui chaque soir à onze heures, laissé près des chaussures, par un homme d’une intégrité extraordinaire dont le seul point aveugle, c’est toi.",
    // B · 552c0b7f83c2
    "quests.q_your_father.kind": "SECONDAIRE",
    // B · 2fcb918c3d70
    "quests.q_your_father.discoverWhen.flagsSet": ["has_notebook"],
    // B · 853728fcc9a0
    "quests.q_your_father.steps.q_father_decide.playerCopy": "Décide ce que ta famille représente.",
    // B · 424465a8d93c
    "quests.q_your_father.steps.q_father_decide.directorNotes": "§26 — ne réduis pas Soichiro à un accès à une base de données policière. Lire les notes est possible dès la première soirée et ce n’est pas une scène, c’est une décision prise dans un couloir en onze secondes. Les autres voies sont réelles : travailler honnêtement à ses côtés, avouer, ou abandonner Kira pour lui, et la liste des fins a une destination pour chacune. Un joueur qui passe ses soirées à cette table joue une histoire différente et bien meilleure que celui qui ne le fait pas.",
    // B · 540c98eb64f1
    "quests.q_your_father.involvedCharacterIds": ["soichiro","sayu","sachiko"],
    // B · 7b0acd527a7c
    "quests.q_your_father.involvedLocationIds": ["yagami_home"],
    // B · 407352a99214
    "quests.q_your_father.knownRewardCopy": "L’enquête, vue de l’intérieur.",
    // B · a06dd0f58a48
    "worldEvents.we_first_notice.publicCopy": "Un programme de fin de soirée a passé onze minutes sur un nombre inhabituel de morts en garde à vue, surtout pour débattre de savoir si c’est vraiment un nombre.",
    // B · e3d7f0c1fa7c
    "worldEvents.we_first_notice.directorNotes": "La première fois que le monde dit quelque chose. Pas une accusation ni une chasse à l’homme — deux commentateurs et un statisticien s’intéressent à une coïncidence. Sayu parle par-dessus. Son père ne commente pas, c’est la chose la plus forte dans la pièce.",
    // B · 991f095bb780
    "worldEvents.we_first_notice.setsFlags": ["publicly_noticed"],
    // B · e0cdfb94520f
    "worldEvents.we_first_notice.cancelledByFlags": ["destroyed_notebook","used_it_once_only","never_took_notebook"],
    // B · c98e8f1d248e
    "worldEvents.we_first_notice.requiresFlags": ["committed_to_kira"],
    // B · fdae857d6695
    "worldEvents.we_school_chatter.publicCopy": "Quelqu’un a écrit un nom sur un bureau, et la discussion sur le fait que ce soit une bonne chose est passée d’internet au couloir.",
    // B · a9ea0b227a7f
    "worldEvents.we_school_chatter.directorNotes": "§21 — les bavardages scolaires sont une des surfaces nommées. Les ados approuvent, sont légers et complètement pas sérieux, ce qui est beaucoup plus inquiétant que la peur. Personne ne le regarde. C’est le point de la scène.",
    // B · 58ba9e75d150
    "worldEvents.we_school_chatter.setsFlags": ["school_talking"],
    // B · e0cdfb94520f
    "worldEvents.we_school_chatter.cancelledByFlags": ["destroyed_notebook","used_it_once_only","never_took_notebook"],
    // B · 991f095bb780
    "worldEvents.we_school_chatter.requiresFlags": ["publicly_noticed"],
    // B · 18b10cf83926
    "worldEvents.we_crime_drops.publicCopy": "Les rues sont plus calmes qu’avant, tu le sens en rentrant chez toi, et quelqu’un au gouvernement commence à le dire publiquement.",
    // B · 7ae9b2ff4f9d
    "worldEvents.we_crime_drops.directorNotes": "L’argument qu’il avancera lui-même, présenté comme preuve avant qu’il ait eu à le faire. §10 est la question sous-jacente : ça arrive vraiment, et ce n’est pas pour ça qu’il a répondu à la diffusion.",
    // B · af2f1c862632
    "worldEvents.we_crime_drops.setsFlags": ["crime_visibly_dropped"],
    // B · f454082e2bd5
    "worldEvents.we_crime_drops.cancelledByFlags": ["destroyed_notebook","used_it_once_only"],
    // B · 58ba9e75d150
    "worldEvents.we_crime_drops.requiresFlags": ["school_talking"],
    // B · aed5ac4c82e8
    "worldEvents.we_copycats.publicCopy": "Trois personnes dans différentes préfectures ont tué quelqu’un en laissant un mot disant qu’ils faisaient le travail de Kira, sans aucun pouvoir surnaturel.",
    // B · c4c4eb75c927
    "worldEvents.we_copycats.directorNotes": "§21 liste les imitateurs. La pire chose pour une position morale est que des gens agissent mal en son nom. Il aura une opinion sur la mauvaise représentation, et avoir une opinion là-dessus est déjà le diagnostic.",
    // B · 3cde0179076a
    "worldEvents.we_copycats.setsFlags": ["copycats_active"],
    // B · f454082e2bd5
    "worldEvents.we_copycats.cancelledByFlags": ["destroyed_notebook","used_it_once_only"],
    // B · af2f1c862632
    "worldEvents.we_copycats.requiresFlags": ["crime_visibly_dropped"],
    // B · 63a719ec7f2d
    "promises.pr_beat_l.kind": "RIVALITÉ",
    // B · 22de27a563d3
    "promises.pr_beat_l.label": "Tout le monde pense qu’il aurait pu battre L",
    // B · ab7bca316e8e
    "promises.pr_beat_l.seedHint": "Il n’est pas dans l’histoire pendant un mois et doit être ressenti avant d’être rencontré — comme une méthode, une absence, et quelqu’un qui a toujours raison sur des choses qu’il ne devrait pas savoir.",
    // B · c2752f550fc6
    "promises.pr_beat_l.payoffHint": "N’importe quelle fin où le duel se résout sur des informations plutôt que sur de l’intuition : il gagne, perd, est devenu ami, ou ne découvre jamais ce qu’il fallait parce que le joueur ne le lui a jamais donné.",
    // B · f8b4a6708d82
    "promises.pr_ego.kind": "THÈME",
    // B · be6d871d77e7
    "promises.pr_ego.label": "Est-il en train d’optimiser le monde, ou d’optimiser sa victoire ?",
    // B · a9c80d93b561
    "promises.pr_ego.seedHint": "§10. Établis les deux sincèrement — il est vraiment troublé par le crime et il ne peut vraiment pas laisser passer une insulte — et ne laisse jamais le narrateur choisir entre eux.",
    // B · 9a64ab37a251
    "promises.pr_ego.payoffHint": "La certitude est le résultat. Chaque erreur célèbre se trouve dans sa bande supérieure, et une partie qui finit avec elle basse a répondu à la question dans l’autre sens, ce qui est une vraie fin plutôt qu’un échec à atteindre la tragédie.",
    // B · 445cd8deebc2
    "promises.pr_the_family.kind": "RELATION",
    // B · e2932f1834d7
    "promises.pr_the_family.label": "Une maison avec quatre personnes dedans",
    // B · b89adc60bd63
    "promises.pr_the_family.seedHint": "Le dîner, les devoirs, une mère qui dit qu’elle est fière de lui, un père qui ne peut pas parler de sa journée. Ça doit être vraiment bien avant que quoi que ce soit soit en danger.",
    // B · 0e0909ad4fd1
    "promises.pr_the_family.payoffHint": "Confession, abandonner Kira pour eux, travailler honnêtement aux côtés de son père, ou un homme à une table jouant un fils. Les quatre sont possibles et l’un d’eux est bien pire que les autres.",
    // B · e82d9dc4b3fa
    "promises.pr_ryuk.kind": "MYSTÈRE",
    // B · 4eeaea70ee40
    "promises.pr_ryuk.label": "Les règles que personne ne t’a dites",
    // B · da8215ecf98e
    "promises.pr_ryuk.seedHint": "Les instructions sur la couverture sont incomplètes et ne disent pas qu’elles le sont. Ryuk le confirmera sans le dire spontanément, et chaque lacune doit être trouvée par expérience ou en posant la bonne question.",
    // B · fe155afbdef4
    "promises.pr_ryuk.payoffHint": "Un joueur qui a bien appris les règles est imbattable sur la mécanique. Celui qui a supposé est battu par un détail qu’il aurait pu trouver dès la première semaine.",
    // B · 5631e4ba6537
    "promises.pr_successors.kind": "PATRON",
    // B · d9080a99d1e6
    "promises.pr_successors.label": "Deux enfants élevés pour le remplacer",
    // B · 1b745c611e1d
    "promises.pr_successors.seedHint": "Ils existent indépendamment de la survie de L et raisonnent différemment l’un de l’autre. Aucun n’est le destin et tous deux ne détiennent que les preuves créées par le joueur.",
    // B · 1c54bd931f37
    "promises.pr_successors.payoffHint": "L’un ou l’autre peut gagner, les deux peuvent échouer, et sans mandataire et avec une instruction explicite, il n’y a rien à prouver pour l’un ou l’autre.",
    // B · d77ebfcebe44
    "promises.pr_warehouse.kind": "FINALE",
    // B · 0aec89d1dc0c
    "promises.pr_warehouse.label": "Un bâtiment choisi par toi-même",
    // B · f9c6879d12ce
    "promises.pr_warehouse.seedHint": "Il choisit l’endroit, ce qui signifie que chaque partie de ce qui s’y passe est la conséquence d’une décision qu’il a prise en toute confiance.",
    // B · 4e0129da2e6b
    "promises.pr_warehouse.payoffHint": "Accessible et entièrement évitable. L’annuler, attraper l’échange, ou simplement ne rien dire pendant quarante secondes sont tous réels, et aucun n’est l’histoire qui reconnaît que la critique était évidente.",
    // B · eff8bcde8a9d
    "endings.end_god_of_the_new_world.name": "Dieu du Nouveau Monde",
    // B · f7fc172f729a
    "endings.end_god_of_the_new_world.rarity": "UNIQUE",
    // B · d6a1d114ff70
    "endings.end_god_of_the_new_world.requires.flagsSet": ["yellow_box_won","committed_to_kira"],
    // B · 741a722cd128
    "endings.end_god_of_the_new_world.requires.flagsUnset": ["near_exposed_you"],
    // B · 191948952e42
    "endings.end_god_of_the_new_world.condition": "Tous les enquêteurs qui auraient pu le prouver sont partis ou ont tort, et la position est durable plutôt que simplement incontestée. Écris la réussite directement. C’est lui qui a fait ça.",
    // A · efc9377621e2
    "endings.end_god_of_the_new_world.epilogue": "La criminalité chute et continue de baisser, beaucoup de gens sont réellement plus en sécurité, et le mot pour ce qu’il est devenu est celui qu’il a choisi. Plus personne vivant ne peut le contredire. Il a trente, puis quarante ans, et ce qu’il ne résout jamais, c’est qu’il n’y a plus personne pour lui dire qu’il a tort, ce qu’il avait pris pour un but.",
    // B · 59842829b2bb
    "endings.end_no_reaction.name": "Pas de Réaction",
    // B · f8b8333fe7bc
    "endings.end_no_reaction.rarity": "RARE",
    // B · 9f7ecf972e14
    "endings.end_no_reaction.requires.flagsSet": ["refused_the_bait"],
    // B · a04e43a53663
    "endings.end_no_reaction.requires.flagsUnset": ["l_knows_kanto"],
    // B · 715bc04e9fd0
    "endings.end_no_reaction.condition": "Il a été insulté à la télévision nationale et n’a rien fait, et la région n’est jamais entrée dans le dossier de personne. §22 — L ne reçoit pas la percée par une autre voie et s’adapte légitimement.",
    // A · 841a85f009d3
    "endings.end_no_reaction.epilogue": "L’enquête avance avec réflexion et lentement sur des preuves qui concernent cent mille personnes. L n’est pas vaincu ; il travaille sur un problème bien plus dur que celui de la version célèbre, et il le fait depuis l’Europe, car rien ne lui a dit de venir au Japon.",
    // B · c0c75a866ea7
    "endings.end_no_reaction.hint": "Il veut une réaction. C’est une raison suffisante.",
    // B · 8f54a66cfb83
    "endings.end_cleared.name": "Blanchi",
    // B · f8b8333fe7bc
    "endings.end_cleared.rarity": "RARE",
    // B · 87fa249fe54b
    "endings.end_cleared.requires.flagsSet": ["cleared_by_fbi"],
    // B · a3764cb95aca
    "endings.end_cleared.requires.flagsUnset": ["raye_dead"],
    // B · 2e5a27a7e696
    "endings.end_cleared.condition": "La surveillance est terminée, le rapport a dit qu’il n’y avait rien, et l’homme qui l’a écrit est rentré chez lui et s’est marié.",
    // A · b930407e3a5b
    "endings.end_cleared.epilogue": "Un document dans un dossier à Washington porte son nom et un verdict négatif, c’est l’objet le plus précieux qu’il possède. Ça ne le rend pas innocent. Ça le rend extraordinairement compliqué, et tous ceux qui viendront après doivent commencer par expliquer pourquoi le Bureau s’est trompé.",
    // B · cbc53b5293e5
    "endings.end_cleared.hint": "Il est presque fini. Laisse-le finir.",
    // B · 236cd42483bc
    "endings.end_the_eye_deal.name": "Le Marché des Yeux",
    // B · f8b8333fe7bc
    "endings.end_the_eye_deal.rarity": "RARE",
    // B · 1d1fda714574
    "endings.end_the_eye_deal.requires.flagsSet": ["took_the_eyes"],
    // B · f1f1479d38b7
    "endings.end_the_eye_deal.condition": "Il a accepté l’échange et a construit un Kira complètement différent, fondé sur sa présence physique. §39 — pas une victoire, une autre méthode.",
    // A · ee6c246a3a9c
    "endings.end_the_eye_deal.epilogue": "Il est constamment dehors, dans la foule, aux événements, dans les trains, parce qu’un nom qu’il ne peut pas voir est un nom qu’il ne peut pas utiliser. Ça le rend redoutable et c’est un visage dans quarante mille photos, et il lui reste la moitié du temps qu’il avait pour profiter de cet arrangement.",
    // B · 6b665acb60df
    "endings.end_lives.name": "Vies",
    // B · f8b8333fe7bc
    "endings.end_lives.rarity": "RARE",
    // B · 14ab67678d89
    "endings.end_lives.requires.flagsSet": ["rencontré_l","engagé_avec_kira"],
    // B · b64b4a8dada1
    "endings.end_lives.requires.flagsUnset": ["proche_de_t’avoir_dénoncé","boîte_jaune_gagnée"],
    // B · da14645e2ad7
    "endings.end_lives.condition": "Aucun des deux ne gagne. Les deux sont vivants, les deux sont sûrs, et aucun ne peut le prouver.",
    // A · 5e9fcc8d7c67
    "endings.end_lives.epilogue": "Ils dînent ensemble environ deux fois par an pour le reste de leur vie, officiellement pour parler d’autres enquêtes. Chacun sait. Aucun n’a rien, et les deux ont conclu en privé que l’autre est la seule personne à qui ils ont jamais pu parler, ce qui est aussi drôle que vrai.",
    // B · 2801b535bfda
    "endings.end_partners.name": "Partenaires",
    // B · f7fc172f729a
    "endings.end_partners.rarity": "UNIQUE",
    // B · c228abdc2e11
    "endings.end_partners.requires.flagsSet": ["travaille_honnêtement"],
    // B · c75e9a60058c
    "endings.end_partners.condition": "Ils coopèrent sincèrement, contre un carnet qui n’est pas le sien. Ça demande un Light honnête — §11 — et un détective qui n’a aucune raison de retenir quoi que ce soit.",
    // A · 4f81fc3d5740
    "endings.end_partners.epilogue": "Deux personnes faites pour être opposées passent quatre ans à être la chose la plus efficace du monde, et aucune ne cesse jamais complètement de se poser des questions. C’est la meilleure fin possible pour l’une comme pour l’autre, et tous deux la décriraient comme un accident.",
    // B · 9c2b17b2a76a
    "endings.end_confession.name": "Confession",
    // B · f8b8333fe7bc
    "endings.end_confession.rarity": "RARE",
    // B · e08d50daedcd
    "endings.end_confession.requires.flagsSet": ["avoué"],
    // B · 517efcc2162c
    "endings.end_confession.condition": "Il dit la vérité volontairement, à quelqu’un, et assume ce qui suit. Joue ça comme une décision, pas comme un effondrement.",
    // A · 6e1626a220c7
    "endings.end_confession.epilogue": "C’est son père qui doit agir, ce qu’il fait en respectant la loi, ce qui met fin à tout. Si on y voit une rédemption, le texte ne le dit pas — il raconte ce qui s’est passé dans la pièce et ensuite, sans juger.",
    // B · cb0605ec8f1c
    "endings.end_the_detective.name": "Le Détective",
    // B · f7fc172f729a
    "endings.end_the_detective.rarity": "UNIQUE",
    // B · c878c324dcc6
    "endings.end_the_detective.requires.flagsSet": ["carnet_détruit"],
    // B · c98e8f1d248e
    "endings.end_the_detective.requires.flagsUnset": ["engagé_avec_kira"],
    // B · 2f0cf93feaa1
    "endings.end_the_detective.condition": "Il ne devient jamais Kira et devient à la place l’enquêteur pour lequel toute cette capacité était toujours destinée. La bible classe ça en Légendaire, et c’est justifié.",
    // A · f4f4d46e4515
    "endings.end_the_detective.epilogue": "Il a vingt-quatre ans et il est déjà le meilleur du pays, mais son père n’arrive pas à en parler. Il y a une semaine de sa vie qu’il ne partage avec personne, un carnet qu’il a brûlé dans une poubelle derrière chez lui, et beaucoup de gens vivants qui ignorent tout.",
    // B · 694e41646a5a
    "endings.end_the_detective.hint": "Tu peux finir ça dès le premier après-midi.",
    // B · f31543e05bf5
    "endings.end_just_one_name.name": "Un Seul Nom",
    // B · 734e45c160cf
    "endings.end_just_one_name.rarity": "PEU COMMUN",
    // B · 937591624d2b
    "endings.end_just_one_name.requires.flagsSet": ["utilisé_une_fois_seulement"],
    // B · 6e92337b102c
    "endings.end_just_one_name.condition": "Il l’a utilisé une fois, pour une personne, et jamais plus. Ce n’est pas un refus d’agir — c’est une réponse complète et délibérée.",
    // A · f6d60e5b74d8
    "endings.end_just_one_name.epilogue": "Personne ne cherche jamais, parce qu’une seule mort ne fait pas un schéma. Il garde le carnet, ou pas ; dans tous les cas, il ne le rouvre pas, et il est le seul au monde à savoir qu’un jour il a décidé d’arrêter. Il y pense environ une fois par semaine jusqu’à la fin de sa vie.",
    // B · 59ab99e0cbb3
    "endings.end_burn_it.name": "Brûle-le",
    // B · f8b8333fe7bc
    "endings.end_burn_it.rarity": "RARE",
    // B · c878c324dcc6
    "endings.end_burn_it.requires.flagsSet": ["carnet_détruit"],
    // B · 03e53420ea55
    "endings.end_burn_it.condition": "Il retire l’objet du monde avant que tout ça ne prenne effet.",
    // A · 9c393ffdb35b
    "endings.end_burn_it.epilogue": "Ryuk est agacé pendant une minute, puis il part chercher quelqu’un d’autre, ce que personne ne imagine jamais. Quelque part dans le monde, ça arrive à une autre personne et Light Yagami ne l’apprend jamais. Il finit l’école, s’ennuie, et c’est la meilleure chose qui pouvait lui arriver.",
    // B · 2341edf4d06a
    "endings.end_misa.name": "Misa",
    // B · f8b8333fe7bc
    "endings.end_misa.rarity": "RARE",
    // B · 3b0ea22fee75
    "endings.end_misa.requires.flagsSet": ["partenaire_misa"],
    // B · c3e1f5b532af
    "endings.end_misa.condition": "Une relation réciproque sincère avec quelqu’un qui a sacrifié la moitié de sa vie pour lui avant même qu’ils ne se rencontrent.",
    // A · ac7fc58ad4eb
    "endings.end_misa.epilogue": "Qu’elle soit aimée ne la rend pas plus sûre, ni lui non plus, et c’est la seule relation de cette histoire où les deux savent exactement qui est l’autre. Rem arrête de le regarder. C’est le plus grand changement, et personne ne le remarque jamais.",
    // B · a45e8a6802e6
    "endings.end_misa.hint": "Dis-le correctement. Une fois.",
    // B · 1d7b24453903
    "endings.end_second_god.name": "Second Dieu",
    // B · 734e45c160cf
    "endings.end_second_god.rarity": "PEU COMMUN",
    // B · 008968ee8054
    "endings.end_second_god.requires.flagsSet": ["renoncé_à_la_propriété"],
    // B · 108489310ad8
    "endings.end_second_god.requires.flagsUnset": ["souvenirs_retournés"],
    // B · a0372568bf20
    "endings.end_second_god.condition": "Quelqu’un d’autre finit par le détenir, et s’en sert mieux que lui.",
    // A · 5770d4dc4406
    "endings.end_second_god.epilogue": "Il passe quatre ans à aider à traquer un Kira qui n’est pas lui, honnêtement et avec brio, et la version du monde qui en résulte n’est ni meilleure ni pire. Il ne saura jamais quel mois était le sien. Personne ne le lui dit, personne ne peut.",
    // B · f2343aa5ea34
    "endings.end_l_falls.name": "L Tombe",
    // B · f8b8333fe7bc
    "endings.end_l_falls.rarity": "RARE",
    // B · 6bcf83c25966
    "endings.end_l_falls.requires.flagsSet": ["l_mort","engagé_avec_kira"],
    // B · 2aaea351d3a1
    "endings.end_l_falls.requires.flagsUnset": ["boîte_jaune_gagnée"],
    // B · e086a37e72e6
    "endings.end_l_falls.condition": "Il bat L puis perd face à quelque chose qui découle du fait d’avoir battu L.",
    // A · 019ee5545e70
    "endings.end_l_falls.epilogue": "Il gagne la seule partie qu’il voulait vraiment, puis passe cinq ans à jouer contre des enfants qui ont hérité du plateau, et le pire, c’est qu’ils ne sont pas meilleurs que L. Ils n’ont juste pas besoin de l’être, parce qu’il a passé cinq ans à croire que personne ne pouvait l’être.",
    // B · 6cf9c0f1ad6b
    "endings.end_kira_and_l.name": "Kira et L",
    // B · f8b8333fe7bc
    "endings.end_kira_and_l.rarity": "RARE",
    // B · 3b060b9ae2b7
    "endings.end_kira_and_l.requires.flagsSet": ["l_mort","rejoint_enquête","engagé_avec_kira"],
    // B · 930345645f0c
    "endings.end_kira_and_l.condition": "Il devient l’institution tout en restant la chose qu’elle cherche à attraper, pendant des années.",
    // A · cc7ae44f1d81
    "endings.end_kira_and_l.epilogue": "Il mène l’enquête sur lui-même, avec compétence, et c’est un vrai travail de police. Six personnes passent leur carrière à lui faire des rapports sur lui. Ça marche onze ans, et la raison pour laquelle ça s’arrête n’a rien à voir avec la détection.",
    // B · 085cc991d138
    "endings.end_mello_wins.name": "Mello gagne",
    // B · 734e45c160cf
    "endings.end_mello_wins.rarity": "PEU FRÉQUENT",
    // B · 5de0624d6e99
    "endings.end_mello_wins.requires.flagsSet": ["mello_t’a_dénoncé"],
    // B · c6aa98a29dd8
    "endings.end_mello_wins.condition": "L’impatient arrive le premier, par une méthode qu’aucune institution n’aurait sanctionnée, et il ne survit probablement pas.",
    // A · 673861ebc419
    "endings.end_mello_wins.epilogue": "C’est confus, plusieurs meurent alors que ça n’était pas nécessaire, et ça se finit des mois plus tôt que la route prudente. Near l’apprend à la télé, par terre, à New York, et il ne dit rien pendant très longtemps.",
    // B · 588f3c7dfdcc
    "endings.end_near_wins.name": "Near gagne",
    // B · c9d08ae5d876
    "endings.end_near_wins.rarity": "FRÉQUENT",
    // B · 741a722cd128
    "endings.end_near_wins.requires.flagsSet": ["near_t’a_dénoncé"],
    // B · 2fdf02ad6814
    "endings.end_near_wins.condition": "Le dénouement canonique. Un proxy a existé, a été surveillé, puis remplacé, et un homme a expliqué sa victoire avant qu’il y ait eu un mort. Chaque étape était une décision.",
    // A · 2aafc570cbeb
    "endings.end_near_wins.epilogue": "Tout s’effondre dans un entrepôt en une grosse minute, devant les collègues de son père, et le pire n’est pas la défaite. C’est que tout est clair : chaque personne dans ce bâtiment voit exactement ce qu’il a fait, pourquoi, et le pourquoi est embarrassant.",
    // B · 24401399f43f
    "endings.end_mikami_obeys.name": "Mikami obéit",
    // B · f8b8333fe7bc
    "endings.end_mikami_obeys.rarity": "RARE",
    // B · ab74cb09fe7e
    "endings.end_mikami_obeys.requires.flagsSet": ["mikami_lié","boîte_jaune_gagnée"],
    // B · 9b2f2050ecfa
    "endings.end_mikami_obeys.condition": "§58, répondu. On lui a dit clairement et il n’a pas touché le vrai carnet, donc rien n’a été substitué et la victoire canonique ne tient pas.",
    // A · 9642982159d2
    "endings.end_mikami_obeys.epilogue": "Near est dans un entrepôt, un carnet qui ne marche pas à la main, parce qu’il s’est montré très malin à choisir le mauvais objet. Il l’accepte tout de suite et sans drame, ce qui le différencie de tous les autres dans cette histoire, et il n’a pas droit à une autre tentative.",
    // B · 344b1c7e8c94
    "endings.end_mikami_obeys.hint": "Dis-lui précisément. Fais-le répéter.",
    // B · 9f1f57ccac98
    "endings.end_i_waited.name": "J’ai attendu",
    // B · f8b8333fe7bc
    "endings.end_i_waited.rarity": "RARE",
    // B · f8f6a4878c2a
    "endings.end_i_waited.requires.flagsSet": ["attendu_en_silence","attrapé_l’échange"],
    // B · 08f4d85fb5eb
    "endings.end_i_waited.condition": "Il n’a rien dit pendant quarante secondes, n’a vu personne mourir, a compris tout de suite ce que ça voulait dire, et s’est enfui. L’action la plus difficile dans ce monde.",
    // A · 960489ca9292
    "endings.end_i_waited.epilogue": "Personne dans le bâtiment ne pourra prouver qu’il était là pour une autre raison que celle qu’il a donnée. Il sort, et il n’est plus jamais tout à fait la personne qui aurait pu l’expliquer, et il est vivant. Il n’y a aucune victoire dans la scène. Il tremble dans un parking.",
    // B · 598ebb48f141
    "endings.end_i_waited.hint": "Ne dis rien tant que quelqu’un n’est pas vraiment mort.",
    // B · cce730c4af00
    "endings.end_yellow_box_victory.name": "Victoire de la boîte jaune",
    // B · f7fc172f729a
    "endings.end_yellow_box_victory.rarity": "UNIQUE",
    // B · fa2a047f7369
    "endings.end_yellow_box_victory.requires.flagsSet": ["boîte_jaune_gagnée","annoncé_trop_tôt"],
    // B · d295f31afbab
    "endings.end_yellow_box_victory.condition": "Il l’a expliqué, et il avait raison. Ça demande que le plan n’ait aucun point faible exploitable, donc que le joueur ait construit un plan sans faille.",
    // A · e8cc6faabd5b
    "endings.end_yellow_box_victory.epilogue": "Il obtient ce qu’il voulait, ce qui n’a jamais été la survie — c’était être compris tout en gagnant. Tous les gens dans l’entrepôt comprennent exactement ce qu’il a fait. Plusieurs d’entre eux sont des collègues de son père. Il doit vivre avec le fait d’avoir été vu, et ça s’avère être ce qu’il voulait le moins une fois qu’il l’a eu.",
    // B · a3f6aaab99d9
    "endings.end_ryuk.name": "Ryuk",
    // B · c9d08ae5d876
    "endings.end_ryuk.rarity": "FRÉQUENT",
    // B · 3bb5991e0da5
    "endings.end_ryuk.requires.flagsSet": ["near_t’a_dénoncé","rencontré_ryuk"],
    // B · 472a04e80723
    "endings.end_ryuk.condition": "C’est fini, et le Shinigami fait ce qu’il a dit le premier jour, exactement sur le ton où il l’a dit.",
    // A · 115cac6528a3
    "endings.end_ryuk.epilogue": "Il n’est ni en colère, ni clément. Il a dit au début que quand Light aurait fini, il écrirait son nom, et Light l’a entendu comme une saveur. Ça prend quatre secondes, et Ryuk regrette un peu que le spectacle se termine. Il part chercher une pomme.",
    // B · 964a3eccaa09
    "endings.end_family.name": "Famille",
    // B · f8b8333fe7bc
    "endings.end_family.rarity": "RARE",
    // B · c878c324dcc6
    "endings.end_family.requires.flagsSet": ["carnet_détruit"],
    // B · 71bf4d9c8c65
    "endings.end_family.condition": "Il s’arrête, à temps, à cause des quatre personnes dans cette maison. La condition est une relation, pas des drapeaux : cette fin est réservée aux joueurs qui ont passé leurs soirées là.",
    // A · 4b81a9664636
    "endings.end_family.epilogue": "Personne dans la maison ne saura jamais qu’il y avait quoi que ce soit à arrêter. Sa mère lui dit qu’elle est fière de lui à sa remise de diplôme, et c’est simple. Sa sœur lui demande de l’aide pour quelque chose, il accepte, et c’est un mardi. C’est la plus petite fin dans ce monde, et rien d’autre n’en vaut plus la peine.",
    // B · ace4a99df06b
    "endings.end_family.hint": "Descends.",
    // A · 93fcc8055398
    "archetypes.arch_the_world_is_rotting.name": "Tu lis les journaux",
    // B · bf698cf62ddb
    "archetypes.arch_the_world_is_rotting.role": "Conviction et jugement",
    // A · 8cb21524235e
    "archetypes.arch_the_world_is_rotting.summary": "Tu as commencé à suivre des affaires criminelles à treize ans, et tu as une liste privée et permanente de personnes que la justice a condamnées à tort. Tu n’as jamais dit à personne qu’elle existait.",
    // A · 6f58b1407445
    "archetypes.arch_the_world_is_rotting.playstyle": ["Décisif","Conviction morale","Agit tôt"],
    // A · b8495ae8eef3
    "archetypes.arch_the_world_is_rotting.blurb": "Ça a commencé comme un intérêt pour le travail de ton père et c’est devenu autre chose. Tu connais les statistiques des condamnations. Tu connais les noms. Quand le carnet se révèle efficace, tu n’auras pas besoin d’une semaine pour décider à quoi il sert, et ça comptera beaucoup.",
    // B · 92be4330b559
    "archetypes.arch_the_world_is_rotting.startingAbilities": ["ab_perform"],
    // A · 31b0dfef8453
    "archetypes.arch_the_game.name": "Tu voulais un jeu",
    // B · e2fe0de68991
    "archetypes.arch_the_game.role": "Analyse et patience",
    // A · 70603b328a3f
    "archetypes.arch_the_game.summary": "Le problème n’a jamais été le monde. Le problème, c’est que rien n’a jamais été difficile, et ça t’énerve en silence depuis que tu as neuf ans.",
    // A · 3783c3eaa64e
    "archetypes.arch_the_game.playstyle": ["Analytique","Sait attendre","Joue l’adversaire"],
    // A · 1b5b65f7faa5
    "archetypes.arch_the_game.blurb": "Tu as battu tous les adultes à tous les jeux auxquels tu as joué. Ça ne t’a jamais plu. Ce que tu veux, c’est qu’on te pousse à fond, et dans environ un mois, tu vas avoir exactement ça — et ce désir va devenir un problème.",
    // B · ac774d2d9349
    "archetypes.arch_the_game.startingAbilities": ["ab_deduce"],
    // A · 29d410c60073
    "archetypes.arch_the_performance.name": "Tu as appris ton rôle",
    // B · 63b998c3e8ad
    "archetypes.arch_the_performance.role": "Contrôle social",
    // A · 355b7611494e
    "archetypes.arch_the_performance.summary": "Tu as compris, vers onze ans, ce que tout le monde attendait de Light Yagami, et tu le joues si bien que tu as parfois du mal à distinguer la différence.",
    // A · dafc41bcd246
    "archetypes.arch_the_performance.playstyle": ["Expert en relations sociales","Difficile à cerner","Gère les gens"],
    // A · 70e54a08105f
    "archetypes.arch_the_performance.blurb": "Profs, voisins, les amis de ta sœur, les collègues de ton père — chacun a sa version de toi, et ils ont tous raison. Ce n’est pas tout à fait un mensonge. C’est juste que tu n’as jamais été vraiment là dans une pièce.",
    // B · 92be4330b559
    "archetypes.arch_the_performance.startingAbilities": ["ab_perform"],
    // A · 59f123bdb19e
    "archetypes.arch_the_son.name": "Tu as regardé ton père",
    // B · 3e31266b32cc
    "archetypes.arch_the_son.role": "Procédure et patience",
    // A · 4fbcc5c3364a
    "archetypes.arch_the_son.summary": "Depuis dix-sept ans, tu es assis en face d’un homme incapable de parler de sa journée, et tu sais comment les enquêtes fonctionnent mieux que tous ceux de ton âge dans le pays.",
    // A · d94558307512
    "archetypes.arch_the_son.playstyle": ["Procédurier","Prudent","Réfléchit aux preuves"],
    // A · 936dcc720831
    "archetypes.arch_the_son.blurb": "Il ne t’a jamais rien dit. Tu as deviné en remarquant les nuits où il rentrait tard, les questions qui le faisaient se taire, et une mallette dans le hall que tu n’as jamais ouverte. Tu sais exactement comment on monte un dossier, donc tu sais exactement ce qui laisse une trace.",
    // B · 990ebd66b7e1
    "archetypes.arch_the_son.startingAbilities": ["ab_wait"],
    // B · f494a29ad8e1
    "setupFields.archetype.label": "Tu t’ennuies depuis quatre ans. Qu’est-ce que tu en as fait ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 936f5947d738
    "setupFields.archetype.helpText": "Ce en quoi l’ennui s’est transformé, qui détermine ce dans quoi tu es bon. C’est fixé pour toute l’histoire. Ça ne décide pas si tu gardes le carnet, comment tu réponds à la diffusion, ce que Misa représente pour toi, ni si tu parles en premier à la fin.",
    // B · aa9e1f16ce6a
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que les gens comprennent mal à ton sujet ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXT",
    // B · d31c7956974f
    "setupFields.worldKnowsAboutYou.helpText": "L’écart entre le Light Yagami que tout le monde s’est fait et celui qui est vraiment là. Une phrase simple.",
    // B · cbbbde595f9d
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Tout le monde pense que je suis modeste. Je ne suis pas modeste, je suis lassé qu’on me félicite pour des choses faciles.",
    // B · 01ed4f569142
    "setupFields.first_instinct.label": "Si ça marche, à quoi penses-tu en premier ?",
    // B · b6a31c665c0b
    "setupFields.first_instinct.kind": "CHOICE",
    // B · 7c513551154a
    "setupFields.first_instinct.helpText": "Une première idée, pas un engagement. Tu peux faire exactement le contraire dans l’heure, et le monde suivra.",
    // B · 10d580787dde
    "setupFields.first_instinct.options.the_list.label": "Les noms que tu connais déjà, que tu as depuis des années",
    // B · f6cd4aad8af5
    "setupFields.first_instinct.options.the_rules.label": "Ce que ça fait vraiment, que personne n’a vraiment écrit",
    // B · b3b0df51a10e
    "setupFields.first_instinct.options.who_is_watching.label": "Qui pourrait le savoir, et comment",
    // B · f562e8b30d8e
    "setupFields.first_instinct.options.your_father.label": "Que c’est ton père qui devra te coincer",
    // B · db75054f07b5
    "setupFields.first_instinct.options.nothing.label": "Que tu devrais le poser et t’éloigner, et y penser plus tard",
    // B · b76a08a03e62
    "protagonist.kind": "NAMED",
    // B · c28d757c7c00
    "protagonist.name": "Light Yagami",
    // B · fcca6b746d0b
    "protagonist.pronouns": "il/lui",
    // B · f774a0704350
    "protagonist.description": "Dix-sept ans. Mince, cheveux châtain clair en couches, blazer d’école beige et cravate rouge, et l’aisance tranquille de quelqu’un qui n’a jamais été la deuxième personne la plus intelligente d’une pièce.",
    // B · 91fd78578292
    "protagonist.setupHeading": "Quel genre de Light es-tu ?",
    // B · bace4c439721
    "protagonist.portrait": "story_light/protagonist",
    // B · efddc92a3045
    "coverDirection": "SUJET : Light Yagami, au centre, comme visuel clé d’un thriller psychologique en anime. Au premier plan, Light occupe les deux tiers inférieurs, centré, de la cuisse à la tête, avec environ la moitié du poids visuel. Dix-sept à dix-huit ans, mince et beau, cheveux châtain clair en couches tombant sur le front, yeux marron, blazer beige d’école sur chemise blanche avec cravate rouge. Son expression est calme et maîtrisée avec une légère confiance dangereuse — ni un sourire en coin, ni de la colère, et absolument pas des yeux rouges. Il tient un carnet noir simple, bas à son côté, de façon décontractée, sans le montrer ni poser avec. DERRIÈRE LUI dans une ombre profonde, une silhouette immense, incroyablement grande et mince : peau gris-bleu couleur cadavre, cheveux noirs en pics, énormes yeux ronds jaunes avec iris rouges, dents pointues, silhouette gothique à plumes noires. Elle doit paraître plusieurs fois plus grande que lui et être seulement partiellement visible dans l’obscurité. DE L’AUTRE CÔTÉ, dans une fenêtre ou un reflet pâle plutôt que dans la scène : un jeune homme mince aux cheveux noirs en bataille jusqu’au cou, yeux énormes et ombragés, chemise blanche trop grande, accroupi. ARRIÈRE-PLAN : une ville japonaise sous la pluie la nuit, lumières des tours, lueur d’une télévision en bas. PALETTE : rouge et bleu-noir retenus, lumière froide de la pluie sur le visage de Light et une note chaude de télévision en bas. Pas de spectacle néon — c’est une image psychologique, pas cyberpunk. Composition cinématographique élégante. Les personnages remplissent le cadre. Light est la seule figure nette.",
    // A · ac1b8d88ddc0
    "opening": "Le prof est toujours sur le problème. Toi, tu l’as fini il y a onze minutes et tu regardes par la fenêtre depuis.\n\nIl fait gris dehors, comme quand il va pleuvoir dans une heure. Derrière toi, quelqu’un va te demander tes notes en partant, tu vas dire oui, et cette personne va te dire que tu sauves la vie.\n\nPuis quelque chose tombe devant la fenêtre.\n\nÇa atterrit dans l’herbe, près du local d’athlétisme, et ça reste là, ouvert, face contre terre. Un carnet. Noir.\n\nTu cherches qui l’a fait tomber. Il n’y a pas d’étage au-dessus et personne sur le toit.\n\nC’est les vingt dernières minutes de la dernière heure un mercredi. Les mots sur la couverture sont en anglais, et tu peux les lire d’ici.",
    // A · ac8e6f16e652
    "openingSuggestions": ["J’attends que la cour se vide, puis je descends le chercher. « Death Note. » Celui qui a fait ça est allé jusqu’au bout, faut le respecter.","Je le regarde une fois et continue mon chemin. Si quelqu’un veut récupérer son carnet ridicule, qu’il se mouille un peu.","Je me baisse à côté, j’ouvre la couverture sans le toucher, parce que je veux voir à quel point c’est foutrement bien foutu avant de toucher quoi que ce soit."],
  },
});
