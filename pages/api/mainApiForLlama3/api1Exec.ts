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
export default async function api1Exec(request, response) {
  console.log('api1Exec running');

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
    planLanguage,
  } = await request.json();

  const revenueGrowthRate1 = `${revenueGrowthRate * 100}%`;

  let UKEngPrompt = '';
  if (planLanguage === 'en-uk')
    UKEngPrompt = 'use british english spelling and grammar';

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
    This is the description of customer segment 1: ${customerDescription1}
    This is the description of customer segment 2: ${customerDescription2}
    This is the description of customer segment 3: ${customerDescription3}

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
    ${UKEngPrompt}
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful executive summary you came up with:
    `;

  //german lang ------------------------------------------------------------------------------------------

  const execPromptDE = `
  Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um eine lange und detaillierte Zusammenfassung für einen Geschäftsplan zu schreiben. Wenn die Zusammenfassung nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
  Dies sind Details zum Geschäft:
  Dies ist der betriebliche Status des Kunden: ${businessOperationalStatus}.
  Dies ist der Vertriebskanal des Kunden: ${salesChannel}.
  Dies ist der Name des Unternehmens des Kunden: ${businessName}.
  Dies ist die Beschreibung des Geschäfts: ${businessType}. 
  Dies ist die Anzahl der Mitarbeiter: ${NEmployee}.
  Dies ist der Standort der Kunden des Kunden: ${location}.

  Dies sind Details zu den Kundensegmenten des Unternehmens:
  Dies ist die Beschreibung des Kundensegments 1: ${customerDescription1}
  Dies ist die Beschreibung des Kundensegments 2: ${customerDescription2}
  Dies ist die Beschreibung des Kundensegments 3: ${customerDescription3}

  Dies sind Details zu den Produkten oder Dienstleistungen des Kunden:
  ${productInfoPrompt}

  Dies sind die Schlüsselfaktoren für den Erfolg: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dies ist der erwartete Umsatz: ${firstYearRevenue}
  Dies ist die erwartete zukünftige Wachstumsrate: ${revenueGrowthRate1}

  Schreiben Sie dies, als wären Sie der Eigentümer des Unternehmens, verwenden Sie "wir" und nicht "ich".
  Die Zusammenfassung sollte diese Themen enthalten: Geschäftsübersicht, Geschäftsanfänge, Wettbewerbsvorteil, Finanzübersicht. Fügen Sie keine anderen Themen hinzu, es sei denn, sie sind hier angegeben. Seien Sie sehr beschreibend, wenn Sie jedes Thema generieren.
  Generieren Sie die Antwort in HTML und umgeben Sie die Schlüsseltopics mit dem h4-Tag. 
  Beginnen Sie die Zusammenfassung mit "<h3>Zusammenfassung</h3>"
  Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
Generiere alles auf Deutsch.
Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
Dies ist das lange, detaillierte und aufschlussreiche Zusammenfassung, das Sie sich ausgedacht haben:
  `;

  // french lang----------------------------------------------------------------------------------------------------------
  const execPromptFR = `
  Vous êtes un consultant professionnel, et un client vous demande d'écrire un résumé exécutif long et détaillé pour un plan d'affaires. Si le résumé exécutif n'est pas long et détaillé, le client sera très contrarié.
  Voici des détails concernant l'entreprise:
  Voici le statut opérationnel de l'entreprise du client: ${businessOperationalStatus}.
  Voici le canal de distribution du client: ${salesChannel}.
  Voici le nom de l'entreprise du client: ${businessName}.
  Voici la description de l'entreprise: ${businessType}. 
  Voici le nombre d'employés: ${NEmployee}.
  Voici où se trouvent les clients du client: ${location}.

  Voici des détails sur les segments de clientèle de l'entreprise:
  Voici la description du segment de clientèle 1: ${customerDescription1}
  Voici la description du segment de clientèle 2: ${customerDescription2}
  Voici la description du segment de clientèle 3: ${customerDescription3}

  Voici des détails sur les produits ou services du client:
  ${productInfoPrompt}

  Voici les facteurs clés de succès: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Voici le chiffre d'affaires attendu: ${firstYearRevenue}
  Voici le taux de croissance futur attendu: ${revenueGrowthRate1}

  Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  Le résumé exécutif doit inclure ces sujets: Aperçu de l'entreprise, Origines de l'entreprise, Avantage concurrentiel, Résumé financier. N'incluez pas d'autres sujets sauf s'ils sont spécifiés ici. Soyez très descriptif lors de la génération de chaque sujet.
  Générez la réponse en HTML en entourant les sujets clés avec la balise h4. 
  Commencez la complétion par "<h3>Résumé exécutif</h3>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
