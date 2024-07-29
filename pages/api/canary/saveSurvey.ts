import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";
import { getRealUserModel } from "../../../model/Schema";
import { withApiKeyValidation } from "./utils/withApiKeyValidation";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const saveSurveyHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    await connectMongo();

    if (req.method === "POST") {
      const { email, surveyResult, isSecondSurvey } = req.body;

      if (!email || !surveyResult) {
        return res
          .status(400)
          .json({ message: "Missing email or surveyResult" });
      }
      const Users = getRealUserModel();
      try {
        const user = await Users.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Add the surveyResult to the user
        if (isSecondSurvey) {
          await Users.updateOne(
            { email },
            { $set: { surveyResult2: surveyResult } }
          );
        } else {
          await Users.updateOne(
            { email },
            { $set: { surveyResult: surveyResult } }
          );
        }

        return res.status(200).json({ message: "Survey result saved" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error saving survey result", error });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  };

  const saveSurveyHandlerWithApiKeyValidation =
    withApiKeyValidation(saveSurveyHandler);

  await saveSurveyHandlerWithApiKeyValidation(request, response);
}
