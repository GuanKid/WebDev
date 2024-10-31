const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  triageLevel: { type: Number, required: true },
  checkedIn: { type: Date, default: Date.now },
  discharged: { type: Date },
});

module.exports = mongoose.model('Patient', PatientSchema);