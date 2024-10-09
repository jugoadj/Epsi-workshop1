const Medicament = require('../models/medicament.model');

// Créer un nouveau médicament
module.exports.createMedicament = async (req, res) => {
    const { nom, description, type, dosage } = req.body;

    if (!nom || !type || !dosage) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : nom, type, dosage" });
    }

    try {
        const medicament = new Medicament({ nom, description, type, dosage });
        await medicament.save();
        res.status(201).json({ message: "Médicament créé avec succès", medicament });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Modifier un médicament
module.exports.updateMedicament = async (req, res) => {
    const { nom, description, type, dosage } = req.body;

    if (!nom || !type || !dosage) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : nom, type, dosage" });
    }

    try {
        const medicament = await Medicament.findByIdAndUpdate(
            req.params.id,
            { nom, description, type, dosage, updated_at: Date.now() },
            { new: true }
        );
        if (!medicament) return res.status(404).json({ error: "Médicament non trouvé" });
        res.status(200).json({ message: "Médicament modifié avec succès", medicament });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un médicament
module.exports.deleteMedicament = async (req, res) => {
    try {
        const medicament = await Medicament.findByIdAndDelete(req.params.id);
        if (!medicament) return res.status(404).json({ error: "Médicament non trouvé" });
        res.status(200).json({ message: "Médicament supprimé avec succès" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