Générez tout en français.
C’est important : Soyez très perspicace dans votre réponse.
Voici le long, détaillé et perspicace Résumé Exécutif que vous avez trouvé :
  `;

  // spanish lang--------------------------------------------------------------------------------------
  const execPromptES = `
  Usted es un consultor profesional, y un cliente se le acerca para que escriba un resumen ejecutivo largo y detallado para un plan de negocios. Si el resumen ejecutivo no es largo y detallado, el cliente se molestará mucho.
  Estos son los detalles sobre el negocio:
  Este es el estado operativo del negocio del cliente: ${businessOperationalStatus}.
  Este es el canal de distribución del cliente: ${salesChannel}.
  Este es el nombre del negocio del cliente: ${businessName}.
  Esta es la descripción del negocio: ${businessType}. 
  Este es el número de empleados: ${NEmployee}.
  Aquí es donde se encuentran los clientes del cliente: ${location}.

  Estos son los detalles de los segmentos de clientes del negocio:
  Esta es la descripción del segmento de clientes 1: ${customerDescription1}
  Esta es la descripción del segmento de clientes 2: ${customerDescription2}
  Esta es la descripción del segmento de clientes 3: ${customerDescription3}

  Estos son los detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Estos son los ingresos esperados: ${firstYearRevenue}
  Esta es la tasa de crecimiento futura esperada: ${revenueGrowthRate1}

  Escriba esto como si fuera el propietario del negocio, usando "nosotros" y no "yo".
  El resumen ejecutivo debe incluir estos temas: Descripción general del negocio, Orígenes del negocio, Ventaja competitiva, Resumen financiero. No incluya otros temas a menos que se especifiquen aquí. Sea muy descriptivo al generar cada tema.
  Genere la respuesta en HTML rodeando los temas clave con la etiqueta h4. 
  Comience la finalización con "<h3>Resumen Ejecutivo</h3>"
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
Genere todo en español.
Esto es importante: Sea muy perspicaz en su respuesta.
Este es el largo, detallado y perspicaz Resumen Ejecutivo que se le ocurrió:
  `;

  //italian lang----------------------------------------------------
  const execPromptIT = `
  Sei un consulente professionista e un cliente si rivolge a te per scrivere un riassunto esecutivo lungo e dettagliato per un piano aziendale. Se il riassunto esecutivo non è lungo e dettagliato, il cliente sarà molto arrabbiato.
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

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Questi sono i ricavi previsti: ${firstYearRevenue}
  Questo è il tasso di crescita futuro previsto: ${revenueGrowthRate1}

  Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" e non "io".
  Il riassunto esecutivo dovrebbe includere questi argomenti: Panoramica aziendale, Origini aziendali, Vantaggio competitivo, Sommario finanziario. Non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo quando generi ogni argomento.
  Genera la risposta in HTML circondando gli argomenti chiave con il tag h4. 
  Inizia il completamento con "<h3>Riassunto Esecutivo</h3>"
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace Riassunto Esecutivo che hai ideato:
  `;

  //dutch lang----------------------------------------------------
  const execPromptNL = `
  U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd uitvoerend overzicht voor een bedrijfsplan te schrijven. Als het uitvoerend overzicht niet lang en gedetailleerd is, zal de klant erg boos zijn.
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

  Dit zijn de details van de producten of diensten van de klant:
  ${productInfoPrompt}

  Dit zijn de belangrijkste succesfactoren: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dit is de verwachte omzet: ${firstYearRevenue}
  Dit is de verwachte toekomstige groeipercentage: ${revenueGrowthRate1}

  Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
  Het uitvoerend overzicht moet deze onderwerpen bevatten: Bedrijfsoverzicht, Bedrijfsherkomst, Concurrentievoordeel, Financieel Overzicht. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van elk onderwerp.
  Genereer de reactie in HTML en omring de belangrijkste onderwerpen met de h4-tag. 
  Begin de voltooiing met "<h3>Uitvoerend Overzicht</h3>"
  Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
