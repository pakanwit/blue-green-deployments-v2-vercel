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
    variantID
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
    'en-uk': `
    You are a professional consultant, and a client approaches you to write a long and detailed executive summary for a business plan. If the executive summary is not long and detailed the client will be very upset.
    These are details regarding the business:
    This is the client's business operational status: ${businessOperationalStatus}.
    This is the client's distribution channel: ${salesChannel}.
    This is the client's business name: ${businessName}.
    This is the description of business: ${businessType}. 
    This is the number of employees: ${NEmployee}.
    This is where the client's customers are: ${location}.
  
    These are details of the businesses' customer segments:
  ${customerPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}

    This is the expected revenue: ${firstYearRevenue}
    This is the expected future growth rate: ${revenueGrowthRate1}

    Write this as if you are the owner of the business, using "we" don't use "I".
    The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
    Generate response in html surrounding key topics with h4 tag. 
    Begin the completion with "<h3>Executive Summary</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful executive summary you came up with:
    `,
    //english lang-----------------------------------------------------
    en: `
    You are a professional consultant, and a client approaches you to write a long and detailed executive summary for a business plan. If the executive summary is not long and detailed the client will be very upset.
    These are details regarding the business:
    This is the client's business operational status: ${businessOperationalStatus}.
    This is the client's distribution channel: ${salesChannel}.
    This is the client's business name: ${businessName}.
    This is the description of business: ${businessType}. 
    This is the number of employees: ${NEmployee}.
    This is where the client's customers are: ${location}.
  
    These are details of the businesses' customer segments:
  ${customerPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}

    This is the expected revenue: ${firstYearRevenue}
    This is the expected future growth rate: ${revenueGrowthRate1}

    Write this as if you are the owner of the business, using "we" don't use "I".
    The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
    Generate response in html surrounding key topics with h4 tag. 
    Begin the completion with "<h3>Executive Summary</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful executive summary you came up with:
    `,

    //german lang-----------------------------------------------------
    de: `
    Sie sind ein professioneller Berater und ein Kunde bittet Sie, eine lange und detaillierte Zusammenfassung für einen Geschäftsplan zu schreiben. Wenn die Zusammenfassung nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
    Es geht um die Details des Unternehmens:
    Dies ist der Betriebsstatus des Unternehmens des Kunden: ${businessOperationalStatus}.
    Dies ist der Vertriebskanal des Kunden: ${salesChannel}.
    Dies ist der Geschäftsname des Kunden: ${businessName}.
    Dies ist die Beschreibung des Unternehmens: ${businessType}. 
    Dies ist die Anzahl der Mitarbeiter: ${NEmployee}.
    Dies ist der Ort, an dem sich die Kunden des Kunden befinden: ${location}.

    Dies sind Einzelheiten zu den Kundensegmenten des Unternehmens:
    ${customerPrompt}

    Dies sind Einzelheiten zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Dies sind die wichtigsten Erfolgsfaktoren: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Dies ist der erwartete Umsatz: ${firstYearRevenue}
    Dies ist die erwartete zukünftige Wachstumsrate: ${revenueGrowthRate1}

    Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
    Die Zusammenfassung sollte die folgenden Themen enthalten: Überblick über das Unternehmen, Ursprünge des Unternehmens, Wettbewerbsvorteil, finanzielle Zusammenfassung. Nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie bei der Erstellung der einzelnen Themen sehr anschaulich.
    Erzeugen Sie eine Antwort in HTML, die die Hauptthemen mit dem Tag h4 umgibt. 
    Beginnen Sie die Ergänzung mit "<h3>Zusammenfassung</h3>".
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Einfache Sprache verwenden.
    Fertigstellung auf Deutsch generieren.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche Zusammenfassung, das Sie sich ausgedacht haben:
    `,
    //french lang-----------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel, et un client vous approche pour rédiger un résumé exécutif long et détaillé pour un plan d'affaires. Si le résumé exécutif n'est pas long et détaillé, le client sera très mécontent.
    Voici les détails concernant l'entreprise :
    Voici le statut opérationnel de l'entreprise du client : ${businessOperationalStatus}.
    Voici le canal de distribution du client : ${salesChannel}.
    Voici le nom de l'entreprise du client : ${businessName}.
    Voici la description de l'entreprise : ${businessType}.
    Voici le nombre d'employés : ${NEmployee}.
    Voici où se trouvent les clients du client : ${location}.

    Voici les détails des segments de clients de l'entreprise :
    ${customerPrompt}

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}

    Voici le chiffre d'affaires prévu : ${firstYearRevenue}
    Voici le taux de croissance futur attendu : ${revenueGrowthRate1}

    Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".
    Le résumé exécutif doit inclure ces sujets : Vue d'ensemble de l'entreprise, Origines de l'entreprise, Avantage concurrentiel, Résumé financier. Ne pas inclure d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif lors de la génération de chaque sujet.
    Générez la réponse en HTML entourant les sujets clés avec la balise h4.
    Commencez la réalisation avec "<h3>Résumé Exécutif</h3>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace Résumé Exécutif que vous avez trouvé 
    `,
    //spanish lang-----------------------------------------------------
    es: `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un resumen ejecutivo largo y detallado para un plan de negocios. Si el resumen ejecutivo no es largo y detallado, el cliente estará muy disgustado.
    Estos son detalles sobre el negocio:
    Este es el estado operativo del negocio del cliente: ${businessOperationalStatus}.
    Este es el canal de distribución del cliente: ${salesChannel}.
    Este es el nombre del negocio del cliente: ${businessName}.
    Esta es la descripción del negocio: ${businessType}.
    Este es el número de empleados: ${NEmployee}.
    Aquí es donde están los clientes del cliente: ${location}.

    Estos son detalles de los segmentos de clientes del negocio:
    ${customerPrompt}

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Esta es la facturación esperada: ${firstYearRevenue}
    Esta es la tasa de crecimiento futuro esperada: ${revenueGrowthRate1}

    Escríbalo como si fuera el dueño del negocio, usando "nosotros" no use "yo".
    El Resumen Ejecutivo debe incluir estos temas: Visión General del Negocio, Orígenes del Negocio, Ventaja Competitiva, Resumen Financiero. No incluya otros temas a menos que se especifique aquí. Sea muy descriptivo al generar cada tema.
    Genere la respuesta en HTML rodeando los temas clave con la etiqueta h4.
    Comience la finalización con "<h3>Resumen Ejecutivo</h3>"
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
    Genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz Resumen Ejecutivo que se le ocurrió:
  `,
    //italian lang-----------------------------------------------------
    it: `
    Sei un consulente professionale e un cliente si avvicina a te per scrivere un riassunto esecutivo lungo e dettagliato per un piano aziendale. Se il riassunto esecutivo non è lungo e dettagliato, il cliente sarà molto scontento.
    Ecco i dettagli riguardanti l'azienda:
    Questo è lo stato operativo dell'azienda del cliente: ${businessOperationalStatus}.
    Questo è il canale di distribuzione del cliente: ${salesChannel}.
    Questo è il nome dell'azienda del cliente: ${businessName}.
    Questa è la descrizione dell'azienda: ${businessType}.
    Questo è il numero di dipendenti: ${NEmployee}.
    Questo è dove si trovano i clienti del cliente: ${location}.

    Ecco i dettagli dei segmenti di clientela dell'azienda:
    ${customerPrompt}

    Ecco i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}

    Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Questo è il fatturato previsto: ${firstYearRevenue}
    Questo è il tasso di crescita futura previsto: ${revenueGrowthRate1}

    Scrivilo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Il Riassunto Esecutivo dovrebbe includere questi argomenti: Panoramica dell'Azienda, Origini dell'Azienda, Vantaggio Competitivo, Riepilogo Finanziario. Non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo nella generazione di ogni argomento.
    Genera la risposta in HTML circondando gli argomenti chiave con il tag h4.
    Inizia il completamento con "<h3>Riassunto Esecutivo</h3>"
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
    Genera tutto in italiano.
    Questo è importante: Sii molto perspicace nella tua risposta.
    Questo è il lungo, dettagliato e perspicace Riassunto Esecutivo che hai ideato:
    `,

    // dutch lang-----------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde executive summary te schrijven voor een bedrijfsplan. Als de executive summary niet lang en gedetailleerd is, zal de klant erg overstuur zijn.
    Dit zijn details over het bedrijf:
    Dit is de operationele status van het bedrijf van de klant: ${businessOperationalStatus}.
    Dit is het distributiekanaal van de klant: ${salesChannel}.
    Dit is de naam van het bedrijf van de klant: ${businessName}.
    Dit is de beschrijving van het bedrijf: ${businessType}.
    Dit is het aantal werknemers: ${NEmployee}.
    Dit is waar de klanten van de klant zich bevinden: ${location}.

    Dit zijn details van de klantsegmenten van het bedrijf:
    ${customerPrompt}

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn de sleutelfactoren voor succes: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Dit is de verwachte omzet: ${firstYearRevenue}
    Dit is het verwachte toekomstige groeipercentage: ${revenueGrowthRate1}

    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" en niet "ik".
    De Executive Summary moet deze onderwerpen bevatten: Overzicht van het bedrijf, Oorsprong van het bedrijf, Concurrentievoordeel, Financiële samenvatting. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van elk onderwerp.
    Genereer de reactie in HTML en omring de sleutelonderwerpen met de h4-tag.
    Begin de voltooiing met "<h3>Samenvatting</h3>"
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke Uitvoerend Overzicht die u bedacht hebt:
    `,

    //japanese lang-----------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、クライアントがビジネスプランのための長く詳細なエグゼクティブサマリーを書くように依頼してきました。エグゼクティブサマリーが長く詳細でなければ、クライアントは非常に不満を持つでしょう。
    これらはビジネスに関する詳細です：
    クライアントのビジネスの運営状況は次のとおりです：${businessOperationalStatus}。
    クライアントの流通チャネルは次のとおりです：${salesChannel}。
    クライアントのビジネス名は次のとおりです：${businessName}。
    ビジネスの説明は次のとおりです：${businessType}。
    従業員の数は次のとおりです：${NEmployee}。
    クライアントの顧客がいる場所は次のとおりです：${location}。
  
    これらはビジネスの顧客セグメントの詳細です：
  ${customerPrompt}

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    これらは成功の鍵となる要素です：${successFactors1}、${successFactors2}、${successFactors3}

    予想される収益は次のとおりです：${firstYearRevenue}
    予想される未来の成長率は次のとおりです：${revenueGrowthRate1}

    あなたがビジネスのオーナーであるかのようにこれを書き、"I"ではなく"we"を使用します。
    エグゼクティブサマリーには、ビジネスの概要、ビジネスの起源、競争優位性、財務要約というトピックを含める必要があります。ここで指定されていない他のトピックは含めないでください。各トピックを生成するときには非常に詳細になるようにしてください。
    h4タグでキートピックを囲んでhtmlでレスポンスを生成します。
    完成を"<h3>エグゼクティブサマリー</h3>"で始めます
HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちたエグゼクティブサマリーです:
    `,

    //arabic lang-----------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك العميل لكتابة ملخص تنفيذي طويل ومفصل لخطة العمل. إذا لم يكن الملخص التنفيذي طويلاً ومفصلاً، سيكون العميل غاضباً جداً.
    هذه التفاصيل بخصوص العمل:
    هذا هو حالة العمل التشغيلية للعميل: ${businessOperationalStatus}.
    هذه هي قناة التوزيع للعميل: ${salesChannel}.
    هذا هو اسم العمل للعميل: ${businessName}.
    هذا هو وصف العمل: ${businessType}.
    هذا هو عدد الموظفين: ${NEmployee}.
    هذا هو المكان الذي يوجد فيه عملاء العميل: ${location}.

    هذه تفاصيل أقسام العملاء للأعمال:
  ${customerPrompt}

    هذه تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    هذه هي العوامل الرئيسية للنجاح: ${successFactors1}, ${successFactors2}, ${successFactors3}

    هذه هي الإيرادات المتوقعة: ${firstYearRevenue}
    هذا هو معدل النمو المستقبلي المتوقع: ${revenueGrowthRate1}

    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    يجب أن يتضمن الملخص التنفيذي هذه المواضيع: نظرة عامة على العمل، أصول العمل، الأفضلية التنافسية، الملخص المالي. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفياً جداً عند إنشاء كل موضوع.
    أنشئ الرد في html محيطة المواضيع الرئيسية بوسم h4.
    ابدأ الإكمال بـ "<h3>الملخص التنفيذي</h3>"
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الملخص التنفيذي الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang-----------------------------------------------------
    sv: `
    Du är en professionell konsult och en klient närmar sig dig för att skriva en lång och detaljerad verkställande sammanfattning för en affärsplan. Om den verkställande sammanfattningen inte är lång och detaljerad kommer klienten att bli mycket upprörd.
    Detta är detaljer angående företaget:
    Detta är klientens företags operativa status: ${businessOperationalStatus}.
    Detta är klientens distributionskanal: ${salesChannel}.
    Detta är klientens företagsnamn: ${businessName}.
    Detta är beskrivningen av företaget: ${businessType}. 
    Detta är antalet anställda: ${NEmployee}.
    Detta är var klientens kunder är: ${location}.
  
    Detta är detaljer om företagens kundsegment:
  ${customerPrompt}

    Detta är detaljer om klientens produkter eller tjänster:
    ${productInfoPrompt}

    Detta är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Detta är den förväntade intäkten: ${firstYearRevenue}
    Detta är den förväntade framtida tillväxthastigheten: ${revenueGrowthRate1}

    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Den verkställande sammanfattningen bör inkludera dessa ämnen: Företagsöversikt, Företagets ursprung, Konkurrensfördel, Finansiell sammanfattning. Inkludera inte andra ämnen om det inte specificeras här. var mycket beskrivande när du genererar varje ämne.
    Generera svar i html omger nyckelämnen med h4-taggen. 
    Börja slutförandet med "<h3>Verkställande sammanfattning</h3>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla Sammanfattning du kom på:
    `,

    // finland lang-----------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen liiketoimintasuunnitelman toimeenpanevan yhteenvedon. Jos toimeenpaneva yhteenveto ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan hyvin vihainen.
    Nämä ovat yksityiskohtia liiketoiminnasta:
    Tämä on asiakkaan liiketoiminnan operatiivinen tila: ${businessOperationalStatus}.
    Tämä on asiakkaan jakelukanava: ${salesChannel}.
    Tämä on asiakkaan yrityksen nimi: ${businessName}.
    Tämä on liiketoiminnan kuvaus: ${businessType}. 
    Tämä on työntekijöiden määrä: ${NEmployee}.
    Tämä on paikka, jossa asiakkaan asiakkaat ovat: ${location}.
  
    Nämä ovat yritysten asiakassegmenttien yksityiskohdat:
  ${customerPrompt}

    Nämä ovat asiakkaan tuotteiden tai palveluiden yksityiskohdat:
    ${productInfoPrompt}

    Nämä ovat avaintekijät menestykselle: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Tämä on odotettu liikevaihto: ${firstYearRevenue}
    Tämä on odotettu tulevaisuuden kasvuvauhti: ${revenueGrowthRate1}

    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Toimeenpanevan yhteenvedon tulisi sisältää nämä aiheet: Liiketoimintakatsaus, Liiketoiminnan alkuperä, Kilpailuetu, Taloudellinen yhteenveto. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. ole hyvin kuvaileva luodessasi jokaista aihetta.
    Luo vastaus html:llä ympäröimällä avainaiheet h4-tagilla. 
    Aloita täydennys "<h3>Toimeenpaneva yhteenveto</h3>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava Johtotiivistelmä, jonka keksit:
    `,

    // denmark lang-----------------------------------------------------
    da: `
    Du er en professionel konsulent, og en klient nærmer dig for at skrive en lang og detaljeret ledelsesresumé for en forretningsplan. Hvis ledelsesresuméet ikke er langt og detaljeret, vil klienten være meget ked af det.
    Dette er detaljer vedrørende virksomheden:
    Dette er klientens forretningsoperationelle status: ${businessOperationalStatus}.
    Dette er klientens distributionskanal: ${salesChannel}.
    Dette er klientens firmanavn: ${businessName}.
    Dette er beskrivelsen af virksomheden: ${businessType}. 
    Dette er antallet af medarbejdere: ${NEmployee}.
    Dette er, hvor klientens kunder er: ${location}.
  
    Dette er detaljer om virksomhedernes kundesegmenter:
  ${customerPrompt}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er de vigtigste succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Dette er den forventede indtægt: ${firstYearRevenue}
    Dette er den forventede fremtidige vækstrate: ${revenueGrowthRate1}

    Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Ledelsesresuméet skal inkludere disse emner: Virksomhedsoversigt, Virksomhedens oprindelse, Konkurrencemæssig fordel, Finansiel oversigt. Inkluder ikke andre emner, medmindre det er specificeret her. vær meget beskrivende, når du genererer hvert emne.
    Generer svar i html omgiver nøgleemner med h4-tag. 
    Begynd udfyldningen med "<h3>Udførende Resumé</h3>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
Dette er den lange, detaljerede og indsigtsfulde Ledelsesresumé, du kom op med:
    `,

    // norway lang-----------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en klient nærmer deg for å skrive en lang og detaljert ledelsesoppsummering for en forretningsplan. Hvis ledelsesoppsummeringen ikke er lang og detaljert, vil klienten være veldig opprørt.
    Dette er detaljer om virksomheten:
    Dette er klientens driftsstatus for virksomheten: ${businessOperationalStatus}.
    Dette er klientens distribusjonskanal: ${salesChannel}.
    Dette er klientens firmanavn: ${businessName}.
    Dette er beskrivelsen av virksomheten: ${businessType}. 
    Dette er antall ansatte: ${NEmployee}.
    Dette er hvor klientens kunder er: ${location}.
  
    Dette er detaljer om virksomhetens kundesegmenter:
  ${customerPrompt}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er de viktigste suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Dette er den forventede inntekten: ${firstYearRevenue}
    Dette er den forventede fremtidige vekstraten: ${revenueGrowthRate1}

    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Ledelsesoppsummeringen skal inkludere disse emnene: Oversikt over virksomheten, Virksomhetens opprinnelse, Konkurransefortrinn, Finansiell oppsummering. Ikke inkluder andre emner med mindre det er spesifisert her. vær veldig beskrivende når du genererer hvert emne.
    Generer svar i html som omgir nøkkelemner med h4-tag. 
    Begynn utfyllingen med "<h3>Utdrag</h3>"
Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
    Generer alt på norsk.
    Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle Lederoppsummering du kom opp med:
    `,
  };

  const model = variantID === '2' ? 'gpt-4o-mini' : 'gpt-3.5-turbo';
  console.log("model:", model)
  const payload = {
    model: model,
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
