<img src="https://i.goopics.net/03v8if.png" alt="logo savime" style="width:200px;"/>
      
![Savime Version](https://img.shields.io/badge/version-v0.0.1-white)

# [Savime](https://www.savime.tech/)
### «The time-saver for teams & companies.»
Application orienté RH, Savime `seɪv.ɪm` sert à créer une communication rapide, simple & sécurisée entre des employé·es et le département RH d'une entreprise.
Que se soit le partage de documents, la gestion des congés ou l’accès aux informations importantes lié à l’entreprise & la carrière des employé·es.
Cette application se veux clef en main.

## Tech Stack 🛠️

<u>**Frontend:**</u> React, Typescript, Sass, Recoil

**Backend:** Node, Express, Sequelize


## Fonctionnalités ⚙️

- Tableau de bord Employé·es.
- Tableau de bord Managers.
- Tableau de bord Admin.
- Partage de Documents.
- Actualités internes.
- Contact via mails.
- Calendrier.

## Installation en local 🏗️

- Installez Node.js et npm (Node Package Manager) sur votre machine en suivant les instructions sur https://nodejs.org/.

- Ouvrez votre terminal et naviguez jusqu'au répertoire où vous souhaitez installer votre projet React.

- Clonez le projet à partir de GitHub en utilisant la commande git clone `<url du repository>` ou en téléchargant le zip.

- Une fois le clonage, ou la décompression du zip, terminé, accédez au répertoire du projet en utilisant la commande cd `<nom du projet>`.

- Installez les dépendances du projet en utilisant la commande npm install.
💡 Il est possible que vous rencontriez des problèmes lors de l'installation de l'application en raison d'un conflit de dépendances entre le paquet "craco-sass-resources-loader" et la version actuelle de react-scripts. Pour résoudre ce problème, vous pouvez utiliser l'option "--legacy-peer-deps" lors de l'exécution de la commande "npm install", soit `npm install --legacy-peer-deps`. Cette option permet d'accepter une résolution de dépendance, ce qui peut être nécessaire si le paquet "craco-sass-resources-loader" n'a pas été mis à jour et n'est pas compatible avec la version actuelle de certains autres paquets. Cependant, cela ne pose actuellement aucun problème de compatibilité ou de stabilité pour l'application.

- Démarrez le serveur de développement en utilisant la commande npm start.

- Ouvrez votre navigateur web et accédez à http://localhost:3000 pour voir votre application React en cours d'exécution.

## Scripts disponibles ⚡

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Exécute l'application en mode développement.
Ouvrez [http://localhost:3000](http://localhost:3000) pour la visualiser dans le navigateur.

La page se rechargera si vous effectuez des modifications.
Vous verrez également toutes les erreurs de lint dans la console.

### `npm run maintenance`

Exécute l'application avec une variable d'environnement de maintenance pour bloquer le site à une page de maintenance.

### `npm run build`

Build l'application pour la production dans le dossier `build`.\
Il regroupe correctement React en mode production et optimise la compilation pour obtenir les meilleures performances.
La compilation est réduite et les noms de fichiers incluent les hachages.\
L'application est prête à être déployée !

## Variables d'environnement 🔐

Pour exécuter ce projet, vous devrez ajouter les variables d'environnement suivantes à votre fichier .env

```sh
REACT_APP_COMPANY_NAME=XXXXXXXXXXXXX
REACT_APP_BACKEND_URL=XXXXXXXXXXXXXX
REACT_APP_FRONTEND_URL=XXXXXXXXXXX
REACT_APP_MAINTENANCE=XXXXX
```

## Routes principales 🛣️

Les routes principales sont les suivantes :

- `/` : Page d'accueil
- `/concept` : Landing Page
- `/inscription` : Page de creation de compte Employé·es
- `/connexion` : Page de connexion Employé·es & Manager
- `/tableau-de-bord` : Tableau de bord Employé·es & Manager
- `/admin` : Page de connexion Administrateur
- `/admin/panneau-administrateur` : Tableau de bord Administrateur

## Packages 📚

- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-calendar](https://www.npmjs.com/package/react-calendar)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [typescript](https://www.npmjs.com/package/typescript)
- [craco-sass-resources-loader](https://www.npmjs.com/package/craco-sass-resources-loader)
- [recoil](https://www.npmjs.com/package/recoil)
- [recoil-persist](https://www.npmjs.com/package/recoil-persist)
- [sass](https://www.npmjs.com/package/sass)
- [uuid](https://www.npmjs.com/package/uuid)
- [@craco/craco](https://www.npmjs.com/package/@craco/craco)
- [@types/react](https://www.npmjs.com/package/@types/react)
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)
- [@types/node](https://www.npmjs.com/package/@types/node)

## Credits 💬

Images
- [Unsplash](https://unsplash.com/)

Interface
- [Référence graphique](https://www.behance.net/gallery/102784977/Web-Application-Interface-PR-Club/modules/591476137)

Icons
- [Radix-UI](https://icons.radix-ui.com/)
