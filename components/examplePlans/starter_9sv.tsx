import finTableExample from '../../utils/finTableExample';

export default function starter_9sv() {
  const words = {
    finance: 'Ekonomi',
    initialInvestmentUsd: 'Inledande investering (SEK)',
    investmentItem: 'Investeringsobjekt',
    cost: 'Kostnad',
    total: 'Totalt',
    firstYearIncomeStatementUsd: 'Resultaträkning första året (SEK)',
    firstYearIncomeStatementJanJunUsd:
      'Resultaträkning första året Jan - Jun(SEK)',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Maj',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    Oct: 'Okt',
    nov: 'Nov',
    dec: 'Dec',
    firstYear: 'Första året',
    revenue: 'Intäkter',
    cogs: 'Kostnad för sålda varor',
    grossMargin: 'Bruttomarginal',
    operatingExpenses: 'Driftskostnader',
    wagesAndBenefits: 'Löner och förmåner',
    marketing: 'Marknadsföring',
    rent: 'Hyra',
    generalAdministrative: 'Allmän administration',
    depreciation: 'Avskrivning',
    utilities: 'Försörjning',
    otherExpenses: 'Andra utgifter',
    totalExpenses: 'Totala utgifter',
    earningsBeforeInterestTaxes: 'Intäkter före räntor och skatter',
    interestExpense: 'Räntekostnader',
    earningsBeforeTaxes: 'Intäkter före skatter',
    incomeTaxes: 'Inkomstskatter',
    netIncome: 'Nettoinkomst',
    firstYearIncomeStatementJulDecUsd:
      'Resultaträkning första året Jul - Dec (SEK)',
    year1_5IncomeStatementUsd: 'Resultaträkning år 1 - 5(SEK)',
    year1: 'År 1',
    year2: 'År 2',
    year3: 'År 3',
    year4: 'År 4',
    year5: 'År 5',
  };

  return (
    <div className="form-block-started w-form">
      <div className="font-segoe">
        <hr />
        <br />
        <h3 className="flex justify-center font-bold">
          Starter Exempel Plan: Mays Diner
        </h3>
        <div>
          <h3>Exekutiv Sammanfattning</h3>
          <h4>Verksamhetsöversikt</h4>
          Välkommen till Mays Diner, en familjerestaurang belägen i hjärtat av
          Atlanta, Georgia. Vi är ett kommande oöppnat företag som är dedikerat
          till att ge våra kunder den bästa matupplevelsen. Vår fysiska plats är
          utformad för att tillgodose familjer som letar efter en mysig och
          bekväm miljö att njuta av sina måltider i. Vi erbjuder frukost, lunch
          och middag till våra kunder, och vi är stolta över att ha ett team på
          10 dedikerade anställda som är engagerade i att ge utmärkt
          kundservice.
          <h4>Verksamhetsursprung</h4>
          Mays Diner grundades med visionen att ge våra kunder en unik
          matupplevelse som är både prisvärd och trevlig. Vår grundare, May, har
          alltid varit passionerad för matlagning och har spenderat år på att
          förbättra sina recept. Hon ville dela sin kärlek till mat med världen
          och bestämde sig för att öppna sin egen restaurang. Mays Diner är ett
          familjeägt företag som är engagerat i att ge våra kunder kvalitetsmat
          och utmärkt kundservice.
          <h4>Konkurrensfördel</h4>
          På Mays Diner tror vi att vår konkurrensfördel ligger i vår förmåga
          att ge våra kunder en unik matupplevelse. Vi förstår att familjer
          letar efter en bekväm och mysig miljö att njuta av sina måltider i,
          och vi har utformat vår fysiska plats för att tillgodose deras behov.
          Vår meny innehåller en mängd rätter som är tillverkade av färska
          ingredienser och är inspirerade av traditionella familjerecept. Vi har
          också ett team av talangfulla kockar som är engagerade i att ge våra
          kunder läckra måltider som är tillagade till perfektion.
          <h4>Finansiell Sammanfattning</h4>
          Vi förväntar oss att generera 1 000 000 dollar i intäkter under vårt
          första verksamhetsår, med en förväntad tillväxttakt på 15%. Våra
          nyckelfaktorer för framgång inkluderar att ha en bra kock, ge utmärkt
          kundservice och upprätthålla en mysig och bekväm miljö för våra
          kunder. Vi är engagerade i att investera i vårt företag för att
          säkerställa att vi fortsätter att ge våra kunder den bästa
          matupplevelsen. Vi är övertygade om att med vårt unika
          tillvägagångssätt till matlagning kommer vi att kunna etablera oss som
          en ledande familjerestaurang i Atlanta, Georgia.
        </div>
        <br />

        <div>
          <h3>Situationanalys</h3>
          <h4>Branschöversikt</h4>
          Som restaurangföretag verkar vi inom livsmedelsbranschen, som är en
          stor och mångsidig sektor som inkluderar restauranger, kaféer,
          snabbmatskedjor och andra matrelaterade företag. I USA är
          livsmedelsbranschen en stor bidragsgivare till ekonomin och genererade
          över 800 miljarder dollar i intäkter år 2020 (National Restaurant
          Association). Restaurangbranschen är särskilt en högt konkurrensutsatt
          marknad, med över en miljon restauranger enbart i USA (Statista).
          Trots den höga konkurrensnivån har branschen fortsatt att växa stadigt
          under de senaste åren, med totala restaurangförsäljningen ökande med
          4,7% år 2019 (National Restaurant Association). Vad gäller geografisk
          plats är vårt företag baserat i Atlanta, Georgia, som är en livlig och
          mångsidig stad med en blomstrande mat scen. Atlanta har en befolkning
          på över 498 715 personer (US Census Bureau) och är hem för ett brett
          utbud av restauranger, kaféer och matvagnar, vilket gör det till en
          högt konkurrensutsatt marknad för vårt företag.
          <h4>Viktiga Marknadstrender</h4>
          <li>
            Ökad efterfrågan på hälsosamma och hållbara matalternativ: Under de
            senaste åren har det funnits en växande trend mot hälsosammare och
            mer hållbara matalternativ, med konsumenter som blir mer medvetna om
            effekterna av sina matval på sin hälsa och miljön. Som ett resultat
            har efterfrågan på växtbaserade och ekologiska matalternativ ökat,
            liksom fokus på att minska matsvinn och använda lokalt producerade
            ingredienser.
          </li>
          <li>
            Teknologi och innovation: Restaurangbranschen har sett en betydande
            mängd teknologisk innovation under de senaste åren, med uppkomsten
            av onlinebeställnings- och leveransplattformar, mobila
            betalningssystem och digitala menyer. Dessa teknologiska framsteg
            har gjort det enklare för kunder att beställa och betala för sin
            mat, samtidigt som de har möjliggjort för restauranger att
            effektivisera sin verksamhet och nå en bredare publik.
          </li>
          <li>
            Förändrade konsumentpreferenser: Konsumentpreferenser och smaker
            utvecklas ständigt, och som ett resultat måste restauranger hålla
            sig uppdaterade med de senaste trenderna för att förbli
            konkurrenskraftiga. Några av de nuvarande trenderna inom
            restaurangbranschen inkluderar uppkomsten av fusionkök,
            populariteten av gatumat och matvagnar samt den ökande efterfrågan
            på anpassade och personliga matupplevelser.
          </li>
          <li>
            Arbetskraftsbrist och stigande arbetskostnader: Restaurangbranschen
            har stött på en betydande brist på arbetskraft under de senaste
            åren, med många företag som kämpar med att hitta och behålla
            kvalificerade arbetare. Samtidigt har arbetskostnaderna stigit,
            vilket sätter ytterligare press på företag att hitta sätt att minska
            kostnader och öka effektiviteten.
          </li>
          <li>
            Ökad konkurrens: Som tidigare nämnts är restaurangbranschen en högt
            konkurrensutsatt marknad, med nya restauranger som öppnar hela
            tiden. Denna ökade konkurrens kan göra det utmanande för företag att
            sticka ut och locka kunder, särskilt i trånga stadsområden som
            Atlanta.
          </li>
        </div>
        <br />
        <div>
          <h4>SWOT-analys</h4>

          <h5>Styrkor</h5>
          <ol>
            <li>
              Vi har en mycket skicklig och erfaren kock som är kapabel att
              skapa läckra och unika rätter som kommer att göra oss framträdande
              gentemot våra konkurrenter.
            </li>
            <li>
              Vår plats i Atlanta, Georgia är en livlig stad med en mångsidig
              befolkning, vilket ger oss en stor och varierad kundbas.
            </li>
            <li>
              Vi har en välutformad och inbjudande fysisk plats som kommer att
              locka kunder och ge en bekväm matupplevelse.
            </li>
            <li>
              Vi har en stark närvaro i sociala medier och en solid
              marknadsföringsplan på plats för att främja vårt företag och locka
              nya kunder.
            </li>
            <li>
              Vi har ett dedikerat och motiverat team av anställda som är
              engagerade i att ge utmärkt kundservice och säkerställa framgången
              för vårt företag.
            </li>
          </ol>

          <h5>Svagheter</h5>
          <ol>
            <li>
              Som ett kommande oöppnat företag kan vi möta utmaningar med att
              etablera oss på den högt konkurrensutsatta restaurangbranschen.
            </li>
            <li>
              Vår brist på erfarenhet av att driva en restaurang kan leda till
              vissa initiala problem i verksamheten.
            </li>
          </ol>
          <p>
            Vi planerar dock att mildra dessa svagheter genom att genomföra
            omfattande marknadsundersökningar och söka råd från branschexperter.
            Vi kommer också att ge våra anställda omfattande utbildning för att
            säkerställa att de är rustade att hantera eventuella utmaningar som
            kan uppstå.
          </p>

          <h5>Möjligheter</h5>
          <ol>
            <li>
              Atlantas växande befolkning och ekonomi ger oss en ständigt
              expanderande kundbas och potential för ökade intäkter.
            </li>
            <li>
              Den ökande populariteten av lokala och hållbara livsmedelskällor
              erbjuder oss möjligheten att använda högkvalitativa ingredienser
              och tilltala hälsomedvetna konsumenter.
            </li>
            <li>
              Uppkomsten av matleverans- och onlinebeställningsplattformar
              möjliggör för oss att nå en bredare publik och locka kunder som
              föredrar att äta hemma.
            </li>
            <li>
              Den växande trenden med upplevelsemässig mat och unika
              matupplevelser ger oss möjligheten att skapa tematiska evenemang
              och locka kunder som letar efter något annorlunda.
            </li>
          </ol>

          <h5>Hot</h5>
          <ol>
            <li>
              Den pågående COVID-19-pandemin kan påverka vår förmåga att driva
              verksamheten med full kapacitet och locka kunder som kan vara
              tveksamma att äta ute.
            </li>
            <li>
              De höga kostnaderna för ingredienser och förnödenheter kan påverka
              vår lönsamhet, särskilt i de tidiga stadierna av vår verksamhet.
            </li>
          </ol>
          <p>
            Vi planerar dock att mildra dessa hot genom att genomföra strikta
            säkerhetsprotokoll för att säkerställa hälsan och säkerheten för
            våra kunder och anställda. Vi kommer också att genomföra regelbundna
            kostnadsanalyser och justera våra menypriser därefter för att
            bibehålla lönsamheten.
          </p>
        </div>
        <br />
        <div>
          <h3>Marknadsföring</h3>
          <h4>Verksamhetsmål</h4>
          <h5>Kortsiktiga Mål</h5>
          <li>
            Öka varumärkeskännedomen i Atlanta genom att distribuera flygblad
            och köra sociala medieannonser för att nå 10 000 potentiella kunder
            under det första verksamhetsåret.
          </li>
          <li>
            Utveckla partnerskap med lokala hotell och turistattraktioner för
            att öka fottrafiken och locka fler kunder under de första sex
            månaderna av verksamheten.
          </li>
          <li>
            Implementera ett kundlojalitetsprogram för att öka återkommande
            affärer och kundnöjdhet under det första verksamhetsåret.
          </li>
          <li>
            Erbjuda dagliga specialerbjudanden och kampanjer för att locka nya
            kunder och öka försäljningen under de första sex månaderna av
            verksamheten.
          </li>

          <h5>Medellånga Mål</h5>
          <li>
            Utöka vår meny för att inkludera veganska och glutenfria alternativ
            för att tillgodose den växande efterfrågan på hälsosamma och
            hållbara matalternativ inom de närmaste tre åren.
          </li>
          <li>
            Implementera en onlinebeställnings- och leveransplattform för att nå
            en bredare publik och öka försäljningen med 20% inom de närmaste tre
            åren.
          </li>
          <li>
            Samverka med lokala matbloggare och influencers för att öka
            varumärkeskännedomen och locka fler kunder inom de närmaste två
            åren.
          </li>
          <li>
            Öppna en andra plats på en högtrafikerad plats inom de närmaste fem
            åren för att öka marknadsandel och intäkter.
          </li>

          <h5>Långsiktiga Mål</h5>
          <li>
            Bli en ledare inom hållbara och miljövänliga metoder genom att
            använda lokala källor och minska matsvinn med 50% inom de närmaste
            10 åren.
          </li>
          <li>
            Utöka våra distributionskanaler för att inkludera cateringtjänster
            och matvagnar inom de närmaste sju åren för att nå en bredare publik
            och öka intäkterna.
          </li>
          <li>
            Utveckla en franchisemodell och expandera nationellt inom de
            närmaste 10 åren för att bli ett erkänt varumärke inom
            restaurangbranschen.
          </li>
          <li>
            Implementera ett utbildningsprogram för anställda för att förbättra
            kundservice och öka kundnöjdheten till 95% inom de närmaste 10 åren.
          </li>
        </div>
        <br />
        <div className="relativ">
          <div>
            <h4>STP</h4>

            <h5>Segmentering</h5>
            <li>Segment 1: Familjer med medelinkomst</li>
            <p>
              Kundbehov: Prisvärda och läckra måltider till frukost, lunch och
              middag.
            </p>
            <p>
              Demografi: Familjer med barn, bosatta i Atlanta, Georgia, med en
              medelinkomstnivå.
            </p>
            <p>
              Köpbeteende: De tenderar att besöka restauranger som erbjuder bra
              valuta för pengarna.
            </p>

            <li>Segment 2: Unga yrkesverksamma</li>
            <p>
              Kundbehov: Snabba och bekväma måltider till frukost och lunch.
            </p>
            <p>
              Demografi: Unga yrkesverksamma som arbetar i närheten av vår
              restaurang, bosatta i Atlanta, Georgia.
            </p>
            <p>
              Köpbeteende: De tenderar att besöka restauranger som erbjuder
              snabb och effektiv service.
            </p>

            <li>Segment 3: Turister</li>
            <p>Kundbehov: Autentisk och minnesvärd matupplevelse.</p>
            <p>
              Demografi: Turister som besöker Atlanta, Georgia, och letar efter
              lokal mat.
            </p>
            <p>
              Köpbeteende: De tenderar att besöka restauranger som erbjuder en
              unik och minnesvärd upplevelse.
            </p>

            <h5>Målgrupper</h5>
            <p>
              Vårt primära målsegment kommer att vara familjer med medelinkomst.
              Vi har valt detta segment eftersom de utgör den största gruppen
              potentiella kunder i vårt område. Dessutom letar de efter
              prisvärda och läckra måltider, vilket är precis vad vi erbjuder.
            </p>

            <h5>Positionering</h5>
            <p>
              Vi kommer att positionera vår restaurang som en familjevänlig
              diner som erbjuder prisvärda och läckra måltider till frukost,
              lunch och middag. Vår meny kommer att utformas för att tillgodose
              smakerna hos familjer med medelinkomst, och vi kommer att erbjuda
              valuta för pengarna. Vi kommer också att betona kvaliteten på våra
              ingredienser och färskheten i vår mat för att tilltala
              hälsomedvetna kunder. Dessutom kommer vi att skapa en varm och
              välkomnande atmosfär som får våra kunder att känna sig som hemma.
              Vår prissättning kommer att vara konkurrenskraftig, och vi kommer
              att erbjuda olika kampanjer och rabatter för att locka och behålla
              vårt målsegment.
            </p>
          </div>
        </div>
      </div>
      <div className="font-segoe">
        <div>
          <h4>4P</h4>
          <h5>Produktstrategi</h5>
          <p>
            På May's Diner förstår vi vikten av att anpassa vår produktstrategi
            med våra positioneringsdata. Därför har vi utvecklat en
            produktstrategi som tillgodoser smakerna och preferenserna hos vårt
            målsegment samtidigt som vi erbjuder valuta för pengarna.
          </p>

          <h6>Produktbeskrivning</h6>
          <ul>
            <li>
              Frukost: Vår frukostmeny kommer att inkludera klassiska
              amerikanska frukostartiklar som pannkakor, våfflor, omeletter och
              frukostmackor. Vi kommer också att erbjuda hälsosamma alternativ
              som havregrynsgröt och yoghurtskålar.
            </li>
            <li>
              Lunch: Vår lunchmeny kommer att inkludera olika smörgåsar,
              sallader och soppor. Vi kommer också att erbjuda dagliga
              specialiteter som grillad ost och tomatsoppa samt kycklingpaj.
            </li>
            <li>
              Middag: Vår middagsmeny kommer att erbjuda klassisk amerikansk
              husmanskost som köttfärslimpa, stekt kyckling och kokt kött. Vi
              kommer också att erbjuda vegetariska och glutenfria alternativ.
            </li>
          </ul>

          <h6>Produktdifferentiering</h6>
          <ul>
            <li>
              Frukost: Våra frukostartiklar kommer att tillverkas med
              högkvalitativa ingredienser, inklusive lokalt producerade ägg och
              mejeriprodukter. Vi kommer också att erbjuda olika toppingar och
              tillbehör för att anpassa varje rätt efter våra kunders
              preferenser.
            </li>
            <li>
              Lunch: Våra smörgåsar kommer att tillverkas med nyligen bakat bröd
              och högkvalitativa kött- och ostprodukter. Våra sallader kommer
              att innehålla lokalt producerade grönsaker och hemlagade
              dressings.
            </li>
            <li>
              Middag: Våra middagsrätter kommer att tillverkas med
              högkvalitativa kött- och grönsaksprodukter, och vi kommer att
              erbjuda hemlagade tillbehör som potatismos och macaroni and
              cheese.
            </li>
          </ul>

          <h6>Produktutveckling</h6>
          <ul>
            <li>
              Frukost: Vi kommer regelbundet att uppdatera vår frukostmeny för
              att inkludera säsongsmässiga artiklar och kundfavoriter. Vi kommer
              också att erbjuda frukostcatering för evenemang och möten.
            </li>
            <li>
              Lunch: Vi kommer regelbundet att uppdatera vår lunchmeny för att
              inkludera säsongsmässiga artiklar och kundfavoriter. Vi kommer
              också att erbjuda lunchcatering för evenemang och möten.
            </li>
            <li>
              Middag: Vi kommer regelbundet att uppdatera vår middagsmeny för
              att inkludera säsongsmässiga artiklar och kundfavoriter. Vi kommer
              också att erbjuda middagscatering för evenemang och möten.
            </li>
          </ul>

          <h6>Produktvarumärke</h6>
          <ul>
            <li>
              Frukost: Våra frukostartiklar kommer att varumärkas som "May's
              Frukostklassiker" för att betona vår fokus på klassiska
              amerikanska frukosträtter tillverkade med högkvalitativa
              ingredienser.
            </li>
            <li>
              Lunch: Våra lunchartiklar kommer att varumärkas som "May's
              Delikatessfavoriter" för att betona vårt fokus på nyligen
              tillverkade smörgåsar och sallader.
            </li>
            <li>
              Middag: Våra middagsartiklar kommer att varumärkas som "May's
              Comfort Kitchen" för att betona vårt fokus på klassisk amerikansk
              husmanskost tillverkad med högkvalitativa ingredienser.
            </li>
          </ul>

          <h5>Prissättningsstrategi</h5>
          <p>
            Efter noggrant övervägande har vi beslutat att genomföra en
            värdebaserad prissättningsstrategi. Vi tror att denna strategi
            överensstämmer med våra positioneringsdata och kommer att möjliggöra
            att vi erbjuder prisvärda och läckra måltider samtidigt som vi
            genererar en vinst.
          </p>

          <p>
            Vår värdebaserade prissättningsstrategi kommer att innebära att vi
            sätter priser baserat på den upplevda värdet av våra produkter och
            tjänster. Vi kommer att ta hänsyn till faktorer som kvaliteten på
            våra ingredienser, färskheten i vår mat och den totala
            matupplevelsen vi erbjuder. Vi kommer också regelbundet att granska
            våra priser för att säkerställa att de förblir konkurrenskraftiga
            och överensstämmer med vårt målsegments förväntningar.
          </p>

          <p>
            Förutom vår värdebaserade prissättningsstrategi kommer vi också att
            erbjuda olika kampanjer och rabatter för att locka och behålla vårt
            målsegment. Till exempel kommer vi att erbjuda ett lojalitetsprogram
            som belönar kunder för återkommande besök och rekommendationer. Vi
            kommer också att erbjuda säsongsmässiga kampanjer och rabatter på
            cateringbeställningar.
          </p>

          <p>
            Sammanfattningsvis tror vi att vår värdebaserade
            prissättningsstrategi, kombinerat med våra olika kampanjer och
            rabatter, kommer att möjliggöra att vi erbjuder prisvärda och läckra
            måltider samtidigt som vi genererar en vinst och bygger en lojal
            kundbas.
          </p>
        </div>
        <br />
        <div>
          <h5>Tjänstestrategi</h5>
          På May's Diner förstår vi att kundnöjdhet är avgörande för framgången
          för vår verksamhet. Därför kommer vi att se till att våra anställda
          ger enastående service till våra kunder. Vi kommer att uppnå detta
          genom att utbilda vår personal att vara artig, vänlig och uppmärksam
          på våra kunders behov. Dessutom kommer vi att se till att vår personal
          har kunskap om vår meny och kan ge rekommendationer till kunderna. För
          att säkerställa att våra kunder har en bra upplevelse på vår diner
          kommer vi också att fokusera på följande områden:
          <h5>Meny</h5>
          Vår meny kommer att utformas för att tillgodose smakerna hos familjer
          med medelinkomst. Vi kommer att erbjuda olika rätter till frukost,
          lunch och middag, inklusive vegetariska och glutenfria alternativ.
          Våra ingredienser kommer att vara av hög kvalitet, och vi kommer att
          se till att vår mat är färsk och läcker.
          <h5>Atmosfär</h5>
          Vi kommer att skapa en varm och välkomnande atmosfär som får våra
          kunder att känna sig som hemma. Vår restaurang kommer att vara
          dekorerad med ett mysigt och bekvämt tema, och vi kommer att spela
          mjuk musik för att skapa en avslappnad stämning.
          <h5>Renhållning</h5>
          Vi kommer att upprätthålla en hög nivå av renlighet i vår restaurang
          för att se till att våra kunder känner sig bekväma och säkra. Vår
          personal kommer att utbildas för att rengöra och desinficera alla ytor
          regelbundet, och vi kommer att se till att våra toaletter är
          fläckfria.
          <h5>Kundfeedback</h5>
          Vi kommer att uppmuntra våra kunder att ge feedback om sin upplevelse
          på vår diner. Vi kommer att använda denna feedback för att förbättra
          vår service och göra förändringar där det behövs. Vi kommer också att
          belöna våra kunder för deras feedback genom att erbjuda rabatter och
          kampanjer.
          <h5>Reklamstrategi</h5>
          Vårt primära målsegment är familjer med medelinkomst i Atlanta,
          Georgia. För att locka detta segment kommer vi att använda följande
          reklamtaktik:
          <li>Reklam i sociala medier</li>
          Motivering: Sociala medier är ett effektivt sätt att nå vårt
          målsegment, eftersom många familjer regelbundet använder sociala
          medieplattformar. Mål: Att öka varumärkeskännedomen och locka nya
          kunder. Aktiviteter: Vi kommer att skapa konton på Facebook, Instagram
          och Twitter och regelbundet publicera engagerande innehåll. Vi kommer
          också att köra riktade annonser på dessa plattformar för att nå vårt
          målsegment.
          <li>Reklam i lokala tidningar</li>
          Motivering: Lokala tidningar är en populär informationskälla för
          familjer i vårt område. Mål: Att öka varumärkeskännedomen och locka
          nya kunder. Aktiviteter: Vi kommer att placera annonser i lokala
          tidningar, där vi framhäver vår meny, kampanjer och rabatter. Vi
          kommer också att inkludera vår kontaktinformation och plats.
          <li>Reklam på reklamskyltar</li>
          Motivering: Reklamskyltar är ett effektivt sätt att nå en stor publik
          i ett specifikt område. Mål: Att öka varumärkeskännedomen och locka
          nya kunder. Aktiviteter: Vi kommer att placera reklamskyltar på
          högtrafikerade områden i Atlanta, där vi framhäver vår meny, kampanjer
          och rabatter. Vi kommer också att inkludera vår kontaktinformation och
          plats.
          <li>Email-marknadsföring</li>
          Motivering: Email-marknadsföring är ett effektivt sätt att nå vårt
          målsegment direkt. Mål: Att öka varumärkeskännedomen och locka nya
          kunder. Aktiviteter: Vi kommer att samla in emailadresser från våra
          kunder och använda dem för att skicka ut kampanjmejl. Vi kommer också
          att erbjuda rabatter och kampanjer till kunder som anmäler sig till
          vår emaillista.
          <li>I butikskampanjer</li>
          Motivering: Butikskampanjer är ett effektivt sätt att locka kunder som
          redan är i vårt område. Mål: Att öka försäljningen och locka nya
          kunder. Aktiviteter: Vi kommer att erbjuda rabatter och kampanjer till
          kunder som besöker vår diner under specifika timmar eller på specifika
          dagar. Vi kommer också att erbjuda lojalitetsprogram för att uppmuntra
          återkommande affärer. Avslutningsvis kommer vi på May's Diner att
          fokusera på att erbjuda enastående service till våra kunder och
          använda effektiva reklamtaktiker för att locka vår målgrupp. Vi är
          övertygade om att vår servicestrategi och reklamstrategi kommer att
          hjälpa oss att uppnå våra affärsmål och bli en framgångsrik restaurang
          i Atlanta, Georgia.
        </div>
        <br />
        <div>
          <h3>Drift</h3>

          <h4>Viktiga aktiviteter</h4>

          <li>
            Vi kommer att börja med att skaffa färska och högkvalitativa råvaror
            till våra frukost-, lunch- och middagsmenyer.
          </li>
          <li>
            Vi kommer att förbereda maten i vårt toppmoderna kök och se till att
            varje rätt är tillagad till perfektion och uppfyller våra höga
            kvalitetsstandarder.
          </li>
          <li>
            Vi kommer att utbilda vår personal för att ge utmärkt kundservice
            och se till att våra kunder har en minnesvärd matupplevelse.
          </li>
          <li>
            Vi kommer att upprätthålla en ren och hygienisk miljö i vår
            restaurang för att våra kunder ska känna sig trygga och bekväma.
          </li>
          <li>
            Vi kommer att hantera vår inventering och förnödenheter för att
            säkerställa att vi alltid har de nödvändiga ingredienserna och
            materialen till hands för att tillhandahålla våra produkter och
            tjänster.
          </li>
          <li>
            Vi kommer att marknadsföra vår verksamhet genom olika kanaler,
            inklusive sociala medier, tryckta annonser och mun-till-mun-reklam,
            för att locka nya kunder och behålla befintliga.
          </li>

          <h4>Genomförandeplan</h4>

          <li>
            Investeringsobjekt 1: Konstruktion - Vi kommer att anlita ett
            respektabelt byggföretag för att bygga vår restaurang enligt våra
            specifikationer och design. Detta investeringsobjekt kommer att
            kosta oss 500 000 dollar.
          </li>
          <li>
            Investeringsobjekt 2: Möbler - Vi kommer att köpa högkvalitativa
            möbler och armaturer till vår restaurang, inklusive bord, stolar,
            belysning och dekor. Detta investeringsobjekt kommer att kosta oss
            300 000 dollar.
          </li>
          <li>
            Investeringsobjekt 3: Utrustning - Vi kommer att köpa toppmoderna
            köksutrustning, inklusive ugnar, spisar, kylskåp och diskmaskiner,
            för att säkerställa att vi kan förbereda vår mat effektivt och
            enligt högsta standard. Detta investeringsobjekt kommer att kosta
            oss 100 000 dollar.
          </li>
          <li>
            Investeringsobjekt 4: Rörelsekapital - Vi kommer att avsätta 100 000
            dollar för att täcka våra operativa kostnader, såsom hyra,
            driftskostnader, löner och marknadsföring, tills vår verksamhet blir
            lönsam.
          </li>
        </div>
        <br />
        <div>
          <h3>Management</h3>
          <h4>Medarbetarroller</h4>
          <li>Verkställande direktör</li>
          Ansvarsområden: - Övervaka alla restaurangens operationer - Hantera
          och övervaka all personal - Utveckla och genomföra affärsstrategier
          för att öka intäkterna och lönsamheten - Säkerställa kundnöjdhet genom
          att upprätthålla högkvalitativ mat och service - Hantera inventering
          och beställa förnödenheter vid behov - Utveckla och upprätthålla
          relationer med leverantörer Kandidatkrav: - Kandidatexamen i
          företagsekonomi eller relaterat område - 5+ års erfarenhet av
          restaurangledning - Starka ledarskaps- och kommunikationsfärdigheter -
          Förmåga att arbeta i en snabbt tempo - Kunskap om restaurangverksamhet
          och branschtrender
          <li>Executive Chef</li>
          Ansvarsområden: - Skapa och utveckla menyobjekt - Hantera och utbilda
          kökspersonal - Säkerställa matkvalitet och konsistens - Hantera
          inventering och beställa förnödenheter vid behov - Upprätthålla kökets
          renlighet och säkerhetsstandarder - Utveckla och upprätthålla
          relationer med lokala bönder och leverantörer Kandidatkrav: -
          Kockexamen eller motsvarande erfarenhet - 5+ års erfarenhet som
          executive chef eller kökschef - Kunskap om lokala och säsongsbetonade
          råvaror - Förmåga att arbeta i en snabbt tempo - Starka ledarskaps-
          och kommunikationsfärdigheter
          <li>Servitör</li>
          Ansvarsområden: - Hälsa kunder och ta emot beställningar - Servera mat
          och drycker på ett snabbt och professionellt sätt - Besvara kundfrågor
          och ge rekommendationer - Upprätthålla renlighet och ordning i
          matsalen - Hantera kontant- och kreditkortstransaktioner - Hjälpa till
          med städning och stängningsuppgifter Kandidatkrav: - Gymnasieexamen
          eller motsvarande - Tidigare erfarenhet inom restaurang- eller
          kundservice - Vänlig och utåtriktad personlighet - Förmåga att arbeta
          i en snabbt tempo - Starka kommunikations- och kundservicefärdigheter
          <li>Kock</li>
          Ansvarsområden: - Förbereda och tillaga menyobjekt - Upprätthålla
          kökets renlighet och säkerhetsstandarder - Hjälpa till med inventering
          och beställning av förnödenheter - Följa recept och
          portionskontrollriktlinjer - Hjälpa till med städning och
          stängningsuppgifter Kandidatkrav: - Tidigare erfarenhet som kock eller
          förberedelsekock - Kunskap om grundläggande matlagningstekniker och
          livsmedelssäkerhetsriktlinjer - Förmåga att arbeta i en snabbt tempo -
          Stark uppmärksamhet på detaljer och organisatoriska färdigheter
          <li>Diskare</li>
          Ansvarsområden: - Tvätta och desinficera tallrikar, bestick och
          köksutrustning - Hjälpa till med köksstädning och organisering -
          Hjälpa till med inventering och beställning av förnödenheter - Följa
          säkerhets- och sanitetsriktlinjer - Hjälpa till med städning och
          stängningsuppgifter Kandidatkrav: - Tidigare erfarenhet som diskare
          eller i en liknande roll - Förmåga att arbeta i en snabbt tempo -
          Stark uppmärksamhet på detaljer och organisatoriska färdigheter
          <li>Marknadschef</li>
          Ansvarsområden: - Utveckla och genomföra marknadsstrategier för att
          öka varumärkeskännedom och kundtrafik - Hantera sociala mediekonton
          och online-närvaro - Planera och genomföra evenemang och kampanjer -
          Analysera och rapportera om marknadsföringsmätvärden - Samarbeta med
          verkställande direktören för att utveckla affärsstrategier
          Kandidatkrav: - Kandidatexamen i marknadsföring eller relaterat område
          - 3+ års erfarenhet inom marknadsföring, företrädesvis inom
          restaurangbranschen - Kunskap om sociala medieplattformar och digital
          marknadsföring - Starka kommunikations- och analytiska färdigheter -
          Förmåga att arbeta självständigt och som en del av ett team
          <li>Biträdande chef</li>
          Ansvarsområden: - Hjälpa verkställande direktören med dagliga
          operationer - Hantera och övervaka personal vid frånvaro av
          verkställande direktör - Hjälpa till med inventering och beställning
          av förnödenheter - Hantera kundklagomål och lösa problem - Hjälpa till
          med schemaläggning och löneutbetalning - Hjälpa till med städning och
          stängningsuppgifter Kandidatkrav: - Gymnasieexamen eller motsvarande -
          Tidigare erfarenhet inom restaurang eller kundtjänst - Starkt
          ledarskap och kommunikationsförmåga - Förmåga att arbeta i en snabbt
          tempo - Kunskap om restaurangverksamhet och branschtrender
          <li>Värd/Värdinna</li>
          Ansvarsområden: - Hälsa på kunder och placera dem vid bord - Hantera
          reservationer och väntelistor - Besvara kundens frågor och ge
          rekommendationer - Bibehålla renlighet och organisation i framsidan av
          restaurangen - Hjälpa till med städning och stängningsuppgifter
          Kandidatkrav: - Tidigare erfarenhet som värd/värdinna eller i en
          liknande roll - Vänlig och utåtriktad personlighet - Förmåga att
          arbeta i en snabbt tempo - Stark kommunikation och kundserviceförmåga
          <li>Bartender</li>
          Ansvarsområden: - Blanda och servera alkoholhaltiga och alkoholfria
          drycker - Bibehålla renlighet och organisation i bardelen - Hantera
          kontant- och kreditkortstransaktioner - Hjälpa till med inventering
          och beställning av förnödenheter - Följa säkerhets- och
          hygienriktlinjer - Hjälpa till med städning och stängningsuppgifter
          Kandidatkrav: - Tidigare erfarenhet som bartender eller i en liknande
          roll - Kunskap om alkoholhaltiga och alkoholfria drycker - Förmåga att
          arbeta i en snabbt tempo - Stark kommunikation och kundserviceförmåga
          <li>Busspojke/Bussflicka</li>
          Ansvarsområden: - Rensa och städa bord mellan kunder - Hjälpa
          servitörer med kundens behov - Bibehålla renlighet och organisation i
          matsalen - Hjälpa till med städning och stängningsuppgifter
          Kandidatkrav: - Tidigare erfarenhet som busspojke/bussflicka eller i
          en liknande roll - Förmåga att arbeta i en snabbt tempo - Stark
          uppmärksamhet på detaljer och organisatoriska färdigheter Övergripande
          sett kommer May's Diner att kräva ett mångsidigt team av anställda för
          att säkerställa restaurangens framgång. Varje anställd spelar en
          avgörande roll i de dagliga operationerna och kundnöjdheten.
          Kandidatkraven för varje position återspeglar de nödvändiga
          färdigheterna och erfarenheten som krävs för att lyckas i sina
          respektive roller. Med rätt team på plats kan May's Diner bli en
          blomstrande restaurang i området Atlanta, Georgia.
        </div>
        <br />

        {finTableExample(words)}

        <div>
          <h3>Risk och Åtgärder</h3>
          När vi förbereder oss för att lansera May's Diner förstår vi att det
          finns flera risker förknippade med att driva en restaurangverksamhet.
          För att säkerställa att vi är förberedda för eventuella utmaningar har
          vi utvecklat en omfattande Risk- och Åtgärdsplan. Nedan är de 5
          främsta riskerna vi har identifierat och de motsvarande åtgärder vi
          kommer att vidta för att hantera dem.
          <li>
            Risk: Matssäkerhetsproblem
            <br />
            Som restaurang är vår främsta prioritet säkerheten för våra kunder.
            Vi förstår att matburna sjukdomar kan ha allvarliga konsekvenser,
            både för våra kunder och för vår verksamhet. För att mildra denna
            risk kommer vi att införa strikta protokoll för livsmedelssäkerhet,
            inklusive regelbundna inspektioner, anställd utbildning och korrekt
            lagring och hantering av livsmedelsprodukter. Vi kommer också att
            samarbeta nära med lokala hälso-myndigheter för att säkerställa att
            vi följer alla regler och riktlinjer.
          </li>
          <li>
            Risk: Brist på personal
            <br />
            Med ett team på endast 10 anställda förstår vi att brist på personal
            kan ha en betydande inverkan på vår verksamhet. För att mildra denna
            risk kommer vi att utveckla en omfattande personalplan som
            inkluderar korsutbildning och backup-personal. Vi kommer också
            erbjuda konkurrenskraftiga löner och förmåner för att locka och
            behålla topp-talanger, och vi kommer att samarbeta nära med lokala
            bemanningsföretag för att säkerställa att vi har tillgång till en
            pool av kvalificerade kandidater.
          </li>
          <li>
            Risk: Negativa recensioner online
            <br />I dagens digitala tidsålder kan online-recensioner göra eller
            bryta en verksamhet. Vi förstår att negativa recensioner kan ha en
            betydande inverkan på vårt rykte och resultat. För att mildra denna
            risk kommer vi att införa en proaktiv strategi för kundservice,
            vilket säkerställer att alla kundklagomål och bekymmer hanteras på
            ett snabbt och professionellt sätt. Vi kommer också uppmuntra nöjda
            kunder att lämna positiva recensioner online, och vi kommer att
            samarbeta med lokala influencers och bloggare för att främja vårt
            varumärke och skapa positiv uppmärksamhet.
          </li>
          <li>
            Risk: Störningar i leveranskedjan
            <br />
            Som en fysisk restaurang är vi beroende av en stadig tillförsel av
            färska ingredienser för att förbereda våra rätter. Vi förstår att
            störningar i leveranskedjan kan ha en betydande inverkan på vår
            förmåga att driva verksamheten. För att mildra denna risk kommer vi
            att etablera relationer med flera leverantörer för att säkerställa
            att vi har tillgång till en mångfald av ingredienser. Vi kommer
            också att utveckla en kontinuitetsplan för att hantera eventuella
            störningar, inklusive alternativa källor och menyjusteringar.
          </li>
          <li>
            Risk: Ekonomisk nedgång
            <br />I händelse av en ekonomisk nedgång förstår vi att
            konsumenterna kan ha mindre disponibel inkomst att spendera på att
            äta ute. För att mildra denna risk kommer vi att utveckla en
            prissättningsstrategi som är konkurrenskraftig och prisvärd, utan
            att offra kvalitet. Vi kommer också att införa kostnadsbesparande
            åtgärder där det är möjligt, såsom att minska avfall och optimera
            vår leveranskedja. Dessutom kommer vi att utforska alternativa
            intäktsströmmar, såsom catering och leverans-tjänster, för att
            diversifiera våra intäkter och nå nya kunder.
          </li>
          Sammanfattningsvis, även om det finns flera risker förknippade med att
          driva en restaurangverksamhet, är vi övertygade om att vår omfattande
          Risk- och Åtgärdsplan kommer att hjälpa oss att navigera genom
          eventuella utmaningar. Genom att prioritera livsmedelssäkerhet,
          personal, kundservice, hantering av leveranskedjan och
          prissättningsstrategi, skapar vi förutsättningar för framgång på den
          konkurrensutsatta restaurangmarknaden i Atlanta.
        </div>
        <br />
        <hr />
      </div>
    </div>
  );
}
