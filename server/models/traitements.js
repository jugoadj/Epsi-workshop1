const mongoose = require('mongoose');


const traitementSchema = new mongoose.Schema({
    patient_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true 
    },
    medicament_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Medicament', required: true 
    },
    dose: { 
        type: String, required: true 
    }, 
    frequence: { 
        type: String, required: true 
    }, 
    date_debut: { 
        type: Date, required: true 
    },
    date_fin: { 
        type: Date, required: true 
    },
    instructions: { 
        type: String 
    }, 
    created_at: { 
        type: Date, default: Date.now 
    },
    updated_at: { 
        type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('Traitement', traitementSchema);
