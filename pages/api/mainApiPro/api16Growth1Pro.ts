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
export default async function api16Growth1Pro(request, response) {
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

    productInfoPrompt,
    planQuota,
    planLanguage,
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

  const growth1TopicEN = 'Growth Strategy';
  const growth1PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${growth1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Growth Strategy, There are 3 sub-topics: Market Development, Product Development, and Partnerships. For Market Development sub-topic, if the business is store-based then consider opening new stores in new locations. If the business is non-store-based then come up with a strategy that is relevant to the business. 

    use multiple <p> tag when writting content.
    
    Do not repeat business details.
    use 800 words to generate ${growth1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Growth Strategy</h3>" followed by "<h4>Market Development</h4>".
    Don't use words like slow or slowly it makes the business look unambitious.
    Generate everything in English.
    ${UKEngPrompt}
    This is the insightful ${growth1TopicEN} you came up with:
    `;

  //german lang -------------------------------------------------------------------------
  const growth1TopicDE = 'Wachstumsstrategie';
  const growth1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${growth1TopicDE} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Für die Wachstumsstrategie gibt es drei Unterthemen: Marktentwicklung, Produktentwicklung und Partnerschaften. Wenn das Unternehmen im Unterthema „Marktentwicklung“ auf Filialen basiert, sollten Sie die Eröffnung neuer Filialen an neuen Standorten in Betracht ziehen. Wenn das Unternehmen nicht über eine Filiale verfügt, sollten Sie eine Strategie entwickeln, die für das Unternehmen relevant ist.

    Verwenden Sie beim Schreiben von Inhalten mehrere <p>-Tags.
  
    Wiederholen Sie keine Geschäftsdetails.
    Verwenden Sie 800 Wörter, um ${growth1TopicDE} zu generieren.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie die Vervollständigung mit „<h3>Wachstumsstrategie</h3>“, gefolgt von „<h4>Marktentwicklung</h4>“.
    Verwenden Sie keine Wörter wie „langsam“ oder „langsam“, da das Unternehmen sonst ehrgeizig wirkt.
    Fertigstellung auf Deutsch generieren.
  
    Dies ist das aufschlussreiche ${growth1TopicDE}, das Sie sich ausgedacht haben:`;

  //french lang -------------------------------------------------------------------------
  const growth1TopicFR = 'Stratégie de croissance';
  const growth1PromptFR = `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${growth1TopicFR} long et détaillé pour un plan d'affaires.

    détails commerciaux:
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est ${businessType}.
    détail commercial 3 : L'emplacement de l'entreprise est : ${location}.
    détail commercial 4 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 5 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    pour la Stratégie de Croissance, il y a 3 sous-thèmes : Développement du Marché, Développement du Produit, et Partenariats. Pour le sous-thème Développement du Marché, si l'entreprise est basée en magasin, envisagez d'ouvrir de nouveaux magasins dans de nouveaux emplacements. Si l'entreprise n'est pas basée en magasin, élaborez une stratégie pertinente pour l'entreprise.

    utilisez plusieurs balises <p> lors de la rédaction du contenu.

    Ne répétez pas les détails commerciaux.
    utilisez 800 mots pour générer ${growth1TopicFR}.
    Écrivez cela comme si vous étiez le propriétaire de l'entreprise, utilisez "nous" ne pas utiliser "je".
    Commencez la rédaction avec "<h3>Stratégie de Croissance</h3>" suivi de "<h4>Développement du Marché</h4>".
    N'utilisez pas des mots comme lent ou lentement, cela rend l'entreprise peu ambitieuse.

    Voici l'approche perspicace du ${growth1TopicFR} que vous avez élaboré :
    `;

  //spanish lang -------------------------------------------------------------------------
  const growth1TopicES = 'Estrategia de crecimiento';
  const growth1PromptES = `
    Usted es un consultor profesional y un cliente se acerca para que redacte un ${growth1TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}.
    detalle del negocio 3: La ubicación del negocio es: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para la Estrategia de Crecimiento, hay 3 subtemas: Desarrollo del Mercado, Desarrollo del Producto y Alianzas. Para el subtema de Desarrollo del Mercado, si el negocio es basado en tienda, considere abrir nuevas tiendas en nuevas ubicaciones. Si el negocio no está basado en tienda, elabore una estrategia relevante para el negocio.

    use múltiples etiquetas <p> al escribir el contenido.

    No repita los detalles del negocio.
    use 800 palabras para generar ${growth1TopicES}.
    Escriba esto como si usted fuera el dueño del negocio, usando "nosotros" no use "yo".
    Comience la redacción con "<h3>Estrategia de Crecimiento</h3>" seguido de "<h4>Desarrollo del Mercado</h4>".
    No use palabras como lento o lentamente, hace que el negocio parezca poco ambicioso.

    Esta es la perspicaz ${growth1TopicES} que usted elaboró:
    `;

  //italian lang -------------------------------------------------------------------------
  const growth1TopicIT = 'Strategia di crescita';
  const growth1PromptIT = `
    Sei un consulente professionista e un cliente si avvicina per chiederti di scrivere un ${growth1TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di attività è ${businessType}.
    dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}

    per la Strategia di Crescita, ci sono 3 sottotemi: Sviluppo del Mercato, Sviluppo del Prodotto e Partnership. Per il sottotema Sviluppo del Mercato, se l'attività è basata su negozi, considera l'apertura di nuovi negozi in nuove località. Se l'attività non si basa su negozi, elabora una strategia pertinente per l'attività.

    utilizza più tag <p> quando scrivi il contenuto.

    Non ripetere i dettagli aziendali.
    utilizza 800 parole per generare ${growth1TopicIT}.
    Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Inizia il testo con "<h3>Strategia di Crescita</h3>" seguito da "<h4>Sviluppo del Mercato</h4>".
    Non utilizzare parole come lento o lentamente, dà l'idea che l'azienda sia poco ambiziosa.

    Questa è l'illuminante ${growth1TopicIT} che hai elaborato:
    `;

  //dutch lang -------------------------------------------------------------------------
  const growth1TopicNL = 'Groei strategie';
  const growth1PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${growth1TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    voor Groei Strategie, zijn er 3 subonderwerpen: Marktontwikkeling, Productontwikkeling en Partnerschappen. Voor het subonderwerp Marktontwikkeling, als het bedrijf op winkels is gebaseerd, overweeg dan om nieuwe winkels te openen op nieuwe locaties. Als het bedrijf niet op winkels is gebaseerd, bedenk dan een strategie die relevant is voor het bedrijf.

    gebruik meerdere <p> tags bij het schrijven van inhoud.
    
    Herhaal de bedrijfsdetails niet.
    gebruik 800 woorden om ${growth1TopicNL} te genereren. 
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Begin de voltooiing met "<h3>Groei Strategie</h3>" gevolgd door "<h4>Marktontwikkeling</h4>".
    Gebruik geen woorden als langzaam of traag, het maakt het bedrijf er onambitieus uitzien.
    Genereer alles in het Nederlands.
    Dit is de inzichtelijke ${growth1TopicNL} die u heeft bedacht:
    `;

  //japanese lang -------------------------------------------------------------------------
  const growth1TopicJP = '成長戦略';
  const growth1PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${growth1TopicJP}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの場所は${location}です。
    ビジネス詳細4：クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    成長戦略には、市場開発、製品開発、パートナーシップの3つのサブトピックがあります。市場開発のサブトピックについては、ビジネスが店舗ベースであれば新しい場所に新しい店舗を開設することを検討します。ビジネスが非店舗ベースであれば、ビジネスに関連する戦略を考え出します。

    コンテンツを書くときは複数の<p>タグを使用します。
    
    ビジネスの詳細を繰り返さないでください。
    ${growth1TopicJP}を生成するために800語を使用します。
    あなたがビジネスのオーナーであるかのようにこれを書き、"私たちは"を使用し、"私"は使用しないでください。
    完成を"<h3>成長戦略</h3>"で始め、次に"<h4>市場開発</h4>"を続けます。
    遅いやゆっくりといった言葉を使用しないでください、それはビジネスが野心的でないように見えます。
    すべてを日本語で生成します。
    これがあなたが考え出した洞察に富んだ${growth1TopicJP}です：
    `;

  //arabic lang -------------------------------------------------------------------------
  const growth1TopicAR = 'استراتيجية النمو';
  const growth1PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${growth1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه العمل: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لاستراتيجية النمو، هناك 3 مواضيع فرعية: تطوير السوق، تطوير المنتج، والشراكات. بالنسبة لموضوع تطوير السوق، إذا كان العمل يعتمد على المتاجر، فعندئذ قد تفكر في فتح متاجر جديدة في مواقع جديدة. إذا كان العمل لا يعتمد على المتاجر، فعندئذ قم بتطوير استراتيجية ذات صلة بالعمل.

    استخدم علامة <p> عند كتابة المحتوى.
    
    لا تكرر تفاصيل العمل.
    استخدم 800 كلمة لتوليد ${growth1TopicAR}. 
    اكتب هذا كأنك صاحب العمل، استخدم "نحن" ولا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>استراتيجية النمو</h3>" تليها "<h4>تطوير السوق</h4>".
    لا تستخدم كلمات مثل بطيء أو ببطء، فهذا يجعل العمل يبدو غير طموح.
    أنتج كل شيء باللغة العربية.
    هذه هي ${growth1TopicAR} الثاقبة التي ابتكرتها:
    `;

  //swedish lang -------------------------------------------------------------------------
  const growth1TopicSV = 'Tillväxtstrategi';
  const growth1PromptSV = `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${growth1TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    affärsdetalj 3: Platsen för verksamheten är: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens verksamhetsstatus är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    För tillväxtstrategi finns det 3 delämnen: Marknadsutveckling, Produktutveckling och Partnerskap. För delämnet Marknadsutveckling, om verksamheten är butiksbaserad, överväg att öppna nya butiker på nya platser. Om verksamheten inte är butiksbaserad, kom med en strategi som är relevant för verksamheten. 

    använd flera <p> taggar när du skriver innehåll.
    
    Upprepa inte affärsdetaljer.
    använd 800 ord för att generera ${growth1TopicSV}. 
    Skriv detta som om du är ägaren till verksamheten, använd "vi" och inte "jag".
    Börja kompletteringen med "<h3>Tillväxtstrategi</h3>" följt av "<h4>Marknadsutveckling</h4>".
    Använd inte ord som långsam eller sakta, det gör att verksamheten ser oambitiös ut.
    Generera allt på svenska.
    Detta är den insiktsfulla ${growth1TopicSV} du kom upp med:
    `;

  //finnish lang -------------------------------------------------------------------------
  const growth1TopicFI = 'Kasvustrategia';
  const growth1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${growth1TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on: ${businessType}. 
    liiketoiminnan tieto 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat yksityiskohdat asiakkaan tuotteista tai palveluista:
    ${productInfoPrompt}

    Kasvustrategiaan liittyy kolme ala-aihetta: Markkinoiden kehittäminen, Tuotekehitys ja Kumppanuudet. Markkinoiden kehittämisen ala-aiheessa, jos liiketoiminta perustuu myymälöihin, harkitse uusien myymälöiden avaamista uusissa paikoissa. Jos liiketoiminta ei perustu myymälöihin, kehitä strategia, joka on relevantti liiketoiminnalle. 

    käytä useita <p> -tagia kirjoittaessasi sisältöä.
    
    Älä toista liiketoiminnan tietoja.
    käytä 800 sanaa generoidaksesi ${growth1TopicFI}. 
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h3>Kasvustrategia</h3>" seuraa "<h4>Markkinoiden kehittäminen</h4>".
    Älä käytä sanoja kuten hidas tai hitaasti, se saa yrityksen näyttämään vähemmän kunnianhimoiselta.
    Generoi kaikki suomeksi.
    Tämä on oivaltava ${growth1TopicFI}, jonka keksit:
    `;

  // danish lang -------------------------------------------------------------------------
  const growth1TopicDA = 'Vækststrategi';
  const growth1PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${growth1TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er: ${businessType}. 
    forretningsdetalje 3: Virksomhedens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    For vækststrategi er der 3 undertemaer: Markedsudvikling, Produktudvikling og Partnerskaber. For undertemaet Markedsudvikling, hvis virksomheden er butiksbaseret, overvej at åbne nye butikker på nye steder. Hvis virksomheden ikke er butiksbaseret, kom med en strategi, der er relevant for virksomheden. 

    brug flere <p> tags når du skriver indhold.
    
    Gentag ikke forretningsdetaljer.
    brug 800 ord til at generere ${growth1TopicDA}. 
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Begynd udfyldelsen med "<h3>Vækststrategi</h3>" efterfulgt af "<h4>Markedsudvikling</h4>".
    Brug ikke ord som langsom eller langsomt, det får virksomheden til at se uambitiøs ud.
    Generer alt på dansk.
    Dette er den indsigtsfulde ${growth1TopicDA} du kom op med:
    `;

  //norwegian lang -------------------------------------------------------------------------
  const growth1TopicNO = 'Vekststrategi';
  const growth1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${growth1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er: ${businessType}. 
    forretningsdetalj 3: Virksomhetens plassering er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    For vekststrategi er det 3 undertemaer: Markedsutvikling, Produktutvikling og Partnerskap. For undertemaet Markedsutvikling, hvis virksomheten er butikkbasert, vurder å åpne nye butikker på nye steder. Hvis virksomheten ikke er butikkbasert, kom med en strategi som er relevant for virksomheten. 

    bruk flere <p> tagger når du skriver innhold.
    
    Gjenta ikke forretningsdetaljer.
    bruk 800 ord for å generere ${growth1TopicNO}. 
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Begynn utfyllingen med "<h3>Vekststrategi</h3>" etterfulgt av "<h4>Markedsutvikling</h4>".
    Ikke bruk ord som sakte eller langsomt, det får virksomheten til å se uambisiøs ut.
    Generer alt på norsk.
    Dette er den innsiktsfulle ${growth1TopicNO} du kom opp med:
    `;

  //other lang -------------------------------------------------------------------------
  const growth1TopicOT = 'Growth Strategy';
  const growth1PromptOT = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${growth1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: The location of the business is: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Growth Strategy, There are 3 sub-topics: Market Development, Product Development, and Partnerships. For Market Development sub-topic, if the business is store-based then consider opening new stores in new locations. If the business is non-store-based then come up with a strategy that is relevant to the business. 

    use multiple <p> tag when writting content.
    
    Do not repeat business details.
    use 800 words to generate ${growth1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Growth Strategy</h3>" followed by "<h4>Market Development</h4>".
    Don't use words like slow or slowly it makes the business look unambitious.
    Generate everything in English.
    This is the insightful ${growth1TopicEN} you came up with:
    `;

  let growth1PromptFinal = '';

  if (planLanguage === 'en') {
    growth1PromptFinal = growth1PromptEN;
  } else if (planLanguage === 'de') {
    growth1PromptFinal = growth1PromptDE;
  } else if (planLanguage === 'fr') {
    growth1PromptFinal = growth1PromptFR;
  } else if (planLanguage === 'es') {
    growth1PromptFinal = growth1PromptES;
  } else if (planLanguage === 'it') {
    growth1PromptFinal = growth1PromptIT;
  } else if (planLanguage === 'nl') {
    growth1PromptFinal = growth1PromptNL;
  } else if (planLanguage === 'ja') {
    growth1PromptFinal = growth1PromptJP;
  } else if (planLanguage === 'ar') {
    growth1PromptFinal = growth1PromptAR;
  } else if (planLanguage === 'sv') {
    growth1PromptFinal = growth1PromptSV;
  } else if (planLanguage === 'fi') {
    growth1PromptFinal = growth1PromptFI;
  } else if (planLanguage === 'da') {
    growth1PromptFinal = growth1PromptDA;
  } else if (planLanguage === 'no') {
    growth1PromptFinal = growth1PromptNO;
  } else {
    growth1PromptFinal = growth1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: growth1PromptFinal }],
    temperature: 0.6,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
