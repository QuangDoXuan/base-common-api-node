import log from '../utils/log';
import { Request, Response, NextFunction } from 'express';

import { error } from '../utils/response';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { AuthError } from '../common/error';
import { MemberType } from '../common/enum'

const logger = log('Token');


interface decodeData {
  userId: number,
  memberType: string
}

function _decodeToken(req: Request, cb: Function) {
  let token = req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return cb(AuthError.TOKEN_NOT_FOUND, null);
  }

  verify(token, config.auth.tokenKey, (err, decode) => {
    if (err) {
      return cb(AuthError.TOKEN_INVALID, null);
    }
    return cb(undefined, decode as decodeData)

  });

}

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  _decodeToken(req, (err, userData) => {
    if (err) {
      res.status(err.errorCode).jsonp(error(err))
    }
    if (userData.memberType !== MemberType.USER) {
      return res.status(AuthError.MEMBER_TYPE_INVALID.errorCode).jsonp(error(AuthError.MEMBER_TYPE_INVALID))
    }
    req['user'] = userData;
    return next();
  });

}

export const checkOwner = (req: Request, res: Response, next: NextFunction) => {
  _decodeToken(req, (err, userData) => {
    if (err) {
      res.status(err.errorCode).jsonp(error(err))
    }
    if (userData.memberType !== MemberType.OWNER) {
      return res.status(AuthError.MEMBER_TYPE_INVALID.errorCode).jsonp(error(AuthError.MEMBER_TYPE_INVALID))
    }

    req['user'] = userData;
    return next();
  });

}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  _decodeToken(req, (err, userData) => {
    if (err) {
      res.status(err.errorCode).jsonp(error(err))
    }
    if (userData.memberType !== MemberType.ADMIN) {
      return res.status(AuthError.MEMBER_TYPE_INVALID.errorCode).jsonp(error(AuthError.MEMBER_TYPE_INVALID))
    }

    req['user'] = userData;
    return next();
  });

}

export const checkUserOptional = (req: Request, res: Response, next: NextFunction) => {
  _decodeToken(req, (err, userData) => {
    if (!err && userData) {
      userData = userData;
      // if (userData.memberType !== MemberType.USER) {
      //  return res.status(AuthError.MEMBER_TYPE_INVALID.errorCode).jsonp(error(AuthError.MEMBER_TYPE_INVALID))
      // }
      req['user'] = userData;
    }


    return next();
  });

}

export const decodeToken = (token) => {
  let err, decodeData = undefined;
  try {
    decodeData = verify(token, config.auth.tokenKey);
  } catch (error) {
    console.log(error);
    err = AuthError.TOKEN_NOT_FOUND
  }

  return [err, decodeData];
}