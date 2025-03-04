// models/Query.js
import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  CaseName: { type: String, required: true },
  officerCode: { type: String, required: true },
  query: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Query", querySchema);