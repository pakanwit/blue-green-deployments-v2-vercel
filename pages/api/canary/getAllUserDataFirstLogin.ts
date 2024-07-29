import connectMongo from "../../../database/conn";
import { getRealUserModel } from "../../../model/Schema";
import { getSession } from "next-auth/react";
import { withApiKeyValidation } from "./utils/withApiKeyValidation";

export default async function handler(request, response) {
  const getAllUserDataFirstLoginHandler = async (req, res) => {
    await connectMongo().catch((error) => res.json({ error: error.message }));

    if (req.method === "POST") {
      try {
        const { email, Ido } = req.body;
        console.log("email from getAllUserDataFirstLogin: ", email);
        console.log("Ido from getAllUserDataFirstLogin: ", Ido);
        if (!email) {
          return res.status(401).json({ message: "No email" });
        }
        const Users = getRealUserModel();
        const user = await Users.findOne({ email: email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if (user.paymentStatus !== "paid") {
          return res
            .status(403)
            .json({ message: "Access denied, payment required" });
        }

        await Users.updateOne(
          { email: email },
          {
            $unset: { Ido: "" },
            $set: { OTPused: true },
          }
        );

        res
          .status(200)
          .json({ ...user.toObject(), latestPlanID: user.plans.length - 1 });
      } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
      }
    } else {
      res
        .status(405)
        .json({ message: "Method not allowed, only POST accepted" });
    }
  };

  const getAllUserDataFirstLoginHandlerWithApiKeyValidation =
    withApiKeyValidation(getAllUserDataFirstLoginHandler);

  await getAllUserDataFirstLoginHandlerWithApiKeyValidation(request, response);
}
