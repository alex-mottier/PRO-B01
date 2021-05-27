# Installation environnent Back-End :desktop_computer:

Voici la procédure de mise en place de l'environnement Back-End. La base de données est hébergée sur Atlas. Le reste du back-end est hébergé sur Heroku et est mis à jour à chaque push de la branche "dev" ou de la branche "master".

## A installer sur le PC local 💻

**IDE au choix :**

Doit être compatible avec Java 1.8 au minimum.

**maven : **

Version 3.8.1

## Exécuter le projet en développement 🚀

**Ouvrir projet serveur :** (dossier "Server") du repository.

Ouvrir le fichier depuis la racine. Mettre à jour (Reload) les dépendances maven. L'exécution se fait depuis la classe "SpringLoader".

## Exécuter les tests unitaires ✔️

Les tests unitaires peuvent être exécutés depuis l'IDE, depuis le dossier "test>java>ch.amphytrion.project".

## Accès à la base de données :file_cabinet:

Deux bases de données sont accessibles, une base de données de développement et une base de données de production.

Version de développement : 

mongodb+srv://<username>:<password>@amphitryondb.t9yho.mongodb.net/amphitryonDB

Version de production :

mongodb+srv://<username>:<password>@amphitryondb.xtfst.mongodb.net/amphitryonproddb

## Swagger :memo:

Swagger se lance à l'exécution du projet et est accessible à l'adresse http://localhost:8080/swagger-ui.html#/Amphytrion%20API

Mais Il est possible d'accéder au Swagger des branches dev et master hébergées sur Heroku.

Le swagger de la branche dev, utilisé pour le développement, est accessible à l'adresse suivante : https://amphitryon.herokuapp.com/swagger-ui.html#/

Le swagger de la branche master, utilisé pour la version en production, est accessible à l'adresse suivante : https://amphitryon.herokuapp.com/swagger-ui.html#/

## Heroku :earth_americas:

Nous utilisons Heroku comme plateforme d'hébergement du back-end de notre application. Nous utilisons deux instances :

- Une instance hébergeant la branche dev du projet : https://amphitryon.herokuapp.com
- Une instance hébergeant la branche master du projet : https://amphitryon-prod.herokuapp.com

Ces deux instances sont automatiquement mises à jour lorsque leur branche relative est mise à jour.

Pour plus d'informations sur les accès à ces différents services (configuration détaillée, identification,...) , nous vous prions de vous référer à la documentation fournie dans le rapport du projet.