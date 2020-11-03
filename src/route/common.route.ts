import { CommonController } from '../controller';
import {multerMidle} from '../utils/s3-service'
const commonController = new CommonController();

export default [
  {
    method: 'get',
    route: '/api/config',
    controller: CommonController,
    middleware: [], //
    action: commonController.getConfig,
  },

  {
    method: 'post',
    route: '/api/upload',
    controller: CommonController,
    middleware: [multerMidle.array('files', 3)], //
    action: commonController.upload,
  },
  
];
