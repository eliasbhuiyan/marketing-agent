const { verifyAccessToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.cookies['_mg_acc_tn'];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' }); 
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;    
    
    next();
  } catch (err) {    
    res.status(401).json({ error: 'Invalid request' });
  }
};

module.exports = authMiddleware;
