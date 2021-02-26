import { EntityManager, getConnection, getRepository } from 'typeorm';
import { Category } from '../entity';

export class CategoryModel {
  async getAll(transaction: EntityManager) {
    const result = await transaction.getRepository(Category).find();
    return result;
  }

  async getById(transaction: EntityManager, categoryId) {
    const category = await transaction.getRepository(Category).findOne(categoryId);
    return category;
  }

  async createCategory(transaction: EntityManager, data) {
    const category = await transaction.getRepository(Category).save(data);
    return category;
  }
}
