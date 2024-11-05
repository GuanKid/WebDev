// controllers/patientController.js

const Patient = require('../Models/PatientModel');

// Controller for saving a new patient
const createPatient = async (req, res) => {
  try {
    const { name, age, chiefComplaint, status } = req.body;

    if (!name || !age || !chiefComplaint || !status) {
      return res.status(400).send({
        message: 'Send all required fields: name, age, chiefComplaint, status',
      });
    }

    const newPatient = await Patient.create({ name, age, chiefComplaint, status });
    return res.status(201).send(newPatient);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for retrieving all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    return res.status(200).json({
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for retrieving a single patient by ID
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for updating a patient by ID
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, chiefComplaint, status } = req.body;

    if (!name || !age || !chiefComplaint || !status) {
      return res.status(400).send({
        message: 'Send all required fields: name, age, chiefComplaint, status',
      });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, { name, age, chiefComplaint, status }, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).send({ message: 'Patient updated successfully', data: updatedPatient });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for deleting a patient by ID
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).send({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
