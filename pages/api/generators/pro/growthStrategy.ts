import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IGrowthStrategyPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;
  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
  planQuota: number;
}
export const growthStrategyPro = async (req: IGrowthStrategyPro) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,
    productInfoPrompt,
    planLanguage,
    variantID,
    planQuota,
  } = req;

  const promptTopic = {
    en: 'Growth Strategy',
    de: 'Wachstumsstrategie',
    fr: 'Stratégie de croissance',
    es: 'Estrategia de crecimiento',
    it: 'Strategia di crescita',
    nl: 'Groei strategie',
    ja: '成長戦略',
    ar: 'استراتيجية النمو',
    sv: 'Tillväxtstrategi',
    fi: 'Kasvustrategia',
    da: 'Vækststrategi',
    no: 'Vekststrategi',
  };

  const prompt = {
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

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
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Growth Strategy</h3>" followed by "<h4>Market Development</h4>".
    Don't use words like slow or slowly it makes the business look unambitious.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

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
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Growth Strategy</h3>" followed by "<h4>Market Development</h4>".
    Don't use words like slow or slowly it makes the business look unambitious.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    //german lang -------------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.

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
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie die Vervollständigung mit „<h3>Wachstumsstrategie</h3>“, gefolgt von „<h4>Marktentwicklung</h4>“.
    Verwenden Sie keine Wörter wie „langsam“ oder „langsam“, da das Unternehmen sonst ehrgeizig wirkt.
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,
    //french lang -------------------------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

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
    Écrivez cela comme si vous étiez le propriétaire de l'entreprise, utilisez "nous" ne pas utiliser "je".
    Commencez la rédaction avec "<h3>Stratégie de Croissance</h3>" suivi de "<h4>Développement du Marché</h4>".
    N'utilisez pas des mots comme lent ou lentement, cela rend l'entreprise peu ambitieuse.
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,
    //spanish lang -------------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca para que redacte un ${promptTopic.es} largo y detallado para un plan de negocios.

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
    Escriba esto como si usted fuera el dueño del negocio, usando "nosotros" no use "yo".
    Comience la redacción con "<h3>Estrategia de Crecimiento</h3>" seguido de "<h4>Desarrollo del Mercado</h4>".
    No use palabras como lento o lentamente, hace que el negocio parezca poco ambicioso.
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
    Genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,
    //italian lang -------------------------------------------------------------------------
    it: `
    Sei un consulente professionista e un cliente si avvicina per chiederti di scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

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
    Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Inizia il testo con "<h3>Strategia di Crescita</h3>" seguito da "<h4>Sviluppo del Mercato</h4>".
    Non utilizzare parole come lento o lentamente, dà l'idea che l'azienda sia poco ambiziosa.
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,
    //dutch lang -------------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${promptTopic.nl} te schrijven voor een bedrijfsplan.

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
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Begin de voltooiing met "<h3>Groei Strategie</h3>" gevolgd door "<h4>Marktontwikkeling</h4>".
    Gebruik geen woorden als langzaam of traag, het maakt het bedrijf er onambitieus uitzien.
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,
    //japanese lang -------------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くようにあなたに依頼してきました。

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
    あなたがビジネスのオーナーであるかのようにこれを書き、"私たちは"を使用し、"私"は使用しないでください。
    完成を"<h3>成長戦略</h3>"で始め、次に"<h4>市場開発</h4>"を続けます。
    遅いやゆっくりといった言葉を使用しないでください、それはビジネスが野心的でないように見えます。
HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,
    //arabic lang -------------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} طويل ومفصل لخطة عمل.

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
    اكتب هذا كأنك صاحب العمل، استخدم "نحن" ولا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>استراتيجية النمو</h3>" تليها "<h4>تطوير السوق</h4>".
    لا تستخدم كلمات مثل بطيء أو ببطء، فهذا يجعل العمل يبدو غير طموح.
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,
    //swedish lang -------------------------------------------------------------------------
    sv: `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

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
    Skriv detta som om du är ägaren till verksamheten, använd "vi" och inte "jag".
    Börja kompletteringen med "<h3>Tillväxtstrategi</h3>" följt av "<h4>Marknadsutveckling</h4>".
    Använd inte ord som långsam eller sakta, det gör att verksamheten ser oambitiös ut.
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,
    //finnish lang -------------------------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

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
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h3>Kasvustrategia</h3>" seuraa "<h4>Markkinoiden kehittäminen</h4>".
    Älä käytä sanoja kuten hidas tai hitaasti, se saa yrityksen näyttämään vähemmän kunnianhimoiselta.
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,
    // danish lang -------------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

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
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Begynd udfyldelsen med "<h3>Vækststrategi</h3>" efterfulgt af "<h4>Markedsudvikling</h4>".
    Brug ikke ord som langsom eller langsomt, det får virksomheden til at se uambitiøs ud.
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,
    //norwegian lang -------------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

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
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Begynn utfyllingen med "<h3>Vekststrategi</h3>" etterfulgt av "<h4>Markedsutvikling</h4>".
    Ikke bruk ord som sakte eller langsomt, det får virksomheten til å se uambisiøs ut.
Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
    Generer alt på norsk.
    Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${promptTopic.no} du kom opp med:
    `,
  };

let modelPlanQuota = 'gpt-3.5-turbo';
if (planQuota <= 8) {
  modelPlanQuota = 'gpt-3.5-turbo';
  console.log('using gpt-3.5-turbo');
} else {
  modelPlanQuota = 'gpt-4';
  console.log('using gpt-4');
}

const model = variantID === '2' ? 'gpt-4o' : modelPlanQuota;
console.log('final model:', model);

const payload = {
  model: model,
  messages: [{ role: 'user', content: prompt[planLanguage] ?? prompt.en }],
  temperature: 0.5,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 1200,
  stream: true,
  n: 1,
};

return OpenAIStream(payload);
};
