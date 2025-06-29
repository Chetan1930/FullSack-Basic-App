const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

exports.authManage = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');

    // Attach decoded user info to request
    req.user = decoded;

    next(); // proceed to the next middleware or controller
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
