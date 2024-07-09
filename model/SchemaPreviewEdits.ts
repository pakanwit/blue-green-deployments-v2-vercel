import { Schema, model, models, Model } from "mongoose";

interface IPreviewEdits {
  previewEditExec: string[];
  previewEditSitu1: string[];
  previewEditSitu2: string[];
  previewEditMark1: string[];
  previewEditMark2: string[];
}

export interface IPreviewEditsModel extends Model<IPreviewEdits> {}

const previewEditsSchema = new Schema<IPreviewEdits>({
  previewEditExec: [String],
  previewEditSitu1: [String],
  previewEditSitu2: [String],
  previewEditMark1: [String],
  previewEditMark2: [String],
});

export function getPreviewEditsModel(): IPreviewEditsModel {
  if (models.PreviewEdits) {
    return models.PreviewEdits as IPreviewEditsModel;
  }
  return model<IPreviewEdits, IPreviewEditsModel>("PreviewEdits", previewEditsSchema, "preview_edits");
}
