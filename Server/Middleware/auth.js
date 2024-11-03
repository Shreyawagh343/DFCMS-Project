import jwt from 'jsonwebtoken';
import User from '../Module/Usermoduler.js';

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.YOUR_SECRET_KEY;

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', details: error.message });
  }
};