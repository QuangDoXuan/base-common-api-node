const request = require('request-promise');
import config from '../config';
import Twitter from 'node-twitter-api';
import OAuth from 'oauth';
import { getConnection } from 'typeorm';
import { AuthModel, UserModel } from '../model';
import { UserError } from '../common/error';
import { UserStatus } from '../common/enum';
const authModel = new AuthModel();
const userModel = new UserModel();

export const getFacebookUserByToken = async (id, token) => {
  return new Promise((resolve, reject) => {
    const userFieldSet = 'id, name, email';
    const options = {
      method: 'GET',
      uri: config.facebook.apiUrl + id,
      qs: {
        access_token: token,
        fields: userFieldSet,
      },
    };

    request(options, (err, res, body) => {
      if (err) reject(err);

      if (res.statusCode != 200) {
        body = JSON.parse(body);
        return reject(body.error.message);
      }

      body = JSON.parse(body);
      const data = {
        openId: body.id,
        fullName: body.name || '',
        birthday: body.birthday || '',
        email: body.email || '',
        avatar: `https://graph.facebook.com/${id}/picture?type=large`,
      };

      return resolve(data);
    });
  });
};
const oauthService = new OAuth.OAuth(
  config.twitter.request_token,
  config.twitter.access_token,
  config.twitter.consumerKey,
  config.twitter.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
)
export const registerTwitter = () => {
  return new Promise((resolve, reject) => {
    oauthService.getOAuthRequestToken({ oauth_callback: config.twitter.callback }, function (error, oauthToken, oauthTokenSecret, results) {
      if (error) {
       return reject(error);
      }
      return resolve({oauthToken: oauthToken, oauthTokenSecret: oauthTokenSecret});
    })
  });
};

export const getTwitterUserByToken = (oauthToken: string, oauthTokenSecret: string, oauthVerifier: string) => {
  const twitter = new Twitter({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callback: config.twitter.callback,
  });
  return new Promise((resolve: any, reject: any) => {
    oauthService.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          return reject(error);
        } 
        twitter.verifyCredentials(oauth_access_token, oauth_access_token_secret, function(err, user) {
          if (err) {
            return reject(err);
          }
          return resolve({
            openId: user.id || '',
            fullName: user.name || '',
            avatar: user.profile_image_url || '',
          });
        }); 
    });
  });
};
export const signOAuth2 = async (data: { email?: string; openId: string; avatar: string; fullName: string; loginType: number }) =>{
  let resData = {
    id: 0,
    token: '',
  };
  
  await getConnection().transaction(async transactionEntityManager => {
    /*kiem tra email lay dc da ton tai chua neu co thi login neu ko thi insert
     get user theo email  nếu lấy được email hoặc (openid và loginType)*/
    let user;
    if (data.email) {
      user = await authModel.getUser(transactionEntityManager, { email: data.email });
    } else {
      user = await authModel.getUser(transactionEntityManager, { openId: data.openId });
    }
    if (user) {
      
      // kiem tra user da active chua
      if(user.softDelete){
        throw UserError.ACCOUNT_DELETE  
      }
      if (user.status === 0) {
        let errorMessage = Object.assign(UserError.LOGIN_SNS_VERIFY_EMAIL, {metaData: 
          {id: user.id, email: user.email||''}
        });
        throw errorMessage; 
      }
      resData.id = user.id;
      resData.token = authModel.genTokenAuthen(user);
    } else {
      let params = {
        email: data.email,
        openId: data.openId,
        avatar: data.avatar,
        name: data.fullName,
        status: UserStatus.UNVERIFY,
        loginType: data.loginType
      };
      await getConnection().transaction(async transactionEntityManager => {
        user = await userModel.createUser(transactionEntityManager, params);
      });
      let errorMessage = Object.assign(UserError.LOGIN_SNS_VERIFY_EMAIL, {metaData: 
        {id: user.id, email: user.email||''}
      });
      throw errorMessage; 
    }
  });
  return resData;
};
