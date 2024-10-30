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
      assignedInvestigators,
      findings,
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
          assignedInvestigators,
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
    try {
     
        const cases = await Case.findOne().populate('createdBy')        // Populate createdBy field
        .populate('findings.addedBy');
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
          const forensicCase = await Case.findOne({title : title})
          console.log("Case found with findOne:", forensicCase);
    
            res.status(200).json(forensicCase);
        } catch (error) {
            console.error("Error fetching the forensic case:", error);
            res.status(500).json({ error: 'Error fetching the forensic case', details: error.message });
        }
    };
      export const updateCase = async (req, res) => {
        const { title } = req.body;
        console.log(title)
      
        try {

            const updatedCase = await Case.findOneAndUpdate(title, updates, { new: true });
            if (!updatedCase) {
              return res.status(404).json({ message: 'Forensic case not found' });
            }
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