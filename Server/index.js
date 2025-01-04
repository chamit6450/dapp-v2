const express = require('express');
const { Data, User } = require('./db');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require('bcrypt');

require('dotenv').config();

const PORT = 3000;
app.use(express.json()); 
app.use(cors()); 

const jwtPassword = process.env.JWT_SECRET; // JWT secret for signing tokens

// Signup Route - Registers a new user
app.post('/signup', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password) {
        return res.status(400).send({ msg: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).send({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
        await User.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error", error);
        res.status(500).send({ msg: "Error registering user" });
    }
});

// Authenticate Function - Verifies user credentials
async function authenticate(email, password) {
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password); // Compare hashed password
        return validPassword ? user : null;
    } catch (error) {
        console.error("Authentication Error", error);
        throw error;
    }
}

// Login Route - Authenticates a user and returns a JWT token
app.post('/login', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await authenticate(email, password);
        if (!user) {
            return res.status(401).send({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, jwtPassword, { expiresIn: '1h' }); // Generate JWT token
        res.json({ token });

    } catch (error) {
        res.status(500).send({ msg: "Error logging in" });
    }
});

// Verify Token Route - Validates the JWT token
app.get("/jwt", function (req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(401).send({ msg: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(token, jwtPassword); // Verify the token
        const email = decoded.email;
        res.send({ msg: "Welcome " + email });
    } catch {
        res.status(401).send({ msg: "Invalid token" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});