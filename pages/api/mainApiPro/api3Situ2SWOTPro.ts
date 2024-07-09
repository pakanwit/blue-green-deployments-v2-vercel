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
export default async function api3Situ2SWOTPro(request, response) {
  const {
    businessOperationalStatus,
    businessName,
    businessType,
    NEmployee,
    location,
    salesChannel,

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

    generatedSitu1,

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

  const situ2TopicEN = 'SWOT Analysis';
  const situ2PromptEN = `
    You are a professional consultant, and a client approaches you to write a long and detailed ${situ2TopicEN} for a business plan. If the ${situ2TopicEN} is not long and detailed the client will be very upset.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees
    business detail 5: The client's distribution channel is ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}
    These are the weaknesses: ${weakness1}, ${weakness2}, ${weakness3}

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    use 500 words to generate this ${situ2TopicEN}.
    The ${situ2TopicEN} should include these topics: Strengths, Weaknesses, Opportunities, Threats. Don't include other topics unless specified here.
    Opportunities are external uncontrollable factors that can benefit the business not some marketing tactics that a business can do.

    Do not repeat the business details unless nessesary.
    only include 2 weaknesses and 2 threats and make them sound like its not dangerous and offer mitigating actions within the same <li> tag and be confident that you can resolve these issues. generate at least 5 strengths and 4 opportunities.
    be descriptive in each point.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding key topics with h5 tag.
    Surround each individual Strengths, Weaknesses, Opportunities, and Threats points with <ol> and <li> tag.
    Begin the completion with "<h4>${situ2TopicEN}</h4>"
    Generate everything in English.
    ${UKEngPrompt}
    This is the long, detailed, and lengthy ${situ2TopicEN} you came up with:
    `;

  //german lang --------------------------------------------------------------------------
  const situ2TopicDE = 'SWOT-Analyse';
  const situ2PromptDE = `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${situ2TopicDE} für einen Geschäftsplan zu verfassen. Wenn ${situ2TopicDE} nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
    Dies sind die Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Kunde wird ${NEmployee}-Mitarbeiter beschäftigen
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

    Dies sind die wichtigsten Erfolgsfaktoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Das sind die Schwächen: ${weakness1}, ${weakness2}, ${weakness3}

    Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}

    Dies sind weitere Anweisungen:
    Verwenden Sie 500 Wörter, um dieses ${situ2TopicDE} zu generieren.
    Das ${situ2TopicDE} sollte folgende Themen enthalten: Stärken, Schwächen, Chancen, Bedrohungen. Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
    Chancen sind externe unkontrollierbare Faktoren, die dem Unternehmen zugute kommen können, und nicht irgendwelche Marketingtaktiken, die ein Unternehmen anwenden kann.

    Wiederholen Sie die Geschäftsdetails nicht, es sei denn, dies ist unbedingt erforderlich.
    Schließen Sie nur zwei Schwachstellen und zwei Bedrohungen ein und lassen Sie sie so klingen, als seien sie nicht gefährlich. Bieten Sie Abhilfemaßnahmen innerhalb desselben <li>-Tags an und seien Sie zuversichtlich, dass Sie diese Probleme beheben können. Generieren Sie mindestens 5 Stärken und 4 Chancen.
    Seien Sie in jedem Punkt beschreibend.

    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Generieren Sie mit dem h5-Tag Antworten im HTML-Format zu wichtigen Themen.
    Umgeben Sie jeden einzelnen Stärken-, Schwächen-, Chancen- und Bedrohungspunkt mit den Tags <ol> und <li>.
    Beginnen Sie die Vervollständigung mit „<h4>${situ2TopicDE}</h4>“
    Fertigstellung auf Deutsch generieren.
    Dies ist das lange, detaillierte und ausführliche ${situ2TopicDE}, das Sie sich ausgedacht haben:
    `;

  //french lang --------------------------------------------------------------------------
  const situ2TopicFR = 'Analyse SWOT';
  const situ2PromptFR = `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${situ2TopicFR} long et détaillé pour un plan d'affaires. Si le ${situ2TopicFR} n'est pas long et détaillé, le client sera très mécontent.
  Voici les détails de l'entreprise :
  détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
  détail commercial 2 : Le type d'entreprise est ${businessType}.
  détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  détail commercial 4 : Le client emploiera ${NEmployee} employés.
  détail commercial 5 : Le canal de distribution du client est ${salesChannel}.
  détail commercial 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}
  Voici les faiblesses : ${weakness1}, ${weakness2}, ${weakness3}

  Détails des produits ou services du client :
  ${productInfoPrompt}

  Instructions supplémentaires :
  utilisez 500 mots pour générer ce ${situ2TopicFR}.
  Le ${situ2TopicFR} doit inclure ces sujets : Forces, Faiblesses, Opportunités, Menaces. Ne pas inclure d'autres sujets sauf si spécifié ici.
  Les opportunités sont des facteurs externes incontrôlables qui peuvent bénéficier à l'entreprise, pas des tactiques de marketing qu'une entreprise peut faire.

  Ne répétez pas les détails commerciaux sauf si nécessaire.
  incluez seulement 2 faiblesses et 2 menaces et faites-les paraître comme si elles n'étaient pas dangereuses et proposez des actions d'atténuation dans le même tag <li> et soyez confiant que vous pouvez résoudre ces problèmes. générez au moins 5 forces et 4 opportunités.
  soyez descriptif à chaque point.

  Écrivez comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".
  Générez une réponse en HTML entourant les sujets clés avec le tag h5.
  Entourez chaque point individuel de Forces, Faiblesses, Opportunités et Menaces avec les balises <ol> et <li>.
  Commencez la complétion avec "<h4>${situ2TopicFR}</h4>"
  Voici le ${situ2TopicFR} long, détaillé et complet que vous avez élaboré :
    `;

  //spanish lang --------------------------------------------------------------------------
  const situ2TopicES = 'Análisis DAFO';
  const situ2PromptES = `
    Usted es un consultor profesional y un cliente se acerca para que escriba un ${situ2TopicES} largo y detallado para un plan de negocios. Si el ${situ2TopicES} no es largo y detallado, el cliente estará muy molesto.
    Estos son los detalles del negocio:
    detalle de negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle de negocio 2: El tipo de negocio es ${businessType}.
    detalle de negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle de negocio 4: El cliente empleará a ${NEmployee} empleados.
    detalle de negocio 5: El canal de distribución del cliente es ${salesChannel}.
    detalle de negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.

    Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Estas son las debilidades: ${weakness1}, ${weakness2}, ${weakness3}

    Detalles de los productos o servicios del cliente:
    ${productInfoPrompt}

    Instrucciones adicionales:
    usa 500 palabras para generar este ${situ2TopicES}.
    El ${situ2TopicES} debe incluir estos temas: Fortalezas, Debilidades, Oportunidades, Amenazas. No incluyas otros temas a menos que se especifique aquí.
    Las oportunidades son factores externos incontrolables que pueden beneficiar al negocio, no son tácticas de marketing que un negocio pueda hacer.

    No repitas los detalles del negocio a menos que sea necesario.
    solo incluye 2 debilidades y 2 amenazas y haz que suenen como si no fueran peligrosas y ofrece acciones de mitigación dentro del mismo tag <li> y confía en que puedes resolver estos problemas. genera al menos 5 fortalezas y 4 oportunidades.
    sé descriptivo en cada punto.

    Escribe como si fueras el dueño del negocio, utilizando "nosotros" no uses "yo".
    Genera una respuesta en HTML rodeando los temas clave con el tag h5.
    Rodea cada punto individual de Fortalezas, Debilidades, Oportunidades y Amenazas con las etiquetas <ol> y <li>.
    Comienza la finalización con "<h4>${situ2TopicES}</h4>"
    Este es el ${situ2TopicES} largo, detallado y extenso que has elaborado:
    `;

  //italian lang --------------------------------------------------------------------------
  const situ2TopicIT = 'Analisi SWOT';
  const situ2PromptIT = `
    Sei un consulente professionista e un cliente ti avvicina per scrivere un ${situ2TopicIT} lungo e dettagliato per un piano aziendale. Se il ${situ2TopicIT} non è lungo e dettagliato, il cliente sarà molto contrariato.
    Questi sono i dettagli dell'azienda:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}.
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

    Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Queste sono le debolezze: ${weakness1}, ${weakness2}, ${weakness3}

    Dettagli sui prodotti o servizi del cliente:
    ${productInfoPrompt}

    Ulteriori istruzioni:
    utilizza 500 parole per generare questo ${situ2TopicIT}.
    Il ${situ2TopicIT} dovrebbe includere questi argomenti: Punti di forza, Debolezze, Opportunità, Minacce. Non includere altri argomenti a meno che non sia specificato qui.
    Le opportunità sono fattori esterni incontrollabili che possono giovare all'azienda, non sono tattiche di marketing che un'azienda può attuare.

    Non ripetere i dettagli aziendali a meno che non sia necessario.
    includi solo 2 debolezze e 2 minacce e falle sembrare come se non fossero pericolose e offri azioni di mitigazione all'interno dello stesso tag <li> e sii fiducioso di poter risolvere questi problemi. genera almeno 5 punti di forza e 4 opportunità.
    sii descrittivo in ogni punto.

    Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Genera una risposta in HTML circondando gli argomenti chiave con il tag h5.
    Circonda ogni singolo punto di Forza, Debolezza, Opportunità e Minacce con i tag <ol> e <li>.
    Inizia la realizzazione con "<h4>${situ2TopicIT}</h4>"
    Questo è il ${situ2TopicIT} lungo, dettagliato ed esteso che hai elaborato:
    `;

  //dutch lang --------------------------------------------------------------------------
  const situ2TopicNL = 'SWOT-analyse';
  const situ2PromptNL = `
    Je bent een professionele consultant en een klant benadert je om een lange en gedetailleerde ${situ2TopicNL} te schrijven voor een bedrijfsplan. Als de ${situ2TopicNL} niet lang en gedetailleerd is, zal de klant erg overstuur zijn.
    Dit zijn de bedrijfsdetails:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst hebben
    bedrijfsdetail 5: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de sleutelfactoren voor succes: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dit zijn de zwakke punten: ${weakness1}, ${weakness2}, ${weakness3}

    Dit zijn details over de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn verdere instructies:
    gebruik 500 woorden om deze ${situ2TopicNL} te genereren.
    De ${situ2TopicNL} moet deze onderwerpen bevatten: Sterke punten, Zwakke punten, Kansen, Bedreigingen. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
    Kansen zijn externe oncontroleerbare factoren die het bedrijf kunnen bevoordelen, geen marketingtactieken die een bedrijf kan doen.

    Herhaal de bedrijfsdetails niet tenzij noodzakelijk.
    neem alleen 2 zwakke punten en 2 bedreigingen op en laat ze klinken alsof ze niet gevaarlijk zijn en bied binnen dezelfde <li> tag verzachtende acties aan en wees ervan overtuigd dat je deze problemen kunt oplossen. genereer minstens 5 sterke punten en 4 kansen.
    wees beschrijvend bij elk punt.

    Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer een reactie in html en omring belangrijke onderwerpen met de h5-tag.
    Omring elk individueel punt van Sterke punten, Zwakke punten, Kansen en Bedreigingen met de <ol> en <li> tag.
    Begin de voltooiing met "<h4>${situ2TopicNL}</h4>"
    Genereer alles in het Nederlands.
    Dit is de lange, gedetailleerde en uitgebreide ${situ2TopicNL} die je hebt opgesteld:
    `;

  //japanese lang --------------------------------------------------------------------------
  const situ2TopicJA = 'SWOT分析';
  const situ2PromptJA = `
    あなたはプロのコンサルタントで、クライアントがビジネスプランのための長く詳細な${situ2TopicJA}を書くように依頼してきました。もし${situ2TopicJA}が長く詳細でなければ、クライアントは非常に不満を持つでしょう。
    これらはビジネスの詳細です：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントは${NEmployee}人の従業員を雇う予定です
    ビジネス詳細5：クライアントの配布チャンネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネスの運営状況は${businessOperationalStatus}です。

    これらは成功の鍵となる要素です：${successFactors1}、${successFactors2}、${successFactors3}
    これらは弱点です：${weakness1}、${weakness2}、${weakness3}

    これらはクライアントの製品やサービスの詳細です：
    ${productInfoPrompt}
    
    これらはさらなる指示です：
    この${situ2TopicJA}を生成するために500語を使用してください。
    ${situ2TopicJA}は次のトピックを含むべきです：強み、弱み、機会、脅威。ここで指定されていない他のトピックは含めないでください。
    機会はビジネスが行うことができるマーケティング戦略ではなく、ビジネスに利益をもたらす可能性のある外部の制御不能な要素です。

    必要でない限り、ビジネスの詳細を繰り返さないでください。
    弱点と脅威を2つだけ含め、それらが危険でないように聞こえるようにし、同じ<li>タグ内で緩和策を提供し、これらの問題を解決できると自信を持ってください。少なくとも5つの強みと4つの機会を生成してください。
    各ポイントで詳細に説明してください。

    あなたがビジネスのオーナーであるかのように書いてください。"we"を使用し、"I"は使用しないでください。
    h5タグでキートピックを囲んでhtmlのレスポンスを生成してください。
    各個の強み、弱み、機会、脅威のポイントを<ol>と<li>タグで囲んでください。
    完成を"<h4>${situ2TopicJA}</h4>"で始めてください。
    すべてを日本語で生成してください。
    これがあなたが考え出した長く、詳細で、長い${situ2TopicJA}です：
    `;

  //arabic lang --------------------------------------------------------------------------
  const situ2TopicAR = 'تحليل SWOT';
  const situ2PromptAR = `
    أنت مستشار محترف، ويتوجه إليك عميل لكتابة ${situ2TopicAR} طويل ومفصل لخطة عمل. إذا لم يكن ${situ2TopicAR} طويل ومفصل، سيكون العميل غاضبًا جدًا.
    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: سيوظف العميل ${NEmployee} موظفًا
    تفاصيل العمل 5: قناة التوزيع للعميل هي ${salesChannel}.
    تفاصيل العمل 6: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

    هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}
    هذه هي الضعف: ${weakness1}، ${weakness2}، ${weakness3}

    هذه هي تفاصيل منتجات العميل أو خدماته:
    ${productInfoPrompt}
    
    هذه هي التعليمات الإضافية:
    استخدم 500 كلمة لإنشاء هذا ${situ2TopicAR}.
    يجب أن يتضمن ${situ2TopicAR} هذه المواضيع: القوة، الضعف، الفرص، التهديدات. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    الفرص هي عوامل خارجية لا يمكن التحكم فيها يمكن أن تعود بالفائدة على العمل وليست بعض التكتيكات التسويقية التي يمكن أن يقوم بها العمل.

    لا تكرر تفاصيل العمل ما لم يكن ضروريًا.
    تضمين فقط 2 ضعف و 2 تهديد وجعلهم يبدون كأنهم ليسوا خطرين وتقديم إجراءات تخفيف في نفس الوسم <li> وكن واثقًا من أنك يمكنك حل هذه المشكلات. أنشئ على الأقل 5 نقاط قوة و 4 فرص.
    كن وصفيًا في كل نقطة.

    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    أنشئ الرد في html محيطًا المواضيع الرئيسية بوسم h5.
    أحاطة كل نقطة من القوة، الضعف، الفرص، والتهديدات بوسم <ol> و <li>.
    ابدأ الإكمال بـ "<h4>${situ2TopicAR}</h4>"
    أنشئ كل شيء باللغة العربية.
    هذا هو ${situ2TopicAR} الطويل والمفصل والطويل الذي ابتكرته:
    `;

  // swedish lang --------------------------------------------------------------------------
  const situ2TopicSV = 'SWOT-analys';
  const situ2PromptSV = `
    Du är en professionell konsult och en klient ber dig skriva en lång och detaljerad ${situ2TopicSV} för en affärsplan. Om ${situ2TopicSV} inte är lång och detaljerad kommer klienten att bli mycket upprörd.
    Det här är företagets detaljer:
    företagsdetalj 1: Kundens företagsnamn är ${businessName}.
    företagsdetalj 2: Typen av verksamhet är ${businessType}.
    företagsdetalj 3: Det här är var företagets kunder finns: ${location}.
    företagsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda
    företagsdetalj 5: Kundens distributionskanal är ${salesChannel}.
    företagsdetalj 6: Kundens företags operativa status är ${businessOperationalStatus}.

    Dessa är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dessa är svagheterna: ${weakness1}, ${weakness2}, ${weakness3}

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}
    
    Dessa är ytterligare instruktioner:
    använd 500 ord för att generera detta ${situ2TopicSV}.
    ${situ2TopicSV} bör inkludera dessa ämnen: Styrkor, Svagheter, Möjligheter, Hot. Inkludera inte andra ämnen om det inte specificeras här.
    Möjligheter är externa okontrollerbara faktorer som kan gynna företaget, inte några marknadsföringstaktiker som ett företag kan göra.

    Upprepa inte företagsdetaljerna om det inte är nödvändigt.
    inkludera endast 2 svagheter och 2 hot och få dem att låta som om de inte är farliga och erbjuda lindrande åtgärder inom samma <li> tagg och var säker på att du kan lösa dessa problem. generera minst 5 styrkor och 4 möjligheter.
    var beskrivande i varje punkt.

    Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
    Generera svar i html omger nyckelämnen med h5-taggen.
    Omge varje individuell Styrkor, Svagheter, Möjligheter och Hot punkter med <ol> och <li> tagg.
    Börja slutförandet med "<h4>${situ2TopicSV}</h4>"
    Generera allt på svenska.
    Detta är den långa, detaljerade och långa ${situ2TopicSV} du kom på:
    `;

  // finnish lang --------------------------------------------------------------------------
  const situ2TopicFI = 'SWOT-analyysi';
  const situ2PromptFI = `
    Olet ammattikonsultti, ja asiakas pyytää sinua kirjoittamaan pitkän ja yksityiskohtaisen ${situ2TopicFI} liiketoimintasuunnitelmaan. Jos ${situ2TopicFI} ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan erittäin pettynyt.
    Nämä ovat yrityksen tiedot:
    yrityksen tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    yrityksen tieto 2: Liiketoiminnan tyyppi on ${businessType}.
    yrityksen tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    yrityksen tieto 4: Asiakas palkkaa ${NEmployee} työntekijää
    yrityksen tieto 5: Asiakkaan jakelukanava on ${salesChannel}.
    yrityksen tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

    Nämä ovat avaintekijät menestykselle: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Nämä ovat heikkoudet: ${weakness1}, ${weakness2}, ${weakness3}

    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
    
    Nämä ovat lisäohjeet:
    käytä 500 sanaa tämän ${situ2TopicFI} tuottamiseen.
    ${situ2TopicFI} pitäisi sisältää nämä aiheet: Vahvuudet, Heikkoudet, Mahdollisuudet, Uhat. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
    Mahdollisuudet ovat ulkoisia, yrityksen hallinnan ulkopuolella olevia tekijöitä, jotka voivat hyödyttää yritystä, eivät joitakin markkinointitaktiikoita, joita yritys voi tehdä.

    Älä toista yrityksen tietoja, ellei se ole tarpeen.
    sisällytä vain 2 heikkoutta ja 2 uhkaa ja tee niistä vaarattoman kuuloisia ja tarjoa lieventäviä toimenpiteitä samassa <li> -tagissa ja ole varma, että voit ratkaista nämä ongelmat. tuota vähintään 5 vahvuutta ja 4 mahdollisuutta.
    ole kuvaileva jokaisessa kohdassa.

    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Tuota vastaus html-muodossa, jossa avainaiheet on ympäröity h5-tagilla.
    Ympäröi jokainen yksittäinen Vahvuudet, Heikkoudet, Mahdollisuudet ja Uhat -kohta <ol> ja <li> -tagilla.
    Aloita täydennys "<h4>${situ2TopicFI}</h4>"
    Tuota kaikki suomeksi.
    Tämä on pitkä, yksityiskohtainen ja pitkä ${situ2TopicFI}, jonka keksit:
    `;

  // danish lang --------------------------------------------------------------------------
  const situ2TopicDA = 'SWOT-analyse';
  const situ2PromptDA = `
    Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en lang og detaljeret ${situ2TopicDA} til en forretningsplan. Hvis ${situ2TopicDA} ikke er lang og detaljeret, vil klienten blive meget skuffet.
    Dette er virksomhedens detaljer:
    virksomhedsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
    virksomhedsdetalje 2: Virksomhedens type er ${businessType}.
    virksomhedsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    virksomhedsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere
    virksomhedsdetalje 5: Klientens distributionskanal er ${salesChannel}.
    virksomhedsdetalje 6: Klientens virksomheds operationelle status er ${businessOperationalStatus}.

    Dette er de vigtige succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dette er svaghederne: ${weakness1}, ${weakness2}, ${weakness3}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er yderligere instruktioner:
    brug 500 ord til at generere denne ${situ2TopicDA}.
    ${situ2TopicDA} skal inkludere disse emner: Styrker, Svagheder, Muligheder, Trusler. Inkluder ikke andre emner, medmindre det er specificeret her.
    Muligheder er eksterne ukontrollable faktorer, der kan gavne virksomheden, ikke nogle marketingtaktikker, som en virksomhed kan gøre.

    Gentag ikke virksomhedsdetaljerne, medmindre det er nødvendigt.
    inkluder kun 2 svagheder og 2 trusler og gør dem lyde som om de ikke er farlige og tilbyd afhjælpende handlinger inden for den samme <li> tag og vær sikker på, at du kan løse disse problemer. generer mindst 5 styrker og 4 muligheder.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Generer svar i html, der omgiver nøgleemner med h5-tag.
    Omgiv hver individuel Styrker, Svagheder, Muligheder og Trusler punkter med <ol> og <li> tag.
    Begynd udfyldelsen med "<h4>${situ2TopicDA}</h4>"
    Generer alt på dansk.
    Dette er den lange, detaljerede og omfattende ${situ2TopicDA}, du kom op med:
    `;
  // norwegian lang --------------------------------------------------------------------------
  const situ2TopicNO = 'SWOT-analyse';
  const situ2PromptNO = `
    Du er en profesjonell konsulent, og en klient nærmer deg for å skrive en lang og detaljert ${situ2TopicNO} for en forretningsplan. Hvis ${situ2TopicNO} ikke er lang og detaljert, vil klienten bli veldig opprørt.
    Dette er forretningsdetaljene:
    forretningsdetalj 1: Klientens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}.
    forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
    forretningsdetalj 4: Klienten vil ansette ${NEmployee} ansatte
    forretningsdetalj 5: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 6: Klientens forretningsoperasjonelle status er ${businessOperationalStatus}.

    Dette er de viktigste suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dette er svakhetene: ${weakness1}, ${weakness2}, ${weakness3}

    Dette er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er ytterligere instruksjoner:
    bruk 500 ord for å generere denne ${situ2TopicNO}.
    ${situ2TopicNO} skal inkludere disse emnene: Styrker, Svakheter, Muligheter, Trusler. Ikke inkluder andre emner med mindre det er spesifisert her.
    Muligheter er eksterne ukontrollerbare faktorer som kan gagne virksomheten, ikke noen markedsføringstaktikker som en virksomhet kan gjøre.

    Gjenta ikke forretningsdetaljene med mindre det er nødvendig.
    inkluder bare 2 svakheter og 2 trusler og få dem til å høres ut som om de ikke er farlige og tilby avbøtende handlinger innenfor samme <li> tagg og vær sikker på at du kan løse disse problemene. generer minst 5 styrker og 4 muligheter.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Generer svar i html som omgir nøkkeltemaer med h5-taggen.
    Omgir hvert individuelle Styrker, Svakheter, Muligheter, og Trusler punkter med <ol> og <li> tagg.
    Begynn utfyllingen med "<h4>${situ2TopicNO}</h4>"
    Generer alt på norsk.
    Dette er den lange, detaljerte og omfattende ${situ2TopicNO} du kom opp med:
    `;

  // other lang--------------------------------------------------------------------------
  const situ2Topic = '';
  const situ2Prompt = `
    You are a professional consultant, and a client approaches you to write a long and detailed ${situ2TopicEN} for a business plan. If the ${situ2TopicEN} is not long and detailed the client will be very upset.
    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees
    business detail 5: The client's distribution channel is ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}
    These are the weaknesses: ${weakness1}, ${weakness2}, ${weakness3}

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    use 500 words to generate this ${situ2TopicEN}.
    The ${situ2TopicEN} should include these topics: Strengths, Weaknesses, Opportunities, Threats. Don't include other topics unless specified here.
    Opportunities are external uncontrollable factors that can benefit the business not some marketing tactics that a business can do.

    Do not repeat the business details unless nessesary.
    only include 2 weaknesses and 2 threats and make them sound like its not dangerous and offer mitigating actions within the same <li> tag and be confident that you can resolve these issues. generate at least 5 strengths and 4 opportunities.
    be descriptive in each point.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding key topics with h5 tag.
    Surround each individual Strengths, Weaknesses, Opportunities, and Threats points with <ol> and <li> tag.
    Begin the completion with "<h4>${situ2TopicEN}</h4>"
    Generate everything in English.
    This is the long, detailed, and lengthy ${situ2TopicEN} you came up with:
    `;

  let situ2PromptFinal = '';

  if (planLanguage === 'en') {
    situ2PromptFinal = situ2PromptEN;
  } else if (planLanguage === 'de') {
    situ2PromptFinal = situ2PromptDE;
  } else if (planLanguage === 'fr') {
    situ2PromptFinal = situ2PromptFR;
  } else if (planLanguage === 'es') {
    situ2PromptFinal = situ2PromptES;
  } else if (planLanguage === 'it') {
    situ2PromptFinal = situ2PromptIT;
  } else if (planLanguage === 'nl') {
    situ2PromptFinal = situ2PromptNL;
  } else if (planLanguage === 'ja') {
    situ2PromptFinal = situ2PromptJA;
  } else if (planLanguage === 'ar') {
    situ2PromptFinal = situ2PromptAR;
  } else if (planLanguage === 'sv') {
    situ2PromptFinal = situ2PromptSV;
  } else if (planLanguage === 'fi') {
    situ2PromptFinal = situ2PromptFI;
  } else if (planLanguage === 'da') {
    situ2PromptFinal = situ2PromptDA;
  } else if (planLanguage === 'no') {
    situ2PromptFinal = situ2PromptNO;
  } else {
    situ2PromptFinal = situ2PromptEN;
  }

  const payload = {
    model: modelPlanQuota,
    messages: [{ role: 'user', content: situ2PromptFinal }],
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
