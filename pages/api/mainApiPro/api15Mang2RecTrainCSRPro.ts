import { OpenAIStream } from '../../../utils/OpenAIChatStream';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api15Mang2RecTrainCSRPro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerType,

    customerIncomeORSize1,
    customerIncomeORSize2,
    customerIncomeORSize3,

    customerDescription1,
    customerDescription2,
    customerDescription3,

    successFactors1,
    successFactors2,
    successFactors3,

    weakness1,
    weakness2,
    weakness3,

    initialInvestmentAmount,
    investmentItem1,
    investmentItem2,
    investmentItem3,

    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    productInfoPrompt,
    mang1Ref,
    planQuota,
    planLanguage,

    productName1,
    productDescription1,
    productName2,
    productDescription2,
    productName3,
    productDescription3,
    productName4,
    productDescription4,
    productName5,
    productDescription5,
  } = await request.json();

  let UKEngPrompt = '';
  if (planLanguage === 'en-uk')
    UKEngPrompt = 'use british english spelling and grammar';

  let modelPlanQuota = 'gpt-3.5-turbo';
  if (planQuota <= 8) {
    modelPlanQuota = 'gpt-3.5-turbo';
    console.log('using gpt-3.5-turbo');
  } else {
    modelPlanQuota = 'gpt-4';
    console.log('using gpt-4');
  }

  // get text that starts with <h4>Employee Roster</h4> from mang1Ref and include <h4>Employee Roster</h4>
  const mang1RefText = mang1Ref.split('<h4>Employee Roster</h4>')[1];

  const mang2TopicEN = 'Recruitment, Training and Development, and CSR Policy';
  const mang2PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mang2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    This is the client's employee roster, use it when you write the ${mang2TopicEN}: 
    ${mang1RefText}

    for Recruitment topic, come up with a recruitment plan for the client's business.

    for Training and Development topic, come up with a training and development plan for the client's business.

    for CSR Policy topic, come up with a CSR policy for the client's business. include only 2 short paragraphs for CSR Policy topic.

    Use multiple <p> tags when writing the content.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    use 800 words to generate ${mang2TopicEN}.  
    Begin the completion with "<h4>Recruitment</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed, and lengthy ${mang2TopicEN} you came up with:
    `;

  //german lang ------------------------------------------------------------------------
  const mang2TopicDE =
    'Rekrutierung, Ausbildung und Entwicklung sowie CSR-Politik';
  const mang2PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${mang2TopicDE} für einen Businessplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist: ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies ist die Mitarbeiterliste des Kunden. Verwenden Sie sie, wenn Sie ${mang2TopicDE} schreiben:
    ${mang1RefText}

    Erstellen Sie für das Thema „Rekrutierung“ einen Rekrutierungsplan für das Unternehmen des Kunden.

    Erstellen Sie für das Thema Schulung und Entwicklung einen Schulungs- und Entwicklungsplan für das Unternehmen des Kunden.

    Erstellen Sie für das Thema „CSR-Richtlinie“ eine CSR-Richtlinie für das Unternehmen des Kunden. Fügen Sie nur zwei kurze Absätze zum Thema der CSR-Richtlinie ein.

    Verwenden Sie beim Schreiben des Inhalts mehrere <p>-Tags.
    Schreiben Sie am Ende keinen Schlussabsatz.

    Wiederholen Sie keine Geschäftsdetails.
    Verwenden Sie 800 Wörter, um ${mang2TopicDE} zu generieren.
    Beginnen Sie den Abschluss mit „<h4>Rekrutierung</h4>“
    Fertigstellung auf Deutsch generieren.
  
    Dies ist das lange, detaillierte und ausführliche ${mang2TopicDE}, das Sie sich ausgedacht haben:`;

  //french lang ------------------------------------------------------------------------
  const mang2TopicFR =
    'Recrutement, formation et développement et politique RSE';
  const mang2PromptFR = `
    Vous êtes un consultant professionnel, et un client vous approche pour écrire un ${mang2TopicFR} long et détaillé pour un plan d'affaires.

    détails de l'entreprise:
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est : ${businessType}.
    détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    détail commercial 4 : Voici le nombre d'employés pour cette entreprise : ${NEmployee}.
    détail commercial 5 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici la liste des employés du client, utilisez-la lorsque vous rédigez le ${mang2TopicFR} :
    ${mang1RefText}

    pour le sujet du Recrutement, proposez un plan de recrutement pour l'entreprise du client.

    pour le sujet Formation et Développement, élaborez un plan de formation et de développement pour l'entreprise du client.

    pour le sujet Politique RSE, proposez une politique RSE pour l'entreprise du client. incluez seulement 2 courts paragraphes pour le sujet de la Politique RSE.

    Utilisez plusieurs balises <p> lors de la rédaction du contenu.
    Ne rédigez pas de paragraphe de conclusion à la fin.

    Ne répétez pas les détails commerciaux.
    utilisez 800 mots pour générer ${mang2TopicFR}.
    Commencez la rédaction par "<h4>Recrutement</h4>"

    Voici le ${mang2TopicFR} long, détaillé et étendu que vous avez élaboré :
    `;

  //spanish lang ------------------------------------------------------------------------
  const mang2TopicES =
    'Reclutamiento, capacitación y desarrollo y política de RSE';
  const mang2PromptES = `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${mang2TopicES} largo y detallado para un plan de negocio.

    detalles del negocio:
    detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle de negocio 2: El tipo de negocio es: ${businessType}.
    detalle de negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle de negocio 4: Este es el número de empleados para este negocio: ${NEmployee}.
    detalle de negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    detalle de negocio 6: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Esta es la lista de empleados del cliente, úsela cuando escriba el ${mang2TopicES}:
    ${mang1RefText}

    para el tema de Reclutamiento, elabore un plan de reclutamiento para el negocio del cliente.

    para el tema de Formación y Desarrollo, elabore un plan de formación y desarrollo para el negocio del cliente.

    para el tema de Política de RSC, elabore una política de RSC para el negocio del cliente. Incluya solo 2 párrafos cortos para el tema de la Política de RSC.

    Utilice múltiples etiquetas <p> al escribir el contenido.
    No escriba un párrafo de conclusión al final.

    No repita los detalles del negocio.
    utilice 800 palabras para generar ${mang2TopicES}.
    Comience la redacción con "<h4>Reclutamiento</h4>"

    Este es el ${mang2TopicES} largo, detallado y extenso que ha elaborado:
    `;

  //italian lang ------------------------------------------------------------------------
  const mang2TopicIT = 'Reclutamento, formazione e sviluppo e politica RSE';
  const mang2PromptIT = `
    Sei un consulente professionale e un cliente ti avvicina per scrivere un ${mang2TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è: ${businessType}.
    dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questa è la lista dei dipendenti del cliente, usala quando scrivi il ${mang2TopicIT}:
    ${mang1RefText}

    per il tema Reclutamento, sviluppa un piano di reclutamento per l'azienda del cliente.

    per il tema Formazione e Sviluppo, sviluppa un piano di formazione e sviluppo per l'azienda del cliente.

    per il tema Politica CSR, sviluppa una politica CSR per l'azienda del cliente. Includi solo 2 paragrafi brevi per il tema della Politica CSR.

    Utilizza più tag <p> nel scrivere il contenuto.
    Non scrivere un paragrafo conclusivo alla fine.

    Non ripetere i dettagli aziendali.
    utilizza 800 parole per generare ${mang2TopicIT}.
    Inizia la stesura con "<h4>Reclutamento</h4>"

    Questo è il ${mang2TopicIT} lungo, dettagliato e approfondito che hai elaborato:
    `;

  // dutch lang ------------------------------------------------------------------------
  const mang2TopicNL = 'Werving, training en ontwikkeling en CSR-beleid';
  const mang2PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mang2TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is: ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
    bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit is de werknemerslijst van de klant, gebruik deze bij het schrijven van het ${mang2TopicNL}: 
    ${mang1RefText}

    voor het onderwerp Werving, bedenk een wervingsplan voor het bedrijf van de klant.

    voor het onderwerp Training en Ontwikkeling, bedenk een trainings- en ontwikkelingsplan voor het bedrijf van de klant.

    voor het onderwerp CSR-beleid, bedenk een CSR-beleid voor het bedrijf van de klant. Inclusief slechts 2 korte paragrafen voor het onderwerp CSR-beleid.

    Gebruik meerdere <p> tags bij het schrijven van de inhoud.
    Schrijf geen conclusieparagraaf aan het einde.

    Herhaal de bedrijfsdetails niet.
    gebruik 800 woorden om ${mang2TopicNL} te genereren.  
    Begin de voltooiing met "<h4>Werving</h4>"
    Genereer alles in het Nederlands.
    Dit is het lange, gedetailleerde en uitgebreide ${mang2TopicNL} dat u hebt bedacht:
    `;

  //japanese lang ------------------------------------------------------------------------
  const mang2TopicJP = '採用、研修・育成、CSR政策';
  const mang2PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${mang2TopicJP}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：このビジネスの従業員数は${NEmployee}です。
    ビジネス詳細5：クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これがクライアントの従業員名簿で、${mang2TopicJP}を書くときに使用してください：
    ${mang1RefText}

    採用のトピックについては、クライアントのビジネスのための採用計画を考えてください。

    研修・育成のトピックについては、クライアントのビジネスのための研修・育成計画を考えてください。

    CSR政策のトピックについては、クライアントのビジネスのためのCSR政策を考えてください。CSR政策のトピックには2つの短いパラグラフのみを含めてください。

    コンテンツを書くときは複数の<p>タグを使用してください。
    最後に結論のパラグラフを書かないでください。

    ビジネスの詳細を繰り返さないでください。
    ${mang2TopicJP}を生成するために800語を使用してください。
    完成を"<h4>採用</h4>"で始めてください。
    すべてを日本語で生成してください。
    これがあなたが考え出した長く、詳細で、詳細な${mang2TopicJP}です：
    `;

  //arabic lang ------------------------------------------------------------------------
  const mang2TopicAR =
    'التوظيف والتدريب والتطوير وسياسة المسؤولية الاجتماعية للشركات';
  const mang2PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${mang2TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 6: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي قائمة الموظفين للعميل، استخدمها عند كتابة ${mang2TopicAR}: 
    ${mang1RefText}

    بالنسبة لموضوع التوظيف، ابتكر خطة توظيف لعمل العميل.

    بالنسبة لموضوع التدريب والتطوير، ابتكر خطة تدريب وتطوير لعمل العميل.

    بالنسبة لموضوع سياسة المسؤولية الاجتماعية للشركات، ابتكر سياسة المسؤولية الاجتماعية للشركات لعمل العميل. اشمل فقط فقرتين قصيرتين لموضوع سياسة المسؤولية الاجتماعية للشركات.

    استخدم علامات <p> متعددة عند كتابة المحتوى.
    لا تكتب فقرة الخاتمة في النهاية.

    لا تكرر تفاصيل العمل.
    استخدم 800 كلمة لتوليد ${mang2TopicAR}.  
    ابدأ الإكمال بـ "<h4>التوظيف</h4>"
    أنتج كل شيء باللغة العربية.
    هذا هو ${mang2TopicAR} الطويل والمفصل والمطول الذي ابتكرته:
    `;

  //swedish lang ------------------------------------------------------------------------
  const mang2TopicSV = 'Rekrytering, utbildning och utveckling samt CSR-policy';
  const mang2PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${mang2TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typ av verksamhet är: ${businessType}. 
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.

    Detta är kundens anställningslista, använd den när du skriver ${mang2TopicSV}: 
    ${mang1RefText}

    för Rekrytering ämne, kom med en rekryteringsplan för kundens företag.

    för Utbildning och utveckling ämne, kom med en utbildnings- och utvecklingsplan för kundens företag.

    för CSR-policy ämne, kom med en CSR-policy för kundens företag. inkludera endast 2 korta stycken för CSR-policy ämne.

    Använd flera <p> taggar när du skriver innehållet.
    Skriv inte slutsatsparagrafen i slutet.

    Upprepa inte affärsdetaljer.
    använd 800 ord för att generera ${mang2TopicSV}.  
    Börja slutförandet med "<h4>Rekrytering</h4>"
    Generera allt på svenska.
    Detta är den långa, detaljerade och omfattande ${mang2TopicSV} du kom upp med:
    `;

  // finnish lang ------------------------------------------------------------------------
  const mang2TopicFI =
    'Rekrytointi, koulutus ja kehitys sekä yritysvastuupolitiikka';
  const mang2PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mang2TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on: ${businessType}. 
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Tämä on yrityksen työntekijöiden määrä: ${NEmployee}
    liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Tämä on asiakkaan työntekijäluettelo, käytä sitä kun kirjoitat ${mang2TopicFI}: 
    ${mang1RefText}

    Rekrytointi-aiheelle, keksi rekrytointisuunnitelma asiakkaan yritykselle.

    Koulutus ja kehitys -aiheelle, keksi koulutus- ja kehityssuunnitelma asiakkaan yritykselle.

    Yritysvastuupolitiikka-aiheelle, keksi yritysvastuupolitiikka asiakkaan yritykselle. sisällytä vain 2 lyhyttä kappaletta yritysvastuupolitiikka-aiheeseen.

    Käytä useita <p> -tageja kirjoittaessasi sisältöä.
    Älä kirjoita lopetuskohtaa lopussa.

    Älä toista liiketoiminnan tietoja.
    käytä 800 sanaa generoimaan ${mang2TopicFI}.  
    Aloita täydennys "<h4>Rekrytointi</h4>"
    Generoi kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ja laaja ${mang2TopicFI}, jonka keksit:
    `;

  //danish lang ------------------------------------------------------------------------
  const mang2TopicDA = 'Rekruttering, uddannelse og udvikling samt CSR-politik';
  const mang2PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${mang2TopicDA} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er: ${businessType}. 
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er kundens medarbejderoversigt, brug det når du skriver ${mang2TopicDA}: 
    ${mang1RefText}

    for Rekruttering emne, kom med en rekrutteringsplan for kundens virksomhed.

    for Uddannelse og udvikling emne, kom med en uddannelses- og udviklingsplan for kundens virksomhed.

    for CSR-politik emne, kom med en CSR-politik for kundens virksomhed. inkluder kun 2 korte afsnit for CSR-politik emne.

    Brug flere <p> tags når du skriver indholdet.
    Skriv ikke konklusionsafsnittet i slutningen.

    Gentag ikke forretningsdetaljer.
    brug 800 ord til at generere ${mang2TopicDA}.  
    Begynd udfyldelsen med "<h4>Rekruttering</h4>"
    Generer alt på dansk.
    Dette er den lange, detaljerede og omfattende ${mang2TopicDA} du kom op med:
    `;

  // norwegian lang ------------------------------------------------------------------------
  const mang2TopicNO = 'Rekruttering, opplæring og utvikling og CSR-politikk';
  const mang2PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${mang2TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er: ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Dette er antallet av ansatte for denne virksomheten: ${NEmployee}
    forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 6: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er kundens ansattoversikt, bruk det når du skriver ${mang2TopicNO}: 
    ${mang1RefText}

    for Rekruttering emne, kom med en rekrutteringsplan for kundens virksomhet.

    for Opplæring og utvikling emne, kom med en opplærings- og utviklingsplan for kundens virksomhet.

    for CSR-politikk emne, kom med en CSR-politikk for kundens virksomhet. inkluder kun 2 korte avsnitt for CSR-politikk emne.

    Bruk flere <p> tags når du skriver innholdet.
    Skriv ikke konklusjonsavsnittet i slutten.

    Gjenta ikke forretningsdetaljer.
    bruk 800 ord til å generere ${mang2TopicNO}.  
    Begynn utfyllingen med "<h4>Rekruttering</h4>"
    Generer alt på norsk.
    Dette er den lange, detaljerte og omfattende ${mang2TopicNO} du kom opp med:
    `;

  //other lang ------------------------------------------------------------------------
  const mang2TopicOTHER =
    'Recruitment, Training and Development, and CSR Policy';
  const mang2PromptOTHER = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mang2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    This is the client's employee roster, use it when you write the ${mang2TopicEN}: 
    ${mang1RefText}

    for Recruitment topic, come up with a recruitment plan for the client's business.

    for Training and Development topic, come up with a training and development plan for the client's business.

    for CSR Policy topic, come up with a CSR policy for the client's business. include only 2 short paragraphs for CSR Policy topic.

    Use multiple <p> tags when writing the content.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    use 800 words to generate ${mang2TopicEN}.  
    Begin the completion with "<h4>Recruitment</h4>"
    Generate everything in English.
    This is the long, detailed, and lengthy ${mang2TopicEN} you came up with:
    `;

  let mang2PromptFinal = '';

  if (planLanguage === 'en') {
    mang2PromptFinal = mang2PromptEN;
  } else if (planLanguage === 'de') {
    mang2PromptFinal = mang2PromptDE;
  } else if (planLanguage === 'fr') {
    mang2PromptFinal = mang2PromptFR;
  } else if (planLanguage === 'es') {
    mang2PromptFinal = mang2PromptES;
  } else if (planLanguage === 'it') {
    mang2PromptFinal = mang2PromptIT;
  } else if (planLanguage === 'nl') {
    mang2PromptFinal = mang2PromptNL;
  } else if (planLanguage === 'ja') {
    mang2PromptFinal = mang2PromptJP;
  } else if (planLanguage === 'ar') {
    mang2PromptFinal = mang2PromptAR;
  } else if (planLanguage === 'sv') {
    mang2PromptFinal = mang2PromptSV;
  } else if (planLanguage === 'fi') {
    mang2PromptFinal = mang2PromptFI;
  } else if (planLanguage === 'da') {
    mang2PromptFinal = mang2PromptDA;
  } else if (planLanguage === 'no') {
    mang2PromptFinal = mang2PromptNO;
  } else {
    mang2PromptFinal = mang2PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: mang2PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1200,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
