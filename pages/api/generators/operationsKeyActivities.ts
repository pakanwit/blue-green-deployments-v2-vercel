import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IOperationsKeyActivities {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;

  initialInvestmentAmount: string;
  investmentItem1: string;
  investmentItem2: string;
  investmentItem3: string;
  investmentItem4: string;
  investmentItem5: string;
  investmentItem6: string;
  investmentItem7: string;
  investmentItem8: string;
  investmentItem9: string;
  investmentItem10: string;

  investmentAmountItem1: string;
  investmentAmountItem2: string;
  investmentAmountItem3: string;
  investmentAmountItem4: string;
  investmentAmountItem5: string;
  investmentAmountItem6: string;
  investmentAmountItem7: string;
  investmentAmountItem8: string;
  investmentAmountItem9: string;
  investmentAmountItem10: string;

  productInfoPrompt: string;
  planLanguage: string;
  AITopic: string;
  variantID: string;
  modelName?: string;
}

// api8Op1.ts
export const operationsKeyActivities = (request: IOperationsKeyActivities) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,

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

    productInfoPrompt,
    planLanguage,
    AITopic,
    variantID,
    modelName,
  } = request;

  const generateInvestmentDetailsString = (
    investmentItems: string[],
    investmentAmountItems: string[],
  ) => {
    const translations = {
      de: 'Investitionsdetails {index}: dies ist der Investitionsposten {index} {item} dies ist der Investitionsbetrag des Investitionspostens {index} {amount}',
      fr: "Détails de l'investissement {index}: ceci est l'élément d'investissement {index} {item} ceci est le montant de l'investissement de l'élément d'investissement {index} {amount}",
      es: 'Detalles de la inversión {index}: este es el elemento de inversión {index} {item} este es el monto de inversión del elemento de inversión {index} {amount}',
      it: "Dettagli dell'investimento {index}: questo è l'elemento di investimento {index} {item} questo è l'importo dell'investimento dell'elemento di investimento {index} {amount}",
      nl: 'Investering details {index}: dit is het investeringsitem {index} {item} dit is het investeringsbedrag van investeringsitem {index} {amount}',
      ja: '投資詳細 {index}: これは投資項目 {index} {item} これは投資項目 {index} の投資額 {amount}',
      ar: 'تفاصيل الاستثمار {index}: هذا هو بند الاستثمار {index} {item} هذا هو مبلغ الاستثمار لبند الاستثمار {index} {amount}',
      sv: 'Investeringsdetaljer {index}: detta är investeringsobjekt {index} {item} detta är investeringsbeloppet för investeringsobjekt {index} {amount}',
      fi: 'Investointitiedot {index}: tämä on investointikohde {index} {item} tämä on investointikohteen {index} investointimäärä {amount}',
      da: 'Investering detaljer {index}: dette er investeringspunkt {index} {item} dette er investeringsbeløbet for investeringspunkt {index} {amount}',
      no: 'Investering detaljer {index}: dette er investeringspunkt {index} {item} dette er investeringsbeløpet for investeringspunkt {index} {amount}',
      default:
        'Investment details {index}: this is the investment item {index} {item} this is the investment amount of investment item {index} {amount}',
    };

    let investmentDetailsString = '';
    const translationTemplate =
      translations[planLanguage] || translations['default'];

    investmentItems.forEach((item, index) => {
      const amount = investmentAmountItems[index];
      if (item && amount) {
        investmentDetailsString +=
          translationTemplate
            .replace(/{index}/g, index + 2)
            .replace('{item}', item)
            .replace('{amount}', amount) + '\n  ';
      }
    });

    return investmentDetailsString;
  };

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

  let investmentDetails = '';

  if (investmentItems[0] && investmentAmountItems[0]) {
    investmentDetails = generateInvestmentDetailsString(
      investmentItems,
      investmentAmountItems,
    );
  }

  let initialInvestmentAmountPrompt = '';

  const generateInitialInvestmentAmountPrompt = (
    initialInvestmentAmount,
    investmentDetails,
  ) => {
    const templates = {
      de: `Investitionsdetails: Investitionsdetails 1: die Anfangsinvestition beträgt {initialInvestmentAmount}
      {investmentDetails}
      Verwenden Sie diese Investitionsdetails im Thema Implementierungszeitplan.`,
      fr: `Détails de l'investissement: Détails de l'investissement 1: l'investissement initial est de {initialInvestmentAmount}
      {investmentDetails}
      Utilisez ces détails d'investissement dans le sujet du calendrier de mise en œuvre.`,
      es: `Detalles de la inversión: Detalles de la inversión 1: la inversión inicial es de {initialInvestmentAmount}
      {investmentDetails}
      Utilice estos detalles de inversión en el tema del cronograma de implementación.`,
      it: `Dettagli dell'investimento: Dettagli dell'investimento 1: l'investimento iniziale è di {initialInvestmentAmount}
      {investmentDetails}
      Utilizza questi dettagli di investimento nell'argomento della timeline di implementazione.`,
      nl: `Investering details: Investering details 1: de initiële investering is {initialInvestmentAmount}
      {investmentDetails}
      gebruik deze investeringsdetails in het onderwerp Implementatie Tijdlijn.`,
      ja: `投資詳細: 投資詳細 1: 初期投資は {initialInvestmentAmount}
      {investmentDetails}
      これらの投資詳細を実装タイムラインのトピックで使用してください。`,
      ar: `تفاصيل الاستثمار: تفاصيل الاستثمار 1: الاستثمار الأولي هو {initialInvestmentAmount}
      {investmentDetails}
      استخدم هذه التفاصيل الاستثمارية في موضوع الجدول الزمني للتنفيذ.`,
      sv: `Investeringsdetaljer: Investeringsdetaljer 1: den initiala investeringen är {initialInvestmentAmount}
      {investmentDetails}
      använd dessa investeringsdetaljer i ämnet Implementeringstidslinje.`,
      fi: `Investointitiedot: Investointitiedot 1: alkuperäinen investointi on {initialInvestmentAmount}
      {investmentDetails}
      käytä näitä investointitietoja toteutusaikatauluaiheessa.`,
      da: `Investering detaljer: Investering detaljer 1: den indledende investering er {initialInvestmentAmount}
      {investmentDetails}
      brug disse investeringsdetaljer i emnet Implementeringstidslinje.`,
      no: `Investering detaljer: Investering detaljer 1: den innledende investeringen er {initialInvestmentAmount}
      {investmentDetails}
      bruk disse investeringsdetaljene i emnet Implementeringstidslinje.`,
      default: `Investment details: Investment details 1: the initial investment is {initialInvestmentAmount}
      {investmentDetails}
      use these investment details in the Implementation Timeline topic.`,
    };

    // Select the appropriate template or fall back to 'default'
    const template = templates[planLanguage] || templates.default;

    // Replace placeholders with actual values
    return template
      .replace('{initialInvestmentAmount}', initialInvestmentAmount)
      .replace('{investmentDetails}', investmentDetails);
  };

  if (initialInvestmentAmount) {
    initialInvestmentAmountPrompt = generateInitialInvestmentAmountPrompt(
      initialInvestmentAmount,
      investmentDetails,
    );
  }

  function generateAITopicAllOp(data) {
    let output = '';

    if (data?.hasOwnProperty('operation')) {
      data['operation'].forEach((item) => {
        output += `Topic: ${item.topic}\n`;
        output += `Question: ${item.question}\n`;
        output += `Answer: ${item.answer}\n\n`;
      });
    }

    return output;
  }

  function generateAITopicTopicOp(data) {
    let output = '';

    if (data?.hasOwnProperty('operation')) {
      data['operation'].forEach((item) => {
        output += `${item.topic}, `;
      });
    }

    return output;
  }

  const AITopicAllOpString = generateAITopicAllOp(AITopic);
  const AITopicTopicOpString = generateAITopicTopicOp(AITopic);

  const op1TopicEN = 'Operations';
  const op1TopicDE = 'Betrieb';
  const op1TopicFR = 'Opérations';
  const op1TopicES = 'Operaciones';
  const op1TopicIT = 'Operazioni';
  const op1TopicNL = 'Operaties';
  const op1TopicJA = 'オペレーション';
  const op1TopicAR = 'العمليات';
  const op1TopicSV = 'Operationer';
  const op1TopicFI = 'Toiminta';
  const op1TopicDA = 'Drift';
  const op1TopicNO = 'Drift';

  const promptTemplates = {
    en: `You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    These are details of the client's products or services:
    ${productInfoPrompt}
  
    The ${op1TopicEN} should include these topics: ${AITopicTopicOpString}
    Be extremely detailed and insightful in your response for these aforementioned topics. Cover multiple aspects for each of these topics.
  
    These are more information to generate the aforementioned topics:
    ${AITopicAllOpString}
    
    Do not repeat business details. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>".
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Use at least 1000 words.
  Generate everything in English.
    This is important: Be VERY insightful in your response.
    This is the long, detailed, and insightful ${op1TopicEN} you came up with:
    `,
    'en-uk': `You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    These are details of the client's products or services:
    ${productInfoPrompt}
  
    The ${op1TopicEN} should include these topics: ${AITopicTopicOpString}
    Be extremely detailed and insightful in your response for these aforementioned topics. Cover multiple aspects for each of these topics.
  
    These are more information to generate the aforementioned topics:
    ${AITopicAllOpString}
    
    Do not repeat business details. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>".
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Use at least 1000 words.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be VERY insightful in your response.
    This is the long, detailed, and insightful ${op1TopicEN} you came up with:
    `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um ein langes und detailliertes ${op1TopicDE} für einen Geschäftsplan zu schreiben.

    Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdaten 3: Der Standort des Unternehmens ist: ${location}.
    Geschäftsdaten 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdaten 5: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Dies sind Details zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
  
    Das ${op1TopicDE} sollte diese Themen umfassen: ${AITopicTopicOpString}
    Seien Sie in Ihrer Antwort zu diesen oben genannten Themen äußerst detailliert und aufschlussreich. Decken Sie mehrere Aspekte für jedes dieser Themen ab.
  
    Dies sind weitere Informationen zur Erstellung der oben genannten Themen:
    ${AITopicAllOpString}
    
    Wiederholen Sie keine Geschäftsdaten. 
    Schreiben Sie dies, als wären Sie der Eigentümer des Unternehmens, verwenden Sie "wir", nicht "ich".
    Beginnen Sie die Ausführung mit "<h3>Betrieb</h3>".
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
    Verwenden Sie mindestens 1000 Wörter.
  Generieren Sie alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort SEHR aufschlussreich.
    Dies ist das lange, detaillierte und aufschlussreiche ${op1TopicDE}, das Sie sich ausgedacht haben:
    `,
    fr: `Vous êtes un consultant professionnel, et un client vous demande d'écrire un ${op1TopicFR} long et détaillé pour un plan d'affaires.

    détails de l'entreprise:
    détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
    détail de l'entreprise 2: Le type d'entreprise est ${businessType}. 
    détail de l'entreprise 3: L'emplacement de l'entreprise est: ${location}.
    détail de l'entreprise 4: Le canal de distribution du client est: ${salesChannel}.
    détail de l'entreprise 5: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Voici des détails sur les produits ou services du client:
    ${productInfoPrompt}
  
    Le ${op1TopicFR} devrait inclure ces sujets: ${AITopicTopicOpString}
    Soyez extrêmement détaillé et perspicace dans votre réponse pour ces sujets mentionnés ci-dessus. Couvrez plusieurs aspects pour chacun de ces sujets.
  
    Voici plus d'informations pour générer les sujets mentionnés ci-dessus:
    ${AITopicAllOpString}
    
    Ne répétez pas les détails de l'entreprise. 
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Commencez la rédaction par "<h3>Opérations</h3>".
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les puces, utilisez plutôt la balise <li>.
    Utilisez au moins 1000 mots.
  Générez tout en français.
    C'est important: Soyez TRÈS perspicace dans votre réponse.
    Voici le ${op1TopicFR} long, détaillé et perspicace que vous avez imaginé:
    `,
    es: `Eres un consultor profesional, y un cliente se acerca a ti para escribir un ${op1TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: La ubicación del negocio es: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
  
    El ${op1TopicES} debe incluir estos temas: ${AITopicTopicOpString}
    Sea extremadamente detallado y perspicaz en su respuesta para estos temas mencionados anteriormente. Cubra múltiples aspectos para cada uno de estos temas.
  
    Aquí hay más información para generar los temas mencionados anteriormente:
    ${AITopicAllOpString}
    
    No repita los detalles del negocio. 
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no "yo".
    Comience la redacción con "<h3>Operaciones</h3>".
    Use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para puntos de viñeta, en su lugar use la etiqueta <li>.
    Use al menos 1000 palabras.
  Genere todo en español.
    Esto es importante: Sea MUY perspicaz en su respuesta.
    Este es el ${op1TopicES} largo, detallado y perspicaz que se le ocurrió:
    `,
    it: `Sei un consulente professionista e un cliente si rivolge a te per scrivere un ${op1TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
    dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
  
    Il ${op1TopicIT} dovrebbe includere questi argomenti: ${AITopicTopicOpString}
    Sii estremamente dettagliato e perspicace nella tua risposta per questi argomenti sopra menzionati. Copri più aspetti per ciascuno di questi argomenti.
  
    Queste sono ulteriori informazioni per generare gli argomenti sopra menzionati:
    ${AITopicAllOpString}
    
    Non ripetere i dettagli aziendali. 
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
    Inizia la redazione con "<h3>Operazioni</h3>".
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece il tag <li>.
    Usa almeno 1000 parole.
  genera tutto in italiano
    Questo è importante: Sii MOLTO perspicace nella tua risposta.
    Questo è il ${op1TopicIT} lungo, dettagliato e perspicace che hai ideato:
    `,
    nl: `U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${op1TopicNL} voor een bedrijfsplan te schrijven.

    bedrijfsgegevens:
    bedrijfsgegevens 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegevens 2: Het type bedrijf is ${businessType}. 
    bedrijfsgegevens 3: De locatie van het bedrijf is: ${location}.
    bedrijfsgegevens 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsgegevens 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}
  
    Het ${op1TopicNL} moet deze onderwerpen bevatten: ${AITopicTopicOpString}
    Wees uiterst gedetailleerd en inzichtelijk in uw antwoord op deze bovengenoemde onderwerpen. Bespreek meerdere aspecten voor elk van deze onderwerpen.
  
    Dit zijn meer informatie om de bovengenoemde onderwerpen te genereren:
    ${AITopicAllOpString}
    
    Herhaal geen bedrijfsgegevens. 
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Begin de uitvoering met "<h3>Operaties</h3>".
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
    Gebruik minimaal 1000 woorden.
  genereer alles in het Nederlands
    Dit is belangrijk: Wees ZEER inzichtelijk in uw antwoord.
    Dit is het lange, gedetailleerde en inzichtelijke ${op1TopicNL} dat u hebt bedacht:
    `,
    ja: `あなたはプロのコンサルタントであり、顧客がビジネスプランのために長く詳細な${op1TopicJA}を書くように依頼してきます。

    ビジネスの詳細:
    ビジネスの詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネスの詳細 2: ビジネスの種類は${businessType}です。
    ビジネスの詳細 3: ビジネスの場所は${location}です。
    ビジネスの詳細 4: クライアントの流通チャネルは${salesChannel}です。
    ビジネスの詳細 5: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
  
    ${initialInvestmentAmountPrompt}
  
    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}
  
    ${op1TopicJA}にはこれらのトピックを含める必要があります: ${AITopicTopicOpString}
    上記のトピックに対する回答は非常に詳細で洞察に富んだものである必要があります。各トピックについて複数の側面をカバーしてください。
  
    これらは上記のトピックを生成するための追加情報です:
    ${AITopicAllOpString}
    
    ビジネスの詳細を繰り返さないでください。
    これをビジネスのオーナーとして書いてください。「私」ではなく「私たち」を使用してください。
    "<h3>オペレーション</h3>"で完了を開始してください。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にしてください。* *を使用せず、代わりに<em>タグを使用して斜体にしてください。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
    少なくとも1000語を使用してください。
  すべてを日本語で生成してください。
    これは重要です: 回答には非常に洞察に富んだものにしてください。
    これはあなたが考えた長く、詳細で洞察に富んだ${op1TopicJA}です:
    `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${op1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: موقع العمل هو: ${location}.
    تفاصيل العمل 4: قناة توزيع العميل هي: ${salesChannel}.
    تفاصيل العمل 5: الحالة التشغيلية لعمل العميل هي ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
  
    يجب أن يتضمن ${op1TopicAR} هذه المواضيع: ${AITopicTopicOpString}
    كن مفصلاً للغاية وبصيراً في ردك على هذه المواضيع المذكورة أعلاه. غطِ جوانب متعددة لكل من هذه المواضيع.
  
    هذه هي المزيد من المعلومات لتوليد المواضيع المذكورة أعلاه:
    ${AITopicAllOpString}
    
    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>العمليات</h3>".
    استخدم علامات HTML فقط، لا تستخدم الماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
    استخدم ما لا يقل عن 1000 كلمة.
  قم بتوليد كل شيء باللغة العربية.
    هذا مهم: كن بصيراً جداً في ردك.
    هذا هو ${op1TopicAR} الطويل والمفصل والبصير الذي توصلت إليه:
    `,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${op1TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är ${businessType}.
    affärsdetalj 3: Företagets plats är: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens affärsdriftstatus är ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}
  
    ${op1TopicSV} bör inkludera dessa ämnen: ${AITopicTopicOpString}
    Var extremt detaljerad och insiktsfull i ditt svar på dessa ovan nämnda ämnen. Täck flera aspekter för vart och ett av dessa ämnen.
  
    Dessa är mer information för att generera de ovan nämnda ämnena:
    ${AITopicAllOpString}
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren av företaget, använd "vi" inte "jag".
    Börja slutförandet med "<h3>Operationer</h3>".
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <li>-taggen.
    Använd minst 1000 ord.
  generera allt på svenska
    Detta är viktigt: Var MYCKET insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${op1TopicSV} du kom på:
    `,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${op1TopicFI} liiketoimintasuunnitelmaa varten.

    liiketoiminnan yksityiskohdat:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Yrityksen tyyppi on ${businessType}.
    liiketoiminnan yksityiskohta 3: Yrityksen sijainti on: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Nämä ovat asiakkaan tuotteiden tai palveluiden yksityiskohdat:
    ${productInfoPrompt}
  
    ${op1TopicFI} tulisi sisältää nämä aiheet: ${AITopicTopicOpString}
    Ole erittäin yksityiskohtainen ja oivaltava vastauksessasi näihin edellä mainittuihin aiheisiin. Käsittele useita näkökohtia kullekin näistä aiheista.
  
    Nämä ovat lisätietoja edellä mainittujen aiheiden tuottamiseksi:
    ${AITopicAllOpString}
    
    Älä toista liiketoiminnan yksityiskohtia.
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h3>Toiminta</h3>".
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
    Käytä vähintään 1000 sanaa.
  Generoi kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${op1TopicFI}, jonka keksit:
    `,
    da: `Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${op1TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedens type er ${businessType}.
    forretningsdetalje 3: Virksomhedens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Disse er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
  
    ${op1TopicDA} bør inkludere disse emner: ${AITopicTopicOpString}
    Vær ekstremt detaljeret og indsigtsfuld i dit svar på disse førnævnte emner. Dæk flere aspekter for hvert af disse emner.
  
    Disse er mere information for at generere de førnævnte emner:
    ${AITopicAllOpString}
    
    Gentag ikke forretningsdetaljer.
    Skriv dette, som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Begynd fuldførelsen med "<h3>Drift</h3>".
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv. Brug ikke * til punkttegn, brug i stedet <li>-tag.
    Brug mindst 1000 ord.
  generer alt på dansk
    Dette er vigtigt: Vær MEGET indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${op1TopicDA}, du kom op med:
    `,
    no: `Du er en profesjonell konsulent, og en kunde henvender seg til deg for å skrive en lang og detaljert ${op1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens bedriftsnavn er ${businessName}.
    forretningsdetalj 2: Bedriftens type er ${businessType}. 
    forretningsdetalj 3: Bedriftens beliggenhet er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    ${initialInvestmentAmountPrompt}
  
    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
  
    ${op1TopicNO} bør inkludere disse emnene: ${AITopicTopicOpString}
    Vær ekstremt detaljert og innsiktsfull i ditt svar på disse nevnte emnene. Dekk flere aspekter for hvert av disse emnene.
  
    Dette er mer informasjon for å generere de nevnte emnene:
    ${AITopicAllOpString}
    
    Ikke gjenta forretningsdetaljer. 
    Skriv dette som om du er eieren av bedriften, bruk "vi" ikke "jeg".
    Begynn fullføringen med "<h3>Drift</h3>".
    bruk kun HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-tag for fet skrift. Ikke bruk * *, bruk i stedet <em>-tag for kursiv. Ikke bruk * for punkttegn, bruk i stedet <li>-tag.
    Bruk minst 1000 ord.
  generer alt på norsk
    Dette er viktig: Vær VELDIG innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${op1TopicNO} du kom opp med:
    `,
  };

  const model =
    variantID === '2' ? AI_MODEL.GPT_4O_MINI : AI_MODEL.GPT_3_5_TURBO;
  console.log('model:', model);
  const payload = {
    model: modelName ? modelName : model,
    messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };
  return OpenAIStream(payload);
};
