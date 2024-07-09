import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { FireworksAIStream } from '../../../utils/llama3/FireworksAIStream';

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
  variantID: string;
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
    variantID,
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
    en: `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    ${initialInvestmentAmountPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    The ${op1TopicEN} should include these topics: "Key Activies", "Implementation Plan", and "Technology Strategy"

    The topic of “key activities” should explain the day-to-day activities that ensure the customer receives the product or service. Explain what happens during each activity. Be descriptive when describing the activities. Wrap each activity with the <li> tag.

    for Implementation Plan topic, this should explain how the investment items will be implemented. Be descriptive when descibing the implementation details. surround each investment item implementation detail with <li> tag  

    for Technology Strategy topic, this should describe how technology can enhance the business. wrap each technology tactic with <li> tag. 
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${op1TopicEN} you came up with:
    `,
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    ${initialInvestmentAmountPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    The ${op1TopicEN} should include these topics: "Key Activies", "Implementation Plan", and "Technology Strategy"

    The topic of “key activities” should explain the day-to-day activities that ensure the customer receives the product or service. Explain what happens during each activity. Be descriptive when describing the activities. Wrap each activity with the <li> tag.

    for Implementation Plan topic, this should explain how the investment items will be implemented. Be descriptive when descibing the implementation details. surround each investment item implementation detail with <li> tag  

    for Technology Strategy topic, this should describe how technology can enhance the business. wrap each technology tactic with <li> tag. 
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${op1TopicEN} you came up with:
    `,
    de: `
                Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${op1TopicDE} für einen Geschäftsplan zu verfassen.

                Geschäftsdaten:
                Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
                Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
                Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
                Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
                Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
            
                Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
                ${productInfoPrompt}
                
                ${initialInvestmentAmountPrompt}
            
                Das ${op1TopicDE} sollte die folgenden Themen enthalten: „Schlüsselaktivitäten“, „Implementierungsplan“ und „Technologiestrategie“.
            
                Beim Thema „Schlüsselaktivitäten“ sollten die alltäglichen Aktivitäten erläutert werden, damit der Kunde das Produkt oder die Dienstleistung erhält. Erklären Sie, was bei den einzelnen Aktivitäten passiert. Seien Sie beschreibend, wenn Sie die Aktivitäten beschreiben. Umschließen Sie jede Aktivität mit dem Tag <li>.
            
                Für das Thema „Implementierungsplan“ sollte erläutert werden, wie die Investitionselemente implementiert werden. Seien Sie bei der Beschreibung der Implementierungsdetails aussagekräftig. Umschließen Sie jedes Implementierungsdetail eines Investitionselements mit dem Tag <li>
            
                Beim Thema „Technologiestrategie“ sollte hier beschrieben werden, wie Technologie das Unternehmen verbessern kann. Verpacken Sie jede Technologietaktik mit dem <li>-Tag.
            
                Wiederholen Sie keine Geschäftsdetails.
                Verwenden Sie 2000 Token, um ${op1TopicDE} zu generieren.
                Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
                Beginnen Sie den Abschluss mit „<h3>Betrieb</h3>“, gefolgt von „<h4>Wichtigste Aktivitäten</h4>“.
                Fertigstellung auf Deutsch generieren.
            
                Dies ist das lange, detaillierte und ausführliche ${op1TopicDE}, das Sie sich ausgedacht haben:`,
    fr: `
                Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${op1TopicFR} long et détaillé pour un plan d'affaires.

                Détails de l'entreprise :
                Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
                Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
                Détail de l'entreprise 3 : L'emplacement de l'entreprise est : ${location}.
                Détail de l'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
                Détail de l'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Voici les détails des produits ou services du client :
                ${productInfoPrompt}
            
                Le ${op1TopicFR} devrait inclure ces sujets : "Activités clés", "Plan d'implémentation" et "Stratégie technologique".
            
                Le sujet des "activités clés" devrait expliquer les activités quotidiennes qui assurent que le client reçoit le produit ou le service. Expliquez ce qui se passe pendant chaque activité. Soyez descriptif lorsque vous décrivez les activités. Entourez chaque activité avec la balise <li>.
            
                Pour le sujet du "Plan d'implémentation", cela devrait expliquer comment les éléments d'investissement seront mis en œuvre. Soyez descriptif lorsque vous décrivez les détails de l'implémentation. Entourez chaque détail d'implémentation d'un élément d'investissement avec la balise <li>.
            
                Pour le sujet de la "Stratégie technologique", cela devrait décrire comment la technologie peut améliorer l'entreprise. Entourez chaque tactique technologique avec la balise <li>.
            
                Ne répétez pas les détails de l'entreprise.
                Utilisez 2000 tokens pour générer ${op1TopicFR}.
                Écrivez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
                Commencez la réalisation avec "<h3>Opérations</h3>" suivi de "<h4>Activités clés</h4>"
                génère tout en français
                Voici le ${op1TopicFR} long, détaillé et approfondi que vous avez élaboré :`,
    es: `
                Eres un consultor profesional y un cliente se acerca a ti para escribir un ${op1TopicES} largo y detallado para un plan de negocios.

                detalles del negocio:
                detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
                detalle del negocio 2: El tipo de negocio es ${businessType}. 
                detalle del negocio 3: La ubicación del negocio es: ${location}.
                detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
                detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Estos son los detalles de los productos o servicios del cliente:
                ${productInfoPrompt}
            
                El ${op1TopicES} debería incluir estos temas: "Actividades clave", "Plan de implementación" y "Estrategia tecnológica"
            
                El tema de "actividades clave" debería explicar las actividades diarias que aseguran que el cliente reciba el producto o servicio. Explica qué sucede durante cada actividad. Sé descriptivo al describir las actividades. Envuelve cada actividad con la etiqueta <li>.
            
                para el tema del Plan de implementación, esto debería explicar cómo se implementarán los elementos de inversión. Sé descriptivo al describir los detalles de la implementación. rodea cada detalle de implementación del elemento de inversión con la etiqueta <li>  
            
                para el tema de la Estrategia tecnológica, esto debería describir cómo la tecnología puede mejorar el negocio. envuelve cada táctica tecnológica con la etiqueta <li>. 
                
                No repitas los detalles del negocio.
                usa 2000 tokens para generar ${op1TopicES}. 
                Escribe esto como si fueras el dueño del negocio, usando "nosotros" no uses "yo".
                Comienza la realización con "<h3>Operaciones</h3>" seguido de "<h4>Actividades clave</h4>"
                genera todo en español
                Este es el ${op1TopicES} largo, detallado y extenso que has elaborado:`,
    it: `
                Sei un consulente professionista e un cliente si avvicina a te per scrivere un ${op1TopicIT} lungo e dettagliato per un piano aziendale.

                dettagli aziendali:
                dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
                dettaglio aziendale 2: Il tipo di attività è ${businessType}. 
                dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
                dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
                dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Questi sono i dettagli dei prodotti o servizi del cliente:
                ${productInfoPrompt}
            
                Il ${op1TopicIT} dovrebbe includere questi argomenti: "Attività chiave", "Piano di implementazione" e "Strategia tecnologica"
            
                L'argomento delle "attività chiave" dovrebbe spiegare le attività quotidiane che assicurano che il cliente riceva il prodotto o il servizio. Spiega cosa succede durante ogni attività. Sii descrittivo quando descrivi le attività. Racchiudi ogni attività nel tag <li>.
            
                per l'argomento del Piano di implementazione, questo dovrebbe spiegare come verranno implementati gli elementi di investimento. Sii descrittivo quando descrivi i dettagli dell'implementazione. circonda ogni dettaglio di implementazione dell'elemento di investimento con il tag <li>  
            
                per l'argomento della Strategia tecnologica, questo dovrebbe descrivere come la tecnologia può migliorare l'azienda. racchiudi ogni tattica tecnologica nel tag <li>. 
                
                Non ripetere i dettagli aziendali.
                usa 2000 token per generare ${op1TopicIT}. 
                Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
                Inizia il completamento con "<h3>Operazioni</h3>" seguito da "<h4>Attività chiave</h4>"
                genera tutto in italiano
                Questo è il ${op1TopicIT} lungo, dettagliato e approfondito che hai elaborato:`,
    nl: `
                Je bent een professionele consultant en een klant benadert je om een lang en gedetailleerd ${op1TopicNL} te schrijven voor een bedrijfsplan.
            
                bedrijfsdetails:
                bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
                bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
                bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
                bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
                bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Dit zijn details van de producten of diensten van de klant:
                ${productInfoPrompt}
            
                Het ${op1TopicNL} moet deze onderwerpen bevatten: "Kernactiviteiten", "Implementatieplan" en "Technologiestrategie"
            
                Het onderwerp "kernactiviteiten" moet de dagelijkse activiteiten uitleggen die ervoor zorgen dat de klant het product of de dienst ontvangt. Leg uit wat er gebeurt tijdens elke activiteit. Wees beschrijvend bij het beschrijven van de activiteiten. Omring elke activiteit met de <li> tag.
            
                voor het onderwerp Implementatieplan, dit moet uitleggen hoe de investeringsitems zullen worden geïmplementeerd. Wees beschrijvend bij het beschrijven van de implementatiedetails. omring elk detail van de implementatie van het investeringsitem met de <li> tag  
            
                voor het onderwerp Technologiestrategie, dit moet beschrijven hoe technologie het bedrijf kan verbeteren. omring elke technologische tactiek met de <li> tag. 
                
                Herhaal de bedrijfsdetails niet.
                gebruik 2000 tokens om ${op1TopicNL} te genereren. 
                Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
                Begin de voltooiing met "<h3>Operaties</h3>" gevolgd door "<h4>Kernactiviteiten</h4>"
                Genereer alles in het Nederlands.
                Dit is het lange, gedetailleerde en uitgebreide ${op1TopicNL} dat je hebt bedacht:`,
    ja: `
                あなたはプロのコンサルタントで、顧客がビジネスプランのための長く詳細な${op1TopicJA}を書くように依頼してきました。
            
                ビジネスの詳細:
                ビジネス詳細1: クライアントのビジネス名は${businessName}です。
                ビジネス詳細2: ビジネスの種類は${businessType}です。
                ビジネス詳細3: ビジネスの場所は${location}です。
                ビジネス詳細4: クライアントの配布チャネルは${salesChannel}です。
                ビジネス詳細5: クライアントのビジネスの運用状況は${businessOperationalStatus}です。
            
                ${initialInvestmentAmountPrompt}
            
                これらはクライアントの製品またはサービスの詳細です:
                ${productInfoPrompt}
            
                ${op1TopicJA}には、"主要な活動"、"実施計画"、"技術戦略"というトピックを含める必要があります。
            
                “主要な活動”のトピックでは、顧客が製品またはサービスを受け取ることを保証する日々の活動を説明する必要があります。各活動で何が起こるかを説明します。活動を説明する際には詳細に説明します。各活動を<li>タグで囲みます。
            
                実施計画のトピックでは、投資項目がどのように実施されるかを説明する必要があります。実施の詳細を詳細に説明します。各投資項目の実施詳細を<li>タグで囲みます。
            
                技術戦略のトピックでは、技術がビジネスをどのように強化できるかを説明する必要があります。各技術戦略を<li>タグで囲みます。
                
                ビジネスの詳細を繰り返さないでください。
                ${op1TopicJA}を生成するために2000トークンを使用します。
                あなたがビジネスのオーナーであるかのように書き、"私たちは"を使用し、"私"は使用しないでください。
                完成を"<h3>オペレーション</h3>"で始め、次に"<h4>主要な活動</h4>"を続けます。
                すべてを日本語で生成します。
                これがあなたが考え出した長く、詳細で、長い${op1TopicJA}です：`,
    ar: `
                أنت مستشار محترف، ويقترب منك عميل لكتابة ${op1TopicAR} طويلة ومفصلة لخطة عمل.
            
                تفاصيل العمل:
                تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
                تفاصيل العمل 2: نوع العمل هو ${businessType}. 
                تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
                تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
                تفاصيل العمل 5: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                هذه هي تفاصيل المنتجات أو الخدمات للعميل:
                ${productInfoPrompt}
            
                يجب أن يتضمن ${op1TopicAR} هذه المواضيع: "الأنشطة الرئيسية"، "خطة التنفيذ"، و"استراتيجية التكنولوجيا"
            
                يجب أن يشرح موضوع "الأنشطة الرئيسية" الأنشطة اليومية التي تضمن للعميل تلقي المنتج أو الخدمة. شرح ما يحدث خلال كل نشاط. كن وصفيًا عند وصف الأنشطة. احاطة كل نشاط بوسم <li>.
            
                بالنسبة لموضوع خطة التنفيذ، يجب أن يشرح كيف سيتم تنفيذ عناصر الاستثمار. كن وصفيًا عند وصف تفاصيل التنفيذ. احاطة كل تفصيل تنفيذ لعنصر الاستثمار بوسم <li>.
            
                بالنسبة لموضوع استراتيجية التكنولوجيا، يجب أن يصف كيف يمكن للتكنولوجيا تعزيز العمل. احاطة كل تكتيك تكنولوجي بوسم <li>.
                
                لا تكرر تفاصيل العمل.
                استخدم 2000 رمز لتوليد ${op1TopicAR}. 
                اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
                ابدأ الإكمال بـ "<h3>العمليات</h3>" تليها "<h4>الأنشطة الرئيسية</h4>"
                أنشئ كل شيء باللغة العربية
                هذا هو ${op1TopicAR} الطويل والمفصل والمطول الذي ابتكرته:`,
    sv: `
                Du är en professionell konsult och en kund kommer till dig för att skriva en lång och detaljerad ${op1TopicSV} för en affärsplan.
            
                Affärsdetaljer:
                Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
                Affärsdetalj 2: Typen av verksamhet är ${businessType}. 
                Affärsdetalj 3: Företagets plats är: ${location}.
                Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
                Affärsdetalj 5: Kundens operativa status för företaget är ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Det här är detaljer om kundens produkter eller tjänster:
                ${productInfoPrompt}
            
                ${op1TopicSV} bör inkludera dessa ämnen: "Nyckelaktiviteter", "Genomförandeplan" och "Teknikstrategi"
            
                Ämnet "nyckelaktiviteter" bör förklara de dagliga aktiviteter som säkerställer att kunden får produkten eller tjänsten. Förklara vad som händer under varje aktivitet. Var beskrivande när du beskriver aktiviteterna. Omslut varje aktivitet med <li>-taggen.
            
                För ämnet "genomförandeplan" bör detta förklara hur investeringsobjekten kommer att implementeras. Var beskrivande när du beskriver genomförandedetaljerna. Omslut varje genomförandedetalj för investeringsobjekt med <li>-taggen.
            
                För ämnet "teknikstrategi" bör detta beskriva hur tekniken kan förbättra verksamheten. Omslut varje tekniktaktik med <li>-taggen.
                
                Upprepa inte affärsdetaljer.
                Använd 2000 tokens för att generera ${op1TopicSV}. 
                Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
                Börja kompletteringen med "<h3>Operationer</h3>" följt av "<h4>Nyckelaktiviteter</h4>"
                Generera allt på svenska.
                Detta är den långa, detaljerade och omfattande ${op1TopicSV} du kom upp med:`,
    fi: `
                Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${op1TopicFI} liiketoimintasuunnitelmaan.
            
                liiketoiminnan tiedot:
                liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
                liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
                liiketoiminnan yksityiskohta 3: Liiketoiminnan sijainti on: ${location}.
                liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
                liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Nämä ovat yksityiskohtia asiakkaan tuotteista tai palveluista:
                ${productInfoPrompt}
            
                ${op1TopicFI} tulisi sisältää nämä aiheet: "Avaintoiminnot", "Toteutussuunnitelma" ja "Teknologiastrategia"
            
                Aiheen "avaintoiminnot" tulisi selittää päivittäiset toiminnot, jotka varmistavat, että asiakas saa tuotteen tai palvelun. Selitä, mitä tapahtuu jokaisen toiminnan aikana. Ole kuvaileva kuvatessasi toimintoja. Kääri jokainen toiminta <li>-tagiin.
            
                Toteutussuunnitelma-aiheen osalta tämän tulisi selittää, miten investointikohteet toteutetaan. Ole kuvaileva kuvatessasi toteutuksen yksityiskohtia. ympäröi jokainen investointikohteen toteutuksen yksityiskohta <li>-tagilla  
            
                Teknologiastrategia-aiheen osalta tämän tulisi kuvailla, miten teknologia voi parantaa liiketoimintaa. kääri jokainen teknologiataktiikka <li>-tagiin. 
                
                Älä toista liiketoiminnan yksityiskohtia.
                käytä 2000 merkkiä generoidaksesi ${op1TopicFI}. 
                Kirjoita tämä kuin olisit yrityksen omistaja, käyttäen "me", älä käytä "minä".
                Aloita täydennys "<h3>Toiminta</h3>" seuraa "<h4>Avaintoiminnot</h4>"
                Generoi kaikki suomeksi.
                Tämä on pitkä, yksityiskohtainen ja laaja ${op1TopicFI}, jonka keksit:`,
    da: `
                Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${op1TopicDA} til en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
                forretningsdetalje 2: Virksomhedens type er ${businessType}. 
                forretningsdetalje 3: Virksomhedens placering er: ${location}.
                forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
                forretningsdetalje 5: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Dette er detaljer om kundens produkter eller tjenester:
                ${productInfoPrompt}
            
                ${op1TopicDA} skal inkludere disse emner: "Nøgleaktiviteter", "Implementeringsplan" og "Teknologistrategi"
            
                Emnet "nøgleaktiviteter" skal forklare de daglige aktiviteter, der sikrer, at kunden modtager produktet eller tjenesten. Forklar, hvad der sker under hver aktivitet. Vær beskrivende, når du beskriver aktiviteterne. Omgiv hver aktivitet med <li>-taggen.
            
                for emnet "implementeringsplan", dette skal forklare, hvordan investeringsgenstandene vil blive implementeret. Vær beskrivende, når du beskriver implementeringsdetaljerne. omgiv hver investeringsgenstand implementeringsdetalje med <li>-taggen  
            
                for emnet "teknologistrategi", dette skal beskrive, hvordan teknologi kan forbedre virksomheden. omgiv hver teknologitaktik med <li>-taggen. 
                
                Gentag ikke forretningsdetaljer.
                brug 2000 tokens til at generere ${op1TopicDA}. 
                Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
                Begynd udfyldningen med "<h3>Drift</h3>" efterfulgt af "<h4>Nøgleaktiviteter</h4>"
                Generer alt på dansk.
                Dette er den lange, detaljerede og omfattende ${op1TopicDA}, du kom op med:`,
    no: `
                Du er en profesjonell konsulent, og en kunde nærmer deg for å skrive en lang og detaljert ${op1TopicNO} for en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalj 1: Kundens firmanavn er ${businessName}.
                forretningsdetalj 2: Typen virksomhet er ${businessType}. 
                forretningsdetalj 3: Virksomhetens plassering er: ${location}.
                forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
                forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.
            
                ${initialInvestmentAmountPrompt}
            
                Dette er detaljer om kundens produkter eller tjenester:
                ${productInfoPrompt}
            
                ${op1TopicNO} skal inkludere disse emnene: "Nøkkelaktiviteter", "Implementeringsplan" og "Teknologistrategi"
            
                Emnet "nøkkelaktiviteter" skal forklare de daglige aktivitetene som sikrer at kunden mottar produktet eller tjenesten. Forklar hva som skjer under hver aktivitet. Vær beskrivende når du beskriver aktivitetene. Omgir hver aktivitet med <li>-taggen.
            
                for Implementeringsplan emnet, dette skal forklare hvordan investeringsartiklene vil bli implementert. Vær beskrivende når du beskriver implementeringsdetaljene. omgir hver investeringsartikkel implementeringsdetalje med <li>-taggen  
            
                for Teknologistrategi emnet, dette skal beskrive hvordan teknologi kan forbedre virksomheten. omgir hver teknologitaktikk med <li>-taggen. 
                
                Gjenta ikke forretningsdetaljer.
                bruk 2000 tokens for å generere ${op1TopicNO}. 
                Skriv dette som om du er eieren av virksomheten, bruk "vi", bruk ikke "jeg".
                Begynn utfyllingen med "<h3>Drift</h3>" etterfulgt av "<h4>Nøkkelaktiviteter</h4>"
                Generer alt på norsk.
                Dette er den lange, detaljerte og omfattende ${op1TopicNO} du kom opp med:`,
  };

  const payload = {
    messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
    n: 1,
  };
  return FireworksAIStream(payload);

  // const payload = {
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
  //   temperature: 0.5,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 1500,
  //   stream: true,
  //   n: 1,
  // };
  // return OpenAIStream(payload);
};
