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
export default async function api3Situ2(request, response) {
  console.log("api3Situ2 running");

  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

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

    generatedSitu1,

    productInfoPrompt,
    planLanguage,
  } = await request.json();

  let UKEngPrompt = "";
  if (planLanguage === "en-uk")
    UKEngPrompt = "use british english spelling and grammar";

  const situ2TopicEN = "SWOT Analysis";
  const situ2PromptEN = `
    You are a professional consultant, and a client approaches you to write a detailed ${situ2TopicEN} for a business plan.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees
    business detail 5: The client's distribution channel is ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}
    These are the weaknesses: ${weakness1}, ${weakness2}, ${weakness3}

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    The ${situ2TopicEN} should include these topics: Strengths, Weaknesses, Opportunities, Threats. Don't include other topics unless specified here.
    Opportunities are external uncontrollable factors that can benefit the business not some marketing tactics that a business can do.

    Do not repeat the business details unless nessesary.
    only include 2 weaknesses and 2 threats and make them sound like its not dangerous and offer mitigating actions within the same <li> tag and be confident that you can resolve these issues. generate at least 5 strengths and 4 opportunities.
    be descriptive in each point.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding key topics with h5 tag.
    Surround each individual Strengths, Weaknesses, Opportunities, and Threats points with <ol> and <li> tag.
    Begin the completion with "<h4>${situ2TopicEN}</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${situ2TopicEN} you came up with:
    `;

  // german lang-----------------------------------------------------------

  const situ2TopicDE = "SWOT-Analyse";
  const situ2PromptDE = `
    Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${situ2TopicDE} für einen Geschäftsplan zu verfassen. Wenn ${situ2TopicDE} nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
    Dies sind die Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Kunde wird ${NEmployee}-Mitarbeiter beschäftigen
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind die wichtigsten Erfolgsfaktoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Das sind die Schwächen: ${weakness1}, ${weakness2}, ${weakness3}

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
    
    Dies sind weitere Anweisungen:
    Das ${situ2TopicDE} sollte folgende Themen enthalten: Stärken, Schwächen, Chancen, Bedrohungen. Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
    Chancen sind externe unkontrollierbare Faktoren, die dem Unternehmen zugute kommen können, und nicht irgendwelche Marketingtaktiken, die ein Unternehmen anwenden kann.

    Wiederholen Sie die Geschäftsdetails nicht, es sei denn, dies ist unbedingt erforderlich.
    Schließen Sie nur zwei Schwachstellen und zwei Bedrohungen ein und lassen Sie sie so klingen, als seien sie nicht gefährlich. Bieten Sie Abhilfemaßnahmen innerhalb desselben <li>-Tags an und seien Sie zuversichtlich, dass Sie diese Probleme beheben können. Generieren Sie mindestens 5 Stärken und 4 Chancen.
    Seien Sie in jedem Punkt beschreibend.

    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Generieren Sie mit dem h5-Tag Antworten im HTML-Format zu wichtigen Themen.
    Umgeben Sie jeden einzelnen Stärken-, Schwächen-, Chancen- und Bedrohungspunkt mit den Tags <ol> und <li>.
    Beginnen Sie die Vervollständigung mit „<h4>${situ2TopicDE}</h4>“
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${situ2TopicDE}, das Sie sich ausgedacht haben:
    `;

  //french lang----------------------------------------------------------
  const situ2TopicFR = "Analyse SWOT";
  const situ2PromptFR = `Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${situ2TopicFR} détaillé pour un plan d'affaires.
  Voici les détails de l'entreprise :
  détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
  détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
  détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  détail de l'entreprise 4 : Le client emploiera ${NEmployee} employés
  détail de l'entreprise 5 : Le canal de distribution du client est ${salesChannel}.
  détail de l'entreprise 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}
  Voici les faiblesses : ${weakness1}, ${weakness2}, ${weakness3}

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}
  
  Voici d'autres instructions :
  Le ${situ2TopicFR} doit inclure ces sujets : Forces, Faiblesses, Opportunités, Menaces. N'incluez pas d'autres sujets sauf si spécifié ici.
  Les opportunités sont des facteurs externes incontrôlables qui peuvent bénéficier à l'entreprise, pas des tactiques de marketing qu'une entreprise peut faire.

  Ne répétez pas les détails de l'entreprise sauf si nécessaire.
  n'incluez que 2 faiblesses et 2 menaces et faites-les sonner comme si elles n'étaient pas dangereuses et proposez des actions d'atténuation dans la même balise <li> et soyez confiant que vous pouvez résoudre ces problèmes. générez au moins 5 forces et 4 opportunités.
  soyez descriptif à chaque point.

  Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".
  Générez une réponse en html entourant les sujets clés avec la balise h5.
  Entourez chaque point de Forces, Faiblesses, Opportunités et Menaces avec les balises <ol> et <li>.
  Commencez la complétion avec "<h4>${situ2TopicFR}</h4>"
  Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${situ2TopicFR} que vous avez trouvé :`;

  // spanish lang----------------------------------------------------------
  const situ2TopicES = "Análisis DAFO";
  const situ2PromptES = `Eres un consultor profesional y un cliente te pide que escribas un detallado ${situ2TopicES} para un plan de negocios.
  Estos son los detalles del negocio:
  detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
  detalle del negocio 2: El tipo de negocio es ${businessType}.
  detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
  detalle del negocio 4: El cliente empleará a ${NEmployee} empleados
  detalle del negocio 5: El canal de distribución del cliente es ${salesChannel}.
  detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

  Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
  Estas son las debilidades: ${weakness1}, ${weakness2}, ${weakness3}

  Estos son los detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Estas son las instrucciones adicionales:
  El ${situ2TopicES} debe incluir estos temas: Fortalezas, Debilidades, Oportunidades, Amenazas. No incluyas otros temas a menos que se especifique aquí.
  Las oportunidades son factores externos incontrolables que pueden beneficiar al negocio, no son tácticas de marketing que un negocio puede hacer.

  No repitas los detalles del negocio a menos que sea necesario.
  incluye solo 2 debilidades y 2 amenazas y haz que suenen como si no fueran peligrosas y ofrece acciones de mitigación dentro de la misma etiqueta <li> y ten confianza en que puedes resolver estos problemas. genera al menos 5 fortalezas y 4 oportunidades.
  sé descriptivo en cada punto.

  Escribe esto como si fueras el dueño del negocio, usando "nosotros", no uses "yo".
  Genera la respuesta en html rodeando los temas clave con la etiqueta h5.
  Rodea cada punto individual de Fortalezas, Debilidades, Oportunidades y Amenazas con las etiquetas <ol> y <li>.
  Comienza la realización con "<h4>${situ2TopicES}</h4>"
  Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
Genere todo en español.
Esto es importante: Sea muy perspicaz en su respuesta.
Este es el largo, detallado y perspicaz ${situ2TopicES} que se le ocurrió:`;

  // italian lang----------------------------------------------------------
  const situ2TopicIT = "Analisi SWOT";
  const situ2PromptIT = `Sei un consulente professionale e un cliente ti chiede di scrivere un dettagliato ${situ2TopicIT} per un piano aziendale.
  Questi sono i dettagli dell'azienda:
  dettaglio dell'azienda 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio dell'azienda 2: Il tipo di azienda è ${businessType}.
  dettaglio dell'azienda 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
  dettaglio dell'azienda 4: Il cliente impiegherà ${NEmployee} dipendenti
  dettaglio dell'azienda 5: Il canale di distribuzione del cliente è ${salesChannel}.
  dettaglio dell'azienda 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

  Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}
  Queste sono le debolezze: ${weakness1}, ${weakness2}, ${weakness3}

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Queste sono ulteriori istruzioni:
  Il ${situ2TopicIT} dovrebbe includere questi argomenti: Punti di forza, Debolezze, Opportunità, Minacce. Non includere altri argomenti a meno che non sia specificato qui.
  Le opportunità sono fattori esterni incontrollabili che possono beneficiare l'azienda, non sono tattiche di marketing che un'azienda può fare.

  Non ripetere i dettagli dell'azienda a meno che non sia necessario.
  includi solo 2 debolezze e 2 minacce e falle sembrare non pericolose e offri azioni di mitigazione all'interno dello stesso tag <li> e sii fiducioso che tu possa risolvere questi problemi. genera almeno 5 punti di forza e 4 opportunità.
  sii descrittivo in ogni punto.

  Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
  Genera la risposta in html circondando i temi chiave con il tag h5.
  Circonda ogni punto individuale di Punti di forza, Debolezze, Opportunità e Minacce con i tag <ol> e <li>.
  Inizia la realizzazione con "<h4>${situ2TopicIT}</h4>"
  Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace ${situ2TopicIT} che hai ideato:`;

  // dutch lang----------------------------------------------------------
  const situ2TopicNL = "SWOT-analyse";
  const situ2PromptNL = `
  Je bent een professionele consultant en een klant vraagt je om een gedetailleerde ${situ2TopicNL} te schrijven voor een bedrijfsplan.
    Dit zijn de bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst hebben
    bedrijfsdetail 5: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de sleutelfactoren voor succes: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dit zijn de zwakke punten: ${weakness1}, ${weakness2}, ${weakness3}

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}
    
    Dit zijn verdere instructies:
    De ${situ2TopicNL} moet deze onderwerpen bevatten: Sterke punten, Zwakke punten, Kansen, Bedreigingen. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
    Kansen zijn externe oncontroleerbare factoren die het bedrijf kunnen bevoordelen, geen marketingtactieken die een bedrijf kan doen.

    Herhaal de bedrijfsdetails niet tenzij noodzakelijk.
    neem alleen 2 zwakke punten en 2 bedreigingen op en laat ze klinken alsof ze niet gevaarlijk zijn en bied verzachtende acties aan binnen dezelfde <li> tag en wees ervan overtuigd dat je deze problemen kunt oplossen. genereer minstens 5 sterke punten en 4 kansen.
    wees beschrijvend in elk punt.

    Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer een reactie in html door de sleutelonderwerpen te omringen met de h5-tag.
    Omring elk individueel punt van Sterke punten, Zwakke punten, Kansen en Bedreigingen met de <ol> en <li> tag.
    Begin de voltooiing met "<h4>${situ2TopicNL}</h4>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${situ2TopicNL} die u bedacht hebt:
  `;

  //japanese lang----------------------------------------------------------
  const situ2TopicJA = "SWOT分析";
  const situ2PromptJA = `
  あなたはプロのコンサルタントで、クライアントがビジネスプランの詳細な${situ2TopicJA}を書くように依頼してきました。
    これらはビジネスの詳細です：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスの種類は${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントは${NEmployee}人の従業員を雇います
    ビジネス詳細5：クライアントの配布チャンネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらは成功の鍵となる要素です：${successFactors1}、${successFactors2}、${successFactors3}
    これらは弱点です：${weakness1}、${weakness2}、${weakness3}

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}
    
    これらはさらなる指示です：
    ${situ2TopicJA}には、次のトピックを含める必要があります：強み、弱み、機会、脅威。ここで指定されていない他のトピックは含めないでください。
    機会はビジネスが行うマーケティング戦略ではなく、ビジネスに利益をもたらす可能性のある外部の制御不能な要素です。

    必要でない限り、ビジネスの詳細を繰り返さないでください。
    弱点と脅威を2つだけ含め、それらが危険でないように聞こえるようにし、同じ<li>タグ内で緩和策を提供し、これらの問題を解決できると自信を持ってください。少なくとも5つの強みと4つの機会を生成します。
    各ポイントで詳細に説明します。

    あなたがビジネスのオーナーであるかのようにこれを書き、"we"を使用し、"I"を使用しないでください。
    h5タグでキートピックを囲んでhtmlで応答を生成します。
    個々の強み、弱み、機会、脅威のポイントを<ol>と<li>タグで囲みます。
    完成を"<h4>${situ2TopicJA}</h4>"で始めます
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${situ2TopicJA}です:
  `;

  //arabic lang----------------------------------------------------------
  const situ2TopicAR = "تحليل SWOT";
  const situ2PromptAR = `
  أنت مستشار محترف، ويقترب منك عميل لكتابة ${situ2TopicAR} مفصلة لخطة عمل.
    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: العميل سيوظف ${NEmployee} موظفين
    تفاصيل العمل 5: قناة التوزيع للعميل هي ${salesChannel}.
    تفاصيل العمل 6: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}
    هذه هي الضعف: ${weakness1}، ${weakness2}، ${weakness3}

    هذه هي تفاصيل منتجات العميل أو الخدمات:
    ${productInfoPrompt}
    
    هذه هي التعليمات الإضافية:
    يجب أن يتضمن ${situ2TopicAR} هذه المواضيع: القوة، الضعف، الفرص، التهديدات. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    الفرص هي عوامل خارجية لا يمكن التحكم فيها يمكن أن تعود بالفائدة على العمل وليست بعض التكتيكات التسويقية التي يمكن أن يقوم بها العمل.

    لا تكرر تفاصيل العمل إلا إذا كان ضروريًا.
    تضمين 2 ضعف و 2 تهديد فقط وجعلهم يبدون كأنهم ليسوا خطرين وتقديم إجراءات تخفيف في نفس الوسم <li> وكن واثقًا من أنك يمكنك حل هذه المشكلات. توليد 5 نقاط قوة على الأقل و 4 فرص.
    كن وصفيًا في كل نقطة.

    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    أنشئ الرد في html محيط المواضيع الرئيسية بوسم h5.
    أحاط كل نقطة من القوة، الضعف، الفرص، والتهديدات بوسم <ol> و <li>.
    ابدأ الاكتمال بـ "<h4>${situ2TopicAR}</h4>"
    استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${situ2TopicAR} الطويل والمفصل والعميق الذي توصلت إليه:
  `;

  // swedish lang----------------------------------------------------------
  const situ2TopicSV = "SWOT-analys";
  const situ2PromptSV = `
  Du är en professionell konsult och en klient närmar sig dig för att skriva en detaljerad ${situ2TopicSV} för en affärsplan.
    Detta är företagets detaljer:
    företagsdetalj 1: Kundens företagsnamn är ${businessName}.
    företagsdetalj 2: Typen av verksamhet är ${businessType}.
    företagsdetalj 3: Detta är var företagets kunder finns: ${location}.
    företagsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda
    företagsdetalj 5: Kundens distributionskanal är ${salesChannel}.
    företagsdetalj 6: Kundens företagsoperativa status är ${businessOperationalStatus}.

    Dessa är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dessa är svagheterna: ${weakness1}, ${weakness2}, ${weakness3}

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}
    
    Dessa är ytterligare instruktioner:
    ${situ2TopicSV} bör inkludera dessa ämnen: Styrkor, Svagheter, Möjligheter, Hot. Inkludera inte andra ämnen om det inte specificeras här.
    Möjligheter är externa okontrollerbara faktorer som kan gynna företaget, inte några marknadsföringstaktiker som ett företag kan göra.

    Upprepa inte företagsdetaljerna om det inte är nödvändigt.
    inkludera endast 2 svagheter och 2 hot och gör dem ljud som om det inte är farligt och erbjuder lindrande åtgärder inom samma <li> tagg och var säker på att du kan lösa dessa problem. generera minst 5 styrkor och 4 möjligheter.
    var beskrivande i varje punkt.

    Skriv detta som om du är ägaren till företaget, använd "vi", använd inte "jag".
    Generera svar i html som omger nyckelämnen med h5-taggen.
    Omge varje individuell Styrkor, Svagheter, Möjligheter och Hot punkter med <ol> och <li> tagg.
    Börja slutförandet med "<h4>${situ2TopicSV}</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${situ2TopicSV} du kom på:
  `;

  // finnish lang----------------------------------------------------------
  const situ2TopicFI = "SWOT-analyysi";
  const situ2PromptFI = `
  Olet ammattikonsultti ja asiakas lähestyy sinua kirjoittamaan yksityiskohtaisen ${situ2TopicFI} liiketoimintasuunnitelmaan.
    Nämä ovat yrityksen tiedot:
    yrityksen tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    yrityksen tieto 2: Liiketoiminnan tyyppi on ${businessType}.
    yrityksen tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    yrityksen tieto 4: Asiakas palkkaa ${NEmployee} työntekijää
    yrityksen tieto 5: Asiakkaan jakelukanava on ${salesChannel}.
    yrityksen tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat avaintekijät menestykselle: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Nämä ovat heikkoudet: ${weakness1}, ${weakness2}, ${weakness3}

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
    
    Nämä ovat lisäohjeet:
    ${situ2TopicFI} pitäisi sisältää nämä aiheet: Vahvuudet, Heikkoudet, Mahdollisuudet, Uhat. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
    Mahdollisuudet ovat ulkoisia, yrityksen hallitsemattomia tekijöitä, jotka voivat hyödyttää yritystä, eivät joitakin markkinointitaktiikoita, joita yritys voi tehdä.

    Älä toista yrityksen tietoja, ellei se ole tarpeellista.
    sisällytä vain 2 heikkoutta ja 2 uhkaa ja tee niistä kuulostamaan siltä, etteivät ne ole vaarallisia, ja tarjoa lieventäviä toimenpiteitä samassa <li> -tagissa ja ole varma, että voit ratkaista nämä ongelmat. luo vähintään 5 vahvuutta ja 4 mahdollisuutta.
    ole kuvaileva jokaisessa kohdassa.

    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Luo vastaus html-muodossa, joka ympäröi avainaiheet h5-tagilla.
    Ympäröi jokainen yksittäinen Vahvuudet, Heikkoudet, Mahdollisuudet ja Uhat -kohta <ol> ja <li> -tagilla.
    Aloita täydennys "<h4>${situ2TopicFI}</h4>"
    Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${situ2TopicFI}, jonka keksit:
  `;

  // danish lang----------------------------------------------------------
  const situ2TopicDA = "SWOT-analyse";
  const situ2PromptDA = `
  Du er en professionel konsulent, og en klient nærmer dig for at skrive en detaljeret ${situ2TopicDA} til en forretningsplan.
    Dette er virksomhedens detaljer:
    virksomhedsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
    virksomhedsdetalje 2: Typen af virksomhed er ${businessType}.
    virksomhedsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    virksomhedsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere
    virksomhedsdetalje 5: Klientens distributionskanal er ${salesChannel}.
    virksomhedsdetalje 6: Klientens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er de vigtige succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dette er svaghederne: ${weakness1}, ${weakness2}, ${weakness3}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er yderligere instruktioner:
    ${situ2TopicDA} skal inkludere disse emner: Styrker, Svagheder, Muligheder, Trusler. Inkluder ikke andre emner, medmindre det er specificeret her.
    Muligheder er eksterne ukontrollable faktorer, der kan gavne virksomheden, ikke nogle marketingtaktikker, som en virksomhed kan gøre.

    Gentag ikke virksomhedsdetaljerne, medmindre det er nødvendigt.
    inkluder kun 2 svagheder og 2 trusler og gør dem lyde som om det ikke er farligt og tilbyd afhjælpende handlinger inden for den samme <li> tag og vær sikker på, at du kan løse disse problemer. generer mindst 5 styrker og 4 muligheder.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Generer svar i html, der omgiver nøgleemner med h5-tag.
    Omgiv hver individuel Styrker, Svagheder, Muligheder og Trusler punkter med <ol> og <li> tag.
    Begynd udfyldelsen med "<h4>${situ2TopicDA}</h4>"
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${situ2TopicDA}, du kom op med:
    `;

  // norwegian lang----------------------------------------------------------
  const situ2TopicNO = "SWOT-analyse";
  const situ2PromptNO = `
  Du er en profesjonell konsulent, og en klient nærmer seg deg for å skrive en detaljert ${situ2TopicNO} for en forretningsplan.
    Dette er virksomhetens detaljer:
    virksomhetsdetalj 1: Klientens firmanavn er ${businessName}.
    virksomhetsdetalj 2: Typen virksomhet er ${businessType}.
    virksomhetsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    virksomhetsdetalj 4: Klienten vil ansette ${NEmployee} ansatte
    virksomhetsdetalj 5: Klientens distribusjonskanal er ${salesChannel}.
    virksomhetsdetalj 6: Klientens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er de viktige suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dette er svakhetene: ${weakness1}, ${weakness2}, ${weakness3}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er ytterligere instruksjoner:
    ${situ2TopicNO} skal inkludere disse emnene: Styrker, Svakhetene, Muligheter, Trusler. Ikke inkluder andre emner med mindre det er spesifisert her.
    Muligheter er eksterne ukontrollerbare faktorer som kan gagne virksomheten, ikke noen markedsføringstaktikker som en virksomhet kan gjøre.

    Gjenta ikke virksomhetsdetaljene med mindre det er nødvendig.
    inkluder bare 2 svakheter og 2 trusler og få dem til å høres ut som om de ikke er farlige, og tilby avbøtende tiltak innenfor samme <li> tag og vær sikker på at du kan løse disse problemene. generer minst 5 styrker og 4 muligheter.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Generer svar i html som omgir nøkkeltemaer med h5-tag.
    Omgir hvert individuelle Styrker, Svakhetene, Muligheter, og Trusler punkter med <ol> og <li> tag.
    Begynn utfyllingen med "<h4>${situ2TopicNO}</h4>"
    Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
    Generer alt på norsk.
    Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${situ2TopicNO} du kom opp med:
  `;

  let situ2PromptFinal = "";

  if (planLanguage === "en") {
    situ2PromptFinal = situ2PromptEN;
  } else if (planLanguage === "de") {
    situ2PromptFinal = situ2PromptDE;
  } else if (planLanguage === "fr") {
    situ2PromptFinal = situ2PromptFR;
  } else if (planLanguage === "es") {
    situ2PromptFinal = situ2PromptES;
  } else if (planLanguage === "it") {
    situ2PromptFinal = situ2PromptIT;
  } else if (planLanguage === "nl") {
    situ2PromptFinal = situ2PromptNL;
  } else if (planLanguage === "ja") {
    situ2PromptFinal = situ2PromptJA;
  } else if (planLanguage === "ar") {
    situ2PromptFinal = situ2PromptAR;
  } else if (planLanguage === "sv") {
    situ2PromptFinal = situ2PromptSV;
  } else if (planLanguage === "fi") {
    situ2PromptFinal = situ2PromptFI;
  } else if (planLanguage === "da") {
    situ2PromptFinal = situ2PromptDA;
  } else if (planLanguage === "no") {
    situ2PromptFinal = situ2PromptNO;
  } else {
    situ2PromptFinal = situ2PromptEN;
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: situ2PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
