import { ProvinceController } from '../controller';
const provinceController = new ProvinceController();
export default [
  {
    method: 'post',
    route: '/api/province',
    middleware: [],
    controller: ProvinceController,
    action: provinceController.create,
  }
];
