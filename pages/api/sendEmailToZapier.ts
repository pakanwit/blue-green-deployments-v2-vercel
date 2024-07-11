import { NextApiRequest, NextApiResponse } from 'next';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const sendEmailToZapierHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    if (req.method === 'POST') {
      try {
        const data = {
          remarketingEmail: req.body.remarketingEmail,
          // ... other form fields
        };

        const JSONdata = JSON.stringify(data);
        const endpoint =
          'https://hooks.zapier.com/hooks/catch/5111349/3gj0jqh/';
        // Replace with your actual Zapier webhook URL

        const options = {
          method: 'POST',
          body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        const result = await response.json();
        console.log('Data sent to Zapier:', result);

        res.status(200).json(result);
      } catch (error) {
        console.error('Error sending data to Zapier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      console.log('Method Not Allowed');
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };

  const sendEmailToZapierHandlerWithApiKeyValidation = withApiKeyValidation(
    sendEmailToZapierHandler,
  );

  await sendEmailToZapierHandlerWithApiKeyValidation(request, response);
}
