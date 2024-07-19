import { useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Pixel from '../components/Pixel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import XPixel from '../components/XPixel';

export default function LastStepPlanGen({ fbPixelId, xPixelId }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //set language
  const { push, asPath } = useRouter();
  const [localeState, setLocaleState] = useState('en');

  // set localeState with localStorage named 'locale'
  useEffect(() => {
    const locale = localStorage.getItem('locale');
    if (locale) {
      setLocaleState(locale);
    } else {
      setLocaleState('en');
    }
  }, []);

  function refundEN() {
    return (
      <div>
        <h2>Refund Policy for 15minuteplan.ai</h2>

        <p>
          At 15minuteplan.ai, we strive to provide high-quality business plans
          tailored to the unique needs of each customer. However, we understand
          that there may be instances where our service may not fully meet your
          expectations. In such cases, we offer a structured refund policy as
          outlined below:
        </p>

        <ol>
          <li>
            Refund Request Submission: If you wish to proceed with a refund
            request, you are required to submit a detailed document outlining
            specific areas of the business plan that were unsatisfactory.
          </li>

          <li>
            Documentation Requirements: The submission should be in the form of
            a Word document, clearly highlighting a minimum of 10 sections of
            the plan that did not meet your expectations. Each identified area
            should include comments explaining why it was unsatisfactory or how
            it was irrelevant to your industry.
          </li>

          <li>
            Guidance for Adding Comments: For assistance on how to add comments
            to a Word document, please refer to our guide available at:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Evaluation Criteria: The identified unsatisfactory parts of the plan
            must be valid and substantiated with clear reasons or explanations.
            Our team will review these comments to understand the areas of
            concern.
          </li>

          <li>
            Partial Refund Eligibility: If at least 5 valid areas of concern are
            identified and substantiated in your document, you may be eligible
            for a half refund of the total amount paid.
          </li>

          <li>
            Full Refund Conditions: Full refunds are subject to a more thorough
            review and will be considered only if the provided reasons
            comprehensively demonstrate that the business plan is significantly
            misaligned with your specified requirements.
          </li>

          <li>
            Refund Processing: Upon approval of your refund request, the refund
            process will be initiated. Please allow a certain number of business
            days for the refund to be processed and credited back to your
            original method of payment.
          </li>

          <li>
            Feedback and Improvement: We value your feedback as it helps us
            improve our services. Please feel free to provide additional
            comments or suggestions along with your refund request.
          </li>
        </ol>

        <p>
          We appreciate your business and are committed to ensuring your
          satisfaction. If you have any questions or need further assistance,
          please do not hesitate to contact our customer support team.
        </p>
      </div>
    );
  }

  function refundDE() {
    return (
      <div>
        <h2>Rückerstattungsrichtlinie für 15minuteplan.ai</h2>

        <p>
          Bei 15minuteplan.ai bemühen wir uns, hochwertige Geschäftspläne
          bereitzustellen, die auf die einzigartigen Bedürfnisse jedes Kunden
          zugeschnitten sind. Wir verstehen jedoch, dass es Fälle geben kann, in
          denen unser Service Ihre Erwartungen möglicherweise nicht vollständig
          erfüllt. In solchen Fällen bieten wir eine strukturierte
          Rückerstattungsrichtlinie wie unten beschrieben:
        </p>

        <ol>
          <li>
            Rückerstattungsantrag: Wenn Sie einen Rückerstattungsantrag stellen
            möchten, müssen Sie ein detailliertes Dokument einreichen, in dem
            spezifische Bereiche des Geschäftsplans aufgeführt sind, die nicht
            zufriedenstellend waren.
          </li>

          <li>
            Dokumentationsanforderungen: Die Einreichung sollte in Form eines
            Word-Dokuments erfolgen, das mindestens 10 Abschnitte des Plans
            deutlich hervorhebt, die Ihren Erwartungen nicht entsprachen. Jeder
            identifizierte Bereich sollte Kommentare enthalten, die erklären,
            warum er unbefriedigend war oder wie er für Ihre Branche irrelevant
            war.
          </li>

          <li>
            Anleitung zum Hinzufügen von Kommentaren: Für Hilfe beim Hinzufügen
            von Kommentaren zu einem Word-Dokument verweisen wir auf unseren
            Leitfaden unter:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Bewertungskriterien: Die identifizierten unbefriedigenden Teile des
            Plans müssen gültig sein und mit klaren Gründen oder Erklärungen
            belegt werden. Unser Team wird diese Kommentare überprüfen, um die
            Problemstellen zu verstehen.
          </li>

          <li>
            Teilweise Rückerstattung: Wenn in Ihrem Dokument mindestens 5
            gültige Problemstellen identifiziert und belegt werden, können Sie
            möglicherweise eine halbe Rückerstattung des gezahlten Gesamtbetrags
            erhalten.
          </li>

          <li>
            Vollständige Rückerstattungsbedingungen: Volle Rückerstattungen
            unterliegen einer gründlicheren Überprüfung und werden nur in
            Betracht gezogen, wenn die bereitgestellten Gründe umfassend
            demonstrieren, dass der Geschäftsplan erheblich von Ihren
            angegebenen Anforderungen abweicht.
          </li>

          <li>
            Rückerstattungsabwicklung: Nach Genehmigung Ihres
            Rückerstattungsantrags wird der Rückerstattungsprozess eingeleitet.
            Bitte erlauben Sie einige Werktage, bis die Rückerstattung
            bearbeitet und auf Ihre ursprüngliche Zahlungsmethode zurückgebucht
            wird.
          </li>

          <li>
            Feedback und Verbesserung: Wir schätzen Ihr Feedback, da es uns
            hilft, unsere Dienstleistungen zu verbessern. Bitte zögern Sie
            nicht, zusätzliche Kommentare oder Vorschläge zusammen mit Ihrem
            Rückerstattungsantrag zu geben.
          </li>
        </ol>

        <p>
          Wir schätzen Ihr Geschäft und sind bestrebt, Ihre Zufriedenheit
          sicherzustellen. Wenn Sie Fragen haben oder weitere Unterstützung
          benötigen, zögern Sie bitte nicht, unser Kundensupport-Team zu
          kontaktieren.
        </p>
      </div>
    );
  }

  function refundFR() {
    return (
      <div>
        <h2>Politique de remboursement pour 15minuteplan.ai</h2>

        <p>
          Chez 15minuteplan.ai, nous nous efforçons de fournir des plans
          d'affaires de haute qualité adaptés aux besoins uniques de chaque
          client. Cependant, nous comprenons qu'il peut y avoir des cas où notre
          service peut ne pas répondre entièrement à vos attentes. Dans de tels
          cas, nous offrons une politique de remboursement structurée comme
          décrit ci-dessous:
        </p>

        <ol>
          <li>
            Soumission de demande de remboursement: Si vous souhaitez procéder à
            une demande de remboursement, vous devez soumettre un document
            détaillé décrivant les zones spécifiques du plan d'affaires qui
            étaient insatisfaisantes.
          </li>

          <li>
            Exigences de documentation: La soumission doit être sous la forme
            d'un document Word, mettant clairement en évidence un minimum de 10
            sections du plan qui n'ont pas répondu à vos attentes. Chaque zone
            identifiée doit inclure des commentaires expliquant pourquoi elle
            était insatisfaisante ou comment elle était sans rapport avec votre
            industrie.
          </li>

          <li>
            Conseils pour ajouter des commentaires: Pour obtenir de l'aide sur
            la façon d'ajouter des commentaires à un document Word, veuillez
            vous référer à notre guide disponible à l'adresse:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Critères d'évaluation: Les parties insatisfaisantes identifiées du
            plan doivent être valides et étayées par des raisons ou des
            explications claires. Notre équipe examinera ces commentaires pour
            comprendre les zones de préoccupation.
          </li>

          <li>
            Éligibilité au remboursement partiel: Si au moins 5 zones de
            préoccupation valides sont identifiées et étayées dans votre
            document, vous pouvez être éligible à un remboursement de la moitié
            du montant total payé.
          </li>

          <li>
            Conditions de remboursement intégral: Les remboursements intégraux
            sont soumis à un examen plus approfondi et ne seront envisagés que
            si les raisons fournies démontrent de manière exhaustive que le plan
            d'affaires est significativement désaligné de vos exigences
            spécifiées.
          </li>

          <li>
            Traitement du remboursement: Une fois votre demande de remboursement
            approuvée, le processus de remboursement sera initié. Veuillez
            prévoir un certain nombre de jours ouvrables pour que le
            remboursement soit traité et crédité sur votre méthode de paiement
            originale.
          </li>

          <li>
            Rétroaction et amélioration: Nous apprécions vos commentaires car
            ils nous aident à améliorer nos services. N'hésitez pas à fournir
            des commentaires ou des suggestions supplémentaires avec votre
            demande de remboursement.
          </li>
        </ol>

        <p>
          Nous apprécions votre entreprise et nous nous engageons à assurer
          votre satisfaction. Si vous avez des questions ou avez besoin d'une
          assistance supplémentaire, n'hésitez pas à contacter notre équipe de
          support client.
        </p>
      </div>
    );
  }

  function refundES() {
    return (
      <div>
        <h2>Política de reembolso para 15minuteplan.ai</h2>

        <p>
          En 15minuteplan.ai, nos esforzamos por proporcionar planes de negocio
          de alta calidad adaptados a las necesidades únicas de cada cliente.
          Sin embargo, entendemos que puede haber casos en los que nuestro
          servicio no cumpla completamente con sus expectativas. En tales casos,
          ofrecemos una política de reembolso estructurada como se describe a
          continuación:
        </p>

        <ol>
          <li>
            Solicitud de reembolso: Si desea proceder con una solicitud de
            reembolso, se requiere que envíe un documento detallado que describa
            las áreas específicas del plan de negocio que fueron
            insatisfactorias.
          </li>

          <li>
            Requisitos de documentación: La presentación debe ser en forma de un
            documento de Word, destacando claramente un mínimo de 10 secciones
            del plan que no cumplieron con sus expectativas. Cada área
            identificada debe incluir comentarios que expliquen por qué fue
            insatisfactoria o cómo era irrelevante para su industria.
          </li>

          <li>
            Orientación para agregar comentarios: Para obtener ayuda sobre cómo
            agregar comentarios a un documento de Word, consulte nuestra guía
            disponible en:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Criterios de evaluación: Las partes insatisfactorias identificadas
            del plan deben ser válidas y estar respaldadas con razones o
            explicaciones claras. Nuestro equipo revisará estos comentarios para
            entender las áreas de preocupación.
          </li>

          <li>
            Elegibilidad para reembolso parcial: Si se identifican y fundamentan
            al menos 5 áreas de preocupación válidas en su documento, puede ser
            elegible para un reembolso de la mitad del monto total pagado.
          </li>

          <li>
            Condiciones de reembolso total: Los reembolsos totales están sujetos
            a una revisión más exhaustiva y solo se considerarán si las razones
            proporcionadas demuestran de manera exhaustiva que el plan de
            negocio está significativamente desalineado con sus requisitos
            especificados.
          </li>

          <li>
            Procesamiento de reembolso: Una vez aprobada su solicitud de
            reembolso, se iniciará el proceso de reembolso. Por favor, permita
            un cierto número de días hábiles para que el reembolso sea procesado
            y acreditado a su método de pago original.
          </li>

          <li>
            Comentarios y mejoras: Valoramos sus comentarios ya que nos ayudan a
            mejorar nuestros servicios. No dude en proporcionar comentarios o
            sugerencias adicionales junto con su solicitud de reembolso.
          </li>
        </ol>

        <p>
          Apreciamos su negocio y estamos comprometidos a garantizar su
          satisfacción. Si tiene alguna pregunta o necesita más ayuda, no dude
          en ponerse en contacto con nuestro equipo de soporte al cliente.
        </p>
      </div>
    );
  }

  function refundIT() {
    return (
      <div>
        <h2>Politica di rimborso per 15minuteplan.ai</h2>

        <p>
          Da 15minuteplan.ai, ci impegniamo a fornire piani aziendali di alta
          qualità adattati alle esigenze uniche di ogni cliente. Tuttavia,
          comprendiamo che ci possano essere casi in cui il nostro servizio
          potrebbe non soddisfare completamente le vostre aspettative. In tali
          casi, offriamo una politica di rimborso strutturata come descritto di
          seguito:
        </p>

        <ol>
          <li>
            Presentazione della richiesta di rimborso: se desideri procedere con
            una richiesta di rimborso, è necessario che tu invii un documento
            dettagliato che descriva le aree specifiche del piano aziendale che
            sono state insoddisfacenti.
          </li>

          <li>
            Requisiti di documentazione: la presentazione dovrebbe essere sotto
            forma di un documento Word, evidenziando chiaramente un minimo di 10
            sezioni del piano che non hanno soddisfatto le tue aspettative. Ogni
            area identificata dovrebbe includere commenti che spiegano perché
            era insoddisfacente o come era irrilevante per la tua industria.
          </li>

          <li>
            Orientamento per l'aggiunta di commenti: per assistenza su come
            aggiungere commenti a un documento Word, si prega di fare
            riferimento alla nostra guida disponibile su:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Criteri di valutazione: le parti insoddisfacenti identificate del
            piano devono essere valide e supportate da ragioni o spiegazioni
            chiare. Il nostro team esaminerà questi commenti per capire le aree
            di preoccupazione.
          </li>

          <li>
            Eleggibilità al rimborso parziale: se almeno 5 aree di
            preoccupazione valide sono identificate e supportate nel tuo
            documento, potresti avere diritto a un rimborso parziale
            dell'importo totale pagato.
          </li>

          <li>
            Condizioni di rimborso completo: i rimborsi completi sono soggetti a
            una revisione più approfondita e saranno considerati solo se le
            ragioni fornite dimostrano in modo esaustivo che il piano aziendale
            è significativamente disallineato rispetto alle tue specifiche
            esigenze.
          </li>

          <li>
            Elaborazione del rimborso: una volta approvata la tua richiesta di
            rimborso, verrà avviato il processo di rimborso. Si prega di
            consentire un certo numero di giorni lavorativi perché il rimborso
            venga elaborato e accreditato sul tuo metodo di pagamento originale.
          </li>

          <li>
            Feedback e miglioramento: apprezziamo il tuo feedback in quanto ci
            aiuta a migliorare i nostri servizi. Non esitare a fornire commenti
            o suggerimenti aggiuntivi insieme alla tua richiesta di rimborso.
          </li>
        </ol>

        <p>
          Apprezziamo il tuo business e ci impegniamo a garantire la tua
          soddisfazione. Se hai domande o hai bisogno di ulteriore assistenza,
          non esitare a contattare il nostro team di supporto al cliente.
        </p>
      </div>
    );
  }

  function refundNL() {
    return (
      <div>
        <h2>Terugbetalingsbeleid voor 15minuteplan.ai</h2>

        <p>
          Bij 15minuteplan.ai streven we ernaar om hoogwaardige bedrijfsplannen
          te leveren die zijn afgestemd op de unieke behoeften van elke klant.
          We begrijpen echter dat er gevallen kunnen zijn waarin onze service
          mogelijk niet volledig aan uw verwachtingen voldoet. In dergelijke
          gevallen bieden we een gestructureerd terugbetalingsbeleid zoals
          hieronder uiteengezet:
        </p>

        <ol>
          <li>
            Indiening van terugbetalingsverzoek: Als u een terugbetalingsverzoek
            wilt indienen, moet u een gedetailleerd document indienen waarin
            specifieke gebieden van het bedrijfsplan worden beschreven die
            onbevredigend waren.
          </li>

          <li>
            Documentatievereisten: De indiening moet in de vorm van een
            Word-document zijn, waarbij duidelijk minimaal 10 secties van het
            plan worden gemarkeerd die niet aan uw verwachtingen voldeden. Elk
            geïdentificeerd gebied moet opmerkingen bevatten die uitleggen
            waarom het onbevredigend was of hoe het irrelevant was voor uw
            branche.
          </li>

          <li>
            Richtlijnen voor het toevoegen van opmerkingen: Voor hulp bij het
            toevoegen van opmerkingen aan een Word-document, verwijzen wij u
            naar onze gids die beschikbaar is op:
            https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting.
          </li>

          <li>
            Evaluvaluatiecriteria: De geïdentificeerde onbevredigende delen van
            het plan moeten geldig zijn en onderbouwd met duidelijke redenen of
            uitleg. Ons team zal deze opmerkingen bekijken om de gebieden van
            zorg te begrijpen.
          </li>

          <li>
            Gedeeltelijke terugbetaling: Als er minstens 5 geldige zorggebieden
            worden geïdentificeerd en onderbouwd in uw document, komt u mogelijk
            in aanmerking voor een halve terugbetaling van het totaal betaalde
            bedrag.
          </li>

          <li>
            Voorwaarden voor volledige terugbetaling: Volledige terugbetalingen
            zijn onderworpen aan een grondigere beoordeling en worden alleen
            overwogen als de verstrekte redenen uitgebreid aantonen dat het
            bedrijfsplan aanzienlijk niet overeenkomt met uw gespecificeerde
            vereisten.
          </li>

          <li>
            Verwerking van terugbetaling: Na goedkeuring van uw
            terugbetalingsverzoek wordt het terugbetalingsproces gestart. Houd
            er rekening mee dat het een aantal werkdagen kan duren voordat de
            terugbetaling is verwerkt en teruggestort op uw oorspronkelijke
            betaalmethode.
          </li>

          <li>
            Feedback en verbetering: We waarderen uw feedback omdat het ons
            helpt onze diensten te verbeteren. Voel je vrij om extra opmerkingen
            of suggesties te geven samen met je terugbetalingsverzoek.
          </li>
        </ol>

        <p>
          We waarderen uw bedrijf en zijn toegewijd aan het waarborgen van uw
          tevredenheid. Als u vragen heeft of verdere hulp nodig heeft, aarzel
          dan niet om contact op te nemen met ons klantenserviceteam.
        </p>
      </div>
    );
  }

  function refundJA() {
    return (
      <div>
        <h2>15minuteplan.aiの返金ポリシー</h2>

        <p>
          15minuteplan.aiでは、各顧客のユニークなニーズに合わせた高品質のビジネスプランを提供することを目指しています。しかし、私たちのサービスがあなたの期待を完全に満たさない場合があることを理解しています。そのような場合、以下に概説する構造化された返金ポリシーを提供しています：
        </p>

        <ol>
          <li>
            返金リクエストの提出：返金リクエストを進める場合、ビジネスプランの不満足だった特定のエリアを概説する詳細な文書を提出する必要があります。
          </li>

          <li>
            文書化要件：提出物はWord文書の形式であるべきで、プランの最低10セクションがあなたの期待を満たさなかったことを明確に強調しているべきです。特定された各エリアには、それが不満足であった理由やあなたの業界にとって無関係であった方法を説明するコメントを含めるべきです。
          </li>

          <li>
            コメントの追加に関するガイダンス：Word文書にコメントを追加する方法についての支援については、次のガイドを参照してください：https://www.youtube.com/watch?v=9YUVUzcsLX4&ab_channel=ErinWrightWriting。
          </li>

          <li>
            評価基準：プランの不満足な部分を特定するためには、明確な理由や説明によって裏付けられた有効なものでなければなりません。私たちのチームは、これらのコメントをレビューして懸念のエリアを理解します。
          </li>

          <li>
            部分的な返金の適格性：あなたの文書で少なくとも5つの有効な懸念エリアが特定され、裏付けられている場合、支払った合計金額の半分の返金が可能です。
          </li>

          <li>
            全額返金の条件：全額返金はより徹底的なレビューが対象となり、提供された理由がビジネスプランがあなたの指定した要件と大幅に不一致であることを包括的に示している場合にのみ考慮されます。
          </li>

          <li>
            返金処理：返金リクエストが承認されると、返金プロセスが開始されます。返金が処理され、元の支払い方法に戻されるまでには、一定の営業日数を許してください。
          </li>

          <li>
            フィードバックと改善：私たちはあなたのフィードバックを大切にしており、それが私たちのサービスを改善するのに役立ちます。返金リクエストと一緒に、追加のコメントや提案を自由に提供してください。
          </li>
        </ol>

        <p>
          私たちはあなたのビジネスを大切にし、あなたの満足を確保することに尽力しています。質問がある場合やさらなる支援が必要な場合は、お気軽にカスタマーサポートチームにお問い合わせください。
        </p>
      </div>
    );
  }

  function handleHome() {
    push('/');
  }

  const [refund, setRefund] = useState(refundEN);

  useEffect(() => {
    switch (localeState) {
      case 'de':
        setRefund(refundDE);
        break;
      case 'fr':
        setRefund(refundFR);
        break;
      case 'es':
        setRefund(refundES);
        break;
      case 'it':
        setRefund(refundIT);
        break;
      case 'nl':
        setRefund(refundNL);
        break;
      case 'ja':
        setRefund(refundJA);
        break;
      default:
        setRefund(refundEN);
        break;
    }
  }, [localeState]);

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      <motion.div
        key="component-seven"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="overflow">
          <div role="banner" className="navbar w-nav">
            <div className="nav-block">
              <div className="nav">
                <Link
                  href="/"
                  aria-current="page"
                  className="brand w-nav-brand w--current"
                >
                  <Image
                    className="logo"
                    src="/img/final_horizontal_crop_V1.png"
                    width={270}
                    height={40}
                    sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="nav">
                <button className="nav-button-transparent" onClick={handleHome}>
                  Home
                </button>
              </div>
            </div>
            <div className="navbar-bg"></div>
          </div>
          <div className="section-full wf-section">
            <div className="get-started">
              <div className="form-bg">{refund}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index'])),
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
