import { registerWorldText } from '@plotbreak/contracts';

/**
 * Ace, in French.
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
  storyId: "story_ace",
  text: {
    // A · e4f925989ca3
    "fantasyLabel": "Tu es né déjà condamné.",
    // A · af203a98112f
    "hook": "Tu es né sous le nom du Roi des Pirates, et c’est toi qui décides si c’est une malédiction, un défi, ou rien du tout.",
    // A · 9c0db085121a
    "premise": "Tu as dix ans. Tu vis sur une montagne avec des bandits parce qu’un héros des Marines n’a pas trouvé d’endroit plus sûr pour te mettre, et tu es très fort pour faire mal à ceux qui le méritent.\n\nQuelque part dans le monde, il y a un registre qui dit qui était ton père. Ceux qui ont entendu la rumeur disent que son enfant aurait dû être noyé à la naissance. Tu as compris il y a des années que c’est de toi dont ils parlent, et tu n’as jamais demandé à personne de le confirmer, parce que demander, c’est confirmer.\n\nTu as un ami maintenant. Sabo est la première personne à avoir choisi ce qu’il voulait être au lieu de l’accepter, et entre vous il y a une boîte d’argent enterrée sous la cabane dans l’arbre qui va acheter un navire.\n\nEt tu as un problème. Un gamin de sept ans avec un chapeau de paille te suit depuis onze jours. Il ne sait pas se battre, il ne ment pas, il ne comprend pas les allusions, et il ne lâchera pas l’affaire. À un moment, tu vas devoir décider ce qu’il représente pour toi.\n\nTout le célèbre est encore devant toi, et tu ne dois rien à personne.\n\nTu n’as qu’à décider si c’était bien que tu sois né, et tu n’y arriveras pas en y pensant.",
    // A · 656d55184b80
    "mechanicsChips": ["Sabo n’a pas à mourir","Tu peux refuser le fruit","La fierté est ce qui te tue","Rien de célèbre n’est prévu","Tu peux être convaincu de changer d’avis"],
    // A · 9097f9b2c9ce
    "creatorNote": "La version célèbre de cette vie finit sur une plate-forme avec un amiral qui prononce le mauvais nom au bon moment. Cette version n’est pas obligée. Garde Sabo en vie, pars de chez toi avec tes frères au lieu d’être devant eux, donne le fruit à quelqu’un d’autre, laisse Barbe Blanche te convaincre d’arrêter la chasse, ou écoute Akainu et continue ta route. Chacun de ces choix est une vraie destination. Le plus dur est le dernier, et il est difficile pour des raisons qui n’ont rien à voir avec la difficulté.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC EN AVANT",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 10c23e68f4dc
    "rules.hardCanon": ["Le joueur incarne Portgas D. Ace, dix ans au début de l’histoire, élevé sur l’île de l’Aube par la bandite de la montagne Curly Dadan à l’insistance de Monkey D. Garp.","Gol D. Roger est son père biologique et Portgas D. Rouge sa mère. Rouge l’a porté vingt mois pour le cacher au Gouvernement Mondial et est morte après sa naissance. Ace connaît la rumeur sur l’enfant de Roger et ne l’a jamais fait confirmer.","Ace ne commence pas l’histoire en connaissant les détails sur Rouge. Ce qu’il apprend d’elle vient de Garp, des archives, ou de quelqu’un qui y était — jamais du narrateur qui déciderait qu’il s’en souvient.","Sabo est vivant, à peu près du même âge qu’Ace, noble de naissance et en fuite de cela, et c’est la première personne qu’Ace a rencontrée qui a choisi sa propre identité plutôt que celle héritée. Rien n’est fixé sur sa mort en mer.","Luffy a sept ans, porte le chapeau de paille, ne se décourage pas, et idolâtre Ace en quelques jours. Le fait qu’il devienne le frère d’Ace se décide en jeu.","Garp porte une promesse faite à Roger et veut qu’Ace vive loin de l’héritage de Roger. Il est sincère à ce sujet et très mauvais pour le dire.","Marshall D. Teach navigue sous Whitebeard, est patient, et attendra des années la bonne occasion. Sa trahison est une chose qu’il ferait si l’occasion se présente, pas un événement programmé.","Edward Newgate est énorme — plus de six mètres — et Ace doit paraître petit à côté. Il croit qu’une famille est quelque chose qu’on choisit et qu’on refuse d’abandonner, ce qui répond directement à la question qu’Ace porte depuis ses huit ans.","La fierté d’Ace est le moteur de la fin célèbre. Il est excellent pour mourir pour les autres et mauvais pour laisser les autres mourir pour lui, et aucune scène ne doit trancher cela pour lui.","Rien en aval de l’île de l’Aube n’est dû. Ni les coupes de saké, ni la mort de Sabo, ni la piraterie, ni le Mera Mera no Mi, ni Whitebeard, ni Banaro, ni la plateforme. Si le joueur empêche un de ces événements, rien d’équivalent n’est inventé pour le remplacer."],
    // A · d08b83a8f2af
    "rules.toneGuide": "Aventure d’anime pleine d’énergie, et pas du tout dans le style d’Itachi. Pas de crépuscule, pas de symbolisme, pas d’intériorité littéraire tranquille comme mode par défaut. Écris le mouvement, la mer, la chaleur, la faim, les cris, le rire, et des corps qui font des trucs absurdes. Ce monde doit contenir un homme qui s’endort face contre son bol et un homme qui se demande si c’était bien qu’il soit né, dans la même heure, sans s’excuser pour aucun des deux. Si une scène devient solennelle pendant trois temps, il faut que ça pète fort. Ace est fier, il s’emporte vite quand on insulte sa famille, il est bizarrement poli avec les inconnus, et drôle. Ce n’est pas le gars cool du feu. Luffy n’est pas un génie — son intelligence, c’est la certitude émotionnelle et l’instinct du combat, et il est un mauvais menteur. Dadan râle fort puis fonce dans le danger. Les scènes émotionnelles peuvent ralentir jusqu’à prendre leur temps, et les bonnes sont courtes. Les combats sont lisibles : la distorsion de la chaleur, ce que le feu ne fait pas, où est la mer, qui est entre qui. Ne raconte jamais un combat de cinq jours tour par tour — ce qui compte c’est l’échange clé, l’épuisement, le respect. Ne reproduis pas le dialogue du manga. Les phrases célèbres sont célèbres ; écris ce qu’elles veulent dire dans les mots propres à ce monde.",
    // B · 2f9543133582
    "skills.pipe.name": "Tuyau",
    // B · 7ce3b6387340
    "skills.pipe.attribute": "agilité",
    // B · 507094aeab99
    "skills.pipe.description": "Un bout de tuyau en plomb balancé par quelqu’un qui n’a jamais eu de leçon et a eu quatre cents combats.",
    // B · 608b291bb03f
    "skills.brawl.name": "Bagarre",
    // B · 97081b4b4792
    "skills.brawl.attribute": "force",
    // B · c207fe0db547
    "skills.brawl.description": "Au corps à corps, brutal et engagé. Pas de garde, pas de forme, et une tolérance inhabituelle à se faire frapper en avançant.",
    // B · b3f73706ed78
    "skills.endure.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.endure.attribute": "volonté",
    // B · 61f5a1962698
    "skills.endure.description": "Toujours debout après le moment où rester debout a cessé d’être raisonnable. C’est ce qu’il fait de mieux, à dix ans comme à vingt.",
    // B · f9c682e7f665
    "skills.provoke.name": "Provocation",
    // B · cfb7a15645c3
    "skills.provoke.attribute": "présence",
    // B · 9badec0cd3cc
    "skills.provoke.description": "Faire en sorte que quelqu’un de plus fort que toi frappe le premier. Utile, et le début de tous les vrais problèmes qu’il aura un jour.",
    // B · d57e32127c02
    "skills.forage.name": "Vie Sauvage",
    // B · a8c1fa8269c3
    "skills.forage.attribute": "esprit",
    // B · 7f0890fca760
    "skills.forage.description": "Chasser en montagne, lire la météo sur une crête, et cuisiner quelque chose qui était vivant il y a peu.",
    // B · 177607b38d26
    "skills.seamanship.name": "Navigation",
    // B · a8c1fa8269c3
    "skills.seamanship.attribute": "esprit",
    // B · 9211ff3c2623
    "skills.seamanship.description": "Courants, compas log, gréement, et la différence entre une mer agitée et une mer qui va poser problème.",
    // B · f400330b9c9c
    "skills.command.name": "Commandement",
    // B · cfb7a15645c3
    "skills.command.attribute": "présence",
    // B · 863d7bacb13c
    "skills.command.description": "Faire suivre les gens quelque part de stupide, et — bien plus dur, bien plus tard — les faire rester derrière.",
    // B · 30b9028d32de
    "skills.fire.name": "Feu",
    // B · 5dbc8bb102ac
    "skills.fire.attribute": "arcane",
    // B · 8932094c660e
    "skills.fire.description": "Contrôle Logia : quoi brûler, en quoi se transformer, et comment ne pas cuire les gens autour. Inutile tant qu’il n’a pas de fruit.",
    // B · 27eb4c7946a5
    "skills.haki.name": "Haki",
    // B · 5dbc8bb102ac
    "skills.haki.attribute": "arcane",
    // B · db041c13f31d
    "skills.haki.description": "Volonté rendue physique. Personne sur l’île de l’Aube ne peut l’enseigner et personne là-bas n’admet qu’il existe.",
    // B · 954f5d3b66b7
    "resources.fuel.name": "Énergie",
    // B · 34e8ec1ac388
    "resources.fuel.polarity": "BON_HAUTE",
    // B · c1e334f7bdd7
    "resources.fuel.zeroStateConsequence": "Il dort. Pas en repos — endormi, en plein milieu d’une phrase, quelque part où ça ne convient pas, et celui qui est avec lui doit décider s’il le porte ou laisse la situation se dérouler autour. Sur cette île c’est une blague. Sur un champ de bataille ce ne l’est pas.",
    // B · dbdf72b8846c
    "resources.fuel.color": "#E8873A",
    // B · 0e2d0e1dbc06
    "resources.notoriety.name": "Notoriété",
    // B · a34adbda2422
    "resources.notoriety.polarity": "BON_BAS",
    // B · d8a7ce50d5b4
    "resources.notoriety.zeroStateConsequence": "Personne hors de cette île ne sait qu’il existe, ce qui à dix ans est simplement la vérité et plus tard un exploit. Pas de prime, pas d’affiche, pas de Marine avec une raison de regarder deux fois. Quoi qu’il devienne, il le devient sans être vu.",
    // B · 15636798f99e
    "resources.notoriety.color": "#9A3C34",
    // B · dbd17a4e848b
    "resources.pride.name": "Fierté",
    // B · a34adbda2422
    "resources.pride.polarity": "BON_BAS",
    // B · 30c80b29fd80
    "resources.pride.zeroStateConsequence": "Quelque chose s’est éteint en lui. Il laisse passer les choses, accepte de l’aide sans discuter, s’éloigne des insultes, et ceux qui l’aiment trouvent ça plus effrayant que sa colère ne l’a jamais été. Dadan le dit tout haut. Luffy demande s’il est malade.",
    // B · 8674546b870d
    "resources.pride.color": "#C7472E",
    // B · 1df20689c86a
    "resources.worth.name": "Valeur",
    // B · 34e8ec1ac388
    "resources.worth.polarity": "BON_FORT",
    // B · b2bf2031ed5b
    "resources.worth.zeroStateConsequence": "Il a conclu que ce n’était pas une bonne chose qu’il soit né, et il en est calme. Ce calme est l’état le plus dangereux de cette histoire : il arrête de se défendre sans que personne ne le remarque, prend le pire boulot, se tient au mauvais endroit, et rien de tout ça ne ressemble à du désespoir vu de l’extérieur.",
    // B · 1f2dadb0d03a
    "resources.worth.color": "#D7B45C",
    // A · 83cf6bd538dc
    "items.lead_pipe.name": "Le Tuyau",
    // B · 2237e0aad250
    "items.lead_pipe.tags": ["arme","enfance"],
    // B · 110688b7cca2
    "items.lead_pipe.equipSlot": "main",
    // B · eea96276bad0
    "items.lead_pipe.rarity": "commun",
    // B · d45c74bf9951
    "items.lead_pipe.description": "Un mètre de tuyau en plomb récupéré, légèrement tordu à un tiers de sa longueur par un coup qu’il a reçu.",
    // B · de9087e8cf0a
    "items.lead_pipe.loreText": "Tous les enfants de cette île qui veulent survivre en ont un. Sabo en a un. Luffy en aura un dans la semaine qui suit son arrivée. Il n’a rien de spécial, c’est pour ça que c’est l’arme qu’il préfère encore tenir à vingt ans.",
    // A · 2335100320f2
    "items.ship_fund.name": "La Boîte",
    // B · b09613d5fc63
    "items.ship_fund.tags": ["quête","enfance"],
    // B · 0739a90af282
    "items.ship_fund.description": "Une boîte à biscuits enterrée, contenant cinq millions de berries en billets comptés plus souvent qu’ajoutés.",
    // B · 56655b56cfde
    "items.ship_fund.loreText": "Le plan, c’est un bateau. Pas un bateau précis, un bateau. Sabo a fait les comptes et aucun des deux n’a remis le chiffre en question depuis, parce que le remettre en question voudrait dire qu’aucun des deux ne sait. C’est la première chose dans la vie d’Ace qui appartient à plus d’une personne, et si jamais Luffy apprend où c’est enterré, ça voudra dire quelque chose que personne ne pourrait dire.",
    // A · 3a7340081e75
    "items.sake_cups.name": "Les Trois Coupes",
    // B · 52e99f839161
    "items.sake_cups.tags": ["quête","fraternité"],
    // B · ad8a1eccd9b6
    "items.sake_cups.rarity": "rare",
    // B · 923bae55f744
    "items.sake_cups.description": "Trois tasses ébréchées de l’étagère de Dadan, et une bouteille prise sans demander.",
    // B · ca0809b40212
    "items.sake_cups.loreText": "La version célèbre existe parce que trois garçons ont décidé qu’elle devait exister, dans une cabane dans un arbre, sans adulte. Ça n’arrive que si les trois l’ont mérité — une cérémonie attendue ne vaut rien — et une partie qui ne l’atteint pas n’a rien raté. C’est une autre famille.",
    // A · 77110499ad90
    "items.mera_mera.name": "Le Mera Mera no Mi",
    // B · ca6faa732ff8
    "items.mera_mera.tags": ["quête","fruit_du_démon"],
    // B · b3d251b141db
    "items.mera_mera.rarity": "unique",
    // B · 1f9dec53a2a0
    "items.mera_mera.description": "Un fruit orange en spirale avec des volutes en forme de flammes, posé dans une caisse qui a passé plus de temps en mer qu’elle n’aurait dû.",
    // B · 6a5933133ebc
    "items.mera_mera.loreText": "Le manger, c’est devenir feu et ne plus jamais pouvoir nager. Le donner à Deuce, c’est lui qui est feu, et ton équipage est construit autour de quelqu’un d’autre. Le vendre, c’est acheter un bateau, une réputation et un paquet d’ennemis tenaces. Le laisser dans la caisse, c’est faire disparaître Fire Fist Ace, et rien ne te donnera une deuxième chance.",
    // A · 59875d2afb12
    "items.orange_hat.name": "Le Chapeau Orange",
    // B · 89bec992e76f
    "items.orange_hat.tags": ["identité","signature"],
    // B · db5ef3a0f2df
    "items.orange_hat.equipSlot": "tête",
    // B · ad8a1eccd9b6
    "items.orange_hat.rarity": "rare",
    // B · 8d220a26d36a
    "items.orange_hat.description": "Un large chapeau orange avec un ruban de perles rouges et deux badges bleus épinglés devant — un qui sourit, un qui fait la gueule.",
    // B · 8e707b885834
    "items.orange_hat.loreText": "Il l’achète lui-même, quelque part entre le départ de chez lui et le Nouveau Monde, pour des raisons qu’il aurait du mal à expliquer. Les deux visages sont la blague et aussi l’homme entier : celui qui rit de tout et celui qui a déjà décidé comment ça finit, portés en même temps, sur la même tête, visibles de tous.",
    // A · ac72869a014f
    "items.green_dagger.name": "Dague au Fourreau Vert",
    // B · b5e8d28b4848
    "items.green_dagger.tags": ["arme"],
    // B · c42857d78f9f
    "items.green_dagger.equipSlot": "ceinture",
    // B · eea96276bad0
    "items.green_dagger.rarity": "commun",
    // B · 38c53830e3ce
    "items.green_dagger.description": "Un petit couteau dans un fourreau vert, porté à la hanche et presque jamais dégainé.",
    // B · 02725bb02a03
    "items.green_dagger.loreText": "Un homme qui peut mettre le feu à l’air n’a pas besoin d’un couteau, c’est justement pour ça qu’il en garde un. C’est pour la corde, les caisses, le poisson et la situation précise où le feu tuerait tout le monde dans la pièce, y compris la personne qu’il est venu chercher.",
    // A · 5fc4c6288848
    "items.vivre_card.name": "Carte Vivre",
    // B · c3468007c51d
    "items.vivre_card.tags": ["quête","lien"],
    // B · ad8a1eccd9b6
    "items.vivre_card.rarity": "rare",
    // B · 576241feea29
    "items.vivre_card.description": "Un bout de papier qui penche vers la personne qui l’a donné, et qui brûle en même temps qu’elle.",
    // B · 162683b3c27b
    "items.vivre_card.loreText": "En donner un à quelqu’un, c’est la façon la moins sentimentale de dire qu’on a l’intention de le revoir. C’est aussi un indicateur de statut sur une vie qui compte, ce qui est un objet plus cruel qu’il n’en a l’air : la personne qui tient le tien découvre que tu es en danger avant que tu ne sois vraiment dedans.",
    // A · 0511c8d9b9e0
    "items.deuce_log.name": "Le Journal de Deuce",
    // B · 1f4597806f24
    "items.deuce_log.tags": ["quête","journal"],
    // B · af5aaf8f4e56
    "items.deuce_log.rarity": "peu_commun",
    // B · 51de7f20b6b6
    "items.deuce_log.description": "Un carnet à couverture rigide, écrit dans une écriture petite et très lisible, avec des dates.",
    // B · 1a89cabed8e2
    "items.deuce_log.loreText": "Deuce note ce qui s’est vraiment passé, ce qui est le service le plus rare que quelqu’un lui rende. Tous les autres qui tiennent un journal construisent une légende ou un dossier. Il connaissait Ace avant qu’il y ait une légende, et ce livre est la seule copie survivante de cet homme.",
    // A · 8f78ee9f1bac
    "items.whitebeard_mark.name": "La Marque",
    // B · 44fef77fb6f7
    "items.whitebeard_mark.tags": ["identité","faction"],
    // B · b3d251b141db
    "items.whitebeard_mark.rarity": "unique",
    // B · a889188a8e18
    "items.whitebeard_mark.description": "Le drapeau de Barbe Blanche, sur tout son dos, fait d’une seule traite par quelqu’un qui l’a fait deux cents fois.",
    // B · 87a1bcddaf5a
    "items.whitebeard_mark.loreText": "Tu ne gagnes pas ça et on ne te le donne pas. Tu l’acceptes, ce qui est le verbe le plus dur, et ça va quelque part que tu ne peux pas voir ni cacher. La position entière de Newgate, c’est que la famille se choisit et ne s’abandonne pas ; la marque est cette phrase rendue permanente sur un garçon qui a passé dix ans à croire qu’il était une erreur.",
    // A · 70ccc092da8f
    "items.roger_record.name": "Le Registre",
    // B · 62b6533be5e1
    "items.roger_record.tags": ["quête","secret"],
    // B · b3d251b141db
    "items.roger_record.rarity": "unique",
    // B · 065019d611a2
    "items.roger_record.description": "Un dossier Marine, lourdement censuré, avec une naissance en South Blue et deux noms dessus.",
    // B · 57eb6cb61152
    "items.roger_record.loreText": "La confirmation qu’il n’a jamais demandé de toute sa vie, parce que demander aurait été confirmer. Vingt mois sont écrits ici, de la main officielle de quelqu’un, comme une anomalie médicale. Il ne saura pas quoi faire de ces vingt mois.",
    // A · 946581ec45d8
    "items.seastone_cuffs.name": "Poignets en Pierre-Marine",
    // B · a4d43e93dc61
    "items.seastone_cuffs.tags": ["quête","entrave"],
    // B · b3d251b141db
    "items.seastone_cuffs.rarity": "unique",
    // B · 5bcc394dc945
    "items.seastone_cuffs.description": "Des menottes pâles qui pèsent plus qu’elles ne devraient et font sentir la mer plus proche qu’elle ne l’est.",
    // B · 880f6792e192
    "items.seastone_cuffs.loreText": "Ça ne supprime pas le fruit, ça rappelle juste au corps que la mer existe et est sous tout. Un Logia en menottes de pierre de mer, c’est un homme ordinaire fatigué avec un nom célèbre, précisément l’image que le Gouvernement Mondial veut montrer.",
    // A · dbfd4b5c073b
    "abilities.ab_pipe_rush.name": "Foncer Droit",
    // B · 94020b1d1c63
    "abilities.ab_pipe_rush.tags": ["corps à corps","enfance"],
    // B · 21489e3c3811
    "abilities.ab_pipe_rush.description": "Rapproche-toi plus vite que raisonnable et frappe la plus grosse cible disponible en premier. Ça marche bien plus souvent que ça devrait, surtout parce que personne ne s’attend à ce qu’un enfant s’engage.",
    // B · 39d896e20aec
    "abilities.ab_pipe_rush.targetRule": "SINGLE",
    // A · 9949a00c530d
    "abilities.ab_take_it.name": "Prends Ça",
    // B · af4b2b364e73
    "abilities.ab_take_it.tags": ["défense","enfance"],
    // B · c25971fed417
    "abilities.ab_take_it.description": "Laisse le coup passer, garde les pieds, et reste debout avec une expression qui fait reconsidérer toute la journée à l’autre.",
    // B · 43afef8b429c
    "abilities.ab_take_it.targetRule": "SELF",
    // A · 7e04acf889b9
    "abilities.ab_swing_first.name": "Redis Ça",
    // B · 17cafe296301
    "abilities.ab_swing_first.tags": ["social","fierté"],
    // B · 457613ae2547
    "abilities.ab_swing_first.description": "Faire en sorte que quelqu’un de plus grand, plus vieux et mieux armé donne le premier coup, devant témoins, à cause de quelque chose qu’il a dit. Ultra efficace et à l’origine de tous les vrais problèmes de cette vie.",
    // B · 39d896e20aec
    "abilities.ab_swing_first.targetRule": "SINGLE",
    // A · 083f820a929d
    "abilities.ab_fire_fist.name": "Poing de Feu",
    // B · f90953c3254a
    "abilities.ab_fire_fist.tags": ["feu","signature"],
    // B · 264d50ac5a46
    "abilities.ab_fire_fist.description": "Un coup de poing qui arrive comme une colonne de flammes et continue. La chose dont son nom est fait, jamais utilisée à l’intérieur sans conséquences.",
    // B · 503eb62e7676
    "abilities.ab_fire_fist.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_fire_fist.requires.flagsSet": ["ate_mera_mera"],
    // A · 0ef1bf85da40
    "abilities.ab_logia.name": "Rien à Frapper",
    // B · b8b12673011f
    "abilities.ab_logia.tags": ["feu","défense"],
    // B · e9b01d55146f
    "abilities.ab_logia.description": "Deviens le feu. Les lames et les balles traversent un homme qui n’est plus solide, ce qui est imparable jusqu’à ce que quelqu’un apporte la mer, un utilisateur de Haki, ou un otage.",
    // B · 43afef8b429c
    "abilities.ab_logia.targetRule": "SELF",
    // B · 511cdc51debb
    "abilities.ab_logia.requires.flagsSet": ["ate_mera_mera"],
    // A · 56e42b7b0793
    "abilities.ab_banked_fire.name": "Mettre de Côté",
    // B · b9781426fced
    "abilities.ab_banked_fire.tags": ["feu","contrôle"],
    // B · 26348c3a0734
    "abilities.ab_banked_fire.description": "Maintiens le feu à un niveau qui chauffe une pièce, sèche une équipe, éclaire un pont, et ne tue personne à côté. Bien plus dur que la colonne, c’est pour ça qu’on le laisse sur un bateau en bois.",
    // B · 503eb62e7676
    "abilities.ab_banked_fire.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_banked_fire.requires.flagsSet": ["ate_mera_mera"],
    // A · 48992b5fb783
    "abilities.ab_entei.name": "Tout à la Fois",
    // B · 7bd2ee232b3c
    "abilities.ab_entei.tags": ["feu","désespoir"],
    // B · 20fead4f2fc4
    "abilities.ab_entei.description": "Tout, vers le haut, sans rien retenir ni rien garder. Ça règle la question de qui est plus fort et le laisse incapable de tenir debout.",
    // B · 503eb62e7676
    "abilities.ab_entei.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_entei.requires.flagsSet": ["ate_mera_mera"],
    // A · 996f2802fdf3
    "abilities.ab_haki_armament.name": "Volonté dans les Mains",
    // B · e82938029171
    "abilities.ab_haki_armament.tags": ["haki"],
    // B · 98df7e5cfd7f
    "abilities.ab_haki_armament.description": "Fais que les poings comptent contre ceux que le feu ne peut toucher. Appris de quelqu’un qui a décidé qu’il valait la peine d’être enseigné, et c’est ça qui compte.",
    // B · 39d896e20aec
    "abilities.ab_haki_armament.targetRule": "SINGLE",
    // B · 39d7292218a4
    "abilities.ab_haki_armament.requires.flagsSet": ["appris_haki"],
    // A · 20193b95d67e
    "abilities.ab_stand_between.name": "Interposer",
    // B · 0f82f5bfaa61
    "abilities.ab_stand_between.tags": ["fierté","signature"],
    // B · 741619e56435
    "abilities.ab_stand_between.description": "Se met physiquement sur le chemin de quelque chose qui vise quelqu’un d’autre. Il est super bon à ça, et ça ne lui coûte rien de ce qu’il valorise, ce qui est précisément le problème.",
    // B · 39d896e20aec
    "abilities.ab_stand_between.targetRule": "SINGLE",
    // A · 73c75b0ac03b
    "abilities.ab_test_him.name": "Tiens la Distance",
    // B · e919bae2ad60
    "abilities.ab_test_him.tags": ["social","décision"],
    // B · f680de29bb64
    "abilities.ab_test_him.description": "Lance-lui le tuyau de rechange assez fort pour que le rattraper fasse mal, puis monte la crête à la vitesse que tu utiliserais seul.",
    // B · 39d896e20aec
    "abilities.ab_test_him.targetRule": "SINGLE",
    // A · dfbfae67fa07
    "abilities.ab_shut_him_out.name": "Va-t’en",
    // B · e919bae2ad60
    "abilities.ab_shut_him_out.tags": ["social","décision"],
    // B · fd35e37c1c74
    "abilities.ab_shut_him_out.description": "Dis-le clairement, sans adoucir, et continue d’avancer. Pas une menace — une décision, et il sera toujours là demain.",
    // B · 39d896e20aec
    "abilities.ab_shut_him_out.targetRule": "SINGLE",
    // A · abd4d3b361a3
    "abilities.ab_take_the_uniform.name": "Accepter l’Offre de Garp",
    // B · c7b0490461df
    "abilities.ab_take_the_uniform.tags": ["décision","irréversible"],
    // B · c528ba2ce1cc
    "abilities.ab_take_the_uniform.description": "Va dans l’autre direction, avec le vieil homme, dans l’organisation qui a exécuté ton père.",
    // B · c44e6dd70059
    "abilities.ab_take_the_uniform.targetRule": "NONE",
    // A · 5306f3b7355b
    "abilities.ab_stay_home.name": "Pas Monter dans le Bateau",
    // B · cc603f65bd76
    "abilities.ab_stay_home.tags": ["décision"],
    // B · ef76a8e36ba6
    "abilities.ab_stay_home.description": "Pèse la mer contre une montagne avec des gens dessus, et choisis la montagne. Pas par peur. Un choix.",
    // B · c44e6dd70059
    "abilities.ab_stay_home.targetRule": "NONE",
    // A · 83770569e8c9
    "abilities.ab_eat_the_fruit.name": "Mange-le",
    // B · c7b0490461df
    "abilities.ab_eat_the_fruit.tags": ["décision","irréversible"],
    // B · 60a67bf299a7
    "abilities.ab_eat_the_fruit.description": "Croque dedans, découvre que c’est infect, et ne nage plus jamais.",
    // B · 43afef8b429c
    "abilities.ab_eat_the_fruit.targetRule": "SELF",
    // B · b2d7f32473d4
    "abilities.ab_eat_the_fruit.requires.flagsSet": ["inspecté :mera_mera"],
    // A · b8f6bd38a463
    "abilities.ab_hand_over_the_fruit.name": "File-le",
    // B · c7b0490461df
    "abilities.ab_hand_over_the_fruit.tags": ["décision","irréversible"],
    // B · 40eef21b932c
    "abilities.ab_hand_over_the_fruit.description": "Mets-le dans les mains de quelqu’un d’autre. Ton équipe a un Logia et ce n’est pas le capitaine, ça change chaque combat que tu auras.",
    // B · 39d896e20aec
    "abilities.ab_hand_over_the_fruit.targetRule": "SINGLE",
    // B · b2d7f32473d4
    "abilities.ab_hand_over_the_fruit.requires.flagsSet": ["inspecté :mera_mera"],
    // A · 63e78c85c1bc
    "abilities.ab_sell_the_fruit.name": "Vends-le",
    // B · c7b0490461df
    "abilities.ab_sell_the_fruit.tags": ["décision","irréversible"],
    // B · 25d189fca17b
    "abilities.ab_sell_the_fruit.description": "Découvre ce qu’un fruit Logia vaut, prends l’argent, et achète quelque chose qui flotte.",
    // B · c44e6dd70059
    "abilities.ab_sell_the_fruit.targetRule": "NONE",
    // B · b2d7f32473d4
    "abilities.ab_sell_the_fruit.requires.flagsSet": ["inspecté :mera_mera"],
    // A · 22a055cbdd11
    "abilities.ab_finish_him.name": "Finis-le",
    // B · a525771017c0
    "abilities.ab_finish_him.tags": ["combat","décision"],
    // B · efc903905a16
    "abilities.ab_finish_him.description": "Arrête les échanges et finis-le, contre quelqu’un que tu combats déjà. Dispo seulement pour un homme qui en a encore un en lui.",
    // B · 39d896e20aec
    "abilities.ab_finish_him.targetRule": "SINGLE",
    // A · 64c25a849954
    "abilities.ab_take_the_mark.name": "Prends la marque",
    // B · c7b0490461df
    "abilities.ab_take_the_mark.tags": ["décision","irréversible"],
    // B · 3630c6882ce7
    "abilities.ab_take_the_mark.description": "Fais demi-tour, enlève ta chemise, et laisse quelqu’un mettre un drapeau que tu n’as pas conçu sur un dos que tu ne peux pas voir.",
    // B · 43afef8b429c
    "abilities.ab_take_the_mark.targetRule": "SELF",
    // B · 5c5156f89f9d
    "abilities.ab_take_the_mark.requires.flagsSet": ["défié_whitebeard"],
    // A · ae1a40213ba2
    "abilities.ab_refuse_the_mark.name": "Reste ton propre capitaine",
    // B · cc603f65bd76
    "abilities.ab_refuse_the_mark.tags": ["décision"],
    // B · 5838469d638a
    "abilities.ab_refuse_the_mark.description": "Refuse, sans insulter personne, et garde ton nom sur ton propre drapeau.",
    // B · c44e6dd70059
    "abilities.ab_refuse_the_mark.targetRule": "NONE",
    // B · 5c5156f89f9d
    "abilities.ab_refuse_the_mark.requires.flagsSet": ["défié_whitebeard"],
    // A · 41c99dcc9890
    "abilities.ab_go_after_him.name": "Pars seul",
    // B · c1b79b033106
    "abilities.ab_go_after_him.tags": ["décision","fierté"],
    // B · f67affb61c9d
    "abilities.ab_go_after_him.description": "Bouge avant que quelqu’un ait fini sa phrase, et ne dis à personne où.",
    // B · c44e6dd70059
    "abilities.ab_go_after_him.targetRule": "AUCUN",
    // A · 0e160f2591e6
    "abilities.ab_take_them_with_you.name": "Prends une équipe",
    // B · cc603f65bd76
    "abilities.ab_take_them_with_you.tags": ["décision"],
    // B · a4b610bf23ab
    "abilities.ab_take_them_with_you.description": "« J’y vais. Je ne pars pas seul. » Montre les commandants prêts à venir, et laisse-les venir.",
    // B · e9383e6237fe
    "abilities.ab_take_them_with_you.targetRule": "MULTI",
    // A · 1c3d5534026c
    "abilities.ab_stand_down.name": "Arrête-toi au bastingage",
    // B · 907ba36ba834
    "abilities.ab_stand_down.tags": ["décision","discipline"],
    // B · ab8b2a679695
    "abilities.ab_stand_down.description": "Arrête-toi, et laisse celui qui pose la question te donner la raison avant que la fierté ne décide pour toi.",
    // B · c44e6dd70059
    "abilities.ab_stand_down.targetRule": "AUCUN",
    // A · 6c45292faa0a
    "abilities.ab_break_off.name": "Romps",
    // B · cc603f65bd76
    "abilities.ab_break_off.tags": ["décision"],
    // B · c42556eb2db3
    "abilities.ab_break_off.description": "Arrête un combat que tu es en train de perdre et pars, tant que partir est encore possible.",
    // B · 43afef8b429c
    "abilities.ab_break_off.targetRule": "MOI",
    // A · 160dbe16fcea
    "abilities.ab_take_his_hand.name": "Lui Prendre la Main",
    // B · c7b0490461df
    "abilities.ab_take_his_hand.tags": ["décision","irréversible"],
    // B · b583d75cc5d7
    "abilities.ab_take_his_hand.description": "Accepte l’offre de l’homme qui vient de te renvoyer ta propre philosophie plus justement que personne avant lui.",
    // B · 39d896e20aec
    "abilities.ab_take_his_hand.targetRule": "SINGLE",
    // A · 711370fe0f96
    "abilities.ab_turn_back.name": "Redire Son Nom",
    // B · b450c7f149c3
    "abilities.ab_turn_back.tags": ["décision","fierté","irréversible"],
    // B · 55c2bddaa671
    "abilities.ab_turn_back.description": "Arrête de fuir. Fais demi-tour. Fais-le répéter ce qu’il a dit sur l’homme qui t’a choisi.",
    // B · 39d896e20aec
    "abilities.ab_turn_back.targetRule": "SINGLE",
    // A · 52e8015fafd6
    "abilities.ab_keep_walking.name": "Continuer d’Avancer",
    // B · 907ba36ba834
    "abilities.ab_keep_walking.tags": ["décision","discipline"],
    // B · 10e056cea5d5
    "abilities.ab_keep_walking.description": "Serre les poings et continue, parce qu’il n’est pas venu ici pour que tu gagnes une dispute.",
    // B · 43afef8b429c
    "abilities.ab_keep_walking.targetRule": "MOI",
    // A · a91d9967da5c
    "abilities.ab_let_them_carry_you.name": "Laisser Faire",
    // B · 907ba36ba834
    "abilities.ab_let_them_carry_you.tags": ["décision","discipline"],
    // B · 7d643be5275b
    "abilities.ab_let_them_carry_you.description": "Regarde ton frère une fois, et laisse quelqu’un d’autre prendre cette décision, et va où on t’emmène.",
    // B · 43afef8b429c
    "abilities.ab_let_them_carry_you.targetRule": "MOI",
    // A · a6ee0a1b5e3e
    "abilities.ab_laugh_at_him.name": "Rire de Lui",
    // B · c1b79b033106
    "abilities.ab_laugh_at_him.tags": ["décision","fierté"],
    // B · 6b147859d158
    "abilities.ab_laugh_at_him.description": "Continue de courir et souris par-dessus ton épaule. « Tu forces trop. » Ce n’est pas rien, et ce n’est pas faire demi-tour.",
    // B · 39d896e20aec
    "abilities.ab_laugh_at_him.targetRule": "SINGLE",
    // A · 8b6ac48de49d
    "abilities.ab_use_her_name.name": "Dire Son Nom",
    // B · 87270514ac8a
    "abilities.ab_use_her_name.tags": ["décision","identité"],
    // B · 7a69b440adf8
    "abilities.ab_use_her_name.description": "Portgas. Le sien, choisi exprès, dit en entier à ceux qui s’attendaient à l’autre.",
    // B · c44e6dd70059
    "abilities.ab_use_her_name.targetRule": "AUCUN",
    // B · e5725d0f5ea3
    "abilities.ab_use_her_name.requires.flagsSet": ["knows_about_roger"],
    // A · a96799cc04b5
    "abilities.ab_say_it_all.name": "Dire le Nom en Entier",
    // B · 87270514ac8a
    "abilities.ab_say_it_all.tags": ["décision","identité"],
    // B · 1a390c211b6f
    "abilities.ab_say_it_all.description": "Gol D. Ace, à voix haute, là où on peut entendre, ayant calculé à l’avance ce que ça coûte.",
    // B · c44e6dd70059
    "abilities.ab_say_it_all.targetRule": "AUCUN",
    // B · e5725d0f5ea3
    "abilities.ab_say_it_all.requires.flagsSet": ["knows_about_roger"],
    // A · 6707d9c309f8
    "locations.mt_colubo.name": "Mont Colubo",
    // A · 24e75d6b0b32
    "locations.mt_colubo.shortName": "La Montagne",
    // B · a9b362efd355
    "locations.mt_colubo.description": "Une forêt assez raide pour que les chemins soient vraiment juste les endroits où il y a moins de végétation. Des tigres plus gros que les bandits, une rivière avec une cascade que personne n’a mesurée, et chaque arbre à moins d’une heure de la maison de Dadan a été grimpé et nommé par deux garçons qui n’admettent pas l’avoir fait.",
    // B · 6a0b1f6fe507
    "locations.mt_colubo.stageImage": "story_ace/stage_mt_colubo",
    // B · 46277b314b39
    "locations.mt_colubo.ambientSfx": ["cigales","vent dans la canopée","quelque chose de gros qui bouge"],
    // A · 18d19bf4f12b
    "locations.dadan_house.name": "La Maison de la Famille Dadan",
    // A · 0bf3f792e278
    "locations.dadan_house.shortName": "Chez Dadan",
    // B · 39c006c52368
    "locations.dadan_house.description": "Une longue maison en bois qui sent la fumée, la viande qui sèche et l’alcool bon marché, avec neuf adultes qui se plaignent tout le temps des deux enfants pour qui ils donneraient leur vie. Il y a un trou dans le toit qu’on essaie de réparer depuis trois ans.",
    // B · 2549009e3168
    "locations.dadan_house.stageImage": "story_ace/stage_dadan_house",
    // B · 62cb1fd8d676
    "locations.dadan_house.ambientSfx": ["hommes qui se disputent","crépitement de feu","casseroles"],
    // A · fe6c5faf5335
    "locations.asl_treehouse.name": "La Cabane dans l’Arbre",
    // A · 8584e4fea7c3
    "locations.asl_treehouse.shortName": "Cabane",
    // B · 063c569b09f6
    "locations.asl_treehouse.description": "Des planches, de la corde et de la ténacité, à douze mètres de haut, construit par deux personnes qui n’allaient pas demander de l’aide. La boîte est enterrée à la base sous une pierre plate qui semble posée là par hasard, mais ne l’est pas.",
    // B · 43556e9d2b84
    "locations.asl_treehouse.stageImage": "story_ace/stage_asl_treehouse",
    // B · a9fb05fe1779
    "locations.asl_treehouse.ambientSfx": ["grincement de corde","bruit de vagues au loin","feuilles"],
    // A · f57e99987e5d
    "locations.gray_terminal.name": "Le Terminal Gris",
    // A · 8a192d84f82d
    "locations.gray_terminal.shortName": "Le Terminal",
    // B · d42b38f080da
    "locations.gray_terminal.description": "Les déchets de la ville, entassés en un pays. Des gens y vivent, dans des constructions faites avec ce que les habitants au-dessus ont jeté, et le mur entre eux et la Haute Ville est l’objet le plus honnête de l’île de l’Aube.",
    // B · e279675bbdc7
    "locations.gray_terminal.stageImage": "story_ace/stage_gray_terminal",
    // B · 3c3e047514d0
    "locations.gray_terminal.ambientSfx": ["cris lointains","corbeaux","tôle"],
    // A · c9c3085ac50a
    "locations.goa_high_town.name": "Haute Ville, Goa",
    // A · 037309de1b70
    "locations.goa_high_town.shortName": "Haute Ville",
    // B · 49f9fb4bf7c6
    "locations.goa_high_town.description": "Des rues propres, des volets peints, et des habitants qui ont organisé toute leur vie pour ne pas voir ce qu’il y a de l’autre côté de leur mur. Sabo a grandi dans l’une de ces maisons et ne dira pas laquelle.",
    // B · 2f11af765bb9
    "locations.goa_high_town.stageImage": "story_ace/stage_goa_high_town",
    // B · afca152c9cfc
    "locations.goa_high_town.ambientSfx": ["bruit de vagues","cordages","goélands"],
    // A · e8e0f57e396f
    "locations.dawn_shore.name": "Rivage de l’Île de l’Aube",
    // A · 2169f87596d2
    "locations.dawn_shore.shortName": "Le Rivage",
    // B · 2e1039bb9797
    "locations.dawn_shore.description": "Du sable gris, une jetée branlante, et l’horizon que vous décrivez tous les deux depuis deux ans sans jamais y avoir vu quoi que ce soit. Chaque départ de cette histoire commence ici.",
    // B · cf2d0a0021bf
    "locations.dawn_shore.stageImage": "story_ace/stage_dawn_shore",
    // B · afca152c9cfc
    "locations.dawn_shore.ambientSfx": ["bruit de vagues","cordages","goélands"],
    // A · 14797bab038a
    "locations.sixis.name": "Sixis",
    // A · 14797bab038a
    "locations.sixis.shortName": "Sixis",
    // B · 793eb59ebb36
    "locations.sixis.description": "Une île déserte à la limite de l’East Blue, avec de l’eau douce, pas un chat, et un autre homme qui fait semblant d’avoir voulu venir ici. C’est là que le garçon parti seul découvre qu’il ne va pas y arriver tout seul.",
    // B · 05a0df5ea5e8
    "locations.sixis.stageImage": "story_ace/stage_sixis",
    // B · d551a677345d
    "locations.sixis.ambientSfx": ["bruit de vagues","insectes","un homme qui marmonne"],
    // A · 77d0b20ab21e
    "locations.spade_ship.name": "Le Spade",
    // A · 77d0b20ab21e
    "locations.spade_ship.shortName": "Le Spade",
    // B · 34da18d1fa45
    "locations.spade_ship.description": "Un navire acheté, volé ou gagné selon comment ça s’est passé, avec un équipage qui a choisi un capitaine plus jeune que la plupart d’entre eux. À l’étroit, bruyant, et la première chose dans la vie d’Ace qui lui appartenait parce qu’on la lui a donnée.",
    // B · 1a279bc29a14
    "locations.spade_ship.stageImage": "story_ace/stage_spade_ship",
    // B · 1da8f9e927a2
    "locations.spade_ship.ambientSfx": ["grincement de bois","rire de l’équipage","eau contre la coque"],
    // A · ea199e51d13b
    "locations.grand_line_port.name": "Port Grand Line",
    // A · bbee5ccbb1ef
    "locations.grand_line_port.shortName": "Port",
    // B · 9990546e2d60
    "locations.grand_line_port.description": "Une des quarante villes qui fonctionnent toutes pareil : un port plein de drapeaux dont personne ne demande l’origine, un tableau des primes, un bar où trois phrases mal choisies déclenchent quelque chose, et un bureau des Marines qui fait semblant de ne pas tenir de liste.",
    // B · 0c850eca5323
    "locations.grand_line_port.stageImage": "story_ace/stage_grand_line_port",
    // B · 411374835f2c
    "locations.grand_line_port.ambientSfx": ["foule","goélands","cloches de navire"],
    // A · 24d9d47adaee
    "locations.moby_dick_deck.name": "Le Moby Dick — Pont",
    // A · 648fee57f435
    "locations.moby_dick_deck.shortName": "Moby Dick",
    // B · 7bb7d7ca2a67
    "locations.moby_dick_deck.description": "Un navire en forme de baleine, aussi grand qu’un quartier, avec un vieil homme dans un fauteuil au centre, plus grand que ce que le fauteuil devrait permettre. Seize divisions vivent ici, et toutes l’appellent pareil.",
    // B · bd0906fb9ab5
    "locations.moby_dick_deck.stageImage": "story_ace/stage_moby_dick_deck",
    // B · c6df40642496
    "locations.moby_dick_deck.ambientSfx": ["énormes poutres","équipage de centaines","mer"],
    // A · 766beac0963e
    "locations.moby_dick_mess.name": "Le Moby Dick — Réfectoire",
    // A · b255cdb69014
    "locations.moby_dick_mess.shortName": "Le Réfectoire",
    // B · c9081cbd57fb
    "locations.moby_dick_mess.description": "L’endroit où la Quatrième Division nourrit quatre cents personnes deux fois par jour et où toutes les relations à bord se nouent vraiment. Thatch gère ça. Teach mange ici. Ace aussi, la tête la première, parfois en plein milieu d’une phrase.",
    // B · 9cb01aa12cef
    "locations.moby_dick_mess.stageImage": "story_ace/stage_moby_dick_mess",
    // B · 0acbfba988b5
    "locations.moby_dick_mess.ambientSfx": ["vent et sable","marché","chaleur"],
    // A · 6e6977afff82
    "locations.whitebeard_medical.name": "Le Moby Dick — Infirmerie",
    // A · 4dcb820fa9fb
    "locations.whitebeard_medical.shortName": "Infirmerie",
    // B · 6fb6162f8e6e
    "locations.whitebeard_medical.description": "Le domaine de Marco, et la seule pièce calme de ce navire. Il y a chaque année plus de machines autour du lit du capitaine, et personne à bord n’a jamais osé le dire à voix haute.",
    // B · 4df402123f80
    "locations.whitebeard_medical.stageImage": "story_ace/stage_whitebeard_medical",
    // B · 21ed631c101d
    "locations.whitebeard_medical.ambientSfx": ["bourdonnement d’équipement","équipage au loin","respiration lente"],
    // A · 63ca455bb8ac
    "locations.alabasta.name": "Alabasta",
    // A · 63ca455bb8ac
    "locations.alabasta.shortName": "Alabasta",
    // B · 36331ca17f8c
    "locations.alabasta.description": "Un royaume désertique au milieu de la crise de quelqu’un d’autre, où Ace entre dans un restaurant et trouve son frère assis là, plus vieux de quelques années et exactement pareil.",
    // B · d2710ff6237d
    "locations.alabasta.stageImage": "story_ace/stage_alabasta",
    // B · 0acbfba988b5
    "locations.alabasta.ambientSfx": ["vent et sable","marché","chaleur"],
    // A · 2df66e3f1e61
    "locations.banaro.name": "Île Banaro",
    // A · e655bc07422d
    "locations.banaro.shortName": "Banaro",
    // B · 9be7560a0a8b
    "locations.banaro.description": "Une ville qui n’existera plus ce soir. Deux hommes qui pensent tous les deux que tu devrais vivre sans regrets se rencontrent en son centre pour décider lequel le pense vraiment.",
    // B · 17012129edfe
    "locations.banaro.stageImage": "story_ace/stage_banaro",
    // B · 79c6a76ac768
    "locations.banaro.ambientSfx": ["feu","murs qui s’effondrent","vent"],
    // A · 6c1f7cef35b0
    "locations.impel_down.name": "Impel Down — Niveau six",
    // A · 2536718892cd
    "locations.impel_down.shortName": "La cellule",
    // B · 598692cd4fd2
    "locations.impel_down.description": "L’étage dont personne ne sort, où les prisonniers sont ceux que le monde a décidé d’arrêter de compter. Pierre de mer aux poignets, pas de mer en vue, et un visiteur qui revient sans cesse en criant.",
    // B · c00e11843016
    "locations.impel_down.stageImage": "story_ace/stage_impel_down",
    // B · 94fb4ac64d84
    "locations.impel_down.ambientSfx": ["gouttes","cris lointains","chaîne"],
    // A · ee0e96889d54
    "locations.marineford_platform.name": "La plateforme d’exécution",
    // A · d8f0415d6f00
    "locations.marineford_platform.shortName": "La plateforme",
    // B · 6534e251ce3f
    "locations.marineford_platform.description": "Une plateforme en pierre au-dessus d’une place construite pour une guerre, avec trois amiraux, une baie pleine de navires de guerre, et toute la presse mondiale rassemblée pour voir un homme devenir un argument.",
    // B · 615f1f5f0f58
    "locations.marineford_platform.stageImage": "story_ace/scene_plateforme_marineford",
    // B · e7acdfbd750a
    "locations.marineford_platform.ambientSfx": ["foule énorme","vent","une seule cloche"],
    // A · fed0a78fc8b6
    "locations.marineford_battlefield.name": "Marineford",
    // A · fed0a78fc8b6
    "locations.marineford_battlefield.shortName": "Marineford",
    // B · 37e84751dae9
    "locations.marineford_battlefield.description": "La place dès qu’elle arrête d’être une scène. Tous ceux qui l’ont jamais choisi y sont, et beaucoup ne partiront pas, et c’est l’arithmétique qu’il va devoir accepter.",
    // B · 5f472b7ebc5b
    "locations.marineford_battlefield.stageImage": "story_ace/scene_champ_de_bataille_marineford",
    // B · db17f4a975d2
    "locations.marineford_battlefield.ambientSfx": ["guerre","feu","cris"],
    // B · b4432f4350ea
    "characters.luffy.name": "Monkey D. Luffy",
    // A · 2a1ee566d979
    "characters.luffy.role": "Sept ans, il te suit depuis onze jours et rien ne l’a découragé jusqu’ici",
    // A · fb041a5f63ff
    "characters.luffy.cardBlurb": "Il ne sait pas se battre, ne peut pas mentir, et ne comprend pas ce que c’est d’être rejeté. Il a décidé que tu étais son frère et attend avec une patience infinie que tu le rattrapes. La seule chose qui pourrait vraiment l’arrêter ne t’a même pas traversé l’esprit, parce que ce serait être gentil avec lui.",
    // B · fcca6b746d0b
    "characters.luffy.pronouns": "il/lui",
    // A · 4d5878d68d84
    "characters.luffy.publicTraits": ["Il annonce ce qu’il va faire avant de le faire mal","Se relève à chaque fois","Toujours affamé, au point que ça rythme toute sa journée"],
    // B · f4c21a37cf48
    "characters.luffy.hiddenDrives": ["Il ne suit pas Ace parce qu’Ace est fort. Il le suit parce qu’il était seul sur cette île avant qu’Ace existe et a décidé de ne plus jamais l’être.","Il n’a jamais envisagé une seule fois qu’Ace pourrait ne pas vouloir de lui, et qu’on lui dise ça directement ne serait pas une info pour lui."],
    // B · 677281d1d3a0
    "characters.luffy.values": ["Dire la vérité tout de suite, fort","Ne pas être laissé derrière, ce qu’il considère comme une loi de la nature plutôt qu’une préférence"],
    // B · f1f0778425ce
    "characters.luffy.fears": ["Être seul, physiquement et vraiment — une pièce vide lui fait plus peur qu’un tigre","Que ceux qui partent le fassent à cause de quelque chose qu’il a fait"],
    // A · 06f6f98df74f
    "characters.luffy.socialStyle": "Aucun recul. Il se tient trop près, pose la question impossible sur un ton normal, et ne rougit jamais quelle que soit la réponse. Il rit de choses qui n’étaient même pas des blagues, et c’est sincère.",
    // B · cec79dd73981
    "characters.luffy.boundaries": ["Il ne fait pas semblant d’être d’accord pour finir une conversation. Il dit non et continue de suivre.","Il ne se laisse pas acheter avec de la nourriture, ce que tout le monde suppose mais que personne n’a testé"],
    // B · 161354d5dd95
    "characters.luffy.goals": ["Être autorisé à monter dans l’arbre","Découvrir ce qu’il y a dans la boîte","Frapper Ace une fois, vraiment, là où Ace le remarque"],
    // B · c9d7aa07d58f
    "characters.luffy.secrets.luffy_knows_where_the_can_is.fact": "Il a compris où la boîte est enterrée au quatrième jour en regardant quelle pierre plate Ace évite de marcher dessus, et il ne l’a pas déterrée, parce que ce n’est pas le but.",
    // B · 47558a04be8d
    "characters.luffy.secrets.luffy_knows_where_the_can_is.visibility": "NPC_PRIVATE",
    // B · 1652fb0e5fbb
    "characters.luffy.secrets.luffy_knows_where_the_can_is.revealHint": "Il le dit de lui-même, joyeusement et au pire moment possible, la première fois que quelqu’un suggère qu’il ne comprend pas ce qui se passe.",
    // B · f7cc2357d56f
    "characters.luffy.secrets.luffy_hat_promise.fact": "Le chapeau lui a été donné par un homme qui est parti, avec une consigne attachée, et Luffy a décidé que cette consigne veut dire qu’il n’a pas le droit d’être le genre de personne qui reste sur place.",
    // B · 47558a04be8d
    "characters.luffy.secrets.luffy_hat_promise.visibility": "NPC_PRIVATE",
    // B · 9606e7b18983
    "characters.luffy.secrets.luffy_hat_promise.revealHint": "Demande-lui le chapeau plutôt que Shanks. Il expliquera tout en quatre phrases environ, sans que ça soit triste.",
    // A · a6147b635afd
    "characters.luffy.speechStyle": "Des cris courts et affirmés, avec le verbe qui fait tout le boulot. Pas de proposition subordonnée. Il répète un refus exactement pareil au lieu de le reformuler. Il dit « Ace » en boucle, ça suffit comme phrase. Il rit en plein milieu d’un mot.",
    // A · 20f81f6ba0e3
    "characters.luffy.topics": ["te suivre","la bouffe","l’arbre","être fort","le chapeau","les pirates","ce qu’il y a dans la boîte"],
    // A · 82d1ed74a565
    "characters.luffy.voiceSamples": ["J’arrive. T’as pas dit que je pouvais pas, t’as dit que tu m’attacherais à un arbre. C’est pas pareil.","Je me suis relevé. Tu vois ? Je me suis relevé. Refais.","On mange ? Parce que j’ai trouvé un truc et je crois que c’est de la viande.","Tu peux pas me laisser. Je vais juste suivre le chemin que t’as pris."],
    // B · 95c1b8216f4e
    "characters.luffy.appearance": "À sept ans : petit, maigre et croûteux, cheveux noirs en bataille, yeux ronds et expressifs, la cicatrice déjà sous l’œil gauche, un chapeau de paille trop grand pour lui, un gilet rouge sans manches, un short, des sandales. Pas un petit adulte — un enfant en bataille qui est tombé de quelque part.",
    // B · 377341d4a7ca
    "characters.luffy.visualHook": "Le chapeau de paille, toujours sur la tête, toujours trop grand, jamais posé quelque part.",
    // B · 9a599865eee6
    "characters.luffy.silhouette": "Petit, jambes écartées, bras écartés, le bord du chapeau casse la forme de la tête.",
    // B · b0e1b2164c99
    "characters.luffy.artSeed": "ace-luffy-enfant-01",
    // B · 1dbe2bcd48d5
    "characters.luffy.portrait": "story_ace/luffy",
    // B · 6bdb93f9be71
    "characters.luffy.expressions": ["neutre","souriant","furieux","en pleurs","endormi"],
    // B · c06f4bfa5e8d
    "characters.luffy.knowledgeScope": ["luffy","maison_dadan","mt_colubo","le_chapeau","visites_garp"],
    // B · bceffb5d04ee
    "characters.luffy.gates.luffy_is_a_brother.label": "Il cesse d’être un problème et devient la famille",
    // B · 55a54e80451a
    "characters.luffy.gates.luffy_is_a_brother.kind": "CONFIANCE",
    // B · 750c58cd6ed7
    "characters.luffy.gates.luffy_is_a_brother.requires.flagsSet": ["parlé :luffy"],
    // B · 206f9aa27dc8
    "characters.luffy.gates.luffy_will_stay_behind.label": "Il restera vraiment derrière si Ace lui demande",
    // B · 55a54e80451a
    "characters.luffy.gates.luffy_will_stay_behind.kind": "CONFIANCE",
    // B · 250a0ac07183
    "characters.luffy.gates.luffy_will_stay_behind.requires.flagsSet": ["asl_fraternité"],
    // B · 8b7df9ead796
    "characters.luffy.combatant.tags": ["caoutchouc","enfant","ne-se-laisse-pas-faire"],
    // B · 3439b902c7e4
    "characters.sabo.name": "Sabo",
    // A · 4d28c44640a2
    "characters.sabo.role": "Ton premier vrai pote, né dans la ville propre de l’autre côté du mur, et la seule personne que tu connaisses qui ait jeté le nom qu’on lui a donné",
    // A · e75a9c606f14
    "characters.sabo.cardBlurb": "C’est la preuve que la naissance n’oblige à rien, c’est ce que t’avais le plus besoin d’entendre et que tu n’aurais jamais accepté venant d’un adulte. C’est aussi un menteur, un voleur, et un tacticien meilleur que toi. Une famille de la Haute Ville ne cesse de le chercher.",
    // B · fcca6b746d0b
    "characters.sabo.pronouns": "il/lui",
    // A · c8dd4bf6eebd
    "characters.sabo.publicTraits": ["Explique le plan même si personne ne demande","Vole avec habileté et sans culpabilité","Change de sujet dès qu’on parle de son père"],
    // B · ffa02a45d42d
    "characters.sabo.hiddenDrives": ["Il a besoin que quelqu’un dise à voix haute que partir n’était pas de la lâcheté, mais il ne l’a jamais demandé.","Il a peur d’être repris — pas tué, repris, remis dans la maison et mis à l’aise, ce qu’il considère pire que tout ce que Gray Terminal peut lui faire"],
    // B · 112ded7e81c5
    "characters.sabo.values": ["Choisir ce que tu es, et payer le prix","Partager tout en trois quand vous êtes trois, sans discuter"],
    // B · f658279bca03
    "characters.sabo.fears": ["Que le mur soit réel et que tous ceux qui naissent dedans soient à jamais un d’eux","Qu’Ace décide que l’affaire Roger est le destin, parce que si Ace y croit, Sabo y croit aussi pour lui"],
    // A · b5893d7f3f47
    "characters.sabo.socialStyle": "S’assoit sur les objets. Parle avec les mains et la bouche pleine. Contredit en proposant autre chose plutôt qu’en te contredisant directement, ce qui marche sur Ace à moitié et l’énerve l’autre moitié du temps.",
    // B · 3884453fe66a
    "characters.sabo.boundaries": ["Il n’ira pas en Haute Ville pour aucune raison, pour personne, à aucun prix","Il ne veut pas qu’on l’appelle par son nom de famille, et ne répond pas la première fois qu’on le fait"],
    // B · ee9e9ab33698
    "characters.sabo.goals": ["Acheter le bateau","Partir en mer avant que quelque chose ne rende ça impossible","Faire dire à Ace, une fois, que être le fils de Roger n’est pas la même chose qu’être Roger"],
    // B · 447e9162ccbe
    "characters.sabo.secrets.sabo_noble_family.fact": "Sa famille est de la noblesse de Goa, il sait exactement quelle maison, et ça fait deux ans qu’ils offrent de l’argent pour des infos sur lui.",
    // B · 47558a04be8d
    "characters.sabo.secrets.sabo_noble_family.visibility": "NPC_PRIVÉ",
    // B · 204de1cfb5ee
    "characters.sabo.secrets.sabo_noble_family.revealHint": "Il le dit d’une phrase plate, sans y être poussé, la nuit où la fraternité devient réelle, puis il change de sujet aussitôt.",
    // B · f1ffc180fd84
    "characters.sabo.secrets.sabo_knows_about_the_burning.fact": "Il a entendu les nobles parler de ce qui arrive au Terminal Gris avant la visite du Noble Mondial, et il ne l’a pas dit à Ace, parce que le dire à Ace, c’est qu’Ace y descende.",
    // B · 47558a04be8d
    "characters.sabo.secrets.sabo_knows_about_the_burning.visibility": "NPC_PRIVÉ",
    // B · 5b5e14e40b5f
    "characters.sabo.secrets.sabo_knows_about_the_burning.revealHint": "Insiste sur pourquoi il est bizarre depuis une semaine plutôt que sur le Terminal lui-même.",
    // A · 74f3764a9252
    "characters.sabo.speechStyle": "Fluide et rapide, phrases complètes, vocabulaire d’une meilleure éducation utilisé sans façon. Commence ses phrases par « regarde » quand il va devenir raisonnable et par « non, écoute » quand c’est pas le cas. Rit en même temps qu’il parle.",
    // A · 1821d0d3ba44
    "characters.sabo.topics": ["le bateau","la boîte","le mur","Haute Ville","son père","les pirates","Luffy","ce que le nom d’Ace veut dire"],
    // A · 0e06c190d61b
    "characters.sabo.voiceSamples": ["Regarde — personne ne vérifie la porte est avant midi. C’est pas de la chance, c’est un planning, et les plannings c’est juste des gens qui font rien mais bien cadré.","Non, écoute. T’as pas choisi ton père. Moi j’ai choisi le mien, puis je l’ai rejeté. L’un de nous a fait un truc dur et c’était pas toi.","S’il nous suit encore un jour, il vient avec nous, et tu sais ça, et ça t’embête juste parce que c’est pas ton idée.","Me sors plus ce nom, jamais."],
    // B · 36a66bf04a53
    "characters.sabo.appearance": "À dix ans : même taille qu’Ace, cheveux blonds courts et bouclés, visage plus rond, une dent en moins, un grand chapeau haut-de-forme noir avec des lunettes bleues autour, veste bleue aux manches retroussées, cravate, short bleu pâle, une pipe. Pas encore de cicatrice ni de long manteau — ça, c’est pour l’homme qu’il n’est pas encore devenu.",
    // B · 02df894c9e6e
    "characters.sabo.visualHook": "Le chapeau haut-de-forme avec les lunettes, absurde sur un gamin de dix ans et jamais enlevé.",
    // B · f2b7d2cbbc01
    "characters.sabo.silhouette": "Chapeau haut-de-forme qui casse la forme de la tête, pipe sur une épaule, veste évasée.",
    // B · e2eb787e8983
    "characters.sabo.artSeed": "ace-sabo-child-01",
    // B · a330bc9fc151
    "characters.sabo.portrait": "story_ace/sabo",
    // B · 31f61e286331
    "characters.sabo.expressions": ["neutre","souriant","calculateur","en colère","effrayé"],
    // B · e9204d7b20d8
    "characters.sabo.knowledgeScope": ["sabo","asl_treehouse","gray_terminal","goa_high_town","the_wall","the_ship_plan","nobility"],
    // B · 637511c41505
    "characters.sabo.gates.sabo_tells_you_his_house.label": "Il dit de quelle famille il vient",
    // B · 55a54e80451a
    "characters.sabo.gates.sabo_tells_you_his_house.kind": "CONFIANCE",
    // B · 369fdde6898f
    "characters.sabo.gates.sabo_tells_you_his_house.requires.flagsSet": ["spoke :sabo"],
    // B · 1af9f458b572
    "characters.sabo.gates.sabo_will_not_sail_alone.label": "Il refusera le bateau plutôt que de partir sans Ace",
    // B · 9e8ae18bf8bf
    "characters.sabo.gates.sabo_will_not_sail_alone.kind": "ALLIANCE",
    // B · 250a0ac07183
    "characters.sabo.gates.sabo_will_not_sail_alone.requires.flagsSet": ["asl_brotherhood"],
    // B · 29c488ba55b8
    "characters.sabo.combatant.tags": ["pipe","enfant","tacticien"],
    // B · dd4ca389a0b8
    "characters.dadan.name": "Dadan la Bouclée",
    // A · 21d75fafd29a
    "characters.dadan.role": "La bandit de la montagne à qui un vice-amiral des Marines a confié deux gosses, et qui râle tous les jours depuis sans jamais les lâcher.",
    // A · 2d52016b3074
    "characters.dadan.cardBlurb": "Elle te gueule dessus, te menace, et dit à qui veut l’entendre que Garp lui a gâché la vie en te laissant ici. Jamais elle ne t’a levé la main dessus. Si tu rentres en retard, elle descend la montagne armée, et elle niera ce qu’elle fait.",
    // B · aee35f364a88
    "characters.dadan.pronouns": "elle",
    // A · de227e786921
    "characters.dadan.publicTraits": ["Le volume, c’est sa personnalité","Toujours une clope au bec","Annonce souvent qu’elle n’est pas leur mère, sans qu’on lui demande"],
    // B · feeb2b4c70e0
    "characters.dadan.hiddenDrives": ["Elle a décidé il y a des années que le garçon ne grandirait pas en se croyant un fardeau, et toute sa méthode pour y arriver, c’est de se plaindre de l’inconvénient tellement fort que ça passe pour normal","Elle a plus peur que Garp revienne les chercher que de n’importe quoi dans la forêt"],
    // B · 15fce4c412c5
    "characters.dadan.values": ["Être là, armée, quand ça compte, et ne jamais en parler après","Ne pas mentir aux enfants sur ce que sont les adultes"],
    // B · 99bae1793a32
    "characters.dadan.fears": ["Que l’affaire Roger arrive jusqu’à la montagne et qu’elle ne puisse rien y faire avec sa hache","Qu’Ace parte à dix-sept ans en croyant que personne dans cette maison ne voulait de lui"],
    // A · 3799dc75226d
    "characters.dadan.socialStyle": "Chaque conversation démarre par un cri et redescend. Les insultes, ce sont des marques d’affection. Physiquement énorme et complètement pas menaçante pour les deux seuls qui la connaissent.",
    // B · 5922cc7db78f
    "characters.dadan.boundaries": ["Elle ne veut pas qu’on la remercie. Si on la remercie, elle quitte la pièce","Elle ne parle pas des raisons de Garp, parce qu’elle ne les connaît pas et déteste ça"],
    // B · 421205b96bea
    "characters.dadan.goals": ["Faire manger à tous les deux quelque chose qui n’est pas volé","Avoir une soirée sans qu’il y ait de sang","Ne plus jamais parler à Monkey D. Garp, un but qu’elle rate chaque année"],
    // B · 2397d3f6d3b6
    "characters.dadan.secrets.dadan_kept_the_notice.fact": "Elle a le papier que Garp a laissé au garçon — un nom, une date, et pas de père dessus — plié dans une boîte en fer sous le plancher, et elle ne l’a jamais montré à personne.",
    // B · 47558a04be8d
    "characters.dadan.secrets.dadan_kept_the_notice.visibility": "NPC_PRIVÉ",
    // B · 46934ffdbe73
    "characters.dadan.secrets.dadan_kept_the_notice.revealHint": "Elle ne veut pas qu’on l’interroge là-dessus. Elle le sort elle-même, une fois, une nuit où elle a décidé qu’il allait apprendre pire d’une autre personne.",
    // A · 8f8635c30b62
    "characters.dadan.speechStyle": "Forte, rude, rapide, bourrée de questions rhétoriques qu’elle se répond elle-même. Elle les traite de « morveux ». Termine ses phrases par une insulte qu’elle pense pas et que tout le monde prend pour de la ponctuation.",
    // A · aae2f49f1317
    "characters.dadan.topics": ["Garp","nourriture","le toit","ce qu’ils lui coûtent","la forêt","rentrer avant la nuit"],
    // A · 94f2d6192174
    "characters.dadan.voiceSamples": ["J’ai l’air d’une mère pour toi ? Vraiment ? Je suis une criminelle. J’ai un casier. Ce vieux est entré ici, il a foutu ma vie en l’air, et maintenant y a un trou dans mon toit.","Assieds-toi. Mange. C’est pas pour toi que j’ai cuisiné, c’est pour moi, et t’as juste la chance d’être là.","Vous êtes en retard tous les deux. Je m’inquiétais pas. Range la hache.","Ne dis rien. Va te coucher."],
    // B · 9ffa697d332b
    "characters.dadan.appearance": "Femme énorme et corpulente dans la quarantaine, cheveux roux-orangés sauvages, visage buriné et intimidant, vêtements de montagne usés et rapiécés, une cigarette presque toujours allumée. Proportions exagérées à la One Piece — elle occupe un tiers de n’importe quel cadre où elle est et ne doit pas être redessinée en mère anime mince.",
    // B · 4666554f342b
    "characters.dadan.visualHook": "La cigarette, et la hache appuyée contre la porte qu’elle prétend toujours être pour le bois.",
    // B · 6942fc2a13f1
    "characters.dadan.silhouette": "Vaste et carrée, cheveux en masse large et irrégulière, épaules plus larges que l’encadrement de la porte.",
    // B · a9a2375edd0e
    "characters.dadan.artSeed": "ace-dadan-01",
    // B · d8b78b539017
    "characters.dadan.portrait": "story_ace/dadan",
    // B · 7c6ced2e5f25
    "characters.dadan.expressions": ["neutre","criant","exaspérée","inquiète","tendre"],
    // B · 728319de17a1
    "characters.dadan.knowledgeScope": ["dadan","dadan_house","mt_colubo","garp_visits","the_notice","bandit_family"],
    // B · fb09889e318c
    "characters.dadan.gates.dadan_shows_the_notice.label": "Elle sort le papier que Garp a laissé",
    // B · 55a54e80451a
    "characters.dadan.gates.dadan_shows_the_notice.kind": "CONFIANCE",
    // B · f2a198fd2ec1
    "characters.dadan.combatant.tags": ["hache","bandit","protectrice"],
    // B · c76948fb6c49
    "characters.garp.name": "Monkey D. Garp",
    // A · 1c230309805a
    "characters.garp.role": "Vice-amiral Marine, grand-père de Luffy, l’homme qui t’a enlevé à Baterilla, et la seule personne encore vivante qui sait qui était ton père",
    // A · 3e627ec9f078
    "characters.garp.cardBlurb": "Il essaie tout le temps de te pousser vers la Marine sans jamais dire pourquoi, parce que la raison, c’est une promesse qu’il a faite à un homme qu’il poursuivait. Il veut que tu vives et que tu restes loin de ton héritage, et il est tellement nul pour s’exprimer que ça ressemble à de la violence et des éclats de rire.",
    // B · fcca6b746d0b
    "characters.garp.pronouns": "il/lui",
    // A · c52cc02c0d62
    "characters.garp.publicTraits": ["Rit aux mauvais moments, et beaucoup","Donne des coups aux enfants en guise de salut","S’endort en plein milieu de ses phrases"],
    // B · 6248d7dbdf1f
    "characters.garp.hiddenDrives": ["Il a promis à Roger qu’il prendrait l’enfant, et il interprète cette promesse comme un devoir de le tenir complètement à l’écart de la mer — une lecture que Roger n’a jamais demandée et que Garp n’a jamais remise en question","Chaque année, il essaie de déterminer si c’est l’année où le garçon est assez grand pour être mis au courant, et il s’est trompé chaque année jusqu’à présent"],
    // B · 9891d9c88b77
    "characters.garp.values": ["Une promesse tenue même quand l’homme à qui on l’a faite était ton ennemi","Les Marines comme seule structure capable de protéger un garçon que le Gouvernement voudrait sinon voir mort"],
    // B · c936fda9091f
    "characters.garp.fears": ["Que le garçon l’apprenne par quelqu’un qui veut l’utiliser","Qu’il ait déjà perdu cet argument et que la mer va emporter ses deux petits-fils"],
    // A · d891dd3e5dcd
    "characters.garp.socialStyle": "Il arrive sans prévenir, dévore tout ce qu’il trouve, éclate de rire, balance une pique terrible au milieu d’une blague, et s’en va. Il ne dit jamais ce qu’il faut dire quand il faut le dire.",
    // B · 46bd0b088e12
    "characters.garp.boundaries": ["Ne parlera pas de Roger tant que quelqu’un d’autre est dans la pièce","Ne reconnaît pas qu’il est là pour les surveiller et insiste pour que chaque visite soit une coïncidence ou un devoir"],
    // B · 1752e1d3d0df
    "characters.garp.goals": ["Faire en sorte qu’Ace considère les Marines sans lui dire pourquoi c’est important","Confirmer que les deux garçons sont en vie, deux fois par an, sans que ça ait l’air d’une vérification"],
    // B · d66e3e825809
    "characters.garp.secrets.garp_knows_roger.fact": "Roger lui a demandé, directement et peu avant son exécution, de prendre l’enfant à naître. Garp a accepté. Il ne l’a dit à personne en dix-neuf ans.",
    // B · 47558a04be8d
    "characters.garp.secrets.garp_knows_roger.visibility": "NPC_PRIVATE",
    // B · 41192526896a
    "characters.garp.secrets.garp_knows_roger.revealHint": "Il évitera le sujet, déviera en riant, et donnera d’abord une vérité partielle. La vérité complète arrive seulement si Ace pose la question après avoir déjà trouvé l’enregistrement — jamais à une supposition.",
    // B · a920b2389600
    "characters.garp.secrets.garp_knows_rouge.fact": "Il sait pour les vingt mois, qu’elle a délibérément tenu bon, et qu’elle a demandé à voir le garçon une fois et qu’on lui a dit qu’il n’y avait pas le temps.",
    // B · 47558a04be8d
    "characters.garp.secrets.garp_knows_rouge.visibility": "NPC_PRIVATE",
    // B · cf2a03d1225e
    "characters.garp.secrets.garp_knows_rouge.revealHint": "Celle-ci, il la lâche plus facilement que Roger, et ça lui coûte plus de la dire.",
    // A · fdab32484e33
    "characters.garp.speechStyle": "Voix forte, joviale, toujours en digressions, ponctuée de rires qui ne sont pas toujours justifiés. Il appelle le joueur « gamin ». Il balance la phrase la plus cruelle mais juste avec la même légèreté qu’une blague sur la bouffe, puis il change de sujet avant qu’on puisse répondre.",
    // A · ff03d6f2068f
    "characters.garp.topics": ["la Marine","nourriture","Luffy","la mer","ta mère, comment elle était","pirates","rien de spécial"],
    // A · 71a4cd471694
    "characters.garp.voiceSamples": ["T’as du bras. Dommage. La Marine aurait eu besoin de ce bras. Bwahaha ! Y en a d’autres comme ça ?","Pose pas cette question, gamin. Pose-moi autre chose.","Elle a tenu. Vingt mois. Tu veux savoir quel genre de femme fait ça ? Moi non plus, je l’ai vue qu’une fois, mais j’y pense chaque année.","Je t’ai mis sur cette montagne parce que je voyais pas d’endroit plus loin de la mer. Finalement, je suis un idiot."],
    // B · 99c74576784a
    "characters.garp.appearance": "Immense et musclé dans la soixantaine, cheveux blancs courts, barbe de trois jours, cicatrice à côté de l’œil gauche, manteau des Marines porté ouvert sur une chemise simple, large sourire énorme. Pas de capuche permanente de chien — ça appartient à des moments spécifiques de bande dessinée et de déguisement et ne doit pas devenir sa silhouette par défaut.",
    // B · 4614b2cc672b
    "characters.garp.visualHook": "Le manteau des Marines porté comme quelque chose dans lequel il a été forcé, et un poing de la taille d’une tête d’enfant.",
    // B · af493f05f310
    "characters.garp.silhouette": "Torso immense, manteau tombant droit des épaules, tête rejetée en arrière en train de rire.",
    // B · e5a9cca342d4
    "characters.garp.artSeed": "ace-garp-01",
    // B · 4e83fdc51222
    "characters.garp.portrait": "story_ace/garp",
    // B · 4fe0fbb58d8d
    "characters.garp.expressions": ["neutre","rire","sévère","en deuil","endormi"],
    // B · e68e25837c18
    "characters.garp.knowledgeScope": ["garp","les_marines","roger","rouge","baterilla","luffy","gouvernement_mondial","l_avis"],
    // B · 9a5a35f84e8e
    "characters.garp.gates.garp_talks_about_roger.label": "Il répond à la question sur ton père",
    // B · 55a54e80451a
    "characters.garp.gates.garp_talks_about_roger.kind": "CONFIANCE",
    // B · a3a993ed3645
    "characters.garp.gates.garp_talks_about_roger.requires.hasItems": ["roger_record"],
    // B · 880c76f3dd9e
    "characters.garp.gates.garp_talks_about_rouge.label": "Il te parle des vingt mois",
    // B · 55a54e80451a
    "characters.garp.gates.garp_talks_about_rouge.kind": "CONFIANCE",
    // B · a21ff838b33d
    "characters.garp.gates.garp_talks_about_rouge.requires.flagsSet": ["spoke :garp"],
    // B · a612a9783b9b
    "characters.garp.combatant.tags": ["haki","contre-amiral","héros-des-marines"],
    // B · 20188d3b599e
    "characters.deuce.name": "Deuce Masqué",
    // A · 1e456db35f0b
    "characters.deuce.role": "Le premier à te rejoindre, rencontré sur une île où aucun de vous deux ne voulait être, et le seul homme vivant à t’avoir connu avant qu’il y ait une légende",
    // A · 6953342e6969
    "characters.deuce.cardBlurb": "Au départ, il voulait pas devenir pirate, et il t’aime pas trop. Il est pratique là où toi tu l’es pas, il note ce qui s’est vraiment passé, et c’est son équilibre qui fait qu’une équipe, c’est pas juste un gamin avec des suiveurs.",
    // B · fcca6b746d0b
    "characters.deuce.pronouns": "il/lui",
    // A · 1d16a2b0f8ce
    "characters.deuce.publicTraits": ["Tient un journal écrit avec les dates","Exprime son objection une fois avant d’obtempérer","Porte le masque bien après qu’il n’y ait plus de raison"],
    // B · e2e59802e015
    "characters.deuce.hiddenDrives": ["Il a abandonné un nom et une famille de médecins et n’a pas décidé si c’était de la lâcheté ; voir quelqu’un d’autre refuser un nom hérité est la raison pour laquelle il reste","Il veut que l’enregistrement soit exact plus qu’il ne veut qu’il soit flatteur, et il soupçonne que ça comptera plus tard"],
    // B · 11c5710f68eb
    "characters.deuce.values": ["Exactitude, y compris à propos des gens qu’il aime","Dire la chose désagréable avant la décision plutôt qu’après"],
    // B · 6bded640b1ce
    "characters.deuce.fears": ["Que Ace soit le genre d’homme qui meurt jeune et entraîne toute l’équipe avec lui","Être de nouveau connu sous le nom qu’il a quitté"],
    // A · 7f53a34b5c7c
    "characters.deuce.socialStyle": "Sèche, posée, un peu formelle. Répond précisément aux questions, même celles qui sont rhétoriques. Ne joue pas la loyauté, du coup les gens qui confondent volume et engagement le sous-estiment toujours.",
    // B · 7a22f2b0d154
    "characters.deuce.boundaries": ["Ne mentira pas dans le journal, pour personne, y compris pour faire mieux paraître Ace","Ne parlera pas de ce qu’il était avant Sixis"],
    // B · d199f8f3788d
    "characters.deuce.goals": ["Garder cette équipe en vie jusqu’à l’île suivante","Faire expliquer un plan au capitaine avant de l’exécuter, une fois","Terminer l’enregistrement"],
    // B · ed7b47ae13ee
    "characters.deuce.secrets.deuce_real_name.fact": "Sa famille est composée de médecins reconnus et son vrai nom serait reconnu dans trois pays. Il est parti parce qu’il ne supportait pas l’avenir que ça garantissait.",
    // B · 47558a04be8d
    "characters.deuce.secrets.deuce_real_name.visibility": "NPC_PRIVATE",
    // B · 71ef53bc698b
    "characters.deuce.secrets.deuce_real_name.revealHint": "Il le dit à Ace et à personne d’autre, en mer, la nuit, en une dizaine de mots, après qu’Ace ait parlé de son propre père.",
    // A · bf8c62d8bf9d
    "characters.deuce.speechStyle": "Des phrases calmes et complètes, avec l’habitude médicale de nommer les choses précisément. Impassible. Commence ses désaccords par « pour mémoire » et le pense vraiment. Ne hausse jamais la voix, ce qui fait qu’il est le plus fort dans une dispute avec Ace.",
    // A · c6c2ffa00b8f
    "characters.deuce.topics": ["le journal","les provisions","l’équipage","le fruit","le Nouveau Monde","ce qui s’est passé hier"],
    // A · 735f8a525fff
    "characters.deuce.voiceSamples": ["Pour mémoire : t’avais pas de plan. T’avais une direction et beaucoup de confiance, et c’est pas la même chose.","J’ai écrit ce que tu as vraiment dit. Tu peux lire. Ça servira à rien.","Si tu manges ça, tu nageras plus jamais. Je te conseille pas, je te dis juste ce que ça coûte.","J’ai laissé un nom aussi. Le mien valait moins que le tien et c’était plus dur à abandonner."],
    // B · da8001cfe0c7
    "characters.deuce.appearance": "Homme adulte mince, cheveux foncés, masque couvrant le visage porté par habitude plus que par nécessité, vêtements pratiques de marin dans des bleus sourds, sacoche avec un carnet rigide à l’intérieur. Utilise le design de référence de Ace’s Story plutôt que d’improviser un pirate masqué générique.",
    // B · dcd3ee59fa63
    "characters.deuce.visualHook": "Le masque, et le carnet qu’il est toujours en train de lire.",
    // B · febc37f4e33e
    "characters.deuce.silhouette": "Droit, étroit, bretelle de sacoche en travers de la poitrine, tête légèrement penchée vers le bas en train de lire.",
    // B · 35444a816168
    "characters.deuce.artSeed": "ace-deuce-01",
    // B · bcc0dc342b70
    "characters.deuce.portrait": "story_ace/deuce",
    // B · b6479aecef1d
    "characters.deuce.expressions": ["neutre","sec","alerte","amusé d’un air sombre","en deuil"],
    // B · c2b6e7c6e5cb
    "characters.deuce.knowledgeScope": ["deuce","sixis","spade_ship","l’équipage","mera_mera","navigation","le journal"],
    // B · e9c68ba75704
    "characters.deuce.gates.deuce_gives_his_name.label": "Il te dit comment il s’appelle",
    // B · 55a54e80451a
    "characters.deuce.gates.deuce_gives_his_name.kind": "CONFIANCE",
    // B · eed4e2c3d436
    "characters.deuce.gates.deuce_gives_his_name.requires.flagsSet": ["spade_pirates_formed"],
    // B · 858abe7b0712
    "characters.deuce.combatant.tags": ["second","pratique"],
    // B · 13923840daf3
    "characters.whitebeard.name": "Edward Newgate",
    // A · bb300ec0180d
    "characters.whitebeard.role": "L’homme le plus fort du monde, capitaine du navire que tu es venu prendre, et père de quatre cents personnes qui l’ont toutes choisi",
    // A · c072938a7599
    "characters.whitebeard.cardBlurb": "T’es venu pour le tuer, il t’a plutôt offert une place, et il continue à le faire à chaque fois que tu essaies. Il croit qu’une famille, c’est quelque chose qu’on choisit et qu’on refuse d’abandonner, c’est la réponse exacte à la question que tu portes depuis tes huit ans, et tu peux pas t’y résoudre.",
    // B · fcca6b746d0b
    "characters.whitebeard.pronouns": "il/lui",
    // A · 66a90d4af658
    "characters.whitebeard.publicTraits": ["Traite tout le monde sur le bateau comme son fils et le pense vraiment","Rit des tentatives pour le tuer","Boit dans une gourde aussi grosse qu’un enfant"],
    // B · 020e8e3c7834
    "characters.whitebeard.hiddenDrives": ["Il ne veut rien du tout — ni couronne, ni One Piece, ni territoire au-delà de ce qui protège sa famille — et ça dépasse vraiment tout le monde qui le rencontre","Il sait qu’il est gravement malade et a décidé que dépenser ce qu’il lui reste pour les gens est la bonne chose, et n’en parle pas"],
    // B · 9f6e5d2f842a
    "characters.whitebeard.values": ["Une famille choisie délibérément et jamais abandonnée, peu importe ce qu’ils deviennent","Laisser un fils faire sa propre erreur, jusqu’au point où ça peut le tuer"],
    // B · 262281f45f5f
    "characters.whitebeard.fears": ["Survivre à ses fils, ce qu’il a déjà fait plusieurs fois","Que le garçon meure de fierté et qu’il n’y ait rien que personne ait pu dire"],
    // A · e17aff90cf99
    "characters.whitebeard.socialStyle": "Une énorme présence silencieuse. Il parle peu et doucement, et tout le monde s’arrête. Considère une tentative d’assassinat comme une forme d’introduction. Prête attention à la seule personne dans la pièce qui ne dit rien.",
    // B · fe4f33fe207d
    "characters.whitebeard.boundaries": ["Il n’ordonne pas à un fils de rester quand il voit que le fils est déjà parti","Il ne permet pas qu’on parle de son équipage comme d’un moyen pour quelque chose"],
    // B · aceb25f703bf
    "characters.whitebeard.goals": ["Faire accepter la marque à celui-ci avant qu’il ne se tue à prouver qu’il n’en a pas besoin","Faire durer la famille une année de plus que ce que les médecins admettent"],
    // B · 05c0dcd2d55e
    "characters.whitebeard.secrets.wb_health.fact": "Le matériel de l’infirmerie le maintient fonctionnel plus que confortable, et Marco connaît les vrais chiffres.",
    // B · 47558a04be8d
    "characters.whitebeard.secrets.wb_health.visibility": "NPC_PRIVÉ",
    // B · 14cf1e558417
    "characters.whitebeard.secrets.wb_health.revealHint": "Il ne le dit jamais. Demande à Marco, ou sois à l’infirmerie quand le matériel tourne.",
    // B · 490b807755a5
    "characters.whitebeard.secrets.wb_saw_it_coming.fact": "Il avait déjà identifié Teach comme dangereux et a choisi de le garder à bord malgré tout, parce que jeter un fils pour ce qu’il pourrait faire est la seule chose que sa position interdit.",
    // B · 47558a04be8d
    "characters.whitebeard.secrets.wb_saw_it_coming.visibility": "NPC_PRIVÉ",
    // B · 4076844036b0
    "characters.whitebeard.secrets.wb_saw_it_coming.revealHint": "Il le dit lui-même, calmement, la nuit où Thatch meurt, sans se défendre.",
    // A · c8f975e79be8
    "characters.whitebeard.speechStyle": "Court, grave, posé. Il lui dit « fils » ou « morveux » sans distinction. Il exprime son point de vue une fois, sans discuter. Il termine par un rire qui n’est pas méprisant. Il ne se justifie jamais deux fois.",
    // A · f85af403cd4e
    "characters.whitebeard.topics": ["famille","la mer","ses fils","ce qu’est un père","Teach","Roger","ce que tu vaux"],
    // A · e9f96ec18d9e
    "characters.whitebeard.voiceSamples": ["Pose ça, gamin. T’as essayé onze fois. La douzième sera pas différente et je serai toujours là après.","Je veux pas du One Piece. Je voulais une famille. J’en ai eu une grosse.","Le nom de ton père, c’est pas une phrase qu’on t’a transmise. Je le connaissais. Il aurait trouvé ça drôle.","Ne pars pas. Je demande, j’ordonne pas. Il y a une différence et tu vas l’ignorer toutes les deux."],
    // B · 2b78bf17f639
    "characters.whitebeard.appearance": "Plus de six mètres, massif et musclé dans sa soixantaine avancée, visage marqué, énorme moustache blanche en croissant vers le haut — jamais de barbe pendante — bandana noir, torse nu et marqué de cicatrices, manteau blanc de capitaine avec épaulettes posé sur les épaules, pantalon clair et ample, ceinture sombre, énormes bottes noires, et le bisento Murakumogiri. Ace paraît petit à côté de lui.",
    // B · 54597749a916
    "characters.whitebeard.visualHook": "La moustache en croissant vers le haut et le manteau porté comme une cape, sur un torse couvert de vieilles cicatrices.",
    // B · bf52387285c6
    "characters.whitebeard.silhouette": "Montagneux. Épaules occupant tout le cadre, croissant dans le ciel, arme verticale.",
    // B · cfea0de35033
    "characters.whitebeard.artSeed": "ace-whitebeard-01",
    // B · c7dd6a8535cf
    "characters.whitebeard.portrait": "story_ace/whitebeard",
    // B · 4297b076afce
    "characters.whitebeard.expressions": ["neutre","rire","grave","furieux","souffrant"],
    // B · f06fae61ee95
    "characters.whitebeard.knowledgeScope": ["whitebeard","pont_moby_dick","les_divisions","teach","roger","le_nouveau_monde","sa_santé"],
    // B · 14227879ac4e
    "characters.whitebeard.gates.wb_offers_the_mark.label": "Il t’offre la marque",
    // B · 9e8ae18bf8bf
    "characters.whitebeard.gates.wb_offers_the_mark.kind": "ALLIANCE",
    // B · 5c5156f89f9d
    "characters.whitebeard.gates.wb_offers_the_mark.requires.flagsSet": ["challenged_whitebeard"],
    // B · 6a46e4223648
    "characters.whitebeard.gates.wb_asks_you_not_to_go.label": "Il te demande — pas t’ordonner — de ne pas poursuivre Teach",
    // B · 55a54e80451a
    "characters.whitebeard.gates.wb_asks_you_not_to_go.kind": "CONFIANCE",
    // B · acd1f8b0f15c
    "characters.whitebeard.gates.wb_asks_you_not_to_go.requires.flagsSet": ["thatch_dead"],
    // B · 96b89d422462
    "characters.whitebeard.combatant.tags": ["gura-gura","haki","l’homme-le-plus-fort","souffrant"],
    // B · c1044be2daec
    "characters.marco.name": "Marco",
    // A · f485ec7f6b01
    "characters.marco.role": "Commandant de la Première Division, médecin du navire, et le frère qui voit le vieux adopter des catastrophes depuis vingt ans",
    // A · 848e11c2e9b1
    "characters.marco.cardBlurb": "Il te recoud après chaque connerie et range ça sans un mot. Il est le seul à bord qui nomme ta fierté à voix haute, d’un ton blasé, pendant qu’il te soigne, et il a toujours raison.",
    // B · fcca6b746d0b
    "characters.marco.pronouns": "il/lui",
    // A · bca4e6c5545e
    "characters.marco.publicTraits": ["Imperturbable","Termine ses phrases par une intonation montante plutôt qu’une emphase","Considère une crise comme un problème d’organisation"],
    // B · 34d8499c429e
    "characters.marco.hiddenDrives": ["Il est celui qui détient les vrais chiffres sur la santé du capitaine et a décidé que la famille fonctionne mieux sans savoir, une décision qu’il revoit chaque semaine","Il a enterré beaucoup de frères plus jeunes et ne se laisse plus surprendre, ce qu’il sait être une forme de blessure"],
    // B · 9eafe92ae094
    "characters.marco.values": ["Compétence appliquée discrètement, sans en tirer de crédit","Que la famille continue d’exister après qu’un individu cesse d’exister"],
    // B · 3605d3d55e26
    "characters.marco.fears": ["Qu’il soit celui qui se retrouve avec quatre cents personnes à gérer","Qu’Ace soit un désastre particulier — le genre qui y va volontairement"],
    // A · a8a1711db8bb
    "characters.marco.socialStyle": "Détendu au point de sembler endormi. Répond à une question criée à demi-voix. Pose une main dans la nuque au lieu de finir sa phrase.",
    // B · 14b9567d41c2
    "characters.marco.boundaries": ["Il ne mentira pas à l’équipage sur l’état du capitaine quand on lui demande directement","Il ne se laissera pas entraîner dans une dispute sur ce qu’Ace devrait faire après qu’Ace l’a fait"],
    // B · 8c6553b02404
    "characters.marco.goals": ["Garder le capitaine debout encore un an","Faire en sorte que le commandant de la Deuxième Division demande de l’aide une fois, officiellement, devant témoins"],
    // B · b76ac674348c
    "characters.marco.secrets.marco_the_numbers.fact": "Il sait à peu près combien de temps il reste à Newgate, et c’est mesuré en quelques années.",
    // B · 47558a04be8d
    "characters.marco.secrets.marco_the_numbers.visibility": "NPC_PRIVATE",
    // B · aa97541d6603
    "characters.marco.secrets.marco_the_numbers.revealHint": "Il le dit franchement à quiconque lui demande directement dans l’infirmerie, et à personne sur le pont.",
    // A · e55bca2ae9a8
    "characters.marco.speechStyle": "Calme, posé, un peu amusé. Il l’appelle « Ace » et parfois « gamin » sans condescendance. Il glisse l’observation dure en aparté tout en bricolant avec ses mains, sans insister.",
    // A · 988a19fe33fa
    "characters.marco.topics": ["la santé du capitaine","les divisions","les points de suture","Teach","la fierté","le Nouveau Monde"],
    // A · abd8d8746c5e
    "characters.marco.voiceSamples": ["Assieds-toi. T’as un trou. On va s’en occuper après que j’aurai fermé le trou.","T’as emmené personne avec toi. Tu prends jamais personne avec toi. J’ai remarqué, le vieux aussi, et je crois que toi aussi.","Il va pas bien. Tu demandes, alors je te dis. Parle pas de ça sur le pont.","Pars si tu veux. Je préfère venir. Personne ici te forcera à nous laisser."],
    // B · dacbc7522a0f
    "characters.marco.appearance": "Homme adulte mince et musclé, cheveux blonds dressés en une couronne distinctive, yeux lourds et fatigués, légère barbe de quelques jours, veste violette ouverte sur un torse nu avec le tatouage de la marque Whitebeard, ceinture pâle, pantalon sombre au genou, sandales. Flammes bleues de phénix uniquement quand il utilise le fruit — pas d’ailes permanentes et pas de feu orange.",
    // B · 08ec227aec6d
    "characters.marco.visualHook": "La couronne blonde dressée et les yeux fatigués, et la flamme bleue là où le feu devrait être orange.",
    // B · 1ea808471347
    "characters.marco.silhouette": "Détendu et ample, veste ouverte et pendante, forme de cheveux distinctive sur le dessus.",
    // B · 3d0258d30ea0
    "characters.marco.artSeed": "ace-marco-01",
    // B · a1fdbf648cd4
    "characters.marco.portrait": "story_ace/marco",
    // B · f96ec71ab6b7
    "characters.marco.expressions": ["neutre","endormi","inquiet","sérieux","enflammé"],
    // B · 7002ff7fb47b
    "characters.marco.knowledgeScope": ["marco","whitebeard","whitebeard_medical","the_divisions","teach","his_health","moby_dick_deck"],
    // B · 840ad0ab5ae9
    "characters.marco.gates.marco_tells_you_the_numbers.label": "Il te dit combien de temps il reste au vieux",
    // B · 55a54e80451a
    "characters.marco.gates.marco_tells_you_the_numbers.kind": "CONFIANCE",
    // B · 4960b58525ec
    "characters.marco.gates.marco_tells_you_the_numbers.requires.flagsSet": ["whitebeard_commander"],
    // B · 7220553874d6
    "characters.marco.gates.marco_comes_with_you.label": "Il viendra à Banaro si tu demandes",
    // B · 9e8ae18bf8bf
    "characters.marco.gates.marco_comes_with_you.kind": "ALLIANCE",
    // B · acd1f8b0f15c
    "characters.marco.gates.marco_comes_with_you.requires.flagsSet": ["thatch_dead"],
    // B · 344a8a93b524
    "characters.marco.combatant.tags": ["phénix","haki","régénération","première-division"],
    // B · c5663b86ce2e
    "characters.thatch.name": "Thatch",
    // A · 817a97007d6c
    "characters.thatch.role": "Commandant de la Quatrième Division, il gère la cuisine et c’est grâce à lui que quatre cents personnes à bord se connaissent",
    // A · 6dd7e0f9df0d
    "characters.thatch.cardBlurb": "Il nourrit tout le monde deux fois par jour et se souvient de ce que chacun refuse de manger. C’est la présence la plus chaleureuse du navire et celui dont la mort fait basculer l’histoire vers la plate-forme. Si tu n’as jamais mangé avec lui, cette mort reste un élément de l’intrigue, pas une perte.",
    // B · fcca6b746d0b
    "characters.thatch.pronouns": "il/lui",
    // A · 2fc9c8f719be
    "characters.thatch.publicTraits": ["Nourrit les gens comme moyen de persuasion","Connaît le nom de chacun et ses points faibles","Farces d’une ambition folle"],
    // B · 579f6ee0648b
    "characters.thatch.hiddenDrives": ["Il est la manière officieuse du navire pour repérer qui galère, et il le fait en cuisinant plutôt qu’en demandant, volontairement","Il a un mauvais pressentiment sur Teach qu’il n’a jamais assez confirmé pour en parler à qui que ce soit"],
    // B · f7ed53b13767
    "characters.thatch.values": ["Personne ne mange seul sur son bateau","Une famille choisie est une vraie famille, jusque dans la part la plus grosse"],
    // B · 3d533e66ca20
    "characters.thatch.fears": ["Un commandant de division qu’il ne peut pas atteindre","Être celui qui a remarqué quelque chose et n’a rien dit"],
    // A · 488ca545cf61
    "characters.thatch.socialStyle": "Bruit joyeux constant, toujours en train de faire trois choses à la fois, il entraîne dans les conversations même ceux qui passaient à côté. Physique, chaleureux, totalement sans cérémonie.",
    // B · 7d996c178308
    "characters.thatch.boundaries": ["Il ne laisse personne sauter un repas pour bouder","Il ne répète pas ce qu’on lui dit dans la cuisine"],
    // B · ee78b4048080
    "characters.thatch.goals": ["Nourrir quatre cents hommes deux fois aujourd’hui","Faire asseoir le nouveau commandant pour manger avec l’équipage plutôt que près d’eux"],
    // B · 1d40b88ac754
    "characters.thatch.secrets.thatch_unease_about_teach.fact": "Il a remarqué Teach poser des questions précises sur les Fruits du Démon depuis des années et n’en a jamais parlé, parce que ça ne semblait rien quand il le disait à voix haute.",
    // B · 47558a04be8d
    "characters.thatch.secrets.thatch_unease_about_teach.visibility": "NPC_PRIVATE",
    // B · ce0b1c2a26b4
    "characters.thatch.secrets.thatch_unease_about_teach.revealHint": "Il en parle en blague dans la cuisine, une fois, à quiconque a assez mangé là pour être assis avec plutôt que servi.",
    // A · d9abed480221
    "characters.thatch.speechStyle": "Fort, chaleureux, il parle en chevauchant les mots, pose plein de questions sans attendre de réponse. Traite « commandant » avec ironie et dit « Ace » quand ça compte. Parle de sentiments uniquement en termes de nourriture.",
    // A · a5fea79111fc
    "characters.thatch.topics": ["nourriture","équipage","divisions","blagues","qui n’a pas mangé","Fruits du Démon"],
    // A · 785ceb0dcf44
    "characters.thatch.voiceSamples": ["Assieds-toi. Là. Non, là, à côté de lui, parce que vous n’avez pas échangé un mot depuis un mois et j’en ai marre.","Tu ne manges pas quand tu es en colère. Tout le monde sur ce bateau mange quand il est en colère. C’est l’idée même de cette pièce.","Teach m’a encore demandé des fruits. Troisième fois cette année. Ce gars a un hobby.","Commandant. Commandant. Regarde comme je suis respectueux. Prends le bol."],
    // B · f119e5dbaba0
    "characters.thatch.appearance": "Homme adulte solidement bâti avec une coiffure sombre distinctive en banane balayée, visage ouvert et facile, tenue de cuisinier portée lâche sur des vêtements de pirate, manches retroussées, toujours quelque chose à la main. Utilise le design officiel plutôt que d’inventer un cuisinier générique à partir du nom.",
    // B · 2eefed5ebacb
    "characters.thatch.visualHook": "Les cheveux balayés et une louche utilisée comme pointeur.",
    // B · ab9c7e808c7b
    "characters.thatch.silhouette": "Large, penché en avant, bras occupés, forme de cheveux distinctive.",
    // B · 8ee71e34a152
    "characters.thatch.artSeed": "ace-thatch-01",
    // B · 1a73f18f9a1f
    "characters.thatch.portrait": "story_ace/thatch",
    // B · 160f0f27f906
    "characters.thatch.expressions": ["neutre","rire","complice","sérieux","mourant"],
    // B · a85393d2ca8f
    "characters.thatch.knowledgeScope": ["thatch","moby_dick_mess","the_divisions","teach","the_crew"],
    // B · fabb3176b813
    "characters.thatch.gates.thatch_mentions_teach.label": "Il parle de Teach et des fruits",
    // B · 55a54e80451a
    "characters.thatch.gates.thatch_mentions_teach.kind": "CONFIANCE",
    // B · 3df3757db204
    "characters.thatch.combatant.tags": ["haki","quatrième-division"],
    // B · 12e8d758bdb2
    "characters.teach.name": "Marshall D. Teach",
    // A · 27856e123afe
    "characters.teach.role": "Un homme de la Deuxième Division sous ton commandement, patient depuis des décennies, et la seule personne à bord qui croit exactement ce que tu crois et en tire la conclusion inverse",
    // A · 2f5583908d4d
    "characters.teach.cardBlurb": "Il est bruyant, amical, vraiment drôle, et attend depuis des années une occasion précise. Il pense qu’un homme doit vivre sans regrets, ce que tu penses aussi. Toi, tu attaches les tiens aux gens. Lui, à ce qui se trouve devant lui.",
    // B · fcca6b746d0b
    "characters.teach.pronouns": "il/lui",
    // A · 39b1e3b2cc1f
    "characters.teach.publicTraits": ["Rire énorme, utilisé sans arrêt et comme cache-sexe","Est d’accord avec tout le monde","Parle sincèrement des rêves qui ne meurent jamais"],
    // B · 78d8a1b78d56
    "characters.teach.hiddenDrives": ["Il cherche un Fruit du Démon en particulier depuis presque toute sa vie d’adulte et il est resté sur ce bateau parce que c’est la meilleure place au monde pour le trouver","Il est totalement sincère dans sa philosophie et prêt à tuer un ami pour l’occasion, sans voir de contradiction entre les deux"],
    // B · 07d5d2fa2c03
    "characters.teach.values": ["Vivre sans regrets, ce qu’il pense vraiment et a réfléchi plus sérieusement que la plupart des gens sur ce bateau","La patience — des années de patience — comme vraie compétence"],
    // B · 82ef11b83b5c
    "characters.teach.fears": ["La douleur, qu’il ressent plus que la plupart des hommes et cache mal","Mourir comme un homme ordinaire, après avoir attendu toute sa vie et l’avoir ratée"],
    // A · 8d9071e1eb7a
    "characters.teach.socialStyle": "Il tape dans le dos, trop familier, se souvient de tes affaires et les ramène avec chaleur. Ce n’est jamais lui qui lance un sujet. Il rit le plus longtemps à la blague qui en dit le plus.",
    // B · 31566102b0a1
    "characters.teach.boundaries": ["Il ne se laisse pas embarquer dans une conversation sérieuse qu’il n’a pas commencée","Il ne se met jamais là où on peut le coincer"],
    // B · 7d15868b06c5
    "characters.teach.goals": ["Trouver le Yami Yami no Mi","Rester à bord, utile et discret, aussi longtemps que ça prendra"],
    // B · 16d198141abf
    "characters.teach.secrets.teach_hunting_a_fruit.fact": "Il sait ce qu’est le Yami Yami no Mi, ce qu’il fait, et à peu près où un tel fruit peut apparaître, et il a organisé vingt ans de sa vie pour être là quand ça arrive.",
    // B · 47558a04be8d
    "characters.teach.secrets.teach_hunting_a_fruit.visibility": "NPC_PRIVATE",
    // B · 05079b2a763d
    "characters.teach.secrets.teach_hunting_a_fruit.revealHint": "Rien de ce qu’il dit ne le trahit. La remarque de Thatch dans la cuisine, les manifestes du bateau, ou lui poser deux fois en une semaine une question précise sur les fruits.",
    // B · f1f928caf3dd
    "characters.teach.secrets.teach_will_kill_for_it.fact": "Il a déjà décidé qu’il tuera celui qui le possède, et il le sait depuis des années sans en souffrir.",
    // B · 97d1bcd768a7
    "characters.teach.secrets.teach_will_kill_for_it.visibility": "CREATOR_ONLY",
    // B · e8aa8faf0003
    "characters.teach.secrets.teach_will_kill_for_it.revealHint": "Impossible à découvrir avant. Ça se saura la nuit où Thatch meurt, pas avant.",
    // A · b7e0c55e1416
    "characters.teach.speechStyle": "Voix forte, traînante, trop chaleureuse, avec le rire déjà dans la phrase. Il l’appelle « commandant » avec juste ce qu’il faut pour pouvoir faire marche arrière. Il dit la vérité philosophique clairement, puis la balaie d’un rire, à chaque fois.",
    // A · 84a7f00acf77
    "characters.teach.topics": ["rêves","Fruits du Démon","l’équipe","la chance","la mer","ce qu’un homme mérite"],
    // A · 0eb24ca2cfd8
    "characters.teach.voiceSamples": ["Zehahaha ! Les rêves des gens ne finissent jamais, commandant. Personne sur ce bateau ne le sait mieux que toi.","Vingt ans que je suis sur ce bateau. Vingt. Tu crois qu’un homme fait ça sans raison ?","Tu tiens un sacré truc. Un sacré truc.","Toi et moi, on est le même animal. Toi, tu le mets dans les gens."],
    // B · 6a68a43b2beb
    "characters.teach.appearance": "Un homme adulte énorme et lourd, cheveux noirs bouclés, barbe noire en bataille, dents manquantes et inégales, large sourire constant, vêtements de pirate ouverts sur un torse nu, bijoux lourds et colliers. Sa silhouette doit être laide, énorme et inratable — pas de refonte élégante de méchant.",
    // B · 86838d3e3887
    "characters.teach.visualHook": "Le sourire édenté, un peu trop long.",
    // B · e1bb2f1178fc
    "characters.teach.silhouette": "Enorme et irrégulière, épaules voûtées en avant, cheveux en masse sombre.",
    // B · e2b4d7ff05ca
    "characters.teach.artSeed": "ace-teach-01",
    // B · 32ee68d2d6b7
    "characters.teach.portrait": "story_ace/teach",
    // B · ba5195a1ae34
    "characters.teach.expressions": ["neutre","rire","passionné","douleur","froid"],
    // B · bdf81b2bd9cb
    "characters.teach.knowledgeScope": ["teach","moby_dick_deck","the_divisions","devil_fruits","the_crew"],
    // B · 96360844cb1c
    "characters.teach.gates.teach_talks_philosophy.label": "Il dit ce qu’il croit vraiment",
    // B · 77dcad9b37cc
    "characters.teach.gates.teach_talks_philosophy.kind": "OTHER",
    // B · 4960b58525ec
    "characters.teach.gates.teach_talks_philosophy.requires.flagsSet": ["whitebeard_commander"],
    // B · a9f7ae9738e6
    "characters.teach.combatant.tags": ["patient","second-division","sensible-à-la-douleur"],
    // B · 073aac7ab67c
    "characters.jinbe.name": "Jinbe",
    // A · c4a1b06d7a48
    "characters.jinbe.role": "Un homme-poisson d’une force énorme qui t’a tenu en échec pendant cinq jours et te considère comme un ami depuis.",
    // A · 5459aac5395b
    "characters.jinbe.cardBlurb": "Aucun de vous n’a pu lâcher prise, aucun n’a reculé, et à la fin il a décidé que tu valais la guerre. C’est la personne la plus posée de cette histoire, et la seule à te dire franchement que mourir n’est pas gagner.",
    // B · fcca6b746d0b
    "characters.jinbe.pronouns": "il/lui",
    // A · f931abd9f89c
    "characters.jinbe.publicTraits": ["Une courtoisie formelle en toutes circonstances","Ne frappe jamais le premier","Immuable une fois en place"],
    // B · 1cccd87a1d38
    "characters.jinbe.hiddenDrives": ["Il porte des obligations d’une vie d’avant et mesure chaque allégeance à leur aune","Il veut qu’Ace comprenne que sa mort serait un coût pour d’autres, et a compris que le dire directement ne marcherait pas"],
    // B · 32beeebbbbb8
    "characters.jinbe.values": ["Une obligation honorée quoi qu’elle coûte socialement","Ne pas faire peser la conscience des autres sur sa propre conscience"],
    // B · 5d6267d62910
    "characters.jinbe.fears": ["Être forcé de choisir entre deux promesses faites","Voir un jeune homme qu’il respecte foncer dans quelque chose d’évitables"],
    // A · 457ff1599a2f
    "characters.jinbe.socialStyle": "Sérieux, courtois, sans se presser. Il utilise les titres complets. Il s’assoit avant une discussion difficile et reste assis. Il n’a aucune gêne à être sincère.",
    // B · 2addda980187
    "characters.jinbe.boundaries": ["Il ne rompt jamais une parole donnée, même quand c’est gênant","Il ne combat pas quelqu’un qui a arrêté de se battre contre lui"],
    // B · f161d7cba324
    "characters.jinbe.goals": ["Garder ce gars en vie quoi qu’il décide de faire","Honorer toutes ses obligations à la fois, ce qui finira par être impossible"],
    // A · 79e3a911e10d
    "characters.jinbe.speechStyle": "Mesuré, formel, complet. Il l’appelle « Ace-san ». Ses phrases sont longues et calmes, avec la partie importante à la fin. Il ne coupe jamais et ne comble pas le silence à la hâte.",
    // A · ba4588d8dd30
    "characters.jinbe.topics": ["obligation","la mer","Barbe Blanche","force","ce qui est dû","la guerre"],
    // A · c3e56aeb78d6
    "characters.jinbe.voiceSamples": ["Cinq jours, Ace-san. Aucun de nous n’a pu finir. J’y ai pensé plus que je n’ai pensé à la plupart des victoires.","T’es pas obligé de mourir pour valoir quelque chose. Je sais que tu vas faire comme si je disais rien. Je le dis quand même.","J’ai donné ma parole dans deux directions. L’une va céder, et je préfèrerais pas que ce soit celle qui te retient.","Assieds-toi. Ça va prendre un moment et ça mérite pas qu’on crie."],
    // B · f042c33194b3
    "characters.jinbe.appearance": "Un énorme homme-poisson requin-baleine bleu avec une carrure massive de sumo, peau bleue, crocs inférieurs en forme de défense, favoris et sourcils jaunes, une cicatrice près de l’œil gauche, cheveux foncés en chignon, kimono traditionnel, sandales. Pas un humain bleu — les proportions et traits sont ceux d’un homme-poisson.",
    // B · ce352b3c9e72
    "characters.jinbe.visualHook": "Les crocs et la cicatrice, et le calme d’une très grande personne qui n’a jamais besoin de le montrer.",
    // B · 143816b077fb
    "characters.jinbe.silhouette": "Très large et basse, robe tombant en lourdes lignes, chignon au sommet.",
    // B · edc63412951b
    "characters.jinbe.artSeed": "ace-jinbe-01",
    // B · 23429d02635b
    "characters.jinbe.portrait": "story_ace/jinbe",
    // B · 97b6d795750b
    "characters.jinbe.expressions": ["neutre","grave","tendre","résolu","en deuil"],
    // B · 07b815107960
    "characters.jinbe.knowledgeScope": ["jinbe","la_mer","barbe_blanche","seigneurs_de_la_guerre","impel_down","hommes-poissons"],
    // B · 131166b6c529
    "characters.jinbe.gates.jinbe_will_come_for_you.label": "Il viendra te chercher, où que tu sois",
    // B · 9e8ae18bf8bf
    "characters.jinbe.gates.jinbe_will_come_for_you.kind": "ALLIANCE",
    // B · 655fde274040
    "characters.jinbe.gates.jinbe_will_come_for_you.requires.flagsSet": ["attaqué :jinbe"],
    // B · f58cf762a10d
    "characters.jinbe.combatant.tags": ["karaté-homme-poisson","haki","immobile"],
    // B · 6a5e26a25a92
    "characters.akainu.name": "Sakazuki",
    // A · 461776dfb7ee
    "characters.akainu.role": "Un amiral de la Marine qui t’a lu comme dans un livre, et qui sait que le moyen le plus rapide de tuer un homme fier, c’est de toucher à son père",
    // A · a0438d16ac3a
    "characters.akainu.cardBlurb": "Il te déteste pas. Il t’a évalué, repéré le mécanisme, et compte s’en servir parce qu’il croit que la dernière guerre a eu lieu parce que quelqu’un a eu pitié. Il va insulter l’homme qui t’a choisi, et il restera parfaitement calme en le faisant.",
    // B · fcca6b746d0b
    "characters.akainu.pronouns": "il/lui",
    // A · 43d8310af1d7
    "characters.akainu.publicTraits": ["Absolu et calme","Annonce les conséquences, pas les menaces","Tue les déserteurs, même les siens"],
    // B · 9ed033d78569
    "characters.akainu.hiddenDrives": ["Il croit que tout pirate laissé en vie est une guerre future, et il a calculé combien de vies ça coûte, et ce calcul n’est pas manifestement faux","Il a identifié la fierté comme la faille exploitable chez ce prisonnier en particulier et a préparé la phrase qu’il compte utiliser"],
    // B · 03f43c59d443
    "characters.akainu.values": ["Justice sans exception, appliquée à lui-même autant qu’à n’importe qui","Empêcher la prochaine guerre en mettant fin complètement à celle-ci"],
    // B · 1d53e306646a
    "characters.akainu.fears": ["Un compromis. Tout ce qui laisse le problème en partie vivant"],
    // A · a2d09979839c
    "characters.akainu.socialStyle": "Plat, posé, sans monter la voix. Il se vante pas, il explique pas. Il balance la provocation sur le même ton qu’un ordre, et c’est pour ça que ça marche.",
    // B · 553887ace1de
    "characters.akainu.boundaries": ["Ne négocie pas pour un prisonnier","Ne se laisse presser par personne, y compris sa propre hiérarchie"],
    // B · ebb5d132ae76
    "characters.akainu.goals": ["Mettre fin à l’ère Barbe Blanche ici et maintenant","S’assurer que la démonstration soit complète et pas seulement réussie"],
    // B · 87e2e187de0c
    "characters.akainu.secrets.akainu_reads_pride.fact": "Il a lu le dossier et conclu que le prisonnier ne peut pas laisser une insulte à Newgate sans réponse, et il a prévu ça.",
    // B · 97d1bcd768a7
    "characters.akainu.secrets.akainu_reads_pride.visibility": "CREATOR_ONLY",
    // B · 5892adfc8815
    "characters.akainu.secrets.akainu_reads_pride.revealHint": "Impossible de l’apprendre directement de lui. Une source Marine, un ordre intercepté, ou quelqu’un qui a servi sous ses ordres.",
    // A · 539ee6e76e36
    "characters.akainu.speechStyle": "Court, neutre, tranchant. Pas d’exclamation, pas de plaisir à insulter. Il l’appelle « Portgas » ou « le prisonnier ». L’insulte est posée comme une vérité sur une époque morte, c’est justement ce qui la frappe.",
    // A · 438aadb579e4
    "characters.akainu.topics": ["justice","l’époque","Barbe-Blanche","le Gouvernement","ce qui doit être fini"],
    // A · c77922f3bbb4
    "characters.akainu.voiceSamples": ["Portgas. Aujourd’hui tu n’es plus un homme, t’es une démonstration, et les démonstrations ont le droit de courir.","Ton capitaine était un raté qui confondait un équipage avec une famille. Son époque s’arrête ici, et elle finit mal, comme il faut.","Fuir. Bien sûr. C’est ce que font ses fils.","La pitié, c’est comme ça que la dernière guerre a commencé. Je serai pas la raison de la prochaine."],
    // B · af28a333f639
    "characters.akainu.appearance": "Très grand, large et très musclé, visage carré et sévère, cheveux courts et foncés, casquette blanche d’amiral Marine, chemise rouge foncé à motifs floraux visible sous un manteau blanc de justice porté sur les épaules, expression sévère. Effets de magma en rouge foncé, orange et noir uniquement quand il utilise son fruit — pas de forme lave permanente.",
    // B · afe753c6c78c
    "characters.akainu.visualHook": "Le manteau blanc sur une chemise fleurie, et un visage qui n’a jamais été surpris.",
    // B · 0f2a40001914
    "characters.akainu.silhouette": "Carré et massif, manteau tombant droit des épaules, casquette plate sur le front.",
    // B · 8ef270ec369b
    "characters.akainu.artSeed": "ace-akainu-01",
    // B · 1e5e05356a71
    "characters.akainu.portrait": "story_ace/akainu",
    // B · d77d15f3fdad
    "characters.akainu.expressions": ["neutre","sévère","méprisant","implacable"],
    // B · 90380e343031
    "characters.akainu.knowledgeScope": ["akainu","les_marines","gouvernement_mondial","champ_de_bataille_marineford","barbe_blanche","roger"],
    // B · bf27e703f756
    "characters.akainu.combatant.tags": ["magu-magu","haki","amiral","logia"],
    // B · 7e1821bf58f1
    "characters.shanks.name": "Shanks le Roux",
    // A · 796ed4d5b15d
    "characters.shanks.role": "Un empereur des mers qui a filé un chapeau à ton petit frère, et qui change complètement de personne dès que son nom est prononcé",
    // A · 17b913efe8d7
    "characters.shanks.cardBlurb": "Tu venais pour le remercier, ou pour le jauger, ou les deux, et tu t’attendais à un monstre. Puis t’as dit le nom de Luffy et la pièce a changé. C’est la seule personne de cette histoire qui traite ta lignée célèbre comme normale, parce qu’il a déjà croisé des gens comme ça. ",
    // B · fcca6b746d0b
    "characters.shanks.pronouns": "il/lui",
    // A · 261cc3fc8387
    "characters.shanks.publicTraits": ["Détendu au point d’en être impoli","Boit avec n’importe qui","Une présence énorme dont il ne parle jamais"],
    // B · 19cfa99464c0
    "characters.shanks.hiddenDrives": ["Il essaie de comprendre ce que devient le garçon au chapeau, et prend des nouvelles de lui partout","Il connaissait Roger et a décidé que le fils n’est pas un problème à gérer, ce qui le met en désaccord avec la plupart du monde"],
    // B · fd3ae2b71fdf
    "characters.shanks.values": ["Ne pas faire porter à un jeune une légende qu’il n’a pas demandée","Boire avec les gens plutôt que de parler d’eux"],
    // B · 722d95eada1a
    "characters.shanks.fears": ["Perdre une autre ère à cause du même débat"],
    // A · 0e3ca7b98d2f
    "characters.shanks.socialStyle": "Sympathique, pas sérieux, naturel dans ses gestes, et brusquement évident quand ça compte. Transforme une confrontation en un verre sans qu’on voie comment.",
    // B · 9cff9d60a7af
    "characters.shanks.boundaries": ["Ne combattra pas quelqu’un venu le remercier","Ne discutera pas de ce que Roger lui a dit"],
    // B · 7188a5e67bfe
    "characters.shanks.goals": ["Savoir comment va le garçon","Renvoyer celui-ci dans un meilleur état qu’à son arrivée"],
    // B · 25617bb85e65
    "characters.shanks.secrets.shanks_knew_roger.fact": "Il a navigué sous Roger et était à bord à la fin. Il sait exactement de qui est ce fils et le sait depuis avant qu’Ace arrive.",
    // B · 47558a04be8d
    "characters.shanks.secrets.shanks_knew_roger.visibility": "NPC_PRIVATE",
    // B · 3988c6fc89c5
    "characters.shanks.secrets.shanks_knew_roger.revealHint": "Il le confirmera facilement mais refusera d’en dire plus, ce qui est plus perturbant que le refus de quelqu’un qui cache ça.",
    // A · 7da4b04efa73
    "characters.shanks.speechStyle": "Décontracté, amusé, comme en conversation, verre à la main. Utilise les noms avec chaleur. Lâche un truc énorme en passant et enchaîne direct sur une autre question à propos de Luffy.",
    // A · 078d4355e6e8
    "characters.shanks.topics": ["Luffy","le chapeau","la boisson","Roger","l’ère","Barbe-Blanche"],
    // A · db05337f1de3
    "characters.shanks.voiceSamples": ["Attends — Luffy ? Chapeau de paille, volume au max, mange comme un assiégé ? Assieds-toi. Assieds-toi, tu prends un verre avec moi.","Tu as sa tête quand tu es agacé. Pas ses yeux. Les siens, sûrement. En tout cas — bois.","Je vais pas me battre avec toi. T’es venu me remercier. C’est une raison terrible pour frapper quelqu’un.","Ce que Roger m’a dit, c’est à moi. Le reste, tu peux l’avoir."],
    // B · 5a557ae709cb
    "characters.shanks.appearance": "Homme adulte aux cheveux rouges, trois cicatrices parallèles sur l’œil gauche, bras gauche manquant à l’épaule dans la chronologie actuelle, manteau noir porté ouvert, chemise ample ouverte, ceinture, l’épée Gryphon à la hanche. Posture détendue et présence énorme — jamais un épéiste roux générique.",
    // B · cf3de25a8b6e
    "characters.shanks.visualHook": "Trois cicatrices sur un œil, et une manche vide que personne ne commente.",
    // B · 1cb7603074ec
    "characters.shanks.silhouette": "Manteau asymétrique là où le bras manque, cheveux lâchés, poids sur une hanche.",
    // B · 4073cb70b2ef
    "characters.shanks.artSeed": "ace-shanks-01",
    // B · eec3b4fffa63
    "characters.shanks.portrait": "story_ace/shanks",
    // B · a0a8e6172415
    "characters.shanks.expressions": ["neutre","ravi","sérieux","ivre","formidable"],
    // B · 6ad6dfaaa8b6
    "characters.shanks.knowledgeScope": ["shanks","luffy","le_chapeau","roger","l_ère","barbe_blanche","port_grand_line"],
    // B · ed9cb071a202
    "characters.shanks.gates.shanks_confirms_roger.label": "Il confirme qu’il a navigué avec ton père",
    // B · 55a54e80451a
    "characters.shanks.gates.shanks_confirms_roger.kind": "CONFIANCE",
    // B · ad39c47eda03
    "characters.shanks.gates.shanks_confirms_roger.requires.flagsSet": ["parlé :shanks"],
    // B · dcd31c999ca4
    "characters.shanks.combatant.tags": ["haki_du_conquérant","empereur","épéiste"],
    // B · 803b9a2bf975
    "factions.faction_dadan.name": "La famille Dadan",
    // B · e034afbfa0aa
    "factions.faction_dadan.description": "Neuf bandits de montagne contraints par un vice-amiral des Marines à élever deux enfants, et qui n’ont jamais laissé personne l’oublier. Ils râlent, ils menacent, et ils descendent armés de la montagne quand les enfants sont en retard.",
    // B · 0bb9fbe10050
    "factions.faction_dadan.enemies": ["faction_goa_nobility"],
    // B · b97c7562fdea
    "factions.faction_whitebeard.name": "Les Pirates de Barbe Blanche",
    // B · 63482082de74
    "factions.faction_whitebeard.description": "Seize divisions, plus de quatre cents hommes, et un vieil homme qui appelle chacun d’eux son fils et le pense vraiment. La seule organisation de cette histoire qui soit d’abord une famille, et une force ensuite, ce qui la rend aussi vulnérable.",
    // B · 7ac9bbc4e7e6
    "factions.faction_whitebeard.allies": ["faction_spade"],
    // B · 834614865068
    "factions.faction_whitebeard.enemies": ["faction_marines","faction_world_government"],
    // B · b8f4c830d01a
    "factions.faction_spade.name": "Les Pirates Spade",
    // B · 4793af59aec3
    "factions.faction_spade.description": "Moins de cinquante personnes qui ont décidé qu’un ado valait la peine d’être suivi jusqu’au Nouveau Monde. Quoi qu’Ace devienne plus tard, cette équipe l’a choisi avant qu’il y ait quoi que ce soit à choisir.",
    // B · 26092992aa01
    "factions.faction_spade.allies": ["faction_whitebeard"],
    // B · 4a67f3431fea
    "factions.faction_spade.enemies": ["faction_marines"],
    // B · e53d64359b56
    "factions.faction_marines.name": "Les Marines",
    // B · 00d35ecbc66e
    "factions.faction_marines.description": "L’instrument armé du Gouvernement Mondial, avec un vice-amiral qui veut que ce garçon mène une vie ordinaire, et un amiral qui croit que la pitié a déclenché la dernière guerre.",
    // B · 0a5f9dfde7ca
    "factions.faction_marines.allies": ["faction_world_government"],
    // B · f6b8131f8d10
    "factions.faction_marines.enemies": ["faction_whitebeard","faction_spade","faction_revolutionaries"],
    // B · 51d79d5071eb
    "factions.faction_world_government.name": "Le Gouvernement Mondial",
    // B · 4ab5f24828cd
    "factions.faction_world_government.description": "Ce truc qui a cherché une femme enceinte dans South Blue pendant vingt mois. Il ne veut pas la mort d’Ace pour ce qu’il a fait, il veut la démonstration, et ça fait longtemps, depuis avant sa naissance.",
    // B · 3f356d31ac36
    "factions.faction_world_government.allies": ["faction_marines","faction_goa_nobility"],
    // B · 084323623c1c
    "factions.faction_world_government.enemies": ["faction_whitebeard","faction_revolutionaries"],
    // B · 066999d11ab4
    "factions.faction_revolutionaries.name": "L’Armée Révolutionnaire",
    // B · ffef6aa25abf
    "factions.faction_revolutionaries.description": "Des gens qui ont conclu que le mur entre High Town et le Terminal est tout le problème, et qu’il faut le faire tomber plutôt que de le grimper. Si Sabo vit assez longtemps pour monter sur un certain bateau, ce sera sa réponse.",
    // B · 282f8c594953
    "factions.faction_revolutionaries.enemies": ["faction_world_government","faction_marines","faction_goa_nobility"],
    // B · 3b07fa26fa44
    "factions.faction_goa_nobility.name": "La Noblesse de Goa",
    // B · 43347f959a87
    "factions.faction_goa_nobility.description": "Des familles qui possèdent une ville propre et brûlent la partie qu’elles ne veulent pas voir. Sabo est né dedans et essaie d’en sortir depuis qu’il a huit ans.",
    // B · 0a5f9dfde7ca
    "factions.faction_goa_nobility.allies": ["faction_world_government"],
    // B · c5c34940a78a
    "factions.faction_goa_nobility.enemies": ["faction_dadan","faction_revolutionaries"],
    // B · bd71f26c9a51
    "quests.q_luffy.title": "Celui qui ne rentrera pas à la maison",
    // B · 00a022f64fb3
    "quests.q_luffy.summary": "Il y a un gamin de sept ans à dix mètres derrière toi, et il est là depuis onze jours. T’as essayé de crier, de te cacher, de marcher plus vite, et même une vraie cruauté, et rien n’a marché.",
    // B · 7fcc0be2ad9c
    "quests.q_luffy.kind": "PRINCIPALE",
    // B · 8209ff1df650
    "quests.q_luffy.steps.q_luffy_decide.playerCopy": "Décide ce que Luffy représente pour toi.",
    // B · c67e43d34526
    "quests.q_luffy.steps.q_luffy_decide.directorNotes": "Ne règle pas ça en un instant, et ne laisse pas le monde pousser vers la fraternité. §14 dit clairement que le rejet est une vraie issue durable, et que Luffy peut continuer à essayer quoi qu’il arrive. Si le joueur le repousse, il est toujours là demain, et le dixième jour de rejet doit être vraiment gênant pour tout le monde, y compris le joueur.",
    // B · 64a04dceb89d
    "quests.q_luffy.steps.q_luffy_cups.playerCopy": "Si ça le mérite : trois coupes, dans la cabane dans l’arbre, sans adulte.",
    // B · 8bc276b1328d
    "quests.q_luffy.steps.q_luffy_cups.directorNotes": "§24 — la cérémonie n’a lieu que si la relation le mérite, jamais parce que l’histoire l’attend. Un joueur qui atteint l’âge adulte sans ça a une famille différente, pas un déblocage raté. Si Sabo est déjà parti, deux coupes et une versée, c’est ça.",
    // B · 1e503550f57a
    "quests.q_luffy.steps.q_luffy_cups.enterWhen.flagsSet": ["luffy_accepted"],
    // B · 014218b1d683
    "quests.q_luffy.steps.q_luffy_cups.succeedWhen.hasItems": ["sake_cups"],
    // B · 250a0ac07183
    "quests.q_luffy.steps.q_luffy_cups.rewards.flags": ["asl_brotherhood"],
    // B · d80828fc4872
    "quests.q_luffy.involvedCharacterIds": ["luffy","sabo","dadan"],
    // B · f4e3a7011a49
    "quests.q_luffy.involvedLocationIds": ["mt_colubo","asl_treehouse","dadan_house"],
    // B · 7c9562eb4400
    "quests.q_luffy.knownRewardCopy": "Quoi qu’il devienne pour toi.",
    // B · c5f709440b14
    "quests.q_sabo_departure.title": "Le Bateau de High Town",
    // B · 4bcb0561ce66
    "quests.q_sabo_departure.summary": "Sabo est bizarre depuis toute la semaine. Un Noble Mondial arrive à Goa, des hommes nettoient le Terminal, et une famille de l’autre côté du mur ne l’a jamais cessé de le chercher.",
    // B · 7fcc0be2ad9c
    "quests.q_sabo_departure.kind": "PRINCIPALE",
    // B · 369fdde6898f
    "quests.q_sabo_departure.discoverWhen.flagsSet": ["parlé :sabo"],
    // B · 093cd0d06ef2
    "quests.q_sabo_departure.discoverWhen.flagsUnset": ["sabo_mort","sabo_parti"],
    // B · 1dd99de9b2e7
    "quests.q_sabo_departure.steps.q_sabo_know.playerCopy": "Découvre ce que Sabo te cache.",
    // B · 24e768b7ede0
    "quests.q_sabo_departure.steps.q_sabo_know.directorNotes": "Il garde deux secrets : de quelle maison il vient, et ce qu’il a entendu sur le Terminal. Le presser sur le Terminal donne un mensonge. Le presser sur son comportement étrange finit par donner la vérité. Ne laisse pas le narrateur révéler ça.",
    // B · 369fdde6898f
    "quests.q_sabo_departure.steps.q_sabo_know.succeedWhen.flagsSet": ["parlé :sabo"],
    // B · c78446ad2b8d
    "quests.q_sabo_departure.steps.q_sabo_know.rewards.flags": ["sait_pour_le_brûlé"],
    // B · 479d4a4ecea9
    "quests.q_sabo_departure.steps.q_sabo_sea.playerCopy": "Sabo monte sur un bateau. Décide ce qu’il en advient.",
    // B · 77539c6f8fc9
    "quests.q_sabo_departure.steps.q_sabo_sea.directorNotes": "LE tournant de l’enfance. §37 dit que le joueur peut le sauver et §136 interdit de le tuer autrement après. S’il survit, il partira probablement quand même — §38 — et partir vivant, c’est une blessure complètement différente de la noyade. Ne laisse pas la voie du sauvetage être aussi celle où il reste ; ce serait trop facile par rapport au prix ailleurs.",
    // B · c78446ad2b8d
    "quests.q_sabo_departure.steps.q_sabo_sea.enterWhen.flagsSet": ["sait_pour_le_brûlé"],
    // B · 7b0edf43deea
    "quests.q_sabo_departure.involvedCharacterIds": ["sabo","luffy","dadan"],
    // B · 7c9bd61bc8c4
    "quests.q_sabo_departure.involvedLocationIds": ["terminal_gris","ville_haute_goa","rivage_aube","cabane_arbre_asl"],
    // B · 65c39183c738
    "quests.q_sabo_departure.knownRewardCopy": "S’il est sur l’eau quand ça arrive.",
    // B · dd09efa85efa
    "quests.q_leaving.title": "Dix-sept ans",
    // B · 71d953d39c69
    "quests.q_leaving.summary": "La boîte est pleine depuis des années. Tu as dit que tu partirais à dix-sept ans, tu as dix-sept ans, et la seule question qui reste, c’est combien de personnes sont dans le bateau.",
    // B · 7fcc0be2ad9c
    "quests.q_leaving.kind": "PRINCIPALE",
    // B · 7fa7a02b84af
    "quests.q_leaving.discoverWhen.flagsUnset": ["parti_île_aube"],
    // B · 6b33b94d283c
    "quests.q_leaving.steps.q_leaving_go.playerCopy": "Quitte l’île de l’Aube.",
    // B · 5fabd242d46a
    "quests.q_leaving.steps.q_leaving_go.directorNotes": "§41 permet d’emmener Luffy, ce qui change beaucoup la suite — un dix-sept ans et un quatorze ans en mer ensemble changent chaque scène d’équipage après et ça ne doit pas être corrigé en douce. Dadan ne vient pas au rivage et est visible sur la crête. Garp sait et ne l’arrête pas, et ça lui coûte quelque chose.",
    // B · 38a79d1665d2
    "quests.q_leaving.involvedCharacterIds": ["luffy","dadan","garp","sabo"],
    // B · bf62e90c538a
    "quests.q_leaving.involvedLocationIds": ["rivage_aube","maison_dadan","cabane_arbre_asl"],
    // B · 09c93b01a590
    "quests.q_leaving.knownRewardCopy": "La mer, et qui est dessus avec toi.",
    // B · 3bdf1378d805
    "quests.q_sixis.title": "L’île où aucun de vous ne voulait être",
    // B · bd83854fd7dc
    "quests.q_sixis.summary": "Tu es échoué, il y a un autre homme ici, et il ne veut pas être pirate. Il y a aussi une caisse sur la plage avec un fruit dedans.",
    // B · 7fcc0be2ad9c
    "quests.q_sixis.kind": "PRINCIPALE",
    // B · 7fa7a02b84af
    "quests.q_sixis.discoverWhen.flagsSet": ["parti_île_aube"],
    // B · c0f2c138a5ef
    "quests.q_sixis.discoverWhen.atLocation": "sixis",
    // B · ebd26fc7586b
    "quests.q_sixis.steps.q_sixis_deuce.playerCopy": "Fais rester Deuce.",
    // B · f40f5f06a244
    "quests.q_sixis.steps.q_sixis_deuce.directorNotes": "§43 — il rencontre Ace avant la légende, et ça ne veut dire quelque chose que s’il est d’abord pas impressionné. Il doit refuser au moins deux fois pour des raisons concrètes et pratiques, et être convaincu par quelque chose qu’Ace fait, pas par ce qu’il dit.",
    // B · eed4e2c3d436
    "quests.q_sixis.steps.q_sixis_deuce.rewards.flags": ["pirates_pique_formés"],
    // B · d5c1efa9a246
    "quests.q_sixis.steps.q_sixis_fruit.playerCopy": "Décide ce qu’il advient du Mera Mera no Mi.",
    // B · 560aa98b41f9
    "quests.q_sixis.steps.q_sixis_fruit.directorNotes": "§45 et §46. Quatre vraies options, pas de choix par défaut. S’il ne le mange pas, le monde s’adapte — c’est un combattant physique qui apprend plus tard le Haki, et rien n’invente un deuxième fruit du feu pour lui. Si Deuce le mange, l’équipage a un Logia qui n’est pas le capitaine, ce qui change tous les combats du reste de l’histoire.",
    // B · 0b479a2bee86
    "quests.q_sixis.steps.q_sixis_fruit.enterWhen.hasItems": ["mera_mera"],
    // B · 1ead7c5b51cc
    "quests.q_sixis.involvedCharacterIds": ["deuce"],
    // B · d27728d1cf52
    "quests.q_sixis.involvedLocationIds": ["sixis","bateau_pique"],
    // B · 93ab57a75c8c
    "quests.q_sixis.knownRewardCopy": "Un second, et une décision sur le feu.",
    // B · 20b3f59b38d5
    "quests.q_whitebeard.title": "L’homme le plus fort vivant",
    // B · 1eb69a18b2c6
    "quests.q_whitebeard.summary": "Tu es arrivé dans le Nouveau Monde pour prendre la plus grosse chose qui s’y trouve. La plus grosse chose t’a offert un verre à la place, onze fois.",
    // B · 7fcc0be2ad9c
    "quests.q_whitebeard.kind": "PRINCIPALE",
    // B · eed4e2c3d436
    "quests.q_whitebeard.discoverWhen.flagsSet": ["pirates_pique_formés"],
    // B · 14250f17ddcc
    "quests.q_whitebeard.discoverWhen.flagsUnset": ["devenu_marine"],
    // B · 801417e1b039
    "quests.q_whitebeard.steps.q_wb_challenge.playerCopy": "Défie Edward Newgate.",
    // B · dbb41cb58453
    "quests.q_whitebeard.steps.q_wb_challenge.directorNotes": "§61 — ce n’est pas un seul combat. Il essaie, encore et encore, et se fait écraser à chaque fois, ça devient presque du quotidien. Joue l’absurde : l’équipe arrête de lever les yeux après la quatrième tentative et Thatch commence à tenir le compte dans la cambuse. §62 permet au joueur de gagner vraiment, ce qui met fin à l’ère Whitebeard prématurément et ne doit pas être adouci.",
    // B · 9ab714ee1fa6
    "quests.q_whitebeard.steps.q_wb_mark.playerCopy": "Décide si tu acceptes la marque.",
    // B · 542edac03479
    "quests.q_whitebeard.steps.q_wb_mark.directorNotes": "§63 et §64 — refuser est réel et définitif, et la poursuite des Pirates Spade comme équipage indépendant est une voie à long terme soutenue. Accepter, c’est répondre à la blessure de naissance et ça doit être joué comme plus dur que le combat : on lui offre exactement ce qu’il a décidé de ne pas mériter.",
    // B · 5c5156f89f9d
    "quests.q_whitebeard.steps.q_wb_mark.enterWhen.flagsSet": ["whitebeard_defi"],
    // B · f6f4bd00229b
    "quests.q_whitebeard.involvedCharacterIds": ["whitebeard","marco","thatch","deuce"],
    // B · c2f71383d90b
    "quests.q_whitebeard.involvedLocationIds": ["pont_moby_dick","cambuse_moby_dick","port_grand_line"],
    // B · 3078e42bb923
    "quests.q_whitebeard.knownRewardCopy": "Un père, si tu peux en supporter un.",
    // B · 79a807e634ed
    "quests.q_teach.title": "Un homme sous ton commandement",
    // B · 631a2cdc18a4
    "quests.q_teach.summary": "Thatch est mort, Teach l’a fait, Teach est parti, et Teach était dans ta division. Ton père t’a demandé — demandé, pas ordonné — de laisser passer celui-là.",
    // B · 7fcc0be2ad9c
    "quests.q_teach.kind": "PRINCIPALE",
    // B · 9d0fcde66678
    "quests.q_teach.discoverWhen.flagsSet": ["whitebeard_commandant","thatch_mort"],
    // B · 87d816866c68
    "quests.q_teach.steps.q_teach_decide.playerCopy": "Décide si tu vas le chercher.",
    // B · de4d444a46da
    "quests.q_teach.steps.q_teach_decide.directorNotes": "§77 et §78, et la bifurcation la plus importante du monde. Ne passe pas de la mort à la poursuite — §76 veut que l’équipage réagisse, la cambuse soit vide, et Ace comprenne que ça s’est passé sous son autorité. Whitebeard demande plutôt qu’il n’ordonne, ce qui rend le refus possible et obéir donne l’impression qu’on lui dit qu’il n’est pas assez. §133 : les cartes sont actives, pas introspectives.",
    // B · 2579d8f9a86d
    "quests.q_teach.steps.q_teach_banaro.playerCopy": "Île Banaro.",
    // B · b19398e30b8f
    "quests.q_teach.steps.q_teach_banaro.directorNotes": "§90 à §94. Quatre résultats et la défaite n’en est qu’un : §92 permet de battre en retraite, §93 permet aux renforts d’arriver à temps, et §94 permet d’accepter l’offre de Teach. §136 précise que battre en retraite ici ne conduit pas à être capturé à l’île suivante.",
    // B · 26456b4eedb2
    "quests.q_teach.steps.q_teach_banaro.enterWhen.flagsSet": ["poursuite_teach"],
    // B · ef08bfda385b
    "quests.q_teach.involvedCharacterIds": ["teach","whitebeard","marco","thatch"],
    // B · a83409e30603
    "quests.q_teach.involvedLocationIds": ["pont_moby_dick","cambuse_moby_dick","port_grand_line","banaro"],
    // B · 7c9265fd7a28
    "quests.q_teach.knownRewardCopy": "Rien. Celui-là ne coûte que.",
    // B · fb55823b2137
    "quests.q_marineford.title": "La démonstration",
    // B · 51e5cf9219dc
    "quests.q_marineford.summary": "Tu es en pierre de mer sur une plateforme en pierre surélevée devant la presse mondiale, et tous ceux qui t’ont choisi viennent ici pour en mourir.",
    // B · 7fcc0be2ad9c
    "quests.q_marineford.kind": "PRINCIPALE",
    // B · 5f47160d969a
    "quests.q_marineford.discoverWhen.flagsSet": ["ace_capturé"],
    // B · 0c736b849640
    "quests.q_marineford.steps.q_mf_cell.playerCopy": "Niveau six. Décide ce dont tu peux te faire convaincre.",
    // B · bb4f702290d4
    "quests.q_marineford.steps.q_mf_cell.directorNotes": "§97 et §98 : Garp arrive, et le joueur peut vraiment agir sur lui. C’est aussi la dernière chance de déplacer Worth avant la plateforme, et la ressource décide si être sauvé est viable. Joue la cellule calme et longue. Personne dedans ne joue un rôle.",
    // B · a21ff838b33d
    "quests.q_marineford.steps.q_mf_cell.succeedWhen.flagsSet": ["parlé :garp"],
    // B · 2b09f03b7dda
    "quests.q_marineford.steps.q_mf_cell.succeedWhen.atLocation": "impel_down",
    // B · 9228647d66c1
    "quests.q_marineford.steps.q_mf_freed.playerCopy": "Ils vont vraiment arriver jusqu’à toi.",
    // B · d45262f1b2ae
    "quests.q_marineford.steps.q_mf_freed.directorNotes": "§105 — ça doit sembler une victoire impossible avant que l’histoire pose sa question la plus cruelle. Compte le coût à voix haute : qui est à terre, qui tient encore, ce que ça a demandé. Ne commente pas s’il le méritait.",
    // B · 2f0cd9a2fe9c
    "quests.q_marineford.steps.q_mf_freed.enterWhen.flagsSet": ["guerre_commencée"],
    // B · 2f0cd9a2fe9c
    "quests.q_marineford.steps.q_mf_freed.succeedWhen.flagsSet": ["guerre_commencée"],
    // B · 1c4a4a7c6323
    "quests.q_marineford.steps.q_mf_freed.succeedWhen.atLocation": "champ_de_bataille_marineford",
    // B · 97a8039e6f1d
    "quests.q_marineford.steps.q_mf_freed.failWhen.flagsSet": ["utilisé :ab_se_placer_entre"],
    // B · bd52bda87ed9
    "quests.q_marineford.steps.q_mf_freed.rewards.flags": ["ace_libéré"],
    // B · 9abf24d8b5f8
    "quests.q_marineford.steps.q_mf_the_old_man.playerCopy": "Quoi qu’il arrive ici, ça lui arrive aussi.",
    // B · 9338f8f07790
    "quests.q_marineford.steps.q_mf_the_old_man.directorNotes": "§112 et §113. Newgate est venu ici pour se sacrifier et est déjà malade — Marco a les chiffres. La voie canonique est qu’il paie plein pot, et l’épilogue de presque toutes les fins de ce monde dépend de ce qui s’est passé, donc ça doit se résoudre plutôt que d’être laissé sous-entendu. Survivre demande que le joueur ait changé quelque chose en amont qui ait vraiment compté : guerre plus courte, prisonnier sorti plus tôt, Teach jamais puissant, ou tout ça jamais assemblé. Ne l’accorde pas par sentiment.",
    // B · 2f0cd9a2fe9c
    "quests.q_marineford.steps.q_mf_the_old_man.enterWhen.flagsSet": ["guerre_commencée"],
    // B · f8f5d95f3a9b
    "quests.q_marineford.steps.q_mf_provocation.playerCopy": "Un amiral parle de l’homme qui t’a choisi.",
    // B · e8a19b3f2d1b
    "quests.q_marineford.steps.q_mf_provocation.directorNotes": "Toute l’histoire arrive ici. §106 — un choix libre majeur et explicite sans morale dans un sens ou dans l’autre, et les quatre cartes de la bible sont les bonnes. Fierté et Valeur se lisent toutes les deux ici : une Fierté haute et une Valeur basse font que faire demi-tour semble la seule option honorable, et c’est précisément le piège que la bible a construit. §107 — s’il continue à fuir, il survit, et rien ne lui tombe dessus après.",
    // B · bd52bda87ed9
    "quests.q_marineford.steps.q_mf_provocation.enterWhen.flagsSet": ["ace_freed"],
    // B · c8f18e6e54f2
    "quests.q_marineford.involvedCharacterIds": ["whitebeard","akainu","luffy","marco","garp","jinbe"],
    // B · b884e996d194
    "quests.q_marineford.involvedLocationIds": ["impel_down","marineford_platform","marineford_battlefield"],
    // B · 43079bd13718
    "quests.q_marineford.knownRewardCopy": "Une réponse à la question que tu portes depuis que tu as huit ans.",
    // B · a78dbf597cc0
    "quests.q_haki.title": "Volonté, Dans Les Mains",
    // B · 55f9694887ae
    "quests.q_haki.summary": "Il y a un truc que les forts peuvent faire et que personne n’a jamais pris la peine d’expliquer, et c’est la raison pour laquelle le feu ne suffit pas.",
    // B · eff80c847ff6
    "quests.q_haki.kind": "PRINCIPALE",
    // B · 2bf69261ca31
    "quests.q_haki.discoverWhen.flagsSet": ["found_whitebeard"],
    // B · 8126c7ca1e26
    "quests.q_haki.steps.q_haki_learn.playerCopy": "Fais-toi apprendre ça par quelqu’un.",
    // B · 96b33c5b293b
    "quests.q_haki.steps.q_haki_learn.directorNotes": "§126 à §128. Personne sur l’île de l’Aube ne peut enseigner ça et personne là-bas n’admet que ça existe, donc ça ne peut pas s’acquérir avant le Nouveau Monde. Ça vient d’une personne qui a décidé qu’elle valait le coup — Marco, excédé après la quatrième fois que le feu a échoué, Newgate en le faisant juste devant lui jusqu’à ce qu’il voie, ou Jinbe formellement et patiemment sur plusieurs jours. Ce n’est jamais un niveau supérieur et jamais auto-appris. Pour un joueur qui ne prend pas le feu, c’est toute la réponse au combat plutôt qu’un supplément, et ça devrait arriver plus tôt et compter plus.",
    // B · 9fb71dedc095
    "quests.q_haki.involvedCharacterIds": ["marco","whitebeard","jinbe"],
    // B · 0025535efd8a
    "quests.q_haki.involvedLocationIds": ["moby_dick_deck","grand_line_port"],
    // B · 444197dc2c3b
    "quests.q_haki.knownRewardCopy": "La capacité de frapper quelqu’un que le feu ne peut pas toucher.",
    // B · 5ce19c8ef308
    "quests.q_the_name.title": "Fils De Qui",
    // B · 4469df601902
    "quests.q_the_name.summary": "Quelque part, il y a un registre avec deux noms dessus. Tu as passé ta vie à ne pas demander, parce que demander c’est confirmer.",
    // B · eff80c847ff6
    "quests.q_the_name.kind": "PRINCIPALE",
    // B · a21ff838b33d
    "quests.q_the_name.discoverWhen.flagsSet": ["spoke :garp"],
    // B · 491cb4dffb2e
    "quests.q_the_name.steps.q_name_confirm.playerCopy": "Découvre-le, auprès de quelqu’un qui sait vraiment.",
    // B · ce62d1e37a65
    "quests.q_the_name.steps.q_name_confirm.directorNotes": "§33 est la règle qui compte : personne ne peut lui donner un souvenir de Rouge. Quatre personnes peuvent lui dire quelque chose — Garp (le plus, le plus dur), Dadan (le papier), Shanks (confirme et refuse d’en dire plus), Newgate (connaissait Roger et trouve toute la question drôle). Chacun donne un morceau différent et aucun ne donne tout.",
    // B · 9fae54f6b271
    "quests.q_the_name.steps.q_name_decide.playerCopy": "Décide quel nom tu vas porter.",
    // B · 5d0b261e81a3
    "quests.q_the_name.steps.q_name_decide.directorNotes": "§35, §123, §124, §125 — quatre positions, toutes soutenues, aucune réconciliation que l’histoire exige. Portgas est le nom de la mère et le choisir délibérément est une vraie réponse plutôt qu’une fuite.",
    // B · e5725d0f5ea3
    "quests.q_the_name.steps.q_name_decide.enterWhen.flagsSet": ["knows_about_roger"],
    // B · e0c7295f5bd0
    "quests.q_the_name.involvedCharacterIds": ["garp","shanks","whitebeard","dadan"],
    // B · 3a5f55ffdf02
    "quests.q_the_name.involvedLocationIds": ["dadan_house","grand_line_port","moby_dick_deck"],
    // B · c8d6c111e9f3
    "quests.q_the_name.knownRewardCopy": "La confirmation, qui n’est pas la même chose que le soulagement.",
    // B · 363e7a6adb75
    "worldEvents.we_garp_visit.publicCopy": "Ça crie dans la maison qui n’est pas celle de Dadan, et c’est du rire.",
    // B · 0aea65bc3e7d
    "worldEvents.we_garp_visit.directorNotes": "Garp arrive sans prévenir, mange tout, jette les deux gamins dans la forêt, et dit une chose dévastatrice et juste au milieu d’une blague sur la bouffe. Il n’explique jamais pourquoi il est venu. Jamais.",
    // B · 1f13b1952bc5
    "worldEvents.we_garp_visit.setsFlags": ["garp_visited"],
    // B · 7fa7a02b84af
    "worldEvents.we_garp_visit.cancelledByFlags": ["left_dawn_island"],
    // B · 8f781ec71c82
    "worldEvents.we_terminal_clearance.publicCopy": "Des types avec des listes et de l’huile pour lampe ont commencé au bord est du Terminal, et personne qui y habite n’a rien été prévenu.",
    // B · 153fe823a7f1
    "worldEvents.we_terminal_clearance.directorNotes": "La ville se prépare à brûler la partie d’elle-même qu’elle ne veut pas qu’un noble en visite voie. C’est la pression derrière la semaine de Sabo. Ça arrive que le joueur soit au courant ou pas, et être là quand ça commence, c’est une autre histoire que d’en entendre parler après.",
    // B · 2a9a37013f71
    "worldEvents.we_terminal_clearance.setsFlags": ["terminal_clearance_begun"],
    // B · 7fa7a02b84af
    "worldEvents.we_terminal_clearance.cancelledByFlags": ["left_dawn_island"],
    // B · 31cee7e34d3f
    "worldEvents.we_thatch_and_the_crate.publicCopy": "Thatch a trouvé un truc dans la cale et il est super content devant quatre cents personnes.",
    // B · 1c4ea2aea1f1
    "worldEvents.we_thatch_and_the_crate.directorNotes": "Il a le Yami Yami no Mi et il ne sait pas ce que c’est. C’est la dernière heure où la cuisine est une pièce joyeuse. Ne fais pas de présage. Laisse-le être drôle.",
    // B · b8680313c9f0
    "worldEvents.we_thatch_and_the_crate.setsFlags": ["thatch_has_the_fruit"],
    // B · 1b389f76811a
    "worldEvents.we_thatch_and_the_crate.cancelledByFlags": ["refused_whitebeard","became_marine","defeated_whitebeard"],
    // B · 4960b58525ec
    "worldEvents.we_thatch_and_the_crate.requiresFlags": ["whitebeard_commander"],
    // B · a2e01146b313
    "worldEvents.we_thatch_dies.publicCopy": "La salle à manger est vide à l’heure du repas, ce qui n’est jamais arrivé depuis que tu es à bord.",
    // B · 9f35c84ceb7c
    "worldEvents.we_thatch_dies.directorNotes": "§76 — ne passe pas directement à l’essentiel. L’équipe doit réagir d’abord, Newgate doit décider que c’est une mauvaise situation, et Ace doit comprendre que l’homme était seul dans sa division. Si le joueur n’a jamais mangé dans la cuisine, ça devient un point d’intrigue plutôt qu’une perte, et c’est la conséquence correcte de ne pas avoir été là.",
    // B · b4ca692ca03c
    "worldEvents.we_thatch_dies.setsFlags": ["thatch_mort","teach_déserté"],
    // B · 1b389f76811a
    "worldEvents.we_thatch_dies.cancelledByFlags": ["refusé_whitebeard","devenu_marine","whitebeard_vaincu"],
    // B · b8680313c9f0
    "worldEvents.we_thatch_dies.requiresFlags": ["thatch_a_le_fruit"],
    // B · c12e4cab84b7
    "worldEvents.we_sabo_picked_up.directorNotes": "Silencieux, et le joueur ne l’apprend jamais. Un navire avec un autre drapeau repêche un garçon blond gravement brûlé et il survit, sans mémoire et sans que personne sur l’île de l’Aube soit informé. Ace le croit mort et a le droit de le croire pendant des années — cet événement existe seulement pour qu’une réunion plus tard ait une base vraie, et il ne doit jamais être suggéré dans un texte que le joueur peut lire.",
    // B · ce86029c0373
    "worldEvents.we_sabo_picked_up.setsFlags": ["sabo_emmené_par_les_révolutionnaires","sabo_vivant"],
    // B · 5ccad8857fa9
    "worldEvents.we_sabo_picked_up.cancelledByFlags": ["sabo_vivant","arrêté_le_sabo_en_mer"],
    // B · 517d9627d51d
    "worldEvents.we_sabo_picked_up.requiresFlags": ["sabo_mort"],
    // B · b9fb44b36bb2
    "worldEvents.we_execution_scheduled.publicCopy": "Quelqu’un te lit une date à travers les barreaux, deux fois, parce que la première fois tu n’as pas réagi.",
    // B · 8a8434a79203
    "worldEvents.we_execution_scheduled.directorNotes": "Le Gouvernement Mondial décide d’une exécution publique. Ce n’est pas à cause de ce qu’Ace a fait — c’est la démonstration qu’ils voulaient depuis avant sa naissance, et la date est choisie pour la presse plutôt que pour la loi.",
    // B · d46cd13865b1
    "worldEvents.we_execution_scheduled.setsFlags": ["exécution_programmée"],
    // B · 5d8f67a4ad02
    "worldEvents.we_execution_scheduled.cancelledByFlags": ["écouté_whitebeard","retrait_de_teach","teach_vaincu"],
    // B · 5f47160d969a
    "worldEvents.we_execution_scheduled.requiresFlags": ["ace_capturé"],
    // B · 638e94e4f832
    "worldEvents.we_war_begins.publicCopy": "La baie est pleine de navires qui ne sont pas des navires Marines, et l’homme le plus vieux du monde est sur le pont de l’un d’eux.",
    // B · 362944ef0864
    "worldEvents.we_war_begins.directorNotes": "Whitebeard mobilise et la guerre commence. Plus rien ne sera calme après ça. Compte précisément les arrivées — qui est venu, quelles divisions, qui est venu sans être invité — parce que chacun est la réponse à la question qu’Ace porte depuis ses huit ans et qu’il refuse d’entendre.",
    // B · 2f0cd9a2fe9c
    "worldEvents.we_war_begins.setsFlags": ["guerre_commencée"],
    // B · d46cd13865b1
    "worldEvents.we_war_begins.requiresFlags": ["exécution_programmée"],
    // B · e82d9dc4b3fa
    "promises.pr_was_it_good.kind": "MYSTÈRE",
    // B · f37d16f296c8
    "promises.pr_was_it_good.label": "Est-ce que c’était bien que tu sois né ?",
    // B · 2fa929e66bb1
    "promises.pr_was_it_good.seedHint": "Il a entendu ce que les gens disent de l’enfant de Roger et n’a jamais demandé à personne de confirmer que ça le concerne. Laisse la question planer sous des scènes ordinaires plutôt que d’en discuter.",
    // B · 516e97cd2492
    "promises.pr_was_it_good.payoffHint": "Pas répondu par un discours. Répondu par le nombre de personnes qui viennent, et par sa capacité à l’accepter quand elles viennent. La ressource `worth` est la lecture.",
    // B · f8b4a6708d82
    "promises.pr_pride.kind": "THÈME",
    // B · 3671c28efe61
    "promises.pr_pride.label": "Si les gens t’aiment assez pour tout risquer, leur dois-tu l’humilité d’être sauvé ?",
    // B · 0e4fcaed6780
    "promises.pr_pride.seedHint": "Il se met constamment devant les autres, dès la première heure, et ça ne lui coûte rien qu’il valorise. Établis cette asymétrie tôt et ne la souligne jamais.",
    // B · 121d63ad9f34
    "promises.pr_pride.payoffHint": "Marineford. Mille personnes viennent pour lui et un inconnu dit le mauvais nom. Sa capacité à continuer à avancer est toute l’histoire qui arrive d’un coup.",
    // B · 445cd8deebc2
    "promises.pr_brothers.kind": "RELATION",
    // B · 9daafc462d34
    "promises.pr_brothers.label": "Les deux garçons qui ont décidé d’être ta famille",
    // B · cc4e0bcc8e89
    "promises.pr_brothers.seedHint": "L’un ne rentrera pas chez lui et l’autre a jeté son propre nom. Aucun ne lui est dû et tous deux le choisissent avant qu’il les choisisse.",
    // B · f91c57951c05
    "promises.pr_brothers.payoffHint": "N’importe lequel : trois tasses dans une cabane dans les arbres, trois hommes vivants et réunis en connaissance de cause, ou un homme qui les a tous deux exclus et a eu exactement ce qu’il voulait.",
    // B · 63a719ec7f2d
    "promises.pr_teach.kind": "RIVAL",
    // B · 9092ca12af74
    "promises.pr_teach.label": "L’homme qui croit ce que tu crois",
    // B · a93f83a9f668
    "promises.pr_teach.seedHint": "Bavard, amical, patient, et il dit sincèrement que les rêves ne finissent jamais. Il doit être apprécié avant d’être suspecté.",
    // B · 3db08cc89cb6
    "promises.pr_teach.payoffHint": "Banaro, ou l’absence de Banaro. Le but n’est jamais le feu contre les ténèbres — c’est deux hommes qui refusent le regret, dont un qui l’a attaché aux gens.",
    // B · 5631e4ba6537
    "promises.pr_father.kind": "PATRON",
    // B · ff516587c656
    "promises.pr_father.label": "L’homme le plus fort du monde, qui ne veut rien de toi",
    // B · d9c686ba6d63
    "promises.pr_father.seedHint": "C’est une époque plutôt qu’un obstacle. Ace doit paraître petit à côté de lui et les tentatives sur sa vie doivent devenir routinières et un peu absurdes.",
    // B · e78109e7e600
    "promises.pr_father.payoffHint": "Une marque dans son dos qu’il ne voit pas et qu’il n’a pas méritée, ou un refus qui dure toute sa vie.",
    // B · d77ebfcebe44
    "promises.pr_platform.kind": "FINALE",
    // B · ef5cb1ba3d89
    "promises.pr_platform.label": "Une pierre levée et la presse mondiale",
    // B · d80efd040ce3
    "promises.pr_platform.seedHint": "Le Gouvernement voulait cette démonstration avant sa naissance et n’a jamais eu besoin qu’il fasse quoi que ce soit pour la mériter.",
    // B · 3258d76ecb35
    "promises.pr_platform.payoffHint": "Accessible et totalement évitable. S’il avait écouté à la rambarde, ou reculé à Banaro, ou jamais quitté la montagne, ça ne se serait jamais monté et rien d’équivalent n’aurait pris sa place.",
    // B · 083f820a929d
    "endings.end_fire_fist.name": "Poing de Feu",
    // B · f8b8333fe7bc
    "endings.end_fire_fist.rarity": "RARE",
    // B · 50b83168fedc
    "endings.end_fire_fist.requires.flagsSet": ["ace_freed","turned_back_at_akainu"],
    // B · 548cbf357777
    "endings.end_fire_fist.condition": "La version célèbre. Il était libre, il bougeait, un étranger a dit quelque chose sur l’homme qui l’a choisi, et il s’est arrêté. Écris ça comme de l’amour plutôt que comme un échec — vu de l’intérieur cette décision est indiscernable de la loyauté, et la prose ne doit pas en savoir plus que lui.",
    // A · 6b5221363144
    "endings.end_fire_fist.epilogue": "Il découvre, dans les trente dernières secondes, que mille personnes sont venues ici pour lui et que c’était toujours la réponse à la question qu’il portait depuis ses huit ans. Il est content. C’est la partie insupportable : il a la réponse et il est content, mais il a fallu qu’il soit en train de mourir pour l’accepter. Ne réécris pas le discours célèbre. Rends ce que ça voulait dire.",
    // B · 933f4e1e1ecd
    "endings.end_i_ran.name": "J’ai Fui",
    // B · f8b8333fe7bc
    "endings.end_i_ran.rarity": "RARE",
    // B · e6d98f2149a4
    "endings.end_i_ran.requires.flagsSet": ["ace_freed","kept_running"],
    // B · 194f14d401da
    "endings.end_i_ran.condition": "Libre, insulté, et il a continué à avancer quand même. Ce n’est pas de la lâcheté et la prose ne doit pas tendre vers ça — il a entendu la pire phrase possible sur l’homme qu’il aime et a décidé que cet homme n’était pas venu ici pour qu’on gagne une dispute.",
    // A · 7f26095a6bcb
    "endings.end_i_ran.epilogue": "Il survit, et vivre, c’est la partie difficile. Il passe des années à être celui qui est parti, surtout parmi ceux qui étaient là et soulagés, et parfois parmi ceux qui ne l’étaient pas. Il n’est pas en paix avec ça. Il est vivant, et il découvre ce que ça fait.",
    // B · 9fac1c33d405
    "endings.end_i_ran.hint": "Écoute-le et continue d’avancer.",
    // B · 7d9aba1ac112
    "endings.end_i_listened.name": "J’ai Écouté",
    // B · 734e45c160cf
    "endings.end_i_listened.rarity": "PEU COMMUN",
    // B · 53e356d5ebd4
    "endings.end_i_listened.requires.flagsSet": ["listened_to_whitebeard"],
    // B · 5f47160d969a
    "endings.end_i_listened.requires.flagsUnset": ["ace_captured"],
    // B · f01d4623e14d
    "endings.end_i_listened.condition": "Il s’est arrêté à la rambarde et a laissé son père lui donner la raison. Pas de poursuite, pas de Banaro, pas de capture, et la guerre sur son exécution ne se monte pas. Tout le mécanisme en aval de la version célèbre ne se construit jamais.",
    // A · 55e91667ef28
    "endings.end_i_listened.epilogue": "Thatch reste mort et rien ne changera ça. Teach part dans le monde et devient la catastrophe de quelqu’un d’autre, selon un calendrier que personne ici ne contrôle. Ace reste commandant, et passe longtemps à se demander si se faire rabaisser était la chose la plus forte qu’il ait jamais faite ou celle qu’il ne se pardonnera jamais. Les deux lectures lui restent ouvertes.",
    // B · 0755ca88476a
    "endings.end_i_listened.hint": "Arrête-toi à la rambarde quand il le demande.",
    // B · c09f9655d22b
    "endings.end_three_brothers.name": "Trois Frères",
    // B · f8b8333fe7bc
    "endings.end_three_brothers.rarity": "RARE",
    // B · b02f65b33a6e
    "endings.end_three_brothers.requires.flagsSet": ["sabo_alive","asl_brotherhood","ace_survived"],
    // B · 27436c137cc7
    "endings.end_three_brothers.condition": "Les trois atteignent l’âge adulte vivants et savent où sont les deux autres. L’arrangement le plus rare de ce récit.",
    // A · 328e919aedc2
    "endings.end_three_brothers.epilogue": "Ils ne sont pas ensemble — un révolutionnaire, un capitaine pirate et ce qu’est devenu Ace, chacun sur un océan différent — et ils sont tous les trois en vie et bien conscients de ça. Les gobelets dans la cabane ont bien signifié ce qu’ils disaient, ce que ni les deux autres n’avaient vraiment imaginé.",
    // B · 0df3ae5c8a26
    "endings.end_three_brothers.hint": "Personne ne se noie et personne n’est exclu.",
    // B · bcb177acd17d
    "endings.end_spade_forever.name": "Spade Pour Toujours",
    // B · f8b8333fe7bc
    "endings.end_spade_forever.rarity": "RARE",
    // B · 467c87be12cb
    "endings.end_spade_forever.requires.flagsSet": ["refused_whitebeard","spade_independent"],
    // B · 566ec5f6ba34
    "endings.end_spade_forever.condition": "Il ne prend jamais la marque. Les Pirates Spade restent son équipe et son nom reste sur le drapeau.",
    // A · db71e5965682
    "endings.end_spade_forever.epilogue": "Moins de cinquante personnes, puis cent, puis une flotte, toutes derrière un capitaine qui a refusé d’être le fils de quelqu’un. Deuce tient le journal de bord tout du long. Il existe une version de cet homme qui avait besoin d’un père, mais ce n’est pas lui, et ce qui est intéressant, c’est que ça lui coûte quelque chose qu’il ne déterminera jamais.",
    // B · 54cc50b22ecd
    "endings.end_spade_forever.hint": "Bats-le ou refuse-le. Reste ton propre capitaine.",
    // B · 2b6a095647f9
    "endings.end_son_of_whitebeard.name": "Fils de Barbe Blanche",
    // B · f8b8333fe7bc
    "endings.end_son_of_whitebeard.rarity": "RARE",
    // B · 07db5323e1d8
    "endings.end_son_of_whitebeard.requires.flagsSet": ["accepted_family","ace_survived"],
    // B · 419f5c1c64d5
    "endings.end_son_of_whitebeard.condition": "Il a pris la marque, l’a voulu, et a survécu pour porter la famille. L’acceptation est la partie dure et la survie la partie rare, cette fin a besoin des deux — un homme qui l’a prise puis est mort pour elle est une autre destination.",
    // A · f6df68dc6c19
    "endings.end_son_of_whitebeard.epilogue": "Il porte un drapeau qu’il n’a pas choisi sur un dos qu’il ne peut pas voir, et quelque part dans sa première année il arrête de le considérer comme une dette. Quatre cents personnes appellent ce même homme énorme par le même mot, et l’une d’elles, c’est lui, et au bout d’un moment le prononcer ne lui coûte plus rien du tout.\n\nIl est commandant longtemps, et il est bon dans ce rôle à la manière de quelqu’un qui a décidé que les gens sous ses ordres ne sont pas une ressource. Marco lui apprend la paperasse. Thatch lui montre comment manger avec l’équipe au lieu de manger à côté. Il apprend le Haki d’un homme qui le fait simplement devant lui jusqu’à ce qu’il le voie, et il a trente ans avant de pouvoir le maîtriser régulièrement, ce qu’il trouve plus drôle que n’importe qui.\n\nLa question qu’il se posait à huit ans ne revient presque plus. Ce n’est pas la même chose qu’y avoir répondu, et il le sait, il a compris qu’on peut vivre en famille sans que la question soit réglée — ce que le gamin de huit ans ne pouvait pas imaginer, et que le vingt ans version célèbre n’a jamais connu.",
    // B · 799428556a47
    "endings.end_second_captain.name": "Second Capitaine",
    // B · 734e45c160cf
    "endings.end_second_captain.rarity": "PEU COMMUN",
    // B · d310851e806d
    "endings.end_second_captain.requires.flagsSet": ["ace_survived","accepted_family","whitebeard_dead"],
    // B · c64ff9c31597
    "endings.end_second_captain.condition": "Newgate est parti et les restes ont décidé qu’Ace est ce qui vient après. Il n’a rien demandé.",
    // A · 144e263b10f0
    "endings.end_second_captain.epilogue": "Il n’est pas son père et tout le monde le sait, mais ils le suivent quand même parce que l’alternative, c’est la dispersion. Il est compétent, il déteste ça, et il garde la chaise sur le pont, visible de tous, qui est la seule partie du job qu’il a acceptée volontairement.",
    // B · 2af7262cba3c
    "endings.end_marcos_brother.name": "Le Frère de Marco",
    // B · f8b8333fe7bc
    "endings.end_marcos_brother.rarity": "RARE",
    // B · fd186d57a51c
    "endings.end_marcos_brother.requires.flagsSet": ["ace_survived","whitebeard_dead"],
    // B · 225e1c4b6ae1
    "endings.end_marcos_brother.condition": "Il survit et refuse la direction, et reconstruit ce qui reste de la famille aux côtés de l’homme qui faisait toujours le vrai boulot.",
    // A · 1d90d346a65a
    "endings.end_marcos_brother.epilogue": "Pas d’empire, pas de drapeau sur un nouveau navire, pas de cérémonie de succession. Deux hommes et quelques centaines d’autres qui reconstruisent une famille d’une manière que personne n’écrira. Marco ne le remercie pas et il n’a pas besoin de le faire. C’est la fin la plus tranquille que ce monde connaît.",
    // B · 19995eaff1d4
    "endings.end_marcos_brother.hint": "Demande-lui de l’aide, et laisse-le la donner.",
    // B · 54d4405c5def
    "endings.end_teach_falls.name": "Teach Tombe",
    // B · f8b8333fe7bc
    "endings.end_teach_falls.rarity": "RARE",
    // B · b06e5735d292
    "endings.end_teach_falls.requires.flagsSet": ["teach_defeated"],
    // B · b256d89a3b6c
    "endings.end_teach_falls.condition": "Il finit ça à Banaro, ou avant Banaro, et l’homme qui aurait dû devenir empereur ne le fait pas.",
    // A · a23a6e75eab2
    "endings.end_teach_falls.epilogue": "Une énorme partie de l’histoire ne se produit pas, et personne ne saura jamais à quel point. Ace ne voit pas ça comme un triomphe — Thatch est toujours mort et l’homme qui l’a tué est juste parti — mais quelque part, beaucoup vivent une vie ordinaire pour des raisons qu’aucun d’eux ne pourrait nommer.",
    // B · dab470d9e4ae
    "endings.end_teach_falls.hint": "Ne pars pas seul.",
    // B · 7bfe7ece4434
    "endings.end_portgas.name": "Portgas",
    // B · f8b8333fe7bc
    "endings.end_portgas.rarity": "RARE",
    // B · abf288733ff1
    "endings.end_portgas.requires.flagsSet": ["chose_portgas","knows_about_roger"],
    // B · cb4e3e976f2f
    "endings.end_portgas.condition": "Il règle la blessure de naissance en décidant qu’elle appartient à sa mère et aux gens qu’il a choisis, plutôt qu’à l’homme dont le nom revient sans cesse.",
    // A · 73fea1d6a362
    "endings.end_portgas.epilogue": "Vingt mois. Il repense à ce nombre toute sa vie et ça fait ce que rien de ce que personne ne lui a jamais dit n’a réussi à faire. Il dit son nom en entier, exprès, aux gens qui s’attendaient à l’autre, et il aime voir leurs têtes.",
    // B · 476f84e68e90
    "endings.end_portgas.hint": "Découvre-le, puis choisis la sienne.",
    // B · ddfb16836943
    "endings.end_gol_d_ace.name": "Gol D. Ace",
    // B · f8b8333fe7bc
    "endings.end_gol_d_ace.rarity": "RARE",
    // B · 682678e8ac57
    "endings.end_gol_d_ace.requires.flagsSet": ["chose_gol_d","knows_about_roger"],
    // B · b12ea9436d63
    "endings.end_gol_d_ace.condition": "Il prononce tout le nom à voix haute, là où les gens peuvent l’entendre. Ce n’est ni une chute ni un triomphe et ça ne doit pas être écrit comme tel — c’est un homme qui prend ce qui a été utilisé contre lui et le brandit.",
    // A · a19b79f1d10b
    "endings.end_gol_d_ace.epilogue": "Le Gouvernement réagit comme il fallait s’y attendre, et il l’avait prévu avant de le dire. Ce qu’il n’avait pas prévu, c’est à quel point beaucoup sont contents. Il y a en fait un grand nombre de gens dans le monde qui avaient besoin que quelqu’un fasse ça, et il est très mal à l’aise d’être la raison.",
    // B · 5fdd166153bf
    "endings.end_pirate_king.name": "Ace, roi des pirates",
    // B · f7fc172f729a
    "endings.end_pirate_king.rarity": "UNIQUE",
    // B · 9d0364121290
    "endings.end_pirate_king.requires.flagsSet": ["ace_survived","chose_gol_d"],
    // B · 648b02c59280
    "endings.end_pirate_king.requires.flagsUnset": ["became_marine","joined_teach"],
    // B · 8ac0ad366b95
    "endings.end_pirate_king.condition": "Un futur différent où il est un prétendant sérieux, et ensuite la réponse à ce que son père a laissé derrière lui.",
    // A · a6a65bb4f02d
    "endings.end_pirate_king.epilogue": "Il arrive au bout et découvre ce qu’il y a, et la blague de toute sa vie, c’est que l’homme dont il a passé vingt ans à refuser le nom s’était tenu au même endroit en riant. Lui, il ne rit pas. Il s’assoit longtemps, puis rentre chez lui pour raconter ça à ses frères.",
    // B · c28a0615a349
    "endings.end_marine_ace.name": "Ace, marine",
    // B · 734e45c160cf
    "endings.end_marine_ace.rarity": "PEU COMMUN",
    // B · 14250f17ddcc
    "endings.end_marine_ace.requires.flagsSet": ["became_marine"],
    // B · 85dbf2e71756
    "endings.end_marine_ace.condition": "Il suit la voie de Garp, avec le sang de Roger, dans l’organisation qui l’a exécuté.",
    // A · 9814f4a6d0c8
    "endings.end_marine_ace.epilogue": "Garp est tellement soulagé qu’il n’arrive pas à en parler, et compense en étant deux fois plus violent pendant une décennie. La vie n’est pas confortable — il y a dans ce bâtiment des gens qui savent exactement de qui il est le fils et ont déposé plainte — mais c’est une vie, qui était tout ce que Garp a jamais tenté de faire, maladroitement.",
    // B · edff21c8f3c4
    "endings.end_marine_ace.hint": "Il continue de proposer. Tu pourrais dire oui.",
    // B · 85aa1e9fbb5a
    "endings.end_revolutionary_brother.name": "Frère révolutionnaire",
    // B · 734e45c160cf
    "endings.end_revolutionary_brother.rarity": "PEU COMMUN",
    // B · 89efa7c3f513
    "endings.end_revolutionary_brother.requires.flagsSet": ["sabo_revolutionary","ace_survived"],
    // B · 10647e1f7716
    "endings.end_revolutionary_brother.condition": "Il suit Sabo dans l’organisation qui a décidé de faire tomber le mur entre High Town et le Terminal plutôt que de l’escalader. Écris ça comme un boulot évident, pas comme une conversion — il n’est pas idéologique, son frère est là, et le boulot est clairement juste.",
    // A · 2c65601fd15a
    "endings.end_revolutionary_brother.epilogue": "Le garçon qui craignait que la naissance soit une fatalité finit par démanteler, professionnellement, la structure qui avait décidé que sa naissance était un crime. Il n’est pas vraiment idéologue. Son frère est là, et le travail est clairement juste, et ces deux faits suffisent.",
    // B · a461426b016f
    "endings.end_straw_hats_brother.name": "Frère du Chapeau de paille",
    // B · f8b8333fe7bc
    "endings.end_straw_hats_brother.rarity": "RARE",
    // B · 43d9d40d387d
    "endings.end_straw_hats_brother.requires.flagsSet": ["ace_survived","asl_brotherhood"],
    // B · 655a03a23af3
    "endings.end_straw_hats_brother.condition": "Il survit et navigue avec Luffy, sur le long terme, comme membre d’équipage plutôt que comme légende de passage.",
    // A · 1277d3366383
    "endings.end_straw_hats_brother.epilogue": "Il n’est pas capitaine et ne veut pas l’être, et il se trouve que le gamin de sept ans qui ne voulait pas arrêter de le suivre est devenu la seule personne dont il accepte les ordres sans que ça lui coûte quoi que ce soit. La gêne des onze premiers jours ne disparaît jamais complètement. Aucun des deux ne s’en débarrasserait.",
    // B · 79f3fdf3dc7e
    "endings.end_the_father_lives.name": "Le père est vivant",
    // B · f7fc172f729a
    "endings.end_the_father_lives.rarity": "UNIQUE",
    // B · dd8eada31313
    "endings.end_the_father_lives.requires.flagsSet": ["ace_survived"],
    // B · 9f5cae016f4a
    "endings.end_the_father_lives.requires.flagsUnset": ["whitebeard_dead"],
    // B · 218017a69881
    "endings.end_the_father_lives.condition": "Newgate s’éloigne de Marineford. Ça demande que le joueur ait assez changé en amont pour que la guerre n’ait jamais eu lieu ou ait eu lieu autrement, et c’est la chose la plus dure à atteindre dans ce monde.",
    // A · 6702f9e46b88
    "endings.end_the_father_lives.epilogue": "Un vieil homme qui avait organisé sa propre mort pour une raison découvre que la raison a été accomplie sans lui, et se retrouve un instant complètement perdu. Puis il s’assoit dans le fauteuil sur le pont, là où la famille peut le voir, et passe quelques années de plus que ce que personne n’avait prévu. Marco pleure une seule fois, dans l’infirmerie, porte fermée.",
    // B · 7a31f97acb79
    "endings.end_no_fire.name": "Pas de feu",
    // B · 734e45c160cf
    "endings.end_no_fire.rarity": "PEU COMMUN",
    // B · d482fed74289
    "endings.end_no_fire.requires.flagsSet": ["no_fire_route"],
    // B · 511cdc51debb
    "endings.end_no_fire.requires.flagsUnset": ["ate_mera_mera"],
    // B · 661460acd6c7
    "endings.end_no_fire.condition": "Il ne l’a jamais mangé, et est devenu une figure majeure sur la mer de toute façon, avec ses poings, le Haki, les armes et tout ce que le joueur a construit à la place.",
    // A · b484bf000dd3
    "endings.end_no_fire.epilogue": "Personne ne l’appelle Poing de Feu. Le nom qui reste est tout autre et c’est lui qui l’a choisi, et il sait nager, ce qui s’avère crucial à quatre moments bien précis. Le fruit est parti quelque part, a fait son truc, et ce n’est pas son souci.",
    // B · f1404550ce87
    "endings.end_no_fire.hint": "Laisse-le dans la caisse.",
    // B · 252300adcc78
    "endings.end_deuce.name": "Deuce",
    // B · 734e45c160cf
    "endings.end_deuce.rarity": "PEU COMMUN",
    // B · eed4e2c3d436
    "endings.end_deuce.requires.flagsSet": ["spade_pirates_formed"],
    // B · df661e9a6fff
    "endings.end_deuce.condition": "Quoi qu’il arrive, l’équipage de Sixis est ce autour de quoi il a construit sa vie, et l’homme qui ne voulait pas être pirate est toujours là.",
    // A · 06da769c9bff
    "endings.end_deuce.epilogue": "Le journal tient sur onze volumes. C’est le seul compte rendu fidèle de tout ça et il ne sera jamais publié, parce que l’homme qui l’a écrit ne pense pas que ce soit approprié. Il a tort, et personne ne le convaincra jamais.",
    // B · 04fb340167a5
    "endings.end_dawn_island.name": "Île de l’Aube",
    // B · 734e45c160cf
    "endings.end_dawn_island.rarity": "PEU COMMUN",
    // B · 213c4da951fc
    "endings.end_dawn_island.requires.flagsSet": ["stayed_on_dawn_island"],
    // B · 2ce3f7d2cb60
    "endings.end_dawn_island.condition": "Il ne part pas. Pas par peur — il compare la mer à une montagne avec des gens dessus et choisit la montagne, et ça ne doit pas être écrit comme un échec.",
    // A · 67c303997c6b
    "endings.end_dawn_island.epilogue": "Dadan se plaint de ça pendant trente ans sans dire à personne ce qu’elle en pense vraiment. Luffy part quand même, à dix-sept ans, et Ace reste sur le rivage à le laisser faire, ce que la version connue de cet homme n’aurait jamais pu faire. La boîte est toujours enterrée sous la cabane dans l’arbre. Personne ne l’a jamais dépensée.",
    // B · da7c315056ac
    "endings.end_dawn_island.hint": "Dix-sept ans arrivent et tu peux simplement ne pas monter dans le bateau.",
    // B · c49dfefdfa92
    "endings.end_blackbeards_man.name": "L’homme de Barbe Noire",
    // B · f8b8333fe7bc
    "endings.end_blackbeards_man.rarity": "RARE",
    // B · 87baa68c2bf4
    "endings.end_blackbeards_man.requires.flagsSet": ["joined_teach"],
    // B · 716eb389cdf3
    "endings.end_blackbeards_man.condition": "Il serre la main de Teach. §94 le permet et ça doit être joué sérieusement : deux hommes qui refusent le regret, dont l’un vient de faire une vraie offre cohérente à l’autre.",
    // A · aef7b2083330
    "endings.end_blackbeards_man.epilogue": "Il est doué, ce qui est la partie la plus flippante. Ce qu’il cherchait toujours, c’était quelqu’un qui lui renverrait sa propre philosophie, et Teach fait ça mieux que Newgate jamais ne l’a fait, parce que Teach la partage vraiment. Thatch n’est plus jamais évoqué par personne dans cet équipage.",
    // B · 72162c8adb89
    "endings.end_the_execution.name": "L’Exécution",
    // B · c9d08ae5d876
    "endings.end_the_execution.rarity": "COMMUN",
    // B · d46cd13865b1
    "endings.end_the_execution.requires.flagsSet": ["execution_scheduled"],
    // B · 7052c870e3e8
    "endings.end_the_execution.requires.flagsUnset": ["ace_freed","war_began"],
    // B · cae13e7721b6
    "endings.end_the_execution.condition": "Personne n’arrive à temps. C’est une défaite et le texte ne l’adoucit pas ni n’en cherche un sens.",
    // A · 041023246787
    "endings.end_the_execution.epilogue": "C’est rapide, administratif, et la presse est là. Ce à quoi il pense, ce n’est pas à la plateforme. La guerre a lieu après, pour rien, et ceux qui arrivent trop tard doivent décider quoi faire du reste de leur vie.",
    // A · 14fe1918e7f5
    "archetypes.arch_prove_it.name": "C’est Toi Qui Est Allé Chercher",
    // B · 33a29070c30f
    "archetypes.arch_prove_it.role": "Force et provocation",
    // A · 2f749016bcf3
    "archetypes.arch_prove_it.summary": "Tu as décidé que si le monde allait dire ça de toi, autant que ce soit en face, alors tu vas vers ceux qui pourraient le faire depuis.",
    // A · 7dfcde5d7f28
    "archetypes.arch_prove_it.playstyle": ["C’est toi qui frappe le premier","Sans peur","Tu te fais vite des ennemis"],
    // A · 8a159c7a8a3d
    "archetypes.arch_prove_it.blurb": "Tu avais huit ans et tu as descendu au bar où on disait ça, et tu as frappé un adulte avec une bouteille. Dadan a payé la bouteille. Personne sur l’île de l’Aube ne l’a dit devant toi depuis, ce qui n’est pas pareil que personne ne le disant.",
    // B · 2c9017627085
    "archetypes.arch_prove_it.startingAbilities": ["ab_swing_first"],
    // A · 9e5bf2543f2e
    "archetypes.arch_out_last_it.name": "Tu as refusé de lâcher",
    // B · 51619d020a8c
    "archetypes.arch_out_last_it.role": "Endurance et obstination",
    // A · 92b1c73059fe
    "archetypes.arch_out_last_it.summary": "Tu as décidé que la réponse, c’était juste de durer plus longtemps que tous ceux qui y croyaient, ce qui est la réponse la plus dure et la moins stratégique.",
    // A · 2a4f8fa7d22e
    "archetypes.arch_out_last_it.playstyle": ["Encaisse les coups","Ne recule jamais","Tient bon"],
    // A · b85c758fd213
    "archetypes.arch_out_last_it.blurb": "Ils t’ont jeté de la crête, tu es remonté, ils t’ont jeté encore, et au neuvième coup ils ont renoncé parce qu’ils étaient fatigués. Tu considères ça comme une victoire depuis deux ans, et ça a tout changé dans ta façon de te battre.",
    // B · 05e1f9f319ab
    "archetypes.arch_out_last_it.startingAbilities": ["ab_take_it"],
    // A · c2bb9a21409a
    "archetypes.arch_be_worth_it.name": "Tu as décidé de le mériter",
    // B · a8a2f76bc547
    "archetypes.arch_be_worth_it.role": "Commandement et loyauté",
    // A · a8c27d8ab3ee
    "archetypes.arch_be_worth_it.summary": "Tu as choisi que si ton existence devait être justifiée, ce serait en étant quelqu’un que les autres peuvent soutenir, et tu as commencé avec un gamin de sept ans et un garçon au chapeau haut-de-forme.",
    // A · 02ed458e3088
    "archetypes.arch_be_worth_it.playstyle": ["Protège","Rassemble les gens","Se met devant"],
    // A · 6f4f83fba8c2
    "archetypes.arch_be_worth_it.blurb": "Tu ne te souviens pas l’avoir décidé. Tu te rappelles t’être mis entre un petit et quelque chose de plus gros, à huit ans, sans pouvoir dire pourquoi, et d’avoir vécu la première heure de ta vie où la question ne s’est pas posée.",
    // B · 09f2ba488e99
    "archetypes.arch_be_worth_it.startingAbilities": ["ab_stand_between"],
    // A · 397bef4a48f3
    "archetypes.arch_never_asked.name": "Tu as arrêté de demander",
    // B · f41369578616
    "archetypes.arch_never_asked.role": "Vitesse et autonomie",
    // A · b098cbb6bed7
    "archetypes.arch_never_asked.summary": "Tu as compris que toutes les réponses viendraient de gens qui avaient une raison de les donner, alors tu as arrêté de demander et tu es devenu très rapide et autonome.",
    // A · 3893ec53ab46
    "archetypes.arch_never_asked.playstyle": ["Rapide","Autonome","Difficile à cerner"],
    // A · e5f4a1bc437c
    "archetypes.arch_never_asked.blurb": "Tu aurais pu demander à Garp. Il était dans la maison, ivre, et il t’aurait sûrement répondu. Toi, t’es monté sur la montagne et t’es resté dehors pendant quatre jours, et depuis, c’est comme ça que tu gères toutes les grosses questions.",
    // B · 446fc1b308d4
    "archetypes.arch_never_asked.startingAbilities": ["ab_pipe_rush"],
    // B · 78db5a7da8e5
    "setupFields.archetype.label": "Quand tu avais huit ans, tu as entendu ce que les gens disent de l’enfant de Roger. Qu’est-ce que tu en as fait ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · d989835d1394
    "setupFields.archetype.helpText": "La seule chose que ce moment-là a laissée en toi, qui détermine ce dans quoi tu es bon. C’est fixé pour toute l’histoire. Ça ne décide pas si Luffy devient ton frère, si Sabo vit, si tu manges le fruit, ou ce que tu fais quand un amiral dit le nom de ton père — rien de tout ça n’est décidé ici.",
    // B · aa9e1f16ce6a
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que les gens comprennent mal à ton sujet ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · bdb5fc6e5ce2
    "setupFields.worldKnowsAboutYou.helpText": "L’écart entre ce que cette île a décidé que tu es et ce que tu es vraiment. Une phrase simple.",
    // B · 4fb960ac1125
    "setupFields.worldKnowsAboutYou.placeholder": "par ex. Tout le monde pense que je déteste être suivi. Je déteste être suivi par quelqu’un qui pourrait se faire mal.",
    // B · 69b03d336277
    "setupFields.what_you_want.label": "À quoi sert vraiment la boîte de conserve ?",
    // B · b6a31c665c0b
    "setupFields.what_you_want.kind": "CHOIX",
    // B · 7c513551154a
    "setupFields.what_you_want.helpText": "Un point de départ, pas un engagement. Tu peux faire exactement le contraire dans l’heure qui suit et le monde suivra.",
    // B · 18b1c093aa4d
    "setupFields.what_you_want.options.a_ship.label": "Un bateau. Sabo a fait le calcul et c’est un vrai chiffre.",
    // B · 236d2606ed24
    "setupFields.what_you_want.options.away.label": "Quitter cette île avant que quelque chose rende ça impossible.",
    // B · 21acd2bdbb43
    "setupFields.what_you_want.options.proof.label": "Preuve. De quoi, tu sais pas encore",
    // B · f4e4419e42ec
    "setupFields.what_you_want.options.the_three_of_us.label": "Rien pour l’instant. Ça a cessé d’être une question d’argent quand ça a cessé d’être celui d’une seule personne",
    // B · 22819fc4a921
    "setupFields.what_you_want.options.nobody_asks.label": "Quelque part assez loin pour que personne ait entendu la rumeur",
    // B · b76a08a03e62
    "protagonist.kind": "NOMMÉ",
    // B · 76c74ba4c853
    "protagonist.name": "Portgas D. Ace",
    // B · fcca6b746d0b
    "protagonist.pronouns": "il/lui",
    // B · e4cf1bf06a13
    "protagonist.description": "Dix ans. Svelte, tacheté de rousseur, cheveux noirs qui ne veulent rien faire, un tuyau en plomb qu’il traîne depuis deux ans, et un visage qui se ferme avant tout le reste.",
    // B · 646215e4924a
    "protagonist.setupHeading": "Quel genre d’Ace es-tu ?",
    // B · 53a643d4e7db
    "protagonist.portrait": "story_ace/protagonist",
    // B · d32b23165267
    "coverDirection": "SUJET : Portgas D. Ace, centré et évident, comme visuel clé d’un film anime sur sa vie. Ace au premier plan remplit le centre bas de la taille à la tête, plus grand que tout le reste et tenant à peu près la moitié du poids visuel. Vingt ans, mince et musclé sans être lourd, cheveux noirs en bataille jusqu’à la mâchoire, taches de rousseur sur les deux joues et le nez, yeux foncés, pas de barbe. Il porte un large chapeau orange avec un bandeau de perles rouges et deux petits badges bleus épinglés devant, un souriant et un triste ; un collier de perles rouges ; torse nu dans le design canonique du personnage ; short noir jusqu’aux genoux ; ceinture orange avec œillets métalliques ; sacoche bleue attachée à la cuisse gauche ; poignard à fourreau vert à la hanche. Le tatouage ASCE est visible sur son bras gauche supérieur avec le S barré. Un poing est enflammé d’une flamme orange-jaune vive qui soulève une distorsion thermique dans l’air au-dessus. Son expression est confiante et émotionnellement compliquée — pas un héros en colère générique, et pas souriant. DERRIÈRE LUI, en couches et plus petites mais lisibles individuellement, deux figures dans le même style anime : une en chapeau de paille et gilet rouge d’un côté, une aux cheveux blonds sous un haut-de-forme noir avec lunettes bleues de l’autre. Toutes deux dessinées petites, en arrière-plan moyen, identifiables par leur costume. Plus loin et énorme, un vieil homme imposant avec une moustache blanche en croissant vers le haut, un manteau de capitaine blanc sur un torse nu et marqué, et une grande hallebarde — il doit paraître plusieurs fois la taille d’Ace. Haut dans un coin, une flamme de phénix bleue. Lointain et sombre, une énorme silhouette lourde non résolue. En dessous et derrière tout ça, une architecture militaire en marbre blanc et une baie de navires de guerre, très petits. PALETTE : orange et noir dominants, avec une lumière clé chaude de feu sur Ace et un gris-bleu froid sur l’architecture et la mer, pour que le premier plan et l’arrière-plan appartiennent à des mondes différents. Le casting remplit le cadre. Pas de ciel vide. Ace est la seule figure nette.",
    // A · 9dfdcbc57a96
    "opening": "Il est à dix mètres en contrebas, il a arrêté de faire semblant de se cacher.\n\n« J’suis toujours là, » dit Luffy, derrière un arbre plus étroit que lui. « J’suis là depuis le début. T’étais au courant. »\n\nOnze jours. Courir plus vite ne sert à rien, parce qu’il court lui aussi. Partir à quatre heures du mat’ ne marche pas, il semble jamais dormir. Hier, t’as balancé un truc méchant exprès sur son chapeau, il y a réfléchi neuf secondes, puis il t’a demandé ce que tu voulais pour le déjeuner.\n\nEn haut de la pente, Sabo est assis sur une bûche, la pipe en travers des genoux, il aide pas, il se marre comme un fou.\n\n« Ace. » Luffy sort de derrière l’arbre, les genoux dans la boue, une écorchure sur un bras après la montée. « Ace. J’arrive à suivre. Regarde. J’arrive à suivre. »",
    // A · 1a697fe35275
    "openingSuggestions": ["« Rentre chez toi, Luffy. Cette fois j’suis sérieux — si tu nous suis encore, je te ficelle à un arbre et je te laisse là. » Je le regarde, pas Sabo, qui rigole, et avec qui je réglerai mes comptes plus tard.","Je tends la pipe de rechange en bas de la pente jusqu’à ce qu’il vienne la prendre. « Ok. Tu veux venir ? Reste dans mes roues. » Puis je me retourne et monte la crête à la vitesse que je tiendrais seul.","Je m’arrête. « Pourquoi moi ? Y’a mille personnes sur cette île que tu pourrais emmerder. Pourquoi c’est moi ? » Je veux vraiment savoir, c’est nouveau, et ça m’énerve."],
  },
});
