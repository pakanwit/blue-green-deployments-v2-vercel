import { promptForSuggestionResponseFormat } from '../../../constants/prompt/firework/format';
import { splitTextByDoubleSlash } from '../../../utils/aiResponseParser/text';
import { FireworksAI } from '../../../utils/llama3/FireworksAI';
import { withApiKeyValidation } from '../utils/withApiKeyValidation';

export default async function handler(request, response) {
  const getStep4SuggestionsProductNameHandler = async (req, res) => {
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

        locale,
        variantID,
      } = req.body;

      const productNameArr = [
        productName1,
        productName2,
        productName3,
        productName4,
        productName5,
      ];
      const productDescriptionArr = [
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

      // english lang ---------------------------------------------------------------------

      let duplicationProductPromptEN = '';
      productNameArr.forEach((productName, i) => {
        if (productName) {
          duplicationProductPromptEN += `\nthis is one of the business' product name: "${productName}", don't mention "${productName}" in completion but suggest something complimentary to it.`;
        }
        if (productDescriptionArr[i]) {
          duplicationProductPromptEN += `\n this is the product description of ${productName}: ${productDescriptionArr[i]}`;
        }
      });

      let customerPromptEN = '';
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptEN += `\nthis is one of the business' existing customer description: "${customerDescription}"`;
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

        this is the business' customer details: 
        ${customerPromptEN}

        These are further instructions:
        You are a professional business consultant. and based on the business details provided come up with 5 product or service types that the business can offer. The product or service types should be separated by // (2 forward slashes). Don't use numbered list.

        ${duplicationProductPromptEN}

        Here is an example of the completion:
        "coffee//non-alcoholic drinks//snacks//cake//milkshakes"
        Don't deviate from this format.
        Don't use numbered list. 
    
        Here is what you've come up with:
        `;

      // german lang ---------------------------------------------------------

      let duplicationProductPromptDE = '';
      productNameArr.forEach((productName, i) => {
        if (productName) {
          duplicationProductPromptDE += `\nDies ist einer der Produktnamen des Unternehmens: „${productName}“, erwähnen Sie „${productName}“ nicht abschließend, sondern schlagen Sie etwas Komplementäres dazu vor.“
            `;
        }
        if (productDescriptionArr[i]) {
          duplicationProductPromptDE += `\n dies ist die Produktbeschreibung von ${productName}: ${productDescriptionArr[i]}`;
        }
      });

      let customerPromptDE = '';
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptDE += `\nDies ist eine der bestehenden Kundenbeschreibungen des Unternehmens: "${customerDescription}"`;
        }
      });

      const promptDE = `
        Dies sind die Geschäftsdaten:
        Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
        Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
        Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
        Geschäftsdetail 4: Die Anzahl der Mitarbeiter beträgt ${NEmployee}.
        Geschäftsdetail 5: Das bietet ein ${productOrService}.
        Geschäftsdetail 6: Der Vertriebskanal des Kunden ist ${salesChannel}.

        Dies sind die Kundendaten des Unternehmens:
        ${customerPromptDE}

        Dies sind weitere Anweisungen:
        Sie sind ein professioneller Unternehmensberater. Erstellen Sie auf der Grundlage der bereitgestellten Geschäftsdetails fünf Produkt- oder Dienstleistungstypen, die das Unternehmen anbieten kann. Die Produkt- oder Servicetypen sollten durch // (2 Schrägstriche) getrennt werden. Verwenden Sie keine nummerierte Liste.

        ${duplicationProductPromptDE}

        Fertigstellung auf Deutsch generieren.
        Hier ein Beispiel für die Fertigstellung:
        „Kaffee//alkoholfreie Getränke//Snacks//Kuchen//Milchshakes“
        Weichen Sie nicht von diesem Format ab.
        Verwenden Sie keine nummerierte Liste.
      
        Hier ist, was Sie erstellt haben:
        Weichen Sie nicht von diesem Format ab.
        Verwenden Sie keine nummerierte Liste.
      
        Hier ist, was Sie erstellt haben:
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
              'getStep4SuggestionsProductNameHandler: Fireworks AI recommendations',
            recommendations,
          });
          if (recommendations.length > 0) {
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
          let productNameArr = splitTextByDoubleSlash(responseText);

          productNameArr = productNameArr.map((name) => name.replace(/"/g, ''));

          if (responseText) {
            res.status(200).json(productNameArr);
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

  const getStep4SuggestionsProductNameHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep4SuggestionsProductNameHandler);

  await getStep4SuggestionsProductNameHandlerWithApiKeyValidation(
    request,
    response,
  );
}
