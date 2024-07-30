import { OpenAIStream } from '../../../../../utils/OpenAIChatStream';

interface IRecruitmentAndTrainingAndCSRPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;
  mang1Ref: string;
  planQuota: number;
  planLanguage: string;
  variantID: string;
}
export const recruitmentAndTrainingAndCSRPro = async (
  req: IRecruitmentAndTrainingAndCSRPro,
) => {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,
    mang1Ref,
    planLanguage,
    planQuota,
    variantID,
  } = req;

  // get text that starts with <h4>Employee Roster</h4> from mang1Ref and include <h4>Employee Roster</h4>
  const mang1RefText = mang1Ref.split('<h4>Employee Roster</h4>')[1];
  const promptTopic = {
    en: 'Recruitment, Training and Development, and CSR Policy',
    de: 'Rekrutierung, Ausbildung und Entwicklung sowie CSR-Politik',
    fr: 'Recrutement, formation et développement et politique RSE',
    es: 'Reclutamiento, capacitación y desarrollo y política de RSE',
    it: 'Reclutamento, formazione e sviluppo e politica RSE',
    nl: 'Werving, training en ontwikkeling en CSR-beleid',
    ja: '採用、研修・育成、CSR政策',
    ar: 'التوظيف والتدريب والتطوير وسياسة المسؤولية الاجتماعية للشركات',
    sv: 'Rekrytering, utbildning och utveckling samt CSR-policy',
    fi: 'Rekrytointi, koulutus ja kehitys sekä yritysvastuupolitiikka',
    da: 'Rekruttering, uddannelse og udvikling samt CSR-politik',
    no: 'Rekruttering, opplæring og utvikling og CSR-politikk',
  };

  const prompt = {
    'en-uk': `You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.
    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    This is the client's employee roster, use it when you write the ${promptTopic.en}: 
    ${mang1RefText}

    for Recruitment topic, come up with a recruitment plan for the client's business.

    for Training and Development topic, come up with a training and development plan for the client's business.

    for CSR Policy topic, come up with a CSR policy for the client's business. include only 2 short paragraphs for CSR Policy topic.

    Use multiple <p> tags when writing the content.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    Begin the completion with "<h4>Recruitment</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `You are a professional consultant, and a customer approaches you to write a long and detailed ${promptTopic.en} for a business plan.
    business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is: ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: This is the number of employees for this business: ${NEmployee}
    business detail 5: The client's distribution channel is: ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    This is the client's employee roster, use it when you write the ${promptTopic.en}: 
    ${mang1RefText}

    for Recruitment topic, come up with a recruitment plan for the client's business.

    for Training and Development topic, come up with a training and development plan for the client's business.

    for CSR Policy topic, come up with a CSR policy for the client's business. include only 2 short paragraphs for CSR Policy topic.

    Use multiple <p> tags when writing the content.
    Don't write conclusion paragraph at the end.

    Do not repeat business details.
    Begin the completion with "<h4>Recruitment</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang ------------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Businessplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist: ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies ist die Mitarbeiterliste des Kunden. Verwenden Sie sie, wenn Sie ${promptTopic.de} schreiben:
    ${mang1RefText}

    Erstellen Sie für das Thema „Rekrutierung“ einen Rekrutierungsplan für das Unternehmen des Kunden.

    Erstellen Sie für das Thema Schulung und Entwicklung einen Schulungs- und Entwicklungsplan für das Unternehmen des Kunden.

    Erstellen Sie für das Thema „CSR-Richtlinie“ eine CSR-Richtlinie für das Unternehmen des Kunden. Fügen Sie nur zwei kurze Absätze zum Thema der CSR-Richtlinie ein.

    Verwenden Sie beim Schreiben des Inhalts mehrere <p>-Tags.
    Schreiben Sie am Ende keinen Schlussabsatz.

    Wiederholen Sie keine Geschäftsdetails.
    Beginnen Sie den Abschluss mit „<h4>Rekrutierung</h4>“
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    //french lang ------------------------------------------------------------------------

    fr: `
    Vous êtes un consultant professionnel, et un client vous approche pour écrire un ${promptTopic.fr} long et détaillé pour un plan d'affaires.

    détails de l'entreprise:
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est : ${businessType}.
    détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    détail commercial 4 : Voici le nombre d'employés pour cette entreprise : ${NEmployee}.
    détail commercial 5 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici la liste des employés du client, utilisez-la lorsque vous rédigez le ${promptTopic.fr} :
    ${mang1RefText}

    pour le sujet du Recrutement, proposez un plan de recrutement pour l'entreprise du client.

    pour le sujet Formation et Développement, élaborez un plan de formation et de développement pour l'entreprise du client.

    pour le sujet Politique RSE, proposez une politique RSE pour l'entreprise du client. incluez seulement 2 courts paragraphes pour le sujet de la Politique RSE.

    Utilisez plusieurs balises <p> lors de la rédaction du contenu.
    Ne rédigez pas de paragraphe de conclusion à la fin.

    Ne répétez pas les détails commerciaux.
    Commencez la rédaction par "<h4>Recrutement</h4>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
générez tout en français.
    C’est important : Soyez très perspicace dans votre réponse.
    Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang ------------------------------------------------------------------------

    es: `
    Usted es un consultor profesional, y un cliente se acerca a usted para escribir un ${promptTopic.es} largo y detallado para un plan de negocio.

    detalles del negocio:
    detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle de negocio 2: El tipo de negocio es: ${businessType}.
    detalle de negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle de negocio 4: Este es el número de empleados para este negocio: ${NEmployee}.
    detalle de negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    detalle de negocio 6: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Esta es la lista de empleados del cliente, úsela cuando escriba el ${promptTopic.es}:
    ${mang1RefText}

    para el tema de Reclutamiento, elabore un plan de reclutamiento para el negocio del cliente.

    para el tema de Formación y Desarrollo, elabore un plan de formación y desarrollo para el negocio del cliente.

    para el tema de Política de RSC, elabore una política de RSC para el negocio del cliente. Incluya solo 2 párrafos cortos para el tema de la Política de RSC.

    Utilice múltiples etiquetas <p> al escribir el contenido.
    No escriba un párrafo de conclusión al final.

    No repita los detalles del negocio.
    Comience la redacción con "<h4>Reclutamiento</h4>"
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
    Genere todo en español.
    Esto es importante: Sea muy perspicaz en su respuesta.
    Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang ------------------------------------------------------------------------
    it: `
    Sei un consulente professionale e un cliente ti avvicina per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale.

    dettagli aziendali:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è: ${businessType}.
    dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questa è la lista dei dipendenti del cliente, usala quando scrivi il ${promptTopic.it}:
    ${mang1RefText}

    per il tema Reclutamento, sviluppa un piano di reclutamento per l'azienda del cliente.

    per il tema Formazione e Sviluppo, sviluppa un piano di formazione e sviluppo per l'azienda del cliente.

    per il tema Politica CSR, sviluppa una politica CSR per l'azienda del cliente. Includi solo 2 paragrafi brevi per il tema della Politica CSR.

    Utilizza più tag <p> nel scrivere il contenuto.
    Non scrivere un paragrafo conclusivo alla fine.

    Non ripetere i dettagli aziendali.
    Inizia la stesura con "<h4>Reclutamento</h4>"
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
Genera tutto in italiano.
Questo è importante: Sii molto perspicace nella tua risposta.
Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    // dutch lang ------------------------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om een lang en gedetailleerd ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    bedrijfsdetails:
    bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is: ${businessType}. 
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
    bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit is de werknemerslijst van de klant, gebruik deze bij het schrijven van het ${promptTopic.nl}: 
    ${mang1RefText}

    voor het onderwerp Werving, bedenk een wervingsplan voor het bedrijf van de klant.

    voor het onderwerp Training en Ontwikkeling, bedenk een trainings- en ontwikkelingsplan voor het bedrijf van de klant.

    voor het onderwerp CSR-beleid, bedenk een CSR-beleid voor het bedrijf van de klant. Inclusief slechts 2 korte paragrafen voor het onderwerp CSR-beleid.

    Gebruik meerdere <p> tags bij het schrijven van de inhoud.
    Schrijf geen conclusieparagraaf aan het einde.

    Herhaal de bedrijfsdetails niet.
    Begin de voltooiing met "<h4>Werving</h4>"
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang ------------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${promptTopic.ja}を書くようにあなたに依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：このビジネスの従業員数は${NEmployee}です。
    ビジネス詳細5：クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これがクライアントの従業員名簿で、${promptTopic.ja}を書くときに使用してください：
    ${mang1RefText}

    採用のトピックについては、クライアントのビジネスのための採用計画を考えてください。

    研修・育成のトピックについては、クライアントのビジネスのための研修・育成計画を考えてください。

    CSR政策のトピックについては、クライアントのビジネスのためのCSR政策を考えてください。CSR政策のトピックには2つの短いパラグラフのみを含めてください。

    コンテンツを書くときは複数の<p>タグを使用してください。
    最後に結論のパラグラフを書かないでください。

    ビジネスの詳細を繰り返さないでください。
    完成を"<h4>採用</h4>"で始めてください。
HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang ------------------------------------------------------------------------

    ar: `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 6: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.

    هذه هي قائمة الموظفين للعميل، استخدمها عند كتابة ${promptTopic.ar}: 
    ${mang1RefText}

    بالنسبة لموضوع التوظيف، ابتكر خطة توظيف لعمل العميل.

    بالنسبة لموضوع التدريب والتطوير، ابتكر خطة تدريب وتطوير لعمل العميل.

    بالنسبة لموضوع سياسة المسؤولية الاجتماعية للشركات، ابتكر سياسة المسؤولية الاجتماعية للشركات لعمل العميل. اشمل فقط فقرتين قصيرتين لموضوع سياسة المسؤولية الاجتماعية للشركات.

    استخدم علامات <p> متعددة عند كتابة المحتوى.
    لا تكتب فقرة الخاتمة في النهاية.

    لا تكرر تفاصيل العمل.
    ابدأ الإكمال بـ "<h4>التوظيف</h4>"
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن بليغًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    //swedish lang ------------------------------------------------------------------------
    sv: `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan.

    affärsdetaljer:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typ av verksamhet är: ${businessType}. 
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.

    Detta är kundens anställningslista, använd den när du skriver ${promptTopic.sv}: 
    ${mang1RefText}

    för Rekrytering ämne, kom med en rekryteringsplan för kundens företag.

    för Utbildning och utveckling ämne, kom med en utbildnings- och utvecklingsplan för kundens företag.

    för CSR-policy ämne, kom med en CSR-policy för kundens företag. inkludera endast 2 korta stycken för CSR-policy ämne.

    Använd flera <p> taggar när du skriver innehållet.
    Skriv inte slutsatsparagrafen i slutet.

    Upprepa inte affärsdetaljer.
    Börja slutförandet med "<h4>Rekrytering</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang ------------------------------------------------------------------------

    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on: ${businessType}. 
    liiketoiminnan tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Tämä on yrityksen työntekijöiden määrä: ${NEmployee}
    liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Tämä on asiakkaan työntekijäluettelo, käytä sitä kun kirjoitat ${promptTopic.fi}: 
    ${mang1RefText}

    Rekrytointi-aiheelle, keksi rekrytointisuunnitelma asiakkaan yritykselle.

    Koulutus ja kehitys -aiheelle, keksi koulutus- ja kehityssuunnitelma asiakkaan yritykselle.

    Yritysvastuupolitiikka-aiheelle, keksi yritysvastuupolitiikka asiakkaan yritykselle. sisällytä vain 2 lyhyttä kappaletta yritysvastuupolitiikka-aiheeseen.

    Käytä useita <p> -tageja kirjoittaessasi sisältöä.
    Älä kirjoita lopetuskohtaa lopussa.

    Älä toista liiketoiminnan tietoja.
    Aloita täydennys "<h4>Rekrytointi</h4>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    //danish lang ------------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${promptTopic.da} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er: ${businessType}. 
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er kundens medarbejderoversigt, brug det når du skriver ${promptTopic.da}: 
    ${mang1RefText}

    for Rekruttering emne, kom med en rekrutteringsplan for kundens virksomhed.

    for Uddannelse og udvikling emne, kom med en uddannelses- og udviklingsplan for kundens virksomhed.

    for CSR-politik emne, kom med en CSR-politik for kundens virksomhed. inkluder kun 2 korte afsnit for CSR-politik emne.

    Brug flere <p> tags når du skriver indholdet.
    Skriv ikke konklusionsafsnittet i slutningen.

    Gentag ikke forretningsdetaljer.
    Begynd udfyldelsen med "<h4>Rekruttering</h4>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    // norwegian lang ------------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er: ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Dette er antallet av ansatte for denne virksomheten: ${NEmployee}
    forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 6: Kundens virksomhets operasjonelle status er ${businessOperationalStatus}.

    Dette er kundens ansattoversikt, bruk det når du skriver ${promptTopic.no}: 
    ${mang1RefText}

    for Rekruttering emne, kom med en rekrutteringsplan for kundens virksomhet.

    for Opplæring og utvikling emne, kom med en opplærings- og utviklingsplan for kundens virksomhet.

    for CSR-politikk emne, kom med en CSR-politikk for kundens virksomhet. inkluder kun 2 korte avsnitt for CSR-politikk emne.

    Bruk flere <p> tags når du skriver innholdet.
    Skriv ikke konklusjonsavsnittet i slutten.

    Gjenta ikke forretningsdetaljer.
    Begynn utfyllingen med "<h4>Rekruttering</h4>"
Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
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

const model = variantID === '2' ? 'gpt-4o' : modelPlanQuota;
console.log('final model:', model);

const payload = {
  model: model,
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
