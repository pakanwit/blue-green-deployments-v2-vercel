import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { FireworksAIStream } from '../../../utils/llama3/FireworksAIStream';

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
  variantID: string;
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
    variantID,
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

  const mark3TopicEN = 'Product Strategy and Pricing Strategy';
  const mark3TopicDE = 'Produktstrategie und Preisstrategie ';
  const mark3TopicFR = 'Stratégie de produit et stratégie de prix';
  const mark3TopicES = 'Estrategia de producto y estrategia de precios';
  const mark3TopicIT = 'Strategia di prodotto e strategia di prezzo';
  const mark3TopicNL = 'Productstrategie en prijsstrategie';
  const mark3TopicJA = '製品戦略と価格戦略';
  const mark3TopicAR = 'استراتيجية المنتج واستراتيجية التسعير';
  const mark3TopicSV = 'Produktstrategi och prissättning';
  const mark3TopicFI = 'Tuotestrategia ja hinnoittelustrategia';
  const mark3TopicDA = 'Produktstrategi og prisstrategi';
  const mark3TopicNO = 'Produktstrategi og prissettingsstrategi';

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
    
    These are the topic that should be generated: ${mark3TopicEN}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for both ${mark3TopicEN}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}

    For product strategy, describe the product or service in detail. This is Important: product strategy MUST align itself to the positioning data. The best product strategy aligns with positioning. Product Strategy topic should include: product description, product differentiation, product development, and product branding. These topics should be wrapped in <h6> tags. Each topic should describe each product or service in detail. For example, if there are 3 products or services, there should be 3 product descriptions, 3 product differentiations, 3 product developments, and 3 product brandings. Be insightful and descriptive. there should be only one product description, product differentiation, product development, and product branding topic each and in each topic there should be details on multiple products. 
    
    ${productDescriptionPrompt}
    
    ${productDifferentiationPrompt}
    
    ${productDevelopmentPrompt}

    ${productBrandingPrompt}
    
    For Pricing strategy topic, there are 3 major pricing strategies: value-based pricing, cost-based pricing,and competition-based pricing. Select one of these strategies and explain the reason behind why you selected that particular strategy and explain how you will implement that strategy and be very descriptive. This is Important: product strategy MUST align itself to the POSITIONING TOPIC from the STP topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h4>4P</h4>" followed by "<h5>Product Strategy</h5>" don't repeat these topic: "<h4>4P</h4>" and "<h5>Product Strategy</h5>", again in the completion.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
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
    
    These are the topic that should be generated: ${mark3TopicEN}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for both ${mark3TopicEN}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}

    For product strategy, describe the product or service in detail. This is Important: product strategy MUST align itself to the positioning data. The best product strategy aligns with positioning. Product Strategy topic should include: product description, product differentiation, product development, and product branding. These topics should be wrapped in <h6> tags. Each topic should describe each product or service in detail. For example, if there are 3 products or services, there should be 3 product descriptions, 3 product differentiations, 3 product developments, and 3 product brandings. Be insightful and descriptive. there should be only one product description, product differentiation, product development, and product branding topic each and in each topic there should be details on multiple products. 
    
    ${productDescriptionPrompt}
    
    ${productDifferentiationPrompt}
    
    ${productDevelopmentPrompt}

    ${productBrandingPrompt}
    
    For Pricing strategy topic, there are 3 major pricing strategies: value-based pricing, cost-based pricing,and competition-based pricing. Select one of these strategies and explain the reason behind why you selected that particular strategy and explain how you will implement that strategy and be very descriptive. This is Important: product strategy MUST align itself to the POSITIONING TOPIC from the STP topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h4>4P</h4>" followed by "<h5>Product Strategy</h5>" don't repeat these topic: "<h4>4P</h4>" and "<h5>Product Strategy</h5>", again in the completion.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mark3TopicEN} you came up with:
    `,
    de: `
            Sie sind ein professioneller Berater und ein Kunde kommt zu Ihnen, um einen langen und detaillierten ${mark3TopicDE} für einen Geschäftsplan zu schreiben.
        
            Geschäftsdetails:
            Geschäftsdetail 1: Der Geschäftsname des Kunden lautet ${businessName}.
            Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}. 
            Geschäftsdetail 3: Dies ist der Ort, an dem sich die Kunden des Unternehmens befinden: ${location}.
            business detail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
            Geschäftsdetail 5: Der Betriebsstatus des Kunden lautet: ${businessOperationalStatus}.
        
            Dies sind Einzelheiten zu den Produkten oder Dienstleistungen des Kunden. Nennen Sie KEINE zusätzlichen Produkte oder Dienstleistungen, die hier nicht aufgeführt sind:
            ${productInfoPrompt}
            Diese Produkt- oder Dienstleistungsdetails MÜSSEN in das ${mark3TopicDE} aufgenommen werden.
            
            Verwenden Sie 500 Wörter, um ${mark3TopicDE} zu erstellen. 
            Dies sind die Themen, die generiert werden sollten: ${mark3TopicDE}, fügen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben. Seien Sie sehr beschreibend bei der Erstellung von Inhalten für jedes Thema.
        
            ${customerPrompt}
        
            Für die Produktstrategie beschreiben Sie das Produkt oder die Dienstleistung im Detail. Dies ist wichtig: Die Produktstrategie MUSS sich an der Beschreibung der Kundengruppe orientieren. Die beste Produktstrategie ist auf die Beschreibung der Kundengruppe abgestimmt. Das Thema Produktstrategie sollte Folgendes umfassen: Produktbeschreibung, Produktdifferenzierung, Produktentwicklung und Produktmarkenbildung. Diese Themen sollten in <h6> Tags verpackt werden.
            
            ${productDescriptionPrompt}
        
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
            
            ${productBrandingPrompt}
            
            Für das Thema Preisstrategie gibt es 3 wichtige Preisstrategien: wertorientierte Preisgestaltung, kostenorientierte Preisgestaltung und wettbewerbsorientierte Preisgestaltung. Wählen Sie eine dieser Strategien aus und erläutern Sie, warum Sie diese Strategie gewählt haben und wie Sie diese Strategie umsetzen werden. Dies ist wichtig: Die Produktstrategie MUSS mit dem POSITIONIERUNGSTHEMA aus dem STP-Thema übereinstimmen.
            
            Wiederholen Sie keine geschäftlichen Details.
            Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
            Erzeugen Sie eine Antwort in html, die die ${mark3TopicDE}-Themen mit dem h5-Tag umgibt. 
            Beginnen Sie die Ergänzung mit "<h4>4P</h4>" gefolgt von "<h5>Produktstrategie</h5>"
            Fertigstellung auf Deutsch generieren. 
            
            Dies ist das lange, ausführliche und langatmige ${mark3TopicDE}, das Sie sich ausgedacht haben:
            `,
    fr: `
            Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${mark3TopicFR} long et détaillé pour un plan d'affaires.
        
            Détails de l'entreprise :
            Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
            Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}. 
            Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
            Détail de l'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
            Détail de l'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
        
            Voici les détails des produits ou services du client. NE mentionnez PAS de produits ou services supplémentaires qui ne sont pas listés ici :
            ${productInfoPrompt}
            Ces détails sur les produits ou services DOIVENT être inclus dans le ${mark3TopicFR}.
            
            Utilisez 500 mots pour générer ${mark3TopicFR}. 
            Voici le sujet qui devrait être généré : ${mark3TopicFR}, n'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très descriptif en générant du contenu pour chaque sujet.
        
            ${customerPrompt}
        
            Pour la stratégie produit, décrivez le produit ou le service en détail. Ce point est important : la stratégie produit DOIT être basée sur la description du groupe de clients. La meilleure stratégie de produit est alignée sur la description du groupe de clients. Le thème de la stratégie produit doit comprendre les éléments suivants : Description du produit, Différenciation du produit, Développement du produit et Marque du produit. Ces thèmes doivent être regroupés dans des balises <h6>.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            Pour le sujet de la stratégie de prix, il y a 3 principales stratégies de prix : la tarification basée sur la valeur, la tarification basée sur les coûts et la tarification basée sur la concurrence. Sélectionnez l'une de ces stratégies et expliquez la raison pour laquelle vous avez choisi cette stratégie particulière et expliquez comment vous allez mettre en œuvre cette stratégie et soyez très descriptif. C'est important : la stratégie de produit DOIT s'aligner sur le SUJET DE POSITIONNEMENT du sujet STP.
            
            Ne répétez pas les détails de l'entreprise.
            Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
            Générez une réponse en html entourant les sujets ${mark3TopicFR} avec la balise h5. 
            Commencez la complétion par "<h4>4P</h4>" suivi de "<h5>Stratégie de produit</h5>" ne répétez pas ces sujets : "<h4>4P</h4>" et "<h5>Stratégie de produit</h5>", à nouveau dans la complétion.
            génère tout en français
            Voici le ${mark3TopicFR} long, détaillé et laborieux que vous avez élaboré :`,
    es: `Usted es un consultor profesional y un cliente se acerca a usted para escribir una ${mark3TopicES} larga y detallada para un plan de negocios.

            Detalles del negocio:
            Detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
            Detalle del negocio 2: El tipo de negocio es ${businessType}. 
            Detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
            Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
            Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
        
            Estos son detalles de los productos o servicios del cliente. NO mencione productos o servicios adicionales que no estén listados aquí:
            ${productInfoPrompt}
            Estos detalles de productos o servicios DEBEN ser incluidos en la ${mark3TopicES}.
            
            use 500 palabras para generar la ${mark3TopicES}. 
            Estos son los temas que deben generarse: ${mark3TopicES}, no incluya otros temas a menos que se especifique aquí. Sea muy descriptivo al generar contenido para cada tema.
        
            ${customerPrompt}
        
            Para la estrategia de producto, describa el producto o servicio en detalle. Esto es importante: la estrategia de producto DEBE basarse en la descripción del grupo de clientes. La mejor estrategia de producto está alineada con la descripción del grupo de clientes. El tema de la estrategia de producto debe incluir lo siguiente Descripción del producto, Diferenciación del producto, Desarrollo del producto y Marca del producto. Estos temas deben empaquetarse en etiquetas <h6>.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            Para el tema de la estrategia de precios, hay 3 estrategias de precios principales: precios basados en el valor, precios basados en los costos y precios basados en la competencia. Seleccione una de estas estrategias y explique la razón por la que seleccionó esa estrategia en particular y explique cómo implementará esa estrategia y sea muy descriptivo. Esto es importante: la estrategia de producto DEBE alinearse con el TEMA DE POSICIONAMIENTO del tema STP.
            
            No repita los detalles del negocio.
            Escriba esto como si fuera el dueño del negocio, usando "nosotros" no use "yo".
            Genere una respuesta en html rodeando los temas ${mark3TopicES} con la etiqueta h5. 
            Comience la finalización con "<h4>4P</h4>" seguido de "<h5>Estrategia de producto</h5>" no repita estos temas: "<h4>4P</h4>" y "<h5>Estrategia de producto</h5>", de nuevo en la finalización.
            genera todo en español
            Esta es la ${mark3TopicES} larga, detallada y extensa que elaboró:`,
    it: `Sei un consulente professionista e un cliente si avvicina a te per scrivere una lunga e dettagliata ${mark3TopicIT} per un piano aziendale.

            dettagli aziendali:
            dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
            dettaglio aziendale 2: Il tipo di attività è ${businessType}. 
            dettaglio aziendale 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
            dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
            dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
        
            Questi sono i dettagli dei prodotti o servizi del cliente. NON menzionare prodotti o servizi aggiuntivi che non sono elencati qui:
            ${productInfoPrompt}
            Questi dettagli sui prodotti o servizi DEVONO essere inclusi nella ${mark3TopicIT}.
            
            usa 500 parole per generare ${mark3TopicIT}. 
            Questi sono gli argomenti che dovrebbero essere generati: ${mark3TopicIT}, non includere altri argomenti a meno che non siano specificati qui. Sii molto descrittivo nel generare contenuti per ogni argomento.
        
            ${customerPrompt}
        
            Per la strategia di prodotto, descrivere dettagliatamente il prodotto o il servizio. È importante: la strategia di prodotto DEVE basarsi sulla descrizione del gruppo di clienti. La migliore strategia di prodotto è allineata alla descrizione del gruppo di clienti. Il tema della strategia di prodotto deve includere i seguenti argomenti Descrizione del prodotto, Differenziazione del prodotto, Sviluppo del prodotto e Branding del prodotto. Questi argomenti devono essere racchiusi in tag <h6>.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            Per l'argomento della strategia di prezzo, ci sono 3 principali strategie di prezzo: prezzo basato sul valore, prezzo basato sui costi e prezzo basato sulla concorrenza. Seleziona una di queste strategie e spiega il motivo per cui hai scelto quella particolare strategia e spiega come implementerai quella strategia e sii molto descrittivo. Questo è importante: la strategia del prodotto DEVE allinearsi all'ARGOMENTO DI POSIZIONAMENTO dell'argomento STP.
            
            Non ripetere i dettagli aziendali.
            Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
            Genera una risposta in html circondando gli argomenti ${mark3TopicIT} con il tag h5. 
            Inizia il completamento con "<h4>4P</h4>" seguito da "<h5>Strategia di prodotto</h5>" non ripetere questi argomenti: "<h4>4P</h4>" e "<h5>Strategia di prodotto</h5>", di nuovo nel completamento.
            genera tutto in italiano
            Questa è la lunga, dettagliata e laboriosa ${mark3TopicIT} che hai elaborato:`,
    nl: `
            U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${mark3TopicNL} te schrijven voor een bedrijfsplan.
        
            bedrijfsdetails:
            bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
            bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
            bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
            bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
            bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
        
            Dit zijn details van de producten of diensten van de klant. VERMELD GEEN extra producten of diensten die hier niet worden vermeld:
            ${productInfoPrompt}
            Deze product- of dienstdetails MOETEN worden opgenomen in de ${mark3TopicNL}.
            
            gebruik 500 woorden om ${mark3TopicNL} te genereren. 
            Dit zijn de onderwerpen die gegenereerd moeten worden: ${mark3TopicNL}, voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van inhoud voor elk onderwerp.
        
            ${customerPrompt}
        
            Voor de productstrategie, beschrijf het product of de dienst in detail. Het is belangrijk: de productstrategie MOET gebaseerd zijn op de beschrijving van de klantengroep. De beste productstrategie is afgestemd op de beschrijving van de klantengroep. Het thema van de productstrategie moet de volgende onderwerpen bevatten Productbeschrijving, Productdifferentiatie, Productontwikkeling en Productbranding. Deze onderwerpen moeten worden ingesloten in <h6> tags.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            Voor het onderwerp Prijsstrategie zijn er 3 belangrijke prijsstrategieën: waardegebaseerde prijsstelling, kostengebaseerde prijsstelling en concurrentiegebaseerde prijsstelling. Selecteer een van deze strategieën en leg uit waarom u die specifieke strategie heeft gekozen en leg uit hoe u die strategie zult implementeren en wees zeer beschrijvend. Dit is belangrijk: de productstrategie MOET zich afstemmen op het POSITIONERINGSONDERWERP van het STP-onderwerp.
            
            Herhaal geen bedrijfsdetails.
            Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
            Genereer een reactie in html rond de onderwerpen ${mark3TopicNL} met de h5-tag. 
            Begin de voltooiing met "<h4>4P</h4>" gevolgd door "<h5>Productstrategie</h5>" herhaal deze onderwerpen niet: "<h4>4P</h4>" en "<h5>Productstrategie</h5>", opnieuw in de voltooiing.
            Genereer alles in het Nederlands.
            Dit is de lange, gedetailleerde en uitgebreide ${mark3TopicNL} die u heeft opgesteld:
            `,
    ja: `
            あなたはプロのコンサルタントで、顧客がビジネスプランのための長く詳細な${mark3TopicJA}を書くように依頼してきました。
        
            ビジネスの詳細:
            ビジネス詳細1: クライアントのビジネス名は${businessName}です。
            ビジネス詳細2: ビジネスのタイプは${businessType}です。
            ビジネス詳細3: これがビジネスの顧客がいる場所です: ${location}。
            ビジネス詳細4: クライアントの配布チャネルは: ${salesChannel}。
            ビジネス詳細5: クライアントのビジネス運営状況は${businessOperationalStatus}です。
        
            これらはクライアントの製品またはサービスの詳細です。ここに記載されていない追加の製品やサービスは言及しないでください:
            ${productInfoPrompt}
            これらの製品またはサービスの詳細は${mark3TopicJA}に必ず含める必要があります。
            
            ${customerPrompt}
        
            価格戦略のトピックには、価値ベースの価格設定、コストベースの価格設定、競争ベースの価格設定の3つの主要な価格戦略があります。これらの戦略のいずれかを選択し、その特定の戦略を選んだ理由と、その戦略をどのように実装するかを説明し、非常に詳細に説明してください。これは重要です: 製品戦略はSTPトピックのPOSITIONING TOPICに必ず合わせる必要があります。
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            価格戦略のトピックには、価値ベースの価格設定、コストベースの価格設定、競争ベースの価格設定の3つの主要な価格戦略があります。これらの戦略のいずれかを選択し、その特定の戦略を選んだ理由と、その戦略をどのように実装するかを説明し、非常に詳細に説明してください。これは重要です: 製品戦略はSTPトピックのPOSITIONING TOPICに必ず合わせる必要があります。
            
            ビジネスの詳細を繰り返さないでください。
            あなたがビジネスのオーナーであるかのように書き、"私たちは"を使い、"私は"を使わないでください。
            ${mark3TopicJA}のトピックをh5タグで囲んでHTMLのレスポンスを生成します。
            完成を"<h4>4P</h4>"で始め、次に"<h5>製品戦略</h5>"を続けます。これらのトピックを再度繰り返さないでください: "<h4>4P</h4>"と"<h5>製品戦略</h5>"。
            すべてを日本語で生成します。
            これがあなたが考え出した長く、詳細で、長い${mark3TopicJA}です:
            `,
    ar: `
            أنت مستشار محترف، ويقترب منك العميل لكتابة ${mark3TopicAR} طويلة ومفصلة لخطة العمل.
        
            تفاصيل العمل:
            تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
            تفاصيل العمل 2: نوع العمل هو ${businessType}.
            تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
            تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
            تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.
        
            هذه تفاصيل منتجات العميل أو الخدمات. لا تذكر منتجات أو خدمات إضافية غير مدرجة هنا:
            ${productInfoPrompt}
            يجب تضمين تفاصيل هذه المنتجات أو الخدمات في ${mark3TopicAR}.
            
            ${customerPrompt}
        
            بالنسبة لموضوع استراتيجية التسعير، هناك ثلاث استراتيجيات تسعير رئيسية: التسعير بناءً على القيمة، التسعير بناءً على التكلفة، والتسعير بناءً على المنافسة. اختر واحدة من هذه الاستراتيجيات واشرح السبب وراء اختيارك لهذه الاستراتيجية بالذات واشرح كيف ستطبق هذه الاستراتيجية وكن واضحًا جدًا. هذا مهم: يجب أن تتوافق استراتيجية المنتج مع موضوع POSITIONING من موضوع STP.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            بالنسبة لموضوع استراتيجية التسعير، هناك ثلاث استراتيجيات تسعير رئيسية: التسعير بناءً على القيمة، التسعير بناءً على التكلفة، والتسعير بناءً على المنافسة. اختر واحدة من هذه الاستراتيجيات واشرح السبب وراء اختيارك لهذه الاستراتيجية بالذات واشرح كيف ستطبق هذه الاستراتيجية وكن واضحًا جدًا. هذا مهم: يجب أن تتوافق استراتيجية المنتج مع موضوع POSITIONING من موضوع STP.
            
            لا تكرر تفاصيل العمل.
            اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" وليس "أنا".
            قم بإنشاء الرد في html محيطًا بمواضيع ${mark3TopicAR} بوسم h5.
            ابدأ الاكتمال بـ "<h4>4P</h4>" تليها "<h5>استراتيجية المنتج</h5>" لا تكرر هذا الموضوع: "<h4>4P</h4>" و "<h5>استراتيجية المنتج</h5>"، مرة أخرى في الاكتمال.
            أنشئ كل شيء باللغة العربية.
            هذا هو ${mark3TopicAR} الطويل والمفصل الذي أعددته:
            `,
    sv: `
            Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${mark3TopicSV} för en affärsplan.
        
            Affärsdetaljer:
            Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
            Affärsdetalj 2: Typen av verksamhet är ${businessType}.
            Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
            Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
            Affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.
        
            Detta är detaljer om kundens produkter eller tjänster. NÄMN INTE ytterligare produkter eller tjänster som inte listas här:
            ${productInfoPrompt}
            Dessa produkter eller tjänster detaljer MÅSTE inkluderas i ${mark3TopicSV}.
            
            använd 500 ord för att generera ${mark3TopicSV}. 
            Dessa är ämnet som ska genereras: ${mark3TopicSV}, inkludera inte andra ämnen om inte specificerat här. Var mycket beskrivande när du genererar innehåll för varje ämne.
        
              ${customerPrompt}
        
            För produktstrategin, beskriv produkten eller tjänsten i detalj. Det är viktigt: produktstrategin MÅSTE baseras på beskrivningen av kundgruppen. Den bästa produktstrategin är i linje med beskrivningen av kundgruppen. Temat för produktstrategin måste inkludera följande ämnen Produktbeskrivning, Produktdifferentiering, Produktutveckling och Produktvarumärkning. Dessa ämnen måste vara inneslutna i <h6> taggar.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            För prissättningsstrategiämnet finns det 3 stora prissättningsstrategier: värdebaserad prissättning, kostnadsbaserad prissättning och konkurrensbaserad prissättning. Välj en av dessa strategier och förklara anledningen till varför du valde den specifika strategin och förklara hur du kommer att implementera den strategin och var mycket beskrivande. Detta är viktigt: produktstrategin MÅSTE anpassa sig till POSITIONERINGSTEMAT från STP-ämnet.
            
            Upprepa inte affärsdetaljer.
            Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
            Generera svar i html omger ${mark3TopicSV} ämnen med h5 tagg. 
            Börja slutförandet med "<h4>4P</h4>" följt av "<h5>Produktstrategi</h5>" upprepa inte dessa ämnen: "<h4>4P</h4>" och "<h5>Produktstrategi</h5>", igen i slutförandet.
            Generera allt på svenska.
            Detta är den långa, detaljerade och långa ${mark3TopicSV} du kom upp med:
            `,
    fi: `
            Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark3TopicFI} liiketoimintasuunnitelmaan.
        
            liiketoiminnan tiedot:
            liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
            liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
            liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
            liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
            liiketoiminnan yksityiskohta 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.
        
            Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot. ÄLÄ mainitse muita tuotteita tai palveluita, jotka eivät ole lueteltu tässä:
            ${productInfoPrompt}
            Nämä tuotteiden tai palveluiden tiedot ON sisällytettävä ${mark3TopicFI}.
            
            käytä 500 sanaa generoidaksesi ${mark3TopicFI}. 
            Nämä ovat aihe, joka pitäisi generoida: ${mark3TopicFI}, älä sisällytä muita aiheita, ellei tässä ole määritetty. Ole erittäin kuvaileva generoidessasi sisältöä jokaiselle aiheelle.
        
              ${customerPrompt}
        
              Tuotestrategian osalta kuvaile tuotetta tai palvelua yksityiskohtaisesti. On tärkeää: tuotestrategian ON perustuttava asiakasryhmän kuvaamiseen. Paras tuotestrategia on linjassa asiakasryhmän kuvauksen kanssa. Tuotestrategian teeman on sisällettävä seuraavat aiheet Tuotteen kuvaus, Tuotteen erottaminen, Tuotekehitys ja Tuotemerkintä. Nämä aiheet on suljettava <h6> -tageihin.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            Hinnoittelustrategia-aiheessa on 3 suurta hinnoittelustrategiaa: arvopohjainen hinnoittelu, kustannuspohjainen hinnoittelu ja kilpailupohjainen hinnoittelu. Valitse yksi näistä strategioista ja selitä, miksi valitsit juuri kyseisen strategian, ja selitä, miten toteutat kyseisen strategian, ja ole erittäin kuvaileva. Tämä on tärkeää: tuotestrategian ON sopeuduttava STP-aiheen POSITIONOINTI-AIHEESEEN.
            
            Älä toista liiketoiminnan yksityiskohtia.
            Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
            Generoi vastaus html:ssä ympäröimällä ${mark3TopicFI} aiheet h5-tagilla. 
            Aloita täydennys "<h4>4P</h4>" seurattuna "<h5>Tuotestrategia</h5>", älä toista näitä aiheita: "<h4>4P</h4>" ja "<h5>Tuotestrategia</h5>", uudelleen täydennyksessä.
            Generoi kaikki suomeksi.
            Tämä on pitkä, yksityiskohtainen ja laaja ${mark3TopicFI}, jonka keksit:
            `,
    da: `
            Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mark3TopicDA} til en forretningsplan.
        
            forretningsdetaljer:
            forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
            forretningsdetalje 2: Virksomhedens type er ${businessType}. 
            forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
            forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
            forretningsdetalje 5: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
        
            Dette er detaljer om kundens produkter eller tjenester. NÆVN IKKE yderligere produkt eller tjenester, der ikke er opført her:
            ${productInfoPrompt}
            Disse produkter eller tjenester detaljer SKAL inkluderes i ${mark3TopicDA}.
            
            brug 500 ord til at generere ${mark3TopicDA}. 
            Dette er emnet, der skal genereres: ${mark3TopicDA}, inkluder ikke andre emner, medmindre det er specificeret her. Vær meget beskrivende i generering af indhold for hvert emne.
        
              ${customerPrompt}
        
              For produktstrategien, beskriv produktet eller tjenesten i detaljer. Det er vigtigt: produktstrategien SKAL være baseret på beskrivelsen af kundegruppen. Den bedste produktstrategi er i overensstemmelse med beskrivelsen af kundegruppen. Temaet for produktstrategien skal inkludere følgende emner Produktbeskrivelse, Produkt Differentiering, Produktudvikling og Produkt Branding. Disse emner skal være indkapslet i <h6> tags.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            For prisstrategi emnet, er der 3 store prisstrategier: værdibaseret prissætning, omkostningsbaseret prissætning og konkurrencebaseret prissætning. Vælg en af disse strategier og forklar årsagen til, hvorfor du valgte netop den strategi, og forklar, hvordan du vil implementere den strategi, og vær meget beskrivende. Dette er vigtigt: produktstrategien SKAL tilpasse sig POSITIONERINGSEMNET fra STP-emnet.
            
            Gentag ikke forretningsdetaljer.
            Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
            Generer svar i html omgivet ${mark3TopicDA} emner med h5 tag. 
            Begynd udfyldelsen med "<h4>4P</h4>" efterfulgt af "<h5>Produktstrategi</h5>" gentag ikke disse emner: "<h4>4P</h4>" og "<h5>Produktstrategi</h5>", igen i udfyldelsen.
            Generer alt på dansk.
            Dette er den lange, detaljerede og omfattende ${mark3TopicDA} du kom op med:
            `,
    no: `
            Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${mark3TopicNO} for en forretningsplan.
        
            forretningsdetaljer:
            forretningsdetalj 1: Kundens firmanavn er ${businessName}.
            forretningsdetalj 2: Typen virksomhet er ${businessType}. 
            forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
            forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
            forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.
        
            Dette er detaljer om kundens produkter eller tjenester. NEVN IKKE ytterligere produkt eller tjenester som ikke er oppført her:
            ${productInfoPrompt}
            Disse produktene eller tjenestene detaljer MÅ inkluderes i ${mark3TopicNO}.
            
            bruk 500 ord for å generere ${mark3TopicNO}. 
            Dette er emnet som skal genereres: ${mark3TopicNO}, inkluder ikke andre emner, med mindre det er spesifisert her. Vær veldig beskrivende i generering av innhold for hvert emne.
        
              ${customerPrompt}
        
            For produktstrategien, beskriv produktet eller tjenesten i detalj. Det er viktig: produktstrategien MÅ være basert på beskrivelsen av kundegruppen. Den beste produktstrategien er i samsvar med beskrivelsen av kundegruppen. Temaet for produktstrategien skal inkludere følgende emner Produktbeskrivelse, Produkt Differensiering, Produktutvikling og Produkt Branding. Disse emnene skal være innkapslet i <h6> tags.
            
            ${productDescriptionPrompt}
            
            ${productDifferentiationPrompt}
            
            ${productDevelopmentPrompt}
        
            ${productBrandingPrompt}
            
            For prissettingsstrategi emnet, er det 3 store prissettingsstrategier: verdi-basert prissetting, kostnadsbasert prissetting og konkurransebasert prissetting. Velg en av disse strategiene og forklar grunnen til at du valgte nettopp den strategien, og forklar hvordan du vil implementere den strategien, og vær veldig beskrivende. Dette er viktig: produktstrategien MÅ tilpasse seg POSISJONERINGSEMNET fra STP-emnet.
            
            Gjenta ikke forretningsdetaljer.
            Skriv dette som om du er eieren av virksomheten, bruk "vi", bruk ikke "jeg".
            Generer svar i html omgir ${mark3TopicNO} emner med h5 tag. 
            Begynn utfyllingen med "<h4>4P</h4>" etterfulgt av "<h5>Produktstrategi</h5>" gjenta ikke disse emnene: "<h4>4P</h4>" og "<h5>Produktstrategi</h5>", igjen i utfyllingen.
            Generer alt på norsk.
            Dette er den lange, detaljerte og omfattende ${mark3TopicNO} du kom opp med:
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
