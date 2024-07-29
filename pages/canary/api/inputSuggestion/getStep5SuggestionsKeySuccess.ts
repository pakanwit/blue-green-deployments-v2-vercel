import { promptForSuggestionResponseFormat } from "../../../../constants/prompt/firework/format";
import { splitTextByDoubleSlash } from "../../../../utils/aiResponseParser/text";
import { FireworksAI } from "../../../../utils/llama3/FireworksAI";
import { withApiKeyValidation } from "../utils/withApiKeyValidation";

export default async function handler(request, response) {
  const getStep5SuggestionsKeySuccessHandler = async (req, res) => {
    if (req.method === "POST") {
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

        locale,
        variantID,
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

      const duplicateSuccessFactorsArr = [
        successFactors1,
        successFactors2,
        successFactors3,
      ];

      //english lang-------------------------------------------------------------------

      let productPromptEN = "";
      productNames.forEach((productName, i) => {
        if (productName) {
          productPromptEN += `\nthis is one of the business' product name: ${productName}`;
        }
        if (productDescriptions[i]) {
          productPromptEN += `\n this is the product description of ${productName}: ${productDescriptions[i]}`;
        }
      });

      let customerPromptEN = "";
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptEN += `\nthis is one of the business' customer description: ${customerDescription}`;
        }
        if (customerIncomeArr[i]) {
          customerPromptEN += `\n this is the income level of ${customerDescription}: ${customerIncomeArr[i]}`;
        }
      });

      let duplicateSuccessFactorsPromptEN = "";
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

        These are further instructions:
        You are a business owner. and based on the business details provided come up with 3 insightful key success factors for this business. Each key success factor should be a short sentence. each key success factor should be separated by // (2 forward slashes). Don't use numbered list. Don't use semi colons or colons. just use simple sentences in your completion. Write in first person. Use present tense. Don't mention that your a business owner in your completion. Use "we" instead of "I". use "our" instead of "my"

        ${duplicateSuccessFactorsPromptEN}

        here is an example of completion:
        We have an experienced data driven marketing team//we already have a solid customer base//Our product is highly differentiated from our competitors
        Don't deviate from this format.
        Don't use numbered list. 

        Here is what you've come up with:
        `;

      //german lan-------------------------------------------------------------------
      let productPromptDE = "";
      productNames.forEach((productName, i) => {
        if (productName) {
          productPromptDE += `\ndies ist einer der Produktnamen des Unternehmens: ${productName}`;
        }
        if (productDescriptions[i]) {
          productPromptDE += `\n dies ist die Produktbeschreibung von ${productName}: ${productDescriptions[i]}`;
        }
      });

      let customerPromptDE = "";
      customerDescriptionArr.forEach((customerDescription, i) => {
        if (customerDescription) {
          customerPromptDE += `\ndies ist eine der Kundenbeschreibungen des Unternehmens: ${customerDescription}`;
        }
        if (customerIncomeArr[i]) {
          customerPromptDE += `\n das ist das Einkommensniveau von ${customerDescription}: ${customerIncomeArr[i]}`;
        }
      });

      let duplicateSuccessFactorsPromptDE = "";
      duplicateSuccessFactorsArr.forEach((successFactor, i) => {
        if (successFactor) {
          duplicateSuccessFactorsPromptDE += `\n Dies ist einer der wichtigsten Erfolgsfaktoren des Unternehmens: „${successFactor}“, erwähnen Sie „${successFactor}“ nicht am Ende.`;
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

        Dies sind die Kundendaten:
        ${customerPromptDE}

        Dies sind die Produktdetails:
        ${productPromptDE}

        Dies sind weitere Anweisungen:
        Sie sind Unternehmer. und ermitteln Sie anhand der bereitgestellten Geschäftsdetails drei aufschlussreiche Schlüsselerfolgsfaktoren für dieses Unternehmen. Jeder Schlüsselerfolgsfaktor sollte ein kurzer Satz sein. Jeder Schlüsselerfolgsfaktor sollte durch // (zwei Schrägstriche) getrennt werden. Verwenden Sie keine nummerierte Liste. Verwenden Sie keine Semikolons oder Doppelpunkte. Verwenden Sie zum Vervollständigen einfach einfache Sätze. Schreiben Sie in der ersten Person. Benutzen Sie die Gegenwartsform. Erwähnen Sie in Ihrem Abschluss nicht, dass Sie ein Geschäftsinhaber sind. Verwenden Sie „wir“ statt „ich“. Verwenden Sie „unser“ anstelle von „mein“

        ${duplicateSuccessFactorsPromptDE}

        Fertigstellung auf Deutsch generieren.
        Hier ist ein Beispiel für die Fertigstellung:
        Wir verfügen über ein erfahrenes, datengesteuertes Marketingteam. // Wir verfügen bereits über einen soliden Kundenstamm. // Unser Produkt unterscheidet sich stark von unseren Mitbewerbern
        Weichen Sie nicht von diesem Format ab.
        Verwenden Sie keine nummerierte Liste.

        Hier ist, was Sie erstellt haben:
        `;

      let finalPrompt = "";

      if (locale === "de") {
        finalPrompt = promptDE;
      } else if (locale === "en") {
        finalPrompt = promptEN;
      } else {
        console.log("no locale");
        finalPrompt = promptEN;
      }

      try {
        const basePayload = {
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 500,
          stream: false,
          n: 1,
        };
        if (variantID === "2") {
          const response = await FireworksAI(
            {
              ...basePayload,
              messages: [
                { role: "user", content: finalPrompt },
                {
                  role: "system",
                  content:
                    locale === "de"
                      ? promptForSuggestionResponseFormat["de"]
                      : promptForSuggestionResponseFormat["en"],
                },
              ],
            },
            "string"
          );
          const recommendations = splitTextByDoubleSlash(response);
          console.log({
            message:
              "getStep5SuggestionsKeySuccessHandler: Fireworks AI recommendations",
            recommendations,
          });
          if (recommendations.length > 0) {
            res.status(200).json(recommendations);
          } else {
            throw new Error("response text is empty.");
          }
        } else {
          const openAIResponse = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo", // Specify the model you want to use
                messages: [{ role: "user", content: finalPrompt }],
                ...basePayload,
              }),
            }
          );

          const { choices } = await openAIResponse.json();
          console.log("choices", choices);
          const responseText = choices[0].message.content.trim();

          // Split the response text into an array of customer group names
          let keySuccessFactorArr = splitTextByDoubleSlash(responseText);

          keySuccessFactorArr = keySuccessFactorArr.map((name) =>
            name.replace(/"/g, "")
          );

          if (responseText) {
            res.status(200).json(keySuccessFactorArr);
          } else {
            throw new Error("response text is empty.");
          }
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while processing your request." });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed." });
    }
  };

  const getStep5SuggestionsKeySuccessHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep5SuggestionsKeySuccessHandler);

  await getStep5SuggestionsKeySuccessHandlerWithApiKeyValidation(
    request,
    response
  );
}
