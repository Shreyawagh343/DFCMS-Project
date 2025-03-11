import express from "express"
import { createCase , deleteCase , updateCase,getOfficerCases , getTaskDetails , getOfficerCaseStatistics ,getAllCases , getAllStatus} from "../Controller/OfficerCase.js";
import { authenticateUser } from "../Middleware/auth.js";
const router = express.Router();


router.get("/cases/all", authenticateUser, getAllCases);
router.get("/cases/status", authenticateUser, getAllStatus);
router.get("/officer/:officerCode", authenticateUser, getOfficerCases);
router.get("/:caseId", authenticateUser,getTaskDetails);
router.post("/CreateCase",authenticateUser , createCase);
router.delete("/:caseId", authenticateUser ,deleteCase );
router.put("/:caseId", authenticateUser , updateCase);
router.get('/:officerCode/statistics',authenticateUser, getOfficerCaseStatistics); 
 
export default router;