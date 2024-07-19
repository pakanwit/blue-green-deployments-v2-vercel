import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface IKeyActivitiesAndKPIsPro {
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

export const keyActivitiesAndKPIsPro = (req: IKeyActivitiesAndKPIsPro) => {
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
    en: 'Key Activities and KPIs',
    de: 'Schlüsselaktivitäten und KPIs',
    fr: 'Activités clés et KPI',
    es: 'Actividades clave y KPI',
    it: 'Attività chiave e KPI',
    nl: 'Belangrijkste activiteiten en KPI',
    ja: '主な活動とKPI',
    ar: 'الأنشطة الرئيسية ومؤشرات الأداء الرئيسية',
    sv: 'Nyckelaktiviteter och KPI',
    fi: 'Avainaktiviteetit ja KPI',
    da: 'Nøgleaktiviteter og KPI',
    no: 'Nøkkelaktiviteter og KPI',
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

    for Key Activies topic, this should explain the activities that are undertaken in order for the customer to recevie the product or service. explain what happens in each individual activities. Be insightful when descibing the activities. wrap each activity with <li> tag.

    for KPIs topic, you should come up with several KPIs that are highly relevant and impactful to this business. Each KPI should have these sub-topics: Definition, Importance, and Data Collection. surround the KPI name with <li> tag then the sub-topics should all be in a new line. The KPI names should be in bold. Come with at least 5 KPIs. 
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
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

    for Key Activies topic, this should explain the activities that are undertaken in order for the customer to recevie the product or service. explain what happens in each individual activities. Be insightful when descibing the activities. wrap each activity with <li> tag.

    for KPIs topic, you should come up with several KPIs that are highly relevant and impactful to this business. Each KPI should have these sub-topics: Definition, Importance, and Data Collection. surround the KPI name with <li> tag then the sub-topics should all be in a new line. The KPI names should be in bold. Come with at least 5 KPIs. 
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang---------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Der Standort des Unternehmens ist: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Für das Thema „Schlüsselaktivitäten“ sollte „productInfoPrompt“ die Aktivitäten angeben, die durchgeführt werden, damit der Kunde das Produkt oder die Dienstleistung erhält. Erklären Sie, was bei den einzelnen Aktivitäten passiert. Seien Sie bei der Beschreibung der Aktivitäten aufschlussreich. Umschließen Sie jede Aktivität mit dem Tag <li>.

    Für das Thema „KPIs“ sollten Sie mehrere KPIs erstellen, die für dieses Unternehmen äußerst relevant und wirkungsvoll sind. Jeder KPI sollte die folgenden Unterthemen haben: Definition, Wichtigkeit und Datenerfassung. Wenn Sie den KPI-Namen mit dem Tag <li> umgeben, sollten sich die Unterthemen alle in einer neuen Zeile befinden. Die KPI-Namen sollten fett gedruckt sein. Bringen Sie mindestens 5 KPIs mit.
  
    Wiederholen Sie keine Geschäftsdetails.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie den Abschluss mit „<h3>Betrieb</h3>“, gefolgt von „<h4>Wichtigste Aktivitäten</h4>“.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    //french lang---------------------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client vous sollicite pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

    détails de l'entreprise :
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est ${businessType}.
    détail commercial 3 : L'emplacement de l'entreprise est : ${location}.
    détail commercial 4 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 5 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    pour le sujet des Activités Clés, cela devrait expliquer les activités entreprises pour que le client reçoive le produit ou le service. Expliquez ce qui se passe dans chaque activité individuelle. Soyez perspicace en décrivant les activités. Encadrez chaque activité avec la balise <li>.

    pour le sujet des KPI, vous devez proposer plusieurs KPIs qui sont hautement pertinents et impactants pour cette entreprise. Chaque KPI devrait avoir ces sous-thèmes : Définition, Importance, et Collecte de Données. Entourez le nom du KPI avec la balise <li>, puis les sous-thèmes doivent tous être sur une nouvelle ligne. Les noms des KPI doivent être en gras. Proposez au moins 5 KPIs.

    Ne répétez pas les détails commerciaux.
    Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Commencez la réalisation par "<h3>Opérations</h3>", suivi de "<h4>Activités Clés</h4>"
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang---------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle de negocio 1: El nombre de la empresa del cliente es ${businessName}.
    detalle de negocio 2: El tipo de negocio es ${businessType}.
    detalle de negocio 3: La ubicación del negocio es: ${location}.
    detalle de negocio 4: El canal de distribución del cliente es: ${salesChannel}.
    detalle de negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para el tema de Actividades Clave, esto debe explicar las actividades que se realizan para que el cliente reciba el producto o servicio. Explique qué sucede en cada una de las actividades individuales. Sea perspicaz al describir las actividades. Envuelva cada actividad con la etiqueta <li>.

    para el tema de KPIs, debe proponer varios KPIs que sean altamente relevantes e impactantes para este negocio. Cada KPI debe tener estos subtemas: Definición, Importancia y Recolección de Datos. Rodee el nombre del KPI con la etiqueta <li> y luego los subtemas deben estar todos en una nueva línea. Los nombres de los KPIs deben estar en negrita. Proponga al menos 5 KPIs.

    No repita detalles del negocio.
    Escriba esto como si usted fuera el propietario del negocio, usando "nosotros" no use "yo".
    Comience la finalización con "<h3>Operaciones</h3>", seguido de "<h4>Actividades Clave</h4>"
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.es} que vous avez trouvé :
    `,

    //italian lang---------------------------------------------------------------------
    it: `
    Sei un consulente professionale e un cliente ti si avvicina per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di attività è ${businessType}.
    dettaglio aziendale 3: La posizione dell'azienda è: ${location}.
    dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono dettagli sui prodotti o servizi del cliente:
    ${productInfoPrompt}

    per l'argomento Attività Chiave, questo dovrebbe spiegare le attività che vengono intraprese affinché il cliente riceva il prodotto o servizio. Spiega cosa succede in ciascuna delle attività individuali. Sii perspicace nel descrivere le attività. Inserisci ogni attività all'interno del tag <li>.

    per l'argomento KPI, dovresti proporre diversi KPI che siano altamente rilevanti e impattanti per questa attività. Ogni KPI dovrebbe avere questi sotto-argomenti: Definizione, Importanza e Raccolta Dati. Circonda il nome del KPI con il tag <li> e poi i sotto-argomenti dovrebbero essere tutti su una nuova linea. I nomi dei KPI dovrebbero essere in grassetto. Proporri almeno 5 KPI.

    Non ripetere i dettagli aziendali.
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Inizia la conclusione con "<h3>Operazioni</h3>", seguito da "<h4>Attività Chiave</h4>"
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.it} que vous avez trouvé :
    `,

    //dutch lang ---------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    bedrijfsdetail 3: De locatie van het bedrijf is: ${location}.
    bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    voor het onderwerp Belangrijkste Activiteiten, dit moet de activiteiten uitleggen die worden ondernomen zodat de klant het product of de dienst kan ontvangen. Leg uit wat er gebeurt bij elke individuele activiteit. Wees inzichtelijk bij het beschrijven van de activiteiten. Omring elke activiteit met de <li> tag.

    voor het onderwerp KPI's, u moet met verschillende KPI's komen die zeer relevant en impactvol zijn voor dit bedrijf. Elke KPI moet deze subonderwerpen hebben: Definitie, Belang, en Data Verzameling. Omring de KPI-naam met de <li> tag en dan moeten alle subonderwerpen op een nieuwe regel staan. De KPI-namen moeten vetgedrukt zijn. Kom met minstens 5 KPI's.

    Herhaal geen bedrijfsdetails.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Begin de voltooiing met "<h3>Operaties</h3>" gevolgd door "<h4>Belangrijkste Activiteiten</h4>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang---------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスの種類は${businessType}です。
    ビジネス詳細3：ビジネスの場所は：${location}です。
    ビジネス詳細4：クライアントの流通チャネルは：${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    主要な活動のトピックについては、顧客が製品またはサービスを受け取るために行われる活動を説明する必要があります。各個別の活動で何が起こるかを説明します。活動を説明する際には洞察力を持ってください。各活動を<li>タグで囲みます。

    KPIのトピックについては、このビジネスにとって非常に関連性が高く、影響力のあるいくつかのKPIを提案する必要があります。各KPIには、定義、重要性、データ収集というサブトピックが必要です。KPIの名前を<li>タグで囲み、サブトピックはすべて新しい行にします。KPIの名前は太字にします。少なくとも5つのKPIを提案してください。
    
    ビジネスの詳細を繰り返さないでください。
    これをビジネスのオーナーであるかのように書き、"私たちは"を使用し、"私"は使用しないでください。
    完成を"<h3>オペレーション</h3>"で始め、その後に"<h4>主要な活動</h4>"を続けます。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    // arabic lang---------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك العميل لكتابة ${promptTopic.ar} مفصلة وطويلة لخطة العمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه العمل: ${location}.
    تفاصيل العمل 4: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لموضوع الأنشطة الرئيسية، يجب أن يشرح الأنشطة التي يتم القيام بها لكي يتلقى العميل المنتج أو الخدمة. يجب أن تشرح ما يحدث في كل نشاط فردي. كن ثاقب البصيرة عند وصف الأنشطة. احاطة كل نشاط بوسوم <li>.

    بالنسبة لموضوع المؤشرات الرئيسية للأداء، يجب أن تقترح عدة مؤشرات رئيسية للأداء تكون ذات صلة كبيرة وتأثير قوي على هذا العمل. يجب أن يحتوي كل مؤشر رئيسي للأداء على هذه المواضيع الفرعية: التعريف، الأهمية، وجمع البيانات. احاطة اسم المؤشر الرئيسي للأداء بوسوم <li> ثم يجب أن تكون جميع المواضيع الفرعية في سطر جديد. يجب أن تكون أسماء المؤشرات الرئيسية للأداء بخط عريض. اقترح على الأقل 5 مؤشرات رئيسية للأداء.
    
    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن"، لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>العمليات</h3>" تليها "<h4>الأنشطة الرئيسية</h4>"
    استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    //swedish lang---------------------------------------------------------------------
    sv: `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}.
    Affärsdetalj 3: Platsen för verksamheten är: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens verksamhetsstatus är ${businessOperationalStatus}.

    Detta är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    För ämnet Nyckelaktiviteter bör detta förklara de aktiviteter som utförs för att kunden ska få produkten eller tjänsten. Förklara vad som händer i varje enskild aktivitet. Var insiktsfull när du beskriver aktiviteterna. Omslut varje aktivitet med <li>-taggen.

    För KPI-ämnet bör du komma med flera KPI:er som är mycket relevanta och har stor inverkan på denna verksamhet. Varje KPI bör ha dessa underteman: Definition, Betydelse och Datainsamling. Omslut KPI-namnet med <li>-taggen, sedan ska alla underteman vara på en ny rad. KPI-namnen ska vara i fetstil. Kom med minst 5 KPI:er.
    
    Upprepa inte affärsdetaljerna.
    Skriv detta som om du är ägaren till företaget, använd "vi", använd inte "jag".
    Börja kompletteringen med "<h3>Verksamhet</h3>" följt av "<h4>Nyckelaktiviteter</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang---------------------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan tieto 3: Liiketoiminnan sijainti on: ${location}.
    liiketoiminnan tieto 4: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 5: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Avainaktiviteetit-aiheessa tulee selittää ne toiminnot, jotka suoritetaan, jotta asiakas saa tuotteen tai palvelun. Selitä, mitä tapahtuu jokaisessa yksittäisessä toiminnassa. Ole oivaltava kuvatessasi toimintoja. Kääri jokainen toiminto <li>-tagiin.

    KPI-aiheessa sinun tulisi keksiä useita KPI:ta, jotka ovat erittäin merkityksellisiä ja vaikuttavia tähän liiketoimintaan. Jokaisella KPI:llä tulisi olla nämä ala-aiheet: Määritelmä, Merkitys ja Tietojen keruu. Ympäröi KPI:n nimi <li>-tagilla, sitten ala-aiheet tulisi olla uudella rivillä. KPI:n nimet tulisi olla lihavoitu. Tule vähintään 5 KPI:n kanssa. 
    
    Älä toista liiketoiminnan tietoja.
    Kirjoita tämä kuin olisit yrityksen omistaja, käyttäen "me", älä käytä "minä".
    Aloita täydennys "<h3>Toiminnot</h3>" seurattuna "<h4>Avainaktiviteetit</h4>"
    Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang---------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalj 3: Virksomhedens placering er: ${location}.
    forretningsdetalj 4: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    For emnet Nøgleaktiviteter skal dette forklare de aktiviteter, der udføres for at kunden kan modtage produktet eller tjenesten. Forklar hvad der sker i hver enkelt aktivitet. Vær indsigtsfuld når du beskriver aktiviteterne. Omslut hver aktivitet med <li>-taggen.

    For KPI-emnet skal du komme med flere KPI'er, der er meget relevante og har stor indflydelse på denne virksomhed. Hver KPI skal have disse undertemaer: Definition, Betydning og Dataindsamling. Omslut KPI-navnet med <li>-taggen, derefter skal alle undertemaer være på en ny linje. KPI-navnene skal være i fed. Kom med mindst 5 KPI'er. 
    
    Gentag ikke forretningsdetaljerne.
    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Begynd udfyldningen med "<h3>Drift</h3>" efterfulgt af "<h4>Nøgleaktiviteter</h4>"
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    // norwegian lang---------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Virksomhetens plassering er: ${location}.
    forretningsdetalj 4: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Nøkkelaktiviteter emnet, dette skal forklare de aktivitetene som utføres for at kunden kan motta produktet eller tjenesten. forklar hva som skjer i hver enkelt aktivitet. Vær innsiktsfull når du beskriver aktivitetene. omslutt hver aktivitet med <li> tag.

    for KPI emnet, du bør komme opp med flere KPIer som er svært relevante og har stor innvirkning på denne virksomheten. Hver KPI skal ha disse undertemaene: Definisjon, Betydning, og Datainnsamling. omslutt KPI navnet med <li> tag deretter skal alle undertemaer være på en ny linje. KPI navnene skal være i fet. Kom med minst 5 KPIer. 
    
    Ikke gjenta forretningsdetaljene.
    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Begynn utfyllingen med "<h3>Drift</h3>" etterfulgt av "<h4>Nøkkelaktiviteter</h4>"
    ruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
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

  const payload = {
    model: variantID === '2' ? 'gpt-4o' : modelPlanQuota,
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
