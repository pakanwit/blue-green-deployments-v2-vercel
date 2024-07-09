import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const saveEditProHandler = async (req, res) => {
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log('saveEdit.ts running');

    // only post method is accepted
    if (req.method === 'POST') {
      if (!req.body) {
        console.log('No form data');
        return res.status(404).json({ message: "Don't have form data" });
      }

      const {
        contentExec: generatedExecPro,
        contentSitu1: generatedSitu1IndKeyPro,
        contentSitu2: generatedSitu2SWOTPro,
        contentMark1: generatedMark1ObjPro,
        contentMark2: generatedMark2STPPro,
        contentMark3: generatedMark3DecisionPro,
        contentMark4: generatedMark4ProductPro,
        contentMark5: generatedMark5PriceDistPro,
        contentMark6: generatedMark6AdPro,
        contentOp1: generatedOp1ActKPIsPro,
        contentOp2: generatedOp2QCImpPlanPro,
        contentTech1: generatedTech1AllPro,
        contentTech2: generatedTech2DigiPro,
        contentMang1: generatedMang1StrucRolePro,
        contentMang2: generatedMang2RecTrainCSRPro,
        contentGrowth: generatedGrowthPro,
        contentFin: generatedFinPro,
        contentRisk: generatedRiskPro,

        userEmail: email,
        planIdNum,
      } = req.body;

      // find user by email
      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      try {
        // Check if plans array exists and is not empty
        if (user.plans && user.plans.length > 0) {
          // Check if editedVer property exists, if not, initialize it
          if (!user.plans[planIdNum].editedVer) {
            user.plans[planIdNum].editedVer = { planContent: {} };
          }
          // Now you can safely set the planContent property
          user.plans[planIdNum].editedVer.planContent = {
            generatedExecPro,
            generatedSitu1IndKeyPro,
            generatedSitu2SWOTPro,
            generatedMark1ObjPro,
            generatedMark2STPPro,
            generatedMark3DecisionPro,
            generatedMark4ProductPro,
            generatedMark5PriceDistPro,
            generatedMark6AdPro,
            generatedOp1ActKPIsPro,
            generatedOp2QCImpPlanPro,
            generatedTech1AllPro,
            generatedTech2DigiPro,
            generatedMang1StrucRolePro,
            generatedMang2RecTrainCSRPro,
            generatedGrowthPro,
            generatedFinPro,
            generatedRiskPro,
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
      console.log('Method not allowed, only POST accepted');
      res.status(405).json({
        message: 'Method not allowed, only POST accepted',
      });
    }
  };

  const saveEditProHandlerWithApiKeyValidation =
    withApiKeyValidation(saveEditProHandler);

  await saveEditProHandlerWithApiKeyValidation(request, response);
}
