import { withApiKeyValidation } from '../utils/withApiKeyValidation';

export default async function handler(request, response) {
  const getStep6SuggestionsInvestmentItemHandler = async (req, res) => {
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

        successFactors1,
        successFactors2,
        successFactors3,

        weakness1,
        weakness2,
        weakness3,

        investmentItem1,
        investmentItem2,
        investmentItem3,
        investmentItem4,
        investmentItem5,
        investmentItem6,
        investmentItem7,
        investmentItem8,
        investmentItem9,
        investmentItem10,

        locale,
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
        productName1,
        productName2,
        productName3,
        productName4,
        productName5,
      ];
      const customerIncomeArr = [
        productDescription1,
        productDescription2,
        productDescription3,
        productDescription4,
        productDescription5,
      ];

      const duplicatesuccessFactorsArr = [
        successFactors1,
        successFactors2,
        successFactors3,
      ];
      const duplicateWeaknessArr = [weakness1, weakness2, weakness3];

      const duplicateInvestmentItemArr = [
        investmentItem1,
        investmentItem2,
        investmentItem3,
        investmentItem4,
        investmentItem5,
        investmentItem6,
        investmentItem7,
        investmentItem8,
        investmentItem9,
        investmentItem10,
      ];

      //english lang------------------------------------------------------------------------

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
      duplicatesuccessFactorsArr.forEach((successFactor, i) => {
        if (successFactor) {
          duplicateSuccessFactorsPromptEN += `\nthis is one of the business' key success factor: "${successFactor}", don't mention "${successFactor}" in completion.`;
        }
      });

      let duplicateWeaknessPromptEN = '';
      duplicateWeaknessArr.forEach((weakness, i) => {
        if (weakness) {
          duplicateWeaknessPromptEN += `\nthis is one of the business' weakness: "${weakness}", don't mention "${weakness}" in completion.`;
        }
      });

      let duplicateInitialInvestmentItemPromptEN = '';
      duplicateInvestmentItemArr.forEach((investmentItem, i) => {
        if (investmentItem) {
          duplicateInitialInvestmentItemPromptEN += `\nthis is one of the investment item: "${investmentItem}", don't mention "${investmentItem}" in completion.`;
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

      These are the product details:
      ${productPromptEN}

      These are further instructions:
      You are a professional business consultant. and based on the business details provided come up with 3 of the most important initial investment item for this business. Each investment item should be a short phrase. each phrase should be separated by // (2 forward slashes). don't use numbered list. don't use semi colons or colons. If the business is physical-store-based construction and renovation maybe important investment item and should be included in your completion.

      ${duplicateInitialInvestmentItemPromptEN}

      here is an example of completion:
      construction//equipment purchase//working capital
      Don't deviate from this format.
      Don't use numbered list.

      Here is what you've come up with:
      `;

      // german lang---------------------------------------------------------------------

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
      duplicatesuccessFactorsArr.forEach((successFactor, i) => {
        if (successFactor) {
          duplicateSuccessFactorsPromptDE += `\n Dies ist einer der wichtigsten Erfolgsfaktoren des Unternehmens: „${successFactor}“, erwähnen Sie „${successFactor}“ nicht am Ende.`;
        }
      });

      let duplicateWeaknessPromptDE = '';
      duplicateWeaknessArr.forEach((weakness, i) => {
        if (weakness) {
          duplicateWeaknessPromptDE += `\n Dies ist eine der Schwächen des Unternehmens: „${weakness}“, erwähnen Sie „${weakness}“ nicht abschließend.`;
        }
      });

      let duplicateInitialInvestmentItemPromptDE = '';
      duplicateInvestmentItemArr.forEach((investmentItem, i) => {
        if (investmentItem) {
          duplicateInitialInvestmentItemPromptDE += `\n Dies ist einer der Investitionsartikel: „${investmentItem}“. Erwähnen Sie „${investmentItem}“ nicht zur Vervollständigung.`;
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

      Dies sind die Produktdetails:
      ${productPromptDE}

      Dies sind weitere Anweisungen:
      Sie sind ein professioneller Unternehmensberater. und ermitteln Sie anhand der bereitgestellten Geschäftsdetails die drei wichtigsten Anfangsinvestitionsposten für dieses Unternehmen. Jeder Investitionsartikel sollte eine kurze Phrase sein. Jeder Satz sollte durch // (zwei Schrägstriche) getrennt werden. Verwenden Sie keine nummerierte Liste. Verwenden Sie keine Semikolons oder Doppelpunkte. Wenn es sich bei dem Unternehmen um den Bau und die Renovierung von Ladengeschäften handelt, kann dies ein wichtiger Investitionsposten sein und sollte in Ihre Fertigstellung einbezogen werden.

      ${duplicateInitialInvestmentItemPromptDE}

      Fertigstellung auf Deutsch generieren.
      Hier ist ein Beispiel für die Fertigstellung:
      Bau//Ausrüstungskauf//Betriebskapital
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
              temperature: 0.7,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
              max_tokens: 500,
              stream: false,
              n: 1,
            }),
          },
        );

        const { choices } = await openAIResponse.json();
        console.log('choices', choices);
        const responseText = choices[0].message.content.trim();

        // Split the response text into an array of customer group names
        let investmentItemArr = responseText
          .split('//')
          .map((name) => name.trim());

        investmentItemArr = investmentItemArr.map((name) =>
          name.replace(/"/g, ''),
        );

        if (responseText) {
          res.status(200).json(investmentItemArr);
        } else {
          throw new Error('response text is empty.');
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

  const getStep6SuggestionsInvestmentItemHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep6SuggestionsInvestmentItemHandler);

  await getStep6SuggestionsInvestmentItemHandlerWithApiKeyValidation(request, response);
}