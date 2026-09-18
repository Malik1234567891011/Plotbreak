/**
 * Le français de Create — l'onglet où l'on fabrique un monde.
 *
 * Écrit, pas traduit. Deux registres, comme en anglais : la **chrome** (onglet,
 * boutons, étapes) parle comme l'app, à l'infinitif ou au nom là où c'est une
 * étiquette ; l'**aide de champ** s'adresse à la personne qui écrit, et dit
 * `tu`, parce que c'est un atelier d'écriture et pas un formulaire administratif.
 *
 * Deux pièges de vocabulaire, réglés une fois ici :
 *
 * - `Draft` est **brouillon**, jamais `ébauche` (esquisse de dessin) ni
 *   `projet` (une intention, pas un texte inachevé).
 * - `Publish` est **publier** ; `Update` sur une histoire déjà publiée est
 *   **mettre à jour**, pas `actualiser` (rafraîchir un écran).
 * - `Rarity` garde le vocabulaire du jeu : `Commun / Peu commun / Rare /
 *   Unique`. On ne traduit pas une rareté par une qualité.
 */
export const create = {
  'nav.create': 'Créer',

  /* --- Le tableau de bord ------------------------------------------------ */

  'create.title_count': '{count} histoires',
  'create.filter_all': 'Tout',
  'create.filter_drafts': 'Brouillons',
  'create.filter_published': 'Publiées',
  'create.filter_empty': 'Rien ici pour l’instant.',
  'create.new_story': 'Nouvelle histoire',
  'create.untitled': 'Histoire sans titre',
  'create.unnamed': 'Sans nom',
  'create.status_draft': 'Brouillon',
  'create.ready_to_publish': 'Prête à publier',
  'create.keep_going': 'En cours d’écriture',
  'create.metric_plays': 'parties',
  'create.metric_likes': 'j’aime',
  'create.metric_comments': 'commentaires',
  'create.edit': 'Modifier',
  'create.open_story': 'Ouvrir l’histoire',
  'create.delete': 'Supprimer',
  'create.delete_title': 'Supprimer cette histoire ?',
  'create.delete_body': 'C’est définitif.',
  'create.delete_confirm': 'Supprimer',
  'create.empty_title': 'Fabrique un monde',
  'create.empty_body':
    'Décris une histoire en quelques phrases et elle sera construite pour toi : les gens, les lieux, ce qui va déjà mal, et les façons dont ça peut finir. Ensuite tu changes ce que tu veux.',
  'create.not_found': 'Cette histoire n’est pas ici',
  'create.not_found_body': 'Elle a peut-être été supprimée depuis un autre appareil.',

  /* --- Le pitch ---------------------------------------------------------- */

  'create.pitch_heading': 'C’est quoi, ton histoire ?',
  'create.pitch_body':
    'Quelques phrases suffisent. Dis qui il y a dedans, où ça se passe, et ce qui va déjà mal.',
  'create.pitch_placeholder':
    'Deux sœurs tiennent un phare sur un rocher au large. Le bateau de ravitaillement a des semaines de retard, l’hiver ne finit pas, et il manque onze minutes dans le registre, de la main de l’aînée.',
  'create.pitch_tone': 'Ton',
  'create.pitch_length': 'Longueur',
  'create.pitch_pov': 'Tu joues qui ?',
  'create.build_story': 'Construire mon histoire',
  'create.start_empty': 'Ou partir d’une histoire vide',

  'create.tone_warm': 'Chaleureux',
  'create.tone_grim': 'Sombre',
  'create.tone_funny': 'Drôle',
  'create.tone_tense': 'Tendu',
  'create.tone_dreamlike': 'Onirique',
  'create.tone_epic': 'Épique',

  'create.length_short': 'Courte',
  'create.length_medium': 'Complète',
  'create.length_long': 'Longue',

  'create.pov_named': 'Quelqu’un que l’histoire connaît déjà',
  'create.pov_named_body': 'Un personnage nommé, avec un passé dont le monde se souvient.',
  'create.pov_blank': 'Toi-même',
  'create.pov_blank_body': 'Les joueurs inventent qui ils sont avant de commencer.',

  'create.compiling_title': 'Construction de ton monde',
  'create.compiling_reading': 'Lecture de ton pitch…',
  'create.compiling_world': 'Écriture du monde, des lieux et de l’ouverture…',
  'create.compiling_cast': 'Distribution des rôles, et mise en route…',
  'create.compiling_finishing': 'Presque fini…',
  'create.compiling_wait':
    'Ça prend une ou deux minutes. Tu peux quitter l’app, ce sera là à ton retour.',
  'create.refused_title': 'Pas celle-là',

  /* --- L’éditeur --------------------------------------------------------- */

  'create.step_profile': 'Profil',
  'create.step_world': 'Monde',
  'create.step_cast': 'Personnages',
  'create.step_places': 'Lieux',
  'create.step_opening': 'Ouverture',
  'create.step_pressure': 'Pression',
  'create.step_endings': 'Fins',
  'create.step_publish': 'Publier',

  'create.previous': 'Précédent',
  'create.next': 'Suivant',
  'create.publish': 'Publier',
  'create.update': 'Mettre à jour',
  'create.saving': 'Enregistrement…',
  'create.saved': 'Enregistré',
  'create.auto_generate': 'Générer',
  'create.writing': 'Écriture…',
  'create.needs_work': 'Avant de pouvoir publier',
  'create.collapse': 'Replier',
  'create.expand': 'Déplier',
  'create.one_per_line': 'Un par ligne',

  /* --- Les champs -------------------------------------------------------- */

  'create.f_title': 'Titre',
  'create.f_title_help': 'Deux à cinq mots. Pas une phrase.',
  'create.f_title_ph': 'Le plus long des hivers',
  'create.f_fantasy': 'La promesse',
  'create.f_fantasy_help':
    'Ce que le joueur a le droit d’être, en une ligne. C’est la ligne qui s’affiche sur la carte.',
  'create.f_fantasy_ph': 'Garder la lampe, ou garder ta sœur',
  'create.f_hook': 'L’accroche',
  'create.f_hook_help': 'Une phrase qui donne envie d’appuyer. Concrète, pas atmosphérique.',
  'create.f_hook_ph': 'Deux gardiennes, une lampe, et un hiver qui ne finit pas.',
  'create.f_cover': 'Illustration',
  'create.f_cover_help': 'Sujet, cadrage, palette, ambiance. Une phrase. On la dessine.',
  'create.f_cover_ph':
    'La salle de la lampe, la nuit, une silhouette à contre-jour, bleu froid et or de lampe.',

  'create.f_premise': 'Prémisse',
  'create.f_premise_help':
    '120 à 240 mots. Le monde, la situation, et ce qui est déjà sous pression. Jamais ce que le joueur va faire.',
  'create.f_premise_ph': 'Où ça se passe, qui il y a dedans, et ce qui va déjà mal.',
  'create.f_tone': 'Ton',
  'create.f_tone_help':
    'Comment ça sonne sur la page : rythme, distance, vocabulaire, et ce que la prose refuse de faire.',
  'create.f_tone_ph': 'Calme, froid, serré. Rien n’explose ; tout s’érode.',
  'create.f_canon': 'Vrai quand l’histoire commence',
  'create.f_canon_help':
    'Des faits que le narrateur ne pourra jamais contredire. Concrets et vérifiables. Pas la suite.',
  'create.f_canon_ph': 'La lampe ne s’est pas éteinte depuis quatre-vingt-dix ans.',
  'create.f_intensity': 'Intensité',
  'create.f_intensity_help': 'À quel point ce monde frappe fort.',
  'create.intensity_light': 'Douce',
  'create.intensity_moderate': 'Modérée',
  'create.intensity_intense': 'Intense',

  'create.cast_intro':
    'Les gens. Tout ce qui est sous « vie intérieure » fait la différence entre une personne et une réplique : le narrateur joue tout ça, et le joueur ne voit que ce qu’une scène révèle.',
  'create.add_character': 'Ajouter un personnage',
  'create.f_name': 'Nom',
  'create.f_role': 'Rôle',
  'create.f_role_help': 'Sa place dans l’histoire, vue du côté du joueur.',
  'create.f_role_ph': 'Ta grande sœur, l’autre gardienne',
  'create.f_called': 'On l’appelle',
  'create.f_called_help': 'Comment on l’appelle, si ce n’est pas son nom.',
  'create.f_pronouns': 'Pronoms',
  'create.f_blurb': 'Ligne de fiche',
  'create.f_blurb_help': 'Une ligne, comme le monde la présenterait.',
  'create.f_appearance': 'Allure',
  'create.f_speech': 'Parle',
  'create.f_speech_help': 'Longueur, registre, et ce qu’elle ne dit jamais.',
  'create.f_social': 'Se comporte',
  'create.f_social_help': 'Comment elle est avec les autres.',
  'create.f_inner_life': 'Vie intérieure',
  'create.f_inner_life_help': 'Rien de tout ça n’est montré au joueur. Tout est joué.',
  'create.f_wants': 'Veut',
  'create.f_holds': 'Tient à',
  'create.f_afraid': 'A peur de',
  'create.f_will_not': 'Ne fera pas',
  'create.f_will_not_help': 'Quelle que soit la pression.',
  'create.f_underneath': 'En dessous',
  'create.f_underneath_help': 'Ce qu’elle veut et ne dirait pas à voix haute.',
  'create.f_secrets': 'Garde pour elle',
  'create.f_secrets_help': 'Ce qu’elle sait et ne dit pas. Chaque ligne est un fait, pas un indice.',
  'create.f_voice': 'Ça sonne comme',
  'create.f_voice_help': 'Des répliques qu’elle dirait vraiment.',
  'create.f_traits': 'Traits',

  'create.places_intro': 'Où ça se passe. Trois ou quatre suffisent pour commencer.',
  'create.add_place': 'Ajouter un lieu',
  'create.opens_here': 'L’histoire commence ici',
  'create.set_opening_place': 'Commencer l’histoire ici',
  'create.f_place_name': 'Nom',
  'create.f_place_desc': 'À quoi ça ressemble',
  'create.f_place_desc_help': 'Et ce qu’il y a dedans autour de quoi une scène peut se jouer.',

  'create.f_pov': 'Le joueur joue qui ?',
  'create.f_pov_help': 'C’est ce qui décide de la question posée à la création de personnage.',
  'create.f_hero_name': 'Son nom',
  'create.f_hero_pronouns': 'Ses pronoms',
  'create.f_hero_desc': 'Qui c’est',
  'create.f_setup_heading': 'La question de départ',
  'create.f_setup_heading_help': 'Ce que le monde demande au lieu de « Qui es-tu ? »',
  'create.f_setup_heading_ph': 'Quelle gardienne es-tu ?',
  'create.f_opening': 'L’ouverture',
  'create.f_opening_help':
    '60 à 150 mots, à la deuxième personne. Ça finit sur un moment auquel il faut répondre. Ne pose pas de question : mets le joueur dans une situation.',
  'create.f_opening_ph': 'La première chose que le joueur lit.',
  'create.f_suggestions': 'Premières choses à essayer',
  'create.f_suggestions_help': 'Jusqu’à trois, dans la voix du joueur. Jamais « explorer ».',
  'create.f_origins': 'Origines',
  'create.f_origins_help':
    'Des passés différents dont un joueur peut partir. Chacun change qui il était déjà. Facultatif.',
  'create.origins_empty': 'Aucune pour l’instant. Générer en écrit deux ou trois.',
  'create.f_play_guide': 'Un mot au joueur',
  'create.f_play_guide_help': 'Montré une fois, avant de commencer. Jamais envoyé au narrateur.',
  'create.f_style': 'Comment ça sonne',
  'create.f_style_help':
    'Jusqu’à trois courts extraits dans la voix de ton histoire. Pas des scènes : des échantillons. C’est le contrôle le plus fort que tu aies sur l’écriture.',

  'create.pressure_intro':
    'Ce qui pousse, que le joueur regarde ou non. Tout est facultatif, et tout rend l’histoire meilleure.',
  'create.pressure_empty': 'Rien pour l’instant. Générer en écrit un jeu complet.',
  'create.f_factions': 'Forces',
  'create.f_factions_help': 'Des groupes avec leurs propres objectifs.',
  'create.f_threads': 'Fils',
  'create.f_threads_help':
    'Des questions vivantes vers lesquelles une scène peut être tirée. Jamais une liste de tâches.',
  'create.f_events': 'Ce que ce monde sait faire',
  'create.f_events_help': 'Des possibilités, jamais un calendrier.',
  'create.f_objects': 'Objets dont dépend l’histoire',
  'create.f_objects_help': 'Seulement ceux sans lesquels la prémisse ne tient pas.',

  'create.endings_intro':
    'Où ça peut finir. La rareté dit à quel point une fin est loin du chemin courant, pas si elle est bonne — et ce sont les rares qui donnent envie de rejouer ton histoire.',
  'create.add_ending': 'Ajouter une fin',
  'create.ending_from_turn': 'À partir du tour {turn}',
  'create.f_ending_name': 'Nom',
  'create.f_rarity': 'Rareté',
  'create.f_rarity_help': 'À quel point c’est loin du chemin courant.',
  'create.rarity_common': 'Commune',
  'create.rarity_uncommon': 'Peu commune',
  'create.rarity_rare': 'Rare',
  'create.rarity_unique': 'Unique',
  'create.f_min_turn': 'Tour le plus tôt',
  'create.f_min_turn_help':
    'Une histoire qui peut finir au tour trois n’a pas encore été une histoire.',
  'create.f_condition': 'Quand c’est la bonne fin',
  'create.f_condition_help': 'Dis-le comme une personne le dirait. Personne n’analyse ce texte : il est lu.',
  'create.f_epilogue': 'Épilogue',
  'create.f_epilogue_help': 'À quoi ressemble le monde après.',
  'create.f_hint': 'Indice',
  'create.f_hint_help': 'Une ligne, montrée à un joueur qui s’en approche.',

  'create.f_description': 'Description',
  'create.f_description_help':
    'Ce que c’est, pour quelqu’un qui hésite à la lancer. Ne divulgue aucune fin.',
  'create.f_tags': 'Étiquettes',
  'create.f_tags_help': 'Trois à six. En minuscules.',
  'create.f_chips': 'Ce qu’on peut faire ici',
  'create.f_chips_help': 'Deux à quatre, trois mots maximum chacune.',
  'create.f_tier': 'Prévue pour être jouée en',
  'create.f_tier_help': 'Une recommandation. Les joueurs choisissent et paient la leur.',
  'create.f_visibility': 'Qui peut y jouer',
  'create.f_visibility_help': 'Tu peux changer ça quand tu veux.',
  'create.visibility_private': 'Moi seulement',
  'create.visibility_private_body': 'Personne d’autre ne peut la trouver ni l’ouvrir.',
  'create.visibility_unlisted': 'Toute personne ayant le lien',
  'create.visibility_unlisted_body': 'Absente de Découvrir, mais partageable.',
  'create.visibility_public': 'Tout le monde',
  'create.visibility_public_body': 'Elle peut apparaître dans Découvrir.',

  /* --- Publication ------------------------------------------------------- */

  'create.publish_title': 'Publier cette histoire',
  'create.update_title': 'Publier une mise à jour',
  'create.publish_body':
    'Les parties déjà en cours restent sur la version commencée. Les nouvelles prennent celle-ci.',
  'create.publish_blocked': 'Il manque encore quelques choses :',
  'create.published_title': 'Publiée',
  'create.published_body':
    'Ton histoire est en ligne. Tu peux continuer à la modifier et republier quand tu veux.',
  'create.keep_editing': 'Continuer à modifier',

  /* --- Quand un appel échoue ----------------------------------------------
   *
   * Le serveur envoie un code stable et une phrase ; la phrase est en anglais,
   * comme toutes les chaînes serveur de ce produit. Voici les mots que le
   * client affiche à la place, pour qu’une créatrice francophone ne lise pas
   * des excuses en anglais.
   */

  'create.err_pitch_too_short': 'Raconte-m’en un peu plus d’abord.',
  'create.err_not_ready': 'Il manque encore deux ou trois choses. Elles sont signalées ci-dessous.',
  'create.err_insufficient_credits': 'Pas assez de crédits pour ça.',
  'create.err_draft_not_found': 'Cette histoire n’est plus ici.',
  'create.err_too_many_drafts':
    'Tu as beaucoup d’histoires en cours. Termines-en une ou supprimes-en une d’abord.',
  'create.err_published_story':
    'Cette histoire est publiée. Passe-la en privé, puis supprime-la.',
  'create.err_not_published': 'Publie cette histoire avant de la partager.',
  'create.err_no_model':
    'La construction d’histoires est indisponible pour le moment. Réessaie dans un instant.',
  'create.err_compile_failed': 'Quelque chose dans cette histoire n’est pas passé. On regarde.',
  'create.err_not_there': 'Il n’y a rien à écrire là.',
  'create.err_invalid_patch': 'Cette modification n’a pas été enregistrée. Réessaie.',

  /* --- Pourquoi une histoire n’est pas prête ----------------------------- */

  'create.issue_title_too_short': 'Donne-lui un titre.',
  'create.issue_fantasy_label_missing': 'Écris la promesse en une ligne.',
  'create.issue_hook_missing': 'Écris l’accroche.',
  'create.issue_premise_too_short': 'La prémisse doit faire au moins 60 mots.',
  'create.issue_tone_missing': 'Décris comment ça sonne.',
  'create.issue_need_two_characters': 'Une histoire a besoin d’au moins deux personnes dedans.',
  'create.issue_character_name_missing_n': 'Le personnage {n} n’a pas de nom.',
  'create.issue_character_role_missing_n': 'Le personnage {n} n’a pas de rôle.',
  'create.issue_character_blurb_missing_n': 'Le personnage {n} n’a pas de ligne de fiche.',
  'create.issue_need_one_place': 'Ajoute un endroit où ça se passe.',
  'create.issue_place_name_missing_n': 'Le lieu {n} n’a pas de nom.',
  'create.issue_place_description_missing_n': 'Le lieu {n} n’a pas de description.',
  'create.issue_starting_place_unset': 'Choisis où l’histoire commence.',
  'create.issue_opening_too_short': 'L’ouverture doit faire au moins 30 mots.',
  'create.issue_opening_too_long': 'L’ouverture est trop longue — reste sous 400 mots.',
  'create.issue_protagonist_name_missing': 'Nomme le personnage que joue le joueur.',
  'create.issue_protagonist_description_missing': 'Dis qui est le personnage du joueur.',
  'create.issue_origin_name_missing_n': 'L’origine {n} n’a pas de nom.',
  'create.issue_origin_summary_missing_n': 'L’origine {n} n’a pas de résumé.',
  'create.issue_origin_needs_two_tags_n': 'L’origine {n} a besoin d’au moins deux étiquettes.',
  'create.issue_need_one_ending': 'Une histoire a besoin d’un endroit où finir.',
  'create.issue_ending_name_missing_n': 'La fin {n} n’a pas de nom.',
  'create.issue_ending_condition_missing_n': 'La fin {n} ne dit pas quand elle arrive.',
  'create.issue_description_missing': 'Écris la description.',
  'create.issue_need_one_tag': 'Ajoute au moins une étiquette.',
} as const;
