import connectMongo from "../../../../database/conn";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../../../utils/sendgrid";
import { getRealUserModel } from "../../../../model/Schema";
import { withApiKeyValidation } from "../utils/withApiKeyValidation";

export default async function handler(request, response) {
  const passwordResetHandler = async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase();

    try {
      await connectMongo();
      const Users = getRealUserModel();
      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const token = crypto.randomBytes(20).toString("hex");
      const passwordResetExpires = Date.now() + 3600000; // 1 hour

      await Users.updateOne(
        { email },
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: passwordResetExpires,
          },
        }
      );

      await sendPasswordResetEmail(email, token);

      res.status(200).json({
        message:
          "Password reset link sent to your email, Please check your email",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  };

  const passwordResetHandlerWithApiKeyValidation =
    withApiKeyValidation(passwordResetHandler);

  await passwordResetHandlerWithApiKeyValidation(request, response);
}
