import { AI_MODEL } from '../../../constants/plan';
import { OpenAIStream } from '../../../utils/OpenAIChatStream';

interface IMarketingBusinessObjectives {
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
  firstYearRevenue: string;
  revenueGrowthRate: string;
  netProfitMargin: string;
  situ1Ref: string;
  productInfoPrompt: string;
  planLanguage: string;
  variantID: string;
  modelName?: string;
}

// api4Mark1.ts
export const marketingBusinessObjectives = (
  request: IMarketingBusinessObjectives,
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

    firstYearRevenue,
    revenueGrowthRate,
    netProfitMargin,

    situ1Ref,
    productInfoPrompt,
    planLanguage,
    variantID,
    modelName,
  } = request;

  const mark1TopicEN = 'business objectives';
  const mark1TopicDE = 'Unternehmensziele';
  const mark1TopicFR = 'objectifs commerciaux';
  const mark1TopicES = 'objetivos empresariales';
  const mark1TopicIT = 'obiettivi aziendali';
  const mark1TopicNL = 'bedrijfsdoelstellingen';
  const mark1TopicJA = 'ビジネス目標';
  const mark1TopicAR = 'أهداف الأعمال';
  const mark1TopicSV = 'företagsmål';
  const mark1TopicFI = 'liiketoimintatavoitteet';
  const mark1TopicDA = 'virksomhedsmål';
  const mark1TopicNO = 'bedriftsmål';

  const promptTemplates = {
    en: `
    You are a professional consultant, and a customer approaches you to write ${mark1TopicEN} for a business plan.
  
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
  
    This is the Industry Overview and Key Market Trends: ${situ1Ref}
    Use data from "Key Market Trends" where relevant to generate some of the objectives.
  
    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    Do not repeat the business details.
    The ${mark1TopicEN} MUST INCLUDE THESE TOPICS: short-term objectives(1-2 years), medium-term objectives(3-5 years) long-term objectives(more than 5 years). DO NOT include other topics unless specified here. Each topic will have multiple objectives wrapped in <li> tag. Short-term objectives should be modest and Longer-term objectives should be ambitious.
  
    You must use SMART goal setting.
    Don't write company name.
    Specify explicitly how many years to accomplish a goal. order the objectives by number of years it will take to complete, objectives with fewer years to complete comes first. Don't use the word "by" when specifying the time it takes to achieve an objective.
    Don't specify present numerical value of a KPI in objectives, for example don't write increase market share from 10% to 20% just say increase market share to 20%.
    Don't use the word "from".be descriptive when writing objectives.
    Come up with at least 4 objectives for each <h5> tag.
  
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html.
    Begin the completion with "<h3>${mark1TopicEN}</h3>". There should only be one <h3> tag which is <h3>${mark1TopicEN}</h3>. There must be 3 <h4> tags which are <h4>Short-term Objectives<h4>, <h4>Medium-term Objectives<h4> and <h4>Long-term Objectives<h4>.
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
  Generate everything in English.
  This is important: Be very insightful in your response
    This is the ${mark1TopicEN} you came up with:
    `,
    'en-uk': `
    You are a professional consultant, and a customer approaches you to write ${mark1TopicEN} for a business plan.
  
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
  
    This is the Industry Overview and Key Market Trends: ${situ1Ref}
    Use data from "Key Market Trends" where relevant to generate some of the objectives.
  
    These are details of the client's products or services:
    ${productInfoPrompt}
    
    These are further instructions:
    Do not repeat the business details.
    The ${mark1TopicEN} MUST INCLUDE THESE TOPICS: short-term objectives(1-2 years), medium-term objectives(3-5 years) long-term objectives(more than 5 years). DO NOT include other topics unless specified here. Each topic will have multiple objectives wrapped in <li> tag. Short-term objectives should be modest and Longer-term objectives should be ambitious.
  
    You must use SMART goal setting.
    Don't write company name.
    Specify explicitly how many years to accomplish a goal. order the objectives by number of years it will take to complete, objectives with fewer years to complete comes first. Don't use the word "by" when specifying the time it takes to achieve an objective.
    Don't specify present numerical value of a KPI in objectives, for example don't write increase market share from 10% to 20% just say increase market share to 20%.
    Don't use the word "from".be descriptive when writing objectives.
    Come up with at least 4 objectives for each <h5> tag.
  
    Write this as if you are the owner of the business, using "we" don't use "I".
    Generate response in html.
    Begin the completion with "<h3>${mark1TopicEN}</h3>". There should only be one <h3> tag which is <h3>${mark1TopicEN}</h3>. There must be 3 <h4> tags which are <h4>Short-term Objectives<h4>, <h4>Medium-term Objectives<h4> and <h4>Long-term Objectives<h4>.
    use only HTML tags don't use markdown. Don't use ** **, instead use <strong> tag for bold. Don't use * *, instead use <em> tag for italic. Don't use * for bullet points, instead use <li> tag.
    Generate everything in English.
    This is important: Be very insightful in your response
    use british english spelling and grammar
    This is the ${mark1TopicEN} you came up with:
    `,
    de: `Sie sind ein professioneller Berater, und ein Kunde wendet sich an Sie, um ${mark1TopicDE} für einen Geschäftsplan zu schreiben.

    Dies sind die Geschäftsdaten:
    Geschäftsdaten 1: Der Name des Unternehmens des Kunden ist ${businessName}.
    Geschäftsdaten 2: Die Art des Unternehmens ist ${businessType}. 
    Geschäftsdaten 3: Hier befinden sich die Kunden des Unternehmens: ${location}.
    Geschäftsdaten 4: Der Kunde wird ${NEmployee} Mitarbeiter beschäftigen.
    Geschäftsdaten 5: Der Vertriebskanal des Kunden ist ${salesChannel}.
    Geschäftsdaten 6: Der betriebliche Status des Unternehmens des Kunden ist ${businessOperationalStatus}.
  
    Dies sind die Schlüsselfaktoren für den Erfolg: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Dies ist der erwartete Umsatz: ${firstYearRevenue}
    Dies ist die erwartete jährliche Wachstumsrate: ${revenueGrowthRate}
  
    Dies ist der Branchenüberblick und die wichtigsten Markttrends: ${situ1Ref}
    Verwenden Sie relevante Daten aus "Key Market Trends", um einige der Ziele zu generieren.
  
    Dies sind die Details zu den Produkten oder Dienstleistungen des Kunden:
    ${productInfoPrompt}
    
    Dies sind weitere Anweisungen:
    Wiederholen Sie die Geschäftsdaten nicht.
    Die ${mark1TopicDE} MÜSSEN DIESE THEMEN ENTHALTEN: kurzfristige Ziele (1-2 Jahre), mittelfristige Ziele (3-5 Jahre), langfristige Ziele (mehr als 5 Jahre). Schließen Sie keine anderen Themen ein, es sei denn, sie sind hier angegeben. Jedes Thema wird mehrere Ziele enthalten, die in <li>-Tags eingeschlossen sind. Kurzfristige Ziele sollten bescheiden und langfristige Ziele ehrgeizig sein.
  
    Sie müssen SMART-Zielsetzung verwenden.
    Schreiben Sie keinen Firmennamen.
    Geben Sie ausdrücklich an, wie viele Jahre es dauert, ein Ziel zu erreichen. Ordnen Sie die Ziele nach der Anzahl der Jahre, die zur Erreichung benötigt werden, Ziele mit weniger Jahren zur Erreichung kommen zuerst. Verwenden Sie nicht das Wort "by", wenn Sie die Zeit angeben, die zur Erreichung eines Ziels benötigt wird.
    Geben Sie keinen aktuellen numerischen Wert eines KPI in den Zielen an, zum Beispiel schreiben Sie nicht "Marktanteil von 10% auf 20% erhöhen", sondern sagen Sie einfach "Marktanteil auf 20% erhöhen".
    Verwenden Sie nicht das Wort "von". Seien Sie beschreibend, wenn Sie Ziele schreiben.
    Kommen Sie mit mindestens 4 Zielen für jedes <h5>-Tag.
  
    Schreiben Sie dies, als ob Sie der Eigentümer des Unternehmens wären, verwenden Sie "wir", nicht "ich".
    Generieren Sie die Antwort in HTML.
    Beginnen Sie die Ausführung mit "<h3>${mark1TopicDE}</h3>". Es sollte nur ein <h3>-Tag geben, das <h3>${mark1TopicDE}</h3> ist. Es müssen 3 <h4>-Tags vorhanden sein, die <h4>Kurzfristige Ziele<h4>, <h4>Mittelfristige Ziele<h4> und <h4>Langfristige Ziele<h4> sind.
    Verwenden Sie nur HTML-Tags, verwenden Sie kein Markdown. Verwenden Sie nicht ** **, sondern verwenden Sie das <strong>-Tag für fett. Verwenden Sie nicht * *, sondern verwenden Sie das <em>-Tag für kursiv. Verwenden Sie nicht * für Aufzählungspunkte, sondern verwenden Sie das <li>-Tag.
  Generieren Sie alles auf Deutsch.
  Das ist wichtig: Seien Sie sehr aufschlussreich in Ihrer Antwort.
    Dies sind die ${mark1TopicDE}, die Sie sich ausgedacht haben:
    `,
    fr: `Vous êtes un consultant professionnel, et un client vous demande d'écrire ${mark1TopicFR} pour un plan d'affaires.

    Voici les détails de l'entreprise:
    détail commercial 1: Le nom de l'entreprise du client est ${businessName}.
    détail commercial 2: Le type d'entreprise est ${businessType}. 
    détail commercial 3: Voici où se trouvent les clients de l'entreprise: ${location}.
    détail commercial 4: Le client emploiera ${NEmployee} employés.
    détail commercial 5: Le canal de distribution du client est ${salesChannel}.
    détail commercial 6: Le statut opérationnel de l'entreprise du client est ${businessOperationalStatus}.
  
    Voici les facteurs clés de succès: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Voici le chiffre d'affaires attendu: ${firstYearRevenue}
    Voici le taux de croissance annuel attendu: ${revenueGrowthRate}
  
    Voici la vue d'ensemble de l'industrie et les principales tendances du marché: ${situ1Ref}
    Utilisez les données de "Key Market Trends" pertinentes pour générer certains des objectifs.
  
    Voici les détails des produits ou services du client:
    ${productInfoPrompt}
    
    Voici d'autres instructions:
    Ne répétez pas les détails de l'entreprise.
    Les ${mark1TopicFR} DOIVENT INCLURE CES SUJETS: objectifs à court terme (1-2 ans), objectifs à moyen terme (3-5 ans), objectifs à long terme (plus de 5 ans). N'incluez pas d'autres sujets sauf spécifiés ici. Chaque sujet aura plusieurs objectifs enveloppés dans une balise <li>. Les objectifs à court terme doivent être modestes et les objectifs à long terme doivent être ambitieux.
  
    Vous devez utiliser la définition des objectifs SMART.
    Ne mentionnez pas le nom de l'entreprise.
    Spécifiez explicitement combien d'années il faut pour atteindre un objectif. Classez les objectifs par nombre d'années nécessaires pour les atteindre, les objectifs avec moins d'années pour les atteindre viennent en premier. N'utilisez pas le mot "par" lorsque vous spécifiez le temps nécessaire pour atteindre un objectif.
    Ne spécifiez pas la valeur numérique actuelle d'un KPI dans les objectifs, par exemple n'écrivez pas "augmenter la part de marché de 10% à 20%", dites simplement "augmenter la part de marché à 20%".
    N'utilisez pas le mot "de". Soyez descriptif lorsque vous rédigez des objectifs.
    Proposez au moins 4 objectifs pour chaque balise <h5>.
  
    Écrivez ceci comme si vous étiez le propriétaire de l'entreprise, en utilisant "nous" et non "je".
    Générez la réponse en HTML.
    Commencez la complétion par "<h3>${mark1TopicFR}</h3>". Il ne doit y avoir qu'une seule balise <h3> qui est <h3>${mark1TopicFR}</h3>. Il doit y avoir 3 balises <h4> qui sont <h4>Objectifs à court terme<h4>, <h4>Objectifs à moyen terme<h4> et <h4>Objectifs à long terme<h4>.
    Utilisez uniquement des balises HTML, n'utilisez pas de markdown. N'utilisez pas ** **, utilisez plutôt la balise <strong> pour le gras. N'utilisez pas * *, utilisez plutôt la balise <em> pour l'italique. N'utilisez pas * pour les puces, utilisez plutôt la balise <li>.
  Générez tout en français.
  C'est important : Soyez très perspicace dans votre réponse
    Voici les ${mark1TopicFR} que vous avez trouvés:
    `,
    es: `Usted es un consultor profesional, y un cliente se le acerca para que escriba ${mark1TopicES} para un plan de negocios.

    Estos son los detalles del negocio:
    detalle del negocio 1: El nombre del negocio del cliente es ${businessName}.
    detalle del negocio 2: El tipo de negocio es ${businessType}. 
    detalle del negocio 3: Aquí es donde están los clientes del negocio: ${location}.
    detalle del negocio 4: El cliente empleará ${NEmployee} empleados.
    detalle del negocio 5: El canal de distribución del cliente es ${salesChannel}.
    detalle del negocio 6: El estado operativo del negocio del cliente es ${businessOperationalStatus}.
  
    Estos son los factores clave de éxito: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Estos son los ingresos esperados: ${firstYearRevenue}
    Esta es la tasa de crecimiento anual esperada: ${revenueGrowthRate}
  
    Esta es la visión general de la industria y las principales tendencias del mercado: ${situ1Ref}
    Utilice datos de "Key Market Trends" donde sea relevante para generar algunos de los objetivos.
  
    Estos son los detalles de los productos o servicios del cliente:
    ${productInfoPrompt}
    
    Estas son más instrucciones:
    No repita los detalles del negocio.
    Los ${mark1TopicES} DEBEN INCLUIR ESTOS TEMAS: objetivos a corto plazo (1-2 años), objetivos a mediano plazo (3-5 años), objetivos a largo plazo (más de 5 años). NO incluya otros temas a menos que se especifique aquí. Cada tema tendrá múltiples objetivos envueltos en una etiqueta <li>. Los objetivos a corto plazo deben ser modestos y los objetivos a largo plazo deben ser ambiciosos.
  
    Debe utilizar la configuración de objetivos SMART.
    No escriba el nombre de la empresa.
    Especifique explícitamente cuántos años se necesitan para lograr un objetivo. Ordene los objetivos por número de años que llevará completarlos, los objetivos con menos años para completarse vienen primero. No use la palabra "por" cuando especifique el tiempo que lleva lograr un objetivo.
    No especifique el valor numérico actual de un KPI en los objetivos, por ejemplo, no escriba aumentar la cuota de mercado del 10% al 20%, solo diga aumentar la cuota de mercado al 20%.
    No use la palabra "de". Sea descriptivo al escribir objetivos.
    Proponga al menos 4 objetivos para cada etiqueta <h5>.
  
    Escriba esto como si fuera el propietario del negocio, usando "nosotros" no "yo".
    Genere la respuesta en HTML.
    Comience la finalización con "<h3>${mark1TopicES}</h3>". Solo debe haber una etiqueta <h3> que es <h3>${mark1TopicES}</h3>. Debe haber 3 etiquetas <h4> que son <h4>Objetivos a corto plazo<h4>, <h4>Objetivos a mediano plazo<h4> y <h4>Objetivos a largo plazo<h4>.
    Use solo etiquetas HTML, no use markdown. No use ** **, en su lugar use la etiqueta <strong> para negrita. No use * *, en su lugar use la etiqueta <em> para cursiva. No use * para viñetas, en su lugar use la etiqueta <li>.
  Genere todo en español.
  Esto es importante: Sé muy perspicaz en tu respuesta
    Estos son los ${mark1TopicES} que se le ocurrieron:
    `,
    it: `Sei un consulente professionista e un cliente si rivolge a te per scrivere ${mark1TopicIT} per un piano aziendale.

    Questi sono i dettagli dell'azienda:
    dettaglio aziendale 1: Il nome dell'azienda del cliente è ${businessName}.
    dettaglio aziendale 2: Il tipo di azienda è ${businessType}. 
    dettaglio aziendale 3: Ecco dove si trovano i clienti dell'azienda: ${location}.
    dettaglio aziendale 4: Il cliente impiegherà ${NEmployee} dipendenti.
    dettaglio aziendale 5: Il canale di distribuzione del cliente è ${salesChannel}.
    dettaglio aziendale 6: Lo stato operativo dell'azienda del cliente è ${businessOperationalStatus}.
  
    Questi sono i fattori chiave di successo: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Questi sono i ricavi previsti: ${firstYearRevenue}
    Questo è il tasso di crescita annuale previsto: ${revenueGrowthRate}
  
    Questa è la panoramica del settore e le principali tendenze di mercato: ${situ1Ref}
    Utilizzare i dati di "Key Market Trends" pertinenti per generare alcuni degli obiettivi.
  
    Questi sono i dettagli dei prodotti o servizi del cliente:
    ${productInfoPrompt}
    
    Queste sono ulteriori istruzioni:
    Non ripetere i dettagli dell'azienda.
    Gli ${mark1TopicIT} DEVONO INCLUDERE QUESTI ARGOMENTI: obiettivi a breve termine (1-2 anni), obiettivi a medio termine (3-5 anni), obiettivi a lungo termine (più di 5 anni). NON includere altri argomenti a meno che non siano specificati qui. Ogni argomento avrà più obiettivi avvolti in un tag <li>. Gli obiettivi a breve termine dovrebbero essere modesti e gli obiettivi a lungo termine dovrebbero essere ambiziosi.
  
    Devi utilizzare la definizione degli obiettivi SMART.
    Non scrivere il nome dell'azienda.
    Specifica esplicitamente quanti anni ci vogliono per raggiungere un obiettivo. Ordina gli obiettivi per numero di anni necessari per completarli, gli obiettivi con meno anni per completarsi vengono prima. Non usare la parola "entro" quando specifichi il tempo necessario per raggiungere un obiettivo.
    Non specificare il valore numerico attuale di un KPI negli obiettivi, ad esempio non scrivere aumentare la quota di mercato dal 10% al 20%, basta dire aumentare la quota di mercato al 20%.
    Non usare la parola "da". Sii descrittivo quando scrivi gli obiettivi.
    Proponi almeno 4 obiettivi per ogni tag <h5>.
  
    Scrivi questo come se fossi il proprietario dell'azienda, usando "noi" non "io".
    Genera la risposta in HTML.
    Inizia il completamento con "<h3>${mark1TopicIT}</h3>". Ci dovrebbe essere solo un tag <h3> che è <h3>${mark1TopicIT}</h3>. Ci devono essere 3 tag <h4> che sono <h4>Obiettivi a breve termine<h4>, <h4>Obiettivi a medio termine<h4> e <h4>Obiettivi a lungo termine<h4>.
    Usa solo tag HTML, non usare markdown. Non usare ** **, usa invece il tag <strong> per il grassetto. Non usare * *, usa invece il tag <em> per il corsivo. Non usare * per i punti elenco, usa invece il tag <li>.
  genera tutto in italiano
  Questo è importante: Sii molto perspicace nella tua risposta
    Questi sono gli ${mark1TopicIT} che hai trovato:
    `,
    nl: `U bent een professionele consultant en een klant benadert u om ${mark1TopicNL} voor een bedrijfsplan te schrijven.

    Dit zijn de bedrijfsgegevens:
    bedrijfsgegevens 1: De naam van het bedrijf van de klant is ${businessName}.
    bedrijfsgegevens 2: Het type bedrijf is ${businessType}. 
    bedrijfsgegevens 3: Hier bevinden zich de klanten van het bedrijf: ${location}.
    bedrijfsgegevens 4: De klant zal ${NEmployee} werknemers in dienst nemen.
    bedrijfsgegevens 5: Het distributiekanaal van de klant is ${salesChannel}.
    bedrijfsgegevens 6: De operationele status van het bedrijf van de klant is ${businessOperationalStatus}.
  
    Dit zijn de belangrijkste succesfactoren: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Dit is de verwachte omzet: ${firstYearRevenue}
    Dit is de verwachte jaarlijkse groeipercentage: ${revenueGrowthRate}
  
    Dit is het brancheoverzicht en de belangrijkste markttrends: ${situ1Ref}
    Gebruik relevante gegevens uit "Key Market Trends" om enkele van de doelstellingen te genereren.
  
    Dit zijn de details van de producten of diensten van de klant:
    ${productInfoPrompt}
    
    Dit zijn verdere instructies:
    Herhaal de bedrijfsgegevens niet.
    De ${mark1TopicNL} MOETEN DEZE ONDERWERPEN BEVATTEN: kortetermijndoelstellingen (1-2 jaar), middellangetermijndoelstellingen (3-5 jaar), langetermijndoelstellingen (meer dan 5 jaar). Voeg geen andere onderwerpen toe, tenzij hier gespecificeerd. Elk onderwerp zal meerdere doelstellingen bevatten die in een <li>-tag zijn ingesloten. Kortetermijndoelstellingen moeten bescheiden zijn en langetermijndoelstellingen moeten ambitieus zijn.
  
    U moet SMART-doelstellingen gebruiken.
    Schrijf geen bedrijfsnaam.
    Specificeer expliciet hoeveel jaren het duurt om een doelstelling te bereiken. Orden de doelstellingen op aantal jaren dat nodig is om ze te voltooien, doelstellingen met minder jaren om te voltooien komen eerst. Gebruik niet het woord "tegen" bij het specificeren van de tijd die nodig is om een doelstelling te bereiken.
    Specificeer geen huidige numerieke waarde van een KPI in doelstellingen, bijvoorbeeld schrijf niet "verhoog het marktaandeel van 10% naar 20%", maar zeg gewoon "verhoog het marktaandeel naar 20%".
    Gebruik niet het woord "van". Wees beschrijvend bij het schrijven van doelstellingen.
    Bedenk minstens 4 doelstellingen voor elke <h5>-tag.
  
    Schrijf dit alsof u de eigenaar van het bedrijf bent, gebruik "wij" en niet "ik".
    Genereer de reactie in HTML.
    Begin de voltooiing met "<h3>${mark1TopicNL}</h3>". Er mag slechts één <h3>-tag zijn, namelijk <h3>${mark1TopicNL}</h3>. Er moeten 3 <h4>-tags zijn, namelijk <h4>Kortetermijndoelstellingen<h4>, <h4>Middellangetermijndoelstellingen<h4> en <h4>Langetermijndoelstellingen<h4>.
    Gebruik alleen HTML-tags, gebruik geen markdown. Gebruik geen ** **, gebruik in plaats daarvan de <strong>-tag voor vetgedrukt. Gebruik geen * *, gebruik in plaats daarvan de <em>-tag voor cursief. Gebruik geen * voor opsommingstekens, gebruik in plaats daarvan de <li>-tag.
  genereer alles in het Nederlands
  Dit is belangrijk: Wees zeer inzichtelijk in je antwoord
  Dit is de gedetailleerde en inzichtelijke ${mark1TopicNL} die u hebt bedacht:
    `,
    ja: `あなたはプロのコンサルタントであり、顧客がビジネスプランのために${mark1TopicJA}を書くように依頼してきます。

    これらはビジネスの詳細です:
    ビジネス詳細 1: クライアントのビジネス名は${businessName}です。
    ビジネス詳細 2: ビジネスの種類は${businessType}です。
    ビジネス詳細 3: これはビジネスの顧客がいる場所です: ${location}。
    ビジネス詳細 4: クライアントは${NEmployee}人の従業員を雇用します。
    ビジネス詳細 5: クライアントの流通チャネルは${salesChannel}です。
    ビジネス詳細 6: クライアントのビジネス運営状況は${businessOperationalStatus}です。
  
    これらは主要な成功要因です: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    これは予想される収益です: ${firstYearRevenue}
    これは予想される年間成長率です: ${revenueGrowthRate}
  
    これは業界の概要と主要な市場動向です: ${situ1Ref}
    目標を生成するために「主要な市場動向」から関連データを使用してください。
  
    これらはクライアントの製品またはサービスの詳細です:
    ${productInfoPrompt}
    
    これらはさらに指示です:
    ビジネスの詳細を繰り返さないでください。
    ${mark1TopicJA}にはこれらのトピックを含める必要があります: 短期目標(1-2年)、中期目標(3-5年)、長期目標(5年以上)。ここで指定されていない限り、他のトピックを含めないでください。各トピックには<li>タグで囲まれた複数の目標が含まれます。短期目標は控えめで、長期目標は野心的であるべきです。
  
    SMART目標設定を使用する必要があります。
    会社名を書かないでください。
    目標を達成するのにかかる年数を明確に指定してください。目標を達成するのにかかる年数で目標を並べ替え、完了するのに少ない年数がかかる目標が最初に来ます。目標を達成するのにかかる時間を指定する際に「までに」という言葉を使用しないでください。
    目標にKPIの現在の数値を指定しないでください。例えば、「市場シェアを10％から20％に増やす」と書かずに、「市場シェアを20％に増やす」とだけ書いてください。
    「から」という言葉を使用しないでください。目標を書く際には説明的であるべきです。
    各<h5>タグに対して少なくとも4つの目標を考え出してください。
  
    ビジネスの所有者として書いてください。「私」ではなく「私たち」を使用してください。
    HTMLで応答を生成してください。
    完了を"<h3>${mark1TopicJA}</h3>"で開始してください。<h3>タグは1つだけで、<h3>${mark1TopicJA}</h3>です。3つの<h4>タグが必要です: <h4>短期目標<h4>、<h4>中期目標<h4>、<h4>長期目標<h4>。
    HTMLタグのみを使用し、マークダウンを使用しないでください。** **の代わりに<strong>タグを使用して太字にします。* *の代わりに<em>タグを使用して斜体にします。箇条書きには*を使用せず、代わりに<li>タグを使用してください。
  すべて日本語で生成してください。
  これは重要です: 回答に非常に洞察力を持ってください
    これがあなたが考え出した${mark1TopicJA}です:
    `,
    ar: `أنت مستشار محترف، ويقترب منك عميل لكتابة ${mark1TopicAR} لخطة عمل.

    هذه هي تفاصيل العمل:
    تفاصيل العمل 1: اسم عمل العميل هو ${businessName}.
    تفاصيل العمل 2: نوع العمل هو ${businessType}.
    تفاصيل العمل 3: هذا هو مكان وجود عملاء العمل: ${location}.
    تفاصيل العمل 4: سيوظف العميل ${NEmployee} موظف.
    تفاصيل العمل 5: قناة توزيع العميل هي ${salesChannel}.
    تفاصيل العمل 6: حالة التشغيل الخاصة بعمل العميل هي ${businessOperationalStatus}.
  
    هذه هي عوامل النجاح الرئيسية: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    هذا هو الإيرادات المتوقعة: ${firstYearRevenue}
    هذا هو معدل النمو السنوي المتوقع: ${revenueGrowthRate}
  
    هذا هو نظرة عامة على الصناعة والاتجاهات الرئيسية في السوق: ${situ1Ref}
    استخدم البيانات من "الاتجاهات الرئيسية في السوق" حيثما كان ذلك مناسبًا لتوليد بعض الأهداف.
  
    هذه هي تفاصيل منتجات أو خدمات العميل:
    ${productInfoPrompt}
    
    هذه هي التعليمات الإضافية:
    لا تكرر تفاصيل العمل.
    يجب أن تتضمن ${mark1TopicAR} هذه الموضوعات: الأهداف قصيرة المدى (1-2 سنوات)، الأهداف متوسطة المدى (3-5 سنوات)، الأهداف طويلة المدى (أكثر من 5 سنوات). لا تتضمن مواضيع أخرى إلا إذا تم تحديدها هنا. كل موضوع سيحتوي على أهداف متعددة ملفوفة في علامة <li>. يجب أن تكون الأهداف قصيرة المدى متواضعة والأهداف طويلة المدى طموحة.
  
    يجب عليك استخدام إعداد الأهداف SMART.
    لا تكتب اسم الشركة.
    حدد بوضوح عدد السنوات اللازمة لتحقيق الهدف. رتب الأهداف حسب عدد السنوات التي ستستغرقها لإكمالها، تأتي الأهداف التي تستغرق سنوات أقل لإكمالها أولاً. لا تستخدم كلمة "بحلول" عند تحديد الوقت اللازم لتحقيق الهدف.
    لا تحدد القيمة العددية الحالية لمؤشر الأداء الرئيسي في الأهداف، على سبيل المثال لا تكتب زيادة حصة السوق من 10٪ إلى 20٪ فقط قل زيادة حصة السوق إلى 20٪.
    لا تستخدم كلمة "من". كن وصفيًا عند كتابة الأهداف.
    ابتكر ما لا يقل عن 4 أهداف لكل علامة <h5>.
  
    اكتب هذا كما لو كنت مالك العمل، باستخدام "نحن" لا تستخدم "أنا".
    قم بإنشاء الاستجابة في HTML.
    ابدأ الإكمال بـ "<h3>${mark1TopicAR}</h3>". يجب أن يكون هناك علامة <h3> واحدة فقط وهي <h3>${mark1TopicAR}</h3>. يجب أن تكون هناك 3 علامات <h4> وهي <h4>الأهداف قصيرة المدى<h4>، <h4>الأهداف متوسطة المدى<h4> و <h4>الأهداف طويلة المدى<h4>.
    استخدم علامات HTML فقط لا تستخدم الماركدوان. لا تستخدم ** **، بدلاً من ذلك استخدم علامة <strong> للتغميق. لا تستخدم * *، بدلاً من ذلك استخدم علامة <em> للمائل. لا تستخدم * للنقاط النقطية، بدلاً من ذلك استخدم علامة <li>.
  قم بإنشاء كل شيء باللغة العربية.
  هذا مهم: كن ثاقب الرأي في ردك
    هذا هو ${mark1TopicAR} الذي توصلت إليه:
    `,
    sv: `Du är en professionell konsult, och en kund närmar sig dig för att skriva ${mark1TopicSV} för en affärsplan.

    Detta är affärsdetaljerna:
    affärsdetalj 1: Kundens företagsnamn är ${businessName}.
    affärsdetalj 2: Typen av verksamhet är ${businessType}.
    affärsdetalj 3: Detta är var företagets kunder finns: ${location}.
    affärsdetalj 4: Kunden kommer att anställa ${NEmployee} anställda.
    affärsdetalj 5: Kundens distributionskanal är ${salesChannel}.
    affärsdetalj 6: Kundens affärsdriftstatus är ${businessOperationalStatus}.
  
    Detta är de viktigaste framgångsfaktorerna: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Detta är den förväntade intäkten: ${firstYearRevenue}
    Detta är den förväntade årliga tillväxttakten: ${revenueGrowthRate}
  
    Detta är branschöversikten och de viktigaste marknadstrenderna: ${situ1Ref}
    Använd data från "Key Market Trends" där det är relevant för att generera några av målen.
  
    Detta är detaljerna om kundens produkter eller tjänster:
    ${productInfoPrompt}
    
    Detta är ytterligare instruktioner:
    Upprepa inte affärsdetaljerna.
    ${mark1TopicSV} MÅSTE INNEHÅLLA DESSA ÄMNEN: kortsiktiga mål (1-2 år), medellånga mål (3-5 år), långsiktiga mål (mer än 5 år). Inkludera INTE andra ämnen om de inte specificeras här. Varje ämne kommer att ha flera mål inslagna i <li>-taggen. Kortsiktiga mål bör vara blygsamma och långsiktiga mål bör vara ambitiösa.
  
    Du måste använda SMART målformulering.
    Skriv inte företagsnamn.
    Ange uttryckligen hur många år det tar att uppnå ett mål. ordna målen efter antal år det tar att slutföra, mål med färre år att slutföra kommer först. Använd inte ordet "vid" när du specificerar tiden det tar att uppnå ett mål.
    Ange inte nuvarande numeriska värde för en KPI i målen, till exempel skriv inte öka marknadsandelen från 10% till 20% bara säg öka marknadsandelen till 20%.
    Använd inte ordet "från". var beskrivande när du skriver mål.
    Kom på minst 4 mål för varje <h5>-tagg.
  
    Skriv detta som om du är ägaren av företaget, använd "vi" använd inte "jag".
    Generera svar i html.
    Börja slutförandet med "<h3>${mark1TopicSV}</h3>". Det ska bara finnas en <h3>-tagg som är <h3>${mark1TopicSV}</h3>. Det måste finnas 3 <h4>-taggar som är <h4>Kortsiktiga mål<h4>, <h4>Medellånga mål<h4> och <h4>Långsiktiga mål<h4>.
    använd endast HTML-taggar använd inte markdown. Använd inte ** **, använd istället <strong>-taggen för fetstil. Använd inte * *, använd istället <em>-taggen för kursiv stil. Använd inte * för punktlistor, använd istället <li>-taggen.
  generera allt på svenska
  Detta är viktigt: Var mycket insiktsfull i ditt svar.
    Detta är ${mark1TopicSV} du kom på:
    `,
    fi: `Olet ammattimainen konsultti, ja asiakas lähestyy sinua kirjoittamaan ${mark1TopicFI} liiketoimintasuunnitelmaa varten.

    Nämä ovat liiketoiminnan tiedot:
    liiketoiminnan yksityiskohta 1: Asiakkaan yrityksen nimi on ${businessName}.
    liiketoiminnan yksityiskohta 2: Yrityksen tyyppi on ${businessType}.
    liiketoiminnan yksityiskohta 3: Tämä on paikka, jossa yrityksen asiakkaat ovat: ${location}.
    liiketoiminnan yksityiskohta 4: Asiakas työllistää ${NEmployee} työntekijää.
    liiketoiminnan yksityiskohta 5: Asiakkaan jakelukanava on ${salesChannel}.
    liiketoiminnan yksityiskohta 6: Asiakkaan liiketoiminnan operatiivinen tila on ${businessOperationalStatus}.
  
    Nämä ovat keskeiset menestystekijät: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Tämä on odotettu liikevaihto: ${firstYearRevenue}
    Tämä on odotettu vuotuinen kasvuvauhti: ${revenueGrowthRate}
  
    Tämä on toimialan yleiskatsaus ja keskeiset markkinatrendit: ${situ1Ref}
    Käytä "Keskeiset markkinatrendit" -tiedoista asiaankuuluvia tietoja joidenkin tavoitteiden luomiseen.
  
    Nämä ovat asiakkaan tuotteiden tai palveluiden tiedot:
    ${productInfoPrompt}
    
    Nämä ovat lisäohjeet:
    Älä toista liiketoiminnan tietoja.
    ${mark1TopicFI} TÄYTYY SISÄLTÄÄ NÄMÄ AIHEET: lyhyen aikavälin tavoitteet (1-2 vuotta), keskipitkän aikavälin tavoitteet (3-5 vuotta), pitkän aikavälin tavoitteet (yli 5 vuotta). ÄLÄ sisällytä muita aiheita, ellei niitä ole määritelty tässä. Jokaisessa aiheessa on useita tavoitteita, jotka on kääritty <li>-tagiin. Lyhyen aikavälin tavoitteiden tulisi olla vaatimattomia ja pitkän aikavälin tavoitteiden tulisi olla kunnianhimoisia.
  
    Sinun on käytettävä SMART-tavoitteiden asettamista.
    Älä kirjoita yrityksen nimeä.
    Määritä selvästi, kuinka monta vuotta tavoitteen saavuttaminen kestää. järjestä tavoitteet vuosien määrän mukaan, joka niiden saavuttamiseen kuluu, tavoitteet, joiden saavuttaminen vie vähemmän vuosia, tulevat ensin. Älä käytä sanaa "mennessä" määritettäessä aikaa, joka tavoitteen saavuttamiseen kuluu.
    Älä määritä KPI:n nykyistä numeerista arvoa tavoitteissa, esimerkiksi älä kirjoita markkinaosuuden kasvattamista 10%:sta 20%:iin, vaan sano vain markkinaosuuden kasvattaminen 20%:iin.
    Älä käytä sanaa "alkaen". Ole kuvaileva kirjoittaessasi tavoitteita.
    Keksi vähintään 4 tavoitetta kullekin <h5>-tagille.
  
    Kirjoita tämä ikään kuin olisit yrityksen omistaja, käytä "me" älä käytä "minä".
    Luo vastaus html-muodossa.
    Aloita täyttö "<h3>${mark1TopicFI}</h3>". Vain yksi <h3>-tagi, joka on <h3>${mark1TopicFI}</h3>. Täytyy olla 3 <h4>-tagia, jotka ovat <h4>Lyhyen aikavälin tavoitteet<h4>, <h4>Keskipitkän aikavälin tavoitteet<h4> ja <h4>Pitkän aikavälin tavoitteet<h4>.
    käytä vain HTML-tageja, älä käytä markdownia. Älä käytä ** **, käytä sen sijaan <strong>-tagia lihavointiin. Älä käytä * *, käytä sen sijaan <em>-tagia kursivointiin. Älä käytä * luettelomerkeille, käytä sen sijaan <li>-tagia.
  luo kaikki suomeksi
  Tämä on tärkeää: Ole erittäin oivaltava vastauksessasi.
    Tämä on ${mark1TopicFI}, jonka keksit:
    `,
    da: `
    Du er en professionel konsulent, og en kunde henvender sig til dig for at skrive ${mark1TopicDA} til en forretningsplan.
  
    Dette er forretningsdetaljerne:
    forretningsdetalje 1: Kundens virksomhedsnavn er ${businessName}.
    forretningsdetalje 2: Virksomhedens type er ${businessType}. 
    forretningsdetalje 3: Her er virksomhedens kunder: ${location}.
    forretningsdetalje 4: Kunden vil ansætte ${NEmployee} medarbejdere.
    forretningsdetalje 5: Kundens distributionskanal er ${salesChannel}.
    forretningsdetalje 6: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    Dette er de vigtigste succesfaktorer: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Dette er den forventede omsætning: ${firstYearRevenue}
    Dette er den forventede årlige vækstrate: ${revenueGrowthRate}
  
    Dette er brancheoversigten og vigtige markedstendenser: ${situ1Ref}
    Brug data fra "Key Market Trends", hvor det er relevant, til at generere nogle af målene.
  
    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er yderligere instruktioner:
    Gentag ikke forretningsdetaljerne.
    ${mark1TopicDA} SKAL INKLUDERE DISSE EMNER: kortsigtede mål (1-2 år), mellemsigtede mål (3-5 år), langsigtede mål (mere end 5 år). INKLUDER IKKE andre emner, medmindre de er specificeret her. Hvert emne vil have flere mål pakket ind i <li>-tag. Kortsigtede mål bør være beskedne, og langsigtede mål bør være ambitiøse.
  
    Du skal bruge SMART-målfastsættelse.
    Skriv ikke virksomhedsnavnet.
    Angiv eksplicit, hvor mange år det tager at opnå et mål. Ordne målene efter antal år, det tager at fuldføre, mål med færre år at fuldføre kommer først. Brug ikke ordet "inden" når du angiver tiden, det tager at opnå et mål.
    Angiv ikke den nuværende numeriske værdi af en KPI i målene, for eksempel skriv ikke øge markedsandelen fra 10% til 20%, skriv blot øge markedsandelen til 20%.
    Brug ikke ordet "fra". Vær beskrivende, når du skriver mål.
    Kom med mindst 4 mål for hver <h5>-tag.
  
    Skriv dette, som om du er ejeren af virksomheden, ved at bruge "vi" og ikke "jeg".
    Generer svar i html.
    Begynd udfyldelsen med "<h3>${mark1TopicDA}</h3>". Der skal kun være én <h3>-tag, som er <h3>${mark1TopicDA}</h3>. Der skal være 3 <h4>-tags, som er <h4>Kortsigtede mål<h4>, <h4>Mellemsigtede mål<h4> og <h4>Langsigtede mål<h4>.
    Brug kun HTML-tags, brug ikke markdown. Brug ikke ** **, brug i stedet <strong>-tag til fed skrift. Brug ikke * *, brug i stedet <em>-tag til kursiv. Brug ikke * til punktlister, brug i stedet <li>-tag.
  Generer alt på engelsk.
  Dette er viktig: Vær veldig innsiktsfull i ditt svar
  Dette er vigtigt: Vær meget indsigtsfuld i dit svar
    Dette er de ${mark1TopicDA}, du kom op med:
    `,
    no: `Du er en profesjonell konsulent, og en kunde henvender seg til deg for å skrive ${mark1TopicNO} for en forretningsplan.

    Dette er forretningsdetaljene:
    forretningsdetalj 1: Kundens bedriftsnavn er ${businessName}.
    forretningsdetalj 2: Bedriftens type er ${businessType}. 
    forretningsdetalj 3: Dette er hvor bedriftens kunder er: ${location}.
    forretningsdetalj 4: Kunden vil ansette ${NEmployee} ansatte.
    forretningsdetalj 5: Kundens distribusjonskanal er ${salesChannel}.
    forretningsdetalj 6: Kundens forretningsdriftsstatus er ${businessOperationalStatus}.
  
    Dette er de viktigste suksessfaktorene: ${successFactors1}, ${successFactors2}, ${successFactors3}
  
    Dette er forventet inntekt: ${firstYearRevenue}
    Dette er forventet årlig vekstrate: ${revenueGrowthRate}
  
    Dette er bransjeoversikten og viktige markedstrender: ${situ1Ref}
    Bruk data fra "Key Market Trends" der det er relevant for å generere noen av målene.
  
    Dette er detaljer om kundens produkter eller tjenester:
    ${productInfoPrompt}
    
    Dette er ytterligere instruksjoner:
    Ikke gjenta forretningsdetaljene.
    ${mark1TopicNO} MÅ INKLUDERE DISSE EMNENE: kortsiktige mål (1-2 år), mellomlangsiktige mål (3-5 år), langsiktige mål (mer enn 5 år). INKLUDER IKKE andre emner med mindre de er spesifisert her. Hvert emne vil ha flere mål pakket inn i <li>-tag. Kortsiktige mål bør være beskjedne og langsiktige mål bør være ambisiøse.
  
    Du må bruke SMART målsetting.
    Ikke skriv bedriftsnavn.
    Spesifiser eksplisitt hvor mange år det tar å oppnå et mål. Ordne målene etter antall år det tar å fullføre, mål med færre år å fullføre kommer først. Ikke bruk ordet "innen" når du spesifiserer tiden det tar å oppnå et mål.
    Ikke spesifiser nåværende numeriske verdi av en KPI i mål, for eksempel ikke skriv øke markedsandelen fra 10% til 20%, bare skriv øke markedsandelen til 20%.
    Ikke bruk ordet "fra". Vær beskrivende når du skriver mål.
    Kom opp med minst 4 mål for hver <h5> tag.
  
    Skriv dette som om du er eieren av bedriften, bruk "vi" ikke bruk "jeg".
    Generer svar i html.
    Begynn fullføringen med "<h3>${mark1TopicNO}</h3>". Det skal bare være en <h3> tag som er <h3>${mark1TopicNO}</h3>. Det må være 3 <h4> tags som er <h4>Kortsiktige mål<h4>, <h4>Mellomlangsiktige mål<h4> og <h4>Langsiktige mål<h4>.
    bruk bare HTML-tags, ikke bruk markdown. Ikke bruk ** **, bruk i stedet <strong> tag for fet skrift. Ikke bruk * *, bruk i stedet <em> tag for kursiv. Ikke bruk * for punktlister, bruk i stedet <li> tag.
  Generer alt på engelsk.
  Dette er viktig: Vær veldig innsiktsfull i ditt svar
    Dette er ${mark1TopicNO} du kom opp med:
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
