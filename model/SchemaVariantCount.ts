import { Schema, model, models, Model } from "mongoose";

interface IVariantCount {
  experimentID: string;
  variantID1Count: number;
  variantID2Count: number;
}

export interface IVariantCountModel extends Model<IVariantCount> {}

const variantCountSchema = new Schema<IVariantCount>({
  experimentID: String,
  variantID1Count: { type: Number, default: 0 },
  variantID2Count: { type: Number, default: 0 },
});

export function getVariantCountModel(): IVariantCountModel {
  if (models.VariantCount) {
    return models.VariantCount as IVariantCountModel;
  }
  return model<IVariantCount, IVariantCountModel>("VariantCount", variantCountSchema, "variant_count");
}
