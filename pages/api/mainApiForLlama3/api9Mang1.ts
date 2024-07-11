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
export default async function api9Mang1(request, response) {
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

    productInfoPrompt,
    planLanguage,
  } = await request.json();

  let UKEngPrompt = '';
  if (planLanguage === 'en-uk')
    UKEngPrompt = 'use british english spelling and grammar';

  const mang1TopicEN = 'Management Plan';
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

    for the ${mang1TopicEN}, you should come up with employee positions that are relevant for a business with ${NEmployee} employees. then describe the responsibilities of each employee position. then describe the candidate requirements. surround each employee position in <li> tag.
    The number of positions should be less than ${NEmployee}. Keep in mind that the number of employees doesn't have to match the number of positions.
    
    Do not repeat business details.
    Begin the completion with "<h3>Management</h3>" followed by "<h4>Employee Roles</h4>"
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    ${UKEngPrompt}
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mang1TopicEN} you came up with:
    `;

  //german lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const mang1TopicDE = 'Managementplan';
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

    Für das ${mang1TopicDE} sollten Sie sich Mitarbeiterpositionen ausdenken, die für ein Unternehmen mit ${NEmployee}-Mitarbeitern relevant sind. Beschreiben Sie dann die Verantwortlichkeiten der einzelnen Mitarbeiterpositionen. Beschreiben Sie dann die Anforderungen des Kandidaten. Umschließen Sie jede Mitarbeiterposition im <li>-Tag.
    Die Anzahl der Positionen sollte kleiner als ${NEmployee} sein. Bedenken Sie, dass die Anzahl der Mitarbeiter nicht mit der Anzahl der Stellen übereinstimmen muss.
  
    Wiederholen Sie keine Geschäftsdetails.
    Beginnen Sie die Vervollständigung mit „<h3>Verwaltung</h3>“, gefolgt von „<h4>Mitarbeiterrollen</h4>“.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${mang1TopicDE}, das Sie sich ausgedacht haben:
    `;

  //french lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicFR = 'Management Plan';
  const mang1PromptFR = `Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${mang1TopicFR} long et détaillé pour un plan d'affaires.

    Détails de l'entreprise :
    Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
    Détail de l'entreprise 2 : Le type d'entreprise est : ${businessType}.
    Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    Détail de l'entreprise 4 : Voici le nombre d'employés de cette entreprise : ${NEmployee}
    Détail de l'entreprise 5 : Le canal de distribution du client est : ${salesChannel}.
    Détail de l'entreprise 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    Pour le ${mang1TopicFR}, vous devriez proposer des postes d'employés qui sont pertinents pour une entreprise avec ${NEmployee} employés. Ensuite, décrivez les responsabilités de chaque poste d'employé. Ensuite, décrivez les exigences du candidat. Entourez chaque poste d'employé avec la balise <li>.
    Le nombre de postes devrait être inférieur à ${NEmployee}. Gardez à l'esprit que le nombre d'employés n'a pas à correspondre au nombre de postes.
    
    Ne répétez pas les détails de l'entreprise.
    Commencez la réalisation avec "<h3>Management</h3>" suivi de "<h4>Rôles des employés</h4>"
    Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
    Générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${mang1TopicFR} que vous avez trouvé :
    `;

  //spanish lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicES = 'Plan de gestión';
  const mang1PromptES = `Eres un consultor profesional y un cliente se acerca a ti para escribir un ${mang1TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es: ${businessType}. 
    detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
    detalle del negocio 4: Este es el número de empleados para este negocio: ${NEmployee}
    detalle del negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    para el ${mang1TopicES}, deberías pensar en posiciones de empleados que sean relevantes para un negocio con ${NEmployee} empleados. luego describe las responsabilidades de cada posición de empleado. luego describe los requisitos del candidato. rodea cada posición de empleado con la etiqueta <li>.
    El número de posiciones debería ser menor que ${NEmployee}. Ten en cuenta que el número de empleados no tiene que coincidir con el número de posiciones.
    
    No repitas los detalles del negocio.
    Comienza la realización con "<h3>Management</h3>" seguido de "<h4>Roles de los empleados</h4>"
    Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
    Genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz ${mang1TopicES} que se le ocurrió:
    `;

  //italian lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicIT = 'MPiano di gestione';
  const mang1PromptIT = `Sei un consulente professionista e un cliente si avvicina a te per scrivere un ${mang1TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli dell'azienda:
    dettaglio dell'azienda 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio dell'azienda 2: Il tipo di azienda è: ${businessType}. 
    dettaglio dell'azienda 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
    dettaglio dell'azienda 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}
    dettaglio dell'azienda 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio dell'azienda 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}

    per il ${mang1TopicIT}, dovresti pensare a posizioni di dipendenti che sono rilevanti per un'azienda con ${NEmployee} dipendenti. poi descrivi le responsabilità di ogni posizione di dipendente. poi descrivi i requisiti del candidato. circonda ogni posizione di dipendente con il tag <li>.
    Il numero di posizioni dovrebbe essere inferiore a ${NEmployee}. Tieni presente che il numero di dipendenti non deve corrispondere al numero di posizioni.
    
    Non ripetere i dettagli dell'azienda.
    Inizia la realizzazione con "<h3>Gestione</h3>" seguito da "<h4>Ruoli dei dipendenti</h4>"
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace ${mang1TopicIT} che hai ideato:
    `;

  //dutch lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicNL = 'Managementplan';
  const mang1PromptNL = `
    Je bent een professionele consultant en een klant benadert je om een lang en gedetailleerd ${mang1TopicNL} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is: ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
    bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}

    voor het ${mang1TopicNL}, moet je werknemersposities bedenken die relevant zijn voor een bedrijf met ${NEmployee} werknemers. beschrijf vervolgens de verantwoordelijkheden van elke werknemerspositie. beschrijf vervolgens de vereisten voor de kandidaat. omring elke werknemerspositie met de <li> tag.
    Het aantal posities moet minder zijn dan ${NEmployee}. Houd er rekening mee dat het aantal werknemers niet hoeft overeen te komen met het aantal posities.
    
    Herhaal de bedrijfsdetails niet.
    Begin de voltooiing met "<h3>Management</h3>" gevolgd door "<h4>Werknemersrollen</h4>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${mang1TopicNL} die u bedacht hebt:
    `;

  //japanese lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicJA = '経営計画';
  const mang1PromptJA = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための長く詳細な${mang1TopicJA}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネスの詳細1：クライアントのビジネス名は${businessName}です。
    ビジネスの詳細2：ビジネスの種類は：${businessType}です。
    ビジネスの詳細3：これがビジネスの顧客がいる場所です：${location}。
    ビジネスの詳細4：このビジネスの従業員数は${NEmployee}です。
    ビジネスの詳細5：クライアントの流通チャネルは：${salesChannel}です。
    ビジネスの詳細6：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    ${mang1TopicJA}のために、${NEmployee}人の従業員を持つビジネスに関連する従業員のポジションを考え出すべきです。次に、各従業員のポジションの責任を説明します。次に、候補者の要件を説明します。各従業員のポジションを<li>タグで囲みます。
    ポジションの数は${NEmployee}より少なくなければなりません。従業員の数がポジションの数と一致する必要はないことを覚えておいてください。
    
    ビジネスの詳細を繰り返さないでください。
    完成を"<h3>経営</h3>"で始め、その後に"<h4>従業員の役割</h4>"を続けます。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${mang1TopicJA}です:
    `;

  //arabic lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicAR = 'خطة الإدارة';
  const mang1PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${mang1TopicAR} طويلة ومفصلة لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 6: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لـ ${mang1TopicAR}، يجب أن تقترح وظائف الموظفين التي تكون ذات صلة بالأعمال التي لديها ${NEmployee} موظف. ثم اصف مسؤوليات كل وظيفة موظف. ثم اصف متطلبات المرشح. أحاط كل وظيفة موظف بوسم <li>.
    يجب أن يكون عدد الوظائف أقل من ${NEmployee}. تذكر أن عدد الموظفين لا يجب أن يتطابق مع عدد الوظائف.
    
    لا تكرر تفاصيل العمل.
    ابدأ الإكمال بـ "<h3>الإدارة</h3>" تليها "<h4>أدوار الموظفين</h4>"
    استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة  للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة  للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة  للنقاط.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${mang1TopicAR} الطويل والمفصل والعميق الذي توصلت إليه:
    `;

  // swedish lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicSV = 'Ledningsplan';
  const mang1PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${mang1TopicSV} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är: ${businessType}. 
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    Affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    för ${mang1TopicSV}, bör du komma på anställningspositioner som är relevanta för ett företag med ${NEmployee} anställda. beskriv sedan varje anställningspositions ansvar. beskriv sedan kandidatkraven. omge varje anställningsposition med <li> taggen.
    Antalet positioner bör vara mindre än ${NEmployee}. Kom ihåg att antalet anställda inte behöver matcha antalet positioner.
    
    Upprepa inte affärsdetaljer.
    Börja utfyllnaden med "<h3>Ledning</h3>" följt av "<h4>Anställdas roller</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${mang1TopicSV} du kom på:
    `;

  //finnish lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicFI = 'Johtamissuunnitelma';
  const mang1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mang1TopicFI} liiketoimintasuunnitelmaan.

    Liiketoiminnan tiedot:
    Liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    Liiketoiminnan tieto 2: Liiketoiminnan tyyppi on: ${businessType}. 
    Liiketoiminnan tieto 3: Tässä on yrityksen asiakkaat: ${location}.
    Liiketoiminnan tieto 4: Tämä on yrityksen työntekijöiden määrä: ${NEmployee}
    Liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
    Liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    ${mang1TopicFI} varten, sinun tulisi keksiä työntekijöiden asemia, jotka ovat relevantteja yritykselle, jolla on ${NEmployee} työntekijää. kuvaile sitten jokaisen työntekijän aseman vastuut. kuvaile sitten ehdokasvaatimukset. ympäröi jokainen työntekijän asema <li> tagilla.
    Asemien määrän tulisi olla vähemmän kuin ${NEmployee}. Muista, että työntekijöiden määrän ei tarvitse vastata asemien määrää.
    
    Älä toista liiketoiminnan tietoja.
    Aloita täydennys "<h3>Johto</h3>" seuraa "<h4>Työntekijöiden roolit</h4>"
    Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${mang1TopicFI}, jonka keksit:
    `;

  // danish lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicDA = 'Ledelsesplan';
  const mang1PromptDA = `
    Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mang1TopicDA} til en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalje 2: Typen af virksomhed er: ${businessType}. 
    Forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    Forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    Forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    Forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for ${mang1TopicDA}, skal du komme op med medarbejderpositioner, der er relevante for en virksomhed med ${NEmployee} medarbejdere. beskriv derefter hver medarbejderpositions ansvar. beskriv derefter kandidatkravene. omgiv hver medarbejderposition med <li> tag.
    Antallet af positioner skal være mindre end ${NEmployee}. Husk at antallet af medarbejdere ikke behøver at matche antallet af positioner.
    
    Gentag ikke forretningsdetaljer.
    Begynd udfyldningen med "<h3>Ledelse</h3>" efterfulgt af "<h4>Medarbejderroller</h4>"
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${mang1TopicDA}, du kom op med:
    `;

  // norwegian lang ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const mang1TopicNO = 'Ledelsesplan';
  const mang1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${mang1TopicNO} for en forretningsplan.

    Forretningsdetaljer:
    Forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    Forretningsdetalj 2: Typen virksomhet er: ${businessType}. 
    Forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    Forretningsdetalj 4: Dette er antall ansatte for denne virksomheten: ${NEmployee}
    Forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    Forretningsdetalj 6: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for ${mang1TopicNO}, bør du komme opp med ansattes posisjoner som er relevante for en virksomhet med ${NEmployee} ansatte. beskriv deretter hver ansattes posisjons ansvar. beskriv deretter kandidatkravene. omgir hver ansattes posisjon med <li> tag.
    Antall posisjoner skal være mindre enn ${NEmployee}. Husk at antall ansatte ikke trenger å matche antall posisjoner.
    
    Ikke gjenta forretningsdetaljer.
    Begynn utfyllingen med "<h3>Ledelse</h3>" etterfulgt av "<h4>Ansatte Roller</h4>"
    Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
    Generer alt på norsk.
    Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${mang1TopicNO} du kom opp med:
    `;

  let mang1PromptFinal = '';

  if (planLanguage == 'en') {
    mang1PromptFinal = mang1PromptEN;
  } else if (planLanguage == 'de') {
    mang1PromptFinal = mang1PromptDE;
  } else if (planLanguage == 'fr') {
    mang1PromptFinal = mang1PromptFR;
  } else if (planLanguage == 'es') {
    mang1PromptFinal = mang1PromptES;
  } else if (planLanguage == 'it') {
    mang1PromptFinal = mang1PromptIT;
  } else if (planLanguage == 'nl') {
    mang1PromptFinal = mang1PromptNL;
  } else if (planLanguage == 'ja') {
    mang1PromptFinal = mang1PromptJA;
  } else if (planLanguage == 'ar') {
    mang1PromptFinal = mang1PromptAR;
  } else if (planLanguage == 'sv') {
    mang1PromptFinal = mang1PromptSV;
  } else if (planLanguage == 'fi') {
    mang1PromptFinal = mang1PromptFI;
  } else if (planLanguage == 'da') {
    mang1PromptFinal = mang1PromptDA;
  } else if (planLanguage == 'no') {
    mang1PromptFinal = mang1PromptNO;
  } else {
    mang1PromptFinal = mang1PromptEN;
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: mang1PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}