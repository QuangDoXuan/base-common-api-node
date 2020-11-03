import log from '../utils/log';
import { Request, Response, NextFunction } from 'express';
const logger = log('Refresh Token');
import { error } from '../utils/response';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { AuthError } from '../common/error';

export default function checkRefreshToken(req: Request, res: Response, next: NextFunction) {
  let token = req.body.refresh_token || null;

  if (!token) {
    logger.error(AuthError.REFRESH_TOKEN_NOT_FOUND.message);
    return error(AuthError.REFRESH_TOKEN_NOT_FOUND);
  }

  verify(token, config.auth.tokenRefresh, err => {
    if (err) {
      logger.error(AuthError.REFRESH_TOKEN_INVALID);
      return error(AuthError.REFRESH_TOKEN_INVALID);
    }
    return next();
  });
}