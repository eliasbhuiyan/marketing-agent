const { verifyAccessToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.cookies['_optimise_access_token'];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' }); 
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
