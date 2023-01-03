const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const { EMAIL_SECRET, TOKEN_SECRET, REFRESH_SECRET, COOKIE_NAME } = process.env;

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, TOKEN_SECRET, {
    expiresIn: '1h'
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, REFRESH_SECRET, {
    expiresIn: '7d'
  });
};

const signUserTokens = (user, res) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.setHeader('authorization', `${accessToken}`);
  res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });
  return res.status(200).json({ accessToken, refreshToken, user });
};

const verifyAccessToken = (req, res, next) => {
  const authorizationHeader = req.header('authorization');

  if (!authorizationHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1] || authorizationHeader;

    jwt.verify(accessToken, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send(`Invalid Token! - ${err.message}`);
      }
      req.user = decoded;
      next();
    });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    try {
      const verified = jwt.verify(refreshToken, REFRESH_SECRET);
      req.user = verified;
      return next();
    } catch (error) {
      return res.status(403).send(`Invalid Token! ${error.message}`);
    }
  }
};

const verifyEmailToken = (req, res, next) => {
  const { emailToken } = req.params;

  if (!emailToken) {
    return res.status(403).send('Access Denied - a token is required for authentication!');
  }

  try {
    const verified = jwt.verify(emailToken, EMAIL_SECRET, { ignoreExpiration: true });
    req.emailToken = verified;
    return next();
  } catch (error) {
    return res.status(401).send('Invalid Token!');
  }
};

module.exports = {
  verifyEmailToken,
  generateRefreshToken,
  generateAccessToken,
  verifyAccessToken,
  signUserTokens,
  verifyRefreshToken,
};
