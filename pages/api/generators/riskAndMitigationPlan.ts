import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IRiskAndMitigationPlan {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;

  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
  modelName?: string;
}

// api11Risk1.ts
export const riskAndMitigationPlan = (request: IRiskAndMitigationPlan) => {
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

  const risk1TopicEN = 'Risk and Mitigation Plan';
  const risk1TopicDE = 'Risiko- und Risikominderungsplan';
  const risk1TopicFR = "Plan de risque et d'atténuation";
  const risk1TopicES = 'Plan de riesgos y mitigación';
  const risk1TopicIT = 'Piano di rischio e mitigazione';
  const risk1TopicNL = 'Risico- en mitigatieplan';
  const risk1TopicJA = 'リスクと緩和計画';
  const risk1TopicAR = 'خطة المخاطر والتخفيف';
  const risk1TopicSV = 'Risk- och lindringsplan';
  const risk1TopicFI = 'Riski- ja lievityssuunnitelma';
  const risk1TopicDA = 'Risiko- og lindringplan';
  const risk1TopicNO = 'Risiko- og lindringsplan';

  const promptTemplates = {
    en: `
        You are a professional consultant, and a customer approaches you to write a long and detailed ${risk1TopicEN} for a business plan.

        business details:
        business detail 1: The client's business name is ${businessName}.
        business detail 2: The type of business is ${businessType}. 
        business detail 3: This is where the business's customers are: ${location}.
        business detail 4: This is the number of employees for this business: ${NEmployee}
        business detail 5: The client's distribution channel is: ${salesChannel}.
        business detail 6: The client's business operational status is ${businessOperationalStatus}.

        These are details of the client's products or services:
        ${productInfoPrompt}

        for the ${risk1TopicEN}, you should come up with key risks for the business as well as its corresponding mitigation action. surround each risk and mitigation with <li> tag. be descriptive when describing the ${risk1TopicEN}. Only come up with 5 of the most impactful risks and be descriptive when describing both the risk and mitigation for each pairs.
        
        Do not repeat business details.
        Begin the completion with "<h3>Risk and Mitigation</h3>"
        Write this as if you are the owner of the business, using "we" don't use "I".
    Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
        Generate everything in English.
        This is important: Be very insightful in your response.
        This is the long, detailed, and insightful ${risk1TopicEN} you came up with:
        `,
    'en-uk': `
        You are a professional consultant, and a customer approaches you to write a long and detailed ${risk1TopicEN} for a business plan.

        business details:
        business detail 1: The client's business name is ${businessName}.
        business detail 2: The type of business is ${businessType}. 
        business detail 3: This is where the business's customers are: ${location}.
        business detail 4: This is the number of employees for this business: ${NEmployee}
        business detail 5: The client's distribution channel is: ${salesChannel}.
        business detail 6: The client's business operational status is ${businessOperationalStatus}.

        These are details of the client's products or services:
        ${productInfoPrompt}

        for the ${risk1TopicEN}, you should come up with key risks for the business as well as its corresponding mitigation action. surround each risk and mitigation with <li> tag. be descriptive when describing the ${risk1TopicEN}. Only come up with 5 of the most impactful risks and be descriptive when describing both the risk and mitigation for each pairs.
        
        Do not repeat business details.
        Begin the completion with "<h3>Risk and Mitigation</h3>"
        Write this as if you are the owner of the business, using "we" don't use "I".
    Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
        Generate everything in English.
        use british english spelling and grammar
        This is important: Be very insightful in your response.
        This is the long, detailed, and insightful ${risk1TopicEN} you came up with:
        `,
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${risk1TopicDE} für einen Geschäftsplan zu verfassen.

                Geschäftsdaten:
                Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
                Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
                Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
                Geschäftsdetail 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
                Geschäftsdetail 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
                Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.
            
                Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
                ${productInfoPrompt}
            
                Für ${risk1TopicDE} sollten Sie die wichtigsten Risiken für das Unternehmen sowie die entsprechenden Abhilfemaßnahmen ermitteln. Umgeben Sie jedes Risiko und jede Schadensbegrenzung mit dem <li>-Tag. Seien Sie beschreibend, wenn Sie das ${risk1TopicDE} beschreiben. Nennen Sie nur die fünf Risiken mit der größten Auswirkung und beschreiben Sie sowohl das Risiko als auch die Schadensbegrenzung für jedes Paar genau.
            
                Wiederholen Sie keine Geschäftsdetails.
                Beginnen Sie den Abschluss mit „<h3>Risiko und Schadensbegrenzung</h3>“
                Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
                Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
Fertigstellung auf Deutsch generieren.
            
                Dies ist das lange, detaillierte ${risk1TopicDE}, das Sie erstellt haben:`,
    fr: `Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${risk1TopicFR} long et détaillé pour un plan d'affaires.

                Détails de l'entreprise :
                Détail de l'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
                Détail de l'entreprise 2 : Le type d'entreprise est ${businessType}.
                Détail de l'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
                Détail de l'entreprise 4 : Voici le nombre d'employés de cette entreprise : ${NEmployee}
                Détail de l'entreprise 5 : Le canal de distribution du client est : ${salesChannel}.
                Détail de l'entreprise 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
            
                Voici les détails des produits ou services du client :
                ${productInfoPrompt}
            
                Pour le ${risk1TopicFR}, vous devriez identifier les risques clés pour l'entreprise ainsi que les actions d'atténuation correspondantes. Entourez chaque risque et atténuation avec la balise <li>. Soyez descriptif lorsque vous décrivez le ${risk1TopicFR}. Ne proposez que les 5 risques les plus impactants et soyez descriptif lorsque vous décrivez à la fois le risque et l'atténuation pour chaque paire.
                
                Ne répétez pas les détails de l'entreprise.
                Commencez la réalisation avec "<h3>Risque et Atténuation</h3>"
                Rédigez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
                Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
génère tout en français
                Voici le ${risk1TopicFR} long et détaillé que vous avez élaboré :`,
    es: `Eres un consultor profesional y un cliente se acerca a ti para escribir un ${risk1TopicES} largo y detallado para un plan de negocios.

                Detalles del negocio:
                Detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
                Detalle del negocio 2: El tipo de negocio es ${businessType}. 
                Detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
                Detalle del negocio 4: Este es el número de empleados para este negocio: ${NEmployee}
                Detalle del negocio 5: El canal de distribución del cliente es: ${salesChannel}.
                Detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
            
                Estos son los detalles de los productos o servicios del cliente:
                ${productInfoPrompt}
            
                para el ${risk1TopicES}, debes identificar los riesgos clave para el negocio así como su acción de mitigación correspondiente. rodea cada riesgo y mitigación con la etiqueta <li>. sé descriptivo al describir el ${risk1TopicES}. Solo identifica los 5 riesgos más impactantes y sé descriptivo al describir tanto el riesgo como la mitigación para cada par.
                
                No repitas los detalles del negocio.
                Comienza la realización con "<h3>Riesgo y Mitigación</h3>"
                Escribe esto como si fueras el dueño del negocio, usando "nosotros" no uses "yo".
                Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
genera todo en español
                Este es el ${risk1TopicES} largo y detallado que has elaborado:`,
    it: `Sei un consulente professionista e un cliente si avvicina a te per scrivere un ${risk1TopicIT} lungo e dettagliato per un piano aziendale.

                dettagli dell'azienda:
                dettaglio dell'azienda 1: Il nome dell'azienda del cliente è ${businessName}.
                dettaglio dell'azienda 2: Il tipo di azienda è ${businessType}. 
                dettaglio dell'azienda 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
                dettaglio dell'azienda 4: Questo è il numero di dipendenti per questa azienda: ${NEmployee}
                dettaglio dell'azienda 5: Il canale di distribuzione del cliente è: ${salesChannel}.
                dettaglio dell'azienda 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
            
                Questi sono i dettagli dei prodotti o servizi del cliente:
                ${productInfoPrompt}
            
                per il ${risk1TopicIT}, dovresti identificare i rischi chiave per l'azienda e le relative azioni di mitigazione. circonda ogni rischio e mitigazione con il tag <li>. sii descrittivo quando descrivi il ${risk1TopicIT}. Identifica solo i 5 rischi più impattanti e sii descrittivo quando descrivi sia il rischio che la mitigazione per ogni coppia.
                
                Non ripetere i dettagli dell'azienda.
                Inizia la realizzazione con "<h3>Rischio e Mitigazione</h3>"
                Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
                Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
genera tutto in italiano
                Questo è il ${risk1TopicIT} lungo e dettagliato che hai elaborato:`,
    nl: `
                Je bent een professionele consultant en een klant benadert je om een lang en gedetailleerd ${risk1TopicNL} te schrijven voor een bedrijfsplan.
            
                bedrijfsdetails:
                bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
                bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
                bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
                bedrijfsdetail 4: Dit is het aantal werknemers voor dit bedrijf: ${NEmployee}
                bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
                bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
            
                Dit zijn de details van de producten of diensten van de klant:
                ${productInfoPrompt}
            
                voor het ${risk1TopicNL}, moet je de belangrijkste risico's voor het bedrijf en de bijbehorende mitigatieactie bedenken. omring elk risico en mitigatie met de <li> tag. wees beschrijvend bij het beschrijven van het ${risk1TopicNL}. Bedenk alleen de 5 meest impactvolle risico's en wees beschrijvend bij het beschrijven van zowel het risico als de mitigatie voor elk paar.
                
                Herhaal de bedrijfsdetails niet.
                Begin de voltooiing met "<h3>Risico en Mitigatie</h3>"
                Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
                Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
                Genereer alles in het Nederlands.
                Dit is het lange, gedetailleerde ${risk1TopicNL} dat je hebt bedacht:
                `,
    ja: `
                あなたはプロのコンサルタントで、顧客がビジネスプランのための詳細で長い${risk1TopicJA}を書くようにあなたに依頼してきました。
            
                ビジネスの詳細:
                ビジネス詳細1: クライアントのビジネス名は${businessName}です。
                ビジネス詳細2: ビジネスのタイプは${businessType}です。
                ビジネス詳細3: ビジネスの顧客がいる場所は${location}です。
                ビジネス詳細4: このビジネスの従業員数は${NEmployee}です。
                ビジネス詳細5: クライアントの流通チャネルは${salesChannel}です。
                ビジネス詳細6: クライアントのビジネス運営状況は${businessOperationalStatus}です。
            
                これらはクライアントの製品またはサービスの詳細です:
                ${productInfoPrompt}
            
                ${risk1TopicJA}のために、ビジネスの主要なリスクとそれに対応する緩和策を考え出すべきです。各リスクと緩和策を<li>タグで囲みます。${risk1TopicJA}を説明するときは詳細に説明してください。最も影響力のある5つのリスクだけを考え出し、各ペアのリスクと緩和策を説明するときは詳細に説明してください。
                
                ビジネスの詳細を繰り返さないでください。
                完成を"<h3>リスクと緩和</h3>"で始めてください。
                これをビジネスのオーナーであるかのように書き、"we"を使用し、"I"を使用しないでください。
                HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
すべてを日本語で生成します。
                これがあなたが考え出した長く、詳細な${risk1TopicJA}です:
                `,
    ar: `
                أنت مستشار محترف، ويقترب منك عميل لكتابة ${risk1TopicAR} طويلة ومفصلة لخطة عمل.
            
                تفاصيل العمل:
                تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
                تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
                تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
                تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
                تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
                تفاصيل العمل 6: حالة تشغيل العمل للعميل هي ${businessOperationalStatus}.
            
                هذه هي تفاصيل المنتجات أو الخدمات للعميل:
                ${productInfoPrompt}
            
                بالنسبة لـ ${risk1TopicAR}، يجب أن تقوم بتقديم الأخطار الرئيسية للعمل وكذلك خطة التخفيف المقابلة. قم بتضمين كل خطر وتخفيف بوسم <li>. كن واضحاً عند وصف ${risk1TopicAR}. قم فقط بتقديم 5 من أكثر الأخطار تأثيراً وكن واضحاً عند وصف كل من الخطر والتخفيف لكل زوج.
                
                لا تكرر تفاصيل العمل.
                ابدأ الإكمال بـ "<h3>المخاطر والتخفيف</h3>"
                اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" وليس "أنا".
                استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
أنشئ كل شيء باللغة العربية
                هذا هو ${risk1TopicAR} الطويل والمفصل الذي ابتكرته:
                `,
    sv: `
                Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${risk1TopicSV} för en affärsplan.
            
                Affärsdetaljer:
                Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
                Affärsdetalj 2: Typen av verksamhet är ${businessType}. 
                Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
                Affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
                Affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
                Affärsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.
            
                Dessa är detaljer om kundens produkter eller tjänster:
                ${productInfoPrompt}
            
                för ${risk1TopicSV}, bör du komma med nyckelrisker för företaget samt dess motsvarande åtgärder för att mildra dessa. omge varje risk och mildring med <li> tagg. var beskrivande när du beskriver ${risk1TopicSV}. Kom bara med 5 av de mest påverkande riskerna och var beskrivande när du beskriver både risken och mildringen för varje par.
                
                Upprepa inte affärsdetaljer.
                Börja utfyllnaden med "<h3>Risk och Mildring</h3>"
                Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
                Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
Generera allt på svenska.
                Detta är den långa, detaljerade ${risk1TopicSV} du kom upp med:
                `,
    fi: `
                Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${risk1TopicFI} liiketoimintasuunnitelmaan.
            
                liiketoiminnan tiedot:
                liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
                liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}. 
                liiketoiminnan tieto 3: Tässä on yrityksen asiakkaat: ${location}.
                liiketoiminnan tieto 4: Tämä on yrityksen työntekijöiden määrä: ${NEmployee}
                liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
                liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.
            
                Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
                ${productInfoPrompt}
            
                ${risk1TopicFI} osalta sinun tulisi keksiä yrityksen keskeiset riskit sekä niitä vastaavat lieventävät toimenpiteet. ympäröi jokainen riski ja lievennys <li> tagilla. ole kuvaileva kuvatessasi ${risk1TopicFI}. Keksi vain 5 vaikuttavinta riskiä ja ole kuvaileva kuvatessasi sekä riskiä että lievennystä kullekin parille.
                
                Älä toista liiketoiminnan tietoja.
                Aloita täydennys "<h3>Riski ja lievennys</h3>"
                Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
                Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
Generoi kaikki suomeksi.
                Tämä on pitkä, yksityiskohtainen ${risk1TopicFI}, jonka keksit:
                `,
    da: `
                Du er en professionel konsulent, og en kunde nærmer dig for at skrive en lang og detaljeret ${risk1TopicDA} til en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalje 1: Kundens firmanavn er ${businessName}.
                forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
                forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
                forretningsdetalje 4: Dette er antallet af ansatte i denne virksomhed: ${NEmployee}
                forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
                forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.
            
                Dette er detaljer om kundens produkter eller tjenester:
                ${productInfoPrompt}
            
                for ${risk1TopicDA}, skal du komme med nøglerisici for virksomheden samt dens tilsvarende afbødningshandlinger. omgiv hver risiko og afbødning med <li> tag. vær beskrivende når du beskriver ${risk1TopicDA}. Kom kun med 5 af de mest indflydelsesrige risici og vær beskrivende når du beskriver både risikoen og afbødningen for hvert par.
                
                Gentag ikke forretningsdetaljer.
                Begynd udfyldningen med "<h3>Risiko og Afbødning</h3>"
                Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke brug "jeg".
                Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
Generer alt på dansk.
                Dette er den lange, detaljerede ${risk1TopicDA} du kom op med:
                `,
    no: `
                Du er en profesjonell konsulent, og en kunde nærmer deg for å skrive en lang og detaljert ${risk1TopicNO} for en forretningsplan.
            
                forretningsdetaljer:
                forretningsdetalj 1: Kundens firmanavn er ${businessName}.
                forretningsdetalj 2: Typen virksomhet er ${businessType}. 
                forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
                forretningsdetalj 4: Dette er antall ansatte for denne virksomheten: ${NEmployee}
                forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
                forretningsdetalj 6: Kundens virksomhetsstatus er ${businessOperationalStatus}.
            
                Dette er detaljer om kundens produkter eller tjenester:
                ${productInfoPrompt}
            
                for ${risk1TopicNO}, du bør komme opp med nøkkelrisikoer for virksomheten samt dens tilsvarende tiltak for å redusere risikoen. omgir hver risiko og reduksjon med <li> tag. vær beskrivende når du beskriver ${risk1TopicNO}. Kom bare opp med 5 av de mest innflytelsesrike risikoene og vær beskrivende når du beskriver både risikoen og reduksjonen for hvert par.
                
                Ikke gjenta forretningsdetaljer.
                Begynn utfyllingen med "<h3>Risiko og reduksjon</h3>"
                Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
                Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
Generer alt på norsk.
                Dette er den lange, detaljerte ${risk1TopicNO} du kom opp med:
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
