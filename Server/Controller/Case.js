import Case from "../Module/CaseModule.js";


export const createCase = async (req, res) => {
    const {
      title,
      description,
      evidenceType,
      status,
      priority,
      chainOfCustody,
      toolsUsed,
      findings = [],
      createdBy,
    } = req.body;
    const userId = req.user._id;
    try {
        const newCase = new Case({
          title,
          description,
          evidenceType,
          status,
          priority,
          chainOfCustody,
          toolsUsed,
          findings:findings.map(finding => ({
            ...finding,
            addedBy: userId // Associate the finding with the user ID
          })),
          createdBy: userId, // Set the createdBy field with the user ID
        });
        const savedCase = await newCase.save();
        res.status(201).json(savedCase);
      } catch (error) {
        res.status(500).json({ error: 'Error creating the forensic case', details: error.message });
      }
    };

export const getAllCases = async (req, res) => {
  const {id}=req.body;

    try {
     
        const cases = await Case.find({id}).populate('createdBy').populate('findings.addedBy');       // Populate createdBy field
        console.log("All cases in database:", cases);
          res.status(200).json(cases);
          console.log(cases)
    } catch (error) {
          res.status(500).json({ error: 'Error fetching forensic cases', details: error.message });
    }
      };

      export const getCaseById = async (req, res) => {
        const { title } = req.body;
        console.log(title)
  

        try {
          const forensicCase = await Case.find(title)
          console.log("Case found with findOne:", forensicCase);
    
            res.status(200).json(forensicCase);
        } catch (error) {
            console.error("Error fetching the forensic case:", error);
            res.status(500).json({ error: 'Error fetching the forensic case', details: error.message });
        }
    };
    export const updateCase = async (req, res) => {
      const { id } = req.params; // Get the case ID from the request parameters
      const updates = req.body; // Get the updates from the request body
  
      console.log("Updating case with ID:", id); // Log the ID being updated
      console.log("Updates:", updates); // Log the updates being applied
  
      try {
          // Find the case by ID and update it with the provided updates
          const updatedCase = await Case.findByIdAndUpdate(id, updates, { new: true });
          console.log(updateCase)
          if (!updatedCase) {
              return res.status(404).json({ message: 'Forensic case not found' });
          }
  
          // Return the updated case
          res.status(200).json(updatedCase);
      } catch (error) {
          res.status(500).json({ error: 'Error updating the forensic case', details: error.message });
      }
  };
      export const deleteCase = async (req, res) => {
        const { title } = req.body;
        console.log(title)
      
        try {
          const deletedCase = await Case.findOneAndDelete(title);
      
          if (!deletedCase) {
            return res.status(404).json({ message: 'Forensic case not found' });
          }
      
          res.status(200).json({ message: 'Forensic case deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Error deleting the forensic case', details: error.message });
        }
      };
      export const getLatestUpdate = async (req, res) => {
        const { title } = req.body;
        console.log(title)
      
        try {
          const forensicCase = await Case.findOne(title).select('findings').populate('findings.addedBy', 'name');
          console.log(forensicCase)
          if (!forensicCase || forensicCase.findings.length === 0) {
            return res.status(404).json({ message: 'No updates found for this case.' });
          }
      
          const latestFinding = Case.findings.sort((a, b) => b.createdAt - a.createdAt)[0];
          res.status(200).json(latestFinding);
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving the latest update for the case', details: error.message });
        }
      };

      export const uploadPDFController = (req, res) => {
        // Use the `uploadPDF` middleware to handle the PDF upload
        uploadPDF(req, res, (err) => {
          if (err) {
            // Handle errors from multer (e.g., file type or size errors)
            return res.status(400).json({ error: err.message });
          }
      
          if (!req.file) {
            return res.status(400).json({ error: 'Please upload a PDF file' });
          }
      
          // File is successfully uploaded
          res.status(200).json({
            message: 'PDF uploaded successfully',
            fileInfo: {
              filename: req.file.filename,
              path: req.file.path,
              size: req.file.size,
            },
          });
        });
      };