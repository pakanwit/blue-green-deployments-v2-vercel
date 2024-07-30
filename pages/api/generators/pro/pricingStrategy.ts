import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IPricingStrategyPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;
  productOrService: string;
  customerDescription1: string;
  customerDescription2: string;
  customerDescription3: string;
  mark2Ref: string;
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
export const pricingStrategyPro = (req: IPricingStrategyPro) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,
    productOrService,
    customerDescription1,
    customerDescription2,
    customerDescription3,
    mark2Ref,
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

  const targeting = mark2Ref.substring(mark2Ref.indexOf('<h5>Targeting</h5>'));
  const positioning = mark2Ref.substring(
    mark2Ref.indexOf('<h5>Positioning</h5>'),
  );

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
            prompt += `Klant's product of dienst #${i} Naam: ${productName}\n`;
            break;
          case 'ja':
            prompt += `クライアントの製品またはサービス #${i} 名前: ${productName}\n`;
            break;
          case 'ar':
            prompt += `اسم المنتج أو الخدمة #${i} للعميل: ${productName}\n`;
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
            prompt += `Klant's product of dienst #${i} Beschrijving: ${productDescription}\n`;
            break;
          case 'ja':
            prompt += `クライアントの製品またはサービス #${i} 説明: ${productDescription}\n`;
            break;
          case 'ar':
            prompt += `وصف المنتج أو الخدمة #${i} للعميل: ${productDescription}\n`;
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

  let distributionOrServicePrompt = '';
  let distributionOrServiceHeading = '';

  if (productOrService === 'product') {
    switch (planLanguage) {
      case 'de':
        distributionOrServicePrompt =
          'Für die Vertriebsstrategie wählen Sie die am besten geeigneten Vertriebskanäle für unser Produkt aus, um unsere Kunden effizient und effektiv zu erreichen. Begründen Sie, warum Sie diese speziellen Kanäle gewählt haben und wie das Produkt auf effiziente Weise die Kunden erreicht. Berücksichtigen Sie das Targeting und Positioning. Jede Beschreibung des Vertriebskanals sollte in einem <li> Tag eingefasst sein.';
        distributionOrServiceHeading = 'Vertriebsstrategie';
        break;
      case 'fr':
        distributionOrServicePrompt =
          "Pour la stratégie de distribution, choisissez les canaux de distribution les plus appropriés pour notre produit afin d'atteindre efficacement et efficacement nos clients. Spécifiez pourquoi vous avez choisi ces canaux particuliers et comment le produit atteindra les clients de manière efficace. Considérez le ciblage et le positionnement. Chaque description de canal de distribution doit être enveloppée dans une balise <li>.";
        distributionOrServiceHeading = 'Stratégie de distribution';
        break;
      case 'es':
        distributionOrServicePrompt =
          'Para la Estrategia de Distribución, elija los canales de distribución más apropiados para nuestro producto para llegar a nuestros clientes de manera eficiente y efectiva. Especifique por qué eligió estos canales particulares y cómo el producto llegará a los clientes de manera eficiente. Considere el tema de segmentación y posicionamiento. Cada descripción del canal de distribución debe estar envuelta en una etiqueta <li>.';
        distributionOrServiceHeading = 'Estrategia de Distribución';
        break;
      case 'it':
        distributionOrServicePrompt =
          'Per la Strategia di Distribuzione, scegli i canali di distribuzione più appropriati per il nostro prodotto per raggiungere in modo efficiente ed efficace i nostri clienti. Specifica perché hai scelto questi particolari canali e come il prodotto raggiungerà i clienti in modo efficiente. Considera il targeting e il posizionamento. Ogni descrizione del canale di distribuzione dovrebbe essere avvolta in un tag <li>.';
        distributionOrServiceHeading = 'Strategia di Distribuzione';
        break;
      case 'nl':
        distributionOrServicePrompt =
          'Voor de distributiestrategie, kies de meest geschikte distributiekanalen voor ons product om onze klanten efficiënt en effectief te bereiken. Specificeer waarom u deze specifieke kanalen heeft gekozen en hoe het product op een efficiënte manier de klanten zal bereiken. Overweeg het targeting en positionering onderwerp. Verpak elke beschrijving van het distributiekanaal in een <li> tag.';
        distributionOrServiceHeading = 'Distributiestrategie';
        break;
      case 'ja':
        distributionOrServicePrompt =
          '配布戦略では、私たちの製品を効率的かつ効果的に顧客に届けるために最も適した配布チャネルを選択します。これらの特定のチャネルを選んだ理由と、製品がどのように効率的に顧客に届くかを指定します。ターゲティングとポジショニングのトピックを考慮してください。各配布チャネルの説明を<li>タグでラップします。';
        distributionOrServiceHeading = '配布戦略';
        break;
      case 'ar':
        distributionOrServicePrompt =
          'بالنسبة لاستراتيجية التوزيع، اختر القنوات الأكثر ملاءمة لتوزيع منتجنا للوصول إلى عملائنا بكفاءة وفعالية. حدد لماذا اخترت هذه القنوات بالذات وحدد كيف سيصل المنتج إلى العملاء بطريقة فعالة. ضع في اعتبارك موضوع التوجيه والموضع. احزم كل وصف لقناة التوزيع في علامة <li>.';
        distributionOrServiceHeading = 'استراتيجية التوزيع';
        break;
      case 'sv':
        distributionOrServicePrompt =
          'För distributionsstrategin, välj de mest lämpliga distributionskanalerna för vår produkt för att effektivt och effektivt nå våra kunder. Ange varför du valde dessa specifika kanaler och ange hur produkten kommer att nå kunderna på ett effektivt sätt. överväga ämnet riktning och positionering. Omslut varje beskrivning av distributionskanalen i en <li> tagg.';
        distributionOrServiceHeading = 'Distributionsstrategi';
        break;
      case 'fi':
        distributionOrServicePrompt =
          'Jakelustrategiaa varten valitse tuotteellemme sopivimmat jakelukanavat, jotta voimme tavoittaa asiakkaamme tehokkaasti ja tehokkaasti. määritä, miksi valitsit nämä erityiset kanavat ja määritä, miten tuote saavuttaa asiakkaat tehokkaasti. harkitse kohdistamista ja asemointia. Kääri jokainen jakelukanavan kuvaus <li> -tagiin.';
        distributionOrServiceHeading = 'Jakelustrategia';
        break;
      case 'da':
        distributionOrServicePrompt =
          'For distributionsstrategien skal du vælge de mest passende distributionskanaler for vores produkt for at nå vores kunder effektivt og effektivt. specificer, hvorfor du valgte disse specifikke kanaler, og specificer, hvordan produktet vil nå kunderne på en effektiv måde. overvej emnet målretning og positionering. Indpak hver beskrivelse af distributionskanalen i en <li> tag.';
        distributionOrServiceHeading = 'Distributionsstrategi';
        break;
      case 'no':
        distributionOrServicePrompt =
          'For distribusjonsstrategien, velg de mest passende distribusjonskanalene for produktet vårt for å nå kundene våre effektivt og effektivt. spesifiser hvorfor du valgte disse spesifikke kanalene og spesifiser hvordan produktet vil nå kundene på en effektiv måte. vurder emnet målretting og posisjonering. Pakk inn hver beskrivelse av distribusjonskanalen i en <li> tagg.';
        distributionOrServiceHeading = 'Distribusjonsstrategi';
        break;
      default:
        distributionOrServicePrompt =
          'For Distribution Strategy, choose the most appropriate distribution channels for our product to efficiently and effectively reach our customers. specify why you chose these particular channels and specify how the product will reach the customers in an efficient manner. consider the targeting and positioning topic. Wrap each distribution channel description in <li> tag.';
        distributionOrServiceHeading = 'Distribution Strategy';
    }
  } else if (productOrService === 'service') {
    switch (planLanguage) {
      case 'de':
        distributionOrServicePrompt =
          'Für die Service-Strategie, beschreiben Sie, wie die Mitarbeiter den Kunden bedienen werden, um maximale Kundenzufriedenheit und -loyalität zu gewährleisten. Verwenden Sie normale Absätze. Jeder Absatz sollte ein spezifisches Thema beschreiben. Verwenden Sie nur das <p> Tag, um jeden Absatz zu umschließen.';
        distributionOrServiceHeading = 'Service-Strategie';
        break;
      case 'fr':
        distributionOrServicePrompt =
          "Pour la stratégie de service, décrivez comment les employés serviront le client afin d'assurer la satisfaction et la fidélité maximales du client. Utilisez des paragraphes réguliers. Chaque paragraphe doit décrire un sujet spécifique. Utilisez uniquement la balise <p> pour envelopper chaque paragraphe.";
        distributionOrServiceHeading = 'Stratégie de service';
        break;
      case 'es':
        distributionOrServicePrompt =
          'Para la Estrategia de Servicio, describa cómo los empleados atenderán al cliente para garantizar la máxima satisfacción y lealtad del cliente. Utilice párrafos regulares. Cada párrafo debe describir un tema específico. Solo use la etiqueta <p> para envolver cada párrafo.';
        distributionOrServiceHeading = 'Estrategia de Servicio';
        break;
      case 'it':
        distributionOrServicePrompt =
          'Per la Strategia di Servizio, descrivi come i dipendenti serviranno il cliente per garantire la massima soddisfazione e lealtà del cliente. Usa paragrafi regolari. Ogni paragrafo dovrebbe descrivere un argomento specifico. Usa solo il tag <p> per avvolgere ogni paragrafo.';
        distributionOrServiceHeading = 'Strategia di Servizio';
        break;
      case 'nl':
        distributionOrServicePrompt =
          'Voor de Service Strategie, beschrijf hoe de medewerkers de klant zullen bedienen om maximale klanttevredenheid en loyaliteit te garanderen. Gebruik reguliere paragrafen. Elk paragraaf moet een specifiek onderwerp beschrijven. Gebruik alleen de <p> tag om elke paragraaf te omhullen.';
        distributionOrServiceHeading = 'Service Strategie';
        break;
      case 'ja':
        distributionOrServicePrompt =
          'サービス戦略では、従業員がどのように顧客にサービスを提供するかを説明し、最大の顧客満足度とロイヤルティを確保します。通常の段落を使用します。各段落は特定のトピックを説明するべきです。各段落をラップするためにのみ<p>タグを使用します。';
        distributionOrServiceHeading = 'サービス戦略';
        break;
      case 'ar':
        distributionOrServicePrompt =
          'بالنسبة لاستراتيجية الخدمة، اصف كيف سيخدم الموظفون العميل لضمان الرضا الأقصى للعملاء والولاء. استخدم فقرات عادية. يجب أن يصف كل فقرة موضوعًا محددًا. استخدم علامة <p> فقط لتغليف كل فقرة.';
        distributionOrServiceHeading = 'استراتيجية الخدمة';
        break;
      case 'sv':
        distributionOrServicePrompt =
          'För Service Strategi, beskriv hur anställda kommer att betjäna kunden för att säkerställa maximal kundnöjdhet och lojalitet. använd vanliga stycken. Varje stycke bör beskriva ett specifikt ämne. Använd endast <p> taggen för att omsluta varje stycke.';
        distributionOrServiceHeading = 'Service Strategi';
        break;
      case 'fi':
        distributionOrServicePrompt =
          'Palvelustrategiaa varten kuvaile, kuinka työntekijät palvelevat asiakasta maksimaalisen asiakastyytyväisyyden ja uskollisuuden varmistamiseksi. käytä tavallisia kappaleita. Jokaisen kappaleen tulisi kuvata tiettyä aihetta. Käytä vain <p> -tagia jokaisen kappaleen ympärillä.';
        distributionOrServiceHeading = 'Palvelustrategia';
        break;
      case 'da':
        distributionOrServicePrompt =
          'For Service Strategi, beskriv hvordan medarbejderne vil servicere kunden for at sikre maksimal kundetilfredshed og loyalitet. brug almindelige afsnit. Hvert afsnit skal beskrive et specifikt emne. Brug kun <p> tag til at indpakke hvert afsnit.';
        distributionOrServiceHeading = 'Service Strategi';
        break;
      case 'no':
        distributionOrServicePrompt =
          'For Service Strategi, beskriv hvordan de ansatte vil betjene kunden for å sikre maksimal kundetilfredshet og lojalitet. bruk vanlige avsnitt. Hvert avsnitt skal beskrive et spesifikt emne. Bruk bare <p> -taggen for å pakke inn hvert avsnitt.';
        distributionOrServiceHeading = 'Service Strategi';
        break;
      default:
        distributionOrServicePrompt =
          'For Service Strategy, describe how the employees will service the customer in order to ensure maximum customer satisfaction and loyalty. use regular paragraphs. Each paragraph should describe a specific topic. Only use <p> tag to wrap each paragraph.';
        distributionOrServiceHeading = 'Service Strategy';
    }
  } else {
    throw new Error('No product or service specification');
  }

  // create customer prompt
  let customerPrompt = '';
  const customerDescriptions = [
    customerDescription1,
    customerDescription2,
    customerDescription3,
  ];
  const customerGroups = {
    de: 'Kundengruppe',
    fr: 'Groupe de clients',
    es: 'Grupo de clientes',
    it: 'Gruppo di clienti',
    nl: 'Klantengroep',
    ja: '顧客グループ',
    ar: 'مجموعة العملاء',
    sv: 'Kundgrupp',
    fi: 'Asiakasryhmä',
    da: 'Kundegruppe',
    no: 'Kundegruppe',
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
    sv: 'Detta är beskrivningar av kundgrupper:',
    fi: 'Nämä ovat asiakasryhmien kuvaukset:',
    da: 'Dette er beskrivelser af kundegrupper:',
    no: 'Dette er beskrivelser av kundegrupper:',
    default: 'These are the customer group descriptions:',
  };

  customerDescriptions.forEach((description, index) => {
    if (description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups['default']} ${index + 1}: ${description}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions['default']}\n${customerPrompt}`;

  const promptTopic = {
    en: `Pricing Strategy and ${distributionOrServiceHeading}`,
    de: `Preisstrategie und ${distributionOrServiceHeading}`,
    fr: `Stratégie de tarification et ${distributionOrServiceHeading}`,
    es: `Estrategia de precios y ${distributionOrServiceHeading}`,
    it: `Strategia di prezzo e ${distributionOrServiceHeading}`,
    nl: `Prijsstrategie en ${distributionOrServiceHeading}`,
    ja: `価格戦略と${distributionOrServiceHeading}`,
    ar: `استراتيجية التسعير و ${distributionOrServiceHeading}`,
    sv: `Prissättningsstrategi och ${distributionOrServiceHeading}`,
    fi: `Hintastrategia ja ${distributionOrServiceHeading}`,
    da: `Prissætningsstrategi og ${distributionOrServiceHeading}`,
    no: `Prisstrategi og ${distributionOrServiceHeading}`,
  };

  const prompt = {
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write an insightful and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the topic that should be generated: ${promptTopic.en}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for both ${promptTopic.en}, you MUST consider these topic: 
    Targeting topic: ${targeting}. 
    Positioning topic: ${positioning}.
    Keep this targeting and positioning data in mind but DO NOT repeat this data in your response.

    For Pricing strategy topic, there are 3 major pricing strategies: value-based pricing, cost-based pricing,and competition-based pricing. Select one of these strategies and explain the reason behind why you selected that particular strategy and explain how you will implement that strategy and be very insightful. 

    ${distributionOrServicePrompt}

    Do not repeat business details.
    Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
    Begin the completion with "<h5>Pricing Strategy</h5>.
    Surround key topics with <h5> tags.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `
    You are a professional consultant, and a customer approaches you to write an insightful and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the topic that should be generated: ${promptTopic.en}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for both ${promptTopic.en}, you MUST consider these topic: 
    Targeting topic: ${targeting}. 
    Positioning topic: ${positioning}.
    Keep this targeting and positioning data in mind but DO NOT repeat this data in your response.

    For Pricing strategy topic, there are 3 major pricing strategies: value-based pricing, cost-based pricing,and competition-based pricing. Select one of these strategies and explain the reason behind why you selected that particular strategy and explain how you will implement that strategy and be very insightful. 

    ${distributionOrServicePrompt}

    Do not repeat business details.
    Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
    Begin the completion with "<h5>Pricing Strategy</h5>.
    Surround key topics with <h5> tags.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    // german lang ----------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um einen aufschlussreichen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu schreiben.

    Geschäftsdetails:
    Geschäftsdetail 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdetail 3: Dies ist der Ort, an dem sich die Kunden des Unternehmens befinden: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der Betriebsstatus des Kunden lautet: ${businessOperationalStatus}.

    Dies sind Details zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Dies sind die Themen, die erstellt werden sollen: ${promptTopic.de}, nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie sehr beschreibend bei der Erstellung von Inhalten für jedes Thema.

    für beide ${promptTopic.de}, MÜSSEN Sie diese Themen berücksichtigen: 
    ${mark2Ref}
    Behalten Sie diese Segmentierungs-, Zielgruppen- und Positionierungsdaten im Hinterkopf, aber WIEDERHOLEN Sie diese Daten NICHT in Ihrer Antwort.

    Für das Thema Preisstrategie gibt es 3 Hauptpreisstrategien: wertorientierte Preisgestaltung, kostenorientierte Preisgestaltung und wettbewerbsorientierte Preisgestaltung. Wählen Sie eine dieser Strategien aus und erläutern Sie, warum Sie sich für diese Strategie entschieden haben und wie Sie diese Strategie umsetzen werden, wobei Sie sehr aufschlussreich sein sollten. 

    ${distributionOrServicePrompt}

    Wiederholen Sie keine geschäftlichen Details.
    Schreiben Sie in der Ich-Perspektive, als ob Sie der Inhaber dieses Unternehmens wären und verwenden Sie "wir", NICHT "ich". 
    Beginnen Sie die Ergänzung mit "<h5>Strategie der Preisgestaltung</h5>.
    Umgeben Sie die wichtigsten Themen mit <h5>-Tags.
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    // french lang ----------------------------------------------------------------------
    fr: `
  Vous êtes un conseiller professionnel, et un client vous sollicite pour rédiger un ${promptTopic.fr} informatif et détaillé pour un plan d'affaires.

  Détails de l'entreprise :
  Détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
  Détail commercial 2 : Le type d'entreprise est ${businessType}.
  Détail commercial 3 : Voici l'emplacement des clients de l'entreprise : ${location}.
  Détail commercial 4 : Le canal de distribution du client est : ${salesChannel}.
  Détail commercial 5 : L'état opérationnel de l'entreprise du client est : ${businessOperationalStatus}.

  Voici les détails sur les produits ou services du client :
  ${productInfoPrompt}

  Voici les sujets à développer : ${promptTopic.fr}, n'incluez pas d'autres sujets, sauf s'ils sont indiqués ici. Soyez très descriptif dans la création de contenu pour chaque sujet.

  pour les deux ${promptTopic.fr}, vous DEVEZ considérer ces sujets :
  ${mark2Ref}
  Gardez ces données de segmentation, de ciblage et de positionnement à l'esprit, mais NE RÉPÉTEZ PAS ces données dans votre réponse.

  Pour le sujet de la stratégie de tarification, il existe 3 principales stratégies de tarification : tarification basée sur la valeur, tarification basée sur les coûts et tarification basée sur la concurrence. Choisissez l'une de ces stratégies et expliquez pourquoi vous avez choisi cette stratégie et comment vous allez la mettre en œuvre, tout en étant très informatif.

  ${distributionOrServicePrompt}

  Ne répétez pas les détails commerciaux.
  Écrivez à la première personne, comme si vous étiez le propriétaire de cette entreprise et utilisez "nous", PAS "je".
  Commencez la complétion avec "<h5>Stratégie de tarification</h5>".
  Entourez les principaux sujets avec des balises <h5>.
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
  `,

    // spanish lang ----------------------------------------------------------------------
    es: `
  Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${promptTopic.es} perspicaz y detallado para un plan de negocios.

  Detalles del negocio:
  Detalle de negocio 1: El nombre de la empresa del cliente es ${businessName}.
  Detalle de negocio 2: El tipo de negocio es ${businessType}.
  Detalle de negocio 3: Aquí es donde se encuentran los clientes de la empresa: ${location}.
  Detalle de negocio 4: El canal de distribución del cliente es: ${salesChannel}.
  Detalle de negocio 5: El estado operacional del negocio del cliente es: ${businessOperationalStatus}.

  Estos son detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Estos son los temas a tratar: ${promptTopic.es}, no incluya otros temas a menos que se especifiquen aquí. Sea muy descriptivo al crear contenido para cada tema.

  para ambos ${promptTopic.es}, DEBE considerar estos temas:
  ${mark2Ref}
  Tenga en cuenta estos datos de segmentación, orientación y posicionamiento, pero NO REPITA estos datos en su respuesta.

  Para el tema de estrategia de precios, hay 3 estrategias principales de precios: precios basados en el valor, precios basados en costos y precios basados en la competencia. Elija una de estas estrategias y explique por qué eligió esta estrategia y cómo la implementará, siendo muy perspicaz.

  ${distributionOrServicePrompt}

  No repita detalles del negocio.
  Escriba en primera persona, como si fuera el propietario de esta empresa y use "nosotros", NO "yo".
  Comience la respuesta con "<h5>Estrategia de precios</h5>".
  Rodee los temas principales con etiquetas <h5>.
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
  Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
  `,

    // italian lang ----------------------------------------------------------------------
    it: `
  Sei un consulente professionista e un cliente ti si avvicina per scrivere un ${promptTopic.it} perspicace e dettagliato per un piano aziendale.

  Dettagli aziendali:
  Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  Dettaglio aziendale 3: Questa è la localizzazione dei clienti dell'azienda: ${location}.
  Dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  Dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è: ${businessOperationalStatus}.

  Questi sono i dettagli sui prodotti o servizi del cliente:
  ${productInfoPrompt}

  Questi sono gli argomenti da trattare: ${promptTopic.it}, non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo nella creazione dei contenuti per ogni argomento.

  per entrambi i ${promptTopic.it}, DEVI considerare questi argomenti:
  ${mark2Ref}
  Tieni a mente questi dati di segmentazione, targeting e posizionamento, ma NON RIPETERE questi dati nella tua risposta.

  Per l'argomento strategia di prezzo, ci sono 3 principali strategie di prezzo: pricing basato sul valore, pricing basato sui costi e pricing basato sulla concorrenza. Scegli una di queste strategie e spiega perché hai scelto questa strategia e come la implementerai, essendo molto perspicace.

  ${distributionOrServicePrompt}

  Non ripetere i dettagli aziendali.
  Scrivi in prima persona, come se fossi il proprietario di questa azienda e usa "noi", NON "io".
  Inizia la risposta con "<h5>Strategia di Prezzo</h5>".
  Circonda gli argomenti principali con tag <h5>.
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
  Genera tutto in italiano.
  Questo è importante: Sii molto perspicace nella tua risposta.
  Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
  `,

    //dutch lang ----------------------------------------------------------------------
    nl: `
  Je bent een professionele consultant en een klant benadert je om een inzichtelijke en gedetailleerde ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn de onderwerpen die gegenereerd moeten worden: ${promptTopic.nl}, voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van inhoud voor elk onderwerp.

    voor beide ${promptTopic.it}, MOET je deze argumenten in overweging nemen:
    ${mark2Ref}
    Tieni a mente questi dati di segmentazione, targeting e posizionamento, ma NON RIPETERE questi dati nella tua risposta.

    Voor het onderwerp prijsstrategie zijn er 3 belangrijke prijsstrategieën: waardegebaseerde prijsstelling, kostengebaseerde prijsstelling en concurrentiegebaseerde prijsstelling. Kies een van deze strategieën en leg uit waarom je die specifieke strategie hebt gekozen en leg uit hoe je die strategie zeer inzichtelijk zult implementeren.

    ${distributionOrServicePrompt}

    Herhaal geen bedrijfsdetails.
    Schrijf dit vanuit het perspectief van de eerste persoon alsof je de eigenaar van dit bedrijf bent met behulp van "we", gebruik NIET "ik".
    Begin de voltooiing met "<h5>Prijsstrategie</h5>.
    Omring belangrijke onderwerpen met <h5> tags.
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
  `,

    //japanese lang ----------------------------------------------------------------------
    ja: `
  あなたはプロのコンサルタントで、顧客があなたに洞察に富んだ詳細な${promptTopic.ja}をビジネスプランに書くように依頼してきました。

    ビジネスの詳細:
    ビジネス詳細1: クライアントのビジネス名は${businessName}です。
    ビジネス詳細2: ビジネスのタイプは${businessType}です。
    ビジネス詳細3: ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4: クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5: クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}

    生成するべきトピックは${promptTopic.ja}です、ここで指定されていない他のトピックを含めないでください。各トピックの内容を非常に詳細に生成してください。

    ${customerPrompt}

    価格戦略のトピックについては、主要な価格戦略が3つあります: 価値ベースの価格設定、コストベースの価格設定、競争ベースの価格設定。これらの戦略の中から1つを選び、その特定の戦略を選んだ理由と、その戦略をどのように実装するかを非常に洞察に富んで説明してください。

    ${distributionOrServicePrompt}

    ビジネスの詳細を繰り返さないでください。
    あなたがこのビジネスのオーナーであるかのように、"私たち"を使って一人称の視点でこれを書いてください。"私"を使わないでください。
    完成を"<h5>価格戦略</h5>で始めてください。
    主要なトピックを<h5>タグで囲んでください。
HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
  `,

    //arabic lang ----------------------------------------------------------------------
    ar: `
  أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} مفصلة وباطنة لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    هذه هي المواضيع التي يجب توليدها: ${promptTopic.ar}، لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفيًا جدًا في توليد المحتوى لكل موضوع.

    ${customerPrompt}

    بالنسبة لموضوع استراتيجية التسعير، هناك ثلاث استراتيجيات تسعير رئيسية: التسعير بناءً على القيمة، التسعير بناءً على التكلفة، والتسعير بناءً على المنافسة. اختر واحدة من هذه الاستراتيجيات واشرح السبب وراء اختيارك لهذه الاستراتيجية بالذات واشرح كيف ستطبق هذه الاستراتيجية وكن باطنيًا جدًا.

    ${distributionOrServicePrompt}

    لا تكرر تفاصيل العمل.
    اكتب هذا من منظور الشخص الأول كما لو كنت صاحب هذا العمل باستخدام "نحن"، لا تستخدم "أنا".
    ابدأ الاكتمال بـ "<h5>استراتيجية التسعير</h5>.
    أحاط المواضيع الرئيسية بوسوم <h5>.
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
  `,

    // swedish lang ----------------------------------------------------------------------
    sv: `
  Du är en professionell konsult, och en kund närmar sig dig för att skriva en insiktsfull och detaljerad ${promptTopic.sv} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

    Detta är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    Detta är ämnet som ska genereras: ${promptTopic.sv}, inkludera inte andra ämnen om det inte specificeras här. Var mycket beskrivande när du genererar innehåll för varje ämne.

    för både ${promptTopic.sv}, du MÅSTE överväga dessa ämnen: 
    Målgruppsämne: ${targeting}. 
    Positioneringsämne: ${positioning}.
    Håll dessa segmenterings-, målgrupps- och positioneringsdata i åtanke men UPPREPA INTE dessa data i ditt svar.
    

    För ämnet prissättningsstrategi finns det 3 stora prissättningsstrategier: värdebaserad prissättning, kostnadsbaserad prissättning och konkurrensbaserad prissättning. Välj en av dessa strategier och förklara anledningen till varför du valde just den strategin och förklara hur du kommer att implementera den strategin och var mycket insiktsfull. 

    ${distributionOrServicePrompt}

    Upprepa inte affärsdetaljer.
    Skriv detta i första person perspektiv som om du är ägaren till detta företag med "vi", ANVÄND INTE "jag". 
    Börja slutförandet med "<h5>Prissättningsstrategi</h5>.
    Omge nyckelämnen med <h5> taggar.
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
  `,

    //finnish lang ----------------------------------------------------------------------
    fi: `
  Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan oivaltavan ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan yksityiskohta 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat yksityiskohtia asiakkaan tuotteista tai palveluista:
    ${productInfoPrompt}

    Nämä ovat aihe, joka pitäisi generoida: ${promptTopic.fi}, älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. Ole hyvin kuvaileva generoidessasi sisältöä jokaiselle aiheelle.

    sekä ${promptTopic.fi}, sinun TÄYTYY harkita näitä aiheita: 
    Kohdennusaihe: ${targeting}. 
    Positionointiaihe: ${positioning}.
    Pidä nämä segmentointi-, kohdistus- ja asemointitiedot mielessä, mutta ÄLÄ TOISTA näitä tietoja vastauksessasi.

    Hintastrategia-aiheessa on 3 suurta hinnoittelustrategiaa: arvopohjainen hinnoittelu, kustannuspohjainen hinnoittelu ja kilpailupohjainen hinnoittelu. Valitse yksi näistä strategioista ja selitä, miksi valitsit juuri kyseisen strategian ja selitä, miten toteutat kyseisen strategian ja ole hyvin oivaltava. 

    ${distributionOrServicePrompt}

    Älä toista liiketoiminnan yksityiskohtia.
    Kirjoita tämä ensimmäisen persoonan näkökulmasta, ikään kuin olisit tämän yrityksen omistaja käyttäen "me", ÄLÄ käytä "minä". 
    Aloita täydennys "<h5>Hintastrategia</h5> -merkinnällä.
    Ympäröi avainaiheet <h5> -tageilla.
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
  `,

    // danish lang ----------------------------------------------------------------------
    da: `
  Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en indsigtsfuld og detaljeret ${promptTopic.da} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af forretning er ${businessType}. 
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er emnet, der skal genereres: ${promptTopic.da}, inkluder ikke andre emner, medmindre det er specificeret her. Vær meget beskrivende i generering af indhold for hvert emne.

    for både ${promptTopic.da}, SKAL du overveje disse emner: 
    Målretningsemne: ${targeting}. 
    Positioneringsemne: ${positioning}. 
    Husk disse segmenterings-, målretnings- og positioneringsdata, men GENTAG IKKE disse data i dit svar.

    For emnet prissætningsstrategi er der 3 store prissætningsstrategier: værdibaseret prissætning, omkostningsbaseret prissætning og konkurrencebaseret prissætning. Vælg en af disse strategier og forklar årsagen til, hvorfor du valgte netop den strategi og forklar, hvordan du vil implementere den strategi og være meget indsigtsfuld. 

    ${distributionOrServicePrompt}

    Gentag ikke forretningsdetaljer.
    Skriv dette i første person perspektiv som om du er ejeren af denne virksomhed ved hjælp af "vi", BRUG IKKE "jeg". 
    Begynd udfyldelsen med "<h5>Prissætningsstrategi</h5>.
    Omgiv nøgleemner med <h5> tags.
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
  `,

    // norwegian lang ----------------------------------------------------------------------
    no: `
  Du er en profesjonell konsulent, og en kunde nærmer deg for å skrive en innsiktsfull og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    Dette er emnet som skal genereres: ${promptTopic.no}, ikke inkluder andre emner med mindre det er spesifisert her. Vær veldig beskrivende i generering av innhold for hvert emne.

    for begge ${promptTopic.no}, MÅ du vurdere disse emnene: 
    Målrettingsemne: ${targeting}. 
    Posisjoneringsemne: ${positioning}.
    Husk disse segmenterings-, målrettings- og posisjoneringsdataene, men IKKE gjenta disse dataene i svaret ditt.

    For emnet prisstrategi er det 3 store prisstrategier: verdi-basert prising, kostnadsbasert prising og konkurransebasert prising. Velg en av disse strategiene og forklar årsaken til at du valgte akkurat den strategien og forklar hvordan du vil implementere den strategien og være veldig innsiktsfull. 

    ${distributionOrServicePrompt}

    Gjenta ikke forretningsdetaljer.
    Skriv dette i første person perspektiv som om du er eieren av denne virksomheten ved hjelp av "vi", IKKE bruk "jeg". 
    Begynn utfyllingen med "<h5>Prisstrategi</h5>.
    Omgir nøkkeltemaer med <h5> tags.
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
