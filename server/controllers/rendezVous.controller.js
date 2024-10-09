const RendezVous = require('../models/rendezvous.model');

// Créer un nouveau rendez-vous
module.exports.createRendezVous = async (req, res) => {
    const { patient_id, date_rendezvous, lieu, motif, medecin } = req.body;

    if (!patient_id || !date_rendezvous || !lieu || !medecin) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : patient_id, date_rendezvous, lieu, medecin" });
    }

    try {
        const rendezVous = new RendezVous({ patient_id, date_rendezvous, lieu, motif, medecin });
        await rendezVous.save();
        res.status(201).json({ message: "Rendez-vous créé avec succès", rendezVous });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Modifier un rendez-vous
module.exports.updateRendezVous = async (req, res) => {
    const { patient_id, date_rendezvous, lieu, motif, medecin } = req.body;

    if (!patient_id || !date_rendezvous || !lieu || !medecin) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : patient_id, date_rendezvous, lieu, medecin" });
    }

    try {
        const rendezVous = await RendezVous.findByIdAndUpdate(
            req.params.id,
            { patient_id, date_rendezvous, lieu, motif, medecin, updated_at: Date.now() },
            { new: true }
        );
        if (!rendezVous) return res.status(404).json({ error: "Rendez-vous non trouvé" });
        res.status(200).json({ message: "Rendez-vous modifié avec succès", rendezVous });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un rendez-vous
module.exports.deleteRendezVous = async (req, res) => {
    try {
        const rendezVous = await RendezVous.findByIdAndDelete(req.params.id);
        if (!rendezVous) return res.status(404).json({ error: "Rendez-vous non trouvé" });
        res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
