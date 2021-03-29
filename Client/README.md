

# Installation environnent Front-End :iphone:

Voici la procédure de mise en place de l'environnement Front-End. La partie concernant l'installation locale n'est à effectuer qu'une seule fois. La partie concernant l'exécution du projet en développement doit être effectuée à chaque fois pour obtenir l'application sur le périphérique émulé.

## A installer sur le PC local :computer:

> :whale:  Lorsque l'environnement Docker sera en place, cette étape ne sera plus nécessaire.

**Node JS :**

Télécharger la dernière version de [Node JS LTS](https://nodejs.org/en/download/) : version utilisée pour le projet `v14.16.0`

La version téléchargée inclut le packager npm (Node package manager) `v6.14.5`

Vérifier que Node JS est installé en tapant dans un bash : `node --version`

Vérifier la version de npm en tapant dans un bash : `npm --version`

**Expo :**

> Node JS doit avoir été installé en local sur l'ordinateur auparavant.

Installer Expo de manière générale : `npm install -g expo-cli`

La version installée est : `v4.3.0`

Vérifier la version de Expo en tapant dans un bash : `expo --version`

## Création de l'émulateur :iphone:

**Android studio (pour émulation téléphone Android) :**

Télécharger la dernières version de [Android Studio](https://developer.android.com/).

Démarrer Android Studio. Sur la page d'accueil du logiciel, ouvrir le menu `Configure` (en bas à droite). Ouvrir ensuite `AVD Manager`.

Installer un périphérique virtuel (le choix du périphérique n'est pas imposé).

Démarrer l'émulateur virtuel précédemment créé.

## Exécuter le projet en développement :rocket:

> Pour cette étape, l'émulateur doit déjà être démarré. Voir section précédente.

**Ouvrir projet client :** (dossier "Client") du repository.

Installer dépendances : `npm install` 

Une fois l'ensemble des dépendances installées, démarrer l'émulation avec Expo : `npm start`

Cela va ouvrir un nouvel onglet dans le navigateur internet. Depuis celui-ci, il est alors possible de choisir `Run on Android device/emulator`

#### Exécuter application sur un téléphone portable

Il est possible de tester l'application en cours de développement sur un smartphone.

Il faut avoir télécharger l'application nommée "Expo" depuis le store du téléphone.

Lancer l'application Expo et scanner le code QR affiché sur l'onglet du navigateur internet après avoir démarré expo avec `npm start`

## Exécuter les tests unitaires :heavy_check_mark:

**Ouvrir projet client :** (dossier "Client") du repository.

Lancer les tests unitaires : `npm test`

Cela va tester : les tests Jest et la syntaxe TypeScript

## Construire les packages de l'application :factory:

Pour lancer la création de l'application native pour Android : `expo build:android`

Pour lancer la création de l'application native pour IOS : `expo build:ios`

