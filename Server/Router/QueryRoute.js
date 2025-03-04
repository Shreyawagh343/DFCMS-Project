import express from "express"
import { createQuery , getAllQuery } from "../Controller/QueryController.js";
import { authenticateUser } from "../Middleware/auth.js";
const router = express.Router();

router.get("/:officerCode", authenticateUser,getAllQuery);
router.post("/CreateQuery",authenticateUser , createQuery );

 
export default router;