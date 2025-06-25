const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader); // Debug log
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.log('JWT Error:', err); // Debug log
    res.status(401).json({ error: 'Token is not valid' });
  }
}; 