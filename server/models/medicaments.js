const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    type: { 
        type: String,
        required: true 
    }, 
    dosage: { 
        type: String, 
        required: true 
    }, 
    frequencePrise: { 
        type: Number,  // Ex : 3 fois par jour
        required: true 
    },
    heuresPrise: [{
        type: Date,  // Les heures spécifiques de prise de médicaments chaque jour
        required: true
    }],
    debutPrise: {
        type: Date,  // Date de début du traitement
        required: true
    },

    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Medicament', medicamentSchema);
