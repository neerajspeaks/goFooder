const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ThIsIs@##%HDIHF#$&';

router.post('/login', [
    body('email', 'Invalid Email ID').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.findOne(
            { email: req.body.email }
        );
        if (!user) {
            return res.status(400).json({ errors: 'Invalid credentials.' });
        }
        const comparePswd = await bcrypt.compare(req.body.password, user.password);
        if (!comparePswd) {
            return res.status(400).json({ errors: 'Invalid password.' });
        }
        const payload = {
            user: {
                id: user._id
            }
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        console.log(user);
        res.json({ success: true, authToken });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;