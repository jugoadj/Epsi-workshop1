const Medicament = require('../models/medicaments');
const moment = require('moment'); 

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
        // Obtenir la date actuelle
        const today = moment().startOf('day'); // Début de la journée actuelle
        const endOfDay = moment().endOf('day'); // Fin de la journée actuelle

        // Début et fin de la semaine actuelle
        const startOfWeek = moment().startOf('week'); // Début de la semaine
        const endOfWeek = moment().endOf('week'); // Fin de la semaine

        // Récupérer les médicaments de la journée
        const medsOfDay = await Medicament.find({
            heuresPrise: { $gte: today.toDate(), $lte: endOfDay.toDate() }, // Médicaments pris aujourd'hui
            // Optionnel : tu peux ajouter des conditions supplémentaires comme la fréquence de prise ici
        });

        // Récupérer les médicaments de la semaine
        const medsOfWeek = await Medicament.find({
            debutPrise: { $lte: endOfWeek.toDate() },  // Médicaments commencés avant la fin de la semaine
            finPrise: { $gte: startOfWeek.toDate() }, // Médicaments toujours en cours cette semaine
            // Optionnel : ajuster la condition de la fréquence si nécessaire
        });

        // Renvoie les deux listes de médicaments
        res.status(200).json({
            medsOfDay,
            medsOfWeek
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des médicaments:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des médicaments.' });
    }
};
