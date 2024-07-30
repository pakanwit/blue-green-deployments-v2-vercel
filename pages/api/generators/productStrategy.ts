import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IProductStrategy {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;

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
  AITopic: string;
  variantID: string;
  modelName?: string;
}

// api6Mark3.ts
export const productStrategy = (request: IProductStrategy) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,

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
    AITopic,
    variantID,
    modelName,
  } = request;

  const generatePrompt = (...products) => {
    const translations = {
      de: {
        name: 'Kundens Produkt oder Dienstleistung #{i} Name: {name}\n',
        description:
          'Kundens Produkt oder Dienstleistung #{i} Beschreibung: {description}\n',
      },
      fr: {
        name: 'Produit ou service du client #{i} Nom: {name}\n',
        description:
          'Produit ou service du client #{i} Description: {description}\n',
      },
      es: {
        name: 'Producto o servicio del cliente #{i} Nombre: {name}\n',
        description:
          'Producto o servicio del cliente #{i} Descripción: {description}\n',
      },
      it: {
        name: 'Prodotto o servizio del cliente #{i} Nome: {name}\n',
        description:
          'Prodotto o servizio del cliente #{i} Descrizione: {description}\n',
      },
      nl: {
        name: "Klant's product of dienst #{i} Naam: {name}\n",
        description:
          "Klant's product of dienst #{i} Beschrijving: {description}\n",
      },
      sv: {
        name: 'Kundens produkt eller tjänst #{i} Namn: {name}\n',
        description:
          'Kundens produkt eller tjänst #{i} Beskrivning: {description}\n',
      },
      fi: {
        name: 'Asiakkaan tuote tai palvelu #{i} Nimi: {name}\n',
        description: 'Asiakkaan tuote tai palvelu #{i} Kuvaus: {description}\n',
      },
      da: {
        name: 'Kundens produkt eller service #{i} Navn: {name}\n',
        description:
          'Kundens produkt eller service #{i} Beskrivelse: {description}\n',
      },
      no: {
        name: 'Kundens produkt eller tjeneste #{i} Navn: {name}\n',
        description:
          'Kundens produkt eller tjeneste #{i} Beskrivelse: {description}\n',
      },
      default: {
        name: "Client's product or service #{i} Name: {name}\n",
        description:
          "Client's product or service #{i} Description: {description}\n",
      },
    };

    const languageTemplates =
      translations[planLanguage] || translations.default;
    let prompt = '';

    for (let i = 0; i < 5; i++) {
      const productName = products[i * 2];
      const productDescription = products[i * 2 + 1];

      if (productName) {
        prompt += languageTemplates.name
          .replace('{i}', i + 1)
          .replace('{name}', productName);
      }

      if (productDescription) {
        prompt += languageTemplates.description
          .replace('{i}', i + 1)
          .replace('{description}', productDescription);
      }
    }

    return prompt;
  };

  const productInfoPrompt = generatePrompt(
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

  const targeting = mark2Ref.substring(mark2Ref.indexOf('<h5>Targeting</h5>'));
  const positioning = mark2Ref.substring(
    mark2Ref.indexOf('<h5>Positioning</h5>'),
  );

  const productDescription = (productInfoPrompt) => {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;

    const prompts = {
      de: `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktbeschreibung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktbeschreibung. Jede der ${productCount} Produktbeschreibungen sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`,
      fr: `S'il y a ${productCount} produits, alors dans le sujet de la description du produit, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de description du produit. Chacune des ${productCount} descriptions de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`,
      es: `Si hay ${productCount} productos, entonces en el tema de la descripción del producto, debería haber detalles sobre ${productCount} productos, pero solo un tema de descripción del producto. Cada una de las ${productCount} descripciones de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`,
      it: `Se ci sono ${productCount} prodotti, allora nell'argomento della descrizione del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di descrizione del prodotto. Ciascuna delle ${productCount} descrizioni del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`,
      nl: `Als er ${productCount} producten zijn, dan zou er in het onderwerp productbeschrijving detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productbeschrijving. Elk van de ${productCount} productbeschrijvingen moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`,
      sv: `Om det finns ${productCount} produkter, bör det i produktbeskrivningsämnet finnas detaljer om ${productCount} produkter, men bara ett ämne för produktbeskrivning. Var och en av de ${productCount} produktbeskrivningarna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, vara mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`,
      fi: `Jos tuotteita on ${productCount}, tuotekuvausaiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotekuvausaihe. Jokaisen ${productCount} tuotekuvauksen tulisi olla <li> -tagin sisällä ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, ole erittäin oivaltava. Yritä olla toistamatta sanavalinnassasi.`,
      da: `Hvis der er ${productCount} produkter, skal der i produktbeskrivelsesemnet være detaljer om ${productCount} produkter, men kun et emne for produktbeskrivelse. Hver af de ${productCount} produktbeskrivelser skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, være meget indsigtsfuld. Prøv ikke at være gentagende i din formulering.`,
      no: `Hvis det er ${productCount} produkter, bør det i produktbeskrivelsestemaet være detaljer om ${productCount} produkter, men bare ett emne for produktbeskrivelse. Hver av de ${productCount} produktbeskrivelsene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, være veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`,
      ja: `もし${productCount}個の製品があるなら、製品説明のトピックでは${productCount}個の製品の詳細があるべきですが、製品説明のトピックは一つだけです。${productCount}個の製品説明のそれぞれは<li>タグで囲まれ、各<li>タグには各製品の具体的な説明があるべきです、非常に洞察力があります。あなたの言葉遣いで繰り返しを避けてください。`,
      ar: `إذا كان هناك ${productCount} منتجات، ففي موضوع وصف المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع وصف المنتج واحد فقط. يجب أن تكون كل واحدة من وصف المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون مفصلاً جداً. حاول ألا تكون مكرراً في كلماتك.`,
      default: `If there are ${productCount} products, then in the product description topic, there should be detail on ${productCount} products, but only one product description topic. Each of the ${productCount} product descriptions should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`,
    };

    return prompts[planLanguage] || prompts.default;
  };

  const productDifferentiation = (productInfoPrompt) => {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;

    const prompts = {
      de: `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktdifferenzierung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktdifferenzierung. Jede der ${productCount} Produktdifferenzierungsstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`,
      fr: `S'il y a ${productCount} produits, alors dans le sujet de la différenciation des produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de différenciation des produits. Chacune des ${productCount} stratégies de différenciation de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`,
      es: `Si hay ${productCount} productos, entonces en el tema de la diferenciación de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de diferenciación de productos. Cada una de las ${productCount} estrategias de diferenciación de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`,
      it: `Se ci sono ${productCount} prodotti, allora nell'argomento della differenziazione del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di differenziazione del prodotto. Ciascuna delle ${productCount} strategie di differenziazione del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`,
      nl: `Als er ${productCount} producten zijn, dan zou er in het onderwerp productdifferentiatie detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productdifferentiatie. Elk van de ${productCount} productdifferentiatiestrategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`,
      sv: `Om det finns ${productCount} produkter, bör det i produktdifferentieringsämnet finnas detaljer om ${productCount} produkter, men bara ett ämne för produktdifferentiering. Var och en av de ${productCount} produktdifferentieringsstrategierna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, vara mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`,
      fi: `Jos tuotteita on ${productCount}, tuotteen erotteluteemassa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotteen erotteluteema. Jokaisen ${productCount} tuotteen erottelustrategian tulisi olla <li> -tagin sisällä ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, ole erittäin oivaltava. Yritä olla toistamatta sanavalinnassasi.`,
      da: `Hvis der er ${productCount} produkter, skal der i produktforskellesemnet være detaljer om ${productCount} produkter, men kun et emne for produktforskelle. Hver af de ${productCount} produktforskellestrategier skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, være meget indsigtsfuld. Prøv ikke at være gentagende i din formulering.`,
      no: `Hvis det er ${productCount} produkter, bør det i produktforskjellstemaet være detaljer om ${productCount} produkter, men bare ett emne for produktforskjell. Hver av de ${productCount} produktforskjellstrategiene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, være veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`,
      ja: `もし${productCount}個の製品があるなら、製品差別化のトピックでは${productCount}個の製品の詳細があるべきですが、製品差別化のトピックは一つだけです。${productCount}個の製品差別化戦略のそれぞれは<li>タグで囲まれ、各<li>タグには各製品の具体的な説明があるべきです、非常に洞察力があります。あなたの言葉遣いで繰り返しを避けてください。`,
      ar: `إذا كان هناك ${productCount} منتجات، ففي موضوع تمييز المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع تمييز المنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات تمييز المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون مفصلاً جداً. حاول ألا تكون مكرراً في كلماتك.`,
      default: `If there are ${productCount} products, then in the product differentiation topic, there should be detail on ${productCount} products, but only one product differentiation topic. Each of the ${productCount} product differentiation strategies should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`,
    };

    return prompts[planLanguage] || prompts.default;
  };

  const productDevelopment = (productInfoPrompt) => {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;

    const prompts = {
      de: `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktentwicklung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktentwicklung. Jede der ${productCount} Produktentwicklungsstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`,
      fr: `S'il y a ${productCount} produits, alors dans le sujet du développement de produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de développement de produits. Chacune des ${productCount} stratégies de développement de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`,
      es: `Si hay ${productCount} productos, entonces en el tema del desarrollo de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de desarrollo de productos. Cada una de las ${productCount} estrategias de desarrollo de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`,
      it: `Se ci sono ${productCount} prodotti, allora nell'argomento dello sviluppo del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di sviluppo del prodotto. Ciascuna delle ${productCount} strategie di sviluppo del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`,
      nl: `Als er ${productCount} producten zijn, dan zou er in het onderwerp productontwikkeling detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productontwikkeling. Elk van de ${productCount} productontwikkelingsstrategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`,
      sv: `Om det finns ${productCount} produkter, bör det i ämnet för produktutveckling finnas detaljer om ${productCount} produkter, men bara ett ämne för produktutveckling. Var och en av de ${productCount} produktutvecklingsstrategierna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`,
      fi: `Jos tuotteita on ${productCount}, tuotekehityksen aiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotekehityksen aihe. Jokaisen ${productCount} tuotekehitysstrategian tulisi olla kääritty <li> -tagiin ja jokaisessa <li> -tagissa tulisi olla erityinen kuvaus jokaisesta tuotteesta, erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`,
      da: `Hvis der er ${productCount} produkter, skal der i emnet for produktudvikling være detaljer om ${productCount} produkter, men kun et emne for produktudvikling. Hver af de ${productCount} produktudviklingsstrategier skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, meget indsigtsfuldt. Prøv ikke at være gentagende i din formulering.`,
      no: `Hvis det er ${productCount} produkter, bør det i emnet for produktutvikling være detaljer om ${productCount} produkter, men bare ett emne for produktutvikling. Hver av de ${productCount} produktutviklingsstrategiene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`,
      ja: `もし${productCount}個の製品があるなら、製品開発のトピックでは${productCount}個の製品の詳細があるべきですが、製品開発のトピックは一つだけです。${productCount}個の製品開発戦略のそれぞれは<li>タグで囲まれ、各<li>タグには各製品の具体的な説明があるべきです、非常に洞察力があります。あなたの言葉遣いで繰り返しを避けてください。`,
      ar: `إذا كان هناك ${productCount} منتجات، ففي موضوع تطوير المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع تطوير المنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات تطوير المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون مفصلاً جداً. حاول ألا تكون مكرراً في كلماتك.`,
      default: `If there are ${productCount} products, then in the product development topic, there should be detail on ${productCount} products, but only one product development topic. Each of the ${productCount} product development strategies should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`,
    };

    return prompts[planLanguage] || prompts.default;
  };

  const productBranding = (productInfoPrompt) => {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;
    const prompts = {
      de: `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktbranding Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktbranding. Jede der ${productCount} Produktbrandingstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`,
      fr: `S'il y a ${productCount} produits, alors dans le sujet de la marque de produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de marque de produits. Chacune des ${productCount} stratégies de marque de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`,
      es: `Si hay ${productCount} productos, entonces en el tema de la marca de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de marca de productos. Cada una de las ${productCount} estrategias de marca de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`,
      it: `Se ci sono ${productCount} prodotti, allora nell'argomento del branding del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di branding del prodotto. Ciascuna delle ${productCount} strategie di branding del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`,
      nl: `Als er ${productCount} producten zijn, dan zou er in het onderwerp productbranding detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productbranding. Elk van de ${productCount} productbrandingstrategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`,
      sv: `Om det finns ${productCount} produkter, bör det i ämnet för produktvarumärkning finnas detaljer om ${productCount} produkter, men bara ett ämne för produktvarumärkning. Var och en av de ${productCount} produktvarumärkningsstrategierna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`,
      fi: `Jos tuotteita on ${productCount}, tuotemerkkien aiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotemerkkien aihe. Jokaisen ${productCount} tuotemerkkistrategian tulisi olla kääritty <li> -tagiin ja jokaisessa <li> -tagissa tulisi olla erityinen kuvaus jokaisesta tuotteesta, erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`,
      da: `Hvis der er ${productCount} produkter, skal der i emnet for produktbranding være detaljer om ${productCount} produkter, men kun et emne for produktbranding. Hver af de ${productCount} produktbrandingstrategier skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, meget indsigtsfuldt. Prøv ikke at være gentagende i din formulering.`,
      no: `Hvis det er ${productCount} produkter, bør det i emnet for produktbranding være detaljer om ${productCount} produkter, men bare ett emne for produktbranding. Hver av de ${productCount} produktbrandingstrategiene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`,
      ja: `もし${productCount}個の製品があるなら、製品ブランディングのトピックでは${productCount}個の製品の詳細があるべきですが、製品ブランディングのトピックは一つだけです。${productCount}個の製品ブランディング戦略のそれぞれは<li>タグで囲まれ、各<li>タグには各製品の具体的な説明があるべきです、非常に洞察力があります。あなたの言葉遣いで繰り返しを避けてください。`,
      ar: `إذا كان هناك ${productCount} منتجات، ففي موضوع العلامة التجارية للمنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع العلامة التجارية للمنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات العلامة التجارية للمنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون مفصلاً جداً. حاول ألا تكون مكرراً في كلماتك.`,
      default: `If there are ${productCount} products, then in the product branding topic, there should be detail on ${productCount} products, but only one product branding topic. Each of the ${productCount} product branding strategy should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`,
    };

    return prompts[planLanguage] || prompts['default'];
  };

  const productDescriptionPrompt = productDescription(productInfoPrompt);
  const productDifferentiationPrompt =
    productDifferentiation(productInfoPrompt);
  const productDevelopmentPrompt = productDevelopment(productInfoPrompt);
  const productBrandingPrompt = productBranding(productInfoPrompt);

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
    sv: 'Kundgrupp',
    fi: 'Asiakasryhmä',
    da: 'Kundegruppe',
    no: 'Kundegruppe',
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
    sv: 'Detta är beskrivningar av kundgrupper:',
    fi: 'Nämä ovat asiakasryhmien kuvauksia:',
    da: 'Dette er beskrivelser af kundegrupper:',
    no: 'Dette er beskrivelser av kundegrupper:',
    ja: 'これらは顧客グループの説明です:',
    ar: 'هذه هي أوصاف مجموعات العملاء:',
    default: 'These are the customer group descriptions:',
  };

  customerDescriptions.forEach((description, index) => {
    if (description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups['default']} ${index + 1}: ${description}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions['default']}\n${customerPrompt}`;

  function generateAITopicAllProduct(data) {
    let output = '';

    if (data?.hasOwnProperty('product')) {
      data['product'].forEach((item) => {
        output += `Topic: ${item.topic}\n`;
        output += `Question: ${item.question}\n`;
        output += `Answer: ${item.answer}\n\n`;
      });
    }

    return output;
  }

  function generateAITopicTopicProduct(data) {
    let output = '';

    if (data?.hasOwnProperty('product')) {
      data['product'].forEach((item) => {
        output += `${item.topic}, `;
      });
    }

    return output;
  }

  const mark3TopicEN = 'Product and Services section';
  const mark3TopicDE = 'Produkt- und Dienstleistungsbereich';
  const mark3TopicFR = 'Section des produits et services';
  const mark3TopicES = 'Sección de productos y servicios';
  const mark3TopicIT = 'Sezione prodotti e servizi';
  const mark3TopicNL = 'Producten- en dienstensectie';
  const mark3TopicJA = '製品とサービスのセクション';
  const mark3TopicAR = 'قسم المنتجات والخدمات';
  const mark3TopicSV = 'Produkt- och tjänstesektion';
  const mark3TopicFI = 'Tuotteet ja palvelut -osio';
  const mark3TopicDA = 'Produkt- og servicesektion';
  const mark3TopicNO = 'Produkt- og tjenesteseksjon';

  const AITopicAllProductString = generateAITopicAllProduct(AITopic);
  const AITopicTopicProductString = generateAITopicTopicProduct(AITopic);

  const promptTemplates = {
    en: `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mark3TopicEN} for a business plan.
    
    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
    
    These are details of the client's products or services. DO NOT mention additional product or services that are not listed here:
    ${productInfoPrompt}
    These products or services details MUST be included in the ${mark3TopicEN}.
    
    for ${mark3TopicEN}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}
    Use it as data source but don't include targeting and positioning data in your response vertbatim.
    
    For ${mark3TopicEN}, describe it in detail. This is Important: ${mark3TopicEN} MUST align itself to the positioning data. The best ${mark3TopicEN} aligns with positioning. ${mark3TopicEN} topics should include: ${AITopicTopicProductString}
    These topic names should be in <h4> tag.
    
    These are more information to generate the aforementioned topics:
    ${AITopicAllProductString}
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h3>Product and Services</h3>". Don't repeat these topic: "<h3>Product and Services</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
  This is important: Be very insightful in your response
    Generate at least 1000 words.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mark3TopicEN} you came up with:
    `,
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mark3TopicEN} for a business plan.
    
    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.
    
    These are details of the client's products or services. DO NOT mention additional product or services that are not listed here:
    ${productInfoPrompt}
    These products or services details MUST be included in the ${mark3TopicEN}.
    
    for ${mark3TopicEN}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}
    Use it as data source but don't include targeting and positioning data in your response vertbatim.
    
    For ${mark3TopicEN}, describe it in detail. This is Important: ${mark3TopicEN} MUST align itself to the positioning data. The best ${mark3TopicEN} aligns with positioning. ${mark3TopicEN} topics should include: ${AITopicTopicProductString}
    These topic names should be in <h4> tag.
    
    These are more information to generate the aforementioned topics:
    ${AITopicAllProductString}
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h3>Product and Services</h3>". Don't repeat these topic: "<h3>Product and Services</h3>"
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    Generate at least 1000 words.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mark3TopicEN} you came up with:
    `,
    de: `
    Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um einen langen und detaillierten ${mark3TopicDE} für einen Geschäftsplan zu schreiben.
    
    Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdaten 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdaten 5: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
    
    Dies sind Details zu den Produkten oder Dienstleistungen des Kunden. Nennen Sie KEINE zusätzlichen Produkte oder Dienstleistungen, die hier nicht aufgeführt sind:
    ${productInfoPrompt}
    Diese Produkt- oder Dienstleistungsdetails MÜSSEN im ${mark3TopicDE} enthalten sein.
    
    Für ${mark3TopicDE} MÜSSEN Sie diese Ziel- und Positionierungsdaten berücksichtigen:
    Dies sind die Zieldaten: ${targeting}
    Dies sind die Positionierungsdaten: ${positioning}
    Verwenden Sie es als Datenquelle, aber fügen Sie die Ziel- und Positionierungsdaten nicht wörtlich in Ihre Antwort ein.
    
    Für ${mark3TopicDE} beschreiben Sie es im Detail. Dies ist wichtig: ${mark3TopicDE} MUSS sich an den Positionierungsdaten ausrichten. Das beste ${mark3TopicDE} stimmt mit der Positionierung überein. ${mark3TopicDE} Themen sollten enthalten: ${AITopicTopicProductString}
    Diese Themennamen sollten im <h4>-Tag stehen.
    
    Dies sind weitere Informationen zur Erstellung der oben genannten Themen:
    ${AITopicAllProductString}
    
    Wiederholen Sie keine Geschäftsdaten.
    Schreiben Sie dies, als wären Sie der Eigentümer des Unternehmens, verwenden Sie "wir", nicht "ich".
    Erstellen Sie die Antwort in HTML und umgeben Sie ${mark3TopicDE} Themen mit dem <h5>-Tag. 
    Beginnen Sie die Ausführung mit "<h3>Produkt- und Dienstleistungsbereich</h3>". Wiederholen Sie dieses Thema nicht: "<h3>Produkt- und Dienstleistungsbereich</h3>"
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
    Erstellen Sie alles auf Deutsch.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort
    Erstellen Sie mindestens 1000 Wörter.
    Dies ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort.
    Dies ist der lange, detaillierte und aufschlussreiche ${mark3TopicDE}, den Sie sich ausgedacht haben:
    `,
    fr: `
    Vous êtes un consultant professionnel, et un client vous demande d'écrire une ${mark3TopicFR} longue et détaillée pour un plan d'affaires.
    
    détails de l'entreprise:
    détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
    détail de l'entreprise 2: Le type d'entreprise est ${businessType}. 
    détail de l'entreprise 3: Voici où se trouvent les clients de l'entreprise: ${location}.
    détail de l'entreprise 4: Le canal de distribution du client est: ${salesChannel}.
    détail de l'entreprise 5: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
    
    Voici les détails des produits ou services du client. NE mentionnez PAS de produits ou services supplémentaires qui ne sont pas listés ici:
    ${productInfoPrompt}
    Ces détails de produits ou services DOIVENT être inclus dans la ${mark3TopicFR}.
    
    pour la ${mark3TopicFR}, vous DEVEZ considérer ces données de ciblage et de positionnement:
    Voici les données de ciblage: ${targeting}
    Voici les données de positionnement: ${positioning}
    Utilisez-les comme source de données mais n'incluez pas les données de ciblage et de positionnement dans votre réponse mot pour mot.
    
    Pour la ${mark3TopicFR}, décrivez-la en détail. C'est important: la ${mark3TopicFR} DOIT s'aligner sur les données de positionnement. La meilleure ${mark3TopicFR} s'aligne avec le positionnement. Les sujets de la ${mark3TopicFR} devraient inclure: ${AITopicTopicProductString}
    Ces noms de sujets doivent être dans la balise <h4>.
    
    Voici plus d'informations pour générer les sujets susmentionnés:
    ${AITopicAllProductString}
    
    Ne répétez pas les détails de l'entreprise.
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Générez la réponse en HTML en entourant les sujets de la ${mark3TopicFR} avec la balise <h5>. 
    Commencez la complétion par "<h3>Section des produits et services</h3>". Ne répétez pas ce sujet: "<h3>Section des produits et services</h3>"
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de puce, utilisez plutôt la balise <li>.
    Générez tout en français.
    Générez au moins 1000 mots.
    C'est important: Soyez très perspicace dans votre réponse.
    Voici la ${mark3TopicFR} longue, détaillée et perspicace que vous avez imaginée:
    `,
    es: `
    Usted es un consultor profesional, y un cliente se le acerca para escribir una ${mark3TopicES} larga y detallada para un plan de negocios.
    
    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
    
    Estos son los detalles de los productos o servicios del cliente. NO mencione productos o servicios adicionales que no estén listados aquí:
    ${productInfoPrompt}
    Estos detalles de productos o servicios DEBEN ser incluidos en la ${mark3TopicES}.
    
    para la ${mark3TopicES}, DEBE considerar estos datos de segmentación y posicionamiento:
    Estos son los datos de segmentación: ${targeting}
    Estos son los datos de posicionamiento: ${positioning}
    Úselos como fuente de datos pero no incluya los datos de segmentación y posicionamiento en su respuesta textualmente.
    
    Para la ${mark3TopicES}, descríbala en detalle. Esto es importante: la ${mark3TopicES} DEBE alinearse con los datos de posicionamiento. La mejor ${mark3TopicES} se alinea con el posicionamiento. Los temas de la ${mark3TopicES} deben incluir: ${AITopicTopicProductString}
    Estos nombres de temas deben estar en la etiqueta <h4>.
    
    Aquí hay más información para generar los temas mencionados anteriormente:
    ${AITopicAllProductString}
    
    No repita los detalles del negocio.
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no "yo".
    Genere la respuesta en HTML rodeando los temas de la ${mark3TopicES} con la etiqueta <h5>. 
    Comience la finalización con "<h3>Sección de productos y servicios</h3>". No repita este tema: "<h3>Sección de productos y servicios</h3>"
    Use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para puntos de viñeta, en su lugar use la etiqueta <li>.
    Genere todo en español.
    Genere al menos 1000 palabras.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Esta es la ${mark3TopicES} larga, detallada y perspicaz que se le ocurrió:
    `,
    it: `
    Sei un consulente professionista e un cliente si rivolge a te per scrivere una ${mark3TopicIT} lunga e dettagliata per un piano aziendale.
    
    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
    
    Questi sono i dettagli dei prodotti o servizi del cliente. NON menzionare prodotti o servizi aggiuntivi che non sono elencati qui:
    ${productInfoPrompt}
    Questi dettagli di prodotti o servizi DEVONO essere inclusi nella ${mark3TopicIT}.
    
    per la ${mark3TopicIT}, DEVI considerare questi dati di targeting e posizionamento:
    Questi sono i dati di targeting: ${targeting}
    Questi sono i dati di posizionamento: ${positioning}
    Usali come fonte di dati ma non includere i dati di targeting e posizionamento nella tua risposta alla lettera.
    
    Per la ${mark3TopicIT}, descrivila in dettaglio. Questo è importante: la ${mark3TopicIT} DEVE allinearsi ai dati di posizionamento. La migliore ${mark3TopicIT} si allinea con il posizionamento. Gli argomenti della ${mark3TopicIT} dovrebbero includere: ${AITopicTopicProductString}
    Questi nomi di argomenti dovrebbero essere nel tag <h4>.
    
    Queste sono ulteriori informazioni per generare gli argomenti sopra menzionati:
    ${AITopicAllProductString}
    
    Non ripetere i dettagli aziendali.
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
    Genera la risposta in HTML circondando gli argomenti della ${mark3TopicIT} con il tag <h5>. 
    Inizia il completamento con "<h3>Sezione prodotti e servizi</h3>". Non ripetere questo argomento: "<h3>Sezione prodotti e servizi</h3>"
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece il tag <li>.
    genera tutto in italiano
    Genera almeno 1000 parole.
    Questo è importante: Sii molto perspicace nella tua risposta.
    Questa è la ${mark3TopicIT} lunga, dettagliata e perspicace che hai ideato:
    `,
    nl: `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${mark3TopicNL} voor een bedrijfsplan te schrijven.
    
    bedrijfsgegevens:
    bedrijfsgegeven 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegeven 2: Het type bedrijf is ${businessType}. 
    bedrijfsgegeven 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
    bedrijfsgegeven 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsgegeven 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
    
    Dit zijn de details van de producten of diensten van de klant. NOEM GEEN extra producten of diensten die hier niet worden vermeld:
    ${productInfoPrompt}
    Deze product- of dienstgegevens MOETEN worden opgenomen in de ${mark3TopicNL}.
    
    voor de ${mark3TopicNL} MOET u deze targeting- en positioneringsgegevens overwegen:
    Dit zijn de targetinggegevens: ${targeting}
    Dit zijn de positioneringsgegevens: ${positioning}
    Gebruik het als gegevensbron, maar neem de targeting- en positioneringsgegevens niet letterlijk op in uw antwoord.
    
    Voor de ${mark3TopicNL} beschrijft u deze in detail. Dit is belangrijk: de ${mark3TopicNL} MOET zich afstemmen op de positioneringsgegevens. De beste ${mark3TopicNL} stemt overeen met de positionering. ${mark3TopicNL} onderwerpen moeten bevatten: ${AITopicTopicProductString}
    Deze onderwerpnamen moeten in de <h4>-tag staan.
    
    Dit zijn meer informatie om de bovengenoemde onderwerpen te genereren:
    ${AITopicAllProductString}
    
    Herhaal geen bedrijfsgegevens.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Genereer de reactie in HTML en omring de ${mark3TopicNL} onderwerpen met de <h5>-tag. 
    Begin de voltooiing met "<h3>Producten- en dienstensectie</h3>". Herhaal dit onderwerp niet: "<h3>Producten- en dienstensectie</h3>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
    genereer alles in het Nederlands
    Genereer minimaal 1000 woorden.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${mark3TopicNL} die u hebt bedacht:
    `,
    ja: `
    あなたはプロのコンサルタントであり、顧客がビジネスプランのために長く詳細な${mark3TopicJA}を書くように依頼してきます。
    
    ビジネスの詳細:
    ビジネスの詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネスの詳細 2: ビジネスの種類は${businessType}です。
    ビジネスの詳細 3: これはビジネスの顧客がいる場所です: ${location}。
    ビジネスの詳細 4: クライアントの流通チャネルは: ${salesChannel}です。
    ビジネスの詳細 5: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
    
    これらはクライアントの製品またはサービスの詳細です。ここに記載されていない追加の製品やサービスには言及しないでください:
    ${productInfoPrompt}
    これらの製品またはサービスの詳細は${mark3TopicJA}に含める必要があります。
    
    ${mark3TopicJA}のために、次のターゲティングおよびポジショニングデータを考慮する必要があります:
    これはターゲティングデータです: ${targeting}
    これはポジショニングデータです: ${positioning}
    データソースとして使用しますが、ターゲティングおよびポジショニングデータをそのまま回答に含めないでください。
    
    ${mark3TopicJA}のために、詳細に説明してください。これは重要です: ${mark3TopicJA}はポジショニングデータに合わせる必要があります。最良の${mark3TopicJA}はポジショニングと一致します。${mark3TopicJA}のトピックには次のものを含める必要があります: ${AITopicTopicProductString}
    これらのトピック名は<h4>タグにする必要があります。
    
    上記のトピックを生成するための追加情報は次のとおりです:
    ${AITopicAllProductString}
    
    ビジネスの詳細を繰り返さないでください。
    ビジネスの所有者であるかのように、「私」ではなく「私たち」を使用してこれを書いてください。
    ${mark3TopicJA}のトピックを<h5>タグで囲んでHTMLで応答を生成します。
    "<h3>製品とサービス</h3>"で完了を開始します。このトピックを繰り返さないでください: "<h3>製品とサービス</h3>"
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にします。* *を使用せず、代わりに<em>タグを使用して斜体にします。箇条書きには*を使用せず、代わりに<li>タグを使用します。
    すべて日本語で生成します。
    少なくとも1000語を生成します。
    これは重要です: 回答に非常に洞察力を持たせてください。
    これはあなたが考えた長く、詳細で、洞察力のある${mark3TopicJA}です:
    `,
    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${mark3TopicAR} طويل ومفصل لخطة عمل.
    
    تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: قناة توزيع العميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة التشغيل لعمل العميل هي ${businessOperationalStatus}.
    
    هذه هي تفاصيل منتجات أو خدمات العميل. لا تذكر منتجات أو خدمات إضافية غير مذكورة هنا:
    ${productInfoPrompt}
    يجب تضمين تفاصيل هذه المنتجات أو الخدمات في ${mark3TopicAR}.
    
    بالنسبة لـ ${mark3TopicAR}، يجب أن تأخذ في الاعتبار بيانات الاستهداف والتموضع التالية:
    هذه هي بيانات الاستهداف: ${targeting}
    هذه هي بيانات التموضع: ${positioning}
    استخدمها كمصدر للبيانات ولكن لا تتضمن بيانات الاستهداف والتموضع حرفياً في ردك.
    
    بالنسبة لـ ${mark3TopicAR}، قم بوصفها بالتفصيل. هذا مهم: يجب أن يتماشى ${mark3TopicAR} مع بيانات التموضع. أفضل ${mark3TopicAR} يتماشى مع التموضع. يجب أن تتضمن مواضيع ${mark3TopicAR} ما يلي: ${AITopicTopicProductString}
    يجب أن تكون أسماء هذه المواضيع في علامة <h4>.
    
    هذه هي المزيد من المعلومات لتوليد المواضيع المذكورة أعلاه:
    ${AITopicAllProductString}
    
    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" ولا تستخدم "أنا".
    قم بإنشاء الرد في HTML محاطًا بمواضيع ${mark3TopicAR} بعلامة h5.
    ابدأ الإكمال بـ "<h3>المنتجات والخدمات</h3>". لا تكرر هذا الموضوع: "<h3>المنتجات والخدمات</h3>"
    استخدم فقط علامات HTML ولا تستخدم الماركدوان. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
    قم بإنشاء كل شيء باللغة العربية.
    قم بإنشاء ما لا يقل عن 1000 كلمة.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو ${mark3TopicAR} الطويل والمفصل والبليغ الذي توصلت إليه:
    `,
    sv: `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${mark3TopicSV} för en affärsplan.
    
    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är ${businessType}.
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.
    
    Detta är detaljer om kundens produkter eller tjänster. Nämn INTE ytterligare produkter eller tjänster som inte listas här:
    ${productInfoPrompt}
    Dessa produkt- eller tjänstedetaljer MÅSTE inkluderas i ${mark3TopicSV}.
    
    för ${mark3TopicSV}, MÅSTE du överväga dessa mål- och positioneringsdata:
    Detta är målgruppsdata: ${targeting}
    Detta är positioneringsdata: ${positioning}
    Använd det som datakälla men inkludera inte mål- och positioneringsdata ordagrant i ditt svar.
    
    För ${mark3TopicSV}, beskriv det i detalj. Detta är viktigt: ${mark3TopicSV} MÅSTE anpassa sig till positioneringsdata. Den bästa ${mark3TopicSV} anpassar sig till positioneringen. ${mark3TopicSV} ämnen bör inkludera: ${AITopicTopicProductString}
    Dessa ämnesnamn bör vara i <h4>-taggen.
    
    Detta är mer information för att generera de ovan nämnda ämnena:
    ${AITopicAllProductString}
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren av företaget, använd "vi" och inte "jag".
    Generera svar i HTML som omger ${mark3TopicSV} ämnen med h5-taggen.
    Börja avslutningen med "<h3>Produkt- och tjänstesektion</h3>". Upprepa inte detta ämne: "<h3>Produkt- och tjänstesektion</h3>"
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
    generera allt på svenska
    Generera minst 1000 ord.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${mark3TopicSV} du kom på:
    `,
    fi: `
    Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark3TopicFI} liiketoimintasuunnitelmaa varten.
    
    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Yrityksen tyyppi on ${businessType}.
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.
    
    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot. ÄLÄ mainitse lisätuotteita tai -palveluita, joita ei ole lueteltu tässä:
    ${productInfoPrompt}
    Nämä tuotteiden tai palveluiden tiedot on SISÄLLYTETTÄVÄ ${mark3TopicFI}.
    
    ${mark3TopicFI} varten sinun on otettava huomioon nämä kohdistus- ja asemointitiedot:
    Nämä ovat kohdistustiedot: ${targeting}
    Nämä ovat asemointitiedot: ${positioning}
    Käytä niitä tietolähteenä, mutta älä sisällytä kohdistus- ja asemointitietoja vastaukseesi sanasta sanaan.
    
    ${mark3TopicFI} varten kuvaile se yksityiskohtaisesti. Tämä on tärkeää: ${mark3TopicFI} on sovitettava asemointitietoihin. Paras ${mark3TopicFI} soveltuu asemointiin. ${mark3TopicFI} aiheet tulisi sisältää: ${AITopicTopicProductString}
    Näiden aiheiden nimet tulisi olla <h4>-tagissa.
    
    Tässä on lisää tietoa edellä mainittujen aiheiden tuottamiseksi:
    ${AITopicAllProductString}
    
    Älä toista liiketoiminnan tietoja.
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" äläkä "minä".
    Luo vastaus HTML-muodossa ympäröimällä ${mark3TopicFI} aiheet h5-tagilla.
    Aloita täydennys "<h3>Tuotteet ja palvelut</h3>". Älä toista tätä aihetta: "<h3>Tuotteet ja palvelut</h3>"
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
    luo kaikki suomeksi
    Luo vähintään 1000 sanaa.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${mark3TopicFI}, jonka keksit:
    `,
    da: `
    Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mark3TopicDA} til en forretningsplan.
    
    forretningsdetaljer:
    forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedens type er ${businessType}.
    forretningsdetalje 3: Dette er, hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
    
    Dette er detaljer om kundens produkter eller tjenester. Nævn IKKE yderligere produkter eller tjenester, der ikke er nævnt her:
    ${productInfoPrompt}
    Disse produkt- eller tjenestedetaljer SKAL inkluderes i ${mark3TopicDA}.
    
    for ${mark3TopicDA}, SKAL du overveje disse mål- og positioneringsdata:
    Dette er måldataene: ${targeting}
    Dette er positioneringsdataene: ${positioning}
    Brug det som datakilde, men inkluder ikke mål- og positioneringsdataene ordret i dit svar.
    
    For ${mark3TopicDA}, beskriv det i detaljer. Dette er vigtigt: ${mark3TopicDA} SKAL tilpasse sig positioneringsdataene. Den bedste ${mark3TopicDA} tilpasser sig positioneringen. ${mark3TopicDA} emner bør inkludere: ${AITopicTopicProductString}
    Disse emnenavne skal være i <h4>-taggen.
    
    Dette er mere information til at generere de førnævnte emner:
    ${AITopicAllProductString}
    
    Gentag ikke forretningsdetaljer.
    Skriv dette, som om du er ejer af virksomheden, brug "vi" og ikke "jeg".
    Generer svar i HTML, der omgiver ${mark3TopicDA} emner med h5-taggen.
    Begynd afslutningen med "<h3>Produkt- og servicesektion</h3>". Gentag ikke dette emne: "<h3>Produkt- og servicesektion</h3>"
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-taggen til fed skrift. Brug ikke * *, brug i stedet <em>-taggen til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <li>-taggen.
    generer alt på dansk
    Generer mindst 1000 ord.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${mark3TopicDA}, du kom op med:
    `,
    no: `
    Du er en profesjonell konsulent, og en kunde henvender seg til deg for å skrive en lang og detaljert ${mark3TopicNO} for en forretningsplan.
    
    forretningsdetaljer:
    forretningsdetalj 1: Kundens virksomhetsnavn er ${businessName}.
    forretningsdetalj 2: Virksomhetens type er ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.
    
    Dette er detaljer om kundens produkter eller tjenester. IKKE nevn tilleggstjenester eller produkter som ikke er oppført her:
    ${productInfoPrompt}
    Disse produktene eller tjenestedetaljene MÅ inkluderes i ${mark3TopicNO}.
    
    for ${mark3TopicNO}, MÅ du vurdere disse mål- og posisjoneringsdataene:
    Dette er måldataene: ${targeting}
    Dette er posisjoneringsdataene: ${positioning}
    Bruk det som datakilde, men ikke inkluder mål- og posisjoneringsdataene ordrett i svaret ditt.
    
    For ${mark3TopicNO}, beskriv det i detalj. Dette er viktig: ${mark3TopicNO} MÅ tilpasse seg posisjoneringsdataene. Den beste ${mark3TopicNO} tilpasser seg posisjoneringen. ${mark3TopicNO} emner bør inkludere: ${AITopicTopicProductString}
    Disse emnenavnene skal være i <h4>-taggen.
    
    Dette er mer informasjon for å generere de nevnte emnene:
    ${AITopicAllProductString}
    
    Ikke gjenta forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" og ikke "jeg".
    Generer svar i HTML som omgir ${mark3TopicNO} emner med h5-taggen. 
    Begynn avslutningen med "<h3>Produkt- og tjenesteseksjon</h3>". Ikke gjenta dette emnet: "<h3>Produkt- og tjenesteseksjon</h3>"
    bruk kun HTML-tags, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punkttegn, bruk i stedet <li>-taggen.
    generer alt på norsk
    Generer minst 1000 ord.
    Dette er viktig: Vær veldig innsiktsfull i svaret ditt.
    Dette er den lange, detaljerte og innsiktsfulle ${mark3TopicNO} du kom opp med:
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
