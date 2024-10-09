# 🏥 EPSI Health - Gestion des Patients et Médicaments

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js) 
![Express](https://img.shields.io/badge/Express-4.x-blue?style=flat-square&logo=express) 
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-brightgreen?style=flat-square&logo=mongodb) 
![React Native](https://img.shields.io/badge/React%20Native-0.71-blue?style=flat-square&logo=react) 
![Expo](https://img.shields.io/badge/Expo-49.x-black?style=flat-square&logo=expo) 

**EPSI Health** est une application de gestion des patients et de suivi des médicaments pour accompagner les utilisateurs dans leur traitement médical via des rappels et notifications.

---

## 📑 Fonctionnalités Principales

- **Gestion des Patients** : Créer, modifier, supprimer et gérer les informations des patients.
- **Gestion des Médicaments** : Créer, modifier, supprimer et gérer les informations des médicaments.
- **Suivi des Traitements** : Assigner des traitements aux patients avec des rappels automatiques.
- **Rendez-vous Médicaux** : Gérer les rendez-vous, avec lieu, date, et motif.
- **Notifications** : Alertes et rappels pour les prises de médicaments et rendez-vous.

---

## ⚙️ Installation

1. Clonez ce repository :

   ```bash
   git clone https://github.com/votre-username/epsi-health.git

2. Accédez au dossier du projet :

   - cd EPSIHEPLHEALTH

3. Installez les dépendances du serveur :

   - npm install

:) Configurez les variables d'environnement en créant un fichier .env à la racine du projet :


- PORT=8000
- MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/epsi-health
- TOKEN_SECRET=your_secret_key
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret

4. Lancez l'application :

   - npm start

🚀 Technologies Utilisées
Backend : Node.js, Express
Base de Données : MongoDB avec Mongoose
Frontend : React Native (Expo)
Authentification : OAuth Google, JWT
Notifications : Push, SMS

