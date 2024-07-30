import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IManagementPlan {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: number;
  location: string;
  salesChannel: string;

  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
  modelName?: string;
}

// api9Mang1.ts
export const managementPlan = (request: IManagementPlan) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    productInfoPrompt,
    planLanguage,
    variantID,
    modelName,
  } = request;

  const mang1TopicEN = 'Management';
  const mang1TopicDE = 'Management';
  const mang1TopicFR = 'Gestion';
  const mang1TopicES = 'Gestión';
  const mang1TopicIT = 'Gestione';
  const mang1TopicNL = 'Beheer';
  const mang1TopicJA = 'マネジメント';
  const mang1TopicAR = 'الإدارة';
  const mang1TopicSV = 'Förvaltning';
  const mang1TopicFI = 'Johtaminen';
  const mang1TopicDA = 'Ledelse';
  const mang1TopicNO = 'Ledelse';

  const promptTemplates = {
    en: `You are a professional consultant, and a customer approaches you to write a long and detailed ${mang1TopicEN} for a business plan.

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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
  
    This is important: Be VERY insightful in your response.
    This is the long, detailed, and insightful ${mang1TopicEN} you came up with:
    `,
    'en-uk': `You are a professional consultant, and a customer approaches you to write a long and detailed ${mang1TopicEN} for a business plan.

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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    
    use british english spelling and grammar
    This is important: Be VERY insightful in your response.
    This is the long, detailed, and insightful ${mang1TopicEN} you came up with:
    `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um ein langes und detailliertes ${mang1TopicDE} für einen Geschäftsplan zu schreiben.

    Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Unternehmens ist: ${businessType}. 
    Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdaten 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
    Geschäftsdaten 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdaten 6: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
  
    Dies sind die Details der Produkte oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
  
    Für das ${mang1TopicDE} sollten Sie Mitarbeiterpositionen entwickeln, die für ein Unternehmen mit ${NEmployee} Mitarbeitern relevant sind. Beschreiben Sie dann die Verantwortlichkeiten jeder Mitarbeiterposition. Beschreiben Sie dann die Anforderungen an die Kandidaten. Umgeben Sie jede Mitarbeiterposition mit einem <li>-Tag.
    Die Anzahl der Positionen sollte weniger als ${NEmployee} betragen. Beachten Sie, dass die Anzahl der Mitarbeiter nicht mit der Anzahl der Positionen übereinstimmen muss.
    
    Wiederholen Sie keine Geschäftsdaten.
    Beginnen Sie die Ausführung mit "<h3>Management</h3>" gefolgt von "<h4>Mitarbeiterrollen</h4>"
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
  Generieren Sie alles auf Deutsch.
    Dies ist wichtig: Seien Sie SEHR aufschlussreich in Ihrer Antwort.
    Dies ist das lange, detaillierte und aufschlussreiche ${mang1TopicDE}, das Sie entwickelt haben:
    `,
    fr: `Vous êtes un consultant professionnel, et un client vous demande d'écrire un ${mang1TopicFR} long et détaillé pour un plan d'affaires.

    détails de l'entreprise:
    détail de l'entreprise 1: Le nom de l'entreprise du client est ${businessName}.
    détail de l'entreprise 2: Le type d'entreprise est: ${businessType}. 
    détail de l'entreprise 3: Voici où se trouvent les clients de l'entreprise: ${location}.
    détail de l'entreprise 4: Voici le nombre d'employés de cette entreprise: ${NEmployee}
    détail de l'entreprise 5: Le canal de distribution du client est: ${salesChannel}.
    détail de l'entreprise 6: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    Voici les détails des produits ou services du client:
    ${productInfoPrompt}
  
    Pour le ${mang1TopicFR}, vous devez proposer des postes d'employés pertinents pour une entreprise avec ${NEmployee} employés. Ensuite, décrivez les responsabilités de chaque poste d'employé. Ensuite, décrivez les exigences des candidats. Entourez chaque poste d'employé avec une balise <li>.
    Le nombre de postes doit être inférieur à ${NEmployee}. Gardez à l'esprit que le nombre d'employés ne doit pas correspondre au nombre de postes.
    
    Ne répétez pas les détails de l'entreprise.
    Commencez la complétion par "<h3>Gestion</h3>" suivi de "<h4>Rôles des employés</h4>"
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de puce, utilisez plutôt la balise <li>.
  Générez tout en français.
    C'est important: Soyez TRÈS perspicace dans votre réponse.
    Voici le ${mang1TopicFR} long, détaillé et perspicace que vous avez élaboré:
    `,
    es: `Eres un consultor profesional, y un cliente se acerca a ti para escribir un ${mang1TopicES} largo y detallado para un plan de negocios.

    detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es: ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: Este es el número de empleados para este negocio: ${NEmployee}
    detalle del negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
  
    Para el ${mang1TopicES}, debes idear puestos de empleados que sean relevantes para un negocio con ${NEmployee} empleados. Luego describe las responsabilidades de cada puesto de empleado. Luego describe los requisitos del candidato. Rodea cada puesto de empleado con una etiqueta <li>.
    El número de puestos debe ser menor que ${NEmployee}. Ten en cuenta que el número de empleados no tiene que coincidir con el número de puestos.
    
    No repitas los detalles del negocio.
    Comienza la finalización con "<h3>Gestión</h3>" seguido de "<h4>Roles de los empleados</h4>"
    Usa solo etiquetas HTML, no uses markdown. No uses ** **, en su lugar usa la etiqueta <strong> para negrita. No uses * *, en su lugar usa la etiqueta <em> para cursiva. No uses * para puntos de viñeta, en su lugar usa la etiqueta <li>.
  genera todo en español
    Esto es importante: Sé MUY perspicaz en tu respuesta.
    Este es el ${mang1TopicES} largo, detallado y perspicaz que has ideado:
    `,
    it: `Sei un consulente professionista e un cliente si rivolge a te per scrivere un ${mang1TopicIT} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è: ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}
    dettaglio aziendale 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
  
    Per il ${mang1TopicIT}, dovresti ideare posizioni di dipendenti rilevanti per un'azienda con ${NEmployee} dipendenti. Quindi descrivi le responsabilità di ciascuna posizione di dipendente. Quindi descrivi i requisiti del candidato. Circonda ogni posizione di dipendente con un tag <li>.
    Il numero di posizioni dovrebbe essere inferiore a ${NEmployee}. Tieni presente che il numero di dipendenti non deve corrispondere al numero di posizioni.
    
    Non ripetere i dettagli aziendali.
    Inizia il completamento con "<h3>Gestione</h3>" seguito da "<h4>Ruoli dei dipendenti</h4>"
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece il tag <li>.
  genera tutto in italiano
    Questo è importante: Sii MOLTO perspicace nella tua risposta.
    Questo è il ${mang1TopicIT} lungo, dettagliato e perspicace che hai ideato:
    `,
    nl: `U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${mang1TopicNL} voor een bedrijfsplan te schrijven.

    bedrijfsgegevens:
    bedrijfsgegeven 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegeven 2: Het type bedrijf is: ${businessType}. 
    bedrijfsgegeven 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
    bedrijfsgegeven 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
    bedrijfsgegeven 5: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsgegeven 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}
  
    Voor het ${mang1TopicNL} moet u functies bedenken die relevant zijn voor een bedrijf met ${NEmployee} werknemers. Beschrijf vervolgens de verantwoordelijkheden van elke functie. Beschrijf vervolgens de vereisten voor de kandidaat. Omring elke functie met een <li>-tag.
    Het aantal functies moet minder zijn dan ${NEmployee}. Houd er rekening mee dat het aantal werknemers niet hoeft overeen te komen met het aantal functies.
    
    Herhaal geen bedrijfsgegevens.
    Begin de voltooiing met "<h3>Beheer</h3>" gevolgd door "<h4>Functies van werknemers</h4>"
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
  genereer alles in het Nederlands
    Dit is belangrijk: Wees ZEER inzichtelijk in uw antwoord.
    Dit is het lange, gedetailleerde en inzichtelijke ${mang1TopicNL} dat u hebt bedacht:
    `,
    ja: `あなたはプロのコンサルタントであり、顧客がビジネスプランのために長く詳細な${mang1TopicJA}を書くように依頼してきます。

    ビジネスの詳細:
    ビジネスの詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネスの詳細 2: ビジネスの種類は${businessType}です。
    ビジネスの詳細 3: これはビジネスの顧客がいる場所です: ${location}。
    ビジネスの詳細 4: このビジネスの従業員数は${NEmployee}です。
    ビジネスの詳細 5: クライアントの流通チャネルは${salesChannel}です。
    ビジネスの詳細 6: クライアントのビジネスの運営状況は${businessOperationalStatus}です。
  
    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}
  
    ${mang1TopicJA}のために、${NEmployee}人の従業員がいるビジネスに関連する従業員のポジションを考え出す必要があります。次に、各従業員のポジションの責任を説明します。次に、候補者の要件を説明します。各従業員のポジションを<li>タグで囲みます。
    ポジションの数は${NEmployee}より少なくする必要があります。従業員の数がポジションの数と一致する必要はないことに注意してください。
    
    ビジネスの詳細を繰り返さないでください。
    "<h3>マネジメント</h3>"で完了を開始し、次に"<h4>従業員の役割</h4>"を続けます。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **を使用せず、代わりに<strong>タグを使用して太字にします。* *を使用せず、代わりに<em>タグを使用して斜体にします。箇条書きには*を使用せず、代わりに<li>タグを使用します。
  すべて日本語で生成します。
  
    これは重要です: あなたの回答に非常に洞察力を持たせてください。
    これはあなたが考え出した長く、詳細で洞察力のある${mang1TopicJA}です:
    `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${mang1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}.
    تفاصيل العمل 3: هذا هو مكان وجود عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة توزيع العميل هي: ${salesChannel}.
    تفاصيل العمل 6: الحالة التشغيلية لعمل العميل هي ${businessOperationalStatus}.
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
  
    بالنسبة لـ${mang1TopicAR}، يجب أن تبتكر مناصب الموظفين ذات الصلة بعمل يحتوي على ${NEmployee} موظفين. ثم تصف مسؤوليات كل منصب موظف. ثم تصف متطلبات المرشح. أحط كل منصب موظف بعلامة <li>.
    يجب أن يكون عدد المناصب أقل من ${NEmployee}. ضع في اعتبارك أن عدد الموظفين لا يجب أن يتطابق مع عدد المناصب.
    
    لا تكرر تفاصيل العمل.
    ابدأ الإكمال بـ "<h3>الإدارة</h3>" متبوعًا بـ "<h4>أدوار الموظفين</h4>"
    استخدم علامات HTML فقط، لا تستخدم الماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
  قم بإنشاء كل شيء باللغة العربية.
  
    هذا مهم: كن شديد البصيرة في ردك.
    هذا هو ${mang1TopicAR} الطويل والمفصل والبصير الذي توصلت إليه:
    `,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva en lång och detaljerad ${mang1TopicSV} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är: ${businessType}.
    affärsdetalj 3: Här är företagets kunder: ${location}.
    affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.
  
    Detta är detaljerna om kundens produkter eller tjänster:
    ${productInfoPrompt}
  
    för ${mang1TopicSV} bör du komma på anställningspositioner som är relevanta för ett företag med ${NEmployee} anställda. beskriv sedan ansvarsområdena för varje anställningsposition. beskriv sedan kandidatkraven. omge varje anställningsposition med en <li>-tagg.
    Antalet positioner bör vara färre än ${NEmployee}. Tänk på att antalet anställda inte behöver matcha antalet positioner.
    
    Upprepa inte affärsdetaljer.
    Börja slutförandet med "<h3>Förvaltning</h3>" följt av "<h4>Anställdas roller</h4>"
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <li>-taggen.
  generera allt på svenska
    Detta är viktigt: Var MYCKET insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${mang1TopicSV} du kom på:
    `,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${mang1TopicFI} liiketoimintasuunnitelmaa varten.

    liiketoiminnan yksityiskohdat:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Yrityksen tyyppi on: ${businessType}.
    liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan yksityiskohta 4: Tämä on tämän yrityksen työntekijöiden määrä: ${NEmployee}
    liiketoiminnan yksityiskohta 5: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan yksityiskohta 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.
  
    Nämä ovat asiakkaan tuotteiden tai palveluiden yksityiskohdat:
    ${productInfoPrompt}
  
    ${mang1TopicFI} varten sinun tulisi keksiä työntekijöiden asemia, jotka ovat merkityksellisiä yritykselle, jossa on ${NEmployee} työntekijää. kuvaa sitten kunkin työntekijän aseman vastuut. kuvaa sitten ehdokkaan vaatimukset. ympäröi jokainen työntekijän asema <li>-tagilla.
    Asemien lukumäärän tulisi olla vähemmän kuin ${NEmployee}. Muista, että työntekijöiden määrän ei tarvitse vastata asemien määrää.
    
    Älä toista liiketoiminnan yksityiskohtia.
    Aloita täydennys "<h3>Johtaminen</h3>" ja seuraa sitä "<h4>Työntekijöiden roolit</h4>"
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
  luo kaikki suomeksi
  
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${mang1TopicFI}, jonka keksit:
    `,
    da: `Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive en lang og detaljeret ${mang1TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedstypen er: ${businessType}.
    forretningsdetalje 3: Her er virksomhedens kunder: ${location}.
    forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
  
    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
  
    for ${mang1TopicDA} skal du finde på medarbejderstillinger, der er relevante for en virksomhed med ${NEmployee} medarbejdere. beskriv derefter ansvarsområderne for hver medarbejderstilling. beskriv derefter kandidatkravene. omgiv hver medarbejderstilling med en <li>-tag.
    Antallet af stillinger skal være mindre end ${NEmployee}. Husk, at antallet af medarbejdere ikke behøver at matche antallet af stillinger.
    
    Gentag ikke forretningsdetaljer.
    Begynd fuldførelsen med "<h3>Ledelse</h3>" efterfulgt af "<h4>Medarbejderroller</h4>"
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv. Brug ikke * til punkttegn, brug i stedet <li>-tag.
  generer alt på dansk
  
    Dette er vigtigt: Vær MEGET indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${mang1TopicDA}, du kom op med:
    `,
    no: `Du er en profesjonell konsulent, og en kunde henvender seg til deg for å skrive en lang og detaljert ${mang1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Forretningstypen er: ${businessType}. 
    forretningsdetalj 3: Her er hvor kundens kunder befinner seg: ${location}.
    forretningsdetalj 4: Dette er antall ansatte i denne virksomheten: ${NEmployee}
    forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 6: Kundens forretnings operasjonelle status er ${businessOperationalStatus}.
  
    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
  
    for ${mang1TopicNO}, bør du komme opp med stillinger som er relevante for en virksomhet med ${NEmployee} ansatte. Beskriv deretter ansvarsområdene for hver stilling. Beskriv deretter kandidatkravene. Omgiv hver stilling med en <li>-tag.
    Antall stillinger bør være færre enn ${NEmployee}. Husk at antall ansatte ikke trenger å samsvare med antall stillinger.
    
    Ikke gjenta forretningsdetaljer.
    Begynn fullføringen med "<h3>Ledelse</h3>" etterfulgt av "<h4>Ansattroller</h4>"
    bruk kun HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-tag for fet skrift. Ikke bruk * *, bruk i stedet <em>-tag for kursiv. Ikke bruk * for punktlister, bruk i stedet <li>-tag.
  generer alt på norsk
  
    Dette er viktig: Vær VELDIG innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${mang1TopicNO} du kom opp med:
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
