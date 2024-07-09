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
export default async function api2Situ1IndKeyPro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,
    customerDescription,
    successFactors1,
    successFactors2,
    successFactors3,
    initialInvestmentAmount,
    investmentItem1,
    investmentItem2,
    investmentItem3,
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

  console.log('planQuota: ', planQuota);

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

  const situ1TopicEN = 'Industry Overview and Key Market Trends';
  const situ1PromptEN = `
    You are a professional consultant, and a client approaches you to write a long and detailed ${situ1TopicEN} for a business plan. If the ${situ1TopicEN} is not long and detailed the client will be very upset.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are further instructions:
    use 500 words to generate this ${situ1TopicEN}.
    Have a positive outlook when generating ${situ1TopicEN}.
    Be very descriptive when generating content on ${situ1TopicEN}.
    Don't mention customer segments.
    Each topic should contain roughly the same amount of text.
    be very descriptive when generating ${situ1TopicEN}.
    
    Include statistics and it's source where relevant but don't use data that contains the years 2021 and onwards because we are currently in 2023.
    DO NOT quote made-up statistics or quote a made-up research firm like ABC Research or XYZ Research.
    DO NOT mention undefined statistics like $XX.XX or XX.X%.
    Don't include repetitive statistics.
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    Don't include other topics unless specified here.
    Generate response in html surrounding "Industry Overview" and "Key Market Trends" with h4 tag.
    In "Key Market Trends" topic surround each key trend with <li> tag. 
    Begin the completion with "<h3>Situation Analysis</h3>" followed by "<h4>Industry Overview</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long and detailed ${situ1TopicEN} you came up with:
    `;

  //german lang ------------------------------------------------------------------------
  const situ1TopicDE = 'Branchenüberblick und wichtige Markttrends';
  const situ1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${situ1TopicDE} für einen Geschäftsplan zu verfassen. Wenn ${situ1TopicDE} nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
    Dies sind die Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Dies sind weitere Anweisungen:
    Verwenden Sie 500 Wörter, um dieses ${situ1TopicDE} zu generieren.
    Seien Sie positiv eingestellt, wenn Sie ${situ1TopicDE} generieren.
    Seien Sie sehr beschreibend, wenn Sie Inhalte auf ${situ1TopicDE} erstellen.
    Erwähnen Sie keine Kundensegmente.
    Jedes Thema sollte ungefähr die gleiche Textmenge enthalten.
    Seien Sie beim Generieren von ${situ1TopicDE} sehr aussagekräftig.
  
    Fügen Sie Statistiken und deren Quelle ein, wo es relevant ist, verwenden Sie jedoch keine Daten, die die Jahre 2021 und darüber hinaus enthalten, da wir uns derzeit im Jahr 2023 befinden.
    ZITIEREN SIE KEINE erfundenen Statistiken oder zitieren Sie kein erfundenes Forschungsunternehmen wie ABC Research oder XYZ Research.
    Erwähnen Sie KEINE undefinierten Statistiken wie $XX.XX oder XX.X%.
    Fügen Sie keine wiederholten Statistiken ein.
  
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
    Generieren Sie mit dem h4-Tag Antworten im HTML-Format rund um „Branchenübersicht“ und „Wichtige Markttrends“.
    Umgeben Sie im Thema „Wichtige Markttrends“ jeden wichtigen Trend mit dem Tag <li>.
    Beginnen Sie den Abschluss mit „<h3>Situationsanalyse</h3>“, gefolgt von „<h4>Branchenüberblick</h4>“.
    Fertigstellung auf Deutsch generieren.
    Dies ist das lange und detaillierte ${situ1TopicDE}, das Sie sich ausgedacht haben:`;
  //french lang ------------------------------------------------------------------------
  const situ1TopicFR =
    "Aperçu de l'industrie et principales tendances du marché";
  const situ1PromptFR = `
  Vous êtes un consultant professionnel, et un client vous approche pour rédiger un ${situ1TopicFR} long et détaillé pour un plan d'affaires. Si le ${situ1TopicFR} n'est pas long et détaillé, le client sera très mécontent.
  Voici les détails de l'entreprise :
  détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
  détail commercial 2 : Le type d'entreprise est ${businessType}.
  détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  détail commercial 4 : Le canal de distribution du client est ${salesChannel}.
  détail commercial 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}

  Voici d'autres instructions :
  utilisez 500 mots pour générer ce ${situ1TopicFR}.
  Ayez une perspective positive lors de la génération du ${situ1TopicFR}.
  Soyez très descriptif lors de la génération du contenu sur ${situ1TopicFR}.
  Ne mentionnez pas les segments de clients.
  Chaque sujet doit contenir approximativement la même quantité de texte.
  soyez très descriptif lors de la génération du ${situ1TopicFR}.

  Incluez des statistiques et leur source lorsque cela est pertinent, mais n'utilisez pas de données contenant les années 2021 et suivantes car nous sommes actuellement en 2023.
  NE PAS citer de statistiques inventées ou citer une entreprise de recherche fictive comme ABC Research ou XYZ Research.
  Ne pas mentionner de statistiques indéfinies comme $XX.XX ou XX.X%.
  Ne pas inclure de statistiques répétitives.

  Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous", ne pas utiliser "je".
  Ne pas inclure d'autres sujets à moins qu'ils ne soient spécifiés ici.
  Générez la réponse en HTML en entourant "Vue d'ensemble de l'industrie" et "Tendances clés du marché" avec la balise h4.
  Dans le sujet "Tendances clés du marché", entourez chaque tendance clé avec la balise <li>.
  Commencez la réalisation par "<h3>Analyse de la Situation</h3>" suivi de "<h4>Vue d'ensemble de l'industrie</h4>"
  Voici le ${situ1TopicFR} long et détaillé que vous avez élaboré :
    `;

  //spanish lang ------------------------------------------------------------------------
  const situ1TopicES =
    'Resumen de la industria y principales tendencias del mercado';
  const situ1PromptES = `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${situ1TopicES} largo y detallado para un plan de negocios. Si el ${situ1TopicES} no es largo y detallado, el cliente estará muy disgustado.
  Estos son los detalles del negocio:
  detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
  detalle de negocio 2: El tipo de negocio es ${businessType}.
  detalle de negocio 3: Aquí es donde están los clientes del negocio: ${location}.
  detalle de negocio 4: El canal de distribución del cliente es ${salesChannel}.
  detalle de negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

  Estos son los detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Estas son instrucciones adicionales:
  use 500 palabras para generar este ${situ1TopicES}.
  Tenga una perspectiva positiva al generar ${situ1TopicES}.
  Sea muy descriptivo al generar contenido sobre ${situ1TopicES}.
  No mencione segmentos de clientes.
  Cada tema debe contener aproximadamente la misma cantidad de texto.
  sea muy descriptivo al generar ${situ1TopicES}.

  Incluya estadísticas y su fuente cuando sea relevante, pero no use datos que contengan los años 2021 en adelante porque actualmente estamos en 2023.
  NO cite estadísticas inventadas ni cite una empresa de investigación ficticia como ABC Research o XYZ Research.
  NO mencione estadísticas indefinidas como $XX.XX o XX.X%.
  No incluya estadísticas repetitivas.

  Escríbalo como si fuera el dueño del negocio, usando "nosotros", no use "yo".
  No incluya otros temas a menos que se especifiquen aquí.
  Genere la respuesta en HTML rodeando "Visión General de la Industria" y "Tendencias Clave del Mercado" con la etiqueta h4.
  En el tema "Tendencias Clave del Mercado", rodee cada tendencia clave con la etiqueta <li>.
  Comience la finalización con "<h3>Análisis de la Situación</h3>" seguido de "<h4>Visión General de la Industria</h4>"
  Este es el ${situ1TopicES} largo y detallado que elaboró:
    `;

  //italian lang ------------------------------------------------------------------------
  const situ1TopicIT =
    'Panoramica del settore e principali tendenze di mercato';
  const situ1PromptIT = `
  Sei un consulente professionale e un cliente ti avvicina per redigere un ${situ1TopicIT} lungo e dettagliato per un piano di business. Se il ${situ1TopicIT} non è lungo e dettagliato, il cliente sarà molto scontento.
  Questi sono i dettagli dell'impresa:
  dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio aziendale 2: Il tipo di impresa è ${businessType}.
  dettaglio aziendale 3: Ecco dove si trovano i clienti dell'impresa: ${location}.
  dettaglio aziendale 4: Il canale di distribuzione del cliente è ${salesChannel}.
  dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Ulteriori istruzioni:
  usa 500 parole per generare questo ${situ1TopicIT}.
  Mantieni un approccio positivo nella generazione del ${situ1TopicIT}.
  Sii molto descrittivo nel generare contenuti su ${situ1TopicIT}.
  Non menzionare i segmenti di clientela.
  Ogni argomento dovrebbe contenere approssimativamente lo stesso numero di parole.
  sii molto descrittivo nella generazione del ${situ1TopicIT}.

  Includi statistiche e relative fonti dove rilevante, ma non usare dati che contengono gli anni 2021 in poi poiché siamo attualmente nel 2023.
  NON citare statistiche inventate o citare una società di ricerca fittizia come ABC Research o XYZ Research.
  NON menzionare statistiche non definite come $XX.XX o XX.X%.
  Non includere statistiche ripetitive.

  Scrivi come se fossi il proprietario dell'impresa, usando "noi" e non "io".
  Non includere altri argomenti a meno che non siano specificati qui.
  Genera la risposta in HTML circondando "Panoramica dell'Industria" e "Tendenze Chiave del Mercato" con il tag h4.
  Nel topic "Tendenze Chiave del Mercato" circonda ogni tendenza chiave con il tag <li>.
  Inizia il completamento con "<h3>Analisi della Situazione</h3>" seguito da "<h4>Panoramica dell'Industria</h4>"
  Questo è il ${situ1TopicIT} lungo e dettagliato che hai elaborato:
    `;

  // dutch lang ------------------------------------------------------------------------
  const situ1TopicNL = 'Industrieoverzicht en belangrijkste markttrends';
  const situ1PromptNL = `
  Je bent een professionele consultant en een klant benadert je om een lange en gedetailleerde ${situ1TopicNL} te schrijven voor een bedrijfsplan. Als de ${situ1TopicNL} niet lang en gedetailleerd is, zal de klant erg ontevreden zijn.
    Dit zijn de bedrijfsdetails:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn verdere instructies:
    gebruik 500 woorden om deze ${situ1TopicNL} te genereren.
    Heb een positieve kijk bij het genereren van ${situ1TopicNL}.
    Wees zeer beschrijvend bij het genereren van inhoud over ${situ1TopicNL}.
    Vermeld geen klantsegmenten.
    Elk onderwerp moet ongeveer dezelfde hoeveelheid tekst bevatten.
    wees zeer beschrijvend bij het genereren van ${situ1TopicNL}.
    
    Voeg waar relevant statistieken en de bron ervan toe, maar gebruik geen gegevens die de jaren 2021 en later bevatten, omdat we momenteel in 2023 zijn.
    CITEER GEEN verzonnen statistieken of citeer een verzonnen onderzoeksbureau zoals ABC Research of XYZ Research.
    VERMELD GEEN ongedefinieerde statistieken zoals $XX.XX of XX.X%.
    Voeg geen repetitieve statistieken toe.
    
    Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" en niet "ik".
    Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
    Genereer een reactie in html en omring "Industrieoverzicht" en "Belangrijkste markttrends" met de h4-tag.
    Omring in het onderwerp "Belangrijkste markttrends" elke belangrijke trend met de <li>-tag. 
    Begin de voltooiing met "<h3>Situatieanalyse</h3>" gevolgd door "<h4>Industrieoverzicht</h4>"
    Genereer alles in het Nederlands.
    Dit is de lange en gedetailleerde ${situ1TopicNL} die je hebt opgesteld:
  `;

  //japanese  lang ------------------------------------------------------------------------
  const situ1TopicJP = '業界概要と主要な市場動向';
  const situ1PromptJP = `
  あなたはプロのコンサルタントで、クライアントがビジネスプランのために詳細で長い${situ1TopicJP}を書くように依頼してきました。もし${situ1TopicJP}が詳細で長くなければ、クライアントは非常に不満を持つでしょう。
    これらはビジネスの詳細です：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    これらはさらなる指示です：
    この${situ1TopicJP}を生成するために500語を使用します。
    ${situ1TopicJP}を生成するときにはポジティブな見方を持ってください。
    ${situ1TopicJP}に関するコンテンツを生成するときには非常に詳細に説明してください。
    顧客セグメントについては言及しないでください。
    各トピックは大体同じ量のテキストを含むべきです。
    ${situ1TopicJP}を生成するときには非常に詳細に説明してください。

    関連する場所では統計とそのソースを含めてくださいが、2021年以降のデータは使用しないでください。なぜなら、現在は2023年だからです。
    架空の統計を引用したり、ABCリサーチやXYZリサーチのような架空のリサーチ会社を引用したりしないでください。
    $XX.XXやXX.X%のような未定義の統計を言及しないでください。
    繰り返しの統計を含めないでください。

    あなたがビジネスのオーナーであるかのように書いてください。"we"を使用し、"I"は使用しないでください。
    ここで指定されていない他のトピックを含めないでください。
    "業界概要"と"主要な市場動向"をh4タグで囲んでhtmlのレスポンスを生成します。
    "主要な市場動向"のトピックでは、各キートレンドを<li>タグで囲みます。
    完成を"<h3>状況分析</h3>"で始め、次に"<h4>業界概要</h4>"を続けます。
    すべてを日本語で生成します。
    これがあなたが考え出した長く詳細な${situ1TopicJP}です：
  `;

  //arabic lang ------------------------------------------------------------------------
  const situ1TopicAR = 'نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق';
  const situ1PromptAR = `
  أنت مستشار محترف، ويقترب منك عميل لكتابة ${situ1TopicAR} طويلة ومفصلة لخطة عمل. إذا لم يكن ${situ1TopicAR} طويل ومفصل، سيكون العميل غاضبًا جدًا.
  هذه هي تفاصيل العمل:
  تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
  تفاصيل العمل 2: نوع العمل هو ${businessType}.
  تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
  تفاصيل العمل 4: قناة التوزيع للعميل هي ${salesChannel}.
  تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

  هذه هي تفاصيل منتجات العميل أو خدماته:
  ${productInfoPrompt}

  هذه هي التعليمات الإضافية:
  استخدم 500 كلمة لإنشاء هذا ${situ1TopicAR}.
  كن متفائلاً عند إنشاء ${situ1TopicAR}.
  كن واضحًا جدًا عند إنشاء محتوى على ${situ1TopicAR}.
  لا تذكر أقسام العملاء.
  يجب أن يحتوي كل موضوع تقريبًا على نفس كمية النص.
  كن واضحًا جدًا عند إنشاء ${situ1TopicAR}.

  قم بتضمين الإحصائيات ومصدرها حيثما كان ذلك ذا صلة ولكن لا تستخدم البيانات التي تحتوي على السنوات 2021 وما بعدها لأننا حاليًا في عام 2023.
  لا تقتبس إحصائيات مختلقة أو تقتبس من شركة بحث مختلقة مثل ABC Research أو XYZ Research.
  لا تذكر إحصائيات غير محددة مثل $XX.XX أو XX.X%.
  لا تتضمن إحصائيات متكررة.

  اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
  لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
  قم بإنشاء الرد في html محيطًا "نظرة عامة على الصناعة" و"الاتجاهات الرئيسية في السوق" بوسم h4.
  في موضوع "الاتجاهات الرئيسية في السوق" قم بتحييد كل اتجاه رئيسي بوسم <li>.
  ابدأ الاكتمال بـ "<h3>تحليل الوضع</h3>" تليها "<h4>نظرة عامة على الصناعة</h4>"
  قم بإنشاء كل شيء باللغة العربية.
  هذا هو ${situ1TopicAR} الطويل والمفصل الذي أعددته:
  `;

  // swedish lang ------------------------------------------------------------------------
  const situ1TopicSV = 'Översikt över branschen och viktiga marknadstrender';
  const situ1PromptSV = `
  Du är en professionell konsult och en klient närmar sig dig för att skriva en lång och detaljerad ${situ1TopicSV} för en affärsplan. Om ${situ1TopicSV} inte är lång och detaljerad kommer klienten att bli mycket upprörd.
    Det här är företagets detaljer:
    företagsdetalj 1: Kundens företagsnamn är ${businessName}.
    företagsdetalj 2: Typ av företag är ${businessType}.
    företagsdetalj 3: Det här är var företagets kunder finns: ${location}.
    företagsdetalj 4: Kundens distributionskanal är ${salesChannel}.
    företagsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

    Det här är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    Det här är ytterligare instruktioner:
    använd 500 ord för att generera detta ${situ1TopicSV}.
    Ha en positiv inställning när du genererar ${situ1TopicSV}.
    Var mycket beskrivande när du genererar innehåll på ${situ1TopicSV}.
    Nämn inte kundsegment.
    Varje ämne ska innehålla ungefär samma mängd text.
    var mycket beskrivande när du genererar ${situ1TopicSV}.
    
    Inkludera statistik och dess källa där det är relevant men använd inte data som innehåller åren 2021 och framåt eftersom vi för närvarande är i 2023.
    CITERA INTE påhittad statistik eller citera ett påhittat forskningsföretag som ABC Research eller XYZ Research.
    NÄMN INTE odefinierad statistik som $XX.XX eller XX.X%.
    Inkludera inte repetitiv statistik.
    
    Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
    Inkludera inte andra ämnen om det inte specificeras här.
    Generera svar i html som omger "Översikt över branschen" och "Viktiga marknadstrender" med h4-taggen.
    I ämnet "Viktiga marknadstrender" omger varje nyckeltrend med <li>-taggen.
    Börja slutförandet med "<h3>Situationsanalys</h3>" följt av "<h4>Översikt över branschen</h4>"
    Generera allt på svenska.
    Det här är den långa och detaljerade ${situ1TopicSV} du kom upp med:
  `;

  // finnish lang ------------------------------------------------------------------------
  const situ1TopicFI = 'Toimialan yleiskatsaus ja tärkeimmät markkinatrendit';
  const situ1PromptFI = `
  Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${situ1TopicFI} liiketoimintasuunnitelmaa varten. Jos ${situ1TopicFI} ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan erittäin pettynyt.
    Nämä ovat yrityksen tiedot:
    yrityksen tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    yrityksen tieto 2: Yrityksen tyyppi on ${businessType}. 
    yrityksen tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    yrityksen tieto 4: Asiakkaan jakelukanava on ${salesChannel}.
    yrityksen tieto 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Nämä ovat lisäohjeita:
    käytä 500 sanaa tämän ${situ1TopicFI} tuottamiseen.
    Ole positiivinen tuottaessasi ${situ1TopicFI}.
    Ole erittäin kuvaileva tuottaessasi sisältöä ${situ1TopicFI}.
    Älä mainitse asiakassegmenttejä.
    Jokaisen aiheen tulisi sisältää suunnilleen sama määrä tekstiä.
    ole erittäin kuvaileva tuottaessasi ${situ1TopicFI}.
    
    Sisällytä tilastot ja sen lähde, missä se on relevantti, mutta älä käytä tietoja, jotka sisältävät vuodet 2021 ja sen jälkeen, koska olemme tällä hetkellä vuodessa 2023.
    ÄLÄ lainaa keksittyjä tilastoja tai lainaa keksittyä tutkimusyritystä, kuten ABC Research tai XYZ Research.
    ÄLÄ mainitse määrittelemättömiä tilastoja, kuten $XX.XX tai XX.X%.
    Älä sisällytä toistuvia tilastoja.
    
    Kirjoita tämä kuin olisit yrityksen omistaja, käyttäen "me", älä käytä "minä".
    Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
    Tuota vastaus html-muodossa ympäröimällä "Toimialan yleiskatsaus" ja "Tärkeät markkinatrendit" h4-tagilla.
    "Tärkeät markkinatrendit" -aiheessa ympäröi jokainen avaintrendi <li>-tagilla. 
    Aloita täydennys "<h3>Tilanneanalyysi</h3>" seurasi "<h4>Toimialan yleiskatsaus</h4>"
    Tuota kaikki suomeksi.
    Tämä on pitkä ja yksityiskohtainen ${situ1TopicFI}, jonka laadit:
  `;

  // danish lang ------------------------------------------------------------------------
  const situ1TopicDA = 'Branchegennemgang og vigtige markedsudviklinger';
  const situ1PromptDA = `
  Du er en professionel konsulent, og en klient nærmer dig for at skrive en lang og detaljeret ${situ1TopicDA} til en forretningsplan. Hvis ${situ1TopicDA} ikke er lang og detaljeret, vil klienten være meget ked af det.
    Dette er virksomhedens detaljer:
    virksomhedsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
    virksomhedsdetalje 2: Virksomhedens type er ${businessType}. 
    virksomhedsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    virksomhedsdetalje 4: Klientens distributionskanal er ${salesChannel}.
    virksomhedsdetalje 5: Klientens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er yderligere instruktioner:
    brug 500 ord til at generere denne ${situ1TopicDA}.
    Hav et positivt syn når du genererer ${situ1TopicDA}.
    Vær meget beskrivende når du genererer indhold om ${situ1TopicDA}.
    Nævn ikke kundesegmenter.
    Hvert emne skal indeholde omtrent samme mængde tekst.
    vær meget beskrivende når du genererer ${situ1TopicDA}.
    
    Inkluder statistik og dens kilde hvor det er relevant, men brug ikke data der indeholder årene 2021 og fremefter, fordi vi er i 2023.
    CITER IKKE opdigtede statistikker eller citer en opdigtet forskningsvirksomhed som ABC Research eller XYZ Research.
    NÆVN IKKE udefinerede statistikker som $XX.XX eller XX.X%.
    Inkluder ikke gentagne statistikker.
    
    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Inkluder ikke andre emner medmindre det er specificeret her.
    Generer svar i html der omgiver "Branchegennemgang" og "Vigtige markedsudviklinger" med h4 tag.
    I "Vigtige markedsudviklinger" emnet, omgiv hver nøgleudvikling med <li> tag. 
    Begynd udfyldelsen med "<h3>Situationsanalyse</h3>" efterfulgt af "<h4>Branchegennemgang</h4>"
    Generer alt på dansk.
    Dette er den lange og detaljerede ${situ1TopicDA} du kom op med:
  `;

  // norwegian lang ------------------------------------------------------------------------
  const situ1TopicNO = 'Industrioversikt og viktige markedsutviklinger';
  const situ1PromptNO = `
  Du er en profesjonell konsulent, og en klient nærmer seg deg for å skrive en lang og detaljert ${situ1TopicNO} for en forretningsplan. Hvis ${situ1TopicNO} ikke er lang og detaljert, vil klienten være veldig opprørt.
    Dette er forretningsdetaljene:
    forretningsdetalj 1: Klientens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
    forretningsdetalj 4: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 5: Klientens forretningsoperasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er ytterligere instruksjoner:
    bruk 500 ord for å generere denne ${situ1TopicNO}.
    Ha et positivt syn når du genererer ${situ1TopicNO}.
    Vær veldig beskrivende når du genererer innhold om ${situ1TopicNO}.
    Ikke nevn kundesegmenter.
    Hvert emne skal inneholde omtrent samme mengde tekst.
    vær veldig beskrivende når du genererer ${situ1TopicNO}.
    
    Inkluder statistikk og dens kilde hvor det er relevant, men bruk ikke data som inneholder årene 2021 og fremover, fordi vi er i 2023.
    IKKE sitat oppdiktede statistikker eller sitat en oppdiktet forskningsfirma som ABC Research eller XYZ Research.
    IKKE nevn udefinerte statistikker som $XX.XX eller XX.X%.
    Inkluder ikke gjentatte statistikker.
    
    Skriv dette som om du er eieren av virksomheten, bruk "vi", bruk ikke "jeg".
    Inkluder ikke andre emner med mindre det er spesifisert her.
    Generer svar i html som omgir "Industrioversikt" og "Viktige markedsutviklinger" med h4 tag.
    I "Viktige markedsutviklinger" emnet, omgir hver nøkkelutvikling med <li> tag. 
    Begynn utfyllingen med "<h3>Situasjonsanalyse</h3>" etterfulgt av "<h4>Industrioversikt</h4>"
    Generer alt på norsk.
    Dette er den lange og detaljerte ${situ1TopicNO} du kom opp med:
  `;

  // other lang--------------------------------------------------------------------------
  const situ2TopicEN = '';
  const situ2PromptEN = `
  You are a professional consultant, and a client approaches you to write a long and detailed ${situ1TopicEN} for a business plan. If the ${situ1TopicEN} is not long and detailed the client will be very upset.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are further instructions:
    use 500 words to generate this ${situ1TopicEN}.
    Have a positive outlook when generating ${situ1TopicEN}.
    Be very descriptive when generating content on ${situ1TopicEN}.
    Don't mention customer segments.
    Each topic should contain roughly the same amount of text.
    be very descriptive when generating ${situ1TopicEN}.
    
    Include statistics and it's source where relevant but don't use data that contains the years 2021 and onwards because we are currently in 2023.
    DO NOT quote made-up statistics or quote a made-up research firm like ABC Research or XYZ Research.
    DO NOT mention undefined statistics like $XX.XX or XX.X%.
    Don't include repetitive statistics.
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    Don't include other topics unless specified here.
    Generate response in html surrounding "Industry Overview" and "Key Market Trends" with h4 tag.
    In "Key Market Trends" topic surround each key trend with <li> tag. 
    Begin the completion with "<h3>Situation Analysis</h3>" followed by "<h4>Industry Overview</h4>"
    Generate everything in English.
    This is the long and detailed ${situ1TopicEN} you came up with:
  `;

  let situ1PromptFinal = '';

  if (planLanguage === 'en') {
    situ1PromptFinal = situ1PromptEN;
  } else if (planLanguage === 'de') {
    situ1PromptFinal = situ1PromptDE;
  } else if (planLanguage === 'fr') {
    situ1PromptFinal = situ1PromptFR;
  } else if (planLanguage === 'es') {
    situ1PromptFinal = situ1PromptES;
  } else if (planLanguage === 'it') {
    situ1PromptFinal = situ1PromptIT;
  } else if (planLanguage === 'nl') {
    situ1PromptFinal = situ1PromptNL;
  } else if (planLanguage === 'ja') {
    situ1PromptFinal = situ1PromptJP;
  } else if (planLanguage === 'ar') {
    situ1PromptFinal = situ1PromptAR;
  } else if (planLanguage === 'sv') {
    situ1PromptFinal = situ1PromptSV;
  } else if (planLanguage === 'fi') {
    situ1PromptFinal = situ1PromptFI;
  } else if (planLanguage === 'da') {
    situ1PromptFinal = situ1PromptDA;
  } else if (planLanguage === 'no') {
    situ1PromptFinal = situ1PromptNO;
  } else {
    situ1PromptFinal = situ1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: situ1PromptFinal }],
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
