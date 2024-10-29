import { Singup } from "../Controller/User.js";
import { login } from "../Controller/User.js";
import express from "express"


const router = express.Router();
router.post("/SignIn",Singup)
router.post("/Login",login)

export default router;