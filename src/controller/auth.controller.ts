import { Request, Response } from 'express';
import { AuthModel, UserModel } from '../model';
import * as response from '../utils/response';
import log from '../utils/log';
import * as Joi from '@hapi/joi';
import { getConnection } from 'typeorm';
import { AuthError, UserError } from '../common/error';
import { LoginType, UserStatus } from '../common/enum';
import {getFacebookUserByToken, getTwitterUserByToken, registerTwitter, signOAuth2} from '../utils/oauthFuntion';
const logger = log('Auth Controller');

const authModel = new AuthModel();
const userModel= new UserModel();
export class AuthController {
  async login(req: Request, res: Response) {
    const valid = Joi.object({ 
      email: Joi.string().required(), 
      password: Joi.string().required(),
      
    });
    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error);
      return res.jsonp(response.error(AuthError.MEMBER_TYPE_INVALID));
    }
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await authModel.login(transaction, value);
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error);
      return res.jsonp(response.error(UserError.UNKNOWN_ERROR));
    }
  }
  async verifyUserAfterSignup(req: Request, res: Response) {
    const valid = Joi.object({
      verifyToken: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }

    try {
      let resData = {
        id: 0,
        token: '',
      };
      await getConnection().transaction(async transaction => {
        let user = await userModel.getUserByVerifyToken(transaction, value.verifyToken);
        if (!user) {
          throw UserError.USER_NOT_FOUND;
        }
        await userModel.updateUser(transaction, user.id, { status: UserStatus.VERIFY });
        const token = await authModel.genTokenAuthen(user);
        resData.id = user.id;
        resData.token = token;
      });
      return res.jsonp(response.success(resData));
    } catch (error) {
      logger.error(error, req.url, value);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  // login facebook 
  async loginFacebook(req: Request, res: Response) {
    const valid = Joi.object({ 
      id: Joi.string().required(), 
      token: Joi.string().required(),
      
    });
    
    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      
      const facebookInfo = (await getFacebookUserByToken(value.id, value.token)) as OAuthResponse;
      if (!facebookInfo) {
        return res.jsonp(response.error(AuthError.TOKEN_INVALID));
      }      
    const result = await signOAuth2({...facebookInfo, ... {loginType:LoginType.FACEBOOK}}); 
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, value);
      return res.jsonp(response.error( error || UserError.UNKNOWN_ERROR));
    }
  }
  async signInWithTwitter(req: Request, res: Response) {
    try {
      const twitterInfo = await registerTwitter();
      if (!twitterInfo) {
        return res.jsonp(response.error(AuthError.TOKEN_INVALID));
      }      
      return res.jsonp(response.success(twitterInfo));
    } catch (error) {
      logger.error(error, req.url);
      return res.jsonp(response.error( error || UserError.UNKNOWN_ERROR));
    }
  }

  async loginTwitter(req: Request, res: Response) {
    const valid = Joi.object({ 
      oauthToken: Joi.string().required(), 
      oauthTokenSecret: Joi.string().required(),
      oauthVerifier: Joi.string().required()
    });
    
    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      
      const twitterInfo = (await getTwitterUserByToken(value.oauthToken, value.oauthTokenSecret, value.oauthVerifier)) as OAuthResponse;
      if (!twitterInfo) {
        return res.jsonp(response.error(AuthError.TOKEN_INVALID));
      }      
    const result = await signOAuth2({...twitterInfo, ... {loginType: LoginType.GOOGLE}}); 
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, value);
      return res.jsonp(response.error( error || UserError.UNKNOWN_ERROR));
    }
  }
  
}
interface OAuthResponse {
  email: string, openId: string, avatar: string, fullName: string, loginType: number
}
