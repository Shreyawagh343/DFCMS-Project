import jwt from 'jsonwebtoken';
import User from '../Module/Usermoduler.js';
import cookieParser from 'cookie-parser'; // Ensure cookie-parser is imported

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
  // Use your secret key from environment variables
  const secretKey = process.env.YOUR_SECRET_KEY; 

  // Get the token from cookies
  const token = req.cookies.token; // Assuming you store the token in a cookie named 'token'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, secretKey); 
    // Find the user and attach it to req.user
    req.user = await User.findById(decoded.id); 
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', details: error.message });
  }
};