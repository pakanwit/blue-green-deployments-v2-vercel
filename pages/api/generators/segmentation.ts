import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

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
  modelName?: string;
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
    modelName,
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
    en: `You are a professional consultant, and a client approaches you to write a long and detailed ${mark2TopicEN} for a business plan.

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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    This is the long, detailed, and lengthy ${mark2TopicEN} you came up with:
    `,
    'en-uk': `You are a professional consultant, and a client approaches you to write a long and detailed ${mark2TopicEN} for a business plan.

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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    use british english spelling and grammar
    This is the long, detailed, and lengthy ${mark2TopicEN} you came up with:
    `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um ein langes und detailliertes ${mark2TopicDE} für einen Geschäftsplan zu schreiben.

    Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Geschäfts ist ${businessType}. 
    Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdaten 4: Der Kunde wird ${NEmployee} Mitarbeiter beschäftigen.
    Geschäftsdaten 5: Der erwartete Umsatz im ersten Jahr beträgt ${firstYearRevenue}.
    Geschäftsdaten 6: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdaten 7: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
  
    Beschreibung der Kundengruppe:
    ${customerDescriptionPrompt}
  
    Dies sind die Details der Produkte oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
  
    Wiederholen Sie die Geschäftsdaten nicht. Schließen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben.
    
    um ${mark2TopicDE} zu generieren. Im Thema Segmentierung sollte es viele Kundensegmente geben. Schließen Sie alle Segmente in die Beschreibung der Kundengruppe ein (behalten Sie dies im Hinterkopf, aber erwähnen Sie dies nicht wörtlich in der Ausführung). Jedes Segment sollte eine Kundenpersönlichkeit darstellen. Jedes Segment sollte sich voneinander unterscheiden. Beschreiben Sie die Bedürfnisse der Kunden für jedes Segment. Jedes Segment sollte unterschiedliche Kundenbedürfnisse haben. Beschreiben Sie die Demografie für jedes Segment. Beschreiben Sie das Kaufverhalten für jedes Segment. Verwenden Sie das <li>-Tag für jedes Segment. Wenn es nur 3 Segmente aus den Kundendetails gibt, fügen Sie 2 weitere Segmente hinzu.
    Seien Sie nicht zu allgemein bei der Definition eines Segments.
  
    Im Thema Zielgruppenansprache dürfen Sie nur die Segmente (oder das Segment) aus der Beschreibung der Kundengruppe ansprechen und KEINE ANDEREN Segmente (behalten Sie dies im Hinterkopf, aber erwähnen Sie dies nicht wörtlich in der Ausführung). Geben Sie den Grund an, warum Sie sich für diese spezifischen Segmente entschieden haben.
  
    Im Thema Positionierung beschreiben Sie, wie Sie das Unternehmen so positionieren würden, dass es für die Segmente, die Sie im Thema Zielgruppenansprache anvisiert haben, am attraktivsten ist. Denken Sie daran, dass Ihre Positionierung das Einkommensniveau Ihrer anvisierten Segmente widerspiegeln sollte, das im Thema Zielgruppenansprache erwähnt wird.
  
    Schreiben Sie dies, als ob Sie der Eigentümer des Unternehmens wären, und verwenden Sie "wir", nicht "ich".
    Generieren Sie die Antwort in HTML und umgeben Sie diese Schlüsselthemen:${mark2TopicDE} mit h5-Tags. 
    Beginnen Sie die Ausführung mit "<h4>STP</h4>" gefolgt von "<h5>Segmentierung</h5>
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern das <li>-Tag.
  Generieren Sie alles auf Deutsch.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort.
    Dies ist das lange, detaillierte und ausführliche ${mark2TopicDE}, das Sie sich ausgedacht haben:
    `,
    fr: `Vous êtes un consultant professionnel, et un client vous demande d'écrire un ${mark2TopicFR} long et détaillé pour un plan d'affaires.

    détails de l'entreprise:
    détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
    détail de l'entreprise 2: Le type d'entreprise est ${businessType}. 
    détail de l'entreprise 3: Voici où se trouvent les clients de l'entreprise: ${location}.
    détail de l'entreprise 4: Le client emploiera ${NEmployee} employés.
    détail de l'entreprise 5: Le chiffre d'affaires attendu pour la première année est de ${firstYearRevenue}.
    détail de l'entreprise 6: Le canal de distribution du client est ${salesChannel}.
    détail de l'entreprise 7: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    description du groupe de clients:
    ${customerDescriptionPrompt}
  
    Voici les détails des produits ou services du client:
    ${productInfoPrompt}
  
    Ne répétez pas les détails de l'entreprise. N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici.
    
    pour générer ${mark2TopicFR}. Dans le sujet de la segmentation, il devrait y avoir de nombreux segments de clients. incluez tous les segments dans la description du groupe de clients (gardez cela à l'esprit mais ne le mentionnez pas textuellement dans l'exécution). Chaque segment doit représenter un persona client. Chaque segment doit être différent les uns des autres. décrivez les besoins des clients pour chaque segment. Chaque segment doit avoir des besoins clients différents. décrivez la démographie pour chaque segment. décrivez le comportement d'achat pour chaque segment. utilisez la balise <li> pour chaque segment. S'il n'y a que 3 segments à partir des détails des clients, ajoutez 2 segments supplémentaires.
    Ne soyez pas trop large lors de la définition d'un segment.
  
    Dans le sujet du ciblage, vous devez uniquement cibler les segments (ou le segment) de la description du groupe de clients et AUCUN AUTRE segment (gardez cela à l'esprit mais ne le mentionnez pas textuellement dans l'exécution). Spécifiez la raison pour laquelle vous choisissez de vous adresser à ces segments spécifiques.
  
    Dans le sujet du positionnement, décrivez comment vous positionneriez l'entreprise pour être la plus attractive pour les segments que vous avez ciblés dans le sujet du ciblage. Gardez à l'esprit que votre positionnement doit refléter le niveau de revenu de vos segments ciblés mentionnés dans le sujet du ciblage.
  
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Générez la réponse en HTML en entourant ces sujets clés:${mark2TopicFR} avec des balises h5. 
    Commencez l'exécution par "<h4>STP</h4>" suivi de "<h5>Segmentation</h5>
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, mais la balise <strong> pour le gras. N'utilisez pas * *, mais la balise <em> pour l'italique. N'utilisez pas * pour les puces, mais la balise <li>.
  Générez tout en français.
  C'est important : Soyez très perspicace dans votre réponse
    Voici le ${mark2TopicFR} long, détaillé et complet que vous avez imaginé:
    `,
    es: `Usted es un consultor profesional, y un cliente se le acerca para escribir una ${mark2TopicES} larga y detallada para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: El cliente empleará ${NEmployee} empleados.
    detalle del negocio 5: Los ingresos esperados del primer año son ${firstYearRevenue}.
    detalle del negocio 6: El canal de distribución del cliente es ${salesChannel}.
    detalle del negocio 7: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    descripción del grupo de clientes:
    ${customerDescriptionPrompt}
  
    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
  
    No repita los detalles del negocio. No incluya otros temas a menos que se especifiquen aquí.
    
    para generar ${mark2TopicES}. En el tema de la segmentación, debe haber muchos segmentos de clientes. incluya todos los segmentos en la descripción del grupo de clientes (tenga esto en cuenta pero no lo mencione textualmente en la ejecución). Cada segmento debe representar una persona del cliente. Cada segmento debe ser diferente entre sí. describa las necesidades del cliente para cada segmento. Cada segmento debe tener diferentes necesidades del cliente. describa la demografía para cada segmento. describa el comportamiento de compra para cada segmento. use la etiqueta <li> para cada segmento. Si solo hay 3 segmentos de los detalles del cliente, agregue 2 segmentos más.
    No sea demasiado amplio al definir un segmento.
  
    En el tema de la orientación, solo debe dirigirse a los segmentos (o segmento) de la descripción del grupo de clientes y NINGÚN OTRO segmento (tenga esto en cuenta pero no lo mencione textualmente en la ejecución). Especifique la razón por la que elige dirigirse a estos segmentos específicos.
  
    En el tema del posicionamiento, describa cómo posicionaría el negocio para ser más atractivo para los segmentos que ha dirigido en el tema de la orientación. Tenga en cuenta que su posicionamiento debe reflejar el nivel de ingresos de sus segmentos objetivo mencionados en el tema de la orientación.
  
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no "yo".
    Genere la respuesta en HTML rodeando estos temas clave:${mark2TopicES} con etiquetas h5. 
    Comience la ejecución con "<h4>STP</h4>" seguido de "<h5>Segmentación</h5>
    Use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para viñetas, en su lugar use la etiqueta <li>.
  Genere todo en español.
  Esto es importante: Sé muy perspicaz en tu respuesta
    Esta es la ${mark2TopicES} larga, detallada y completa que se le ocurrió:
    `,
    it: `Sei un consulente professionista e un cliente si rivolge a te per scrivere una ${mark2TopicIT} lunga e dettagliata per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di attività è ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
    dettaglio aziendale 5: Il fatturato previsto per il primo anno è ${firstYearRevenue}.
    dettaglio aziendale 6: Il canale di distribuzione del cliente è ${salesChannel}.
    dettaglio aziendale 7: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    descrizione del gruppo di clienti:
    ${customerDescriptionPrompt}
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
  
    Non ripetere i dettagli aziendali. Non includere altri argomenti a meno che non siano specificati qui.
    
    per generare ${mark2TopicIT}. Nel tema della segmentazione, dovrebbero esserci molti segmenti di clienti. includi tutti i segmenti nella descrizione del gruppo di clienti (tieni presente questo ma non menzionarlo alla lettera nell'esecuzione). Ogni segmento dovrebbe rappresentare una persona del cliente. Ogni segmento dovrebbe essere diverso dagli altri. descrivi le esigenze dei clienti per ogni segmento. Ogni segmento dovrebbe avere esigenze dei clienti diverse. descrivi la demografia per ogni segmento. descrivi il comportamento di acquisto per ogni segmento. usa il tag <li> per ogni segmento. Se ci sono solo 3 segmenti dai dettagli dei clienti, aggiungi altri 2 segmenti.
    Non essere troppo generico nella definizione di un segmento.
  
    Nel tema del targeting, devi solo mirare ai segmenti (o segmento) dalla descrizione del gruppo di clienti e NESSUN ALTRO segmento (tieni presente questo ma non menzionarlo alla lettera nell'esecuzione). Specifica il motivo per cui scegli di rivolgerti a questi segmenti specifici.
  
    Nel tema del posizionamento descrivi come posizioneresti l'azienda per essere più attraente per i segmenti che hai mirato nel tema del targeting. Tieni presente che il tuo posizionamento dovrebbe riflettere il livello di reddito dei tuoi segmenti target menzionati nel tema del targeting.
  
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
    Genera la risposta in HTML circondando questi argomenti chiave:${mark2TopicIT} con tag h5. 
    Inizia l'esecuzione con "<h4>STP</h4>" seguito da "<h5>Segmentazione</h5>
    Usa solo tag HTML, non usare markdown. Non usare ** **, invece usa il tag <strong> per il grassetto. Non usare * *, invece usa il tag <em> per il corsivo. Non usare * per i punti elenco, invece usa il tag <li>.
  genera tutto in italiano
  Questo è importante: Sii molto perspicace nella tua risposta
    Questo è il ${mark2TopicIT} lungo, dettagliato e completo che hai ideato:
    `,
    nl: `U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mark2TopicNL} voor een bedrijfsplan te schrijven.

    bedrijfsgegevens:
    bedrijfsgegevens 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegevens 2: Het type bedrijf is ${businessType}. 
    bedrijfsgegevens 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
    bedrijfsgegevens 4: De klant zal ${NEmployee} werknemers in dienst nemen.
    bedrijfsgegevens 5: De verwachte omzet in het eerste jaar is ${firstYearRevenue}.
    bedrijfsgegevens 6: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsgegevens 7: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    beschrijving van de klantengroep:
    ${customerDescriptionPrompt}
  
    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}
  
    Herhaal de bedrijfsgegevens niet. Neem geen andere onderwerpen op, tenzij hier gespecificeerd.
    
    om ${mark2TopicNL} te genereren. In het segmentatiethema moeten er veel klantsegmenten zijn. neem alle segmenten op in de beschrijving van de klantengroep (houd dit in gedachten maar vermeld dit niet letterlijk in de uitvoering). Elk segment moet een klantpersona vertegenwoordigen. Elk segment moet van elkaar verschillen. beschrijf de behoeften van de klant voor elk segment. Elk segment moet verschillende klantbehoeften hebben. beschrijf de demografie voor elk segment. beschrijf het koopgedrag voor elk segment. gebruik de <li>-tag voor elk segment. Als er slechts 3 segmenten zijn uit de klantgegevens, voeg dan 2 extra segmenten toe.
    Wees niet te breed bij het definiëren van een segment.
  
    In het targeting-thema moet u alleen de segmenten (of het segment) uit de beschrijving van de klantengroep targeten en GEEN ANDERE segmenten (houd dit in gedachten maar vermeld dit niet letterlijk in de uitvoering). Specificeer de reden waarom u ervoor kiest om deze specifieke segmenten te targeten.
  
    In het positioneringsthema beschrijft u hoe u het bedrijf zou positioneren om het meest aantrekkelijk te zijn voor de segmenten die u hebt getarget in het targeting-thema. Houd er rekening mee dat uw positionering het inkomensniveau van uw doelsegmenten moet weerspiegelen zoals vermeld in het targeting-thema.
  
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Genereer de reactie in HTML en omring deze sleutelthema's:${mark2TopicNL} met h5-tags. 
    Begin de uitvoering met "<h4>STP</h4>" gevolgd door "<h5>Segmentatie</h5>
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
  genereer alles in het Nederlands
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
    Dit is de lange, gedetailleerde en uitgebreide ${mark2TopicNL} die u hebt bedacht:
    `,
    ja: `あなたはプロのコンサルタントであり、クライアントがビジネスプランのために長く詳細な${mark2TopicJA}を書くように依頼してきます。

    ビジネスの詳細:
    ビジネスの詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネスの詳細 2: ビジネスの種類は${businessType}です。
    ビジネスの詳細 3: これはビジネスの顧客がいる場所です:${location}。
    ビジネスの詳細 4: クライアントは${NEmployee}人の従業員を雇用します。
    ビジネスの詳細 5: 初年度の予想収益は${firstYearRevenue}です。
    ビジネスの詳細 6: クライアントの流通チャネルは${salesChannel}です。
    ビジネスの詳細 7: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
  
    顧客グループの説明:
    ${customerDescriptionPrompt}
  
    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}
  
    ビジネスの詳細を繰り返さないでください。ここで指定されていない他のトピックを含めないでください。
    
    ${mark2TopicJA}を生成するために。セグメンテーションのトピックでは、多くの顧客セグメントが必要です。顧客グループの説明にすべてのセグメントを含めてください（これを念頭に置いてくださいが、完了時にこれをそのまま言及しないでください）。各セグメントは顧客ペルソナを表す必要があります。各セグメントは互いに異なる必要があります。各セグメントの顧客ニーズを説明してください。各セグメントは異なる顧客ニーズを持つ必要があります。各セグメントの人口統計を説明してください。各セグメントの購買行動を説明してください。各セグメントに<li>タグを使用してください。顧客の詳細からセグメントが3つしかない場合は、さらに2つのセグメントを追加してください。
    セグメントを定義する際にあまり広くならないでください。
  
    ターゲティングのトピックでは、顧客グループの説明からセグメント（またはセグメント）のみをターゲットにし、他のセグメントをターゲットにしないでください（これを念頭に置いてくださいが、完了時にこれをそのまま言及しないでください）。これらの特定のセグメントを選択する理由を指定してください。
  
    ポジショニングのトピックでは、ターゲティングのトピックでターゲットにしたセグメントに最も魅力的になるようにビジネスをどのように位置付けるかを説明してください。ポジショニングは、ターゲティングのトピックで言及されたターゲットセグメントの収入レベルを反映する必要があることを念頭に置いてください。
  
    ビジネスの所有者であるかのように「私」ではなく「私たち」を使用してこれを書いてください。
    これらの重要なトピックをh5タグで囲んでHTMLで応答を生成してください:${mark2TopicJA}。
    完了を"<h4>STP</h4>"で始め、続けて"<h5>セグメンテーション</h5>"としてください。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にしてください。* *を使用せず、代わりに<em>タグを使用して斜体にしてください。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
  すべてを日本語で生成してください。
  これは重要です: 回答に非常に洞察力を持ってください
    これはあなたが考えた長く、詳細で、完全な${mark2TopicJA}です:
    `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${mark2TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يوجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: سيوظف العميل ${NEmployee} موظف.
    تفاصيل العمل 5: الإيرادات المتوقعة للسنة الأولى هي ${firstYearRevenue}.
    تفاصيل العمل 6: قناة توزيع العميل هي ${salesChannel}.
    تفاصيل العمل 7: الحالة التشغيلية لعمل العميل هي ${businessOperationalStatus}.
  
    وصف مجموعة العملاء:
    ${customerDescriptionPrompt}
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
  
    لا تكرر تفاصيل العمل. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    
    لتوليد ${mark2TopicAR}. في موضوع التقسيم، يجب أن يكون هناك العديد من شرائح العملاء. قم بتضمين جميع الشرائح في وصف مجموعة العملاء (ضع هذا في الاعتبار ولكن لا تذكره حرفياً في الإكمال). يجب أن تمثل كل شريحة شخصية عميل. يجب أن تكون كل شريحة مختلفة عن الأخرى. صف احتياجات العملاء لكل شريحة. يجب أن تكون لكل شريحة احتياجات عملاء مختلفة. صف الديموغرافيا لكل شريحة. صف سلوك الشراء لكل شريحة. استخدم علامة <li> لكل شريحة. إذا كان هناك 3 شرائح فقط من تفاصيل العملاء، فأضف شريحتين إضافيتين.
    لا تكن واسعًا جدًا عند تعريف شريحة.
  
    في موضوع الاستهداف، يجب أن تستهدف فقط الشرائح (أو الشريحة) من وصف مجموعة العملاء ولا تستهدف أي شرائح أخرى (ضع هذا في الاعتبار ولكن لا تذكره حرفياً في الإكمال). حدد سبب اختيارك لاستهداف هذه الشريحة المحددة.
  
    في موضوع التموضع، صف كيف ستضع العمل ليكون الأكثر جاذبية للشرائح التي استهدفتها في موضوع الاستهداف. ضع في اعتبارك أن التموضع يجب أن يعكس مستوى دخل الشرائح المستهدفة المذكورة في موضوع الاستهداف.
  
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" لا تستخدم "أنا".
    قم بإنشاء الاستجابة في HTML محاطًا بهذه المواضيع الرئيسية:${mark2TopicAR} بعلامات h5.
    ابدأ الإكمال بـ "<h4>STP</h4>" متبوعًا بـ "<h5>التقسيم</h5>".
    استخدم علامات HTML فقط ولا تستخدم التنسيق. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
  قم بإنشاء كل شيء باللغة العربية.
  هذا مهم: كن ثاقب الرأي في ردك
    هذا هو ${mark2TopicAR} الطويل والمفصل والشامل الذي توصلت إليه:
    `,
    sv: `Du är en professionell konsult, och en klient närmar sig dig för att skriva en lång och detaljerad ${mark2TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Klientens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är ${businessType}.
    affärsdetalj 3: Här är företagets kunder: ${location}.
    affärsdetalj 4: Klienten kommer att anställa ${NEmployee} anställda.
    affärsdetalj 5: Den förväntade intäkten för det första året är ${firstYearRevenue}.
    affärsdetalj 6: Klientens distributionskanal är ${salesChannel}.
    affärsdetalj 7: Klientens affärsoperativa status är ${businessOperationalStatus}.
  
    beskrivning av kundgruppen:
    ${customerDescriptionPrompt}
  
    Detta är detaljerna om klientens produkter eller tjänster:
    ${productInfoPrompt}
  
    Upprepa inte affärsdetaljerna. Inkludera inte andra ämnen om de inte specificeras här.
    
    för att generera ${mark2TopicSV}. I segmenteringstemat bör det finnas många kundsegment. inkludera alla segment i kundgruppsbeskrivningen (tänk på detta men nämn inte detta ordagrant i slutförandet). Varje segment ska representera en kundpersona. Varje segment ska vara olika från varandra. beskriv kundens behov för varje segment. Varje segment ska ha olika kundbehov. beskriv demografin för varje segment. beskriv köpbeteendet för varje segment. använd <li>-taggen för varje segment. Om det bara finns 3 segment från kunddetaljerna, lägg till 2 ytterligare segment.
    Var inte för bred när du definierar ett segment.
  
    I inriktningstemat måste du bara rikta in dig på segmenten (eller segmentet) från kundgruppsbeskrivningen och INGA ANDRA segment (tänk på detta men nämn inte detta ordagrant i slutförandet). Specificera varför du väljer att rikta in dig på dessa specifika segment.
  
    I positioneringstemat beskriver du hur du skulle positionera företaget för att vara mest attraktivt för de segment du har riktat in dig på i inriktningstemat. Tänk på att din positionering ska återspegla inkomstnivån för dina målsegment som nämns i inriktningstemat.
  
    Skriv detta som om du är ägaren av företaget, använd "vi" och inte "jag".
    Generera svar i HTML och omge dessa nyckelteman:${mark2TopicSV} med h5-taggar.
    Börja slutförandet med "<h4>STP</h4>" följt av "<h5>Segmentering</h5>".
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
  generera allt på svenska
  Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och omfattande ${mark2TopicSV} du kom på:
    `,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mark2TopicFI} liiketoimintasuunnitelmaa varten.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Yrityksen tyyppi on ${businessType}.
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Asiakas työllistää ${NEmployee} työntekijää.
    liiketoiminnan tieto 5: Ensimmäisen vuoden odotettu liikevaihto on ${firstYearRevenue}.
    liiketoiminnan tieto 6: Asiakkaan jakelukanava on ${salesChannel}.
    liiketoiminnan tieto 7: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
  
    asiakasryhmän kuvaus:
    ${customerDescriptionPrompt}
  
    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
  
    Älä toista liiketoiminnan tietoja. Älä sisällytä muita aiheita, ellei niitä ole määritelty täällä.
    
    luodaksesi ${mark2TopicFI}. Segmentointiaiheessa tulisi olla monia asiakassegmenttejä. sisällytä kaikki segmentit asiakasryhmän kuvaukseen (pidä tämä mielessä, mutta älä mainitse tätä sanasta sanaan täytössä). Jokaisen segmentin tulisi edustaa asiakaspersoonaa. Jokaisen segmentin tulisi olla erilainen kuin muut. kuvaile kunkin segmentin asiakastarpeet. Jokaisella segmentillä tulisi olla erilaiset asiakastarpeet. kuvaile kunkin segmentin demografia. kuvaile kunkin segmentin ostokäyttäytyminen. käytä <li>-tagia kullekin segmentille. Jos asiakastiedoista on vain 3 segmenttiä, lisää 2 lisäsegmenttiä.
    Älä ole liian laaja määritellessäsi segmenttiä.
  
    Kohdistusaiheessa sinun on kohdistettava vain asiakasryhmän kuvauksen segmentit (tai segmentti) eikä MITÄÄN MUITA segmenttejä (pidä tämä mielessä, mutta älä mainitse tätä sanasta sanaan täytössä). Määritä syy, miksi valitset kohdistaa nämä tietyt segmentit.
  
    Sijoitteluaiheessa kuvaile, kuinka sijoittaisit yrityksen houkuttelevimmaksi niille segmenteille, joihin olet kohdistunut kohdistusaiheessa. Pidä mielessä, että sijoittelusi tulisi heijastaa kohdesegmenttiesi tulotasoa, joka mainitaan kohdistusaiheessa.
  
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käyttäen "me" älä käytä "minä".
    Luo vastaus HTML-muodossa ympäröimällä nämä avainaiheet h5-tageilla:${mark2TopicFI}.
    Aloita täyttö "<h4>STP</h4>" ja jatka "<h5>Segmentointi</h5>".
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
  luo kaikki suomeksi
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja kattava ${mark2TopicFI}, jonka keksit:
    `,
    da: `Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en lang og detaljeret ${mark2TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedens type er ${businessType}.
    forretningsdetalje 3: Her er virksomhedens kunder: ${location}.
    forretningsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere.
    forretningsdetalje 5: Den forventede omsætning i det første år er ${firstYearRevenue}.
    forretningsdetalje 6: Klientens distributionskanal er ${salesChannel}.
    forretningsdetalje 7: Klientens forretningsoperationelle status er ${businessOperationalStatus}.
  
    beskrivelse af kundegruppen:
    ${customerDescriptionPrompt}
  
    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
  
    Gentag ikke forretningsdetaljerne. Inkluder ikke andre emner, medmindre de er specificeret her.
    
    for at generere ${mark2TopicDA}. I segmenteringsemnet skal der være mange kundesegmenter. inkluder alle segmenter i kundegruppebeskrivelsen (husk dette, men nævn det ikke ordret i færdiggørelsen). Hvert segment skal repræsentere en kundepersona. Hvert segment skal være forskelligt fra hinanden. beskriv kundens behov for hvert segment. Hvert segment skal have forskellige kundebehov. beskriv demografien for hvert segment. beskriv købsadfærd for hvert segment. brug <li>-tag for hvert segment. Hvis der kun er 3 segmenter fra kundedetaljerne, skal du tilføje 2 ekstra segmenter.
    Vær ikke for bred, når du definerer et segment.
  
    I målretningsemnet skal du kun målrette mod segmenterne (eller segmentet) fra kundegruppebeskrivelsen og INGEN ANDRE segmenter (husk dette, men nævn det ikke ordret i færdiggørelsen). Angiv årsagen til, at du vælger at gå efter disse specifikke segmenter.
  
    I positioneringsemnet skal du beskrive, hvordan du vil positionere virksomheden til at være mest attraktiv for de segmenter, du har målrettet i målretningsemnet. Husk, at din positionering skal afspejle indkomstniveauet for dine målsegmenter nævnt i målretningsemnet.
  
    Skriv dette, som om du er ejeren af virksomheden, ved at bruge "vi" og ikke "jeg".
    Generer svar i HTML og omgiver disse nøgleemner:${mark2TopicDA} med h5-tags.
    Begynd færdiggørelsen med "<h4>STP</h4>" efterfulgt af "<h5>Segmentering</h5>".
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag for fed skrift. Brug ikke * *, brug i stedet <em>-tag for kursiv. Brug ikke * for punktlister, brug i stedet <li>-tag.
  generer alt på dansk
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og omfattende ${mark2TopicDA} du kom op med:
    `,
    no: `Du er en profesjonell konsulent, og en klient henvender seg til deg for å skrive en lang og detaljert ${mark2TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Klientens forretningsnavn er ${businessName}.
    forretningsdetalj 2: Forretningstypen er ${businessType}. 
    forretningsdetalj 3: Dette er hvor forretningens kunder er: ${location}.
    forretningsdetalj 4: Klienten vil ansette ${NEmployee} ansatte.
    forretningsdetalj 5: Forventet første års inntekt er ${firstYearRevenue}.
    forretningsdetalj 6: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 7: Klientens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    beskrivelse av kundegruppen:
    ${customerDescriptionPrompt}
  
    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
  
    Ikke gjenta forretningsdetaljene. Ikke inkluder andre emner med mindre de er spesifisert her.
    
    for å generere ${mark2TopicNO}. I segmenteringsemnet skal det være mange kundesegmenter. inkluder alle segmenter i kundegruppebeskrivelsen (husk dette, men ikke nevn det ordrett i ferdigstillelsen). Hvert segment skal representere en kundepersona. Hvert segment skal være forskjellig fra hverandre. beskriv kundens behov for hvert segment. Hvert segment skal ha forskjellige kundebehov. beskriv demografien for hvert segment. beskriv kjøpsatferd for hvert segment. bruk <li>-tag for hvert segment. Hvis det bare er 3 segmenter fra kundedetaljene, legg til 2 ekstra segmenter.
    Ikke vær for bred når du definerer et segment.
  
    I målrettingsemnet må du bare målrette segmentene (eller segmentet) fra kundegruppebeskrivelsen og INGEN ANDRE segmenter (husk dette, men ikke nevn det ordrett i ferdigstillelsen). Spesifiser grunnen til at du velger å gå etter disse spesifikke segmentene.
  
    I posisjoneringsemnet beskriv hvordan du vil posisjonere virksomheten for å være mest attraktiv for segmentene du har målrettet i målrettingsemnet. Husk at din posisjonering skal reflektere inntektsnivået for dine målsegmenter nevnt i målrettingsemnet.
  
    Skriv dette som om du er eieren av virksomheten, ved å bruke "vi" og ikke "jeg".
    Generer svar i HTML og omgi disse nøkkeltemaene:${mark2TopicNO} med h5-tagger. 
    Begynn ferdigstillelsen med "<h4>STP</h4>" etterfulgt av "<h5>Segmentering</h5>"
    bruk bare HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-tag for fet skrift. Ikke bruk * *, bruk i stedet <em>-tag for kursiv. Ikke bruk * for punktlister, bruk i stedet <li>-tag.
  generer alt på norsk
  Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og omfattende ${mark2TopicNO} du kom opp med:
    `,
  };

  const model =
    variantID === '2' ? AI_MODEL.GPT_4O_MINI : AI_MODEL.GPT_3_5_TURBO;
  console.log('model:', model);
  const payload = {
    model: modelName ? modelName : model,
    messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };
  return OpenAIStream(payload);
};
