import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IExecutiveSummaryPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: number;
  location: string;
  salesChannel: string;

  customerIncome1: number;
  customerDescription1: string;

  customerIncome2: number;
  customerDescription2: string;

  customerIncome3: number;
  customerDescription3: string;

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

  productInfoPrompt: string;
  planQuota: number;
  planLanguage: string;
  variantID: string;
  modelName?: string;
}
export const executiveSummary = async (req: IExecutiveSummaryPro) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,
    customerIncome1,
    customerDescription1,
    customerIncome2,
    customerDescription2,
    customerIncome3,
    customerDescription3,
    successFactors1,
    successFactors2,
    successFactors3,
    firstYearRevenue,
    revenueGrowthRate,
    productInfoPrompt,
    planLanguage,
    planQuota,
    variantID,
    modelName,
  } = req;

  const revenueGrowthRate1 = `${revenueGrowthRate * 100}%`;

  // create customer prompt
  let customerPrompt = '';
  const customerDescriptions = [
    { description: customerDescription1, income: customerIncome1 },
    { description: customerDescription2, income: customerIncome2 },
    { description: customerDescription3, income: customerIncome3 },
  ];

  const customerGroups = {
    de: 'Kundengruppe',
    fr: 'Groupe de clients',
    es: 'Grupo de clientes',
    it: 'Gruppo di clienti',
    nl: 'Klantengroep',
    ja: '顧客グループ',
    ar: 'مجموعة العملاء',
    default: 'Customer Group',
  };
  const customerGroupDescriptions = {
    de: 'Dies sind die Kundengruppenbeschreibungen:',
    fr: 'Voici les descriptions des groupes de clients:',
    es: 'Estas son las descripciones de los grupos de clientes:',
    it: 'Queste sono le descrizioni dei gruppi di clienti:',
    nl: 'Dit zijn de beschrijvingen van de klantengroepen:',
    ja: 'これらは顧客グループの説明です:',
    ar: 'هذه هي أوصاف مجموعات العملاء:',
    default: 'These are the customer group descriptions:',
  };

  customerDescriptions.forEach((customer, index) => {
    if (customer.description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups['default']} ${index + 1}: ${customer.description}, Income: ${customer.income}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions['default']}\n${customerPrompt}`;
  const promptTemplates = {
    en: `You are a professional consultant, and a client approaches you to write a detailed executive summary for a business plan.
    These are details regarding the business:
    This is the client's business operational status: ${businessOperationalStatus}.
    This is the client's distribution channel: ${salesChannel}.
    This is the client's business name: ${businessName}.
    This is the description of business: ${businessType}. 
    This is the number of employees: ${NEmployee}.
    This is where the client's customers are: ${location}.
    
    These are details of the businesses' customer segments:
    This is the description of customer segment 1: ${customerDescription1}
    This is the description of customer segment 2: ${customerDescription2}
    This is the description of customer segment 3: ${customerDescription3}
    
    These are details of the client's products or services: ${productInfoPrompt}
    
    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    This is the expected revenue: ${firstYearRevenue}
    This is the expected future growth rate: ${revenueGrowthRate1}
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
    Generate response in html surrounding key topics with h4 tag. 
    Begin the completion with "<h3>Executive Summary</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    This is the executive summary you came up with:`,
    'en-uk': `You are a professional consultant, and a client approaches you to write a detailed executive summary for a business plan.
    These are details regarding the business:
    This is the client's business operational status: ${businessOperationalStatus}.
    This is the client's distribution channel: ${salesChannel}.
    This is the client's business name: ${businessName}.
    This is the description of business: ${businessType}. 
    This is the number of employees: ${NEmployee}.
    This is where the client's customers are: ${location}.
    
    These are details of the businesses' customer segments:
    This is the description of customer segment 1: ${customerDescription1}
    This is the description of customer segment 2: ${customerDescription2}
    This is the description of customer segment 3: ${customerDescription3}
    
    These are details of the client's products or services: ${productInfoPrompt}
    
    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    This is the expected revenue: ${firstYearRevenue}
    This is the expected future growth rate: ${revenueGrowthRate1}
    
    Write this as if you are the owner of the business, using "we" don't use "I".
    The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
    Generate response in html surrounding key topics with h4 tag. 
    Begin the completion with "<h3>Executive Summary</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    use british english spelling and grammar
    This is the executive summary you came up with:`,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um eine detaillierte Zusammenfassung für einen Geschäftsplan zu schreiben.
    Dies sind die Details zum Geschäft:
    Dies ist der betriebliche Status des Kunden: ${businessOperationalStatus}.
    Dies ist der Vertriebskanal des Kunden: ${salesChannel}.
    Dies ist der Name des Unternehmens des Kunden: ${businessName}.
    Dies ist die Beschreibung des Geschäfts: ${businessType}. 
    Dies ist die Anzahl der Mitarbeiter: ${NEmployee}.
    Dies ist der Standort der Kunden des Kunden: ${location}.
    
    Dies sind die Details der Kundensegmente des Unternehmens:
    Dies ist die Beschreibung des Kundensegments 1: ${customerDescription1}
    Dies ist die Beschreibung des Kundensegments 2: ${customerDescription2}
    Dies ist die Beschreibung des Kundensegments 3: ${customerDescription3}
    
    Dies sind die Details der Produkte oder Dienstleistungen des Kunden: ${productInfoPrompt}
    
    Dies sind die Schlüsselfaktoren für den Erfolg: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Dies ist der erwartete Umsatz: ${firstYearRevenue}
    Dies ist die erwartete zukünftige Wachstumsrate: ${revenueGrowthRate1}
    
    Schreiben Sie dies, als wären Sie der Eigentümer des Unternehmens, verwenden Sie "wir" und nicht "ich".
    Die Zusammenfassung sollte diese Themen enthalten: Geschäftsübersicht, Geschäftsanfänge, Wettbewerbsvorteil, Finanzübersicht. Fügen Sie keine anderen Themen hinzu, es sei denn, sie sind hier angegeben. Seien Sie sehr beschreibend, wenn Sie jedes Thema erstellen.
    Erstellen Sie die Antwort in HTML und umgeben Sie die Schlüsselthemen mit dem h4-Tag. 
    Beginnen Sie die Zusammenfassung mit "<h3>Zusammenfassung</h3>"
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern das <strong>-Tag für Fett. Verwenden Sie nicht * *, sondern das <em>-Tag für Kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern das <li>-Tag.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern das <strong>-Tag für Fett. Verwenden Sie nicht * *, sondern das <em>-Tag für Kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern das <li>-Tag.
    Erstellen Sie alles auf Deutsch.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort
    Dies ist die Zusammenfassung, die Sie erstellt haben:`,
    fr: `Vous êtes un consultant professionnel, et un client vous approche pour rédiger un résumé exécutif détaillé pour un plan d'affaires.
    Voici les détails concernant l'entreprise :
    Voici le statut opérationnel de l'entreprise du client : ${businessOperationalStatus}.
    Voici le canal de distribution du client : ${salesChannel}.
    Voici le nom de l'entreprise du client : ${businessName}.
    Voici la description de l'entreprise : ${businessType}. 
    Voici le nombre d'employés : ${NEmployee}.
    Voici où se trouvent les clients du client : ${location}.
    
    Voici les détails des segments de clientèle de l'entreprise :
    Voici la description du segment de clientèle 1 : ${customerDescription1}
    Voici la description du segment de clientèle 2 : ${customerDescription2}
    Voici la description du segment de clientèle 3 : ${customerDescription3}
    
    Voici les détails des produits ou services du client : ${productInfoPrompt}
    
    Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Voici le chiffre d'affaires attendu : ${firstYearRevenue}
    Voici le taux de croissance futur attendu : ${revenueGrowthRate1}
    
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Le résumé exécutif doit inclure ces sujets : Aperçu de l'entreprise, Origines de l'entreprise, Avantage concurrentiel, Résumé financier. N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif lors de la génération de chaque sujet.
    Générez la réponse en HTML en entourant les sujets clés avec la balise h4. 
    Commencez la rédaction par "<h3>Résumé Exécutif</h3>"
    utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de puce, utilisez plutôt la balise <li>.
    utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de puce, utilisez plutôt la balise <li>.
    génère tout en français
    C'est important : Soyez très perspicace dans votre réponse
    Voici le résumé exécutif que vous avez élaboré :`,
    es: `Eres un consultor profesional, y un cliente se acerca a ti para redactar un resumen ejecutivo detallado para un plan de negocios.
    Estos son los detalles sobre el negocio:
    Este es el estado operativo del negocio del cliente: ${businessOperationalStatus}.
    Este es el canal de distribución del cliente: ${salesChannel}.
    Este es el nombre del negocio del cliente: ${businessName}.
    Esta es la descripción del negocio: ${businessType}. 
    Este es el número de empleados: ${NEmployee}.
    Aquí es donde están los clientes del cliente: ${location}.
    
    Estos son los detalles de los segmentos de clientes del negocio:
    Esta es la descripción del segmento de clientes 1: ${customerDescription1}
    Esta es la descripción del segmento de clientes 2: ${customerDescription2}
    Esta es la descripción del segmento de clientes 3: ${customerDescription3}
    
    Estos son los detalles de los productos o servicios del cliente: ${productInfoPrompt}
    
    Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Este es el ingreso esperado: ${firstYearRevenue}
    Esta es la tasa de crecimiento futuro esperada: ${revenueGrowthRate1}
    
    Escribe esto como si fueras el dueño del negocio, usando "nosotros" no uses "yo".
    El Resumen Ejecutivo debe incluir estos temas: Resumen del Negocio, Orígenes del Negocio, Ventaja Competitiva, Resumen Financiero. No incluyas otros temas a menos que se especifiquen aquí. Sé muy descriptivo al generar cada tema.
    Genera la respuesta en html rodeando los temas clave con la etiqueta h4. 
    Comienza la redacción con "<h3>Resumen Ejecutivo</h3>"
    usa solo etiquetas HTML, no uses markdown. No uses ** **, en su lugar usa la etiqueta <strong> para negrita. No uses * *, en su lugar usa la etiqueta <em> para cursiva. No uses * para puntos de viñeta, en su lugar usa la etiqueta <li>.
    usa solo etiquetas HTML, no uses markdown. No uses ** **, en su lugar usa la etiqueta <strong> para negrita. No uses * *, en su lugar usa la etiqueta <em> para cursiva. No uses * para puntos de viñeta, en su lugar usa la etiqueta <li>.
    genera todo en español
  Esto es importante: Sé muy perspicaz en tu respuesta
  Reply
  
  Esto es importante: Sé muy perspicaz en tu respuesta
    Este es el resumen ejecutivo que has elaborado:`,
    it: `Sei un consulente professionista e un cliente si avvicina a te per scrivere un dettagliato sommario esecutivo per un piano aziendale.
    Questi sono i dettagli riguardanti l'azienda:
    Questo è lo stato operativo dell'azienda del cliente: ${businessOperationalStatus}.
    Questo è il canale di distribuzione del cliente: ${salesChannel}.
    Questo è il nome dell'azienda del cliente: ${businessName}.
    Questa è la descrizione dell'azienda: ${businessType}. 
    Questo è il numero di dipendenti: ${NEmployee}.
    Questo è dove si trovano i clienti del cliente: ${location}.
    
    Questi sono i dettagli dei segmenti di clientela dell'azienda:
    Questa è la descrizione del segmento di clientela 1: ${customerDescription1}
    Questa è la descrizione del segmento di clientela 2: ${customerDescription2}
    Questa è la descrizione del segmento di clientela 3: ${customerDescription3}
    
    Questi sono i dettagli dei prodotti o servizi del cliente: ${productInfoPrompt}
    
    Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Questo è il fatturato previsto: ${firstYearRevenue}
    Questo è il tasso di crescita futuro previsto: ${revenueGrowthRate1}
    
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Il Sommario Esecutivo dovrebbe includere questi argomenti: Panoramica dell'Azienda, Origini dell'Azienda, Vantaggio Competitivo, Sommario Finanziario. Non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo quando generi ogni argomento.
    Genera la risposta in html circondando gli argomenti chiave con il tag h4. 
    Inizia la redazione con "<h3>Sommario Esecutivo</h3>"
    usa solo tag HTML, non usare markdown. Non usare ** **, invece usa il tag <strong> per il grassetto. Non usare * *, invece usa il tag <em> per il corsivo. Non usare * per i punti elenco, invece usa il tag <li>.
    usa solo tag HTML, non usare markdown. Non usare ** **, invece usa il tag <strong> per il grassetto. Non usare * *, invece usa il tag <em> per il corsivo. Non usare * per i punti elenco, invece usa il tag <li>.
    genera tutto in italiano
  Questo è importante: Sii molto perspicace nella tua risposta
  Questo è importante: Sii molto perspicace nella tua risposta
    Questo è il sommario esecutivo che hai elaborato:`,
    nl: `Je bent een professionele consultant en een klant benadert je om een gedetailleerde executive summary voor een bedrijfsplan te schrijven.
    Dit zijn de details met betrekking tot het bedrijf:
    Dit is de operationele status van het bedrijf van de klant: ${businessOperationalStatus}.
    Dit is het distributiekanaal van de klant: ${salesChannel}.
    Dit is de bedrijfsnaam van de klant: ${businessName}.
    Dit is de beschrijving van het bedrijf: ${businessType}. 
    Dit is het aantal werknemers: ${NEmployee}.
    Dit is waar de klanten van de klant zich bevinden: ${location}.
    
    Dit zijn de details van de klantsegmenten van het bedrijf:
    Dit is de beschrijving van klantsegment 1: ${customerDescription1}
    Dit is de beschrijving van klantsegment 2: ${customerDescription2}
    Dit is de beschrijving van klantsegment 3: ${customerDescription3}
    
    Dit zijn de details van de producten of diensten van de klant: ${productInfoPrompt}
    
    Dit zijn de belangrijkste succesfactoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Dit is de verwachte omzet: ${firstYearRevenue}
    Dit is de verwachte toekomstige groeipercentage: ${revenueGrowthRate1}
    
    Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "wij" gebruik geen "ik".
    De Executive Summary moet deze onderwerpen bevatten: Bedrijfsoverzicht, Oorsprong van het Bedrijf, Concurrentievoordeel, Financieel Overzicht. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van elk onderwerp.
    Genereer de reactie in html door de belangrijkste onderwerpen met de h4-tag te omringen. 
    Begin de voltooiing met "<h3>Executive Summary</h3>"
    gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
    gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
    genereer alles in het Nederlands
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
    Dit is de executive summary die je hebt bedacht:`,
    ja: `あなたはプロのコンサルタントであり、クライアントがビジネスプランの詳細なエグゼクティブサマリーを書くためにあなたにアプローチします。
    これらはビジネスに関する詳細です：
    これはクライアントのビジネス運営状況です：${businessOperationalStatus}.
    これはクライアントの流通チャネルです：${salesChannel}.
    これはクライアントのビジネス名です：${businessName}.
    これはビジネスの説明です：${businessType}. 
    これは従業員数です：${NEmployee}.
    これはクライアントの顧客がいる場所です：${location}.
    
    これらはビジネスの顧客セグメントの詳細です：
    これは顧客セグメント1の説明です：${customerDescription1}
    これは顧客セグメント2の説明です：${customerDescription2}
    これは顧客セグメント3の説明です：${customerDescription3}
    
    これらはクライアントの製品またはサービスの詳細です：${productInfoPrompt}
    
    これらは主要な成功要因です：${successFactors1}, ${successFactors2}, ${successFactors3}
    
    これは予想される収益です：${firstYearRevenue}
    これは予想される将来の成長率です：${revenueGrowthRate1}
    
    これをビジネスの所有者として、「私」ではなく「私たち」を使用して書いてください。
    エグゼクティブサマリーには、次のトピックを含める必要があります：ビジネス概要、ビジネスの起源、競争優位性、財務概要。ここで指定されていない限り、他のトピックを含めないでください。各トピックを生成する際には非常に詳細に記述してください。
    主要なトピックをh4タグで囲んでhtmlで応答を生成します。 
    "<h3>エグゼクティブサマリー</h3>"で完了を開始します。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にします。* *を使用せず、代わりに<em>タグを使用して斜体にします。箇条書きには*を使用せず、代わりに<li>タグを使用します。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にします。* *を使用せず、代わりに<em>タグを使用して斜体にします。箇条書きには*を使用せず、代わりに<li>タグを使用します。
    すべてを日本語で生成します
  これは重要です: 回答に非常に洞察力を持ってください
    これは重要です: 回答に非常に洞察力を持ってください
    これがあなたが考えたエグゼクティブサマリーです：`,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ملخص تنفيذي مفصل لخطة عمل.
    هذه هي التفاصيل المتعلقة بالأعمال:
    هذه هي حالة التشغيل الخاصة بعميلك: ${businessOperationalStatus}.
    هذه هي قناة التوزيع الخاصة بعميلك: ${salesChannel}.
    هذا هو اسم عمل العميل: ${businessName}.
    هذا هو وصف العمل: ${businessType}. 
    هذا هو عدد الموظفين: ${NEmployee}.
    هذا هو مكان وجود عملاء العميل: ${location}.
    
    هذه هي تفاصيل شرائح عملاء الأعمال:
    هذا هو وصف شريحة العملاء 1: ${customerDescription1}
    هذا هو وصف شريحة العملاء 2: ${customerDescription2}
    هذا هو وصف شريحة العملاء 3: ${customerDescription3}
    
    هذه هي تفاصيل منتجات أو خدمات العميل: ${productInfoPrompt}
    
    هذه هي عوامل النجاح الرئيسية: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    هذا هو الإيرادات المتوقعة: ${firstYearRevenue}
    هذا هو معدل النمو المتوقع في المستقبل: ${revenueGrowthRate1}
    
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" لا تستخدم "أنا".
    يجب أن يتضمن الملخص التنفيذي هذه المواضيع: نظرة عامة على الأعمال، أصول الأعمال، الميزة التنافسية، الملخص المالي. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفيًا جدًا عند توليد كل موضوع.
    قم بإنشاء الرد في html محاطًا بالمواضيع الرئيسية بعلامة h4. 
    ابدأ الإكمال بـ "<h3>الملخص التنفيذي</h3>"
    استخدم فقط علامات HTML لا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
    استخدم فقط علامات HTML لا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
    أنشئ كل شيء باللغة العربية
  هذا مهم: كن ثاقب الرأي في ردك
    هذا مهم: كن ثاقب الرأي في ردك
    هذا هو الملخص التنفيذي الذي توصلت إليه:`,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva en detaljerad exekutiv sammanfattning för en affärsplan.
    Detta är detaljer om verksamheten:
    Detta är kundens verksamhetsstatus: ${businessOperationalStatus}.
    Detta är kundens distributionskanal: ${salesChannel}.
    Detta är kundens företagsnamn: ${businessName}.
    Detta är beskrivningen av verksamheten: ${businessType}. 
    Detta är antalet anställda: ${NEmployee}.
    Detta är var kundens kunder finns: ${location}.
    
    Detta är detaljer om företagets kundsegment:
    Detta är beskrivningen av kundsegment 1: ${customerDescription1}
    Detta är beskrivningen av kundsegment 2: ${customerDescription2}
    Detta är beskrivningen av kundsegment 3: ${customerDescription3}
    
    Detta är detaljer om kundens produkter eller tjänster: ${productInfoPrompt}
    
    Detta är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Detta är den förväntade intäkten: ${firstYearRevenue}
    Detta är den förväntade framtida tillväxttakten: ${revenueGrowthRate1}
    
    Skriv detta som om du är ägaren av företaget, använd "vi" använd inte "jag".
    Den exekutiva sammanfattningen bör innehålla dessa ämnen: Företagsöversikt, Företagets ursprung, Konkurrensfördel, Finansiell sammanfattning. Inkludera inte andra ämnen om de inte specificeras här. Var mycket beskrivande när du genererar varje ämne.
    Generera svar i html omger nyckelämnen med h4-taggen. 
    Börja slutförandet med "<h3>Exekutiv sammanfattning</h3>"
    använd endast HTML-taggar använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
    använd endast HTML-taggar använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
    generera allt på svenska
  Detta är viktigt: Var mycket insiktsfull i ditt svar
    Detta är den exekutiva sammanfattningen du kom på:`,
    fi: `Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan yksityiskohtaisen johtoryhmän yhteenvedon liiketoimintasuunnitelmasta.
    Tässä on tietoja liiketoiminnasta:
    Tämä on asiakkaan liiketoiminnan operatiivinen tila: ${businessOperationalStatus}.
    Tämä on asiakkaan jakelukanava: ${salesChannel}.
    Tämä on asiakkaan yrityksen nimi: ${businessName}.
    Tämä on liiketoiminnan kuvaus: ${businessType}. 
    Tämä on työntekijöiden määrä: ${NEmployee}.
    Tämä on paikka, jossa asiakkaan asiakkaat ovat: ${location}.
    
    Tässä on tietoja yrityksen asiakassegmenteistä:
    Tämä on asiakassegmentin 1 kuvaus: ${customerDescription1}
    Tämä on asiakassegmentin 2 kuvaus: ${customerDescription2}
    Tämä on asiakassegmentin 3 kuvaus: ${customerDescription3}
    
    Tässä on tietoja asiakkaan tuotteista tai palveluista: ${productInfoPrompt}
    
    Tässä ovat keskeiset menestystekijät: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Tämä on odotettu liikevaihto: ${firstYearRevenue}
    Tämä on odotettu tuleva kasvuvauhti: ${revenueGrowthRate1}
    
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käyttäen "me" älä käytä "minä".
    Johtoryhmän yhteenvedon tulisi sisältää nämä aiheet: Liiketoiminnan yleiskatsaus, Liiketoiminnan alkuperä, Kilpailuetu, Taloudellinen yhteenveto. Älä sisällytä muita aiheita, ellei niitä ole erikseen mainittu tässä. Ole erittäin kuvaileva, kun luotat jokaista aihetta.
    Luo vastaus html-muodossa ympäröimällä avainaiheet h4-tunnisteella. 
    Aloita täydennys "<h3>Johtoryhmän yhteenveto</h3>"
    käytä vain HTML-tunnisteita, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tunnistetta lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tunnistetta kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tunnistetta.
    käytä vain HTML-tunnisteita, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tunnistetta lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tunnistetta kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tunnistetta.
    luo kaikki suomeksi
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi
    Tämä on johtoryhmän yhteenveto, jonka keksit:`,
    da: `Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en detaljeret ledelsesresumé for en forretningsplan.
    Dette er detaljer om virksomheden:
    Dette er kundens forretningsdriftsstatus: ${businessOperationalStatus}.
    Dette er kundens distributionskanal: ${salesChannel}.
    Dette er kundens virksomhedsnavn: ${businessName}.
    Dette er beskrivelsen af virksomheden: ${businessType}. 
    Dette er antallet af medarbejdere: ${NEmployee}.
    Dette er hvor kundens kunder er: ${location}.
    
    Dette er detaljer om virksomhedens kundesegmenter:
    Dette er beskrivelsen af kundesegment 1: ${customerDescription1}
    Dette er beskrivelsen af kundesegment 2: ${customerDescription2}
    Dette er beskrivelsen af kundesegment 3: ${customerDescription3}
    
    Dette er detaljer om kundens produkter eller tjenester: ${productInfoPrompt}
    
    Dette er de vigtigste succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Dette er den forventede indtægt: ${firstYearRevenue}
    Dette er den forventede fremtidige vækstrate: ${revenueGrowthRate1}
    
    Skriv dette som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
    Ledelsesresuméet skal indeholde disse emner: Virksomhedsoverblik, Virksomhedens oprindelse, Konkurrencefordel, Finansiel oversigt. Inkluder ikke andre emner, medmindre de er specificeret her. Vær meget beskrivende, når du genererer hvert emne.
    Generer svar i html, der omgiver nøgleemner med h4-tag. 
    Begynd fuldførelsen med "<h3>Ledelsesresumé</h3>"
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv skrift. Brug ikke * til punktlister, brug i stedet <li>-tag.
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv skrift. Brug ikke * til punktlister, brug i stedet <li>-tag.
    generer alt på dansk
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar
    Dette er det ledelsesresumé, du kom på:`,
    no: `Du er en profesjonell konsulent, og en klient henvender seg til deg for å skrive en detaljert lederoppsummering for en forretningsplan.
    Dette er detaljer om virksomheten:
    Dette er kundens forretningsdriftsstatus: ${businessOperationalStatus}.
    Dette er kundens distribusjonskanal: ${salesChannel}.
    Dette er kundens firmanavn: ${businessName}.
    Dette er beskrivelsen av virksomheten: ${businessType}. 
    Dette er antall ansatte: ${NEmployee}.
    Dette er hvor kundens kunder er: ${location}.
    
    Dette er detaljer om virksomhetens kundesegmenter:
    Dette er beskrivelsen av kundesegment 1: ${customerDescription1}
    Dette er beskrivelsen av kundesegment 2: ${customerDescription2}
    Dette er beskrivelsen av kundesegment 3: ${customerDescription3}
    
    Dette er detaljer om kundens produkter eller tjenester: ${productInfoPrompt}
    
    Dette er de viktigste suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
    
    Dette er den forventede inntekten: ${firstYearRevenue}
    Dette er den forventede fremtidige vekstraten: ${revenueGrowthRate1}
    
    Skriv dette som om du er eieren av virksomheten, bruk "vi" bruk ikke "jeg".
    Lederoppsummeringen skal inkludere disse emnene: Virksomhetsoversikt, Virksomhetens opprinnelse, Konkurransefortrinn, Finansiell oppsummering. Ikke inkluder andre emner med mindre de er spesifisert her. Vær veldig beskrivende når du genererer hvert emne.
    Generer svar i html som omgir nøkkeltemaer med h4-tag. 
    Begynn fullføringen med "<h3>Lederoppsummering</h3>"
    bruk kun HTML-tags, bruk ikke markdown. Ikke bruk ** **, bruk i stedet <strong>-tag for fet skrift. Ikke bruk * *, bruk i stedet <em>-tag for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <li>-tag.
    bruk kun HTML-tags, bruk ikke markdown. Ikke bruk ** **, bruk i stedet <strong>-tag for fet skrift. Ikke bruk * *, bruk i stedet <em>-tag for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <li>-tag.
    generer alt på norsk
  Dette er viktig: Vær veldig innsiktsfull i ditt svar
    Dette er lederoppsummeringen du kom på:`,
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
