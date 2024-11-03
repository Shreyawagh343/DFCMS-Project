import express from "express"
const router = express.Router();
import { createCase } from "../Controller/Case.js";
import { getAllCases } from "../Controller/Case.js";
import { updateCase } from "../Controller/Case.js";
import { deleteCase } from "../Controller/Case.js";
import { getCaseById } from "../Controller/Case.js";
import { getLatestUpdate } from "../Controller/Case.js";
import {authenticateUser} from "../Middleware/auth.js"
import { uploadPDFController } from "../Controller/Case.js";


router.post('/createCase',authenticateUser,createCase);
router.post('/upload', uploadPDFController);
router.get('/AllCase',getAllCases);
router.get('/FindCase',getCaseById);
router.put('/idUpdate/:id', updateCase);
router.delete('/idDelete', deleteCase);
router.get('/latest-update/:id',getLatestUpdate);
 
export default router;