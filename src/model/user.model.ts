import {
  EntityManager,
} from 'typeorm';
import { User } from '../entity';
import { UserData } from '../types/types';
import * as _ from 'lodash';
import { UserError } from '../common/error';
import moment from 'moment';
import { hash, compare } from 'bcryptjs';
import config from '../config';
const crypto = require('crypto');

export class UserModel {
  async getUserById(transaction: EntityManager, userId: number) {
    const repository = transaction.getRepository(User);
    const user = await repository.findOne(userId, {relations: ["provinces"], where: { softDelete: false }});
    return user;
  }

  async updateUser(transaction: EntityManager, userId: number, data: UserData) {
    const user = await this.getUserById(transaction, userId);

    if (!user) {
      throw UserError.USER_NOT_FOUND;
    }
    if (data.softDelete) {
      data.status = 0;
    }
    data.updatedAt= new Date();
    const result = await transaction.getRepository(User).update(userId, data);
    return true;
  }

  // change password user
  async changPassword(transaction: EntityManager, userId: number, params: { password: string; newPassword: string }) {
    const user = await this.getUserById(transaction, userId);

    if (!user) {
      throw UserError.USER_NOT_FOUND;
    }
    // check old password is wrong or correct
    if (params.password) { 
      const comparePassword = await compare(params.password, user.password || '');
      if (!comparePassword) {
        throw UserError.NEW_PASSWORD_SAME;
      }
    }
    //check password new
    params.newPassword = await hash(params.newPassword, config.auth.saltRounds);
    const result = await transaction.getRepository(User).update(userId, { password: params.newPassword });
    return true;
  }

  async updateVerifyToken(transaction: EntityManager, userId: string) {
    //tao password
    const token = crypto.randomBytes(32).toString('hex');

    let verifyToken = await hash(token, config.auth.saltRounds);
    const expired = moment(new Date()).add(1, 'hour').utc().toDate();
    // luu vao database
    await transaction.getRepository(User).update(userId, { verifyToken: verifyToken, expiredToken: expired});
    return verifyToken;
  }

  async getUserByVerifyToken(transaction: EntityManager, verifyToken: string) {
    const repository = transaction.getRepository(User);
    const user = await repository.findOne({ verifyToken: verifyToken});
    return user;
  }
  async createUser(transaction, data) {
    const check = await this.detailUser(transaction, { email: data.email });
    if (check) {
      throw UserError.USER_EXISTING;
    }
    if (data.password) {
      data.password = await hash(data.password, config.auth.saltRounds);
    }
    const user = await transaction.getRepository(User).save(data);
    return user;
  }

  async detailUser(transaction, data: { id?: number; email?: string, status?: number }) {
    return await transaction.getRepository(User).findOne(data);
  }

  async removeUser(transaction: EntityManager, userId: number) {
    await transaction.getRepository(User).update(userId, {softDelete: true});
    return true;
  }
}
