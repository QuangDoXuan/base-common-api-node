import { Config as ConfigEntity } from '../entity';
import { EntityManager } from 'typeorm';
import log from '../utils/log';

export class ConfigModel {
  async saveConfig(transaction: EntityManager, configs: object) {
    const keys = Object.keys(configs);
    const exeSaveConfigs = keys.map(key => {
      return (async () => {
        let config = await transaction.getRepository(ConfigEntity).findOne({ key: key });
        if (!config) {
          config = new ConfigEntity();
          config.key = key;
          config.value = JSON.stringify(configs[key]);
          await transaction.getRepository(ConfigEntity).save(config);
        } else {
          await transaction.getRepository(ConfigEntity).update(config.id, {value: JSON.stringify(configs[key])});
        }
      })();
    })
    await Promise.all(exeSaveConfigs);
    return true;
  }

  async getConfigs(transaction: EntityManager) {
    const configs = await transaction.getRepository(ConfigEntity).find();
    return configs.reduce((pre, curent) => {
      let objectData = {};
      try {
        objectData = JSON.parse(curent.value);
      } catch (error) { }
      pre[curent.key] = objectData;
      return pre
    }, {});
  }

  async getConfigByKey(transaction: EntityManager, key: string) {
    const config = await transaction.getRepository(ConfigEntity).findOne({where: {key: key}});
    try {
      config.value = JSON.parse(config.value);
    } catch(err) {
      return {} || [];
    }
    return config;
  }
}
