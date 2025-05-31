# Site de Mariage Élégant avec Formulaire RSVP

Ce site web statique élégant pour mariage comprend un formulaire RSVP qui se connecte à Google Sheets pour collecter les réponses des invités.

## Fonctionnalités

- Design responsive et élégant
- Navigation fluide
- Sections pour l'histoire du couple et les détails de l'événement
- Formulaire RSVP connecté à Google Sheets
- Gestion des repas végétariens
- Animations au défilement
- Interface utilisateur moderne et intuitive

## Configuration du Formulaire RSVP avec Google Sheets

1. Créez une nouvelle feuille Google Sheets
2. Dans Google Sheets, allez dans "Extensions" > "Apps Script"
3. Copiez le code suivant dans l'éditeur de script :

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.nom,
    data.email,
    data.presence,
    data.nombreInvites,
    data.nombreVegetariens,
    data.message
  ]);
  
  return ContentService.createTextOutput("Success");
}
```

4. Déployez le script :
   - Cliquez sur "Déployer" > "Nouveau déploiement"
   - Choisissez "Application Web"
   - Définissez "Exécuter en tant que" sur "Moi"
   - Définissez "Qui a accès" sur "Tout le monde"
   - Cliquez sur "Déployer"
   - Copiez l'URL du déploiement

5. Dans le fichier `script.js`, remplacez `VOTRE_URL_GOOGLE_SCRIPT_ICI` par l'URL du déploiement copiée.

## Personnalisation

1. Modifiez le contenu dans `index.html` pour l'adapter à votre événement
2. Ajustez les couleurs dans `styles.css` en modifiant les variables CSS dans `:root`
3. Remplacez l'image d'arrière-plan dans `.hero` (styles.css) par votre propre image
4. Personnalisez les sections selon vos besoins

## Installation Locale

1. Clonez ce dépôt
2. Ouvrez `index.html` dans votre navigateur pour un test local
3. Pour le déploiement, uploadez tous les fichiers sur votre hébergeur web

## Déploiement

Vous pouvez déployer ce site sur n'importe quel hébergeur statique comme :
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Structure des Fichiers

```
├── index.html          # Structure principale du site
├── styles.css          # Styles et mise en page
├── script.js           # Logique JavaScript et gestion du formulaire
└── README.md          # Documentation
```

## Personnalisation des Images

Pour de meilleures performances, il est recommandé de :
1. Optimiser les images avant de les utiliser
2. Héberger les images localement dans un dossier `images/`
3. Utiliser des formats modernes comme WebP avec des fallbacks 