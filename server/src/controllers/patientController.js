const Patient = require('../models/Patient');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.dischargePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.discharged = Date.now();
    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};