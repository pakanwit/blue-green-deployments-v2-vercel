import { OpenAIStream } from "../../../../utils/OpenAIChatStream";
// a bunch of states to be input into prompts of payloads

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

// TODO: Remove withApiKeyValidation for `runtime: 'edge'` case
export default async function api2Situ1(request, response) {
  console.log("api2Situ1 running");

  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,
    customerDescription,
    successFactors1,
    successFactors2,
    successFactors3,
    initialInvestmentAmount,
    investmentItem1,
    investmentItem2,
    investmentItem3,
    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    productInfoPrompt,
    planLanguage,
  } = await request.json();

  let UKEngPrompt = "";
  if (planLanguage === "en-uk")
    UKEngPrompt = "use british english spelling and grammar";

  const situ1TopicEN = "Industry Overview and Key Market Trends";
  const situ1PromptEN = `
  You are a professional consultant, and a client approaches you to write a detailed ${situ1TopicEN} for a business plan.
  These are the business details:
  business detail 1: The client's business name is ${businessName}.
  business detail 2: The type of business is ${businessType}. 
  business detail 3: This is where the business's customers are: ${location}.
  business detail 4: The client's distribution channel is ${salesChannel}.
  business detail 5: The client's business operational status is ${businessOperationalStatus}.

  These are details of the client's products or services:
  ${productInfoPrompt}

  These are further instructions:
  Have a positive outlook when generating ${situ1TopicEN}.
  Be very descriptive when generating content on ${situ1TopicEN}.
  Don't mention customer segments.
  Each topic should contain roughly the same amount of text.
  be very descriptive when generating ${situ1TopicEN}.
  
  Include real statistics and it's source where relevant.
  DO NOT quote made-up statistics or quote a made-up research firm like ABC Research or XYZ Research.
  DO NOT mention undefined statistics like $XX.XX, $X.XX, XX.X%, or XX.XX%.
  Don't include repetitive statistics.
  
  Write this as if you are the owner of the business, using "we" don't use "I".
  Don't include other topics unless specified here.
  Generate response in html surrounding "Industry Overview" and "Key Market Trends" with h4 tag.
  In "Key Market Trends" topic surround each key trend with <li> tag. 
  Begin the completion with "<h3>Situation Analysis</h3>" followed by "<h4>Industry Overview</h4>"
  Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
  Generate everything in English.
  ${UKEngPrompt}
  This is important: Be very insightful in your response.
  This is the long, detailed, and insightful ${situ1TopicEN} you came up with:
  `;

  //german lang--------------------------------------------------------------
  const situ1TopicDE = "Branchenüberblick und wichtige Markttrends";
  const situ1PromptDE = `
  Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen detaillierten ${situ1TopicDE} für einen Geschäftsplan zu verfassen.
   Dies sind die Geschäftsdaten:
   Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
   Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
   Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
   Geschäftsdetail 4: Der Vertriebskanal des Kunden ist ${salesChannel}.
   Geschäftsdetail 5: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

   Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
   ${productInfoPrompt}

   Dies sind weitere Anweisungen:
   Seien Sie positiv eingestellt, wenn Sie ${situ1TopicDE} generieren.
   Seien Sie sehr beschreibend, wenn Sie Inhalte zu ${situ1TopicDE} erstellen.
   Erwähnen Sie keine Kundensegmente.
   Jedes Thema sollte ungefähr die gleiche Textmenge enthalten.
   Seien Sie beim Generieren von ${situ1TopicDE} sehr aussagekräftig.
  
   Fügen Sie echte Statistiken und deren Quelle hinzu, wo relevant.
   ZITIEREN SIE KEINE erfundenen Statistiken oder zitieren Sie kein erfundenes Forschungsunternehmen wie ABC Research oder XYZ Research.
   Erwähnen Sie KEINE undefinierten Statistiken wie $XX.XX oder XX.X%.
   Fügen Sie keine wiederholten Statistiken ein.
  
   Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
   Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
   Generieren Sie mit dem h4-Tag Antworten im HTML-Format rund um „Branchenüberblick“ und „Wichtige Markttrends“.
   Umgeben Sie im Thema „Wichtige Markttrends“ jeden wichtigen Trend mit dem Tag <li>.
   Beginnen Sie den Abschluss mit „<h3>Situationsanalyse</h3>“, gefolgt von „<h4>Branchenüberblick</h4>“.
   Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
Generiere alles auf Deutsch.
Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
Dies ist das lange, detaillierte und aufschlussreiche ${situ1TopicDE}, das Sie sich ausgedacht haben:
  `;
  //french lang-------------------------------------------------------------
  const situ1TopicFR =
    "Vue d'ensemble de l'industrie et tendances clés du marché";
  const situ1PromptFR = `Vous êtes un consultant professionnel et un client vous demande de rédiger un ${situ1TopicFR} détaillé pour un plan d'affaires.
  Voici les détails de l'entreprise :
  Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
  Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
  Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  Détail de l'entreprise 4 : Le canal de distribution du client est ${salesChannel}.
  Détail de l'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}

  Voici d'autres instructions :
  Ayez une perspective positive lors de la génération de ${situ1TopicFR}.
  Soyez très descriptif lors de la génération de contenu sur ${situ1TopicFR}.
  Ne mentionnez pas les segments de clients.
  Chaque sujet doit contenir à peu près la même quantité de texte.
  Soyez très descriptif lors de la génération de ${situ1TopicFR}.

  Incluez des statistiques réelles et leur source lorsque cela est pertinent.
  NE citez PAS de statistiques inventées ou une entreprise de recherche inventée comme ABC Research ou XYZ Research.
  NE mentionnez PAS de statistiques indéfinies comme $XX.XX ou XX.X%.
  N'incluez pas de statistiques répétitives.

  Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici.
  Générez une réponse en html entourant "Vue d'ensemble de l'industrie" et "Tendances clés du marché" avec la balise h4.
  Dans le sujet "Tendances clés du marché", entourez chaque tendance clé avec la balise <li>.
  Commencez la réalisation avec "<h3>Analyse de la situation</h3>" suivi de "<h4>Vue d'ensemble de l'industrie</h4>"
  Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
Générez tout en français.
C’est important : Soyez très perspicace dans votre réponse.
Voici le long, détaillé et perspicace ${situ1TopicFR} que vous avez trouvé :
  `;

  // spanish lang-------------------------------------------------------
  const situ1TopicES =
    "Panorama del sector y principales tendencias del mercado";
  const situ1PromptES = `Eres un consultor profesional y un cliente te pide que escribas un detallado ${situ1TopicES} para un plan de negocios.
  Estos son los detalles del negocio:
  detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
  detalle del negocio 2: El tipo de negocio es ${businessType}.
  detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
  detalle del negocio 4: El canal de distribución del cliente es ${salesChannel}.
  detalle del negocio 5: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

  Estos son los detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Estas son las instrucciones adicionales:
  utiliza aproximadamente 250 palabras para generar este ${situ1TopicES}.
  Ten una perspectiva positiva al generar ${situ1TopicES}.
  Sé muy descriptivo al generar contenido sobre ${situ1TopicES}.
  No menciones segmentos de clientes.
  Cada tema debe contener aproximadamente la misma cantidad de texto.
  sé muy descriptivo al generar ${situ1TopicES}.

  Incluya estadísticas reales y su fuente cuando sea relevante.
  NO cites estadísticas inventadas o una empresa de investigación inventada como ABC Research o XYZ Research.
  NO menciones estadísticas indefinidas como $XX.XX o XX.X%.
  No incluyas estadísticas repetitivas.

  Escribe esto como si fueras el dueño del negocio, usando "nosotros", no uses "yo".
  No incluyas otros temas a menos que se especifique aquí.
  Genera la respuesta en html rodeando "Panorama del sector" y "Principales tendencias del mercado" con la etiqueta h4.
  En el tema "Principales tendencias del mercado", rodea cada tendencia clave con la etiqueta <li>.
  Comienza la realización con "<h3>Análisis de la situación</h3>" seguido de "<h4>Panorama del sector</h4>"
  Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${situ1TopicES} que se le ocurrió:`;

  //italian lang-------------------------------------------------------
  const situ1TopicIT =
    "Panoramica del settore e principali tendenze di mercato";
  const situ1PromptIT = `Sei un consulente professionale e un cliente ti chiede di scrivere un dettagliato ${situ1TopicIT} per un piano aziendale.
  Questi sono i dettagli dell'azienda:
  dettaglio dell'azienda 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio dell'azienda 2: Il tipo di azienda è ${businessType}.
  dettaglio dell'azienda 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
  dettaglio dell'azienda 4: Il canale di distribuzione del cliente è ${salesChannel}.
  dettaglio dell'azienda 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Queste sono ulteriori istruzioni:
  Avere un atteggiamento positivo quando generi ${situ1TopicIT}.
  Sii molto descrittivo quando generi contenuti su ${situ1TopicIT}.
  Non menzionare i segmenti di clienti.
  Ogni argomento dovrebbe contenere più o meno la stessa quantità di testo.
  sii molto descrittivo quando generi ${situ1TopicIT}.

  Includi statistiche reali e la loro fonte dove rilevante.
  NON citare statistiche inventate o una società di ricerca inventata come ABC Research o XYZ Research.
  NON menzionare statistiche non definite come $XX.XX o XX.X%.
  Non includere statistiche ripetitive.

  Scrivi questo come se fossi il proprietario dell'azienda, usando "noi", non usare "io".
  Non includere altri argomenti a meno che non siano specificati qui.
  Genera la risposta in html circondando "Panoramica del settore" e "Principali tendenze di mercato" con il tag h4.
  Nel tema "Principali tendenze di mercato", circonda ogni tendenza chiave con il tag <li>.
  Inizia la realizzazione con "<h3>Analisi della situazione</h3>" seguito da "<h4>Panoramica del settore</h4>"
  Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace ${situ1TopicIT} che hai ideato:`;

  //translate to dutch-------------------------------------------------------
  const situ1TopicNL = "Industrie-overzicht en belangrijke markttrends";
  const situ1PromptNL = `
  Je bent een professionele consultant en een klant vraagt je om een gedetailleerd ${situ1TopicNL} te schrijven voor een bedrijfsplan.
  Dit zijn de bedrijfsdetails:
  bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
  bedrijfsdetail 2: Het type bedrijf is ${businessType}.
  bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
  bedrijfsdetail 4: Het distributiekanaal van de klant is ${salesChannel}.
  bedrijfsdetail 5: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

  Dit zijn details over de producten of diensten van de klant:
  ${productInfoPrompt}

  Dit zijn verdere instructies:
  Heb een positieve kijk bij het genereren van ${situ1TopicNL}.
  Wees zeer beschrijvend bij het genereren van inhoud over ${situ1TopicNL}.
  Vermeld geen klantsegmenten.
  Elk onderwerp moet ongeveer dezelfde hoeveelheid tekst bevatten.
  wees zeer beschrijvend bij het genereren van ${situ1TopicNL}.
  
  Voeg echte statistieken en de bron ervan toe waar relevant.
  CITEER GEEN verzonnen statistieken of citeer een verzonnen onderzoeksbureau zoals ABC Research of XYZ Research.
  VERMELD GEEN ongedefinieerde statistieken zoals $XX.XX, $X.XX, XX.X%, of XX.XX%.
  Voeg geen herhalende statistieken toe.
  
  Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
  Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
  Genereer een reactie in html door "Industrie-overzicht" en "Belangrijke markttrends" te omringen met de h4-tag.
  Omring in het onderwerp "Belangrijke markttrends" elke belangrijke trend met de <li>-tag.
  Begin de voltooiing met "<h3>Situatieanalyse</h3>" gevolgd door "<h4>Industrie-overzicht</h4>"
  Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
  Genereer alles in het Nederlands.
  Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
  Dit is de lange, gedetailleerde en inzichtelijke ${situ1TopicNL} die u bedacht hebt:
  `;

  //japanese lang-------------------------------------------------------
  const situ1TopicJA = "業界概要と主要な市場動向";
  const situ1PromptJA = `
  あなたはプロのコンサルタントで、クライアントがビジネスプランの詳細な${situ1TopicJA}を書くように依頼してきました。
  これらはビジネスの詳細です：
  ビジネス詳細1：クライアントのビジネス名は${businessName}です。
  ビジネス詳細2：ビジネスのタイプは${businessType}です。
  ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
  ビジネス詳細4：クライアントの配信チャンネルは${salesChannel}です。
  ビジネス詳細5：クライアントのビジネス運営状況は${businessOperationalStatus}です。

  これらはクライアントの製品またはサービスの詳細です：
  ${productInfoPrompt}

  これらはさらなる指示です：
  ${situ1TopicJA}を生成するときにはポジティブな見方を持ってください。
  ${situ1TopicJA}に関するコンテンツを生成するときには非常に詳細に説明してください。
  顧客セグメントについては言及しないでください。
  各トピックは大体同じ量のテキストを含むべきです。
  ${situ1TopicJA}を生成するときには非常に詳細に説明してください。
  
  関連する場合は、実際の統計とその出典を含めてください。
  ABCリサーチやXYZリサーチのような架空のリサーチ会社を引用したり、架空の統計を引用したりしないでください。
  $XX.XX、$X.XX、XX.X%、またはXX.XX%のような未定義の統計について言及しないでください。
  繰り返しの統計を含めないでください。
  
  あなたがビジネスのオーナーであるかのようにこれを書き、"we"を使用し、"I"を使用しないでください。
  ここで指定されていない他のトピックを含めないでください。
  "業界概要"と"主要な市場動向"をh4タグで囲んでhtmlで応答を生成します。
  "主要な市場動向"のトピックでは、各キートレンドを<li>タグで囲みます。
  "<h3>状況分析</h3>"に続いて"<h4>業界概要</h4>"で完成を開始します。
  HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
  すべてを日本語で生成します。
  これは重要です: 回答には非常に洞察力を持ってください。
  これがあなたが考えた長くて詳細で洞察に満ちた${situ1TopicJA}です:
  `;

  //arabic lang-------------------------------------------------------
  const situ1TopicAR = "نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق";
  const situ1PromptAR = `
  أنت مستشار محترف، ويقترب منك عميل لكتابة ${situ1TopicAR} مفصلة لخطة عمل.
  هذه هي تفاصيل العمل:
  تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
  تفاصيل العمل 2: نوع العمل هو ${businessType}.
  تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
  تفاصيل العمل 4: قناة التوزيع للعميل هي ${salesChannel}.
  تفاصيل العمل 5: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

  هذه هي تفاصيل منتجات العميل أو خدماته:
  ${productInfoPrompt}

  هذه هي التعليمات الإضافية:
  احتفظ بتوقعات إيجابية عند إنشاء ${situ1TopicAR}.
  كن وصفيًا جدًا عند إنشاء محتوى على ${situ1TopicAR}.
  لا تذكر أقسام العملاء.
  يجب أن يحتوي كل موضوع تقريبًا على نفس كمية النص.
  كن وصفيًا جدًا عند إنشاء ${situ1TopicAR}.
  
  قم بتضمين الإحصائيات الحقيقية ومصدرها حيثما كان ذلك مناسبًا.
  لا تقتبس إحصائيات مختلقة أو تقتبس من شركة بحث مختلقة مثل ABC Research أو XYZ Research.
  لا تذكر إحصائيات غير محددة مثل $XX.XX، $X.XX، XX.X%، أو XX.XX%.
  لا تتضمن إحصائيات متكررة.
  
  اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
  لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
  قم بإنشاء الرد في html محيط "نظرة عامة على الصناعة" و"الاتجاهات الرئيسية في السوق" بوسم h4.
  في موضوع "الاتجاهات الرئيسية في السوق" قم بتحييد كل اتجاه رئيسي بوسم <li>.
  ابدأ الاكتمال بـ "<h3>تحليل الوضع</h3>" تليها "<h4>نظرة عامة على الصناعة</h4>"
  استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
  أنشئ كل شيء باللغة العربية.
  هذا مهم: كن ثاقبًا جدًا في ردك.
  هذا هو الـ${situ1TopicAR} الطويل والمفصل والعميق الذي توصلت إليه:
  
  `;

  // swedish lang-------------------------------------------------------
  const situ1TopicSV = "Översikt över branschen och viktiga marknadstrender";
  const situ1PromptSV = `
  Du är en professionell konsult och en klient närmar dig för att skriva en detaljerad ${situ1TopicSV} för en affärsplan.
  Det här är företagsdetaljerna:
  företagsdetalj 1: Kundens företagsnamn är ${businessName}.
  företagsdetalj 2: Typen av verksamhet är ${businessType}.
  företagsdetalj 3: Det här är var företagets kunder finns: ${location}.
  företagsdetalj 4: Kundens distributionskanal är ${salesChannel}.
  företagsdetalj 5: Kundens företagsoperativa status är ${businessOperationalStatus}.

  Det här är detaljerna om kundens produkter eller tjänster:
  ${productInfoPrompt}

  Det här är ytterligare instruktioner:
  Ha en positiv inställning när du genererar ${situ1TopicSV}.
  Var mycket beskrivande när du genererar innehåll på ${situ1TopicSV}.
  Nämn inte kundsegment.
  Varje ämne ska innehålla ungefär samma mängd text.
  var mycket beskrivande när du genererar ${situ1TopicSV}.
  
  Inkludera verklig statistik och dess källa där det är relevant.
  CITERA INTE påhittad statistik eller citera ett påhittat forskningsföretag som ABC Research eller XYZ Research.
  NÄMN INTE odefinierad statistik som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
  Inkludera inte repetitiv statistik.
  
  Skriv detta som om du är ägaren till företaget, använd "vi", använd inte "jag".
  Inkludera inte andra ämnen om det inte specificeras här.
  Generera svar i html som omger "Översikt över branschen" och "Viktiga marknadstrender" med h4-taggen.
  I ämnet "Viktiga marknadstrender" omger varje nyckeltrend med <li>-taggen.
  Börja slutförandet med "<h3>Situationsanalys</h3>" följt av "<h4>Översikt över branschen</h4>"
  Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
  Generera allt på svenska.
  Detta är viktigt: Var mycket insiktsfull i ditt svar.
  Detta är den långa, detaljerade och insiktsfulla ${situ1TopicSV} du kom på:
  `;

  //finnish lang-------------------------------------------------------
  const situ1TopicFI = "Toimialan yleiskatsaus ja tärkeimmät markkinatrendit";
  const situ1PromptFI = `
  Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan yksityiskohtaisen ${situ1TopicFI} liiketoimintasuunnitelmaa varten.
  Nämä ovat yrityksen tiedot:
  yrityksen tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
  yrityksen tieto 2: Liiketoiminnan tyyppi on ${businessType}.
  yrityksen tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
  yrityksen tieto 4: Asiakkaan jakelukanava on ${salesChannel}.
  yrityksen tieto 5: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

  Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
  ${productInfoPrompt}

  Nämä ovat lisäohjeita:
  Ole positiivinen tuottaessasi ${situ1TopicFI}.
  Ole erittäin kuvaileva tuottaessasi sisältöä ${situ1TopicFI}.
  Älä mainitse asiakassegmenttejä.
  Jokaisen aiheen tulisi sisältää suunnilleen sama määrä tekstiä.
  ole erittäin kuvaileva tuottaessasi ${situ1TopicFI}.
  
  Sisällytä todelliset tilastot ja niiden lähde, jos se on merkityksellistä.
  ÄLÄ lainaa keksittyjä tilastoja tai lainaa keksittyä tutkimusyritystä, kuten ABC Research tai XYZ Research.
  ÄLÄ mainitse määrittelemättömiä tilastoja, kuten $XX.XX, $X.XX, XX.X%, tai XX.XX%.
  Älä sisällytä toistuvia tilastoja.
  
  Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
  Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
  Tuota vastaus html-muodossa ympäröimällä "Toimialan yleiskatsaus" ja "Tärkeimmät markkinatrendit" h4-tagilla.
  "Tärkeimmät markkinatrendit" -aiheessa ympäröi jokainen keskeinen trendi <li>-tagilla.
  Aloita täydennys "<h3>Tilanneanalyysi</h3>" seurasi "<h4>Toimialan yleiskatsaus</h4>"
  Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
  Luo kaikki suomeksi.
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
  Tämä on pitkä, yksityiskohtainen ja oivaltava ${situ1TopicFI}, jonka keksit:
  `;

  // danish lang-------------------------------------------------------
  const situ1TopicDA = "Branchegennemgang og vigtige markedsudviklinger";
  const situ1PromptDA = `
  Du er en professionel konsulent, og en klient nærmer dig for at skrive en detaljeret ${situ1TopicDA} til en forretningsplan.
  Dette er virksomhedens detaljer:
  virksomhedsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
  virksomhedsdetalje 2: Virksomhedens type er ${businessType}.
  virksomhedsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
  virksomhedsdetalje 4: Klientens distributionskanal er ${salesChannel}.
  virksomhedsdetalje 5: Klientens virksomheds operationelle status er ${businessOperationalStatus}.

  Dette er detaljer om klientens produkter eller tjenester:
  ${productInfoPrompt}

  Dette er yderligere instruktioner:
  Hav en positiv holdning, når du genererer ${situ1TopicDA}.
  Vær meget beskrivende, når du genererer indhold om ${situ1TopicDA}.
  Nævn ikke kundesegmenter.
  Hvert emne skal indeholde omtrent samme mængde tekst.
  vær meget beskrivende, når du genererer ${situ1TopicDA}.
  
  Inkluder ægte statistikker og deres kilde, hvor det er relevant.
  CITER IKKE opdigtede statistikker eller citer en opdigtet forskningsvirksomhed som ABC Research eller XYZ Research.
  NÆVN IKKE udefinerede statistikker som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
  Inkluder ikke gentagne statistikker.
  
  Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
  Inkluder ikke andre emner, medmindre det er specificeret her.
  Generer svar i html, der omgiver "Branchegennemgang" og "Vigtige markedsudviklinger" med h4-tag.
  I emnet "Vigtige markedsudviklinger" omgiv hver nøgletrend med <li>-tag.
  Begynd udfyldelsen med "<h3>Situationsanalyse</h3>" efterfulgt af "<h4>Branchegennemgang</h4>"
  Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
  Generer alt på dansk.
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
  Dette er den lange, detaljerede og indsigtsfulde ${situ1TopicDA}, du kom op med:
  `;

  // norwegian lang-------------------------------------------------------
  const situ1TopicNO = "Industrioversikt og viktige markedsutviklinger";
  const situ1PromptNO = `
  Du er en profesjonell konsulent, og en klient nærmer seg deg for å skrive en detaljert ${situ1TopicNO} for en forretningsplan.
  Dette er forretningsdetaljene:
  forretningsdetalj 1: Kundens firmanavn er ${businessName}.
  forretningsdetalj 2: Typen virksomhet er ${businessType}.
  forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
  forretningsdetalj 4: Kundens distribusjonskanal er ${salesChannel}.
  forretningsdetalj 5: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

  Dette er detaljer om kundens produkter eller tjenester:
  ${productInfoPrompt}

  Dette er ytterligere instruksjoner:
  Ha en positiv holdning når du genererer ${situ1TopicNO}.
  Vær veldig beskrivende når du genererer innhold om ${situ1TopicNO}.
  Ikke nevn kundesegmenter.
  Hvert emne skal inneholde omtrent samme mengde tekst.
  vær veldig beskrivende når du genererer ${situ1TopicNO}.
  
  Inkluder ekte statistikk og kilden der det er relevant.
  IKKE sitere oppdiktede statistikker eller sitere et oppdiktet forskningsfirma som ABC Research eller XYZ Research.
  IKKE nevn udefinerte statistikker som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
  Ikke inkluder repetitive statistikker.
  Skriv dette som om du er eieren av virksomheten, bruk "vi", bruk ikke "jeg".
  Inkluder ikke andre emner, med mindre det er spesifisert her.
  Generer svar i html, som omgir "Industrioversikt" og "Viktige markedsutviklinger" med h4-tag.
  I emnet "Viktige markedsutviklinger" omgir hver nøkkeltrend med <li>-tag.
  Begynn utfyllingen med "<h3>Situasjonsanalyse</h3>" etterfulgt av "<h4>Industrioversikt</h4>"
  Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
  Generer alt på norsk.
  Dette er viktig: Vær veldig innsiktsfull i ditt svar.
  Dette er den lange, detaljerte og innsiktsfulle ${situ1TopicNO} du kom opp med:
  `;

  let situ1PromptFinal = "";

  if (planLanguage === "en") {
    situ1PromptFinal = situ1PromptEN;
  } else if (planLanguage === "de") {
    situ1PromptFinal = situ1PromptDE;
  } else if (planLanguage === "fr") {
    situ1PromptFinal = situ1PromptFR;
  } else if (planLanguage === "es") {
    situ1PromptFinal = situ1PromptES;
  } else if (planLanguage === "it") {
    situ1PromptFinal = situ1PromptIT;
  } else if (planLanguage === "nl") {
    situ1PromptFinal = situ1PromptNL;
  } else if (planLanguage === "ja") {
    situ1PromptFinal = situ1PromptJA;
  } else if (planLanguage === "ar") {
    situ1PromptFinal = situ1PromptAR;
  } else if (planLanguage === "sv") {
    situ1PromptFinal = situ1PromptSV;
  } else if (planLanguage === "fi") {
    situ1PromptFinal = situ1PromptFI;
  } else if (planLanguage === "da") {
    situ1PromptFinal = situ1PromptDA;
  } else if (planLanguage === "no") {
    situ1PromptFinal = situ1PromptNO;
  } else {
    situ1PromptFinal = situ1PromptEN;
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: situ1PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
