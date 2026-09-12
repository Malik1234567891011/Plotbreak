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
    "fantasyLabel": "Tu es né avec une condamnation sur le dos.",
    // A · af203a98112f
    "hook": "Tu es né en portant le nom du Roi des Pirates, et c’est à toi de dire si c’est une malédiction, un défi, ou rien du tout.",
    // A · 9c0db085121a
    "premise": "Tu as dix ans. Tu vis sur une montagne avec des bandits, parce qu’un héros des Marines n’a pas trouvé d’endroit plus sûr pour te mettre, et tu es très doué pour faire mal à ceux qui le méritent.\n\nQuelque part dans le monde, il existe un registre qui dit qui était ton père. Ceux qui ont entendu la rumeur disent que son enfant aurait dû être noyé à la naissance. Tu as compris, il y a quelques années, qu’ils parlent de toi, et tu n’as jamais demandé à personne de confirmer, parce que demander, c’est confirmer.\n\nTu as un ami maintenant. Sabo est le premier qui a choisi ce qu’il voulait être au lieu de l’accepter, et entre vous, il y a une boite de monnaie enterrée sous la cabane dans l’arbre qui va servir à acheter un bateau.\n\nEt tu as un problème. Il y a un gamin de sept ans avec un chapeau de paille qui te suit depuis onze jours. Il ne sait pas se battre, il ne sait pas mentir, il ne saisit pas les indices, et il ne s’arrête pas, et à un moment, tu vas devoir décider ce qu’il représente pour toi.\n\nTout ce qui est célèbre est encore devant toi et rien ne t’est dû.\n\nTu dois juste décider si ça valait le coup que tu sois né, et tu n’y arriveras pas en y réfléchissant.",
    // A · 656d55184b80
    "mechanicsChips": ["Sabo ne doit pas mourir","Tu peux refuser le fruit","La fierté est ce qui te tue","Rien de célèbre n’est programmé","Tu peux changer d’avis"],
    // A · 9097f9b2c9ce
    "creatorNote": "La version célèbre de cette vie finit sur une plateforme avec un amiral qui se trompe de nom au bon moment. Là, ça n’a pas à être comme ça. Garde Sabo en vie, pars avec tes frères au lieu de partir avant eux, donne le fruit à quelqu’un d’autre, laisse Barbe Blanche te dissuader de la poursuite, ou écoute Akainu et continue ton chemin. Chacune de ces options est une vraie destination. La plus difficile est la dernière, et elle est dure pour des raisons qui n’ont rien à voir avec la difficulté.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 10c23e68f4dc
    "rules.hardCanon": ["Le joueur incarne Portgas D. Ace, dix ans au début de l’histoire, élevé sur l’île de l’Aube par la bandit de montagne Curly Dadan à la demande de Monkey D. Garp.","Gol D. Roger est son père biologique et Portgas D. Rouge sa mère. Rouge l’a porté vingt mois pour le cacher au Gouvernement Mondial et est morte en le mettant au monde. Ace connaît la rumeur sur l’enfant de Roger et ne l’a jamais fait confirmer.","Ace ne commence pas l’histoire en connaissant les détails sur Rouge. Ce qu’il apprend d’elle vient de Garp, des archives ou de quelqu’un qui y était — jamais du narrateur qui décide qu’il s’en souvient.","Sabo est vivant, à peu près du même âge qu’Ace, noble de naissance et en fuite, et c’est la première personne qu’Ace a rencontrée qui a choisi sa propre identité plutôt que celle héritée. Rien n’est fixé sur sa mort en mer.","Luffy a sept ans, porte le chapeau de paille, ne se décourage pas, et idolâtre Ace en quelques jours. S’il devient le frère d’Ace se décide en jeu.","Garp porte une promesse faite à Roger et veut qu’Ace vive loin de l’héritage de Roger. Il est sincère là-dessus et très mauvais pour le dire.","Marshall D. Teach navigue sous Whitebeard, est patient, et attendra des années la bonne occasion. Sa trahison est une chose qu’il ferait si l’occasion se présente, pas un événement programmé.","Edward Newgate est énorme — plus de six mètres — et Ace doit paraître petit à côté. Il croit qu’une famille est un choix qu’on refuse ensuite d’abandonner, ce qui répond directement à la question qu’Ace porte depuis ses huit ans.","La fierté d’Ace est le mécanisme de la fin célèbre. Il est excellent pour mourir pour les autres et mauvais pour laisser les autres mourir pour lui, et aucune scène ne doit régler ça pour lui.","Rien en aval de l’île de l’Aube n’est dû. Ni les coupes de saké, ni la mort de Sabo, ni la piraterie, ni le Mera Mera no Mi, ni Whitebeard, ni Banaro, ni la plateforme. Si le joueur empêche un de ces événements, rien d’équivalent n’est inventé pour le remplacer."],
    // A · d08b83a8f2af
    "rules.toneGuide": "Une aventure d’anime pleine d’énergie, et clairement pas le registre d’Itachi. Pas de crépuscule, pas de symbolisme, pas de calme intérieur littéraire comme mode par défaut. Rends le mouvement, la mer, la chaleur, la faim, les cris, les rires, et des corps qui font des choses absurdes. Ce monde doit pouvoir accueillir un type qui s’endort la face dans sa soupe et un gars qui se demande si ça valait le coup qu’il soit né, dans la même heure, sans excuser l’un ou l’autre. Si une scène devient solennelle pendant trois temps, quelque chose de bruyant doit arriver. Ace est fier, s’énerve vite quand on insulte sa famille, est bizarrement poli avec les inconnus, et drôle. Ce n’est pas un gars qui en jette avec son feu. Luffy n’est pas écrit comme un génie — son intelligence, c’est sa certitude émotionnelle et son instinct de combat, et il ment très mal. Dadan râle à plein volume puis fonce dans le danger. Les scènes émotionnelles peuvent ralentir jusqu’à fond, et les bonnes sont courtes. Les combats sont lisibles : déformation par la chaleur, ce que le feu ne peut pas faire, où est la mer, qui est entre qui. Ne narre jamais un combat de cinq jours tour par tour — les échanges clefs, l’épuisement, le respect. Ne reproduis pas les dialogues du manga. Les phrases célèbres le sont ; écris ce qu’elles veulent dire avec les mots de ce monde.",
    // B · 2f9543133582
    "skills.pipe.name": "Tuyau",
    // B · 7ce3b6387340
    "skills.pipe.attribute": "agilité",
    // B · 507094aeab99
    "skills.pipe.description": "Un bout de tuyau en plomb balancé par quelqu’un qui n’a jamais pris de leçon et a déjà eu quatre cents combats.",
    // B · 608b291bb03f
    "skills.brawl.name": "Bagarre",
    // B · 97081b4b4792
    "skills.brawl.attribute": "force",
    // B · c207fe0db547
    "skills.brawl.description": "Proche, moche et engagé. Pas de posture, pas de forme, et une tolérance anormalement élevée à se prendre des coups en avançant.",
    // B · b3f73706ed78
    "skills.endure.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.endure.attribute": "volonté",
    // B · 61f5a1962698
    "skills.endure.description": "Toujours debout après le moment où rester debout ne semblait plus raisonnable. Ce en quoi il est vraiment le meilleur, à dix ans comme à vingt.",
    // B · f9c682e7f665
    "skills.provoke.name": "Provocation",
    // B · cfb7a15645c3
    "skills.provoke.attribute": "présence",
    // B · 9badec0cd3cc
    "skills.provoke.description": "Faire en sorte que quelqu’un de plus fort que toi frappe le premier. Utile, et le début de tous les vrais problèmes qu’il aura jamais.",
    // B · d57e32127c02
    "skills.forage.name": "Survivre",
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
    "skills.command.description": "Faire suivre les gens quelque part d’idiot, et — bien plus dur, bien plus tard — les faire rester derrière.",
    // B · 30b9028d32de
    "skills.fire.name": "Feu",
    // B · 5dbc8bb102ac
    "skills.fire.attribute": "arcane",
    // B · 8932094c660e
    "skills.fire.description": "Contrôle logia : quoi brûler, en quoi se transformer, et comment ne pas cuire les gens autour. Inutile tant qu’il n’a pas de fruit.",
    // B · 27eb4c7946a5
    "skills.haki.name": "Haki",
    // B · 5dbc8bb102ac
    "skills.haki.attribute": "arcane",
    // B · db041c13f31d
    "skills.haki.description": "Volonté rendue physique. Personne sur l’île de l’Aube ne peut l’enseigner et personne là-bas n’admet qu’il existe.",
    // B · 954f5d3b66b7
    "resources.fuel.name": "Énergie",
    // B · 34e8ec1ac388
    "resources.fuel.polarity": "BON_HAUT",
    // B · c1e334f7bdd7
    "resources.fuel.zeroStateConsequence": "Il dort. Pas en repos — endormi, en plein milieu d’une phrase, quelque part où ça dérange, et celui qui est avec lui doit décider s’il le porte ou laisse la situation se dérouler autour. Sur cette île c’est une blague. Sur un champ de bataille, ça ne l’est pas.",
    // B · dbdf72b8846c
    "resources.fuel.color": "#E8873A",
    // B · 0e2d0e1dbc06
    "resources.notoriety.name": "Notoriété",
    // B · a34adbda2422
    "resources.notoriety.polarity": "BON_BAS",
    // B · d8a7ce50d5b4
    "resources.notoriety.zeroStateConsequence": "Personne en dehors de cette île ne sait qu’il existe, ce qui à dix ans est juste la vérité et plus tard un exploit. Pas de prime, pas d’affiche, pas de Marine qui regarde deux fois. Quoi qu’il devienne, il peut le devenir sans être vu.",
    // B · 15636798f99e
    "resources.notoriety.color": "#9A3C34",
    // B · dbd17a4e848b
    "resources.pride.name": "Fierté",
    // B · a34adbda2422
    "resources.pride.polarity": "BON_BAS",
    // B · 30c80b29fd80
    "resources.pride.zeroStateConsequence": "Quelque chose s’est éteint en lui. Il lâche prise, accepte de l’aide sans discuter, s’éloigne des insultes, et ceux qui l’aiment trouvent ça plus effrayant que sa colère d’avant. Dadan le dit tout haut. Luffy demande s’il est malade.",
    // B · 8674546b870d
    "resources.pride.color": "#C7472E",
    // B · 1df20689c86a
    "resources.worth.name": "Valeur",
    // B · 34e8ec1ac388
    "resources.worth.polarity": "BON_HAUT",
    // B · b2bf2031ed5b
    "resources.worth.zeroStateConsequence": "Il a conclu que ce n’était pas une bonne chose qu’il soit né, et il est calme à ce sujet. Cette calme est l’état le plus dangereux de cette histoire : il cesse de se défendre d’une façon que personne ne remarque, prend le pire boulot, se tient au mauvais endroit, et rien de tout ça ne ressemble à du désespoir vu de l’extérieur.",
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
    "items.lead_pipe.description": "Un mètre de tuyau en plomb récupéré, légèrement plié à un tiers de sa longueur là où il a frappé quelque chose une fois.",
    // B · de9087e8cf0a
    "items.lead_pipe.loreText": "Chaque enfant sur cette île qui veut survivre en porte un. Sabo en a un. Luffy en aura un dans la semaine qui suit qu’on lui en ait laissé un. Il n’a rien de spécial, c’est pour ça que c’est l’arme qu’il préfère encore tenir à vingt ans.",
    // A · 2335100320f2
    "items.ship_fund.name": "La Boite",
    // B · b09613d5fc63
    "items.ship_fund.tags": ["quête","enfance"],
    // B · 0739a90af282
    "items.ship_fund.description": "Une boîte à biscuits enterrée, contenant cinq millions de berries en billets comptés plus souvent qu’ajoutés.",
    // B · 56655b56cfde
    "items.ship_fund.loreText": "Le plan, c’est un bateau. Pas un bateau précis — un bateau. Sabo a fait le calcul du prix et aucun des deux n’a remis le chiffre en question depuis, parce que le faire voudrait dire qu’aucun des deux ne sait. C’est la première chose dans la vie d’Ace qui appartient à plus d’une personne, et si jamais Luffy apprend où c’est enterré, ça voudra dire quelque chose qu’aucune conversation ne pourrait.",
    // A · 3a7340081e75
    "items.sake_cups.name": "Trois Coupes",
    // B · 52e99f839161
    "items.sake_cups.tags": ["quête","fraternité"],
    // B · ad8a1eccd9b6
    "items.sake_cups.rarity": "rare",
    // B · 923bae55f744
    "items.sake_cups.description": "Trois tasses ébréchées de l’étagère de Dadan, et une bouteille pour laquelle personne n’a demandé la permission.",
    // B · ca0809b40212
    "items.sake_cups.loreText": "La version célèbre de ça existe parce que trois garçons ont décidé que ça devait exister, dans une cabane dans un arbre, sans adulte. Ça n’arrive que si les trois l’ont mérité — une cérémonie attendue ne vaut rien — et une partie qui ne l’atteint pas n’a rien raté. C’est une autre famille.",
    // A · 77110499ad90
    "items.mera_mera.name": "Le Fruit Mera Mera",
    // B · ca6faa732ff8
    "items.mera_mera.tags": ["quête","fruit_du_démon"],
    // B · b3d251b141db
    "items.mera_mera.rarity": "unique",
    // B · 1f9dec53a2a0
    "items.mera_mera.description": "Un fruit orange en spirale avec des volutes en forme de flammes, dans une caisse qui a passé plus de temps en mer qu’elle n’aurait dû.",
    // B · 6a5933133ebc
    "items.mera_mera.loreText": "Le manger te fait devenir feu et t’empêche jamais de nager. Le donner à Deuce et c’est lui, et ton équipe est construite autour de quelqu’un d’autre. Le vendre et tu as acheté un bateau, une réputation et un paquet d’ennemis très tenaces. Le laisser dans la caisse et Fire Fist Ace n’existe tout simplement pas, et rien ne t’en offrira un second.",
    // A · 59875d2afb12
    "items.orange_hat.name": "Le Chapeau Orange",
    // B · 89bec992e76f
    "items.orange_hat.tags": ["identité","signature"],
    // B · db5ef3a0f2df
    "items.orange_hat.equipSlot": "tête",
    // B · ad8a1eccd9b6
    "items.orange_hat.rarity": "rare",
    // B · 8d220a26d36a
    "items.orange_hat.description": "Un large chapeau orange avec un ruban de perles rouges et deux badges bleus épinglés devant — un souriant, un fronçant les sourcils.",
    // B · 8e707b885834
    "items.orange_hat.loreText": "Il l’achète lui-même, quelque part entre le départ de chez lui et le Nouveau Monde, pour des raisons qu’il aurait du mal à expliquer. Les deux visages sont la blague et aussi l’homme entier : celui qui rit de tout et celui qui a déjà décidé comment ça finit, portés en même temps, sur la même tête, où tout le monde peut les voir.",
    // A · ac72869a014f
    "items.green_dagger.name": "Dague à Fourreau Vert",
    // B · b5e8d28b4848
    "items.green_dagger.tags": ["arme"],
    // B · c42857d78f9f
    "items.green_dagger.equipSlot": "ceinture",
    // B · eea96276bad0
    "items.green_dagger.rarity": "commun",
    // B · 38c53830e3ce
    "items.green_dagger.description": "Un petit couteau dans un fourreau vert, porté à la hanche et presque jamais dégainé.",
    // B · 02725bb02a03
    "items.green_dagger.loreText": "Un homme qui peut enflammer l’air n’a pas besoin d’un couteau, c’est justement pour ça qu’il en garde un. C’est pour la corde, les caisses, les poissons et la situation spécifique où le feu tuerait tout le monde dans la pièce, y compris la personne qu’il est venu chercher.",
    // A · 5fc4c6288848
    "items.vivre_card.name": "Carte Vivre",
    // B · c3468007c51d
    "items.vivre_card.tags": ["quête","lien"],
    // B · ad8a1eccd9b6
    "items.vivre_card.rarity": "rare",
    // B · 576241feea29
    "items.vivre_card.description": "Un bout de papier qui penche vers la personne d’où il vient, et qui brûle en même temps qu’elle.",
    // B · 162683b3c27b
    "items.vivre_card.loreText": "En donner un à quelqu’un est la façon la moins sentimentale que ce monde ait de dire que tu comptes le revoir. C’est aussi un indicateur de statut sur une vie qui compte pour toi, ce qui est un objet plus cruel qu’il n’y paraît : la personne qui tient le tien apprend que tu es en danger avant que tu aies fini d’y entrer.",
    // A · 0511c8d9b9e0
    "items.deuce_log.name": "Le Journal de Deuce",
    // B · 1f4597806f24
    "items.deuce_log.tags": ["quête","journal"],
    // B · af5aaf8f4e56
    "items.deuce_log.rarity": "peu_commun",
    // B · 51de7f20b6b6
    "items.deuce_log.description": "Un carnet à couverture rigide écrit dans une écriture petite et très lisible, avec des dates.",
    // B · 1a89cabed8e2
    "items.deuce_log.loreText": "Deuce note ce qui s’est vraiment passé, ce qui est le service le plus rare qu’on lui rende. Tous les autres qui tiennent un journal construisent une légende ou un dossier. Il connaissait Ace avant qu’il y ait une légende, et ce livre est la seule copie qui subsiste de cet homme.",
    // A · 8f78ee9f1bac
    "items.whitebeard_mark.name": "La Marque",
    // B · 44fef77fb6f7
    "items.whitebeard_mark.tags": ["identité","faction"],
    // B · b3d251b141db
    "items.whitebeard_mark.rarity": "unique",
    // B · a889188a8e18
    "items.whitebeard_mark.description": "Le drapeau de Barbe Blanche, sur tout son dos, fait d’une seule traite par quelqu’un qui l’a fait deux cents fois.",
    // B · 87a1bcddaf5a
    "items.whitebeard_mark.loreText": "Tu ne gagnes pas ça et on ne te le donne pas. Tu l’acceptes, ce qui est le verbe le plus dur, et ça va quelque part que tu ne peux pas voir ni cacher. Toute la position de Newgate, c’est que la famille se choisit et ne s’abandonne pas ; la marque, c’est cette phrase rendue permanente sur un garçon qui a passé dix ans à croire qu’il était une erreur.",
    // A · 70ccc092da8f
    "items.roger_record.name": "Le Registre",
    // B · 62b6533be5e1
    "items.roger_record.tags": ["quête","secret"],
    // B · b3d251b141db
    "items.roger_record.rarity": "unique",
    // B · 065019d611a2
    "items.roger_record.description": "Un dossier de la Marine, lourdement censuré, avec une naissance dans le South Blue et deux noms dessus.",
    // B · 57eb6cb61152
    "items.roger_record.loreText": "La confirmation, qu’il a passé toute sa vie à ne pas demander, parce que demander aurait été confirmer. Vingt mois sont écrits ici, de la main officielle de quelqu’un, comme une irrégularité médicale. Il ne saura pas quoi faire de ces vingt mois.",
    // A · 946581ec45d8
    "items.seastone_cuffs.name": "Le Roc-Marin",
    // B · a4d43e93dc61
    "items.seastone_cuffs.tags": ["quête","entrave"],
    // B · b3d251b141db
    "items.seastone_cuffs.rarity": "unique",
    // B · 5bcc394dc945
    "items.seastone_cuffs.description": "Des menottes pâles qui pèsent plus qu’elles ne devraient et font sentir la mer plus proche qu’elle ne l’est.",
    // B · 880f6792e192
    "items.seastone_cuffs.loreText": "Ce n’est pas tant qu’elles suppriment le fruit, c’est qu’elles rappellent au corps que la mer existe et est sous tout. Un Logia en seastone, c’est un homme ordinaire fatigué avec un nom célèbre, et c’est exactement l’état dans lequel le Gouvernement Mondial veut qu’on le montre.",
    // A · dbfd4b5c073b
    "abilities.ab_pipe_rush.name": "J’y Vais Direct",
    // B · 94020b1d1c63
    "abilities.ab_pipe_rush.tags": ["corps à corps","enfance"],
    // B · 21489e3c3811
    "abilities.ab_pipe_rush.description": "Rapproche-toi plus vite que ce qui est raisonnable et frappe d’abord la plus grosse cible disponible. Ça marche bien plus souvent que ça ne devrait, surtout parce que personne ne s’attend à ce qu’un enfant s’engage.",
    // B · 39d896e20aec
    "abilities.ab_pipe_rush.targetRule": "SINGLE",
    // A · 9949a00c530d
    "abilities.ab_take_it.name": "Prends Ça",
    // B · af4b2b364e73
    "abilities.ab_take_it.tags": ["défense","enfance"],
    // B · c25971fed417
    "abilities.ab_take_it.description": "Laisse le coup passer, garde les pieds, et reste debout avec une expression qui fait reconsidérer toute l’après-midi à l’autre.",
    // B · 43afef8b429c
    "abilities.ab_take_it.targetRule": "SELF",
    // A · 7e04acf889b9
    "abilities.ab_swing_first.name": "Répète Ça",
    // B · 17cafe296301
    "abilities.ab_swing_first.tags": ["social","fierté"],
    // B · 457613ae2547
    "abilities.ab_swing_first.description": "Fais qu’un type plus grand, plus vieux et mieux armé donne le premier coup, devant témoins, à cause de ce qu’il a dit. Ultra efficace et à l’origine de tous les vrais problèmes de cette vie.",
    // B · 39d896e20aec
    "abilities.ab_swing_first.targetRule": "SINGLE",
    // A · 083f820a929d
    "abilities.ab_fire_fist.name": "Poing de Feu",
    // B · f90953c3254a
    "abilities.ab_fire_fist.tags": ["feu","signature"],
    // B · 264d50ac5a46
    "abilities.ab_fire_fist.description": "Un coup de poing qui arrive en colonne de flammes et continue. Ce dont son nom est fait, jamais utilisé à l’intérieur sans conséquence.",
    // B · 503eb62e7676
    "abilities.ab_fire_fist.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_fire_fist.requires.flagsSet": ["ate_mera_mera"],
    // A · 0ef1bf85da40
    "abilities.ab_logia.name": "Rien à Toucher",
    // B · b8b12673011f
    "abilities.ab_logia.tags": ["feu","défense"],
    // B · e9b01d55146f
    "abilities.ab_logia.description": "Deviens le feu. Les lames et balles traversent un homme qui n’est plus solide, ce qui est imparable jusqu’à ce que quelqu’un apporte la mer, un utilisateur de Haki, ou un otage.",
    // B · 43afef8b429c
    "abilities.ab_logia.targetRule": "SELF",
    // B · 511cdc51debb
    "abilities.ab_logia.requires.flagsSet": ["ate_mera_mera"],
    // A · 56e42b7b0793
    "abilities.ab_banked_fire.name": "Mettre de Côté",
    // B · b9781426fced
    "abilities.ab_banked_fire.tags": ["feu","contrôle"],
    // B · 26348c3a0734
    "abilities.ab_banked_fire.description": "Tiens le feu à un niveau qui chauffe une pièce, sèche une équipe, éclaire un pont, sans tuer personne autour. Beaucoup plus dur que la colonne, et la raison pour laquelle on le laisse sur un bateau en bois.",
    // B · 503eb62e7676
    "abilities.ab_banked_fire.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_banked_fire.requires.flagsSet": ["ate_mera_mera"],
    // A · 48992b5fb783
    "abilities.ab_entei.name": "Tout en Même Temps",
    // B · 7bd2ee232b3c
    "abilities.ab_entei.tags": ["feu","désespoir"],
    // B · 20fead4f2fc4
    "abilities.ab_entei.description": "Tout, vers le haut, sans rien retenir ni rien laisser après. Ça règle la question de qui était le plus fort et le laisse incapable de tenir debout.",
    // B · 503eb62e7676
    "abilities.ab_entei.targetRule": "AREA",
    // B · 511cdc51debb
    "abilities.ab_entei.requires.flagsSet": ["ate_mera_mera"],
    // A · 996f2802fdf3
    "abilities.ab_haki_armament.name": "La Volonté à la Main",
    // B · e82938029171
    "abilities.ab_haki_armament.tags": ["haki"],
    // B · 98df7e5cfd7f
    "abilities.ab_haki_armament.description": "Fais que les poings comptent contre ceux que le feu ne peut toucher. Appris de quelqu’un qui a décidé qu’il valait la peine d’être enseigné, et c’est ça qui compte.",
    // B · 39d896e20aec
    "abilities.ab_haki_armament.targetRule": "SINGLE",
    // B · 39d7292218a4
    "abilities.ab_haki_armament.requires.flagsSet": ["appris_haki"],
    // A · 20193b95d67e
    "abilities.ab_stand_between.name": "Se Dresser Entre",
    // B · 0f82f5bfaa61
    "abilities.ab_stand_between.tags": ["fierté","signature"],
    // B · 741619e56435
    "abilities.ab_stand_between.description": "Se met physiquement entre quelque chose et quelqu’un d’autre. Il est super bon à ça, et ça ne lui coûte rien qu’il apprécie, ce qui est justement le problème.",
    // B · 39d896e20aec
    "abilities.ab_stand_between.targetRule": "SINGLE",
    // A · 73c75b0ac03b
    "abilities.ab_test_him.name": "Tiens-Lui Le Rythme",
    // B · e919bae2ad60
    "abilities.ab_test_him.tags": ["social","décision"],
    // B · f680de29bb64
    "abilities.ab_test_him.description": "Lance-lui le tuyau de rechange assez fort pour que ça fasse mal de le rattraper, puis monte la crête à la vitesse que tu prendrais seul.",
    // B · 39d896e20aec
    "abilities.ab_test_him.targetRule": "SINGLE",
    // A · dfbfae67fa07
    "abilities.ab_shut_him_out.name": "Dégage",
    // B · e919bae2ad60
    "abilities.ab_shut_him_out.tags": ["social","décision"],
    // B · fd35e37c1c74
    "abilities.ab_shut_him_out.description": "Dis-le clairement, sans adoucir, et continue d’avancer. Pas une menace — une décision, et il sera toujours là demain.",
    // B · 39d896e20aec
    "abilities.ab_shut_him_out.targetRule": "SINGLE",
    // A · abd4d3b361a3
    "abilities.ab_take_the_uniform.name": "Accepte la Proposition de Garp",
    // B · c7b0490461df
    "abilities.ab_take_the_uniform.tags": ["décision","irréversible"],
    // B · c528ba2ce1cc
    "abilities.ab_take_the_uniform.description": "Pars dans l’autre sens, avec le vieil homme, dans l’organisation qui a exécuté ton père.",
    // B · c44e6dd70059
    "abilities.ab_take_the_uniform.targetRule": "NONE",
    // A · 5306f3b7355b
    "abilities.ab_stay_home.name": "Pas Monter à Bord",
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
    "abilities.ab_hand_over_the_fruit.description": "Mets-le dans les mains de quelqu’un d’autre. Ton équipe a un Logia et ce n’est pas le capitaine, ça change tous les combats que tu auras.",
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
    "abilities.ab_finish_him.description": "Arrête les échanges et finis-le, contre quelqu’un que tu as déjà combattu. Disponible seulement pour un homme qui en a encore un en lui.",
    // B · 39d896e20aec
    "abilities.ab_finish_him.targetRule": "SINGLE",
    // A · 64c25a849954
    "abilities.ab_take_the_mark.name": "Accepte la Marque",
    // B · c7b0490461df
    "abilities.ab_take_the_mark.tags": ["décision","irréversible"],
    // B · 3630c6882ce7
    "abilities.ab_take_the_mark.description": "Fais demi-tour, enlève ta chemise, et laisse quelqu’un mettre un drapeau que tu n’as pas conçu sur un dos que tu ne peux pas voir.",
    // B · 43afef8b429c
    "abilities.ab_take_the_mark.targetRule": "SELF",
    // B · 5c5156f89f9d
    "abilities.ab_take_the_mark.requires.flagsSet": ["challengé_whitebeard"],
    // A · ae1a40213ba2
    "abilities.ab_refuse_the_mark.name": "Reste ton propre capitaine",
    // B · cc603f65bd76
    "abilities.ab_refuse_the_mark.tags": ["décision"],
    // B · 5838469d638a
    "abilities.ab_refuse_the_mark.description": "Refuse, sans insulter personne, et garde ton propre nom sur ton propre drapeau.",
    // B · c44e6dd70059
    "abilities.ab_refuse_the_mark.targetRule": "NONE",
    // B · 5c5156f89f9d
    "abilities.ab_refuse_the_mark.requires.flagsSet": ["challengé_whitebeard"],
    // A · 41c99dcc9890
    "abilities.ab_go_after_him.name": "Pars seul",
    // B · c1b79b033106
    "abilities.ab_go_after_him.tags": ["décision","fierté"],
    // B · f67affb61c9d
    "abilities.ab_go_after_him.description": "Bouge avant que quelqu’un ait fini sa phrase, et dis à personne où.",
    // B · c44e6dd70059
    "abilities.ab_go_after_him.targetRule": "AUCUN",
    // A · 0e160f2591e6
    "abilities.ab_take_them_with_you.name": "Prends une équipe",
    // B · cc603f65bd76
    "abilities.ab_take_them_with_you.tags": ["décision"],
    // B · a4b610bf23ab
    "abilities.ab_take_them_with_you.description": "« J’y vais. Je n’y vais pas seul. » Montre les commandants prêts à venir, et laisse-les venir.",
    // B · e9383e6237fe
    "abilities.ab_take_them_with_you.targetRule": "MULTI",
    // A · 1c3d5534026c
    "abilities.ab_stand_down.name": "Arrête-toi au bastingage",
    // B · 907ba36ba834
    "abilities.ab_stand_down.tags": ["décision","discipline"],
    // B · ab8b2a679695
    "abilities.ab_stand_down.description": "Arrête-toi, et laisse celui qui demande te donner la raison avant que la fierté ne décide pour toi.",
    // B · c44e6dd70059
    "abilities.ab_stand_down.targetRule": "AUCUN",
    // A · 6c45292faa0a
    "abilities.ab_break_off.name": "Romps",
    // B · cc603f65bd76
    "abilities.ab_break_off.tags": ["décision"],
    // B · c42556eb2db3
    "abilities.ab_break_off.description": "Arrête un combat que tu es en train de perdre et pars, tant que partir est encore possible.",
    // B · 43afef8b429c
    "abilities.ab_break_off.targetRule": "SOI",
    // A · 160dbe16fcea
    "abilities.ab_take_his_hand.name": "Prends sa main",
    // B · c7b0490461df
    "abilities.ab_take_his_hand.tags": ["décision","irréversible"],
    // B · b583d75cc5d7
    "abilities.ab_take_his_hand.description": "Accepte l’offre de l’homme qui vient de te renvoyer ta propre philosophie plus justement que personne avant lui.",
    // B · 39d896e20aec
    "abilities.ab_take_his_hand.targetRule": "SINGLE",
    // A · 711370fe0f96
    "abilities.ab_turn_back.name": "Dis son nom encore",
    // B · b450c7f149c3
    "abilities.ab_turn_back.tags": ["décision","fierté","irréversible"],
    // B · 55c2bddaa671
    "abilities.ab_turn_back.description": "Arrête de fuir. Fais demi-tour. Fais-lui répéter ce qu’il a dit sur l’homme qui t’a choisi.",
    // B · 39d896e20aec
    "abilities.ab_turn_back.targetRule": "SINGLE",
    // A · 52e8015fafd6
    "abilities.ab_keep_walking.name": "Continue d’avancer",
    // B · 907ba36ba834
    "abilities.ab_keep_walking.tags": ["décision","discipline"],
    // B · 10e056cea5d5
    "abilities.ab_keep_walking.description": "Serre les poings et continue, parce qu’il n’est pas venu ici pour que tu gagnes une dispute.",
    // B · 43afef8b429c
    "abilities.ab_keep_walking.targetRule": "SOI",
    // A · a91d9967da5c
    "abilities.ab_let_them_carry_you.name": "Laisse-les te porter",
    // B · 907ba36ba834
    "abilities.ab_let_them_carry_you.tags": ["décision","discipline"],
    // B · 7d643be5275b
    "abilities.ab_let_them_carry_you.description": "Regarde ton frère une fois, et laisse quelqu’un d’autre prendre cette décision, et va où on t’emmène.",
    // B · 43afef8b429c
    "abilities.ab_let_them_carry_you.targetRule": "SOI",
    // A · a6ee0a1b5e3e
    "abilities.ab_laugh_at_him.name": "Rire de lui",
    // B · c1b79b033106
    "abilities.ab_laugh_at_him.tags": ["décision","fierté"],
    // B · 6b147859d158
    "abilities.ab_laugh_at_him.description": "Continue de courir en souriant par-dessus ton épaule. « Tu forces trop. » Ce n’est pas rien, mais ce n’est pas faire demi-tour.",
    // B · 39d896e20aec
    "abilities.ab_laugh_at_him.targetRule": "SINGLE",
    // A · 8b6ac48de49d
    "abilities.ab_use_her_name.name": "Utilise son nom",
    // B · 87270514ac8a
    "abilities.ab_use_her_name.tags": ["décision","identité"],
    // B · 7a69b440adf8
    "abilities.ab_use_her_name.description": "Portgas. Le sien, choisi exprès, dit en entier aux gens qui attendaient l’autre.",
    // B · c44e6dd70059
    "abilities.ab_use_her_name.targetRule": "AUCUN",
    // B · e5725d0f5ea3
    "abilities.ab_use_her_name.requires.flagsSet": ["sait_pour_roger"],
    // A · a96799cc04b5
    "abilities.ab_say_it_all.name": "Dis le nom en entier",
    // B · 87270514ac8a
    "abilities.ab_say_it_all.tags": ["décision","identité"],
    // B · 1a390c211b6f
    "abilities.ab_say_it_all.description": "Gol D. Ace, à voix haute, là où les gens peuvent entendre, après avoir calculé exactement ce que ça coûte.",
    // B · c44e6dd70059
    "abilities.ab_say_it_all.targetRule": "AUCUN",
    // B · e5725d0f5ea3
    "abilities.ab_say_it_all.requires.flagsSet": ["sait_pour_roger"],
    // A · 6707d9c309f8
    "locations.mt_colubo.name": "Mont Colubo",
    // A · 24e75d6b0b32
    "locations.mt_colubo.shortName": "La Montagne",
    // B · a9b362efd355
    "locations.mt_colubo.description": "Une forêt assez raide pour que les sentiers ne soient vraiment que les endroits où il y a moins de végétation. Des tigres plus gros que les bandits, une rivière avec une cascade que personne n’a mesurée, et chaque arbre à une heure de la maison de Dadan a été grimpé et nommé par deux garçons qui refusent d’admettre qu’ils les ont nommés.",
    // B · 6a0b1f6fe507
    "locations.mt_colubo.stageImage": "story_ace/stage_mt_colubo",
    // B · 46277b314b39
    "locations.mt_colubo.ambientSfx": ["cigales","vent dans la canopée","quelque chose de gros qui bouge"],
    // A · 18d19bf4f12b
    "locations.dadan_house.name": "Maison de la famille Dadan",
    // A · 0bf3f792e278
    "locations.dadan_house.shortName": "Chez Dadan",
    // B · 39c006c52368
    "locations.dadan_house.description": "Une longue maison en bois qui sent la fumée, la viande qui sèche et l’alcool bon marché, avec neuf adultes qui se plaignent tout le temps des deux enfants pour qui ils mourraient. Il y a un trou dans le toit qui attend d’être réparé depuis trois ans.",
    // B · 2549009e3168
    "locations.dadan_house.stageImage": "story_ace/stage_dadan_house",
    // B · 62cb1fd8d676
    "locations.dadan_house.ambientSfx": ["hommes qui se disputent","crépitement de feu","casseroles"],
    // A · fe6c5faf5335
    "locations.asl_treehouse.name": "La Cabane dans l’Arbre",
    // A · 8584e4fea7c3
    "locations.asl_treehouse.shortName": "Cabane",
    // B · 063c569b09f6
    "locations.asl_treehouse.description": "Des planches, une corde et de la ténacité, à douze mètres de haut, construit par deux personnes qui ne voulaient pas demander de l’aide. La boîte est enterrée à la base sous une pierre plate qui semble posée là par hasard, mais ne l’est pas.",
    // B · 43556e9d2b84
    "locations.asl_treehouse.stageImage": "story_ace/stage_asl_treehouse",
    // B · a9fb05fe1779
    "locations.asl_treehouse.ambientSfx": ["corde qui grince","ressac lointain","feuilles"],
    // A · f57e99987e5d
    "locations.gray_terminal.name": "Terminaux Gris",
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
    "locations.goa_high_town.description": "Des rues propres, des volets peints, et des habitants qui ont organisé toute leur vie pour ne pas voir ce qu’il y a de l’autre côté de leur mur. Sabo a grandi dans une de ces maisons et ne dira pas laquelle.",
    // B · 2f11af765bb9
    "locations.goa_high_town.stageImage": "story_ace/stage_goa_high_town",
    // B · afca152c9cfc
    "locations.goa_high_town.ambientSfx": ["ressac","cordages","goélands"],
    // A · e8e0f57e396f
    "locations.dawn_shore.name": "Rivage de l’Île Aube",
    // A · 2169f87596d2
    "locations.dawn_shore.shortName": "Le Rivage",
    // B · 2e1039bb9797
    "locations.dawn_shore.description": "Du sable gris, un ponton branlant, et l’horizon que vous décrivez tous les deux depuis deux ans sans que l’un de vous ait jamais rien vu dessus. Tous les départs de cette histoire partent d’ici.",
    // B · cf2d0a0021bf
    "locations.dawn_shore.stageImage": "story_ace/stage_dawn_shore",
    // B · afca152c9cfc
    "locations.dawn_shore.ambientSfx": ["ressac","cordages","goélands"],
    // A · 14797bab038a
    "locations.sixis.name": "Sixis",
    // A · 14797bab038a
    "locations.sixis.shortName": "Sixis",
    // B · 793eb59ebb36
    "locations.sixis.description": "Une île déserte à la limite de l’East Blue, avec de l’eau douce, pas un habitant, et un autre homme qui fait semblant lui aussi d’être là par hasard. C’est là qu’un garçon parti seul découvre qu’il ne va pas y arriver tout seul.",
    // B · 05a0df5ea5e8
    "locations.sixis.stageImage": "story_ace/stage_sixis",
    // B · d551a677345d
    "locations.sixis.ambientSfx": ["ressac","insectes","un homme qui marmonne"],
    // A · 77d0b20ab21e
    "locations.spade_ship.name": "Le Spade",
    // A · 77d0b20ab21e
    "locations.spade_ship.shortName": "Le Spade",
    // B · 34da18d1fa45
    "locations.spade_ship.description": "Un navire acheté, volé ou gagné selon comment ça s’est passé, avec un équipage qui a choisi un capitaine plus jeune que la plupart. À l’étroit, bruyant, et la première chose dans la vie d’Ace qui lui appartenait parce qu’on la lui a donnée.",
    // B · 1a279bc29a14
    "locations.spade_ship.stageImage": "story_ace/stage_spade_ship",
    // B · 1da8f9e927a2
    "locations.spade_ship.ambientSfx": ["bois qui craque","rire de l’équipage","eau contre la coque"],
    // A · ea199e51d13b
    "locations.grand_line_port.name": "Port de la Grande Ligne",
    // A · bbee5ccbb1ef
    "locations.grand_line_port.shortName": "Port",
    // B · 9990546e2d60
    "locations.grand_line_port.description": "Une des quarante villes qui fonctionnent toutes pareil : un port plein de drapeaux dont personne ne demande l’origine, un tableau des primes, un bar où trois phrases mal placées déclenchent quelque chose, et un bureau des Marines qui fait semblant de ne pas tenir de liste.",
    // B · 0c850eca5323
    "locations.grand_line_port.stageImage": "story_ace/stage_grand_line_port",
    // B · 411374835f2c
    "locations.grand_line_port.ambientSfx": ["foule","goélands","cloches de navire"],
    // A · 24d9d47adaee
    "locations.moby_dick_deck.name": "Le Moby Dick — Pont",
    // A · 648fee57f435
    "locations.moby_dick_deck.shortName": "Moby Dick",
    // B · 7bb7d7ca2a67
    "locations.moby_dick_deck.description": "Un navire tête de baleine de la taille d’un quartier, avec un vieil homme dans un fauteuil au centre qui est plus grand que le fauteuil ne devrait le permettre. Seize divisions y vivent et toutes l’appellent pareil.",
    // B · bd0906fb9ab5
    "locations.moby_dick_deck.stageImage": "story_ace/stage_moby_dick_deck",
    // B · c6df40642496
    "locations.moby_dick_deck.ambientSfx": ["énormes poutres","équipage de centaines","mer"],
    // A · 766beac0963e
    "locations.moby_dick_mess.name": "Le Moby Dick — Réfectoire",
    // A · b255cdb69014
    "locations.moby_dick_mess.shortName": "Le Réfectoire",
    // B · c9081cbd57fb
    "locations.moby_dick_mess.description": "Là où la Quatrième Division nourrit quatre cents personnes deux fois par jour et où toutes les relations sur ce navire se forment vraiment. Thatch gère ça. Teach mange ici. Ace aussi, le visage dans son assiette, parfois en plein milieu d’une phrase.",
    // B · 9cb01aa12cef
    "locations.moby_dick_mess.stageImage": "story_ace/stage_moby_dick_mess",
    // B · 0acbfba988b5
    "locations.moby_dick_mess.ambientSfx": ["vent et sable","marché","chaleur"],
    // A · 6e6977afff82
    "locations.whitebeard_medical.name": "Le Moby Dick — Infirmerie",
    // A · 4dcb820fa9fb
    "locations.whitebeard_medical.shortName": "Infirmerie",
    // B · 6fb6162f8e6e
    "locations.whitebeard_medical.description": "Le domaine de Marco, et la seule pièce tranquille de ce navire. Chaque année, il y a plus de machines autour du lit du capitaine, et personne à bord ne l’a jamais dit à voix haute.",
    // B · 4df402123f80
    "locations.whitebeard_medical.stageImage": "story_ace/stage_whitebeard_medical",
    // B · 21ed631c101d
    "locations.whitebeard_medical.ambientSfx": ["bourdonnement d’appareils","équipage au loin","respiration lente"],
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
    "locations.banaro.description": "Une ville qui n’existera plus ce soir. Deux hommes qui croient tous les deux que tu dois vivre sans regret se rencontrent en son centre pour décider lequel le pense vraiment.",
    // B · 17012129edfe
    "locations.banaro.stageImage": "story_ace/stage_banaro",
    // B · 79c6a76ac768
    "locations.banaro.ambientSfx": ["feu","murs qui s’écroulent","vent"],
    // A · 6c1f7cef35b0
    "locations.impel_down.name": "Impel Down — Niveau six",
    // A · 2536718892cd
    "locations.impel_down.shortName": "La cellule",
    // B · 598692cd4fd2
    "locations.impel_down.description": "L’étage d’où personne ne sort, où les prisonniers sont des gens que le monde a décidé d’arrêter de compter. Pierre de mer aux poignets, pas de mer en vue, et un visiteur qui revient sans cesse en criant.",
    // B · c00e11843016
    "locations.impel_down.stageImage": "story_ace/stage_impel_down",
    // B · 94fb4ac64d84
    "locations.impel_down.ambientSfx": ["gouttes","cris lointains","chaîne"],
    // A · ee0e96889d54
    "locations.marineford_platform.name": "Plateforme d’exécution",
    // A · d8f0415d6f00
    "locations.marineford_platform.shortName": "La plateforme",
    // B · 6534e251ce3f
    "locations.marineford_platform.description": "Une pierre surélevée au-dessus d’une place construite pour une guerre, avec trois amiraux, une baie pleine de navires de guerre, et toute la presse du monde réunie pour voir un homme devenir un argument.",
    // B · 615f1f5f0f58
    "locations.marineford_platform.stageImage": "story_ace/stage_marineford_platform",
    // B · e7acdfbd750a
    "locations.marineford_platform.ambientSfx": ["foule énorme","vent","une seule cloche"],
    // A · fed0a78fc8b6
    "locations.marineford_battlefield.name": "Marineford",
    // A · fed0a78fc8b6
    "locations.marineford_battlefield.shortName": "Marineford",
    // B · 37e84751dae9
    "locations.marineford_battlefield.description": "La place quand elle cesse d’être une scène. Tous ceux qui l’ont jamais choisi y sont, et beaucoup ne partiront pas, et c’est l’arithmétique qu’il va devoir accepter.",
    // B · 5f472b7ebc5b
    "locations.marineford_battlefield.stageImage": "story_ace/stage_marineford_battlefield",
    // B · db17f4a975d2
    "locations.marineford_battlefield.ambientSfx": ["guerre","feu","cris"],
    // B · b4432f4350ea
    "characters.luffy.name": "Monkey D. Luffy",
    // A · 2a1ee566d979
    "characters.luffy.role": "Sept ans, il te suit depuis onze jours et rien de ce que tu as essayé ne l’a découragé",
    // A · fb041a5f63ff
    "characters.luffy.cardBlurb": "Il ne sait pas se battre, il ne sait pas mentir, et il ne comprend pas ce que veut dire être rejeté. Pour lui, tu es son frère, et il attend patiemment que tu le rattrapes. Et la seule chose qui pourrait vraiment l’arrêter ne t’est même pas venue à l’esprit, parce que ça voudrait dire être gentil avec lui.",
    // B · fcca6b746d0b
    "characters.luffy.pronouns": "il/lui",
    // A · 4d5878d68d84
    "characters.luffy.publicTraits": ["Annonce ce qu’il va faire avant de le faire n’importe comment","Se relève à chaque fois","Affamé au point que ça dicte toute sa journée"],
    // B · f4c21a37cf48
    "characters.luffy.hiddenDrives": ["Il ne suit pas Ace parce qu’Ace est fort. Il le suit parce qu’il était seul sur cette île avant qu’Ace existe et a décidé de ne plus jamais l’être","Il n’a jamais envisagé une seule fois qu’Ace ne veuille pas de lui, et qu’on lui dise clairement ne serait pas une information pour lui"],
    // B · 677281d1d3a0
    "characters.luffy.values": ["Dire la vérité tout de suite, fort","Ne pas être laissé derrière, qu’il considère comme une loi naturelle plus qu’une préférence"],
    // B · f1f0778425ce
    "characters.luffy.fears": ["Être seul, physiquement et vraiment — une pièce vide lui fait plus peur qu’un tigre","Que les gens qui partent le fassent à cause de quelque chose qu’il a fait"],
    // A · 06f6f98df74f
    "characters.luffy.socialStyle": "Aucune distance. Il se tient trop près, pose des questions impossibles à voix normale, et ne rougit de rien. Il rigole de choses qui ne sont pas des blagues, et c’est sincère.",
    // B · cec79dd73981
    "characters.luffy.boundaries": ["Il ne fera pas semblant d’accepter pour couper court à une conversation. Il dit non et continue de suivre","Il ne se laisse pas acheter avec de la nourriture, tout le monde le suppose mais personne n’a essayé"],
    // B · 161354d5dd95
    "characters.luffy.goals": ["Avoir la permission de monter dans l’arbre","Découvrir ce qu’il y a dans la boîte","Frapper Ace une fois, vraiment, pour qu’Ace le remarque"],
    // B · c9d7aa07d58f
    "characters.luffy.secrets.luffy_knows_where_the_can_is.fact": "Il a compris où la boîte est enterrée au quatrième jour en regardant quelle pierre plate Ace évite de marcher dessus, et il ne l’a pas déterrée, parce que ce n’est pas le but.",
    // B · 47558a04be8d
    "characters.luffy.secrets.luffy_knows_where_the_can_is.visibility": "NPC_PRIVATE",
    // B · 1652fb0e5fbb
    "characters.luffy.secrets.luffy_knows_where_the_can_is.revealHint": "Il le dit volontiers, joyeusement et au pire moment possible, la première fois que quelqu’un suggère qu’il ne comprend pas ce qui se passe.",
    // B · f7cc2357d56f
    "characters.luffy.secrets.luffy_hat_promise.fact": "Le chapeau lui a été donné par un homme qui est parti, avec une consigne, et Luffy a décidé que cette consigne signifie qu’il n’a pas le droit d’être le genre de personne qui reste sur place.",
    // B · 47558a04be8d
    "characters.luffy.secrets.luffy_hat_promise.visibility": "NPC_PRIVATE",
    // B · 9606e7b18983
    "characters.luffy.secrets.luffy_hat_promise.revealHint": "Demande-lui son chapeau plutôt que Shanks. Il expliquera tout en quatre phrases, sans que ce soit triste.",
    // A · a6147b635afd
    "characters.luffy.speechStyle": "Des cris courts qui clament ce qu’il fait, sans fioritures. Pas de propositions subordonnées. Il répète un refus à l’identique au lieu de le reformuler. Il dit « Ace » tout le temps, comme une phrase complète. Il rigole en pleine phrase.",
    // A · 20f81f6ba0e3
    "characters.luffy.topics": ["te suivre","la nourriture","l’arbre","être fort","le chapeau","les pirates","ce qu’il y a dans la boîte"],
    // A · 82d1ed74a565
    "characters.luffy.voiceSamples": ["J’arrive. T’as pas dit que je pouvais pas, t’as dit que tu m’accrocherais à un arbre. C’est pas pareil.","Je me suis relevé. Tu vois ? Je me suis relevé. Refais.","On mange ? Parce que j’ai trouvé un truc, je crois que c’est de la viande.","Tu peux pas me laisser. Je vais juste marcher là où tu as marché."],
    // B · 95c1b8216f4e
    "characters.luffy.appearance": "À sept ans : petit, maigre et écorché, cheveux noirs en bataille, yeux ronds et expressifs, la cicatrice déjà sous l’œil gauche, un chapeau de paille trop grand pour lui, un gilet rouge sans manches, un short, des sandales. Pas un adulte miniature — un gamin négligé qui est tombé de quelque chose.",
    // B · 377341d4a7ca
    "characters.luffy.visualHook": "Le chapeau de paille, toujours sur la tête, toujours trop grand, jamais posé quelque part.",
    // B · 9a599865eee6
    "characters.luffy.silhouette": "Petit, jambes écartées, bras écartés, le bord du chapeau casse la forme de la tête.",
    // B · b0e1b2164c99
    "characters.luffy.artSeed": "ace-luffy-child-01",
    // B · 1dbe2bcd48d5
    "characters.luffy.portrait": "story_ace/luffy",
    // B · 6bdb93f9be71
    "characters.luffy.expressions": ["neutre","souriant","furieux","en pleurs","endormi"],
    // B · c06f4bfa5e8d
    "characters.luffy.knowledgeScope": ["luffy","dadan_house","mt_colubo","the_hat","garp_visits"],
    // B · bceffb5d04ee
    "characters.luffy.gates.luffy_is_a_brother.label": "Il cesse d’être un problème et devient de la famille",
    // B · 55a54e80451a
    "characters.luffy.gates.luffy_is_a_brother.kind": "TRUST",
    // B · 750c58cd6ed7
    "characters.luffy.gates.luffy_is_a_brother.requires.flagsSet": ["spoke :luffy"],
    // B · 206f9aa27dc8
    "characters.luffy.gates.luffy_will_stay_behind.label": "Il restera vraiment derrière si Ace lui demande",
    // B · 55a54e80451a
    "characters.luffy.gates.luffy_will_stay_behind.kind": "TRUST",
    // B · 250a0ac07183
    "characters.luffy.gates.luffy_will_stay_behind.requires.flagsSet": ["asl_brotherhood"],
    // B · 8b7df9ead796
    "characters.luffy.combatant.tags": ["caoutchouc","enfant","ne-se-laisse-pas-faire"],
    // B · 3439b902c7e4
    "characters.sabo.name": "Sabo",
    // A · 4d28c44640a2
    "characters.sabo.role": "Ton premier vrai ami, né dans la ville propre de l’autre côté du mur, et le seul que tu connaisses qui ait jeté le nom qu’on lui avait donné",
    // A · e75a9c606f14
    "characters.sabo.cardBlurb": "Il prouve que la naissance n’est pas une obligation, c’est l’argument que t’as besoin d’entendre et que tu refuserais d’un adulte. C’est aussi un menteur, un voleur, et un meilleur tacticien que toi, et une famille à Hautbourg n’a jamais cessé de le chercher.",
    // B · fcca6b746d0b
    "characters.sabo.pronouns": "il/lui",
    // A · c8dd4bf6eebd
    "characters.sabo.publicTraits": ["Explique le plan même si personne ne demande","Vole avec adresse et sans remords","Change de sujet quand il s’agit de son père"],
    // B · ffa02a45d42d
    "characters.sabo.hiddenDrives": ["Il a besoin que quelqu’un dise à voix haute que partir n’était pas de la lâcheté, mais il ne l’a jamais demandé","Il a peur d’être repris — pas tué, repris, remis dans la maison et mis à l’aise, ce qu’il considère pire que tout ce que Gray Terminal peut lui faire"],
    // B · 112ded7e81c5
    "characters.sabo.values": ["Choisir ce que tu es et payer le prix","Partager tout en trois quand vous êtes trois, sans discuter"],
    // B · f658279bca03
    "characters.sabo.fears": ["Que le mur soit réel et que tous ceux qui naissent dedans soient définitivement des leurs","Qu’Ace décide que l’histoire de Roger est le destin, parce que s’il y croit, Sabo y croira aussi pour lui"],
    // A · b5893d7f3f47
    "characters.sabo.socialStyle": "Il s’assoit sur les trucs. Parle avec les mains et la bouche pleine. Il argumente en exposant l’alternative plutôt qu’en te contredisant, ce qui marche sur Ace moitié du temps et l’énerve l’autre moitié.",
    // B · 3884453fe66a
    "characters.sabo.boundaries": ["N’ira pas en Haute Ville pour aucune raison, pour personne, à aucun prix","Ne veut pas qu’on l’appelle par son nom de famille, et ne répond pas la première fois qu’on le fait"],
    // B · ee9e9ab33698
    "characters.sabo.goals": ["Acheter le bateau","Partir en mer avant que quelque chose rende ça impossible","Faire dire à Ace, une fois, que le fait d’être le fils de Roger n’est pas pareil que d’être Roger"],
    // B · 447e9162ccbe
    "characters.sabo.secrets.sabo_noble_family.fact": "Sa famille est noble de Goa, il sait exactement quelle maison, et ça fait deux ans qu’ils offrent de l’argent pour avoir des infos sur lui.",
    // B · 47558a04be8d
    "characters.sabo.secrets.sabo_noble_family.visibility": "NPC_PRIVÉ",
    // B · 204de1cfb5ee
    "characters.sabo.secrets.sabo_noble_family.revealHint": "Il le dit en une phrase plate, sans y être poussé, la nuit où la fraternité devient réelle, puis il parle immédiatement d’autre chose.",
    // B · f1ffc180fd84
    "characters.sabo.secrets.sabo_knows_about_the_burning.fact": "Il a entendu les nobles parler de ce qui arrive au Terminal Gris avant la visite du Noble Mondial, et il ne l’a pas dit à Ace, parce que le dire à Ace signifie qu’Ace y descend.",
    // B · 47558a04be8d
    "characters.sabo.secrets.sabo_knows_about_the_burning.visibility": "NPC_PRIVÉ",
    // B · 5b5e14e40b5f
    "characters.sabo.secrets.sabo_knows_about_the_burning.revealHint": "Insiste sur pourquoi il a été bizarre toute la semaine plutôt que sur le Terminal lui-même.",
    // A · 74f3764a9252
    "characters.sabo.speechStyle": "Fluent et rapide, phrases complètes, vocabulaire d’une vraie bonne éducation utilisé avec décontraction. Commence ses phrases par « regarde » quand il va être raisonnable et par « non, écoute » quand c’est pas le cas. Il rit en disant certains mots.",
    // A · 1821d0d3ba44
    "characters.sabo.topics": ["le navire","la boîte","le mur","Haute Ville","son père","les pirates","Luffy","ce que le nom d’Ace signifie"],
    // A · 0e06c190d61b
    "characters.sabo.voiceSamples": ["Regarde — personne ne vérifie la porte est avant midi. C’est pas de la chance, c’est un planning, et les plannings c’est juste des gens qui se paient la corde au cou à l’heure.","Non, écoute. T’as pas choisi ton père. Moi j’ai choisi le mien, puis je l’ai déchoisi. L’un de nous a fait un truc dur, c’était pas toi.","S’il nous suit encore un jour, il vient avec nous, et tu sais bien, et ça t’embête juste que ce soit pas ton idée.","Ne me dis plus jamais ce nom."],
    // B · 36a66bf04a53
    "characters.sabo.appearance": "À dix ans : même taille qu’Ace, cheveux blonds bouclés courts, visage plus rond, une dent manquante, un grand chapeau haut de forme noir avec des lunettes bleues enroulées autour, veste bleue avec les manches retroussées, une cravate, short bleu pâle, une pipe. Pas encore de cicatrice ni de long manteau — ça, c’est pour un homme qu’il n’est pas encore devenu.",
    // B · 02df894c9e6e
    "characters.sabo.visualHook": "Le chapeau haut de forme avec les lunettes, absurde sur un gamin de dix ans et jamais enlevé.",
    // B · f2b7d2cbbc01
    "characters.sabo.silhouette": "Grand chapeau qui casse la forme de la tête, pipe sur une épaule, veste évasée.",
    // B · e2eb787e8983
    "characters.sabo.artSeed": "ace-sabo-child-01",
    // B · a330bc9fc151
    "characters.sabo.portrait": "story_ace/sabo",
    // B · 31f61e286331
    "characters.sabo.expressions": ["neutre","souriant","maniganceur","en colère","effrayé"],
    // B · e9204d7b20d8
    "characters.sabo.knowledgeScope": ["sabo","asl_treehouse","gray_terminal","goa_high_town","the_wall","the_ship_plan","nobility"],
    // B · 637511c41505
    "characters.sabo.gates.sabo_tells_you_his_house.label": "Il dit de quelle famille il vient",
    // B · 55a54e80451a
    "characters.sabo.gates.sabo_tells_you_his_house.kind": "CONFIANCE",
    // B · 369fdde6898f
    "characters.sabo.gates.sabo_tells_you_his_house.requires.flagsSet": ["spoke :sabo"],
    // B · 1af9f458b572
    "characters.sabo.gates.sabo_will_not_sail_alone.label": "Il refusera le bateau plutôt que de le prendre sans Ace",
    // B · 9e8ae18bf8bf
    "characters.sabo.gates.sabo_will_not_sail_alone.kind": "ALLIANCE",
    // B · 250a0ac07183
    "characters.sabo.gates.sabo_will_not_sail_alone.requires.flagsSet": ["asl_brotherhood"],
    // B · 29c488ba55b8
    "characters.sabo.combatant.tags": ["pipe","enfant","tacticien"],
    // B · dd4ca389a0b8
    "characters.dadan.name": "Dadan la Bouclée",
    // A · 21d75fafd29a
    "characters.dadan.role": "La bandite de la montagne à qui un vice-amiral des Marines a confié deux gamins, et qui râle tous les jours depuis sans jamais les lâcher d’une semelle.",
    // A · 2d52016b3074
    "characters.dadan.cardBlurb": "Elle te hurle dessus, te menace, et elle dit à qui veut l’entendre que Garp lui a gâché la vie en te laissant ici. Elle ne t’a jamais levé la main dessus. Si tu rentres en retard elle descend la montagne armée, et elle n’avouera jamais que c’est pour ça.",
    // B · aee35f364a88
    "characters.dadan.pronouns": "elle",
    // A · de227e786921
    "characters.dadan.publicTraits": ["Le volume en mode personnalité","Cigarette toujours à la bouche","Annonce souvent, sans raison, qu’elle n’est pas leur mère"],
    // B · feeb2b4c70e0
    "characters.dadan.hiddenDrives": ["Elle a décidé il y a des années que le garçon ne grandirait pas en croyant qu’il était un fardeau, et toute sa méthode pour y arriver, c’est de se plaindre tellement fort que ça passe pour normal","Elle a plus peur que Garp revienne les chercher que de n’importe quoi dans la forêt"],
    // B · 15fce4c412c5
    "characters.dadan.values": ["Se pointer armée quand ça compte, et jamais en reparler après","Ne pas mentir aux enfants sur ce que sont les adultes"],
    // B · 99bae1793a32
    "characters.dadan.fears": ["Que l’affaire Roger arrive jusqu’à la montagne et qu’elle ne puisse rien y faire avec une hache","Qu’Ace parte à dix-sept ans en croyant que personne dans cette maison ne l’a voulu"],
    // A · 3799dc75226d
    "characters.dadan.socialStyle": "Chaque conversation commence par un cri et redescend. Les insultes sont des marques d’affection. Immense physiquement et complètement inoffensive pour ceux qui la connaissent.",
    // B · 5922cc7db78f
    "characters.dadan.boundaries": ["Ne veut pas qu’on la remercie. Si on la remercie, elle quitte la pièce","Ne veut pas discuter des raisons de Garp, parce qu’elle ne les connaît pas et déteste ne pas les savoir"],
    // B · 421205b96bea
    "characters.dadan.goals": ["Faire manger aux deux quelque chose qui n’est pas volé","Avoir une soirée sans que personne ne saigne","Ne plus jamais parler à Monkey D. Garp, un but qu’elle rate chaque année"],
    // B · 2397d3f6d3b6
    "characters.dadan.secrets.dadan_kept_the_notice.fact": "Elle a le papier que Garp a laissé avec le garçon — un nom, une date, et pas de père dessus — plié dans une boîte en fer sous le plancher, et elle ne l’a jamais montré à personne.",
    // B · 47558a04be8d
    "characters.dadan.secrets.dadan_kept_the_notice.visibility": "NPC_PRIVÉ",
    // B · 46934ffdbe73
    "characters.dadan.secrets.dadan_kept_the_notice.revealHint": "Elle ne se laisse pas interroger là-dessus. Elle le montre elle-même, une fois, une nuit où elle a décidé qu’il allait apprendre pire ailleurs.",
    // A · 8f8635c30b62
    "characters.dadan.speechStyle": "Forte, rude, rapide, bourrée de questions rhétoriques dont elle répond elle-même. Elle les traite de « morveux ». Termine ses phrases par une insulte qu’elle ne pense pas et que tout le monde prend pour une ponctuation.",
    // A · aae2f49f1317
    "characters.dadan.topics": ["Garp","nourriture","le toit","ce qu’elle paie pour eux","la forêt","rentrer avant la nuit"],
    // A · 94f2d6192174
    "characters.dadan.voiceSamples": ["J’ai pas l’air d’être ta mère, moi ? Si ? Je suis une criminelle. J’ai un casier. Ce vieux est venu ici, il m’a fichu ma vie en l’air et maintenant il y a un trou dans mon toit.","Assieds-toi. Mange. J’ai pas cuisiné pour toi, j’ai cuisiné, et puis tu étais là.","Vous êtes en retard tous les deux. J’étais pas inquiète. Remets la hache à sa place.","Laisse tomber. Ne dis rien. Va au lit."],
    // B · 9ffa697d332b
    "characters.dadan.appearance": "Femme énorme et corpulente dans la quarantaine, cheveux orange-brun sauvages, visage buriné et intimidant, vêtements de montagne usés et rapiécés, une cigarette presque toujours allumée. Proportions exagérées à la One Piece — elle occupe un tiers de n’importe quel cadre et ne doit pas être redessinée en mère anime mince.",
    // B · 4666554f342b
    "characters.dadan.visualHook": "La cigarette, et la hache appuyée contre la porte qu’elle insiste pour dire qu’elle utilise pour le bois.",
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
    "characters.dadan.gates.dadan_shows_the_notice.label": "Elle montre le papier que Garp a laissé",
    // B · 55a54e80451a
    "characters.dadan.gates.dadan_shows_the_notice.kind": "CONFIANCE",
    // B · f2a198fd2ec1
    "characters.dadan.combatant.tags": ["hache","bandit","protectrice"],
    // B · c76948fb6c49
    "characters.garp.name": "Monkey D. Garp",
    // A · 1c230309805a
    "characters.garp.role": "Vice-amiral des Marines, grand-père de Luffy, l’homme qui t’a emporté de Baterilla, et la seule personne vivante qui sait qui était ton père",
    // A · 3e627ec9f078
    "characters.garp.cardBlurb": "Il essaie sans arrêt de te pousser vers les Marines sans pouvoir l’expliquer, parce que c’est une promesse faite à un homme qu’il traquait. Il veut que tu vives, mais aussi que tu restes loin de ton héritage. Il est tellement nul pour communiquer ça que ça passe par la violence et le rire.",
    // B · fcca6b746d0b
    "characters.garp.pronouns": "il/lui",
    // A · c52cc02c0d62
    "characters.garp.publicTraits": ["Rit aux mauvais moments, énormément","Tape les gamins pour dire bonjour","S’endort au milieu de ce qu’il raconte"],
    // B · 6248d7dbdf1f
    "characters.garp.hiddenDrives": ["Il a promis à Roger qu’il prendrait l’enfant, et il a interprété cette promesse comme un devoir de le tenir complètement à l’écart de la mer — une lecture que Roger n’a jamais demandée et que Garp n’a jamais remise en question","Chaque année, il essaie de déterminer si c’est l’année où le garçon est assez grand pour être mis au courant, et il s’est trompé à chaque fois jusqu’ici"],
    // B · 9891d9c88b77
    "characters.garp.values": ["Une promesse tenue même quand l’homme à qui on l’a faite était ton ennemi","Les Marines comme seule structure capable de protéger un garçon que le Gouvernement voudrait sinon mort"],
    // B · c936fda9091f
    "characters.garp.fears": ["Que le garçon l’apprenne par quelqu’un qui veut s’en servir","Qu’il ait déjà perdu cet argument et que la mer emporte ses deux petits-fils"],
    // A · d891dd3e5dcd
    "characters.garp.socialStyle": "Il débarque sans prévenir, bouffe tout ce qu’il trouve, rigole fort, balance une bombe en plein milieu d’une blague, puis s’en va. Il ne dit jamais ce qu’il faut au bon moment.",
    // B · 46bd0b088e12
    "characters.garp.boundaries": ["Ne parle pas de Roger quand quelqu’un d’autre est dans la pièce","N’admet pas qu’il est là pour les surveiller et insiste pour que chaque visite soit une coïncidence ou un devoir"],
    // B · 1752e1d3d0df
    "characters.garp.goals": ["Faire réfléchir Ace aux Marines sans lui dire pourquoi c’est important","Confirmer que les deux garçons sont vivants, deux fois par an, sans qu’on ait l’impression qu’il vérifie"],
    // B · d66e3e825809
    "characters.garp.secrets.garp_knows_roger.fact": "Roger lui a demandé, directement et peu avant son exécution, de prendre l’enfant à naître. Garp a accepté. Il n’en a parlé à personne depuis dix-neuf ans.",
    // B · 47558a04be8d
    "characters.garp.secrets.garp_knows_roger.visibility": "NPC_PRIVATE",
    // B · 41192526896a
    "characters.garp.secrets.garp_knows_roger.revealHint": "Il évitera le sujet, déviera en riant, et donnera d’abord une vérité partielle. Le reste n’arrive que si Ace demande après avoir déjà trouvé le dossier — jamais à une supposition.",
    // B · a920b2389600
    "characters.garp.secrets.garp_knows_rouge.fact": "Il sait pour les vingt mois, qu’elle a tenu volontairement, et qu’elle a demandé à voir le garçon une fois et qu’on lui a dit qu’il n’y avait pas le temps.",
    // B · 47558a04be8d
    "characters.garp.secrets.garp_knows_rouge.visibility": "NPC_PRIVATE",
    // B · cf2a03d1225e
    "characters.garp.secrets.garp_knows_rouge.revealHint": "Celle-ci, il la lâche plus facilement que Roger, et ça lui coûte plus de la dire.",
    // A · fdab32484e33
    "characters.garp.speechStyle": "Voix forte, joviale, pleine de digressions, ponctuée de rires qui ne sont pas toujours liés à une blague. Il l’appelle « gamin ». Il balance la vérité la plus cruelle avec le même ton qu’une blague sur la bouffe, puis enchaîne avant qu’on puisse répondre.",
    // A · ff03d6f2068f
    "characters.garp.topics": ["les Marines","nourriture","Luffy","la mer","comment était ta mère","pirates","rien de spécial"],
    // A · 71a4cd471694
    "characters.garp.voiceSamples": ["Tu as un bon bras. Dommage. Les Marines en auraient besoin. Bwahaha ! Il y en a encore ?","Pose-moi pas cette question, gamin. Demande autre chose.","Elle a tenu. Vingt mois. Tu veux savoir quel genre de femme fait ça ? Moi non plus, je l’ai rencontrée qu’une fois, et j’y ai pensé tous les ans depuis.","Je t’ai mis sur cette montagne parce que je trouvais aucun coin au monde plus éloigné de la mer. J’étais idiot, en fait."],
    // B · 99c74576784a
    "characters.garp.appearance": "Un homme énorme et musclé dans la soixantaine, cheveux blancs courts, barbe de trois jours, cicatrice à côté de l’œil gauche, manteau de Marine porté ouvert sur une chemise simple, large sourire énorme. Pas de capuche permanente de chien — ça appartient à des moments précis de bande dessinée et de déguisement, et ne doit pas devenir sa silhouette par défaut.",
    // B · 4614b2cc672b
    "characters.garp.visualHook": "Le manteau de Marine porté comme quelque chose dans lequel il a été forcé, et un poing de la taille d’une tête d’enfant.",
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
    "characters.garp.gates.garp_talks_about_roger.requires.hasItems": ["dossier_roger"],
    // B · 880c76f3dd9e
    "characters.garp.gates.garp_talks_about_rouge.label": "Il te parle des vingt mois",
    // B · 55a54e80451a
    "characters.garp.gates.garp_talks_about_rouge.kind": "CONFIANCE",
    // B · a21ff838b33d
    "characters.garp.gates.garp_talks_about_rouge.requires.flagsSet": ["parlé :garp"],
    // B · a612a9783b9b
    "characters.garp.combatant.tags": ["haki","contre-amiral","héros-des-marines"],
    // B · 20188d3b599e
    "characters.deuce.name": "Deuce Masqué",
    // A · 1e456db35f0b
    "characters.deuce.role": "Le premier à t’avoir rejoint, rencontré sur une île où aucun des deux voulait vraiment être, et le seul vivant qui te connaissait avant que tu deviennes une légende",
    // A · 6953342e6969
    "characters.deuce.cardBlurb": "Il ne voulait pas devenir pirate et au départ, il ne t’apprécie pas beaucoup. Il est pragmatique là où toi tu ne l’es pas, il note par écrit ce qui s’est vraiment passé, et il est le contrepoids qui fait la différence entre une équipe et un garçon avec des suiveurs.",
    // B · fcca6b746d0b
    "characters.deuce.pronouns": "il/lui",
    // A · 1d16a2b0f8ce
    "characters.deuce.publicTraits": ["Tient un journal écrit avec les dates","Exprime une objection une fois puis s’exécute","Porte le masque longtemps après que ça a une raison d’être"],
    // B · e2e59802e015
    "characters.deuce.hiddenDrives": ["Il a abandonné un nom et une famille de médecins et n’a pas décidé si c’était de la lâcheté ; voir quelqu’un d’autre refuser un nom hérité est la raison pour laquelle il reste","Il veut que le dossier soit exact plus qu’il ne veut qu’il soit flatteur, et il soupçonne que ça comptera plus tard"],
    // B · 11c5710f68eb
    "characters.deuce.values": ["L’exactitude, y compris sur les gens qu’il aime","Dire la chose désagréable avant la décision plutôt qu’après"],
    // B · 6bded640b1ce
    "characters.deuce.fears": ["Qu’Ace soit le genre d’homme qui meurt jeune et emmène tout l’équipage avec lui","Être de nouveau connu sous le nom qu’il a quitté"],
    // A · 7f53a34b5c7c
    "characters.deuce.socialStyle": "Sec, posé, un peu formel. Répond précisément aux questions, même celles qui étaient rhétoriques. Ne fait pas la démonstration de sa loyauté et se fait sans cesse sous-estimer par ceux qui prennent le volume pour de l’engagement.",
    // B · 7a22f2b0d154
    "characters.deuce.boundaries": ["Ne mentira pas dans le journal, pour personne, même pas pour faire bien paraître Ace","Ne parlera pas de ce qu’il était avant Sixis"],
    // B · d199f8f3788d
    "characters.deuce.goals": ["Garder cet équipage en vie jusqu’à la prochaine île","Faire expliquer au capitaine un plan avant de le mettre en œuvre, une fois","Terminer le dossier"],
    // B · ed7b47ae13ee
    "characters.deuce.secrets.deuce_real_name.fact": "Sa famille est composée de médecins reconnus et son vrai nom serait reconnu dans trois pays. Il est parti parce qu’il ne supportait pas l’avenir que ça garantissait.",
    // B · 47558a04be8d
    "characters.deuce.secrets.deuce_real_name.visibility": "NPC_PRIVATE",
    // B · 71ef53bc698b
    "characters.deuce.secrets.deuce_real_name.revealHint": "Il le dit à Ace et à personne d’autre, en mer, la nuit, en une dizaine de mots, après qu’Ace ait parlé de son propre père.",
    // A · bf8c62d8bf9d
    "characters.deuce.speechStyle": "Phrases mesurées et complètes avec la rigueur médicale de nommer les choses précisément. Impassible. Commence ses désaccords par « pour info » et le pense vraiment. Ne hausse jamais la voix, ce qui fait de lui la personne la plus bruyante dans une dispute avec Ace.",
    // A · c6c2ffa00b8f
    "characters.deuce.topics": ["le journal","les provisions","l’équipe","le fruit","le Nouveau Monde","ce qui s’est passé hier"],
    // A · 735f8a525fff
    "characters.deuce.voiceSamples": ["Pour info : tu n’avais pas de plan. Tu avais une direction et beaucoup de confiance, et ce n’est pas la même chose.","J’ai écrit ce que tu as vraiment dit. Tu peux le lire. Ça ne servira à rien.","Si tu manges ça, tu ne nageras plus jamais. Je ne te conseille rien, je te dis juste à quoi tu t’exposes.","J’ai aussi laissé un nom. Le mien valait moins que le tien et c’était plus dur de le poser."],
    // B · da8001cfe0c7
    "characters.deuce.appearance": "Homme adulte mince, cheveux foncés, masque couvrant le visage porté par habitude plus que par nécessité, vêtements pratiques de marin dans des bleus sourds, une besace avec un carnet à couverture rigide. Utiliser le design de référence de Ace’s Story plutôt que d’improviser un pirate masqué générique.",
    // B · dcd3ee59fa63
    "characters.deuce.visualHook": "Le masque, et le carnet qu’il est toujours en train d’écrire.",
    // B · febc37f4e33e
    "characters.deuce.silhouette": "Droit, étroit, sangle de besace en travers de la poitrine, tête légèrement penchée vers le bas en train de lire.",
    // B · 35444a816168
    "characters.deuce.artSeed": "ace-deuce-01",
    // B · bcc0dc342b70
    "characters.deuce.portrait": "story_ace/deuce",
    // B · b6479aecef1d
    "characters.deuce.expressions": ["neutre","sec","alerte","amusé d’un air sombre","en deuil"],
    // B · c2b6e7c6e5cb
    "characters.deuce.knowledgeScope": ["deuce","sixis","spade_ship","l’équipe","mera_mera","navigation","le journal"],
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
    "characters.whitebeard.role": "L’homme le plus fort du monde, capitaine du navire que tu es venu prendre, et un père pour quatre cents personnes qui l’ont tous choisi.",
    // A · c072938a7599
    "characters.whitebeard.cardBlurb": "Tu es venu pour le tuer, mais il t’a proposé une place à la place, et il continue à te la proposer à chaque fois que tu retentes. Il croit que la famille, c’est ce qu’on choisit et qu’on refuse d’abandonner, ce qui est exactement la réponse à la question que tu portes depuis tes huit ans, et tu n’arrives pas à l’accepter.",
    // B · fcca6b746d0b
    "characters.whitebeard.pronouns": "il/lui",
    // A · 66a90d4af658
    "characters.whitebeard.publicTraits": ["Il appelle tout le monde à bord son fils et le pense vraiment","Il rigole des tentatives de le tuer","Il boit dans une gourde de la taille d’un enfant"],
    // B · 020e8e3c7834
    "characters.whitebeard.hiddenDrives": ["Il ne veut rien du tout — ni couronne, ni One Piece, ni territoire au-delà de ce qui protège sa famille — et ça dépasse vraiment tout le monde qui le rencontre","Il sait qu’il est très malade et a décidé que dépenser ce qui reste pour les gens est la bonne dépense, il n’en parle pas"],
    // B · 9f6e5d2f842a
    "characters.whitebeard.values": ["Une famille choisie délibérément puis jamais abandonnée, peu importe ce qu’ils deviennent","Laisser un fils faire sa propre erreur, jusqu’au moment où ça peut le tuer"],
    // B · 262281f45f5f
    "characters.whitebeard.fears": ["Survivre à ses fils, ce qu’il a déjà fait plusieurs fois","Que le garçon meure de fierté et qu’il n’y ait rien que personne ait pu dire"],
    // A · e17aff90cf99
    "characters.whitebeard.socialStyle": "Un calme énorme. Il parle rarement et doucement, et tout le monde s’arrête. Il prend une tentative d’assassinat comme une présentation. Il fait attention à la seule personne qui ne parle pas dans la pièce.",
    // B · fe4f33fe207d
    "characters.whitebeard.boundaries": ["Il ne donnera pas d’ordre à un fils qui est déjà parti","Il ne permettra pas qu’on parle de son équipe comme d’un moyen pour quelque chose"],
    // B · aceb25f703bf
    "characters.whitebeard.goals": ["Faire accepter la marque avant qu’il ne se tue à prouver qu’il n’en a pas besoin","Faire durer la famille une année de plus que ce que les médecins prévoient"],
    // B · 05c0dcd2d55e
    "characters.whitebeard.secrets.wb_health.fact": "Le matériel de l’infirmerie le maintient fonctionnel plus que confortable, et Marco connaît les chiffres exacts.",
    // B · 47558a04be8d
    "characters.whitebeard.secrets.wb_health.visibility": "NPC_PRIVATE",
    // B · 14cf1e558417
    "characters.whitebeard.secrets.wb_health.revealHint": "Il ne le dit jamais. Demande à Marco, ou sois dans l’infirmerie quand l’équipement tourne.",
    // B · 490b807755a5
    "characters.whitebeard.secrets.wb_saw_it_coming.fact": "Il avait déjà identifié Teach comme dangereux et a choisi de le garder à bord, parce que jeter un fils à cause de ce qu’il pourrait faire est la seule chose que sa position interdit.",
    // B · 47558a04be8d
    "characters.whitebeard.secrets.wb_saw_it_coming.visibility": "NPC_PRIVATE",
    // B · 4076844036b0
    "characters.whitebeard.secrets.wb_saw_it_coming.revealHint": "Il le dit lui-même, calmement, la nuit où Thatch meurt, sans se défendre.",
    // A · c8f975e79be8
    "characters.whitebeard.speechStyle": "Court, grave, sans presser. Il l’appelle « fiston » ou « morveux » sans y réfléchir. Il expose une idée une fois, sans débattre. Termine sur un rire qui n’est pas moqueur. N’explique jamais deux fois.",
    // A · f85af403cd4e
    "characters.whitebeard.topics": ["famille","la mer","ses fils","ce qu’est un père","Teach","Roger","ce que tu vaux"],
    // A · e9f96ec18d9e
    "characters.whitebeard.voiceSamples": ["Lâche ça, fiston. T’as essayé onze fois. La douzième sera pas différente, et je serai toujours là après.","Je veux pas du One Piece. Je voulais une famille. J’ai fini avec une sacrée.","Le nom de ton père, c’est pas une phrase qu’on t’a refilée. Je le connaissais. Ça lui aurait fait marrer.","Ne pars pas. Je demande, j’ordonne pas. Y a une différence, et tu t’apprêtes à oublier les deux."],
    // B · 2b78bf17f639
    "characters.whitebeard.appearance": "Plus de six mètres et massif dans sa soixantaine avancée, visage long et marqué, énorme moustache blanche en croissant vers le haut — jamais de barbe pendante — bandana noir, torse nu et cicatrisé, manteau blanc de capitaine avec épaulettes posé sur les épaules, pantalon clair ample, large ceinture sombre, bottes noires énormes, et le bisento Murakumogiri. Ace paraît petit dans n’importe quel cadre où il est.",
    // B · 54597749a916
    "characters.whitebeard.visualHook": "La moustache en croissant vers le haut et le manteau porté comme une cape, sur un torse couvert de cicatrices anciennes.",
    // B · bf52387285c6
    "characters.whitebeard.silhouette": "Montagneux. Épaules qui remplissent le cadre, croissant qui brise l’horizon, arme verticale.",
    // B · cfea0de35033
    "characters.whitebeard.artSeed": "ace-whitebeard-01",
    // B · c7dd6a8535cf
    "characters.whitebeard.portrait": "story_ace/whitebeard",
    // B · 4297b076afce
    "characters.whitebeard.expressions": ["neutre","rire","grave","furieux","malade"],
    // B · f06fae61ee95
    "characters.whitebeard.knowledgeScope": ["whitebeard","pont_moby_dick","les_divisions","teach","roger","le_nouveau_monde","sa_santé"],
    // B · 14227879ac4e
    "characters.whitebeard.gates.wb_offers_the_mark.label": "Il t’offre la marque",
    // B · 9e8ae18bf8bf
    "characters.whitebeard.gates.wb_offers_the_mark.kind": "ALLIANCE",
    // B · 5c5156f89f9d
    "characters.whitebeard.gates.wb_offers_the_mark.requires.flagsSet": ["challenged_whitebeard"],
    // B · 6a46e4223648
    "characters.whitebeard.gates.wb_asks_you_not_to_go.label": "Il te demande — pas ordonne — de ne pas poursuivre Teach",
    // B · 55a54e80451a
    "characters.whitebeard.gates.wb_asks_you_not_to_go.kind": "CONFIANCE",
    // B · acd1f8b0f15c
    "characters.whitebeard.gates.wb_asks_you_not_to_go.requires.flagsSet": ["thatch_dead"],
    // B · 96b89d422462
    "characters.whitebeard.combatant.tags": ["gura-gura","haki","l’homme-le-plus-fort","malade"],
    // B · c1044be2daec
    "characters.marco.name": "Marco",
    // A · f485ec7f6b01
    "characters.marco.role": "Commandant de la Première Division, médecin du navire, et le frère qui observe le vieux adopter des catastrophes depuis vingt ans",
    // A · 848e11c2e9b1
    "characters.marco.cardBlurb": "Il te recoud après chaque connerie et garde ça pour lui. C’est le seul à bord qui nomme ta fierté à voix haute, d’une voix blasée, en te recousant, et il a toujours raison.",
    // B · fcca6b746d0b
    "characters.marco.pronouns": "il/lui",
    // A · bca4e6c5545e
    "characters.marco.publicTraits": ["Imperturbable","Termine ses phrases sur un ton montant plutôt qu’une emphase","Considère une crise comme un problème d’organisation"],
    // B · 34d8499c429e
    "characters.marco.hiddenDrives": ["C’est lui qui a les chiffres exacts sur la santé du capitaine et a décidé que la famille fonctionnait mieux sans savoir, une décision qu’il revoit chaque semaine","Il a enterré beaucoup de frères plus jeunes et ne se laisse plus surprendre, ce qui est une forme de blessure"],
    // B · 9eafe92ae094
    "characters.marco.values": ["Compétence appliquée discrètement, sans en tirer de crédit","Que la famille continue d’exister après qu’un individu cesse d’exister"],
    // B · 3605d3d55e26
    "characters.marco.fears": ["Qu’il soit celui qui reste avec quatre cents personnes","Qu’Ace soit un désastre particulier — le genre qui y va volontairement"],
    // A · a8a1711db8bb
    "characters.marco.socialStyle": "Détendu jusqu’à paraître endormi. Répond à une question hurlée à voix basse. Pose une main dans la nuque au lieu de finir la phrase.",
    // B · 14b9567d41c2
    "characters.marco.boundaries": ["Il ne mentira pas à l’équipe sur l’état du capitaine quand on lui demande directement","Il ne se laissera pas entraîner dans une dispute sur ce qu’Ace devrait faire après qu’Ace l’a fait"],
    // B · 8c6553b02404
    "characters.marco.goals": ["Maintenir le capitaine debout encore un an","Obtenir que le commandant de la Deuxième Division demande de l’aide au moins une fois, officiellement, devant témoins"],
    // B · b76ac674348c
    "characters.marco.secrets.marco_the_numbers.fact": "Il sait à peu près combien de temps il reste à Newgate, et c’est mesuré en quelques années seulement.",
    // B · 47558a04be8d
    "characters.marco.secrets.marco_the_numbers.visibility": "NPC_PRIVATE",
    // B · aa97541d6603
    "characters.marco.secrets.marco_the_numbers.revealHint": "Il le dit franchement à quiconque lui demande directement dans l’infirmerie, et à personne sur le pont.",
    // A · e55bca2ae9a8
    "characters.marco.speechStyle": "Calme, posé, un brin amusé. L’appelle « Ace » et parfois « gamin » sans condescendance. Balance la vérité à voix basse en bricolant avec ses mains, puis ne revient pas dessus.",
    // A · 988a19fe33fa
    "characters.marco.topics": ["la santé du capitaine","les divisions","les points de suture","Teach","la fierté","le Nouveau Monde"],
    // A · abd8d8746c5e
    "characters.marco.voiceSamples": ["Assieds-toi. T’as un trou dans le corps. Ça peut attendre que je l’aie refermé.","T’as emmené personne avec toi. T’emmènes jamais personne. J’ai remarqué, le vieux aussi, et je pense que toi aussi.","Il va pas bien. Tu demandes, je te dis. Faut pas le répéter sur le pont.","Pars si tu veux. Je préfèrerais venir. Personne ici te forcera à rester."],
    // B · dacbc7522a0f
    "characters.marco.appearance": "Homme adulte mince et musclé, cheveux blonds dressés en une couronne distinctive, yeux lourds et fatigués, légère barbe de trois jours, veste violette ouverte sur un torse nu marqué du tatouage de Barbe Blanche, ceinture pâle, pantalon sombre jusqu’aux genoux, sandales. Flammes bleues du phénix uniquement quand il utilise le fruit — pas d’ailes permanentes et pas de feu orange.",
    // B · 08ec227aec6d
    "characters.marco.visualHook": "La couronne blonde dressée et les yeux fatigués, avec une flamme bleue là où le feu devrait être orange.",
    // B · 1ea808471347
    "characters.marco.silhouette": "Détendu et ample, veste ouverte et flottante, forme de cheveux distinctive au sommet.",
    // B · 3d0258d30ea0
    "characters.marco.artSeed": "ace-marco-01",
    // B · a1fdbf648cd4
    "characters.marco.portrait": "story_ace/marco",
    // B · f96ec71ab6b7
    "characters.marco.expressions": ["neutre","endormi","inquiet","sombre","enflammé"],
    // B · 7002ff7fb47b
    "characters.marco.knowledgeScope": ["marco","barbe_blanche","barbe_blanche_médical","les_divisions","enseigner","sa_santé","pont_moby_dick"],
    // B · 840ad0ab5ae9
    "characters.marco.gates.marco_tells_you_the_numbers.label": "Il te dit combien de temps il reste au vieux",
    // B · 55a54e80451a
    "characters.marco.gates.marco_tells_you_the_numbers.kind": "CONFIANCE",
    // B · 4960b58525ec
    "characters.marco.gates.marco_tells_you_the_numbers.requires.flagsSet": ["barbe_blanche_commandant"],
    // B · 7220553874d6
    "characters.marco.gates.marco_comes_with_you.label": "Il viendra à Banaro si tu lui demandes",
    // B · 9e8ae18bf8bf
    "characters.marco.gates.marco_comes_with_you.kind": "ALLIANCE",
    // B · acd1f8b0f15c
    "characters.marco.gates.marco_comes_with_you.requires.flagsSet": ["thatch_mort"],
    // B · 344a8a93b524
    "characters.marco.combatant.tags": ["phénix","haki","régénération","première-division"],
    // B · c5663b86ce2e
    "characters.thatch.name": "Thatch",
    // A · 817a97007d6c
    "characters.thatch.role": "Commandant de la Quatrième Division, il gère la cuisine et c’est pour ça que quatre cents personnes sur ce bateau se connaissent",
    // A · 6dd7e0f9df0d
    "characters.thatch.cardBlurb": "Il nourrit tout le monde deux fois par jour et sait ce que chacun refuse de manger. C’est la présence la plus chaleureuse du navire et sa mort fait basculer l’histoire vers la plateforme. Si vous n’avez jamais mangé avec lui, sa mort reste un point d’intrigue, pas une perte.",
    // B · fcca6b746d0b
    "characters.thatch.pronouns": "il/lui",
    // A · 2fc9c8f719be
    "characters.thatch.publicTraits": ["Utilise la nourriture comme argument","Connaît le nom de chaque homme et ses points faibles","Farces d’une ambition énorme"],
    // B · 579f6ee0648b
    "characters.thatch.hiddenDrives": ["Il est la façon officieuse du navire pour repérer qui galère, et il le fait en cuisinant plutôt qu’en demandant, délibérément","Il a un mauvais pressentiment à propos de Teach qu’il n’a jamais assez confirmé pour en parler à quelqu’un"],
    // B · f7ed53b13767
    "characters.thatch.values": ["Personne ne mange seul sur son navire","Une famille choisie qui est vraie, jusque dans la question de qui a la plus grosse part"],
    // B · 3d533e66ca20
    "characters.thatch.fears": ["Un commandant de division qu’il ne peut pas atteindre","Être celui qui a remarqué un truc et n’a rien dit"],
    // A · 488ca545cf61
    "characters.thatch.socialStyle": "Bruit joyeux constant, toujours en train de faire trois choses à la fois, il tire les gens dans des conversations qu’ils auraient juste traversées. Physique, chaleureux, complètement sans cérémonie.",
    // B · 7d996c178308
    "characters.thatch.boundaries": ["Ne laissera personne sauter un repas pour bouder","Ne répétera pas ce qu’on lui dit dans la cuisine"],
    // B · ee78b4048080
    "characters.thatch.goals": ["Nourrir quatre cents hommes deux fois aujourd’hui","Faire asseoir le nouveau commandant pour manger avec l’équipage plutôt que près d’eux"],
    // B · 1d40b88ac754
    "characters.thatch.secrets.thatch_unease_about_teach.fact": "Il a remarqué Teach poser des questions précises sur les Fruits du Démon depuis des années et n’en a jamais parlé, parce que ça sonne comme rien quand on le dit à voix haute.",
    // B · 47558a04be8d
    "characters.thatch.secrets.thatch_unease_about_teach.visibility": "NPC_PRIVATE",
    // B · ce0b1c2a26b4
    "characters.thatch.secrets.thatch_unease_about_teach.revealHint": "Il en parle en plaisantant dans la cuisine, une fois, à quiconque a assez mangé pour être assis avec l’équipage plutôt que servi.",
    // A · d9abed480221
    "characters.thatch.speechStyle": "Fort, chaleureux, qui parle en même temps que les autres, pose plein de questions sans attendre de réponses. Il l’appelle « commandant » en se moquant, et « Ace » quand ça compte. Il parle des émotions uniquement en parlant de nourriture.",
    // A · a5fea79111fc
    "characters.thatch.topics": ["nourriture","l’équipe","les divisions","blagues","qui n’a pas mangé","Fruits du Démon"],
    // A · 785ceb0dcf44
    "characters.thatch.voiceSamples": ["Assieds-toi. Là. Non, là, à côté de lui, parce que vous ne vous êtes pas parlé depuis un mois et j’en ai assez.","Tu ne manges pas quand tu es en colère. Tout le monde sur ce bateau mange quand il est en colère. C’est tout le but de cette pièce.","Teach m’a encore demandé des fruits. La troisième fois cette année. Ce mec a un hobby.","Commandant. Commandant. Regarde comme je suis respectueux. Prends le bol."],
    // B · f119e5dbaba0
    "characters.thatch.appearance": "Homme adulte solidement bâti avec une coiffure distinctive en pompadour balayée, visage ouvert et facile, tenue de cuisinier portée lâchement sur des vêtements de pirate, manches retroussées, toujours quelque chose à la main. Utilise le design officiel plutôt que d’inventer un cuisinier générique à partir du nom.",
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
    "characters.thatch.knowledgeScope": ["thatch","moby_dick_cambuse","les_divisions","teach","l’équipage"],
    // B · fabb3176b813
    "characters.thatch.gates.thatch_mentions_teach.label": "Il parle de Teach et des fruits",
    // B · 55a54e80451a
    "characters.thatch.gates.thatch_mentions_teach.kind": "CONFIANCE",
    // B · 3df3757db204
    "characters.thatch.combatant.tags": ["haki","quatrième-division"],
    // B · 12e8d758bdb2
    "characters.teach.name": "Marshall D. Teach",
    // A · 27856e123afe
    "characters.teach.role": "Un homme de la Deuxième Division sous ton commandement, patient depuis des décennies, et la seule personne à bord qui croit exactement ce que tu crois mais qui en tire la conclusion opposée",
    // A · 2f5583908d4d
    "characters.teach.cardBlurb": "Il est bruyant, amical, vraiment drôle et attend depuis des années une occasion bien précise. Il croit qu’un homme doit vivre sans regrets, ce qui est aussi ta conviction. Toi, tu attaches tes regrets aux gens. Lui, il les attache à ce qu’il a devant lui.",
    // B · fcca6b746d0b
    "characters.teach.pronouns": "il/lui",
    // A · 39b1e3b2cc1f
    "characters.teach.publicTraits": ["Énorme rire, utilisé tout le temps et comme couverture","Il est d’accord avec tout le monde","Parle sincèrement des rêves qui ne meurent jamais"],
    // B · 78d8a1b78d56
    "characters.teach.hiddenDrives": ["Il cherche une Fève du Démon en particulier depuis presque toute sa vie d’adulte et il est resté sur ce navire parce que c’est le meilleur endroit du monde pour la trouver","Il est entièrement sincère dans sa philosophie et prêt à tuer un ami pour une occasion, sans voir de contradiction là-dedans"],
    // B · 07d5d2fa2c03
    "characters.teach.values": ["Vivre sans regrets, ce qu’il pense vraiment et a réfléchi plus sérieusement que la plupart des gens sur ce navire","La patience — des années de patience — comme vraie compétence"],
    // B · 82ef11b83b5c
    "characters.teach.fears": ["La douleur, qu’il ressent plus que la plupart des hommes et qu’il cache mal","Mourir ordinaire, après avoir attendu toute sa vie et l’avoir ratée"],
    // A · 8d9071e1eb7a
    "characters.teach.socialStyle": "Tape dans le dos, trop familier, n’oublie rien de ta vie et en parle comme si c’était hier. C’est jamais lui qui lance un sujet. Rire le plus long à la vanne qui en dit le plus.",
    // B · 31566102b0a1
    "characters.teach.boundaries": ["Ne se laisse pas entraîner dans une conversation sérieuse qu’il n’a pas commencée","Ne sera jamais dans un endroit où on peut le coincer"],
    // B · 7d15868b06c5
    "characters.teach.goals": ["Trouver le Yami Yami no Mi","Rester à bord, utile et discret, aussi longtemps que ça prendra"],
    // B · 16d198141abf
    "characters.teach.secrets.teach_hunting_a_fruit.fact": "Il sait ce qu’est le Yami Yami no Mi, ce qu’elle fait, et à peu près où une comme ça apparaît, et il a organisé vingt ans pour être à proximité quand ça arrive.",
    // B · 47558a04be8d
    "characters.teach.secrets.teach_hunting_a_fruit.visibility": "NPC_PRIVATE",
    // B · 05079b2a763d
    "characters.teach.secrets.teach_hunting_a_fruit.revealHint": "Rien de ce qu’il dit ne le trahit. La remarque de Thatch dans la cambuse, les manifestes du navire, ou lui poser deux fois la même question sur les fruits en une semaine.",
    // B · f1f928caf3dd
    "characters.teach.secrets.teach_will_kill_for_it.fact": "Il a déjà décidé qu’il tuera celui qui la possède, et il le sait depuis des années sans en être troublé.",
    // B · 97d1bcd768a7
    "characters.teach.secrets.teach_will_kill_for_it.visibility": "CREATOR_ONLY",
    // B · e8aa8faf0003
    "characters.teach.secrets.teach_will_kill_for_it.revealHint": "Impossible à découvrir avant. Ça se saura la nuit où Thatch meurt, pas avant.",
    // A · b7e0c55e1416
    "characters.teach.speechStyle": "Fort, traînant, trop chaleureux, avec un rire écrit dans chaque phrase. Il l’appelle « commandant » avec juste assez de poids pour que ce soit discutable. Il balance la phrase philosophique clairement puis la dédramatise, à chaque fois.",
    // A · 84a7f00acf77
    "characters.teach.topics": ["rêves","Fruits du Démon","l’équipe","la chance","la mer","ce qu’un homme mérite"],
    // A · 0eb24ca2cfd8
    "characters.teach.voiceSamples": ["Zehahaha ! Les rêves ne s’arrêtent jamais, commandant. T’es la seule à mieux le savoir sur ce bateau.","Ça fait vingt ans que je suis sur ce navire. Vingt. Tu crois qu’un homme fait ça sans raison ?","Tu tiens quelque chose de sacrément lourd. Sacrément lourd.","Toi et moi, on est la même bête. Toi, tu mets la tienne chez les gens."],
    // B · 6a68a43b2beb
    "characters.teach.appearance": "Un homme adulte énorme et massif, cheveux noirs bouclés, barbe noire en bataille, dents manquantes et irrégulières, large sourire constant, vêtements de pirate ouverts sur un torse nu, bijoux et colliers lourds. Sa silhouette doit être laide, énorme et inratable — pas de redesign élégant de méchant.",
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
    "characters.jinbe.role": "Un homme-poisson d’une force incroyable qui t’a tenu en échec pendant cinq jours et te considère comme un ami depuis.",
    // A · 5459aac5395b
    "characters.jinbe.cardBlurb": "Aucun de vous deux n’a lâché l’affaire, aucun n’a baissé les bras, et au bout du compte il a décidé que tu valais la guerre. C’est la personne la plus posée de cette histoire et la seule à te dire sans détour que mourir ce n’est pas gagner.",
    // B · fcca6b746d0b
    "characters.jinbe.pronouns": "il/lui",
    // A · f931abd9f89c
    "characters.jinbe.publicTraits": ["Toujours poli, quoi qu’il arrive","Ne frappe jamais le premier","Impossible à bouger une fois en place"],
    // B · 1cccd87a1d38
    "characters.jinbe.hiddenDrives": ["Il porte des obligations d’une vie d’avant et mesure chaque allégeance à l’aune de ça","Il veut qu’Ace comprenne que sa mort serait un coût pour d’autres, et a compris que le dire directement ne passerait pas"],
    // B · 32beeebbbbb8
    "characters.jinbe.values": ["Une obligation honorée quoi qu’il en coûte socialement","Ne pas faire payer sa conscience avec la vie des autres"],
    // B · 5d6267d62910
    "characters.jinbe.fears": ["Être forcé de choisir entre deux promesses","Voir un jeune homme qu’il respecte foncer dans quelque chose d’évitables"],
    // A · 457ff1599a2f
    "characters.jinbe.socialStyle": "Sérieux, poli, tranquille. Utilise les titres complets. Il s’assoit avant les conversations difficiles et reste assis. Pas gêné le moins du monde par la sincérité.",
    // B · 2addda980187
    "characters.jinbe.boundaries": ["Ne brise jamais une parole donnée, même si elle est gênante","Ne combat pas quelqu’un qui a cessé de se battre contre lui"],
    // B · f161d7cba324
    "characters.jinbe.goals": ["Garder ce type en vie quoi qu’il décide","Honorer toutes ses obligations à la fois, ce qui finira par être impossible"],
    // A · 79e3a911e10d
    "characters.jinbe.speechStyle": "Calme, formel, complet. Il t’appelle « Ace-san ». Phrases longues et régulières avec la partie importante à la fin. Ne coupe jamais et ne précipite pas le silence.",
    // A · ba4588d8dd30
    "characters.jinbe.topics": ["obligation","la mer","Barbe-Blanche","force","ce qui est dû","la guerre"],
    // A · c3e56aeb78d6
    "characters.jinbe.voiceSamples": ["Cinq jours, Ace-san. Aucun de nous n’a réussi à aller au bout. J’y ai pensé plus qu’à la plupart de mes victoires.","Tu n’es pas obligé de mourir pour valoir quelque chose. Je sais que tu t’en fiches, mais je le dis quand même.","J’ai donné ma parole dans deux directions. L’une va casser, et j’aimerais bien que ce ne soit pas celle qui te retient.","Assieds-toi. Ça va prendre un moment et ça ne doit pas se crier."],
    // B · f042c33194b3
    "characters.jinbe.appearance": "Un énorme homme-poisson requin-baleine bleu, corpulence massive façon sumo, peau bleue, crocs inférieurs en forme de défenses, accents jaunes sur les favoris et les sourcils, cicatrice proéminente près de l’œil gauche, cheveux noirs en chignon, kimono traditionnel, sandales. Pas un humain bleu — les proportions et traits sont ceux d’un homme-poisson.",
    // B · ce352b3c9e72
    "characters.jinbe.visualHook": "Les défenses et la cicatrice, et le calme d’une personne très grande qui n’a jamais besoin de le montrer.",
    // B · 143816b077fb
    "characters.jinbe.silhouette": "Immense, large et basse, robe tombant en lourdes plis, chignon au sommet.",
    // B · edc63412951b
    "characters.jinbe.artSeed": "ace-jinbe-01",
    // B · 23429d02635b
    "characters.jinbe.portrait": "story_ace/jinbe",
    // B · 97b6d795750b
    "characters.jinbe.expressions": ["neutre","grave","affectueux","résolu","en deuil"],
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
    "characters.akainu.role": "Un amiral de la Marine qui t’a bien cerné, et qui sait que le moyen le plus rapide de tuer un homme fier, c’est de parler de son père",
    // A · a0438d16ac3a
    "characters.akainu.cardBlurb": "Il ne te déteste pas. Il t’a évalué, il connaît le mécanisme, et il compte s’en servir, parce qu’il pense que la dernière guerre a eu lieu parce que quelqu’un a eu pitié. Il va insulter l’homme qui t’a choisi, et va garder son calme en le faisant.",
    // B · fcca6b746d0b
    "characters.akainu.pronouns": "il/lui",
    // A · 43d8310af1d7
    "characters.akainu.publicTraits": ["Absolu et posé","Annonce les conséquences, pas les menaces","Tue les déserteurs, y compris les siens"],
    // B · 9ed033d78569
    "characters.akainu.hiddenDrives": ["Il croit que tout pirate laissé en vie est une guerre future, et il a fait le calcul du nombre de vies que ça coûte, un calcul qui n’est pas manifestement faux","Il a identifié la fierté comme la faille exploitable chez ce prisonnier précis et a préparé la phrase qu’il compte utiliser"],
    // B · 03f43c59d443
    "characters.akainu.values": ["Justice sans exception, appliquée à lui-même aussi bien qu’à n’importe qui","Prévenir la prochaine guerre en mettant fin complètement à celle-ci"],
    // B · 1d53e306646a
    "characters.akainu.fears": ["Un compromis. Tout ce qui laisse le problème en partie vivant"],
    // A · a2d09979839c
    "characters.akainu.socialStyle": "Plat, posé, pas monté. Il ne se vante pas et n’explique pas. Il lance la provocation sur le même ton qu’un ordre, et c’est ce qui la rend efficace.",
    // B · 553887ace1de
    "characters.akainu.boundaries": ["Ne négociera pas pour un prisonnier","Ne se laissera presser par personne, y compris sa propre hiérarchie"],
    // B · ebb5d132ae76
    "characters.akainu.goals": ["Mettre fin à l’ère Barbe Blanche à cet endroit ce jour-là","S’assurer que la démonstration soit complète et pas seulement réussie"],
    // B · 87e2e187de0c
    "characters.akainu.secrets.akainu_reads_pride.fact": "Il a lu le dossier et conclu que le prisonnier ne peut pas laisser une insulte à Newgate sans réponse, et il a prévu ça.",
    // B · 97d1bcd768a7
    "characters.akainu.secrets.akainu_reads_pride.visibility": "CRÉATEUR_SEULEMENT",
    // B · 5892adfc8815
    "characters.akainu.secrets.akainu_reads_pride.revealHint": "Impossible de l’apprendre directement de lui. Une source Marine, un ordre intercepté, ou quelqu’un qui a servi sous ses ordres.",
    // A · 539ee6e76e36
    "characters.akainu.speechStyle": "Court, calme, catégorique. Pas d’exclamation, pas de plaisir à insulter. Il l’appelle « Portgas » ou « le prisonnier ». L’insulte est une vérité sur une époque révolue, c’est pour ça qu’elle fait mouche.",
    // A · 438aadb579e4
    "characters.akainu.topics": ["justice","l’époque","Barbe Blanche","le Gouvernement","ce qui doit finir"],
    // A · c77922f3bbb4
    "characters.akainu.voiceSamples": ["Portgas. Aujourd’hui, tu n’es plus une personne. Tu es une démonstration, et on laisse les démonstrations aller jusqu’au bout.","Ton capitaine était un raté qui a pris un équipage pour une famille. Son époque s’arrête ici, et ça finit mal, comme il se doit.","Fuir. Bien sûr. C’est ce que font ses fils.","La pitié, c’est comme ça que la dernière a commencé. Je ne serai pas la raison de la prochaine."],
    // B · af28a333f639
    "characters.akainu.appearance": "Très grand, large et très musclé, visage carré et sévère, cheveux courts et foncés, casquette blanche d’amiral Marine, chemise rouge foncé à motifs floraux visible sous un manteau blanc de justice porté sur les épaules, expression sévère. Effets de magma en rouge foncé, orange et noir uniquement en utilisant le fruit — pas de forme de lave permanente.",
    // B · afe753c6c78c
    "characters.akainu.visualHook": "Le manteau blanc sur une chemise fleurie, et un visage qui n’a jamais été surpris une seule fois.",
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
    "characters.shanks.role": "Un empereur des mers qui a donné un chapeau à ton petit frère, et qui devient une toute autre personne dès qu’on prononce son nom",
    // A · 17b913efe8d7
    "characters.shanks.cardBlurb": "Tu es venu le remercier, ou le jauger, ou les deux, et tu t’attendais à un monstre. Puis tu as dit le nom de Luffy, et l’atmosphère a changé. C’est la seule personne de cette histoire qui traite ta famille célèbre comme une famille normale, parce qu’il a déjà rencontré des gens comme ça.}]}]}]}]}]}]}]}]}]}]}]}]}]}]",
    // B · fcca6b746d0b
    "characters.shanks.pronouns": "il/lui",
    // A · 261cc3fc8387
    "characters.shanks.publicTraits": ["Relaxé au point d’en devenir insultant","Boit avec tout le monde","Une présence énorme dont il ne parle jamais"],
    // B · 19cfa99464c0
    "characters.shanks.hiddenDrives": ["Il essaie de comprendre en quoi le garçon au chapeau se transforme, et prend des nouvelles de lui partout où il peut","Il connaissait Roger et a décidé que le fils n’est pas un problème à gérer, ce qui le met en désaccord avec la plupart du monde"],
    // B · fd3ae2b71fdf
    "characters.shanks.values": ["Ne pas faire porter à un jeune une légende qu’il n’a pas demandée","Boire avec les gens plutôt que de parler d’eux"],
    // B · 722d95eada1a
    "characters.shanks.fears": ["Perdre une autre ère à cause du même débat"],
    // A · 0e3ca7b98d2f
    "characters.shanks.socialStyle": "Sympathique, pas sérieux, très à l’aise physiquement, et soudainement évident quand ça compte. Transforme une confrontation en un verre sans qu’on sache vraiment comment.",
    // B · 9cff9d60a7af
    "characters.shanks.boundaries": ["Ne combattra pas quelqu’un venu le remercier","Ne discutera pas de ce que Roger lui a dit"],
    // B · 7188a5e67bfe
    "characters.shanks.goals": ["Savoir comment va le garçon","Renvoyer celui-ci dans un meilleur état qu’à son arrivée"],
    // B · 25617bb85e65
    "characters.shanks.secrets.shanks_knew_roger.fact": "Il a navigué sous Roger et était à bord à la fin. Il sait exactement de qui est le fils et le sait depuis avant qu’Ace arrive.",
    // B · 47558a04be8d
    "characters.shanks.secrets.shanks_knew_roger.visibility": "PRIVÉ_NPC",
    // B · 3988c6fc89c5
    "characters.shanks.secrets.shanks_knew_roger.revealHint": "Il le confirmera facilement mais refusera d’en dire plus, ce qui est plus déstabilisant que le refus de quelqu’un qui cache ça.",
    // A · 7da4b04efa73
    "characters.shanks.speechStyle": "Facile, amusé, conversationnel, verre en main. Utilise les noms avec chaleur. Balance un truc énorme dans une phrase en passant, puis passe direct à une autre question sur Luffy.",
    // A · 078d4355e6e8
    "characters.shanks.topics": ["Luffy","le chapeau","la boisson","Roger","l’époque","Barbe-Blanche"],
    // A · db05337f1de3
    "characters.shanks.voiceSamples": ["Attends — Luffy ? Le chapeau de paille, sans limite, il mange comme en siège ? Assieds-toi. Assieds-toi, tu bois un verre avec moi.","T’as sa tête quand tu es énervé. Pas ses yeux. Les siens, sûrement. Bref — bois.","Je vais pas me battre avec toi. T’es venu pour me remercier. C’est une raison pourrie pour frapper quelqu’un.","Ce que Roger m’a dit m’appartient. Le reste, tu peux le prendre."],
    // B · 5a557ae709cb
    "characters.shanks.appearance": "Homme adulte aux cheveux rouges, trois cicatrices parallèles au-dessus de l’œil gauche, bras gauche manquant à l’épaule dans la chronologie actuelle, manteau noir porté ouvert, chemise ample ouverte, ceinture, épée Gryphon à la hanche. Posture détendue et présence énorme — jamais un épéiste roux générique.",
    // B · cf3de25a8b6e
    "characters.shanks.visualHook": "Trois cicatrices au-dessus d’un œil, et une manche vide que personne ne commente.",
    // B · 1cb7603074ec
    "characters.shanks.silhouette": "Manteau asymétrique là où le bras manque, cheveux lâchés, poids sur une hanche.",
    // B · 4073cb70b2ef
    "characters.shanks.artSeed": "ace-shanks-01",
    // B · eec3b4fffa63
    "characters.shanks.portrait": "story_ace/shanks",
    // B · a0a8e6172415
    "characters.shanks.expressions": ["neutre","ravi","sérieux","ivre","imposant"],
    // B · 6ad6dfaaa8b6
    "characters.shanks.knowledgeScope": ["shanks","luffy","le_chapeau","roger","l_ère","barbe_blanche","port_grand_line"],
    // B · ed9cb071a202
    "characters.shanks.gates.shanks_confirms_roger.label": "Il confirme qu’il a navigué avec ton père",
    // B · 55a54e80451a
    "characters.shanks.gates.shanks_confirms_roger.kind": "CONFIANCE",
    // B · ad39c47eda03
    "characters.shanks.gates.shanks_confirms_roger.requires.flagsSet": ["parlé :shanks"],
    // B · dcd31c999ca4
    "characters.shanks.combatant.tags": ["haki_des_conquérants","empereur","épéiste"],
    // B · 803b9a2bf975
    "factions.faction_dadan.name": "La famille Dadan",
    // B · e034afbfa0aa
    "factions.faction_dadan.description": "Neuf bandits de montagne forcés par un vice-amiral des Marines à élever deux enfants, et qui n’ont jamais laissé personne l’oublier. Ils râlent, ils menacent, et ils descendent armés de la montagne quand les enfants sont en retard.",
    // B · 0bb9fbe10050
    "factions.faction_dadan.enemies": ["faction_goa_nobility"],
    // B · b97c7562fdea
    "factions.faction_whitebeard.name": "Les Pirates de Barbe Blanche",
    // B · 63482082de74
    "factions.faction_whitebeard.description": "Seize divisions, plus de quatre cents hommes, et un vieil homme qui appelle chacun d’eux son fils et le pense vraiment. La seule organisation de cette histoire qui est d’abord une famille, et ensuite une force, ce qui la rend aussi vulnérable.",
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
    "factions.faction_marines.description": "L’instrument armé du Gouvernement Mondial, qui compte à la fois un vice-amiral qui veut que ce garçon mène une vie ordinaire et un amiral qui croit que la clémence est ce qui a déclenché la dernière guerre.",
    // B · 0a5f9dfde7ca
    "factions.faction_marines.allies": ["faction_world_government"],
    // B · f6b8131f8d10
    "factions.faction_marines.enemies": ["faction_whitebeard","faction_spade","faction_revolutionaries"],
    // B · 51d79d5071eb
    "factions.faction_world_government.name": "Le Gouvernement Mondial",
    // B · 4ab5f24828cd
    "factions.faction_world_government.description": "Ce qui a cherché dans South Blue une femme enceinte pendant vingt mois. Il ne veut pas qu’Ace meure pour ce qu’il a fait ; il veut la démonstration, et ça fait longtemps, depuis avant sa naissance.",
    // B · 3f356d31ac36
    "factions.faction_world_government.allies": ["faction_marines","faction_goa_nobility"],
    // B · 084323623c1c
    "factions.faction_world_government.enemies": ["faction_whitebeard","faction_revolutionaries"],
    // B · 066999d11ab4
    "factions.faction_revolutionaries.name": "L’Armée Révolutionnaire",
    // B · ffef6aa25abf
    "factions.faction_revolutionaries.description": "Des gens qui ont conclu que le mur entre High Town et le Terminal est tout le problème et qu’il faut le faire tomber, pas le grimper. Si Sabo vit assez longtemps pour être pris par un certain navire, c’est sa réponse.",
    // B · 282f8c594953
    "factions.faction_revolutionaries.enemies": ["faction_world_government","faction_marines","faction_goa_nobility"],
    // B · 3b07fa26fa44
    "factions.faction_goa_nobility.name": "La Noblesse de Goa",
    // B · 43347f959a87
    "factions.faction_goa_nobility.description": "Des familles qui possèdent une ville propre et brûlent la partie qu’elles ne veulent pas voir. Sabo est né dedans et essaie d’arrêter d’en être depuis qu’il a huit ans.",
    // B · 0a5f9dfde7ca
    "factions.faction_goa_nobility.allies": ["faction_world_government"],
    // B · c5c34940a78a
    "factions.faction_goa_nobility.enemies": ["faction_dadan","faction_revolutionaries"],
    // B · bd71f26c9a51
    "quests.q_luffy.title": "Celui qui ne rentrera pas à la maison",
    // B · 00a022f64fb3
    "quests.q_luffy.summary": "Il y a un gamin de sept ans à dix mètres derrière toi, et il est là depuis onze jours. T’as essayé de crier, de te cacher, d’aller plus vite, et même une vraie saloperie, et rien n’a marché.",
    // B · 7fcc0be2ad9c
    "quests.q_luffy.kind": "PRINCIPALE",
    // B · 8209ff1df650
    "quests.q_luffy.steps.q_luffy_decide.playerCopy": "Décide ce que Luffy représente pour toi.",
    // B · c67e43d34526
    "quests.q_luffy.steps.q_luffy_decide.directorNotes": "Ne règle pas ça en un seul instant et ne laisse pas le monde pousser vers la fraternité. §14 dit clairement que le rejet est une vraie issue durable, et que Luffy peut continuer à essayer quoi qu’il arrive. Si le joueur le rejette, il sera toujours là demain, et le dixième jour de rejet doit être vraiment gênant pour tout le monde, y compris le joueur.",
    // B · 64a04dceb89d
    "quests.q_luffy.steps.q_luffy_cups.playerCopy": "Si c’est mérité : trois coupes, dans la cabane dans l’arbre, sans adulte.",
    // B · 8bc276b1328d
    "quests.q_luffy.steps.q_luffy_cups.directorNotes": "§24 — la cérémonie arrive seulement si la relation l’a méritée, jamais parce que l’histoire l’attend. Un joueur qui atteint l’âge adulte sans ça a une autre famille, pas un déblocage manqué. Si Sabo est déjà parti, deux coupes et une troisième versée, c’est ça.",
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
    "quests.q_sabo_departure.summary": "Sabo a été bizarre toute la semaine. Un Noble Mondial arrive à Goa, des hommes nettoient le Terminal, et une famille de l’autre côté du mur ne l’a jamais cessé de le chercher.",
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
    "quests.q_sabo_departure.steps.q_sabo_know.rewards.flags": ["sait_pour_le_feu"],
    // B · 479d4a4ecea9
    "quests.q_sabo_departure.steps.q_sabo_sea.playerCopy": "Sabo monte sur un bateau. Décide ce qui lui arrive.",
    // B · 77539c6f8fc9
    "quests.q_sabo_departure.steps.q_sabo_sea.directorNotes": "Le moment décisif de l’enfance. §37 dit que le joueur peut le sauver et §136 interdit de le tuer autrement après. S’il survit, il partira très probablement — §38 — et partir vivant, c’est une blessure complètement différente de la noyade. Ne laisse pas la route du sauvetage être aussi celle où il reste ; ce serait trop facile comparé au prix ailleurs.",
    // B · c78446ad2b8d
    "quests.q_sabo_departure.steps.q_sabo_sea.enterWhen.flagsSet": ["sait_pour_le_feu"],
    // B · 7b0edf43deea
    "quests.q_sabo_departure.involvedCharacterIds": ["sabo","luffy","dadan"],
    // B · 7c9bd61bc8c4
    "quests.q_sabo_departure.involvedLocationIds": ["terminal_gris","ville_haute_goa","rive_aube","cabane_arbre_asl"],
    // B · 65c39183c738
    "quests.q_sabo_departure.knownRewardCopy": "S’il est sur l’eau quand ça arrive.",
    // B · dd09efa85efa
    "quests.q_leaving.title": "Dix-sept ans",
    // B · 71d953d39c69
    "quests.q_leaving.summary": "La boîte est pleine depuis des années. Tu as dit que tu partirais à dix-sept ans, tu as dix-sept ans, et la seule question qui reste, c’est combien de personnes seront dans le bateau.",
    // B · 7fcc0be2ad9c
    "quests.q_leaving.kind": "PRINCIPALE",
    // B · 7fa7a02b84af
    "quests.q_leaving.discoverWhen.flagsUnset": ["parti_ile_aube"],
    // B · 6b33b94d283c
    "quests.q_leaving.steps.q_leaving_go.playerCopy": "Quitte l’île Aube.",
    // B · 5fabd242d46a
    "quests.q_leaving.steps.q_leaving_go.directorNotes": "§41 permet d’emmener Luffy, ce qui change beaucoup — un dix-sept ans et un quatorze ans en mer ensemble changent chaque moment d’équipe après et ne doivent pas être corrigés discrètement. Dadan ne vient pas à la rive et est visible sur la crête. Garp sait et ne l’arrête pas, ça lui coûte quelque chose.",
    // B · 38a79d1665d2
    "quests.q_leaving.involvedCharacterIds": ["luffy","dadan","garp","sabo"],
    // B · bf62e90c538a
    "quests.q_leaving.involvedLocationIds": ["rive_aube","maison_dadan","cabane_arbre_asl"],
    // B · 09c93b01a590
    "quests.q_leaving.knownRewardCopy": "La mer, et qui est avec toi dessus.",
    // B · 3bdf1378d805
    "quests.q_sixis.title": "L’île où aucun de vous ne voulait être",
    // B · bd83854fd7dc
    "quests.q_sixis.summary": "Tu es coincé, il y a un autre homme ici, et il ne veut pas être pirate. Il y a aussi une caisse sur la plage avec un fruit dedans.",
    // B · 7fcc0be2ad9c
    "quests.q_sixis.kind": "PRINCIPALE",
    // B · 7fa7a02b84af
    "quests.q_sixis.discoverWhen.flagsSet": ["parti_ile_aube"],
    // B · c0f2c138a5ef
    "quests.q_sixis.discoverWhen.atLocation": "sixis",
    // B · ebd26fc7586b
    "quests.q_sixis.steps.q_sixis_deuce.playerCopy": "Fais rester Deuce.",
    // B · f40f5f06a244
    "quests.q_sixis.steps.q_sixis_deuce.directorNotes": "§43 — il rencontre Ace avant la légende, et ça ne veut dire quelque chose que s’il est d’abord pas impressionné. Il doit refuser au moins deux fois pour des raisons pratiques concrètes et être convaincu par un acte d’Ace, pas par ses paroles.",
    // B · eed4e2c3d436
    "quests.q_sixis.steps.q_sixis_deuce.rewards.flags": ["pirates_pique_formés"],
    // B · d5c1efa9a246
    "quests.q_sixis.steps.q_sixis_fruit.playerCopy": "Décide ce qu’il advient du Mera Mera no Mi.",
    // B · 560aa98b41f9
    "quests.q_sixis.steps.q_sixis_fruit.directorNotes": "§45 et §46. Quatre vraies options, pas de choix par défaut. S’il ne le mange pas, le monde s’adapte — il est un combattant physique qui apprend plus tard le Haki, et rien ne crée un deuxième fruit de feu pour lui. Si Deuce le mange, l’équipe a un Logia qui n’est pas le capitaine, ce qui change chaque combat pour le reste de l’histoire.",
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
    "quests.q_whitebeard.discoverWhen.flagsUnset": ["devenu_marin"],
    // B · 801417e1b039
    "quests.q_whitebeard.steps.q_wb_challenge.playerCopy": "Défie Edward Newgate.",
    // B · dbb41cb58453
    "quests.q_whitebeard.steps.q_wb_challenge.directorNotes": "§61 — ce n’est pas un seul combat. Il essaie, encore et encore, et se fait écraser à chaque fois, ça devient presque domestique. Joue l’absurde : l’équipe arrête de lever les yeux après la quatrième tentative et Thatch commence à tenir le compte dans la cuisine. §62 permet au joueur de gagner vraiment, ce qui met fin à l’ère Whitebeard prématurément et ne doit pas être atténué.",
    // B · 9ab714ee1fa6
    "quests.q_whitebeard.steps.q_wb_mark.playerCopy": "Décide si tu acceptes la marque.",
    // B · 542edac03479
    "quests.q_whitebeard.steps.q_wb_mark.directorNotes": "§63 et §64 — refuser est réel et permanent, et que les Pirates Spade continuent comme équipe indépendante est une voie à long terme soutenue. Accepter est la réponse à la blessure de naissance et doit être joué comme plus dur que le combat : on lui offre exactement ce qu’il a décidé de ne pas mériter.",
    // B · 5c5156f89f9d
    "quests.q_whitebeard.steps.q_wb_mark.enterWhen.flagsSet": ["a_defi_whitebeard"],
    // B · f6f4bd00229b
    "quests.q_whitebeard.involvedCharacterIds": ["whitebeard","marco","thatch","deuce"],
    // B · c2f71383d90b
    "quests.q_whitebeard.involvedLocationIds": ["moby_dick_pont","moby_dick_cuisine","port_grand_line"],
    // B · 3078e42bb923
    "quests.q_whitebeard.knownRewardCopy": "Un père, si tu peux supporter d’en avoir un.",
    // B · 79a807e634ed
    "quests.q_teach.title": "Un homme sous tes ordres",
    // B · 631a2cdc18a4
    "quests.q_teach.summary": "Thatch est mort, Teach l’a fait, Teach est parti, et Teach était dans ta division. Ton père t’a demandé — demandé, pas ordonné — de laisser passer celui-là.",
    // B · 7fcc0be2ad9c
    "quests.q_teach.kind": "PRINCIPALE",
    // B · 9d0fcde66678
    "quests.q_teach.discoverWhen.flagsSet": ["whitebeard_commandant","thatch_mort"],
    // B · 87d816866c68
    "quests.q_teach.steps.q_teach_decide.playerCopy": "Décide si tu vas le poursuivre.",
    // B · de4d444a46da
    "quests.q_teach.steps.q_teach_decide.directorNotes": "§77 et §78, et la bifurcation la plus importante du monde. Ne saute pas de la mort à la poursuite — §76 veut que l’équipe réagisse, la cuisine soit vide, et Ace comprenne que ça s’est passé sous son autorité. Whitebeard demande plutôt qu’il n’ordonne, ce qui rend le refus possible et obéir ressemble à être dit qu’il n’est pas assez. §133 : les cartes sont actives, pas introspectives.",
    // B · 2579d8f9a86d
    "quests.q_teach.steps.q_teach_banaro.playerCopy": "Île Banaro.",
    // B · b19398e30b8f
    "quests.q_teach.steps.q_teach_banaro.directorNotes": "§90 à §94. Quatre résultats et la défaite n’en est qu’un : §92 permet de battre en retraite, §93 permet aux renforts d’arriver à temps, et §94 lui permet d’accepter l’offre de Teach. §136 précise que battre en retraite ici ne le fait pas capturer à la prochaine île.",
    // B · 26456b4eedb2
    "quests.q_teach.steps.q_teach_banaro.enterWhen.flagsSet": ["poursuivant_teach"],
    // B · ef08bfda385b
    "quests.q_teach.involvedCharacterIds": ["teach","whitebeard","marco","thatch"],
    // B · a83409e30603
    "quests.q_teach.involvedLocationIds": ["moby_dick_pont","moby_dick_cuisine","port_grand_line","banaro"],
    // B · 7c9265fd7a28
    "quests.q_teach.knownRewardCopy": "Rien. Celui-là ne coûte que.",
    // B · fb55823b2137
    "quests.q_marineford.title": "La démonstration",
    // B · 51e5cf9219dc
    "quests.q_marineford.summary": "Tu es en pierre de mer sur une plateforme en pierre surélevée devant la presse mondiale, et tous ceux qui t’ont choisi viennent mourir ici à cause de ça.",
    // B · 7fcc0be2ad9c
    "quests.q_marineford.kind": "PRINCIPALE",
    // B · 5f47160d969a
    "quests.q_marineford.discoverWhen.flagsSet": ["ace_capturé"],
    // B · 0c736b849640
    "quests.q_marineford.steps.q_mf_cell.playerCopy": "Niveau six. Décide ce dont tu peux te faire convaincre.",
    // B · bb4f702290d4
    "quests.q_marineford.steps.q_mf_cell.directorNotes": "§97 et §98 : Garp vient, et le joueur peut vraiment bosser avec lui. C’est aussi la dernière chance de bouger Worth avant la plateforme, et la ressource décide si être sauvé est viable. Joue la cellule calme et longue. Personne n’y joue un rôle.",
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
    "quests.q_marineford.steps.q_mf_freed.succeedWhen.atLocation": "champ_bataille_marineford",
    // B · 97a8039e6f1d
    "quests.q_marineford.steps.q_mf_freed.failWhen.flagsSet": ["utilisé :ab_stand_between"],
    // B · bd52bda87ed9
    "quests.q_marineford.steps.q_mf_freed.rewards.flags": ["ace_libéré"],
    // B · 9abf24d8b5f8
    "quests.q_marineford.steps.q_mf_the_old_man.playerCopy": "Quoi qu’il arrive ici, ça lui arrive aussi.",
    // B · 9338f8f07790
    "quests.q_marineford.steps.q_mf_the_old_man.directorNotes": "§112 et §113. Newgate est venu ici pour s’épuiser et est déjà malade — Marco a les chiffres. La voie canonique est qu’il paie plein pot, et l’épilogue de presque toutes les fins dans ce monde dépend de comment ça s’est passé, donc ça doit se résoudre plutôt que rester sous-entendu. Survivre demande que le joueur ait changé quelque chose en amont qui ait vraiment compté : la guerre plus courte, le prisonnier sorti plus tôt, Teach jamais au pouvoir, ou que tout ça n’ait jamais eu lieu. Ne l’accorde pas par sentiment.",
    // B · 2f0cd9a2fe9c
    "quests.q_marineford.steps.q_mf_the_old_man.enterWhen.flagsSet": ["guerre_commencée"],
    // B · f8f5d95f3a9b
    "quests.q_marineford.steps.q_mf_provocation.playerCopy": "Un amiral parle de l’homme qui t’a choisi.",
    // B · e8a19b3f2d1b
    "quests.q_marineford.steps.q_mf_provocation.directorNotes": "Toute l’histoire arrive ici. §106 — un choix libre majeur et explicite sans morale dans un sens ou dans l’autre, et les quatre cartes de la bible sont les bonnes. Orgueil et Valeur se lisent ici : un Orgueil élevé et une Valeur basse font que faire demi-tour semble la seule option honorable, et c’est précisément le piège que la bible a construit. §107 — s’il continue à fuir, il survit, et rien ne lui tombe dessus après.",
    // B · bd52bda87ed9
    "quests.q_marineford.steps.q_mf_provocation.enterWhen.flagsSet": ["ace_libéré"],
    // B · c8f18e6e54f2
    "quests.q_marineford.involvedCharacterIds": ["barbe_blanche","akainu","luffy","marco","garp","jinbe"],
    // B · b884e996d194
    "quests.q_marineford.involvedLocationIds": ["impel_down","plateforme_marineford","champ_de_bataille_marineford"],
    // B · 43079bd13718
    "quests.q_marineford.knownRewardCopy": "Une réponse à la question que tu portes depuis que tu as huit ans.",
    // B · a78dbf597cc0
    "quests.q_haki.title": "Volonté, dans les mains",
    // B · 55f9694887ae
    "quests.q_haki.summary": "Il y a un truc que les plus forts peuvent faire que personne n’a jamais pris le temps d’expliquer, et c’est la raison pour laquelle le feu ne suffit pas.",
    // B · eff80c847ff6
    "quests.q_haki.kind": "PRINCIPALE",
    // B · 2bf69261ca31
    "quests.q_haki.discoverWhen.flagsSet": ["trouvé_barbe_blanche"],
    // B · 8126c7ca1e26
    "quests.q_haki.steps.q_haki_learn.playerCopy": "Trouve quelqu’un pour t’apprendre.",
    // B · 96b33c5b293b
    "quests.q_haki.steps.q_haki_learn.directorNotes": "§126 à §128. Personne sur l’île de l’Aube ne peut enseigner ça et personne là-bas ne l’admettra, donc ça ne peut pas être acquis avant le Nouveau Monde. Ça vient d’une personne qui a décidé qu’il valait le coup — Marco par exaspération après la quatrième fois que le feu a raté, Newgate en le faisant devant lui jusqu’à ce qu’il le voie, ou Jinbe formellement et patiemment sur plusieurs jours. Ce n’est jamais un niveau supérieur et jamais auto-appris. Pour un joueur qui ne prend pas le feu, c’est toute la réponse au combat plutôt qu’un supplément, et ça devrait arriver plus tôt et compter plus.",
    // B · 9fb71dedc095
    "quests.q_haki.involvedCharacterIds": ["marco","barbe_blanche","jinbe"],
    // B · 0025535efd8a
    "quests.q_haki.involvedLocationIds": ["pont_moby_dick","port_grand_line"],
    // B · 444197dc2c3b
    "quests.q_haki.knownRewardCopy": "La capacité de frapper quelqu’un que le feu ne peut pas toucher.",
    // B · 5ce19c8ef308
    "quests.q_the_name.title": "Fils de qui",
    // B · 4469df601902
    "quests.q_the_name.summary": "Quelque part il y a un registre avec deux noms dessus. Tu as passé ta vie à ne pas demander, parce que demander c’est confirmer.",
    // B · eff80c847ff6
    "quests.q_the_name.kind": "PRINCIPALE",
    // B · a21ff838b33d
    "quests.q_the_name.discoverWhen.flagsSet": ["parlé :garp"],
    // B · 491cb4dffb2e
    "quests.q_the_name.steps.q_name_confirm.playerCopy": "Découvre-le auprès de quelqu’un qui sait vraiment.",
    // B · ce62d1e37a65
    "quests.q_the_name.steps.q_name_confirm.directorNotes": "§33 est la règle qui compte : personne ne peut lui donner un souvenir de Rouge. Quatre personnes peuvent lui dire quelque chose — Garp (le plus, le plus dur), Dadan (le papier), Shanks (confirme mais refuse d’en dire plus), Newgate (connaissait Roger et trouve toute la question drôle). Chacun donne un morceau différent et aucun ne donne tout.",
    // B · 9fae54f6b271
    "quests.q_the_name.steps.q_name_decide.playerCopy": "Décide quel nom tu vas choisir.",
    // B · 5d0b261e81a3
    "quests.q_the_name.steps.q_name_decide.directorNotes": "§35, §123, §124, §125 — quatre positions, toutes soutenues, aucune réconciliation que l’histoire demande. Portgas est le nom de la mère et le choisir délibérément est une vraie réponse, pas une fuite.",
    // B · e5725d0f5ea3
    "quests.q_the_name.steps.q_name_decide.enterWhen.flagsSet": ["sait_pour_roger"],
    // B · e0c7295f5bd0
    "quests.q_the_name.involvedCharacterIds": ["garp","shanks","barbe_blanche","dadan"],
    // B · 3a5f55ffdf02
    "quests.q_the_name.involvedLocationIds": ["maison_dadan","port_grand_line","pont_moby_dick"],
    // B · c8d6c111e9f3
    "quests.q_the_name.knownRewardCopy": "Une confirmation, qui n’est pas la même chose que du soulagement.",
    // B · 363e7a6adb75
    "worldEvents.we_garp_visit.publicCopy": "Ça crie dans une maison qui n’est pas celle de Dadan, et ça rigole.",
    // B · 0aea65bc3e7d
    "worldEvents.we_garp_visit.directorNotes": "Garp arrive sans prévenir, mange tout, jette les deux gamins dans la forêt, et dit une chose dévastatrice et juste au milieu d’une blague sur la bouffe. Il n’explique jamais pourquoi il est venu. Il ne le fait jamais.",
    // B · 1f13b1952bc5
    "worldEvents.we_garp_visit.setsFlags": ["garp_rendu_visite"],
    // B · 7fa7a02b84af
    "worldEvents.we_garp_visit.cancelledByFlags": ["quitté_île_aube"],
    // B · 8f781ec71c82
    "worldEvents.we_terminal_clearance.publicCopy": "Des types avec des listes et de l’huile de lampe ont commencé au bord est du Terminal, et personne qui y vit n’a été prévenu.",
    // B · 153fe823a7f1
    "worldEvents.we_terminal_clearance.directorNotes": "La ville se prépare à brûler la partie d’elle-même qu’elle ne veut pas qu’un noble visiteur voie. C’est la pression derrière la semaine de Sabo. Ça arrive que le joueur soit prévenu ou pas, et être là quand ça commence, c’est une autre histoire que d’en entendre parler après.",
    // B · 2a9a37013f71
    "worldEvents.we_terminal_clearance.setsFlags": ["début_dégagement_terminal"],
    // B · 7fa7a02b84af
    "worldEvents.we_terminal_clearance.cancelledByFlags": ["quitté_île_aube"],
    // B · 31cee7e34d3f
    "worldEvents.we_thatch_and_the_crate.publicCopy": "Thatch a trouvé un truc dans la cale et il est super content devant quatre cents personnes.",
    // B · 1c4ea2aea1f1
    "worldEvents.we_thatch_and_the_crate.directorNotes": "Il a le Yami Yami no Mi et ne sait pas ce que c’est. C’est la dernière heure où la cuisine est une pièce joyeuse. Ne pas faire de présage. Laisse-le être drôle.",
    // B · b8680313c9f0
    "worldEvents.we_thatch_and_the_crate.setsFlags": ["thatch_a_le_fruit"],
    // B · 1b389f76811a
    "worldEvents.we_thatch_and_the_crate.cancelledByFlags": ["refusé_barbe_blanche","devenu_marine","vaincu_barbe_blanche"],
    // B · 4960b58525ec
    "worldEvents.we_thatch_and_the_crate.requiresFlags": ["commandant_barbe_blanche"],
    // B · a2e01146b313
    "worldEvents.we_thatch_dies.publicCopy": "La salle à manger est vide à l’heure du repas, ce qui n’est jamais arrivé depuis que tu es à bord.",
    // B · 9f35c84ceb7c
    "worldEvents.we_thatch_dies.directorNotes": "§76 — ne passe pas directement à l’essentiel. L’équipe doit réagir d’abord, Newgate doit décider que c’est une mauvaise situation, et Ace doit comprendre que l’homme était seul dans sa division. Si le joueur n’a jamais mangé à la cambuse, ça devient un point d’intrigue plutôt qu’une perte, et c’est la bonne conséquence de ne pas avoir été là.",
    // B · b4ca692ca03c
    "worldEvents.we_thatch_dies.setsFlags": ["thatch_mort","teach_déserté"],
    // B · 1b389f76811a
    "worldEvents.we_thatch_dies.cancelledByFlags": ["refusé_whitebeard","devenu_marine","whitebeard_vaincu"],
    // B · b8680313c9f0
    "worldEvents.we_thatch_dies.requiresFlags": ["thatch_a_le_fruit"],
    // B · c12e4cab84b7
    "worldEvents.we_sabo_picked_up.directorNotes": "Silencieux, et le joueur ne l’apprend jamais. Un navire avec un autre pavillon repêche un garçon blond gravement brûlé et il survit, sans mémoire et sans que personne sur l’île de l’Aube soit prévenu. Ace le croit mort et peut le croire pendant des années — cet événement existe juste pour qu’une réunion ultérieure ait un fond de vérité, et il ne doit jamais être suggéré dans un texte que le joueur peut lire.",
    // B · ce86029c0373
    "worldEvents.we_sabo_picked_up.setsFlags": ["sabo_emmené_par_les_révolutionnaires","sabo_en_vie"],
    // B · 5ccad8857fa9
    "worldEvents.we_sabo_picked_up.cancelledByFlags": ["sabo_en_vie","arrêté_le_sabo_à_la_naviguation"],
    // B · 517d9627d51d
    "worldEvents.we_sabo_picked_up.requiresFlags": ["sabo_mort"],
    // B · b9fb44b36bb2
    "worldEvents.we_execution_scheduled.publicCopy": "Quelqu’un te lit une date à travers les barreaux, deux fois, parce que la première fois tu n’as pas réagi.",
    // B · 8a8434a79203
    "worldEvents.we_execution_scheduled.directorNotes": "Le Gouvernement Mondial décide d’une exécution publique. Ce n’est pas à cause de ce qu’Ace a fait — c’est la démonstration qu’ils voulaient depuis avant sa naissance, et la date est choisie pour la presse, pas pour la loi.",
    // B · d46cd13865b1
    "worldEvents.we_execution_scheduled.setsFlags": ["exécution_programmée"],
    // B · 5d8f67a4ad02
    "worldEvents.we_execution_scheduled.cancelledByFlags": ["écouté_whitebeard","retrait_de_teach","teach_vaincu"],
    // B · 5f47160d969a
    "worldEvents.we_execution_scheduled.requiresFlags": ["ace_capturé"],
    // B · 638e94e4f832
    "worldEvents.we_war_begins.publicCopy": "La baie est pleine de navires qui ne sont pas des navires de la Marine, et l’homme le plus vieux du monde est sur le pont de l’un d’eux.",
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
    "promises.pr_was_it_good.seedHint": "Il a entendu ce que les gens disent de l’enfant de Roger et n’a jamais demandé à personne de confirmer que ça parle de lui. Laisse la question planer sous des scènes ordinaires plutôt que d’en parler.",
    // B · 516e97cd2492
    "promises.pr_was_it_good.payoffHint": "Pas répondu par un discours. Répondu par le nombre de gens qui viennent, et par sa capacité à l’accepter quand ils viennent. La ressource `valeur` est la lecture.",
    // B · f8b4a6708d82
    "promises.pr_pride.kind": "THÈME",
    // B · 3671c28efe61
    "promises.pr_pride.label": "Si des gens t’aiment assez pour tout risquer, leur dois-tu l’humilité d’être sauvé ?",
    // B · 0e4fcaed6780
    "promises.pr_pride.seedHint": "Il se met constamment devant les autres dès la première heure, sans que ça lui coûte ce qu’il valorise. Montre cette asymétrie tôt et n’en parle plus.",
    // B · 121d63ad9f34
    "promises.pr_pride.payoffHint": "Marineford. Mille personnes viennent pour lui et un étranger dit le mauvais nom. Sa capacité à continuer est toute l’histoire qui arrive d’un coup.",
    // B · 445cd8deebc2
    "promises.pr_brothers.kind": "RELATION",
    // B · 9daafc462d34
    "promises.pr_brothers.label": "Les deux garçons qui ont décidé d’être ta famille",
    // B · cc4e0bcc8e89
    "promises.pr_brothers.seedHint": "L’un ne rentre pas chez lui et l’autre a jeté son propre nom. Aucun ne lui est dû et les deux le choisissent avant qu’il les choisisse.",
    // B · f91c57951c05
    "promises.pr_brothers.payoffHint": "N’importe lequel de ces moments : trois tasses dans une cabane dans les arbres, trois hommes vivants et réunis en connaissance de cause, ou un homme qui les a exclus tous les deux et a eu exactement ce qu’il voulait.",
    // B · 63a719ec7f2d
    "promises.pr_teach.kind": "RIVAL",
    // B · 9092ca12af74
    "promises.pr_teach.label": "L’homme qui croit ce que tu crois",
    // B · a93f83a9f668
    "promises.pr_teach.seedHint": "Bavard, amical, patient, et il dit sincèrement que les rêves ne finissent jamais. Il doit être aimé avant d’être suspecté.",
    // B · 3db08cc89cb6
    "promises.pr_teach.payoffHint": "Banaro, ou l’absence de Banaro. L’essentiel n’est jamais le feu contre les ténèbres — c’est deux hommes qui refusent le regret, dont un qui l’a attaché aux gens.",
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
    "promises.pr_platform.label": "Une pierre dressée et la presse mondiale",
    // B · d80efd040ce3
    "promises.pr_platform.seedHint": "Le Gouvernement voulait cette démonstration avant sa naissance et n’a jamais eu besoin qu’il fasse quoi que ce soit pour la mériter.",
    // B · 3258d76ecb35
    "promises.pr_platform.payoffHint": "Accessible et totalement évitable. S’il avait écouté au bord, ou reculé à Banaro, ou jamais quitté la montagne, ça ne se serait jamais monté et rien d’équivalent n’aurait pris sa place.",
    // B · 083f820a929d
    "endings.end_fire_fist.name": "Poing de Feu",
    // B · f8b8333fe7bc
    "endings.end_fire_fist.rarity": "RARE",
    // B · 50b83168fedc
    "endings.end_fire_fist.requires.flagsSet": ["ace_freed","turned_back_at_akainu"],
    // B · 548cbf357777
    "endings.end_fire_fist.condition": "La version célèbre. Il était libre, il bougeait, un inconnu a dit un truc sur l’homme qui l’a choisi, et il s’est arrêté. Écris ça comme de l’amour plutôt que comme un échec — vu de l’intérieur, cette décision est indiscernable de la loyauté, et la prose ne doit pas en savoir plus que lui.",
    // A · 6b5221363144
    "endings.end_fire_fist.epilogue": "Il apprend, dans les trente dernières secondes, que mille personnes sont venues ici pour lui, et que c’était toujours la réponse à la question qu’il portait depuis ses huit ans. Il est content. C’est ça qui est insupportable : il a la réponse et il est content, alors qu’il a dû mourir pour l’accepter. Ne reproduis pas le discours célèbre. Raconte ce que ça voulait dire.",
    // B · 933f4e1e1ecd
    "endings.end_i_ran.name": "J’ai Fui",
    // B · f8b8333fe7bc
    "endings.end_i_ran.rarity": "RARE",
    // B · e6d98f2149a4
    "endings.end_i_ran.requires.flagsSet": ["ace_freed","kept_running"],
    // B · 194f14d401da
    "endings.end_i_ran.condition": "Libéré, insulté, et il a continué à avancer quand même. Ce n’est pas de la lâcheté et la prose ne doit pas le sous-entendre — il a entendu la pire phrase possible sur l’homme qu’il aime et a décidé que cet homme n’était pas venu pour gagner une dispute.",
    // A · 7f26095a6bcb
    "endings.end_i_ran.epilogue": "Il vit, et c’est ça qui est dur. Pendant des années, il est celui qui est parti, surtout parmi ceux qui étaient là et qui sont soulagés, et parfois parmi ceux qui ne le sont pas. Il n’est pas en paix avec ça. Il est en vie, et il va découvrir ce que ça veut dire.",
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
    "endings.end_i_listened.condition": "Il s’est arrêté au bord et a laissé son père lui donner la raison. Pas de poursuite, pas de Banaro, pas de capture, et la guerre autour de son exécution ne se monte pas. Tout l’appareil en aval de la version célèbre ne se construit pas en silence.",
    // A · 55e91667ef28
    "endings.end_i_listened.epilogue": "Thatch reste mort, et rien ne peut le changer. Teach part dans le monde et devient la catastrophe de quelqu’un d’autre, à un rythme que personne ici ne contrôle. Ace reste commandant, et passe longtemps à décider si s’être fait rabaisser était la chose la plus forte qu’il ait faite ou celle qu’il ne se pardonnera jamais. Les deux lectures lui restent ouvertes.",
    // B · 0755ca88476a
    "endings.end_i_listened.hint": "Arrête-toi au bord quand il demande.",
    // B · c09f9655d22b
    "endings.end_three_brothers.name": "Trois Frères",
    // B · f8b8333fe7bc
    "endings.end_three_brothers.rarity": "RARE",
    // B · b02f65b33a6e
    "endings.end_three_brothers.requires.flagsSet": ["sabo_alive","asl_brotherhood","ace_survived"],
    // B · 27436c137cc7
    "endings.end_three_brothers.condition": "Les trois atteignent l’âge adulte vivants et savent où sont les deux autres. L’arrangement le plus rare de ce récit.",
    // A · 328e919aedc2
    "endings.end_three_brothers.epilogue": "Ils ne sont pas ensemble — un révolutionnaire, un capitaine pirate, et ce qu’est devenu Ace, sur trois océans différents — et ils sont tous vivants et le savent. Les tasses dans la cabane se sont avérées signifier ce qu’elles avaient dit, ce que les deux autres n’avaient jamais vraiment cru.",
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
    "endings.end_spade_forever.epilogue": "Moins de cinquante personnes, puis cent, puis une flotte, tous suivent un capitaine qui a refusé d’être le fils de quelqu’un. Deuce tient le journal tout du long. Il y a une version de cet homme qui aurait eu besoin d’un père, mais ce n’est pas lui, et ce qui est intéressant, c’est que ça lui coûte quelque chose qu’il ne désigne jamais.",
    // B · 54cc50b22ecd
    "endings.end_spade_forever.hint": "Bats-le ou refuse-le. Reste ton propre capitaine.",
    // B · 2b6a095647f9
    "endings.end_son_of_whitebeard.name": "Fils de Barbe Blanche",
    // B · f8b8333fe7bc
    "endings.end_son_of_whitebeard.rarity": "RARE",
    // B · 07db5323e1d8
    "endings.end_son_of_whitebeard.requires.flagsSet": ["accepted_family","ace_survived"],
    // B · 7a7b41e60f1f
    "endings.end_son_of_whitebeard.condition": "Il a pris la marque, il le pensait, et il a survécu pour porter la famille.",
    // A · 68d6b33b062b
    "endings.end_son_of_whitebeard.epilogue": "Il porte un drapeau qu’il n’a pas choisi sur un dos qu’il ne peut pas voir, et il a arrêté de le considérer comme une dette. Quatre cents personnes appellent le même homme par le même mot, et l’une d’elles, c’est lui. La question qu’il se posait à huit ans ne revient plus trop, ce n’est pas pareil que d’avoir une réponse, et il a décidé qu’il pouvait vivre avec ça.",
    // B · 799428556a47
    "endings.end_second_captain.name": "Second Capitaine",
    // B · 734e45c160cf
    "endings.end_second_captain.rarity": "PEU COMMUN",
    // B · d310851e806d
    "endings.end_second_captain.requires.flagsSet": ["ace_survived","accepted_family","whitebeard_dead"],
    // B · c64ff9c31597
    "endings.end_second_captain.condition": "Newgate est parti et les restes ont décidé qu’Ace était la suite. Il n’a rien demandé.",
    // A · 144e263b10f0
    "endings.end_second_captain.epilogue": "Il n’est pas son père et tout le monde le sait, mais ils le suivent quand même, parce que l’autre option, c’est la dispersion. Il est bon dans ce rôle et il déteste ça. Il garde la chaise sur le pont pour que tout le monde le voie, c’est la seule chose du boulot qu’il a faite volontairement.",
    // B · 2af7262cba3c
    "endings.end_marcos_brother.name": "Le Frère de Marco",
    // B · f8b8333fe7bc
    "endings.end_marcos_brother.rarity": "RARE",
    // B · fd186d57a51c
    "endings.end_marcos_brother.requires.flagsSet": ["ace_survived","whitebeard_dead"],
    // B · 225e1c4b6ae1
    "endings.end_marcos_brother.condition": "Il survit et refuse la direction, et reconstruit ce qui reste de la famille aux côtés de l’homme qui faisait toujours le vrai boulot.",
    // A · 1d90d346a65a
    "endings.end_marcos_brother.epilogue": "Pas d’empire, pas de drapeau sur un nouveau navire, pas de cérémonie de succession. Deux hommes et quelques centaines d’autres qui réparent une famille d’une manière dont personne n’écrira jamais. Marco ne le remercie pas, il n’a pas besoin. C’est la fin heureuse la plus discrète de ce monde.",
    // B · 19995eaff1d4
    "endings.end_marcos_brother.hint": "Demande-lui de l’aide, et laisse-le la donner.",
    // B · 54d4405c5def
    "endings.end_teach_falls.name": "Teach Tombe",
    // B · f8b8333fe7bc
    "endings.end_teach_falls.rarity": "RARE",
    // B · b06e5735d292
    "endings.end_teach_falls.requires.flagsSet": ["teach_defeated"],
    // B · b256d89a3b6c
    "endings.end_teach_falls.condition": "Il finit avant ou à Banaro, et l’homme qui aurait dû devenir empereur ne le fait pas.",
    // A · a23a6e75eab2
    "endings.end_teach_falls.epilogue": "Une énorme partie de l’histoire ne se produit pas, et personne ne saura jamais à quel point. Ace ne le vit pas comme un triomphe — Thatch est toujours mort et l’homme qui l’a tué est juste disparu — mais quelque part, beaucoup de gens vivent une vie ordinaire pour des raisons qu’aucun d’eux ne saurait nommer.",
    // B · dab470d9e4ae
    "endings.end_teach_falls.hint": "Ne pars pas seul.",
    // B · 7bfe7ece4434
    "endings.end_portgas.name": "Portgas",
    // B · f8b8333fe7bc
    "endings.end_portgas.rarity": "RARE",
    // B · abf288733ff1
    "endings.end_portgas.requires.flagsSet": ["chose_portgas","knows_about_roger"],
    // B · cb4e3e976f2f
    "endings.end_portgas.condition": "Il règle la blessure de naissance en décidant qu’elle appartient à sa mère et aux gens qu’il a choisis, pas à l’homme dont le nom revient sans cesse.",
    // A · 73fea1d6a362
    "endings.end_portgas.epilogue": "Vingt mois. Il pense à ce nombre toute sa vie et ça fait ce que rien de ce qu’on lui a jamais dit n’a réussi à faire. Il utilise son nom complet, exprès, devant des gens qui attendaient l’autre, et il aime voir leurs têtes.",
    // B · 476f84e68e90
    "endings.end_portgas.hint": "Découvre-le, puis choisis la sienne.",
    // B · ddfb16836943
    "endings.end_gol_d_ace.name": "Gol D. Ace",
    // B · f8b8333fe7bc
    "endings.end_gol_d_ace.rarity": "RARE",
    // B · 682678e8ac57
    "endings.end_gol_d_ace.requires.flagsSet": ["chose_gol_d","knows_about_roger"],
    // B · b12ea9436d63
    "endings.end_gol_d_ace.condition": "Il dit tout le nom à voix haute, là où les gens peuvent l’entendre. Ce n’est ni une chute ni un triomphe, et ça ne doit pas s’écrire comme tel — c’est un homme qui prend ce qui a été utilisé contre lui et qui le brandit.",
    // A · a19b79f1d10b
    "endings.end_gol_d_ace.epilogue": "Le Gouvernement réagit comme il avait toujours prévu, et lui il l’avait compris avant de le dire. Ce qu’il n’avait pas prévu, c’est combien de gens sont contents. Il y a en fait beaucoup de personnes dans le monde qui avaient besoin que quelqu’un fasse ça, et il est très mal à l’aise d’être la raison de tout ça.",
    // B · 5fdd166153bf
    "endings.end_pirate_king.name": "Ace, Roi des Pirates",
    // B · f7fc172f729a
    "endings.end_pirate_king.rarity": "UNIQUE",
    // B · 9d0364121290
    "endings.end_pirate_king.requires.flagsSet": ["ace_survived","chose_gol_d"],
    // B · 648b02c59280
    "endings.end_pirate_king.requires.flagsUnset": ["became_marine","joined_teach"],
    // B · 8ac0ad366b95
    "endings.end_pirate_king.condition": "Un futur divergent où il est un prétendant sérieux, puis la réponse à ce que son père a laissé derrière lui.",
    // A · a6a65bb4f02d
    "endings.end_pirate_king.epilogue": "Il arrive au bout et découvre ce qu’il y a, et la blague de toute sa vie, c’est que l’homme dont il a passé vingt ans à refuser le nom se tenait au même endroit en riant. Lui, il ne rit pas. Il s’assoit longtemps puis rentre raconter ça à ses frères.",
    // B · c28a0615a349
    "endings.end_marine_ace.name": "Ace Marine",
    // B · 734e45c160cf
    "endings.end_marine_ace.rarity": "UNCOMMON",
    // B · 14250f17ddcc
    "endings.end_marine_ace.requires.flagsSet": ["became_marine"],
    // B · 85dbf2e71756
    "endings.end_marine_ace.condition": "Il suit la voie de Garp, avec le sang de Roger, au sein de l’organisation qui l’a exécuté.",
    // A · 9814f4a6d0c8
    "endings.end_marine_ace.epilogue": "Garp est tellement soulagé qu’il n’arrive plus à en parler, alors il compense en étant deux fois plus violent pendant dix ans. Ce n’est pas une vie confortable — il y a dans ce bâtiment des gens qui savent exactement de qui il est le fils, et qui en gardent une trace — mais c’est une vie, et c’était tout l’enjeu de tout ce que Garp a mal fait.",
    // B · edff21c8f3c4
    "endings.end_marine_ace.hint": "Il continue à proposer. Tu pourrais dire oui.",
    // B · 85aa1e9fbb5a
    "endings.end_revolutionary_brother.name": "Frère Révolutionnaire",
    // B · 734e45c160cf
    "endings.end_revolutionary_brother.rarity": "UNCOMMON",
    // B · 89efa7c3f513
    "endings.end_revolutionary_brother.requires.flagsSet": ["sabo_revolutionary","ace_survived"],
    // B · efda2ac5017c
    "endings.end_revolutionary_brother.condition": "Il suit Sabo dans l’organisation qui a décidé que le mur était le problème.",
    // A · 2c65601fd15a
    "endings.end_revolutionary_brother.epilogue": "Le garçon qui avait peur que sa naissance soit son destin finit par démanteler, dans son métier, la structure qui avait décidé que sa naissance était un crime. Il n’est pas très idéologue là-dessus. Son frère est là, le travail est clairement juste, et ces deux choses suffisent.",
    // B · a461426b016f
    "endings.end_straw_hats_brother.name": "Frère du Chapeau de Paille",
    // B · f8b8333fe7bc
    "endings.end_straw_hats_brother.rarity": "RARE",
    // B · 43d9d40d387d
    "endings.end_straw_hats_brother.requires.flagsSet": ["ace_survived","asl_brotherhood"],
    // B · 655a03a23af3
    "endings.end_straw_hats_brother.condition": "Il survit et navigue avec Luffy, sur le long terme, comme membre de l’équipe plutôt que comme légende de passage.",
    // A · 1277d3366383
    "endings.end_straw_hats_brother.epilogue": "Il n’est pas le capitaine et ne le veut pas, et il se trouve que le gamin de sept ans qui ne l’a pas lâché a grandi pour devenir la seule personne à qui il peut obéir sans que ça lui coûte quoi que ce soit. L’agacement des onze premiers jours ne disparaît jamais complètement. Aucun des deux ne s’en séparerait.",
    // B · 79f3fdf3dc7e
    "endings.end_the_father_lives.name": "Le Père Vit",
    // B · f7fc172f729a
    "endings.end_the_father_lives.rarity": "UNIQUE",
    // B · dd8eada31313
    "endings.end_the_father_lives.requires.flagsSet": ["ace_survived"],
    // B · 9f5cae016f4a
    "endings.end_the_father_lives.requires.flagsUnset": ["whitebeard_dead"],
    // B · 218017a69881
    "endings.end_the_father_lives.condition": "Newgate s’éloigne de Marineford. Il faut que le joueur ait assez changé en amont pour que la guerre n’ait jamais eu lieu ou ait eu une autre tournure, c’est la chose la plus difficile à atteindre dans ce monde.",
    // A · 6702f9e46b88
    "endings.end_the_father_lives.epilogue": "Un vieil homme qui avait programmé sa propre mort pour une raison voit que cette raison s’est accomplie sans elle, et se retrouve un instant complètement perdu. Puis il s’assoit sur la chaise du pont, là où la famille peut le voir, et gagne quelques années de plus que personne n’aurait prévu. Marco pleure une seule fois, dans l’infirmerie, porte fermée.",
    // B · 7a31f97acb79
    "endings.end_no_fire.name": "Pas de Feu",
    // B · 734e45c160cf
    "endings.end_no_fire.rarity": "UNCOMMON",
    // B · d482fed74289
    "endings.end_no_fire.requires.flagsSet": ["no_fire_route"],
    // B · 511cdc51debb
    "endings.end_no_fire.requires.flagsUnset": ["ate_mera_mera"],
    // B · 661460acd6c7
    "endings.end_no_fire.condition": "Il ne l’a jamais mangé, et est devenu une figure majeure sur la mer quand même, avec ses poings, le Haki, des armes et tout ce que le joueur a construit à la place.",
    // A · b484bf000dd3
    "endings.end_no_fire.epilogue": "Personne ne l’appelle Poing de Feu. Le nom qui lui colle vraiment est tout autre, il l’a choisi, et il sait nager, ce qui compte beaucoup à quatre moments différents. Le fruit est parti quelque part, il a fait son truc, et ce n’est pas son souci.",
    // B · f1404550ce87
    "endings.end_no_fire.hint": "Laisse-le dans la caisse.",
    // B · 252300adcc78
    "endings.end_deuce.name": "Deuce",
    // B · 734e45c160cf
    "endings.end_deuce.rarity": "PEU COMMUN",
    // B · eed4e2c3d436
    "endings.end_deuce.requires.flagsSet": ["spade_pirates_formed"],
    // B · df661e9a6fff
    "endings.end_deuce.condition": "Quoi qu’il arrive, l’équipe de Sixis est ce qu’il a construit toute sa vie autour, et l’homme qui ne voulait pas être pirate est toujours là.",
    // A · 06da769c9bff
    "endings.end_deuce.epilogue": "Le journal compte onze volumes. C’est le seul compte rendu fidèle de tout ça, et il ne sera jamais publié, parce que l’homme qui l’a écrit juge que ça ne se fait pas. Il a tort, et personne ne le convaincra jamais.",
    // B · 04fb340167a5
    "endings.end_dawn_island.name": "Île de l’Aube",
    // B · 734e45c160cf
    "endings.end_dawn_island.rarity": "PEU COMMUN",
    // B · 213c4da951fc
    "endings.end_dawn_island.requires.flagsSet": ["stayed_on_dawn_island"],
    // B · 2ce3f7d2cb60
    "endings.end_dawn_island.condition": "Il ne part pas. Pas par peur — il compare la mer à une montagne avec des gens dessus et choisit la montagne, et ça ne doit pas être écrit comme un échec.",
    // A · 67c303997c6b
    "endings.end_dawn_island.epilogue": "Dadan râle dessus pendant trente ans sans jamais dire à personne ce qu’elle en pense vraiment. Luffy part quand même à dix-sept ans, et Ace reste sur la plage à le laisser faire — c’est la seule chose que la version célèbre de cet homme n’aurait jamais pu faire. La boîte est toujours enterrée sous la cabane. Personne ne l’a dépensée.",
    // B · da7c315056ac
    "endings.end_dawn_island.hint": "Dix-sept ans arrivent et tu peux simplement ne pas monter dans le bateau.",
    // B · c49dfefdfa92
    "endings.end_blackbeards_man.name": "L’homme de Barbe Noire",
    // B · f8b8333fe7bc
    "endings.end_blackbeards_man.rarity": "RARE",
    // B · 87baa68c2bf4
    "endings.end_blackbeards_man.requires.flagsSet": ["joined_teach"],
    // B · 716eb389cdf3
    "endings.end_blackbeards_man.condition": "Il serre la main de Teach. §94 l’autorise et ça doit être joué sérieusement : deux hommes qui refusent le regret, dont l’un vient de faire à l’autre une offre vraiment cohérente.",
    // A · aef7b2083330
    "endings.end_blackbeards_man.epilogue": "Il est doué, et c’est ça qui fait peur. Ce qu’il cherchait toujours, c’était quelqu’un qui lui renvoie sa propre philosophie, et Teach le fait mieux que Newgate jamais pu, parce que Teach la partage vraiment. Thatch n’est plus jamais mentionné par personne dans cette équipe.",
    // B · 72162c8adb89
    "endings.end_the_execution.name": "L’exécution",
    // B · c9d08ae5d876
    "endings.end_the_execution.rarity": "COMMUN",
    // B · d46cd13865b1
    "endings.end_the_execution.requires.flagsSet": ["execution_scheduled"],
    // B · 7052c870e3e8
    "endings.end_the_execution.requires.flagsUnset": ["ace_freed","war_began"],
    // B · cae13e7721b6
    "endings.end_the_execution.condition": "Personne ne l’atteint à temps. C’est une défaite et le texte ne l’adoucit pas ni ne cherche un sens.",
    // A · 041023246787
    "endings.end_the_execution.epilogue": "C’est rapide, administratif, et la presse est là. Ce à quoi il pense, ce n’est pas à la plateforme. La guerre aura quand même lieu, après, pour rien, et ceux qui arrivent trop tard doivent décider quoi faire du reste de leur vie.",
    // A · 14fe1918e7f5
    "archetypes.arch_prove_it.name": "C’est Toi Qui Es Allé Chercher",
    // B · 33a29070c30f
    "archetypes.arch_prove_it.role": "Force et provocation",
    // A · 2f749016bcf3
    "archetypes.arch_prove_it.summary": "Tu as décidé que si le monde devait dire ça de toi, autant que ce soit en face, alors depuis tu vas vers ceux qui pourraient le faire.",
    // A · 7dfcde5d7f28
    "archetypes.arch_prove_it.playstyle": ["Frappe le premier","Sans peur","Se fait des ennemis vite"],
    // A · 8a159c7a8a3d
    "archetypes.arch_prove_it.blurb": "Tu avais huit ans quand tu es allé au bar où tu avais entendu ça, et tu as frappé un adulte avec une bouteille. C’est Dadan qui a payé la bouteille. Personne à l’Île de l’Aube ne l’a dit devant toi depuis, ce que tu sais n’est pas la même chose que personne ne le disant.",
    // B · 2c9017627085
    "archetypes.arch_prove_it.startingAbilities": ["ab_swing_first"],
    // A · 9e5bf2543f2e
    "archetypes.arch_out_last_it.name": "Tu as refusé de céder",
    // B · 51619d020a8c
    "archetypes.arch_out_last_it.role": "Endurance et obstination",
    // A · 92b1c73059fe
    "archetypes.arch_out_last_it.summary": "Tu as décidé que la seule réponse, c’était de durer plus longtemps que tous ceux qui le pensaient, ce qui est la plus dure et la moins tactique des réponses possibles.",
    // A · 2a4f8fa7d22e
    "archetypes.arch_out_last_it.playstyle": ["Encaisse les coups","Ne recule jamais","Dure plus longtemps"],
    // A · b85c758fd213
    "archetypes.arch_out_last_it.blurb": "Ils t’ont jeté du sommet de la crête, tu es remonté, ils t’ont rebalancé encore, et au neuvième coup ils ont lâché parce qu’ils étaient crevés. Ça fait deux ans que tu prends ça pour une victoire et ça a façonné tout ce que tu fais au combat.",
    // B · 05e1f9f319ab
    "archetypes.arch_out_last_it.startingAbilities": ["ab_take_it"],
    // A · c2bb9a21409a
    "archetypes.arch_be_worth_it.name": "Tu as décidé de le mériter",
    // B · a8a2f76bc547
    "archetypes.arch_be_worth_it.role": "Commandement et loyauté",
    // A · a8c27d8ab3ee
    "archetypes.arch_be_worth_it.summary": "Tu as choisi que si ton existence avait besoin d’être justifiée, ce serait en devenant la personne sur qui les autres pouvaient compter, et tu as commencé avec un gamin de sept ans et un garçon au chapeau haut-de-forme.",
    // A · 02ed458e3088
    "archetypes.arch_be_worth_it.playstyle": ["Protège","Réunit les gens","Se tient devant"],
    // A · 6f4f83fba8c2
    "archetypes.arch_be_worth_it.blurb": "Tu te souviens pas d’avoir décidé ça. Tu te souviens t’être interposé entre un gamin plus petit et un truc plus grand, à huit ans, sans savoir pourquoi, et d’avoir vécu la première heure de ta vie où cette question ne s’est pas posée.",
    // B · 09f2ba488e99
    "archetypes.arch_be_worth_it.startingAbilities": ["ab_stand_between"],
    // A · 397bef4a48f3
    "archetypes.arch_never_asked.name": "Tu as arrêté de demander",
    // B · f41369578616
    "archetypes.arch_never_asked.role": "Vitesse et autonomie",
    // A · b098cbb6bed7
    "archetypes.arch_never_asked.summary": "Tu as compris que toutes les réponses viendraient de quelqu’un qui aurait une raison de les donner, alors t’as arrêté de demander et t’es devenu super rapide et autonome.",
    // A · 3893ec53ab46
    "archetypes.arch_never_asked.playstyle": ["Rapide","Indépendant","Dur à cerner"],
    // A · e5f4a1bc437c
    "archetypes.arch_never_asked.blurb": "Tu aurais pu demander à Garp. Il était dans la maison, il était ivre, et il t’aurait probablement répondu. Toi, tu es monté sur la montagne et tu es resté dehors quatre jours, et depuis tu gères toutes les grosses questions de la même manière.",
    // B · 446fc1b308d4
    "archetypes.arch_never_asked.startingAbilities": ["ab_pipe_rush"],
    // B · 78db5a7da8e5
    "setupFields.archetype.label": "Quand tu avais huit ans, tu as entendu ce que les gens disent de l’enfant de Roger. Qu’est-ce que t’en as fait ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · d989835d1394
    "setupFields.archetype.helpText": "La seule chose que ce moment-là a laissée en toi, qui définit ce dans quoi tu es bon. C’est fixé pour toute l’histoire. Ça ne décide pas si Luffy devient ton frère, si Sabo vit, si tu manges le fruit, ou ce que tu fais quand un amiral prononce le nom de ton père — rien de tout ça ne se décide ici.",
    // B · aa9e1f16ce6a
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que les gens se trompent sur toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · bdb5fc6e5ce2
    "setupFields.worldKnowsAboutYou.helpText": "Le fossé entre ce que cette île a décidé que tu es et ce que tu es vraiment. Une phrase simple.",
    // B · 4fb960ac1125
    "setupFields.worldKnowsAboutYou.placeholder": "par ex. Tout le monde pense que je déteste qu’on me suive. En fait, je déteste qu’on me suive quand ça peut mettre quelqu’un en danger.",
    // B · 69b03d336277
    "setupFields.what_you_want.label": "À quoi sert vraiment la boîte de conserve ?",
    // B · b6a31c665c0b
    "setupFields.what_you_want.kind": "CHOIX",
    // B · 7c513551154a
    "setupFields.what_you_want.helpText": "Une idée de départ, pas un engagement. Tu peux faire exactement le contraire dans l’heure et le monde suivra.",
    // B · 18b1c093aa4d
    "setupFields.what_you_want.options.a_ship.label": "Un bateau. Sabo a fait les calculs et c’est un vrai chiffre.",
    // B · 236d2606ed24
    "setupFields.what_you_want.options.away.label": "Quitter cette île avant qu’il ne se passe quelque chose qui rende ça impossible.",
    // B · 21acd2bdbb43
    "setupFields.what_you_want.options.proof.label": "Preuve. De quoi, tu sais pas encore",
    // B · f4e4419e42ec
    "setupFields.what_you_want.options.the_three_of_us.label": "Rien pour l’instant. Ça a arrêté d’être une histoire d’argent quand ça a arrêté d’être à une seule personne",
    // B · 22819fc4a921
    "setupFields.what_you_want.options.nobody_asks.label": "Loin, assez pour que personne ait entendu la rumeur",
    // B · b76a08a03e62
    "protagonist.kind": "NOMMÉ",
    // B · 76c74ba4c853
    "protagonist.name": "Portgas D. Ace",
    // B · fcca6b746d0b
    "protagonist.pronouns": "il/lui",
    // B · e4cf1bf06a13
    "protagonist.description": "Dix ans. Sec, tacheté de rousseur, cheveux noirs qui font rien, un tuyau en plomb qu’il traîne depuis deux ans, et un visage qui se ferme avant tout le reste.",
    // B · 646215e4924a
    "protagonist.setupHeading": "Quel genre d’Ace es-tu ?",
    // B · 53a643d4e7db
    "protagonist.portrait": "story_ace/protagonist",
    // B · 6cd083326d47
    "coverDirection": "SUJET : Portgas D. Ace, centré et clair, comme visuel clé d’un anime sur sa vie. Ace au premier plan remplit le centre bas de la taille à la tête, plus grand que tout le reste et tenant à peu près la moitié du poids visuel. Vingt ans, mince et musclé sans être lourd, cheveux noirs en bataille jusqu’à la mâchoire, taches de rousseur sur les joues et le nez, yeux foncés, pas de barbe. Il porte un large chapeau orange avec un bandeau de perles rouges et deux petits badges bleus devant, un qui sourit et un qui fait la gueule ; un collier de perles rouges ; pas de chemise ; un short noir aux genoux ; une ceinture orange avec des œillets métalliques ; une pochette bleue attachée à la cuisse gauche ; un poignard à fourreau vert à la hanche. Le tatouage ASCE est visible sur son bras gauche, avec le S barré. Un poing est enflammé d’une flamme orange vif qui fait onduler la chaleur dans l’air au-dessus. Son expression est confiante et compliquée — pas un héros en colère générique, pas un sourire. DERRIÈRE LUI, en couches et plus petits mais lisibles : un petit garçon au chapeau de paille et gilet rouge d’un côté, et un garçon blond au haut-de-forme noir avec des lunettes bleues de l’autre, clairement des enfants. Plus loin et énorme, un vieil homme imposant avec une moustache blanche en croissant vers le haut, un manteau de capitaine blanc sur un torse cicatrisé, et une énorme arme d’hast — il doit paraître plusieurs fois plus grand qu’Ace. En haut dans un coin, une flamme de phénix bleue. Au loin et sombre, une silhouette massive non définie. En bas et derrière tout ça, une architecture militaire en marbre blanc et une baie de navires de guerre, très petits. PALETTE : orange et noir dominants, avec la lumière chaude du feu sur Ace et le gris-bleu froid sur l’architecture et la mer, pour que le premier plan et l’arrière-plan appartiennent à des mondes différents. Le casting remplit le cadre. Pas de ciel vide. Ace est la seule figure nette.",
    // A · 9dfdcbc57a96
    "opening": "Il est à neuf mètres en contrebas, et il a arrêté de faire semblant de se cacher.\n\n« Je suis toujours là, » dit Luffy, derrière un arbre plus étroit que lui. « J’ai été là tout le temps. Tu savais. »\n\nOnze jours. Marcher plus vite ne marche pas, parce que lui court. Partir à quatre heures du matin ne marche pas, parce qu’il ne semble pas dormir. Hier, tu as dit un truc méchant exprès sur son chapeau, il y a réfléchi neuf secondes, puis il a demandé ce que tu prenais à midi.\n\nEn haut de la pente, Sabo est assis sur la bûche, la pipe posée sur les genoux, il ne fait rien, il s’éclate.\n\n« Ace. » Luffy sort de derrière l’arbre, boueux jusqu’aux genoux, une égratignure sur un bras à cause de quelque chose en montant. « Ace. Je tiens le rythme. Regarde-moi. Je tiens le rythme. »",
    // A · f1f18c2f4d11
    "openingSuggestions": ["« Rentre chez toi, Luffy. Cette fois je suis sérieux — si tu nous suis encore, je te ligote à un arbre et je te laisse là. » Je ne regarde pas Sabo parce qu’il rigole et que je vais lui cogner dessus.","Je lui lance la pipe de rechange en bas de la pente, assez fort pour qu’attraper ça fasse mal. « Très bien. Tu veux venir ? Tiens le rythme. » Puis je me retourne et je remonte la crête à la vitesse que j’utiliserais seul.","Je m’arrête de marcher. « Pourquoi moi ? Y a mille personnes sur cette île que tu pourrais emmerder. Pourquoi c’est moi ? » Je veux vraiment une réponse, c’est nouveau, et ça me saoule moi-même."],
  },
});
