const Traitement = require('../models/traitement.model');

// Créer un nouveau traitement
module.exports.createTraitement = async (req, res) => {
    const { patient_id, medicament_id,dose,frequence, date_debut, date_fin, instructions } = req.body;

    if (!patient_id || !medicaments || !debut) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : patient_id, medicaments, debut" });
    }

    try {
        const traitement = new Traitement({ patient_id, medicament_id, dose , frequence, date_debut, date_fin, instructions });
        await traitement.save();
        res.status(201).json({ message: "Traitement créé avec succès", traitement });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Modifier un traitement
module.exports.updateTraitement = async (req, res) => {
    const { patient_id, medicament_id,dose,frequence, date_debut, date_fin, instructions } = req.body;

    if (!patient_id || !medicament_id || !debut) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : patient_id, medicaments, debut" });
    }

    try {
        const traitement = await Traitement.findByIdAndUpdate(
            req.params.id,
            { patient_id, medicament_id,dose,frequence, date_debut, date_fin, updated_at: Date.now() },
            { new: true }
        );
        if (!traitement) return res.status(404).json({ error: "Traitement non trouvé" });
        res.status(200).json({ message: "Traitement modifié avec succès", traitement });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un traitement
module.exports.deleteTraitement = async (req, res) => {
    try {
        const traitement = await Traitement.findByIdAndDelete(req.params.id);
        if (!traitement) return res.status(404).json({ error: "Traitement non trouvé" });
        res.status(200).json({ message: "Traitement supprimé avec succès" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
