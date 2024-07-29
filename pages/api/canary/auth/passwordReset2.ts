import connectMongo from "../../../../database/conn";
import bcrypt from "bcryptjs";
import { getRealUserModel } from "../../../../model/Schema"; // Import the Users model
import { withApiKeyValidation } from "../utils/withApiKeyValidation";

export default async function handler(request, response) {
  const passwordReset2Handler = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      await connectMongo();
      const Users = getRealUserModel();
      const user = await Users.findOne({ passwordResetToken: token });

      if (!user || user.passwordResetExpires.getTime() < Date.now()) {
        return res
          .status(400)
          .json({ error: "Token is invalid or has expired" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await Users.updateOne(
        { passwordResetToken: token },
        {
          $set: {
            password: hashedPassword,
          },
          $unset: {
            passwordResetToken: "",
            passwordResetExpires: "",
          },
        }
      );

      res.status(200).json({ message: "Password successfully reset" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  };

  const passwordReset2HandlerWithApiKeyValidation = withApiKeyValidation(
    passwordReset2Handler
  );

  await passwordReset2HandlerWithApiKeyValidation(request, response);
}
