import { AI_MODEL } from '../../../../constants/plan';
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
  modelName?: string;
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
    modelName,
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
    en: `
    You are a professional consultant, and a client approaches you to write a detailed ${promptTopic.en} for a business plan.
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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
Generate everything in English.
This is important: Be very insightful in your response
    This is the ${promptTopic.en} you came up with:
    `,
    'en-uk': `
    You are a professional consultant, and a client approaches you to write a detailed ${promptTopic.en} for a business plan.
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
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    use british english spelling and grammar
    This is the ${promptTopic.en} you came up with:
    `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um eine detaillierte ${promptTopic.de} für einen Geschäftsplan zu schreiben.
    Dies sind die Geschäftsdaten:
    Geschäftsdetail 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Unternehmens ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Kunde wird ${NEmployee} Mitarbeiter beschäftigen.
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 6: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
    
    Dies sind die Schlüsselfaktoren für den Erfolg: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dies sind die Schwächen: ${weakness1}, ${weakness2}, ${weakness3}
    
    Dies sind die Details zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
    
    Dies sind weitere Anweisungen:
    Die ${promptTopic.de} sollte diese Themen umfassen: Stärken, Schwächen, Chancen, Bedrohungen. Schließen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben.
    Chancen sind externe, unkontrollierbare Faktoren, die dem Unternehmen zugutekommen können, nicht einige Marketingtaktiken, die ein Unternehmen durchführen kann.
    
    Wiederholen Sie die Geschäftsdaten nur, wenn es notwendig ist.
    Schließen Sie nur 2 Schwächen und 2 Bedrohungen ein und lassen Sie sie nicht gefährlich erscheinen. Bieten Sie im selben <li>-Tag mildernde Maßnahmen an und seien Sie zuversichtlich, dass Sie diese Probleme lösen können. Generieren Sie mindestens 5 Stärken und 4 Chancen.
    Seien Sie bei jedem Punkt beschreibend.
    
    Schreiben Sie dies, als ob Sie der Eigentümer des Unternehmens wären, und verwenden Sie "wir", nicht "ich".
    Generieren Sie die Antwort in HTML und umgeben Sie die Hauptthemen mit dem h5-Tag.
    Umgeben Sie jeden einzelnen Punkt der Stärken, Schwächen, Chancen und Bedrohungen mit <ol> und <li>-Tags.
    Beginnen Sie die Ausführung mit "<h4>${promptTopic.de}</h4>"
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für Fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für Kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
    Generieren Sie alles auf Deutsch.
    Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort
    Dies ist die ${promptTopic.de}, die Sie sich ausgedacht haben:
    `,
    fr: ` Vous êtes un consultant professionnel, et un client vous demande d'écrire une ${promptTopic.fr} détaillée pour un plan d'affaires.
    Voici les détails de l'entreprise :
    détail commercial 1 : Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2 : Le type d'entreprise est ${businessType}. 
    détail commercial 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
    détail commercial 4 : Le client emploiera ${NEmployee} employés.
    détail commercial 5 : Le canal de distribution du client est ${salesChannel}.
    détail commercial 6 : Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}
    Voici les faiblesses : ${weakness1}, ${weakness2}, ${weakness3}
  
    Voici les détails des produits ou services du client :
    ${productInfoPrompt}
    
    Voici d'autres instructions :
    La ${promptTopic.fr} doit inclure ces sujets : Forces, Faiblesses, Opportunités, Menaces. N'incluez pas d'autres sujets sauf indication contraire ici.
    Les opportunités sont des facteurs externes incontrôlables qui peuvent bénéficier à l'entreprise, pas des tactiques de marketing que l'entreprise peut faire.
  
    Ne répétez pas les détails de l'entreprise sauf si nécessaire.
    incluez seulement 2 faiblesses et 2 menaces et faites en sorte qu'elles ne paraissent pas dangereuses et proposez des actions d'atténuation dans la même balise <li> et soyez confiants que vous pouvez résoudre ces problèmes. générez au moins 5 forces et 4 opportunités.
    soyez descriptif dans chaque point.
  
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" n'utilisez pas "je".
    Générez la réponse en html entourant les sujets clés avec la balise h5.
    Entourez chaque point individuel de Forces, Faiblesses, Opportunités et Menaces avec les balises <ol> et <li>.
    Commencez la complétion par "<h4>${promptTopic.fr}</h4>"
    utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les puces, utilisez plutôt la balise <li>.
    générez tout en français.
    C'est important : Soyez très perspicace dans votre réponse
    Voici la ${promptTopic.fr} que vous avez proposée :
    `,
    es: `Usted es un consultor profesional, y un cliente se le acerca para que escriba un ${promptTopic.es} detallado para un plan de negocios.
    Estos son los detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: El cliente empleará ${NEmployee} empleados.
    detalle del negocio 5: El canal de distribución del cliente es ${salesChannel}.
    detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Estas son las debilidades: ${weakness1}, ${weakness2}, ${weakness3}
  
    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
    
    Estas son más instrucciones:
    El ${promptTopic.es} debe incluir estos temas: Fortalezas, Debilidades, Oportunidades, Amenazas. No incluya otros temas a menos que se especifique aquí.
    Las oportunidades son factores externos incontrolables que pueden beneficiar al negocio, no algunas tácticas de marketing que un negocio puede hacer.
  
    No repita los detalles del negocio a menos que sea necesario.
    solo incluya 2 debilidades y 2 amenazas y haga que no parezcan peligrosas y ofrezca acciones de mitigación dentro de la misma etiqueta <li> y esté seguro de que puede resolver estos problemas. genere al menos 5 fortalezas y 4 oportunidades.
    sea descriptivo en cada punto.
  
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no use "yo".
    Genere la respuesta en html rodeando los temas clave con la etiqueta h5.
    Rodee cada punto individual de Fortalezas, Debilidades, Oportunidades y Amenazas con las etiquetas <ol> y <li>.
    Comience la finalización con "<h4>${promptTopic.es}</h4>"
    use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para puntos de viñeta, en su lugar use la etiqueta <li>.
    genera todo en español
  Esto es importante: Sé muy perspicaz en tu respuesta
  Reply
  
    Este es el ${promptTopic.es} que se le ocurrió:
    `,
    it: `Sei un consulente professionista e un cliente si avvicina a te per scrivere una ${promptTopic.it} dettagliata per un piano aziendale.
    Questi sono i dettagli dell'azienda:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Questi sono i punti deboli: ${weakness1}, ${weakness2}, ${weakness3}
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
    
    Queste sono ulteriori istruzioni:
    La ${promptTopic.it} dovrebbe includere questi argomenti: Punti di forza, Debolezze, Opportunità, Minacce. Non includere altri argomenti a meno che non sia specificato qui.
    Le opportunità sono fattori esterni incontrollabili che possono beneficiare l'azienda, non alcune tattiche di marketing che un'azienda può fare.
  
    Non ripetere i dettagli dell'azienda a meno che non sia necessario.
    includi solo 2 debolezze e 2 minacce e fai in modo che non sembrino pericolose e offri azioni di mitigazione all'interno della stessa etichetta <li> e sii sicuro di poter risolvere questi problemi. genera almeno 5 punti di forza e 4 opportunità.
    sii descrittivo in ogni punto.
  
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non usare "io".
    Genera la risposta in html circondando i temi chiave con l'etichetta h5.
    Circonda ogni singolo punto di Punti di forza, Debolezze, Opportunità e Minacce con le etichette <ol> e <li>.
    Inizia il completamento con "<h4>${promptTopic.it}</h4>"
    usa solo etichette HTML, non usare markdown. Non usare ** **, usa invece l'etichetta <strong> per il grassetto. Non usare * *, usa invece l'etichetta <em> per il corsivo. Non usare * per i punti elenco, usa invece l'etichetta <li>.
    genera tutto in italiano
  Questo è importante: Sii molto perspicace nella tua risposta
    Questa è la ${promptTopic.it} che hai proposto:
    `,
    nl: `U bent een professionele consultant en een klant benadert u om een gedetailleerde ${promptTopic.nl} voor een bedrijfsplan te schrijven.
    Dit zijn de bedrijfsgegevens:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}. 
    bedrijfsdetail 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
    bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst nemen.
    bedrijfsdetail 5: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    Dit zijn de belangrijkste succesfactoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Dit zijn de zwakke punten: ${weakness1}, ${weakness2}, ${weakness3}
  
    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}
    
    Dit zijn verdere instructies:
    De ${promptTopic.nl} moet deze onderwerpen bevatten: Sterktes, Zwaktes, Kansen, Bedreigingen. Voeg geen andere onderwerpen toe, tenzij hier gespecificeerd.
    Kansen zijn externe oncontroleerbare factoren die het bedrijf ten goede kunnen komen, niet enkele marketingtactieken die een bedrijf kan doen.
  
    Herhaal de bedrijfsgegevens niet tenzij noodzakelijk.
    neem slechts 2 zwakke punten en 2 bedreigingen op en zorg ervoor dat ze niet gevaarlijk lijken en bied mitigerende acties aan binnen dezelfde <li> tag en wees ervan overtuigd dat u deze problemen kunt oplossen. genereer ten minste 5 sterktes en 4 kansen.
    wees beschrijvend in elk punt.
  
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" gebruik geen "ik".
    Genereer de reactie in html door de belangrijkste onderwerpen met de h5-tag te omringen.
    Omring elk individueel punt van Sterktes, Zwaktes, Kansen en Bedreigingen met de <ol> en <li> tags.
    Begin de voltooiing met "<h4>${promptTopic.nl}</h4>"
    gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong> tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em> tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li> tag.
    genereer alles in het Nederlands
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
    Dit is de ${promptTopic.nl} die u hebt bedacht:
    `,
    ja: `あなたはプロのコンサルタントであり、クライアントがビジネスプランの詳細な${promptTopic.ja}を書くように依頼してきます。
    これらはビジネスの詳細です：
    ビジネスの詳細1：クライアントのビジネス名は${businessName}です。
    ビジネスの詳細2：ビジネスの種類は${businessType}です。
    ビジネスの詳細3：これはビジネスの顧客がいる場所です：${location}。
    ビジネスの詳細4：クライアントは${NEmployee}人の従業員を雇用します。
    ビジネスの詳細5：クライアントの流通チャネルは${salesChannel}です。
    ビジネスの詳細6：クライアントのビジネスの運営状況は${businessOperationalStatus}です。
  
    これらは主要な成功要因です：${successFactors1}、${successFactors2}、${successFactors3}
    これらは弱点です：${weakness1}、${weakness2}、${weakness3}
  
    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}
    
    これらはさらに指示です：
    ${promptTopic.ja}にはこれらのトピックを含める必要があります：強み、弱み、機会、脅威。ここで指定されていない限り、他のトピックを含めないでください。
    機会は、ビジネスに利益をもたらす外部の制御不能な要因であり、ビジネスが行うことができるマーケティング戦術ではありません。
  
    必要でない限り、ビジネスの詳細を繰り返さないでください。
    2つの弱点と2つの脅威のみを含め、それらが危険でないようにし、同じ<li>タグ内で緩和策を提供し、これらの問題を解決できると確信してください。少なくとも5つの強みと4つの機会を生成します。
    各ポイントを詳細に説明してください。
  
    ビジネスの所有者であるかのように、「私」ではなく「私たち」を使用してこれを書いてください。
    h5タグで主要なトピックを囲んでhtmlで応答を生成します。
    強み、弱み、機会、脅威の各ポイントを<ol>および<li>タグで囲みます。
    "<h4>${promptTopic.ja}</h4>"で完了を開始します。
    markdownを使用せず、HTMLタグのみを使用してください。** **を使用せず、代わりに太字には<strong>タグを使用してください。* *を使用せず、代わりに斜体には<em>タグを使用してください。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
    すべてを日本語で生成します
  これは重要です: 回答に非常に洞察力を持ってください
    これはあなたが考えた${promptTopic.ja}です：
    `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${promptTopic.ar} مفصل لخطة عمل.
    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}. 
    تفاصيل العمل 3: هذا هو مكان وجود عملاء العمل: ${location}.
    تفاصيل العمل 4: العميل سيوظف ${NEmployee} موظفين.
    تفاصيل العمل 5: قناة توزيع العميل هي ${salesChannel}.
    تفاصيل العمل 6: حالة التشغيل الخاصة بعمل العميل هي ${businessOperationalStatus}.
  
    هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}
    هذه هي نقاط الضعف: ${weakness1}، ${weakness2}، ${weakness3}
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
    
    هذه هي التعليمات الإضافية:
    يجب أن يتضمن ${promptTopic.ar} هذه المواضيع: نقاط القوة، نقاط الضعف، الفرص، التهديدات. لا تتضمن مواضيع أخرى إلا إذا تم تحديدها هنا.
    الفرص هي عوامل خارجية غير قابلة للتحكم يمكن أن تفيد العمل وليست بعض التكتيكات التسويقية التي يمكن أن يقوم بها العمل.
  
    لا تكرر تفاصيل العمل إلا إذا كان ذلك ضروريًا.
    قم بتضمين نقطتي ضعف ونقطتي تهديد فقط واجعلها تبدو غير خطيرة وقدم إجراءات تخفيفية داخل نفس علامة <li> وكن واثقًا من أنك تستطيع حل هذه المشكلات. قم بإنشاء ما لا يقل عن 5 نقاط قوة و 4 فرص.
    كن وصفيًا في كل نقطة.
  
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" ولا تستخدم "أنا".
    قم بإنشاء الرد في html محاطًا بالمواضيع الرئيسية بعلامة h5.
    أحط كل نقطة من نقاط القوة، الضعف، الفرص، والتهديدات بعلامتي <ol> و <li>.
    ابدأ الإكمال بـ "<h4>${promptTopic.ar}</h4>"
    استخدم علامات HTML فقط ولا تستخدم markdown. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغليظ. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
    أنشئ كل شيء باللغة العربية
  هذا مهم: كن ثاقب الرأي في ردك
    هذا هو ${promptTopic.ar} الذي توصلت إليه:
    `,
    sv: `Du är en professionell konsult, och en klient närmar sig dig för att skriva en detaljerad ${promptTopic.sv} för en affärsplan.
    Här är affärsdetaljerna:
    affärsdetalj 1: Klientens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av företag är ${businessType}. 
    affärsdetalj 3: Här är var företagets kunder finns: ${location}.
    affärsdetalj 4: Klienten kommer att anställa ${NEmployee} anställda.
    affärsdetalj 5: Klientens distributionskanal är ${salesChannel}.
    affärsdetalj 6: Klientens affärsoperativa status är ${businessOperationalStatus}.
  
    Här är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Här är svagheterna: ${weakness1}, ${weakness2}, ${weakness3}
  
    Här är detaljer om klientens produkter eller tjänster:
    ${productInfoPrompt}
    
    Här är ytterligare instruktioner:
    ${promptTopic.sv} bör inkludera dessa ämnen: Styrkor, Svagheter, Möjligheter, Hot. Inkludera inte andra ämnen om de inte specificeras här.
    Möjligheter är externa okontrollerbara faktorer som kan gynna företaget, inte några marknadsföringstaktiker som ett företag kan göra.
  
    Upprepa inte affärsdetaljerna om det inte är nödvändigt.
    inkludera endast 2 svagheter och 2 hot och få dem att låta som om de inte är farliga och erbjuda mildrande åtgärder inom samma <li> tag och var säker på att du kan lösa dessa problem. generera minst 5 styrkor och 4 möjligheter.
    var beskrivande i varje punkt.
  
    Skriv detta som om du är ägaren av företaget, använd "vi" använd inte "jag".
    Generera svar i html som omger nyckelämnen med h5-tag.
    Omge varje enskild Styrka, Svaghet, Möjlighet och Hot-punkt med <ol> och <li> tag.
    Börja avslutningen med "<h4>${promptTopic.sv}</h4>"
    använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället <strong> tag för fetstil. Använd inte * *, använd istället <em> tag för kursiv. Använd inte * för punktlistor, använd istället <li> tag.
    generera allt på svenska
  Detta är viktigt: Var mycket insiktsfull i ditt svar
    Detta är ${promptTopic.sv} du kom på:
    `,
    fi: `Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan yksityiskohtaisen ${promptTopic.fi} liiketoimintasuunnitelmaa varten.
    Tässä ovat liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Yrityksen tyyppi on ${businessType}. 
    liiketoiminnan yksityiskohta 3: Tässä ovat yrityksen asiakkaat: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakas työllistää ${NEmployee} työntekijää.
    liiketoiminnan yksityiskohta 5: Asiakkaan jakelukanava on ${salesChannel}.
    liiketoiminnan yksityiskohta 6: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
  
    Tässä ovat keskeiset menestystekijät: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Tässä ovat heikkoudet: ${weakness1}, ${weakness2}, ${weakness3}
  
    Tässä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
    
    Tässä ovat lisäohjeet:
    ${promptTopic.fi} tulisi sisältää nämä aiheet: Vahvuudet, Heikkoudet, Mahdollisuudet, Uhat. Älä sisällytä muita aiheita, ellei niitä ole erikseen mainittu tässä.
    Mahdollisuudet ovat ulkoisia hallitsemattomia tekijöitä, jotka voivat hyödyttää liiketoimintaa, eivätkä markkinointitaktiikoita, joita yritys voi tehdä.
  
    Älä toista liiketoiminnan tietoja, ellei se ole tarpeen.
    sisällytä vain 2 heikkoutta ja 2 uhkaa ja tee niistä kuulostamaan siltä, että ne eivät ole vaarallisia ja tarjoa lieventäviä toimia saman <li> tagin sisällä ja ole varma, että voit ratkaista nämä ongelmat. luo vähintään 5 vahvuutta ja 4 mahdollisuutta.
    ole kuvaileva jokaisessa kohdassa.
  
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Luo vastaus html-muodossa ympäröimällä keskeiset aiheet h5-tagilla.
    Ympäröi jokainen yksittäinen Vahvuus, Heikkous, Mahdollisuus ja Uhka <ol> ja <li> tagilla.
    Aloita täyttö "<h4>${promptTopic.fi}</h4>"
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong> tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em> tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li> tagia.
    luo kaikki suomeksi
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi
    Tämä on ${promptTopic.fi} jonka keksit:
    `,
    da: `Du er en professionel konsulent, og en klient henvender sig til dig for at skrive en detaljeret ${promptTopic.da} til en forretningsplan.
    Her er forretningsdetaljerne:
    forretningsdetalje 1: Klientens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Typen af virksomhed er ${businessType}. 
    forretningsdetalje 3: Her er hvor virksomhedens kunder er: ${location}.
    forretningsdetalje 4: Klienten vil ansætte ${NEmployee} medarbejdere.
    forretningsdetalje 5: Klientens distributionskanal er ${salesChannel}.
    forretningsdetalje 6: Klientens forretningsoperationelle status er ${businessOperationalStatus}.
  
    Her er de vigtigste succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Her er svaghederne: ${weakness1}, ${weakness2}, ${weakness3}
  
    Her er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Her er yderligere instruktioner:
    ${promptTopic.da} bør inkludere disse emner: Styrker, Svagheder, Muligheder, Trusler. Inkluder ikke andre emner, medmindre de er specificeret her.
    Muligheder er eksterne ukontrollerbare faktorer, der kan gavne virksomheden, ikke nogle markedsføringstaktikker, som en virksomhed kan gøre.
  
    Gentag ikke forretningsdetaljerne, medmindre det er nødvendigt.
    inkluder kun 2 svagheder og 2 trusler og få dem til at lyde som om de ikke er farlige og tilbyde afbødende handlinger inden for samme <li> tag og vær sikker på, at du kan løse disse problemer. generer mindst 5 styrker og 4 muligheder.
    vær beskrivende i hvert punkt.
  
    Skriv dette, som om du er ejer af virksomheden, brug "vi" brug ikke "jeg".
    Generer svar i html, der omgiver nøgleemner med h5-tag.
    Omgiv hver enkelt Styrke, Svaghed, Mulighed og Trussel med <ol> og <li> tag.
    Begynd afslutningen med "<h4>${promptTopic.da}</h4>"
    brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong> tag til fed skrift. Brug ikke * *, brug i stedet <em> tag til kursiv. Brug ikke * til punkttegn, brug i stedet <li> tag.
    generer alt på dansk
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar
    Dette er ${promptTopic.da} du kom op med:
    `,
    no: `Du er en profesjonell konsulent, og en klient henvender seg til deg for å skrive en detaljert ${promptTopic.no} for en forretningsplan.
    Her er forretningsdetaljene:
    forretningsdetalj 1: Klientens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen av virksomhet er ${businessType}. 
    forretningsdetalj 3: Her er hvor firmaets kunder er: ${location}.
    forretningsdetalj 4: Klienten vil ansette ${NEmployee} ansatte.
    forretningsdetalj 5: Klientens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 6: Klientens forretningsoperative status er ${businessOperationalStatus}.
  
    Her er de viktigste suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
    Her er svakhetene: ${weakness1}, ${weakness2}, ${weakness3}
  
    Her er detaljer om klientens produkter eller tjenester:
    ${productInfoPrompt}
    
    Her er ytterligere instruksjoner:
    ${promptTopic.no} bør inkludere disse emnene: Styrker, Svakheter, Muligheter, Trusler. Ikke inkluder andre emner med mindre de er spesifisert her.
    Muligheter er eksterne ukontrollerbare faktorer som kan gagne virksomheten, ikke noen markedsføringstaktikker som en virksomhet kan gjøre.
  
    Ikke gjenta forretningsdetaljene med mindre det er nødvendig.
    inkluder bare 2 svakheter og 2 trusler og få dem til å høres ut som de ikke er farlige og tilby avbøtende tiltak innenfor samme <li> tag og vær trygg på at du kan løse disse problemene. generer minst 5 styrker og 4 muligheter.
    vær beskrivende i hvert punkt.
  
    Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
    Generer svar i html som omgir nøkkeltemaer med h5-tag.
    Omgiv hver enkelt Styrker, Svakheter, Muligheter og Trusler punkt med <ol> og <li> tag.
    Begynn fullføringen med "<h4>${promptTopic.no}</h4>"
    bruk bare HTML-tagger, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong> tag for fet skrift. Ikke bruk * *, bruk i stedet <em> tag for kursiv. Ikke bruk * for punktlister, bruk i stedet <li> tag.
    generer alt på norsk
  Dette er viktig: Vær veldig innsiktsfull i ditt svar
    Dette er ${promptTopic.no} du kom opp med:
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
