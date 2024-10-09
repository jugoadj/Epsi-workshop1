const mongoose = require('mongoose');


const rendezVousSchema = new mongoose.Schema({
    patient_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true 
    },
    date_rendezvous: { 
        type: Date, required: true 
    },
    lieu: { 
        type: String, required: true 
    },
    motif: { 
        type: String 
    },
    medecin: { 
        type: String, required: true 
    },
    created_at: { 
        type: Date, default: Date.now 
    },
    updated_at: { 
        type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
