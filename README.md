HeplHealth - Application de Gestion des Patients et Suivi Médical
HeplHealth est une application mobile et serveur backend permettant de gérer les patients, leurs traitements médicaux, les rendez-vous et les médicaments associés. L'application permet également l'authentification des utilisateurs, notamment via Google, et propose des fonctionnalités de rappel des prises de médicaments et des rendez-vous médicaux.

Fonctionnalités
Gestion des Patients
Création, modification, et suppression de patients.
Gestion des informations personnelles des patients.
Gestion des Médicaments
Ajout, modification et suppression des médicaments.
Gestion des informations telles que le nom, type, description, dosage, etc.
Gestion des Traitements
Création de traitements médicaux pour les patients.
Gestion des médicaments dans un traitement, incluant les doses et fréquences.
Gestion des Rendez-vous
Ajout, modification et suppression des rendez-vous médicaux.
Rappel des rendez-vous pour les patients.
Authentification et Sécurité
Authentification via e-mail et mot de passe.
Authentification via Google OAuth 2.0.
Génération de tokens JWT pour la gestion des sessions.
Notifications et Rappels
Notifications push pour les rappels de médicaments.
Alertes pour les rendez-vous médicaux.
Technologies Utilisées
Backend
Node.js avec Express pour la création des API.
MongoDB avec Mongoose pour la gestion de la base de données.
JWT (JSON Web Token) pour la gestion des sessions et de l'authentification.
Passport.js pour l'authentification OAuth (Google).
Bcrypt pour le hachage des mots de passe.
Frontend Mobile
React Native avec Expo pour le développement de l'application mobile.
Push Notifications et Alerts pour les rappels et notifications des utilisateurs.
Base de Données
MongoDB Atlas pour la gestion des données à distance.
Modèles de base de données pour les patients, médicaments, traitements et rendez-vous.
Prérequis
Backend
Node.js (version 14 ou supérieure)
MongoDB Atlas ou serveur MongoDB local
Google API credentials pour l'authentification OAuth
Frontend Mobile
Expo CLI installé
Compte Expo pour le déploiement
Installation
Clonez le dépôt :
bash
Copy code
git clone https://github.com/ton-compte/heplhealth.git
cd heplhealth/server
Installez les dépendances du backend :
bash
Copy code
npm install
Configurez les variables d'environnement dans un fichier .env :
bash
Copy code
TOKEN_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_atlas_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=3000
Démarrez le serveur :
bash
Copy code
npm start
Installez les dépendances du frontend dans le dossier mobile :
bash
Copy code
cd ../mobile
npm install
Démarrez l'application mobile avec Expo :
bash
Copy code
npx expo start
