import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

export const auth = (req, res, next) => {
  const { JWT_SECRET } = req.app.get('config');
  const { authorization = '' } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Требуется аутентификация'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { _id: decoded._id };
      next();
    } catch (err) {
      next(new UnauthorizedError('Требуется аутентификация'));
    }
  }
};