Genereer alles in het Nederlands.
Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
Dit is de lange, gedetailleerde en inzichtelijke Uitvoerend Overzicht die u bedacht hebt:
  `;

  //japanese lang----------------------------------------------------
  const execPromptJA = `
  あなたはプロのコンサルタントであり、クライアントがビジネスプランのための長く詳細なエグゼクティブサマリーを書くためにあなたにアプローチします。エグゼクティブサマリーが長く詳細でない場合、クライアントは非常に怒ります。
  これらはビジネスに関する詳細です：
  これはクライアントのビジネス運営状況です：${businessOperationalStatus}。
  これはクライアントの流通チャネルです：${salesChannel}。
  これはクライアントのビジネス名です：${businessName}。
  これはビジネスの説明です：${businessType}。 
  これは従業員数です：${NEmployee}。
  これはクライアントの顧客がいる場所です：${location}。

  これらはビジネスの顧客セグメントの詳細です：
  これは顧客セグメント1の説明です：${customerDescription1}
  これは顧客セグメント2の説明です：${customerDescription2}
  これは顧客セグメント3の説明です：${customerDescription3}

  これらはクライアントの製品またはサービスの詳細です：
  ${productInfoPrompt}

  これらは主要な成功要因です：${successFactors1}、${successFactors2}、${successFactors3}

  これは予想される収益です：${firstYearRevenue}
  これは予想される将来の成長率です：${revenueGrowthRate1}

  これをビジネスの所有者として書いてください。「私」ではなく「私たち」を使用してください。
  エグゼクティブサマリーには次のトピックを含める必要があります：ビジネス概要、ビジネスの起源、競争上の優位性、財務概要。ここで指定されていない限り、他のトピックを含めないでください。各トピックを生成する際には非常に詳細に記述してください。
  主要なトピックをh4タグで囲んでHTMLで応答を生成します。 
  "<h3>エグゼクティブサマリー</h3>"で完了を開始します。
  HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
