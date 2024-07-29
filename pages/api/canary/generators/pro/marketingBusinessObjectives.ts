import { OpenAIStream } from "../../../../../utils/OpenAIChatStream";

interface IMarketingBusinessObjectivePro {
  businessOperationalStatus: string;
  businessName: string;
  businessType: string;
  NEmployee: string;
  location: string;
  salesChannel: string;

  customerDescription: string;
  successFactors1: string;
  successFactors2: string;
  successFactors3: string;

  weakness1: string;
  weakness2: string;
  weakness3: string;

  initialInvestmentAmount: string;
  investmentItem1: string;
  investmentItem2: string;
  investmentItem3: string;
  firstYearRevenue: string;
  revenueGrowthRate: string;
  netProfitMargin: string;

  situ1Ref: string;
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

export const marketingBusinessObjectivesPro = (
  req: IMarketingBusinessObjectivePro
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
    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,
    situ1Ref,
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
    productDescription5
  ) {
    let prompt = "";

    for (let i = 1; i <= 5; i++) {
      const productName = arguments[(i - 1) * 2 + 1];
      const productDescription = arguments[(i - 1) * 2 + 2];

      if (productName) {
        switch (planLanguage) {
          case "de":
            prompt += `Kundens Produkt oder Dienstleistung #${i} Name: ${productName}\n`;
            break;
          case "fr":
            prompt += `Produit ou service du client #${i} Nom: ${productName}\n`;
            break;
          case "es":
            prompt += `Producto o servicio del cliente #${i} Nombre: ${productName}\n`;
            break;
          case "it":
            prompt += `Prodotto o servizio del cliente #${i} Nome: ${productName}\n`;
            break;
          case "nl":
            prompt += `Klant's product of dienst #${i} Naam: ${productName}\n`;
            break;
          case "ja":
            prompt += `クライアントの製品またはサービス #${i} 名前: ${productName}\n`;
            break;
          case "ar":
            prompt += `منتج العميل أو الخدمة #${i} الاسم: ${productName}\n`;
            break;
          case "sv":
            prompt += `Kundens produkt eller tjänst #${i} Namn: ${productName}\n`;
            break;
          case "fi":
            prompt += `Asiakkaan tuote tai palvelu #${i} Nimi: ${productName}\n`;
            break;
          case "da":
            prompt += `Kundens produkt eller service #${i} Navn: ${productName}\n`;
            break;
          case "no":
            prompt += `Kundens produkt eller tjeneste #${i} Navn: ${productName}\n`;
            break;
          default:
            prompt += `Client's product or service #${i} Name: ${productName}\n`;
        }
      }

      if (productDescription) {
        switch (planLanguage) {
          case "de":
            prompt += `Kundens Produkt oder Dienstleistung #${i} Beschreibung: ${productDescription}\n`;
            break;
          case "fr":
            prompt += `Produit ou service du client #${i} Description: ${productDescription}\n`;
            break;
          case "es":
            prompt += `Producto o servicio del cliente #${i} Descripción: ${productDescription}\n`;
            break;
          case "it":
            prompt += `Prodotto o servizio del cliente #${i} Descrizione: ${productDescription}\n`;
            break;
          case "nl":
            prompt += `Klant's product of dienst #${i} Beschrijving: ${productDescription}\n`;
            break;
          case "ja":
            prompt += `クライアントの製品またはサービス #${i} 説明: ${productDescription}\n`;
            break;
          case "ar":
            prompt += `منتج العميل أو الخدمة #${i} الوصف: ${productDescription}\n`;
            break;
          case "sv":
            prompt += `Kundens produkt eller tjänst #${i} Beskrivning: ${productDescription}\n`;
            break;
          case "fi":
            prompt += `Asiakkaan tuote tai palvelu #${i} Kuvaus: ${productDescription}\n`;
            break;
          case "da":
            prompt += `Kundens produkt eller service #${i} Beskrivelse: ${productDescription}\n`;
            break;
          case "no":
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
    productDescription5
  );

  const promptTopic = {
    en: "business objectives",
    de: "Unternehmensziele",
    fr: "objectifs commerciaux",
    es: "objetivos comerciales",
    it: "obiettivi aziendali",
    nl: "bedrijfsdoelstellingen",
    ja: "ビジネス目標",
    ar: "أهداف العمل",
    sv: "företagsmål",
    fi: "liiketoimintatavoitteet",
    da: "virksomhedsmål",
    no: "bedriftsmål",
  };

  const prompt = {
    "en-uk": `
    You are a professional consultant, and a customer approaches you to write ${promptTopic.en} for a business plan.

    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The client's distribution channel is ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}

    This is the expected revenue: ${firstYearRevenue}
    This is the expected yearly growth rate: ${revenueGrowthRate}
    This is the net profit margin: ${netProfitMargin}

    This is the Industry Overview and Key Market Trends: ${situ1Ref}
    Use data from "Key Market Trends" where relevant to generate some of the objectives.

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    Do not repeat the business details.
    The ${promptTopic.en} MUST INCLUDE THESE TOPICS: short-term objectives(1-2 years), medium-term objectives(3-5 years) long-term objectives(more than 5 years). DO NOT include other topics unless specified here. Each topic will have multiple objectives wrapped in <li> tag. Short-term objectives should be modest and Longer-term objectives should be ambitious.

    You must use SMART goal setting.
    Don't write company name.
    Specify explicitly how many years to accomplish a goal. order the objectives by number of years it will take to complete, objectives with fewer years to complete comes first. Don't use the word "by" when specifying the time it takes to achieve an objective.
    Don't specify present numerical value of a KPI in objectives, for example don't write increase market share from 10% to 20% just say increase market share to 20%.
    Don't use the word "from".be descriptive when writing objectives.
    Come up with at least 4 objectives for each <h5> tag.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html.
    Begin the completion with "<h3>Marketing</h3>" followed by "<h4>${promptTopic.en}</h4>". There should only be one <h3> tag which is <h3>Marketing</h3> and one <h4> tag which is <h4>${promptTopic.en}</h4>. There must be 3 <h5> tags which are <h5>Short-term Objectives<h5>, <h5>Medium-term Objectives<h5> and <h5>Long-term Objectives<h5>. 
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    use british english spelling and grammar
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,
    en: `
    You are a professional consultant, and a customer approaches you to write ${promptTopic.en} for a business plan.

    These are the business details:
    business detail 1: The client's business name is ${businessName}.
    business detail 2: The type of business is ${businessType}. 
    business detail 3: This is where the business's customers are: ${location}.
    business detail 4: The client's will employ ${NEmployee} employees.
    business detail 5: The client's distribution channel is ${salesChannel}.
    business detail 6: The client's business operational status is ${businessOperationalStatus}.

    These are the key success factors: ${successFactors1}, ${successFactors2}, ${successFactors3}

    This is the expected revenue: ${firstYearRevenue}
    This is the expected yearly growth rate: ${revenueGrowthRate}
    This is the net profit margin: ${netProfitMargin}

    This is the Industry Overview and Key Market Trends: ${situ1Ref}
    Use data from "Key Market Trends" where relevant to generate some of the objectives.

    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    Do not repeat the business details.
    The ${promptTopic.en} MUST INCLUDE THESE TOPICS: short-term objectives(1-2 years), medium-term objectives(3-5 years) long-term objectives(more than 5 years). DO NOT include other topics unless specified here. Each topic will have multiple objectives wrapped in <li> tag. Short-term objectives should be modest and Longer-term objectives should be ambitious.

    You must use SMART goal setting.
    Don't write company name.
    Specify explicitly how many years to accomplish a goal. order the objectives by number of years it will take to complete, objectives with fewer years to complete comes first. Don't use the word "by" when specifying the time it takes to achieve an objective.
    Don't specify present numerical value of a KPI in objectives, for example don't write increase market share from 10% to 20% just say increase market share to 20%.
    Don't use the word "from".be descriptive when writing objectives.
    Come up with at least 4 objectives for each <h5> tag.

    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html.
    Begin the completion with "<h3>Marketing</h3>" followed by "<h4>${promptTopic.en}</h4>". There should only be one <h3> tag which is <h3>Marketing</h3> and one <h4> tag which is <h4>${promptTopic.en}</h4>. There must be 3 <h5> tags which are <h5>Short-term Objectives<h5>, <h5>Medium-term Objectives<h5> and <h5>Long-term Objectives<h5>. 
    Use only HTML tags, don’t use markdown. Don’t use ** **, instead use  tag for bold. Don’t use * *, instead use  tag for italic. Don’t use * for bullet points, instead use  tag.
    Generate everything in English.
    This is important: Be very insightful in your response.
    This is the long, detailed, and insightful ${promptTopic.en} you came up with:
    `,

    // german lang --------------------------------------------------------
    de: `Sie sind ein professioneller Berater und ein Kunde kommt auf Sie zu, um ${promptTopic.de} für einen Geschäftsplan zu schreiben.

    Dies sind die Geschäftsdaten:
    Geschäftsdetail 1: Der Firmenname des Kunden ist ${businessName}.
    Geschäftsdetail 2: Die Art des Geschäfts ist ${businessType}.
    Geschäftsdetail 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdetail 4: Der Kunde wird ${NEmployee}-Mitarbeiter beschäftigen.
    Geschäftsdetail 5: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdetail 6: Der geschäftliche Betriebsstatus des Kunden ist ${businessOperationalStatus}.

  Dies sind die wichtigsten Erfolgsfaktoren: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dies ist der erwartete Umsatz: ${firstYearRevenue}
  Dies ist die erwartete jährliche Wachstumsrate: ${revenueGrowthRate}
  Dies ist die Nettogewinnspanne: ${netProfitMargin}

  Dies ist der Branchenüberblick und die wichtigsten Markttrends: ${situ1Ref}
  Verwenden Sie gegebenenfalls Daten aus „Schlüsselmarkttrends“, um einige der Ziele zu generieren.

  Dies sind Angaben zu den Produkten oder Dienstleistungen des Kunden:
  ${productInfoPrompt}

  Dies sind weitere Anweisungen:
  Wiederholen Sie die Geschäftsdetails nicht.
  Das ${promptTopic.de} MUSS DIESE THEMEN ENTHALTEN: kurzfristige Ziele (1-2 Jahre), mittelfristige Ziele (3-5 Jahre), langfristige Ziele (mehr als 5 Jahre). Fügen Sie KEINE anderen Themen hinzu, es sei denn, dies ist hier angegeben. Jedes Thema hat mehrere Ziele, die im <li>-Tag verpackt sind. Kurzfristige Ziele sollten bescheiden und längerfristige Ziele ehrgeizig sein.

  Sie müssen die SMART-Zielsetzung verwenden.
  Schreiben Sie keinen Firmennamen.
  Geben Sie explizit an, in wie vielen Jahren ein Ziel erreicht werden soll. Ordnen Sie die Ziele nach der Anzahl der Jahre, die bis zur Erreichung benötigt werden. Ziele mit weniger Jahren bis zur Erreichung stehen an erster Stelle. Verwenden Sie nicht das Wort „bis“, wenn Sie die Zeit angeben, die zum Erreichen eines Ziels benötigt wird.
  Geben Sie in den Zielen nicht den aktuellen numerischen Wert eines KPI an. Schreiben Sie beispielsweise nicht „Marktanteil von 10 % auf 20 % erhöhen“, sondern nur „Marktanteil auf 20 % erhöhen“.
  Verwenden Sie beim Schreiben von Zielen nicht das Wort „von“. Seien Sie beschreibend.
  Überlegen Sie sich für jedes <h5>-Tag mindestens 4 Ziele.

  Schreiben Sie dies so, als ob Sie der Eigentümer des Unternehmens wären. Verwenden Sie „wir“ und nicht „ich“.
  Antwort im HTML generieren.
  Beginnen Sie die Vervollständigung mit „<h3>Marketing</h3>“, gefolgt von „<h4>${promptTopic.de}</h4>“. Es sollte nur ein <h3>-Tag für <h3>Marketing</h3> und ein <h4>-Tag für <h4>${promptTopic.de}</h4> vorhanden sein. Es müssen 3 <h5>-Tags vorhanden sein, nämlich <h5>Kurzfristige Ziele<h5>, <h5>Mittelfristige Ziele<h5> und <h5>Langfristige Ziele<h5>.
  Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das -Tag für Fettschrift. Verwenden Sie nicht * *, sondern verwenden Sie das -Tag für Kursivschrift. Verwenden Sie nicht *, sondern verwenden Sie das -Tag für Aufzählungspunkte.
  Generiere alles auf Deutsch.
  Dies ist wichtig: Seien Sie in Ihrer Antwort sehr einsichtig.
  Dies ist das lange, detaillierte und aufschlussreiche ${promptTopic.de}, das Sie sich ausgedacht haben:
  `,

    //french lang --------------------------------------------------------
    fr: `
    Vous êtes un consultant professionnel et un client vous approche pour écrire ${promptTopic.fr} pour un plan d'affaires.

  Voici les détails de l'entreprise :
  détail d'entreprise 1 : Le nom de l'entreprise du client est ${businessName}.
  détail d'entreprise 2 : Le type d'entreprise est ${businessType}.
  détail d'entreprise 3 : Voici où se trouvent les clients de l'entreprise : ${location}.
  détail d'entreprise 4 : Le client emploiera ${NEmployee} employés.
  détail d'entreprise 5 : Le canal de distribution du client est ${salesChannel}.
  détail d'entreprise 6 : L'état opérationnel de l'entreprise du client est ${businessOperationalStatus}.

  Voici les facteurs clés de succès : ${successFactors1}, ${successFactors2}, ${successFactors3}

  Voici le revenu attendu : ${firstYearRevenue}
  Voici le taux de croissance annuel prévu : ${revenueGrowthRate}
  Voici la marge bénéficiaire nette : ${netProfitMargin}

  Voici l'Aperçu du Secteur et les Tendances Clés du Marché : ${situ1Ref}
  Utilisez des données de "Tendances Clés du Marché" pour générer certains des objectifs.

  Détails des produits ou services du client :
  ${productInfoPrompt}

  Instructions supplémentaires :
  Ne pas répéter les détails de l'entreprise.
  Le ${promptTopic.fr} DOIT INCLURE CES SUJETS : objectifs à court terme (1-2 ans), objectifs à moyen terme (3-5 ans), objectifs à long terme (plus de 5 ans). N'INCLURE aucun autre sujet à moins qu'il ne soit spécifié ici. Chaque sujet aura plusieurs objectifs entourés de la balise <li>. Les objectifs à court terme doivent être modestes et les objectifs à long terme ambitieux.

  Vous devez utiliser la méthode de définition d'objectifs SMART.
  Ne pas écrire le nom de l'entreprise.
  Spécifiez explicitement combien d'années pour accomplir un objectif. Ordonnez les objectifs par le nombre d'années nécessaires pour les accomplir, en commençant par ceux qui prennent le moins de temps. Ne pas utiliser le mot "d'ici" lors de la spécification du temps nécessaire pour atteindre un objectif.
  Ne pas spécifier la valeur numérique actuelle d'un indicateur de performance clé dans les objectifs, par exemple ne pas écrire augmenter la part de marché de 10 % à 20 % mais simplement dire augmenter la part de marché à 20 %.
  Ne pas utiliser le mot "de". Soyez descriptif en écrivant les objectifs.
  Formuler au moins 4 objectifs pour chaque balise <h5>.

  Écrivez comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
  Générez une réponse en HTML.
  Commencez par "<h3>Marketing</h3>" suivi de "<h4>${promptTopic.fr}</h4>". Il ne doit y avoir qu'une seule balise <h3> qui est <h3>Marketing</h3> et une seule balise <h4> qui est <h4>${promptTopic.fr}</h4>. Il doit y avoir 3 balises <h5> qui sont <h5>Objectifs à court terme<h5>, <h5>Objectifs à moyen terme<h5> et <h5>Objectifs à long terme<h5>.
  Utilisez uniquement des balises HTML, n’utilisez pas de markdown. N’utilisez pas ** **, utilisez plutôt la balise  pour le gras. N’utilisez pas * *, utilisez plutôt la balise  pour l’italique. N’utilisez pas *, utilisez plutôt la balise  pour les points de liste.
  Générez tout en français.
  C’est important : Soyez très perspicace dans votre réponse.
  Voici le long, détaillé et perspicace ${promptTopic.fr} que vous avez trouvé :
    `,

    //spanish lang --------------------------------------------------------
    es: `
    Usted es un consultor profesional y un cliente se acerca para que escriba ${promptTopic.es} para un plan de negocios.

  Estos son los detalles del negocio:
  detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
  detalle del negocio 2: El tipo de negocio es ${businessType}.
  detalle del negocio 3: Aquí es donde se encuentran los clientes del negocio: ${location}.
  detalle del negocio 4: El cliente empleará a ${NEmployee} empleados.
  detalle del negocio 5: El canal de distribución del cliente es ${salesChannel}.
  detalle del negocio 6: El estado operacional del negocio del cliente es ${businessOperationalStatus}.

  Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Esta es la rentabilidad esperada: ${firstYearRevenue}
  Esta es la tasa de crecimiento anual prevista: ${revenueGrowthRate}
  Este es el margen de beneficio neto: ${netProfitMargin}

  Aquí está el Resumen de la Industria y las Tendencias Claves del Mercado: ${situ1Ref}
  Utilice datos de "Tendencias Claves del Mercado" donde sea relevante para generar algunos de los objetivos.

  Detalles de los productos o servicios del cliente:
  ${productInfoPrompt}

  Instrucciones adicionales:
  No repetir los detalles del negocio.
  El ${promptTopic.es} DEBE INCLUIR ESTOS TEMAS: objetivos a corto plazo (1-2 años), objetivos a medio plazo (3-5 años) y objetivos a largo plazo (más de 5 años). NO incluir otros temas a menos que se especifique aquí. Cada tema tendrá múltiples objetivos, cada uno dentro de una etiqueta <li>. Los objetivos a corto plazo deben ser modestos y los de largo plazo ambiciosos.

  Debe utilizar la metodología de establecimiento de objetivos SMART.
  No escribir el nombre de la empresa.
  Especifique explícitamente cuántos años se necesitan para alcanzar un objetivo. Ordene los objetivos por el número de años que se tardará en completarlos, comenzando por los que requieren menos tiempo. No utilice la palabra "para" al especificar el tiempo necesario para lograr un objetivo.
  No especifique el valor numérico actual de un KPI en los objetivos, por ejemplo, no escriba aumentar la cuota de mercado del 10% al 20%, sino aumentar la cuota de mercado al 20%.
  No utilice la palabra "de". Sea descriptivo al escribir los objetivos.
  Desarrolle al menos 4 objetivos para cada etiqueta <h5>.

  Escriba como si fuera el propietario del negocio, utilizando "nosotros" en lugar de "yo".
  Genere la respuesta en HTML.
  Comience con "<h3>Marketing</h3>" seguido de "<h4>${promptTopic.es}</h4>". Solo debe haber una etiqueta <h3> que es <h3>Marketing</h3> y una etiqueta <h4> que es <h4>${promptTopic.es}</h4>. Debe haber 3 etiquetas <h5> que son <h5>Objetivos a Corto Plazo<h5>, <h5>Objetivos a Medio Plazo<h5> y <h5>Objetivos a Largo Plazo<h5>.
  Use solo etiquetas HTML, no use markdown. No use ** **, use la etiqueta  para negrita. No use * *, use la etiqueta  para cursiva. No use *, use la etiqueta  para viñetas.
  Genere todo en español.
  Esto es importante: Sea muy perspicaz en su respuesta.
  Este es el largo, detallado y perspicaz ${promptTopic.es} que se le ocurrió:
    `,

    //italian lang --------------------------------------------------------
    it: `
    Sei un consulente professionale e un cliente ti avvicina per scrivere ${promptTopic.it} per un piano aziendale.

  Ecco i dettagli dell'azienda:
  dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
  dettaglio aziendale 2: Il tipo di attività è ${businessType}.
  dettaglio aziendale 3: Questo è dove si trovano i clienti dell'azienda: ${location}.
  dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
  dettaglio aziendale 5: Il canale di distribuzione del cliente è ${salesChannel}.
  dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.

  Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Questo è il fatturato previsto: ${firstYearRevenue}
  Questo è il tasso di crescita annuale previsto: ${revenueGrowthRate}
  Questo è il margine di profitto netto: ${netProfitMargin}

  Ecco la Panoramica dell'Industria e le Tendenze Chiave del Mercato: ${situ1Ref}
  Usa i dati delle "Tendenze Chiave del Mercato" dove è rilevante per generare alcuni degli obiettivi.

  Dettagli dei prodotti o servizi del cliente:
  ${productInfoPrompt}

  Ulteriori istruzioni:
  Non ripetere i dettagli aziendali.
  Il ${promptTopic.it} DEVE INCLUDERE QUESTI TEMI: obiettivi a breve termine (1-2 anni), obiettivi a medio termine (3-5 anni) e obiettivi a lungo termine (oltre 5 anni). NON includere altri argomenti a meno che non sia specificato qui. Ogni argomento avrà più obiettivi, ciascuno all'interno di un tag <li>. Gli obiettivi a breve termine dovrebbero essere modesti e quelli a lungo termine ambiziosi.

  È necessario utilizzare l'impostazione degli obiettivi SMART.
  Non scrivere il nome dell'azienda.
  Specifica esplicitamente in quanti anni si prevede di raggiungere un obiettivo. Ordina gli obiettivi per il numero di anni necessari per completarli, iniziando da quelli che richiedono meno tempo. Non utilizzare la parola "entro" quando si specifica il tempo necessario per raggiungere un obiettivo.
  Non specificare il valore numerico attuale di un KPI negli obiettivi, ad esempio non scrivere aumentare la quota di mercato dal 10% al 20% ma solo aumentare la quota di mercato al 20%.
  Non usare la parola "da". Essere descrittivi nello scrivere gli obiettivi.
  Sviluppare almeno 4 obiettivi per ogni tag <h5>.

  Scrivi come se fossi il proprietario dell'azienda, usando "noi" non "io".
  Genera la risposta in HTML.
  Inizia con "<h3>Marketing</h3>" seguito da "<h4>${promptTopic.it}</h4>". Dovrebbe esserci un solo tag <h3> che è <h3>Marketing</h3> e un tag <h4> che è <h4>${promptTopic.it}</h4>. Ci devono essere 3 tag <h5> che sono <h5>Obiettivi a Breve Termine<h5>, <h5>Obiettivi a Medio Termine<h5> e <h5>Obiettivi a Lungo Termine<h5>.
  Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag  per il grassetto. Non usare * *, usa invece il tag  per il corsivo. Non usare *, usa invece il tag  per i punti elenco.
  Genera tutto in italiano.
  Questo è importante: Sii molto perspicace nella tua risposta.
  Questo è il lungo, dettagliato e perspicace ${promptTopic.it} che hai ideato:
    `,

    // dutch lang --------------------------------------------------------
    nl: `
    U bent een professionele consultant en een klant benadert u om ${promptTopic.nl} te schrijven voor een bedrijfsplan.

    Dit zijn de bedrijfsdetails:
    bedrijfsdetail 1: De bedrijfsnaam van de klant is ${businessName}.
    bedrijfsdetail 2: Het type bedrijf is ${businessType}.
    bedrijfsdetail 3: Dit is waar de klanten van het bedrijf zich bevinden: ${location}.
    bedrijfsdetail 4: De klant zal ${NEmployee} werknemers in dienst hebben.
    bedrijfsdetail 5: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsdetail 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.

    Dit zijn de sleutelfactoren voor succes: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Dit is de verwachte omzet: ${firstYearRevenue}
    Dit is het verwachte jaarlijkse groeipercentage: ${revenueGrowthRate}
    Dit is de nettowinstmarge: ${netProfitMargin}

    Dit is het Overzicht van de Industrie en Belangrijke Markttrends: ${situ1Ref}
    Gebruik gegevens uit "Belangrijke Markttrends" waar relevant om enkele van de doelstellingen te genereren.

    Dit zijn details van de producten of diensten van de klant:
    ${productInfoPrompt}

    Dit zijn verdere instructies:
    Herhaal de bedrijfsdetails niet.
    De ${promptTopic.nl} MOET DEZE ONDERWERPEN BEVATTEN: korte termijn doelstellingen (1-2 jaar), middellange termijn doelstellingen (3-5 jaar) lange termijn doelstellingen (meer dan 5 jaar). INCLUSIEF geen andere onderwerpen tenzij hier gespecificeerd. Elk onderwerp zal meerdere doelstellingen hebben, elk in een <li> tag. Korte termijn doelstellingen moeten bescheiden zijn en Lange termijn doelstellingen moeten ambitieus zijn.

    U moet SMART-doelstellingen gebruiken.
    Schrijf de bedrijfsnaam niet.
    Specificeer expliciet hoeveel jaar het kost om een doel te bereiken. rangschik de doelstellingen op het aantal jaren dat het kost om ze te voltooien, doelstellingen die minder jaren kosten komen eerst. Gebruik het woord "door" niet bij het specificeren van de tijd die nodig is om een doel te bereiken.
    Specificeer niet de huidige numerieke waarde van een KPI in doelstellingen, schrijf bijvoorbeeld niet verhoog de marktaandeel van 10% naar 20% zeg gewoon verhoog de marktaandeel naar 20%.
    Gebruik het woord "van" niet. Wees beschrijvend bij het schrijven van doelstellingen.
    Bedenk minstens 4 doelstellingen voor elke <h5> tag.

    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" niet "ik".
    Genereer reactie in html.
    Begin de voltooiing met "<h3>Marketing</h3>" gevolgd door "<h4>${promptTopic.nl}</h4>". Er mag maar één <h3> tag zijn, namelijk <h3>Marketing</h3> en één <h4> tag, namelijk <h4>${promptTopic.nl}</h4>. Er moeten 3 <h5> tags zijn, namelijk <h5>Korte termijn doelstellingen<h5>, <h5>Middellange termijn doelstellingen<h5> en <h5>Lange termijn doelstellingen<h5>.
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik niet ** **, gebruik in plaats daarvan de -tag voor vetgedrukte tekst. Gebruik niet * *, gebruik in plaats daarvan de -tag voor cursieve tekst. Gebruik geen *, gebruik in plaats daarvan de -tag voor opsommingstekens.
    Genereer alles in het Nederlands.
    Dit is belangrijk: Wees zeer inzichtelijk in uw antwoord.
    Dit is de lange, gedetailleerde en inzichtelijke ${promptTopic.nl} die u bedacht hebt:
    `,

    // japanese lang --------------------------------------------------------
    ja: `
    あなたはプロのコンサルタントで、顧客がビジネスプランのための${promptTopic.ja}を書くようにあなたにアプローチしてきました。

    これらはビジネスの詳細です：
    ビジネス詳細1：クライアントのビジネス名は${businessName}です。
    ビジネス詳細2：ビジネスのタイプは${businessType}です。
    ビジネス詳細3：ビジネスの顧客がいる場所は${location}です。
    ビジネス詳細4：クライアントは${NEmployee}人の従業員を雇います。
    ビジネス詳細5：クライアントの配布チャンネルは${salesChannel}です。
    ビジネス詳細6：クライアントのビジネス運営状況は${businessOperationalStatus}です。

    これらは成功の鍵となる要素です：${successFactors1}、${successFactors2}、${successFactors3}

    これが予想される収益です：${firstYearRevenue}
    これが予想される年間成長率です：${revenueGrowthRate}
    これが純利益率です：${netProfitMargin}

    これが業界概要と主要な市場トレンドです：${situ1Ref}
    目標を生成するために、関連する場所で"主要な市場トレンド"からデータを使用します。

    これらはクライアントの製品またはサービスの詳細です：
    ${productInfoPrompt}
  
    これらはさらなる指示です：
    ビジネスの詳細を繰り返さないでください。
    ${promptTopic.ja}は、これらのトピックを含める必要があります：短期目標（1-2年）、中期目標（3-5年）、長期目標（5年以上）。ここで指定されていない他のトピックを含めないでください。各トピックは、複数の目標を<li>タグで囲んで持つでしょう。短期目標は控えめでなければならず、長期目標は野心的でなければなりません。

    SMART目標設定を使用する必要があります。
    会社名を書かないでください。
    目標を達成するのに何年かかるかを明示的に指定してください。目標を達成するのにかかる年数で目標を順序付けし、達成するのに年数が少ない目標が最初に来ます。目標を達成するのにかかる時間を指定するときに"by"という言葉を使用しないでください。
    目標でKPIの現在の数値を指定しないでください、例えば市場シェアを10%から20%に増やすと書かないで、ただ市場シェアを20%に増やすと言ってください。
    "from"という言葉を使用しないでください。目標を書くときには説明的であること。
    各<h5>タグに対して少なくとも4つの目標を思いつくこと。

    あなたがビジネスのオーナーであるかのようにこれを書き、"we"を使用し、"I"を使用しないでください。
    応答をhtmlで生成します。
    完成を"<h3>マーケティング</h3>"で始め、その後に"<h4>${promptTopic.ja}</h4>"を続けます。"<h3>マーケティング</h3>"という1つの<h3>タグだけがあり、"<h4>${promptTopic.ja}</h4>"という1つの<h4>タグだけがあるべきです。"<h5>短期目標<h5>"、"<h5>中期目標<h5>"、"<h5>長期目標<h5>"という3つの<h5>タグがあるべきです。
    HTMLタグのみを使用し、Markdownを使用しないでください。 ** **を使用せず、太字にはタグを使用してください。 * *を使用せず、斜体にはタグを使用してください。 *を使用せず、箇条書きにはタグを使用してください。
    すべてを日本語で生成します。
    これは重要です: 回答には非常に洞察力を持ってください。
    これがあなたが考えた長くて詳細で洞察に満ちた${promptTopic.ja}です:
    `,

    //arabic lang --------------------------------------------------------
    ar: `
    أنت مستشار محترف، وقد اقترب منك العميل لكتابة ${promptTopic.ar} لخطة العمل.

    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم العمل للعميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو المكان الذي يتواجد فيه عملاء العمل: ${location}.
    تفاصيل العمل 4: سوف يوظف العميل ${NEmployee} موظف.
    تفاصيل العمل 5: قناة التوزيع للعميل هي ${salesChannel}.
    تفاصيل العمل 6: حالة العمل التشغيلية للعميل هي ${businessOperationalStatus}.

  هذه هي عوامل النجاح الرئيسية: ${successFactors1}، ${successFactors2}، ${successFactors3}

  هذه هي الإيرادات المتوقعة: ${firstYearRevenue}
  هذا هو معدل النمو السنوي المتوقع: ${revenueGrowthRate}
  هذا هو هامش الربح الصافي: ${netProfitMargin}

  هذا هو نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق: ${situ1Ref}
  استخدم البيانات من "الاتجاهات الرئيسية في السوق" حيثما كان ذلك ذا صلة لتوليد بعض الأهداف.

  هذه هي تفاصيل منتجات العميل أو الخدمات:
  ${productInfoPrompt}
  
  هذه هي التعليمات الإضافية:
  لا تكرر تفاصيل العمل.
  يجب أن يتضمن ${promptTopic.ar} هذه المواضيع: الأهداف القصيرة الأجل (1-2 سنة)، الأهداف المتوسطة الأجل (3-5 سنوات) الأهداف الطويلة الأجل (أكثر من 5 سنوات). لا تتضمن مواضيع أخرى ما لم يتم تحديدها هنا. سيكون لكل موضوع أهداف متعددة محاطة بوسم <li>. يجب أن تكون الأهداف القصيرة الأجل متواضعة والأهداف الطويلة الأجل طموحة.

  يجب أن تستخدم تحديد الأهداف الذكية.
  لا تكتب اسم الشركة.
  حدد بوضوح عدد السنوات لتحقيق الهدف. قم بترتيب الأهداف حسب عدد السنوات التي ستستغرقها للإكمال، الأهداف التي تستغرق سنوات أقل للإكمال تأتي أولاً. لا تستخدم كلمة "بحلول" عند تحديد الوقت الذي يستغرقه تحقيق الهدف.
  لا تحدد القيمة العددية الحالية لمؤشر الأداء الرئيسي في الأهداف، على سبيل المثال لا تكتب زيادة حصة السوق من 10% إلى 20% فقط قل زيادة حصة السوق إلى 20%.
  لا تستخدم كلمة "من". كن واضحاً عند كتابة الأهداف.
  ابتكر على الأقل 4 أهداف لكل وسم <h5>.

  اكتب هذا كما لو كنت صاحب العمل، باستخدام "نحن" لا تستخدم "أنا".
  أنشئ الرد باللغة العربية.
  ابدأ الإكمال بـ "<h3>التسويق</h3>" تليها "<h4>${promptTopic.ar}</h4>". يجب أن يكون هناك وسم <h3> واحد فقط وهو <h3>التسويق</h3> ووسم <h4> واحد فقط وهو <h4>${promptTopic.ar}</h4>. يجب أن يكون هناك 3 أوسمة <h5> وهي <h5>الأهداف القصيرة الأجل<h5>، <h5>الأهداف المتوسطة الأجل<h5> و<h5>الأهداف الطويلة الأجل<h5>.
  استخدم فقط علامات HTML، ولا تستخدم ماركداون. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للنص الغامق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للنص المائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li> للنقاط.
  أنشئ كل شيء باللغة العربية.
  هذا مهم: كن ثاقبًا جدًا في ردك.
  هذا هو الـ${promptTopic.ar} الطويل والمفصل والعميق الذي توصلت إليه:
    `,

    // swedish lang --------------------------------------------------------
    sv: `
    Du är en professionell konsult, och en kund närmar sig dig för att skriva ${promptTopic.sv} för en affärsplan.

    Detta är företagsdetaljerna:
    företagsdetalj 1: Kundens företagsnamn är ${businessName}.
    företagsdetalj 2: Typen av företag är ${businessType}.
    företagsdetalj 3: Detta är var företagets kunder finns: ${location}.
    företagsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda.
    företagsdetalj 5: Kundens distributionskanal är ${salesChannel}.
    företagsdetalj 6: Kundens företagsoperativa status är ${businessOperationalStatus}.

    Dessa är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}

    Detta är den förväntade intäkten: ${firstYearRevenue}
    Detta är den förväntade årliga tillväxthastigheten: ${revenueGrowthRate}
    Detta är nettovinstmarginalen: ${netProfitMargin}

    Detta är en översikt över industrin och viktiga marknadstrender: ${situ1Ref}
    Använd data från "Viktiga marknadstrender" där det är relevant för att generera några av målen.

    Dessa är detaljer om kundens produkter eller tjänster:
    ${productInfoPrompt}
    
    Dessa är ytterligare instruktioner:
    Upprepa inte företagsdetaljerna.
    ${promptTopic.sv} MÅSTE INKLUDERA DESSA ÄMNEN: kortsiktiga mål (1-2 år), medellånga mål (3-5 år) långsiktiga mål (mer än 5 år). INKLUDERA INTE andra ämnen om det inte specificeras här. Varje ämne kommer att ha flera mål inramade i <li> taggen. Kortsiktiga mål bör vara modesta och långsiktiga mål bör vara ambitiösa.

    Du måste använda SMART målsättning.
    Skriv inte företagsnamnet.
    Specificera uttryckligen hur många år för att uppnå ett mål. Ordna målen efter antalet år det kommer att ta att slutföra, mål med färre år att slutföra kommer först. Använd inte ordet "av" när du specificerar den tid det tar att uppnå ett mål.
    Specificera inte nuvarande numeriskt värde av en KPI i mål, till exempel skriv inte öka marknadsandelen från 10% till 20% säg bara öka marknadsandelen till 20%.
    Använd inte ordet "från". Var beskrivande när du skriver mål.
    Kom upp med minst 4 mål för varje <h5> tagg.

    Skriv detta som om du är ägaren till företaget, använd "vi" använd inte "jag".
    Generera svar i html.
    Börja slutförandet med "<h3>Marknadsföring</h3>" följt av "<h4>${promptTopic.sv}</h4>". Det bör bara finnas en <h3> tagg som är <h3>Marknadsföring</h3> och en <h4> tagg som är <h4>${promptTopic.sv}</h4>. Det måste finnas 3 <h5> taggar som är <h5>Kortsiktiga mål<h5>, <h5>Medellånga mål<h5> och <h5>Långsiktiga mål<h5>.
    Använd endast HTML-taggar, använd inte markdown. Använd inte ** **, använd istället -taggen för fetstil. Använd inte * *, använd istället -taggen för kursiv. Använd inte *, använd istället -taggen för punktlistor.
    Generera allt på svenska.
    Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är den långa, detaljerade och insiktsfulla ${promptTopic.sv} du kom på:
    `,

    // finnish lang --------------------------------------------------------
    fi: `
    Olet ammattikonsultti, ja asiakas lähestyy sinua kirjoittamaan ${promptTopic.fi} liiketoimintasuunnitelmaan.

    Nämä ovat yrityksen tiedot:
    yrityksen tieto 1: Asiakkaan yrityksen nimi on ${businessName}.
    yrityksen tieto 2: Yrityksen tyyppi on ${businessType}. 
    yrityksen tieto 3: Tässä ovat yrityksen asiakkaat: ${location}.
    yrityksen tieto 4: Asiakas palkkaa ${NEmployee} työntekijää.
    yrityksen tieto 5: Asiakkaan jakelukanava on ${salesChannel}.
    yrityksen tieto 6: Asiakkaan yrityksen toiminnallinen tila on ${businessOperationalStatus}.

  Nämä ovat avaintekijät menestykselle: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Tämä on odotettu liikevaihto: ${firstYearRevenue}
  Tämä on odotettu vuotuinen kasvuvauhti: ${revenueGrowthRate}
  Tämä on nettotulosmarginaali: ${netProfitMargin}

  Tämä on teollisuuden yleiskatsaus ja tärkeät markkinatrendit: ${situ1Ref}
  Käytä "Key Market Trends" -tietoja tarvittaessa joidenkin tavoitteiden luomiseen.

  Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
  ${productInfoPrompt}
  
  Nämä ovat lisäohjeet:
  Älä toista yrityksen tietoja.
  ${promptTopic.fi} ON SISÄLLYTTÄVÄ NÄMÄ AIHEET: lyhyen aikavälin tavoitteet (1-2 vuotta), keskipitkän aikavälin tavoitteet (3-5 vuotta) pitkän aikavälin tavoitteet (yli 5 vuotta). ÄLÄ sisällytä muita aiheita, ellei niitä ole määritelty tässä. Jokaisella aiheella on useita tavoitteita, jotka on kääritty <li> -tagiin. Lyhyen aikavälin tavoitteiden tulisi olla vaatimattomia ja pitkän aikavälin tavoitteiden tulisi olla kunnianhimoisia.

  Sinun on käytettävä SMART-tavoitteiden asettamista.
  Älä kirjoita yrityksen nimeä.
  Määritä nimenomaisesti, kuinka monta vuotta tavoitteen saavuttaminen kestää. Järjestä tavoitteet sen mukaan, kuinka monta vuotta niiden saavuttaminen kestää, tavoitteet, joilla on vähemmän vuosia, tulevat ensin. Älä käytä sanaa "by" määritettäessä aikaa, joka tavoitteen saavuttamiseen kuluu.
  Älä määritä KPI:n nykyistä numeerista arvoa tavoitteissa, esimerkiksi älä kirjoita lisää markkinaosuutta 10%:sta 20%:iin, sano vain lisää markkinaosuutta 20%:iin.
  Älä käytä sanaa "from". Ole kuvaileva kirjoittaessasi tavoitteita.
  Keksi vähintään 4 tavoitetta jokaiselle <h5> -tagille.

  Kirjoita tämä kuin olisit yrityksen omistaja, käytä "me", älä käytä "minä".
  Generoi vastaus html-muodossa.
  Aloita täydennys "<h3>Markkinointi</h3>" seurattuna "<h4>${promptTopic.fi}</h4>". Pitäisi olla vain yksi <h3> -tagi, joka on <h3>Markkinointi</h3> ja yksi <h4> -tagi, joka on <h4>${promptTopic.fi}</h4>. On oltava 3 <h5> -tagia, jotka ovat <h5>Lyhyen aikavälin tavoitteet<h5>, <h5>Keskipitkän aikavälin tavoitteet<h5> ja <h5>Pitkän aikavälin tavoitteet<h5>. 
  Käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, vaan käytä vahvennukseen -tagia. Älä käytä * *, vaan käytä kursivointiin -tagia. Älä käytä *, vaan käytä luettelomerkeille -tagia.
  Luo kaikki suomeksi.
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
  Tämä on pitkä, yksityiskohtainen ja oivaltava ${promptTopic.fi}, jonka keksit:
    `,

    // danish lang --------------------------------------------------------
    da: `
    Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive ${promptTopic.da} til en forretningsplan.

    Dette er virksomhedens detaljer:
    virksomhedsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    virksomhedsdetalje 2: Virksomhedens type er ${businessType}. 
    virksomhedsdetalje 3: Dette er hvor virksomhedens kunder er: ${location}.
    virksomhedsdetalje 4: Kunden vil ansætte ${NEmployee} medarbejdere.
    virksomhedsdetalje 5: Kundens distributionskanal er ${salesChannel}.
    virksomhedsdetalje 6: Kundens virksomheds operationelle status er ${businessOperationalStatus}.

  Dette er de vigtige succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dette er den forventede indtægt: ${firstYearRevenue}
  Dette er den forventede årlige vækstrate: ${revenueGrowthRate}
  Dette er nettofortjenstmargenen: ${netProfitMargin}

  Dette er Industrioversigt og Vigtige Markedstrends: ${situ1Ref}
  Brug data fra "Vigtige Markedstrends" hvor det er relevant for at generere nogle af målene.

  Dette er detaljer om kundens produkter eller tjenester:
  ${productInfoPrompt}
  
  Dette er yderligere instruktioner:
  Gentag ikke virksomhedens detaljer.
  ${promptTopic.da} SKAL INKLUDERE DISSE EMNER: kortfristede mål (1-2 år), mellemlange mål (3-5 år) langsigtede mål (mere end 5 år). INKLUDER IKKE andre emner, medmindre de er specificeret her. Hvert emne vil have flere mål indpakket i en <li> tag. Kortfristede mål skal være beskedne og langsigtede mål skal være ambitiøse.

  Du skal bruge SMART målsætning.
  Skriv ikke virksomhedens navn.
  Specificer eksplicit hvor mange år det tager at opnå et mål. Bestil målene efter antallet af år det vil tage at fuldføre, mål med færre år at fuldføre kommer først. Brug ikke ordet "by" når du specificerer den tid det tager at opnå et mål.
  Specificer ikke den nuværende numeriske værdi af en KPI i mål, for eksempel skriv ikke øg markedsandelen fra 10% til 20% bare sig øg markedsandelen til 20%.
  Brug ikke ordet "fra". Vær beskrivende når du skriver mål.
  Kom op med mindst 4 mål for hver <h5> tag.

  Skriv dette som om du er ejeren af virksomheden, brug "vi" brug ikke "jeg".
  Generer svar i html.
  Begynd udfyldelsen med "<h3>Marketing</h3>" efterfulgt af "<h4>${promptTopic.da}</h4>". Der skal kun være en <h3> tag som er <h3>Marketing</h3> og en <h4> tag som er <h4>${promptTopic.da}</h4>. Der skal være 3 <h5> tags som er <h5>Kortfristede Mål<h5>, <h5>Mellemlange Mål<h5> og <h5>Lange Mål<h5>. 
  Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet -tagget til fed skrift. Brug ikke * *, brug i stedet -tagget til kursiv skrift. Brug ikke *, brug i stedet -tagget til punkttegn.
  Generer alt på dansk.
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar.
  Dette er den lange, detaljerede og indsigtsfulde ${promptTopic.da}, du kom op med:
    `,

    // norwegian lang --------------------------------------------------------
    no: `
    Du er en profesjonell konsulent, og en kunde nærmer seg deg for å skrive ${promptTopic.no} for en forretningsplan.

    Dette er forretningsdetaljene:
    forretningsdetalj 1: Kundens firmanavn er ${businessName}.
    forretningsdetalj 2: Typen virksomhet er ${businessType}. 
    forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
    forretningsdetalj 4: Kunden vil ansette ${NEmployee} ansatte.
    forretningsdetalj 5: Kundens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 6: Kundens forretningsoperasjonelle status er ${businessOperationalStatus}.

  Dette er de viktige suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}

  Dette er den forventede inntekten: ${firstYearRevenue}
  Dette er den forventede årlige vekstraten: ${revenueGrowthRate}
  Dette er nettofortjenestemarginen: ${netProfitMargin}

  Dette er Industrioversikt og Viktige Markedstrender: ${situ1Ref}
  Bruk data fra "Viktige Markedstrender" der det er relevant for å generere noen av målene.

  Dette er detaljer om kundens produkter eller tjenester:
  ${productInfoPrompt}
  
  Dette er ytterligere instruksjoner:
  Ikke gjenta forretningsdetaljene.
  ${promptTopic.no} MÅ INKLUDERE DISSE EMNENE: kortsiktige mål (1-2 år), mellomlangsiktige mål (3-5 år) langsiktige mål (mer enn 5 år). IKKE inkluder andre emner med mindre de er spesifisert her. Hvert emne vil ha flere mål innpakket i en <li> tag. Kortsiktige mål skal være beskjedne og langsiktige mål skal være ambisiøse.

  Du må bruke SMART målsetting.
  Ikke skriv firmanavnet.
  Spesifiser eksplisitt hvor mange år det tar å oppnå et mål. Bestill målene etter antall år det vil ta å fullføre, mål med færre år å fullføre kommer først. Ikke bruk ordet "by" når du spesifiserer tiden det tar å oppnå et mål.
  Ikke spesifiser nåværende numerisk verdi av en KPI i mål, for eksempel ikke skriv øk markedsandelen fra 10% til 20% bare si øk markedsandelen til 20%.
  Ikke bruk ordet "fra". Vær beskrivende når du skriver mål.
  Kom opp med minst 4 mål for hver <h5> tag.

  Skriv dette som om du er eieren av virksomheten, bruk "vi" ikke bruk "jeg".
  Generer respons i html.
  Begynn utfyllingen med "<h3>Markedsføring</h3>" etterfulgt av "<h4>${promptTopic.no}</h4>". Det skal bare være en <h3> tag som er <h3>Markedsføring</h3> og en <h4> tag som er <h4>${promptTopic.no}</h4>. Det må være 3 <h5> tags som er <h5>Kortsiktige Mål<h5>, <h5>Mellomlangsiktige Mål<h5> og <h5>Lange Mål<h5>. 
  Bruk bare HTML-koder, ikke bruk markdown. Ikke bruk ** **, bruk i stedet -taggen for fet skrift. Ikke bruk * *, bruk i stedet -taggen for kursiv skrift. Ikke bruk *, bruk i stedet -taggen for punktlister.
  Generer alt på norsk.
  Dette er viktig: Vær veldig innsiktsfull i ditt svar.
  Dette er den lange, detaljerte og innsiktsfulle ${promptTopic.no} du kom opp med:
    `,
  };

  let modelPlanQuota = "gpt-3.5-turbo";
  if (planQuota <= 8) {
    modelPlanQuota = "gpt-3.5-turbo";
    console.log("using gpt-3.5-turbo");
  } else {
    modelPlanQuota = "gpt-4";
    console.log("using gpt-4");
  }

  const payload = {
    model: variantID === "2" ? "gpt-4o" : modelPlanQuota,
    messages: [{ role: "user", content: prompt[planLanguage] ?? prompt.en }],
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
