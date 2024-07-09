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
export default async function api11Op2QCImpPlanPro(request, response) {
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
            prompt += `Klant's product of dienst #${i} Naam: ${productName}\n`;
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
            prompt += `Klant's product of dienst #${i} Beschrijving: ${productDescription}\n`;
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

  function generateInvestmentDetailsString() {
    const investmentItems = [
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

    const investmentAmountItems = [
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
    ];

    let investmentDetailsString = '';
    for (let i = 0; i < 10; i++) {
      if (investmentItems[i] && investmentAmountItems[i]) {
        switch (planLanguage) {
          case 'de':
            investmentDetailsString += `Investitionsdetails ${i + 2}: dies ist der Investitionsposten ${i + 2} ${investmentItems[i]} dies ist der Investitionsbetrag des Investitionspostens ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'fr':
            investmentDetailsString += `Détails de l'investissement ${i + 2}: ceci est l'élément d'investissement ${i + 2} ${investmentItems[i]} ceci est le montant de l'investissement de l'élément d'investissement ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'es':
            investmentDetailsString += `Detalles de la inversión ${i + 2}: este es el elemento de inversión ${i + 2} ${investmentItems[i]} este es el monto de inversión del elemento de inversión ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'it':
            investmentDetailsString += `Dettagli dell'investimento ${i + 2}: questo è l'elemento di investimento ${i + 2} ${investmentItems[i]} questo è l'importo dell'investimento dell'elemento di investimento ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'nl':
            investmentDetailsString += `Investering details ${i + 2}: dit is het investeringsitem ${i + 2} ${investmentItems[i]} dit is het investeringsbedrag van investeringsitem ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'ja':
            investmentDetailsString += `投資詳細 ${i + 2}: これは投資項目 ${i + 2} ${investmentItems[i]} これは投資項目 ${i + 2} の投資額 ${investmentAmountItems[i]}\n  `;
            break;
          case 'ar':
            investmentDetailsString += `تفاصيل الاستثمار ${i + 2}: هذا هو بند الاستثمار ${i + 2} ${investmentItems[i]} هذا هو مبلغ الاستثمار لبند الاستثمار ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'sv':
            investmentDetailsString += `Investeringsdetaljer ${i + 2}: detta är investeringsobjekt ${i + 2} ${investmentItems[i]} detta är investeringsbeloppet för investeringsobjekt ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'fi':
            investmentDetailsString += `Investointitiedot ${i + 2}: tämä on investointikohde ${i + 2} ${investmentItems[i]} tämä on investointikohteen ${i + 2} investointimäärä ${investmentAmountItems[i]}\n  `;
            break;
          case 'da':
            investmentDetailsString += `Investering detaljer ${i + 2}: dette er investeringsobjekt ${i + 2} ${investmentItems[i]} dette er investeringsbeløbet for investeringsobjekt ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          case 'no':
            investmentDetailsString += `Investering detaljer ${i + 2}: dette er investeringsobjekt ${i + 2} ${investmentItems[i]} dette er investeringsbeløpet for investeringsobjekt ${i + 2} ${investmentAmountItems[i]}\n  `;
            break;
          default:
            investmentDetailsString += `Investment details ${i + 2}: this is the investment item ${i + 2} ${investmentItems[i]} this is the investment amount of investment item ${i + 2} ${investmentAmountItems[i]}\n  `;
        }
      }
    }
    return investmentDetailsString;
  }

  let investmentDetails = '';

  if (investmentItem1 && investmentAmountItem1) {
    investmentDetails = generateInvestmentDetailsString();
  } else {
    investmentDetails = '';
  }

  let initialInvestmentAmountPrompt = '';

  if (initialInvestmentAmount) {
    switch (planLanguage) {
      case 'de':
        initialInvestmentAmountPrompt = `Investitionsdetails: Investitionsdetails 1: die Anfangsinvestition beträgt ${initialInvestmentAmount} 
          ${investmentDetails}
    Verwenden Sie diese Investitionsdetails im Thema Implementierungszeitplan.`;
        break;
      case 'fr':
        initialInvestmentAmountPrompt = `Détails de l'investissement: Détails de l'investissement 1: l'investissement initial est de ${initialInvestmentAmount} 
          ${investmentDetails}
    Utilisez ces détails d'investissement dans le sujet du calendrier de mise en œuvre.`;
        break;
      case 'es':
        initialInvestmentAmountPrompt = `Detalles de la inversión: Detalles de la inversión 1: la inversión inicial es de ${initialInvestmentAmount} 
          ${investmentDetails}
    Utilice estos detalles de inversión en el tema del cronograma de implementación.`;
        break;
      case 'it':
        initialInvestmentAmountPrompt = `Dettagli dell'investimento: Dettagli dell'investimento 1: l'investimento iniziale è di ${initialInvestmentAmount} 
          ${investmentDetails}
    Utilizza questi dettagli di investimento nell'argomento della timeline di implementazione.`;
        break;
      case 'nl':
        initialInvestmentAmountPrompt = `Investering details: Investering details 1: de initiële investering is ${initialInvestmentAmount} 
          ${investmentDetails}
    gebruik deze investeringsdetails in het Implementatie Tijdlijn onderwerp.`;
        break;
      case 'ja':
        initialInvestmentAmountPrompt = `投資詳細: 投資詳細 1: 初期投資は ${initialInvestmentAmount} 
          ${investmentDetails}
    これらの投資詳細を実装タイムラインのトピックで使用してください。`;
        break;
      case 'ar':
        initialInvestmentAmountPrompt = `تفاصيل الاستثمار: تفاصيل الاستثمار 1: الاستثمار الأولي هو ${initialInvestmentAmount} 
          ${investmentDetails}
    استخدم هذه التفاصيل الاستثمارية في موضوع الجدول الزمني للتنفيذ.`;
        break;
      case 'sv':
        initialInvestmentAmountPrompt = `Investeringsdetaljer: Investeringsdetaljer 1: den initiala investeringen är ${initialInvestmentAmount} 
          ${investmentDetails}
    använd dessa investeringsdetaljer i ämnet Implementeringstidslinje.`;
        break;
      case 'fi':
        initialInvestmentAmountPrompt = `Investointitiedot: Investointitiedot 1: alkuperäinen investointi on ${initialInvestmentAmount} 
          ${investmentDetails}
    käytä näitä investointitietoja aiheessa Toteutusaikataulu.`;
        break;
      case 'da':
        initialInvestmentAmountPrompt = `Investering detaljer: Investering detaljer 1: den indledende investering er ${initialInvestmentAmount} 
          ${investmentDetails}
    brug disse investeringsdetaljer i emnet Implementeringstidslinje.`;
        break;
      case 'no':
        initialInvestmentAmountPrompt = `Investering detaljer: Investering detaljer 1: den opprinnelige investeringen er ${initialInvestmentAmount} 
          ${investmentDetails}
    bruk disse investeringsdetaljene i emnet Implementeringstidslinje.`;
        break;
      default:
        initialInvestmentAmountPrompt = `Investment details: Investment details 1: the initial investment is ${initialInvestmentAmount} 
          ${investmentDetails}
    use these investment details in the Implementation Timeline topic.`;
    }
  }

  const op1TopicEN = 'Operations';
  const op1PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    for Quality Control topic, this should explain how the business will ensure the quality of the products or services. Be insightful when descibing the quality control details. use multiple <p> tags.

    for Implementation Plan topic, this should explain how the investment items will be implemented. Be descriptive when descibing the implementation details. surround each investment item implementation detail with <li> tag. use multiple <p> tags. 
    
    Do not repeat business details.
    use 400 words to generate ${op1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Quality Control</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the insightful ${op1TopicEN} you came up with:
    `;

  // german lang --------------------------------------------------------------
  const op1TopicDE = 'Betrieb';
  const op1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${op1TopicDE} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    Beim Thema „Qualitätskontrolle“ sollte erläutert werden, wie das Unternehmen die Qualität der Produkte oder Dienstleistungen sicherstellt. Seien Sie aufschlussreich, wenn Sie die Details der Qualitätskontrolle beschreiben. Verwenden Sie mehrere <p>-Tags.

    Für das Thema „Implementierungsplan“ sollte erläutert werden, wie die Investitionselemente implementiert werden. Seien Sie bei der Beschreibung der Implementierungsdetails aussagekräftig. Umschließen Sie jedes Implementierungsdetail eines Investitionselements mit dem Tag <li>. Verwenden Sie mehrere <p>-Tags.
  
    Wiederholen Sie keine Geschäftsdetails.
    Verwenden Sie 400 Wörter, um ${op1TopicDE} zu generieren.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie den Abschluss mit „<h4>Qualitätskontrolle</h4>“
    Fertigstellung auf Deutsch generieren.
  
    Dies ist das aufschlussreiche ${op1TopicDE}, das Sie sich ausgedacht haben:`;

  // french lang --------------------------------------------------------------
  const op1TopicFR = 'Opérations';
  const op1PromptFR = `
    Vous êtes un consultant professionnel, et un client vous approche pour écrire un ${op1TopicFR} long et détaillé pour un plan d'affaires.

  détails de l'entreprise :
  détail d'affaires 1 : Le nom de l'entreprise du client est ${businessName}.
  détail d'affaires 2 : Le type d'entreprise est ${businessType}.
  détail d'affaires 3 : L'emplacement de l'entreprise est : ${location}.
  détail d'affaires 4 : Le canal de distribution du client est : ${salesChannel}.
  détail d'affaires 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}

  ${initialInvestmentAmountPrompt}

  pour le sujet Contrôle de la Qualité, cela devrait expliquer comment l'entreprise assurera la qualité des produits ou services. Soyez perspicace en décrivant les détails du contrôle de la qualité. Utilisez plusieurs balises <p>.

  pour le sujet Plan d'Implémentation, cela devrait expliquer comment les éléments d'investissement seront mis en œuvre. Soyez descriptif en décrivant les détails de la mise en œuvre. Entourez chaque détail de mise en œuvre de l'élément d'investissement avec la balise <li>. Utilisez plusieurs balises <p>.

  Ne répétez pas les détails de l'entreprise.
  Utilisez 400 mots pour générer ${op1TopicFR}.
  Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  Commencez la rédaction avec "<h4>Contrôle de la Qualité</h4>"

  Voici le ${op1TopicFR} perspicace que vous avez élaboré :
    `;

  // spanish lang --------------------------------------------------------------
  const op1TopicES = 'Operaciones';
  const op1PromptES = `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${op1TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle de negocio 2: El tipo de negocio es ${businessType}.
    detalle de negocio 3: La ubicación del negocio es: ${location}.
    detalle de negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle de negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    ${initialInvestmentAmountPrompt}

    para el tema Control de Calidad, esto debe explicar cómo el negocio asegurará la calidad de los productos o servicios. Sea perspicaz al describir los detalles del control de calidad. Utilice varias etiquetas <p>.

    para el tema Plan de Implementación, esto debe explicar cómo se implementarán los elementos de inversión. Sea descriptivo al describir los detalles de la implementación. Rodee cada detalle de implementación del elemento de inversión con la etiqueta <li>. Utilice varias etiquetas <p>.

    No repita detalles del negocio.
    Utilice 400 palabras para generar ${op1TopicES}.
    Escriba esto como si usted fuera el propietario del negocio, utilizando "nosotros" y no "yo".
    Comience la redacción con "<h4>Control de Calidad</h4>"

    Este es el ${op1TopicES} perspicaz que usted ha elaborado:
    `;

  // italian lang --------------------------------------------------------------
  const op1TopicIT = 'Operazioni';
  const op1PromptIT = `
    Lei è un consulente professionale e un cliente si rivolge a lei per scrivere un ${op1TopicIT} lungo e dettagliato per un piano aziendale.

  dettagli aziendali:
  dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  dettaglio aziendale 3: La posizione dell'attività è: ${location}.
  dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  dettaglio aziendale 5: Lo stato operativo dell'attività del cliente è ${businessOperationalStatus}.

  Questi sono dettagli sui prodotti o servizi del cliente:
  ${productInfoPrompt}

  ${initialInvestmentAmountPrompt}

  per il tema Controllo della Qualità, questo dovrebbe spiegare come l'azienda garantirà la qualità dei prodotti o dei servizi. Sii perspicace nel descrivere i dettagli del controllo della qualità. Utilizza più tag <p>.

  per il tema Piano di Implementazione, questo dovrebbe spiegare come verranno implementati gli elementi di investimento. Sii descrittivo nel descrivere i dettagli dell'implementazione. Circonda ogni dettaglio di implementazione dell'elemento di investimento con il tag <li>. Utilizza più tag <p>.

  Non ripetere dettagli aziendali.
  Utilizza 400 parole per generare ${op1TopicIT}.
  Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" e non "io".
  Inizia il testo con "<h4>Controllo della Qualità</h4>"

  Questo è il ${op1TopicIT} perspicace che hai elaborato:
    `;

  //dutch lang --------------------------------------------------------------
  const op1TopicNL = 'Operaties';
  const op1PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${op1TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    ${initialInvestmentAmountPrompt}

    voor het onderwerp Kwaliteitscontrole, dit moet uitleggen hoe het bedrijf de kwaliteit van de producten of diensten zal waarborgen. Wees inzichtelijk bij het beschrijven van de details van de kwaliteitscontrole. gebruik meerdere <p> tags.

    voor het onderwerp Implementatieplan, dit moet uitleggen hoe de investeringsitems zullen worden geïmplementeerd. Wees beschrijvend bij het beschrijven van de implementatiedetails. omring elk detail van de implementatie van het investeringsitem met de <li> tag. gebruik meerdere <p> tags.

    Herhaal geen bedrijfsdetails.
    gebruik 400 woorden om ${op1TopicNL} te genereren.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Begin de voltooiing met "<h4>Kwaliteitscontrole</h4>"
    Genereer alles in het Nederlands.
    
    Dit is het inzichtelijke ${op1TopicNL} dat u heeft bedacht:
    `;

  //japanese lang --------------------------------------------------------------
  const op1TopicJP = 'オペレーション';
  const op1PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${op1TopicJP}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの場所は${location}です。
    ビジネス詳細4：クライアントの配信チャンネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    品質管理のトピックについて、これはビジネスが製品またはサービスの品質をどのように保証するかを説明するべきです。品質管理の詳細を説明するときには洞察力を持ってください。複数の<p>タグを使用してください。

    実装計画のトピックについて、これは投資項目がどのように実装されるかを説明するべきです。実装の詳細を説明するときには詳細を述べてください。各投資項目の実装詳細を<li>タグで囲んでください。複数の<p>タグを使用してください。
    
    ビジネスの詳細を繰り返さないでください。
    ${op1TopicJP}を生成するために400語を使用してください。
    これをビジネスのオーナーであるかのように書いてください、"私たち"を使用して"I"を使用しないでください。
    完成を"<h4>品質管理</h4>"で始めてください。
    すべてを日本語で生成してください。
    これがあなたが考え出した洞察に富んだ${op1TopicJP}です：
    `;

  //arabic lang --------------------------------------------------------------
  const op1TopicAR = 'العمليات';
  const op1PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${op1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: موقع العمل هو: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    بالنسبة لموضوع الرقابة على الجودة، يجب أن يشرح هذا كيف ستضمن الأعمال جودة المنتجات أو الخدمات. كن بصيرًا عند وصف تفاصيل الرقابة على الجودة. استخدم علامات <p> متعددة.

    بالنسبة لموضوع خطة التنفيذ، يجب أن يشرح هذا كيف سيتم تنفيذ عناصر الاستثمار. كن واضحًا عند وصف تفاصيل التنفيذ. أحاط كل تفصيل تنفيذ لعنصر الاستثمار بعلامة <li>. استخدم علامات <p> متعددة.
    
    لا تكرر تفاصيل العمل.
    استخدم 400 كلمة لإنشاء ${op1TopicAR}.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h4>الرقابة على الجودة</h4>"
    أنشئ كل شيء باللغة العربية.
    هذا هو ${op1TopicAR} الذي ابتكرته:
    `;

  //swedish lang --------------------------------------------------------------
  const op1TopicSV = 'Operationer';
  const op1PromptSV = `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${op1TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    affärsdetalj 3: Företagets plats är: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    för ämnet Kvalitetskontroll, detta bör förklara hur företaget kommer att säkerställa kvaliteten på produkterna eller tjänsterna. Var insiktsfull när du beskriver detaljerna för kvalitetskontroll. använd flera <p> taggar.

    för ämnet Implementeringsplan, detta bör förklara hur investeringsobjekten kommer att implementeras. Var beskrivande när du beskriver detaljerna för implementering. omge varje detalj för implementering av investeringsobjekt med <li> tagg. använd flera <p> taggar. 
    
    Upprepa inte affärsdetaljer.
    använd 400 ord för att generera ${op1TopicSV}. 
    Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
    Börja slutförandet med "<h4>Kvalitetskontroll</h4>"
    Generera allt på svenska.
    Detta är den insiktsfulla ${op1TopicSV} du kom på:
    `;

  //finnish lang --------------------------------------------------------------
  const op1TopicFI = 'Toiminta';
  const op1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${op1TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan yksityiskohta 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat yksityiskohtia asiakkaan tuotteista tai palveluista:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    Laadunvalvonta-aiheessa tämän tulisi selittää, miten yritys varmistaa tuotteiden tai palveluiden laadun. Ole oivaltava kuvatessasi laadunvalvonnan yksityiskohtia. käytä useita <p> -tageja.

    Toteutussuunnitelma-aiheessa tämän tulisi selittää, miten investointikohteet toteutetaan. Ole kuvaileva kuvatessasi toteutuksen yksityiskohtia. ympäröi jokainen investointikohteen toteutuksen yksityiskohta <li> -tagilla. käytä useita <p> -tageja. 
    
    Älä toista liiketoiminnan yksityiskohtia.
    käytä 400 sanaa generoidaksesi ${op1TopicFI}. 
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h4>Laadunvalvonta</h4>"
    Generoi kaikki suomeksi.
    Tämä on oivaltava ${op1TopicFI}, jonka keksit:
    `;

  // danish lang --------------------------------------------------------------
  const op1TopicDA = 'Drift';
  const op1PromptDA = `
    Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${op1TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af forretning er ${businessType}. 
    forretningsdetalje 3: Forretningens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Disse er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    for emnet Kvalitetskontrol, dette skal forklare, hvordan virksomheden vil sikre kvaliteten af produkterne eller tjenesterne. Vær indsigtsfuld, når du beskriver detaljerne om kvalitetskontrol. brug flere <p> tags.

    for emnet Implementeringsplan, dette skal forklare, hvordan investeringsobjekterne vil blive implementeret. Vær beskrivende, når du beskriver detaljerne om implementering. omgiv hver detalje om implementering af investeringsobjekt med <li> tag. brug flere <p> tags. 
    
    Gentag ikke forretningsdetaljer.
    brug 400 ord til at generere ${op1TopicDA}. 
    Skriv dette, som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
    Begynd udfyldelsen med "<h4>Kvalitetskontrol</h4>"
    Generer alt på dansk.
    Dette er den indsigtsfulde ${op1TopicDA}, du kom op med:
    `;

  // norwegian lang --------------------------------------------------------------
  const op1TopicNO = 'Drift';
  const op1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer deg for å skrive en lang og detaljert ${op1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Virksomhetens plassering er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    for Kvalitetskontroll emnet, dette skal forklare hvordan virksomheten vil sikre kvaliteten på produktene eller tjenestene. Vær innsiktsfull når du beskriver detaljene om kvalitetskontroll. bruk flere <p> tags.

    for Implementeringsplan emnet, dette skal forklare hvordan investeringsobjektene vil bli implementert. Vær beskrivende når du beskriver detaljene om implementering. omgir hver detalj om implementering av investeringsobjekt med <li> tag. bruk flere <p> tags. 
    
    Gjenta ikke forretningsdetaljer.
    bruk 400 ord for å generere ${op1TopicNO}. 
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Begynn utfyllingen med "<h4>Kvalitetskontroll</h4>"
    Generer alt på norsk.
    Dette er den innsiktsfulle ${op1TopicNO} du kom opp med:
    `;

  //other lang --------------------------------------------------------------
  const op1TopicOT = 'Operations';
  const op1PromptOT = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    ${initialInvestmentAmountPrompt}

    for Quality Control topic, this should explain how the business will ensure the quality of the products or services. Be insightful when descibing the quality control details. use multiple <p> tags.

    for Implementation Plan topic, this should explain how the investment items will be implemented. Be descriptive when descibing the implementation details. surround each investment item implementation detail with <li> tag. use multiple <p> tags. 
    
    Do not repeat business details.
    use 400 words to generate ${op1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Quality Control</h4>"
    Generate everything in English.
    This is the insightful ${op1TopicEN} you came up with:
    `;

  let op1PromptFinal = '';

  if (planLanguage === 'en') {
    op1PromptFinal = op1PromptEN;
  } else if (planLanguage === 'de') {
    op1PromptFinal = op1PromptDE;
  } else if (planLanguage === 'fr') {
    op1PromptFinal = op1PromptFR;
  } else if (planLanguage === 'es') {
    op1PromptFinal = op1PromptES;
  } else if (planLanguage === 'it') {
    op1PromptFinal = op1PromptIT;
  } else if (planLanguage === 'nl') {
    op1PromptFinal = op1PromptNL;
  } else if (planLanguage === 'ja') {
    op1PromptFinal = op1PromptJP;
  } else if (planLanguage === 'ar') {
    op1PromptFinal = op1PromptAR;
  } else if (planLanguage === 'sv') {
    op1PromptFinal = op1PromptSV;
  } else if (planLanguage === 'fi') {
    op1PromptFinal = op1PromptFI;
  } else if (planLanguage === 'da') {
    op1PromptFinal = op1PromptDA;
  } else if (planLanguage === 'no') {
    op1PromptFinal = op1PromptNO;
  } else {
    op1PromptFinal = op1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: op1PromptFinal }],
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
