import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { getSession } from 'next-auth/react';

export default async function handler(request, response) {
  const getAllUserDataHandler = async (req, res) => {
    await connectMongo().catch((error) => res.json({ error: error.message }));

    if (req.method === 'GET') {
      try {
        const session = await getSession({ req });
        console.log('getAllUserData, Session', session);
        if (!session) {
          return res.status(401).json({ message: 'Not authenticated' });
        }
        const Users = getRealUserModel();
        const user = await Users.findOne({ email: session.user.email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        if (user.paymentStatus !== 'paid') {
          return res
            .status(403)
            .json({ message: 'Access denied, payment required' });
        }

        res.status(200).json({
          ...user.toObject(),
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

  await getAllUserDataHandler(request, response);
}
