# Site Vingt et Un

Site vitrine responsive en une seule page pour présenter le podcast et rediriger les auditeurs vers Spotify, Apple Podcasts, Deezer et YouTube.

## Modifier les liens

Ouvrez `index.html` avec un éditeur de texte et remplacez les adresses suivantes :

- `https://open.spotify.com/`
- `https://podcasts.apple.com/`
- `https://www.deezer.com/`
- `https://www.youtube.com/`
- les liens Instagram et TikTok
- `contact@vingtetun-media.fr`

## Modifier les épisodes

Dans `index.html`, cherchez `episode-card`. Chaque bloc correspond à un épisode. Vous pouvez modifier :
- le métier de l’invité ;
- la question affichée ;
- le titre ;
- le descriptif ;
- le lien d’écoute.

## Mettre le site en ligne gratuitement

Option simple :
1. créez un compte sur Netlify ;
2. glissez-déposez le dossier complet sur la page de déploiement ;
3. Netlify fournit immédiatement un lien public ;
4. vous pourrez ensuite connecter un nom de domaine personnalisé.

Autres solutions : GitHub Pages, Vercel ou Framer.

## Ajouter de vraies photos

Dans `styles.css`, les visuels d’épisodes sont actuellement des dégradés.
Vous pourrez les remplacer par vos images en utilisant :

```css
.episode-one::before {
  background: url("images/jerome.jpg") center / cover no-repeat;
}
```

Créez alors un dossier `images` à côté de `index.html`.
