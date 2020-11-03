import authRoute from './auth.route';
import userRoute from './user.route';
import commonRoute from './common.route';
const mergeRoute = [
  ...authRoute,
  ...userRoute,
  ...commonRoute
];

export default mergeRoute;
