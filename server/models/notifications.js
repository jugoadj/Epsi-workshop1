const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    patient_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['medicament', 'rendezvous'], 
        required: true 
    },
    date_notification: { 
        type: Date, required: true 
    },
    message: { 
        type: String, required: true 
    },
    
    created_at: { 
        type: Date, default: Date.now 
    },
    updated_at: { 
        type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
