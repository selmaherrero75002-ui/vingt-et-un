# Site Vingt et Un — version premium et RSS

## Fichiers à remplacer
- `index.html`
- `styles.css`
- `script.js`

## Fichier à ajouter
- dossier `api`
- fichier `api/rss.js`

## Images à conserver dans le même dossier
- `logo.png`
- `logo-footer.png`
- `maxime-lagarde.jpg`
- `camille-lorillon.jpg`
- `jerome-delafosse.jpg`
- `a-propos.jpg`

## Activer l’automatisation RSS sur Vercel
1. Ouvre Spotify for Creators et copie l’adresse du flux RSS du podcast.
2. Dans Vercel : **Settings → Environment Variables**.
3. Crée la variable `RSS_FEED_URL` et colle ton flux comme valeur.
4. Redéploie le site.

En local avec Live Server, les trois épisodes déjà enregistrés restent affichés. Une fois publié sur Vercel et la variable ajoutée, les épisodes du flux remplacent automatiquement ces cartes.
