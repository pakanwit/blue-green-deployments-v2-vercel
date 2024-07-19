import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface ISegmentationPro {
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

  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
  planQuota: number;
}
export const segmentationPro = (req: ISegmentationPro) => {
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
    planQuota,
  } = req;

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

  const promptTopic = {
    en: 'Segementation, Targeting, Positioning',
    de: 'Segmentierung, Zielgruppenansprache, Positionierung',
    fr: 'Segmentation, Ciblage, Positionnement',
    es: 'Segmentación, Targeting, Posicionamiento',
    it: 'Segmentazione, Targeting, Posizionamento',
    nl: 'Segmentatie, Targeting, Positionering',
    ja: 'セグメンテーション、ターゲティング、ポジショニング',
    ar: 'التفريع والتوجيه والتموضع',
    sv: 'Segmentering, Målgrupp, Positionering',
    fi: 'Segmentointi, Kohderyhmä, Asemointi',
    da: 'Segmentering, Målgruppe, Positionering',
    no: 'Segmentering, Målgruppe, Positionering',
  };

  const prompt = {
    'en-uk': `
    You are a professional consultant, and a client approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The expected first year revenue is ${firstYearRevenue}.
    business detail 6: The client's distribution channel is ${salesChannel}.
    business detail 7: The client's business operational status is ${businessOperationalStatus}.

    customer group details:
    ${customerPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    Do not repeat the business details. Don't include other topics unless specified here.
    
    to generate ${promptTopic.en}. In the Segmentation topic, there should be many segments of customer. include segments from customer detail 1, customer detail 2 and customer detail 3 (keep this in mind but don't mention this verbatim in completion). Each segment should represent a customer persona. Each segment should be different from each other. describe the customer needs for each segment. Each segment should have different customer needs. describe demographics for each segment. describe purchasing behavior for each segment. use <li> tag for each segment. If there are only 3 segment from customer details, add 2 more segments.
    Don't be too broad when defining a segment.

    In the Targeting topic, you must target the segment from customer detail 1, customer detail 2, and customer detail 3 (keep this in mind but don't mention this verbatim in completion). Specify the reason why you choose to go after these specific segment.

    In the positioning topic describe how you would position the business to be most attractive to the segments you have targeted in the Targeting topic. Keep in mind that your positioning should reflect the income level of your targeted segments mention in the Targeting topic.

    Write this as if you are the owner of the businsess, using "we" don't use "I".
    Generate response in html surround these key topics:${promptTopic.en} with h5 tags. 
    Begin the completion with "<h4>STP</h4>" followed by "<h5>Segmentation</h5>
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `
    You are a professional consultant, and a client approaches you to write a long and detailed ${promptTopic.en} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The expected first year revenue is ${firstYearRevenue}.
    business detail 6: The client's distribution channel is ${salesChannel}.
    business detail 7: The client's business operational status is ${businessOperationalStatus}.

    customer group details:
    ${customerPrompt}

    These are details of the client's products or services:
    ${productInfoPrompt}

    Do not repeat the business details. Don't include other topics unless specified here.
    
    to generate ${promptTopic.en}. In the Segmentation topic, there should be many segments of customer. include segments from customer detail 1, customer detail 2 and customer detail 3 (keep this in mind but don't mention this verbatim in completion). Each segment should represent a customer persona. Each segment should be different from each other. describe the customer needs for each segment. Each segment should have different customer needs. describe demographics for each segment. describe purchasing behavior for each segment. use <li> tag for each segment. If there are only 3 segment from customer details, add 2 more segments.
    Don't be too broad when defining a segment.

    In the Targeting topic, you must target the segment from customer detail 1, customer detail 2, and customer detail 3 (keep this in mind but don't mention this verbatim in completion). Specify the reason why you choose to go after these specific segment.

    In the positioning topic describe how you would position the business to be most attractive to the segments you have targeted in the Targeting topic. Keep in mind that your positioning should reflect the income level of your targeted segments mention in the Targeting topic.

    Write this as if you are the owner of the businsess, using "we" don't use "I".
    Generate response in html surround these key topics:${promptTopic.en} with h5 tags. 
    Begin the completion with "<h4>STP</h4>" followed by "<h5>Segmentation</h5>
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang---------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Kunde wird ${NEmployee}-Mitarbeiter beschäftigen.
    Geschäftsdetail 5: Der erwartete Umsatz im ersten Jahr beträgt ${firstYearRevenue}.
    Geschäftsdetail 6: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 7: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
    
    Angaben zur Kundengruppe:
    ${customerPrompt}

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Wiederholen Sie die Geschäftsdetails nicht. Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
  
    um ${promptTopic.de} zu generieren. Im Segmentierungsthema sollte es viele Kundensegmente geben. Fügen Sie Segmente aus Kundendetail 1, Kundendetail 2 und Kundendetail 3 hinzu (behalten Sie dies im Hinterkopf, erwähnen Sie dies jedoch nicht wörtlich in der Vervollständigung). Jedes Segment sollte eine Kundenpersönlichkeit darstellen. Jedes Segment sollte sich voneinander unterscheiden. Beschreiben Sie die Kundenbedürfnisse für jedes Segment. Jedes Segment sollte unterschiedliche Kundenbedürfnisse haben. Beschreiben Sie die demografischen Merkmale für jedes Segment. Beschreiben Sie das Kaufverhalten für jedes Segment. Verwenden Sie für jedes Segment das Tag <li>. Wenn die Kundendaten nur drei Segmente enthalten, fügen Sie zwei weitere Segmente hinzu.
    Seien Sie bei der Definition eines Segments nicht zu weit gefasst.

    Im Thema „Targeting“ müssen Sie das Segment aus „Kundendetail 1“, „Kundendetail 2“ und „Kundendetail 3“ gezielt ansprechen (bedenken Sie dies, erwähnen Sie es jedoch nicht wörtlich in der Vervollständigung). Geben Sie den Grund an, warum Sie sich für dieses bestimmte Segment entscheiden.

    Beschreiben Sie im Thema „Positionierung“, wie Sie das Unternehmen so positionieren würden, dass es für die Segmente, die Sie im Thema „Targeting“ anvisiert haben, am attraktivsten ist. Bedenken Sie, dass Ihre Positionierung das Einkommensniveau Ihrer Zielsegmente widerspiegeln sollte, die im Thema „Targeting“ erwähnt werden.

    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Generieren Sie eine Antwort in HTML, umgeben Sie diese Schlüsselthemen: ${promptTopic.de} mit h5-Tags.
    Beginnen Sie die Vervollständigung mit „<h4>STP</h4>“, gefolgt von „<h5>Segmentierung</h5>“.
    Fertigstellung auf Deutsch generieren.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,
    //french lang---------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client s'approche de vous pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

  détails de l'entreprise:
  détail 1: Le nom de l'entreprise du client est ${businessName}.
  détail 2: Le type d'entreprise est ${businessType}.
  détail 3: Voici où se trouvent les clients de l'entreprise : ${location}.
  détail 4: Le client emploiera ${NEmployee} employés.
  détail 5: Le chiffre d'affaires prévu pour la première année est de ${firstYearRevenue}.
  détail 6: Le canal de distribution du client est ${salesChannel}.
  détail 7: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  détails sur le groupe de clients :
  ${customerPrompt}

  Voici les détails des produits ou services du client :
  ${productInfoPrompt}

  Ne répétez pas les détails de l'entreprise. N'incluez pas d'autres sujets à moins qu'ils ne soient spécifiés ici.

  pour générer ${promptTopic.fr}. Dans le sujet de la Segmentation, il devrait y avoir de nombreux segments de clients. incluez les segments des détails client 1, détails client 2 et détails client 3 (gardez cela à l'esprit mais ne mentionnez pas cela textuellement dans la réalisation). Chaque segment devrait représenter un persona client. Chaque segment doit être différent des autres. décrivez les besoins des clients pour chaque segment. Chaque segment devrait avoir différents besoins des clients. décrivez les données démographiques pour chaque segment. décrivez le comportement d'achat pour chaque segment. utilisez le tag <li> pour chaque segment. S'il n'y a que 3 segments dans les détails du client, ajoutez 2 segments supplémentaires.
  Ne soyez pas trop général lors de la définition d'un segment.

  Dans le sujet du Ciblage, vous devez cibler le segment des détails client 1, détails client 2, et détails client 3 (gardez cela à l'esprit mais ne mentionnez pas cela textuellement dans la réalisation). Spécifiez la raison pour laquelle vous choisissez de poursuivre ce segment spécifique.

  Dans le sujet du Positionnement, décrivez comment vous positionneriez l'entreprise pour être la plus attractive pour les segments que vous avez ciblés dans le sujet du Ciblage. Gardez à l'esprit que votre positionnement doit refléter le niveau de revenu de vos segments ciblés mentionnés dans le sujet du Ciblage.

  Écrivez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  Générez une réponse en html, entourez ces sujets clés: ${promptTopic.fr} avec des balises h5.
  Commencez la réalisation avec "<h4>STP</h4>" suivi de "<h5>Segmentation</h5>
  Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang---------------------------------------------------------
    es: `
    Eres un consultor profesional y un cliente se acerca a ti para que redactes un ${promptTopic.es} largo y detallado para un plan de negocio.

  Detalles del negocio:

  Detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
  Detalle del negocio 2: El tipo de negocio es ${businessType}.
  Detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
  Detalle del negocio 4: El cliente empleará a ${NEmployee} empleados.
  Detalle del negocio 5: Los ingresos esperados para el primer año son ${firstYearRevenue}.
  Detalle del negocio 6: El canal de distribución del cliente es ${salesChannel}.
  Detalle del negocio 7: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  Detalles del grupo de clientes:
  ${customerPrompt}

  Estos son detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

No repitas los detalles del negocio. No incluyas otros temas a menos que se especifiquen aquí.

  Para generar el ${promptTopic.es}. En el tema de Segmentación, debería haber varios segmentos de clientes. Incluye segmentos de los detalles del cliente 1, detalles del cliente 2 y detalles del cliente 3 (ten esto en cuenta pero no lo menciones textualmente en la respuesta). Cada segmento debe representar un perfil de cliente diferente. Cada segmento debe ser distinto a los demás. Describe las necesidades de cada segmento. Cada segmento debe tener necesidades distintas. Describe la demografía de cada segmento. Describe el comportamiento de compra de cada segmento. Utiliza la etiqueta <li> para cada segmento. Si solo hay 3 segmentos en los detalles del cliente, añade 2 segmentos más.
  No seas demasiado genérico al definir un segmento.

  En el tema de Orientación, debes dirigirte al segmento de los detalles del cliente 1, detalles del cliente 2 y detalles del cliente 3 (tenlo en cuenta pero no lo menciones textualmente en la respuesta). Especifica la razón por la que eliges enfocarte en estos segmentos específicos.

  En el tema de Posicionamiento, describe cómo posicionarías el negocio para ser más atractivo para los segmentos que has orientado en el tema de Orientación. Ten en cuenta que tu posicionamiento debe reflejar el nivel de ingresos de tus segmentos objetivo mencionados en el tema de Orientación.

  Escribe esto como si fueras el propietario del negocio, usando "nosotros" en lugar de "yo".
  Genera la respuesta en HTML y rodea estos temas clave, ${promptTopic.es}, con etiquetas h5.
  Empieza la respuesta con "<h4>STP</h4>" seguido de "<h5>Segmentación</h5>"
  Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
  Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang---------------------------------------------------------
    it: `
    Siete un consulente professionista e un cliente vi si avvicina per scrivere un ${promptTopic.it} lungo e dettagliato per un piano di affari.

  Dettagli aziendali:

  Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  Dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
  Dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
  Dettaglio aziendale 5: Il fatturato previsto per il primo anno è ${firstYearRevenue}.
  Dettaglio aziendale 6: Il canale di distribuzione del cliente è ${salesChannel}.
  Dettaglio aziendale 7: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  Dettagli del gruppo di clienti:
  ${customerPrompt}

  Questi sono i dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Non ripetere i dettagli aziendali. Non includere altri argomenti a meno che non siano specificati qui.

  Per generare ${promptTopic.it}. Nell'argomento Segmentazione, dovrebbero esserci molti segmenti di clienti. Include segmenti dai dettagli cliente 1, dettagli cliente 2 e dettagli cliente 3 (tienilo a mente ma non menzionarlo testualmente nella risposta). Ogni segmento dovrebbe rappresentare una persona cliente diversa. Ogni segmento dovrebbe essere diverso dagli altri. Descrivi le necessità di ciascun segmento. Ogni segmento dovrebbe avere esigenze diverse. Descrivi la demografia di ciascun segmento. Descrivi il comportamento di acquisto di ogni segmento. Utilizza il tag <li> per ogni segmento. Se ci sono solo 3 segmenti nei dettagli del cliente, aggiungi altri 2 segmenti.
  Non essere troppo generico nella definizione di un segmento.

  Nell'argomento Targeting, devi rivolgerti ai segmenti dei dettagli cliente 1, dettagli cliente 2 e dettagli cliente 3 (tienilo a mente ma non menzionarlo testualmente nella risposta). Specifica il motivo per cui scegli di puntare su questi segmenti specifici.

  Nell'argomento Posizionamento, descrivi come posizioneresti l'azienda per essere più attraente per i segmenti che hai individuato nel tema del Targeting. Tieni presente che il tuo posizionamento dovrebbe riflettere il livello di reddito dei tuoi segmenti di mercato menzionati nel tema del Targeting.

  Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
  Genera la risposta in HTML circondando questi argomenti chiave, ${promptTopic.it}, con tag h5.
  Inizia la risposta con "<h4>STP</h4>" seguito da "<h5>Segmentazione</h5>"
  Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
  Genera tutto in italiano.
  Questo è importante: Sii molto perspicace nella tua risposta.
  Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    //dutch lang---------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst hebben.
    bedrijfsdetail 5: De verwachte omzet voor het eerste jaar is ${firstYearRevenue}.
    bedrijfsdetail 6: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 7: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    klantgroep details:
    ${customerPrompt}

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    Herhaal de bedrijfsdetails niet. Neem geen andere onderwerpen op tenzij hier gespecificeerd.
    
    om ${promptTopic.nl} te genereren. In het onderwerp Segmentatie moeten er veel klantsegmenten zijn. neem segmenten op van klantdetail 1, klantdetail 2 en klantdetail 3 (houd dit in gedachten maar vermeld dit niet letterlijk in de voltooiing). Elk segment moet een klantpersona vertegenwoordigen. Elk segment moet anders zijn dan de andere. beschrijf de klantbehoeften voor elk segment. Elk segment moet verschillende klantbehoeften hebben. beschrijf de demografie voor elk segment. beschrijf het aankoopgedrag voor elk segment. gebruik de <li> tag voor elk segment. Als er slechts 3 segmenten zijn van klantdetails, voeg dan 2 extra segmenten toe.
    Wees niet te breed bij het definiëren van een segment.

    In het onderwerp Targeting moet u het segment targeten van klantdetail 1, klantdetail 2 en klantdetail 3 (houd dit in gedachten maar vermeld dit niet letterlijk in de voltooiing). Geef de reden aan waarom u ervoor kiest om deze specifieke segmenten te targeten.

    In het onderwerp Positionering beschrijft u hoe u het bedrijf zou positioneren om het meest aantrekkelijk te zijn voor de segmenten die u heeft getarget in het onderwerp Targeting. Houd er rekening mee dat uw positionering het inkomensniveau van uw getargete segmenten moet weerspiegelen die in het onderwerp Targeting worden genoemd.

    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Genereer de reactie in html en omring deze sleutelonderwerpen:${promptTopic.nl} met h5-tags. 
    Begin de voltooiing met "<h4>STP</h4>" gevolgd door "<h5>Segmentatie</h5>
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
Genereer alles in het Nederlands.
Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang---------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、クライアントがビジネスプランのための長く詳細な${promptTopic.ja}を書くように依頼してきました。

    ビジネスの詳細:
    ビジネス詳細1: クライアントのビジネス名は${businessName}です。
    ビジネス詳細2: ビジネスのタイプは${businessType}です。
    ビジネス詳細3: ここがビジネスの顧客がいる場所です: ${location}。
    ビジネス詳細4: クライアントは${NEmployee}人の従業員を雇う予定です。
    ビジネス詳細5: 初年度の予想売上は${firstYearRevenue}です。
    ビジネス詳細6: クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細7: クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    顧客グループの詳細:
    ${customerPrompt}

    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}

    ビジネスの詳細を繰り返さないでください。ここで指定されていない他のトピックを含めないでください。
    
    ${promptTopic.ja}を生成するために。セグメンテーションのトピックでは、顧客の多くのセグメントがあるべきです。顧客詳細1、顧客詳細2、顧客詳細3からのセグメントを含めます（これを心に留めておきますが、完成品ではこれを逐語的に言及しないでください）。各セグメントは顧客のパーソナを表すべきです。各セグメントは互いに異なるべきです。各セグメントの顧客のニーズを説明します。各セグメントは異なる顧客のニーズを持つべきです。各セグメントの人口統計を説明します。各セグメントの購買行動を説明します。各セグメントに<li>タグを使用します。顧客の詳細からのセグメントが3つしかない場合は、2つの追加のセグメントを追加します。
    セグメントを定義するときに広すぎないでください。

    ターゲティングのトピックでは、顧客詳細1、顧客詳細2、顧客詳細3からのセグメントをターゲットにする必要があります（これを心に留めておきますが、完成品ではこれを逐語的に言及しないでください）。これらの特定のセグメントを追求する理由を指定します。

    ポジショニングのトピックでは、ターゲティングのトピックでターゲットにしたセグメントに対してビジネスを最も魅力的に位置づける方法を説明します。あなたのポジショニングは、ターゲティングのトピックで言及されたあなたのターゲットセグメントの収入レベルを反映するべきであることを念頭に置いてください。

    これをビジネスのオーナーであるかのように書きます、"私たちは"を使用し、"私"は使用しません。
    HTMLでレスポンスを生成し、これらのキートピック:${promptTopic.ja}をh5タグで囲みます。
    完成品を"<h4>STP</h4>"で始め、次に"<h5>セグメンテーション</h5>を続けます。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang---------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: سيوظف العميل ${NEmployee} موظف.
    تفاصيل العمل 5: الإيرادات المتوقعة في السنة الأولى هي ${firstYearRevenue}.
    تفاصيل العمل 6: قناة التوزيع للعميل هي ${salesChannel}.
    تفاصيل العمل 7: حالة العمل التشغيلية للعمل هي ${businessOperationalStatus}.

    تفاصيل مجموعة العملاء:
    ${customerPrompt}

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    لا تكرر تفاصيل العمل. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    
    لإنشاء ${promptTopic.ar}. في موضوع التفريع، يجب أن يكون هناك العديد من شرائح العملاء. تتضمن شرائح من تفاصيل العميل 1، تفاصيل العميل 2 وتفاصيل العميل 3 (ضع هذا في اعتبارك ولكن لا تذكر هذا حرفيا في الإكمال). يجب أن تمثل كل شريحة شخصية العميل. يجب أن تكون كل شريحة مختلفة عن الأخرى. اصف احتياجات العملاء لكل شريحة. يجب أن تكون لكل شريحة احتياجات عملاء مختلفة. اصف الديموغرافيا لكل شريحة. اصف سلوك الشراء لكل شريحة. استخدم علامة <li> لكل شريحة. إذا كانت هناك فقط 3 شرائح من تفاصيل العميل، أضف شريحتين إضافيتين.
    لا تكن واسعًا جدًا عند تحديد شريحة.

    في موضوع التوجيه، يجب أن تستهدف الشريحة من تفاصيل العميل 1، تفاصيل العميل 2، وتفاصيل العميل 3 (ضع هذا في اعتبارك ولكن لا تذكر هذا حرفيا في الإكمال). حدد السبب الذي يجعلك تختار الذهاب بعد هذه الشريحة المحددة.

    في موضوع التموضع اصف كيف ستوضع العمل ليكون الأكثر جاذبية للشرائح التي استهدفتها في موضوع التوجيه. ضع في اعتبارك أن تموضعك يجب أن يعكس مستوى الدخل للشرائح المستهدفة التي تم ذكرها في موضوع التوجيه.

    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    أنشئ الرد في html وحيط هذه المواضيع الرئيسية:${promptTopic.ar} بوسم h5. 
    ابدأ الإكمال بـ "<h4>STP</h4>" تليها "<h5>التفريع</h5>
    استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang---------------------------------------------------------
    sv: `
    Du är en professionell konsult och en klient närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}.
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda.
    affärsdetalj 5: Den förväntade intäkten första året är ${firstYearRevenue}.
    affärsdetalj 6: Kundens distributionskanal är ${salesChannel}.
    affärsdetalj 7: Kundens företags operativa status är ${businessOperationalStatus}.

    kundgruppsdetaljer:
    ${customerPrompt}

    Detta är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    Upprepa inte affärsdetaljerna. Inkludera inte andra ämnen om det inte specificeras här.
    
    för att generera ${promptTopic.sv}. I segmenteringstemat bör det finnas många kundsegment. inkludera segment från kunddetalj 1, kunddetalj 2 och kunddetalj 3 (ha detta i åtanke men nämn inte detta ordagrant i slutförandet). Varje segment bör representera en kundpersona. Varje segment bör skilja sig från varandra. beskriv kundbehoven för varje segment. Varje segment bör ha olika kundbehov. beskriv demografin för varje segment. beskriv köpbeteendet för varje segment. använd <li> tagg för varje segment. Om det bara finns 3 segment från kunddetaljer, lägg till 2 fler segment.
    Var inte för bred när du definierar ett segment.

    I målgruppstemat måste du rikta in dig på segmentet från kunddetalj 1, kunddetalj 2 och kunddetalj 3 (ha detta i åtanke men nämn inte detta ordagrant i slutförandet). Specificera anledningen till varför du väljer att gå efter detta specifika segment.

    I positioneringstemat beskriv hur du skulle positionera företaget för att vara mest attraktivt för de segment du har riktat in dig på i målgruppstemat. Kom ihåg att din positionering bör reflektera inkomstnivån för dina riktade segment nämnda i målgruppstemat.

    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Generera svar i html omge dessa nyckelämnen:${promptTopic.sv} med h5-taggar.
    Börja slutförandet med "<h4>STP</h4>" följt av "<h5>Segmentering</h5>
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang---------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Liiketoiminnan tyyppi on ${businessType}.
    liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakas palkkaa ${NEmployee} työntekijää.
    liiketoiminnan yksityiskohta 5: Ensimmäisen vuoden odotettu liikevaihto on ${firstYearRevenue}.
    liiketoiminnan yksityiskohta 6: Asiakkaan jakelukanava on ${salesChannel}.
    liiketoiminnan yksityiskohta 7: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    asiakasryhmän tiedot:
    ${customerPrompt}

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Älä toista liiketoiminnan tietoja. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
    
    generoidaksesi ${promptTopic.fi}. Segmentointi-aiheessa tulisi olla monia asiakassegmenttejä. sisällytä segmentit asiakkaan yksityiskohdasta 1, asiakkaan yksityiskohdasta 2 ja asiakkaan yksityiskohdasta 3 (pidä tämä mielessä, mutta älä mainitse tätä sanatarkasti täydennyksessä). Jokaisen segmentin tulisi edustaa asiakaspersoonaa. Jokaisen segmentin tulisi olla erilainen toisistaan. kuvaile asiakkaan tarpeita jokaiselle segmentille. Jokaisella segmentillä tulisi olla erilaiset asiakastarpeet. kuvaile demografiaa jokaiselle segmentille. kuvaile ostokäyttäytymistä jokaiselle segmentille. käytä <li> tagia jokaiselle segmentille. Jos asiakkaan tiedoista on vain 3 segmenttiä, lisää 2 lisäsegmenttiä.
    Älä ole liian laaja määritellessäsi segmenttiä.

    Kohderyhmä-aiheessa sinun on kohdennettava segmentti asiakkaan yksityiskohdasta 1, asiakkaan yksityiskohdasta 2 ja asiakkaan yksityiskohdasta 3 (pidä tämä mielessä, mutta älä mainitse tätä sanatarkasti täydennyksessä). Määritä syy, miksi valitset nämä erityiset segmentit.

    Asemointi-aiheessa kuvaile, kuinka asemoisit yrityksen ollaksesi houkuttelevin kohdennetuille segmenteille Kohderyhmä-aiheessa. Muista, että asemointisi tulisi heijastaa kohdennettujen segmenttien tuloja Kohderyhmä-aiheessa.

    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Generoi vastaus html:ssä, ympäröi nämä avainaiheet:${promptTopic.fi} h5-tageilla.
    Aloita täydennys "<h4>STP</h4>" seuraa "<h5>Segmentointi</h5>
    Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang---------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en klient nærmer dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Klientens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af forretning er ${businessType}.
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere.
    forretningsdetalje 5: Den forventede indtægt i det første år er ${firstYearRevenue}.
    forretningsdetalje 6: Klientens distributionskanal er ${salesChannel}.
    forretningsdetalje 7: Klientens forretnings operationelle status er ${businessOperationalStatus}.

    kundegruppedetaljer:
    ${customerPrompt}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Gentag ikke forretningsdetaljerne. Inkluder ikke andre emner, medmindre det er specificeret her.
    
    for at generere ${promptTopic.da}. I segmenteringsemnet skal der være mange kundesegmenter. inkluder segmenter fra kundedetalje 1, kundedetalje 2 og kundedetalje 3 (hold dette i tankerne, men nævn det ikke ordret i fuldførelsen). Hvert segment skal repræsentere en kundepersona. Hvert segment skal være forskelligt fra hinanden. beskriv kundens behov for hvert segment. Hvert segment skal have forskellige kundebehov. beskriv demografi for hvert segment. beskriv købsadfærd for hvert segment. brug <li> tag for hvert segment. Hvis der kun er 3 segmenter fra kundedetaljerne, tilføj 2 flere segmenter.
    Vær ikke for bred, når du definerer et segment.

    I målgruppeemnet skal du målrette segmentet fra kundedetalje 1, kundedetalje 2 og kundedetalje 3 (hold dette i tankerne, men nævn det ikke ordret i fuldførelsen). Specificer årsagen til, at du vælger at gå efter dette specifikke segment.

    I positioneringsemnet beskriv, hvordan du ville positionere virksomheden for at være mest attraktiv for de segmenter, du har målrettet i målgruppeemnet. Husk, at din positionering skal afspejle indkomstniveauet for dine målrettede segmenter nævnt i målgruppeemnet.

    Skriv dette som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
    Generer svar i html omgiv disse nøgleemner:${promptTopic.da} med h5-tags.
    Begynd fuldførelsen med "<h4>STP</h4>" efterfulgt af "<h5>Segmentering</h5>
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    // norwegian lang---------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en klient nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Klientens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen av forretning er ${businessType}.
    forretningsdetalje 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalje 4: Klienten vil ansette ${NEmployee} ansatte.
    forretningsdetalje 5: Den forventede inntekten i det første året er ${firstYearRevenue}.
    forretningsdetalje 6: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalje 7: Klientens forretnings operasjonelle status er ${businessOperationalStatus}.

    kundegruppedetaljer:
    ${customerPrompt}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}

    Gjenta ikke forretningsdetaljene. Ikke inkluder andre emner, med mindre det er spesifisert her.
    
    for å generere ${promptTopic.no}. I segmenteringsemnet skal det være mange kundesegmenter. inkluder segmenter fra kundedetalje 1, kundedetalje 2 og kundedetalje 3 (hold dette i tankene, men nevn det ikke ordrett i fullførelsen). Hvert segment skal representere en kundepersona. Hvert segment skal være forskjellig fra hverandre. beskriv kundens behov for hvert segment. Hvert segment skal ha forskjellige kundebehov. beskriv demografi for hvert segment. beskriv kjøpsatferd for hvert segment. bruk <li> tag for hvert segment. Hvis det bare er 3 segmenter fra kundedetaljene, legg til 2 flere segmenter.
    Ikke vær for bred når du definerer et segment.

    I målgruppeemnet skal du målrette segmentet fra kundedetalje 1, kundedetalje 2 og kundedetalje 3 (hold dette i tankene, men nevn det ikke ordrett i fullførelsen). Spesifiser grunnen til at du velger å gå etter dette spesifikke segmentet.

    I posisjoneringsemnet beskriv, hvordan du ville posisjonere virksomheten for å være mest attraktiv for de segmentene du har målrettet i målgruppeemnet. Husk at din posisjonering skal reflektere inntektsnivået for dine målrettede segmenter nevnt i målgruppeemnet.

    Skriv dette som om du er eieren av virksomheten, bruk "vi" bruk ikke "jeg".
    Generer svar i html omgiv disse nøkkeltemaene:${promptTopic.no} med h5-tags.
    Begynn fullførelsen med "<h4>STP</h4>" etterfulgt av "<h5>Segmentering</h5>
    Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
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
