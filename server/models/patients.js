const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nom: { 
    type: String, required: true 
  },
  prenom: { 
    type: String, required: true 
  },
  email: { 
    type: String, required: true, unique: true 
  },
  password :{
    type: String, required: true 
  },
  date_naissance: { 
    type: Date 
  },
  tel: { 
    type: String 
  },
  adresse: { 
    type: String 
  }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
