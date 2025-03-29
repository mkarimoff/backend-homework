const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ssjd"; // Make sure to store this in an environment variable

// 🔹 Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration Failed" });
    }
};

// 🔹 Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // ❌ Remove 'username' (not needed)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login Failed" });
    }
};
