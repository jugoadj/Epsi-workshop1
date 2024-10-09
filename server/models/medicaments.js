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
