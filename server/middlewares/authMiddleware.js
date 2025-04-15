import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};