import { OpenAIStream } from "../../../../utils/OpenAIChatStream";
import { FireworksAIStream } from "../../../../utils/llama3/FireworksAIStream";

interface IExecutiveSummary {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: number;
  location: string;
  salesChannel: string;
  customerDescription1: string;
  customerDescription2: string;
  customerDescription3: string;
  successFactors1: string;
  successFactors2: string;
  successFactors3: string;
  firstYearRevenue: string;
  revenueGrowthRate: number;
  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
}

// api1Exec.ts
export const executiveSummary = (request: IExecutiveSummary) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerDescription1,

    customerDescription2,

    customerDescription3,

    successFactors1,
    successFactors2,
    successFactors3,

    firstYearRevenue,
    revenueGrowthRate,

    productInfoPrompt,
    planLanguage,
    variantID,
  } = request;

  const revenueGrowthRate1 = `${revenueGrowthRate * 100}%`;

  const promptTemplates = {
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
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful executive summary you came up with:
    `,
    "en-uk": `
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
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful executive summary you came up with:
    `,
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
                        Dies ist die Beschreibung des Kundensegments 1: ${customerDescription1}}
                        Dies ist die Beschreibung des Kundensegments 2: ${customerDescription2}
                        Dies ist die Beschreibung des Kundensegments 3: ${customerDescription3}
                        
                        Dies sind Einzelheiten zu den Produkten oder Dienstleistungen des Kunden:
                        ${productInfoPrompt}
                        
                        Dies sind die wichtigsten Erfolgsfaktoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Dies ist der erwartete Umsatz: ${firstYearRevenue}
                        Dies ist die erwartete zukünftige Wachstumsrate: ${revenueGrowthRate1}
                        
                        Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
                        Die Zusammenfassung sollte die folgenden Themen enthalten: Überblick über das Unternehmen, Ursprünge des Unternehmens, Wettbewerbsvorteil, finanzielle Zusammenfassung. Nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie bei der Erstellung der einzelnen Themen sehr anschaulich.
                        Erzeugen Sie eine Antwort in HTML, die die Hauptthemen mit dem Tag h4 umgibt. 
                        Beginnen Sie die Ergänzung mit "<h3>Zusammenfassung</h3>".
                        Einfache Sprache verwenden.
                        Fertigstellung auf Deutsch generieren.
                        Dies ist die lange, detaillierte und ausführliche Zusammenfassung, die Sie sich ausgedacht haben:`,
    fr: `Vous êtes un consultant professionnel et un client vous demande de rédiger un résumé exécutif long et détaillé pour un plan d'affaires. Si le résumé exécutif n'est pas long et détaillé, le client sera très contrarié.
                        Voici les détails concernant l'entreprise :
                        Voici le statut opérationnel de l'entreprise du client : ${businessOperationalStatus}.
                        Voici le canal de distribution du client : ${salesChannel}.
                        Voici le nom de l'entreprise du client : ${businessName}.
                        Voici la description de l'entreprise : ${businessType}. 
                        Voici le nombre d'employés : ${NEmployee}.
                        Voici où se trouvent les clients du client : ${location}.
                        
                        Voici les détails des segments de clients de l'entreprise :
                        Voici la description du segment de client 1 : ${customerDescription1}
                        Voici la description du segment de client 2 : ${customerDescription2}
                        Voici la description du segment de client 3 : ${customerDescription3}
                        
                        Voici les détails des produits ou services du client :
                        ${productInfoPrompt}
                        
                        Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Voici le revenu prévu : ${firstYearRevenue}
                        Voici le taux de croissance futur prévu : ${revenueGrowthRate1}
                        
                        Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
                        Le résumé exécutif doit inclure ces sujets : Aperçu de l'entreprise, Origines de l'entreprise, Avantage concurrentiel, Résumé financier. N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif lors de la génération de chaque sujet.
                        Générez une réponse en html entourant les sujets clés avec la balise h4. 
                        Commencez la réalisation avec "<h3>Résumé exécutif</h3>"
                        génère tout en français.
                        Voici le résumé exécutif long, détaillé et volumineux que vous avez élaboré:`,
    es: `Usted es un consultor profesional y un cliente se acerca a usted para escribir un resumen ejecutivo largo y detallado para un plan de negocios. Si el resumen ejecutivo no es largo y detallado, el cliente estará muy molesto.
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
                        
                        Estos son los detalles de los productos o servicios del cliente:
                        ${productInfoPrompt}
                        
                        Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Este es el ingreso esperado: ${firstYearRevenue}
                        Esta es la tasa de crecimiento futuro esperada: ${revenueGrowthRate1}
                        
                        Escriba esto como si fuera el dueño del negocio, usando "nosotros" no use "yo".
                        El Resumen Ejecutivo debe incluir estos temas: Resumen del Negocio, Orígenes del Negocio, Ventaja Competitiva, Resumen Financiero. No incluya otros temas a menos que se especifique aquí. sea muy descriptivo al generar cada tema.
                        Genere la respuesta en html rodeando los temas clave con la etiqueta h4. 
                        Comience la finalización con "<h3>Resumen Ejecutivo</h3>"
                        genera todo en español
                        Este es el resumen ejecutivo largo, detallado y extenso que elaboró:`,
    it: `Sei un consulente professionale e un cliente si avvicina a te per scrivere un lungo e dettagliato riassunto esecutivo per un piano aziendale. Se il riassunto esecutivo non è lungo e dettagliato, il cliente sarà molto contrariato.
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
                        
                        Questo è il fatturato previsto: ${firstYearRevenue}
                        Questo è il tasso di crescita futura previsto: ${revenueGrowthRate1}
                        
                        Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
                        Il Riassunto Esecutivo dovrebbe includere questi argomenti: Panoramica dell'azienda, Origini dell'azienda, Vantaggio competitivo, Riassunto finanziario. Non includere altri argomenti a meno che non siano specificati qui. sii molto descrittivo quando generi ogni argomento.
                        Genera la risposta in html circondando i temi chiave con il tag h4. 
                        Inizia la realizzazione con "<h3>Riassunto Esecutivo</h3>"
                        Genera tutto in italiano.
                        Questo è il riassunto esecutivo lungo, dettagliato e voluminoso che hai elaborato:`,
    nl: `Je bent een professionele consultant en een klant benadert je om een lange en gedetailleerde executive summary te schrijven voor een bedrijfsplan. Als de executive summary niet lang en gedetailleerd is, zal de klant erg overstuur zijn.
                        Dit zijn de details over het bedrijf:
                        Dit is de operationele status van het bedrijf van de klant: ${businessOperationalStatus}.
                        Dit is het distributiekanaal van de klant: ${salesChannel}.
                        Dit is de naam van het bedrijf van de klant: ${businessName}.
                        Dit is de beschrijving van het bedrijf: ${businessType}. 
                        Dit is het aantal werknemers: ${NEmployee}.
                        Dit is waar de klanten van de klant zich bevinden: ${location}.
                        
                        Dit zijn de details van de klantsegmenten van het bedrijf:
                        Dit is de beschrijving van klantsegment 1: ${customerDescription1}
                        Dit is de beschrijving van klantsegment 2: ${customerDescription2}
                        Dit is de beschrijving van klantsegment 3: ${customerDescription3}
                        
                        Dit zijn de details van de producten of diensten van de klant:
                        ${productInfoPrompt}
                        
                        Dit zijn de sleutelfactoren voor succes: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Dit is de verwachte omzet: ${firstYearRevenue}
                        Dit is het verwachte toekomstige groeipercentage: ${revenueGrowthRate1}
                        
                        Schrijf alsof je de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
                        De Executive Summary moet deze onderwerpen bevatten: Overzicht van het bedrijf, Oorsprong van het bedrijf, Concurrentievoordeel, Financieel overzicht. Voeg geen andere onderwerpen toe tenzij ze hier worden gespecificeerd. Wees zeer beschrijvend bij het genereren van elk onderwerp.
                        Genereer het antwoord in html door de sleutelthema's te omringen met de h4-tag. 
                        Begin de voltooiing met "<h3>Samenvatting</h3>"
                        Genereer alles in het Nederlands.
                        Dit is de lange, gedetailleerde en omvangrijke executive summary die je hebt opgesteld:`,
    ja: `
                        あなたはプロのコンサルタントで、クライアントがビジネスプランのための長く詳細なエグゼクティブサマリーを書くように依頼してきました。エグゼクティブサマリーが長く詳細でなければ、クライアントは非常に不満になります。
                        これらはビジネスに関する詳細です：
                        これがクライアントのビジネスの運営状況です：${businessOperationalStatus}。
                        これがクライアントの販売チャネルです：${salesChannel}。
                        これがクライアントのビジネス名です：${businessName}。
                        これがビジネスの説明です：${businessType}。 
                        これが従業員の数です：${NEmployee}。
                        これがクライアントの顧客がいる場所です：${location}。
                        
                        これらはビジネスの顧客セグメントの詳細です：
                        これが顧客セグメント1の説明です：${customerDescription1}
                        これが顧客セグメント2の説明です：${customerDescription2}
                        これが顧客セグメント3の説明です：${customerDescription3}
                        
                        これらはクライアントの製品またはサービスの詳細です：
                        ${productInfoPrompt}
                        
                        これらが成功の鍵となる要素です：${successFactors1}、${successFactors2}、${successFactors3}
                        
                        これが予想される収益です：${firstYearRevenue}
                        これが予想される未来の成長率です：${revenueGrowthRate1}
                        
                        あなたがビジネスのオーナーであるかのようにこれを書きます、"我々"を使用し、"I"を使用しないでください。
                        エグゼクティブサマリーには、ビジネスの概要、ビジネスの起源、競争優位性、財務要約を含める必要があります。ここで指定されていない他のトピックを含めないでください。各トピックを生成するときに非常に詳細になるようにしてください。
                        h4タグでキートピックを囲んでhtmlでレスポンスを生成します。 
                        完成を"<h3>エグゼクティブサマリー</h3>"で始めます
                        すべてを日本語で生成します。
                        これがあなたが考え出した長く、詳細で、長いエグゼクティブサマリーです:`,
    ar: `
                        أنت مستشار محترف، ويتقدم إليك عميل لكتابة ملخص تنفيذي طويل ومفصل لخطة عمل. إذا لم يكن الملخص التنفيذي طويلاً ومفصلاً، سيكون العميل غاضباً جداً.
                        هذه هي التفاصيل المتعلقة بالأعمال:
                        هذا هو حالة العمل التشغيلية للعميل: ${businessOperationalStatus}.
                        هذه هي قناة التوزيع للعميل: ${salesChannel}.
                        هذا هو اسم العمل للعميل: ${businessName}.
                        هذا هو وصف الأعمال: ${businessType}. 
                        هذا هو عدد الموظفين: ${NEmployee}.
                        هذا هو المكان الذي يوجد فيه عملاء العميل: ${location}.
                        
                        هذه هي تفاصيل أقسام العملاء للأعمال:
                        هذا هو وصف قسم العملاء 1: ${customerDescription1}
                        هذا هو وصف قسم العملاء 2: ${customerDescription2}
                        هذا هو وصف قسم العملاء 3: ${customerDescription3}
                        
                        هذه هي تفاصيل منتجات العميل أو الخدمات:
                        ${productInfoPrompt}
                        
                        هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}
                        
                        هذا هو الإيرادات المتوقعة: ${firstYearRevenue}
                        هذا هو معدل النمو المستقبلي المتوقع: ${revenueGrowthRate1}
                        
                        اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
                        يجب أن يتضمن الملخص التنفيذي هذه المواضيع: نظرة عامة على الأعمال، أصول الأعمال، الميزة التنافسية، الملخص المالي. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفياً جداً عند إنشاء كل موضوع.
                        أنشئ الرد في html محيطاً المواضيع الرئيسية بوسم h4. 
                        ابدأ الاكمال بـ "<h3>الملخص التنفيذي</h3>"
                        أنشئ كل شيء باللغة العربية.
                        هذا هو الملخص التنفيذي الطويل والمفصل والطويل الذي ابتكرته:`,
    sv: `
                        Du är en professionell konsult och en klient ber dig att skriva en lång och detaljerad sammanfattning för en affärsplan. Om sammanfattningen inte är lång och detaljerad kommer klienten att bli mycket upprörd.
                        Det här är detaljer om företaget:
                        Detta är klientens företags operativa status: ${businessOperationalStatus}.
                        Detta är klientens distributionskanal: ${salesChannel}.
                        Detta är klientens företagsnamn: ${businessName}.
                        Detta är beskrivningen av företaget: ${businessType}. 
                        Detta är antalet anställda: ${NEmployee}.
                        Detta är var klientens kunder finns: ${location}.
                        
                        Det här är detaljer om företagets kundsegment:
                        Detta är beskrivningen av kundsegment 1: ${customerDescription1}
                        Detta är beskrivningen av kundsegment 2: ${customerDescription2}
                        Detta är beskrivningen av kundsegment 3: ${customerDescription3}
                        
                        Det här är detaljer om klientens produkter eller tjänster:
                        ${productInfoPrompt}
                        
                        Det här är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Detta är den förväntade intäkten: ${firstYearRevenue}
                        Detta är den förväntade framtida tillväxthastigheten: ${revenueGrowthRate1}
                        
                        Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
                        Sammanfattningen bör inkludera dessa ämnen: Företagsöversikt, Företagets ursprung, Konkurrensfördel, Finansiell sammanfattning. Inkludera inte andra ämnen om det inte specificeras här. var mycket beskrivande när du genererar varje ämne.
                        Generera svar i html omger nyckelämnen med h4-taggen. 
                        Börja slutförandet med "<h3>Exekutiv Sammanfattning</h3>"
                        Generera allt på svenska.
                        Detta är den långa, detaljerade och långa sammanfattningen du kom upp med:`,
    fi: `
                        Olet ammattikonsultti, ja asiakas pyytää sinua kirjoittamaan pitkän ja yksityiskohtaisen toimitusjohtajan yhteenvedon liiketoimintasuunnitelmasta. Jos yhteenveto ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan hyvin vihainen.
                        Nämä ovat yksityiskohdat liiketoiminnasta:
                        Tämä on asiakkaan liiketoiminnan operatiivinen tila: ${businessOperationalStatus}.
                        Tämä on asiakkaan jakelukanava: ${salesChannel}.
                        Tämä on asiakkaan yrityksen nimi: ${businessName}.
                        Tämä on liiketoiminnan kuvaus: ${businessType}. 
                        Tämä on työntekijöiden määrä: ${NEmployee}.
                        Tämä on, missä asiakkaan asiakkaat ovat: ${location}.
                        
                        Nämä ovat yrityksen asiakassegmenttien yksityiskohdat:
                        Tämä on asiakassegmentin 1 kuvaus: ${customerDescription1}
                        Tämä on asiakassegmentin 2 kuvaus: ${customerDescription2}
                        Tämä on asiakassegmentin 3 kuvaus: ${customerDescription3}
                        
                        Nämä ovat asiakkaan tuotteiden tai palveluiden yksityiskohdat:
                        ${productInfoPrompt}
                        
                        Nämä ovat avaintekijät menestykselle: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Tämä on odotettu liikevaihto: ${firstYearRevenue}
                        Tämä on odotettu tulevaisuuden kasvuvauhti: ${revenueGrowthRate1}
                        
                        Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
                        Toimitusjohtajan yhteenvedon tulisi sisältää nämä aiheet: Yrityksen yleiskatsaus, Yrityksen alkuperä, Kilpailuetu, Taloudellinen yhteenveto. Älä sisällytä muita aiheita, ellei niitä ole tässä määritelty. ole hyvin kuvaileva luodessasi jokaista aihetta.
                        Luo vastaus html-muodossa, jossa avainaiheet on ympäröity h4-tagilla. 
                        Aloita täydennys "<h3>Toimitusjohtajan yhteenveto</h3>"
                        Luo kaikki suomeksi.
                        Tämä on pitkä, yksityiskohtainen ja pitkä yhteenveto, jonka laadit:`,
    da: `
                        Du er en professionel konsulent, og en klient nærmer dig for at skrive en lang og detaljeret ledelsesresumé for en forretningsplan. Hvis ledelsesresuméet ikke er langt og detaljeret, vil klienten være meget ked af det.
                        Dette er detaljer vedrørende virksomheden:
                        Dette er klientens forretningsoperationelle status: ${businessOperationalStatus}.
                        Dette er klientens distributionskanal: ${salesChannel}.
                        Dette er klientens firmanavn: ${businessName}.
                        Dette er beskrivelsen af virksomheden: ${businessType}. 
                        Dette er antallet af medarbejdere: ${NEmployee}.
                        Dette er, hvor klientens kunder er: ${location}.
                        
                        Dette er detaljer om virksomhedens kundesegmenter:
                        Dette er beskrivelsen af kundesegment 1: ${customerDescription1}
                        Dette er beskrivelsen af kundesegment 2: ${customerDescription2}
                        Dette er beskrivelsen af kundesegment 3: ${customerDescription3}
                        
                        Dette er detaljer om klientens produkter eller tjenester:
                        ${productInfoPrompt}
                        
                        Dette er de vigtige succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Dette er den forventede indtægt: ${firstYearRevenue}
                        Dette er den forventede fremtidige vækstrate: ${revenueGrowthRate1}
                        
                        Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
                        Ledelsesresuméet skal inkludere disse emner: Virksomhedsoversigt, Virksomhedens oprindelse, Konkurrencemæssig fordel, Finansiel oversigt. Inkluder ikke andre emner, medmindre det er specificeret her. vær meget beskrivende, når du genererer hvert emne.
                        Generer svar i html, der omgiver nøgleemner med h4-tag. 
                        Begynd udfyldningen med "<h3>Direktørens resumé</h3>"
                        Generate alt på dansk.
                        Dette er den lange, detaljerede og lange ledelsesresumé, du kom op med:`,
    no: `
                        Du er en profesjonell konsulent, og en klient nærmer deg for å skrive en lang og detaljert ledelsesoppsummering for en forretningsplan. Hvis ledelsesoppsummeringen ikke er lang og detaljert, vil klienten være veldig opprørt.
                        Dette er detaljer om virksomheten:
                        Dette er klientens driftsstatus: ${businessOperationalStatus}.
                        Dette er klientens distribusjonskanal: ${salesChannel}.
                        Dette er klientens firmanavn: ${businessName}.
                        Dette er beskrivelsen av virksomheten: ${businessType}. 
                        Dette er antall ansatte: ${NEmployee}.
                        Dette er hvor klientens kunder er: ${location}.
                        
                        Dette er detaljer om virksomhetens kundesegmenter:
                        Dette er beskrivelsen av kundesegment 1: ${customerDescription1}
                        Dette er beskrivelsen av kundesegment 2: ${customerDescription2}
                        Dette er beskrivelsen av kundesegment 3: ${customerDescription3}
                        
                        Dette er detaljer om klientens produkter eller tjenester:
                        ${productInfoPrompt}
                        
                        Dette er de viktige suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
                        
                        Dette er den forventede inntekten: ${firstYearRevenue}
                        Dette er den forventede fremtidige vekstraten: ${revenueGrowthRate1}
                        
                        Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
                        Ledelsesoppsummeringen skal inkludere disse emnene: Oversikt over virksomheten, Virksomhetens opprinnelse, Konkurransefortrinn, Finansiell oppsummering. Ikke inkluder andre emner med mindre det er spesifisert her. vær veldig beskrivende når du genererer hvert emne.
                        Generer svar i html, omgir nøkkeltemaer med h4-taggen. 
                        Begynn utfyllingen med "<h3>Administrativ oppsummering</h3>"
                        Generer alt på norsk.
                        Dette er den lange, detaljerte og lange ledelsesoppsummeringen du kom opp med:`,
  };

  if (variantID === "2") {
    const payload = {
      messages: [{ role: "user", content: promptTemplates[planLanguage] }],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1500,
      stream: true,
      n: 1,
    };
    return FireworksAIStream(payload);
  } else {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptTemplates[planLanguage] }],
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
};
