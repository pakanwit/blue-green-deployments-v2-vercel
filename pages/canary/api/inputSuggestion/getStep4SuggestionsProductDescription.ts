import { promptForSuggestionResponseFormat } from "../../../../constants/prompt/firework/format";
import { splitTextByDoubleSlash } from "../../../../utils/aiResponseParser/text";
import { FireworksAI } from "../../../../utils/llama3/FireworksAI";
import { withApiKeyValidation } from "../utils/withApiKeyValidation";

export default async function handler(request, response) {
  const getStep4SuggestionsProductDescriptionHandler = async (req, res) => {
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

        id,

        locale,
        variantID,
      } = req.body;

      let productName = "";

      if (id === "1") {
        productName = productName1;
      } else if (id === "2") {
        productName = productName2;
      } else if (id === "3") {
        productName = productName3;
      } else if (id === "4") {
        productName = productName4;
      } else if (id === "5") {
        productName = productName5;
      }

      const promptEN = `
      These are the business details:
      business detail 1: The client's business name is ${businessName}.
      business detail 2: The type of business is ${businessType}. 
      business detail 3: This is where the business's customers are: ${location}.
      business detail 4: The number of employee is ${NEmployee}.
      business detail 5: The offers a ${productOrService}.
      business detail 6: The client's distribution channel is ${salesChannel}.

      These are the customer details:
      customer group 1 detail: ${customerDescription1}.
      customer group 1 income level: ${customerIncome1}.
      customer group 2 detail: ${customerDescription2}.
      customer group 2 income level: ${customerIncome2}.
      customer group 3 detail: ${customerDescription3}.
      customer group 3 income level: ${customerIncome3}.

      These are further instructions:
      You are a professional business consultant. and based on the business details provided, Please write 3 short description of this product or service: ${productName}. The description should be 1 sentence long. each description should be seperated by // (2 forward slashes).
      
      Be objective in your completion, don't sound too much like a salesman when describing this product or service.

      Here is an example of the completion if the product or service name is "Multi-Vitamin":
      Our multi-vitamin product contains a range of essential nutrients, formulated according to recommended daily values//The product is designed to support various aspects of health, including energy levels, immune function, and heart health//Each capsule has been manufactured with attention to quality, aiming to provide a reliable source of daily vitamins and minerals

      Don't deviate from this format.
      Don't use numbered list. 

      Here is what you've come up with:
      `;

      //german lang -------------------------------------------------------------------------
      const promptDE = `
      Dies sind die Geschäftsdaten:
      Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
      Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
      Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
      Geschäftsdetail 4: Die Anzahl der Mitarbeiter beträgt ${NEmployee}.
      Geschäftsdetail 5: Das bietet ein ${productOrService}.
      Geschäftsdetail 6: Der Vertriebskanal des Kunden ist ${salesChannel}.

      Dies sind die Kundendaten:
      Detail der Kundengruppe 1: ${customerDescription1}.
      Einkommensniveau der Kundengruppe 1: ${customerIncome1}.
      Detail der Kundengruppe 2: ${customerDescription2}.
      Einkommensniveau der Kundengruppe 2: ${customerIncome2}.
      Detail der Kundengruppe 3: ${customerDescription3}.
      Einkommensniveau der Kundengruppe 3: ${customerIncome3}.

      Dies sind weitere Anweisungen:
      Sie sind ein professioneller Unternehmensberater. Schreiben Sie bitte basierend auf den bereitgestellten Geschäftsdetails drei kurze Beschreibungen dieses Produkts oder dieser Dienstleistung: ${productName}. Die Beschreibung sollte 1 Satz lang sein. Jede Beschreibung sollte durch // (2 Schrägstriche) getrennt werden.

      Fertigstellung auf Deutsch generieren.
      Gehen Sie objektiv vor und klingen Sie bei der Beschreibung dieses Produkts oder dieser Dienstleistung nicht zu sehr wie ein Verkäufer.

      Hier ist ein Beispiel für die Vervollständigung, wenn der Produkt- oder Dienstleistungsname „Multi-Vitamin“ lautet:
      Unser Multivitaminprodukt enthält eine Reihe essentieller Nährstoffe, formuliert nach empfohlenen Tageswerten. // Das Produkt wurde entwickelt, um verschiedene Aspekte der Gesundheit zu unterstützen, darunter Energieniveau, Immunfunktion und Herzgesundheit. // Jede Kapsel wurde mit größter Sorgfalt hergestellt auf Qualität, mit dem Ziel, eine zuverlässige Quelle täglicher Vitamine und Mineralien bereitzustellen.

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
          temperature: 0.7,
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
              "getStep4SuggestionsProductDescriptionHandler: Fireworks AI recommendations",
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
          let productDescriptionArr = splitTextByDoubleSlash(responseText);

          productDescriptionArr = productDescriptionArr.map((name) =>
            name.replace(/"/g, "")
          );

          if (responseText) {
            res.status(200).json(productDescriptionArr);
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

  const getStep4SuggestionsProductDescriptionHandlerWithApiKeyValidation =
    withApiKeyValidation(getStep4SuggestionsProductDescriptionHandler);

  await getStep4SuggestionsProductDescriptionHandlerWithApiKeyValidation(
    request,
    response
  );
}
