import { OpenAIStream } from "../../../../../utils/OpenAIChatStream";

interface IAdvertisingStrategyPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
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

export const AdvertisingStragetyPro = (req: IAdvertisingStrategyPro) => {
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
    planQuota,
    variantID,
  } = req;

  console.log("mark2Ref from api7Mark6:", mark2Ref);

  const targeting = mark2Ref.substring(mark2Ref.indexOf("<h5>Targeting</h5>"));
  const positioning = mark2Ref.substring(
    mark2Ref.indexOf("<h5>Positioning</h5>")
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
    productDescription5
  ) {
    let prompt = "";

    for (let i = 1; i <= 5; i++) {
      const productName = arguments[(i - 1) * 2 + 1];
      const productDescription = arguments[(i - 1) * 2 + 2];

      if (productName) {
        switch (planLanguage) {
          case "de":
            prompt += `Kundens Produkt oder Dienstleistung #${i} Name: ${productName}\n`;
            break;
          case "fr":
            prompt += `Produit ou service du client #${i} Nom: ${productName}\n`;
            break;
          case "es":
            prompt += `Producto o servicio del cliente #${i} Nombre: ${productName}\n`;
            break;
          case "it":
            prompt += `Prodotto o servizio del cliente #${i} Nome: ${productName}\n`;
            break;
          case "nl":
            prompt += `Klant's product of dienst #${i} Naam: ${productName}\n`;
            break;
          case "ja":
            prompt += `クライアントの製品またはサービス #${i} 名前: ${productName}\n`;
            break;
          case "ar":
            prompt += `منتج العميل أو الخدمة #${i} الاسم: ${productName}\n`;
            break;
          case "sv":
            prompt += `Kundens produkt eller tjänst #${i} Namn: ${productName}\n`;
            break;
          case "fi":
            prompt += `Asiakkaan tuote tai palvelu #${i} Nimi: ${productName}\n`;
            break;
          case "da":
            prompt += `Kundens produkt eller service #${i} Navn: ${productName}\n`;
            break;
          case "no":
            prompt += `Kundens produkt eller tjeneste #${i} Navn: ${productName}\n`;
            break;
          default:
            prompt += `Client's product or service #${i} Name: ${productName}\n`;
        }
      }

      if (productDescription) {
        switch (planLanguage) {
          case "de":
            prompt += `Kundens Produkt oder Dienstleistung #${i} Beschreibung: ${productDescription}\n`;
            break;
          case "fr":
            prompt += `Produit ou service du client #${i} Description: ${productDescription}\n`;
            break;
          case "es":
            prompt += `Producto o servicio del cliente #${i} Descripción: ${productDescription}\n`;
            break;
          case "it":
            prompt += `Prodotto o servizio del cliente #${i} Descrizione: ${productDescription}\n`;
            break;
          case "nl":
            prompt += `Klant's product of dienst #${i} Beschrijving: ${productDescription}\n`;
            break;
          case "ja":
            prompt += `クライアントの製品またはサービス #${i} 説明: ${productDescription}\n`;
            break;
          case "ar":
            prompt += `منتج العميل أو الخدمة #${i} الوصف: ${productDescription}\n`;
            break;
          case "sv":
            prompt += `Kundens produkt eller tjänst #${i} Beskrivning: ${productDescription}\n`;
            break;
          case "fi":
            prompt += `Asiakkaan tuote tai palvelu #${i} Kuvaus: ${productDescription}\n`;
            break;
          case "da":
            prompt += `Kundens produkt eller service #${i} Beskrivelse: ${productDescription}\n`;
            break;
          case "no":
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
    productDescription5
  );

  // create customer prompt
  let customerPrompt = "";
  const customerDescriptions = [
    customerDescription1,
    customerDescription2,
    customerDescription3,
  ];
  const customerGroups = {
    de: "Kundengruppe",
    fr: "Groupe de clients",
    es: "Grupo de clientes",
    it: "Gruppo di clienti",
    nl: "Klantengroep",
    ja: "顧客グループ",
    ar: "مجموعة العملاء",
    sv: "Kundgrupp",
    fi: "Asiakasryhmä",
    da: "Kundegruppe",
    no: "Kundegruppe",
    default: "Customer Group",
  };
  const customerGroupDescriptions = {
    de: "Dies sind die Kundengruppenbeschreibungen:",
    fr: "Voici les descriptions des groupes de clients:",
    es: "Estas son las descripciones de los grupos de clientes:",
    it: "Queste sono le descrizioni dei gruppi di clienti:",
    nl: "Dit zijn de beschrijvingen van de klantengroepen:",
    ja: "これらは顧客グループの説明です:",
    ar: "هذه هي أوصاف مجموعات العملاء:",
    sv: "Detta är beskrivningar av kundgrupper:",
    fi: "Nämä ovat asiakasryhmien kuvauksia:",
    da: "Dette er beskrivelser af kundegrupper:",
    no: "Dette er beskrivelser av kundegrupper:",
    default: "These are the customer group descriptions:",
  };

  customerDescriptions.forEach((description, index) => {
    if (description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups["default"]} ${index + 1}: ${description}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions["default"]}\n${customerPrompt}`;

  const promptTopic = {
    en: "Advertising Strategy",
    de: "Werbestrategie",
    fr: "Stratégie publicitaire",
    es: "Estrategia publicitaria",
    it: "Strategia pubblicitaria",
    nl: "Reclamestrategie",
    ja: "広告戦略",
    ar: "استراتيجية الإعلان",
    sv: "Reklamstrategi",
    fi: "Mainosstrategia",
    da: "Reklamestrategi",
    no: "Reklamestrategi",
  };

  const prompt = {
    "en-uk": `
    You are a professional consultant, and a customer approaches you to write an insighful and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the topic that should be generated: ${promptTopic.en}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for ${promptTopic.en}, you MUST consider these topic: 
    Targeting topic: ${targeting}. 
    Positioning topic: ${positioning}.
    keep these targeting and positioning data in mind but DO NOT repeat this data in your response.
    
    For Advertising Strategy topic, describe how you would attract the targeted segment. Generate multiple advertsing tactics and in each tactic include objective, activities, and implementation sub-topics. For the implementation sub-topic list out the steps that need to be taken and avoid saying we need to hire somebody to help with the implementation. Also, include timeframe information in implementation sub-topic. Consider the targeting and positioning topics. wrap each advertsing tactic with <li> tag. the sub-topics should be wrapped inside these <li> tags. When listing advertising tactics, Don't use numbered list.

    Generate at least 5 advertising tactics.
    
    Do not repeat business details.
    Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
    Begin the completion with "<h5>Advertising Strategy</h5>.
    Surround key topics with <h5> tags.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    //english lang---------------------------------------------------------------
    en: `
    You are a professional consultant, and a customer approaches you to write an insighful and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    These are the topic that should be generated: ${promptTopic.en}, don't include other topics unless specified here. Be very descriptive in generating content for each topic.

    for ${promptTopic.en}, you MUST consider these topic: 
    Targeting topic: ${targeting}. 
    Positioning topic: ${positioning}.
    keep these targeting and positioning data in mind but DO NOT repeat this data in your response.
    
    For Advertising Strategy topic, describe how you would attract the targeted segment. Generate multiple advertsing tactics and in each tactic include objective, activities, and implementation sub-topics. For the implementation sub-topic list out the steps that need to be taken and avoid saying we need to hire somebody to help with the implementation. Also, include timeframe information in implementation sub-topic. Consider the targeting and positioning topics. wrap each advertsing tactic with <li> tag. the sub-topics should be wrapped inside these <li> tags. When listing advertising tactics, Don't use numbered list.

    Generate at least 5 advertising tactics.
    
    Do not repeat business details.
    Write this in first person perspective as if you are the owner of this business using "we", DO NOT use "I". 
    Begin the completion with "<h5>Advertising Strategy</h5>.
    Surround key topics with <h5> tags.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang---------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen aufschlussreichen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Dies sind die Themen, die generiert werden sollten: ${promptTopic.de}. Schließen Sie keine anderen Themen ein, es sei denn, dies wird hier angegeben. Seien Sie bei der Erstellung von Inhalten für jedes Thema sehr anschaulich.

    Beschreibung der Kundengruppe:
    ${customerPrompt}
    
    Beschreiben Sie für das Thema „Werbestrategie“, wie Sie das Zielsegment ansprechen würden. Generieren Sie mehrere Werbetaktiken und beziehen Sie in jede Taktik Unterthemen zu Ziel, Aktivitäten und Umsetzung ein. Listen Sie für das Unterthema „Implementierung“ die Schritte auf, die unternommen werden müssen, und vermeiden Sie es zu sagen, dass wir jemanden einstellen müssen, der bei der Implementierung hilft. Fügen Sie außerdem Informationen zum Zeitrahmen in das Unterthema „Implementierung“ ein. Berücksichtigen Sie die Themen Targeting und Positionierung. Schließen Sie jede Werbetaktik mit dem <li>-Tag ab. Die Unterthemen sollten in diese <li>-Tags eingeschlossen werden. Verwenden Sie beim Auflisten von Werbetaktiken keine nummerierte Liste.

    Generieren Sie mindestens 5 Werbetaktiken.
    
    Wiederholen Sie keine Geschäftsdetails.
    Schreiben Sie dies in der Ich-Perspektive, als ob Sie der Eigentümer dieses Unternehmens wären, und verwenden Sie „wir“ und NICHT „ich“.
    Beginnen Sie den Abschluss mit „<h5>Werbestrategie</h5>“.
    Umgeben Sie wichtige Themen mit <h5>-Tags.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
  `,

    //french lang---------------------------------------------------------------
    fr: `
    Vous êtes un conseiller professionnel et un client vient à vous pour rédiger un ${promptTopic.fr} instructif et détaillé pour un plan d'affaires.

    Données commerciales :
    Détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    Détail commercial 2 : Le type d'activité est ${businessType}.
    Détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    Détail commercial 4 : Le canal de distribution du client est : ${salesChannel}.
    Détail commercial 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les informations sur les produits ou services du client :
    ${productInfoPrompt}

    Voici les sujets à générer : ${promptTopic.fr}. N'incluez aucun autre sujet, à moins qu'il ne soit indiqué ici. Soyez très descriptif dans la création de contenu pour chaque sujet.

    Description du groupe de clients :
    ${customerPrompt}

    Pour le sujet « Stratégie publicitaire », décrivez comment vous adresseriez le segment cible. Générez plusieurs tactiques publicitaires et intégrez dans chaque tactique des sous-thèmes concernant l'objectif, les activités et la mise en œuvre. Listez les étapes à entreprendre pour le sous-thème « Mise en œuvre », et évitez de dire que nous devons embaucher quelqu'un pour aider à la mise en œuvre. Ajoutez également des informations sur le calendrier dans le sous-thème « Mise en œuvre ». Prenez en compte les thèmes de ciblage et de positionnement. Terminez chaque tactique publicitaire avec la balise <li>. Les sous-thèmes devraient être inclus dans ces balises <li>. N'utilisez pas de liste numérotée pour énumérer les tactiques publicitaires.

    Générez au moins 5 tactiques publicitaires.

    Ne répétez pas les détails commerciaux.
    Écrivez cela à la première personne, comme si vous étiez le propriétaire de cette entreprise, et utilisez « nous » et NON « je ».
    Commencez la conclusion par « <h5>Stratégie publicitaire</h5> ».
    Entourez les sujets importants de balises <h5>.
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang---------------------------------------------------------------
    es: `
    Usted es un asesor profesional y un cliente se acerca a usted para escribir un ${promptTopic.es} perspicaz y detallado para un plan de negocio.

    Datos del negocio:
    Detalle del negocio 1: El nombre de la empresa del cliente es ${businessName}.
    Detalle del negocio 2: El tipo de negocio es ${businessType}.
    Detalle del negocio 3: Aquí es donde se encuentran los clientes de la empresa: ${location}.
    Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles sobre los productos o servicios del cliente:
    ${productInfoPrompt}

    Estos son los temas que se deben generar: ${promptTopic.es}. No incluya otros temas, a menos que se indique aquí. Sea muy descriptivo al crear contenido para cada tema.

    Descripción del grupo de clientes:
    ${customerPrompt}

    Para el tema "Estrategia publicitaria", describa cómo abordaría el segmento objetivo. Genere varias tácticas publicitarias e incluya en cada táctica subtemas relacionados con el objetivo, las actividades y la implementación. Enumere los pasos que se deben tomar para el subtema "Implementación", y evite decir que necesitamos contratar a alguien para ayudar en la implementación. También agregue información sobre el cronograma en el subtema "Implementación". Tenga en cuenta los temas de segmentación y posicionamiento. Finalice cada táctica publicitaria con la etiqueta <li>. Los subtemas deben incluirse en estas etiquetas <li>. No use una lista numerada al enumerar las tácticas publicitarias.

    Genere al menos 5 tácticas publicitarias.

    No repita detalles comerciales.
    Escriba esto en primera persona, como si fuera el dueño de esta empresa, y use "nosotros" y NO "yo".
    Comience la conclusión con "<h5>Estrategia publicitaria</h5>".
    Rodee los temas importantes con etiquetas <h5>.
    Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
    Genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang---------------------------------------------------------------
    it: `
    Lei è un consulente professionale e un cliente si rivolge a lei per redigere un ${promptTopic.it} approfondito e dettagliato per un piano di affari.

    Dati aziendali:
    Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    Dettaglio aziendale 2: La tipologia dell'attività è ${businessType}.
    Dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    Dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    Dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono dettagli sui prodotti o servizi del cliente:
    ${productInfoPrompt}

    Questi sono i temi che dovrebbero essere generati: ${promptTopic.it}. Non includa altri temi, a meno che non siano indicati qui. Sia molto descrittivo nella creazione di contenuti per ogni tema.

    Descrizione del gruppo di clienti:
    ${customerPrompt}

    Per il tema "Strategia pubblicitaria", descriva come si rivolgerebbe al segmento di mercato target. Generi diverse tattiche pubblicitarie e includa in ogni tattica sottotemi relativi a obiettivi, attività e implementazione. Elenchi i passaggi da intraprendere per il sottotema "Implementazione", evitando di dire che dobbiamo assumere qualcuno per aiutare nell'implementazione. Includa anche informazioni sulla tempistica nel sottotema "Implementazione". Consideri i temi di targeting e posizionamento. Concluda ogni tattica pubblicitaria con il tag <li>. I sottotemi dovrebbero essere inclusi in questi tag <li>. Non utilizzi un elenco numerato per elencare le tattiche pubblicitarie.

    Generi almeno 5 tattiche pubblicitarie.

    Non ripeta dettagli aziendali.
    Scriva ciò in prima persona, come se fosse il proprietario dell'azienda, e utilizzi "noi" e NON "io".
    Inizi la conclusione con "<h5>Strategia pubblicitaria</h5>".
    Circondi i temi importanti con i tag <h5>.
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
    Genera tutto in italiano.
    Questo è importante: Sii molto perspicace nella tua risposta.
    Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    //dutch lang---------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een inzichtvolle en gedetailleerde ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn de onderwerpen die gegenereerd moeten worden: ${promptTopic.nl}, voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer beschrijvend bij het genereren van inhoud voor elk onderwerp.

    Beschrijving van de klantengroep:
    ${customerPrompt}

    Voor het onderwerp "Reclamestrategie", beschrijf hoe u het doelsegment zou aantrekken. Genereer meerdere reclametactieken en neem in elke tactiek subonderwerpen op over doelstellingen, activiteiten en implementatie. Voor het subonderwerp implementatie, lijst de stappen op die genomen moeten worden en vermijd te zeggen dat we iemand moeten inhuren om te helpen met de implementatie. Neem ook informatie over de tijdlijn op in het subonderwerp implementatie. Overweeg de onderwerpen targeting en positionering. Sluit elke reclametactiek af met de tag <li>. De subonderwerpen moeten worden opgenomen in deze <li> tags. Gebruik geen genummerde lijst bij het opsommen van reclametactieken.

    Genereer minstens 5 reclametactieken.

    Herhaal geen bedrijfsdetails.
    Schrijf dit vanuit het perspectief van de eerste persoon alsof u de eigenaar van dit bedrijf bent en gebruik "wij", gebruik NIET "ik".
    Begin de voltooiing met "<h5>Reclamestrategie</h5>".
    Omring belangrijke onderwerpen met <h5> tags.
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
  `,

    //japanese lang---------------------------------------------------------------
    ja: `
  あなたはプロのコンサルタントで、顧客がビジネスプランのための洞察に富んだ詳細な${promptTopic.ja}を書くようにあなたにアプローチしてきます。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    生成する必要があるトピックは${promptTopic.ja}です、ここで指定されていない他のトピックを含めないでください。各トピックのコンテンツを生成する際には非常に詳細に説明してください。

    ${promptTopic.ja}については、次のトピックを考慮する必要があります：
    ターゲティングトピック：${targeting}。
    ポジショニングトピック：${positioning}。
    これらのセグメンテーション、ターゲティング、およびポジショニングデータを念頭に置いてください。ただし、これらのデータを回答に繰り返さないでください。
    
    広告戦略トピックについては、ターゲットとなるセグメントをどのように引き付けるかを説明します。複数の広告戦術を生成し、各戦術には目標、活動、実装のサブトピックを含めます。実装のサブトピックでは、取るべきステップをリストアップし、実装を助けるために誰かを雇う必要があると言うことを避けてください。また、実装のサブトピックには時間枠の情報も含めてください。ターゲティングとポジショニングのトピックを考慮してください。各広告戦術を<li>タグでラップします。サブトピックはこれらの<li>タグの中にラップする必要があります。広告戦術をリストアップするときは、番号付きリストを使用しないでください。

    少なくとも5つの広告戦術を生成します。
    
    ビジネスの詳細を繰り返さないでください。
    あなたがこのビジネスのオーナーであるかのように、"私たち"を使って一人称の視点でこれを書いてください。"私"を使わないでください。
    完成を"<h5>広告戦略</h5>で始めてください。
    主要なトピックを<h5>タグで囲んでください。
    すべてを日本語で生成してください。
    これがあなたが考え出した洞察に富んだ${promptTopic.ja}です：
  `,

    //arabic lang---------------------------------------------------------------
    ar: `
  أنت مستشار محترف، ويقترب منك العميل لكتابة ${promptTopic.ar} مفصلة وباطنة لخطة العمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل منتجات العميل أو خدماته:
    ${productInfoPrompt}

    هذه هي المواضيع التي يجب توليدها: ${promptTopic.ar}، لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن وصفيًا جدًا عند توليد المحتوى لكل موضوع.

    بالنسبة لـ ${promptTopic.ar}، يجب عليك النظر في هذه المواضيع:
    موضوع التوجيه: ${targeting}.
    موضوع التموضع: ${positioning}.
    ضع في اعتبارك بيانات التقسيم والاستهداف والتحديد هذه ولكن لا تكرر هذه البيانات في ردك.

    بالنسبة لموضوع استراتيجية الإعلان، اصف كيف ستجذب القطاع المستهدف. قم بتوليد تكتيكات إعلانية متعددة وقم بتضمين الأهداف والأنشطة والتنفيذ في كل تكتيك. بالنسبة لموضوع التنفيذ الفرعي، اذكر الخطوات التي يجب اتخاذها وتجنب القول بأننا بحاجة لتوظيف شخص ما للمساعدة في التنفيذ. بالإضافة إلى ذلك، قم بتضمين معلومات الجدول الزمني في موضوع التنفيذ الفرعي. ضع في اعتبارك مواضيع التوجيه والتموضع. احزم كل تكتيك إعلاني بوسم <li>. يجب أن يتم تضمين المواضيع الفرعية داخل هذه الوسوم <li>. عند سرد تكتيكات الإعلان، لا تستخدم القائمة المرقمة.

    قم بتوليد 5 تكتيكات إعلانية على الأقل.

    لا تكرر تفاصيل العمل.
    اكتب هذا من منظور الشخص الأول كما لو كنت صاحب هذا العمل باستخدام "نحن"، لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h5>استراتيجية الإعلان</h5>".
    احاطة المواضيع الرئيسية بوسوم <h5>.
    قم بتوليد كل شيء باللغة العربية.
    هذه هي ${promptTopic.ar} الباطنة التي توصلت إليها:
  `,

    //swedish lang---------------------------------------------------------------
    sv: `
  Du är en professionell konsult och en kund närmar sig dig för att skriva en insiktsfull och detaljerad ${promptTopic.sv} för en affärsplan.

  företagsdetaljer:
  företagsdetalj 1: Kundens företagsnamn är ${businessName}.
  företagsdetalj 2: Typen av verksamhet är ${businessType}.
  företagsdetalj 3: Detta är var företagets kunder finns: ${location}.
  företagsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
  företagsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

  Detta är detaljer om kundens produkter eller tjänster:
  ${productInfoPrompt}

  Detta är ämnet som ska genereras: ${promptTopic.sv}, inkludera inte andra ämnen om det inte specificeras här. Var mycket beskrivande när du genererar innehåll för varje ämne.

  ${customerPrompt}

  För ämnet Reklamstrategi, beskriv hur du skulle locka den riktade segmentet. Generera flera reklamtaktiker och inkludera i varje taktik mål, aktiviteter och implementeringsunderämnen. För implementeringsunderämnet, lista ut de steg som behöver tas och undvik att säga att vi behöver anställa någon för att hjälpa till med implementeringen. Inkludera också tidsramsinformation i implementeringsunderämnet. Överväg ämnena riktning och positionering. Omslut varje reklamtaktik med <li> taggen. Underämnena ska vara omslutna inuti dessa <li> taggar. När du listar reklamtaktiker, använd inte numrerad lista.

  Generera minst 5 reklamtaktiker.

  Upprepa inte företagsdetaljer.
  Skriv detta ur ett första person perspektiv som om du är ägaren till detta företag med "vi", ANVÄND INTE "jag".
  Börja kompletteringen med "<h5>Reklamstrategi</h5>.
  Omslut nyckelämnen med <h5> taggar.
  Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
  Generera allt på svenska.
  Detta är viktigt: Var mycket insiktsfull i ditt svar.
  Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
  `,

    //finnish lang---------------------------------------------------------------
    fi: `
  Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan oivaltavan ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

  liiketoiminnan tiedot:
  liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
  liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
  liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
  liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
  liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

  Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
  ${productInfoPrompt}

  Nämä ovat aihe, joka pitäisi generoida: ${promptTopic.fi}, älä sisällytä muita aiheita, ellei tässä ole määritetty. Ole erittäin kuvaileva generoidessasi sisältöä jokaiselle aiheelle.

  ${customerPrompt}

  Mainosstrategia-aiheessa, kuvaile, miten houkuttelisit kohdennettua segmenttiä. Generoi useita mainostaktiikoita ja sisällytä jokaiseen taktiikkaan tavoite, toiminnot ja toteutuksen ala-aiheet. Toteutuksen ala-aiheessa, listaa askeleet, jotka on otettava, ja vältä sanomasta, että meidän on palkattava joku auttamaan toteutuksessa. Sisällytä myös aikataulutietoja toteutuksen ala-aiheeseen. Harkitse kohdentamisen ja asemoinnin aiheita. kääri jokainen mainostaktiikka <li> tagiin. ala-aiheet pitäisi kääriä näiden <li> tagien sisään. Kun listaat mainostaktiikoita, älä käytä numeroitua listaa.

  Generoi vähintään 5 mainostaktiikkaa.

  Älä toista liiketoiminnan yksityiskohtia.
  Kirjoita tämä ensimmäisen persoonan näkökulmasta, ikään kuin olisit tämän yrityksen omistaja käyttäen "me", ÄLÄ käytä "minä". 
  Aloita täydennys "<h5>Mainosstrategia</h5> -merkinnällä.
  Ympäröi avainaiheet <h5> tageilla.
  Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
  Luo kaikki suomeksi.
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
  Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
  `,

    //danish lang---------------------------------------------------------------
    da: `
  Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en indsigtsfuld og detaljeret ${promptTopic.da} til en forretningsplan.

  forretningsdetaljer:
  forretningsdetalje 1: Kundens firmanavn er ${businessName}.
  forretningsdetalje 2: Typen af forretning er ${businessType}. 
  forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
  forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
  forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

  Disse er detaljer om kundens produkter eller tjenester:
  ${productInfoPrompt}

  Dette er emnet, der skal genereres: ${promptTopic.da}, inkluder ikke andre emner, medmindre det er specificeret her. Vær meget beskrivende, når du genererer indhold for hvert emne.

    ${customerPrompt}

  For emnet Reklamestrategi, beskriv hvordan du ville tiltrække det målrettede segment. Generer flere reklametaktikker og inkluder i hver taktik mål, aktiviteter og implementeringsunderemner. For implementeringsunderemnet, list de trin, der skal tages, og undgå at sige, at vi skal ansætte nogen til at hjælpe med implementeringen. Inkluder også tidsrammeinformation i implementeringsunderemnet. Overvej emnerne målretning og positionering. Indpak hver reklametaktik med <li> tag. Underemnerne skal være indpakket i disse <li> tags. Når du lister reklametaktikker, skal du ikke bruge nummereret liste.

  Generer mindst 5 reklametaktikker.

  Gentag ikke forretningsdetaljer.
  Skriv dette i første person perspektiv, som om du er ejeren af denne virksomhed ved hjælp af "vi", BRUG IKKE "jeg". 
  Begynd udfyldelsen med "<h5>Reklamestrategi</h5>.
  Omgiv nøgleemner med <h5> tags.
  Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
  Generer alt på dansk.
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
  Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
  `,

    //norwegian lang---------------------------------------------------------------
    no: `
  Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en innsiktsfull og detaljert ${promptTopic.no} for en forretningsplan.

  forretningsdetaljer:
  forretningsdetalj 1: Kundens firmanavn er ${businessName}.
  forretningsdetalj 2: Typen virksomhet er ${businessType}. 
  forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
  forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
  forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

  Dette er detaljer om kundens produkter eller tjenester:
  ${productInfoPrompt}

  Dette er emnet som skal genereres: ${promptTopic.no}, ikke inkluder andre emner med mindre det er spesifisert her. Vær veldig beskrivende når du genererer innhold for hvert emne.

    ${customerPrompt}

  For emnet Reklamestrategi, beskriv hvordan du ville tiltrekke det målrettede segmentet. Generer flere reklametaktikker og inkluder i hver taktikk mål, aktiviteter og implementeringsunderemner. For implementeringsunderemnet, list opp trinnene som må tas, og unngå å si at vi trenger å ansette noen for å hjelpe med implementeringen. Inkluder også tidsrammeinformasjon i implementeringsunderemnet. Vurder emnene målretting og posisjonering. Pakk inn hver reklametaktikk med <li> tag. Underemnene skal være pakket inn i disse <li> tags. Når du lister reklametaktikker, ikke bruk nummerert liste.

  Generer minst 5 reklametaktikker.

  Ikke gjenta forretningsdetaljer.
  Skriv dette i første person perspektiv, som om du er eieren av denne virksomheten ved hjelp av "vi", IKKE bruk "jeg". 
  Begynn utfyllingen med "<h5>Reklamestrategi</h5>.
  Omgir nøkkelemner med <h5> tags.
  Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
  Generer alt på norsk.
  Dette er viktig: Vær veldig innsiktsfull i ditt svar.
  Dette er den lange, detaljerte og innsiktsfulle ${promptTopic.no} du kom opp med:
  `,
  };

  let modelPlanQuota = "gpt-3.5-turbo";
  if (planQuota <= 8) {
    modelPlanQuota = "gpt-3.5-turbo";
    console.log("using gpt-3.5-turbo");
  } else {
    modelPlanQuota = "gpt-4";
    console.log("using gpt-4");
  }

  const payload = {
    model: variantID === "2" ? "gpt-4o" : modelPlanQuota,
    messages: [{ role: "user", content: prompt[planLanguage] ?? prompt.en }],
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
