import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer' },
    // Other case-specific fields
  });

const Case = mongoose.model("Case",caseSchema);

export default Case;