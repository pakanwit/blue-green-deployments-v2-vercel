import connectMongo from "../../../database/conn";
import { getRealUserModel } from "../../../model/Schema";
import { withApiKeyValidation } from "./utils/withApiKeyValidation";

export default async function handler(request, response) {
  const saveEditStarterHandler = async (req, res) => {
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log("saveEdit.ts running");

    // only post method is accepted
    if (req.method === "POST") {
      if (!req.body) {
        console.log("No form data");
        return res.status(404).json({ message: "Don't have form data" });
      }
      const {
        userEmail: email,
        contentExec: editedExec,
        contentSitu: editedSitu,
        contentMark1: editedMark1,
        contentMark2: editedMark2,
        contentMark3: editedMark3,
        contentOp: editedOp,
        contentMang: editedMang,
        contentFin: editedFin,
        contentRisk: editedRisk,

        planIdNum,
      } = req.body;

      // find user by email
      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      try {
        // Check if plans array exists and is not empty
        if (user.plans && user.plans.length > 0) {
          // Check if editedVer property exists, if not, initialize it
          if (!user.plans[planIdNum].editedVer) {
            user.plans[planIdNum].editedVer = { planContent: {} };
          }
          // Now you can safely set the planContent property
          user.plans[planIdNum].editedVer.planContent = {
            editedExec,
            editedSitu,
            editedMark1,
            editedMark2,
            editedMark3,
            editedOp,
            editedMang,
            editedFin,
            editedRisk,
          };
        } else {
          // Handle the case where plans array is empty or does not exist
          // You might want to initialize the plans array and the editedVer object here
        }

        // save the updated user
        const updatedUser = await user.save();
        res.status(200).json({ status: true, user: updatedUser });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err });
      }
    } else {
      console.log("Method not allowed, only POST accepted");
      res.status(405).json({
        message: "Method not allowed, only POST accepted",
      });
    }
  };

  const saveEditStarterHandlerWithApiKeyValidation = withApiKeyValidation(
    saveEditStarterHandler
  );

  await saveEditStarterHandlerWithApiKeyValidation(request, response);
}
