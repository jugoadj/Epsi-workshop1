const Medicament = require('../models/medicaments');

// Créer un nouveau médicament
module.exports.createMedicament = async (req, res) => {
    const { nom, description, type, dosage, frequencePrise, heuresPrise, debutPrise } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !type || !dosage || !frequencePrise || !heuresPrise || !debutPrise) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : nom, type, dosage, fréquence, heures de prise, début de prise" });
    }

    try {
        // Création du nouveau médicament
        const medicament = new Medicament({
            nom,
            description,
            type,
            dosage,
            frequencePrise,
            heuresPrise,
            debutPrise,
            
        });

        await medicament.save();
        res.status(201).json({ message: "Médicament créé avec succès", medicament });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Modifier un médicament
// Modifier un médicament
module.exports.updateMedicament = async (req, res) => {
    const { nom, description, type, dosage, frequencePrise, heuresPrise, debutPrise, finPrise } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !type || !dosage || !frequencePrise || !heuresPrise || !debutPrise || !finprise) {
        return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires : nom, type, dosage, fréquence, heures de prise, début de prise" });
    }

    try {
        // Mise à jour du médicament
        const medicament = await Medicament.findByIdAndUpdate(
            req.params.id,
            {
                nom,
                description,
                type,
                dosage,
                frequencePrise,
                heuresPrise,
                debutPrise,
                finPrise,
                updated_at: Date.now()
            },
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

module.exports.showallmed = async (req, res) => {
    try {
        const medicaments = await Medicament.find(); // Trouve tous les médicaments
        res.status(200).json(medicaments); // Renvoie les médicaments en JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des médicaments:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des médicaments.' });
    }
}