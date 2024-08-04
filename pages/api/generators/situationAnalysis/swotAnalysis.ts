import { OpenAIStream } from '../../../../utils/OpenAIChatStream';

interface ISituationAnalysisSwotAnalysisPro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;
  successFactors1: string;
  successFactors2: string;
  successFactors3: string;
  weakness1: string;
  weakness2: string;
  weakness3: string;
  planQuota: number;
  planLanguage: string;
  productName1: string;
  productDescription1: string;
  productName2: string;
  productDescription2: string;
  productName3: string;
  productDescription3: string;
  productName4: string;
  productDescription4: string;
  productName5: string;
  productDescription5: string;
  variantID: string;
}

// api3Situ2.ts
export const situationAnalysisSwotAnalysis = (
  req: ISituationAnalysisSwotAnalysisPro,
) => {
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
    planQuota,
    variantID,
  } = req;

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

  const promptTopic = {
    en: 'SWOT Analysis',
    de: 'SWOT-Analyse',
    fr: 'Analyse SWOT',
    es: 'Análisis DAFO',
    it: 'Analisi SWOT',
    nl: 'SWOT-analyse',
    ja: 'SWOT分析',
    ar: 'تحليل SWOT',
    sv: 'SWOT-analys',
    fi: 'SWOT-analyysi',
    da: 'SWOT-analyse',
    no: 'SWOT-analyse',
  };

  const promptTemplates = {
    'en-uk': `
    You are a professional consultant, and a client approaches you to write a long and detailed ${promptTopic.en} for a business plan. If the ${promptTopic.en} is not long and detailed the client will be very upset.
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
    The ${promptTopic.en} should include these topics: Strengths, Weaknesses, Opportunities, Threats. Don't include other topics unless specified here.
    Opportunities are external uncontrollable factors that can benefit the business not some marketing tactics that a business can do.

    Do not repeat the business details unless nessesary.
    only include 2 weaknesses and 2 threats and make them sound like its not dangerous and offer mitigating actions within the same <li> tag and be confident that you can resolve these issues. generate at least 5 strengths and 4 opportunities.
    be descriptive in each point.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding key topics with h5 tag.
    Surround each individual Strengths, Weaknesses, Opportunities, and Threats points with <ol> and <li> tag.
    Begin the completion with "<h4>${promptTopic.en}</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    use british english spelling and grammar
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `
    You are a professional consultant, and a client approaches you to write a long and detailed ${promptTopic.en} for a business plan. If the ${promptTopic.en} is not long and detailed the client will be very upset.
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
    The ${promptTopic.en} should include these topics: Strengths, Weaknesses, Opportunities, Threats. Don't include other topics unless specified here.
    Opportunities are external uncontrollable factors that can benefit the business not some marketing tactics that a business can do.

    Do not repeat the business details unless nessesary.
    only include 2 weaknesses and 2 threats and make them sound like its not dangerous and offer mitigating actions within the same <li> tag and be confident that you can resolve these issues. generate at least 5 strengths and 4 opportunities.
    be descriptive in each point.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html surrounding key topics with h5 tag.
    Surround each individual Strengths, Weaknesses, Opportunities, and Threats points with <ol> and <li> tag.
    Begin the completion with "<h4>${promptTopic.en}</h4>"
Use only HTML tags, don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <ul> and <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    //german lang --------------------------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um einen langen und detaillierten ${promptTopic.de} für einen Geschäftsplan zu verfassen. Wenn ${promptTopic.de} nicht lang und detailliert ist, wird der Kunde sehr verärgert sein.
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
    Das ${promptTopic.de} sollte folgende Themen enthalten: Stärken, Schwächen, Chancen, Bedrohungen. Fügen Sie keine anderen Themen hinzu, sofern hier nicht anders angegeben.
    Chancen sind externe unkontrollierbare Faktoren, die dem Unternehmen zugute kommen können, und nicht irgendwelche Marketingtaktiken, die ein Unternehmen anwenden kann.

    Wiederholen Sie die Geschäftsdetails nicht, es sei denn, dies ist unbedingt erforderlich.
    Schließen Sie nur zwei Schwachstellen und zwei Bedrohungen ein und lassen Sie sie so klingen, als seien sie nicht gefährlich. Bieten Sie Abhilfemaßnahmen innerhalb desselben <li>-Tags an und seien Sie zuversichtlich, dass Sie diese Probleme beheben können. Generieren Sie mindestens 5 Stärken und 4 Chancen.
    Seien Sie in jedem Punkt beschreibend.

    Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
    Generieren Sie mit dem h5-Tag Antworten im HTML-Format zu wichtigen Themen.
    Umgeben Sie jeden einzelnen Stärken-, Schwächen-, Chancen- und Bedrohungspunkt mit den Tags <ol> und <li>.
    Beginnen Sie die Vervollständigung mit „<h4>${promptTopic.de}</h4>“
Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie den <strong>-Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie den <em>-Tag für Kursivschrift. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie die <ul>- und <li>-Tags.
    Generiere alles auf Deutsch.
    Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
    Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
    `,

    //french lang --------------------------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client vous approche pour rédiger un ${promptTopic.fr} long et détaillé pour un plan d'affaires. Si le ${promptTopic.fr} n'est pas long et détaillé, le client sera très mécontent.
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
  Le ${promptTopic.fr} doit inclure ces sujets : Forces, Faiblesses, Opportunités, Menaces. Ne pas inclure d'autres sujets sauf si spécifié ici.
  Les opportunités sont des facteurs externes incontrôlables qui peuvent bénéficier à l'entreprise, pas des tactiques de marketing qu'une entreprise peut faire.

  Ne répétez pas les détails commerciaux sauf si nécessaire.
  incluez seulement 2 faiblesses et 2 menaces et faites-les paraître comme si elles n'étaient pas dangereuses et proposez des actions d'atténuation dans le même tag <li> et soyez confiant que vous pouvez résoudre ces problèmes. générez au moins 5 forces et 4 opportunités.
  soyez descriptif à chaque point.

  Écrivez comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" ne pas utiliser "je".
  Générez une réponse en HTML entourant les sujets clés avec le tag h5.
  Entourez chaque point individuel de Forces, Faiblesses, Opportunités et Menaces avec les balises <ol> et <li>.
  Commencez la complétion avec "<h4>${promptTopic.fr}</h4>"
Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les points de liste, utilisez plutôt les balises <ul> et <li>.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang --------------------------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca para que escriba un ${promptTopic.es} largo y detallado para un plan de negocios. Si el ${promptTopic.es} no es largo y detallado, el cliente estará muy molesto.
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
    El ${promptTopic.es} debe incluir estos temas: Fortalezas, Debilidades, Oportunidades, Amenazas. No incluyas otros temas a menos que se especifique aquí.
    Las oportunidades son factores externos incontrolables que pueden beneficiar al negocio, no son tácticas de marketing que un negocio pueda hacer.

    No repitas los detalles del negocio a menos que sea necesario.
    solo incluye 2 debilidades y 2 amenazas y haz que suenen como si no fueran peligrosas y ofrece acciones de mitigación dentro del mismo tag <li> y confía en que puedes resolver estos problemas. genera al menos 5 fortalezas y 4 oportunidades.
    sé descriptivo en cada punto.

    Escribe como si fueras el dueño del negocio, utilizando "nosotros" no uses "yo".
    Genera una respuesta en HTML rodeando los temas clave con el tag h5.
    Rodea cada punto individual de Fortalezas, Debilidades, Oportunidades y Amenazas con las etiquetas <ol> y <li>.
    Comienza la finalización con "<h4>${promptTopic.es}</h4>"
Use solo etiquetas HTML, no use markdown. No use ** **, use en su lugar la etiqueta <strong> para negrita. No use * *, use en su lugar la etiqueta <em> para cursiva. No use * para viñetas, use en su lugar las etiquetas <ul> y <li>.
    Genere todo en español.
      Esto es importante: Sea muy perspicaz en su respuesta.
      Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang --------------------------------------------------------------------------
    it: `
    Sei un consulente professionista e un cliente ti avvicina per scrivere un ${promptTopic.it} lungo e dettagliato per un piano aziendale. Se il ${promptTopic.it} non è lungo e dettagliato, il cliente sarà molto contrariato.
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
    Il ${promptTopic.it} dovrebbe includere questi argomenti: Punti di forza, Debolezze, Opportunità, Minacce. Non includere altri argomenti a meno che non sia specificato qui.
    Le opportunità sono fattori esterni incontrollabili che possono giovare all'azienda, non sono tattiche di marketing che un'azienda può attuare.

    Non ripetere i dettagli aziendali a meno che non sia necessario.
    includi solo 2 debolezze e 2 minacce e falle sembrare come se non fossero pericolose e offri azioni di mitigazione all'interno dello stesso tag <li> e sii fiducioso di poter risolvere questi problemi. genera almeno 5 punti di forza e 4 opportunità.
    sii descrittivo in ogni punto.

    Scrivi come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Genera una risposta in HTML circondando gli argomenti chiave con il tag h5.
    Circonda ogni singolo punto di Forza, Debolezza, Opportunità e Minacce con i tag <ol> e <li>.
    Inizia la realizzazione con "<h4>${promptTopic.it}</h4>"
Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece i tag <ul> e <li>.
    Genera tutto in italiano.
    Questo è importante: Sii molto perspicace nella tua risposta.
    Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    //dutch lang --------------------------------------------------------------------------
    nl: `
    Je bent een professionele consultant en een klant benadert je om een lange en gedetailleerde ${promptTopic.nl} te schrijven voor een bedrijfsplan. Als de ${promptTopic.nl} niet lang en gedetailleerd is, zal de klant erg overstuur zijn.
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
    De ${promptTopic.nl} moet deze onderwerpen bevatten: Sterke punten, Zwakke punten, Kansen, Bedreigingen. Voeg geen andere onderwerpen toe tenzij hier gespecificeerd.
    Kansen zijn externe oncontroleerbare factoren die het bedrijf kunnen bevoordelen, geen marketingtactieken die een bedrijf kan doen.

    Herhaal de bedrijfsdetails niet tenzij noodzakelijk.
    neem alleen 2 zwakke punten en 2 bedreigingen op en laat ze klinken alsof ze niet gevaarlijk zijn en bied binnen dezelfde <li> tag verzachtende acties aan en wees ervan overtuigd dat je deze problemen kunt oplossen. genereer minstens 5 sterke punten en 4 kansen.
    wees beschrijvend bij elk punt.

    Schrijf dit alsof je de eigenaar van het bedrijf bent, gebruik "we" niet "ik".
    Genereer een reactie in html en omring belangrijke onderwerpen met de h5-tag.
    Omring elk individueel punt van Sterke punten, Zwakke punten, Kansen en Bedreigingen met de <ol> en <li> tag.
    Begin de voltooiing met "<h4>${promptTopic.nl}</h4>"
Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukte tekst. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursieve tekst. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <ul>- en <li>-tags.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    //japanese lang --------------------------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、クライアントがビジネスプランのための長く詳細な${promptTopic.ja}を書くように依頼してきました。もし${promptTopic.ja}が長く詳細でなければ、クライアントは非常に不満を持つでしょう。
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
    ${promptTopic.ja}は次のトピックを含むべきです：強み、弱み、機会、脅威。ここで指定されていない他のトピックは含めないでください。
    機会はビジネスが行うことができるマーケティング戦略ではなく、ビジネスに利益をもたらす可能性のある外部の制御不能な要素です。

    必要でない限り、ビジネスの詳細を繰り返さないでください。
    弱点と脅威を2つだけ含め、それらが危険でないように聞こえるようにし、同じ<li>タグ内で緩和策を提供し、これらの問題を解決できると自信を持ってください。少なくとも5つの強みと4つの機会を生成してください。
    各ポイントで詳細に説明してください。

    あなたがビジネスのオーナーであるかのように書いてください。"we"を使用し、"I"は使用しないでください。
    h5タグでキートピックを囲んでhtmlのレスポンスを生成してください。
    各個の強み、弱み、機会、脅威のポイントを<ol>と<li>タグで囲んでください。
    完成を"<h4>${promptTopic.ja}</h4>"で始めてください。
HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、代わりに太字には<strong>タグを使用してください。 * *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<ul>と<li>タグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang --------------------------------------------------------------------------
    ar: `
    أنت مستشار محترف، ويتوجه إليك عميل لكتابة ${promptTopic.ar} طويل ومفصل لخطة عمل. إذا لم يكن ${promptTopic.ar} طويل ومفصل، سيكون العميل غاضبًا جدًا.
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
    يجب أن يتضمن ${promptTopic.ar} هذه المواضيع: القوة، الضعف، الفرص، التهديدات. لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا.
    الفرص هي عوامل خارجية لا يمكن التحكم فيها يمكن أن تعود بالفائدة على العمل وليست بعض التكتيكات التسويقية التي يمكن أن يقوم بها العمل.

    لا تكرر تفاصيل العمل ما لم يكن ضروريًا.
    تضمين فقط 2 ضعف و 2 تهديد وجعلهم يبدون كأنهم ليسوا خطرين وتقديم إجراءات تخفيف في نفس الوسم <li> وكن واثقًا من أنك يمكنك حل هذه المشكلات. أنشئ على الأقل 5 نقاط قوة و 4 فرص.
    كن وصفيًا في كل نقطة.

    اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
    أنشئ الرد في html محيطًا المواضيع الرئيسية بوسم h5.
    أحاطة كل نقطة من القوة، الضعف، الفرص، والتهديدات بوسم <ol> و <li>.
    ابدأ الإكمال بـ "<h4>${promptTopic.ar}</h4>"
    استخدم فقط علامات HTML، ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامتي <ul> و <li>.
    أنشئ كل شيء باللغة العربية.
    هذا مهم: كن ثاقبًا جدًا في ردك.
    هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang --------------------------------------------------------------------------
    sv: `
    Du är en professionell konsult och en klient ber dig skriva en lång och detaljerad ${promptTopic.sv} för en affärsplan. Om ${promptTopic.sv} inte är lång och detaljerad kommer klienten att bli mycket upprörd.
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
    ${promptTopic.sv} bör inkludera dessa ämnen: Styrkor, Svagheter, Möjligheter, Hot. Inkludera inte andra ämnen om det inte specificeras här.
    Möjligheter är externa okontrollerbara faktorer som kan gynna företaget, inte några marknadsföringstaktiker som ett företag kan göra.

    Upprepa inte företagsdetaljerna om det inte är nödvändigt.
    inkludera endast 2 svagheter och 2 hot och få dem att låta som om de inte är farliga och erbjuda lindrande åtgärder inom samma <li> tagg och var säker på att du kan lösa dessa problem. generera minst 5 styrkor och 4 möjligheter.
    var beskrivande i varje punkt.

    Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
    Generera svar i html omger nyckelämnen med h5-taggen.
    Omge varje individuell Styrkor, Svagheter, Möjligheter och Hot punkter med <ol> och <li> tagg.
    Börja slutförandet med "<h4>${promptTopic.sv}</h4>"
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv. Använd inte * för punktlistor, använd istället <ul>- och <li>-taggarna.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang --------------------------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas pyytää sinua kirjoittamaan pitkän ja yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaan. Jos ${promptTopic.fi} ei ole pitkä ja yksityiskohtainen, asiakas tulee olemaan erittäin pettynyt.
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
    ${promptTopic.fi} pitäisi sisältää nämä aiheet: Vahvuudet, Heikkoudet, Mahdollisuudet, Uhat. Älä sisällytä muita aiheita, ellei niitä ole määritelty tässä.
    Mahdollisuudet ovat ulkoisia, yrityksen hallinnan ulkopuolella olevia tekijöitä, jotka voivat hyödyttää yritystä, eivät joitakin markkinointitaktiikoita, joita yritys voi tehdä.

    Älä toista yrityksen tietoja, ellei se ole tarpeen.
    sisällytä vain 2 heikkoutta ja 2 uhkaa ja tee niistä vaarattoman kuuloisia ja tarjoa lieventäviä toimenpiteitä samassa <li> -tagissa ja ole varma, että voit ratkaista nämä ongelmat. tuota vähintään 5 vahvuutta ja 4 mahdollisuutta.
    ole kuvaileva jokaisessa kohdassa.

    Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
    Tuota vastaus html-muodossa, jossa avainaiheet on ympäröity h5-tagilla.
    Ympäröi jokainen yksittäinen Vahvuudet, Heikkoudet, Mahdollisuudet ja Uhat -kohta <ol> ja <li> -tagilla.
    Aloita täydennys "<h4>${promptTopic.fi}</h4>"
Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä <strong>-tagia lihavointiin. Älä käytä * *, vaan käytä <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, vaan käytä <ul>- ja <li>-tageja.
    Luo kaikki suomeksi.
    Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang --------------------------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en lang og detaljeret ${promptTopic.da} til en forretningsplan. Hvis ${promptTopic.da} ikke er lang og detaljeret, vil klienten blive meget skuffet.
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
    ${promptTopic.da} skal inkludere disse emner: Styrker, Svagheder, Muligheder, Trusler. Inkluder ikke andre emner, medmindre det er specificeret her.
    Muligheder er eksterne ukontrollable faktorer, der kan gavne virksomheden, ikke nogle marketingtaktikker, som en virksomhed kan gøre.

    Gentag ikke virksomhedsdetaljerne, medmindre det er nødvendigt.
    inkluder kun 2 svagheder og 2 trusler og gør dem lyde som om de ikke er farlige og tilbyd afhjælpende handlinger inden for den samme <li> tag og vær sikker på, at du kan løse disse problemer. generer mindst 5 styrker og 4 muligheder.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er ejeren af virksomheden, brug "vi", brug ikke "jeg".
    Generer svar i html, der omgiver nøgleemner med h5-tag.
    Omgiv hver individuel Styrker, Svagheder, Muligheder og Trusler punkter med <ol> og <li> tag.
    Begynd udfyldelsen med "<h4>${promptTopic.da}</h4>"
Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tagget til fed skrift. Brug ikke * *, brug i stedet <em>-tagget til kursiv skrift. Brug ikke * til punkttegn, brug i stedet <ul>- og <li>-taggene.
    Generer alt på dansk.
    Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
    Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,
    // norwegian lang --------------------------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en klient nærmer deg for å skrive en lang og detaljert ${promptTopic.no} for en forretningsplan. Hvis ${promptTopic.no} ikke er lang og detaljert, vil klienten bli veldig opprørt.
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
    ${promptTopic.no} skal inkludere disse emnene: Styrker, Svakheter, Muligheter, Trusler. Ikke inkluder andre emner med mindre det er spesifisert her.
    Muligheter er eksterne ukontrollerbare faktorer som kan gagne virksomheten, ikke noen markedsføringstaktikker som en virksomhet kan gjøre.

    Gjenta ikke forretningsdetaljene med mindre det er nødvendig.
    inkluder bare 2 svakheter og 2 trusler og få dem til å høres ut som om de ikke er farlige og tilby avbøtende handlinger innenfor samme <li> tagg og vær sikker på at du kan løse disse problemene. generer minst 5 styrker og 4 muligheter.
    vær beskrivende i hvert punkt.

    Skriv dette som om du er eieren av virksomheten, bruk "vi", ikke bruk "jeg".
    Generer svar i html som omgir nøkkeltemaer med h5-taggen.
    Omgir hvert individuelle Styrker, Svakheter, Muligheter, og Trusler punkter med <ol> og <li> tagg.
    Begynn utfyllingen med "<h4>${promptTopic.no}</h4>"
Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong>-taggen for fet skrift. Ikke bruk * *, bruk i stedet <em>-taggen for kursiv skrift. Ikke bruk * for punktlister, bruk i stedet <ul>- og <li>-taggene.
    Generer alt på norsk.
    Dette er viktig: Vær veldig innsiktsfull i ditt svar.
    Dette er den lange, detaljerte og innsiktsfulle ${promptTopic.no} du kom opp med:
    `,
  };

  const model = variantID === '2' ? 'gpt-4o-mini' : 'gpt-3.5-turbo';
  console.log("model:", model)
  const payload = {
    model,
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
