import Case from "../Module/CaseModule.js"; 
import User from "../Module/Usermoduler.js";
import mongoose from "mongoose"

export const createCase = async (req, res) => {
    const {
      title,
      description,
      evidenceType,
      status = "new",
      priority = "medium",
      chainOfCustody = [],
      toolsUsed = [],
      findings = [],
    } = req.body;
  
    // Check if req.user is defined
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
  
    const userId = req.user.id; // Get the user ID from the authenticated user
  
    // Validate required fields
    if (!title || !description || !evidenceType) {
      return res.status(400).json({ error: "Title, description, and evidenceType are required" });
    }
  
    try {
      const newCase = new Case({
        title,
        description,
        evidenceType,
        status,
        priority,
        chainOfCustody,
        toolsUsed,
        findings: findings.map((finding) => ({
          ...finding,
          addedBy: userId, // Set addedBy to the authenticated user's ID
        })),
        createdBy: userId, // Set createdBy to the authenticated user's ID
      });
      const savedCase = await newCase.save();
      res.status(201).json(savedCase);

   // Default dashboard
       
    } catch (error) {
      console.error("Error creating the forensic case:", error);
      res.status(500).json({ error: "Error creating the forensic case", details: error.message });
    }
  };

  export const getOfficerCases = async (req, res) => {
    try {
      const { officerCode } = req.params;
      console.log("Officer Code from request:", officerCode);
  
      // Find the officer by their officerCode
      const officer = await User.findOne({ officerCode });
      if (!officer) {
        return res.status(404).json({ message: "Officer not found" });
      }
  
      // Find cases where the officer is the creator
      const cases = await Case.find({ createdBy: officer._id }).populate(
        "createdBy",
        "fullname email"
      );
      res.status(200).json({ cases});
    } catch (error) {
      console.log("Error fetching cases:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  export const getTaskDetails= async (req, res) => {
    try {
      const { caseId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(caseId)) {
        return res.status(400).json({ message: "Invalid case ID" });
      }
  
      // Find and delete the case
      const getCase = await Case.findById(caseId);
  
      if (!getCase) {
        return res.status(404).json({ message: "Case not found" });
      }
      
      res.status(200).json({ message: "get the case", getCase});
    } catch (error) {
      console.log("Error deleting case:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

export const deleteCase = async (req, res) => {
    try {
      const { caseId } = req.params;
  
      // Find and delete the case
      const deletedCase = await Case.findByIdAndDelete(caseId);
  
      if (!deletedCase) {
        return res.status(404).json({ message: "Case not found" });
      }
  
      res.status(200).json({ message: "Case deleted successfully", deletedCase });
    } catch (error) {
      console.log("Error deleting case:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  export const updateCase = async (req, res) => {
    try {
      const { caseId } = req.params;
      const updateData = req.body;
  
      // Find and update the case
      const updatedCase = await Case.findByIdAndUpdate(caseId, updateData, {
        new: true, // Return the updated case
      });
  
      if (!updatedCase) {
        return res.status(404).json({ message: "Case not found" });
      }
  
      res.status(200).json({ message: "Case updated successfully", updatedCase });
    } catch (error) {
      console.log("Error updating case:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  export const getOfficerCaseStatistics = async (req, res) => {
    try {
      const { officerCode } = req.params;
      console.log("Officer Code from request:", officerCode);
  
      // Find the officer by their officerCode
      const officer = await User.findOne({ officerCode });
      if (!officer) {
        return res.status(404).json({ message: "Officer not found" });
      }
  
      // Count the number of cases based on their status and created by the officer
      const activeCases = await Case.countDocuments({ status: 'active', createdBy: officer._id });
      const closedCases = await Case.countDocuments({ status: 'closed', createdBy: officer._id });
      const newCases = await Case.countDocuments({ status: 'new', createdBy: officer._id });
  
      res.status(200).json({
        message: "Officer-specific case statistics retrieved successfully",
        activeCases,
        closedCases,
        newCases,
      });
    } catch (error) {
      console.error('Error fetching officer-specific case statistics:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };