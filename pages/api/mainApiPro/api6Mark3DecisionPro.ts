import { OpenAIStream } from '../../../utils/OpenAIChatStream';
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api6Mark3DecisionPro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerType,

    customerIncome1,
    customerIncome2,
    customerIncome3,

    customerDescription1,
    customerDescription2,
    customerDescription3,

    successFactors1,
    successFactors2,
    successFactors3,

    weakness1,
    weakness2,
    weakness3,

    initialInvestmentAmount,
    investmentItem1,
    investmentItem2,
    investmentItem3,
    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    mark2Ref,
    productInfoPrompt,
    planQuota,
    planLanguage,
  } = await request.json();

  let UKEngPrompt = '';
  if (planLanguage === 'en-uk')
    UKEngPrompt = 'use british english spelling and grammar';

  let modelPlanQuota = 'gpt-3.5-turbo';
  if (planQuota <= 8) {
    modelPlanQuota = 'gpt-3.5-turbo';
    console.log('using gpt-3.5-turbo');
  } else {
    modelPlanQuota = 'gpt-4';
    console.log('using gpt-4');
  }

  console.log('mark2Ref from api6Mark3:', mark2Ref);

  const targeting = mark2Ref.substring(mark2Ref.indexOf('<h5>Targeting</h5>'));

  const positioning = mark2Ref.substring(
    mark2Ref.indexOf('<h5>Positioning</h5>'),
  );

  let customerPrompt = '';
  const customerDescriptions = [
    { description: customerDescription1, income: customerIncome1 },
    { description: customerDescription2, income: customerIncome2 },
    { description: customerDescription3, income: customerIncome3 },
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
  const incomeTranslations = {
    de: 'Einkommen:',
    fr: 'Revenu:',
    es: 'Ingresos:',
    it: 'Reddito:',
    nl: 'Inkomen:',
    ja: '収入:',
    ar: 'الدخل:',
    sv: 'Inkomst:',
    fi: 'Tulo:',
    da: 'Indkomst:',
    no: 'Inntekt:',
    default: 'Income:',
  };

  customerDescriptions.forEach((customer, index) => {
    if (customer.description) {
      customerPrompt += `${customerGroups[planLanguage] || customerGroups['default']} ${index + 1}: ${customer.description}, ${incomeTranslations[planLanguage] || incomeTranslations['default']} ${customer.income}\n`;
    }
  });

  customerPrompt = `${customerGroupDescriptions[planLanguage] || customerGroupDescriptions['default']}\n${customerPrompt}`;

  const mark3TopicEN = 'Customer Decision Process';
  const mark3PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mark3TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    Customer group details: 
    ${customerPrompt}

    use 500 words to generate ${mark3TopicEN}. 
    These are the topic that should be included:
    1. Recognition of need
    2. information search
    3. Evaluation of alternatives
    4. Purchase decision
    5. Post-purchase behavior
    don't include other topics unless specified here. Be very insightful in generating content for each topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h4>${mark3TopicEN}</h4>" followed by "<h5>Recognition of Need</h5>" and so on.
    Generate everything in English.
    ${UKEngPrompt}
    This is the insightful ${mark3TopicEN} you came up with:
    `;

  //german lang----------------------------------------------------------------------------------------------------------
  const mark3TopicDE = 'Kundenentscheidungsprozess';
  const mark3PromptDE = `Sie sind ein professioneller Berater und ein Kunde wendet sich an Sie, um einen langen und detaillierten ${mark3TopicDE} für einen Geschäftsplan zu schreiben.

    Geschäftsdetails:
    Geschäftsdetail 1: Der Geschäftsname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    business detail 5: Der Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Angaben zur Kundengruppe:
    ${customerPrompt}

    Verwenden Sie 500 Wörter, um ${mark3TopicDE} zu erzeugen. 
    Dies sind die Themen, die enthalten sein sollten:
    1. Erkennen des Bedarfs
    2. Informationssuche
    3. Bewertung von Alternativen
    4. Kaufentscheidung
    5. Verhalten nach dem Kauf
    Nehmen Sie keine anderen Themen auf, es sei denn, sie sind hier angegeben. Seien Sie bei der Erstellung von Inhalten für jedes Thema sehr aufschlussreich.
    
    Wiederholen Sie keine geschäftlichen Details.
    Schreiben Sie so, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir" und nicht "ich".
    Erzeugen Sie eine Antwort in html, die ${mark3TopicDE} Themen mit dem h5-Tag umgibt. 
    Beginnen Sie die Ergänzung mit "<h4>${mark3TopicDE}</h4>", gefolgt von "<h5>Bedürfniserkennung</h5>" und so weiter.
    Fertigstellung auf Deutsch generieren.
    
    Dies ist das aufschlussreiche ${mark3TopicDE}, das Sie sich ausgedacht haben:`;

  //french lang----------------------------------------------------------------------------------------------------------
  const mark3TopicFR = 'Processus de décision du client';
  const mark3PromptFR = `
    Vous êtes un consultant professionnel et un client vous sollicite pour rédiger un ${mark3TopicFR} long et détaillé pour un plan d'affaires.

    Détails de l'entreprise :

    Détail de l'entreprise 1 : Le nom commercial du client est ${businessName}.
    Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
    Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    Détail de l'entreprise 4 : Le canal de distribution du client est : ${salesChannel}.
    Détail de l'entreprise 5 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.
    Informations sur le groupe de clients :
    ${customerPrompt}

    Utilisez 500 mots pour générer ${mark3TopicFR}.
    Voici les thèmes qui devraient être inclus :

    Reconnaissance des besoins
    Recherche d'informations
    Évaluation des alternatives
    Décision d'achat
    Comportement post-achat
    N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici. Soyez très perspicace dans la création de contenu pour chaque sujet.
    Ne répétez pas les détails commerciaux.
    Écrivez comme si vous étiez le propriétaire de l'entreprise, utilisez "nous" et non "je".
    Générez une réponse en html entourant les thèmes de ${mark3TopicFR} avec la balise h5.
    Commencez par "<h4>${mark3TopicFR}</h4>", suivi de "<h5>Reconnaissance des besoins</h5>" et ainsi de suite.
    Générez la réponse en français.

    Voici le ${mark3TopicFR} perspicace que vous avez conçu :
    `;

  //spanish lang----------------------------------------------------------------------------------------------------------
  const mark3TopicES = 'Proceso de decisión del cliente';
  const mark3PromptES = `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${mark3TopicES} largo y detallado para un plan de negocio.

  Detalles del negocio:

  Detalle del negocio 1: El nombre comercial del cliente es ${businessName}.
  Detalle del negocio 2: El tipo de negocio es ${businessType}.
  Detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
  Detalle del negocio 4: El canal de distribución del cliente es: ${salesChannel}.
  Detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  Detalles del grupo de clientes:
  ${customerPrompt}

  Utilice 500 palabras para generar ${mark3TopicES}.
  Estos son los temas que deben incluirse:

  Reconocimiento de la necesidad
  Búsqueda de información
  Evaluación de alternativas
  Decisión de compra
  Comportamiento post-compra
  No incluya otros temas a menos que se especifiquen aquí. Sea muy perspicaz al crear contenido para cada tema.
  No repita los detalles del negocio.
  Escriba como si fuera el propietario del negocio, utilizando "nosotros" en lugar de "yo".
  Genere una respuesta en HTML rodeando los temas de ${mark3TopicES} con la etiqueta h5.
  Comience con "<h4>${mark3TopicES}</h4>", seguido de "<h5>Reconocimiento de la necesidad</h5>" y así sucesivamente.
  Genere la respuesta en español.

  Este es el ${mark3TopicES} perspicaz que usted ha ideado:
    `;

  //italian lang----------------------------------------------------------------------------------------------------------
  const mark3TopicIT = 'Processo decisionale del cliente';
  const mark3PromptIT = `
    Lei è un consulente professionista e un cliente si rivolge a lei per scrivere un ${mark3TopicIT} lungo e dettagliato per un piano aziendale.

  Dettagli dell'azienda:

  Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  Dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
  Dettaglio aziendale 4: Il canale di distribuzione del cliente è: ${salesChannel}.
  Dettaglio aziendale 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  Dettagli del gruppo clienti:
  ${customerPrompt}

  Utilizzi 500 parole per generare ${mark3TopicIT}.
  Questi sono i temi che dovrebbero essere inclusi:

  Riconoscimento del bisogno
  Ricerca di informazioni
  Valutazione delle alternative
  Decisione di acquisto
  Comportamento post-acquisto
  Non includa altri temi a meno che non siano specificati qui. Sia molto perspicace nella creazione di contenuti per ciascun tema.
  Non ripeta i dettagli aziendali.
  Scriva come se fosse il proprietario dell'azienda, utilizzando "noi" invece di "io".
  Generi una risposta in HTML che circonda i temi di ${mark3TopicIT} con il tag h5.
  Inizi con "<h4>${mark3TopicIT}</h4>", seguito da "<h5>Riconoscimento del bisogno</h5>" e così via.
  Generi la risposta in italiano.

  Questo è l'informativo ${mark3TopicIT} che lei ha ideato:
    `;
  // dutch lang----------------------------------------------------------------------------------------------------------
  const mark3TopicNL = 'Klantbeslissingsproces';
  const mark3PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mark3TopicNL} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Klantgroep details: 
    ${customerPrompt}

    Gebruik 500 woorden om ${mark3TopicNL} te genereren. 
    Dit zijn de onderwerpen die moeten worden opgenomen:
    1. Behoefteherkenning
    2. Informatie zoeken
    3. Evaluatie van alternatieven
    4. Aankoopbeslissing
    5. Gedrag na aankoop
    Voeg geen andere onderwerpen toe tenzij hier gespecificeerd. Wees zeer inzichtelijk bij het genereren van inhoud voor elk onderwerp.
    
    Herhaal geen bedrijfsdetails.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer een reactie in html rond de onderwerpen van ${mark3TopicNL} met de h5-tag. 
    Begin de voltooiing met "<h4>${mark3TopicNL}</h4>" gevolgd door "<h5>Behoefteherkenning</h5>" enzovoort.
    Genereer alles in het Nederlands.
    Dit is het inzichtelijke ${mark3TopicNL} dat u heeft bedacht:
    `;

  // japanese lang----------------------------------------------------------------------------------------------------------
  const mark3TopicJP = '顧客決定プロセス';
  const mark3PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのために詳細で長い${mark3TopicJP}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスの種類は${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細5：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    顧客グループの詳細：
    ${customerPrompt}

    ${mark3TopicJP}を生成するために500語を使用します。
    含めるべきトピックは以下の通りです：
    1. 必要性の認識
    2. 情報検索
    3. 代替案の評価
    4. 購入決定
    5. 購入後の行動
    ここで指定されていない他のトピックは含めないでください。各トピックのコンテンツを生成する際には非常に洞察力を発揮してください。
    
    ビジネスの詳細を繰り返さないでください。
    あなたがビジネスのオーナーであるかのように書いてください。"私たち"を使用し、"私"は使用しないでください。
    ${mark3TopicJP}のトピックをh5タグで囲んだhtmlのレスポンスを生成します。
    完成を"<h4>${mark3TopicJP}</h4>"で始め、その後に"<h5>必要性の認識</h5>"などを続けます。
    すべてを日本語で生成します。
    これがあなたが考え出した洞察に満ちた${mark3TopicJP}です：
    `;

  //arabic lang----------------------------------------------------------------------------------------------------------
  const mark3TopicAR = 'عملية اتخاذ العميل';
  const mark3PromptAR = `
    أنت مستشار محترف، ويقترب منك العميل لكتابة ${mark3TopicAR} مفصلة وطويلة لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو قناة التوزيع للعميل: ${salesChannel}.
    تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    تفاصيل مجموعة العملاء:
    ${customerPrompt}

    استخدم 500 كلمة لإنشاء ${mark3TopicAR}.
    هذه هي المواضيع التي يجب تضمينها:
    1. الاعتراف بالحاجة
    2. البحث عن المعلومات
    3. تقييم البدائل
    4. قرار الشراء
    5. السلوك بعد الشراء
    لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. كن ذا بصيرة عند إنشاء المحتوى لكل موضوع.
    
    لا تكرر تفاصيل العمل.
    اكتب هذا كما لو كنت صاحب العمل، استخدم "نحن" لا تستخدم "أنا".
    أنشئ ردًا في html يحيط بمواضيع ${mark3TopicAR} بوساطة الوسم h5.
    ابدأ الاكمال بـ "<h4>${mark3TopicAR}</h4>" تليها "<h5>الاعتراف بالحاجة</h5>" وهكذا دواليك.
    أنشئ كل شيء باللغة العربية.
    هذا هو ${mark3TopicAR} الذي ابتكرته:
    `;

  // swedish lang----------------------------------------------------------------------------------------------------------
  const mark3TopicSV = 'Kundbeslutsprocess';
  const mark3PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${mark3TopicSV} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}.
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 5: Kundens företags operativa status är ${businessOperationalStatus}.

    Kundgruppsdetaljer:
    ${customerPrompt}

    Använd 500 ord för att generera ${mark3TopicSV}.
    Dessa är ämnen som bör ingå:
    1. Erkännande av behov
    2. Informationssökning
    3. Utvärdering av alternativ
    4. Köpbeslut
    5. Beteende efter köp
    Inkludera inte andra ämnen om de inte specificeras här. Var mycket insiktsfull när du genererar innehåll för varje ämne.
    
    Upprepa inte affärsdetaljer.
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Generera svar i html som omger ${mark3TopicSV} ämnen med h5-taggen.
    Börja slutförandet med "<h4>${mark3TopicSV}</h4>" följt av "<h5>Erkännande av behov</h5>" och så vidare.
    Generera allt på svenska.
    Detta är den insiktsfulla ${mark3TopicSV} du kom upp med:
    `;

  // finnish lang----------------------------------------------------------------------------------------------------------
  const mark3TopicFI = 'Asiakkaan päätöksentekoprosessi';
  const mark3PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark3TopicFI} liiketoimintasuunnitelmaa varten.

    Liiketoiminnan tiedot:
    Liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    Liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}.
    Liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    Liiketoiminnan yksityiskohta 4: Asiakkaan jakelukanava on: ${salesChannel}.
    Liiketoiminnan yksityiskohta 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Asiakasryhmän tiedot:
    ${customerPrompt}

    Käytä 500 sanaa generoidaksesi ${mark3TopicFI}.
    Nämä ovat aiheet, jotka tulisi sisällyttää:
    1. Tarpeen tunnistaminen
    2. Tiedon haku
    3. Vaihtoehtojen arviointi
    4. Ostopäätös
    5. Jälkiostokäyttäytyminen
    Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä. Ole erittäin oivaltava luodessasi sisältöä jokaiseen aiheeseen.
    
    Älä toista liiketoiminnan yksityiskohtia.
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Generoi vastaus html-muodossa ympäröimällä ${mark3TopicFI} aiheet h5-tagilla.
    Aloita täydennys "<h4>${mark3TopicFI}</h4>" seuraa "<h5>Tarpeen tunnistaminen</h5>" ja niin edelleen.
    Generoi kaikki suomeksi.
    Tämä on oivaltava ${mark3TopicFI}, jonka loit:
    `;

  // danish lang----------------------------------------------------------------------------------------------------------
  const mark3TopicDA = 'Kundebeslutningsproces';
  const mark3PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer dig for at skrive en lang og detaljeret ${mark3TopicDA} til en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalje 2: Typen af forretning er ${businessType}.
    Forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    Forretningsdetalje 4: Kundens distributionskanal er: ${salesChannel}.
    Forretningsdetalje 5: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Kundegruppedetaljer: 
    ${customerPrompt}

    Brug 500 ord til at generere ${mark3TopicDA}.
    Disse er emnerne, der skal inkluderes:
    1. Behovserkendelse
    2. Informationssøgning
    3. Evaluering af alternativer
    4. Købsbeslutning
    5. Adfærd efter køb
    Inkluder ikke andre emner, medmindre de er specificeret her. Vær meget indsigtsfuld i generering af indhold for hvert emne.
    
    Gentag ikke forretningsdetaljer.
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Generer svar i html, der omgiver ${mark3TopicDA} emner med h5-tag.
    Begynd udfyldningen med "<h4>${mark3TopicDA}</h4>" efterfulgt af "<h5>Behovserkendelse</h5>" og så videre.
    Generer alt på dansk.
    Dette er den indsigtsfulde ${mark3TopicDA} du kom op med:
    `;
  // norwegian lang----------------------------------------------------------------------------------------------------------
  const mark3TopicNO = 'Kundebeslutningsprosess';
  const mark3PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${mark3TopicNO} for en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalje 2: Typen av forretning er ${businessType}.
    Forretningsdetalje 3: Dette er hvor virksomhetens kunder er: ${location}.
    Forretningsdetalje 4: Kundens distribusjonskanal er: ${salesChannel}.
    Forretningsdetalje 5: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Kundegruppedetaljer: 
    ${customerPrompt}

    Bruk 500 ord for å generere ${mark3TopicNO}.
    Disse er emnene som skal inkluderes:
    1. Behovserkjennelse
    2. Informasjonssøk
    3. Evaluering av alternativer
    4. Kjøpsbeslutning
    5. Etterkjøpsatferd
    Ikke inkluder andre emner med mindre de er spesifisert her. Vær veldig innsiktsfull i generering av innhold for hvert emne.
    
    Ikke gjenta forretningsdetaljer.
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Generer svar i html, som omgir ${mark3TopicNO} emner med h5-tag.
    Begynn utfyllingen med "<h4>${mark3TopicNO}</h4>" etterfulgt av "<h5>Behovserkjennelse</h5>" og så videre.
    Generer alt på norsk.
    Dette er den innsiktsfulle ${mark3TopicNO} du kom opp med:
    `;

  // other lang----------------------------------------------------------------------------------------------------------
  const mark3TopicXX = 'Customer Decision Process';
  const mark3PromptXX = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mark3TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's distribution channel is: ${salesChannel}.
    business detail 5: The client's business operational status is ${businessOperationalStatus}.

    Customer group details: 
    ${customerPrompt}

    use 500 words to generate ${mark3TopicEN}. 
    These are the topic that should be included:
    1. Recognition of need
    2. information search
    3. Evaluation of alternatives
    4. Purchase decision
    5. Post-purchase behavior
    don't include other topics unless specified here. Be very insightful in generating content for each topic.
    
    Do not repeat business details.
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding ${mark3TopicEN} topics with h5 tag. 
    Begin the completion with "<h4>${mark3TopicEN}</h4>" followed by "<h5>Recognition of Need</h5>" and so on.
    Generate everything in English.
    This is the insightful ${mark3TopicEN} you came up with:
    `;

  let mark3PromptFinal = '';

  console.log('planLanguage:', planLanguage);

  if (planLanguage === 'en') {
    mark3PromptFinal = mark3PromptEN;
  } else if (planLanguage === 'de') {
    mark3PromptFinal = mark3PromptDE;
  } else if (planLanguage === 'fr') {
    mark3PromptFinal = mark3PromptFR;
  } else if (planLanguage === 'es') {
    mark3PromptFinal = mark3PromptES;
  } else if (planLanguage === 'it') {
    mark3PromptFinal = mark3PromptIT;
  } else if (planLanguage === 'nl') {
    mark3PromptFinal = mark3PromptNL;
  } else if (planLanguage === 'ja') {
    mark3PromptFinal = mark3PromptJP;
  } else if (planLanguage === 'ar') {
    mark3PromptFinal = mark3PromptAR;
  } else if (planLanguage === 'sv') {
    mark3PromptFinal = mark3PromptSV;
  } else if (planLanguage === 'fi') {
    mark3PromptFinal = mark3PromptFI;
  } else if (planLanguage === 'da') {
    mark3PromptFinal = mark3PromptDA;
  } else if (planLanguage === 'no') {
    mark3PromptFinal = mark3PromptNO;
  } else {
    mark3PromptFinal = mark3PromptEN;
  }

  console.log('mark3PromptFinal:', mark3PromptFinal);

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: mark3PromptFinal }],
    temperature: 0.3,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
