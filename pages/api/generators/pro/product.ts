import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IProductPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;
  customerType: string;
  customerIncome1: string;
  customerIncome2: string;
  customerIncome3: string;
  customerDescription1: string;
  customerDescription2: string;
  customerDescription3: string;
  successFactors1: string;
  successFactors2: string;
  successFactors3: string;
  weakness1: string;
  weakness2: string;
  weakness3: string;
  initialInvestmentAmount: string;
  investmentItem1: string;
  investmentItem2: string;
  investmentItem3: string;
  firstYearRevenue: string;
  revenueGrowthRate: string;
  netProfitMargin: string;
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

export const productPro = (req: IProductPro) => {
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
    variantID,
    planQuota,
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
            prompt += `Klant's product of dienst #${i} Naam: ${productName}\n`;
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
            prompt += `Klant's product of dienst #${i} Beschrijving: ${productDescription}\n`;
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

  const targeting = mark2Ref.substring(mark2Ref.indexOf('<h5>Targeting</h5>'));
  const positioning = mark2Ref.substring(
    mark2Ref.indexOf('<h5>Positioning</h5>'),
  );

  function productDescription(planLanguage, productInfoPrompt) {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;
    let prompt = '';

    switch (planLanguage) {
      case 'de':
        prompt = `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktbeschreibung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktbeschreibung. Jede der ${productCount} Produktbeschreibungen sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`;
        break;
      case 'fr':
        prompt = `S'il y a ${productCount} produits, alors dans le sujet de la description du produit, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de description du produit. Chacune des ${productCount} descriptions de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`;
        break;
      case 'es':
        prompt = `Si hay ${productCount} productos, entonces en el tema de la descripción del producto, debería haber detalles sobre ${productCount} productos, pero solo un tema de descripción del producto. Cada una de las ${productCount} descripciones de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`;
        break;
      case 'it':
        prompt = `Se ci sono ${productCount} prodotti, allora nell'argomento della descrizione del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di descrizione del prodotto. Ciascuna delle ${productCount} descrizioni del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`;
        break;
      case 'nl':
        prompt = `Als er ${productCount} producten zijn, dan zou er in het onderwerp productbeschrijving detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productbeschrijving. Elk van de ${productCount} productbeschrijvingen moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`;
        break;
      case 'ja':
        prompt = `製品が${productCount}つある場合、製品説明のトピックでは、${productCount}つの製品の詳細があるべきですが、製品説明のトピックは1つだけです。${productCount}つの製品説明のそれぞれは<li>タグでラップされ、各<li>タグには各製品の具体的な説明があり、非常に洞察に富んでいます。表現に繰り返しがないように注意してください。`;
        break;
      case 'ar':
        prompt = `إذا كان هناك ${productCount} منتجات، ففي موضوع وصف المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع وصف المنتج واحد فقط. يجب أن تكون كل واحدة من أوصاف المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون ذا بصيرة كبيرة. حاول ألا تكون مكررا في صياغتك.`;
        break;
      case 'sv':
        prompt = `Om det finns ${productCount} produkter, bör det i produktbeskrivningstemat finnas detaljer om ${productCount} produkter, men endast ett produktbeskrivningstema. Var och en av de ${productCount} produktbeskrivningarna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, vara mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`;
        break;
      case 'fi':
        prompt = `Jos tuotteita on ${productCount}, tuotekuvausaiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotekuvausaihe. Jokaisen ${productCount} tuotekuvauksen tulisi olla <li> -tagissa ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, olla erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`;
        break;
      case 'da':
        prompt = `Hvis der er ${productCount} produkter, skal der i produktbeskrivelse emnet være detaljer om ${productCount} produkter, men kun et produktbeskrivelse emne. Hver af de ${productCount} produktbeskrivelser skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, være meget indsigtsfuld. Prøv ikke at være gentagende i din formulering.`;
        break;
      case 'no':
        prompt = `Hvis det er ${productCount} produkter, bør det i produktbeskrivelsestemaet være detaljer om ${productCount} produkter, men bare ett produktbeskrivelsestema. Hver av de ${productCount} produktbeskrivelsene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, være veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`;
        break;
      default:
        prompt = `If there are ${productCount} products, then in the product description topic, there should be detail on ${productCount} products, but only one product description topic. Each of the ${productCount} product descriptions should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`;
    }

    return prompt;
  }

  function productDifferentiation(planLanguage, productInfoPrompt) {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;
    let prompt = '';

    switch (planLanguage) {
      case 'de':
        prompt = `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktdifferenzierung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktdifferenzierung. Jede der ${productCount} Produktdifferenzierungsstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`;
        break;
      case 'fr':
        prompt = `S'il y a ${productCount} produits, alors dans le sujet de la différenciation des produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de différenciation des produits. Chacune des ${productCount} stratégies de différenciation de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`;
        break;
      case 'es':
        prompt = `Si hay ${productCount} productos, entonces en el tema de la diferenciación de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de diferenciación de productos. Cada una de las ${productCount} estrategias de diferenciación de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`;
        break;
      case 'it':
        prompt = `Se ci sono ${productCount} prodotti, allora nell'argomento della differenziazione del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di differenziazione del prodotto. Ciascuna delle ${productCount} strategie di differenziazione del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`;
        break;
      case 'nl':
        prompt = `Als er ${productCount} producten zijn, dan zou er in het onderwerp productdifferentiatie detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productdifferentiatie. Elk van de ${productCount} productdifferentiatiestrategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`;
        break;
      case 'ja':
        prompt = `製品が${productCount}つある場合、製品差別化のトピックでは、${productCount}つの製品の詳細があるべきですが、製品差別化のトピックは1つだけです。${productCount}つの製品差別化戦略のそれぞれは<li>タグでラップされ、各<li>タグには各製品の具体的な説明があり、非常に洞察に富んでいます。表現に繰り返しがないように注意してください。`;
        break;
      case 'ar':
        prompt = `إذا كان هناك ${productCount} منتجات، ففي موضوع تمييز المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع تمييز المنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات تمييز المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون ذا بصيرة كبيرة. حاول ألا تكون مكررا في صياغتك.`;
        break;
      case 'sv':
        prompt = `Om det finns ${productCount} produkter, bör det i produktbeskrivningstemat finnas detaljer om ${productCount} produkter, men endast ett produktbeskrivningstema. Var och en av de ${productCount} produktbeskrivningarna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, vara mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`;
        break;
      case 'fi':
        prompt = `Jos tuotteita on ${productCount}, tuotekuvausaiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotekuvausaihe. Jokaisen ${productCount} tuotekuvauksen tulisi olla <li> -tagissa ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, olla erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`;
        break;
      case 'da':
        prompt = `Hvis der er ${productCount} produkter, skal der i produktbeskrivelse emnet være detaljer om ${productCount} produkter, men kun et produktbeskrivelse emne. Hver af de ${productCount} produktbeskrivelser skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivning af hvert produkt, være meget indsigtsfuld. Prøv ikke at være gentagende i din formulering.`;
        break;
      case 'no':
        prompt = `Hvis det er ${productCount} produkter, bør det i produktbeskrivelsestemaet være detaljer om ${productCount} produkter, men bare ett produktbeskrivelsestema. Hver av de ${productCount} produktbeskrivelsene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, være veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`;
        break;
      default:
        prompt = `If there are ${productCount} products, then in the product differentiation topic, there should be detail on ${productCount} products, but only one product differentiation topic. Each of the ${productCount} product differentiation strategies should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`;
    }

    return prompt;
  }

  function productDevelopment(planLanguage, productInfoPrompt) {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;
    let prompt = '';

    switch (planLanguage) {
      case 'de':
        prompt = `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktentwicklung Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktentwicklung. Jede der ${productCount} Produktentwicklungsstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`;
        break;
      case 'fr':
        prompt = `S'il y a ${productCount} produits, alors dans le sujet du développement de produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de développement de produits. Chacune des ${productCount} stratégies de développement de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`;
        break;
      case 'es':
        prompt = `Si hay ${productCount} productos, entonces en el tema del desarrollo de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de desarrollo de productos. Cada una de las ${productCount} estrategias de desarrollo de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`;
        break;
      case 'it':
        prompt = `Se ci sono ${productCount} prodotti, allora nell'argomento dello sviluppo del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di sviluppo del prodotto. Ciascuna delle ${productCount} strategie di sviluppo del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`;
        break;
      case 'nl':
        prompt = `Als er ${productCount} producten zijn, dan zou er in het onderwerp productontwikkeling detail moeten zijn over ${productCount} producten, maar slechts één onderwerp productontwikkeling. Elk van de ${productCount} productontwikkelingsstrategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`;
        break;
      case 'ja':
        prompt = `製品が${productCount}つある場合、製品開発のトピックでは、${productCount}つの製品の詳細があるべきですが、製品開発のトピックは1つだけです。${productCount}つの製品開発戦略のそれぞれは<li>タグでラップされ、各<li>タグには各製品の具体的な説明があり、非常に洞察に富んでいます。表現に繰り返しがないように注意してください。`;
        break;
      case 'ar':
        prompt = `إذا كان هناك ${productCount} منتجات، ففي موضوع تطوير المنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع تطوير المنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات تطوير المنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون ذا بصيرة كبيرة. حاول ألا تكون مكررا في صياغتك.`;
        break;
      case 'sv':
        prompt = `Om det finns ${productCount} produkter, bör det i produktutvecklingsämnet finnas detaljer om ${productCount} produkter, men bara ett ämne för produktutveckling. Var och en av de ${productCount} produktutvecklingsstrategierna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`;
        break;
      case 'fi':
        prompt = `Jos tuotteita on ${productCount}, tuotekehitysaiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotekehitysaihe. Jokaisen ${productCount} tuotekehitysstrategian tulisi olla kääritty <li> -tagiin ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`;
        break;
      case 'da':
        prompt = `Hvis der er ${productCount} produkter, skal der i emnet for produktudvikling være detaljer om ${productCount} produkter, men kun et emne for produktudvikling. Hver af de ${productCount} produktudviklingsstrategier skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, meget indsigtsfuldt. Prøv ikke at være gentagende i din formulering.`;
        break;
      case 'no':
        prompt = `Hvis det er ${productCount} produkter, bør det i produktutviklingsemnet være detaljer om ${productCount} produkter, men bare ett emne for produktutvikling. Hver av de ${productCount} produktutviklingsstrategiene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`;
        break;
      default:
        prompt = `If there are ${productCount} products, then in the product development topic, there should be detail on ${productCount} products, but only one product development topic. Each of the ${productCount} product development strategies should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`;
    }

    return prompt;
  }

  function productBranding(planLanguage, productInfoPrompt) {
    const productCount = (productInfoPrompt.match(/Name:/g) || []).length;
    let prompt = '';

    switch (planLanguage) {
      case 'de':
        prompt = `Wenn es ${productCount} Produkte gibt, dann sollte im Thema Produktbranding Detail zu ${productCount} Produkten geben, aber nur ein Thema Produktbranding. Jede der ${productCount} Produktbrandingstrategien sollte in einem <li> Tag eingewickelt sein und in jedem <li> Tag sollte eine spezifische Beschreibung jedes Produkts sein, sehr aufschlussreich. Versuchen Sie, in Ihrer Wortwahl nicht wiederholend zu sein.`;
        break;
      case 'fr':
        prompt = `S'il y a ${productCount} produits, alors dans le sujet de la marque de produits, il devrait y avoir des détails sur ${productCount} produits, mais un seul sujet de marque de produits. Chacune des ${productCount} stratégies de marque de produits doit être enveloppée dans une balise <li> et dans chaque balise <li> il doit y avoir une description spécifique de chaque produit, très perspicace. Essayez de ne pas être répétitif dans votre formulation.`;
        break;
      case 'es':
        prompt = `Si hay ${productCount} productos, entonces en el tema de la marca de productos, debería haber detalles sobre ${productCount} productos, pero solo un tema de marca de productos. Cada una de las ${productCount} estrategias de marca de productos debe estar envuelta en una etiqueta <li> y en cada etiqueta <li> debe haber una descripción específica de cada producto, muy perspicaz. Intenta no ser repetitivo en tu redacción.`;
        break;
      case 'it':
        prompt = `Se ci sono ${productCount} prodotti, allora nell'argomento del branding del prodotto, dovrebbero esserci dettagli su ${productCount} prodotti, ma solo un argomento di branding del prodotto. Ciascuna delle ${productCount} strategie di branding del prodotto dovrebbe essere avvolta in un tag <li> e in ogni tag <li> dovrebbe esserci una descrizione specifica di ogni prodotto, molto perspicace. Cerca di non essere ripetitivo nella tua formulazione.`;
        break;
      case 'nl':
        prompt = `Als er ${productCount} producten zijn, dan zou er in het onderwerp product branding detail moeten zijn over ${productCount} producten, maar slechts één onderwerp product branding. Elk van de ${productCount} product branding strategieën moet worden ingepakt in een <li> tag en in elke <li> tag moet er een specifieke beschrijving van elk product zijn, zeer inzichtelijk. Probeer niet repetitief te zijn in je formulering.`;
        break;
      case 'ja':
        prompt = `製品が${productCount}つある場合、製品ブランディングのトピックでは、${productCount}つの製品の詳細があるべきですが、製品ブランディングのトピックは1つだけです。${productCount}つの製品ブランディング戦略のそれぞれは<li>タグでラップされ、各<li>タグには各製品の具体的な説明があり、非常に洞察に富んでいます。表現に繰り返しがないように注意してください。`;
        break;
      case 'ar':
        prompt = `إذا كان هناك ${productCount} منتجات، ففي موضوع العلامة التجارية للمنتج، يجب أن يكون هناك تفاصيل حول ${productCount} منتجات، ولكن موضوع العلامة التجارية للمنتج واحد فقط. يجب أن تكون كل واحدة من استراتيجيات العلامة التجارية للمنتج ${productCount} مغلفة في علامة <li> وفي كل علامة <li> يجب أن يكون هناك وصف محدد لكل منتج، يكون ذا بصيرة كبيرة. حاول ألا تكون مكررا في صياغتك.`;
        break;
      case 'sv':
        prompt = `Om det finns ${productCount} produkter, bör det i produktvarumärkesämnet finnas detaljer om ${productCount} produkter, men bara ett ämne för produktvarumärke. Var och en av de ${productCount} produktvarumärkesstrategierna bör vara innesluten i en <li> tagg och i varje <li> tagg bör det finnas en specifik beskrivning av varje produkt, mycket insiktsfull. Försök att inte vara repetitiv i ditt formulering.`;
        break;
      case 'fi':
        prompt = `Jos tuotteita on ${productCount}, tuotemerkkiaiheessa tulisi olla yksityiskohtia ${productCount} tuotteesta, mutta vain yksi tuotemerkkiaihe. Jokaisen ${productCount} tuotemerkkistrategian tulisi olla kääritty <li> -tagiin ja jokaisessa <li> -tagissa tulisi olla kunkin tuotteen erityinen kuvaus, erittäin oivaltava. Yritä olla toistamatta sanavalintojasi.`;
        break;
      case 'da':
        prompt = `Hvis der er ${productCount} produkter, skal der i emnet for produkt branding være detaljer om ${productCount} produkter, men kun et emne for produkt branding. Hver af de ${productCount} produkt branding strategier skal være indpakket i en <li> tag, og i hver <li> tag skal der være en specifik beskrivelse af hvert produkt, meget indsigtsfuldt. Prøv ikke at være gentagende i din formulering.`;
        break;
      case 'no':
        prompt = `Hvis det er ${productCount} produkter, bør det i produktmerkevareemnet være detaljer om ${productCount} produkter, men bare ett emne for produktmerkevare. Hver av de ${productCount} produktmerkevarestrategiene skal være innpakket i en <li> tag, og i hver <li> tag skal det være en spesifikk beskrivelse av hvert produkt, veldig innsiktsfull. Prøv å ikke være repetitiv i formuleringen din.`;
        break;
      default:
        prompt = `If there are ${productCount} products, then in the product branding topic, there should be detail on ${productCount} products, but only one product branding topic. Each of the ${productCount} product branding strategy should be wrapped in a <li> tag and in each <li> tag there should be a specific description of each product, be very insightful. Try not to be repetitive in your wording.`;
    }

    return prompt;
  }

  const productDescriptionPrompt = productDescription(
    planLanguage,
    productInfoPrompt,
  );
  const productDifferentiationPrompt = productDifferentiation(
    planLanguage,
    productInfoPrompt,
  );
  const productDevelopmentPrompt = productDevelopment(
    planLanguage,
    productInfoPrompt,
  );
  const productBrandingPrompt = productBranding(
    planLanguage,
    productInfoPrompt,
  );

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

  const promptTopic = {
    en: 'Product Strategy',
    de: 'Produktstrategie',
    fr: 'Stratégie de produit',
    es: 'Estrategia de producto',
    it: 'Strategia del prodotto',
    nl: 'Productstrategie',
    ja: '製品戦略',
    ar: 'استراتيجية المنتج',
    sv: 'Produktstrategi',
    fi: 'Tuotekehitys',
    da: 'Produktstrategi',
    no: 'Produktstrategi',
  };

  const prompt = {
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services. DO NOT mention additional product or services that are not listed here:
    ${productInfoPrompt}
    These products or services details MUST be included in the ${promptTopic.en}.
    
    for both ${promptTopic.en}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}
    Keep this targeting and positioning data in mind but DO NOT repeat this data in your response.

    For product strategy, describe the product or service in detail. This is Important: product strategy MUST align itself to the positioning data. The best product strategy aligns with positioning. Product Strategy topic should include: product description, product differentiation, product development, and product branding. These topics should be wrapped in <h6> tags. Each topic should describe each product or service in detail. For example, if there are 3 products or services, there should be 3 product descriptions, 3 product differentiations, 3 product developments, and 3 product brandings. Be insightful and descriptive. there should be only one product description, product differentiation, product development, and product branding topic each and in each topic there should be details on multiple products. 
    
    ${productDescriptionPrompt}
    
    ${productDifferentiationPrompt}
    
    ${productDevelopmentPrompt}

    ${productBrandingPrompt}
    
    This is Important: product strategy MUST align itself to the POSITIONING TOPIC from the STP topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${promptTopic.en} topics with h5 tag. 
    Begin the completion with "<h4>4P</h4>" followed by "<h5>Product Strategy</h5>" don't repeat these topic: "<h4>4P</h4>" and "<h5>Product Strategy</h5>", again in the completion.
    Don't use " " in completion.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    //english lang-----------------------------------------------------------------------
    en: `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services. DO NOT mention additional product or services that are not listed here:
    ${productInfoPrompt}
    These products or services details MUST be included in the ${promptTopic.en}.
    
    for both ${promptTopic.en}, you MUST consider this targeting and postioning data:
    This is the targeting data: ${targeting}
    This is the positioning data: ${positioning}
    Keep this targeting and positioning data in mind but DO NOT repeat this data in your response.

    For product strategy, describe the product or service in detail. This is Important: product strategy MUST align itself to the positioning data. The best product strategy aligns with positioning. Product Strategy topic should include: product description, product differentiation, product development, and product branding. These topics should be wrapped in <h6> tags. Each topic should describe each product or service in detail. For example, if there are 3 products or services, there should be 3 product descriptions, 3 product differentiations, 3 product developments, and 3 product brandings. Be insightful and descriptive. there should be only one product description, product differentiation, product development, and product branding topic each and in each topic there should be details on multiple products. 
    
    ${productDescriptionPrompt}
    
    ${productDifferentiationPrompt}
    
    ${productDevelopmentPrompt}

    ${productBrandingPrompt}
    
    This is Important: product strategy MUST align itself to the POSITIONING TOPIC from the STP topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${promptTopic.en} topics with h5 tag. 
    Begin the completion with "<h4>4P</h4>" followed by "<h5>Product Strategy</h5>" don't repeat these topic: "<h4>4P</h4>" and "<h5>Product Strategy</h5>", again in the completion.
    Don't use " " in completion.
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang---------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt zu Ihnen, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu schreiben.

    Geschäftsdetails:
    Geschäftsdetail 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Einzelheiten zu den Produkten oder Dienstleistungen des Kunden. Nennen Sie KEINE zusätzlichen Produkte oder Dienstleistungen, die hier nicht aufgeführt sind:
    ${productInfoPrompt}
    Diese Produkt- oder Dienstleistungsdetails MÜSSEN in den ${promptTopic.de} aufgenommen werden.
    
    customer group details:
    ${customerPrompt}

    Für die Produktstrategie beschreiben Sie das Produkt oder die Dienstleistung im Detail. Dies ist wichtig: Die Produktstrategie MUSS sich an den Positionierungsdaten orientieren. Die beste Produktstrategie ist auf die Positionierung abgestimmt. Das Thema Produktstrategie sollte Folgendes umfassen: Produktbeschreibung, Produktdifferenzierung, Produktentwicklung und Produktbranding. Diese Themen sollten in <h6>-Tags verpackt werden. Jedes Thema sollte jedes Produkt oder jede Dienstleistung detailliert beschreiben. Wenn es zum Beispiel 3 Produkte oder Dienstleistungen gibt, sollte es 3 Produktbeschreibungen, 3 Produktdifferenzierungen, 3 Produktentwicklungen und 3 Produktbrandings geben. Seien Sie aufschlussreich und anschaulich. Es sollte jeweils nur ein Thema für die Produktbeschreibung, die Produktdifferenzierung, die Produktentwicklung und das Produkt-Branding geben, und in jedem Thema sollten Einzelheiten zu mehreren Produkten enthalten sein. 
    
    ${productDescriptionPrompt}
    
    ${productDifferentiationPrompt}
    
    ${productDevelopmentPrompt}

    ${productBrandingPrompt}
    
    Dies ist wichtig: Die Produktstrategie MUSS sich am POSITIONIERUNGSTHEMA aus dem STP-Thema orientieren.
    
    Wiederholen Sie keine geschäftlichen Details.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
    Erzeugen Sie eine Antwort in html, die die ${promptTopic.de}-Themen mit dem h5-Tag umgibt. 
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags..
    Verwenden Sie kein " " in der Vervollständigung.
    Fertigstellung auf Deutsch generieren.
    
    Dies ist das lange, detaillierte und ausführliche ${promptTopic.de}, das du dir ausgedacht hast:
  `,
    //french lang---------------------------------------------------------------------
    fr: `
    Vous êtes un conseiller professionnel et un client vient à vous pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

  Détails de l'entreprise :
  Détail d'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
  Détail d'entreprise 2 : Le type d'entreprise est ${businessType}.
  Détail d'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  Détail d'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
  Détail d'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les détails des produits ou services du client. NE mentionnez PAS d'autres produits ou services qui ne sont pas listés ici :
  ${productInfoPrompt}
  Ces détails de produit ou service DOIVENT être inclus dans le ${promptTopic.fr}.

  Détails du groupe de clients :
  ${customerPrompt}

  Pour la stratégie produit, décrivez le produit ou le service en détail. C'est important : La stratégie produit DOIT être alignée sur les données de positionnement. La meilleure stratégie produit est celle qui est en adéquation avec le positionnement. Le sujet de la stratégie produit devrait inclure : description du produit, différenciation du produit, développement du produit et branding du produit. Ces sujets doivent être enveloppés dans des balises <h6>. Chaque sujet doit décrire en détail chaque produit ou service. Par exemple, s'il y a 3 produits ou services, il devrait y avoir 3 descriptions de produits, 3 différenciations de produits, 3 développements de produits et 3 brandings de produits. Soyez perspicace et descriptif. Il devrait y avoir un seul sujet pour la description du produit, la différenciation du produit, le développement du produit et le branding du produit, et chaque sujet devrait inclure des détails sur plusieurs produits.

  ${productDescriptionPrompt}

  ${productDifferentiationPrompt}

  ${productDevelopmentPrompt}

  ${productBrandingPrompt}

  C'est important : La stratégie produit DOIT s'aligner sur le THÈME DE POSITIONNEMENT du sujet STP.

  Ne répétez pas les détails de l'entreprise.
  Rédigez cela comme si vous étiez le propriétaire de l'entreprise, utilisez "nous" et non "je".
  Générez une réponse en html qui entoure les sujets de ${promptTopic.fr} avec la balise h5.
  Commencez par "<h4>4P</h4>" suivi de "<h5>Stratégie produit</h5>". Ne répétez pas ces thèmes : "<h4>4P</h4>" et "<h5>Stratégie produit</h5>", à nouveau dans la complétion.
  N'utilisez pas de " " dans la complétion.
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang---------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocios.

  Detalles del negocio:
  Detalle del negocio 1: El nombre de la empresa del cliente es ${businessName}.
  Detalle del negocio 2: El tipo de negocio es ${businessType}.
  Detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
  Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
  Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

  Estos son detalles de los productos o servicios del cliente. NO mencione productos o servicios adicionales que no estén listados aquí:
  ${productInfoPrompt}
  Estos detalles del producto o servicio DEBEN incluirse en el ${promptTopic.es}.

  Detalles del grupo de clientes:
  ${customerPrompt}

  Para la estrategia de producto, describa el producto o servicio en detalle. Esto es importante: La estrategia de producto DEBE alinearse con los datos de posicionamiento. La mejor estrategia de producto es la que está en sintonía con el posicionamiento. El tema de estrategia de producto debe incluir: descripción del producto, diferenciación del producto, desarrollo del producto y branding del producto. Estos temas deben estar envueltos en etiquetas <h6>. Cada tema debe describir detalladamente cada producto o servicio. Por ejemplo, si hay 3 productos o servicios, debe haber 3 descripciones de productos, 3 diferenciaciones de productos, 3 desarrollos de productos y 3 branding de productos. Sea perspicaz y descriptivo. Debe haber solo un tema para la descripción del producto, la diferenciación del producto, el desarrollo del producto y el branding del producto, y cada tema debe incluir detalles sobre varios productos.

  ${productDescriptionPrompt}

  ${productDifferentiationPrompt}

  ${productDevelopmentPrompt}

  ${productBrandingPrompt}

  Esto es importante: La estrategia de producto DEBE alinearse con el TEMA DE POSICIONAMIENTO del tema STP.

  No repita los detalles del negocio.
  Escriba esto como si fuera el propietario del negocio, use "nosotros" y no "yo".
  Genere una respuesta en html que envuelva los temas de ${promptTopic.es} con la etiqueta h5.
  Comience con "<h4>4P</h4>" seguido de "<h5>Estrategia de producto</h5>". No repita estos temas: "<h4>4P</h4>" y "<h5>Estrategia de producto</h5>", de nuevo en la completación.
  No use " " en la completación.
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
  Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang---------------------------------------------------------------------
    it: `
    Lei è un consulente professionale e un cliente si rivolge a lei per scrivere un ${promptTopic.it} lungo e dettagliato per un piano di business.

    Dettagli aziendali:
    Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
    Dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
    Dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    Dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono dettagli sui prodotti o servizi del cliente. NON menzionare prodotti o servizi aggiuntivi che non sono elencati qui:
    ${productInfoPrompt}
    Questi dettagli del prodotto o servizio DEVONO essere inclusi nel ${promptTopic.it}.

    Dettagli del gruppo di clienti:
    ${customerPrompt}

    Per la strategia di prodotto, descriva in dettaglio il prodotto o servizio. Questo è importante: La strategia di prodotto DEVE allinearsi con i dati di posizionamento. La migliore strategia di prodotto è quella allineata con il posizionamento. L'argomento della strategia di prodotto dovrebbe includere: descrizione del prodotto, differenziazione del prodotto, sviluppo del prodotto e branding del prodotto. Questi argomenti dovrebbero essere racchiusi in tag <h6>. Ogni argomento dovrebbe descrivere dettagliatamente ogni prodotto o servizio. Ad esempio, se ci sono 3 prodotti o servizi, dovrebbero esserci 3 descrizioni di prodotti, 3 differenziazioni di prodotti, 3 sviluppi di prodotti e 3 branding di prodotti. Sia perspicace e descrittivo. Dovrebbe esserci solo un argomento per la descrizione del prodotto, la differenziazione del prodotto, lo sviluppo del prodotto e il branding del prodotto, e ogni argomento dovrebbe contenere dettagli su più prodotti.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Questo è importante: La strategia di prodotto DEVE allinearsi con il TEMA DI POSIZIONAMENTO del tema STP.

    Non ripeta i dettagli aziendali.
    Scriva come se fosse il proprietario dell'azienda, usi "noi" e non "io".
    Generi una risposta in html che avvolga i temi di ${promptTopic.it} con il tag h5.
    Inizi con "<h4>4P</h4>" seguito da "<h5>Strategia di prodotto</h5>". Non ripeta questi temi: "<h4>4P</h4>" e "<h5>Strategia di prodotto</h5>", di nuovo nella completazione.
    Non usi " " nella completazione.
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
    Genera tutto in italiano.
    Questo è importante: Sii molto perspicace nella tua risposta.
    Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    //dutch lang---------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant. Vermeld GEEN extra producten of diensten die hier niet worden vermeld:
    ${productInfoPrompt}
    Deze product- of dienstdetails MOETEN worden opgenomen in de ${promptTopic.nl}.

    Klantgroepgegevens:
    ${customerPrompt}

    Voor productstrategie, beschrijf het product of de dienst in detail. Dit is belangrijk: de productstrategie MOET zich afstemmen op de positioneringsgegevens. De beste productstrategie stemt overeen met positionering. Het onderwerp productstrategie moet omvatten: productbeschrijving, productdifferentiatie, productontwikkeling en productbranding. Deze onderwerpen moeten worden ingesloten in <h6> tags. Elk onderwerp moet elk product of elke dienst in detail beschrijven. Bijvoorbeeld, als er 3 producten of diensten zijn, moeten er 3 productbeschrijvingen, 3 productdifferentiaties, 3 productontwikkelingen en 3 productbrandings zijn. Wees inzichtelijk en beschrijvend. Er moet slechts één onderwerp zijn voor productbeschrijving, productdifferentiatie, productontwikkeling en productbranding, en in elk onderwerp moeten er details zijn over meerdere producten.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Dit is belangrijk: de productstrategie MOET zich afstemmen op het POSITIONERINGSONDERWERP uit het STP-onderwerp.

    Herhaal geen bedrijfsdetails.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Genereer een reactie in html die de onderwerpen van ${promptTopic.nl} omringt met de h5-tag.
    Begin de voltooiing met "<h4>4P</h4>" gevolgd door "<h5>Productstrategie</h5>" herhaal deze onderwerpen: "<h4>4P</h4>" en "<h5>Productstrategie</h5>", niet opnieuw in de voltooiing.
    Gebruik geen " " in de voltooiing.
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang---------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントであり、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：これがビジネスの顧客がいる場所です：${location}。
    ビジネス詳細4：クライアントの配布チャネルは：${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運用状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です。ここに記載されていない追加の製品やサービスは言及しないでください：
    ${productInfoPrompt}
    これらの製品またはサービスの詳細は${promptTopic.ja}に必ず含める必要があります。

    ${customerPrompt}

    製品戦略については、製品またはサービスを詳細に説明します。これは重要です：製品戦略は必ずポジショニングデータに合わせる必要があります。最良の製品戦略はポジショニングに合わせます。製品戦略のトピックには、製品の説明、製品の差別化、製品の開発、製品のブランディングを含める必要があります。これらのトピックは<h6>タグで囲む必要があります。各トピックは各製品またはサービスを詳細に説明する必要があります。例えば、製品またはサービスが3つある場合、製品の説明、製品の差別化、製品の開発、製品のブランディングはそれぞれ3つあるべきです。洞察に富んでいて説明的であること。製品の説明、製品の差別化、製品の開発、製品のブランディングのトピックはそれぞれ1つだけで、各トピックには複数の製品の詳細があるべきです。

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    これは重要です：製品戦略は必ずSTPトピックのPOSITIONING TOPICに合わせる必要があります。

    ビジネスの詳細を繰り返さないでください。
    あなたがビジネスのオーナーであるかのように書き、"we"を使用し、"I"を使用しないでください。
    ${promptTopic.ja}のトピックをh5タグで囲んだhtmlのレスポンスを生成します。
    完成を"<h4>4P</h4>"に続いて"<h5>製品戦略</h5>"で始め、これらのトピック"<h4>4P</h4>"と"<h5>製品戦略</h5>"を完成の中で再度繰り返さないでください。
    完成の中で" "を使用しないでください。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang---------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} طويلة ومفصلة لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل. لا تذكر منتجات أو خدمات إضافية غير مدرجة هنا:
    ${productInfoPrompt}
    يجب تضمين تفاصيل هذه المنتجات أو الخدمات في ${promptTopic.ar}.


    ${customerPrompt}

    بالنسبة لاستراتيجية المنتج، قم بوصف المنتج أو الخدمة بالتفصيل. هذا مهم: يجب أن تتوافق استراتيجية المنتج مع بيانات التموضع. أفضل استراتيجية للمنتج تتوافق مع التموضع. يجب أن تتضمن موضوع استراتيجية المنتج: وصف المنتج، تمييز المنتج، تطوير المنتج، وتوجيه العلامة التجارية للمنتج. يجب أن تكون هذه المواضيع محاطة بعلامات <h6>. يجب أن يصف كل موضوع كل منتج أو خدمة بالتفصيل. على سبيل المثال، إذا كان هناك 3 منتجات أو خدمات، يجب أن يكون هناك 3 أوصاف للمنتج، 3 تمييزات للمنتج، 3 تطورات للمنتج، و3 توجيهات للعلامة التجارية للمنتج. كن ثاقب البصيرة وواضح الوصف. يجب أن يكون هناك موضوع واحد فقط لكل من وصف المنتج، تمييز المنتج، تطوير المنتج، وتوجيه العلامة التجارية للمنتج وفي كل موضوع يجب أن يكون هناك تفاصيل عن منتجات متعددة.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    هذا مهم: يجب أن تتوافق استراتيجية المنتج مع موضوع التموضع من موضوع STP.

    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    قم بتوليد الرد باللغة العربية محيطًا بمواضيع ${promptTopic.ar} بوسم h5.
    ابدأ الاكتمال بـ "<h4>4P</h4>" تليها "<h5>استراتيجية المنتج</h5>" لا تكرر هذه الموضوعات: "<h4>4P</h4>" و"<h5>استراتيجية المنتج</h5>"، مرة أخرى في الاكتمال.
    لا تستخدم " " في الاكتمال.
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang---------------------------------------------------------------------
    sv: `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}.
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens operativa affärsstatus är ${businessOperationalStatus}.

    Detta är detaljer om kundens produkter eller tjänster. NÄMN INTE ytterligare produkter eller tjänster som inte listas här:
    ${productInfoPrompt}
    Dessa produkter eller tjänster detaljer MÅSTE ingå i ${promptTopic.sv}.

    ${customerPrompt}

    För produktstrategi, beskriv produkten eller tjänsten i detalj. Detta är viktigt: produktstrategin MÅSTE anpassa sig till positioneringsdata. Den bästa produktstrategin anpassar sig till positionering. Produktstrategiämnet bör inkludera: produktbeskrivning, produktdifferentiering, produktutveckling och produktvarumärkning. Dessa ämnen bör vara inneslutna i <h6> taggar. Varje ämne bör beskriva varje produkt eller tjänst i detalj.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Detta är viktigt: produktstrategin MÅSTE anpassa sig till POSITIONERINGSTEMAT från STP-ämnet.

    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägare till företaget, använd "vi" använd inte "jag".
    Generera svar i html som omger ${promptTopic.sv} ämnen med h5 tagg.
    Börja slutförandet med "<h4>4P</h4>" följt av "<h5>Produktstrategi</h5>" upprepa inte dessa ämnen: "<h4>4P</h4>" och "<h5>Produktstrategi</h5>", igen i slutförandet.
    Använd inte " " i slutförandet.
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    //finnish lang---------------------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}.
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot. ÄLÄ mainitse muita tuotteita tai palveluita, jotka eivät ole lueteltu tässä:
    ${productInfoPrompt}
    Nämä tuotteiden tai palveluiden tiedot ON sisällytettävä ${promptTopic.fi}.

    ${customerPrompt}

    Tuotestrategiassa, kuvaile tuotetta tai palvelua yksityiskohtaisesti. Tämä on tärkeää: tuotestrategian ON sovitettava asemointitietoihin. Paras tuotestrategia sopeutuu asemointiin. Tuotestrategian aiheeseen tulisi sisältyä: tuotteen kuvaus, tuotteen erottaminen, tuotekehitys ja tuotemerkki. Nämä aiheet tulisi kääriä <h6> -tageihin. Jokaisen aiheen tulisi kuvata jokaista tuotetta tai palvelua yksityiskohtaisesti.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Tämä on tärkeää: tuotestrategian ON sovitettava asemointiin STP-aiheesta.

    Älä toista liiketoiminnan tietoja.
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Generoi vastaus html:ssä ympäröimällä ${promptTopic.fi} aiheet h5-tagilla.
    Aloita täydennys "<h4>4P</h4>" seurattuna "<h5>Tuotekehitys</h5>", älä toista näitä aiheita: "<h4>4P</h4>" ja "<h5>Tuotekehitys</h5>", uudelleen täydennyksessä.
    Älä käytä " " täydennyksessä.
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    //danish lang---------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af forretning er ${businessType}.
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretningsoperationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester. NÆVN IKKE yderligere produkt eller tjenester, der ikke er opført her:
    ${productInfoPrompt}
    Disse produkter eller tjenester detaljer SKAL inkluderes i ${promptTopic.da}.

    ${customerPrompt}

    For produktstrategi, beskriv produktet eller tjenesten i detaljer. Dette er vigtigt: produktstrategi SKAL tilpasse sig til positioneringsdata. Den bedste produktstrategi tilpasser sig til positionering. Produktstrategi emnet skal inkludere: produktbeskrivelse, produkt differentiering, produktudvikling og produkt branding. Disse emner skal være indpakket i <h6> tags. Hvert emne skal beskrive hvert produkt eller tjeneste i detaljer.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Dette er vigtigt: produktstrategi SKAL tilpasse sig til POSITIONERINGSEMNET fra STP-emnet.

    Gentag ikke forretningsdetaljer.
    Skriv dette som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
    Generer svar i html omkring ${promptTopic.da} emner med h5 tag.
    Begynd udfyldelsen med "<h4>4P</h4>" efterfulgt af "<h5>Produktstrategi</h5>" gentag ikke disse emner: "<h4>4P</h4>" og "<h5>Produktstrategi</h5>", igen i udfyldelsen.
    Brug ikke " " i udfyldelsen.
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    //norwegian lang---------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}.
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens forretningsoperasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester. IKKE nevn ytterligere produkt eller tjenester som ikke er oppført her:
    ${productInfoPrompt}
    Disse produktene eller tjenestene detaljer MÅ inkluderes i ${promptTopic.no}.

    ${customerPrompt}

    For produktstrategi, beskriv produktet eller tjenesten i detalj. Dette er viktig: produktstrategi MÅ tilpasse seg til posisjoneringsdata. Den beste produktstrategien tilpasser seg til posisjonering. Produktstrategi emnet skal inkludere: produktbeskrivelse, produkt differensiering, produktutvikling og produkt branding. Disse emnene skal være innpakket i <h6> tags. Hvert emne skal beskrive hvert produkt eller tjeneste i detalj.

    ${productDescriptionPrompt}

    ${productDifferentiationPrompt}

    ${productDevelopmentPrompt}

    ${productBrandingPrompt}

    Dette er viktig: produktstrategi MÅ tilpasse seg til POSISJONERINGSEMNET fra STP-emnet.

    Gjenta ikke forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
    Generer svar i html rundt ${promptTopic.no} emner med h5 tag.
    Begynn utfyllingen med "<h4>4P</h4>" etterfulgt av "<h5>Produktstrategi</h5>" gjenta ikke disse emnene: "<h4>4P</h4>" og "<h5>Produktstrategi</h5>", igjen i utfyllingen.
    Ikke bruk " " i utfyllingen.
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
