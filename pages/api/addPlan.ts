import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const addPlanHandler = async (req, res) => {
    console.log('handler executing');
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log('Users model:', Users);

    // only post method is accepted
    if (req.method === 'POST') {
      if (!req.body)
        return res.status(404).json({ message: "Don't have form data" });
      const { email, newPlan } = req.body;

      // find user by email
      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      // check if user has available quota
      if (user.planQuota < 1)
        return res.status(403).json({ message: 'No plan quota available' });

      try {
        const plan = {
          originalVer: newPlan,
        };
        // add the new plan to the plans array and decrement planQuota
        user.plans.push(plan);
        user.planQuota -= 1;

        // save the updated user
        const updatedUser = await user.save();
        res.status(200).json({ status: true, user: updatedUser });
      } catch (err) {
        res.status(500).json({ err });
      }
    } else {
      res.status(405).json({
        message: 'Method not allowed, only POST accepted',
      });
    }
  };

  const addPlanHandlerWithApiKeyValidation =
    withApiKeyValidation(addPlanHandler);

  await addPlanHandlerWithApiKeyValidation(request, response);
}
