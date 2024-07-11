import { OpenAIStream } from '../../../utils/OpenAIChatStream';
import { FireworksAIStream } from '../../../utils/llama3/FireworksAIStream';

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
  } = request;

  const mang1TopicEN = 'Management Plan';
  const mang1TopicDE = 'Managementplan';
  const mang1TopicFR = 'Management Plan';
  const mang1TopicES = 'Plan de gestión';
  const mang1TopicIT = 'MPiano di gestione';
  const mang1TopicNL = 'Managementplan';
  const mang1TopicJA = '経営計画';
  const mang1TopicAR = 'خطة الإدارة';
  const mang1TopicSV = 'Ledningsplan';
  const mang1TopicFI = 'Johtamissuunnitelma';
  const mang1TopicDA = 'Ledelsesplan';
  const mang1TopicNO = 'Ledelsesplan';

  const promptTemplates = {
    en: `
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
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mang1TopicEN} you came up with:
    `,
    'en-uk': `
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
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${mang1TopicEN} you came up with:
    `,
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${mang1TopicDE} für einen Businessplan zu verfassen.

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
                        Verwenden Sie 1500 Token, um ${mang1TopicDE} zu generieren.
                        Beginnen Sie die Vervollständigung mit „<h3>Verwaltung</h3>“, gefolgt von „<h4>Mitarbeiterrollen</h4>“.
                        Fertigstellung auf Deutsch generieren.
                        
                        Dies ist das lange, detaillierte und ausführliche ${mang1TopicDE}, das Sie sich ausgedacht haben:`,
    fr: `Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${mang1TopicFR} long et détaillé pour un plan d'affaires.

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
                        Utilisez 1500 tokens pour générer ${mang1TopicFR}.
                        Commencez la réalisation avec "<h3>Management</h3>" suivi de "<h4>Rôles des employés</h4>"
                        génère tout en français
                        Voici le ${mang1TopicFR} long, détaillé et approfondi que vous avez élaboré :`,
    es: `Eres un consultor profesional y un cliente se acerca a ti para escribir un ${mang1TopicES} largo y detallado para un plan de negocios.

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
                        usa 1500 tokens para generar ${mang1TopicES}.  
                        Comienza la realización con "<h3>Management</h3>" seguido de "<h4>Roles de los empleados</h4>"
                        genera todo en español
                        Este es el ${mang1TopicES} largo, detallado y extenso que has elaborado:`,
    it: `Sei un consulente professionista e un cliente si avvicina a te per scrivere un ${mang1TopicIT} lungo e dettagliato per un piano aziendale.

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
                        usa 1500 token per generare ${mang1TopicIT}.  
                        Inizia la realizzazione con "<h3>Gestione</h3>" seguito da "<h4>Ruoli dei dipendenti</h4>"
                        genera tutto in italiano
                        Questo è il ${mang1TopicIT} lungo, dettagliato e approfondito che hai elaborato:`,
    nl: `
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
                        gebruik 1500 tokens om ${mang1TopicNL} te genereren.  
                        Begin de voltooiing met "<h3>Management</h3>" gevolgd door "<h4>Werknemersrollen</h4>"
                        Genereer alles in het Nederlands.
                        Dit is het lange, gedetailleerde en uitgebreide ${mang1TopicNL} dat je hebt bedacht:
                        `,
    ja: `
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
                        ${mang1TopicJA}を生成するために1500トークンを使用します。
                        完成を"<h3>経営</h3>"で始め、その後に"<h4>従業員の役割</h4>"を続けます。
                        すべてを日本語で生成します。
                        これがあなたが考え出した長く、詳細で、長い${mang1TopicJA}です：
                        `,
    ar: `
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
                        استخدم 1500 رمز لتوليد ${mang1TopicAR}.  
                        ابدأ الإكمال بـ "<h3>الإدارة</h3>" تليها "<h4>أدوار الموظفين</h4>"
                        أنشئ كل شيء باللغة العربية.
                        هذا هو ${mang1TopicAR} الطويل والمفصل والمطول الذي ابتكرته:
                        `,
    sv: `
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
                        använd 1500 tokens för att generera ${mang1TopicSV}.  
                        Börja utfyllnaden med "<h3>Ledning</h3>" följt av "<h4>Anställdas roller</h4>"
                        Generera allt på svenska.
                        Detta är den långa, detaljerade och omfattande ${mang1TopicSV} du kom på:
                        `,
    fi: `
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
                        käytä 1500 merkkiä generoimaan ${mang1TopicFI}.  
                        Aloita täydennys "<h3>Johto</h3>" seuraa "<h4>Työntekijöiden roolit</h4>"
                        Generoi kaikki suomeksi.
                        Tämä on pitkä, yksityiskohtainen ja laaja ${mang1TopicFI}, jonka keksit:
                        `,
    da: `
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
                        brug 1500 tokens til at generere ${mang1TopicDA}.  
                        Begynd udfyldningen med "<h3>Ledelse</h3>" efterfulgt af "<h4>Medarbejderroller</h4>"
                        Generer alt på dansk.
                        Dette er den lange, detaljerede og omfattende ${mang1TopicDA} du kom op med:
                        `,
    no: `
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
                        bruk 1500 tokens for å generere ${mang1TopicNO}.  
                        Begynn utfyllingen med "<h3>Ledelse</h3>" etterfulgt av "<h4>Ansatte Roller</h4>"
                        Generer alt på norsk.
                        Dette er den lange, detaljerte og omfattende ${mang1TopicNO} du kom opp med:
                        `,
  };

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

  // const payload = {
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: promptTemplates[planLanguage] }],
  //   temperature: 0.5,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 1500,
  //   stream: true,
  //   n: 1,
  // };
  // return OpenAIStream(payload);
};
