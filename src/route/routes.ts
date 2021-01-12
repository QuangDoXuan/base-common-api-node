import authRoute from './auth.route';
import userRoute from './user.route';
import provinceRoute from './province.route';
import commonRoute from './common.route';
const mergeRoute = [
  ...authRoute,
  ...userRoute,
  ...commonRoute,
  ...provinceRoute
];

export default mergeRoute;
