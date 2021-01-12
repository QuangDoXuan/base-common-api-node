import { Request, Response } from 'express';
import log from '../utils/log';
import { UserModel, AuthModel, ProvinceModel } from '../model';
import * as response from '../utils/response';
import { UserError, CommonError } from '../common/error';
import { getConnection } from 'typeorm';
const logger = log('User Controller');
const crypto = require('crypto');

const userModel = new UserModel();
const provinceModel = new ProvinceModel();
export class ProvinceController {

  async create(req: Request, res: Response) {
    console.log(123);
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await provinceModel.createProvince(transaction, req.body);
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
}
