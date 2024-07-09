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
export default async function api17Risk1Pro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

    customerType,

    customerIncome1,
    customerIncome2,
    customerIncome3,

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

  console.log('planQuota: ', planQuota);

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

  const risk1TopicEN = 'Risk and Mitigation Plan';
  const risk1PromptEN = `
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
    use 600 words to generate ${risk1TopicEN}.  
    Begin the completion with "<h3>Risk and Mitigation</h3>"
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed ${risk1TopicEN} you came up with:
    `;

  //german lang ----------------------------------------------------------------------------
  const risk1TopicDE = 'Risiko- und Risikominderungsplan';
  const risk1PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${risk1TopicDE} für einen Geschäftsplan zu verfassen.

    Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Dies ist die Anzahl der Mitarbeiter für dieses Unternehmen: ${NEmployee}
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist: ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Für ${risk1TopicDE} sollten Sie die wichtigsten Risiken für das Unternehmen sowie die entsprechenden Abhilfemaßnahmen ermitteln. Umgeben Sie jedes Risiko und jede Schadensbegrenzung mit dem <li>-Tag. Seien Sie beschreibend, wenn Sie das ${risk1TopicDE} beschreiben. Überlegen Sie sich nur die fünf Risiken mit den größten Auswirkungen und gehen Sie bei der Beschreibung des Risikos und der Risikominderung für jedes Paar aussagekräftig vor.
  
    Wiederholen Sie keine Geschäftsdetails.
    Verwenden Sie 600 Wörter, um ${risk1TopicDE} zu generieren.
    Beginnen Sie den Abschluss mit „<h3>Risk and Mitigation</h3>“
    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Fertigstellung auf Deutsch generieren.

    Dies ist das lange, detaillierte ${risk1TopicDE}, das Sie erstellt haben:`;

  //french lang ----------------------------------------------------------------------------
  const risk1TopicFR = "Plan de risque et d'atténuation";
  const risk1PromptFR = `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un long et détaillé ${risk1TopicFR} pour un plan d'affaires.

    détails de l'entreprise :
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est ${businessType}.
    détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    détail commercial 4 : Voici le nombre d'employés pour cette entreprise : ${NEmployee}
    détail commercial 5 : Le canal de distribution du client est : ${salesChannel}.
    détail commercial 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

    Voici les détails des produits ou services du client :
    ${productInfoPrompt}

    pour le ${risk1TopicFR}, vous devriez identifier les principaux risques pour l'entreprise ainsi que les actions d'atténuation correspondantes. entourez chaque risque et atténuation avec la balise <li>. soyez descriptif lorsque vous décrivez le ${risk1TopicFR}. Identifiez uniquement 5 des risques les plus impactants et soyez descriptif lors de la description des risques et des mesures d'atténuation pour chaque paire.

    Ne répétez pas les détails de l'entreprise.
    utilisez 600 mots pour générer ${risk1TopicFR}.
    Commencez la complétion par "<h3>Risque et Atténuation</h3>"
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".

    Voici le long et détaillé ${risk1TopicFR} que vous avez élaboré :
    `;

  //spanish lang ----------------------------------------------------------------------------
  const risk1TopicES = 'Plan de riesgo y mitigación';
  const risk1PromptES = `
    Usted es un consultor profesional y un cliente se acerca a usted para escribir un detallado y extenso ${risk1TopicES} para un plan de negocios.

    Detalles del negocio:
    Detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
    Detalle de negocio 2: El tipo de negocio es ${businessType}.
    Detalle de negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
    Detalle de negocio 4: Este es el número de empleados del negocio: ${NEmployee}.
    Detalle de negocio 5: El canal de distribución del cliente es: ${salesChannel}.
    Detalle de negocio 6: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

    Estos son detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    Para el ${risk1TopicES}, debería identificar los principales riesgos para el negocio, así como la acción de mitigación correspondiente. Rodee cada riesgo y mitigación con la etiqueta <li>. Sea descriptivo al describir el ${risk1TopicES}. Identifique solo 5 de los riesgos más impactantes y sea descriptivo al describir tanto el riesgo como la mitigación para cada par.

    No repita los detalles del negocio.
    Use 600 palabras para generar el ${risk1TopicES}.
    Comience la redacción con "<h3>Riesgo y Mitigación</h3>"
    Escriba esto como si usted fuera el dueño del negocio, utilizando "nosotros", no use "yo".

    Este es el detallado y extenso ${risk1TopicES} que ha elaborado:
    `;

  //italian lang ----------------------------------------------------------------------------
  const risk1TopicIT = 'Piano di rischio e mitigazione';
  const risk1PromptIT = `
    Siete un consulente professionale e un cliente vi si avvicina per scrivere un dettagliato e ampio ${risk1TopicIT} per un business plan.

    Dettagli aziendali:
    Dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    Dettaglio aziendale 2: Il tipo di attività è ${businessType}.
    Dettaglio aziendale 3: Qui si trovano i clienti dell'azienda: ${location}.
    Dettaglio aziendale 4: Questo è il numero di dipendenti dell'azienda: ${NEmployee}.
    Dettaglio aziendale 5: Il canale di distribuzione del cliente è: ${salesChannel}.
    Dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}

    Per il ${risk1TopicIT}, dovreste individuare i principali rischi per l'attività nonché le corrispondenti azioni di mitigazione. Includete ogni rischio e mitigazione all'interno del tag <li>. Siate descrittivi nel descrivere il ${risk1TopicIT}. Identificate solo i 5 rischi più impattanti ed elaborate dettagliatamente sia i rischi sia le mitigazioni per ogni coppia.

    Non ripetete i dettagli aziendali.
    Usate 600 parole per generare il ${risk1TopicIT}.
    Iniziate il testo con "<h3>Rischio e Mitigazione</h3>"
    Scrivete questo come se foste il proprietario dell'azienda, usando "noi" non "io".

    Questo è il ${risk1TopicIT} dettagliato e ampio che avete sviluppato:
    `;

  //dutch lang ----------------------------------------------------------------------------
  const risk1TopicNL = 'Risico- en mitigatieplan';
  const risk1PromptNL = `
    U bent een professionele consultant en een klant benadert u om een lange en gedetailleerde ${risk1TopicNL} te schrijven voor een bedrijfsplan.

    Bedrijfsdetails:
    Bedrijfsdetail 1: De naam van het bedrijf van de klant is ${businessName}.
    Bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    Bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    Bedrijfsdetail 4: Dit is het aantal werknemers van dit bedrijf: ${NEmployee}
    Bedrijfsdetail 5: Het distributiekanaal van de klant is: ${salesChannel}.
    Bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    Voor de ${risk1TopicNL}, moet u de belangrijkste risico's voor het bedrijf en de bijbehorende mitigatieactie bedenken. Omring elk risico en mitigatie met de <li> tag. Wees beschrijvend bij het beschrijven van de ${risk1TopicNL}. Bedenk alleen de 5 meest impactvolle risico's en wees beschrijvend bij het beschrijven van zowel het risico als de mitigatie voor elk paar.
    
    Herhaal de bedrijfsdetails niet.
    Gebruik 600 woorden om ${risk1TopicNL} te genereren.  
    Begin de voltooiing met "<h3>Risico en Mitigatie</h3>"
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer alles in het Nederlands.
    Dit is de lange, gedetailleerde ${risk1TopicNL} die u heeft bedacht:
    `;

  //japanese lang ----------------------------------------------------------------------------
  const risk1TopicJP = 'リスクと緩和計画';
  const risk1PromptJP = `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための長く詳細な${risk1TopicJP}を書くように依頼してきました。

    ビジネスの詳細：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスの種類は${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：このビジネスの従業員数は${NEmployee}です
    ビジネス詳細5：クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}

    ${risk1TopicJP}については、ビジネスの主要なリスクとそれに対応する緩和策を考え出すべきです。各リスクと緩和策を<li>タグで囲みます。${risk1TopicJP}を説明するときは詳細に説明してください。最も影響力のある5つのリスクだけを考え出し、各ペアのリスクと緩和策を詳細に説明してください。
    
    ビジネスの詳細を繰り返さないでください。
    ${risk1TopicJP}を生成するために600語を使用してください。
    完成を"<h3>リスクと緩和</h3>"で始めてください。
    これをビジネスのオーナーであるかのように書き、"we"を使用し、"I"を使用しないでください。
    すべてを日本語で生成してください。
    これがあなたが考え出した長く詳細な${risk1TopicJP}です：
    `;

  //arabic lang ----------------------------------------------------------------------------
  const risk1TopicAR = 'خطة المخاطر والتخفيف';
  const risk1PromptAR = `
    أنت مستشار محترف، ويقترب منك عميل لكتابة ${risk1TopicAR} طويل ومفصل لخطة عمل.

    تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو: ${businessType}. 
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه العمل: ${location}.
    تفاصيل العمل 4: هذا هو عدد الموظفين لهذا العمل: ${NEmployee}
    تفاصيل العمل 5: قناة التوزيع للعميل هي: ${salesChannel}.
    تفاصيل العمل 6: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي تفاصيل المنتجات أو الخدمات للعميل:
    ${productInfoPrompt}

    بالنسبة لـ ${risk1TopicAR}، يجب أن تقوم بتقديم الأخطار الرئيسية للعمل وكذلك الإجراءات المتبعة للتخفيف منها. قم بتضمين كل خطر وتخفيف بوسم <li>. كن واضحاً عند وصف ${risk1TopicAR}. قم فقط بتقديم 5 من أكثر الأخطار تأثيراً وكن واضحاً عند وصف كل من الخطر والتخفيف لكل زوج.
    
    لا تكرر تفاصيل العمل.
    استخدم 600 كلمة لتوليد ${risk1TopicAR}.  
    ابدأ الإكمال بـ "<h3>الخطر والتخفيف</h3>"
    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" وليس "أنا".
    قم بتوليد كل شيء باللغة العربية
    هذا هو ${risk1TopicAR} الطويل والمفصل الذي قمت بتقديمه:
    `;

  // swedish lang ----------------------------------------------------------------------------
  const risk1TopicSV = 'Risk- och lindringsplan';
  const risk1PromptSV = `
    Du är en professionell konsult och en kund närmar sig dig för att skriva en lång och detaljerad ${risk1TopicSV} för en affärsplan.

    Affärsdetaljer:
    Affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    Affärsdetalj 2: Typen av verksamhet är ${businessType}. 
    Affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    Affärsdetalj 4: Detta är antalet anställda för detta företag: ${NEmployee}
    Affärsdetalj 5: Kundens distributionskanal är: ${salesChannel}.
    Affärsdetalj 6: Kundens företagsoperativa status är ${businessOperationalStatus}.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}

    för ${risk1TopicSV}, bör du komma med nyckelrisker för företaget samt dess motsvarande åtgärder för att mildra dessa. omge varje risk och mildring med <li> tagg. var beskrivande när du beskriver ${risk1TopicSV}. Kom bara med 5 av de mest påverkande riskerna och var beskrivande när du beskriver både risken och mildringen för varje par.
    
    Upprepa inte affärsdetaljer.
    använd 600 ord för att generera ${risk1TopicSV}.  
    Börja slutförandet med "<h3>Risk och mildring</h3>"
    Skriv detta som om du är ägaren till företaget, använd "vi" inte "jag".
    Generera allt på svenska.
    Detta är den långa, detaljerade ${risk1TopicSV} du kom upp med:
    `;

  //finnish lang ----------------------------------------------------------------------------
  const risk1TopicFI = 'Riski- ja lievityssuunnitelma';
  const risk1PromptFI = `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan pitkän ja yksityiskohtaisen ${risk1TopicFI} liiketoimintasuunnitelmaan.

    liiketoiminnan tiedot:
    liiketoiminnan tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan tieto 2: Liiketoiminnan tyyppi on ${businessType}. 
    liiketoiminnan tieto 3: Tässä on yrityksen asiakkaat: ${location}.
    liiketoiminnan tieto 4: Tämä on tämän yrityksen työntekijöiden määrä: ${NEmployee}
    liiketoiminnan tieto 5: Asiakkaan jakelukanava on: ${salesChannel}.
    liiketoiminnan tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}

    ${risk1TopicFI} osalta sinun tulisi keksiä yrityksen keskeiset riskit sekä niitä vastaavat lieventävät toimenpiteet. ympäröi jokainen riski ja lievennys <li> tagilla. ole kuvaileva kuvatessasi ${risk1TopicFI}. Keksi vain 5 vaikutusvaltaisinta riskiä ja ole kuvaileva kuvatessasi sekä riskiä että lievennystä kullekin parille.
    
    Älä toista liiketoiminnan tietoja.
    käytä 600 sanaa generoidaksesi ${risk1TopicFI}.  
    Aloita täydennys "<h3>Riski ja lievennys</h3>"
    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Generoi kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ${risk1TopicFI}, jonka keksit:
    `;

  //danish lang ----------------------------------------------------------------------------
  const risk1TopicDA = 'Risiko- og lindringsplan';
  const risk1PromptDA = `
    Du er en professionel konsulent, og en kunde nærmer sig dig for at skrive en lang og detaljeret ${risk1TopicDA} til en forretningsplan.

    forretningsdetaljer:
    forretningsdetalje 1: Kundens firmanavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Dette er antallet af medarbejdere for denne virksomhed: ${NEmployee}
    forretningsdetalje 5: Kundens distributionskanal er: ${salesChannel}.
    forretningsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for ${risk1TopicDA}, skal du komme med nøglerisici for virksomheden samt dens tilsvarende afbødningshandlinger. omgiv hver risiko og afbødning med <li> tag. vær beskrivende når du beskriver ${risk1TopicDA}. Kom kun med 5 af de mest indflydelsesrige risici og vær beskrivende når du beskriver både risikoen og afbødningen for hvert par.
    
    Gentag ikke forretningsdetaljer.
    brug 600 ord til at generere ${risk1TopicDA}.  
    Begynd udfyldelsen med "<h3>Risiko og afbødning</h3>"
    Skriv dette som om du er ejeren af virksomheden, brug "vi" ikke "jeg".
    Generer alt på dansk.
    Dette er den lange, detaljerede ${risk1TopicDA} du kom op med:
    `;

  //norwegian lang ----------------------------------------------------------------------------
  const risk1TopicNO = 'Risiko- og lindringsplan';
  const risk1PromptNO = `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive en lang og detaljert ${risk1TopicNO} for en forretningsplan.

    forretningsdetaljer:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Dette er hvor virksomhetens kunder er: ${location}.
    forretningsdetalj 4: Dette er antall ansatte for denne virksomheten: ${NEmployee}
    forretningsdetalj 5: Kundens distribusjonskanal er: ${salesChannel}.
    forretningsdetalj 6: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.

    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}

    for ${risk1TopicNO}, bør du komme opp med nøkkelrisikoer for virksomheten samt dens tilsvarende avbøtende handling. omgir hver risiko og avbøtning med <li> tag. vær beskrivende når du beskriver ${risk1TopicNO}. Kom bare opp med 5 av de mest innflytelsesrike risikoene og vær beskrivende når du beskriver både risikoen og avbøtningen for hvert par.
    
    Gjenta ikke forretningsdetaljer.
    bruk 600 ord for å generere ${risk1TopicNO}.  
    Begynn utfyllingen med "<h3>Risiko og avbøtning</h3>"
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke "jeg".
    Generer alt på norsk.
    Dette er den lange, detaljerte ${risk1TopicNO} du kom opp med:
    `;

  //other lang ----------------------------------------------------------------------------
  const risk1TopicOther = 'Risk and Mitigation Plan';
  const risk1PromptOther = `
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
    use 600 words to generate ${risk1TopicEN}.  
    Begin the completion with "<h3>Risk and Mitigation</h3>"
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate everything in English.
    This is the long, detailed ${risk1TopicEN} you came up with:
    `;

  let risk1PromptFinal = '';

  if (planLanguage === 'en') {
    risk1PromptFinal = risk1PromptEN;
  } else if (planLanguage === 'de') {
    risk1PromptFinal = risk1PromptDE;
  } else if (planLanguage === 'fr') {
    risk1PromptFinal = risk1PromptFR;
  } else if (planLanguage === 'es') {
    risk1PromptFinal = risk1PromptES;
  } else if (planLanguage === 'it') {
    risk1PromptFinal = risk1PromptIT;
  } else if (planLanguage === 'nl') {
    risk1PromptFinal = risk1PromptNL;
  } else if (planLanguage === 'ja') {
    risk1PromptFinal = risk1PromptJP;
  } else if (planLanguage === 'ar') {
    risk1PromptFinal = risk1PromptAR;
  } else if (planLanguage === 'sv') {
    risk1PromptFinal = risk1PromptSV;
  } else if (planLanguage === 'fi') {
    risk1PromptFinal = risk1PromptFI;
  } else if (planLanguage === 'da') {
    risk1PromptFinal = risk1PromptDA;
  } else if (planLanguage === 'no') {
    risk1PromptFinal = risk1PromptNO;
  } else {
    risk1PromptFinal = risk1PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: risk1PromptFinal }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  return OpenAIStream(payload);
}
