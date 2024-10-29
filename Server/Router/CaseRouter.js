import express from "express"
const router = express.Router();
import Case from "../Module/CaseModule.js";

router.get('/cases/:officerId', async (req, res) => {
    try {
      const officerId = req.params.officerId;
      const cases = await Case.find({ assignedOfficer: officerId });
      res.json(cases);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cases' });
    }
  });

  export default router;