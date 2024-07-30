import { AI_MODEL } from '../../../../constants/plan';
import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IIndustryOverviewProHandler {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: number;
  location: string;
  salesChannel: string;
  customerDescription: string;
  successFactors1: string;
  successFactors2: string;
  successFactors3: string;
  initialInvestmentAmount: number;
  investmentItem1: string;
  investmentItem2: string;
  investmentItem3: string;
  firstYearRevenue: number;
  revenueGrowthRate: number;
  netProfitMargin: number;
  planQuota: number;
  planLanguage: string;
  productName1: string;
  productDescription1: string;
  productName2: string;
  productDescription2: string;
  productName3: string;
  productDescription3: string;
  productName4: string;
  productDescription4: string;
  productName5: string;
  productDescription5: string;
  variantID: string;
  modelName?: string;
}

export const situationAnalysisIndustryOverview = (
  req: IIndustryOverviewProHandler,
) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,
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
    variantID,
    planQuota,
    modelName,
  } = req;

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

  const promptTopic = {
    en: 'Industry Overview and Key Market Trends',
    de: 'Branchenüberblick und wichtige Markttrends',
    fr: "Aperçu de l'industrie et principales tendances du marché",
    es: 'Resumen de la industria y principales tendencias del mercado',
    it: 'Panoramica del settore e principali tendenze di mercato',
    nl: 'Industrieoverzicht en belangrijkste markttrends',
    ja: '業界概要と主要な市場動向',
    ar: 'نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق',
    sv: 'Översikt över branschen och viktiga marknadstrender',
    fi: 'Toimialan yleiskatsaus ja tärkeimmät markkinatrendit',
    da: 'Branchegennemgang og vigtige markedsudviklinger',
    no: 'Industrioversikt og viktige markedsutviklinger',
  };

  const promptTemplates = {
    en: `You are a professional consultant, and a client approaches you to write a detailed ${promptTopic.en} for a business plan.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
  
    These are details of the client's products or services:
    ${productInfoPrompt}
  
    These are further instructions:
    Have a positive outlook when generating ${promptTopic.en}.
    Be very descriptive when generating content on ${promptTopic.en}.
    Don't mention customer segments.
    Each topic should contain roughly the same amount of text.
    be very descriptive when generating ${promptTopic.en}.
    
    Include statistics and it's source where relevant but don't use data that contains the years 2021 and onwards because we are currently in 2023.
    DO NOT quote made-up statistics or quote a made-up research firm like ABC Research or XYZ Research.
    DO NOT mention undefined statistics like $XX.XX, $X.XX, XX.X%, or XX.XX%.
    Don't include repetitive statistics.
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    Don't include other topics unless specified here.
    Generate response in html surrounding "Industry Overview" and "Key Market Trends" with h4 tag.
    In "Key Market Trends" topic surround each key trend with <li> tag. 
    Begin the completion with "<h3>Situation Analysis</h3>" followed by "<h4>Industry Overview</h4>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
  Generate everything in English.
  This is important: Be very insightful in your response
    This is the ${promptTopic.en} you came up with:`,
    'en-uk': `You are a professional consultant, and a client approaches you to write a detailed ${promptTopic.en} for a business plan.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
  
    These are details of the client's products or services:
    ${productInfoPrompt}
  
    These are further instructions:
    Have a positive outlook when generating ${promptTopic.en}.
    Be very descriptive when generating content on ${promptTopic.en}.
    Don't mention customer segments.
    Each topic should contain roughly the same amount of text.
    be very descriptive when generating ${promptTopic.en}.
    
    Include statistics and it's source where relevant but don't use data that contains the years 2021 and onwards because we are currently in 2023.
    DO NOT quote made-up statistics or quote a made-up research firm like ABC Research or XYZ Research.
    DO NOT mention undefined statistics like $XX.XX, $X.XX, XX.X%, or XX.XX%.
    Don't include repetitive statistics.
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    Don't include other topics unless specified here.
    Generate response in html surrounding "Industry Overview" and "Key Market Trends" with h4 tag.
    In "Key Market Trends" topic surround each key trend with <li> tag. 
    Begin the completion with "<h3>Situation Analysis</h3>" followed by "<h4>Industry Overview</h4>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    use british english spelling and grammar
    This is the ${promptTopic.en} you came up with:`,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um ein detailliertes ${promptTopic.de} für einen Geschäftsplan zu schreiben.
    Dies sind die Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdaten 4: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdaten 5: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
  
    Dies sind die Details zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
  
    Dies sind weitere Anweisungen:
    Haben Sie eine positive Einstellung, wenn Sie ${promptTopic.de} generieren.
    Seien Sie sehr beschreibend, wenn Sie Inhalte zu ${promptTopic.de} generieren.
    Erwähnen Sie keine Kundensegmente.
    Jedes Thema sollte ungefähr die gleiche Menge an Text enthalten.
    Seien Sie sehr beschreibend, wenn Sie ${promptTopic.de} generieren.
    
    Fügen Sie Statistiken und deren Quelle hinzu, wo relevant, aber verwenden Sie keine Daten, die die Jahre 2021 und darüber hinaus enthalten, da wir uns derzeit im Jahr 2023 befinden.
    Zitieren Sie KEINE erfundenen Statistiken oder ein erfundenes Forschungsunternehmen wie ABC Research oder XYZ Research.
    Erwähnen Sie KEINE undefinierten Statistiken wie $XX.XX, $X.XX, XX.X% oder XX.XX%.
    Fügen Sie keine sich wiederholenden Statistiken hinzu.
    
    Schreiben Sie dies, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir", nicht "ich".
    Fügen Sie keine anderen Themen hinzu, es sei denn, sie sind hier angegeben.
    Generieren Sie die Antwort in HTML, umgeben von "Branchenüberblick" und "Wichtige Markttrends" mit dem h4-Tag.
    Im Thema "Wichtige Markttrends" umgeben Sie jeden wichtigen Trend mit dem <li>-Tag. 
    Beginnen Sie die Ausführung mit "<h3>Situationsanalyse</h3>" gefolgt von "<h4>Branchenüberblick</h4>"
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
  Generieren Sie alles auf Deutsch.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort
    Dies ist das ${promptTopic.de}, das Sie sich ausgedacht haben:`,
    fr: `Vous êtes un consultant professionnel, et un client vous approche pour rédiger un ${promptTopic.fr} détaillé pour un plan d'affaires.
    Voici les détails de l'entreprise:
    détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
    détail de l'entreprise 2: Le type d'entreprise est ${businessType}. 
    détail de l'entreprise 3: Voici où se trouvent les clients de l'entreprise: ${location}.
    détail de l'entreprise 4: Le canal de distribution du client est ${salesChannel}.
    détail de l'entreprise 5: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    Voici les détails des produits ou services du client:
    ${productInfoPrompt}
  
    Voici d'autres instructions:
    Ayez une perspective positive lors de la génération de ${promptTopic.fr}.
    Soyez très descriptif lors de la génération de contenu sur ${promptTopic.fr}.
    Ne mentionnez pas les segments de clientèle.
    Chaque sujet doit contenir à peu près la même quantité de texte.
    Soyez très descriptif lors de la génération de ${promptTopic.fr}.
    
    Incluez des statistiques et leur source lorsque cela est pertinent, mais n'utilisez pas de données contenant les années 2021 et au-delà car nous sommes actuellement en 2023.
    NE citez PAS de statistiques inventées ou un institut de recherche inventé comme ABC Research ou XYZ Research.
    NE mentionnez PAS de statistiques non définies comme $XX.XX, $X.XX, XX.X% ou XX.XX%.
    N'incluez pas de statistiques répétitives.
    
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici.
    Générez la réponse en HTML entourant "Vue d'ensemble de l'industrie" et "Tendances clés du marché" avec la balise h4.
    Dans le sujet "Tendances clés du marché", entourez chaque tendance clé avec la balise <li>. 
    Commencez la réalisation par "<h3>Analyse de la situation</h3>" suivi de "<h4>Vue d'ensemble de l'industrie</h4>"
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les puces, utilisez plutôt la balise <li>.
  Générez tout en français.
  C'est important : Soyez très perspicace dans votre réponse
    Voici le ${promptTopic.fr} que vous avez proposé:`,
    es: `Usted es un consultor profesional, y un cliente se le acerca para escribir un ${promptTopic.es} detallado para un plan de negocios.
    Estos son los detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es ${salesChannel}.
    detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
  
    Estas son más instrucciones:
    Tenga una perspectiva positiva al generar ${promptTopic.es}.
    Sea muy descriptivo al generar contenido sobre ${promptTopic.es}.
    No mencione segmentos de clientes.
    Cada tema debe contener aproximadamente la misma cantidad de texto.
    Sea muy descriptivo al generar ${promptTopic.es}.
    
    Incluya estadísticas y su fuente cuando sea relevante, pero no use datos que contengan los años 2021 en adelante porque actualmente estamos en 2023.
    NO cite estadísticas inventadas ni cite una firma de investigación inventada como ABC Research o XYZ Research.
    NO mencione estadísticas indefinidas como $XX.XX, $X.XX, XX.X% o XX.XX%.
    No incluya estadísticas repetitivas.
    
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no "yo".
    No incluya otros temas a menos que se especifiquen aquí.
    Genere la respuesta en HTML rodeando "Panorama del sector" y "Principales tendencias del mercado" con la etiqueta h4.
    En el tema "Principales tendencias del mercado" rodee cada tendencia clave con la etiqueta <li>. 
    Comience la realización con "<h3>Análisis de la situación</h3>" seguido de "<h4>Panorama del sector</h4>"
    Use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para puntos de viñeta, en su lugar use la etiqueta <li>.
  Genere todo en español.
  Esto es importante: Sé muy perspicaz en tu respuesta
    Este es el ${promptTopic.es} que se le ocurrió:`,
    it: `Sei un consulente professionista e un cliente si rivolge a te per scrivere un ${promptTopic.it} dettagliato per un piano aziendale.
    Questi sono i dettagli dell'azienda:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
  
    Queste sono ulteriori istruzioni:
    Avere una prospettiva positiva quando si genera ${promptTopic.it}.
    Essere molto descrittivi quando si generano contenuti su ${promptTopic.it}.
    Non menzionare segmenti di clientela.
    Ogni argomento dovrebbe contenere all'incirca la stessa quantità di testo.
    Essere molto descrittivi quando si genera ${promptTopic.it}.
    
    Includere statistiche e la loro fonte dove rilevante, ma non utilizzare dati che contengono gli anni 2021 e oltre perché siamo attualmente nel 2023.
    NON citare statistiche inventate o citare una società di ricerca inventata come ABC Research o XYZ Research.
    NON menzionare statistiche non definite come $XX.XX, $X.XX, XX.X% o XX.XX%.
    Non includere statistiche ripetitive.
    
    Scrivere questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
    Non includere altri argomenti a meno che non siano specificati qui.
    Generare la risposta in HTML circondando "Panoramica del settore" e "Principali tendenze di mercato" con il tag h4.
    Nell'argomento "Principali tendenze di mercato" circondare ogni tendenza chiave con il tag <li>. 
    Iniziare la realizzazione con "<h3>Analisi della situazione</h3>" seguito da "<h4>Panoramica del settore</h4>"
    Usare solo tag HTML, non usare markdown. Non usare ** **, invece usare il tag <strong> per il grassetto. Non usare * *, invece usare il tag <em> per il corsivo. Non usare * per i punti elenco, invece usare il tag <li>.
  Generare tutto in italiano.
  Questo è importante: Sii molto perspicace nella tua risposta
    Questo è il ${promptTopic.it} che hai inventato:`,
    nl: `U bent een professionele consultant en een klant benadert u om een gedetailleerd ${promptTopic.nl} voor een bedrijfsplan te schrijven.
    Dit zijn de bedrijfsgegevens:
    bedrijfsgegevens 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegevens 2: Het type bedrijf is ${businessType}. 
    bedrijfsgegevens 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsgegevens 4: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsgegevens 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}
  
    Dit zijn verdere instructies:
    Heb een positieve kijk bij het genereren van ${promptTopic.nl}.
    Wees zeer beschrijvend bij het genereren van inhoud over ${promptTopic.nl}.
    Noem geen klantsegmenten.
    Elk onderwerp moet ongeveer dezelfde hoeveelheid tekst bevatten.
    Wees zeer beschrijvend bij het genereren van ${promptTopic.nl}.
    
    Voeg statistieken en de bron ervan toe waar relevant, maar gebruik geen gegevens die de jaren 2021 en verder bevatten omdat we ons momenteel in 2023 bevinden.
    CITEER GEEN verzonnen statistieken of een verzonnen onderzoeksbureau zoals ABC Research of XYZ Research.
    Noem GEEN ongedefinieerde statistieken zoals $XX.XX, $X.XX, XX.X% of XX.XX%.
    Voeg geen repetitieve statistieken toe.
    
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
    Genereer de reactie in HTML omringd door "Industrie-overzicht" en "Belangrijke markttrends" met de h4-tag.
    Omring in het onderwerp "Belangrijke markttrends" elke belangrijke trend met de <li>-tag. 
    Begin de uitvoering met "<h3>Situatieanalyse</h3>" gevolgd door "<h4>Industrie-overzicht</h4>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
  genereer alles in het Nederlands
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord.
    Dit is het ${promptTopic.nl} dat u hebt bedacht:`,
    ja: `あなたはプロのコンサルタントであり、クライアントがビジネスプランのために詳細な${promptTopic.ja}を書くように依頼してきます。
    これらはビジネスの詳細です:
    ビジネスの詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネスの詳細 2: ビジネスの種類は${businessType}です。
    ビジネスの詳細 3: ビジネスの顧客がいる場所は${location}です。
    ビジネスの詳細 4: クライアントの流通チャネルは${salesChannel}です。
    ビジネスの詳細 5: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
  
    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}
  
    これらはさらに指示です:
    ${promptTopic.ja}を生成する際には前向きな見方を持ってください。
    ${promptTopic.ja}に関するコンテンツを生成する際には非常に詳細に記述してください。
    顧客セグメントには言及しないでください。
    各トピックはほぼ同じ量のテキストを含むべきです。
    ${promptTopic.ja}を生成する際には非常に詳細に記述してください。
    
    関連する場合は統計とその出典を含めてください。ただし、2021年以降のデータは使用しないでください。現在は2023年です。
    架空の統計やABCリサーチやXYZリサーチのような架空の調査会社を引用しないでください。
    $XX.XX、$X.XX、XX.X%、またはXX.XX%のような未定義の統計には言及しないでください。
    繰り返しの統計を含めないでください。
    
    ビジネスのオーナーとして書いてください。「私」ではなく「私たち」を使用してください。
    ここで指定されていない他のトピックを含めないでください。
    "業界概要"と"主要な市場動向"をh4タグで囲んでHTMLで応答を生成してください。
    "主要な市場動向"のトピックでは、各主要なトレンドを<li>タグで囲んでください。
    "<h3>状況分析</h3>"で完了を開始し、続いて"<h4>業界概要</h4>"を使用してください。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にしてください。* *を使用せず、代わりに<em>タグを使用して斜体にしてください。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
  すべてを日本語で生成してください。
  これは重要です: 回答に非常に洞察力を持ってください
    これはあなたが考えた${promptTopic.ja}です:`,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} مفصل لخطة عمل.
    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو مكان وجود عملاء العمل: ${location}.
    تفاصيل العمل 4: قناة توزيع العميل هي ${salesChannel}.
    تفاصيل العمل 5: حالة التشغيل لعمل العميل هي ${businessOperationalStatus}.
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
  
    هذه هي التعليمات الإضافية:
    كن متفائلاً عند إنشاء ${promptTopic.ar}.
    كن وصفيًا للغاية عند إنشاء محتوى حول ${promptTopic.ar}.
    لا تذكر شرائح العملاء.
    يجب أن يحتوي كل موضوع على نفس القدر من النص تقريبًا.
    كن وصفيًا للغاية عند إنشاء ${promptTopic.ar}.
    
    قم بتضمين الإحصائيات ومصدرها حيثما كان ذلك مناسبًا ولكن لا تستخدم البيانات التي تحتوي على السنوات 2021 وما بعدها لأننا حاليًا في عام 2023.
    لا تقتبس إحصائيات مختلقة أو تقتبس شركة أبحاث مختلقة مثل ABC Research أو XYZ Research.
    لا تذكر الإحصائيات غير المحددة مثل $XX.XX، $X.XX، XX.X%، أو XX.XX%.
    لا تتضمن إحصائيات متكررة.
    
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" لا تستخدم "أنا".
    لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    قم بإنشاء الاستجابة في HTML محاطًا بـ "نظرة عامة على الصناعة" و "الاتجاهات الرئيسية في السوق" بعلامة h4.
    في موضوع "الاتجاهات الرئيسية في السوق" قم بإحاطة كل اتجاه رئيسي بعلامة <li>.
    ابدأ الإكمال بـ "<h3>تحليل الوضع</h3>" متبوعًا بـ "<h4>نظرة عامة على الصناعة</h4>"
    استخدم علامات HTML فقط، لا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغليظ. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
  قم بإنشاء كل شيء باللغة العربية.
  هذا مهم: كن ثاقب الرأي في ردك
    هذا هو ${promptTopic.ar} الذي توصلت إليه:`,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva en detaljerad ${promptTopic.sv} för en affärsplan.
    Detta är affärsdetaljerna:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är ${businessType}.
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Kundens distributionskanal är ${salesChannel}.
    affärsdetalj 5: Kundens affärsoperativa status är ${businessOperationalStatus}.
  
    Detta är detaljerna om kundens produkter eller tjänster:
    ${productInfoPrompt}
  
    Detta är ytterligare instruktioner:
    Ha en positiv syn när du genererar ${promptTopic.sv}.
    Var mycket beskrivande när du genererar innehåll om ${promptTopic.sv}.
    Nämn inte kundsegment.
    Varje ämne bör innehålla ungefär samma mängd text.
    Var mycket beskrivande när du genererar ${promptTopic.sv}.
    
    Inkludera statistik och dess källa där det är relevant men använd inte data som innehåller åren 2021 och framåt eftersom vi för närvarande är i 2023.
    CITERA INTE påhittad statistik eller citera ett påhittat forskningsföretag som ABC Research eller XYZ Research.
    Nämn INTE odefinierad statistik som $XX.XX, $X.XX, XX.X% eller XX.XX%.
    Inkludera inte repetitiv statistik.
    
    Skriv detta som om du är ägaren av företaget, använd "vi" inte "jag".
    Inkludera inte andra ämnen om de inte specificeras här.
    Generera svar i HTML omgiven av "Översikt över branschen" och "Viktiga marknadstrender" med h4-taggen.
    I ämnet "Viktiga marknadstrender" omge varje nyckeltrend med <li>-taggen.
    Börja slutförandet med "<h3>Situationsanalys</h3>" följt av "<h4>Översikt över branschen</h4>"
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
  generera allt på svenska
  Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är ${promptTopic.sv} du kom på:`,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaa varten.
    Tässä ovat liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Yrityksen tyyppi on ${businessType}.
    liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on ${salesChannel}.
    liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
  
    Tässä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
  
    Tässä ovat lisäohjeet:
    Ole positiivinen, kun luot ${promptTopic.fi}.
    Ole erittäin kuvaileva, kun luot sisältöä ${promptTopic.fi}.
    Älä mainitse asiakassegmenttejä.
    Jokaisen aiheen tulisi sisältää suunnilleen saman verran tekstiä.
    Ole erittäin kuvaileva, kun luot ${promptTopic.fi}.
    
    Sisällytä tilastot ja niiden lähde, jos se on merkityksellistä, mutta älä käytä tietoja, jotka sisältävät vuodet 2021 ja sen jälkeen, koska olemme tällä hetkellä vuodessa 2023.
    ÄLÄ lainaa keksittyjä tilastoja tai lainaa keksittyä tutkimusyritystä, kuten ABC Research tai XYZ Research.
    ÄLÄ mainitse määrittelemättömiä tilastoja, kuten $XX.XX, $X.XX, XX.X% tai XX.XX%.
    Älä sisällytä toistuvia tilastoja.
    
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Älä sisällytä muita aiheita, ellei niitä ole erikseen mainittu tässä.
    Luo vastaus HTML-muodossa ympäröimällä "Toimialan yleiskatsaus" ja "Tärkeimmät markkinatrendit" h4-tunnisteella.
    Aiheessa "Tärkeimmät markkinatrendit" ympäröi jokainen keskeinen trendi <li>-tunnisteella.
    Aloita täyttö "<h3>Tilanneanalyysi</h3>"-tunnisteella, jota seuraa "<h4>Toimialan yleiskatsaus</h4>"
    käytä vain HTML-tunnisteita, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tunnistetta lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tunnistetta kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tunnistetta.
  luo kaikki suomeksi
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on ${promptTopic.fi}, jonka keksit:`,
    da: `Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en detaljeret ${promptTopic.da} til en forretningsplan.
    Dette er forretningsdetaljerne:
    forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedstypen er ${businessType}.
    forretningsdetalje 3: Dette er, hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er ${salesChannel}.
    forretningsdetalje 5: Kundens forretningsoperationelle status er ${businessOperationalStatus}.
  
    Dette er detaljerne om kundens produkter eller tjenester:
    ${productInfoPrompt}
  
    Dette er yderligere instruktioner:
    Hav et positivt syn, når du genererer ${promptTopic.da}.
    Vær meget beskrivende, når du genererer indhold om ${promptTopic.da}.
    Nævn ikke kundesegmenter.
    Hvert emne skal indeholde omtrent samme mængde tekst.
    Vær meget beskrivende, når du genererer ${promptTopic.da}.
    
    Inkluder statistik og dens kilde, hvor det er relevant, men brug ikke data, der indeholder årene 2021 og frem, fordi vi i øjeblikket er i 2023.
    CITÉR IKKE opdigtede statistikker eller citér et opdigtet forskningsfirma som ABC Research eller XYZ Research.
    Nævn IKKE udefinerede statistikker som $XX.XX, $X.XX, XX.X% eller XX.XX%.
    Inkluder ikke gentagne statistikker.
    
    Skriv dette, som om du er ejer af virksomheden, brug "vi" ikke "jeg".
    Inkluder ikke andre emner, medmindre de er specificeret her.
    Generer svar i HTML omgivet af "Branchegennemgang" og "Vigtige markedsudviklinger" med h4-tag.
    I emnet "Vigtige markedsudviklinger" omgiver hver vigtig trend med <li>-tag.
    Begynd udfyldningen med "<h3>Situationsanalyse</h3>" efterfulgt af "<h4>Branchegennemgang</h4>"
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <li>-tag.
  generer alt på dansk
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er ${promptTopic.da}, du kom op med:`,
    no: `Du er en profesjonell konsulent, og en klient henvender seg til deg for å skrive en detaljert ${promptTopic.no} for en forretningsplan.
    Dette er forretningsdetaljene:
    forretningsdetalj 1: Klientens firmanavn er ${businessName}.
    forretningsdetalj 2: Forretningstypen er ${businessType}. 
    forretningsdetalj 3: Dette er hvor forretningens kunder er: ${location}.
    forretningsdetalj 4: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 5: Klientens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
  
    Dette er ytterligere instruksjoner:
    Ha et positivt syn når du genererer ${promptTopic.no}.
    Vær veldig beskrivende når du genererer innhold om ${promptTopic.no}.
    Ikke nevn kundesegmenter.
    Hvert emne skal inneholde omtrent samme mengde tekst.
    Vær veldig beskrivende når du genererer ${promptTopic.no}.
    
    Inkluder statistikk og dens kilde der det er relevant, men ikke bruk data som inneholder årene 2021 og fremover fordi vi for øyeblikket er i 2023.
    IKKE siter oppdiktede statistikker eller siter et oppdiktet forskningsfirma som ABC Research eller XYZ Research.
    IKKE nevn udefinerte statistikker som $XX.XX, $X.XX, XX.X% eller XX.XX%.
    Ikke inkluder repeterende statistikker.
    
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Ikke inkluder andre emner med mindre de er spesifisert her.
    Generer svar i HTML som omgir "Industrioversikt" og "Viktige markedsutviklinger" med h4-tagg.
    I emnet "Viktige markedsutviklinger" omgir hver viktig trend med <li>-tagg. 
    Begynn utfyllingen med "<h3>Situasjonsanalyse</h3>" etterfulgt av "<h4>Industrioversikt</h4>"
    bruk kun HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-tagg for fet skrift. Ikke bruk * *, bruk i stedet <em>-tagg for kursiv skrift. Ikke bruk * for punkttegn, bruk i stedet <li>-tagg.
  generer alt på norsk
  Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er ${promptTopic.no} du kom opp med:`,
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
