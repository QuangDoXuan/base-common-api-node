
export enum ImageStatus {
  PENDDING = 1,
  CONFIRMED = 2,
  ALL = 3,
}

export enum TimeZone {
  JAPAN = "Asia/Tokyo",
  VIETNAM = "Asia/Saigon",
  US = "America/New_York",
}

export enum ConfirmType {
  CONFIRM_AGE = 1,
}

export enum PaymentType {
  MONTH =1,
  YEAR = 2
}
export enum MemberType {
  USER = 1,
  OWNER = 2,
  ADMIN = 3
}

export enum MemberTypeString {
  USER = 'User',
  TEACHER = 'Teacher',
  ADMIN = 'Admin'
}

export enum UserStatus {
  UNVERIFY = 0,
  VERIFY = 1
}
export enum SenderType {
  USER = 1,
  OWNER = 2,
}

export enum ImageRelateTo {
  TOPIC = 'Topic'
}
export enum LoginType {
  EMAIL = 1,
  FACEBOOK = 2,
  GOOGLE = 3
}
export enum SortType {
  DESC = 'DESC',
  ASC = 'ASC'
}
export enum SortBy {
  DATE = 'createdAt',
  SALONID = 'salonId',
}

export enum VideoSortBy {
  DATE = 'createdAt',
  LIKE = 'Like',
  COMMENT = 'Comment',
  VIEW = 'View'
}
export enum PaymentTransactionStatus {
  COMPLETED = 1,
  PENDING = 2,
  DENIED = 3,
  REFUNDED = 4
}
export enum ContactStatus {
  NOT_SUPPORT = 1,
  SUPPORTED = 2
}
export enum TargetType {
  TOPIC = "Topic",
  VIDEO = "Video",
  COMMENT = "Comment",
  PACKAGE = "Package"
}


