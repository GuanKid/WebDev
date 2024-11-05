const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  chiefComplaint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Waiting", "In Treatment", "Discharged"],
    default: "Waiting",
  },
//   triageLevel: { type: Number, required: true },
  checkedIn: { type: Date, default: Date.now },
  discharged: { type: Date },
});

module.exports = mongoose.model("Patient", PatientSchema);
