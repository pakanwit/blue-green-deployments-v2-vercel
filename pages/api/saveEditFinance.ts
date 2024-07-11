import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const saveEditFinanceHandler = async (req, res) => {
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log('saveEditFinance.ts running');

    // only post method is accepted
    if (req.method === 'POST') {
      if (!req.body) {
        console.log('No form data');
        return res.status(404).json({ message: "Don't have form data" });
      }
      const {
        COGSP,
        wageCostP,
        markCostP,
        rentCostP,
        genCostP,
        depreCostP,
        utilCostP,
        otherCostP,
        intCostP,
        taxCostP,
        firstYearRevenue,
        revenueGrowthRate,

        email,
        planIdNum,
      } = req.body;

      // find user by email
      const user = await Users.findOne({ email });
      if (!user) console.log('User not found');

      try {
        // Check if plans array exists and is not empty
        if (user.plans && user.plans.length > 0) {
          // Check if editedVer property exists, if not, initialize it
          if (!user.plans[planIdNum].editedVer) {
            user.plans[planIdNum].editedVer = { userInputFinance: {} };
          }
          // Now you can safely set the planContent property
          user.plans[planIdNum].editedVer.userInputFinance = {
            COGSP,
            wageCostP,
            markCostP,
            rentCostP,
            genCostP,
            depreCostP,
            utilCostP,
            otherCostP,
            intCostP,
            taxCostP,
            firstYearRevenue,
            revenueGrowthRate,
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

  const saveEditFinanceHandlerWithApiKeyValidation = withApiKeyValidation(
    saveEditFinanceHandler,
  );

  await saveEditFinanceHandlerWithApiKeyValidation(request, response);
}
