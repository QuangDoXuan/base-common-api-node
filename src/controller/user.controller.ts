import { Request, Response } from 'express';
import log from '../utils/log';
import { UserModel, AuthModel, ProvinceModel } from '../model';
import * as response from '../utils/response';
import { UserError, CommonError } from '../common/error';
import { getConnection } from 'typeorm';
import * as Joi from '@hapi/joi';
import { sendMail } from '../utils/email';
import { requestPassword, signUp as signUpTemplate } from '../template'
import { hash} from 'bcryptjs';
import moment from 'moment';
import config from '../config';
import { MemberType, UserStatus } from '../common/enum';
const logger = log('User Controller');
const crypto = require('crypto');

const userModel = new UserModel();
const provinceModel = new ProvinceModel();
export class UserController {
  async getUserById(req: Request, res: Response) {
    const id = Number(req['user'].userId);
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await userModel.getUserById(transaction, id);
        if (!result) {
          throw UserError.USER_NOT_FOUND;
        }
      });
      result= delete result.password;
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }

  async register(req: Request, res: Response) {
    const valid = Joi.object({
      phone: Joi.string(),
      name: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      avatar: Joi.string()

    });

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      let user
      await getConnection().transaction(async transaction => {
        user = await userModel.createUser(transaction, value);
      // tao 1 token va send email
      const verifyToken = await userModel.updateVerifyToken(transaction, user.id);
      const refDomain = req.get('origin');
      const mailOption = {
        to: user.email,
        ...signUpTemplate({ link: `${refDomain && refDomain.includes('http') ? refDomain : config.refDomain.user}/verifylink?token=${verifyToken}` })
      }
      await sendMail(mailOption);
      });
      return res.jsonp(response.success(user));
    } catch (error) {
      logger.error(error, req.url, value);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = Number(req['user'].userId);
    const valid = Joi.object({
      phone: Joi.string(),
      name: Joi.string(),
      avatar: Joi.string(),
      address: Joi.string(),
      provinceId: Joi.number().integer(),
      notification: Joi.number().integer(),
      softDelete: Joi.boolean()
    });

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      let result;
      await getConnection().transaction(async transaction =>{
        result = await userModel.updateUser(transaction, id, value);
      })
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  // user change password
  async changePassword(req: Request, res: Response) {
    const id = Number(req['user'].userId);
    const valid = Joi.object({
      password: Joi.string().required(),
      newPassword: Joi.string().required(),
    });

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await userModel.changPassword(transaction, id, value);
      })
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  // user forgot password
  async requestForgotPassword(req: Request, res: Response) {
    // generate a new token and send email to cline, luu vao data base
    // const email = req.body.email
    const valid = Joi.object({
      email: Joi.string().required(),
    });
    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      let user;
      await getConnection().transaction(async transactionEntityManager => {
        user = await userModel.detailUser(transactionEntityManager, { email: value.email }); // find user theo email
        //trường hợp user đăng nhập bằng twitter, facebook ko có email thì không restPassword được phai update email
        if (!user) {
          throw UserError.USER_NOT_FOUND;
        }
        // tao 1 token va send email
        const refDomain = req.get('origin');
        const verifyToken = await userModel.updateVerifyToken(transactionEntityManager, user.id);
        const mailOption = {
          to: user.email,
          ...requestPassword({ userName: user.name, link: `${refDomain && refDomain.includes('http') ? refDomain : config.refDomain.user}/reset-password?token=${verifyToken}` })
        }
        await sendMail(mailOption);
      });
      return res.jsonp(response.success(true));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  // click vào reset password in mail set password mới vào data
  async forgotPassword(req: Request, res: Response) {
    const valid = Joi.object({
      newPassword: Joi.string().required(),
      verifyToken: Joi.string().required()
    });

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      let result;
      await getConnection().transaction(async transaction => {
        let user = await userModel.getUserByVerifyToken(transaction, value.verifyToken);
        if (!user) {
          throw UserError.TOKEN_NOT_FOUND
        }
        const expiredToken = user.expiredToken;
        if(moment().isAfter(expiredToken)){
          throw UserError.TOKEN_EXPIRED;
        }
        // result= await userModel.changPassword(transaction, user.id, { password: '', value.newPassword });
        await userModel.updateUser(transaction, user.id, {verifyToken: null, expiredToken: null})
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  async getAllProvince(req: Request, res: Response) {
    try {
      let listProvince;
    await getConnection().transaction(async transactionEntityManager => {
      listProvince = await provinceModel.getAllProvince(transactionEntityManager);
    });
      return res.jsonp(response.success(listProvince));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
  async userLeaveSystem(req: Request, res: Response) {
    try {
      let result;
      await getConnection().transaction(async transaction => {
       result = await userModel.removeUser(transaction, req['user'].userId);
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      return res.jsonp(response.error(error || CommonError.UNKNOWN_ERROR));
    }
  }
  async snsVerifyEmail(req: Request, res: Response) {
    const valid = Joi.object({
      id: Joi.number().integer().required(),
      email: Joi.string().required() 
    });

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      await getConnection().transaction(async transaction => {
        const token = crypto.randomBytes(32).toString('hex');
        value.verifyToken = await hash(token, config.auth.saltRounds);
        const user = await userModel.detailUser(transaction, {email: value.email, status: UserStatus.VERIFY});
        if(user){
          throw UserError.USER_EXISTING;
        }
        await userModel.updateUser(transaction, value.id, value); 
        const refDomain = req.get('origin'); 
        const mailOption = {
          to: value.email,
          ...signUpTemplate({ link: `${refDomain && refDomain.includes('http') ? refDomain : config.refDomain.user}/verifylink?token=${value.verifyToken}` })
        }
        await sendMail(mailOption);
      });
      return res.jsonp(response.success(true));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }

  async checkExpiredToken(req: Request, res: Response) {
    const valid = Joi.object({
      verifyToken: Joi.string().required(),
    });
    const { error, value } = valid.validate(req.query);
    if (error) {
      logger.error(error, req.url, req.query);
      return res.jsonp(response.error(UserError.INVALID_INPUT_PARAMS));
    }
    try {
      await getConnection().transaction(async transactionEntityManager => {
        let user = await userModel.getUserByVerifyToken(transactionEntityManager, value.verifyToken);
        if (!user) {
          throw UserError.TOKEN_NOT_FOUND
        }
        const expiredToken = user.expiredToken;
        if(moment().isAfter(expiredToken)){
          throw UserError.TOKEN_EXPIRED;
        }
      })
      return res.jsonp(response.success(true));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
}
