import express from "express"
const router = express.Router();
import { createCase } from "../Controller/Case.js";
import { getAllCases } from "../Controller/Case.js";
import { updateCase } from "../Controller/Case.js";
import { deleteCase } from "../Controller/Case.js";
import { getCaseById } from "../Controller/Case.js";
import { getLatestUpdate } from "../Controller/Case.js";
import {authenticateUser} from "../Middleware/auth.js"


router.post('/createCase', authenticateUser,createCase);
router.get('/AllCase', getAllCases);
router.get('/FindCase/:id',getCaseById);
router.put('/idUpdate/:id', updateCase);
router.delete('/idDelete/:id', deleteCase);
router.get('/latest-update/:id',getLatestUpdate);

  export default router;