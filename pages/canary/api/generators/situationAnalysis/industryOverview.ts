import { OpenAIStream } from "../../../../../utils/OpenAIChatStream";
import { FireworksAIStream } from "../../../../../utils/llama3/FireworksAIStream";

interface ISituationAnalysisIndustryOverview {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  location: string;
  salesChannel: string;
  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
}

// api2Situ1.ts
export const situationAnalysisIndustryOverview = (
  request: ISituationAnalysisIndustryOverview
) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    location,
    salesChannel,

    productInfoPrompt,
    planLanguage,
    variantID,
  } = request;

  const situ1TopicEN = "Industry Overview and Key Market Trends";
  const situ1TopicDE = "Branchenüberblick und wichtige Markttrends";
  const situ1TopicFR =
    "Vue d'ensemble de l'industrie et tendances clés du marché";
  const situ1TopicES =
    "Panorama del sector y principales tendencias del mercado";
  const situ1TopicIT =
    "Panoramica del settore e principali tendenze di mercato";
  const situ1TopicNL = "Industrie-overzicht en belangrijke markttrends";
  const situ1TopicJA = "業界概要と主要な市場動向";
  const situ1TopicAR = "نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق";
  const situ1TopicSV = "Översikt över branschen och viktiga marknadstrender";
  const situ1TopicFI = "Toimialan yleiskatsaus ja tärkeimmät markkinatrendit";
  const situ1TopicDA = "Branchegennemgang og vigtige markedsudviklinger";
  const situ1TopicNO = "Industrioversikt og viktige markedsutviklinger";

  const promptTemplates = {
    en: `
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
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${situ1TopicEN} you came up with:
    `,
    "en-uk": `
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
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${situ1TopicEN} you came up with:
    `,
    de: `
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
                        Verwenden Sie 250 Wörter, um dieses ${situ1TopicDE} zu generieren.
                        Seien Sie positiv eingestellt, wenn Sie ${situ1TopicDE} generieren.
                        Seien Sie sehr beschreibend, wenn Sie Inhalte zu ${situ1TopicDE} erstellen.
                        Erwähnen Sie keine Kundensegmente.
                        Jedes Thema sollte ungefähr die gleiche Textmenge enthalten.
                        Seien Sie beim Generieren von ${situ1TopicDE} sehr aussagekräftig.
                        
                        Fügen Sie Statistiken und deren Quelle ein, wo es relevant ist, verwenden Sie jedoch keine Daten, die die Jahre 2021 und darüber hinaus enthalten, da wir uns derzeit im Jahr 2023 befinden.
                        ZITIEREN SIE KEINE erfundenen Statistiken oder zitieren Sie kein erfundenes Forschungsunternehmen wie ABC Research oder XYZ Research.
                        Erwähnen Sie KEINE undefinierten Statistiken wie $XX.XX oder XX.X%.
                        Fügen Sie keine wiederholten Statistiken ein.
                        
                        Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
                        Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
                        Generieren Sie mit dem h4-Tag Antworten im HTML-Format rund um „Branchenüberblick“ und „Wichtige Markttrends“.
                        Umgeben Sie im Thema „Wichtige Markttrends“ jeden wichtigen Trend mit dem Tag <li>.
                        Beginnen Sie den Abschluss mit „<h3>Situationsanalyse</h3>“, gefolgt von „<h4>Branchenüberblick</h4>“.
                        generiere alles auf Deutsch
                        Dies ist das ${situ1TopicDE}, das Sie sich ausgedacht haben:`,
    fr: `Vous êtes un consultant professionnel et un client vous demande de rédiger un ${situ1TopicFR} détaillé pour un plan d'affaires.
                        Voici les détails de l'entreprise :
                        Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
                        Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
                        Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
                        Détail de l'entreprise 4 : Le canal de distribution du client est ${salesChannel}.
                        Détail de l'entreprise 5 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
                        
                        Voici les détails des produits ou services du client :
                        ${productInfoPrompt}
                        
                        Voici d'autres instructions :
                        Utilisez environ 250 mots pour générer ce ${situ1TopicFR}.
                        Ayez une perspective positive lors de la génération de ${situ1TopicFR}.
                        Soyez très descriptif lors de la génération de contenu sur ${situ1TopicFR}.
                        Ne mentionnez pas les segments de clients.
                        Chaque sujet doit contenir à peu près la même quantité de texte.
                        Soyez très descriptif lors de la génération de ${situ1TopicFR}.
                        
                        Incluez des statistiques et leur source lorsque cela est pertinent, mais n'utilisez pas de données qui contiennent les années 2021 et suivantes car nous sommes actuellement en 2023.
                        NE citez PAS de statistiques inventées ou une entreprise de recherche inventée comme ABC Research ou XYZ Research.
                        NE mentionnez PAS de statistiques indéfinies comme $XX.XX ou XX.X%.
                        N'incluez pas de statistiques répétitives.
                        
                        Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
                        N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici.
                        Générez une réponse en html entourant "Vue d'ensemble de l'industrie" et "Tendances clés du marché" avec la balise h4.
                        Dans le sujet "Tendances clés du marché", entourez chaque tendance clé avec la balise <li>.
                        Commencez la réalisation avec "<h3>Analyse de la situation</h3>" suivi de "<h4>Vue d'ensemble de l'industrie</h4>"
                        génère tout en français.
                        Voici le ${situ1TopicFR} que vous avez élaboré:`,
    es: `Eres un consultor profesional y un cliente te pide que escribas un detallado ${situ1TopicES} para un plan de negocios.
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
                        
                        Incluye estadísticas y su fuente donde sea relevante, pero no uses datos que contengan los años 2021 en adelante porque actualmente estamos en 2023.
                        NO cites estadísticas inventadas o una empresa de investigación inventada como ABC Research o XYZ Research.
                        NO menciones estadísticas indefinidas como $XX.XX o XX.X%.
                        No incluyas estadísticas repetitivas.
                        
                        Escribe esto como si fueras el dueño del negocio, usando "nosotros", no uses "yo".
                        No incluyas otros temas a menos que se especifique aquí.
                        Genera la respuesta en html rodeando "Panorama del sector" y "Principales tendencias del mercado" con la etiqueta h4.
                        En el tema "Principales tendencias del mercado", rodea cada tendencia clave con la etiqueta <li>.
                        Comienza la realización con "<h3>Análisis de la situación</h3>" seguido de "<h4>Panorama del sector</h4>"
                        genera todo en español
                        Este es el ${situ1TopicES} que has elaborado:`,
    it: `Sei un consulente professionale e un cliente ti chiede di scrivere un dettagliato ${situ1TopicIT} per un piano aziendale.
                        Questi sono i dettagli dell'azienda:
                        dettaglio dell'azienda 1: Il nome dell'azienda del cliente è ${businessName}.
                        dettaglio dell'azienda 2: Il tipo di azienda è ${businessType}.
                        dettaglio dell'azienda 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
                        dettaglio dell'azienda 4: Il canale di distribuzione del cliente è ${salesChannel}.
                        dettaglio dell'azienda 5: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
                        
                        Questi sono i dettagli dei prodotti o servizi del cliente:
                        ${productInfoPrompt}
                        
                        Queste sono ulteriori istruzioni:
                        usa circa 250 parole per generare questo ${situ1TopicIT}.
                        Avere un atteggiamento positivo quando generi ${situ1TopicIT}.
                        Sii molto descrittivo quando generi contenuti su ${situ1TopicIT}.
                        Non menzionare i segmenti di clienti.
                        Ogni argomento dovrebbe contenere più o meno la stessa quantità di testo.
                        sii molto descrittivo quando generi ${situ1TopicIT}.
                        
                        Includi statistiche e la loro fonte dove è rilevante, ma non utilizzare dati che contengono gli anni 2021 e successivi perché attualmente siamo nel 2023.
                        NON citare statistiche inventate o una società di ricerca inventata come ABC Research o XYZ Research.
                        NON menzionare statistiche non definite come $XX.XX o XX.X%.
                        Non includere statistiche ripetitive.
                        
                        Scrivi questo come se fossi il proprietario dell'azienda, usando "noi", non usare "io".
                        Non includere altri argomenti a meno che non siano specificati qui.
                        Genera la risposta in html circondando "Panoramica del settore" e "Principali tendenze di mercato" con il tag h4.
                        Nel tema "Principali tendenze di mercato", circonda ogni tendenza chiave con il tag <li>.
                        Inizia la realizzazione con "<h3>Analisi della situazione</h3>" seguito da "<h4>Panoramica del settore</h4>"
                        genera tutto in italiano
                        Questo è il ${situ1TopicIT} che hai elaborato:`,
    nl: `
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
                        gebruik ongeveer 250 woorden om dit ${situ1TopicNL} te genereren.
                        Heb een positieve kijk bij het genereren van ${situ1TopicNL}.
                        Wees zeer beschrijvend bij het genereren van inhoud over ${situ1TopicNL}.
                        Vermeld geen klantsegmenten.
                        Elk onderwerp moet ongeveer dezelfde hoeveelheid tekst bevatten.
                        wees zeer beschrijvend bij het genereren van ${situ1TopicNL}.
                        
                        Voeg waar relevant statistieken en de bron ervan toe, maar gebruik geen gegevens die de jaren 2021 en later bevatten, omdat we momenteel in 2023 zijn.
                        CITEER GEEN verzonnen statistieken of citeer een verzonnen onderzoeksbureau zoals ABC Research of XYZ Research.
                        VERMELD GEEN ongedefinieerde statistieken zoals $XX.XX, $X.XX, XX.X%, of XX.XX%.
                        Voeg geen herhalende statistieken toe.
                        
                        Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
                        Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
                        Genereer een reactie in html door "Industrie-overzicht" en "Belangrijke markttrends" te omringen met de h4-tag.
                        Omring in het onderwerp "Belangrijke markttrends" elke belangrijke trend met de <li>-tag.
                        Begin de voltooiing met "<h3>Situatieanalyse</h3>" gevolgd door "<h4>Industrie-overzicht</h4>"
                        Genereer alles in het Nederlands.
                        Dit is het ${situ1TopicNL} dat je hebt bedacht:`,
    ja: `
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
                        この${situ1TopicJA}を生成するために約250語を使用します。
                        ${situ1TopicJA}を生成するときにはポジティブな見方を持ってください。
                        ${situ1TopicJA}に関するコンテンツを生成するときには非常に詳細に説明してください。
                        顧客セグメントについては言及しないでください。
                        各トピックは大体同じ量のテキストを含むべきです。
                        ${situ1TopicJA}を生成するときには非常に詳細に説明してください。
                        
                        関連する場所では統計とそのソースを含めますが、現在2023年であるため、2021年以降の年を含むデータは使用しないでください。
                        ABCリサーチやXYZリサーチのような架空のリサーチ会社を引用したり、架空の統計を引用したりしないでください。
                        $XX.XX、$X.XX、XX.X%、またはXX.XX%のような未定義の統計について言及しないでください。
                        繰り返しの統計を含めないでください。
                        
                        あなたがビジネスのオーナーであるかのようにこれを書き、"we"を使用し、"I"を使用しないでください。
                        ここで指定されていない他のトピックを含めないでください。
                        "業界概要"と"主要な市場動向"をh4タグで囲んでhtmlで応答を生成します。
                        "主要な市場動向"のトピックでは、各キートレンドを<li>タグで囲みます。
                        "<h3>状況分析</h3>"に続いて"<h4>業界概要</h4>"で完成を開始します。
                        すべてを日本語で生成します。
                        これがあなたが考え出した${situ1TopicJA}です：`,
    ar: `
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
                        استخدم حوالي 250 كلمة لإنشاء هذا ${situ1TopicAR}.
                        احتفظ بتوقعات إيجابية عند إنشاء ${situ1TopicAR}.
                        كن وصفيًا جدًا عند إنشاء محتوى على ${situ1TopicAR}.
                        لا تذكر أقسام العملاء.
                        يجب أن يحتوي كل موضوع تقريبًا على نفس كمية النص.
                        كن وصفيًا جدًا عند إنشاء ${situ1TopicAR}.
                        
                        قم بتضمين الإحصائيات ومصدرها حيثما كان ذلك ذا صلة ولكن لا تستخدم البيانات التي تحتوي على السنوات 2021 وما بعدها لأننا حاليًا في عام 2023.
                        لا تقتبس إحصائيات مختلقة أو تقتبس من شركة بحث مختلقة مثل ABC Research أو XYZ Research.
                        لا تذكر إحصائيات غير محددة مثل $XX.XX، $X.XX، XX.X%، أو XX.XX%.
                        لا تتضمن إحصائيات متكررة.
                        
                        اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
                        لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
                        قم بإنشاء الرد في html محيط "نظرة عامة على الصناعة" و"الاتجاهات الرئيسية في السوق" بوسم h4.
                        في موضوع "الاتجاهات الرئيسية في السوق" قم بتحييد كل اتجاه رئيسي بوسم <li>.
                        ابدأ الاكتمال بـ "<h3>تحليل الوضع</h3>" تليها "<h4>نظرة عامة على الصناعة</h4>"
                        قم بإنشاء كل شيء باللغة العربية.
                        هذا هو ${situ1TopicAR} الذي ابتكرته:`,
    sv: `
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
                        använd cirka 250 ord för att generera detta ${situ1TopicSV}.
                        Ha en positiv inställning när du genererar ${situ1TopicSV}.
                        Var mycket beskrivande när du genererar innehåll på ${situ1TopicSV}.
                        Nämn inte kundsegment.
                        Varje ämne ska innehålla ungefär samma mängd text.
                        var mycket beskrivande när du genererar ${situ1TopicSV}.
                        
                        Inkludera statistik och dess källa där det är relevant men använd inte data som innehåller åren 2021 och framåt eftersom vi för närvarande är i 2023.
                        CITERA INTE påhittad statistik eller citera ett påhittat forskningsföretag som ABC Research eller XYZ Research.
                        NÄMN INTE odefinierad statistik som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
                        Inkludera inte repetitiv statistik.
                        
                        Skriv detta som om du är ägaren till företaget, använd "vi", använd inte "jag".
                        Inkludera inte andra ämnen om det inte specificeras här.
                        Generera svar i html som omger "Översikt över branschen" och "Viktiga marknadstrender" med h4-taggen.
                        I ämnet "Viktiga marknadstrender" omger varje nyckeltrend med <li>-taggen.
                        Börja slutförandet med "<h3>Situationsanalys</h3>" följt av "<h4>Översikt över branschen</h4>"
                        Generera allt på svenska.
                        Det här är ${situ1TopicSV} du kom upp med:`,
    fi: `
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
                        käytä noin 250 sanaa tämän ${situ1TopicFI} tuottamiseen.
                        Ole positiivinen tuottaessasi ${situ1TopicFI}.
                        Ole erittäin kuvaileva tuottaessasi sisältöä ${situ1TopicFI}.
                        Älä mainitse asiakassegmenttejä.
                        Jokaisen aiheen tulisi sisältää suunnilleen sama määrä tekstiä.
                        ole erittäin kuvaileva tuottaessasi ${situ1TopicFI}.
                        
                        Sisällytä tilastot ja niiden lähde, jos se on relevanttia, mutta älä käytä tietoja, jotka sisältävät vuodet 2021 ja sen jälkeen, koska olemme tällä hetkellä vuodessa 2023.
                        ÄLÄ lainaa keksittyjä tilastoja tai lainaa keksittyä tutkimusyritystä, kuten ABC Research tai XYZ Research.
                        ÄLÄ mainitse määrittelemättömiä tilastoja, kuten $XX.XX, $X.XX, XX.X%, tai XX.XX%.
                        Älä sisällytä toistuvia tilastoja.
                        
                        Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
                        Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
                        Tuota vastaus html-muodossa ympäröimällä "Toimialan yleiskatsaus" ja "Tärkeimmät markkinatrendit" h4-tagilla.
                        "Tärkeimmät markkinatrendit" -aiheessa ympäröi jokainen keskeinen trendi <li>-tagilla.
                        Aloita täydennys "<h3>Tilanneanalyysi</h3>" seurasi "<h4>Toimialan yleiskatsaus</h4>"
                        Tuota kaikki suomeksi.
                        Tämä on ${situ1TopicFI}, jonka tulit mieleen:`,
    da: `
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
                        brug omkring 250 ord til at generere denne ${situ1TopicDA}.
                        Hav en positiv holdning, når du genererer ${situ1TopicDA}.
                        Vær meget beskrivende, når du genererer indhold om ${situ1TopicDA}.
                        Nævn ikke kundesegmenter.
                        Hvert emne skal indeholde omtrent samme mængde tekst.
                        vær meget beskrivende, når du genererer ${situ1TopicDA}.
                        
                        Inkluder statistik og dens kilde, hvor det er relevant, men brug ikke data, der indeholder årene 2021 og fremefter, fordi vi er i 2023.
                        CITER IKKE opdigtede statistikker eller citer en opdigtet forskningsvirksomhed som ABC Research eller XYZ Research.
                        NÆVN IKKE udefinerede statistikker som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
                        Inkluder ikke gentagne statistikker.
                        
                        Skriv dette, som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
                        Inkluder ikke andre emner, medmindre det er specificeret her.
                        Generer svar i html, der omgiver "Branchegennemgang" og "Vigtige markedsudviklinger" med h4-tag.
                        I emnet "Vigtige markedsudviklinger" omgiv hver nøgletrend med <li>-tag.
                        Begynd udfyldelsen med "<h3>Situationsanalyse</h3>" efterfulgt af "<h4>Branchegennemgang</h4>"
                        Generer alt på dansk.
                        use british english spelling and grammar
                        Dette er den ${situ1TopicDA}, du kom op med:`,
    no: `
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
                        bruk omtrent 250 ord for å generere denne ${situ1TopicNO}.
                        Ha en positiv holdning når du genererer ${situ1TopicNO}.
                        Vær veldig beskrivende når du genererer innhold om ${situ1TopicNO}.
                        Ikke nevn kundesegmenter.
                        Hvert emne skal inneholde omtrent samme mengde tekst.
                        vær veldig beskrivende når du genererer ${situ1TopicNO}.
                        
                        Inkluder statistikk og dens kilde der det er relevant, men bruk ikke data som inneholder årene 2021 og fremover, fordi vi er i 2023.
                        IKKE sitere oppdiktede statistikker eller sitere et oppdiktet forskningsfirma som ABC Research eller XYZ Research.
                        IKKE nevn udefinerte statistikker som $XX.XX, $X.XX, XX.X%, eller XX.XX%.
                        Ikke inkluder repetitive statistikker.
                        
                        Skriv dette som om du er eieren av virksomheten, bruk "vi", bruk ikke "jeg".
                        Inkluder ikke andre emner, med mindre det er spesifisert her.
                        Generer svar i html, som omgir "Industrioversikt" og "Viktige markedsutviklinger" med h4-tag.
                        I emnet "Viktige markedsutviklinger" omgir hver nøkkeltrend med <li>-tag.
                        Begynn utfyllingen med "<h3>Situasjonsanalyse</h3>" etterfulgt av "<h4>Industrioversikt</h4>"
                        Generer alt på norsk.
                        Dette er den ${situ1TopicNO} du kom opp med:`,
  };

  if (variantID === "2") {
    const payload = {
      messages: [{ role: "user", content: promptTemplates[planLanguage] }],
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1500,
      stream: true,
      n: 1,
    };
    return FireworksAIStream(payload);
  } else {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptTemplates[planLanguage] }],
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
};
