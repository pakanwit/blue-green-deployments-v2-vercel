import { OpenAIStream } from "../../../../../utils/OpenAIChatStream";

interface ICustomerDecisionPro {
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
  productInfoPrompt: string;
  planQuota: number;
  planLanguage: string;
  variantID: string;
}
export const CustomerDecisionPro = (req: ICustomerDecisionPro) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,
    customerIncome1,
    customerIncome2,
    customerIncome3,
    customerDescription1,
    customerDescription2,
    customerDescription3,
    mark2Ref,
    planLanguage,
    planQuota,
    variantID,
  } = req;

  console.log("mark2Ref from api6Mark3:", mark2Ref);

  let customerPrompt = "";
  const customerDescriptions = [
    { description: customerDescription1, income: customerIncome1 },
    { description: customerDescription2, income: customerIncome2 },
    { description: customerDescription3, income: customerIncome3 },
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
  const incomeTranslations = {
    de: "Einkommen:",
    fr: "Revenu:",
    es: "Ingresos:",
    it: "Reddito:",
    nl: "Inkomen:",
    ja: "収入:",
    ar: "الدخل:",
    sv: "Inkomst:",
    fi: "Tulo:",
    da: "Indkomst:",
    no: "Inntekt:",
    default: "Income:",
  };

  customerDescriptions.forEach((customer, index) => {
    if (customer.description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups["default"]} ${index + 1}: ${customer.description}, ${incomeTranslations[planLanguage] || incomeTranslations["default"]} ${customer.income}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions["default"]}\n${customerPrompt}`;

  const promptTopic = {
    en: "Customer Decision Process",
    de: "Kundenentscheidungsprozess",
    fr: "Processus de décision du client",
    es: "Proceso de decisión del cliente",
    it: "Processo decisionale del cliente",
    nl: "Klantbeslissingsproces",
    ja: "顧客決定プロセス",
    ar: "عملية اتخاذ العميل",
    sv: "Kundbeslutsprocess",
    fi: "Asiakkaan päätöksentekoprosessi",
    da: "Kundebeslutningsproces",
    no: "Kundebeslutningsprosess",
  };

  const prompt = {
    "en-uk": `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    Customer group details: 
    ${customerPrompt}

    These are the topic that should be included:
    1. Recognition of need
    2. information search
    3. Evaluation of alternatives
    4. Purchase decision
    5. Post-purchase behavior
    don't include other topics unless specified here. Be very insightful in generating content for each topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${promptTopic.en} topics with h5 tag. 
    Begin the completion with "<h4>${promptTopic.en}</h4>" followed by "<h5>Recognition of Need</h5>" and so on.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    //english lang
    en: `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    Customer group details: 
    ${customerPrompt}

    These are the topic that should be included:
    1. Recognition of need
    2. information search
    3. Evaluation of alternatives
    4. Purchase decision
    5. Post-purchase behavior
    don't include other topics unless specified here. Be very insightful in generating content for each topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${promptTopic.en} topics with h5 tag. 
    Begin the completion with "<h4>${promptTopic.en}</h4>" followed by "<h5>Recognition of Need</h5>" and so on.
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang----------------------------------------------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde wendet sich an Sie, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu schreiben.

    Geschäftsdetails:
    Geschäftsdetail 1: Der Geschäftsname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    business detail 5: Der Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Angaben zur Kundengruppe:
    ${customerPrompt}

    Dies sind die Themen, die enthalten sein sollten:
    1. Erkennen des Bedarfs
    2. Informationssuche
    3. Bewertung von Alternativen
    4. Kaufentscheidung
    5. Verhalten nach dem Kauf
    Nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie bei der Erstellung von Inhalten für jedes Thema sehr aufschlussreich.
    
    Wiederholen Sie keine geschäftlichen Details.
    Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
    Erzeugen Sie eine Antwort in html, die ${promptTopic.de} Themen mit dem h5-Tag umgibt. 
    Beginnen Sie die Ergänzung mit "<h4>${promptTopic.de}</h4>", gefolgt von "<h5>Bedürfniserkennung</h5>" und so weiter.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    //french lang----------------------------------------------------------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client vous sollicite pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

    Détails de l'entreprise :

    Détail de l'entreprise 1 : Le nom commercial du client est ${businessName}.
    Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
    Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    Détail de l'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
    Détail de l'entreprise 5 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.
    Informations sur le groupe de clients :
    ${customerPrompt}

    Voici les thèmes qui devraient être inclus :

    Reconnaissance des besoins
    Recherche d'informations
    Évaluation des alternatives
    Décision d'achat
    Comportement post-achat
    N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très perspicace dans la création de contenu pour chaque sujet.
    Ne répétez pas les détails commerciaux.
    Écrivez comme si vous étiez le propriétaire de l'entreprise, utilisez "nous" et non "je".
    Générez une réponse en html entourant les thèmes de ${promptTopic.fr} avec la balise h5.
    Commencez par "<h4>${promptTopic.fr}</h4>", suivi de "<h5>Reconnaissance des besoins</h5>" et ainsi de suite.
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang----------------------------------------------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocio.

  Detalles del negocio:

  Detalle del negocio 1: El nombre comercial del cliente es ${businessName}.
  Detalle del negocio 2: El tipo de negocio es ${businessType}.
  Detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
  Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
  Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  Detalles del grupo de clientes:
  ${customerPrompt}

  Estos son los temas que deben incluirse:

  Reconocimiento de la necesidad
  Búsqueda de información
  Evaluación de alternativas
  Decisión de compra
  Comportamiento post-compra
  No incluya otros temas a menos que se especifiquen aquí. Sea muy perspicaz al crear contenido para cada tema.
  No repita los detalles del negocio.
  Escriba como si fuera el propietario del negocio, utilizando "nosotros" en lugar de "yo".
  Genere una respuesta en HTML rodeando los temas de ${promptTopic.es} con la etiqueta h5.
  Comience con "<h4>${promptTopic.es}</h4>", seguido de "<h5>Reconocimiento de la necesidad</h5>" y así sucesivamente.
  Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
  Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang----------------------------------------------------------------------------------------------------------
    it: `
    Lei è un consulente professionista e un cliente si rivolge a lei per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

  Dettagli dell'azienda:

  Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  Dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
  Dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  Dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  Dettagli del gruppo clienti:
  ${customerPrompt}

  Questi sono i temi che dovrebbero essere inclusi:

  Riconoscimento del bisogno
  Ricerca di informazioni
  Valutazione delle alternative
  Decisione di acquisto
  Comportamento post-acquisto
  Non includa altri temi a meno che non siano specificati qui. Sia molto perspicace nella creazione di contenuti per ciascun tema.
  Non ripeta i dettagli aziendali.
  Scriva come se fosse il proprietario dell'azienda, utilizzando "noi" invece di "io".
  Generi una risposta in HTML che circonda i temi di ${promptTopic.it} con il tag h5.
  Inizi con "<h4>${promptTopic.it}</h4>", seguito da "<h5>Riconoscimento del bisogno</h5>" e così via.
  Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
  Genera tutto in italiano.
  Questo è importante: Sii molto perspicace nella tua risposta.
  Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,
    // dutch lang----------------------------------------------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Klantgroep details: 
    ${customerPrompt}

    Dit zijn de onderwerpen die moeten worden opgenomen:
    1. Behoefteherkenning
    2. Informatie zoeken
    3. Evaluatie van alternatieven
    4. Aankoopbeslissing
    5. Gedrag na aankoop
    Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer inzichtelijk bij het genereren van inhoud voor elk onderwerp.
    
    Herhaal geen bedrijfsdetails.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer een reactie in html rond de onderwerpen van ${promptTopic.nl} met de h5-tag. 
    Begin de voltooiing met "<h4>${promptTopic.nl}</h4>" gevolgd door "<h5>Behoefteherkenning</h5>" enzovoort.
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    // japanese lang----------------------------------------------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのために詳細で長い${promptTopic.ja}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスの種類は${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    顧客グループの詳細：
    ${customerPrompt}

    含めるべきトピックは以下の通りです：
    1. 必要性の認識
    2. 情報検索
    3. 代替案の評価
    4. 購入決定
    5. 購入後の行動
    ここで指定されていない他のトピックは含めないでください。各トピックのコンテンツを生成する際には非常に洞察力を発揮してください。
    
    ビジネスの詳細を繰り返さないでください。
    あなたがビジネスのオーナーであるかのように書いてください。"私たち"を使用し、"私"は使用しないでください。
    ${promptTopic.ja}のトピックをh5タグで囲んだhtmlのレスポンスを生成します。
    完成を"<h4>${promptTopic.ja}</h4>"で始め、その後に"<h5>必要性の認識</h5>"などを続けます。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang----------------------------------------------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك العميل لكتابة ${promptTopic.ar} مفصلة وطويلة لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو قناة التوزيع للعميل: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    تفاصيل مجموعة العملاء:
    ${customerPrompt}

    هذه هي المواضيع التي يجب تضمينها:
    1. الاعتراف بالحاجة
    2. البحث عن المعلومات
    3. تقييم البدائل
    4. قرار الشراء
    5. السلوك بعد الشراء
    لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن ذا بصيرة عند إنشاء المحتوى لكل موضوع.
    
    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت صاحب العمل، استخدم "نحن" لا تستخدم "أنا".
    أنشئ ردًا في html يحيط بمواضيع ${promptTopic.ar} بوساطة الوسم h5.
    ابدأ الاكمال بـ "<h4>${promptTopic.ar}</h4>" تليها "<h5>الاعتراف بالحاجة</h5>" وهكذا دواليك.
    استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang----------------------------------------------------------------------------------------------------------
    sv: `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}.
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

    Kundgruppsdetaljer:
    ${customerPrompt}

    Dessa är ämnen som bör ingå:
    1. Erkännande av behov
    2. Informationssökning
    3. Utvärdering av alternativ
    4. Köpbeslut
    5. Beteende efter köp
    Inkludera inte andra ämnen om de inte specificeras här. Var mycket insiktsfull när du genererar innehåll för varje ämne.
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Generera svar i html som omger ${promptTopic.sv} ämnen med h5-taggen.
    Börja slutförandet med "<h4>${promptTopic.sv}</h4>" följt av "<h5>Erkännande av behov</h5>" och så vidare.
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang----------------------------------------------------------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaa varten.

    Liiketoiminnan tiedot:
    Liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    Liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}.
    Liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    Liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    Liiketoiminnan yksityiskohta 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Asiakasryhmän tiedot:
    ${customerPrompt}

    Nämä ovat aiheet, jotka tulisi sisällyttää:
    1. Tarpeen tunnistaminen
    2. Tiedon haku
    3. Vaihtoehtojen arviointi
    4. Ostopäätös
    5. Jälkiostokäyttäytyminen
    Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. Ole erittäin oivaltava luodessasi sisältöä jokaiseen aiheeseen.
    
    Älä toista liiketoiminnan yksityiskohtia.
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Generoi vastaus html-muodossa ympäröimällä ${promptTopic.fi} aiheet h5-tagilla.
    Aloita täydennys "<h4>${promptTopic.fi}</h4>" seuraa "<h5>Tarpeen tunnistaminen</h5>" ja niin edelleen.
    Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang----------------------------------------------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalje 2: Typen af forretning er ${businessType}.
    Forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    Forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    Forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Kundegruppedetaljer: 
    ${customerPrompt}

    Disse er emnerne, der skal inkluderes:
    1. Behovserkendelse
    2. Informationssøgning
    3. Evaluering af alternativer
    4. Købsbeslutning
    5. Adfærd efter køb
    Inkluder ikke andre emner, medmindre de er specificeret her. Vær meget indsigtsfuld i generering af indhold for hvert emne.
    
    Gentag ikke forretningsdetaljer.
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Generer svar i html, der omgiver ${promptTopic.da} emner med h5-tag.
    Begynd udfyldningen med "<h4>${promptTopic.da}</h4>" efterfulgt af "<h5>Behovserkendelse</h5>" og så videre.
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,
    // norwegian lang----------------------------------------------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalje 2: Typen av forretning er ${businessType}.
    Forretningsdetalje 3: Dette er hvor virksomhetens kunder er: ${location}.
    Forretningsdetalje 4: Kundens distribusjonskanal er: ${salesChannel}.
    Forretningsdetalje 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Kundegruppedetaljer: 
    ${customerPrompt}

    Disse er emnene som skal inkluderes:
    1. Behovserkjennelse
    2. Informasjonssøk
    3. Evaluering av alternativer
    4. Kjøpsbeslutning
    5. Etterkjøpsatferd
    Ikke inkluder andre emner med mindre de er spesifisert her. Vær veldig innsiktsfull i generering av innhold for hvert emne.
    
    Ikke gjenta forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Generer svar i html, som omgir ${promptTopic.no} emner med h5-tag.
    Begynn utfyllingen med "<h4>${promptTopic.no}</h4>" etterfulgt av "<h5>Behovserkjennelse</h5>" og så videre.
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
