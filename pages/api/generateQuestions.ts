import { OpenAIChat } from '../../utils/OpenAIChat';

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

const createOutputExample = (topics) => {
  let outputExample = '';
  const keys = Object.keys(topics);
  keys.forEach((key) => {
    outputExample += `"${key}": {\n`;
    topics[key].forEach((topic) => {
      outputExample += `"${topic}": "question 1",\n`;
    });
    outputExample += '},\n';
  });
  return outputExample;
};

const promptTemplates = {
  en: ({ topics, outputExample }) =>
    ` From this JSON object: ${JSON.stringify(
      topics,
    )} Add 1 clarifying question for each sub-topic to collect information to write a complete business plan. example of the desired output: ${outputExample} replace question 1 with relevant clarifying question to collect information to write a complete business plan. Keep the questions short.`,
  de: ({ topics, outputExample }) =>
    ` Von diesem JSON-Objekt: ${JSON.stringify(
      topics,
    )} Fügen Sie für jedes Untertopic 1 klärende Frage hinzu, um Informationen für die Erstellung eines vollständigen Geschäftsplans zu sammeln. Beispiel für das gewünschte Ergebnis: ${outputExample} Ersetzen Sie Frage 1 durch eine relevante klärende Frage, um Informationen für die Erstellung eines vollständigen Geschäftsplans zu sammeln. Halten Sie die Fragen kurz.`,
  fr: ({ topics, outputExample }) =>
    ` À partir de cet objet JSON : ${JSON.stringify(
      topics,
    )} Ajoutez 1 question de clarification pour chaque sous-thème afin de collecter des informations pour rédiger un plan d'affaires complet. Exemple du résultat souhaité : ${outputExample} Remplacez la question 1 par une question de clarification pertinente pour collecter des informations afin de rédiger un plan d'affaires complet. Gardez les questions courtes.`,
  es: ({ topics, outputExample }) =>
    ` Desde este objeto JSON: ${JSON.stringify(
      topics,
    )} Agrega 1 pregunta aclaratoria para cada subtema para recopilar información y escribir un plan de negocios completo. Ejemplo del resultado deseado: ${outputExample} Reemplaza la pregunta 1 con una pregunta aclaratoria relevante para recopilar información y escribir un plan de negocios completo. Mantén las preguntas cortas.`,
  it: ({ topics, outputExample }) =>
    ` Da questo oggetto JSON: ${JSON.stringify(
      topics,
    )} Aggiungi 1 domanda di chiarimento per ogni sotto-argomento per raccogliere informazioni per scrivere un piano aziendale completo. Esempio del risultato desiderato: ${outputExample} Sostituisci la domanda 1 con una domanda di chiarimento rilevante per raccogliere informazioni per scrivere un piano aziendale completo. Mantieni le domande brevi.`,
  nl: ({ topics, outputExample }) =>
    ` Van dit JSON-object: ${JSON.stringify(
      topics,
    )} Voeg 1 verduidelijkende vraag toe voor elk subonderwerp om informatie te verzamelen voor het schrijven van een volledig bedrijfsplan. Voorbeeld van het gewenste resultaat: ${outputExample} Vervang vraag 1 door een relevante verduidelijkende vraag om informatie te verzamelen voor het schrijven van een volledig bedrijfsplan. Houd de vragen kort.`,
  ja: ({ topics, outputExample }) =>
    `このJSONオブジェクトから：${JSON.stringify(
      topics,
    )} 完全なビジネスプランを作成するための情報を収集するために、各サブトピックに対して1つの明確化質問を追加してください。希望する出力の例：${outputExample} 質問1を関連する明確化質問に置き換えて、完全なビジネスプランを作成するための情報を収集してください。質問は短くしてください。`,
  sv: ({ topics, outputExample }) =>
    `Från denna JSON-objekt: ${JSON.stringify(
      topics,
    )} Lägg till 1 förtydligande fråga för varje underämne för att samla information för att skriva en komplett affärsplan. Exempel på önskat resultat: ${outputExample} Ersätt fråga 1 med relevant förtydligande fråga för att samla information för att skriva en komplett affärsplan. Håll frågorna korta.`,
  fi: ({ topics, outputExample }) =>
    `Tästä JSON-objektista: ${JSON.stringify(
      topics,
    )} Lisää jokaiseen alateemaan 1 selventävä kysymys kerätäksesi tietoa ja kirjoittaaksesi täydellisen liiketoimintasuunnitelman. Halutun tulosteen esimerkki: ${outputExample} Korvaa kysymys 1 asiaankuuluvalla selventävällä kysymyksellä kerätäksesi tietoa ja kirjoittaaksesi täydellisen liiketoimintasuunnitelman. Pidä kysymykset lyhyinä.`,
  da: ({ topics, outputExample }) =>
    `Fra denne JSON-objekt: ${JSON.stringify(
      topics,
    )} Tilføj 1 afklarende spørgsmål til hvert underemne for at indsamle oplysninger til at skrive en komplet forretningsplan. Eksempel på det ønskede resultat: ${outputExample} Erstat spørgsmål 1 med relevant afklarende spørgsmål for at indsamle oplysninger til at skrive en komplet forretningsplan. Hold spørgsmålene korte.`,
  no: ({ topics, outputExample }) =>
    `Fra dette JSON-objektet: ${JSON.stringify(
      topics,
    )} Legg til 1 avklarende spørsmål for hvert underemne for å samle informasjon for å skrive en komplett forretningsplan. Eksempel på ønsket resultat: ${outputExample} Erstatt spørsmål 1 med relevant avklarende spørsmål for å samle informasjon for å skrive en komplett forretningsplan. Hold spørsmålene korte.`,
};

export default async function POST(request: Request) {
  const { topics, planLanguage } = await request.json();

  const prompt = promptTemplates[planLanguage]({
    topics,
    outputExample: createOutputExample(topics),
  });

  const payload = {
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'user',
        content: `<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are an insghtful business consultant who always gives output in purely JSON format. Do not include the beginning sentence or ending sentence in your output. Just include the JSON object.<|eot_id|><|start_header_id|>user<|end_header_id|> ${prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
      },
    ],
    max_tokens: 1000,
    temperature: 0.5,
    presence_penalty: 1.15,
    frequency_penalty: 0.2,
  };

  return OpenAIChat(payload, 'json');
}
