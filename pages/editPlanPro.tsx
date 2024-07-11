import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import ReactDOMServer from 'react-dom/server';
import FinTable from '../components/FinTable';
import Survey from '../components/Survey';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { event } from 'nextjs-google-analytics';
import EditorPro from '../components/EditorPro';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import trackEvent from '../utils/trackEvent';
import Pixel from '../components/Pixel';
import { transformDataToLocalStorage } from '../utils/transformDataToLocalStorage';
import Modal from '../components/modal';
import dayjs from 'dayjs';
import { is45MinutesPassed } from '../utils/date';
import { ROUTE_PATH } from '../constants/path';
import { ITrustpilotInvitationLinksResponse } from '../model/Schema';
import TrustpilotModal from '../components/modal/TrustpilotModal';

interface FullPlanProps {
  secretKey: string;
  fbPixelId: string;
}

export default function fullPlan({ secretKey, fbPixelId }: FullPlanProps) {
  const { t } = useTranslation('editPlanPro');

  const { data: session } = useSession();
  const router = useRouter();
  const { planId } = router.query;

  //if no session redirect to login

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [saveAsWordLoading, setSaveAsWordLoading] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const [timer, setTimer] = useState(39);
  const [showAfterDelay, setShowAfterDelay] = useState(false);

  const [Exec, setExec] = useState('');
  const [Situ1, setSitu1] = useState('');
  const [Situ2, setSitu2] = useState('');
  const [Mark1, setMark1] = useState('');
  const [Mark2, setMark2] = useState('');
  const [Mark3, setMark3] = useState('');
  const [Mark4, setMark4] = useState('');
  const [Mark5, setMark5] = useState('');
  const [Mark6, setMark6] = useState('');
  const [Op1, setOp1] = useState('');
  const [Op2, setOp2] = useState('');
  const [Tech1, setTech1] = useState('');
  const [Tech2, setTech2] = useState('');
  const [Mang1, setMang1] = useState('');
  const [Mang2, setMang2] = useState('');
  const [Fin, setFin] = useState('');
  const [Growth, setGrowth] = useState('');
  const [Risk, setRisk] = useState('');

  const [originalExecFromDB, setOriginalExecFromDB] = useState('');
  const [originalSitu1FromDB, setOriginalSitu1FromDB] = useState('');
  const [originalSitu2FromDB, setOriginalSitu2FromDB] = useState('');
  const [originalMark1FromDB, setOriginalMark1FromDB] = useState('');
  const [originalMark2FromDB, setOriginalMark2FromDB] = useState('');
  const [originalMark3FromDB, setOriginalMark3FromDB] = useState('');
  const [originalMark4FromDB, setOriginalMark4FromDB] = useState('');
  const [originalMark5FromDB, setOriginalMark5FromDB] = useState('');
  const [originalMark6FromDB, setOriginalMark6FromDB] = useState('');
  const [originalOp1FromDB, setOriginalOp1FromDB] = useState('');
  const [originalOp2FromDB, setOriginalOp2FromDB] = useState('');
  const [originalTech1FromDB, setOriginalTech1FromDB] = useState('');
  const [originalTech2FromDB, setOriginalTech2FromDB] = useState('');
  const [originalMang1FromDB, setOriginalMang1FromDB] = useState('');
  const [originalMang2FromDB, setOriginalMang2FromDB] = useState('');
  const [originalGrowthFromDB, setOriginalGrowthFromDB] = useState('');
  const [originalRiskFromDB, setOriginalRiskFromDB] = useState('');

  const [initialInvestmentAmount, setInitialInvestmentAmount] = useState(0);

  const [investmentItem1, setInvestmentItem1] = useState('');
  const [investmentAmountItem1, setInvestmentAmountItem1] = useState(0);

  const [investmentItem2, setInvestmentItem2] = useState('');
  const [investmentAmountItem2, setInvestmentAmountItem2] = useState(0);

  const [investmentItem3, setInvestmentItem3] = useState('');
  const [investmentAmountItem3, setInvestmentAmountItem3] = useState(0);

  const [investmentItem4, setInvestmentItem4] = useState('');
  const [investmentAmountItem4, setInvestmentAmountItem4] = useState(0);

  const [investmentItem5, setInvestmentItem5] = useState('');
  const [investmentAmountItem5, setInvestmentAmountItem5] = useState(0);

  const [investmentItem6, setInvestmentItem6] = useState('');
  const [investmentAmountItem6, setInvestmentAmountItem6] = useState(0);

  const [investmentItem7, setInvestmentItem7] = useState('');
  const [investmentAmountItem7, setInvestmentAmountItem7] = useState(0);

  const [investmentItem8, setInvestmentItem8] = useState('');
  const [investmentAmountItem8, setInvestmentAmountItem8] = useState(0);

  const [investmentItem9, setInvestmentItem9] = useState('');
  const [investmentAmountItem9, setInvestmentAmountItem9] = useState(0);

  const [investmentItem10, setInvestmentItem10] = useState('');
  const [investmentAmountItem10, setInvestmentAmountItem10] = useState(0);
  // Finance--------------------------------------------------------
  const [firstYearRevenue, setFirstYearRevenue] = useState(0);
  const [revenueGrowthRate, setRevenueGrowthRate] = useState(0);

  // cost data-------------------------------------------------------
  const [COGSP, setCOGSP] = useState(0);
  const [wageCostP, setWageCostP] = useState(0);
  const [markCostP, setMarkCostP] = useState(0);
  const [rentCostP, setRentCostP] = useState(0);
  const [genCostP, setGenCostP] = useState(0);
  const [depreCostP, setDepreCostP] = useState(0);
  const [utilCostP, setUtilCostP] = useState(0);
  const [otherCostP, setOtherCostP] = useState(0);
  const [intCostP, setIntCostP] = useState(0);
  const [taxCostP, setTaxCostP] = useState(0);

  const [userEmail, setUserEmail] = useState('');

  // for content in editor 18 total ------------------------------------
  const [contentExec, setContentExec] = useState('');
  const [contentSitu1, setContentSitu1] = useState('');
  const [contentSitu2, setContentSitu2] = useState('');
  const [contentMark1, setContentMark1] = useState('');
  const [contentMark2, setContentMark2] = useState('');
  const [contentMark3, setContentMark3] = useState('');
  const [contentMark4, setContentMark4] = useState('');
  const [contentMark5, setContentMark5] = useState('');
  const [contentMark6, setContentMark6] = useState('');
  const [contentOp1, setContentOp1] = useState('');
  const [contentOp2, setContentOp2] = useState('');
  const [contentTech1, setContentTech1] = useState('');
  const [contentTech2, setContentTech2] = useState('');
  const [contentMang1, setContentMang1] = useState('');
  const [contentMang2, setContentMang2] = useState('');
  const [contentFin, setContentFin] = useState('');
  const [contentGrowth, setContentGrowth] = useState('');
  const [contentRisk, setContentRisk] = useState('');

  const [userInput, setUserInput] = useState(null);
  const [planIdNum, setPlanIdNum] = useState(null);

  const [updateContentStatesWord, setUpdateContentStatesWord] = useState(false);
  const [updateContentStatesPDF, setUpdateContentStatesPDF] = useState(false);
  const [showSaveButtons, setShowSaveButtons] = useState(false);

  const [updateUserData, setUpdateUserData] = useState(false);

  const [showTopContent, setShowTopContent] = useState(true);
  const [isSecondSurvey, setIsSecondSurvey] = useState(false);
  const [showTrustpilotModal, setShowTrustpilotModal] = useState(false);
  const [trustpilotInvitationLink, setTrustpilotInvitationLink] = useState('');

  //setShowSaveButtons(true) after 3 seconds after mount
  useEffect(() => {
    setTimeout(() => {
      setShowSaveButtons(true);
    }, 3000);
  }, []);

  useEffect(() => {
    let interval = null;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      console.log('fetchUserData triggered');
      setLoading(true);
      const res = await fetch('/api/getAllUserData', {
        headers: {
          [API_KEY_HEADER]: secretKey,
        },
      });
      const data = await res.json();

      if (data) {
        console.log('data found, setting userData');
        setLoading(false);
        setuserData(data);
      } else {
        setIsError(true);
      }

      if (data.paymentStatus === 'paid' && data.paymentId) {
        setPaid(true);
        clearInterval(interval); // Clear the interval when paymentStatus is "paid"
      }

      counter++; // Increment the counter

      if (counter >= 5) {
        clearInterval(interval);
        setPaymentError(true);
      }
    }

    fetchUserData(); // Fetch data initially

    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateUserData]);

  useEffect(() => {
    console.log('useEffect triggered');
    if (userData && planId) {
      console.log('userData and planId found');
      const currentPlanIdNum = Number(planId);
      setPlanIdNum(currentPlanIdNum);
    }
  }, [userData, planId]);

  useEffect(() => {
    if (userData && planId) {
      if (userData.plans[planIdNum]) {
        setUserEmail(userData.email);

        setUserInput(userData.plans[planIdNum].originalVer.userInput);
        const planContentOriginal =
          userData.plans[planIdNum].originalVer.planContent;

        setOriginalExecFromDB(
          updateHeadingTags(planContentOriginal.generatedExecPro),
        );
        setOriginalSitu1FromDB(
          updateHeadingTags(planContentOriginal.generatedSitu1IndKeyPro),
        );
        setOriginalSitu2FromDB(
          updateHeadingTags(planContentOriginal.generatedSitu2SWOTPro),
        );
        setOriginalMark1FromDB(
          updateHeadingTags(planContentOriginal.generatedMark1ObjPro),
        );
        setOriginalMark2FromDB(
          updateHeadingTags(planContentOriginal.generatedMark2STPPro),
        );
        setOriginalMark3FromDB(
          updateHeadingTags(planContentOriginal.generatedMark3DecisionPro),
        );
        setOriginalMark4FromDB(
          updateHeadingTags(planContentOriginal.generatedMark4ProductPro),
        );
        setOriginalMark5FromDB(
          updateHeadingTags(planContentOriginal.generatedMark5PriceDistPro),
        );
        setOriginalMark6FromDB(
          updateHeadingTags(planContentOriginal.generatedMark6AdPro),
        );
        setOriginalOp1FromDB(
          updateHeadingTags(planContentOriginal.generatedOp1ActKPIsPro),
        );
        setOriginalOp2FromDB(
          updateHeadingTags(planContentOriginal.generatedOp2QCImpPlanPro),
        );
        setOriginalTech1FromDB(
          updateHeadingTags(planContentOriginal.generatedTech1AllPro),
        );
        setOriginalTech2FromDB(
          updateHeadingTags(planContentOriginal.generatedTech2DigiPro),
        );
        setOriginalMang1FromDB(
          updateHeadingTags(planContentOriginal.generatedMang1StrucRolePro),
        );
        setOriginalMang2FromDB(
          updateHeadingTags(planContentOriginal.generatedMang2RecTrainCSRPro),
        );
        setOriginalGrowthFromDB(
          updateHeadingTags(planContentOriginal.generatedGrowthPro),
        );
        setOriginalRiskFromDB(
          updateHeadingTags(planContentOriginal.generatedRiskPro),
        );

        const userInput = userData.plans[planIdNum].originalVer.userInput;

        setInitialInvestmentAmount(userInput.initialInvestmentAmount);
        setInvestmentItem1(userInput.investmentItem1);
        setInvestmentAmountItem1(userInput.investmentAmountItem1);
        setInvestmentItem2(userInput.investmentItem2);
        setInvestmentAmountItem2(userInput.investmentAmountItem2);
        setInvestmentItem3(userInput.investmentItem3);
        setInvestmentAmountItem3(userInput.investmentAmountItem3);
        setInvestmentItem4(userInput.investmentItem4);
        setInvestmentAmountItem4(userInput.investmentAmountItem4);
        setInvestmentItem5(userInput.investmentItem5);
        setInvestmentAmountItem5(userInput.investmentAmountItem5);
        setInvestmentItem6(userInput.investmentItem6);
        setInvestmentAmountItem6(userInput.investmentAmountItem6);
        setInvestmentItem7(userInput.investmentItem7);
        setInvestmentAmountItem7(userInput.investmentAmountItem7);
        setInvestmentItem8(userInput.investmentItem8);
        setInvestmentAmountItem8(userInput.investmentAmountItem8);
        setInvestmentItem9(userInput.investmentItem9);
        setInvestmentAmountItem9(userInput.investmentAmountItem9);
        setInvestmentItem10(userInput.investmentItem10);
        setInvestmentAmountItem10(userInput.investmentAmountItem10);

        if (
          userData.plans[planIdNum].editedVer &&
          userData.plans[planIdNum].editedVer.userInputFinance
        ) {
          const userInputFinance =
            userData.plans[planIdNum].editedVer.userInputFinance;

          setFirstYearRevenue(userInputFinance.firstYearRevenue);
          setRevenueGrowthRate(userInputFinance.revenueGrowthRate);

          setCOGSP(userInputFinance.COGSP);
          setWageCostP(userInputFinance.wageCostP);
          setMarkCostP(userInputFinance.markCostP);
          setRentCostP(userInputFinance.rentCostP);
          setGenCostP(userInputFinance.genCostP);
          setDepreCostP(userInputFinance.depreCostP);
          setUtilCostP(userInputFinance.utilCostP);
          setOtherCostP(userInputFinance.otherCostP);
          setIntCostP(userInputFinance.intCostP);
          setTaxCostP(userInputFinance.taxCostP);
        } else {
          setFirstYearRevenue(userInput.firstYearRevenue);
          setRevenueGrowthRate(userInput.revenueGrowthRate);

          setCOGSP(userInput.COGSP);
          setWageCostP(userInput.wageCostP);
          setMarkCostP(userInput.markCostP);
          setRentCostP(userInput.rentCostP);
          setGenCostP(userInput.genCostP);
          setDepreCostP(userInput.depreCostP);
          setUtilCostP(userInput.utilCostP);
          setOtherCostP(userInput.otherCostP);
          setIntCostP(userInput.intCostP);
          setTaxCostP(userInput.taxCostP);
        }

        if (userData.plans[planIdNum].editedVer) {
          console.log('userData.plans[planIdNum].editedVer found');
          if (
            userData.plans[planIdNum].editedVer.planContent.generatedExecPro ||
            userData.plans[planIdNum].editedVer.planContent
              .generatedSitu1IndKeyPro ||
            userData.plans[planIdNum].editedVer.planContent
              .generatedMark1ObjPro ||
            userData.plans[planIdNum].editedVer.planContent
              .generatedOp1ActKPIsPro ||
            userData.plans[planIdNum].editedVer.planContent
              .generatedMang1StrucRolePro ||
            userData.plans[planIdNum].editedVer.planContent.generatedFinPro ||
            userData.plans[planIdNum].editedVer.planContent.generatedRiskPro
          ) {
            console.log('found content in editedVer.planContent');
            const planContentEdited =
              userData.plans[planIdNum].editedVer.planContent;

            setExec(planContentEdited.generatedExecPro);
            setSitu1(planContentEdited.generatedSitu1IndKeyPro);
            setSitu2(planContentEdited.generatedSitu2SWOTPro);
            setMark1(planContentEdited.generatedMark1ObjPro);
            setMark2(planContentEdited.generatedMark2STPPro);
            setMark3(planContentEdited.generatedMark3DecisionPro);
            setMark4(planContentEdited.generatedMark4ProductPro);
            setMark5(planContentEdited.generatedMark5PriceDistPro);
            setMark6(planContentEdited.generatedMark6AdPro);
            setOp1(planContentEdited.generatedOp1ActKPIsPro);
            setOp2(planContentEdited.generatedOp2QCImpPlanPro);
            setTech1(planContentEdited.generatedTech1AllPro);
            setTech2(planContentEdited.generatedTech2DigiPro);
            setMang1(planContentEdited.generatedMang1StrucRolePro);
            setMang2(planContentEdited.generatedMang2RecTrainCSRPro);
            setGrowth(planContentEdited.generatedGrowthPro);
            setRisk(planContentEdited.generatedRiskPro);

            if (
              userData.plans[planIdNum].editedVer.planContent.generatedFinPro
            ) {
              setFin(
                userData.plans[planIdNum].editedVer.planContent.generatedFinPro,
              );
            }
          }
        } else if (
          userData.plans[planIdNum].originalVer.planContent.generatedExecPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedSitu1IndKeyPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedSitu2SWOTPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedMark1ObjPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedMark2STPPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedMark3DecisionPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedMark4ProductPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedOp1ActKPIsPro ||
          userData.plans[planIdNum].originalVer.planContent
            .generatedMang1StrucRolePro ||
          (userData.plans[planIdNum].originalVer.planContent.generatedRiskPro &&
            userData.plans[planIdNum].originalVer.userInput.businessName &&
            userData.plans[planIdNum].originalVer.userInput.businessType &&
            userData.plans[planIdNum].originalVer.userInput.firstYearRevenue &&
            userData.plans[planIdNum].originalVer.userInput.revenueGrowthRate)
        ) {
          console.log("userData.plans[planIdNum].editedVer doesn't exist");
          console.log('found content in originalVer');
          const planContent = userData.plans[planIdNum].originalVer.planContent;

          setExec(updateHeadingTags(planContent.generatedExecPro));
          setSitu1(updateHeadingTags(planContent.generatedSitu1IndKeyPro));
          setSitu2(updateHeadingTags(planContent.generatedSitu2SWOTPro));
          setMark1(updateHeadingTags(planContent.generatedMark1ObjPro));
          setMark2(updateHeadingTags(planContent.generatedMark2STPPro));
          setMark3(updateHeadingTags(planContent.generatedMark3DecisionPro));
          setMark4(updateHeadingTags(planContent.generatedMark4ProductPro));
          setMark5(updateHeadingTags(planContent.generatedMark5PriceDistPro));
          setMark6(updateHeadingTags(planContent.generatedMark6AdPro));
          setOp1(updateHeadingTags(planContent.generatedOp1ActKPIsPro));
          setOp2(updateHeadingTags(planContent.generatedOp2QCImpPlanPro));
          setTech1(updateHeadingTags(planContent.generatedTech1AllPro));
          setTech2(updateHeadingTags(planContent.generatedTech2DigiPro));
          setMang1(updateHeadingTags(planContent.generatedMang1StrucRolePro));
          setMang2(updateHeadingTags(planContent.generatedMang2RecTrainCSRPro));
          setGrowth(updateHeadingTags(planContent.generatedGrowthPro));
          setRisk(updateHeadingTags(planContent.generatedRiskPro));
        }
      }
    } else {
      console.log("userData.plans[planIdNum] doesn't exist");
    }
  }, [userData, planIdNum]);

  const finTableHtml =
    userData &&
    ReactDOMServer.renderToString(
      FinTable({
        investmentItem1: investmentItem1,
        investmentAmountItem1: investmentAmountItem1,

        investmentItem2: investmentItem2,
        investmentAmountItem2: investmentAmountItem2,

        investmentItem3: investmentItem3,
        investmentAmountItem3: investmentAmountItem3,

        investmentItem4: investmentItem4,
        investmentAmountItem4: investmentAmountItem4,

        investmentItem5: investmentItem5,
        investmentAmountItem5: investmentAmountItem5,

        investmentItem6: investmentItem6,
        investmentAmountItem6: investmentAmountItem6,

        investmentItem7: investmentItem7,
        investmentAmountItem7: investmentAmountItem7,

        investmentItem8: investmentItem8,
        investmentAmountItem8: investmentAmountItem8,

        investmentItem9: investmentItem9,
        investmentAmountItem9: investmentAmountItem9,

        investmentItem10: investmentItem10,
        investmentAmountItem10: investmentAmountItem10,

        initialInvestmentAmount: initialInvestmentAmount,
        firstYearRevenue: firstYearRevenue,
        revenueGrowthRate: revenueGrowthRate,

        COGSP: COGSP,
        wageCostP: wageCostP,
        markCostP: markCostP,
        rentCostP: rentCostP,
        genCostP: genCostP,
        depreCostP: depreCostP,
        utilCostP: utilCostP,
        otherCostP: otherCostP,
        intCostP: intCostP,
        taxCostP: taxCostP,

        planLanguage:
          userInput && userInput.planLanguage ? userInput.planLanguage : 'en',
        planCurrency:
          userInput && userInput.planCurrency ? userInput.planCurrency : '',
        planCurrencySymbol:
          userInput && userInput.planCurrencySymbol
            ? userInput.planCurrencySymbol
            : '',
      }),
    );

  function updateHeadingTags(htmlContent) {
    return htmlContent
      .replace(/<(\/?)h3>/g, '<$1h1>')
      .replace(/<(\/?)h4>/g, '<$1h2>')
      .replace(/<(\/?)h5>/g, '<$1h3>')
      .replace(/<(\/?)h6>/g, '<$1h4>');
  }

  function updateHeadingTagsFin(htmlContent) {
    return htmlContent
      .replace(/<(\/?)h4>/g, '<$1h1>')
      .replace(/<(\/?)h5>/g, '<$1h2>')
      .replace(/<(\/?)h6>/g, '<$1h3>');
  }

  async function saveAsWord() {
    // Set setSaveAsWordLoading to true for 10 seconds then set it to false
    setSaveAsWordLoading(true);
    setTimeout(() => {
      setSaveAsWordLoading(false);
    }, 10000);

    const updatedHeadingContentFin = updateHeadingTagsFin(contentFin);

    const htmlContent = `
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
    <body style="${userInput && userInput.planLanguage === 'ar' ? 'text-align: right;' : ''}">
      ${contentExec}
      ${contentSitu1}
      ${contentSitu2}
      ${contentMark1}
      ${contentMark2}
      ${contentMark3}
      ${contentMark4}
      ${contentMark5}
      ${contentMark6}
      ${contentOp1}
      ${contentOp2}
      ${contentTech1}
      ${contentTech2}
      ${contentMang1}
      ${contentMang2}
      ${contentGrowth}
      ${updatedHeadingContentFin}
      ${contentRisk}
    </body>
  </html>
`;

    const newHeadingHtmlContent = htmlContent;

    try {
      const response = await fetch('/api/convertToDocx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({ htmlContent: newHeadingHtmlContent }),
      });

      if (response.ok) {
        const { base64data, filename } = await response.json();
        const arrayBuffer = new Uint8Array(Buffer.from(base64data, 'base64'));
        const outputFileBlob = new Blob([arrayBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(outputFileBlob, filename);
      } else {
        console.error(
          'Error converting document:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error converting document:', error);
    }
  }

  async function saveAsPDF() {
    // Set setSaveAsWordLoading to true for 10 seconds then set it to false
    setSaveAsWordLoading(true);
    setTimeout(() => {
      setSaveAsWordLoading(false);
    }, 10000);

    const updatedHeadingContentFin = updateHeadingTagsFin(contentFin);

    const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="font-size: 20px; ${userInput.planLanguage === 'ar' ? 'text-align: right;' : ''}">
      ${contentExec}
      ${contentSitu1}
      ${contentSitu2}
      ${contentMark1}
      ${contentMark2}
      ${contentMark3}
      ${contentMark4}
      ${contentMark5}
      ${contentMark6}
      ${contentOp1}
      ${contentOp2}
      ${contentTech1}
      ${contentTech2}
      ${contentMang1}
      ${contentMang2}
      ${contentGrowth}
      ${updatedHeadingContentFin}
      ${contentRisk}
      </body>
    </html>
  `;

    const newHeadingHtmlContent = htmlContent;

    try {
      const response = await fetch('/api/convertToPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({ htmlContent: newHeadingHtmlContent }),
      });

      if (response.ok) {
        const { base64data, filename } = await response.json();
        const arrayBuffer = new Uint8Array(Buffer.from(base64data, 'base64'));
        const outputFileBlob = new Blob([arrayBuffer], {
          type: 'application/pdf',
        });

        saveAs(outputFileBlob, filename);
      } else {
        console.error(
          'Error converting document:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error converting document:', error);
    }
  }

  // async function downloadHTML() {
  //   fetch('/api/downloadHTML', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ childStates: childStates }),
  //   })
  //     .then(response => response.blob())
  //     .then(blob => {
  //       // Create a new object URL for the blob
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'myFile.html';
  //       document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  //       a.click();
  //       a.remove();  //afterwards we remove the element again
  //     });
  // }

  useEffect(() => {
    const surveyResult = userData?.surveyResult;
    const surveyResult2 = userData?.surveyResult2;
    const createdAt = surveyResult?.createdAt;
    if (surveyResult && !surveyResult2) {
      if (!createdAt) {
        setShowSurvey(true);
      } else if (dayjs(createdAt).isValid() && is45MinutesPassed(createdAt)) {
        setShowSurvey(true);
        setIsSecondSurvey(true);
      } else {
        const interval = setInterval(
          () => {
            if (is45MinutesPassed(createdAt)) {
              setShowSurvey(true);
              setIsSecondSurvey(true);
              // 45 minutes have passed since startDate
              clearInterval(interval); // Stop the interval
            }
          },
          5 * 60 * 1000,
        ); // Check every 5 minutes

        return () => clearInterval(interval); // Cleanup on component unmount
      }
    }
  }, [userData]);

  const getInvitationLink = async (email) => {
    try {
      const res = await fetch('/api/trustpilot/getInvitationLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({ email }),
      });
      const data: ITrustpilotInvitationLinksResponse = await res.json();

      if (data && data.url) {
        setUpdateUserData((prevState) => !prevState);
        setTrustpilotInvitationLink(data.url);
        setShowTrustpilotModal(true);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    if (userData && (updateContentStatesWord || updateContentStatesPDF)) {
      if (!showSurvey && (userData.surveyResult || userData.surveyResult2)) {
        if (updateContentStatesWord) {
          saveAsWord();
        } else if (updateContentStatesPDF) {
          saveAsPDF();
        }
        if (
          userData.surveyResult.RecScore === 10 &&
          !userData.trustpilotInvitationId
        ) {
          getInvitationLink(userData.email);
        }
        // Reset state after saving
        setUpdateContentStatesWord(false);
        setUpdateContentStatesPDF(false);
      }
    }
  }, [showSurvey, updateContentStatesWord, updateContentStatesPDF, userData]);

  const duplicatePlan = async () => {
    const planIdIndex = parseFloat(planId[0]);
    const planDuplicate = userData.plans[planIdIndex];
    transformDataToLocalStorage(
      planDuplicate.originalVer.userInput,
      planIdIndex,
    );
    router.push(ROUTE_PATH.objective);
  };

  function showSurveyWordfunc() {
    console.log('showSurveyWordfunc called');
    trackEvent({
      event_name: 'save_as_word_button',
    });
    setUpdateContentStatesWord(true);
    if (userData) {
      if (!userData.surveyResult) {
        setShowSurvey(true);
      }
      if (!userData.surveyResult2 && userData.surveyResult) {
        setShowSurvey(true);
        setIsSecondSurvey(true);
      }
    }
  }

  function showSurveyPDFfunc() {
    console.log('showSurveyPDFfunc called');
    setUpdateContentStatesPDF(true);
  }

  // after saveAsWordLoading is set to true, set showDownload to true after 11 seconds
  useEffect(() => {
    if (saveAsWordLoading) {
      setTimeout(() => {
        setShowDownload(true);
      }, 11000);
    }
  }, [saveAsWordLoading]);

  useEffect(() => {
    if (saveAsWordLoading) {
      event('save_as_word_clicked', {
        category: 'Button Clicked',
        label: 'Saved as Word button clicked',
      });
    }
  }, [saveAsWordLoading]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      setShowAfterDelay(true);
    }
  }, [timer]);

  //set language
  const [country, setCountry] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('country') || '' : '',
  );

  const handleRedirectToTrustpilot = () => {
    window.open(trustpilotInvitationLink, '_blank');
    setShowTrustpilotModal(false);
  };

  useLocale(country);

  return (
    <>
      <Pixel id={fbPixelId} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* other head elements */}
      </Head>
      <main>
        <div className="overflow">
          {showTrustpilotModal && trustpilotInvitationLink && (
            <TrustpilotModal onClick={handleRedirectToTrustpilot} />
          )}
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
                <a
                  href="/userHomepage"
                  aria-current="page"
                  className="nav-button-transparent"
                  onClick={() => {
                    trackEvent({
                      event_name: 'my_plan_button',
                    });
                  }}
                >
                  {t('My Plans')}
                </a>
              </div>
            </div>
            <div className="navbar-bg"></div>
          </div>

          <div className="section-full wf-section">
            <div className="get-started">
              <div className="form-bg">
                {paid ? (
                  <div className="form-block-started w-form">
                    {showTopContent && (
                      <>
                        <div className="flex items-center justify-center flex-col mt-10">
                          {isError && (
                            <div
                              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                              role="alert"
                            >
                              <strong className="font-bold text-red-700">
                                {t('Failed to load business plan ')}
                              </strong>
                              <span className="block sm:inline">
                                {t('Please try again')}
                              </span>
                              <br />
                              <span>
                                {t('Or contact us at help@15minuteplan.ai')}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-5 justify-center items-center mb-10">
                          <div className="flex gap-3">
                            <div className="flex flex-col justify-center items-center gap-5">
                              <div className="relative flex flex-col justify-center items-center text-center">
                                <h2>{t('Talk To Plan, Edit, and Save')}</h2>
                                <div className="flex justify-center flex-col gap-4">
                                  <div className="flex justify-center gap-4">
                                    {saveAsWordLoading && (
                                      <MoonLoader size={20} />
                                    )}
                                    {showSaveButtons ? (
                                      <>
                                        <button
                                          className="button"
                                          onClick={showSurveyWordfunc}
                                        >
                                          {t('Save As Word')}
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          className="button opacity-30"
                                          disabled
                                        >
                                          {t('Save As Word')}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                  <button
                                    className="transparent-button w-button disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                    disabled={userData.planQuota === 0}
                                    onClick={() => setIsWarningModalOpen(true)}
                                  >
                                    {t('copyFeatureButton')}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {session && showSurvey && (
                              <Survey
                                showSurvey={showSurvey}
                                setShowSurvey={setShowSurvey}
                                isSecondSurvey={isSecondSurvey}
                                session={session}
                                setSurveyDone={setSurveyDone}
                                setUpdateUserData={setUpdateUserData}
                                secretKey={secretKey}
                              />
                            )}
                            {isWarningModalOpen && (
                              <Modal
                                onClose={() => setIsWarningModalOpen(false)}
                                onOK={duplicatePlan}
                              >
                                {t('warningCopyPlanMessage', {
                                  planQuota: userData.planQuota,
                                })}
                              </Modal>
                            )}
                          </div>
                        </div>
                        {showDownload && (
                          <div className="flex justify-center items-center">
                            <div>
                              <strong>{t('Downloaded!')}</strong>{' '}
                              {t("Check your browser's Downloads section")}
                            </div>
                          </div>
                        )}
                        <hr />
                        <div className="mt-2">
                          <strong>{t('Instructions:')}</strong>{' '}
                          {t(
                            'Our TalkToPlan feature allows you to edit your business plan with ease. Try it out before downloading and editing the plan yourself. when you scroll down you\'ll see large text boxes you can edit the content manually there or just underneath the large text boxes you\'ll see a question "What would you like to change about ... topic?" you can input whatever you want to change about the content and AI will take care of the rest.',
                          )}
                        </div>
                        <div>
                          {t(
                            'For example, try scrolling down, when you see the question "What would you like to change about this',
                          )}{' '}
                          <strong>{t('Executive Summary')}</strong>{' '}
                          {t('above" try to input')}{' '}
                          <strong>"{t('make shorter')}"</strong>.
                        </div>
                        <br />
                        <div className="text-sm">
                          <div className="mt-2">
                            {t(
                              'Note 1: Your edits will be automatically saved to our system which you can later access in "My Plans"',
                            )}
                          </div>
                          <div className="mt-2">
                            {t(
                              'Note 2: If you find the content to be fundamentally wrong you can create a new plan and change the inputs you want to change and keep other inputs the same',
                            )}
                          </div>
                          <div className="mt-2">
                            {t(
                              'Note 3: Talk To Plan is in testing phase so if you experience any problems please contact',
                            )}{' '}
                            <strong>help@15minuteplan.ai</strong>
                          </div>
                        </div>
                      </>
                    )}

                    <EditorPro
                      planIdNum={planIdNum}
                      Exec={Exec}
                      Situ1={Situ1}
                      Situ2={Situ2}
                      Mark1={Mark1}
                      Mark2={Mark2}
                      Mark3={Mark3}
                      Mark4={Mark4}
                      Mark5={Mark5}
                      Mark6={Mark6}
                      Op1={Op1}
                      Op2={Op2}
                      Tech1={Tech1}
                      Tech2={Tech2}
                      Mang1={Mang1}
                      Mang2={Mang2}
                      Growth={Growth}
                      Fin={Fin}
                      Risk={Risk}
                      originalExecFromDB={originalExecFromDB}
                      originalSitu1FromDB={originalSitu1FromDB}
                      originalSitu2FromDB={originalSitu2FromDB}
                      originalMark1FromDB={originalMark1FromDB}
                      originalMark2FromDB={originalMark2FromDB}
                      originalMark3FromDB={originalMark3FromDB}
                      originalMark4FromDB={originalMark4FromDB}
                      originalMark5FromDB={originalMark5FromDB}
                      originalMark6FromDB={originalMark6FromDB}
                      originalOp1FromDB={originalOp1FromDB}
                      originalOp2FromDB={originalOp2FromDB}
                      originalTech1FromDB={originalTech1FromDB}
                      originalTech2FromDB={originalTech2FromDB}
                      originalMang1FromDB={originalMang1FromDB}
                      originalMang2FromDB={originalMang2FromDB}
                      originalGrowthFromDB={originalGrowthFromDB}
                      originalRiskFromDB={originalRiskFromDB}
                      initialInvestmentAmount={initialInvestmentAmount}
                      investmentItem1={investmentItem1}
                      investmentAmountItem1={investmentAmountItem1}
                      investmentItem2={investmentItem2}
                      investmentAmountItem2={investmentAmountItem2}
                      investmentItem3={investmentItem3}
                      investmentAmountItem3={investmentAmountItem3}
                      investmentItem4={investmentItem4}
                      investmentAmountItem4={investmentAmountItem4}
                      investmentItem5={investmentItem5}
                      investmentAmountItem5={investmentAmountItem5}
                      investmentItem6={investmentItem6}
                      investmentAmountItem6={investmentAmountItem6}
                      investmentItem7={investmentItem7}
                      investmentAmountItem7={investmentAmountItem7}
                      investmentItem8={investmentItem8}
                      investmentAmountItem8={investmentAmountItem8}
                      investmentItem9={investmentItem9}
                      investmentAmountItem9={investmentAmountItem9}
                      investmentItem10={investmentItem10}
                      investmentAmountItem10={investmentAmountItem10}
                      firstYearRevenue={firstYearRevenue}
                      revenueGrowthRate={revenueGrowthRate}
                      COGSP={COGSP}
                      wageCostP={wageCostP}
                      markCostP={markCostP}
                      rentCostP={rentCostP}
                      genCostP={genCostP}
                      depreCostP={depreCostP}
                      utilCostP={utilCostP}
                      otherCostP={otherCostP}
                      intCostP={intCostP}
                      taxCostP={taxCostP}
                      userInput={userInput}
                      userEmail={userEmail}
                      showSurvey={showSurvey}
                      // surveyAlreadyDoneWord={surveyAlreadyDoneWord}
                      // surveyAlreadyDonePDF={surveyAlreadyDonePDF}
                      updateContentStatesWord={updateContentStatesWord}
                      updateContentStatesPDF={updateContentStatesPDF}
                      setCOGSP={setCOGSP}
                      setWageCostP={setWageCostP}
                      setMarkCostP={setMarkCostP}
                      setRentCostP={setRentCostP}
                      setGenCostP={setGenCostP}
                      setDepreCostP={setDepreCostP}
                      setUtilCostP={setUtilCostP}
                      setOtherCostP={setOtherCostP}
                      setIntCostP={setIntCostP}
                      setTaxCostP={setTaxCostP}
                      setFirstYearRevenue={setFirstYearRevenue}
                      setRevenueGrowthRate={setRevenueGrowthRate}
                      setShowTopContent={setShowTopContent}
                      setContentExec={setContentExec}
                      setContentSitu1={setContentSitu1}
                      setContentSitu2={setContentSitu2}
                      setContentMark1={setContentMark1}
                      setContentMark2={setContentMark2}
                      setContentMark3={setContentMark3}
                      setContentMark4={setContentMark4}
                      setContentMark5={setContentMark5}
                      setContentMark6={setContentMark6}
                      setContentOp1={setContentOp1}
                      setContentOp2={setContentOp2}
                      setContentTech1={setContentTech1}
                      setContentTech2={setContentTech2}
                      setContentMang1={setContentMang1}
                      setContentMang2={setContentMang2}
                      setContentGrowth={setContentGrowth}
                      setContentFin={setContentFin}
                      setContentRisk={setContentRisk}
                      contentExec={contentExec}
                      contentSitu1={contentSitu1}
                      contentSitu2={contentSitu2}
                      contentMark1={contentMark1}
                      contentMark2={contentMark2}
                      contentMark3={contentMark3}
                      contentMark4={contentMark4}
                      contentMark5={contentMark5}
                      contentMark6={contentMark6}
                      contentOp1={contentOp1}
                      contentOp2={contentOp2}
                      contentTech1={contentTech1}
                      contentTech2={contentTech2}
                      contentMang1={contentMang1}
                      contentMang2={contentMang2}
                      contentGrowth={contentGrowth}
                      contentFin={contentFin}
                      contentRisk={contentRisk}
                      secretKey={secretKey}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center">
                    {paymentError ? (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                        role="alert"
                      >
                        {t('There was a problem with your payment')}
                      </div>
                    ) : (
                      <span>{t('Verifying Payment...')}</span>
                    )}
                    <br />
                    <span>
                      {t(
                        'If you have paid but are unable to view the plan please contact us at help@15minuteplan.ai',
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'editPlanPro',
        'EditorPro',
        'Survey',
        'validate',
        'EditFinance',
        'common',
        'index',
      ])),
      secretKey,
      fbPixelId,
      // Will be passed to the page component as props
    },
  };
}
