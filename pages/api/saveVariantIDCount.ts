import connectMongo from '../../database/conn';
import { getVariantCountModel } from '../../model/SchemaVariantCount';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const saveVariantIDCountHandler = async (req, res) => {
    console.log('saveVariantID executing');
    await connectMongo().catch((error) => res.json({ error: error.message }));

    const VariantCount = getVariantCountModel();
    console.log('VariantCount model:', VariantCount);

    if (req.method === 'POST') {
      if (!req.body || !req.body.variantID) {
        console.log('No variantID');
        return res.status(404).json({ message: "Don't have variantID" });
      }

      const { variantID, experimentID } = req.body;

      console.log('variantID:', variantID);

      try {
        let variantCount = await VariantCount.findOne({
          experimentID: experimentID,
        });
        if (!variantCount) {
          variantCount = new VariantCount({
            experimentID: experimentID,
            variantID1Count: 0,
            variantID2Count: 0,
          });
        }

        if (variantID === '1') {
          variantCount.variantID1Count++;
        } else if (variantID === '2') {
          variantCount.variantID2Count++;
        } else {
          return res
            .status(400)
            .json({ message: `Invalid variantID: ${variantID}` });
        }

        await variantCount.save();
        res.status(200).json({ status: true, variantCount });
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

  const saveVariantIDCountHandlerWithApiKeyValidation = withApiKeyValidation(
    saveVariantIDCountHandler,
  );

  await saveVariantIDCountHandlerWithApiKeyValidation(request, response);
}
