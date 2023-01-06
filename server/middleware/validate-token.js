import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};

export default verifyToken;
