import { Singup } from "../Controller/User.js";
import { login } from "../Controller/User.js";
import express from "express";
import { authenticateUser } from "../Middleware/auth.js";
import {checkOfficerAccess} from "../Middleware/auth.js";

const router = express.Router();

// Admin Dashboard (Protected Route)
router.get('/admin/dashboard', authenticateUser, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Officer Dashboard (Protected Route)
router.get("/officer/:officerCode/dashboard", authenticateUser, checkOfficerAccess, (req, res) => {
    res.json({ message: `Welcome to Officer ${req.params.officerCode}'s Dashboard` });
  });

// User Signup
router.post("/SignIn", Singup);

// User Login
router.post("/LoginCode", login);

export default router;