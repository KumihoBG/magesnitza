const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

require("dotenv").config();

const { verifyAccessToken, signUserTokens } = require('../middleware/auth');
// const { sendEmailForgotPassword } = require('../middleware/emailSender');
const { encrypt, decrypt } = require('../middleware/dataHashing');

const { COOKIE_NAME } = process.env;

const userService = require('../services/userService.js');
const User = require('../models/User');

router.post('/register',
    body('email', 'Invalid email').isEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be minimum 6 characters long.')
        .bail(),

    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                res.status(400).json(JSON.stringify(message));
            }

            if (!req.body.email || !req.body.password) {
                return res.status(400).send('Email and password are required.');
            }

            const existingEmail = await userService.getUserByEmail(req.body.email);

            if (existingEmail) {
                res.status(400).json({ message: 'This email is already taken.' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await userService.registerUser(req.body.email, hashedPassword);
            signUserTokens({ _id: user._id, email: user.email, role: user.role }, res);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
);

router.post('/login-admin', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ error: "Wrong user or password!" });

    if (!user.role === 'admin') {
      return res.status(403).json({ error: 'Not authorized!' });
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
    if (!validPassword) return res.status(400).json({ error: 'Wrong password!' });

    signUserTokens({ _id: user._id, email: user.email, role: user.role }, res);
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: 'Logout successful' });
});

router.put('/changePassword/:id', verifyAccessToken, async (req, res) => {
    const id = req.params.id;

    try {
        const userId = decrypt(id);
        const password = req.body.hashedPassword;
 
        const user = await User.findById(userId);

        if (!user) return res.status(404).send('User not found!');

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        let updatedUser = {
            hashedPassword: newPassword
        }

        if (user) {
            await User.findOneAndUpdate({
                _id: id
            }, 
            updatedUser,
            { new: true }
            );
        }

        signUserTokens(updatedUser, res);

        return res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

router.post('/forgottenPassword', verifyAccessToken, async (req, res) => {
    const email = req.body.email;

    try {
        const userExists = await User.findOne({ email: email });

        if (!userExists) return res.status(404).send('Email address does not exist!');

        const userIdEncrypted = encrypt(userExists._id);
        // sendEmailForgotPassword(email, userIdEncrypted);

        return res.status(200).send('Email sent successfully!');
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;