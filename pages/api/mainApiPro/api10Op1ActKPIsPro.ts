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
export default async function api10Op1ActKPIsPro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerType,

    customerIncomeORSize1,
    customerIncomeORSize2,
    customerIncomeORSize3,

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
    investmentItem4,
    investmentItem5,
    investmentItem6,
    investmentItem7,
    investmentItem8,
    investmentItem9,
    investmentItem10,

    investmentAmountItem1,
    investmentAmountItem2,
    investmentAmountItem3,
    investmentAmountItem4,
    investmentAmountItem5,
    investmentAmountItem6,
    investmentAmountItem7,
    investmentAmountItem8,
    investmentAmountItem9,
    investmentAmountItem10,

    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    planQuota,
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

  const op1TopicEN = 'Key Activities and KPIs';
  const op1PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

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
    use 600 words to generate ${op1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed, and lengthy ${op1TopicEN} you came up with:
    `;

  //german lang---------------------------------------------------------------------
  const op1TopicDE = 'Schlüsselaktivitäten und KPIs';
  const op1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${op1TopicDE} für einen Geschäftsplan zu verfassen.

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
    Verwenden Sie 600 Wörter, um ${op1TopicDE} zu generieren.
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Beginnen Sie den Abschluss mit „<h3>Betrieb</h3>“, gefolgt von „<h4>Wichtigste Aktivitäten</h4>“.
    Fertigstellung auf Deutsch generieren.
  
    Dies ist das lange, detaillierte und ausführliche ${op1TopicDE}, das Sie sich ausgedacht haben:`;

  //french lang---------------------------------------------------------------------
  const op1TopicFR = 'Activités clés et KPI';
  const op1PromptFR = `
    Vous êtes un consultant professionnel et un client vous sollicite pour rédiger un ${op1TopicFR} long et détaillé pour un plan d'affaires.

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
    utilisez 600 mots pour générer ${op1TopicFR}.
    Rédigez cela comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Commencez la réalisation par "<h3>Opérations</h3>", suivi de "<h4>Activités Clés</h4>"

    Voici le ${op1TopicFR} long, détaillé et approfondi que vous avez élaboré :
    `;

  //spanish lang---------------------------------------------------------------------
  const op1TopicES = 'Actividades clave y KPI';
  const op1PromptES = `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un ${op1TopicES} largo y detallado para un plan de negocios.

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
    utilice 600 palabras para generar ${op1TopicES}.
    Escriba esto como si usted fuera el propietario del negocio, usando "nosotros" no use "yo".
    Comience la finalización con "<h3>Operaciones</h3>", seguido de "<h4>Actividades Clave</h4>"

    Este es el ${op1TopicES} largo, detallado y extenso que usted ha creado:
    `;

  //italian lang---------------------------------------------------------------------
  const op1TopicIT = 'Attività chiave e KPI';
  const op1PromptIT = `
    Sei un consulente professionale e un cliente ti si avvicina per scrivere un ${op1TopicIT} lungo e dettagliato per un piano aziendale.

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
    usa 600 parole per generare ${op1TopicIT}.
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Inizia la conclusione con "<h3>Operazioni</h3>", seguito da "<h4>Attività Chiave</h4>"

    Questo è l'${op1TopicIT} lungo, dettagliato e approfondito che hai ideato:
    `;

  //dutch lang ---------------------------------------------------------------------
  const op1TopicNL = 'Belangrijkste activiteiten en KPI';
  const op1PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${op1TopicNL} te schrijven voor een bedrijfsplan.

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
    gebruik 600 woorden om ${op1TopicNL} te genereren.
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Begin de voltooiing met "<h3>Operaties</h3>" gevolgd door "<h4>Belangrijkste Activiteiten</h4>"
    Genereer alles in het Nederlands.
    Dit is het lange, gedetailleerde en uitgebreide ${op1TopicNL} dat u heeft bedacht:
    `;

  //japanese lang---------------------------------------------------------------------
  const op1TopicJP = '主な活動とKPI';
  const op1PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${op1TopicJP}を書くように依頼してきました。

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
    ${op1TopicJP}を生成するために600語を使用します。
    これをビジネスのオーナーであるかのように書き、"私たちは"を使用し、"私"は使用しないでください。
    完成を"<h3>オペレーション</h3>"で始め、その後に"<h4>主要な活動</h4>"を続けます。
    すべてを日本語で生成します。
    これがあなたが考え出した長く、詳細で、詳細な${op1TopicJP}です：
    `;

  // arabic lang---------------------------------------------------------------------
  const op1TopicAR = 'الأنشطة الرئيسية ومؤشرات الأداء الرئيسية';
  const op1PromptAR = `
    أنت مستشار محترف، ويقترب منك العميل لكتابة ${op1TopicAR} مفصلة وطويلة لخطة العمل.

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
    استخدم 600 كلمة لتوليد ${op1TopicAR}.
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن"، لا تستخدم "أنا".
    ابدأ الإكمال بـ "<h3>العمليات</h3>" تليها "<h4>الأنشطة الرئيسية</h4>"
    قم بتوليد كل شيء باللغة العربية.
    هذه هي ${op1TopicAR} الطويلة والمفصلة التي ابتكرتها:
    `;

  //swedish lang---------------------------------------------------------------------
  const op1TopicSV = 'Nyckelaktiviteter och KPI';
  const op1PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${op1TopicSV} för en affärsplan.

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
    Använd 600 ord för att generera ${op1TopicSV}.
    Skriv detta som om du är ägaren till företaget, använd "vi", använd inte "jag".
    Börja kompletteringen med "<h3>Verksamhet</h3>" följt av "<h4>Nyckelaktiviteter</h4>"
    Generera allt på svenska.
    Detta är den långa, detaljerade och omfattande ${op1TopicSV} du kommit på:
    `;

  // finnish lang---------------------------------------------------------------------
  const op1TopicFI = 'Avainaktiviteetit ja KPI';
  const op1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${op1TopicFI} liiketoimintasuunnitelmaan.

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
    käytä 600 sanaa generoidaksesi ${op1TopicFI}. 
    Kirjoita tämä kuin olisit yrityksen omistaja, käyttäen "me", älä käytä "minä".
    Aloita täydennys "<h3>Toiminnot</h3>" seurattuna "<h4>Avainaktiviteetit</h4>"
    Generoi kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ja laaja ${op1TopicFI}, jonka olet keksinyt:
    `;

  // danish lang---------------------------------------------------------------------
  const op1TopicDA = 'Nøgleaktiviteter og KPI';
  const op1PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${op1TopicDA} til en forretningsplan.

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
    Brug 600 ord til at generere ${op1TopicDA}. 
    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Begynd udfyldningen med "<h3>Drift</h3>" efterfulgt af "<h4>Nøgleaktiviteter</h4>"
    Generer alt på dansk.
    Dette er den lange, detaljerede og omfattende ${op1TopicDA} du er kommet op med:
    `;

  // norwegian lang---------------------------------------------------------------------
  const op1TopicNO = 'Nøkkelaktiviteter og KPI';
  const op1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${op1TopicNO} for en forretningsplan.

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
    bruk 600 ord for å generere ${op1TopicNO}. 
    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Begynn utfyllingen med "<h3>Drift</h3>" etterfulgt av "<h4>Nøkkelaktiviteter</h4>"
    Generer alt på norsk.
    Dette er den lange, detaljerte og omfattende ${op1TopicNO} du har kommet opp med:
    `;

  // other lang---------------------------------------------------------------------
  const op1TopicOT = 'Key Activities and KPIs';
  const op1PromptOT = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${op1TopicEN} for a business plan.

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
    use 600 words to generate ${op1TopicEN}. 
    Write this as if you are the owner of the business, using "we" don't use "I".
    Begin the completion with "<h3>Operations</h3>" followed by "<h4>Key Activities</h4>"
    Generate everything in English.
    This is the long, detailed, and lengthy ${op1TopicEN} you came up with:
    `;

  let op1PromptFinal = '';

  if (planLanguage === 'en') {
    op1PromptFinal = op1PromptEN;
  } else if (planLanguage === 'de') {
    op1PromptFinal = op1PromptDE;
  } else if (planLanguage === 'fr') {
    op1PromptFinal = op1PromptFR;
  } else if (planLanguage === 'es') {
    op1PromptFinal = op1PromptES;
  } else if (planLanguage === 'it') {
    op1PromptFinal = op1PromptIT;
  } else if (planLanguage === 'nl') {
    op1PromptFinal = op1PromptNL;
  } else if (planLanguage === 'ja') {
    op1PromptFinal = op1PromptJP;
  } else if (planLanguage === 'ar') {
    op1PromptFinal = op1PromptAR;
  } else if (planLanguage === 'sv') {
    op1PromptFinal = op1PromptSV;
  } else if (planLanguage === 'fi') {
    op1PromptFinal = op1PromptFI;
  } else if (planLanguage === 'da') {
    op1PromptFinal = op1PromptDA;
  } else if (planLanguage === 'no') {
    op1PromptFinal = op1PromptNO;
  } else {
    op1PromptFinal = op1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: op1PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1100,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}