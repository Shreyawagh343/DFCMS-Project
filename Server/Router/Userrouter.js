import { Singup } from "../Controller/User.js";
import { login } from "../Controller/User.js";
import express from "express"
// import { localVariable } from "../Middleware/auth.js";
// import { otpGenerate } from "../Controller/User.js";


const router = express.Router();
router.post("/SignIn",Singup)
router.post("/LoginCode",login)
// router.get("/generateOtp",localVariable ,otpGenerate)
export default router;