
import { Request, Response } from 'express';
import * as response from '../utils/response';
import log from '../utils/log';
import * as Joi from '@hapi/joi';
import { awsThumbFormat } from '../utils/s3-service'
import { CommonError } from '../common/error';
import { ConfigModel } from '../model'
import { getConnection } from 'typeorm';
const logger = log('Common Controller');
const configModel = new ConfigModel();
export class CommonController {
  upload = (req: any, res: Response) => {
    let files = req.files.map(i => { return awsThumbFormat(i.key); }) || [];
    return res.send(response.success(files));
  }

  saveConfig = async (req: Request, res: Response) => {
    const valid = Joi.object();

    const { error, value } = valid.validate(req.body);
    if (error) {
      logger.error(error, req.originalUrl, req.body);
      return res.jsonp(response.error(CommonError.INVALID_INPUT_PARAMS));
    }
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await configModel.saveConfig(transaction, value);
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.originalUrl, req.body);
      return res.jsonp(response.error(error || CommonError.GET_ERROR));
    }

  }

  getConfig = async (req: any, res: Response) => {
    try {
      let result;
    await getConnection().transaction(async transactionEntityManager => {
      result = await configModel.getConfigs(transactionEntityManager);
    });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.originalUrl, req.body);
      return res.jsonp(response.error(error || CommonError.GET_ERROR));
    }
  }
}
