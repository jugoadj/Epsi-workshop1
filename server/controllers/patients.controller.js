const express = require('express');
const sendMail = require("../utils/sendMail");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patientModel = require('../models/patients'); 

// Stocke les codes de validation en mémoire (devrait être en DB dans un environnement de prod)
const validationCodes = {};

// Génère un code de validation à 6 chiffres
const generateValidationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000); 
  const timestamp = Date.now();
  return { code, timestamp };
};



// Inscription avec envoi du code de validation
module.exports.signUp = async (req, res) => {
  const { email, tel } = req.body;

  // Vérification des champs obligatoires
  if (!email || !tel) {
    return res.status(400).send({ error: 'Email et numéro de téléphone sont requis' });
  }

  try {
    // Vérifie si l'email existe déjà
    const existingUser = await patientModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: { message: "Cet email est déjà utilisé" } });
    }

    const existingUserTel = await patientModel.findOne({ tel });
    if (existingUserTel) {
      return res.status(400).json({ errors: { message: 'Ce numéro de téléphone est déjà utilisé' } });
    }

    // Génère et stocke le code de validation
    const { code, timestamp } = generateValidationCode();
    validationCodes[email] = { code, timestamp };

    // Envoi de l'email contenant le code de validation
    await sendMail(email, code);

    res.status(201).json({ message: 'Code de validation envoyé à l\'adresse email' });
  } catch (err) {
    const errorMessage = err.message || "Une erreur inattendue est survenue";
    res.status(500).json({ errors: { message: errorMessage } });
  }
};

// Validation du code et création du compte utilisateur
module.exports.ValidateCode = async (req, res) => {
  const { email, validationCode, nom, prenom, password, tel, adresse } = req.body;

  // Validation des champs obligatoires
  if (!email || !validationCode || !nom || !prenom || !password || !tel || !adresse) {
    return res.status(400).json({ errors: { message: 'Tous les champs sont requis' } });
  }

  try {
    // Vérification de l'existence du code de validation
    const storedCodeData = validationCodes[email];
    if (!storedCodeData || validationCode !== storedCodeData.code.toString()) {
      return res.status(400).json({ errors: { message: 'Code de validation invalide' } });
    }

    // Vérifie si le code de validation a expiré
    const currentTime = Date.now();
    const codeAge = currentTime - storedCodeData.timestamp;
    const codeValidityDuration = 3 * 60 * 60 * 1000; // 3 heures
    if (codeAge > codeValidityDuration) {
      return res.status(400).json({ errors: { message: 'Code de validation expiré' } });
    }

    // Supprimer le code de validation une fois validé
    delete validationCodes[email];

    // Hachage du mot de passe avant la création de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = new patientModel({
      nom,
      prenom,
      email,
      password: hashedPassword,
      tel,
      adresse
    });

    await newUser.save();  

    res.status(200).json({ message: 'Compte créé avec succès' });
  } catch (err) {
    const errorMessage = err.message || "Une erreur inattendue est survenue";
    res.status(500).json({ errors: { message: errorMessage } });
  }
};

module.exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await patientModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { message: "Email utilisateur introuvable" } });
    }

    

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ errors: { message: "Mot de passe incorrect" } });
    }

    const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET || 'default_secret_key', { expiresIn: maxAge });

    return res.status(200).json({ id_user: user._id, email: user.email, token, message: "Connexion réussie" });
  } catch (err) {
    const errorMessage = err.message || "Une erreur inattendue s'est produite";
    res.status(500).json({ errors: { message: errorMessage } });
    console.log(err);
  }
};




