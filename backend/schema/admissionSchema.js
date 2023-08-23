const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user/patient document
    ref: "User", // This refers to the "User" model you've defined
    required: true,
  },
  admissionDate: { type: Date, required: true },
  admissionTime: { type: String, required: true },
  chiefProblem: { type: String, required: true },
  historyOfPresentIllness: { type: String, required: true },
  socialHistory: { type: String, required: true },
  familyHistory: { type: String, required: true },
  physicalExam: { type: String, required: true },
  medicationOnAdmission: { type: String, required: true },
  allergies: { type: String, required: true },
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
