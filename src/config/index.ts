const dotenv = require('dotenv');
dotenv.config();
import dev from './dev';
import staging from './staging';
import prod from './prod';
const env = process.env.APP_ENV;

const config = {
  dev,
  staging,
  prod
};

export default config[env];
