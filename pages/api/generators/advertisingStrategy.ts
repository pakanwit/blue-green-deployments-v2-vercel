import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IAdvertisingStrategy {
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

  planLanguage: string;
  variantID: string;
  modelName?: string;
}

// api7Mark4.ts
export const advertisingStrategy = (request: IAdvertisingStrategy) => {
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

    planLanguage,
    variantID,
    modelName,
  } = request;

  const generatePrompt = (...products) => {
    const languagePrompts = {
      de: {
        name: 'Kundens Produkt oder Dienstleistung',
        description: 'Beschreibung',
      },
      fr: {
        name: 'Produit ou service du client',
        description: 'Description',
      },
      es: {
        name: 'Producto o servicio del cliente',
        description: 'Descripción',
      },
      it: {
        name: 'Prodotto o servizio del cliente',
        description: 'Descrizione',
      },
      nl: {
        name: "Klant's product of dienst",
        description: 'Beschrijving',
      },
      ja: {
        name: 'クライアントの製品またはサービス',
        description: '説明',
      },
      ar: {
        name: 'اسم المنتج أو الخدمة للعميل',
        description: 'وصف',
      },
      sv: {
        name: 'Kundens produkt eller tjänst',
        description: 'Beskrivning',
      },
      fi: {
        name: 'Asiakkaan tuote tai palvelu',
        description: 'Kuvaus',
      },
      da: {
        name: 'Kundens produkt eller service',
        description: 'Beskrivelse',
      },
      no: {
        name: 'Kundens produkt eller tjeneste',
        description: 'Beskrivelse',
      },
      default: {
        name: "Client's product or service",
        description: 'Description',
      },
    };

    const prompts = languagePrompts[planLanguage] || languagePrompts['default'];
    let prompt = '';

    products.forEach((product, index) => {
      const i = index + 1;
      const [productName, productDescription] = product;
      if (productName) {
        prompt += `${prompts.name} #${i} Name: ${productName}\n`;
      }
      if (productDescription) {
        prompt += `${prompts.description} #${i}: ${productDescription}\n`;
      }
    });

    return prompt;
  };

  const productInfoPrompt = generatePrompt(
    [productName1, productDescription1],
    [productName2, productDescription2],
    [productName3, productDescription3],
    [productName4, productDescription4],
    [productName5, productDescription5],
  );

  const targeting = mark2Ref.substring(mark2Ref.indexOf('<h5>Targeting</h5>'));
  const positioning = mark2Ref.substring(
    mark2Ref.indexOf('<h5>Positioning</h5>'),
  );

  const getPromptAndHeading = (productOrService) => {
    const promptsAndHeadings = {
      product: {
        de: {
          prompt:
            'Für die Vertriebsstrategie wählen Sie die am besten geeigneten Vertriebskanäle für unser Produkt aus, um unsere Kunden effizient und effektiv zu erreichen. Begründen Sie, warum Sie diese speziellen Kanäle gewählt haben und wie das Produkt auf effiziente Weise die Kunden erreicht. Berücksichtigen Sie das Targeting und Positioning. Jede Beschreibung des Vertriebskanals sollte in einem <li> Tag eingefasst sein.',
          heading: 'Vertriebsstrategie',
        },
        fr: {
          prompt:
            "Pour la stratégie de distribution, choisissez les canaux de distribution les plus appropriés pour notre produit afin d'atteindre efficacement et efficacement nos clients. Spécifiez pourquoi vous avez choisi ces canaux particuliers et comment le produit atteindra les clients de manière efficace. Considérez le ciblage et le positionnement. Chaque description de canal de distribution doit être enveloppée dans une balise <li>.",
          heading: 'Stratégie de distribution',
        },
        es: {
          prompt:
            'Para la Estrategia de Distribución, elija los canales de distribución más apropiados para nuestro producto para llegar a nuestros clientes de manera eficiente y efectiva. Especifique por qué eligió estos canales particulares y cómo el producto llegará a los clientes de manera eficiente. Considere el tema de segmentación y posicionamiento. Cada descripción del canal de distribución debe estar envuelta en una etiqueta <li>.',
          heading: 'Estrategia de Distribución',
        },
        it: {
          prompt:
            'Per la Strategia di Distribuzione, scegli i canali di distribuzione più appropriati per il nostro prodotto per raggiungere in modo efficiente ed efficace i nostri clienti. Specifica perché hai scelto questi particolari canali e come il prodotto raggiungerà i clienti in modo efficiente. Considera il targeting e il posizionamento. Ogni descrizione del canale di distribuzione dovrebbe essere avvolta in un tag <li>.',
          heading: 'Strategia di Distribuzione',
        },
        nl: {
          prompt:
            'Voor de distributiestrategie kiest u de meest geschikte distributiekanalen voor ons product om onze klanten efficiënt en effectief te bereiken. Specificeer waarom u deze specifieke kanalen heeft gekozen en hoe het product op een efficiënte manier de klanten zal bereiken. Overweeg het targeting en positionering onderwerp. Verpak elke beschrijving van het distributiekanaal in een <li> tag.',
          heading: 'Distributiestrategie',
        },
        ja: {
          prompt:
            '配布戦略については、私たちの製品を効率的かつ効果的に顧客に届けるための最も適切な配布チャネルを選択してください。なぜこれらの特定のチャネルを選んだのか、製品がどのように効率的に顧客に届くのかを具体的に説明してください。ターゲティングとポジショニングのトピックを考慮してください。各配布チャネルの説明は<li>タグで囲んでください。',
          heading: '配布戦略',
        },
        ar: {
          prompt:
            'بالنسبة لاستراتيجية التوزيع، اختر القنوات الأكثر ملاءمة لتوزيع منتجنا للوصول إلى عملائنا بكفاءة وفعالية. حدد لماذا اخترت هذه القنوات بالذات وكيف سيصل المنتج إلى العملاء بكفاءة. ضع في اعتبارك موضوع التوجيه والتموضع. ضع كل وصف لقناة التوزيع في علامة <li>.',
          heading: 'استراتيجية التوزيع',
        },
        sv: {
          prompt:
            'För distributionsstrategin, välj de mest lämpliga distributionskanalerna för vår produkt för att effektivt och effektivt nå våra kunder. Ange varför du valde dessa specifika kanaler och ange hur produkten kommer att nå kunderna på ett effektivt sätt. överväga ämnet riktning och positionering. Omslut varje distributionskanalbeskrivning i <li> taggen.',
          heading: 'Distributionsstrategi',
        },
        fi: {
          prompt:
            'Jakelustrategiaa varten valitse tuotteellemme sopivimmat jakelukanavat, jotta voimme tehokkaasti ja tehokkaasti tavoittaa asiakkaamme. määritä, miksi valitsit nämä erityiset kanavat ja määritä, miten tuote saavuttaa asiakkaat tehokkaasti. harkitse kohdistamista ja asemointia. Kääri jokainen jakelukanavan kuvaus <li> -tagiin.',
          heading: 'Jakelustrategia',
        },
        da: {
          prompt:
            'For distributionsstrategien skal du vælge de mest passende distributionskanaler for vores produkt for at nå vores kunder effektivt og effektivt. specificer, hvorfor du valgte disse specifikke kanaler, og specificer, hvordan produktet vil nå kunderne på en effektiv måde. overvej emnet målretning og positionering. Indpak hver distributionskanalbeskrivelse i <li> -taggen.',
          heading: 'Distributionsstrategi',
        },
        no: {
          prompt:
            'For distribusjonsstrategien, velg de mest passende distribusjonskanalene for produktet vårt for å nå kundene våre effektivt og effektivt. spesifiser hvorfor du valgte disse spesifikke kanalene og spesifiser hvordan produktet vil nå kundene på en effektiv måte. vurder emnet målretting og posisjonering. Pakk inn hver distribusjonskanalbeskrivelse i <li> -taggen.',
          heading: 'Distribusjonsstrategi',
        },
        default: {
          prompt:
            'For Distribution Strategy, choose the most appropriate distribution channels for our product to efficiently and effectively reach our customers. specify why you chose these particular channels and specify how the product will reach the customers in an efficient manner. consider the targeting and positioning topic. Wrap each distribution channel description in <li> tag.',
          heading: 'Distribution Strategy',
        },
      },
      service: {
        de: {
          prompt:
            'Für die Service-Strategie, beschreiben Sie, wie die Mitarbeiter den Kunden bedienen werden, um maximale Kundenzufriedenheit und -loyalität zu gewährleisten. Verwenden Sie normale Absätze. Jeder Absatz sollte ein spezifisches Thema beschreiben. Verwenden Sie nur das <p> Tag, um jeden Absatz zu umschließen.',
          heading: 'Service-Strategie',
        },
        fr: {
          prompt:
            "Pour la stratégie de service, décrivez comment les employés serviront le client afin d'assurer la satisfaction et la fidélité maximales du client. Utilisez des paragraphes réguliers. Chaque paragraphe doit décrire un sujet spécifique. Utilisez uniquement la balise <p> pour envelopper chaque paragraphe.",
          heading: 'Stratégie de service',
        },
        es: {
          prompt:
            'Para la Estrategia de Servicio, describa cómo los empleados atenderán al cliente para garantizar la máxima satisfacción y lealtad del cliente. Utilice párrafos regulares. Cada párrafo debe describir un tema específico. Solo use la etiqueta <p> para envolver cada párrafo.',
          heading: 'Estrategia de Servicio',
        },
        it: {
          prompt:
            'Per la Strategia di Servizio, descrivi come i dipendenti serviranno il cliente per garantire la massima soddisfazione e lealtà del cliente. Usa paragrafi regolari. Ogni paragrafo dovrebbe descrivere un argomento specifico. Usa solo il tag <p> per avvolgere ogni paragrafo.',
          heading: 'Strategia di Servizio',
        },
        nl: {
          prompt:
            'Voor de Service Strategie, beschrijf hoe de medewerkers de klant zullen bedienen om maximale klanttevredenheid en loyaliteit te garanderen. Gebruik reguliere paragrafen. Elk paragraaf moet een specifiek onderwerp beschrijven. Gebruik alleen de <p> tag om elke paragraaf te omhullen.',
          heading: 'Service Strategie',
        },
        ja: {
          prompt:
            'サービス戦略については、従業員がどのように顧客にサービスを提供するかを説明し、最大の顧客満足度とロイヤルティを確保してください。通常の段落を使用してください。各段落は特定のトピックを説明するべきです。各段落を囲むためには<p>タグのみを使用してください。',
          heading: 'サービス戦略',
        },
        ar: {
          prompt:
            'بالنسبة لاستراتيجية الخدمة، اصف كيف سيخدم الموظفون العميل لضمان الحصول على أقصى قدر من رضا العملاء والولاء. استخدم فقرات عادية. يجب أن يصف كل فقرة موضوعًا محددًا. استخدم الوسم <p> فقط لتغليف كل فقرة.',
          heading: 'استراتيجية الخدمة',
        },
        sv: {
          prompt:
            'För Service Strategi, beskriv hur anställda kommer att betjäna kunden för att säkerställa maximal kundnöjdhet och lojalitet. använd vanliga stycken. Varje stycke bör beskriva ett specifikt ämne. Använd endast <p> -taggen för att omsluta varje stycke.',
          heading: 'Service Strategi',
        },
        fi: {
          prompt:
            'Palvelustrategiaa varten kuvaile, kuinka työntekijät palvelevat asiakasta maksimaalisen asiakastyytyväisyyden ja uskollisuuden varmistamiseksi. käytä tavallisia kappaleita. Jokaisen kappaleen tulisi kuvata tiettyä aihetta. Käytä vain <p> -tagia jokaisen kappaleen ympärillä.',
          heading: 'Palvelustrategia',
        },
        da: {
          prompt:
            'For Service Strategi, beskriv hvordan medarbejderne vil betjene kunden for at sikre maksimal kundetilfredshed og loyalitet. brug almindelige afsnit. Hvert afsnit skal beskrive et specifikt emne. Brug kun <p> -taggen til at indpakke hvert afsnit.',
          heading: 'Service Strategi',
        },
        no: {
          prompt:
            'For Service Strategi, beskriv hvordan de ansatte vil betjene kunden for å sikre maksimal kundetilfredshet og lojalitet. bruk vanlige avsnitt. Hvert avsnitt skal beskrive et spesifikt emne. Bruk bare <p> -taggen for å pakke inn hvert avsnitt.',
          heading: 'Service Strategi',
        },
        default: {
          prompt:
            'For Service Strategy, describe how the employees will service the customer in order to ensure maximum customer satisfaction and loyalty. use regular paragraphs. Each paragraph should describe a specific topic. Only use <p> tag to wrap each paragraph.',
          heading: 'Service Strategy',
        },
      },
    };

    const promptsAndHeadingsForType =
      promptsAndHeadings[productOrService] || {};
    const { prompt, heading } =
      promptsAndHeadingsForType[planLanguage] ||
      promptsAndHeadingsForType['default'];

    if (!prompt || !heading) {
      throw new Error('No product or service specification');
    }

    return { prompt, heading };
  };

  const {
    prompt: distributionOrServicePrompt,
    heading: distributionOrServiceHeading,
  } = getPromptAndHeading(productOrService);

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
    fi: 'Nämä ovat asiakasryhmien kuvauksia:',
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

  let advertisingTopics = '';
  const advertising = [
    'Targeted Advertising Channels',
    'Social Media Marketing Strategies',
    'Influencer Partnerships',
    'Email Marketing Campaigns',
    'Local SEO Optimization',
  ];

  advertising.forEach((topic) => {
    advertisingTopics += `${topic}, `;
  });
  advertisingTopics = advertisingTopics.slice(0, -2);

  const mark4TopicEN = 'advertising';
  const mark4TopicDE = 'Werbung';
  const mark4TopicFR = 'publicité';
  const mark4TopicES = 'publicidad';
  const mark4TopicIT = 'pubblicità';
  const mark4TopicNL = 'reclame';
  const mark4TopicJA = '広告';
  const mark4TopicAR = 'الإعلان';
  const mark4TopicSV = 'reklam';
  const mark4TopicFI = 'mainonta';
  const mark4TopicDA = 'reklame';
  const mark4TopicNO = 'reklame';

  const promptTemplates = {
    en: `You are a professional consultant, and a customer approaches you to write a long and detailed ${mark4TopicEN} for a business plan.

      business details:
      business detail 1: The client's business name is ${businessName}.
      business detail 2: The type of business is ${businessType}. 
      business detail 3: This is where the business's customers are: ${location}.
      business detail 4: The client's distribution channel is: ${salesChannel}.
      business detail 5: The client's business operational status is ${businessOperationalStatus}.
    
      These are details of the client's products or services:
      ${productInfoPrompt}
    
      These are the topic that should be generated: ${mark4TopicEN}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.
    
      for both ${mark4TopicEN}, you MUST consider these topic: 
      Targeting topic: ${targeting}. 
      Positioning topic: ${positioning}.
      Use it as data source but don't include targeting and positioning data in your response vertbatim.
      
      For Advertising Strategy topic, describe how you would effectively attract the targeted segment. You should include these topic ${advertisingTopics}. These topic names should be in <h4> tag.
      Be extremely detailed and insightful in your response for these aforementioned topics. Cover multiple aspects for each of these topics.
      
      Do not repeat business details.
      Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
      Begin the completion with "<h3>${mark4TopicEN}</h3>.
      use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
      Generate everything in English.
      Generate at least 1000 words.
      This is important: Be VERY insightful in your response.
      This is the long, detailed, and insightful ${mark4TopicEN} you came up with:
      `,
    'en-uk': `You are a professional consultant, and a customer approaches you to write a long and detailed ${mark4TopicEN} for a business plan.

      business details:
      business detail 1: The client's business name is ${businessName}.
      business detail 2: The type of business is ${businessType}. 
      business detail 3: This is where the business's customers are: ${location}.
      business detail 4: The client's distribution channel is: ${salesChannel}.
      business detail 5: The client's business operational status is ${businessOperationalStatus}.
    
      These are details of the client's products or services:
      ${productInfoPrompt}
    
      These are the topic that should be generated: ${mark4TopicEN}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.
    
      for both ${mark4TopicEN}, you MUST consider these topic: 
      Targeting topic: ${targeting}. 
      Positioning topic: ${positioning}.
      Use it as data source but don't include targeting and positioning data in your response vertbatim.
      
      For Advertising Strategy topic, describe how you would effectively attract the targeted segment. You should include these topic ${advertisingTopics}. These topic names should be in <h4> tag.
      Be extremely detailed and insightful in your response for these aforementioned topics. Cover multiple aspects for each of these topics.
      
      Do not repeat business details.
      Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
      Begin the completion with "<h3>${mark4TopicEN}</h3>.
      use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
      Generate everything in English.
      Generate at least 1000 words.
      use british english spelling and grammar
      This is important: Be VERY insightful in your response.
      This is the long, detailed, and insightful ${mark4TopicEN} you came up with:
      `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um eine lange und detaillierte ${mark4TopicDE} für einen Geschäftsplan zu schreiben.

      Geschäftsdaten:
      Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
      Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
      Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
      Geschäftsdaten 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
      Geschäftsdaten 5: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
    
      Dies sind die Details der Produkte oder Dienstleistungen des Kunden:
      ${productInfoPrompt}
    
      Dies sind die Themen, die generiert werden sollen: ${mark4TopicDE}, schließen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben. Seien Sie sehr beschreibend bei der Erstellung von Inhalten für jedes Thema.
    
      Für beide ${mark4TopicDE} müssen Sie diese Themen berücksichtigen: 
      Zielgruppenthema: ${targeting}. 
      Positionierungsthema: ${positioning}.
      Verwenden Sie es als Datenquelle, aber fügen Sie die Daten zu Zielgruppen und Positionierung nicht wörtlich in Ihre Antwort ein.
      
      Für das Thema Werbestrategie beschreiben Sie, wie Sie das Zielsegment effektiv ansprechen würden. Sie sollten diese Themen ${advertisingTopics} einbeziehen. Diese Themen sollten im <h4>-Tag stehen.
      Seien Sie äußerst detailliert und aufschlussreich in Ihrer Antwort auf diese oben genannten Themen. Decken Sie mehrere Aspekte für jedes dieser Themen ab.
      
      Wiederholen Sie keine Geschäftsdaten.
      Schreiben Sie dies aus der Perspektive der ersten Person, als ob Sie der Eigentümer dieses Unternehmens wären, und verwenden Sie "wir", NICHT "ich". 
      Beginnen Sie die Ausführung mit "<h3>${mark4TopicDE}</h3>".
      Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern den <strong>-Tag für fett. Verwenden Sie nicht * *, sondern den <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern den <li>-Tag.
      Generieren Sie alles auf Deutsch.
      Generieren Sie mindestens 1000 Wörter.
      Dies ist wichtig: Seien Sie SEHR aufschlussreich in Ihrer Antwort.
      Dies ist die lange, detaillierte und aufschlussreiche ${mark4TopicDE}, die Sie sich ausgedacht haben:
      `,
    fr: `Vous êtes un consultant professionnel, et un client vous demande d'écrire une ${mark4TopicFR} longue et détaillée pour un plan d'affaires.

      détails de l'entreprise:
      détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
      détail de l'entreprise 2: Le type d'entreprise est ${businessType}. 
      détail de l'entreprise 3: Voici où se trouvent les clients de l'entreprise: ${location}.
      détail de l'entreprise 4: Le canal de distribution du client est: ${salesChannel}.
      détail de l'entreprise 5: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
    
      Voici les détails des produits ou services du client:
      ${productInfoPrompt}
    
      Voici les sujets qui doivent être générés: ${mark4TopicFR}, n'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif dans la génération de contenu pour chaque sujet.
    
      Pour les deux ${mark4TopicFR}, vous DEVEZ considérer ces sujets: 
      Sujet de ciblage: ${targeting}. 
      Sujet de positionnement: ${positioning}.
      Utilisez-le comme source de données mais n'incluez pas les données de ciblage et de positionnement dans votre réponse mot pour mot.
      
      Pour le sujet de la stratégie publicitaire, décrivez comment vous attireriez efficacement le segment ciblé. Vous devriez inclure ces sujets ${advertisingTopics}. Ces noms de sujets doivent être dans la balise <h4>.
      Soyez extrêmement détaillé et perspicace dans votre réponse pour ces sujets susmentionnés. Couvrez plusieurs aspects pour chacun de ces sujets.
      
      Ne répétez pas les détails de l'entreprise.
      Écrivez ceci à la première personne comme si vous étiez le propriétaire de cette entreprise en utilisant "nous", NE PAS utiliser "je". 
      Commencez la complétion par "<h3>${mark4TopicFR}</h3>".
      Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt la balise <li>.
      Générez tout en français.
      Générez au moins 1000 mots.
      C'est important: Soyez TRÈS perspicace dans votre réponse.
      Voici la ${mark4TopicFR} longue, détaillée et perspicace que vous avez imaginée:
      `,
    es: `Eres un consultor profesional, y un cliente se acerca a ti para escribir una ${mark4TopicES} larga y detallada para un plan de negocios.

      detalles del negocio:
      detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
      detalle del negocio 2: El tipo de negocio es ${businessType}. 
      detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
      detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
      detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
    
      Estos son los detalles de los productos o servicios del cliente:
      ${productInfoPrompt}
    
      Estos son los temas que deben generarse: ${mark4TopicES}, no incluyas otros temas a menos que se especifique aquí. Sé muy descriptivo al generar contenido para cada tema.
    
      Para ambos ${mark4TopicES}, DEBES considerar estos temas: 
      Tema de segmentación: ${targeting}. 
      Tema de posicionamiento: ${positioning}.
      Úsalo como fuente de datos pero no incluyas los datos de segmentación y posicionamiento en tu respuesta literalmente.
      
      Para el tema de Estrategia Publicitaria, describe cómo atraerías eficazmente al segmento objetivo. Debes incluir estos temas ${advertisingTopics}. Estos nombres de temas deben estar en la etiqueta <h4>.
      Sé extremadamente detallado y perspicaz en tu respuesta para estos temas mencionados anteriormente. Cubre múltiples aspectos para cada uno de estos temas.
      
      No repitas los detalles del negocio.
      Escribe esto en primera persona como si fueras el dueño de este negocio usando "nosotros", NO uses "yo". 
      Comienza la redacción con "<h3>${mark4TopicES}</h3>".
      Usa solo etiquetas HTML, no uses markdown. No uses ** **, en su lugar usa la etiqueta <strong> para negritas. No uses * *, en su lugar usa la etiqueta <em> para cursivas. No uses * para puntos de lista, en su lugar usa la etiqueta <li>.
      genera todo en español
    Esto es importante: Sé muy perspicaz en tu respuesta
    Reply
    
      Genera al menos 1000 palabras.
      Esto es importante: Sé MUY perspicaz en tu respuesta.
      Esta es la ${mark4TopicES} larga, detallada y perspicaz que se te ocurrió:
      `,
    it: `Sei un consulente professionale e un cliente si avvicina a te per scrivere una ${mark4TopicIT} lunga e dettagliata per un piano aziendale.

      dettagli aziendali:
      dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
      dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
      dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
      dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
      dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
    
      Questi sono i dettagli dei prodotti o servizi del cliente:
      ${productInfoPrompt}
    
      Questi sono gli argomenti che devono essere generati: ${mark4TopicIT}, non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo nella generazione di contenuti per ogni argomento.
    
      Per entrambi ${mark4TopicIT}, DEVI considerare questi argomenti: 
      Argomento di targeting: ${targeting}. 
      Argomento di posizionamento: ${positioning}.
      Usalo come fonte di dati ma non includere i dati di targeting e posizionamento nella tua risposta alla lettera.
      
      Per l'argomento della Strategia Pubblicitaria, descrivi come attireresti efficacemente il segmento target. Dovresti includere questi argomenti ${advertisingTopics}. Questi nomi di argomenti dovrebbero essere nel tag <h4>.
      Sii estremamente dettagliato e perspicace nella tua risposta per questi argomenti sopra menzionati. Copri più aspetti per ciascuno di questi argomenti.
      
      Non ripetere i dettagli aziendali.
      Scrivi questo in prima persona come se fossi il proprietario di questa azienda usando "noi", NON usare "io". 
      Inizia la redazione con "<h3>${mark4TopicIT}</h3>".
      Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece il tag <li>.
      genera tutto in italiano
      Genera almeno 1000 parole.
      Questo è importante: Sii MOLTO perspicace nella tua risposta.
      Questa è la ${mark4TopicIT} lunga, dettagliata e perspicace che hai ideato:
      `,
    nl: `U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${mark4TopicNL} voor een bedrijfsplan te schrijven.

      bedrijfsgegevens:
      bedrijfsgegevens 1: De naam van het bedrijf van de klant is ${businessName}.
      bedrijfsgegevens 2: Het type bedrijf is ${businessType}. 
      bedrijfsgegevens 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
      bedrijfsgegevens 4: Het distributiekanaal van de klant is: ${salesChannel}.
      bedrijfsgegevens 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
    
      Dit zijn de details van de producten of diensten van de klant:
      ${productInfoPrompt}
    
      Dit zijn de onderwerpen die moeten worden gegenereerd: ${mark4TopicNL}, sluit geen andere onderwerpen in tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van inhoud voor elk onderwerp.
    
      Voor beide ${mark4TopicNL} moet u deze onderwerpen overwegen: 
      Doelgroep onderwerp: ${targeting}. 
      Positionering onderwerp: ${positioning}.
      Gebruik het als gegevensbron, maar neem de gegevens over doelgroep en positionering niet letterlijk op in uw antwoord.
      
      Voor het onderwerp Reclamestrategie, beschrijf hoe u het doelsegment effectief zou aantrekken. U moet deze onderwerpen ${advertisingTopics} opnemen. Deze onderwerpen moeten in de <h4>-tag staan.
      Wees uiterst gedetailleerd en inzichtelijk in uw antwoord op deze bovengenoemde onderwerpen. Bespreek meerdere aspecten voor elk van deze onderwerpen.
      
      Herhaal geen bedrijfsgegevens.
      Schrijf dit in de eerste persoon alsof u de eigenaar van dit bedrijf bent en gebruik "wij", gebruik GEEN "ik". 
      Begin de voltooiing met "<h3>${mark4TopicNL}</h3>".
      Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
      genereer alles in het Nederlands
      Genereer minimaal 1000 woorden.
      Dit is belangrijk: Wees ZEER inzichtelijk in uw antwoord.
      Dit is de lange, gedetailleerde en inzichtelijke ${mark4TopicNL} die u hebt bedacht:
      `,
    ja: `あなたはプロのコンサルタントであり、顧客がビジネスプランのために長く詳細な${mark4TopicJA}を書くように依頼してきます。

      ビジネスの詳細:
      ビジネスの詳細1: クライアントのビジネス名は${businessName}です。
      ビジネスの詳細2: ビジネスの種類は${businessType}です。
      ビジネスの詳細3: これはビジネスの顧客がいる場所です: ${location}。
      ビジネスの詳細4: クライアントの流通チャネルは: ${salesChannel}です。
      ビジネスの詳細5: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
    
      これらはクライアントの製品またはサービスの詳細です:
      ${productInfoPrompt}
    
      これらは生成されるべきトピックです: ${mark4TopicJA}、ここで指定されていない限り他のトピックを含めないでください。各トピックの内容を生成する際には非常に詳細に記述してください。
    
      両方の${mark4TopicJA}について、これらのトピックを考慮する必要があります:
      ターゲティングトピック: ${targeting}。
      ポジショニングトピック: ${positioning}。
      データソースとして使用しますが、ターゲティングとポジショニングのデータをそのまま回答に含めないでください。
    
      広告戦略のトピックについては、ターゲットセグメントを効果的に引き付ける方法を説明してください。これらのトピック${advertisingTopics}を含める必要があります。これらのトピック名は<h4>タグにする必要があります。
      上記のトピックに対する回答では、非常に詳細かつ洞察に満ちた内容にしてください。これらのトピックの各側面を複数カバーしてください。
    
      ビジネスの詳細を繰り返さないでください。
      このビジネスのオーナーであるかのように一人称視点で「私たち」を使用して書いてください。「私」を使用しないでください。
      "<h3>${mark4TopicJA}</h3>"で完了を開始してください。
      HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にしてください。* *を使用せず、代わりに<em>タグを使用して斜体にしてください。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
      すべて日本語で生成してください。
      少なくとも1000語を生成してください。
      これは重要です: 回答に非常に洞察に満ちた内容にしてください。
      これはあなたが考えた長く、詳細で洞察に満ちた${mark4TopicJA}です:
      `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${mark4TopicAR} طويل ومفصل لخطة عمل.

      تفاصيل العمل:
      تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
      تفاصيل العمل 2: نوع العمل هو ${businessType}.
      تفاصيل العمل 3: هذا هو المكان الذي يوجد فيه عملاء العمل: ${location}.
      تفاصيل العمل 4: قناة توزيع العميل هي: ${salesChannel}.
      تفاصيل العمل 5: حالة التشغيل لعمل العميل هي ${businessOperationalStatus}.
    
      هذه هي تفاصيل منتجات أو خدمات العميل:
      ${productInfoPrompt}
    
      هذه هي الموضوعات التي يجب توليدها: ${mark4TopicAR}، لا تشمل مواضيع أخرى إلا إذا تم تحديدها هنا. كن وصفيًا جدًا عند توليد المحتوى لكل موضوع.
    
      بالنسبة لكل من ${mark4TopicAR}، يجب أن تأخذ في الاعتبار هذه الموضوعات:
      موضوع الاستهداف: ${targeting}.
      موضوع التمركز: ${positioning}.
      استخدمه كمصدر للبيانات ولكن لا تتضمن بيانات الاستهداف والتمركز حرفيًا في ردك.
    
      بالنسبة لموضوع استراتيجية الإعلان، صف كيف ستجذب الفئة المستهدفة بشكل فعال. يجب أن تتضمن هذه الموضوعات ${advertisingTopics}. يجب أن تكون أسماء هذه الموضوعات في علامة <h4>.
      كن مفصلًا للغاية وبصيرًا في ردك على هذه الموضوعات المذكورة أعلاه. غطِ جوانب متعددة لكل من هذه الموضوعات.
    
      لا تكرر تفاصيل العمل.
      اكتب هذا من منظور الشخص الأول كما لو كنت مالك هذا العمل باستخدام "نحن"، لا تستخدم "أنا".
      ابدأ الإكمال بـ "<h3>${mark4TopicAR}</h3>".
      استخدم فقط علامات HTML، لا تستخدم الماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
      قم بتوليد كل شيء باللغة العربية.
      قم بتوليد ما لا يقل عن 1000 كلمة.
      هذا مهم: كن بصيرًا جدًا في ردك.
      هذا هو ${mark4TopicAR} الطويل والمفصل والبصير الذي توصلت إليه:
      `,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${mark4TopicSV} för en affärsplan.

      affärsdetaljer:
      affärsdetalj 1: Kundens företagsnamn är ${businessName}.
      affärsdetalj 2: Typen av företag är ${businessType}.
      affärsdetalj 3: Här är företagets kunder: ${location}.
      affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
      affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.
    
      Detta är detaljerna om kundens produkter eller tjänster:
      ${productInfoPrompt}
    
      Detta är ämnena som ska genereras: ${mark4TopicSV}, inkludera inte andra ämnen om de inte specificeras här. Var mycket beskrivande när du genererar innehåll för varje ämne.
    
      För båda ${mark4TopicSV} måste du överväga dessa ämnen:
      Målgruppsämne: ${targeting}.
      Positioneringsämne: ${positioning}.
      Använd det som datakälla men inkludera inte målgrupps- och positioneringsdata ordagrant i ditt svar.
    
      För ämnet Reklamstrategi, beskriv hur du effektivt skulle attrahera målsegmentet. Du bör inkludera dessa ämnen ${advertisingTopics}. Dessa ämnesnamn ska vara i <h4>-taggen.
      Var extremt detaljerad och insiktsfull i ditt svar på dessa ovan nämnda ämnen. Täck flera aspekter för vart och ett av dessa ämnen.
    
      Upprepa inte affärsdetaljer.
      Skriv detta i första person som om du är ägaren av detta företag och använd "vi", använd INTE "jag".
      Börja slutförandet med "<h3>${mark4TopicSV}</h3>".
      använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <li>-taggen.
      generera allt på svenska
      Generera minst 1000 ord.
      Detta är viktigt: Var MYCKET insiktsfull i ditt svar.
      Detta är den långa, detaljerade och insiktsfulla ${mark4TopicSV} du kom på:
      `,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark4TopicFI} liiketoimintasuunnitelmaa varten.

      liiketoiminnan tiedot:
      liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
      liiketoiminnan tieto 2: Yrityksen tyyppi on ${businessType}.
      liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
      liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
      liiketoiminnan tieto 5: Asiakkaan yrityksen operatiivinen tila on ${businessOperationalStatus}.
    
      Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
      ${productInfoPrompt}
    
      Nämä ovat aiheet, jotka tulisi tuottaa: ${mark4TopicFI}, älä sisällytä muita aiheita, ellei niitä ole erikseen mainittu tässä. Ole erittäin kuvaileva, kun luot sisältöä jokaiselle aiheelle.
    
      Molempien ${mark4TopicFI} osalta sinun on otettava huomioon nämä aiheet:
      Kohderyhmäaihe: ${targeting}.
      Sijoitteluaihe: ${positioning}.
      Käytä sitä tietolähteenä, mutta älä sisällytä kohderyhmän ja sijoittelun tietoja kirjaimellisesti vastaukseesi.
    
      Mainontastrategian aiheessa kuvaile, kuinka houkuttelisit kohdesegmenttiä tehokkaasti. Sinun tulisi sisällyttää nämä aiheet ${advertisingTopics}. Näiden aiheiden nimet tulisi olla <h4>-tagissa.
      Ole erittäin yksityiskohtainen ja oivaltava vastauksessasi näihin edellä mainittuihin aiheisiin. Käsittele useita näkökohtia kullekin näistä aiheista.
    
      Älä toista liiketoiminnan tietoja.
      Kirjoita tämä ensimmäisessä persoonassa ikään kuin olisit tämän yrityksen omistaja käyttäen "me", ÄLÄ käytä "minä".
      Aloita täydennys "<h3>${mark4TopicFI}</h3>".
      käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
      luo kaikki suomeksi
      Luo vähintään 1000 sanaa.
      Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
      Tämä on pitkä, yksityiskohtainen ja oivaltava ${mark4TopicFI}, jonka keksit:
      `,
    da: `Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mark4TopicDA} til en forretningsplan.

      forretningsdetaljer:
      forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
      forretningsdetalje 2: Virksomhedens type er ${businessType}.
      forretningsdetalje 3: Her er virksomhedens kunder: ${location}.
      forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
      forretningsdetalje 5: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
    
      Dette er detaljerne om kundens produkter eller tjenester:
      ${productInfoPrompt}
    
      Dette er emnerne, der skal genereres: ${mark4TopicDA}, inkluder ikke andre emner, medmindre de er specificeret her. Vær meget beskrivende, når du genererer indhold for hvert emne.
    
      For begge ${mark4TopicDA} skal du overveje disse emner:
      Målretnings emne: ${targeting}.
      Positionerings emne: ${positioning}.
      Brug det som datakilde, men inkluder ikke målretnings- og positioneringsdata ordret i dit svar.
    
      For emnet Reklamstrategi, beskriv hvordan du effektivt ville tiltrække målsegmentet. Du skal inkludere disse emner ${advertisingTopics}. Disse emnenavne skal være i <h4>-taggen.
      Vær ekstremt detaljeret og indsigtsfuld i dit svar på disse ovennævnte emner. Dæk flere aspekter for hvert af disse emner.
    
      Gentag ikke forretningsdetaljer.
      Skriv dette i første person, som om du er ejeren af denne virksomhed og brug "vi", brug IKKE "jeg".
      Begynd fuldførelsen med "<h3>${mark4TopicDA}</h3>".
      brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-taggen til fed skrift. Brug ikke * *, brug i stedet <em>-taggen til kursiv. Brug ikke * til punkttegn, brug i stedet <li>-taggen.
      generer alt på dansk
      Generer mindst 1000 ord.
      Dette er vigtigt: Vær MEGET indsigtsfuld i dit svar.
      Dette er den lange, detaljerede og indsigtsfulde ${mark4TopicDA}, du kom op med:
      `,
    no: `Du er en profesjonell konsulent, og en kunde henvender seg til deg for å skrive en lang og detaljert ${mark4TopicNO} for en forretningsplan.

      forretningsdetaljer:
      forretningsdetalj 1: Kundens firmanavn er ${businessName}.
      forretningsdetalj 2: Virksomhetens type er ${businessType}. 
      forretningsdetalj 3: Dette er hvor kundene til virksomheten er: ${location}.
      forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
      forretningsdetalj 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.
    
      Dette er detaljer om kundens produkter eller tjenester:
      ${productInfoPrompt}
    
      Dette er emnene som skal genereres: ${mark4TopicNO}, ikke inkluder andre emner med mindre de er spesifisert her. Vær veldig beskrivende når du genererer innhold for hvert emne.
    
      for begge ${mark4TopicNO}, MÅ du vurdere disse emnene: 
      Målrettingsemne: ${targeting}. 
      Posisjoneringsemne: ${positioning}.
      Bruk det som datakilde, men ikke inkluder målrettings- og posisjoneringsdata ordrett i svaret ditt.
      
      For Reklamstrategi-emnet, beskriv hvordan du effektivt vil tiltrekke det målrettede segmentet. Du bør inkludere disse emnene ${advertisingTopics}. Disse emnenavnene skal være i <h4>-taggen.
      Vær ekstremt detaljert og innsiktsfull i svaret ditt på disse nevnte emnene. Dekk flere aspekter for hvert av disse emnene.
      
      Ikke gjenta forretningsdetaljer.
      Skriv dette i førstepersonsperspektiv som om du er eieren av denne virksomheten ved å bruke "vi", IKKE bruk "jeg". 
      Begynn fullføringen med "<h3>${mark4TopicNO}</h3>".
      bruk bare HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv. Ikke bruk * for punkttegn, bruk i stedet <li>-taggen.
      generer alt på norsk
      Generer minst 1000 ord.
      Dette er viktig: Vær VELDIG innsiktsfull i svaret ditt.
      Dette er den lange, detaljerte og innsiktsfulle ${mark4TopicNO} du kom opp med:
      `,
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
