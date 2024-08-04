import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IDigitalStrategyPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;
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
}

export const digitalStrategyPro = async (req: IDigitalStrategyPro) => {
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
    planQuota,
    variantID
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
    en: 'Digital Strategy',
    de: 'Digitale Strategie',
    fr: 'Stratégie numérique',
    es: 'Estrategia digital',
    it: 'Strategia digitale',
    nl: 'Digitale strategie',
    ja: 'デジタル戦略',
    ar: 'الاستراتيجية الرقمية',
    sv: 'Digital strategi',
    fi: 'Digitaalinen strategia',
    da: 'Digital strategi',
    no: 'Digital strategi',
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

    for Digital Strategy topic, include details on how the business will establish itself in the digital space and acheive success. surrounf each tactic with <li> tag.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Digital Strategy</h4>"
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

    for Digital Strategy topic, include details on how the business will establish itself in the digital space and acheive success. surrounf each tactic with <li> tag.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h4>Digital Strategy</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    // german lang --------------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.
    
      Geschäftsdaten:
      Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
      Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
      Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
      Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
      Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
  
      Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
      ${productInfoPrompt}
  
      Geben Sie zum Thema „Digitale Strategie“ Einzelheiten dazu an, wie sich das Unternehmen im digitalen Raum etablieren und erfolgreich sein wird. Umgeben Sie jede Taktik mit dem <li>-Tag.
    
      Wiederholen Sie keine Geschäftsdetails.
      Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
      Beginnen Sie den Abschluss mit „<h4>Digitale Strategie</h4>“
  Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
      Generiere alles auf Deutsch.
      Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
      Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
      `,

    // french lang --------------------------------------------------------------------------
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

    pour le sujet Stratégie Numérique, incluez des détails sur la façon dont l'entreprise s'établira dans l'espace numérique et atteindra le succès. entourez chaque tactique avec le tag <li>.

    Ne répétez pas les détails commerciaux.
    Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Commencez la rédaction avec "<h4>Stratégie Numérique</h4>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    // spanish lang --------------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre de la empresa del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}.
    detalle del negocio 3: La ubicación del negocio es: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 5: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para el tema Estrategia Digital, incluya detalles sobre cómo la empresa se establecerá en el espacio digital y logrará el éxito. rodee cada táctica con la etiqueta <li>.

    No repita los detalles del negocio.
    Redáctelo como si fuera el dueño del negocio, utilizando "nosotros" y no "yo".
    Comience la redacción con "<h4>Estrategia Digital</h4>"
Utilice únicamente etiquetas HTML, no utilice markdown. No utilice ** **, utilice en su lugar la etiqueta <strong> para negrita. No utilice * *, utilice en su lugar la etiqueta <em> para cursiva. No utilice * para viñetas, utilice en su lugar las etiquetas <ul> y <li>.
genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    // italian lang --------------------------------------------------------------------------
    it: `
    Lei è un consulente professionista e un cliente si rivolge a lei per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

  dettagli dell'azienda:
  dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
  dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  dettaglio aziendale 5: Lo stato operativo dell'attività del cliente è ${businessOperationalStatus}.

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  per il tema Strategia Digitale, includa dettagli su come l'azienda si stabilirà nello spazio digitale e raggiungerà il successo. Circondi ogni tattica con il tag <li>.

  Non ripeta i dettagli aziendali.
  Scriva come se fosse il proprietario dell'azienda, usando "noi" e non "io".
  Inizi la redazione con "<h4>Strategia Digitale</h4>"
Utilizzi solo tag HTML, non usi markdown. Non usi ** **, usi invece il tag <strong> per il grassetto. Non usi * *, usi invece il tag <em> per il corsivo. Non usi * per i punti elenco, usi invece i tag <ul> e <li>.
  Generi tutto in italiano.
  Questo è importante: Sia molto perspicace nella sua risposta.
  Ecco il lungo, dettagliato e perspicace ${promptTopic.it} che ha trovato:
    `,

    //dutch lang --------------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}

    voor het onderwerp Digitale Strategie, geef details over hoe het bedrijf zich zal vestigen in de digitale ruimte en succes zal behalen. Omring elke tactiek met de tag <li>.
    
    Herhaal de bedrijfsdetails niet.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Begin de voltooiing met "<h4>Digitale Strategie</h4>"
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang --------------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    デジタル戦略のトピックについては、ビジネスがデジタル空間でどのように確立し、成功を収めるかの詳細を含めてください。各戦略を<li>タグで囲んでください。
    
    ビジネスの詳細を繰り返さないでください。
    あなたがビジネスのオーナーであるかのように書いてください。"私たち"を使用し、"私"は使用しないでください。
    完成を"<h4>デジタル戦略</h4>"で始めてください。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang --------------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}. 
    تفاصيل العمل 3: موقع العمل هو: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لموضوع الاستراتيجية الرقمية، قم بتضمين التفاصيل حول كيفية تأسيس العمل في المساحة الرقمية وتحقيق النجاح. احاطة كل تكتيك بوسم <li>.
    
    لا تكرر تفاصيل الأعمال.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h4>الاستراتيجية الرقمية</h4>"
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    //swedish lang --------------------------------------------------------------------------
    sv: `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    Affärsdetalj 3: Platsen för verksamheten är: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens verksamhetsstatus är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    För ämnet Digital strategi, inkludera detaljer om hur företaget kommer att etablera sig i den digitala rymden och uppnå framgång. Omge varje taktik med <li> taggen.
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Börja kompletteringen med "<h4>Digital strategi</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    //finnish lang --------------------------------------------------------------------------
    fi: `
    Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan tieto 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Digitaalisen strategian aiheessa, sisällytä tiedot siitä, miten yritys perustaa itsensä digitaaliseen tilaan ja saavuttaa menestystä. Ympäröi jokainen taktiikka <li> tagilla.
    
    Älä toista liiketoiminnan tietoja.
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Aloita täydennys "<h4>Digitaalinen strategia</h4>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang --------------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${promptTopic.da} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalje 3: Virksomhedens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Disse er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Digital strategi emne, inkluder detaljer om, hvordan virksomheden vil etablere sig i det digitale rum og opnå succes. omgiv hver taktik med <li> tag.
    
    Gentag ikke forretningsdetaljer.
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke brug "jeg".
    Begynd udfyldningen med "<h4>Digital strategi</h4>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    // norwegian lang --------------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Virksomhetens plassering er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Digital strategi emne, inkluder detaljer om hvordan virksomheten vil etablere seg i det digitale rommet og oppnå suksess. omgir hver taktikk med <li> tag.
    
    Gjenta ikke forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
    Begynn utfyllingen med "<h4>Digital strategi</h4>"
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
