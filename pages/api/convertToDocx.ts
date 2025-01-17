import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(request, response) {
  const convertToDocxHandler = async (req, res) => {
    const { htmlContent } = req.body;
    const YOUR_API_KEY = process.env.CONVERTAPI_API_SECRET;

    const base64HtmlContent = Buffer.from(htmlContent).toString('base64');

    const response = await fetch(
      `https://v2.convertapi.com/convert/html/to/docx?Secret=${YOUR_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Parameters: [
            {
              Name: 'File',
              FileValue: {
                Name: 'FullPlan.html',
                Data: base64HtmlContent,
              },
            },
            {
              Name: 'StoreFile',
              Value: true,
            },
          ],
        }),
      },
    );

    console.log('response:', response);

    if (response.ok) {
      const jsonResponse = await response.json();
      const url = jsonResponse.Files[0].Url;

      const fileResponse = await fetch(url);
      const outputFileBlob = await fileResponse.arrayBuffer();
      const base64data = Buffer.from(outputFileBlob).toString('base64');

      res.status(200).json({ base64data, filename: 'FullPlan.docx' });
    } else {
      const jsonResponse = await response.json();
      console.error(
        'Error converting document:',
        response.status,
        response.statusText,
        jsonResponse,
      );
      res.status(500).json({ error: 'Conversion failed' });
    }
  };

  const convertToDocxHandlerWithApiKeyValidation =
    withApiKeyValidation(convertToDocxHandler);

  await convertToDocxHandlerWithApiKeyValidation(request, response);
}
