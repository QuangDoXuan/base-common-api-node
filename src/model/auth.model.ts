import { getRepository, MoreThan } from 'typeorm';
import { User } from '../entity';
import { hash, compare } from 'bcryptjs';
import config from '../config';
import { UserStatus, MemberType } from '../common/enum';
import { UserError } from '../common/error';
import * as jwt from "jsonwebtoken";

export class AuthModel {

  async login(transaction, data) {
    const user = await this.getUser(transaction, { email: data.email, status: UserStatus.VERIFY, softDelete: false });
    if (!user) {
      throw UserError.USER_NOT_FOUND;
    }
    const comparePassword = await compare(data.password, user.password);
    if (!comparePassword) {
      throw UserError.LOGIN_WRONG_PASSWORD;
    }

    const token = this.genTokenAuthen(user);
    // update lastLogin
    await transaction.getRepository(User).update(user.id, { lastLogin: new Date() });
    return { id: user.id, token: token };
  }

  genTokenAuthen( user: User) {
    return jwt.sign({ userId: user.id, username: user.name, memberType: MemberType.USER }, config.auth.tokenKey, {
      algorithm: 'HS256', expiresIn: '30d'
    });
  }

  async getUser(transaction, data: { id?: number, email?: string, status?: number, openId?: string, loginType?: number, softDelete?: boolean}) {
    return await transaction.getRepository(User).findOne(data);
  }
}
