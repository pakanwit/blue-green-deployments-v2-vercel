import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const updatePlanDetails = async (req, res) => {
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();

    if (req.method === 'POST') {
      const { email, planIdNum, userInput } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      try {
        user.plans[planIdNum].isFinanceIncomplete = false;
        user.plans[planIdNum].originalVer.userInput = {
          ...user.plans[planIdNum].originalVer.userInput,
          ...userInput
        };
        await user.save();
        res.status(200).json({ status: true });
      } catch (err) {
        res.status(500).json({ err });
      }
    } else {
      res.status(405).json({
        message: 'Method not allowed, only POST accepted',
      });
    }
  }


  const updateIsFinanceIncompletePlanHandlerWithApiKeyValidation = withApiKeyValidation(
    updatePlanDetails,
  );

  await updateIsFinanceIncompletePlanHandlerWithApiKeyValidation(request, response);
}