すべてを日本語で生成します。
これは重要です: 回答には非常に洞察力を持ってください。
これがあなたが考えた長くて詳細で洞察に満ちたエグゼクティブサマリーです:
  `;

  //arabic lang----------------------------------------------------
  const execPromptAR = `
  أنت مستشار محترف، ويقترب منك عميل لكتابة ملخص تنفيذي طويل ومفصل لخطة عمل. إذا لم يكن الملخص التنفيذي طويلًا ومفصلًا، فسيكون العميل غاضبًا جدًا.
  هذه هي التفاصيل المتعلقة بالأعمال:
  هذه هي حالة التشغيل الخاصة بعميلك: ${businessOperationalStatus}.
  هذه هي قناة التوزيع الخاصة بالعميل: ${salesChannel}.
  هذا هو اسم عمل العميل: ${businessName}.
  هذا هو وصف العمل: ${businessType}. 
  هذا هو عدد الموظفين: ${NEmployee}.
  هذا هو مكان وجود عملاء العميل: ${location}.

  هذه هي تفاصيل شرائح عملاء الأعمال:
  هذا هو وصف شريحة العملاء 1: ${customerDescription1}
  هذا هو وصف شريحة العملاء 2: ${customerDescription2}
  هذا هو وصف شريحة العملاء 3: ${customerDescription3}

  هذه هي تفاصيل منتجات أو خدمات العميل:
  ${productInfoPrompt}

  هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}

  هذه هي الإيرادات المتوقعة: ${firstYearRevenue}
  هذا هو معدل النمو المستقبلي المتوقع: ${revenueGrowthRate1}

  اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" ولا تستخدم "أنا".
  يجب أن يتضمن الملخص التنفيذي هذه الموضوعات: نظرة عامة على الأعمال، أصول الأعمال، الميزة التنافسية، الملخص المالي. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفيًا جدًا عند إنشاء كل موضوع.
  قم بإنشاء الرد في HTML محاطًا بالمواضيع الرئيسية بعلامة h4. 
  ابدأ الإكمال بـ "<h3>الملخص التنفيذي</h3>"
  استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
  أنشئ كل شيء باللغة العربية.
  هذا مهم: كن بليغًا جدًا في ردك.
  هذا هو الملخص التنفيذي الطويل والمفصل والعميق الذي توصلت إليه:
  `;

  // swedish lang----------------------------------------------------
  const execPromptSV = `
  Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad sammanfattning för en affärsplan. Om sammanfattningen inte är lång och detaljerad kommer kunden att bli mycket upprörd.
  Detta är detaljer om företaget:
  Detta är kundens affärsdriftstatus: ${businessOperationalStatus}.
  Detta är kundens distributionskanal: ${salesChannel}.
  Detta är kundens företagsnamn: ${businessName}.
  Detta är beskrivningen av företaget: ${businessType}. 
  Detta är antalet anställda: ${NEmployee}.
  Detta är var kundens kunder finns: ${location}.

  Detta är detaljer om företagets kundsegment:
  Detta är beskrivningen av kundsegment 1: ${customerDescription1}
  Detta är beskrivningen av kundsegment 2: ${customerDescription2}
  Detta är beskrivningen av kundsegment 3: ${customerDescription3}

  Detta är detaljer om kundens produkter eller tjänster:
  ${productInfoPrompt}

  Detta är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Detta är den förväntade intäkten: ${firstYearRevenue}
  Detta är den förväntade framtida tillväxttakten: ${revenueGrowthRate1}

  Skriv detta som om du är ägaren av företaget, använd "vi" och inte "jag".
  Sammanfattningen bör innehålla dessa ämnen: Företagsöversikt, Företagets ursprung, Konkurrensfördel, Finansiell sammanfattning. Inkludera inte andra ämnen om de inte specificeras här. Var mycket beskrivande när du genererar varje ämne.
  Generera svar i HTML och omge nyckelämnen med h4-taggen. 
  Börja avslutningen med "<h3>Sammanfattning</h3>"
  Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
Generera allt på svenska.
Detta är viktigt: Var mycket insiktsfull i ditt svar.
Detta är den långa, detaljerade och insiktsfulla Sammanfattning du kom på:
  `;

  // finland lang----------------------------------------------------
  const execPromptFI = `
  Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen johtotiivistelmän liiketoimintasuunnitelmalle. Jos johtotiivistelmä ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan hyvin vihainen.
  Tässä ovat liiketoimintaan liittyvät tiedot:
  Tämä on asiakkaan liiketoiminnan operatiivinen tila: ${businessOperationalStatus}.
  Tämä on asiakkaan jakelukanava: ${salesChannel}.
  Tämä on asiakkaan yrityksen nimi: ${businessName}.
  Tämä on liiketoiminnan kuvaus: ${businessType}. 
  Tämä on työntekijöiden lukumäärä: ${NEmployee}.
  Tämä on paikka, jossa asiakkaan asiakkaat ovat: ${location}.

  Tässä ovat yrityksen asiakassegmenttien tiedot:
  Tämä on asiakassegmentin 1 kuvaus: ${customerDescription1}
  Tämä on asiakassegmentin 2 kuvaus: ${customerDescription2}
  Tämä on asiakassegmentin 3 kuvaus: ${customerDescription3}

  Tässä ovat asiakkaan tuotteiden tai palveluiden tiedot:
  ${productInfoPrompt}

  Tässä ovat keskeiset menestystekijät: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Tämä on odotettu liikevaihto: ${firstYearRevenue}
  Tämä on odotettu tuleva kasvuvauhti: ${revenueGrowthRate1}

  Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" äläkä "minä".
  Johtotiivistelmän tulisi sisältää nämä aiheet: Liiketoiminnan yleiskatsaus, Liiketoiminnan alkuperä, Kilpailuetu, Taloudellinen yhteenveto. Älä sisällytä muita aiheita, ellei niitä ole erikseen mainittu tässä. Ole erittäin kuvaileva, kun luot jokaisen aiheen.
  Luo vastaus HTML-muodossa ympäröimällä keskeiset aiheet h4-tunnisteella. 
  Aloita täydennys "<h3>Johtotiivistelmä</h3>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
