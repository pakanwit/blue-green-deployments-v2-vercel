import { Schema, model, models, Model } from 'mongoose';

export interface IReviewsResponse {
  customerName: string;
  customerPicture: string;
  customerPictureSize?: { width: number; height: number };
  ratingUrl: string;
  reviewText: string;
  reviewUrl: string;
  reviewTitle: string;
  stars: number;
  id: string;
}

export interface ITrustpilotInvitationLinksResponse {
  url: string;
  id: string;
  error?: string;
}

interface IEditInput {
  editInputExecs: string[];
  editInputSitu1s: string[];
  editInputSitu2s: string[];
  editInputMark1s: string[];
  editInputMark2s: string[];
  editInputMark3s: string[];
  editInputMark4s: string[];
  editInputMark5s: string[];
  editInputMark6s: string[];
  editInputOp1s: string[];
  editInputOp2s: string[];
  editInputTech1s: string[];
  editInputTech2s: string[];
  editInputMang1s: string[];
  editInputMang2s: string[];
  editInputGrowths: string[];
  editInputRisks: string[];
}

interface IPlanContent {
  planContent?: object;
  editInput?: IEditInput;
  userInputFinance?: object;
}

export interface IPlan {
  originalVer: {
    userInput: object;
    planContent: object;
    refId: string;
  };
  editedVer?: IPlanContent;
  _id?: string;
  isFinanceIncomplete?: boolean;
}

export interface ISurveyResult {
  whatTheyDislike?: string;
  whatTheyLike?: string;
  RecScore?: number;
  priceThought?: string;
  hasReadPlan?: string;
  createdAt?: Date;
}

export interface IRealUsers {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  paymentId?: string;
  paymentStatus: string;
  phoneNumber?: string;
  plans: IPlan[];
  planQuota: number;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  surveyResult?: ISurveyResult;
  surveyResult2?: ISurveyResult;
  createdAt: Date;
  emergencyPassword?: string;
  editQuota?: number;
  experimentID?: string;
  variantID?: string;
  Ido?: string;
  planPackage: string;
  OTPused?: boolean;
  country?: string;
  locale?: string;
  trustpilotInvitationId?: string;
}

export interface IRealUserModel extends Model<IRealUsers> {}

const editInputSchema = new Schema<IEditInput>({
  editInputExecs: [String],
  editInputSitu1s: [String],
  editInputSitu2s: [String],
  editInputMark1s: [String],
  editInputMark2s: [String],
  editInputMark3s: [String],
  editInputMark4s: [String],
  editInputMark5s: [String],
  editInputMark6s: [String],
  editInputOp1s: [String],
  editInputOp2s: [String],
  editInputTech1s: [String],
  editInputTech2s: [String],
  editInputMang1s: [String],
  editInputMang2s: [String],
  editInputGrowths: [String],
  editInputRisks: [String],
});

const planContentSchema = new Schema<IPlanContent>({
  planContent: Object,
  editInput: editInputSchema,
  userInputFinance: Object,
});

const planSchema = new Schema<IPlan>({
  originalVer: {
    userInput: Object,
    planContent: Object,
    refId: String,
  },
  editedVer: planContentSchema,
  isFinanceIncomplete: Boolean,
  _id: String,
});

const realUserSchema = new Schema<IRealUsers>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: String,
  lastName: String,
  image: String,
  paymentId: String,
  paymentStatus: String,
  phoneNumber: String,
  plans: [planSchema],
  planQuota: Number,
  passwordResetToken: String,
  passwordResetExpires: Date,
  surveyResult: Object,
  createdAt: { type: Date, default: Date.now },
  emergencyPassword: { type: String, minlength: 6 },
  editQuota: Number,
  experimentID: String,
  variantID: String,
  Ido: String,
  planPackage: String,
  OTPused: Boolean,
  country: String,
  surveyResult2: Object,
  trustpilotInvitationId: String,
});

export function getRealUserModel(): IRealUserModel {
  if (models.realusers_new) {
    return models.realusers_new as IRealUserModel;
  }
  return model<IRealUsers, IRealUserModel>(
    'realusers_new',
    realUserSchema,
    'realusers_new',
  );
}
