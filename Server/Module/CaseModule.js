import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }, 
  evidenceType: {
    type: String,
    enum: ['hard drive', 'smartphone', 'computer', 'cloud data', 'network logs', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    required: true,
    default: 'in_progress',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  chainOfCustody: [
    {
      receivedBy: {
        type: String,
        required: true,
      },
      dateReceived: {
        type: Date,
        required: true,
        default: Date.now,
      },
      location: {
        type: String,
        required: true,
      },
      notes: String,
  
    },
  ],
  toolsUsed: [
    {
      name: String,
      version: String,
      notes: String,
    },
  ],
  findings: [
    {
      summary: String,
      details: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Officer",
        required: true,
      },
    },
  ],  
  createdBy: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



const Case = mongoose.model("Case",caseSchema);

export default Case;