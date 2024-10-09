const express = require('express');
const router = express.Router();
const medicamentController = require('../controllers/medicaments.controller');

router.post('/', medicamentController.createMedicament);
router.put('/:id', medicamentController.updateMedicament);
router.delete('/:id', medicamentController.deleteMedicament);

module.exports = router;
