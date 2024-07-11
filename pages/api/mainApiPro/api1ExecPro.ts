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
export default async function api1ExecPro(request, response) {
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

    initialInvestmentAmount,
    investmentItem1,
    investmentItem2,
    investmentItem3,
    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    productInfoPrompt,
    planQuota,
    planLanguage,
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

  //english lang-----------------------------------------------------

  const execPromptEN = `
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

    use 500 words to generate this executive summary.
    Write this as if you are the owner of the business, using "we" don't use "I".
    The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
    Generate response in html surrounding key topics with h4 tag. 
    Begin the completion with "<h3>Executive Summary</h3>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed, and lengthy executive summary you came up with:
    `;

  //german lang-----------------------------------------------------
  const execPromptDE = `
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

    Verwenden Sie 500 Wörter, um diese Zusammenfassung zu erstellen.
    Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
    Die Zusammenfassung sollte die folgenden Themen enthalten: Überblick über das Unternehmen, Ursprünge des Unternehmens, Wettbewerbsvorteil, finanzielle Zusammenfassung. Nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie bei der Erstellung der einzelnen Themen sehr anschaulich.
    Erzeugen Sie eine Antwort in HTML, die die Hauptthemen mit dem Tag h4 umgibt. 
    Beginnen Sie die Ergänzung mit "<h3>Zusammenfassung</h3>".
    Einfache Sprache verwenden.
    Fertigstellung auf Deutsch generieren.
    Dies ist die lange, detaillierte und ausführliche Zusammenfassung, die Sie sich ausgedacht haben:
    `;
  //french lang-----------------------------------------------------
  const execPromptFR = `
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

    Utilisez 500 mots pour générer ce résumé exécutif.
    Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".
    Le résumé exécutif doit inclure ces sujets : Vue d'ensemble de l'entreprise, Origines de l'entreprise, Avantage concurrentiel, Résumé financier. Ne pas inclure d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif lors de la génération de chaque sujet.
    Générez la réponse en HTML entourant les sujets clés avec la balise h4.
    Commencez la réalisation avec "<h3>Résumé Exécutif</h3>"
    Voici le résumé exécutif long, détaillé et étendu que vous avez élaboré :
    `;
  //spanish lang-----------------------------------------------------
  const execPromptES = `
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

    Use 500 palabras para generar este resumen ejecutivo.
    Escríbalo como si fuera el dueño del negocio, usando "nosotros" no use "yo".
    El Resumen Ejecutivo debe incluir estos temas: Visión General del Negocio, Orígenes del Negocio, Ventaja Competitiva, Resumen Financiero. No incluya otros temas a menos que se especifique aquí. Sea muy descriptivo al generar cada tema.
    Genere la respuesta en HTML rodeando los temas clave con la etiqueta h4.
    Comience la finalización con "<h3>Resumen Ejecutivo</h3>"
    Este es el resumen ejecutivo largo, detallado y extenso que usted elaboró:
  `;
  //italian lang-----------------------------------------------------
  const execPromptIT = `
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

    Usa 500 parole per generare questo riassunto esecutivo.
    Scrivilo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Il Riassunto Esecutivo dovrebbe includere questi argomenti: Panoramica dell'Azienda, Origini dell'Azienda, Vantaggio Competitivo, Riepilogo Finanziario. Non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo nella generazione di ogni argomento.
    Genera la risposta in HTML circondando gli argomenti chiave con il tag h4.
    Inizia il completamento con "<h3>Riassunto Esecutivo</h3>"
    Questo è il riassunto esecutivo lungo, dettagliato e ampio che hai elaborato:
    `;

  // dutch lang-----------------------------------------------------
  const execPromptNL = `
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

    Gebruik 500 woorden om deze executive summary te genereren.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" en niet "ik".
    De Executive Summary moet deze onderwerpen bevatten: Overzicht van het bedrijf, Oorsprong van het bedrijf, Concurrentievoordeel, Financiële samenvatting. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van elk onderwerp.
    Genereer de reactie in HTML en omring de sleutelonderwerpen met de h4-tag.
    Begin de voltooiing met "<h3>Samenvatting</h3>"
    Genereer alles in het Nederlands.
    Dit is de lange, gedetailleerde en uitgebreide executive summary die u heeft opgesteld:
    `;

  //japanese lang-----------------------------------------------------
  const execPromptJA = `
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

    このエグゼクティブサマリーを生成するために500語を使用します。
    あなたがビジネスのオーナーであるかのようにこれを書き、"I"ではなく"we"を使用します。
    エグゼクティブサマリーには、ビジネスの概要、ビジネスの起源、競争優位性、財務要約というトピックを含める必要があります。ここで指定されていない他のトピックは含めないでください。各トピックを生成するときには非常に詳細になるようにしてください。
    h4タグでキートピックを囲んでhtmlでレスポンスを生成します。
    完成を"<h3>エグゼクティブサマリー</h3>"で始めます
    すべてを日本語で生成します。
    これがあなたが考え出した長く、詳細で、長いエグゼクティブサマリーです：
    `;

  //arabic lang-----------------------------------------------------
  const execPromptAR = `
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

    استخدم 500 كلمة لإنشاء هذا الملخص التنفيذي.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    يجب أن يتضمن الملخص التنفيذي هذه المواضيع: نظرة عامة على العمل، أصول العمل، الأفضلية التنافسية، الملخص المالي. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفياً جداً عند إنشاء كل موضوع.
    أنشئ الرد في html محيطة المواضيع الرئيسية بوسم h4.
    ابدأ الإكمال بـ "<h3>الملخص التنفيذي</h3>"
    أنشئ كل شيء باللغة العربية.
    هذا هو الملخص التنفيذي الطويل والمفصل والطويل الذي أعددته:
    `;

  // swedish lang-----------------------------------------------------
  const execPromptSV = `
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

    använd 500 ord för att generera denna verkställande sammanfattning.
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Den verkställande sammanfattningen bör inkludera dessa ämnen: Företagsöversikt, Företagets ursprung, Konkurrensfördel, Finansiell sammanfattning. Inkludera inte andra ämnen om det inte specificeras här. var mycket beskrivande när du genererar varje ämne.
    Generera svar i html omger nyckelämnen med h4-taggen. 
    Börja slutförandet med "<h3>Verkställande sammanfattning</h3>"
    Generera allt på svenska.
    Detta är den långa, detaljerade och långa verkställande sammanfattningen du kom upp med:
    `;

  // finland lang-----------------------------------------------------
  const execPromptFI = `
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

    käytä 500 sanaa tämän toimeenpanevan yhteenvedon luomiseen.
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Toimeenpanevan yhteenvedon tulisi sisältää nämä aiheet: Liiketoimintakatsaus, Liiketoiminnan alkuperä, Kilpailuetu, Taloudellinen yhteenveto. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. ole hyvin kuvaileva luodessasi jokaista aihetta.
    Luo vastaus html:llä ympäröimällä avainaiheet h4-tagilla. 
    Aloita täydennys "<h3>Toimeenpaneva yhteenveto</h3>"
    Luo kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ja pitkä toimeenpaneva yhteenveto, jonka laadit:
    `;

  // denmark lang-----------------------------------------------------
  const execPromptDA = `
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

    brug 500 ord til at generere denne ledelsesresumé.
    Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Ledelsesresuméet skal inkludere disse emner: Virksomhedsoversigt, Virksomhedens oprindelse, Konkurrencemæssig fordel, Finansiel oversigt. Inkluder ikke andre emner, medmindre det er specificeret her. vær meget beskrivende, når du genererer hvert emne.
    Generer svar i html omgiver nøgleemner med h4-tag. 
    Begynd udfyldningen med "<h3>Udførende Resumé</h3>"
    Generer alt på dansk.
    Dette er den lange, detaljerede og lange ledelsesresumé, du kom op med:
    `;

  // norway lang-----------------------------------------------------
  const execPromptNO = `
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

    bruk 500 ord for å generere denne ledelsesoppsummeringen.
    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Ledelsesoppsummeringen skal inkludere disse emnene: Oversikt over virksomheten, Virksomhetens opprinnelse, Konkurransefortrinn, Finansiell oppsummering. Ikke inkluder andre emner med mindre det er spesifisert her. vær veldig beskrivende når du genererer hvert emne.
    Generer svar i html som omgir nøkkelemner med h4-tag. 
    Begynn utfyllingen med "<h3>Utdrag</h3>"
    Generer alt på norsk.
    Dette er den lange, detaljerte og lange ledelsesoppsummeringen du kom opp med:
    `;

  // other lang-----------------------------------------------------
  const execPromptOther = `
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

  use 500 words to generate this executive summary.
  Write this as if you are the owner of the business, using "we" don't use "I".
  The Executive Summary should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
  Generate response in html surrounding key topics with h4 tag. 
  Begin the completion with "<h3>Executive Summary</h3>"
  Generate everything in English.
  ${UKEngPrompt}
  This is the long, detailed, and lengthy executive summary you came up with:
    `;

  let execPromptFinal = '';

  if (planLanguage === 'en') {
    execPromptFinal = execPromptEN;
  } else if (planLanguage === 'de') {
    execPromptFinal = execPromptDE;
  } else if (planLanguage === 'fr') {
    execPromptFinal = execPromptFR;
  } else if (planLanguage === 'es') {
    execPromptFinal = execPromptES;
  } else if (planLanguage === 'it') {
    execPromptFinal = execPromptIT;
  } else if (planLanguage === 'nl') {
    execPromptFinal = execPromptNL;
  } else if (planLanguage === 'ja') {
    execPromptFinal = execPromptJA;
  } else if (planLanguage === 'ar') {
    execPromptFinal = execPromptAR;
  } else if (planLanguage === 'sv') {
    execPromptFinal = execPromptSV;
  } else if (planLanguage === 'fi') {
    execPromptFinal = execPromptFI;
  } else if (planLanguage === 'da') {
    execPromptFinal = execPromptDA;
  } else if (planLanguage === 'no') {
    execPromptFinal = execPromptNO;
  } else {
    execPromptFinal = execPromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: execPromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
