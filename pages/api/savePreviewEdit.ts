import connectMongo from '../../database/conn';
import { getPreviewEditsModel } from '../../model/SchemaPreviewEdits';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const savePreviewEditHandler = async (req, res) => {
    console.log('savePreviewEdit executing');
    await connectMongo().catch((error) => res.json({ error: error.message }));

    const PreviewEdits = getPreviewEditsModel();
    console.log('PreviewEdits model:', PreviewEdits);

    if (req.method === 'POST') {
      if (!req.body) {
        console.log('No form data');
        return res.status(404).json({ message: "Don't have form data" });
      }

      const { editInput, sectionOrigin } = req.body;

      console.log('editInput:', editInput);
      console.log('sectionOrigin:', sectionOrigin);

      try {
        let previewEdits = await PreviewEdits.findOne();
        if (!previewEdits) {
          previewEdits = new PreviewEdits();
        }

        if (sectionOrigin === 'Exec') {
          previewEdits.previewEditExec.push(editInput);
        } else if (sectionOrigin === 'Situ1') {
          previewEdits.previewEditSitu1.push(editInput);
        } else if (sectionOrigin === 'Situ2') {
          previewEdits.previewEditSitu2.push(editInput);
        } else if (sectionOrigin === 'Mark1') {
          previewEdits.previewEditMark1.push(editInput);
        } else if (sectionOrigin === 'Mark2') {
          previewEdits.previewEditMark2.push(editInput);
        } else {
          return res
            .status(400)
            .json({ message: `Invalid sectionOrigin: ${sectionOrigin}` });
        }

        await previewEdits.save();
        res.status(200).json({ status: true, previewEdits });
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

  const savePreviewEditHandlerWithApiKeyValidation = withApiKeyValidation(
    savePreviewEditHandler,
  );

  await savePreviewEditHandlerWithApiKeyValidation(request, response);
}
