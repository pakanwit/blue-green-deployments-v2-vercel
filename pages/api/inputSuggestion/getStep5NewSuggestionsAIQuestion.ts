import { withApiKeyValidation } from '../utils/withApiKeyValidation';
import z from 'zod';
import { FireworksAIObject } from '../../../utils/llama3/FireworksAIObject';

export default async function handler(request, response) {
  const getStep5SuggestionsKeySuccessHandler = async (req, res) => {
    if (req.method === 'POST') {
      const {
        businessName,
        businessType,
        NEmployee,
        location,
        productOrService,
        salesChannel,

        customerDescription1,
        customerDescription2,
        customerDescription3,

        productName1,
        productName2,
        productName3,
        productName4,
        productName5,
        productDescription1,
        productDescription2,
        productDescription3,
        productDescription4,
        productDescription5,

        successFactors1,
        successFactors2,
        successFactors3,

        locale,
        question,
      } = req.body;
      const productNames = [
        productName1,
        productName2,
        productName3,
        productName4,
        productName5,
      ];
      const productDescriptions = [
        productDescription1,
        productDescription2,
        productDescription3,
        productDescription4,
        productDescription5,
      ];

      const customerDescriptionArr = [
        customerDescription1,
        customerDescription2,
        customerDescription3,
      ];

      const customerIncomeArr = [
        productDescription1,
        productDescription2,
        productDescription3,
        productDescription4,
        productDescription5,
      ];

      const duplicateSuccessFactorsArr = [
        successFactors1,
        successFactors2,
        successFactors3,
      ];
      //english lang-------------------------------------------------------------------
      let productPromptEN = '';
      productNames.forEach((productName, i) => {
        if (productName) {
          productPromptEN += `\nthis is one of the business' product name: ${productName}`;
        }
        if (productDescriptions[i]) {
          productPromptEN += `\n this is the product description of ${productName}: ${productDescriptions[i]}`;
        }
      });
      let customerPromptEN = '';
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptEN += `\nthis is one of the business' customer description: ${customerDescription}`;
        }
        if (customerIncomeArr[i]) {
          customerPromptEN += `\n this is the income level of ${customerDescription}: ${customerIncomeArr[i]}`;
        }
      });

      let duplicateSuccessFactorsPromptEN = '';
      duplicateSuccessFactorsArr.forEach((successFactor, i) => {
        if (successFactor) {
          duplicateSuccessFactorsPromptEN += `\nthis is one of the business' key success factor: "${successFactor}", don't mention "${successFactor}" in completion.`;
        }
      });

      const promptEN = `
        These are the business details:
        business detail 1: The client's business name is ${businessName}.
        business detail 2: The type of business is ${businessType}. 
        business detail 3: This is where the business's customers are: ${location}.
        business detail 4: The number of employee is ${NEmployee}.
        business detail 5: The offers a ${productOrService}.
        business detail 6: The client's distribution channel is ${salesChannel}.

        These are the customer details:
        ${customerPromptEN}

        These are the product details:
        ${productPromptEN}

        Generate 3 insightful answer to this question as it pretains to this business: ${question}

        ${duplicateSuccessFactorsPromptEN}

        here is an example of completion:
        We have an answer1//answer2//answer3
        Don't deviate from this format.
        Don't use numbered list. 

        Here is what you've come up with:
        `;

      //german lan-------------------------------------------------------------------
      let productPromptDE = '';
      productNames.forEach((productName, i) => {
        if (productName) {
          productPromptDE += `\ndies ist einer der Produktnamen des Unternehmens: ${productName}`;
        }
        if (productDescriptions[i]) {
          productPromptDE += `\n dies ist die Produktbeschreibung von ${productName}: ${productDescriptions[i]}`;
        }
      });

      let customerPromptDE = '';
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptDE += `\ndies ist eine der Kundenbeschreibungen des Unternehmens: ${customerDescription}`;
        }
        if (customerIncomeArr[i]) {
          customerPromptDE += `\n das ist das Einkommensniveau von ${customerDescription}: ${customerIncomeArr[i]}`;
        }
      });

      let duplicateSuccessFactorsPromptDE = '';
      duplicateSuccessFactorsArr.forEach((successFactor, i) => {
        if (successFactor) {
          duplicateSuccessFactorsPromptDE += `\n Dies ist einer der wichtigsten Erfolgsfaktoren des Unternehmens: „${successFactor}“, erwähnen Sie „${successFactor}“ nicht am Ende.`;
        }
      });

      const promptDE = `
      Dies sind die Geschäftsdaten:
      Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
      Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
      Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
      Geschäftsdaten 4: Die Anzahl der Mitarbeiter beträgt ${NEmployee}.
      Geschäftsdaten 5: Das Unternehmen bietet ein ${productOrService} an.
      Geschäftsdaten 6: Der Vertriebskanal des Kunden ist ${salesChannel}.

      Dies sind die Kundendaten:
      ${customerPromptDE}

      Dies sind die Produktdetails:
      ${productPromptDE}

      Generieren Sie 3 aufschlussreiche Antworten auf diese Frage, wie sie sich auf dieses Unternehmen bezieht: ${question}

      ${duplicateSuccessFactorsPromptDE}

      Hier ist ein Beispiel für eine Fertigstellung:
      Wir haben eine Antwort1//Antwort2//Antwort3
      Weichen Sie nicht von diesem Format ab.
      Verwenden Sie keine nummerierte Liste.

      Hier ist, was Sie sich ausgedacht haben:
        `;

      let finalPrompt = '';

      if (locale === 'de') {
        finalPrompt = promptDE;
      } else if (locale === 'en') {
        finalPrompt = promptEN;
      } else {
        console.log('no locale');
        finalPrompt = promptEN;
      }
      try {
        const payload = {
          max_tokens: 1024,
          top_p: 1,
          top_k: 40,
          presence_penalty: 0,
          frequency_penalty: 0,
          temperature: 0.6,
          schema: z.object({
            suggest1: z.string(),
            suggest2: z.string(),
            suggest3: z.string(),
          }),
          messages: [
            {
              role: 'system',
              content: 'You are an insightful business consultant',
            },
            {
              role: 'user',
              content: finalPrompt,
            },
          ],
        };

        const result = (await FireworksAIObject(payload)) as string;

        const AIGeneratedQAArr = Object.values(JSON.parse(result));

        if (AIGeneratedQAArr.length > 0) {
          res.status(200).json(AIGeneratedQAArr);
        } else {
          throw new Error('response text is empty.');
        }
      } catch (error) {
        console.log('error:-----', error);
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while processing your request.' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed.' });
    }
  };

  const getStep5SuggestionsKeySuccessHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep5SuggestionsKeySuccessHandler);

  await getStep5SuggestionsKeySuccessHandlerWithApiKeyValidation(
    request,
    response,
  );
}
