// updateUser.js
import connectMongo from '../../database/conn';
import { getRealUserModel } from '../../model/Schema';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const updateUserVariantIDHandler = async (req, res) => {
    await connectMongo().catch((error) => res.json({ error: error.message }));

    if (req.method === 'POST') {
      const Users = getRealUserModel();
      const { email, variantID } = req.body;

      if (!email || !variantID) {
        return res
          .status(400)
          .json({ message: 'Email and variantID are required' });
      }

      try {
        const updatedUser = await Users.findOneAndUpdate(
          { email: email },
          { variantID: variantID },
          { new: true }, // returns the updated document
        );

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ ...updatedUser.toObject() });
      } catch (err) {
        res.status(500).json({ message: 'Error updating data' });
      }
    } else {
      res
        .status(405)
        .json({ message: 'Method not allowed, only POST accepted' });
    }
  };

  const updateUserVariantIDHandlerWithApiKeyValidation = withApiKeyValidation(
    updateUserVariantIDHandler,
  );

  await updateUserVariantIDHandlerWithApiKeyValidation(request, response);
}
