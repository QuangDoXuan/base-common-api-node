import { EntityManager, getConnection, getRepository } from 'typeorm';
import { Subject } from '../entity';

export class SubjectModel {
  async getAll(transaction: EntityManager) {
    const result = await transaction.getRepository(Subject).find();
    return result;
  }
  
  async getById(transaction: EntityManager, subjectId) {
    const subject = await transaction.getRepository(Subject).findOne(subjectId);
    return subject;
  }

  async createSubject(transaction: EntityManager, data) {
    const subject = await transaction.getRepository(Subject).save(data);
    return subject;
  }
}
