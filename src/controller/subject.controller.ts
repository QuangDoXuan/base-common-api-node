import { Request, Response } from 'express';
import log from '../utils/log';
import { UserModel, AuthModel, SubjectModel } from '../model';
import * as response from '../utils/response';
import { UserError, CommonError } from '../common/error';
import { getConnection } from 'typeorm';
const logger = log('Subject Controller');

const subjectModel = new SubjectModel();
export class SubjectController {
  async index(req: Request, res: Response) {
    try {
      let result;
      await getConnection().transaction(async transaction => {
      result = await subjectModel.getAll(transaction) 
      })
      return res.json(response.success(result))
    } catch (e) {
      return res.jsonp(response.error(e || CommonError.NOT_FOUND_ERROR))
    }
  }


  async create(req: Request, res: Response) {
    try {
      let result;
      await getConnection().transaction(async transaction => {
        result = await subjectModel.createSubject(transaction, req.body);
      });
      return res.jsonp(response.success(result));
    } catch (error) {
      logger.error(error, req.url, req.body);
      return res.jsonp(response.error(error || UserError.UNKNOWN_ERROR));
    }
  }
}
