import { UserController } from '../controller';
import { checkUser } from '../middleware/auth';


const userController = new UserController();
export default [
  {
    method: 'post',
    route: '/api/user/register',
    middleware: [],
    controller: UserController,
    action: userController.register,
  },
  {
    method: 'put',
    route: '/api/user',
    controller: UserController,
    middleware: [checkUser],
    action: userController.updateUser,
  },
  {
    method: 'get',
    route: '/api/user/profile',
    controller: UserController,
    middleware: [checkUser],
    action: userController.getUserById

  },
  {
    method: 'put',
    route: '/api/user/changePassword',
    controller: UserController,
    middleware: [checkUser],
    action: userController.changePassword

  },
  {
    method: 'post',
    route: '/api/user/resetPassword',
    controller: UserController,
    middleware: [],
    action: userController.requestForgotPassword

  },
  {
    method: 'post',
    route: '/api/user/forgotPassword',
    controller: UserController,
    middleware: [],
    action: userController.forgotPassword

  },
  {
    method: 'get',
    route: '/api/user/check-expired-token',
    controller: UserController,
    middleware: [],
    action: userController.checkExpiredToken

  },
  {
    method: 'get',
    route: '/api/getAllProvinces',
    controller: UserController,
    middleware: [],
    action: userController.getAllProvince
  },
  {
    method: 'delete',
    route: '/api/user/leave-system',
    controller: UserController,
    middleware: [checkUser],
    action: userController.userLeaveSystem,
  },
  {
    method: 'put',
    route: '/api/user/sns-verify-email',
    controller: UserController,
    middleware: [],
    action: userController.snsVerifyEmail,
  }
  
];
