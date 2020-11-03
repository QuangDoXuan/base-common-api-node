import { EntityManager, getRepository } from 'typeorm';
import { Province } from '../entity';

export class ProvinceModel {
  async getAllProvince(transaction: EntityManager) {
    const result = await transaction.getRepository(Province).find();
    return result;
  }
  async getProvinceById(transaction: EntityManager, provinceId) {
    const province = await transaction.getRepository(Province).findOne(provinceId);
    return province;
  }
}
