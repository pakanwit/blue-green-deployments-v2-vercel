import finTableExample from '../../utils/finTableExample';

export default function starter_10fi() {
  const words = {
    finance: 'Rahoitus',
    initialInvestmentUsd: 'Alkuperäinen sijoitus (SEK)',
    investmentItem: 'Sijoituskohde',
    cost: 'Kustannus',
    total: 'Yhteensä',
    firstYearIncomeStatementUsd: 'Ensimmäisen vuoden tuloslaskelma (SEK)',
    firstYearIncomeStatementJanJunUsd:
      'Ensimmäisen vuoden tuloslaskelma tammi - kesä (SEK)',
    jan: 'Tammi',
    feb: 'Helmi',
    mar: 'Maalis',
    apr: 'Huhti',
    may: 'Touko',
    jun: 'Kesä',
    jul: 'Heinä',
    aug: 'Elo',
    sep: 'Syys',
    Oct: 'Loka',
    nov: 'Marras',
    dec: 'Joulu',
    firstYear: 'Ensimmäinen vuosi',
    revenue: 'Tuotot',
    cogs: 'Myyntikulut',
    grossMargin: 'Bruttokate',
    operatingExpenses: 'Toimintakulut',
    wagesAndBenefits: 'Palkat ja edut',
    marketing: 'Markkinointi',
    rent: 'Vuokra',
    generalAdministrative: 'Yleinen hallinto',
    depreciation: 'Poistot',
    utilities: 'Aputoiminnot',
    otherExpenses: 'Muut kulut',
    totalExpenses: 'Kokonaiskulut',
    earningsBeforeInterestTaxes: 'Tulos ennen korkoja ja veroja',
    interestExpense: 'Korkokulut',
    earningsBeforeTaxes: 'Tulos ennen veroja',
    incomeTaxes: 'Tuloverot',
    netIncome: 'Nettotulos',
    firstYearIncomeStatementJulDecUsd:
      'Ensimmäisen vuoden tuloslaskelma heinä - joulu (SEK)',
    year1_5IncomeStatementUsd: 'Vuoden 1 - 5 tuloslaskelma (SEK)',
    year1: 'Vuosi 1',
    year2: 'Vuosi 2',
    year3: 'Vuosi 3',
    year4: 'Vuosi 4',
    year5: 'Vuosi 5',
  };

  return (
    <div className="form-block-started w-form">
      <div className="font-segoe">
        <hr />
        <br />
        <h3 className="flex justify-center font-bold">
          Aloittelijan esimerkkisuunnitelma: Mayn ruokala
        </h3>
        <div>
          <h3>Yhteenveto</h3>
          <h4>Liiketoiminnan yleiskatsaus</h4>
          Tervetuloa Mayn ruokalaan, perheravintolaan Atlantan sydämessä,
          Georgiassa. Olemme tuleva, avaamaton yritys, joka on omistautunut
          tarjoamaan asiakkaillemme parhaan ruokailuelämyksen. Fyysinen
          sijaintimme on suunniteltu palvelemaan perheitä, jotka etsivät
          kodikasta ja mukavaa ympäristöä nauttiakseen aterioistaan. Tarjoamme
          aamiaista, lounasta ja illallista asiakkaillemme, ja meillä on ylpeänä
          10 omistautunutta työntekijää, jotka sitoutuvat tarjoamaan erinomaista
          asiakaspalvelua.
          <h4>Liiketoiminnan alkuperä</h4>
          Mayn ruokala perustettiin visiolla tarjota asiakkaillemme
          ainutlaatuinen ruokailuelämys, joka on sekä edullinen että
          nautinnollinen. Perustajamme May on aina ollut intohimoinen
          ruoanlaitosta ja on viettänyt vuosia täydellistäen reseptejään. Hän
          halusi jakaa rakkautensa ruokaan maailman kanssa ja päätti avata oman
          ravintolansa. Mayn ruokala on perheomisteinen yritys, joka sitoutuu
          tarjoamaan asiakkaillemme laadukasta ruokaa ja erinomaista
          asiakaspalvelua.
          <h4>Kilpailuetu</h4>
          Mayn ruokalassa uskomme kilpailuetumme olevan kyvyssämme tarjota
          asiakkaillemme ainutlaatuinen ruokailuelämys. Ymmärrämme, että perheet
          etsivät mukavaa ja kodikasta ympäristöä nauttiakseen aterioistaan, ja
          olemme suunnitelleet fyysisen sijaintimme vastaamaan heidän
          tarpeisiinsa. Valikoimamme sisältää monipuolisia ruokia, jotka on
          valmistettu tuoreista raaka-aineista ja ovat peräisin perinteisistä
          perheresepteistä. Meillä on myös joukko lahjakkaita kokkeja, jotka
          sitoutuvat tarjoamaan asiakkaillemme herkullisia aterioita, jotka on
          valmistettu täydellisyyteen.
          <h4>Taloudellinen yhteenveto</h4>
          Odottamamme liikevaihto ensimmäisenä toimintavuotenamme on 1 000 000
          dollaria, ja odotamme kasvun olevan 15 %. Keskeisiä
          menestystekijöitämme ovat hyvä kokki, erinomainen asiakaspalvelu ja
          kodikas ja mukava ympäristö asiakkaillemme. Olemme sitoutuneita
          sijoittamaan liiketoimintaamme varmistaaksemme, että jatkamme
          asiakkaidemme parhaan ruokailuelämyksen tarjoamista. Olemme varmoja,
          että ainutlaatuisella lähestymistavallamme ruokailuun pystymme
          vakiinnuttamaan asemamme johtavana perheravintolana Atlantassa,
          Georgiassa.
        </div>
        <br />

        <div>
          <h3>Tilanneanalyysi</h3>
          <h4>Toimialan yleiskatsaus</h4>
          Ravintola-alana toimimme ravitsemusalan suuressa ja monipuolisessa
          sektorissa, johon kuuluvat ravintolat, kahvilat, pikaruokaketjut ja
          muut ruokaan liittyvät yritykset. Yhdysvalloissa ravitsemusala on
          merkittävä talouden tekijä, ja se tuotti yli 800 miljardia dollaria
          liikevaihtoa vuonna 2020 (National Restaurant Association).
          Erityisesti ravintola-ala on erittäin kilpailtu markkina, jossa on yli
          miljoona ravintolaa pelkästään Yhdysvalloissa (Statista). Kilpailun
          korkeasta tasosta huolimatta ala on jatkanut tasaisesti kasvuaan viime
          vuosina, ja ravintoloiden kokonaismyynti kasvoi 4,7 % vuonna 2019
          (National Restaurant Association). Maantieteellisesti liiketoimintamme
          sijaitsee Atlantassa, Georgiassa, joka on vilkas ja monipuolinen
          kaupunki, jossa on kukoistava ruokakulttuuri. Atlantassa asuu yli 498
          715 ihmistä (Yhdysvaltain väestönlaskentavirasto), ja siellä on laaja
          valikoima ravintoloita, kahviloita ja ruokarekkoja, mikä tekee siitä
          erittäin kilpailullisen markkinan yrityksellemme.
          <h4>Keskeiset markkinatrendit</h4>
          <li>
            Kasvava kysyntä terveellisille ja kestäville ruokavaihtoehdoille:
            Viime vuosina on ollut kasvava trendi kohti terveellisempiä ja
            kestävämpiä ruokavaihtoehtoja, kun kuluttajat ovat tietoisempia
            ruokavalintojensa vaikutuksesta terveyteensä ja ympäristöön. Tämän
            seurauksena on ollut kasvava kysyntä kasvipohjaisille ja
            luomuruokavaihtoehdoille sekä keskittyminen ruokahävikin
            vähentämiseen ja paikallisesti tuotettujen raaka-aineiden käyttöön.
          </li>
          <li>
            Teknologia ja innovaatiot: Ravintola-ala on nähnyt merkittävän
            määrän teknologista innovaatiota viime vuosina, kun ovat nousseet
            esiin verkkotilaus- ja toimitusalustat, mobiilimaksujärjestelmät ja
            digitaaliset ruokalistat. Nämä teknologiset edistysaskeleet ovat
            helpottaneet asiakkaiden tilaamista ja maksamista ruoastaan, samalla
            kun ne ovat mahdollistaneet ravintoloiden toimintojen
            virtaviivaistamisen ja laajemman yleisön tavoittamisen.
          </li>
          <li>
            Kuluttajien mieltymysten muutokset: Kuluttajien mieltymykset ja maut
            muuttuvat jatkuvasti, ja tämän seurauksena ravintoloiden on
            pysyttävä ajan tasalla alan viimeisimmistä trendeistä ja
            muotivirtauksista pysyäkseen kilpailukykyisinä. Nykyisiä trendejä
            ravintola-alalla ovat muun muassa fuusioruoan nousu, katuruoan ja
            ruokarekkojen suosio sekä kasvava kysyntä räätälöidyistä ja
            henkilökohtaisista ruokailuelämyksistä.
          </li>
          <li>
            Työvoimapula ja nousevat työvoimakustannukset: Ravintola-ala on
            kohdannut merkittävää työvoimapulaa viime vuosina, kun monet
            yritykset kamppailevat löytääkseen ja säilyttääkseen taitavia
            työntekijöitä. Samanaikaisesti työvoimakustannukset ovat nousseet,
            asettaen lisäpainetta yrityksille löytää keinoja kustannusten
            leikkaamiseen ja tehokkuuden lisäämiseen.
          </li>
          <li>
            Kasvava kilpailu: Kuten aiemmin mainittiin, ravintola-ala on
            erittäin kilpailtu markkina, jossa uusia ravintoloita avataan
            jatkuvasti. Tämä lisääntynyt kilpailu voi tehdä yrityksille
            haastavaa erottua ja houkutella asiakkaita, erityisesti tungoksissa
            olevilla kaupunkialueilla kuten Atlantassa.
          </li>
        </div>
        <br />
        <div>
          <h4>SWOT-analyysi</h4>

          <h5>Vahvuudet</h5>
          <ol>
            <li>
              Meillä on erittäin taitava ja kokenut kokki, joka pystyy luomaan
              herkullisia ja uniikkeja ruokia, jotka erottavat meidät
              kilpailijoistamme.
            </li>
            <li>
              Sijaintimme Atlantassa, Georgiassa, on vilkas kaupunki
              monipuolisella väestöllä, mikä tarjoaa meille suuren ja
              vaihtelevan asiakaspohjan.
            </li>
            <li>
              Meillä on hyvin suunniteltu ja kutsuva fyysinen tila, joka
              houkuttelee asiakkaita ja tarjoaa mukavan ruokailuelämyksen.
            </li>
            <li>
              Meillä on vahva läsnäolo sosiaalisessa mediassa ja vankka
              markkinointisuunnitelma houkutellaksemme uusia asiakkaita ja
              edistääksemme liiketoimintaamme.
            </li>
            <li>
              Meillä on omistautunut ja motivoitunut työntekijätiimi, joka
              sitoutuu tarjoamaan erinomaista asiakaspalvelua ja varmistamaan
              liiketoimintamme menestyksen.
            </li>
          </ol>

          <h5>Heikkoudet</h5>
          <ol>
            <li>
              Tulevana, vielä lanseeraamattomana yrityksenä saatamme kohdata
              haasteita vakiinnuttaessamme asemaamme erittäin kilpailullisella
              ravintola-alalla.
            </li>
            <li>
              Kokemattomuutemme ravintolan hallinnassa saattaa aiheuttaa aluksi
              joitakin toiminnallisia ongelmia.
            </li>
          </ol>
          <p>
            Suunnittelemme kuitenkin lieventävämme näitä heikkouksia tekemällä
            laajaa markkinatutkimusta ja hakemalla neuvoja alan
            asiantuntijoilta. Tarjoamme myös työntekijöillemme kattavan
            koulutuksen varmistaaksemme, että he ovat varustettuja käsittelemään
            mahdollisia haasteita, jotka saattavat ilmetä.
          </p>

          <h5>Mahdollisuudet</h5>
          <ol>
            <li>
              Atlantan kasvava väestö ja talous tarjoavat meille jatkuvasti
              laajenevan asiakaspohjan ja mahdollisuuden lisääntyneeseen
              tulovirtaan.
            </li>
            <li>
              Kasvava kiinnostus paikallisia ja kestäviä elintarvikkeita kohtaan
              tarjoaa meille mahdollisuuden hankkia laadukkaita raaka-aineita ja
              houkutella terveystietoisia kuluttajia.
            </li>
            <li>
              Ruokatoimituspalveluiden ja verkkotilausalustojen suosion kasvu
              mahdollistaa toimintamme laajentamisen ja houkuttelee asiakkaita,
              jotka mieluummin ruokailevat kotona.
            </li>
            <li>
              Kasvava trendi elämykselliseen ruokailuun ja ainutlaatuisiin
              ruokailuelämyksiin tarjoaa meille mahdollisuuden luoda teemallisia
              tapahtumia ja houkutella asiakkaita, jotka etsivät jotain
              erilaista.
            </li>
          </ol>

          <h5>Uhat</h5>
          <ol>
            <li>
              Jatkuva COVID-19-pandemia saattaa vaikuttaa kykyymme toimia
              täydellä kapasiteetilla ja houkutella asiakkaita, jotka saattavat
              epäröidä ruokailua ulkona.
            </li>
            <li>
              Raaka-aineiden ja tarvikkeiden korkeat kustannukset saattavat
              vaikuttaa kannattavuuteemme, erityisesti liiketoimintamme
              alkuvaiheissa.
            </li>
          </ol>
          <p>
            Suunnittelemme kuitenkin lieventävämme näitä uhkia toteuttamalla
            tiukkoja turvallisuusprotokollia varmistaaksemme asiakkaidemme ja
            työntekijöidemme terveyden ja turvallisuuden. Teemme myös
            säännöllisiä kustannusanalyysejä ja säädämme ruokalistamme hintoja
            vastaavasti ylläpitääksemme kannattavuutta.
          </p>
        </div>
        <br />
        <div>
          <h3>Markkinointi</h3>
          <h4>Liiketoiminnan tavoitteet</h4>
          <h5>Lyhyen aikavälin tavoitteet</h5>
          <li>
            Lisätä brändin tunnettuutta Atlantassa jakamalla lentolehtisiä ja
            ajamalla sosiaalisen median mainoksia tavoittaaksemme 10 000
            mahdollista asiakasta ensimmäisen toimintavuoden aikana.
          </li>
          <li>
            Kehittää kumppanuuksia paikallisten hotellien ja matkailukohteiden
            kanssa lisätäksemme kävijämääriä ja houkutellaksemme enemmän
            asiakkaita ensimmäisen puolen vuoden aikana.
          </li>
          <li>
            Toteuttaa asiakasuskollisuusohjelma lisätäksemme toistuvaa
            liiketoimintaa ja asiakastyytyväisyyttä ensimmäisen toimintavuoden
            aikana.
          </li>
          <li>
            Tarjota päivittäisiä erikoistarjouksia ja kampanjoita
            houkutellaksemme uusia asiakkaita ja lisätäksemme myyntiä
            ensimmäisen puolen vuoden aikana.
          </li>

          <h5>Keskipitkän aikavälin tavoitteet</h5>
          <li>
            Laajentaa valikoimaamme sisältämään vegaani- ja gluteenittomia
            vaihtoehtoja vastataksemme terveellisten ja kestävien
            ruokavaihtoehtojen kasvavaan kysyntään seuraavan kolmen vuoden
            aikana.
          </li>
          <li>
            Toteuttaa verkkotilaus- ja toimitusalusta tavoittaaksemme laajemman
            yleisön ja lisätäksemme myyntiä 20 % seuraavan kolmen vuoden aikana.
          </li>
          <li>
            Kumppanuus paikallisten ruokabloggaajien ja vaikuttajien kanssa
            lisätäksemme brändin tunnettuutta ja houkutellaksemme enemmän
            asiakkaita seuraavan kahden vuoden aikana.
          </li>
          <li>
            Avata toinen sijainti vilkkaalla alueella seuraavan viiden vuoden
            aikana lisätäksemme markkinaosuutta ja liikevaihtoa.
          </li>

          <h5>Pitkän aikavälin tavoitteet</h5>
          <li>
            Tulla johtavaksi kestävissä ja ympäristöystävällisissä käytännöissä
            hankkimalla paikallisesti ja vähentämällä ruokahävikkiä 50 %
            seuraavan kymmenen vuoden aikana.
          </li>
          <li>
            Laajentaa jakelukanaviamme sisältäen catering-palvelut ja ruokarekat
            seuraavan seitsemän vuoden aikana tavoittaaksemme laajemman yleisön
            ja lisätäksemme liikevaihtoa.
          </li>
          <li>
            Kehittää franchise-malli ja laajentua kansallisesti seuraavan
            kymmenen vuoden aikana tullaksemme tunnetuksi brändiksi
            ravintola-alalla.
          </li>
          <li>
            Toteuttaa koulutusohjelma työntekijöille parantaaksemme
            asiakaspalvelua ja lisätäksemme asiakastyytyväisyyttä 95 % seuraavan
            kymmenen vuoden aikana.
          </li>
        </div>
        <br />
        <div className="relative">
          <div>
            <h4>STP</h4>

            <h5>Segmentointi</h5>
            <li>Segmentti 1: Perheet keskituloisilla</li>
            <p>
              Asiakastarpeet: Edullisia ja herkullisia aterioita aamiaiselle,
              lounaalle ja illalliselle.
            </p>
            <p>
              Demografia: Perheet lapsineen, jotka asuvat Atlantassa,
              Georgiassa, keskituloisella tasolla.
            </p>
            <p>
              Ostopäätöskäyttäytyminen: He suosivat ravintoloita, jotka
              tarjoavat hyvää vastinetta rahoilleen.
            </p>

            <li>Segmentti 2: Nuoret ammattilaiset</li>
            <p>
              Asiakastarpeet: Nopeita ja käteviä aterioita aamiaiselle ja
              lounaalle.
            </p>
            <p>
              Demografia: Nuoret ammattilaiset, jotka työskentelevät
              ravintolamme läheisyydessä, asuvat Atlantassa, Georgiassa.
            </p>
            <p>
              Ostopäätöskäyttäytyminen: He suosivat ravintoloita, jotka
              tarjoavat nopeaa ja tehokasta palvelua.
            </p>

            <li>Segmentti 3: Turistit</li>
            <p>Asiakastarpeet: Aito ja ikimuistoinen ruokailuelämys.</p>
            <p>
              Demografia: Atlantaa, Georgiaa, vierailevat turistit, jotka
              etsivät paikallista ruokaa.
            </p>
            <p>
              Ostopäätöskäyttäytyminen: He suosivat ravintoloita, jotka
              tarjoavat ainutlaatuisen ja ikimuistoisen elämyksen.
            </p>

            <h5>Kohdistaminen</h5>
            <p>
              Pääasiallinen kohderyhmämme tulee olemaan keskituloiset perheet.
              Olemme valinneet tämän segmentin, koska he ovat merkittävin
              potentiaalinen asiakasryhmä alueellamme. Lisäksi he etsivät
              edullisia ja herkullisia aterioita, mikä on juuri sitä, mitä
              tarjoamme.
            </p>

            <h5>Positionointi</h5>
            <p>
              Asemoidumme ravintolana, joka on perheystävällinen ja tarjoaa
              edullisia ja herkullisia aterioita aamiaiselle, lounaalle ja
              illalliselle. Ruokalistamme on suunniteltu vastaamaan
              keskituloisten perheiden makua, ja tarjoamme vastinetta rahoille.
              Korostamme myös raaka-aineidemme laatua ja ruokamme tuoreutta
              houkutellaksemme terveystietoisia asiakkaita. Lisäksi luomme
              lämpimän ja kutsuvan ilmapiirin, joka saa asiakkaamme tuntemaan
              olonsa kotoisaksi. Hinnastomme on kilpailukykyinen, ja tarjoamme
              erilaisia tarjouksia ja alennuksia houkutellaksemme ja
              säilyttääksemme kohderyhmämme.
            </p>
          </div>
        </div>
      </div>
      <div className="font-segoe">
        <div>
          <h4>4P</h4>
          <h5>Tuote Strategia</h5>
          <p>
            May's Dinerissa ymmärrämme tuote strategian tärkeyden ja sen
            yhteensovittamisen asemointi datan kanssa. Siksi olemme kehittäneet
            tuote strategian, joka palvelee kohdesegmenttimme makua ja
            mieltymyksiä tarjoten samalla vastinetta rahalle.
          </p>

          <h6>Tuotteen Kuvaus</h6>
          <ul>
            <li>
              Aamiainen: Aamiainen valikoimamme sisältää perinteisiä
              amerikkalaisia aamiaisherkkuja kuten pannukakkuja, vohveleita,
              munakokkelia ja aamiaisvoileipiä. Tarjoamme myös terveellisiä
              vaihtoehtoja kuten kaurapuuroa ja jogurttikulhoja.
            </li>
            <li>
              Lounas: Lounasvalikoimamme sisältää erilaisia voileipiä,
              salaatteja ja keittoja. Tarjoamme myös päivittäisiä erikoisuuksia
              kuten grillattua juustoa ja tomaattikeittoa sekä kanapataa.
            </li>
            <li>
              Päivällinen: Päivällisvalikoimamme sisältää perinteisiä
              amerikkalaisia lohturuokia kuten jauhelihapiirakkaa, paistettua
              kanaa ja pataa. Tarjoamme myös kasvis- ja gluteenittomia
              vaihtoehtoja.
            </li>
          </ul>

          <h6>Tuotteen Erottelu</h6>
          <ul>
            <li>
              Aamiainen: Aamiaisherkkumme valmistetaan laadukkaista
              raaka-aineista, mukaan lukien paikallisesti hankitut kananmunat ja
              maitotuotteet. Tarjoamme myös erilaisia täytteitä ja lisukkeita
              räätälöidäksemme jokaisen annoksen asiakkaidemme mieltymysten
              mukaisesti.
            </li>
            <li>
              Lounas: Voileipämme valmistetaan vastaleivotusta leivästä ja
              laadukkaista lihoista ja juustoista. Salaattimme sisältävät
              paikallisesti hankittuja tuotteita ja itse tehtyjä kastikkeita.
            </li>
            <li>
              Päivällinen: Päivällisannoksemme valmistetaan laadukkaista
              lihoista ja vihanneksista, ja tarjoamme itse tehtyjä lisukkeita
              kuten perunamuusia ja macaroni and cheesea.
            </li>
          </ul>

          <h6>Tuotteen Kehitys</h6>
          <ul>
            <li>
              Aamiainen: Päivitämme säännöllisesti aamiaismenutamme sisältämään
              kausituotteita ja asiakkaiden suosikkeja. Tarjoamme myös
              aamiaistarjoilua tapahtumiin ja kokouksiin.
            </li>
            <li>
              Lounas: Päivitämme säännöllisesti lounasmenutamme sisältämään
              kausituotteita ja asiakkaiden suosikkeja. Tarjoamme myös
              lounastarjoilua tapahtumiin ja kokouksiin.
            </li>
            <li>
              Päivällinen: Päivitämme säännöllisesti päivällisvalikoimaamme
              sisältämään kausituotteita ja asiakkaiden suosikkeja. Tarjoamme
              myös päivällistarjoilua tapahtumiin ja kokouksiin.
            </li>
          </ul>

          <h6>Tuotteen Brändäys</h6>
          <ul>
            <li>
              Aamiainen: Aamiaisherkkumme brändätään "May's Aamiaisklassikoiksi"
              korostaen keskittymistämme perinteisiin amerikkalaisiin
              aamiaisruokiin, jotka on valmistettu laadukkaista raaka-aineista.
            </li>
            <li>
              Lounas: Lounasherkkumme brändätään "May's Deli Suosikeiksi"
              korostaen keskittymistämme vastaleivottuihin voileipiin ja
              salaatteihin.
            </li>
            <li>
              Päivällinen: Päivällisannoksemme brändätään "May's
              Lohtukeittiöksi" korostaen keskittymistämme perinteisiin
              amerikkalaisiin lohturuokiin, jotka on valmistettu laadukkaista
              raaka-aineista.
            </li>
          </ul>

          <h5>Hinnoittelustrategia</h5>
          <p>
            Huolellisen harkinnan jälkeen olemme päättäneet toteuttaa
            arvopohjaisen hinnoittelustrategian. Uskomme, että tämä strategia on
            linjassa asemointi datamme kanssa ja mahdollistaa meille tarjota
            edullisia ja herkullisia aterioita samalla tuottaen voittoa.
          </p>

          <p>
            Arvopohjainen hinnoittelustrategiamme tulee perustumaan tuotteidemme
            ja palveluidemme koettuun arvoon. Otamme huomioon tekijöitä kuten
            raaka-aineidemme laatu, ruokamme tuoreuden ja yleisen
            ruokailukokemuksen, jonka tarjoamme. Tarkistamme myös säännöllisesti
            hintojamme varmistaaksemme, että ne pysyvät kilpailukykyisinä ja
            linjassa kohdesegmenttimme odotusten kanssa.
          </p>

          <p>
            Lisäksi arvopohjaisen hinnoittelustrategiamme lisäksi tarjoamme
            erilaisia tarjouksia ja alennuksia houkutellaksemme ja
            säilyttääksemme kohdesegmenttimme. Esimerkiksi tarjoamme
            uskollisuusohjelman, joka palkitsee asiakkaita toistuvista
            käynneistä ja suosituksista. Tarjoamme myös kausittaisia tarjouksia
            ja alennuksia tarjoilutilauksille.
          </p>

          <p>
            Kokonaisuudessaan uskomme, että arvopohjainen
            hinnoittelustrategiamme yhdistettynä erilaisiin tarjouksiin ja
            alennuksiin mahdollistaa meille tarjota edullisia ja herkullisia
            aterioita samalla tuottaen voittoa ja rakentaen uskollista
            asiakaskuntaa.
          </p>
        </div>
        <br />
        <div>
          <h5>Palvelustrategia</h5>
          May's Dinerissa ymmärrämme, että asiakastyytyväisyys on olennaista
          liiketoimintamme menestykselle. Siksi varmistamme, että työntekijämme
          tarjoavat poikkeuksellista palvelua asiakkaillemme. Saavutamme tämän
          kouluttamalla henkilökuntaamme olemaan kohteliaita, ystävällisiä ja
          huomioimaan asiakkaidemme tarpeet. Lisäksi varmistamme, että
          henkilökuntamme tuntee valikoimamme ja osaa suositella asiakkaille.
          Varmistaaksemme, että asiakkaillamme on mahtava kokemus dinerissämme,
          keskitymme myös seuraaviin alueisiin:
          <h5>Valikko</h5>
          Valikkomme suunnitellaan palvelemaan keskituloisten perheiden makua.
          Tarjoamme monipuolisen valikoiman aterioita aamiaiselle, lounaalle ja
          päivälliselle, mukaan lukien kasvis- ja gluteenittomia vaihtoehtoja.
          Raaka-aineemme ovat korkealaatuisia, ja varmistamme, että ruokamme on
          tuoretta ja herkullista.
          <h5>Ilmapiiri</h5>
          Luomme lämpimän ja kutsuvan ilmapiirin, joka saa asiakkaamme tuntemaan
          olonsa kotoisaksi. Ravintolamme sisustetaan viihtyisällä ja mukavalla
          teemalla, ja soitamme pehmeää musiikkia luodaksemme rentouttavan
          tunnelman.
          <h5>Puhtaus</h5>
          Ylläpidämme korkeaa puhtaanapidon tasoa ravintolassamme
          varmistaaksemme, että asiakkaamme tuntevat olonsa mukavaksi ja
          turvalliseksi. Henkilökuntamme koulutetaan puhdistamaan ja
          desinfioimaan kaikki pinnat säännöllisesti, ja varmistamme, että
          wc-tilamme ovat moitteettomassa kunnossa.
          <h5>Asiakaspalaute</h5>
          Kannustamme asiakkaitamme antamaan palautetta kokemuksestaan
          dinerissämme. Käytämme tätä palautetta parantaaksemme palveluamme ja
          tekemään muutoksia tarvittaessa. Palkitsemme myös asiakkaitamme heidän
          palautteestaan tarjoamalla alennuksia ja tarjouksia.
          <h5>Mainonta Strategia</h5>
          Pääkohdesegmenttimme on keskituloiset perheet Atlantassa, Georgiassa.
          Houkutellaksemme tätä segmenttiä, käytämme seuraavia
          mainontataktiikoita:
          <li>Sosiaalisen Median Mainonta</li>
          Perustelu: Sosiaalinen media on tehokas tapa tavoittaa
          kohdesegmenttimme, sillä monet perheet käyttävät sosiaalisen median
          alustoja säännöllisesti. Tavoite: Lisätä bränditietoisuutta ja
          houkutella uusia asiakkaita. Toimenpiteet: Luomme sosiaalisen median
          tilejä Facebookiin, Instagramiin ja Twitteriin ja julkaisemme
          säännöllisesti kiinnostavaa sisältöä. Ajastamme kohdennettuja
          mainoksia näillä alustoilla tavoittaaksemme kohdesegmenttimme.
          <li>Paikallisen Sanomalehden Mainonta</li>
          Perustelu: Paikalliset sanomalehdet ovat suosittu tiedonlähde
          perheille alueellamme. Tavoite: Lisätä bränditietoisuutta ja
          houkutella uusia asiakkaita. Toimenpiteet: Asetamme mainoksia
          paikallisissa sanomalehdissä, korostaen valikkoamme, tarjouksiamme ja
          alennuksiamme. Sisällytämme myös yhteystietomme ja sijaintimme.
          <li>Mainostaulu Mainonta</li>
          Perustelu: Mainostaulut ovat tehokas tapa tavoittaa suuri yleisö
          tietyllä alueella. Tavoite: Lisätä bränditietoisuutta ja houkutella
          uusia asiakkaita. Toimenpiteet: Asetamme mainostauluja Atlantan
          vilkasliikenteisille alueille, korostaen valikkoamme, tarjouksiamme ja
          alennuksiamme. Sisällytämme myös yhteystietomme ja sijaintimme.
          <li>Sähköpostimarkkinointi</li>
          Perustelu: Sähköpostimarkkinointi on tehokas tapa tavoittaa
          kohdesegmenttimme suoraan. Tavoite: Lisätä bränditietoisuutta ja
          houkutella uusia asiakkaita. Toimenpiteet: Keräämme asiakkaidemme
          sähköpostiosoitteita ja käytämme niitä lähettääksemme
          markkinointisähköposteja. Tarjoamme myös alennuksia ja tarjouksia
          asiakkaille, jotka liittyvät sähköpostilistallemme.
          <li>Myymälässä Tarjoukset</li>
          Perustelu: Myymälässä tarjoukset ovat tehokas tapa houkutella
          asiakkaita, jotka ovat jo alueellamme. Tavoite: Lisätä myyntiä ja
          houkutella uusia asiakkaita. Toimenpiteet: Tarjoamme alennuksia ja
          tarjouksia asiakkaille, jotka vierailevat dinerissämme tiettyinä
          aikoina tai tiettyinä päivinä. Tarjoamme myös uskollisuusohjelmia
          kannustaaksemme toistuvaan liiketoimintaan. Yhteenvetona, May's
          Dinerissa keskitymme tarjoamaan poikkeuksellista palvelua
          asiakkaillemme ja käyttämään tehokkaita mainontataktiikoita
          houkutellaksemme kohdesegmenttimme. Olemme varmoja, että
          Palvelustrategiamme ja Mainonta Strategiamme auttavat meitä
          saavuttamaan liiketoimintatavoitteemme ja tulemaan menestyksekkääksi
          ravintolaksi Atlantassa, Georgiassa.
        </div>
        <br />
        <div>
          <h3>Toiminnot</h3>

          <h4>Keskeiset toiminnot</h4>

          <li>
            Aloitamme hankkimalla tuoreita ja laadukkaita raaka-aineita
            aamiainen, lounas ja illallismenuihimme.
          </li>
          <li>
            Valmistamme ruoan nykyaikaisessa keittiössämme varmistaen, että
            jokainen annos on valmistettu täydellisesti ja täyttää korkeat
            laatuvaatimuksemme.
          </li>
          <li>
            Koulutamme henkilökuntaamme tarjoamaan erinomaista asiakaspalvelua
            varmistaen, että asiakkaillamme on ikimuistoinen ruokailukokemus.
          </li>
          <li>
            Pidämme ravintolassamme puhtaan ja hygieenisen ympäristön
            varmistaen, että asiakkaamme tuntevat olonsa turvalliseksi ja
            mukavaksi.
          </li>
          <li>
            Hallinnoimme varastoamme ja tarvikkeitamme varmistaaksemme, että
            meillä on aina tarvittavat raaka-aineet ja materiaalit saatavilla
            tuotteidemme ja palveluidemme tarjoamiseen.
          </li>
          <li>
            Markkinoimme liiketoimintaamme eri kanavien kautta, mukaan lukien
            sosiaalinen media, painetut mainokset ja suosittelut,
            houkutellaksemme uusia asiakkaita ja säilyttääksemme nykyiset.
          </li>

          <h4>Toteutussuunnitelma</h4>

          <li>
            Sijoituskohde 1: Rakentaminen - Palkkaamme arvostetun
            rakennusyrityksen rakentamaan ravintolamme määräystemme ja
            suunnittelumme mukaisesti. Tämä sijoituskohde maksaa meille 500 000
            dollaria.
          </li>
          <li>
            Sijoituskohde 2: Kalusteet - Hankimme laadukkaita huonekaluja ja
            kalusteita ravintolaamme, mukaan lukien pöydät, tuolit, valaistus ja
            sisustus. Tämä sijoituskohde maksaa meille 300 000 dollaria.
          </li>
          <li>
            Sijoituskohde 3: Varusteet - Hankimme nykyaikaisia keittiölaitteita,
            mukaan lukien uunit, liedet, jääkaapit ja astianpesukoneet,
            varmistaaksemme, että voimme valmistaa ruokamme tehokkaasti ja
            korkeimpien standardien mukaisesti. Tämä sijoituskohde maksaa meille
            100 000 dollaria.
          </li>
          <li>
            Sijoituskohde 4: Käyttöpääoma - Varataan 100 000 dollaria kattamaan
            operatiiviset kulut, kuten vuokra, yleiskustannukset, palkat ja
            markkinointi, kunnes liiketoimintamme on kannattavaa.
          </li>
        </div>
        <br />
        <div>
          <h3>Johtaminen</h3>
          <h4>Työntekijäroolit</h4>
          <li>Yleismies</li>
          Vastuut: - Valvoa ravintolan kaikkia toimintoja - Johtaa ja valvoa
          kaikkia työntekijöitä - Kehittää ja toteuttaa
          liiketoimintastrategioita liikevaihdon ja kannattavuuden lisäämiseksi
          - Varmistaa asiakastyytyväisyys ylläpitämällä korkealaatuista ruokaa
          ja palvelua - Hallinnoi varastoa ja tilaa tarvikkeita tarpeen mukaan -
          Kehittää ja ylläpitää suhteita toimittajiin ja toimittajiin Ehdokkaan
          vaatimukset: - Kauppatieteiden kandidaatin tutkinto tai siihen
          liittyvä tutkinto - 5+ vuoden kokemus ravintolan hallinnosta - Vahvat
          johtamis- ja viestintätaidot - Kyky työskennellä nopeatempoisessa
          ympäristössä - Tietämys ravintolan toiminnasta ja alan trendeistä
          <li>Pääkokki</li>
          Vastuut: - Luoda ja kehittää ruokalistoja - Johtaa ja kouluttaa
          keittiöhenkilökuntaa - Varmistaa ruoan laatu ja yhdenmukaisuus -
          Hallinnoi varastoa ja tilaa tarvikkeita tarpeen mukaan - Ylläpitää
          keittiön puhtautta ja turvallisuusstandardeja - Kehittää ja ylläpitää
          suhteita paikallisiin maanviljelijöihin ja toimittajiin Ehdokkaan
          vaatimukset: - Kokkipätevyys tai vastaava kokemus - 5+ vuoden kokemus
          pääkokkina tai keittiömestarina - Tietämys paikallisista ja sesonkiin
          liittyvistä raaka-aineista - Kyky työskennellä nopeatempoisessa
          ympäristössä - Vahvat johtamis- ja viestintätaidot
          <li>Tarjoilija</li>
          Vastuut: - Tervehtiä asiakkaita ja ottaa vastaan tilaukset - Tarjoilla
          ruokaa ja juomia ajallaan ja ammattimaisesti - Vastata asiakkaiden
          kysymyksiin ja tehdä suosituksia - Ylläpitää ruokailualueen puhtautta
          ja järjestystä - Käsitellä käteis- ja luottokorttimaksuja - Avustaa
          siivouksessa ja sulkemistehtävissä Ehdokkaan vaatimukset: - Lukion
          päättötodistus tai vastaava - Aikaisempi kokemus ravintolassa tai
          asiakaspalvelutehtävissä - Ystävällinen ja ulospäinsuuntautunut
          persoona - Kyky työskennellä nopeatempoisessa ympäristössä - Vahvat
          viestintä- ja asiakaspalvelutaidot
          <li>Kokki</li>
          Vastuut: - Valmistaa ja kokkaa ruokalistoja - Ylläpitää keittiön
          puhtautta ja turvallisuusstandardeja - Avustaa varastonhallinnassa ja
          tarvikkeiden tilauksessa - Noudattaa reseptejä ja annoskokojen ohjeita
          - Avustaa siivouksessa ja sulkemistehtävissä Ehdokkaan vaatimukset: -
          Aikaisempi kokemus linjakkona tai valmistelukokkina - Tietämys
          perustekniikoista ja elintarviketurvallisuusohjeista - Kyky
          työskennellä nopeatempoisessa ympäristössä - Vahva huomion
          kiinnittäminen yksityiskohtiin ja organisointitaidot
          <li>Tiskari</li>
          Vastuut: - Pestä ja desinfioida astiat, välineet ja keittiölaitteet -
          Avustaa keittiön siivouksessa ja järjestelyssä - Avustaa
          varastonhallinnassa ja tarvikkeiden tilauksessa - Noudattaa
          turvallisuus- ja hygieniaohjeita - Avustaa siivouksessa ja
          sulkemistehtävissä Ehdokkaan vaatimukset: - Aikaisempi kokemus
          tiskarina tai vastaavassa roolissa - Kyky työskennellä
          nopeatempoisessa ympäristössä - Vahva huomion kiinnittäminen
          yksityiskohtiin ja organisointitaidot
          <li>Markkinointipäällikkö</li>
          Vastuut: - Kehittää ja toteuttaa markkinointistrategioita brändin
          tunnettuuden ja asiakasliikenteen lisäämiseksi - Hallinnoi sosiaalisen
          median tilejä ja verkkoläsnäoloa - Suunnitella ja toteuttaa tapahtumia
          ja kampanjoita - Analysoi ja raportoi markkinointimittareista - Tekee
          yhteistyötä toimitusjohtajan kanssa liiketoimintastrategioiden
          kehittämiseksi Ehdokkaan vaatimukset: - Markkinoinnin kandidaatin
          tutkinto tai siihen liittyvä koulutus - 3+ vuoden kokemus
          markkinoinnista, mieluiten ravintola-alalta - Tuntemus sosiaalisen
          median alustoista ja digitaalisesta markkinoinnista - Vahvat
          viestintä- ja analysointitaidot - Kyky työskennellä itsenäisesti ja
          osana tiimiä
          <li>Apulaistoimitusjohtaja</li>
          Vastuut: - Avustaa toimitusjohtajaa päivittäisissä toiminnoissa -
          Hallinnoi ja valvoo työntekijöitä toimitusjohtajan ollessa poissa -
          Avustaa varastonhallinnassa ja tarvikkeiden tilauksessa - Käsittelee
          asiakasvalituksia ja ratkaisee ongelmia - Avustaa aikataulutuksessa ja
          palkanlaskennassa - Avustaa siivouksessa ja sulkemistehtävissä
          Ehdokkaan vaatimukset: - Lukion päättötodistus tai vastaava -
          Aikaisempi kokemus ravintolassa tai asiakaspalvelutehtävissä - Vahvat
          johtamis- ja viestintätaidot - Kyky työskennellä nopeatempoisessa
          ympäristössä - Tietämys ravintolan toiminnasta ja alan trendeistä
          <li>Isäntä/emäntä</li>
          Vastuut: - Tervehtiä asiakkaita ja ohjata heidät pöytiin - Hallinnoi
          varauksia ja odotuslistoja - Vastata asiakkaiden kysymyksiin ja tehdä
          suosituksia - Ylläpitää etuosan puhtautta ja järjestystä - Avustaa
          siivouksessa ja sulkemistehtävissä Ehdokkaan vaatimukset: - Aikaisempi
          kokemus isäntänä/emäntänä tai vastaavassa roolissa - Ystävällinen ja
          ulospäinsuuntautunut persoona - Kyky työskennellä nopeatempoisessa
          ympäristössä - Vahvat viestintä- ja asiakaspalvelutaidot
          <li>Baarimikko</li>
          Vastuut: - Sekoittaa ja tarjoilee alkoholijuomia ja alkoholittomia
          juomia - Ylläpitää baaritiskin puhtautta ja järjestystä - Käsittelee
          käteis- ja luottokorttimaksuja - Avustaa varastonhallinnassa ja
          tarvikkeiden tilauksessa - Noudattaa turvallisuus- ja hygieniaohjeita
          - Avustaa siivouksessa ja sulkemistehtävissä Ehdokkaan vaatimukset: -
          Aikaisempi kokemus baarimikkona tai vastaavassa roolissa - Tuntemus
          alkoholijuomista ja alkoholittomista juomista - Kyky työskennellä
          nopeatempoisessa ympäristössä - Vahvat viestintä- ja
          asiakaspalvelutaidot
          <li>Siivooja</li>
          Vastuut: - Tyhjentää ja siivoaa pöytiä asiakkaiden välillä - Avustaa
          tarjoilijoita asiakkaiden tarpeissa - Ylläpitää ravintola-alueen
          siisteyttä ja järjestystä - Avustaa siivouksessa ja sulkemistehtävissä
          Ehdokkaan vaatimukset: - Aikaisempi kokemus siivoojana tai vastaavassa
          roolissa - Kyky työskennellä nopeatempoisessa ympäristössä - Vahva
          huomion kiinnittäminen yksityiskohtiin ja organisointitaidot Yleisesti
          ottaen May's Diner tarvitsee monipuolisen työntekijätiimin
          varmistaakseen ravintolan menestyksen. Jokainen työntekijän asema on
          ratkaisevassa roolissa päivittäisissä toiminnoissa ja
          asiakastyytyväisyydessä. Ehdokkaiden vaatimukset kullekin asemalle
          heijastavat tarvittavia taitoja ja kokemusta menestyäkseen omassa
          roolissaan. Oikean tiimin ollessa paikallaan May's Diner voi muodostua
          kukoistavaksi ravintolaksi Atlantan, Georgian alueella.
        </div>
        <br />

        {finTableExample(words)}

        <div>
          <h3>Risk and Mitigation</h3>
          Valmistauduttaessa May's Dinerin avaamiseen ymmärrämme, että
          ravintola-alan liiketoimintaan liittyy useita riskejä.
          Varmistaaksemme, että olemme valmiita mahdollisiin haasteisiin, olemme
          kehittäneet kattavan riskienhallintasuunnitelman. Alla on viisi
          tärkeintä riskiä, jotka olemme tunnistaneet, ja niihin liittyvät
          lieventävät toimenpiteet, joita toteutamme niiden käsittelemiseksi.
          <li>
            Riski: Ruokaturvallisuuteen liittyvät huolenaiheet
            <br />
            Ravintolana ensisijainen tavoitteemme on asiakkaidemme turvallisuus.
            Ymmärrämme, että elintarvikeperäisillä sairauksilla voi olla vakavia
            seurauksia sekä asiakkaillemme että liiketoiminnallemme.
            Lieventääksemme tätä riskiä, toteutamme tiukkoja
            elintarviketurvallisuusprotokollia, mukaan lukien säännölliset
            tarkastukset, työntekijäkoulutuksen sekä elintarvikkeiden
            asianmukaisen varastoinnin ja käsittelyn. Työskentelemme myös
            tiiviisti paikallisten terveysviranomaisten kanssa varmistaaksemme,
            että noudatamme kaikkia määräyksiä ja ohjeita.
          </li>
          <li>
            Riski: Henkilöstövaje
            <br />
            Ymmärrämme, että 10 hengen tiimillä henkilöstövajeilla voi olla
            merkittävä vaikutus liiketoimintaamme. Lieventääksemme tätä riskiä,
            kehitämme kattavan henkilöstösuunnitelman, joka sisältää
            ristiinkoulutusta ja varahenkilöstöä. Tarjoamme myös
            kilpailukykyistä palkkaa ja etuja houkutellaksemme ja
            säilyttääksemme parhaat kyvyt, ja työskentelemme tiiviisti
            paikallisten henkilöstötoimistojen kanssa varmistaaksemme, että
            meillä on pääsy pätevään hakijapooliin.
          </li>
          <li>
            Riski: Kielteiset verkkokatsaukset
            <br />
            Nykyajan digitaalisessa maailmassa verkkokatsaukset voivat tehdä tai
            rikkoa liiketoiminnan. Ymmärrämme, että kielteisillä arvosteluilla
            voi olla merkittävä vaikutus maineeseemme ja tulokseemme.
            Lieventääksemme tätä riskiä, toteutamme proaktiivisen
            lähestymistavan asiakaspalveluun varmistaaksemme, että kaikki
            asiakkaiden valitukset ja huolenaiheet käsitellään ajallaan ja
            ammattimaisella tavalla. Kannustamme myös tyytyväisiä asiakkaita
            jättämään positiivisia arvosteluja verkossa, ja työskentelemme
            paikallisten vaikuttajien ja bloggaajien kanssa edistääksemme
            brändiämme ja luodaksemme positiivista kohinaa.
          </li>
          <li>
            Riski: Toimitusketjun häiriöt
            <br />
            Fyysisen sijaintiravintolana luotamme jatkuvaan tuoreiden
            raaka-aineiden toimitukseen ruokiemme valmistamiseksi. Ymmärrämme,
            että toimitusketjun häiriöillä voi olla merkittävä vaikutus
            toimintakykyymme. Lieventääksemme tätä riskiä, luomme suhteet
            useisiin toimittajiin varmistaaksemme, että meillä on pääsy
            monipuoliseen raaka-ainevalikoimaan. Kehitämme myös varasuunnitelman
            mahdollisten häiriöiden käsittelemiseksi, mukaan lukien
            vaihtoehtoiset hankintavaihtoehdot ja ruokalistan muutokset.
          </li>
          <li>
            Riski: Talouden taantuma
            <br />
            Talouden taantuman tapahtuessa ymmärrämme, että kuluttajilla voi
            olla vähemmän käytettävissä olevaa tuloa ruokailuun. Lieventääksemme
            tätä riskiä kehitämme hinnoittelustrategian, joka on
            kilpailukykyinen ja edullinen, laadusta tinkimättä. Toteutamme myös
            kustannussäästötoimenpiteitä, kuten jätteen vähentämistä ja
            toimitusketjun optimointia. Lisäksi tutkimme vaihtoehtoisia
            tulovirtoja, kuten catering- ja kuljetuspalveluita,
            monipuolistaaksemme tulojamme ja tavoittaaksemme uusia asiakkaita.
          </li>
          Yhteenvetona voidaan todeta, että vaikka ravintola-alan
          liiketoimintaan liittyy useita riskejä, olemme varmoja siitä, että
          kattava riskienhallintasuunnitelmamme auttaa meitä navigoimaan
          mahdollisten haasteiden läpi. Painottaessamme ruokaturvallisuutta,
          henkilöstöä, asiakaspalvelua, toimitusketjun hallintaa ja
          hinnoittelustrategiaa, asetamme itsemme menestykseen kilpailullisilla
          Atlantan ravintolamarkkinoilla.
        </div>
        <br />
        <hr />
      </div>
    </div>
  );
}
