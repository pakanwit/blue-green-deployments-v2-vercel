import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { FireworksAIStream } from '../../../utils/llama3/FireworksAIStream';

interface ISegmentation {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;
  customerIncome1: string;
  customerIncome2: string;
  customerIncome3: string;
  customerDescription1: string;
  customerDescription2: string;
  customerDescription3: string;
  firstYearRevenue: string;
  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
}

// api5Mark2.ts
export const segmentation = (request: ISegmentation) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerIncome1,
    customerIncome2,
    customerIncome3,

    customerDescription1,
    customerDescription2,
    customerDescription3,

    firstYearRevenue,

    productInfoPrompt,
    planLanguage,
    variantID,
  } = request;

  const templatesDescription = (
    customerDescription: string,
    customerIncome: string,
  ) => {
    const descriptions = {
      en: `customer detail: this is one of the description of the customer: ${customerDescription} and this is their income level: ${customerIncome}. Mention this segment in segmentation and targeting topic\n`,
      'en-uk': `customer detail: this is one of the description of the customer: ${customerDescription} and this is their income level: ${customerIncome}. Mention this segment in segmentation and targeting topic\n`,
      de: `Kundendetail: Dies ist eine der Beschreibungen des Kunden: ${customerDescription} und dies ist sein Einkommensniveau: ${customerIncome}. Erwähnen Sie dieses Segment im Segmentierungs- und Targeting-Thema\n`,
      fr: `Détail du client : voici l'une des descriptions du client : ${customerDescription} et voici son niveau de revenu : ${customerIncome}. Mentionnez ce segment dans le sujet de segmentation et de ciblage\n`,
      es: `Detalle del cliente: esta es una de las descripciones del cliente: ${customerDescription} y este es su nivel de ingresos: ${customerIncome}. Mencione este segmento en el tema de segmentación y targeting\n`,
      it: `Dettaglio del cliente: questa è una delle descrizioni del cliente: ${customerDescription} e questo è il suo livello di reddito: ${customerIncome}. Menziona questo segmento nel tema di segmentazione e targeting\n`,
      nl: `Klantdetail: dit is een van de beschrijvingen van de klant: ${customerDescription} en dit is hun inkomensniveau: ${customerIncome}. Vermeld dit segment in het segmentatie- en targetingonderwerp\n`,
      ja: `顧客の詳細:これは顧客の説明の一つです: ${customerDescription} そしてこれが彼らの収入レベルです: ${customerIncome}. このセグメントをセグメンテーションとターゲティングのトピックで言及してください\n`,
      ar: `تفاصيل العميل: هذا هو واحد من وصف العميل: ${customerDescription} وهذا هو مستوى دخلهم: ${customerIncome}. ذكر هذا الجزء في موضوع التجزئة والتوجيه\n`,
      sv: `Kunddetalj: detta är en av kundens beskrivningar: ${customerDescription} och detta är deras inkomstnivå: ${customerIncome}. Nämna detta segment i segmentering och targeting ämne\n`,
      fi: `Asiakkaan yksityiskohta: tämä on yksi asiakkaan kuvauksista: ${customerDescription} ja tämä on heidän tulotasonsa: ${customerIncome}. Mainitse tämä segmentti segmentoinnin ja kohdentamisen aiheessa\n`,
      da: `Kundedetalje: dette er en af kundens beskrivelser: ${customerDescription} og dette er deres indkomstniveau: ${customerIncome}. Nævn dette segment i segmentering og targeting emne\n`,
      no: `Kundedetalj: dette er en av kundens beskrivelser: ${customerDescription} og dette er deres inntektsnivå: ${customerIncome}. Nevn dette segmentet i segmentering og targeting emne\n`,
    };
    return descriptions[planLanguage];
  };

  let customerDescriptionPrompt = '';
  if (customerDescription1 && customerIncome1) {
    customerDescriptionPrompt += templatesDescription(
      customerDescription1,
      customerIncome1,
    );
  }
  if (customerDescription2 && customerIncome2) {
    customerDescriptionPrompt += templatesDescription(
      customerDescription2,
      customerIncome2,
    );
  }
  if (customerDescription3 && customerIncome3) {
    customerDescriptionPrompt += templatesDescription(
      customerDescription3,
      customerIncome3,
    );
  }

  const mark2TopicEN = 'Segementation, Targeting, Positioning';
  const mark2TopicDE = 'Segmentierung, Zielgruppenansprache, Positionierung';
  const mark2TopicFR = 'Segmentation, ciblage, positionnement';
  const mark2TopicES = 'Segmentación, orientación y posicionamiento';
  const mark2TopicIT = 'Segmentazione, targeting, posizionamento';
  const mark2TopicNL = 'Segmentatie, targeting, positionering';
  const mark2TopicJA = 'セグメンテーション、ターゲティング、ポジショニング';
  const mark2TopicAR = 'التفريق، والاستهداف، والتموضع';
  const mark2TopicSV = 'Segmentering, inriktning, positionering';
  const mark2TopicFI = 'Segmentointi, kohdistaminen, sijoittaminen';
  const mark2TopicDA = 'Segmentering, målretning, positionering';
  const mark2TopicNO = 'Segmentering, målretting, posisjonering';

  const promptTemplates = {
    en: `
    You are a professional consultant, and a client approaches you to write a long and detailed ${mark2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The expected first year revenue is ${firstYearRevenue}.
    business detail 6: The client's distribution channel is ${salesChannel}.
    business detail 7: The client's business operational status is ${businessOperationalStatus}.

    customer group description:
    ${customerDescriptionPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    Do not repeat the business details. Don't include other topics unless specified here.
    
    to generate ${mark2TopicEN}. In the Segmentation topic, there should be many segments of customer. include all segments in customer group description (keep this in mind but don't mention this verbatim in completion). Each segment should represent a customer persona. Each segment should be different from each other. describe the customer needs for each segment. Each segment should have different customer needs. describe demographics for each segment. describe purchasing behavior for each segment. use <li> tag for each segment. If there are only 3 segment from customer details, add 2 more segments.
    Don't be too broad when defining a segment.

    In the Targeting topic, you must only target the segments (or segment) from customer group description and NO OTHER segments (keep this in mind but don't mention this verbatim in completion). Specify the reason why you choose to go after these specific segment.

    In the positioning topic describe how you would position the business to be most attractive to the segments you have targeted in the Targeting topic. Keep in mind that your positioning should reflect the income level of your targeted segments mention in the Targeting topic.

    Write this as if you are the owner of the businsess, using "we" don't use "I".
    Generate response in html surround these key topics:${mark2TopicEN} with h5 tags. 
    Begin the completion with "<h4>STP</h4>" followed by "<h5>Segmentation</h5>
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mark2TopicEN} you came up with:
    `,
    'en-uk': `
    You are a professional consultant, and a client approaches you to write a long and detailed ${mark2TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The expected first year revenue is ${firstYearRevenue}.
    business detail 6: The client's distribution channel is ${salesChannel}.
    business detail 7: The client's business operational status is ${businessOperationalStatus}.

    customer group description:
    ${customerDescriptionPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    Do not repeat the business details. Don't include other topics unless specified here.
    
    to generate ${mark2TopicEN}. In the Segmentation topic, there should be many segments of customer. include all segments in customer group description (keep this in mind but don't mention this verbatim in completion). Each segment should represent a customer persona. Each segment should be different from each other. describe the customer needs for each segment. Each segment should have different customer needs. describe demographics for each segment. describe purchasing behavior for each segment. use <li> tag for each segment. If there are only 3 segment from customer details, add 2 more segments.
    Don't be too broad when defining a segment.

    In the Targeting topic, you must only target the segments (or segment) from customer group description and NO OTHER segments (keep this in mind but don't mention this verbatim in completion). Specify the reason why you choose to go after these specific segment.

    In the positioning topic describe how you would position the business to be most attractive to the segments you have targeted in the Targeting topic. Keep in mind that your positioning should reflect the income level of your targeted segments mention in the Targeting topic.

    Write this as if you are the owner of the businsess, using "we" don't use "I".
    Generate response in html surround these key topics:${mark2TopicEN} with h5 tags. 
    Begin the completion with "<h4>STP</h4>" followed by "<h5>Segmentation</h5>
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
Generate everything in English.
use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mark2TopicEN} you came up with:
    `,
    de: `
                Sie sind ein professioneller Berater, und ein Klient wendet sich an Sie, um einen langen und detaillierten ${mark2TopicDE} für einen Geschäftsplan zu schreiben.

                Geschäftsdetails:
                Geschäftsdetail 1: Der Name des Unternehmens des Kunden lautet ${businessName}.
                Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
                Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
                Geschäftsdetail 4: Der Kunde wird ${NEmployee} Mitarbeiter beschäftigen.
                Geschäftsdetail 5: Der erwartete Umsatz im ersten Jahr beträgt ${firstYearRevenue}.
                Geschäftsdetail 6: Der Vertriebskanal des Kunden ist ${salesChannel}.
                Geschäftsdetail 7: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
                
                Beschreibung der Kundengruppe:
                ${customerDescriptionPrompt}
                
                Dies sind Details zu den Produkten oder Dienstleistungen des Kunden:
                ${productInfoPrompt}
                
                Wiederholen Sie nicht die Geschäftsdetails.Schließen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben.
                
                Um ${mark2TopicDE} zu generieren. Im Thema Segmentierung sollten viele Kundensegmente vorhanden sein. Schließen Sie alle Segmente in der Beschreibung der Kundengruppe ein (behalten Sie dies im Hinterkopf, aber erwähnen Sie es nicht wörtlich im Abschluss). Jedes Segment sollte eine Kundenpersona repräsentieren. Jedes Segment sollte sich vom anderen unterscheiden. Beschreiben Sie die Bedürfnisse jedes Segments. Jedes Segment sollte unterschiedliche Kundenbedürfnisse haben. Beschreiben Sie die Demografie für jedes Segment. Beschreiben Sie das Kaufverhalten für jedes Segment. Verwenden Sie das <li>-Tag für jedes Segment. Wenn es nur 3 Segmente aus den Kundendetails gibt, fügen Sie 2 weitere Segmente hinzu.
                Seien Sie nicht zu allgemein bei der Definition eines Segments.
                
                Im Thema Zielgruppenauswahl müssen Sie nur die Segmente (oder das Segment) aus der Beschreibung der Kundengruppe anvisieren und KEINE ANDEREN Segmente (behalten Sie dies im Hinterkopf, aber erwähnen Sie es nicht wörtlich im Abschluss). Geben Sie den Grund an, warum Sie sich für diese spezifischen Segmente entscheiden.
                
                Im Thema Positionierung beschreiben Sie, wie Sie das Unternehmen positionieren würden, um es für die in der Zielgruppenauswahl anvisierten Segmente am attraktivsten zu machen. Beachten Sie, dass Ihre Positionierung das Einkommensniveau Ihrer anvisierten Segmente widerspiegeln sollte, wie im Thema Zielgruppenauswahl erwähnt.
                
                Schreiben Sie dies, als ob Sie der Eigentümer des Unternehmens sind, verwenden Sie "wir" und nicht "ich".
                Erstellen Sie die Antwort in HTML und umgeben Sie diese Schlüsselthemen: ${mark2TopicDE} mit h5-Tags.
                Beginnen Sie den Abschluss mit "<h4>STP</h4>", gefolgt von "<h5>Segmentierung</h5>
                Alles auf Deutsch generieren.
                Dies ist der lange, detaillierte und umfassende ${mark2TopicDE}, den Sie erstellt haben:`,
    fr: `
                Vous êtes un consultant professionnel, et un client vous approche pour rédiger un ${mark2TopicFR} long et détaillé pour un plan d'affaires.

                détails de l'entreprise :
                détail d'affaires 1 : Le nom de l'entreprise du client est ${businessName}.
                détail d'affaires 2 : Le type d'entreprise est ${businessType}.
                détail d'affaires 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
                détail d'affaires 4 : Le client emploiera ${NEmployee} employés.
                détail d'affaires 5 : Le revenu attendu pour la première année est de ${firstYearRevenue}.
                détail d'affaires 6 : Le canal de distribution du client est ${salesChannel}.
                détail d'affaires 7 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
                
                description du groupe de clients :
                ${customerDescriptionPrompt}
                
                Voici les détails des produits ou services du client :
                ${productInfoPrompt}
                
                Ne répétez pas les détails de l'entreprise. N'incluez pas d'autres sujets sauf s'ils sont spécifiés ici.
                
                pour générer ${mark2TopicFR}. Dans le sujet de la Segmentation, il devrait y avoir de nombreux segments de clients. incluez tous les segments dans la description du groupe de clients (gardez cela à l'esprit mais ne mentionnez pas cela mot pour mot dans le texte final). Chaque segment devrait représenter une persona de client. Chaque segment devrait être différent des autres. décrivez les besoins des clients pour chaque segment. Chaque segment devrait avoir des besoins différents. décrivez la démographie pour chaque segment. décrivez le comportement d'achat pour chaque segment. utilisez la balise <li> pour chaque segment. S'il n'y a que 3 segments issus des détails des clients, ajoutez 2 segments supplémentaires.
                Ne soyez pas trop vague lors de la définition d'un segment.
                
                Dans le sujet du Ciblage, vous devez uniquement cibler les segments (ou le segment) de la description du groupe de clients et AUCUN AUTRE segment (gardez cela à l'esprit mais ne mentionnez pas cela mot pour mot dans le texte final). Précisez la raison pour laquelle vous choisissez de poursuivre ces segments spécifiques.
                
                Dans le sujet du Positionnement, décrivez comment vous positionneriez l'entreprise pour qu'elle soit la plus attrayante pour les segments que vous avez ciblés dans le sujet du Ciblage. Gardez à l'esprit que votre positionnement devrait refléter le niveau de revenu de vos segments ciblés mentionnés dans le sujet du Ciblage.
                
                Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
                Générez une réponse en HTML entourant ces sujets clés :${mark2TopicFR} avec des balises h5.
                Commencez le texte final avec "<h4>STP</h4>" suivi de "<h5>Segmentation</h5>
                génère tout en français
                Voici le ${mark2TopicFR} long, détaillé et étendu que vous avez élaboré :`,
    es: `
                Eres un consultor profesional, y un cliente se acerca a ti para escribir un ${mark2TopicES} largo y detallado para un plan de negocio.

                detalles del negocio:
                detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
                detalle del negocio 2: El tipo de negocio es ${businessType}.
                detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
                detalle del negocio 4: El cliente empleará ${NEmployee} empleados.
                detalle del negocio 5: Los ingresos esperados para el primer año son ${firstYearRevenue}.
                detalle del negocio 6: El canal de distribución del cliente es ${salesChannel}.
                detalle del negocio 7: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
                
                descripción del grupo de clientes:
                ${customerDescriptionPrompt}
                
                Estos son detalles de los productos o servicios del cliente:
                ${productInfoPrompt}
                
                No repitas los detalles del negocio. No incluyas otros temas a menos que se especifiquen aquí.
                
                para generar ${mark2TopicES}. En el tema de Segmentación, debería haber muchos segmentos de clientes. Incluye todos los segmentos en la descripción del grupo de clientes (ten esto en cuenta pero no lo menciones textualmente en la finalización). Cada segmento debe representar una persona cliente. Cada segmento debe ser diferente de los demás. Describe las necesidades de los clientes para cada segmento. Cada segmento debe tener necesidades de clientes diferentes. Describe la demografía de cada segmento. Describe el comportamiento de compra de cada segmento. Usa la etiqueta <li> para cada segmento. Si solo hay 3 segmentos de los detalles del cliente, añade 2 segmentos más.
                No seas demasiado general al definir un segmento.
                
                En el tema de Orientación, debes dirigirte únicamente a los segmentos (o segmento) de la descripción del grupo de clientes y NO A OTROS segmentos (ten esto en cuenta pero no lo menciones textualmente en la finalización). Especifica la razón por la cual eliges ir tras estos segmentos específicos.
                
                En el tema de Posicionamiento describe cómo posicionarías el negocio para que sea más atractivo para los segmentos que has dirigido en el tema de Orientación. Ten en cuenta que tu posicionamiento debe reflejar el nivel de ingresos de tus segmentos objetivo mencionados en el tema de Orientación.
                
                Escribe esto como si fueras el propietario del negocio, utilizando "nosotros" no uses "yo".
                Genera una respuesta en HTML rodeando estos temas clave: ${mark2TopicES} con etiquetas h5.
                Comienza la finalización con "<h4>STP</h4>" seguido de "<h5>Segmentación</h5>
                genera todo en español
                Este es el ${mark2TopicES} largo, detallado y extenso que elaboraste:`,
    it: `
                Sei un consulente professionista e un cliente ti chiede di scrivere un ${mark2TopicIT} lungo e dettagliato per un piano aziendale.

                dettagli aziendali:
                dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
                dettaglio aziendale 2: Il tipo di azienda è ${businessType}.
                dettaglio aziendale 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
                dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
                dettaglio aziendale 5: Il fatturato previsto per il primo anno è ${firstYearRevenue}.
                dettaglio aziendale 6: Il canale di distribuzione del cliente è ${salesChannel}.
                dettaglio aziendale 7: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
            
                ${customerDescriptionPrompt}
            
                Questi sono i dettagli dei prodotti o servizi del cliente:
                ${productInfoPrompt}
            
                Non ripetere i dettagli aziendali. Non includere altri argomenti a meno che non sia specificato qui.
                
                per generare ${mark2TopicIT}. Nel tema della Segmentazione, dovrebbero esserci molti segmenti di clienti. include segmenti dal dettaglio del cliente 1, dettaglio del cliente 2 e dettaglio del cliente 3 (tienilo a mente ma non menzionarlo verbatim nella realizzazione). Ogni segmento dovrebbe rappresentare una persona del cliente. Ogni segmento dovrebbe essere diverso l'uno dall'altro. descrive le esigenze dei clienti per ogni segmento. Ogni segmento dovrebbe avere esigenze diverse dei clienti. descrive la demografia per ogni segmento. descrive il comportamento di acquisto per ogni segmento. usa il tag <li> per ogni segmento. Se ci sono solo 3 segmenti nei dettagli del cliente, aggiungi 2 segmenti in più.
                Non essere troppo ampio nella definizione di un segmento.
            
                Nel tema del Targeting, devi puntare al segmento dal dettaglio del cliente 1, dettaglio del cliente 2 e dettaglio del cliente 3 (tienilo a mente ma non menzionarlo verbatim nella realizzazione). Specifica il motivo per cui scegli di andare dietro a questi segmenti specifici.
            
                Nel tema del Posizionamento descrivi come posizioneresti l'azienda per essere più attraente per i segmenti che hai puntato nel tema del Targeting. Tieni presente che il tuo posizionamento dovrebbe riflettere il livello di reddito dei tuoi segmenti target menzionati nel tema del Targeting.
            
                Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
                Genera una risposta in html circonda questi argomenti chiave:${mark2TopicIT} con i tag h5.
                Inizia la realizzazione con "<h4>STP</h4>" seguito da "<h5>Segmentazione</h5>
                genera tutto in italiano
                Questo è il ${mark2TopicIT} lungo, dettagliato e approfondito che hai elaborato:`,
    nl: `
                Je bent een professionele consultant en een klant vraagt je om een lange en gedetailleerde ${mark2TopicNL} te schrijven voor een bedrijfsplan.
            
                bedrijfsdetails:
                bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
                bedrijfsdetail 2: Het type bedrijf is ${businessType}.
                bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
                bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst hebben.
                bedrijfsdetail 5: De verwachte omzet voor het eerste jaar is ${firstYearRevenue}.
                bedrijfsdetail 6: Het distributiekanaal van de klant is ${salesChannel}.
                bedrijfsdetail 7: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
            
                beschrijving van de klantengroep:
                ${customerDescriptionPrompt}
            
                Dit zijn details van de producten of diensten van de klant:
                ${productInfoPrompt}
            
                Herhaal de bedrijfsdetails niet. Neem geen andere onderwerpen op tenzij hier gespecificeerd.
                
                om ${mark2TopicNL} te genereren. In het onderwerp Segmentatie moeten er veel klantsegmenten zijn. neem alle segmenten op in de beschrijving van de klantengroep (houd dit in gedachten maar vermeld dit niet letterlijk in de voltooiing). Elk segment moet een klantpersona vertegenwoordigen. Elk segment moet anders zijn dan de andere. beschrijf de klantbehoeften voor elk segment. Elk segment moet verschillende klantbehoeften hebben. beschrijf de demografie voor elk segment. beschrijf het aankoopgedrag voor elk segment. gebruik de <li> tag voor elk segment. Als er slechts 3 segmenten zijn uit de klantdetails, voeg dan 2 extra segmenten toe.
                Wees niet te breed bij het definiëren van een segment.
            
                In het onderwerp Targeting moet je alleen de segmenten (of segment) uit de beschrijving van de klantengroep targeten en GEEN ANDERE segmenten (houd dit in gedachten maar vermeld dit niet letterlijk in de voltooiing). Geef de reden aan waarom je ervoor kiest om deze specifieke segmenten te targeten.
            
                In het onderwerp Positionering beschrijf je hoe je het bedrijf zou positioneren om het meest aantrekkelijk te zijn voor de segmenten die je hebt getarget in het onderwerp Targeting. Houd er rekening mee dat je positionering het inkomensniveau van je getargete segmenten moet weerspiegelen, zoals vermeld in het onderwerp Targeting.
            
                Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
                Genereer een reactie in html en omring deze sleutelonderwerpen:${mark2TopicNL} met h5 tags.
                Begin de voltooiing met "<h4>STP</h4>" gevolgd door "<h5>Segmentatie</h5>
                Genereer alles in het Nederlands.
                Dit is de lange, gedetailleerde en uitgebreide ${mark2TopicNL} die je hebt bedacht:`,
    ja: `
                あなたはプロのコンサルタントで、クライアントがビジネスプランのための詳細で長い${mark2TopicJA}を書くように依頼してきました。
            
                ビジネスの詳細：
                ビジネス詳細1：クライアントのビジネス名は${businessName}です。
                ビジネス詳細2：ビジネスの種類は${businessType}です。
                ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
                ビジネス詳細4：クライアントは${NEmployee}人の従業員を雇います。
                ビジネス詳細5：初年度の予想売上は${firstYearRevenue}です。
                ビジネス詳細6：クライアントの流通チャネルは${salesChannel}です。
                ビジネス詳細7：クライアントのビジネス運営状況は${businessOperationalStatus}です。
            
                顧客グループの説明：
                ${customerDescriptionPrompt}
            
                これらはクライアントの製品またはサービスの詳細です：
                ${productInfoPrompt}
            
                ビジネスの詳細を繰り返さないでください。ここで指定されていない他のトピックを含めないでください。
                
                ${mark2TopicJA}を生成するために、セグメンテーションのトピックでは、顧客の多くのセグメントがあるべきです。顧客グループの説明にすべてのセグメントを含めます（これを心に留めておき、完成品ではこれを逐語的に言及しないでください）。各セグメントは顧客のパーソナを表すべきです。各セグメントは互いに異なるべきです。各セグメントの顧客のニーズを説明します。各セグメントは異なる顧客のニーズを持つべきです。各セグメントの人口統計を説明します。各セグメントの購買行動を説明します。各セグメントに<li>タグを使用します。顧客の詳細からセグメントが3つしかない場合は、2つのセグメントを追加します。
                セグメントを定義するときには広すぎないでください。
            
                ターゲティングのトピックでは、顧客グループの説明からのセグメント（またはセグメント）のみをターゲットにし、他のセグメントはターゲットにしないでください（これを心に留めておき、完成品ではこれを逐語的に言及しないでください）。これらの特定のセグメントを追求する理由を明示してください。
            
                ポジショニングのトピックでは、ターゲティングのトピックでターゲットにしたセグメントに最も魅力的に見えるようにビジネスをどのように位置づけるかを説明します。ポジショニングは、ターゲティングのトピックで言及したターゲットセグメントの収入レベルを反映するべきであることを念頭に置いてください。
            
                これをビジネスのオーナーであるかのように書き、"we"を使用し、"I"を使用しないでください。
                HTMLでレスポンスを生成し、これらのキートピック：${mark2TopicJA}をh5タグで囲みます。
                完成品を"<h4>STP</h4>"で始め、次に"<h5>Segmentation</h5>を続けます。
                すべてを日本語で生成します。
                これがあなたが考え出した長く、詳細で、長い${mark2TopicJA}です：`,
    ar: `
                أنت مستشار محترف، ويتوجه إليك عميل لكتابة ${mark2TopicAR} طويلة ومفصلة لخطة عمل.
            
                تفاصيل العمل:
                تفصيل العمل 1: اسم العمل للعميل هو ${businessName}.
                تفصيل العمل 2: نوع العمل هو ${businessType}.
                تفصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
                تفصيل العمل 4: سيوظف العميل ${NEmployee} موظفين.
                تفصيل العمل 5: الإيرادات المتوقعة للسنة الأولى هي ${firstYearRevenue}.
                تفصيل العمل 6: قناة التوزيع للعميل هي ${salesChannel}.
                تفصيل العمل 7: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.
            
                وصف مجموعة العملاء:
                ${customerDescriptionPrompt}
            
                هذه هي تفاصيل المنتجات أو الخدمات للعميل:
                ${productInfoPrompt}
            
              لا تكرر تفاصيل العمل. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
                
                لتوليد ${mark2TopicAR}. في موضوع التفريق، يجب أن يكون هناك العديد من شرائح العملاء. تضمين جميع الشرائح في وصف مجموعة العملاء (ضع هذا في اعتبارك ولكن لا تذكر هذا حرفيا في الاكتمال). يجب أن تمثل كل شريحة شخصية العميل. يجب أن تكون كل شريحة مختلفة عن الأخرى. اصف احتياجات العملاء لكل شريحة. يجب أن تكون لكل شريحة احتياجات عملاء مختلفة. اصف الديموغرافيا لكل شريحة. اصف سلوك الشراء لكل شريحة. استخدم الوسم <li> لكل شريحة. إذا كانت هناك فقط 3 شرائح من تفاصيل العملاء، أضف شريحتين إضافيتين.
                لا تكن واسعًا جدًا عند تحديد شريحة.
            
                في موضوع الاستهداف، يجب أن تستهدف فقط الشرائح (أو الشريحة) من وصف مجموعة العملاء ولا شرائح أخرى (ضع هذا في اعتبارك ولكن لا تذكر هذا حرفيا في الاكتمال). حدد السبب الذي يدفعك للذهاب بعد هذه الشريحة المحددة.
            
                في موضوع التموضع، اصف كيف ستقوم بتموضع العمل ليكون الأكثر جاذبية للشرائح التي استهدفتها في موضوع الاستهداف. ضع في اعتبارك أن تموضعك يجب أن يعكس مستوى الدخل للشرائح التي استهدفتها في موضوع الاستهداف.
            
                اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
                أنشئ الرد في html وحيط هذه المواضيع الرئيسية:${mark2TopicAR} بوسوم h5.
                ابدأ الاكتمال بـ "<h4>STP</h4>" تليها "<h5>التفريق</h5>
                أنشئ كل شيء باللغة العربية.
                هذا هو ${mark2TopicAR} الطويل والمفصل والطويل الذي ابتكرته:`,
    sv: `
                Du är en professionell konsult och en klient ber dig skriva en lång och detaljerad ${mark2TopicSV} för en affärsplan.
            
                företagsdetaljer:
                företagsdetalj 1: Kundens företagsnamn är ${businessName}.
                företagsdetalj 2: Typen av verksamhet är ${businessType}.
                företagsdetalj 3: Detta är var företagets kunder finns: ${location}.
                företagsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda.
                företagsdetalj 5: Den förväntade intäkten för första året är ${firstYearRevenue}.
                företagsdetalj 6: Kundens distributionskanal är ${salesChannel}.
                företagsdetalj 7: Kundens företags operativa status är ${businessOperationalStatus}.
            
                beskrivning av kundgrupp:
                ${customerDescriptionPrompt}
            
                Detta är detaljer om kundens produkter eller tjänster:
                ${productInfoPrompt}
            
                Upprepa inte företagsdetaljerna. Inkludera inte andra ämnen om det inte specificeras här.
                
                för att generera ${mark2TopicSV}. I ämnet Segmentering bör det finnas många kundsegment. inkludera alla segment i beskrivningen av kundgruppen (kom ihåg detta men nämn det inte ordagrant i slutförandet). Varje segment bör representera en kundpersona. Varje segment bör skilja sig från varandra. beskriv kundens behov för varje segment. Varje segment bör ha olika kundbehov. beskriv demografi för varje segment. beskriv köpbeteende för varje segment. använd <li> taggen för varje segment. Om det bara finns 3 segment från kunddetaljer, lägg till 2 fler segment.
                Var inte för bred när du definierar ett segment.
            
                I ämnet Inriktning måste du endast rikta in dig på segmenten (eller segmentet) från beskrivningen av kundgruppen och INGA ANDRA segment (kom ihåg detta men nämn det inte ordagrant i slutförandet). Specificera varför du väljer att gå efter detta specifika segment.
            
                I ämnet Positionering beskriv hur du skulle positionera företaget för att vara mest attraktivt för de segment du har riktat in dig på i ämnet Inriktning. Kom ihåg att din positionering bör reflektera inkomstnivån för dina riktade segment nämnda i ämnet Inriktning.
            
                Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
                Generera svar i html omge dessa nyckelämnen:${mark2TopicSV} med h5-taggar.
                Börja slutförandet med "<h4>STP</h4>" följt av "<h5>Segmentering</h5>
                Generera allt på svenska.
                Detta är den långa, detaljerade och långa ${mark2TopicSV} du kom upp med:`,
    fi: `
                Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark2TopicFI} liiketoimintasuunnitelmaan.
            
                liiketoiminnan tiedot:
                liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
                liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}.
                liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
                liiketoiminnan yksityiskohta 4: Asiakas palkkaa ${NEmployee} työntekijää.
                liiketoiminnan yksityiskohta 5: Ensimmäisen vuoden odotettu liikevaihto on ${firstYearRevenue}.
                liiketoiminnan yksityiskohta 6: Asiakkaan jakelukanava on ${salesChannel}.
                liiketoiminnan yksityiskohta 7: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
            
                asiakasryhmän kuvaus:
                ${customerDescriptionPrompt}
            
                Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
                ${productInfoPrompt}
            
                Älä toista liiketoiminnan tietoja. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
                
                generoidaksesi ${mark2TopicFI}. Segmentoinnin aiheessa tulisi olla monia asiakassegmenttejä. sisällytä kaikki segmentit asiakasryhmän kuvaus (pidä tämä mielessä, mutta älä mainitse tätä sanatarkasti täydennyksessä). Jokaisen segmentin tulisi edustaa asiakaspersoonaa. Jokaisen segmentin tulisi olla erilainen toisistaan. kuvaile asiakkaan tarpeita jokaiselle segmentille. Jokaisella segmentillä tulisi olla erilaiset asiakastarpeet. kuvaile demografiaa jokaiselle segmentille. kuvaile ostokäyttäytymistä jokaiselle segmentille. käytä <li> tagia jokaiselle segmentille. Jos asiakastiedoista on vain 3 segmenttiä, lisää 2 lisäsegmenttiä.
                Älä ole liian laaja määritellessäsi segmenttiä.
            
                Kohdistamisen aiheessa sinun on kohdistettava vain segmentit (tai segmentti) asiakasryhmän kuvauksesta ja EI MUITA segmenttejä (pidä tämä mielessä, mutta älä mainitse tätä sanatarkasti täydennyksessä). Määritä syy, miksi valitset nämä erityiset segmentit.
            
                Positionoinnin aiheessa kuvaile, miten sijoittaisit yrityksen ollaksesi houkuttelevin kohdistamissasi segmenteissä. Muista, että positionointisi tulisi heijastaa kohdistettujen segmenttiesi tulotasoa Kohdistamisen aiheessa.
            
                Kirjoita tämä ikään kuin olisit yrityksen omistaja, käyttäen "me", älä käytä "minä".
                Generoi vastaus html: ssä ympäröi nämä avainaiheet:${mark2TopicFI} h5-tageilla.
                Aloita täydennys "<h4>STP</h4>" seuraa "<h5>Segmentointi</h5>
                Generoi kaikki suomeksi.
                Tämä on pitkä, yksityiskohtainen ja pitkä ${mark2TopicFI}, jonka keksit:`,
    da: `
                Du er en professionel konsulent, og en klient nærmer dig for at skrive en lang og detaljeret ${mark2TopicDA} til en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalje 1: Klientens firmanavn er ${businessName}.
                forretningsdetalje 2: Typen af forretning er ${businessType}.
                forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
                forretningsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere.
                forretningsdetalje 5: Den forventede indtægt i det første år er ${firstYearRevenue}.
                forretningsdetalje 6: Klientens distributionskanal er ${salesChannel}.
                forretningsdetalje 7: Klientens forretnings operationelle status er ${businessOperationalStatus}.
            
                beskrivelse af kundegruppe:
                ${customerDescriptionPrompt}
            
                Dette er detaljer om klientens produkter eller tjenester:
                ${productInfoPrompt}
            
                Gentag ikke forretningsdetaljerne. Inkluder ikke andre emner, medmindre det er specificeret her.
                
                for at generere ${mark2TopicDA}. I emnet Segmentering, skal der være mange kundesegmenter. inkluder alle segmenter i beskrivelsen af kundegruppen (hold dette i tankerne, men nævn det ikke ordret i fuldførelsen). Hvert segment skal repræsentere en kundepersona. Hvert segment skal være forskelligt fra hinanden. beskriv kundens behov for hvert segment. Hvert segment skal have forskellige kundebehov. beskriv demografi for hvert segment. beskriv købsadfærd for hvert segment. brug <li> tag for hvert segment. Hvis der kun er 3 segmenter fra kundedetaljerne, tilføj 2 flere segmenter.
                Vær ikke for bred, når du definerer et segment.
            
                I emnet Målretning, skal du kun målrette segmenterne (eller segmentet) fra beskrivelsen af kundegruppen og INGEN ANDRE segmenter (hold dette i tankerne, men nævn det ikke ordret i fuldførelsen). Specificer årsagen til, at du vælger at gå efter dette specifikke segment.
            
                I emnet Positionering beskriv, hvordan du ville positionere virksomheden for at være mest attraktiv for de segmenter, du har målrettet i emnet Målretning. Husk, at din positionering skal afspejle indkomstniveauet for dine målrettede segmenter nævnt i emnet Målretning.
            
                Skriv dette, som om du er ejeren af virksomheden, ved hjælp af "vi", brug ikke "jeg".
                Generer svar i html omgiv disse nøgleemner:${mark2TopicDA} med h5-tags.
                Begynd fuldførelsen med "<h4>STP</h4>" efterfulgt af "<h5>Segmentering</h5>
                Generer alt på dansk.
                Dette er den lange, detaljerede og omfattende ${mark2TopicDA}, du kom op med:`,
    no: `
                Du er en profesjonell konsulent, og en klient nærmer deg for å skrive en lang og detaljert ${mark2TopicNO} for en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalje 1: Klientens firmanavn er ${businessName}.
                forretningsdetalje 2: Typen av forretning er ${businessType}.
                forretningsdetalje 3: Dette er hvor virksomhetens kunder er: ${location}.
                forretningsdetalje 4: Klienten vil ansette ${NEmployee} ansatte.
                forretningsdetalje 5: Den forventede inntekten i det første året er ${firstYearRevenue}.
                forretningsdetalje 6: Klientens distribusjonskanal er ${salesChannel}.
                forretningsdetalje 7: Klientens forretnings operasjonelle status er ${businessOperationalStatus}.
            
                beskrivelse av kundegruppe:
                ${customerDescriptionPrompt}
            
                Dette er detaljer om klientens produkter eller tjenester:
                ${productInfoPrompt}
            
                Gjenta ikke forretningsdetaljene. Ikke inkluder andre emner, med mindre det er spesifisert her.
                
                for å generere ${mark2TopicNO}. I emnet Segmentering, skal det være mange kundesegmenter. inkluder alle segmenter i beskrivelsen av kundegruppen (hold dette i tankene, men nevn det ikke ordrett i fullførelsen). Hvert segment skal representere en kundepersona. Hvert segment skal være forskjellig fra hverandre. beskriv kundens behov for hvert segment. Hvert segment skal ha forskjellige kundebehov. beskriv demografi for hvert segment. beskriv kjøpsatferd for hvert segment. bruk <li> tag for hvert segment. Hvis det bare er 3 segmenter fra kundedetaljene, legg til 2 flere segmenter.
                Vær ikke for bred når du definerer et segment.
            
                I emnet Målretting, skal du bare målrette segmentene (eller segmentet) fra beskrivelsen av kundegruppen og INGEN ANDRE segmenter (hold dette i tankene, men nevn det ikke ordrett i fullførelsen). Spesifiser årsaken til at du velger å gå etter dette spesifikke segmentet.
            
                I emnet Posisjonering, beskriv hvordan du ville posisjonere virksomheten for å være mest attraktiv for de segmentene du har målrettet i emnet Målretting. Husk at din posisjonering skal reflektere inntektsnivået for dine målrettede segmenter nevnt i emnet Målretting.
            
                Skriv dette som om du er eieren av virksomheten, ved hjelp av "vi", bruk ikke "jeg".
                Generer svar i html, omgir disse nøkkelemner:${mark2TopicNO} med h5-tags.
                Begynn fullførelsen med "<h4>STP</h4>" etterfulgt av "<h5>Segmentering</h5>
                Generer alt på norsk.
                Dette er den lange, detaljerte og omfattende ${mark2TopicNO} du kom opp med:`,
  };

  if (variantID === '2') {
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
  } else {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
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
