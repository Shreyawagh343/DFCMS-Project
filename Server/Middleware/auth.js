import jwt from 'jsonwebtoken';
import User from '../Module/Usermoduler.js';

// Middleware to authenticate user, check role, and enforce access control
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];
  const secretKey = process.env.YOUR_SECRET_KEY;

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Attach user details to the request object
    req.user = {
      id: user._id,
      role: user.role,
      officerId: user.officerId, // Attach officerId if the user is an officer
    };

    // Check if the user is an admin or officer
    if (req.user.role === 'admin') {
      // Admin has access to all resources
      next();
    } else if (req.user.role === 'officer') {
      // Officer can only access their own resources
      const requestedOfficerId = req.params.officerId; // Assuming officerId is passed in the URL params
      if (req.user.officerId !== requestedOfficerId) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
      }
      next();
    } else {
      // Handle other roles (if any)
      return res.status(403).json({ message: 'Forbidden: Invalid role' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', details: error.message });
  }
};

// Example middleware to check officer access
export const checkOfficerAccess = (req, res, next) => {
  const { officerCode } = req.params; // Get officerCode from the URL
  const user = req.user; // User details from the token

  // Check if the user is an officer
  if (user.role !== 'officer') {
    return res.status(403).json({ message: "Forbidden: Officers only" });
  }

  // Check if the officer is accessing their own resource
  if (user.officerCode !== officerCode) {
    return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
  }

  next(); // Proceed to the next middleware or route handler
};