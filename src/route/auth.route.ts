import { AuthController } from '../controller';

const authController = new AuthController();
export default [
  {
    method: 'post',
    route: '/auth/login',
    controller: AuthController,
    middleware: [],
    action: authController.login,
  },
  {
    method: 'post',
    route: '/api/auth/verify-user-after-signup',
    middleware: [],
    controller: AuthController,
    action: authController.verifyUserAfterSignup,
  },
  {
    method: 'post',
    route: '/api/auth/login-facebook',
    middleware: [],
    controller: AuthController,
    action: authController.loginFacebook,
  },
  {
    method: 'post',
    route: '/api/auth/login-twitter',
    middleware: [],
    controller: AuthController,
    action: authController.loginTwitter,
  },
  {
    method: 'post',
    route: '/api/auth/register-twitter',
    middleware: [],
    controller: AuthController,
    action: authController.signInWithTwitter,
  },
];
