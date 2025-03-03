import express from "express"
import { createCase , deleteCase , updateCase,getOfficerCases , getTaskDetails } from "../Controller/OfficerCase.js";
import { authenticateUser } from "../Middleware/auth.js";
const router = express.Router();


router.get("/officer/:officerCode", authenticateUser, getOfficerCases);
router.get("/:caseId", authenticateUser,getTaskDetails);
router.post("/CreateCase",authenticateUser , createCase);
router.delete("/:caseId", authenticateUser ,deleteCase );
router.put("/:caseId", authenticateUser ,updateCase);
 
export default router;