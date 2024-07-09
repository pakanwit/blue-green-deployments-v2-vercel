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
export default async function api14Mang1StrucRolePro(request, response) {
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

  const mang1TopicEN = 'Management Structure and Employee Roster';
  const mang1PromptEN = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mang1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Management Structure, topics should include: Organizational Hierarchy and Decision-Making Process sub-topics. both these topic heading should be surrounded by <h5> tag. Both These sub-topics should only contain 1 short paragraph each.

    for the Employee Roster Topic, you should come up with employee positions that are relevant for a business with ${NEmployee} employees. then describe the responsibilities of each employee position IN DETAIL. then describe the candidate requirements IN DETAIL. surround each employee position in <li> tag.
    The number of positions should be less than ${NEmployee}. Keep in mind that the number of employees doesn't have to match the number of positions. this topic should have <h4>Employee Roster</h4> as the heading.
    
    Employee Roster should be written with more words than Management Structure.
    The content in both Management Structure and Employee Roster should not be the same.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    use 800 words to generate ${mang1TopicEN}.  
    Begin the completion with "<h3>Management</h3>" followed by "<h4>Management Structure</h4>" and "<h5>Organizational Hierarchy</h5>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed, and lengthy ${mang1TopicEN} you came up with:
    `;

  //german lang---------------------------------------------------------------------
  const mang1TopicDE = 'Managementstruktur und Mitarbeiterverzeichnis';
  const mang1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${mang1TopicDE} für einen Businessplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist: ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Für die Managementstruktur sollten die Themen folgende Unterthemen umfassen: Organisationshierarchie und Entscheidungsprozess. Beide Themenüberschriften sollten vom Tag <h5> umgeben sein. Beide Unterthemen sollten jeweils nur einen kurzen Absatz enthalten.

    Für das Thema „Mitarbeiterliste“ sollten Sie sich Mitarbeiterpositionen ausdenken, die für ein Unternehmen mit ${NEmployee}-Mitarbeitern relevant sind. Beschreiben Sie dann die Verantwortlichkeiten jeder Mitarbeiterposition im Detail. Beschreiben Sie dann die Anforderungen des Kandidaten im Detail. Umschließen Sie jede Mitarbeiterposition im <li>-Tag.
    Die Anzahl der Positionen sollte kleiner als ${NEmployee} sein. Bedenken Sie, dass die Anzahl der Mitarbeiter nicht mit der Anzahl der Stellen übereinstimmen muss. Dieses Thema sollte <h4>Mitarbeiterliste</h4> als Überschrift haben.
  
    Die Mitarbeiterliste sollte mehr Wörter enthalten als die Managementstruktur.
    Der Inhalt sowohl der Managementstruktur als auch der Mitarbeiterliste sollte nicht identisch sein.
    Schreiben Sie am Ende keinen Schlussabsatz.

    Wiederholen Sie keine Geschäftsdetails.
    Verwenden Sie 800 Wörter, um ${mang1TopicDE} zu generieren.
    Beginnen Sie die Vervollständigung mit „<h3>Verwaltung</h3>“, gefolgt von „<h4>Managementstruktur</h4>“ und „<h5>Organisationshierarchie</h5>“.
    Fertigstellung auf Deutsch generieren.
  
    Dies ist das lange, detaillierte und ausführliche ${mang1TopicDE}, das Sie sich ausgedacht haben:`;

  //french lang---------------------------------------------------------------------
  const mang1TopicFR = 'Structure de gestion et liste des employés';
  const mang1PromptFR = `
    Vous êtes un consultant professionnel, et un client vous sollicite pour rédiger un ${mang1TopicFR} long et détaillé pour un plan d'entreprise.

    détails de l'entreprise :
    détail d'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
    détail d'entreprise 2 : Le type d'entreprise est : ${businessType}.
    détail d'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    détail d'entreprise 4 : Voici le nombre d'employés de cette entreprise : ${NEmployee}
    détail d'entreprise 5 : Le canal de distribution du client est : ${salesChannel}.
    détail d'entreprise 6 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    pour la Structure de Gestion, les sujets devraient inclure : Hiérarchie Organisationnelle et Processus de Prise de Décision comme sous-thèmes. Les deux intitulés de ces sous-thèmes doivent être entourés de la balise <h5>. Chacun de ces sous-thèmes ne devrait contenir qu'un seul paragraphe court.

    pour le sujet Registre des Employés, vous devez établir des postes d'employés pertinents pour une entreprise avec ${NEmployee} employés. Ensuite, décrivez EN DÉTAIL les responsabilités de chaque poste d'employé. Puis, décrivez EN DÉTAIL les exigences des candidats. Entourez chaque poste d'employé de la balise <li>.
    Le nombre de postes devrait être inférieur à ${NEmployee}. Gardez à l'esprit que le nombre d'employés n'a pas besoin de correspondre au nombre de postes. Ce sujet devrait avoir <h4>Registre des Employés</h4> comme titre.

    Le Registre des Employés devrait être écrit avec plus de mots que la Structure de Gestion.
    Le contenu dans la Structure de Gestion et le Registre des Employés ne devrait pas être le même.
    Ne rédigez pas de paragraphe de conclusion à la fin.

    Ne répétez pas les détails de l'entreprise.
    Utilisez 800 mots pour générer ${mang1TopicFR}.
    Commencez la rédaction par "<h3>Gestion</h3>", suivi de "<h4>Structure de Gestion</h4>" et "<h5>Hiérarchie Organisationnelle</h5>"

    Voici le ${mang1TopicFR} long, détaillé et approfondi que vous avez élaboré :
    `;

  //spanish lang---------------------------------------------------------------------
  const mang1TopicES = 'Estructura de gestión y lista de empleados';
  const mang1PromptES = `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${mang1TopicES} largo y detallado para un plan de negocio.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es: ${businessType}.
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: Este es el número de empleados para este negocio: ${NEmployee}.
    detalle del negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 6: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para Estructura de Gestión, los temas deben incluir: Jerarquía Organizacional y Proceso de Toma de Decisiones como subtemas. Ambos títulos de estos subtemas deben estar rodeados por la etiqueta <h5>. Cada uno de estos subtemas solo debe contener un párrafo corto.

    para el tema Plantilla de Empleados, debe idear posiciones de empleados relevantes para un negocio con ${NEmployee} empleados. Luego describa EN DETALLE las responsabilidades de cada posición de empleado. Después, describa EN DETALLE los requisitos para los candidatos. Rodee cada posición de empleado con la etiqueta <li>.
    El número de posiciones debe ser menor que ${NEmployee}. Tenga en cuenta que el número de empleados no tiene que coincidir con el número de posiciones. Este tema debe tener <h4>Plantilla de Empleados</h4> como encabezado.

    La Plantilla de Empleados debe estar escrita con más palabras que la Estructura de Gestión.
    El contenido en Estructura de Gestión y Plantilla de Empleados no debe ser el mismo.
    No escriba un párrafo de conclusión al final.

    No repita los detalles del negocio.
    Utilice 800 palabras para generar ${mang1TopicES}.
    Comience la redacción con "<h3>Gestión</h3>", seguido de "<h4>Estructura de Gestión</h4>" y "<h5>Jerarquía Organizacional</h5>"

    Este es el ${mang1TopicES} largo, detallado y extenso que usted elaboró:
    `;

  //italian lang---------------------------------------------------------------------
  const mang1TopicIT = 'Struttura di gestione e elenco dei dipendenti';
  const mang1PromptIT = `
    Sei un consulente professionista e un cliente si avvicina a te per scrivere un ${mang1TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di attività è: ${businessType}.
    dettaglio aziendale 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono dettagli sui prodotti o servizi del cliente:
    ${productInfoPrompt}

    per la Struttura di Gestione, gli argomenti dovrebbero includere: Gerarchia Organizzativa e Processo Decisionale come sottotemi. Entrambi questi titoli dei sottotemi dovrebbero essere circondati dal tag <h5>. Ognuno di questi sottotemi dovrebbe contenere solo un breve paragrafo.

    per l'argomento Elenco dei Dipendenti, dovresti ideare posizioni lavorative pertinenti per un'attività con ${NEmployee} dipendenti. Quindi descrivi DETTAGLIATAMENTE le responsabilità di ogni posizione lavorativa. Poi descrivi DETTAGLIATAMENTE i requisiti per i candidati. Circonda ogni posizione lavorativa con il tag <li>.
    Il numero di posizioni dovrebbe essere inferiore a ${NEmployee}. Tieni presente che il numero di dipendenti non deve corrispondere al numero di posizioni. Questo argomento dovrebbe avere <h4>Elenco dei Dipendenti</h4> come titolo.

    L'Elenco dei Dipendenti dovrebbe essere scritto con più parole rispetto alla Struttura di Gestione.
    Il contenuto sia nella Struttura di Gestione che nell'Elenco dei Dipendenti non dovrebbe essere lo stesso.
    Non scrivere un paragrafo di conclusione alla fine.

    Non ripetere i dettagli aziendali.
    Usa 800 parole per generare ${mang1TopicIT}.
    Inizia il testo con "<h3>Gestione</h3>" seguito da "<h4>Struttura di Gestione</h4>" e "<h5>Gerarchia Organizzativa</h5>"

    Questo è il ${mang1TopicIT} lungo, dettagliato e ampio che hai elaborato:
    `;

  // dutch lang---------------------------------------------------------------------
  const mang1TopicNL = 'Managementstructuur en werknemerslijst';
  const mang1PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mang1TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is: ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
    bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    voor Managementstructuur, moeten de onderwerpen Organisatorische Hiërarchie en Besluitvormingsproces als subonderwerpen bevatten. Beide onderwerpen moeten worden omgeven door de <h5> tag. Beide subonderwerpen mogen slechts één korte paragraaf bevatten.

    voor het onderwerp Werknemerslijst, moet u werknemersposities bedenken die relevant zijn voor een bedrijf met ${NEmployee} werknemers. Beschrijf vervolgens IN DETAIL de verantwoordelijkheden van elke werknemerspositie. Beschrijf vervolgens IN DETAIL de vereisten voor kandidaten. Omring elke werknemerspositie met de <li> tag.
    Het aantal posities moet minder zijn dan ${NEmployee}. Houd er rekening mee dat het aantal werknemers niet hoeft overeen te komen met het aantal posities. Dit onderwerp moet <h4>Werknemerslijst</h4> als titel hebben.

    Werknemerslijst moet met meer woorden worden geschreven dan Managementstructuur.
    De inhoud in zowel Managementstructuur als Werknemerslijst mag niet hetzelfde zijn.
    Schrijf geen conclusieparagraaf aan het einde.

    Herhaal de bedrijfsdetails niet.
    gebruik 800 woorden om ${mang1TopicNL} te genereren.  
    Begin de voltooiing met "<h3>Beheer</h3>" gevolgd door "<h4>Managementstructuur</h4>" en "<h5>Organisatorische Hiërarchie</h5>"
    Genereer alles in het Nederlands.
    Dit is het lange, gedetailleerde en uitgebreide ${mang1TopicNL} dat u heeft opgesteld:
    `;

  //japanese lang---------------------------------------------------------------------
  const mang1TopicJA = '管理構造と従業員リスト';
  const mang1PromptJA = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${mang1TopicJA}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：このビジネスの従業員数は${NEmployee}です。
    ビジネス詳細5：クライアントの配布チャネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    管理構造については、組織の階層と意思決定プロセスのサブトピックを含めるべきです。これらのトピックの見出しはすべて<h5>タグで囲むべきです。これらのサブトピックはそれぞれ1つの短い段落だけを含むべきです。

    従業員名簿のトピックについては、${NEmployee}人の従業員を持つビジネスに関連する従業員のポジションを考え出すべきです。次に、各従業員のポジションの責任を詳細に説明します。次に、候補者の要件を詳細に説明します。各従業員のポジションを<li>タグで囲みます。
    ポジションの数は${NEmployee}より少なくなければなりません。従業員の数がポジションの数と一致する必要はないことを覚えておいてください。このトピックは<h4>従業員名簿</h4>を見出しとして持つべきです。
    
    従業員名簿は管理構造よりも多くの単語を使って書くべきです。
    管理構造と従業員名簿の両方の内容は同じであってはなりません。
    最後に結論の段落を書かないでください。

    ビジネスの詳細を繰り返さないでください。
    ${mang1TopicJA}を生成するために800語を使用します。
    完成を"<h3>管理</h3>"で始め、次に"<h4>管理構造</h4>"と"<h5>組織の階層</h5>"を続けます。
    すべてを日本語で生成します。
    これがあなたが考え出した長く、詳細で、詳細な${mang1TopicJA}です：
    `;

  //arabic lang---------------------------------------------------------------------
  const mang1TopicAR = 'الهيكل التنظيمي وقائمة الموظفين';
  const mang1PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${mang1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 6: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة للهيكل التنظيمي، يجب أن تتضمن المواضيع: الهيكل التنظيمي وعملية اتخاذ القرار كمواضيع فرعية. يجب أن يحيط بكل من هذه العناوين الفرعية الوسم <h5>. يجب أن تحتوي كل من هذه المواضيع الفرعية على فقرة قصيرة واحدة فقط.

    بالنسبة لموضوع قائمة الموظفين، يجب أن تقوم بتقديم وظائف الموظفين التي تكون ذات صلة بالأعمال التي لديها ${NEmployee} موظف. ثم اصف مسؤوليات كل وظيفة للموظفين بالتفصيل. ثم اصف متطلبات المرشحين بالتفصيل. يجب أن يحيط بكل وظيفة للموظفين الوسم <li>.
    يجب أن يكون عدد الوظائف أقل من ${NEmployee}. يجب أن تضع في اعتبارك أن عدد الموظفين لا يجب أن يتطابق مع عدد الوظائف. يجب أن يكون لهذا الموضوع العنوان <h4>قائمة الموظفين</h4>.
    
    يجب أن يتم كتابة قائمة الموظفين بكلمات أكثر من الهيكل التنظيمي.
    يجب أن لا يكون المحتوى في كل من الهيكل التنظيمي وقائمة الموظفين متشابه.
    لا تكتب فقرة الخاتمة في النهاية.

    لا تكرر تفاصيل العمل.
    استخدم 800 كلمة لتوليد ${mang1TopicAR}.  
    ابدأ الإكمال بـ "<h3>الإدارة</h3>" تليها "<h4>الهيكل التنظيمي</h4>" و"<h5>الهيكل التنظيمي</h5>"
    قم بتوليد كل شيء باللغة العربية.
    هذا هو ${mang1TopicAR} الطويل والمفصل الذي قمت بتقديمه:
    `;

  //swedish lang---------------------------------------------------------------------
  const mang1TopicSV = 'Ledningsstruktur och personalregister';
  const mang1PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${mang1TopicSV} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typ av verksamhet är: ${businessType}. 
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    Affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.

    Detta är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    För ledningsstrukturen bör ämnen inkludera: Organisationshierarki och beslutsprocess som underämnen. Båda dessa ämnesrubriker bör omges av <h5>-taggen. Båda dessa underämnen bör endast innehålla ett kort stycke vardera.

    För ämnet personalregister bör du komma på anställningspositioner som är relevanta för ett företag med ${NEmployee} anställda. Beskriv sedan varje anställningspositions ansvar I DETALJ. Beskriv sedan kandidatkraven I DETALJ. Omge varje anställningsposition med <li>-taggen.
    Antalet positioner bör vara mindre än ${NEmployee}. Kom ihåg att antalet anställda inte behöver matcha antalet positioner. Detta ämne bör ha <h4>Personalregister</h4> som rubrik.
    
    Personalregistret bör skrivas med fler ord än ledningsstrukturen.
    Innehållet i både ledningsstrukturen och personalregistret bör inte vara detsamma.
    Skriv inte slutsatsparagrafen i slutet.

    Upprepa inte affärsdetaljer.
    Använd 800 ord för att generera ${mang1TopicSV}.  
    Börja slutförandet med "<h3>Ledning</h3>" följt av "<h4>Ledningsstruktur</h4>" och "<h5>Organisationshierarki</h5>"
    Generera allt på svenska.
    Detta är den långa, detaljerade och omfattande ${mang1TopicSV} du kom på:
    `;

  //finnish lang---------------------------------------------------------------------
  const mang1TopicFI = 'Hallintorakenne ja henkilöstöluettelo';
  const mang1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mang1TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on: ${businessType}. 
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Tämä on yrityksen työntekijöiden määrä: ${NEmployee}
    liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    Hallintorakenteen osalta aiheisiin tulisi sisältyä: Organisaatiohierarkia ja päätöksentekoprosessi ala-aiheina. Molempien näiden aiheiden otsikot tulisi ympäröidä <h5> tagilla. Molemmat nämä ala-aiheet tulisi sisältää vain yksi lyhyt kappale kumpaakin.

    Henkilöstöluettelon aiheessa sinun tulisi keksiä työntekijöiden asemia, jotka ovat relevantteja yritykselle, jolla on ${NEmployee} työntekijää. Kuvaile sitten jokaisen työntekijän aseman vastuut YKSIYKSITYISKOHTAISESTI. Kuvaile sitten ehdokasvaatimukset YKSIYKSITYISKOHTAISESTI. Ympäröi jokainen työntekijän asema <li> tagilla.
    Asemien määrän tulisi olla vähemmän kuin ${NEmployee}. Muista, että työntekijöiden määrän ei tarvitse vastata asemien määrää. Tämän aiheen otsikon tulisi olla <h4>Henkilöstöluettelo</h4>.
    
    Henkilöstöluettelo tulisi kirjoittaa enemmän sanoilla kuin hallintorakenne.
    Sekä hallintorakenteen että henkilöstöluettelon sisällön ei tulisi olla sama.
    Älä kirjoita johtopäätöskappaletta lopussa.

    Älä toista liiketoiminnan tietoja.
    käytä 800 sanaa generoidaksesi ${mang1TopicFI}.  
    Aloita täydennys "<h3>Johto</h3>" seurattuna "<h4>Hallintorakenne</h4>" ja "<h5>Organisaatiohierarkia</h5>"
    Generoi kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ja laaja ${mang1TopicFI}, jonka keksit:
    `;

  //danish lang---------------------------------------------------------------------
  const mang1TopicDA = 'Ledelsesstruktur og personaleoversigt';
  const mang1PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${mang1TopicDA} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er: ${businessType}. 
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 6: Kundens forretnings operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Ledelsesstruktur, emner skal inkludere: Organisationshierarki og beslutningstagning proces underemner. begge disse emneoverskrifter skal være omgivet af <h5> tag. Begge disse underemner skal kun indeholde 1 kort afsnit hver.

    for Medarbejderoversigt emnet, du skal komme op med medarbejderpositioner, der er relevante for en virksomhed med ${NEmployee} medarbejdere. beskriv derefter ansvaret for hver medarbejderposition I DETALJER. beskriv derefter kandidatkravene I DETALJER. omgiv hver medarbejderposition med <li> tag.
    Antallet af positioner skal være mindre end ${NEmployee}. Husk at antallet af medarbejdere ikke behøver at matche antallet af positioner. dette emne skal have <h4>Medarbejderoversigt</h4> som overskrift.
    
    Medarbejderoversigt skal skrives med flere ord end Ledelsesstruktur.
    Indholdet i både Ledelsesstruktur og Medarbejderoversigt skal ikke være det samme.
    Skriv ikke konklusionsafsnittet i slutningen.

    Gentag ikke forretningsdetaljer.
    brug 800 ord til at generere ${mang1TopicDA}.  
    Begynd udfyldelsen med "<h3>Ledelse</h3>" efterfulgt af "<h4>Ledelsesstruktur</h4>" og "<h5>Organisationshierarki</h5>"
    Generer alt på dansk.
    Dette er den lange, detaljerede og omfattende ${mang1TopicDA} du kom op med:
    `;

  //norwegian lang---------------------------------------------------------------------
  const mang1TopicNO = 'Ledelsesstruktur og personaleoversikt';
  const mang1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${mang1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er: ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Dette er antallet av ansatte for denne virksomheten: ${NEmployee}
    forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 6: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for Ledelsesstruktur, emner skal inkludere: Organisasjonshierarki og Beslutningstaking prosess underemner. begge disse emneoverskriftene skal være omgitt av <h5> tag. Begge disse underemnene skal bare inneholde 1 kort avsnitt hver.

    for Medarbeideroversikt emnet, du skal komme opp med medarbeiderposisjoner som er relevante for en virksomhet med ${NEmployee} ansatte. beskriv deretter ansvaret for hver medarbeiderposisjon I DETALJ. beskriv deretter kandidatkravene I DETALJ. omgir hver medarbeiderposisjon med <li> tag.
    Antallet av posisjoner skal være mindre enn ${NEmployee}. Husk at antallet av ansatte ikke trenger å matche antallet av posisjoner. dette emnet skal ha <h4>Medarbeideroversikt</h4> som overskrift.
    
    Medarbeideroversikt skal skrives med flere ord enn Ledelsesstruktur.
    Innholdet i både Ledelsesstruktur og Medarbeideroversikt skal ikke være det samme.
    Skriv ikke konklusjonsavsnittet på slutten.

    Gjenta ikke forretningsdetaljer.
    bruk 800 ord for å generere ${mang1TopicNO}.  
    Begynn utfyllingen med "<h3>Ledelse</h3>" etterfulgt av "<h4>Ledelsesstruktur</h4>" og "<h5>Organisasjonshierarki</h5>"
    Generer alt på norsk.
    Dette er den lange, detaljerte og omfattende ${mang1TopicNO} du kom opp med:
    `;

  //other lang---------------------------------------------------------------------
  const mang1TopicOT = 'Management Structure and Employee Roster';
  const mang1PromptOT = `
    You are a professional consultant, and a customer approaches you to write a long and detailed ${mang1TopicEN} for a business plan.

    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are details of the client's products or services:
    ${productInfoPrompt}

    for Management Structure, topics should include: Organizational Hierarchy and Decision-Making Process sub-topics. both these topic heading should be surrounded by <h5> tag. Both These sub-topics should only contain 1 short paragraph each.

    for the Employee Roster Topic, you should come up with employee positions that are relevant for a business with ${NEmployee} employees. then describe the responsibilities of each employee position IN DETAIL. then describe the candidate requirements IN DETAIL. surround each employee position in <li> tag.
    The number of positions should be less than ${NEmployee}. Keep in mind that the number of employees doesn't have to match the number of positions. this topic should have <h4>Employee Roster</h4> as the heading.
    
    Employee Roster should be written with more words than Management Structure.
    The content in both Management Structure and Employee Roster should not be the same.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    use 800 words to generate ${mang1TopicEN}.  
    Begin the completion with "<h3>Management</h3>" followed by "<h4>Management Structure</h4>" and "<h5>Organizational Hierarchy</h5>"
    Generate everything in English.
    This is the long, detailed, and lengthy ${mang1TopicEN} you came up with:
    `;

  let mang1PromptFinal = '';

  if (planLanguage === 'en') {
    mang1PromptFinal = mang1PromptEN;
  } else if (planLanguage === 'de') {
    mang1PromptFinal = mang1PromptDE;
  } else if (planLanguage === 'fr') {
    mang1PromptFinal = mang1PromptFR;
  } else if (planLanguage === 'es') {
    mang1PromptFinal = mang1PromptES;
  } else if (planLanguage === 'it') {
    mang1PromptFinal = mang1PromptIT;
  } else if (planLanguage === 'nl') {
    mang1PromptFinal = mang1PromptNL;
  } else if (planLanguage === 'ja') {
    mang1PromptFinal = mang1PromptJA;
  } else if (planLanguage === 'ar') {
    mang1PromptFinal = mang1PromptAR;
  } else if (planLanguage === 'sv') {
    mang1PromptFinal = mang1PromptSV;
  } else if (planLanguage === 'fi') {
    mang1PromptFinal = mang1PromptFI;
  } else if (planLanguage === 'da') {
    mang1PromptFinal = mang1PromptDA;
  } else if (planLanguage === 'no') {
    mang1PromptFinal = mang1PromptNO;
  } else {
    mang1PromptFinal = mang1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: mang1PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1200,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
