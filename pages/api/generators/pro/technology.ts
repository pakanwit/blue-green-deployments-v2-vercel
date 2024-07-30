import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface ITechnologyPro {
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

export const technologyPro = async (req: ITechnologyPro) => {
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
    en: 'Technology Selection, Expected Technology Contribution, Technology Requirements, Technology Implementation, Technology Management',
    de: 'Technologieauswahl, erwarteter Technologiebeitrag, Technologieanforderungen, Technologieimplementierung, Technologiemanagement',
    fr: 'Sélection de la technologie, contribution attendue de la technologie, exigences technologiques, mise en œuvre de la technologie, gestion de la technologie',
    es: 'Selección de tecnología, contribución tecnológica esperada, requisitos tecnológicos, implementación de tecnología, gestión de tecnología',
    it: 'Selezione della tecnologia, contributo tecnologico previsto, requisiti tecnologici, implementazione della tecnologia, gestione della tecnologia',
    nl: 'Technologie selectie, verwachte technologie bijdrage, technologie vereisten, technologie implementatie, technologie management',
    ja: '技術選択、期待される技術貢献、技術要件、技術実装、技術管理',
    ar: 'اختيار التكنولوجيا ، المساهمة التكنولوجية المتوقعة ، متطلبات التكنولوجيا ، تنفيذ التكنولوجيا ، إدارة التكنولوجيا',
    sv: 'Teknikval, förväntat teknikbidrag, teknikkrav, teknikimplementering, teknikhantering',
    fi: 'Teknologian valinta, odotettu teknologian panos, tekniset vaatimukset, teknologian toteutus, teknologian hallinta',
    da: 'Teknologivalg, forventet teknologibidrag, tekniske krav, teknologiimplementering, teknologistyring',
    no: 'Teknologivalg, forventet teknologibidrag, tekniske krav, teknologiimplementering, teknologistyring',
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

    for Technology Selection sub-topic, select and describe relevant technology to be used for this particular business. You should select technologies that matches the business capabilities and resources (a small business with a couple of employees shouldn't be using complicated or costly tech). surround each technology with <li> tag.
    
    for Expected Technology Contribution sub-topic, suggest how the technology will contribute to the business. surround each tech contribution with <li> tag.

    for Technology Requirements topic, from the selected technologies, list the requirements for each technology in terms of hardware, software, and network. surround each requirement with <li> tag.

    for Technology Implementation topic, list the steps to implement the technology include details on how to select a tech vendor. surround each step with <li> tag.

    for Technology Management topic, include details on maintenance, upgrades, data mangement, and security. surround each step with <li> tag.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Technology Strategy</h3>" followed by "<h4>Technology Selection</h4>"
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

    for Technology Selection sub-topic, select and describe relevant technology to be used for this particular business. You should select technologies that matches the business capabilities and resources (a small business with a couple of employees shouldn't be using complicated or costly tech). surround each technology with <li> tag.
    
    for Expected Technology Contribution sub-topic, suggest how the technology will contribute to the business. surround each tech contribution with <li> tag.

    for Technology Requirements topic, from the selected technologies, list the requirements for each technology in terms of hardware, software, and network. surround each requirement with <li> tag.

    for Technology Implementation topic, list the steps to implement the technology include details on how to select a tech vendor. surround each step with <li> tag.

    for Technology Management topic, include details on maintenance, upgrades, data mangement, and security. surround each step with <li> tag.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Technology Strategy</h3>" followed by "<h4>Technology Selection</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang----------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Wählen Sie für das Unterthema „Technologieauswahl“ die relevante Technologie aus, die für dieses bestimmte Unternehmen verwendet werden soll, und beschreiben Sie sie. Sie sollten Technologien auswählen, die den Geschäftsfähigkeiten und -ressourcen entsprechen (ein kleines Unternehmen mit mehreren Mitarbeitern sollte keine komplizierten oder kostspieligen Technologien verwenden). Umgeben Sie jede Technologie mit dem Tag <li>.
  
    Schlagen Sie für das Unterthema „Erwarteter Technologiebeitrag“ vor, wie die Technologie zum Geschäft beitragen wird. Umgeben Sie jeden technischen Beitrag mit dem Tag <li>.

    Listen Sie im Thema „Technologieanforderungen“ aus den ausgewählten Technologien die Anforderungen für jede Technologie in Bezug auf Hardware, Software und Netzwerk auf. Umgeben Sie jede Anforderung mit dem Tag <li>.

    Listen Sie im Thema „Technologieimplementierung“ die Schritte zur Implementierung der Technologie auf und geben Sie Einzelheiten zur Auswahl eines Technologieanbieters an. Umgeben Sie jeden Schritt mit dem Tag <li>.

    zum Thema Technologiemanagement, enthalten Details zu Wartung, Upgrades, Datenverwaltung und Sicherheit. Umgeben Sie jeden Schritt mit dem Tag <li>.
  
    Wiederholen Sie keine Geschäftsdetails.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie den Abschluss mit „<h3>Technologiestrategie</h3>“, gefolgt von „<h4>Technologieauswahl</h4>“.
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    //french lang----------------------------------------------
    fr: `
    Vous êtes un consultant professionnel, et un client vous approche pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

  détails de l'entreprise :
  détail d'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
  détail d'entreprise 2 : Le type d'entreprise est ${businessType}.
  détail d'entreprise 3 : L'emplacement de l'entreprise est : ${location}.
  détail d'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
  détail d'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}

  pour le sous-thème Sélection Technologique, sélectionnez et décrivez la technologie pertinente à utiliser pour cette entreprise en particulier. Vous devriez sélectionner des technologies qui correspondent aux capacités et ressources de l'entreprise (une petite entreprise avec quelques employés ne devrait pas utiliser des technologies compliquées ou coûteuses). entourez chaque technologie avec le tag <li>.

  pour le sous-thème Contribution Technologique Attendue, suggérez comment la technologie contribuera à l'entreprise. entourez chaque contribution technologique avec le tag <li>.

  pour le thème Exigences Technologiques, à partir des technologies sélectionnées, listez les exigences pour chaque technologie en termes de matériel, logiciel et réseau. entourez chaque exigence avec le tag <li>.

  pour le thème Mise en Œuvre de la Technologie, listez les étapes pour implémenter la technologie, y compris les détails sur la manière de sélectionner un fournisseur technologique. entourez chaque étape avec le tag <li>.

  pour le thème Gestion de la Technologie, incluez des détails sur la maintenance, les mises à niveau, la gestion des données et la sécurité. entourez chaque étape avec le tag <li>.

  Ne répétez pas les détails de l'entreprise.
  Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  Commencez la rédaction avec "<h3>Stratégie Technologique</h3>" suivi de "<h4>Sélection Technologique</h4>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang----------------------------------------------
    es: `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocios.

  detalles del negocio:
  detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
  detalle del negocio 2: El tipo de negocio es ${businessType}.
  detalle del negocio 3: La ubicación del negocio es: ${location}.
  detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
  detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

  Estos son detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  para el subtema Selección de Tecnología, seleccione y describa la tecnología relevante a ser utilizada para este negocio en particular. Debería seleccionar tecnologías que coincidan con las capacidades y recursos del negocio (un pequeño negocio con un par de empleados no debería usar tecnología complicada o costosa). rodee cada tecnología con la etiqueta <li>.

  para el subtema Contribución Tecnológica Esperada, sugiera cómo la tecnología contribuirá al negocio. rodee cada contribución tecnológica con la etiqueta <li>.

  para el tema Requisitos Tecnológicos, a partir de las tecnologías seleccionadas, liste los requisitos para cada tecnología en términos de hardware, software y red. rodee cada requisito con la etiqueta <li>.

  para el tema Implementación de la Tecnología, liste los pasos para implementar la tecnología, incluyendo detalles sobre cómo seleccionar un proveedor tecnológico. rodee cada paso con la etiqueta <li>.

  para el tema Gestión de la Tecnología, incluya detalles sobre el mantenimiento, las actualizaciones, la gestión de datos y la seguridad. rodee cada paso con la etiqueta <li>.

  No repita los detalles del negocio.
  Escriba esto como si fuera el dueño del negocio, utilizando "nosotros" y no "yo".
  Comience la redacción con "<h3>Estrategia Tecnológica</h3>" seguido por "<h4>Selección de Tecnología</h4>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.es} que vous avez trouvé :
    `,

    //italian lang----------------------------------------------
    it: `
    Lei è un consulente professionale e un cliente si rivolge a lei per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di attività è ${businessType}.
    dettaglio aziendale 3: La ubicazione dell'azienda è: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}

    per il sottotema Selezione Tecnologica, selezionare e descrivere le tecnologie rilevanti da utilizzare per questa specifica attività. Si dovrebbero scegliere tecnologie che si adattino alle capacità e risorse dell'azienda (una piccola impresa con un paio di dipendenti non dovrebbe utilizzare tecnologie complicate o costose). circondare ogni tecnologia con il tag <li>.

    per il sottotema Contributo Tecnologico Previsto, suggerire come la tecnologia contribuirà all'azienda. circondare ogni contributo tecnologico con il tag <li>.

    per il tema Requisiti Tecnologici, dalle tecnologie selezionate, elencare i requisiti per ciascuna tecnologia in termini di hardware, software e rete. circondare ogni requisito con il tag <li>.

    per il tema Implementazione della Tecnologia, elencare i passi per implementare la tecnologia, includendo dettagli su come selezionare un fornitore tecnologico. circondare ogni passo con il tag <li>.

    per il tema Gestione della Tecnologia, includere dettagli sulla manutenzione, gli aggiornamenti, la gestione dei dati e la sicurezza. circondare ogni passo con il tag <li>.

    Non ripetere i dettagli aziendali.
    Scriva questo come se fosse il proprietario dell'azienda, usando "noi" e non "io".
    Iniziare la redazione con "<h3>Strategia Tecnologica</h3>" seguito da "<h4>Selezione della Tecnologia</h4>"
  Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
Générez tout en français.
C’est important : Soyez très perspicace dans votre réponse.
Voici le long, détaillé et perspicace ${promptTopic.it} que vous avez trouvé :
    `,

    //dutch lang----------------------------------------------
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

    voor het subthema Technologie Selectie, selecteer en beschrijf relevante technologie die voor dit specifieke bedrijf zal worden gebruikt. U moet technologieën selecteren die passen bij de capaciteiten en middelen van het bedrijf (een klein bedrijf met een paar werknemers zou geen gecompliceerde of dure technologie moeten gebruiken). omring elke technologie met de tag <li>.
    
    voor het subthema Verwachte Technologie Bijdrage, suggereer hoe de technologie zal bijdragen aan het bedrijf. omring elke technologie bijdrage met de tag <li>.

    voor het thema Technologie Vereisten, vanuit de geselecteerde technologieën, lijst de vereisten voor elke technologie op in termen van hardware, software en netwerk. omring elke vereiste met de tag <li>.

    voor het thema Technologie Implementatie, lijst de stappen op om de technologie te implementeren, inclusief details over hoe een technologie leverancier te selecteren. omring elke stap met de tag <li>.

    voor het thema Technologie Management, voeg details toe over onderhoud, upgrades, datamanagement en beveiliging. omring elke stap met de tag <li>.
    
    Herhaal de bedrijfsdetails niet.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Begin de voltooiing met "<h3>Technologie Strategie</h3>" gevolgd door "<h4>Technologie Selectie</h4>"
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang----------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの場所は${location}です。
    ビジネス詳細4：クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    「技術選択」のサブトピックでは、この特定のビジネスで使用される関連技術を選択し、説明します。ビジネスの能力とリソースに合った技術を選択する必要があります（従業員数が少ない小規模ビジネスは、複雑で高価な技術を使用すべきではありません）。各技術を<li>タグで囲みます。
    
    「期待される技術貢献」のサブトピックでは、技術がビジネスにどのように貢献するかを提案します。各技術貢献を<li>タグで囲みます。

    「技術要件」のトピックでは、選択した技術から、ハードウェア、ソフトウェア、ネットワークの観点から各技術の要件をリストします。各要件を<li>タグで囲みます。

    「技術実装」のトピックでは、技術ベンダーの選択方法についての詳細を含め、技術を実装する手順をリストします。各ステップを<li>タグで囲みます。

    「技術管理」のトピックでは、メンテナンス、アップグレード、データ管理、セキュリティについての詳細を含めます。各ステップを<li>タグで囲みます。
    
    ビジネスの詳細を繰り返さないでください。
    これをビジネスのオーナーであるかのように書き、"私たちは"を使用し、"私は"を使用しないでください。
    完成を"<h3>技術戦略</h3>"で始め、その後に"<h4>技術選択</h4>"を続けます。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang----------------------------------------------
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

    بالنسبة لموضوع اختيار التكنولوجيا الفرعي، اختر وصف التكنولوجيا ذات الصلة التي ستستخدم لهذا العمل بشكل خاص. يجب أن تختار التكنولوجيات التي تتوافق مع قدرات الأعمال والموارد (لا يجب أن يستخدم الأعمال الصغيرة التي لديها عدد قليل من الموظفين تكنولوجيا معقدة أو مكلفة). أحاط كل تكنولوجيا بوسم <li>.
    
    بالنسبة لموضوع المساهمة التكنولوجية المتوقعة الفرعي، اقترح كيف ستساهم التكنولوجيا في الأعمال. أحاط كل مساهمة تكنولوجية بوسم <li>.

    بالنسبة لموضوع متطلبات التكنولوجيا، من التكنولوجيات المختارة، قائمة بالمتطلبات لكل تكنولوجيا من حيث الأجهزة والبرمجيات والشبكة. أحاط كل متطلبة بوسم <li>.

    بالنسبة لموضوع تنفيذ التكنولوجيا، قائمة بالخطوات لتنفيذ التكنولوجيا تشمل التفاصيل حول كيفية اختيار بائع التكنولوجيا. أحاط كل خطوة بوسم <li>.

    بالنسبة لموضوع إدارة التكنولوجيا، تضمين التفاصيل حول الصيانة، الترقيات، إدارة البيانات، والأمان. أحاط كل خطوة بوسم <li>.
    
    لا تكرر تفاصيل الأعمال.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>استراتيجية التكنولوجيا</h3>" تليها "<h4>اختيار التكنولوجيا</h4>"
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang----------------------------------------------
    sv: `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    affärsdetalj 3: Platsen för verksamheten är: ${location}.
    affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 5: Kundens operativa status för verksamheten är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    för underämnet Teknikval, välj och beskriv relevant teknik som ska användas för denna specifika verksamhet. Du bör välja teknik som matchar företagets kapabiliteter och resurser (ett litet företag med ett par anställda bör inte använda komplicerad eller kostsam teknik). omge varje teknik med <li> taggen.
    
    för underämnet Förväntat teknikbidrag, föreslå hur tekniken kommer att bidra till verksamheten. omge varje teknikbidrag med <li> taggen.

    för ämnet Teknikkrav, från de valda teknikerna, lista kraven för varje teknik i termer av hårdvara, mjukvara och nätverk. omge varje krav med <li> taggen.

    för ämnet Teknikimplementering, lista stegen för att implementera tekniken inkluderar detaljer om hur man väljer en teknikleverantör. omge varje steg med <li> taggen.

    för ämnet Teknikhantering, inkludera detaljer om underhåll, uppgraderingar, datahantering och säkerhet. omge varje steg med <li> taggen.
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren till verksamheten, använd "vi" använd inte "jag".
    Börja slutförandet med "<h3>Teknikstrategi</h3>" följt av "<h4>Teknikval</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    //finnish lang----------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan yksityiskohta 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan yksityiskohta 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat yksityiskohtia asiakkaan tuotteista tai palveluista:
    ${productInfoPrompt}

    Teknologian valinta -alakohdassa, valitse ja kuvaile tähän liiketoimintaan käytettävä relevantti teknologia. Sinun tulisi valita teknologioita, jotka vastaavat liiketoiminnan kykyjä ja resursseja (pienen yrityksen, jolla on muutama työntekijä, ei pitäisi käyttää monimutkaista tai kallista teknologiaa). ympäröi jokainen teknologia <li> -tagilla.
    
    Odotettu teknologian panos -alakohdassa, ehdota, miten teknologia edistää liiketoimintaa. ympäröi jokainen teknologian panos <li> -tagilla.

    Teknisten vaatimusten aiheessa, valituista teknologioista, listaa jokaisen teknologian vaatimukset laitteiston, ohjelmiston ja verkon osalta. ympäröi jokainen vaatimus <li> -tagilla.

    Teknologian toteutus -aiheessa, listaa teknologian toteuttamisen vaiheet, mukaan lukien yksityiskohdat teknologiatoimittajan valinnasta. ympäröi jokainen vaihe <li> -tagilla.

    Teknologian hallinta -aiheessa, sisällytä yksityiskohdat ylläpidosta, päivityksistä, tietojen hallinnasta ja turvallisuudesta. ympäröi jokainen vaihe <li> -tagilla.
    
    Älä toista liiketoiminnan yksityiskohtia.
    Kirjoita tämä kuin olisit yrityksen omistaja, käyttäen "me" älä käytä "minä".
    Aloita täydennys "<h3>Teknologiastrategia</h3>" seuraa "<h4>Teknologian valinta</h4>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    //danish lang----------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalje 3: Virksomhedens placering er: ${location}.
    forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Disse er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Teknologivalg underemne, vælg og beskriv relevant teknologi, der skal bruges til denne særlige virksomhed. Du bør vælge teknologier, der matcher virksomhedens kapabiliteter og ressourcer (en lille virksomhed med et par ansatte bør ikke bruge kompliceret eller kostbar teknologi). omgiv hver teknologi med <li> tag.
    
    for Forventet teknologibidrag underemne, foreslå hvordan teknologien vil bidrage til virksomheden. omgiv hver teknologibidrag med <li> tag.

    for Tekniske krav emne, fra de valgte teknologier, liste kravene til hver teknologi i form af hardware, software, og netværk. omgiv hver krav med <li> tag.

    for Teknologiimplementering emne, liste trinene til at implementere teknologien inkluderer detaljer om, hvordan man vælger en teknologiudbyder. omgiv hvert trin med <li> tag.

    for Teknologistyring emne, inkluder detaljer om vedligeholdelse, opgraderinger, datastyring, og sikkerhed. omgiv hvert trin med <li> tag.
    
    Gentag ikke forretningsdetaljer.
    Skriv dette som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
    Begynd udfyldelsen med "<h3>Teknologistrategi</h3>" efterfulgt af "<h4>Teknologivalg</h4>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    //norwegian lang----------------------------------------------
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

    for Teknologivalg underemne, velg og beskriv relevant teknologi som skal brukes for denne spesielle virksomheten. Du bør velge teknologier som passer med virksomhetens kapabiliteter og ressurser (en liten virksomhet med et par ansatte bør ikke bruke komplisert eller kostbar teknologi). omgir hver teknologi med <li> tag.
    
    for Forventet teknologibidrag underemne, foreslå hvordan teknologien vil bidra til virksomheten. omgir hver teknologibidrag med <li> tag.

    for Tekniske krav emne, fra de valgte teknologiene, liste kravene til hver teknologi i form av maskinvare, programvare, og nettverk. omgir hver krav med <li> tag.

    for Teknologiimplementering emne, liste trinnene for å implementere teknologien inkluderer detaljer om hvordan man velger en teknologileverandør. omgir hvert trinn med <li> tag.

    for Teknologistyring emne, inkluder detaljer om vedlikehold, oppgraderinger, datastyring, og sikkerhet. omgir hvert trinn med <li> tag.
    
    Gjenta ikke forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" bruk ikke "jeg".
    Begynn utfyllingen med "<h3>Teknologistrategi</h3>" etterfulgt av "<h4>Teknologivalg</h4>"
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
