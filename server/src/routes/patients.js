const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.put('/:id/discharge', patientController.dischargePatient);

module.exports = router;