import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const updateEditQuotaHandler = async (req, res) => {
    console.log('handler executing');
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log('Users model:', Users);

    if (req.method === 'POST') {
      if (!req.body)
        return res.status(404).json({ message: "Don't have form data" });
      const { email } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      try {
        if (user.editQuota > 0) {
          user.editQuota -= 1;
        }

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

  const updateEditQuotaHandlerWithApiKeyValidation = withApiKeyValidation(
    updateEditQuotaHandler,
  );

  await updateEditQuotaHandlerWithApiKeyValidation(request, response);
}
