import { float } from "aws-sdk/clients/frauddetector";

export interface ReportData {
  reporterId: string;
  targetId: string;
  content: string;
}

export interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  signUpBy?: number;
  verifyToken?: string;
  wallet?: float;
  lastLogin?: number;
  notification?: boolean;
  role?: number;
  status?: number;
  pageSize?: number;
  pageIndex?: number;
  lastLoginLower?: number;
  lastLoginUpper?: number;
  provinceId?: number;
  contactEmail?: string;
  softDelete?: boolean;
  updatedAt?:string|Date;
  expiredToken?: Date;
}

export interface ProfileMappingData {
  profileId: number;
  profile_infoId: number;
  value: string;
}

export interface BlockData {
  blockerId: string;
  targetId: string;
  block: number;
}

export interface LikeData {
  likerId: string;
  targetId: string;
}

export interface ContactData {
  userId: string;
  email: string;
  fullname: string;
  title: string;
  content: string;
  phone_number: string;
  type: number;
  created_date: number;
  url: string;
}

export interface ConversationData {
  senderId: string;
  receiverId: string;
}

export interface ImageData {
  userId: string;
  url: string;
  type: number;
  status: number;
}

export interface MessageData {
  conversationId: string;
  senderId: string;
  content: string;
  type: number;
  status: number;
}

export interface OtpData {
  userId: string;
  code: string;
  status: number;
}

export interface ProfileData {
  userId: string;
  avatarId: string;
  address: string;
  birthday: Date;
  birthplaceId: string;
  bloodtypeId: string;
  bodytypeId: string;
  educationId: string;
  height: number;
  salaryId: string;
  holidayId: string;
  jobId: string;
  nickname: string;
  personality: string;
  process: string;
  provinceId: string;
  sake: string;
  sex: string;
  tabaco: string;
}

export interface TaskData {
  userId: string;
  token_purchase: string;
  point: number;
  price: number;
  title: string;
  type: number;
  payment_type: string;
  created_date: number;
}

export interface PointData {
  userId: string;
  point: number;
  type: number;
  metadata: JSON;
}

export interface CampaignData {
  name: string;
  display_url: string;
  url: string;
  place: string;
  position: string;
  rank: number;
  sex: number;
  start_time: number;
  end_time: number;
  storage_path: string;
  created_date: number;
}

export interface SearchData {
  userId: string;
  avatar: number;
  age_from: number;
  age_to: number;
  provinces: string;
  height_from: number;
  height_to: number;
  bodytypes: string;
  personalities: string;
  jobs: string;
  incomes: string;
  sakes: string;
  tabacos: string;
  bloodtypes: string;
  birthplaces: string;
  educations: string;
  processes: string;
  holidays: string;
  created_date: number;
}
export interface ConfirmData {
  userId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  url: string;
  type: number;
}
export interface ContactEmailType {
  userName: string,
  userMail?: string,
  link?: string,
  packageName: string,
  description: string,
  orderId: string | number,
  price: number,
  date: string | Date,
  ownerName?: string,
  ownerMail?: string,
  phone?: string,
  address?: string,
  salonName?: string
}