Luo kaikki suomeksi.
Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
Tämä on pitkä, yksityiskohtainen ja oivaltava Johtotiivistelmä, jonka keksit:
  `;

  // danish lang----------------------------------------------------
  const execPromptDA = `
  Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en lang og detaljeret ledelsesresumé til en forretningsplan. Hvis ledelsesresuméet ikke er langt og detaljeret, vil klienten blive meget vred.
  Dette er detaljer vedrørende virksomheden:
  Dette er klientens forretningsdriftsstatus: ${businessOperationalStatus}.
  Dette er klientens distributionskanal: ${salesChannel}.
  Dette er klientens virksomhedsnavn: ${businessName}.
  Dette er beskrivelsen af virksomheden: ${businessType}. 
  Dette er antallet af medarbejdere: ${NEmployee}.
  Dette er hvor klientens kunder er: ${location}.

  Dette er detaljer om virksomhedens kundesegmenter:
  Dette er beskrivelsen af kundesegment 1: ${customerDescription1}
  Dette er beskrivelsen af kundesegment 2: ${customerDescription2}
  Dette er beskrivelsen af kundesegment 3: ${customerDescription3}

  Dette er detaljer om klientens produkter eller tjenester:
  ${productInfoPrompt}

  Dette er de vigtigste succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dette er den forventede indtægt: ${firstYearRevenue}
  Dette er den forventede fremtidige vækstrate: ${revenueGrowthRate1}

  Skriv dette, som om du er ejer af virksomheden, brug "vi" og ikke "jeg".
  Ledelsesresuméet skal indeholde disse emner: Virksomhedsoverblik, Virksomhedens oprindelse, Konkurrencefordel, Finansielt resumé. Inkluder ikke andre emner, medmindre de er specificeret her. Vær meget beskrivende, når du genererer hvert emne.
  Generer svar i HTML, der omgiver nøgleemner med h4-tag. 
  Begynd afslutningen med "<h3>Ledelsesresumé</h3>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
Generer alt på dansk.
Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
Dette er den lange, detaljerede og indsigtsfulde Ledelsesresumé, du kom op med:
  `;

  // norwegian lang----------------------------------------------------
  const execPromptNO = `
  Du er en profesjonell konsulent, og en klient henvender seg til deg for å skrive en lang og detaljert lederoppsummering for en forretningsplan. Hvis lederoppsummeringen ikke er lang og detaljert, vil klienten bli veldig opprørt.
  Dette er detaljer om virksomheten:
  Dette er klientens forretningsdriftsstatus: ${businessOperationalStatus}.
  Dette er klientens distribusjonskanal: ${salesChannel}.
  Dette er klientens firmanavn: ${businessName}.
  Dette er beskrivelsen av virksomheten: ${businessType}. 
  You are a professional consultant, and a client approaches you to write a long and detailed Lederoppsummering for a business plan. If the Lederoppsummering is not long and detailed the client will be very upset.
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

  These are details of the client's products or services:
  ${productInfoPrompt}

  These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}

  This is the expected revenue: ${firstYearRevenue}
  This is the expected future growth rate: ${revenueGrowthRate1}

  Write this as if you are the owner of the business, using "we" don't use "I".
  The Lederoppsummering should include these topics: Business Overview, Business Origins,Competitive Advantage,Financial Summary. Don't include other topics unless specified here. be very descriptive when generating each topic.
  Generate response in html surrounding key topics with h4 tag. 
  Begin the completion with "<h3>Lederoppsummering</h3>"
Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
Generer alt på norsk.
Dette er viktig: Vær veldig innsiktsfull i ditt svar.
Dette er den lange, detaljerte og innsiktsfulle Lederoppsummering du kom opp med:
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

  console.log('execPromptFinal: ', execPromptFinal);

  const payload = {
    model: 'gpt-3.5-turbo',
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
