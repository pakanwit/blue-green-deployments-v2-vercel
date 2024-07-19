import { splitTextByDoubleSlash } from './../../../utils/aiResponseParser/text';
import { FireworksAI } from '../../../utils/llama3/FireworksAI';
import { withApiKeyValidation } from '../utils/withApiKeyValidation';
import { promptForSuggestionResponseFormat } from '../../../constants/prompt/firework/format';

export default async function handler(request, response) {
  const getStep3SuggestionsCustomerDescriptionHandler = async (req, res) => {
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
        customerIncome1,
        customerIncome2,
        customerIncome3,

        locale,

        variantID,
      } = req.body;

      const customerDescriptionArr = [
        customerDescription1,
        customerDescription2,
        customerDescription3,
      ];
      const customerIncomeArr = [
        customerIncome1,
        customerIncome2,
        customerIncome3,
      ];

      let duplicateCustomerPromptEN = '';

      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          duplicateCustomerPromptEN += `\nthis is one of the business' existing customer description: "${customerDescription}", don't mention "${customerDescription}" in your completion.`;
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

  These are further instructions:
  You are a professional business consultant. and based on the business details provided come up with 4 customer group names that the business can target. The customer group names should be seperated by // (2 forward slashes). The customer group name should be a short phrase that describes the customer group. Don't use numbered list.

  ${duplicateCustomerPromptEN}

  Here is an example of the completion:
  "Tech-savvy Millennials//Fitness Enthusiast//International Travelers//blue-collar workers"
  Don't deviate from this format.
  Don't use numbered list. 

    Here is what you've come up with:
    `;

      // german lang --------------------------------------------------------------------------

      let duplicateCustomerPromptDE = '';

      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          duplicateCustomerPromptDE += `\nDies ist eine der bestehenden Kundenbeschreibungen des Unternehmens: "${customerDescription}", erwähnen Sie "${customerDescription}" nicht in Ihrer Fertigstellung.`;
        }
      });

      const promptDE = `
Dies sind die Geschäftsdetails:
Geschäftsdetail 1: Der Name des Unternehmens des Kunden ist ${businessName}.
Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
Geschäftsdetail 3: Hier sind die Kunden des Unternehmens: ${location}.
Geschäftsdetail 4: Die Anzahl der Mitarbeiter beträgt ${NEmployee}.
Geschäftsdetail 5: Das Unternehmen bietet ein ${productOrService} an.
Geschäftsdetail 6: Der Vertriebskanal des Kunden ist ${salesChannel}.

Dies sind weitere Anweisungen:
Sie sind ein professioneller Unternehmensberater. Basierend auf den bereitgestellten Geschäftsdetails, erstellen Sie 4 Kundengruppennamen, die das Unternehmen ansprechen kann. Die Kundengruppennamen sollten durch // (2 Schrägstriche) getrennt sein. Der Name der Kundengruppe sollte eine kurze Phrase sein, die die Kundengruppe beschreibt. Verwenden Sie keine nummerierte Liste.

  ${duplicateCustomerPromptDE}

  Fertigstellung auf Deutsch generieren.
  Hier ist ein Beispiel für die Fertigstellung:
  "Technikbegeisterte Millennials//Fitnessbegeisterte//Internationale Reisende//Arbeiter im Blaumann"
  Weichen Sie nicht von diesem Format ab.
  Verwenden Sie keine nummerierte Liste.

Hier ist, was Sie erstellt haben:

  `;

      console.log('variantID', variantID);

      let finalPrompt = '';

      if (locale === 'de') {
        finalPrompt = promptDE; // Make sure promptDE is defined in your code
      } else if (locale === 'en') {
        finalPrompt = promptEN; // Make sure promptEN is defined in your code
      } else {
        console.log('no locale');
        finalPrompt = promptEN; // Default to English if no locale is provided
      }

      try {
        const basePayload = {
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 500,
          stream: false,
          n: 1,
        };
        if (variantID === '2') {
          const response = await FireworksAI(
            {
              ...basePayload,
              messages: [
                { role: 'user', content: finalPrompt },
                {
                  role: 'system',
                  content:
                    locale === 'de'
                      ? promptForSuggestionResponseFormat['de']
                      : promptForSuggestionResponseFormat['en'],
                },
              ],
            },
            'string',
          );
          const recommendations = splitTextByDoubleSlash(response);
          console.log({
            message:
              'getStep3SuggestionsCustomerDescriptionHandler: Fireworks AI recommendations',
            recommendations,
          });
          if (recommendations.length > 0) {
            console.log('used llama 3 fireworks recommendations', recommendations);
            res.status(200).json(recommendations);
          } else {
            throw new Error('response text is empty.');
          }
        } else {
          const openAIResponse = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Specify the model you want to use
                messages: [{ role: 'user', content: finalPrompt }],
                ...basePayload,
              }),
            },
          );

          const { choices } = await openAIResponse.json();
          console.log('choices', choices);
          const responseText = choices[0].message.content.trim();

          // Split the response text into an array of customer group names
          let customerDescriptionArr = splitTextByDoubleSlash(responseText);

          customerDescriptionArr = customerDescriptionArr.map((name) =>
            name.replace(/"/g, ''),
          );

          if (responseText) {
            res.status(200).json(customerDescriptionArr);
          } else {
            throw new Error('response text is empty.');
          }
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while processing your request.' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed.' });
    }
  };

  const getStep3SuggestionsCustomerDescriptionHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep3SuggestionsCustomerDescriptionHandler);

  await getStep3SuggestionsCustomerDescriptionHandlerWithApiKeyValidation(
    request,
    response,
  );
}
