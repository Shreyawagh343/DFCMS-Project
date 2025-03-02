import User from "../Module/Usermoduler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const Singup = async (req, res) => {
    try {
        const { fullname, email, password, officerCode, role } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user
        const createuser = await User.create({
            fullname,
            email,
            password: hash,
            officerCode: officerCode || null,
            role,
        });

        // Save the user
        await createuser.save();

        // Return the response
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createuser._id,
                fullname: createuser.fullname,
                email: createuser.email,
                role: createuser.role,
                officerCode: createuser.officerCode,
            },
        });
    } catch (error) {
        console.log("Error during signup:", error); // Log the full error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, officerCode: user.officerCode },
            process.env.YOUR_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Set the token in a cookie (optional)
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
            maxAge: 3600000, // 1 hour in milliseconds
        });

        let redirectUrl = "/dashboard"; // Default dashboard
        if (user.role === "admin") {
          redirectUrl = "/admin/dashboard";
        } else if (user.role === "officer" && user.officerCode) {
          redirectUrl = `/officer/${user.officerCode}/dashboard`;
        }

        console.log("User role:", user.role);
console.log("Redirect URL:", redirectUrl);

        // Return the response
        res.status(200).json({
            message: "Login successful",
            token, // Include the token in the response
            redirectUrl,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                officerCode: user.officerCode,
            },
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};