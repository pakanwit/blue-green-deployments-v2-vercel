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
export default async function api13Tech2DigiPro(request, response) {
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
    investmentItem4,
    investmentItem5,
    investmentItem6,
    investmentItem7,
    investmentItem8,
    investmentItem9,
    investmentItem10,

    investmentAmountItem1,
    investmentAmountItem2,
    investmentAmountItem3,
    investmentAmountItem4,
    investmentAmountItem5,
    investmentAmountItem6,
    investmentAmountItem7,
    investmentAmountItem8,
    investmentAmountItem9,
    investmentAmountItem10,

    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

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

  function generatePrompt(
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
  ) {
    let prompt = '';

    for (let i = 1; i <= 5; i++) {
      const productName = arguments[(i - 1) * 2 + 1];
      const productDescription = arguments[(i - 1) * 2 + 2];

      if (productName) {
        switch (planLanguage) {
          case 'de':
            prompt += `Kundens Produkt oder Dienstleistung #${i} Name: ${productName}\n`;
            break;
          case 'fr':
            prompt += `Produit ou service du client #${i} Nom: ${productName}\n`;
            break;
          case 'es':
            prompt += `Producto o servicio del cliente #${i} Nombre: ${productName}\n`;
            break;
          case 'it':
            prompt += `Prodotto o servizio del cliente #${i} Nome: ${productName}\n`;
            break;
          case 'nl':
            prompt += `Product of dienst van de klant #${i} Naam: ${productName}\n`;
            break;
          case 'ja':
            prompt += `クライアントの製品またはサービス #${i} 名前: ${productName}\n`;
            break;
          case 'ar':
            prompt += `منتج العميل أو الخدمة #${i} الاسم: ${productName}\n`;
            break;
          case 'sv':
            prompt += `Kundens produkt eller tjänst #${i} Namn: ${productName}\n`;
            break;
          case 'fi':
            prompt += `Asiakkaan tuote tai palvelu #${i} Nimi: ${productName}\n`;
            break;
          case 'da':
            prompt += `Kundens produkt eller service #${i} Navn: ${productName}\n`;
            break;
          case 'no':
            prompt += `Kundens produkt eller tjeneste #${i} Navn: ${productName}\n`;
            break;
          default:
            prompt += `Client's product or service #${i} Name: ${productName}\n`;
        }
      }

      if (productDescription) {
        switch (planLanguage) {
          case 'de':
            prompt += `Kundens Produkt oder Dienstleistung #${i} Beschreibung: ${productDescription}\n`;
            break;
          case 'fr':
            prompt += `Produit ou service du client #${i} Description: ${productDescription}\n`;
            break;
          case 'es':
            prompt += `Producto o servicio del cliente #${i} Descripción: ${productDescription}\n`;
            break;
          case 'it':
            prompt += `Prodotto o servizio del cliente #${i} Descrizione: ${productDescription}\n`;
            break;
          case 'nl':
            prompt += `Product of dienst van de klant #${i} Beschrijving: ${productDescription}\n`;
            break;
          case 'ja':
            prompt += `クライアントの製品またはサービス #${i} 説明: ${productDescription}\n`;
            break;
          case 'ar':
            prompt += `منتج العميل أو الخدمة #${i} الوصف: ${productDescription}\n`;
            break;
          case 'sv':
            prompt += `Kundens produkt eller tjänst #${i} Beskrivning: ${productDescription}\n`;
            break;
          case 'fi':
            prompt += `Asiakkaan tuote tai palvelu #${i} Kuvaus: ${productDescription}\n`;
            break;
          case 'da':
            prompt += `Kundens produkt eller service #${i} Beskrivelse: ${productDescription}\n`;
            break;
          case 'no':
            prompt += `Kundens produkt eller tjeneste #${i} Beskrivelse: ${productDescription}\n`;
            break;
          default:
            prompt += `Client's product or service #${i} Description: ${productDescription}\n`;
        }
      }
    }

    return prompt;
  }

  const productInfoPrompt = generatePrompt(
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
  );

  const tech2TopicEN = 'Digital Strategy';
  const tech2PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${tech2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Digital Strategy topic, include details on how the business will establish itself in the digital space and acheive success. surrounf each tactic with <li> tag.
    
    Do not repeat business details.
    use 800 words to generate ${tech2TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Digital Strategy</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the insightful ${tech2TopicEN} you came up with:
    `;

  // german lang --------------------------------------------------------------------------
  const tech2TopicDE = 'Digitale Strategie';
  const tech2PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${tech2TopicDE} für einen Geschäftsplan zu verfassen.
    
      Geschäftsdaten:
      Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
      Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
      Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
      Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
      Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
  
      Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
      ${productInfoPrompt}
  
      Geben Sie zum Thema „Digitale Strategie“ Einzelheiten dazu an, wie sich das Unternehmen im digitalen Raum etablieren und erfolgreich sein wird. Umgeben Sie jede Taktik mit dem <li>-Tag.
    
      Wiederholen Sie keine Geschäftsdetails.
      Verwenden Sie 800 Wörter, um ${tech2TopicDE} zu generieren.
      Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
      Beginnen Sie den Abschluss mit „<h4>Digitale Strategie</h4>“
      Fertigstellung auf Deutsch generieren.
    
      Dies ist das aufschlussreiche ${tech2TopicDE}, das Sie sich ausgedacht haben:`;

  // french lang --------------------------------------------------------------------------
  const tech2TopicFR = 'Stratégie numérique';
  const tech2PromptFR = `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${tech2TopicFR} long et détaillé pour un plan d'affaires.

    détails commerciaux:
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est ${businessType}.
    détail commercial 3 : L'emplacement de l'entreprise est : ${location}.
    détail commercial 4 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 5 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    pour le sujet Stratégie Numérique, incluez des détails sur la façon dont l'entreprise s'établira dans l'espace numérique et atteindra le succès. entourez chaque tactique avec le tag <li>.

    Ne répétez pas les détails commerciaux.
    utilisez 800 mots pour générer ${tech2TopicFR}.
    Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Commencez la rédaction avec "<h4>Stratégie Numérique</h4>"

    Voici le ${tech2TopicFR} perspicace que vous avez élaboré :
    `;

  // spanish lang --------------------------------------------------------------------------
  const tech2TopicES = 'Estrategia digital';
  const tech2PromptES = `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${tech2TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre de la empresa del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}.
    detalle del negocio 3: La ubicación del negocio es: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 5: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para el tema Estrategia Digital, incluya detalles sobre cómo la empresa se establecerá en el espacio digital y logrará el éxito. rodee cada táctica con la etiqueta <li>.

    No repita los detalles del negocio.
    use 800 palabras para generar ${tech2TopicES}.
    Redáctelo como si fuera el dueño del negocio, utilizando "nosotros" y no "yo".
    Comience la redacción con "<h4>Estrategia Digital</h4>"

    Este es el ${tech2TopicES} perspicaz que usted elaboró:
    `;

  // italian lang --------------------------------------------------------------------------
  const tech2TopicIT = 'Strategia digitale';
  const tech2PromptIT = `
    Lei è un consulente professionista e un cliente si rivolge a lei per scrivere un ${tech2TopicIT} lungo e dettagliato per un piano aziendale.

  dettagli dell'azienda:
  dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
  dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  dettaglio aziendale 5: Lo stato operativo dell'attività del cliente è ${businessOperationalStatus}.

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  per il tema Strategia Digitale, includa dettagli su come l'azienda si stabilirà nello spazio digitale e raggiungerà il successo. Circondi ogni tattica con il tag <li>.

  Non ripeta i dettagli aziendali.
  usi 800 parole per generare ${tech2TopicIT}.
  Scriva come se fosse il proprietario dell'azienda, usando "noi" e non "io".
  Inizi la redazione con "<h4>Strategia Digitale</h4>"

  Questo è l'${tech2TopicIT} perspicace che ha elaborato:
    `;

  //dutch lang --------------------------------------------------------------------------
  const tech2TopicNL = 'Digitale strategie';
  const tech2PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${tech2TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}

    voor het onderwerp Digitale Strategie, geef details over hoe het bedrijf zich zal vestigen in de digitale ruimte en succes zal behalen. Omring elke tactiek met de tag <li>.
    
    Herhaal de bedrijfsdetails niet.
    gebruik 800 woorden om ${tech2TopicNL} te genereren. 
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Begin de voltooiing met "<h4>Digitale Strategie</h4>"
    Genereer alles in het Nederlands.
    Dit is het inzichtelijke ${tech2TopicNL} dat u heeft bedacht:
    `;

  //japanese lang --------------------------------------------------------------------------
  const tech2TopicJA = 'デジタル戦略';
  const tech2PromptJA = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${tech2TopicJA}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    デジタル戦略のトピックについては、ビジネスがデジタル空間でどのように確立し、成功を収めるかの詳細を含めてください。各戦略を<li>タグで囲んでください。
    
    ビジネスの詳細を繰り返さないでください。
    ${tech2TopicJA}を生成するために800語を使用してください。
    あなたがビジネスのオーナーであるかのように書いてください。"私たち"を使用し、"私"は使用しないでください。
    完成を"<h4>デジタル戦略</h4>"で始めてください。
    すべてを日本語で生成してください。
    これがあなたが考え出した洞察に富んだ${tech2TopicJA}です：
    `;

  //arabic lang --------------------------------------------------------------------------
  const tech2TopicAR = 'الاستراتيجية الرقمية';
  const tech2PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${tech2TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}. 
    تفاصيل العمل 3: موقع العمل هو: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لموضوع الاستراتيجية الرقمية، قم بتضمين التفاصيل حول كيفية تأسيس العمل في المساحة الرقمية وتحقيق النجاح. احاطة كل تكتيك بوسم <li>.
    
    لا تكرر تفاصيل الأعمال.
    استخدم 800 كلمة لتوليد ${tech2TopicAR}. 
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h4>الاستراتيجية الرقمية</h4>"
    أنتج كل شيء باللغة العربية.
    هذا هو ${tech2TopicAR} الذي ابتكرته:
    `;

  //swedish lang --------------------------------------------------------------------------
  const tech2TopicSV = 'Digital strategi';
  const tech2PromptSV = `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${tech2TopicSV} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    Affärsdetalj 3: Platsen för verksamheten är: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens verksamhetsstatus är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    För ämnet Digital strategi, inkludera detaljer om hur företaget kommer att etablera sig i den digitala rymden och uppnå framgång. Omge varje taktik med <li> taggen.
    
    Upprepa inte affärsdetaljer.
    Använd 800 ord för att generera ${tech2TopicSV}. 
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Börja kompletteringen med "<h4>Digital strategi</h4>"
    Generera allt på svenska.
    Detta är den insiktsfulla ${tech2TopicSV} du kom upp med:
    `;

  //finnish lang --------------------------------------------------------------------------
  const tech2TopicFI = 'Digitaalinen strategia';
  const tech2PromptFI = `
    Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${tech2TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan tieto 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Digitaalisen strategian aiheessa, sisällytä tiedot siitä, miten yritys perustaa itsensä digitaaliseen tilaan ja saavuttaa menestystä. Ympäröi jokainen taktiikka <li> tagilla.
    
    Älä toista liiketoiminnan tietoja.
    käytä 800 sanaa generoimaan ${tech2TopicFI}. 
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h4>Digitaalinen strategia</h4>"
    Generoi kaikki suomeksi.
    Tämä on oivaltava ${tech2TopicFI}, jonka keksit:
    `;

  // danish lang --------------------------------------------------------------------------
  const tech2TopicDA = 'Digital strategi';
  const tech2PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${tech2TopicDA} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalje 3: Virksomhedens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Disse er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Digital strategi emne, inkluder detaljer om, hvordan virksomheden vil etablere sig i det digitale rum og opnå succes. omgiv hver taktik med <li> tag.
    
    Gentag ikke forretningsdetaljer.
    brug 800 ord til at generere ${tech2TopicDA}. 
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke brug "jeg".
    Begynd udfyldningen med "<h4>Digital strategi</h4>"
    Generer alt på dansk.
    Dette er den indsigtsfulde ${tech2TopicDA} du kom op med:
    `;

  // norwegian lang --------------------------------------------------------------------------
  const tech2TopicNO = 'Digital strategi';
  const tech2PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${tech2TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Virksomhetens plassering er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Digital strategi emne, inkluder detaljer om hvordan virksomheten vil etablere seg i det digitale rommet og oppnå suksess. omgir hver taktikk med <li> tag.
    
    Gjenta ikke forretningsdetaljer.
    bruk 800 ord for å generere ${tech2TopicNO}. 
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
    Begynn utfyllingen med "<h4>Digital strategi</h4>"
    Generer alt på norsk.
    Dette er den innsiktsfulle ${tech2TopicNO} du kom opp med:
    `;

  //other lang --------------------------------------------------------------------------
  const tech2TopicOther = 'Digital Strategy';
  const tech2PromptOther = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${tech2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Digital Strategy topic, include details on how the business will establish itself in the digital space and acheive success. surrounf each tactic with <li> tag.
    
    Do not repeat business details.
    use 800 words to generate ${tech2TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Digital Strategy</h4>"
    Generate everything in English.
    This is the insightful ${tech2TopicEN} you came up with:
    `;

  let tech2PromptFinal = '';

  if (planLanguage === 'en') {
    tech2PromptFinal = tech2PromptEN;
  } else if (planLanguage === 'de') {
    tech2PromptFinal = tech2PromptDE;
  } else if (planLanguage === 'fr') {
    tech2PromptFinal = tech2PromptFR;
  } else if (planLanguage === 'es') {
    tech2PromptFinal = tech2PromptES;
  } else if (planLanguage === 'it') {
    tech2PromptFinal = tech2PromptIT;
  } else if (planLanguage === 'nl') {
    tech2PromptFinal = tech2PromptNL;
  } else if (planLanguage === 'ja') {
    tech2PromptFinal = tech2PromptJA;
  } else if (planLanguage === 'ar') {
    tech2PromptFinal = tech2PromptAR;
  } else if (planLanguage === 'sv') {
    tech2PromptFinal = tech2PromptSV;
  } else if (planLanguage === 'fi') {
    tech2PromptFinal = tech2PromptFI;
  } else if (planLanguage === 'da') {
    tech2PromptFinal = tech2PromptDA;
  } else if (planLanguage === 'no') {
    tech2PromptFinal = tech2PromptNO;
  } else {
    tech2PromptFinal = tech2PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: tech2PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
