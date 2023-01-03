const router = require('express').Router();
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/auth');
const User = require('../models/User');

require('dotenv').config({ path: 'variables.env' });

router.post('/refreshToken', verifyRefreshToken, async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: 'User not found!' });

  const newAccessToken = generateAccessToken({ _id: user._id, email: user.email, role: user.role });
  const newRefreshToken = generateRefreshToken({ _id: user._id, email: user.email, role: user.role });

  return res.status(200).json({ newAccessToken, newRefreshToken });
});

module.exports = router;
