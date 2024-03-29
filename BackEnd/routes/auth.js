const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const fetchuser = require('../middleware/fetchuser');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "z8ad7d89cazcxasmserttuzdqcowcqcpoa8f9adaadas9a"

// ROUTE 1: Create a new user using: POST "/api/auth/createuser". Doesn't require Authorization. 
try {
    router.post('/createuser', [
        body('email', "Enter a valid Email").isEmail(),
        body('name', "Enter a valid Name").isLength({ min: 3 }),
        body('password', "Password length should be minimum 5 characters").isLength({ min: 5 })
    ], async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        // Check weather user with same email exists.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this E-mail already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
    })
}
catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
}

// ROUTE 2: Authenticate a user using: POST "/api/auth/login", No Login required.
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success,error: "Please try to login with Correct Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please try to login with Correct Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success,authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// ROUTE 3: Get LoggedIn user details using: POST "/api/auth/getuser". Login required.

router.post('/getuser',fetchuser,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router