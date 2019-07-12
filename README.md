Template Cypress - Implémentation de tests automatisés en CI
==
Description
-
<p>Ce repo est un template qui permet de mettre en place facilement des tests automatisés de bout en bout résilients. Il est complètement adaptable à tout projet et est orchestré par Jenkins.</p>

![Schéma de tests](diagram.png?raw=true "Title")

Pré-requis système (local)
-

* **Windows 7+** 
*(Windows 10 est recommandé pour debugger via Docker en local)*
* **Node.js LTS** 
* **Docker** 

Installation de node
-
Le lancement de ce projet necessite l'installation de Node.js.
* Allez sur l’url https://nodejs.org/fr/ 
* Télécharger la version correspondant à votre système d”exploitation. Il est préférable de télécharger la version **LTS**
* Pour un poste de travail windows : double cliquer sur le fichier **.msi** et suivre les indications
* Verifier que Node.js est bien installé dans un terminal : **node -v**
* Vérifier que npm est bien installé dans un terminal : **npm -v**

Paramétrage du proxy 
-

**MacOS ou Linux**

    export HTTP_PROXY=YOUR_PROXY_URL

**Windows**

    set HTTP_PROXY=YOUR_PROXY_URL
 
**Powershell**

    $env:HTTP_PROXY = "YOUR_PROXY_URL"

**Ajouter le proxy globalement pour toute les sessions sur windows avec powershell**

    setx HTTPS_PROXY YOUR_PROXY_URL
    setx HTTP_PROXY YOUR_PROXY_URL

Il faut ensuite ajouter ces variables comme variables d'environnement système.

Installation de Cypress
-
Cypress est très facile à installer et surtout il crée un environnement totalement isolé que l'on peut intégrer facilement dans un projet.

Pour installer, il faut cloner ce repo puis lancer la commande suivante qui installe Cypress et toutes ses dépendances :
    
    npm i

Structure du repository Cypress
-

**cypress.json**

Ce ficher est un fichier de configuration pour le projet en cours.

Ce qu'il faut retenir ici :
* Le reporter utilisé est mochawesome. Un reporter est en fait un outil qui va générer des rapports de tests dans un format particulier, ici au format .json dans le répertoire cypress/results
* Les fichiers ayant pour extension .js sont ignorés. En effet, on se base sur Cucumber en utilisant les feature files.
* Des variables d'environnement sont créées et définissent les URL des IHM.

**package.json**

Ce fichier permet de spécifier les modules et les dépendances utilisés par le projet afin qu'il s’exécute correctement.
Il permet aussi de définir des scripts qui seront joués facilement via npm run, notamment en intégration continue dans un docker.

**Jenkinsfile**

Le Jenkinsfile permet ici de :

* Récupérer le repository git
* Arrêter le conteneur testcy s'il est allumé (par sécurité) et le supprimer
* Construire l'image docker nommée mycypress en version 1 à partir du Dockerfile (voir ci-dessous)
* Créer un conteneur testcy en se basant sur l'image Docker précédemment créée et lancer les tests
* Pousser le résultat vers Test Management for Jira

**Dockerfile**

Le Dockerfile permet de créer une image docker quand la commande docker build est éxécutée.

Ici, elle se base sur une image cypress déjà fournie par Cypress.io. Ensuite, les fichiers package.json, package-lock.json, cypress.json, run-test.sh et l'intégralité du dossier cypress du projet en cours seront copiés dans l'image docker.

La dernière commande ENTRYPOINT ["sh", "/run-test.sh"] permet de lancer le script sh run-test.sh qui permettra d'éxécuter les tests cypress dans le conteneur.

**run-test.sh**

Ce script sh se base sur les scripts définis dans fichier package.json. 

Lancé dans un conteneur docker, il permet de :
* Exécuter les tests cypress
* Merger tous les fichiers .json générés par Cypress vers un seul fichier result.json
* Formatter le fichier result.json en un format lisible par TM4J : tm4j_result.json

**cypress/fixtures**

Ce dossier contient les jeux de données.

**cypress/integration**

Le dossier intégration contient 3 dossiers :
* Un dossier draft qui spécifie les tests en cours de réalisation
* Un dossier pages qui spécifie les pages et la localisation des éléments (utilisation du page objects pattern)
* Un dossier tests dans lequel on retrouve tous les tests IHM réalisés. C'est ici que seront définis nos tests

**cypress/plugins**

Ce dossier contient les scripts annexes.

**cypress/results**

Ce dossier contient les rapports de tests générés par Cypress.

**cypress/screenshots**

Ce dossier contient les screenshots réalisés par Cypress lorsque sont déroulés les tests.

**cypress/videos**

Ce dossier contient quant à lui les vidéos réalisées par Cypress lorsque sont déroulés les tests.

Lancement des tests en ligne de commande (Intégration continue)
-

Pour lancer les tests en local :

    npx cypress run --spec 'cypress/integration/tests/panel-weball/**.feature'

Pour merger les rapports de tests au format mochawesome_XXX.json en local vers un seul fichier results.json :

    npx mochawesome-merge --reportDir cypress/results > cypress/results/results.json

Pour créer un json au format accepté par TM4J à partir du fichier mergé results.json :

    node cypress/plugins/data/transformJsonToTmjFormat.js

Debuggage via l'interface GUI de Cypress
-
**Le runner permet de :**
* Créer des tests
* Lancer des tests
* Debugger les tests

**Pour ouvrir le runner :**
* Dans un IDE, ouvrir le terminal
* Dans le terminal qui s’ouvre taper: **npx cypress open**

Vous pouvez créer les tests,  les debugger, et les lancer.
