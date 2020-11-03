export default {
  port: process.env.PORT || 80,
  auth: {
    tokenKey: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    tokenRefresh: 'd13faqqdqeb4b0d3255bfef95601890afd80709',
    saltRounds: 10,
    minute_expire: 43200, // 1 month
    minute_expire_token: 15,
  },
  emailOption: {
    serverMail: 'smtp.gmail.com',
    serverPort: 587,
    authUser: 'lobby.office.2020@gmail.com',
    authPass: 'coakxvfxiznvesvs',//'lobby@123'
  },
  awsUpload: {
    domain: 'https://lobby-online.s3-ap-northeast-1.amazonaws.com',
    downloadUrl: 'https://lobby-online.s3-ap-northeast-1.amazonaws.com/',
    secretAccessKey: 'JkHHbyX9RIZkN4b4o8M0SwI1ZKsZoSf+sZFxHx/A',
    accessKeyId: 'AKIAIN32BCPYKXXPDHNA',
    region: 'ap-northeast-1',
    bucket: 'lobby-online',
  },
  refDomain: {
    user: 'https://lobby-japan.com',
    salonOwner: 'https://owner.lobby-japan.com',
    admin: 'https://admin.lobby-japan.com'
  },
  paypal: {
    mode: 'sandbox',
    client_id: 'AR-JXK50quvPS6RxMjWDJaYZgvhSyXUyd6rJxG5Cfc3RdNlHAV-n9L9ugyUci5bPC0__Us6NhAA6bV-5',
    client_secret: 'EH-MCToEkR-fCnXxcEQ_x2Q7Ny1wiQ5eMGMxMXTz8jh-w8GcqtcFCH3JTZOtsECMHoUVPdmTI85Ks9n6',
    webhook: 'https://api.lobby-japan.com/api/paypal/webhook'
  },
  facebook: {
    app_id: '272198137163865',
    apiUrl: 'https://graph.facebook.com/v3.3/',
  },
  twitter: {
    consumerKey: 'swf8AxjVCVSPQuwHxfJPcocry',
    consumerSecret: 'uBNAFyGeVv58PWhLjYoroWSRExxnxtewVk6CPLwfBGKsOGyjy9',
    callback: 'https://lobby-japan.com/twitter/callback',
    request_token: 'https://api.twitter.com/oauth/request_token',
    access_token: 'https://api.twitter.com/oauth/access_token'
  },
  vimeo: {

  },
  wowza: {
    endpointUrl: "https://api.cloud.wowza.com/api/v1.4",
    wscApiKey: "9USL7mvezvJ5ZSnqX8roHr33vizf620mttQUlIsxnH7yuzsCEPV9weBQSixE3629",
    wscAccessKey: "OVjWLE3LqIxXO3o1LEvkmF32GpyiFYt0Bjyf3FGvJhWTzQ6Ulfw6lnZlNn11334d"
  },
  agora: {
    appId: 'e2c54db8b9e24535929785b2f7da2865',
    appCertificate: '6ca902abcd294e7989592c6cade78dbc',
    customerId: '21b917647eae4d7193d8b63f1498dcae',
    customerCertificate: '1503a9f6b6354416a4ae2defeb56ee20',
    endpointUrl: 'https://api.agora.io/v1'
  },
  adminInfo: {
    email: 'allin.s2020@gmail.com',
  },
};
