
export const UserError = {
  NEW_PASSWORD_SAME: {
    message: '新しいパスワードと古いパスワードは同じです',
    errorCode: 400
  },
  INVALID_INPUT_PARAMS: {
    message: '入力パラメーターが無効です',
    errorCode: 400
  },
  UNKNOWN_ERROR: {
    message: 'エラーサーバー',
    errorCode: 500
  },
  USER_NOT_FOUND: {
    message: 'ユーザーが見つけません',
    errorCode: 500
  },
  LOGIN_WRONG_PASSWORD: {
    message: 'パスワードが間違っています。',
    code: 500
  },
  USER_EXISTING: {
    message: 'ユーザーが存在しました。',
    code: 500
  },
  EMAIL_FORMAT: {
    message: 'ユーザーが存在しました。',
    errorCode: 500
  },
  LOGIN_SNS_VERIFY_EMAIL: {
    message: 'メールが認証されていません',//EMAIL NOT VERIFY
    errorCode: 405
  },
  TOKEN_EXPIRED: {
    message: 'トークンの有効期限が切れています',
    errorCode: 500
  },
  TOKEN_NOT_FOUND: {
    message: 'トークンが見つけません',
    errorCode: 500
  },
  ACCOUNT_DELETE: {
    message: 'アカウントが削除されました。管理者に連絡するか、別のアカウントでログインしてください',//account had delete
    errorCode: 400
  }
}

export const AdminError = {
  INVALID_INPUT_PARAMS: {
    message: '入力パラメーターが無効です',
    errorCode: 400
  },
  UNKNOWN_ERROR: {
    message: 'エラーサーバー',
    errorCode: 500
  },
  ADMIN_NOT_FOUND: {
    message: '管理者が見つけません',
    errorCode: 500
  },
  LOGIN_WRONG_PASSWORD: {
    message: 'パスワードが間違っています。',
    code: 500
  },
}

export const AuthError = {
  TOKEN_NOT_FOUND: {
    message: 'トークンが見つけません',
    errorCode: 500
  },
  TOKEN_INVALID: {
    message: ' トークンが見つけません。',
    errorCode: 500
  },
  MEMBER_TYPE_INVALID: {
    message: 'メンバータイプが無効です',
    errorCode: 500
  },
  REFRESH_TOKEN_NOT_FOUND: {
    message: '新しいトークンが見つけません。',
    errorCode: 500
  },
  REFRESH_TOKEN_INVALID: {
    message: '更新トークンが無効です',
    errorCode: 500
  }
}

export const CommonError = {
  INVALID_INPUT_PARAMS: {
    message: '入力パラメーターが無効です',
    errorCode: 400
  },
  GET_ERROR: {
    message: 'データ取得の進行状況にエラーがあります。 後でもう一度やり直してください！',
    errorCode: 400
  },
  NOT_FOUND_ERROR: {
    message: 'トークンが見つけません。',
    errorCode: 400
  },
  UNKNOWN_ERROR: {
    message: 'エラーサーバー',
    errorCode: 500
  }
}

export const ContentError = {
  USER_NOT_PERMISSION: {
    message: 'トークンが見つけません。',
    errorCode: 401
  },
  
}

export const UserSubscriptionPackageError = {
  UNKNOWN_ERROR: {
    message: 'エラーサーバー',
    errorCode: 500
  },
  USER_SUBSCRIPTION_PACKAGE_NOT_FOUND: {
    message: '購入したパケットが見つけません。',
    errorCode: 400
  }
}

export const SalonError = {
  SALON_NOT_FOUND: {
    message: 'サロンが見つけません。',
    code: 500
  },
  SALON_OWNER_EMPTY: {
    message: 'サロンが見つけません。',
    code: 500
  },
  DELETE_SALON_USER_EXIST: {
    message: '現在、サロンにユーザーがいます',
    errorCode: 400
  }
}

export const TopicError = {
  TOPIC_NOT_FOUND: {
    message: 'トピックが見つけません。',
    errorCode: 400
  },
  SUBSCRIBE_SALON: {
    message: 'サブスクリプションサロンが必要です',
    errorCode: 400
  }
}

export const ErrorLike = {
  HAD_LIKED: {
    message: 'ユーザーがこちらのコンテンツに「グッド」をクリックしました。',
    errorCode: 400
  },
  NOT_LIKED: {
    message: 'ユーザーはまだこれが好きではありません。',
    errorCode: 400
  }
}

export const SubscriptionPackageError = {
  SUBSCRIPTION_PACKAGE_NOT_FOUND:{
    message: '購入したパケットが見つけません。',
    errorCode: 400
  },
  USER_SUBSCRIPTION_PACKAGE_EXITED:{
    message: 'パッケージはすでに存在します',
    errorCode: 400
  },
  DELETE_PACKAGE_USER_EXIST: {
    message: 'パッケージは既存のユーザーです',
    errorCode: 400
  },
  SUBSCRIPTION_MAXIMUM_MEMBER: {
    message: 'メンバーの最大数に達しました',
    errorCode: 400
  }
}


export const PaymentError = {
  INVALID_INPUT_PARAMS: {
    message: '入力パラメーターが無効です',
    errorCode: 400
  },
  UNKNOWN_ERROR: {
    message: 'エラーサーバー',
    errorCode: 500
  },
  ACCOUNT_NUMBER_EXISTED: {
    message: 'こちらのアカウントが存在しました。',
    code: 500
  },
  ACCOUNT_NOT_FOUND: {
    message: 'アカウントが見つけません。',
    errorCode: 500
  }
}

export const ContactError = {
  CONTACT_NOT_FOUND:{
    message: 'お問い合わせが見つけません。',
    errorCode: 500
  } 
}

export const HashtagError = {
  HASHTAG_NOT_FOUND:{
    message: 'お問い合わせが見つけません。',
    errorCode: 500
  } 
}
export const FollowError = {
  HAD_FOLLOWED : {
    message: 'ユーザーはこちらのサロンをフォローしました。',
    errorCode: 500
  },
  NOT_FOLLOWED : {
    message: "ユーザーはこちらのサロンをフォローしません。",
    errorCode: 500
  }
}