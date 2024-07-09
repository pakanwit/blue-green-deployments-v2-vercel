import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { FireworksAIStream } from '../../../utils/llama3/FireworksAIStream';

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

  const mark4TopicEN = `${distributionOrServiceHeading} and Advertising Strategy`;
  const mark4TopicDE = `${distributionOrServiceHeading} und Werbestrategie`;
  const mark4TopicFR = `${distributionOrServiceHeading} et stratégie publicitaire`;
  const mark4TopicES = 'Estrategia de distribución y estrategia publicitaria ';
  const mark4TopicIT = `${distributionOrServiceHeading} e strategia pubblicitaria`;
  const mark4TopicNL = `${distributionOrServiceHeading} en reclamestrategie`;
  const mark4TopicJA = `${distributionOrServiceHeading}と広告戦略`;
  const mark4TopicAR = `${distributionOrServiceHeading} واستراتيجية الإعلان`;
  const mark4TopicSV = `${distributionOrServiceHeading} och reklamstrategi`;
  const mark4TopicFI = `${distributionOrServiceHeading} ja mainosstrategia`;
  const mark4TopicDA = `${distributionOrServiceHeading} og reklamestrategi`;
  const mark4TopicNO = `${distributionOrServiceHeading} og reklamestrategi`;

  const promptTemplates = {
    en: `
      You are a professional consultant, and a customer approaches you to write a long and detailed ${mark4TopicEN} for a business plan.
  
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
  
      ${distributionOrServicePrompt}
      
      For Advertising Strategy topic, describe how you would attract the targeted segment. Generate multiple advertsing tactics and in each tactic include rationale, objective, and activities sub-topics. Consider the targeting and positioning topics. wrap each advertsing tactic with <li> tag. the sub-topics should be wrapped inside these <li> tags. When listing advertising tactics, Don't use numbered list.
      
      Do not repeat business details.
      Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
      Begin the completion with "<h5>${distributionOrServiceHeading}</h5>.
      Surround key topics with <h5> tags.
      Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
      Generate everything in English.
      This is important: Be very insightful in your response.
      This is the long, detailed, and insightful ${mark4TopicEN} you came up with:
      `,
    'en-uk': `
      You are a professional consultant, and a customer approaches you to write a long and detailed ${mark4TopicEN} for a business plan.
  
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
  
      ${distributionOrServicePrompt}
      
      For Advertising Strategy topic, describe how you would attract the targeted segment. Generate multiple advertsing tactics and in each tactic include rationale, objective, and activities sub-topics. Consider the targeting and positioning topics. wrap each advertsing tactic with <li> tag. the sub-topics should be wrapped inside these <li> tags. When listing advertising tactics, Don't use numbered list.
      
      Do not repeat business details.
      Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
      Begin the completion with "<h5>${distributionOrServiceHeading}</h5>.
      Surround key topics with <h5> tags.
      Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
      Generate everything in English.
      use british english spelling and grammar
      This is important: Be very insightful in your response.
      This is the long, detailed, and insightful ${mark4TopicEN} you came up with:
      `,
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${mark4TopicDE} für einen Geschäftsplan zu verfassen.

            Geschäftsdaten:
            Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
            Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
            Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
            Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
            Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
        
            Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden: 
            ${productInfoPrompt}
        
            ${customerPrompt}
        
            ${mark4TopicDE} sollte mit Kundengruppenbeschreibungen übereinstimmen.
        
            Dies sind die Themen, die generiert werden sollten: ${mark4TopicDE}. Schließen Sie keine anderen Themen ein, es sei denn, dies wird hier angegeben. Seien Sie bei der Erstellung von Inhalten für jedes Thema sehr anschaulich.
        
            ${distributionOrServicePrompt}
          
            Beschreiben Sie für das Thema „Werbestrategie“, wie Sie das Zielsegment ansprechen würden. Generieren Sie mehrere Werbetaktiken und beziehen Sie in jede Taktik Unterthemen zu Begründung, Ziel und Aktivitäten ein. Berücksichtigen Sie die Themen Targeting und Positionierung. Schließen Sie jede Werbetaktik mit dem <li>-Tag ab. Die Unterthemen sollten in diese <li>-Tags eingeschlossen werden. Verwenden Sie beim Auflisten von Werbetaktiken keine nummerierte Liste.
          
            Wiederholen Sie keine Geschäftsdetails.
            Schreiben Sie dies in der Ich-Perspektive, als ob Sie der Eigentümer dieses Unternehmens wären, und verwenden Sie „wir“ und NICHT „ich“.
            Beginnen Sie den Abschluss mit „<h5>${distributionOrServiceHeading}</h5>“.
            Umgeben Sie wichtige Themen mit <h5>-Tags.
            Fertigstellung auf Deutsch generieren.
          
            Dies ist das lange, detaillierte und ausführliche ${mark4TopicDE}, das Sie sich ausgedacht haben:`,
    fr: `Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${mark4TopicFR} long et détaillé pour un plan d'affaires.

            Détails de l'entreprise :
            Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
            Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
            Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
            Détail de l'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
            Détail de l'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
        
            Voici les détails des produits ou services du client :
            ${productInfoPrompt}
        
            Voici les sujets qui devraient être générés : ${mark4TopicFR}, n'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif dans la génération de contenu pour chaque sujet.
        
            ${customerPrompt}
            
            ${mark4TopicFR} doit correspondre aux descriptions des groupes de clients.
        
            ${distributionOrServicePrompt}
        
            Pour le sujet de la stratégie publicitaire, décrivez comment vous attireriez le segment ciblé. Générez plusieurs tactiques publicitaires et incluez dans chaque tactique des sous-thèmes de justification, d'objectif et d'activités. Considérez les sujets de ciblage et de positionnement. Enveloppez chaque tactique publicitaire avec la balise <li>. Les sous-thèmes doivent être enveloppés dans ces balises <li>. Lors de l'énumération des tactiques publicitaires, n'utilisez pas de liste numérotée.
        
            Ne répétez pas les détails de l'entreprise.
            Rédigez cela à la première personne comme si vous étiez le propriétaire de cette entreprise en utilisant "nous", NE PAS utiliser "je".
            Commencez la réalisation avec "<h5>${distributionOrServiceHeading}</h5>.
            Entourez les sujets clés avec des balises <h5>.
            génère tout en français
            Voici le ${mark4TopicFR} long, détaillé et volumineux que vous avez élaboré :`,
    es: `Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${mark4TopicES} largo y detallado para un plan de negocios.

            Detalles del negocio:
            Detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
            Detalle del negocio 2: El tipo de negocio es ${businessType}.
            Detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
            Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
            Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
        
            Estos son los detalles de los productos o servicios del cliente:
            ${productInfoPrompt}
        
            Estos son los temas que deberían generarse: ${mark4TopicES}, no incluya otros temas a menos que se especifique aquí. Sea muy descriptivo al generar contenido para cada tema.
        
            ${customerPrompt}
            
            ${mark4TopicFR} debe coincidir con las descripciones de los grupos de clientes.
        
            ${distributionOrServicePrompt}
        
            Para el tema de Estrategia Publicitaria, describa cómo atraería al segmento objetivo. Genere múltiples tácticas de publicidad e incluya en cada táctica subtemas de justificación, objetivo y actividades. Considere los temas de segmentación y posicionamiento. Envuelva cada táctica de publicidad con la etiqueta <li>. Los subtemas deben estar envueltos dentro de estas etiquetas <li>. Al enumerar las tácticas de publicidad, no use una lista numerada.
        
            No repita los detalles del negocio.
            Escriba esto en primera persona como si fuera el dueño de este negocio usando "nosotros", NO use "yo".
            Comience la realización con "<h5>${distributionOrServiceHeading}</h5>.
            Rodee los temas clave con etiquetas <h5>.
            genera todo en español
            Este es el ${mark4TopicES} largo, detallado y voluminoso que elaboró:`,
    it: `Sei un consulente professionale e un cliente si avvicina a te per scrivere un ${mark4TopicIT} lungo e dettagliato per un piano aziendale.

            dettagli aziendali:
            dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
            dettaglio aziendale 2: Il tipo di attività è ${businessType}. 
            dettaglio aziendale 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
            dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
            dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
        
            Questi sono i dettagli dei prodotti o servizi del cliente:
            ${productInfoPrompt}
          
            Questi sono gli argomenti che dovrebbero essere generati: ${mark4TopicIT}, non includere altri argomenti a meno che non sia specificato qui. Sii molto descrittivo nel generare contenuti per ogni argomento.
        
            ${customerPrompt}
            
            ${mark4TopicFR} deve corrispondere alle descrizioni dei gruppi di clienti.
        
            ${distributionOrServicePrompt}
            
            Per l'argomento Strategia pubblicitaria, descrivi come attireresti il segmento target. Genera molteplici tattiche pubblicitarie e in ogni tattica include i sottotemi della motivazione, dell'obiettivo e delle attività. Considera gli argomenti di targeting e posizionamento. avvolgi ogni tattica pubblicitaria con il tag <li>. i sottotemi dovrebbero essere avvolti all'interno di questi tag <li>. Quando elenchi le tattiche pubblicitarie, non usare un elenco numerato.
            
            Non ripetere i dettagli aziendali.
            Scrivi questo in prima persona come se fossi il proprietario di questa azienda usando "noi", NON usare "Io". 
            Inizia il completamento con "<h5>${distributionOrServiceHeading}</h5>.
            Circonda gli argomenti chiave con i tag <h5>.
            genera tutto in italiano
            Questo è il ${mark4TopicIT} lungo, dettagliato e voluminoso che hai elaborato:`,
    nl: `
            U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mark4TopicNL} te schrijven voor een bedrijfsplan.
        
            bedrijfsdetails:
            bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
            bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
            bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
            bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
            bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
        
            Dit zijn details van de producten of diensten van de klant:
            ${productInfoPrompt}
          
            Dit zijn de onderwerpen die gegenereerd moeten worden: ${mark4TopicNL}, voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van inhoud voor elk onderwerp.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
            
            Voor het onderwerp Reclamestrategie, beschrijf hoe u het doelsegment zou aantrekken. Genereer meerdere reclametactieken en neem in elke tactiek de subonderwerpen rationale, doelstelling en activiteiten op. Overweeg de onderwerpen targeting en positionering. wikkel elke reclametactiek met de <li> tag. de subonderwerpen moeten binnen deze <li> tags worden gewikkeld. Gebruik bij het opsommen van reclametactieken geen genummerde lijst.
            
            Herhaal de bedrijfsdetails niet.
            Schrijf dit vanuit het perspectief van de eerste persoon alsof u de eigenaar van dit bedrijf bent en gebruik "we", gebruik NIET "ik". 
            Begin de voltooiing met "<h5>${distributionOrServiceHeading}</h5>.
            Omring belangrijke onderwerpen met <h5> tags.
            Genereer alles in het Nederlands.
            Dit is het lange, gedetailleerde en uitgebreide ${mark4TopicNL} dat u hebt opgesteld:
            `,
    ja: `
            あなたはプロのコンサルタントで、顧客がビジネスプランのための長く詳細な${mark4TopicJA}を書くように依頼してきました。
        
            ビジネスの詳細：
            ビジネス詳細1：クライアントのビジネス名は${businessName}です。
            ビジネス詳細2：ビジネスの種類は${businessType}です。
            ビジネス詳細3：ビジネスの顧客がいる場所は次のとおりです：${location}。
            ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
            ビジネス詳細5：クライアントのビジネスの運用状況は${businessOperationalStatus}です。
        
            これらはクライアントの製品またはサービスの詳細です：
            ${productInfoPrompt}
          
            生成するべきトピックは次のとおりです：${mark4TopicJA}、ここで指定されていない他のトピックを含めないでください。各トピックのコンテンツを生成する際には非常に詳細に記述してください。
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
            
            広告戦略のトピックについては、ターゲットとなるセグメントをどのように引き付けるかを説明します。複数の広告戦術を生成し、各戦術には理由、目的、活動のサブトピックを含めます。ターゲティングとポジショニングのトピックを考慮します。各広告戦術を<li>タグでラップします。サブトピックはこれらの<li>タグの内部にラップする必要があります。広告戦術をリストアップするときは、番号付きリストを使用しないでください。
            
            ビジネスの詳細を繰り返さないでください。
            あなたがこのビジネスのオーナーであるかのように、"私たち"を使って一人称の視点で書いてください。"私"を使わないでください。
            完成品は"<h5>${distributionOrServiceHeading}</h5>で始めてください。
            キートピックを<h5>タグで囲んでください。
            すべてを日本語で生成します。
            これがあなたが考え出した長く、詳細で、長い${mark4TopicJA}です：
            `,
    ar: `
            أنت مستشار محترف، ويقترب منك عميل لكتابة ${mark4TopicAR} طويلة ومفصلة لخطة عمل.
        
            تفاصيل العمل:
            تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
            تفاصيل العمل 2: نوع العمل هو ${businessType}.
            تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
            تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
            تفاصيل العمل 5: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.
        
            هذه هي تفاصيل المنتجات أو الخدمات للعميل:
            ${productInfoPrompt}
        
            هذه هي الموضوعات التي يجب توليدها: ${mark4TopicAR}، لا تتضمن موضوعات أخرى ما لم يتم تحديدها هنا. كن واضحًا جدًا في توليد المحتوى لكل موضوع.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
        
            بالنسبة لموضوع استراتيجية الإعلان، اصف كيف ستجذب القطاع المستهدف. قم بتوليد عدة تكتيكات للإعلان وقم بتضمين الأسباب والأهداف والأنشطة الفرعية في كل تكتيك. ضع في اعتبارك موضوع التوجيه والتموضع. احزم كل تكتيك للإعلان بوسم <li>. يجب أن يتم تغليف المواضيع الفرعية داخل هذه الوسوم <li>. عند سرد تكتيكات الإعلان، لا تستخدم القائمة المرقمة.
        
            لا تكرر تفاصيل العمل.
            اكتب هذا من منظور الشخص الأول كما لو كنت صاحب هذا العمل باستخدام "نحن"، لا تستخدم "أنا".
            ابدأ الإكمال بـ "<h5>${distributionOrServiceHeading}</h5>.
            احاطة المواضيع الرئيسية بوسوم <h5>.
            أنشئ كل شيء باللغة العربية.
            هذا هو ${mark4TopicAR} الطويل والمفصل والطويل الذي ابتكرته:
            `,
    sv: `
            Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${mark4TopicSV} för en affärsplan.
        
            affärsdetaljer:
            affärsdetalj 1: Kundens företagsnamn är ${businessName}.
            affärsdetalj 2: Typen av verksamhet är ${businessType}.
            affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
            affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
            affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.
        
            Detta är detaljer om kundens produkter eller tjänster:
            ${productInfoPrompt}
        
            Detta är ämnet som ska genereras: ${mark4TopicSV}, inkludera inte andra ämnen om de inte specificeras här. Var mycket beskrivande när du genererar innehåll för varje ämne.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
        
            För ämnet Reklamstrategi, beskriv hur du skulle attrahera den riktade segmentet. Generera flera reklamtaktiker och inkludera i varje taktik skälen, målet och aktivitetsunderämnen. Överväg ämnena riktning och positionering. Omslut varje reklamtaktik med <li> taggen. Underämnen ska omslutas inuti dessa <li> taggar. När du listar reklamtaktiker, använd inte numrerad lista.
        
            Upprepa inte affärsdetaljer.
            Skriv detta ur ett första person perspektiv som om du är ägaren till detta företag med "vi", ANVÄND INTE "jag".
            Börja kompletteringen med "<h5>${distributionOrServiceHeading}</h5>.
            Omslut nyckelämnen med <h5> taggar.
            Generera allt på svenska.
            Detta är den långa, detaljerade och långa ${mark4TopicSV} du kom upp med:
            `,
    fi: `
            Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark4TopicFI} liiketoimintasuunnitelmaan.
        
            liiketoiminnan tiedot:
            liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
            liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}.
            liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
            liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
            liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
        
            Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
            ${productInfoPrompt}
        
            Tämä on aihe, joka pitäisi generoida: ${mark4TopicFI}, älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. Ole erittäin kuvaileva generoidessasi sisältöä jokaiselle aiheelle.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
        
            Mainosstrategia-aiheessa, kuvaile, kuinka houkuttelisit kohdesegmenttiä. Generoi useita mainostaktiikoita ja sisällytä jokaiseen taktiikkaan perustelut, tavoitteet ja toiminta-alakohtaiset aiheet. Harkitse kohdistamisen ja asemoinnin aiheita. Kääri jokainen mainostaktiikka <li> -tagiin. Alakohtaiset aiheet tulisi kääriä näiden <li> -tagien sisään. Älä käytä numeroitua luetteloa mainostaktiikoita lueteltaessa.
        
            Älä toista liiketoiminnan yksityiskohtia.
            Kirjoita tämä ensimmäisen persoonan näkökulmasta, ikään kuin olisit tämän yrityksen omistaja käyttäen "me", ÄLÄ käytä "minä".
            Aloita täydennys "<h5>${distributionOrServiceHeading}</h5> -tagilla.
            Ympäröi avainaiheet <h5> -tagilla.
            Generoi kaikki suomeksi.
            Tämä on pitkä, yksityiskohtainen ja pitkä ${mark4TopicFI}, jonka keksit:
            `,
    da: `
            Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mark4TopicDA} til en forretningsplan.
        
            forretningsdetaljer:
            forretningsdetalje 1: Kundens firmanavn er ${businessName}.
            forretningsdetalje 2: Typen af forretning er ${businessType}.
            forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
            forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
            forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.
        
            Dette er detaljer om kundens produkter eller tjenester:
            ${productInfoPrompt}
        
            Dette er emnet, der skal genereres: ${mark4TopicDA}, inkluder ikke andre emner, medmindre de er specificeret her. Vær meget beskrivende i generering af indhold for hvert emne.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
        
            For emnet Reklamestrategi, beskriv hvordan du ville tiltrække det målrettede segment. Generer flere reklametaktikker og inkluder i hver taktik rationale, mål og aktiviteter underemner. Overvej emnerne målretning og positionering. Indpak hver reklametaktik med <li> tag. Underemnerne skal være indpakket inde i disse <li> tags. Når du lister reklametaktikker, skal du ikke bruge nummereret liste.
        
            Gentag ikke forretningsdetaljer.
            Skriv dette i første person perspektiv som om du er ejeren af denne virksomhed ved hjælp af "vi", BRUG IKKE "jeg".
            Begynd udfyldelsen med "<h5>${distributionOrServiceHeading}</h5>.
            Omgiv nøgleemner med <h5> tags.
            Generer alt på dansk.
            Dette er den lange, detaljerede og omfattende ${mark4TopicDA} du kom op med:
            `,
    no: `
            Du er en profesjonell konsulent, og en kunde nærmer deg for å skrive en lang og detaljert ${mark4TopicNO} for en forretningsplan.
        
            forretningsdetaljer:
            forretningsdetalje 1: Kundens firmanavn er ${businessName}.
            forretningsdetalje 2: Typen virksomhet er ${businessType}.
            forretningsdetalje 3: Dette er hvor virksomhetens kunder er: ${location}.
            forretningsdetalje 4: Kundens distribusjonskanal er: ${salesChannel}.
            forretningsdetalje 5: Kundens forretningsoperasjonelle status er ${businessOperationalStatus}.
        
            Dette er detaljer om kundens produkter eller tjenester:
            ${productInfoPrompt}
        
            Dette er emnet som skal genereres: ${mark4TopicNO}, inkluder ikke andre emner, med mindre de er spesifisert her. Vær veldig beskrivende i generering av innhold for hvert emne.
        
            ${customerPrompt}
        
            ${distributionOrServicePrompt}
        
            For emnet Reklamestrategi, beskriv hvordan du ville tiltrekke det målrettede segmentet. Generer flere reklametaktikker og inkluder i hver taktikk begrunnelse, mål og aktiviteter underemner. Vurder emnene målretting og posisjonering. Pakk inn hver reklametaktikk med <li> tag. Underemnene skal være pakket inn i disse <li> tags. Når du lister reklametaktikker, skal du ikke bruke nummerert liste.
        
            Gjenta ikke forretningsdetaljer.
            Skriv dette i første person perspektiv som om du er eieren av denne virksomheten ved hjelp av "vi", BRUK IKKE "jeg".
            Begynn utfyllingen med "<h5>${distributionOrServiceHeading}</h5>.
            Omgir nøkkelemner med <h5> tags.
            Generer alt på norsk.
            Dette er den lange, detaljerte og omfattende ${mark4TopicNO} du kom opp med:
            `,
  };

  const payload = {
    messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
    n: 1,
  };
  return FireworksAIStream(payload);

  // const payload = {
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
  //   temperature: 0.5,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 1500,
  //   stream: true,
  //   n: 1,
  // };
  // return OpenAIStream(payload);
};
