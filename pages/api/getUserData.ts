import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { getSession } from 'next-auth/react';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const getUserDataHandler = async (req, res) => {
    await connectMongo().catch((error) => res.json({ error: error.message }));

    if (req.method === 'GET') {
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ message: 'Not authenticated' });
        }
        const Users = getRealUserModel();
        const user = await Users.findOne({ email: session.user.email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Get planId from the query parameter, default to 0 if not provided
        const planId = req.query.planId ? parseInt(req.query.planId) : 0;

        // Check if the planId is within the valid range
        if (planId < 0 || planId >= user.plans.length) {
          return res.status(400).json({ message: 'Invalid planId' });
        }

        // Return the specific plan based on the planId and the latest plan id
        res.status(200).json({
          ...user.toObject(),
          plans: [user.plans[planId]],
          latestPlanID: user.plans.length - 1,
        });
      } catch (err) {
        res.status(500).json({ message: 'Error fetching data' });
      }
    } else {
      res
        .status(405)
        .json({ message: 'Method not allowed, only GET accepted' });
    }
  };

  const getUserDataHandlerWithApiKeyValidation =
    withApiKeyValidation(getUserDataHandler);

  await getUserDataHandlerWithApiKeyValidation(request, response);
}
