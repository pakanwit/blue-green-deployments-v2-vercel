import { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/react';
import { MoonLoader } from 'react-spinners';
import Confetti from 'react-confetti';
import { event } from 'nextjs-google-analytics';
import DOMPurify from 'dompurify';
import FinTable from '../components/FinTable';
import stylesW from '../styles/Wizard.module.css';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import us2gb from '../utils/us2gb';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import trackEvent from '../utils/trackEvent';
import Pixel from '../components/Pixel';
import { ROUTE_PATH } from '../constants/path';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import XPixel from '../components/XPixel';
import useCookies from '../hooks/useCookies';

declare let gtag: (...args: any[]) => void;

export default function fullPlanStarter({
  userData,
  secretKey,
  fbPixelId,
  xPixelId,
  conversionDestinationId,
}) {
  const { t } = useTranslation('fullPlanStarter');
  
  const { getCookie } = useCookies();
  const variantID = getCookie("variantID")

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // done checkers-----------------------------------------------
  const [doneExec, setDoneExec] = useState(false);
  const [doneSitu1, setDoneSitu1] = useState(false);
  const [doneSitu2, setDoneSitu2] = useState(false);
  const [doneMark1, setDoneMark1] = useState(false);
  const [doneMark2, setDoneMark2] = useState(false);
  const [doneMark3, setDoneMark3] = useState(false);
  const [doneMark4, setDoneMark4] = useState(false);
  const [doneOp1, setDoneOp1] = useState(false);
  const [doneMang1, setDoneMang1] = useState(false);
  const [doneRisk1, setDoneRisk1] = useState(false);
  const [allDoneGenerating, setAllDoneGenerating] = useState(false);
  // for collecting data -----------------------------------------------
  const [businessOperationalStatus, setBusinessOperationalStatus] =
    useState('');
  const [businessPlanObj, setBusinessPlanObj] = useState('');

  //basic info-----------------------------------------------------------
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [NEmployee, setNEmployee] = useState(0);
  const [location, setLocation] = useState('');
  const [productOrService, setProductOrService] = useState('');
  const [salesChannel, setSalesChannel] = useState('');

  //customer info-------------------------------------------------------
  const [customerIncome1, setCustomerIncome1] = useState('');
  const [customerDescription1, setCustomerDescription1] = useState('');

  const [customerIncome2, setCustomerIncome2] = useState('');
  const [customerDescription2, setCustomerDescription2] = useState('');

  const [customerIncome3, setCustomerIncome3] = useState('');
  const [customerDescription3, setCustomerDescription3] = useState('');

  //product --------------------------------------------------------
  const [productName1, setProductName1] = useState('');
  const [productDescription1, setProductDescription1] = useState('');
  const [productName2, setProductName2] = useState('');
  const [productDescription2, setProductDescription2] = useState('');
  const [productName3, setProductName3] = useState('');
  const [productDescription3, setProductDescription3] = useState('');
  const [productName4, setProductName4] = useState('');
  const [productDescription4, setProductDescription4] = useState('');
  const [productName5, setProductName5] = useState('');
  const [productDescription5, setProductDescription5] = useState('');

  const [runGeneratePrompt, setRunGeneratePrompt] = useState(false);
  const [productInfoPrompt, setProductInfoPrompt] = useState('');

  // success factors and weakness--------------------------------------
  // ***********one has s one doesn't!!!!!!!*******
  const [successFactors1, setSuccessFactor1] = useState('');
  const [successFactors2, setSuccessFactor2] = useState('');
  const [successFactors3, setSuccessFactor3] = useState('');

  const [weakness1, setWeakness1] = useState('');
  const [weakness2, setWeakness2] = useState('');
  const [weakness3, setWeakness3] = useState('');

  // Initial Investment -------------------------------------------------------
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

  // generated plan states--------------------------------------------
  const [generatedExec, setGeneratedExec] = useState('');

  const [generatedSitu1, setGeneratedSitu1] = useState('');
  const [generatedSitu2, setGeneratedSitu2] = useState('');

  const [generatedMark1, setGeneratedMark1] = useState('');
  const [generatedMark2, setGeneratedMark2] = useState('');
  const [generatedMark3, setGeneratedMark3] = useState('');
  const [generatedMark4, setGeneratedMark4] = useState('');

  const [generatedOp1, setGeneratedOp1] = useState('');
  const [generatedOp2, setGeneratedOp2] = useState('');

  const [generatedMang1, setGeneratedMang1] = useState('');
  const [generatedMang2, setGeneratedMang2] = useState('');

  const [generatedFin1, setGeneratedFin1] = useState('');
  const [generatedRisk1, setGeneratedRisk1] = useState('');

  // cancel stream--------------------------
  const executionIdRefExec = useRef(null);
  const executionIdRefSitu1 = useRef(null);
  const executionIdRefSitu2 = useRef(null);
  const executionIdRefMark1 = useRef(null);
  const executionIdRefMark2 = useRef(null);
  const executionIdRefMark3 = useRef(null);
  const executionIdRefMark4 = useRef(null);
  const executionIdRefOp1 = useRef(null);
  const executionIdRefMang1 = useRef(null);
  const executionIdRefRisk1 = useRef(null);

  // language -------------------------------
  const [planLanguage, setPlanLanguage] = useState('en');

  //currency --------------------------------
  const [planCurrency, setPlanCurrency] = useState('');
  const [planCurrencySymbol, setPlanCurrencySymbol] = useState('');

  // check if there is a session if there is a session send a get request with fetch to getUserData api route to get the user data then check if userData.planQuota is less than 1 if it is less than 1 then render a div which contains a button to redirect to checkout page

  // from old /fullPlan ---------------------------------------

  const [paid, setPaid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [readyToGeneratePlan, setReadyToGeneratePlan] = useState(false);
  const isFinanceIncomplete = userData?.plans[0]?.isFinanceIncomplete;
  const specificProductQuestion1 =
    userData.plans[0].originalVer.userInput?.specificProductQuestion1;
  const specificProductQuestion2 =
    userData.plans[0].originalVer.userInput?.specificProductQuestion2;
  const specificProductQuestion3 =
    userData.plans[0].originalVer.userInput?.specificProductQuestion3;
  const specificProductQuestion4 =
    userData.plans[0].originalVer.userInput?.specificProductQuestion4;
  const specificProductQuestion5 =
    userData.plans[0].originalVer.userInput?.specificProductQuestion5;
  const specificOperationQuestion1 =
    userData.plans[0].originalVer.userInput?.specificOperationQuestion1;
  const specificOperationQuestion2 =
    userData.plans[0].originalVer.userInput?.specificOperationQuestion2;
  const specificOperationQuestion3 =
    userData.plans[0].originalVer.userInput?.specificOperationQuestion3;
  const specificOperationQuestion4 =
    userData.plans[0].originalVer.userInput?.specificOperationQuestion4;
  const specificOperationQuestion5 =
    userData.plans[0].originalVer.userInput?.specificOperationQuestion5;
  const specificProductAnswer1 =
    userData.plans[0].originalVer.userInput?.specificProductAnswer1;
  const specificProductAnswer2 =
    userData.plans[0].originalVer.userInput?.specificProductAnswer2;
  const specificProductAnswer3 =
    userData.plans[0].originalVer.userInput?.specificProductAnswer3;
  const specificProductAnswer4 =
    userData.plans[0].originalVer.userInput?.specificProductAnswer4;
  const specificProductAnswer5 =
    userData.plans[0].originalVer.userInput?.specificProductAnswer5;
  const specificOperationAnswer1 =
    userData.plans[0].originalVer.userInput?.specificOperationAnswer1;
  const specificOperationAnswer2 =
    userData.plans[0].originalVer.userInput?.specificOperationAnswer2;
  const specificOperationAnswer3 =
    userData.plans[0].originalVer.userInput?.specificOperationAnswer3;
  const specificOperationAnswer4 =
    userData.plans[0].originalVer.userInput?.specificOperationAnswer4;
  const specificOperationAnswer5 =
    userData.plans[0].originalVer.userInput?.specificOperationAnswer5;
  const productQuestions = [
    specificProductQuestion1,
    specificProductQuestion2,
    specificProductQuestion3,
    specificProductQuestion4,
    specificProductQuestion5,
  ];
  const productAnswers = [
    specificProductAnswer1,
    specificProductAnswer2,
    specificProductAnswer3,
    specificProductAnswer4,
    specificProductAnswer5,
  ];
  const operationQuestions = [
    specificOperationQuestion1,
    specificOperationQuestion2,
    specificOperationQuestion3,
    specificOperationQuestion4,
    specificOperationQuestion5,
  ];

  const operationAnswers = [
    specificOperationAnswer1,
    specificOperationAnswer2,
    specificOperationAnswer3,
    specificOperationAnswer4,
    specificOperationAnswer5,
  ];
  // this is the main useEffect
  useEffect(() => {
    if (userData && userData.paymentStatus === 'paid' && userData.paymentId)
      setPaid(true);
  }, [session, userData]);

  useEffect(() => {
    if (userData && userData.plans[0].originalVer.userInput) {
      const userInput = userData.plans[0].originalVer.userInput;
      setBusinessOperationalStatus(userInput.businessOperationalStatus);
      setBusinessPlanObj(userInput.businessPlanObj);
      setBusinessName(userInput.businessName);
      setBusinessType(userInput.businessType);
      setNEmployee(userInput.NEmployee);
      setLocation(userInput.location);
      setProductOrService(userInput.productOrService);
      setSalesChannel(userInput.salesChannel);
      setCustomerDescription1(userInput.customerDescription1);
      setCustomerIncome1(userInput.customerIncome1);
      setCustomerDescription2(userInput.customerDescription2);
      setCustomerIncome2(userInput.customerIncome2);
      setCustomerDescription3(userInput.customerDescription3);
      setCustomerIncome3(userInput.customerIncome3);
      setProductName1(userInput.productName1);
      setProductDescription1(userInput.productDescription1);
      setProductName2(userInput.productName2);
      setProductDescription2(userInput.productDescription2);
      setProductName3(userInput.productName3);
      setProductDescription3(userInput.productDescription3);
      setProductName4(userInput.productName4);
      setProductDescription4(userInput.productDescription4);
      setProductName5(userInput.productName5);
      setProductDescription5(userInput.productDescription5);
      setSuccessFactor1(userInput.successFactors1);
      setSuccessFactor2(userInput.successFactors2);
      setSuccessFactor3(userInput.successFactors3);
      setWeakness1(userInput.weakness1);
      setWeakness2(userInput.weakness2);
      setWeakness3(userInput.weakness3);
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

      setPlanLanguage(userInput.planLanguage || 'en');
      setPlanCurrency(userInput.planCurrency || '');
      setPlanCurrencySymbol(userInput.planCurrencySymbol || '');

      if (userData && userData.plans[0].originalVer.planContent) {
        const planContent = userData.plans[0].originalVer.planContent;
        setGeneratedExec(planContent.generatedExecPro);
        setDoneExec(true);
        setGeneratedSitu1(planContent.generatedSitu1IndKeyPro);
        setDoneSitu1(true);
        setGeneratedSitu2(planContent.generatedSitu2SWOTPro);
        setDoneSitu2(true);
        setGeneratedMark1(planContent.generatedMark1ObjPro);
        setDoneMark1(true);
        setGeneratedMark2(planContent.generatedMark2STPPro);
        setDoneMark2(true);
      }

      if (
        userData &&
        userData.plans[0].originalVer.planContent.generatedMark2STPPro
      ) {
        if (
          userInput.planLanguage === 'ja' &&
          userData.plans[0].originalVer.planContent.generatedMark2STPPro
            .length < 400
        ) {
          generateMark2Mark3Mark4();
        } else if (
          userInput.planLanguage === 'ar' &&
          userData.plans[0].originalVer.planContent.generatedMark2STPPro
            .length < 900
        ) {
          generateMark2Mark3Mark4();
        } else if (
          userData.plans[0].originalVer.planContent.generatedMark2STPPro
            .length < 1000
        ) {
          generateMark2Mark3Mark4();
        }
      }

      // for testing /////////////////////////////////////////////////
      // setBusinessOperationalStatus('Upcoming unlaunched business')
      // setBusinessPlanObj('To be used to request fund from investors')
      // setBusinessName("May's Diner")
      // setBusinessType('Diner')
      // setNEmployee(5)
      // setLocation('Denver, Colorado') //where do you serve your customer
      // setProductOrService('service')
      // setSalesChannel('physical location') // what channel you sell ur product on
      // setCustomerDescription1('Families')
      // setCustomerIncome1('Meduim-income')
      // setCustomerDescription2('')
      // setCustomerIncome2('')
      // setCustomerDescription3('')
      // setCustomerIncome3('')
      // setProductName1('lunch')
      // setProductDescription1('')
      // setProductName2('dinner')
      // setProductDescription2('')
      // setProductName3('')
      // setProductDescription3('')
      // setProductName4('')
      // setProductDescription4('')
      // setProductName5('')
      // setProductDescription5('')
      // setSuccessFactor1('good chef')
      // setSuccessFactor2('')
      // setSuccessFactor3('')
      // setWeakness1('')
      // setWeakness2('')
      // setWeakness3('')
      // setInitialInvestmentAmount(0) // add dollar to input
      // setInvestmentItem1('')
      // setInvestmentAmountItem1(0)
      // setInvestmentItem2('')
      // setInvestmentAmountItem2(0)
      // setInvestmentItem3('')
      // setInvestmentAmountItem3(0)
      // setFirstYearRevenue(100000)
      // setRevenueGrowthRate(0.2)
      // setCOGSP(0.4)
      // setWageCostP(0.06)
      // setMarkCostP(0.05)
      // setRentCostP(0)
      // setGenCostP(0.01)
      // setDepreCostP(0.02)
      // setUtilCostP(0.05)
      // setOtherCostP(0.01)
      // setIntCostP(0)
      // setTaxCostP(0.2)
      // for testing /////////////////////////////////////////////////

      setReadyToGeneratePlan(true);
    }
  }, [userData]);

  useEffect(() => {
    console.log('planLauguage: ', planLanguage);
  }, [planLanguage]);

  useEffect(() => {
    if (paid) {
      setShowConfetti(true);
      const confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 4000); // Hide the confetti after 5 seconds

      return () => {
        clearTimeout(confettiTimeout);
      };
    }
  }, [paid]);

  useEffect(() => {
    const userEmail = userData.email;
  }, [userData]);

  // google conversion code-----------------------------------------------
  // old conversion
  // useEffect(() => {
  //   if (paid && userData && (
  //   userData.country !== "DE" ||
  //   userData.country !== "AT" ||
  //   userData.country !== "CH" ||
  //   userData.country !== "LI")) {
  //     const hasFiredEvent = localStorage.getItem('fullPlan_page_view_conversion');

  //     if (!hasFiredEvent) {
  //       event('fullPlan_page_view_conversion', {
  //         category: 'Conversion',
  //         label: 'Paid Full Plan Page View',
  //       });

  //       localStorage.setItem('fullPlan_page_view_conversion', 'true');
  //     }
  //   }
  // }, [paid, userData]);

  // enhanced conversion
  const handleConversion = () => {
    let price;
    if (
      userData.country === 'IN' ||
      userData.country === 'AR' ||
      userData.country === 'CL' ||
      userData.country === 'BR' ||
      userData.country === 'PH' ||
      userData.country === 'MY'
    ) {
      price = 36;
    } else {
      price = 69;
    }

    console.log('gtag', typeof gtag === 'function');
    console.log('conversionDestinationId', conversionDestinationId);

    if (typeof gtag === 'function') {
      console.log('handleConversion running email: ', session.user.email);

      gtag('set', { allow_enhanced_conversions: 'true' });
      gtag('set', 'user_data', {
        email: session.user.email || userData.email,
      });
      gtag('event', 'conversion', {
        send_to: conversionDestinationId,
        value: price,
        currency: 'USD',
      });
    }
  };

  useEffect(() => {
    if (paid && userData && session) {
      const hasFiredEvent = localStorage.getItem(
        `enhanced_starter_fullPlan_page_view_conversion_${session.user.email || userData.email}`,
      );

      if (!hasFiredEvent) {
        handleConversion();
        localStorage.setItem(
          `enhanced_starter_fullPlan_page_view_conversion_${session.user.email || userData.email}`,
          'true',
        );
      }
    }
  }, [paid, userData, session]);
  //end of google conversion code-----------------------------------------------

  //helper functions-------------------------------------------------------
  function generatePrompt(
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
      const productName = arguments[(i - 1) * 2];
      const productDescription = arguments[(i - 1) * 2 + 1];

      if (productName) {
        prompt += `Client's product or service #${i} Name: ${productName}\n`;
      }

      if (productDescription) {
        prompt += `Client's product or service #${i} Description: ${productDescription}\n`;
      }
    }

    return prompt;
  }

  useEffect(() => {
    const prompt = generatePrompt(
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
    setProductInfoPrompt(prompt);
  }, [runGeneratePrompt]);

  async function generateMark1(situ1Ref) {
    setGeneratedMark1('');

    setAllDoneGenerating(false);
    setDoneMark1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark1.current = currentExecutionId;
    const mark1 = await fetch('/api/mainApi/api4Mark1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessOperationalStatus,
        businessName,
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

        situ1Ref,
        productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!mark1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark1Stream = mark1.body;
    if (!mark1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark1 = mark1Stream.getReader();
    const decoderMark1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark1Reading } = await readerMark1.read();
      done = doneMark1Reading;
      const chunkValue = decoderMark1.decode(value);
      if (executionIdRefMark1.current === currentExecutionId) {
        setGeneratedMark1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark1.current === currentExecutionId) {
      setDoneMark1(true);
    }
  }

  async function generateMark3(mark2Ref) {
    setGeneratedMark3('');

    setAllDoneGenerating(false);
    setDoneMark3(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark3.current = currentExecutionId;
    const mark3 = await fetch('/api/mainApi/api6Mark3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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

        mark2Ref,
        productInfoPrompt,
        AITopic: variantID === '2' && {
          product: productQuestions.map((question, index) => ({
            topic: question.topic,
            question: question.value,
            answer: productAnswers[index],
          })),
        },
      }),
    });

    console.log('Edge function returned.');

    if (!mark3.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark3Stream = mark3.body;
    if (!mark3Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark3 = mark3Stream.getReader();
    const decoderMark3 = new TextDecoder();
    let done = false;

    while (!done) {
      //--------------------------------------------------
      const { value, done: doneMark3Reading } = await readerMark3.read();
      done = doneMark3Reading;
      const chunkValue = decoderMark3.decode(value);
      if (executionIdRefMark3.current === currentExecutionId) {
        setGeneratedMark3((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark3.current === currentExecutionId) {
      setDoneMark3(true);
    }
  }

  async function generateMark4(mark2Ref) {
    // PROBLEM HERE
    setGeneratedMark4('');
    console.log('generateMark4 called mark2Ref: ', mark2Ref);

    setAllDoneGenerating(false);
    setDoneMark4(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark4.current = currentExecutionId;
    const mark4 = await fetch('/api/mainApi/api7Mark4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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

        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,
        productOrService,

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

        mark2Ref,
        productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!mark4.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark4Stream = mark4.body;
    if (!mark4Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark4 = mark4Stream.getReader();
    const decoderMark4 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark4Reading } = await readerMark4.read();
      done = doneMark4Reading;
      const chunkValue = decoderMark4.decode(value);
      if (executionIdRefMark4.current === currentExecutionId) {
        setGeneratedMark4((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark4.current === currentExecutionId) {
      setDoneMark4(true);
    }
  }

  //main functions------------------------------------------------------------
  async function generateExec() {
    setGeneratedExec('');

    setAllDoneGenerating(false);
    setDoneExec(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefExec.current = currentExecutionId;

    const exec = await fetch('/api/mainApi/api1Exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

        customerIncome1,
        customerDescription1,

        customerIncome2,
        customerDescription2,

        customerIncome3,
        customerDescription3,

        successFactors1,
        successFactors2,
        successFactors3,

        initialInvestmentAmount,
        investmentItem1,
        investmentItem2,
        investmentItem3,
        firstYearRevenue,
        revenueGrowthRate,

        productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!exec.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const execStream = exec.body;
    if (!execStream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerExec = execStream.getReader();
    const decoderExec = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneExecReading } = await readerExec.read();
      done = doneExecReading;
      const chunkValue = decoderExec.decode(value);
      if (executionIdRefExec.current === currentExecutionId) {
        setGeneratedExec((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefExec.current === currentExecutionId) {
      setDoneExec(true);
    }
  }

  const doneRef1 = useRef(false);
  const generatedSitu1Ref = useRef('');

  async function generateSitu1andMark1() {
    // generate situ1 first
    setGeneratedSitu1('');

    setAllDoneGenerating(false);
    setDoneSitu1(false);
    setDoneMark1(false);
    setLoading(true);

    doneRef1.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu1.current = currentExecutionId;
    const situ1 = await fetch('/api/mainApi/api2Situ1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
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

        productInfoPrompt,
      }),
    });
    console.log('Edge function returned.');

    if (!situ1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const situ1Stream = situ1.body;
    if (!situ1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerSitu1 = situ1Stream.getReader();
    const decoderSitu1 = new TextDecoder();
    // let done = false;

    while (!doneRef1.current) {
      //-------------------------------------------------------
      const { value, done: doneSitu1Reading } = await readerSitu1.read();
      doneRef1.current = doneSitu1Reading;
      const chunkValue = decoderSitu1.decode(value);
      generatedSitu1Ref.current = generatedSitu1Ref.current + chunkValue;
      if (executionIdRefSitu1.current === currentExecutionId) {
        setGeneratedSitu1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu1.current === currentExecutionId) {
      setDoneSitu1(true);
    }

    if (doneRef1.current && generatedSitu1Ref.current) {
      generateMark1(generatedSitu1Ref.current);
    }
  }

  async function generateSitu2() {
    setGeneratedSitu2('');

    setAllDoneGenerating(false);
    setDoneSitu2(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu2.current = currentExecutionId;

    const situ2 = await fetch('/api/mainApi/api3Situ2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
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

        productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!situ2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const situ2Stream = situ2.body;
    if (!situ2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerSitu2 = situ2Stream.getReader();
    const decoderSitu2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneSitu2Reading } = await readerSitu2.read();
      done = doneSitu2Reading;
      const chunkValue = decoderSitu2.decode(value);
      if (executionIdRefSitu2.current === currentExecutionId) {
        setGeneratedSitu2((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu2.current === currentExecutionId) {
      setDoneSitu2(true);
    }
  }

  const doneRef2 = useRef(false);
  const generatedMark2Ref = useRef('');

  async function generateMark2Mark3Mark4() {
    setGeneratedMark2('');

    setAllDoneGenerating(false);
    setDoneMark2(false);
    setDoneMark3(false);
    setDoneMark4(false);

    doneRef2.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark2.current = currentExecutionId;

    const mark2 = await fetch('/api/mainApi/api5Mark2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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

        productInfoPrompt,
      }),
    });
    console.log('Edge function returned.');

    if (!mark2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark2Stream = mark2.body;
    if (!mark2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark2 = mark2Stream.getReader();
    const decoderMark2 = new TextDecoder();
    // let done = false;

    while (!doneRef2.current) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      doneRef2.current = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      generatedMark2Ref.current = generatedMark2Ref.current + chunkValue;
      if (executionIdRefMark2.current === currentExecutionId) {
        setGeneratedMark2((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMark2.current === currentExecutionId) {
      setDoneMark2(true);
    }

    if (doneRef2.current && generatedMark2Ref.current) {
      generateMark3(generatedMark2Ref.current);
      generateMark4(generatedMark2Ref.current);
    }
  }

  async function generateMark2() {
    setGeneratedMark2('');

    setAllDoneGenerating(false);
    setDoneMark2(false);
    setLoading(true);

    doneRef2.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark2.current = currentExecutionId;

    const mark2 = await fetch('/api/mainApi/api5Mark2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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

        productInfoPrompt,
      }),
    });
    console.log('Edge function returned.');

    if (!mark2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark2Stream = mark2.body;
    if (!mark2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark2 = mark2Stream.getReader();
    const decoderMark2 = new TextDecoder();
    // let done = false;

    while (!doneRef2.current) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      doneRef2.current = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      generatedMark2Ref.current = generatedMark2Ref.current + chunkValue;
      if (executionIdRefMark2.current === currentExecutionId) {
        setGeneratedMark2((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMark2.current === currentExecutionId) {
      setDoneMark2(true);
    }
  }

  async function generateOp1() {
    setGeneratedOp1('');

    setAllDoneGenerating(false);
    setDoneOp1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp1.current = currentExecutionId;
    const op1 = await fetch('/api/mainApi/api8Op1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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
        investmentItem4,
        investmentItem5,
        investmentItem6,
        investmentItem7,
        investmentItem8,
        investmentItem9,
        investmentItem10,

        investmentAmountItem1,
        investmentAmountItem2,
        investmentAmountItem3,
        investmentAmountItem4,
        investmentAmountItem5,
        investmentAmountItem6,
        investmentAmountItem7,
        investmentAmountItem8,
        investmentAmountItem9,
        investmentAmountItem10,

        firstYearRevenue,
        revenueGrowthRate,

        productInfoPrompt,
        AITopic: variantID === '2' && {
          operation: operationQuestions.map((question, index) => ({
            topic: question.topic,
            question: question.value,
            answer: operationAnswers[index],
          })),
        },
      }),
    });
    console.log('Edge function returned.');

    if (!op1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const op1Stream = op1.body;
    if (!op1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerOp1 = op1Stream.getReader();
    const decoderOp1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneOp1Reading } = await readerOp1.read();
      done = doneOp1Reading;
      const chunkValue = decoderOp1.decode(value);
      if (executionIdRefOp1.current === currentExecutionId) {
        setGeneratedOp1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp1.current === currentExecutionId) {
      setDoneOp1(true);
    }
  }

  async function generateMang1() {
    setGeneratedMang1('');

    setAllDoneGenerating(false);
    setDoneMang1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang1.current = currentExecutionId;
    const mang1 = await fetch('/api/mainApi/api9Mang1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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

        productInfoPrompt,
      }),
    });
    console.log('Edge function returned.');

    if (!mang1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mang1Stream = mang1.body;
    if (!mang1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMang1 = mang1Stream.getReader();
    const decoderMang1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMang1Reading } = await readerMang1.read();
      done = doneMang1Reading;
      const chunkValue = decoderMang1.decode(value);
      if (executionIdRefMang1.current === currentExecutionId) {
        setGeneratedMang1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang1.current === currentExecutionId) {
      setDoneMang1(true);
    }
  }

  async function generateRisk1() {
    setGeneratedRisk1('');

    setAllDoneGenerating(false);
    setDoneRisk1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefRisk1.current = currentExecutionId;
    const risk1 = await fetch('/api/mainApi/api11Risk1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        businessName,
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
        businessOperationalStatus,
        businessType,
        NEmployee,
        location,
        salesChannel,

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

        productInfoPrompt,
      }),
    });
    console.log('Edge function returned.');

    if (!risk1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const risk1Stream = risk1.body;
    if (!risk1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerRisk1 = risk1Stream.getReader();
    const decoderRisk1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneRisk1Reading } = await readerRisk1.read();
      done = doneRisk1Reading;
      const chunkValue = decoderRisk1.decode(value);
      if (executionIdRefRisk1.current === currentExecutionId) {
        setGeneratedRisk1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefRisk1.current === currentExecutionId) {
      setDoneRisk1(true);
    }
  }

  // if every state with done is true then setAllDoneGenerating to true
  useEffect(() => {
    if (
      doneExec &&
      doneSitu1 &&
      doneSitu2 &&
      doneMark1 &&
      doneMark2 &&
      doneMark3 &&
      doneMark4 &&
      doneOp1 &&
      doneMang1 &&
      doneRisk1
    ) {
      setAllDoneGenerating(true);
      if (planLanguage === 'en-uk') {
        setGeneratedExec(us2gb(generatedExec));
        setGeneratedSitu1(us2gb(generatedSitu1));
        setGeneratedSitu2(us2gb(generatedSitu2));
        setGeneratedMark1(us2gb(generatedMark1));
        setGeneratedMark2(us2gb(generatedMark2));
        setGeneratedMark3(us2gb(generatedMark3));
        setGeneratedMark4(us2gb(generatedMark4));
        setGeneratedOp1(us2gb(generatedOp1));
        setGeneratedOp2(us2gb(generatedOp2));
        setGeneratedMang1(us2gb(generatedMang1));
        setGeneratedMang2(us2gb(generatedMang2));
        setGeneratedFin1(us2gb(generatedFin1));
        setGeneratedRisk1(us2gb(generatedRisk1));
      }
    }
  }, [
    doneExec,
    doneSitu1,
    doneSitu2,
    doneMark1,
    doneMark2,
    doneMark3,
    doneMark4,
    doneOp1,
    doneMang1,
    doneRisk1,
  ]);

  useEffect(() => {
    console.log('allDoneGenerating: ', allDoneGenerating);
  }, [allDoneGenerating]);

  useEffect(() => {
    if (doneExec) console.log('doneExec:, ', doneExec);
    if (doneSitu1) console.log('doneSitu1:, ', doneSitu1);
    if (doneSitu2) console.log('doneSitu2:, ', doneSitu2);
    if (doneMark1) console.log('doneMark1:, ', doneMark1);
    if (doneMark2) console.log('doneMark2:, ', doneMark2);
    if (doneMark3) console.log('doneMark3:, ', doneMark3);
    if (doneMark4) console.log('doneMark4:, ', doneMark4);
    if (doneOp1) console.log('doneOp1:, ', doneOp1);
    if (doneMang1) console.log('doneMang1:, ', doneMang1);
    if (doneRisk1) console.log('doneRisk1:, ', doneRisk1);
  }, [
    doneExec,
    doneSitu1,
    doneSitu2,
    doneMark1,
    doneMark2,
    doneMark3,
    doneMark4,
    doneOp1,
    doneMang1,
    doneRisk1,
  ]);

  const [addNewPlanDone, setAddNewPlanDone] = useState(false);

  async function addNewPlan() {
    const userInput = {
      businessPlanObj,
      businessName,
      planLanguage,
      businessOperationalStatus,
      businessType,
      NEmployee,
      location,
      salesChannel,
      productOrService,
      customerIncome1,
      customerIncome2,
      customerIncome3,
      customerDescription1,
      customerDescription2,
      customerDescription3,
      productName1,
      productName2,
      productName3,
      productName4,
      productName5,
      productDescription1,
      productDescription2,
      productDescription3,
      productDescription4,
      productDescription5,
      successFactors1,
      successFactors2,
      successFactors3,
      weakness1,
      weakness2,
      weakness3,
      investmentItem1,
      investmentAmountItem1,
      investmentItem2,
      investmentAmountItem2,
      investmentItem3,
      investmentAmountItem3,
      investmentItem4,
      investmentAmountItem4,
      investmentItem5,
      investmentAmountItem5,
      investmentItem6,
      investmentAmountItem6,
      investmentItem7,
      investmentAmountItem7,
      investmentItem8,
      investmentAmountItem8,
      investmentItem9,
      investmentAmountItem9,
      investmentItem10,
      investmentAmountItem10,
      initialInvestmentAmount,
      firstYearRevenue,
      revenueGrowthRate,
      COGSP,
      wageCostP,
      markCostP,
      rentCostP,
      genCostP,
      depreCostP,
      utilCostP,
      otherCostP,
      intCostP,
      taxCostP,

      planCurrency,
      planCurrencySymbol,
      specificProductQuestion1: variantID === '2' && {
        value: specificProductQuestion1.value,
        topic: specificProductQuestion1.topic,
      },
      specificProductQuestion2: variantID === '2' && {
        value: specificProductQuestion2.value,
        topic: specificProductQuestion2.topic,
      },
      specificProductQuestion3: variantID === '2' && {
        value: specificProductQuestion3.value,
        topic: specificProductQuestion3.topic,
      },
      specificProductQuestion4: variantID === '2' && {
        value: specificProductQuestion4.value,
        topic: specificProductQuestion4.topic,
      },
      specificProductQuestion5: variantID === '2' && {
        value: specificProductQuestion5.value,
        topic: specificProductQuestion5.topic,
      },
      specificProductAnswer1: variantID === '2' && specificProductAnswer1,
      specificProductAnswer2: variantID === '2' && specificProductAnswer2,
      specificProductAnswer3: variantID === '2' && specificProductAnswer3,
      specificProductAnswer4: variantID === '2' && specificProductAnswer4,
      specificProductAnswer5: variantID === '2' && specificProductAnswer5,
      specificOperationQuestion1: variantID === '2' && {
        value: specificOperationQuestion1.value,
        topic: specificOperationQuestion1.topic,
      },
      specificOperationQuestion2: variantID === '2' && {
        value: specificOperationQuestion2.value,
        topic: specificOperationQuestion2.topic,
      },
      specificOperationQuestion3: variantID === '2' && {
        value: specificOperationQuestion3.value,
        topic: specificOperationQuestion3.topic,
      },
      specificOperationQuestion4: variantID === '2' && {
        value: specificOperationQuestion4.value,
        topic: specificOperationQuestion4.topic,
      },
      specificOperationQuestion5: variantID === '2' && {
        value: specificOperationQuestion5.value,
        topic: specificOperationQuestion5.topic,
      },
      specificOperationAnswer1: variantID === '2' && specificOperationAnswer1,
      specificOperationAnswer2: variantID === '2' && specificOperationAnswer2,
      specificOperationAnswer3: variantID === '2' && specificOperationAnswer3,
      specificOperationAnswer4: variantID === '2' && specificOperationAnswer4,
      specificOperationAnswer5: variantID === '2' && specificOperationAnswer5,
    };

    const planContent = {
      generatedExec: convertMarkdownBoldToHtml(generatedExec),
      generatedSitu1: convertMarkdownBoldToHtml(generatedSitu1),
      generatedSitu2: convertMarkdownBoldToHtml(generatedSitu2),
      generatedMark1: convertMarkdownBoldToHtml(generatedMark1),
      generatedMark2: convertMarkdownBoldToHtml(generatedMark2),
      generatedMark3: convertMarkdownBoldToHtml(generatedMark3),
      generatedMark4: convertMarkdownBoldToHtml(generatedMark4),
      generatedOp1: convertMarkdownBoldToHtml(generatedOp1),
      generatedOp2: convertMarkdownBoldToHtml(generatedOp2),
      generatedMang1: convertMarkdownBoldToHtml(generatedMang1),
      generatedMang2: convertMarkdownBoldToHtml(generatedMang2),
      generatedRisk1: convertMarkdownBoldToHtml(generatedRisk1),
    };

    const newPlan = {
      userInput,
      planContent,
    };

    const dataTosend = {
      email: session.user.email,
      newPlan,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify(dataTosend),
    };

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addPlan`, options)
      .then(async (res) => {
        if (res.status === 403) {
          const data = await res.json();
          console.log(data.message);
        } else if (res.status === 404) {
          const data = await res.json();
          console.log(data.message);
        } else if (res.status === 405) {
          const data = await res.json();
          console.log(data.message);
        } else if (res.status === 500) {
          const data = await res.json();
          console.log(data.message);
        } else {
          const data = await res.json();
          console.log(data);
          setAddNewPlanDone(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const prevAllDoneGenerating = useRef(false);

  const [latestPlanIDStarter, setLatestPlanIDStarter] = useState('');

  //set setLatestPlanIDStarter with userData.latestPlanID
  useEffect(() => {
    if (userData) {
      setLatestPlanIDStarter(userData.latestPlanID.toString());
    }
  }, [userData]);

  //set latestPlanID to local storage use useEffect
  useEffect(() => {
    console.log('storing latestPlanID:', latestPlanIDStarter);
    localStorage.setItem('latestPlanIDStarter', latestPlanIDStarter);
  }, [latestPlanIDStarter]);

  const [hasAddedNewPlan, setHasAddedNewPlan] = useState(false);

  useEffect(() => {
    if (session) {
      const storedValue = localStorage.getItem(
        `hasAddedNewPlanStarter_${session.user.email}_${latestPlanIDStarter}`,
      );
      if (storedValue === 'true') {
        setHasAddedNewPlan(true);
      }
    }
  }, [latestPlanIDStarter]);

  function convertMarkdownBoldToHtml(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  function turnAllgeneratedBoldToHtml() {
    setGeneratedExec(convertMarkdownBoldToHtml(generatedExec));
    setGeneratedSitu1(convertMarkdownBoldToHtml(generatedSitu1));
    setGeneratedSitu2(convertMarkdownBoldToHtml(generatedSitu2));
    setGeneratedMark1(convertMarkdownBoldToHtml(generatedMark1));
    setGeneratedMark2(convertMarkdownBoldToHtml(generatedMark2));
    setGeneratedMark3(convertMarkdownBoldToHtml(generatedMark3));
    setGeneratedMark4(convertMarkdownBoldToHtml(generatedMark4));
    setGeneratedOp1(convertMarkdownBoldToHtml(generatedOp1));
    setGeneratedOp2(convertMarkdownBoldToHtml(generatedOp2));
    setGeneratedMang1(convertMarkdownBoldToHtml(generatedMang1));
    setGeneratedMang2(convertMarkdownBoldToHtml(generatedMang2));
    setGeneratedRisk1(convertMarkdownBoldToHtml(generatedRisk1));
  }

  useEffect(() => {
    if (
      session &&
      allDoneGenerating &&
      !prevAllDoneGenerating.current &&
      !hasAddedNewPlan
    ) {
      turnAllgeneratedBoldToHtml()
      addNewPlan();
      if (session) {
        localStorage.setItem(
          `hasAddedNewPlanStarter_${session.user.email}_${latestPlanIDStarter}`,
          'true',
        );
      }
      setHasAddedNewPlan(true);
    }
    prevAllDoneGenerating.current = allDoneGenerating;
  }, [session, allDoneGenerating, hasAddedNewPlan, latestPlanIDStarter]);

  // if allDoneGenerating is not true than set loading to false

  const startTime = useRef(null);
  const intervalIdRef = useRef(null);
  async function generatePlan() {
    startTime.current = Date.now();
    setIsError(false);

    setLoading(true);

    // get these from DB
    // generateExec() //
    // generateSitu1andMark1() // mark1
    // generateSitu2() //
    // generateMark2Mark3Mark4() //generated in the function below

    // Where rest of plan is generated 1
    generateOp1();
    generateMang1();
    generateRisk1();

    // Set an interval to check if 70 seconds have passed can change 120000 to adjust timeout
    intervalIdRef.current = setInterval(() => {
      if (Date.now() - startTime.current >= 120000) {
        setIsError(true);
        setLoading(false);
        clearInterval(intervalIdRef.current);
      }
    }, 1000);
  }

  useEffect(() => {
    if (allDoneGenerating) {
      clearInterval(intervalIdRef.current);
      setLoading(false);
    }
  }, [allDoneGenerating]);

  useEffect(() => {
    if (readyToGeneratePlan) {
      generatePlan();
      if (generatedMark2.length > 1000) {
        // Where rest of plan is generated 2
        generateMark3(generatedMark2);
        generateMark4(generatedMark2);
      }
    }
  }, [readyToGeneratePlan]);

  useEffect(() => {
    console.log('generatedMark4: ', generatedMark4);
  }, [generatedMark4]);

  const [doneTimer, setDoneTimer] = useState(true);
  useEffect(() => {
    if (allDoneGenerating) {
      setTimeout(() => {
        setDoneTimer(false);
      }, 15000);
    }
  }, [allDoneGenerating]);

  useEffect(() => {
    let limit;
    if (planLanguage === 'ja') {
      limit = 400;
    } else if (planLanguage === 'ar') {
      limit = 900;
    } else {
      limit = 1000;
    }

    if (allDoneGenerating) {
      if (generatedExec.length < limit) generateExec();
      if (generatedSitu2.length < limit) generateSitu2();

      if (generatedSitu1.length < limit) {
        generateSitu1andMark1();
      } else {
        if (generatedMark1.length < limit) generateMark1(generatedSitu1);
      }

      if (generatedMark2.length < limit) {
        generateMark2Mark3Mark4();
      } else {
        if (generatedMark3.length < limit) generateMark3(generatedMark2);
        if (generatedMark4.length < limit) generateMark4(generatedMark2);
      }

      if (generatedOp1.length < limit) generateOp1();
      if (generatedMang1.length < limit) generateMang1();
      if (generatedRisk1.length < limit) generateRisk1();
    }
  }, [allDoneGenerating]);

  const [textAlign, setTextAlign] = useState('');
  useEffect(() => {
    if (planLanguage === 'ar') setTextAlign('text-right');
  }, [planLanguage]);

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* other head elements */}
      </Head>
      <main>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={1000}
            recycle={false}
          />
        )}
        <div className="overflow">
          {loading ? (
            <div className={stylesW.loading_box}>
              <div className="flex gap-4 items-center justify-center">
                <div>
                  <MoonLoader size={20} speedMultiplier={0.7} />{' '}
                </div>
                <div>
                  {t(
                    'Generating plan, once done you can edit and save at the top of the page.',
                  )}{' '}
                  <strong>{t('DO NOT QUIT')}</strong>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {allDoneGenerating && doneTimer ? (
            <div className={stylesW.loading_box}>
              <div className="flex gap-1 items-center justify-center">
                <div>
                  <strong>{t('All done!')}</strong>{' '}
                  {t('you can edit and save at the top of the page')}
                </div>
              </div>
            </div>
          ) : (
            <></>
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
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isError && (
                        <div className="flex flex-col justify-center items-center">
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                            role="alert"
                          >
                            <strong className="font-bold text-red-700">
                              {t('Failed to load business plan')}
                            </strong>
                            <span className="block sm:inline">
                              {t('Please try again')}
                            </span>
                            <br />
                            <span>
                              {t('Or contact us at help@15minuteplan.ai')}
                            </span>
                          </div>
                          <br />
                          <div>
                            <button onClick={generatePlan} className="button">
                              {t('Regenerate Plan')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center items-center mb-10">
                      <div className="flex gap-3">
                        <div className="flex flex-col justify-center items-center gap-5">
                          {!loading && !isError ? (
                            <div className="flex flex-col justify-center items-center gap-4">
                              {
                                variantID === '2' ?
                                <Link
                                  href={{
                                    pathname: ROUTE_PATH.investmentItems,
                                  }}
                                  className="button"
                                  onClick={() => {
                                    trackEvent({
                                      event_name: 'complete_finance_button',
                                    });
                                  }}
                                >
                                  {t('goToFinanceSection')}
                                </Link>
                                : <>
                                <p>
                                  <strong>
                                    {t(
                                      'Congratulations On Making Your First Plan!',
                                    )}
                                  </strong>
                                </p>
                                <Link
                                  href={{
                                    pathname: '/editPlanStarter',
                                    query: { planId: 1 },
                                  }}
                                  className="button"
                                  onClick={() => {
                                    trackEvent({
                                      event_name: 'edit_and_save_button',
                                    });
                                  }}
                                >
                                  {t('Edit & Save')}
                                </Link>
                              </>
                              }
                            </div>
                          ) : (
                            <></>
                          )}

                          {loading && (
                            <div className="flex flex-col gap-4 justify-center items-center">
                              <MoonLoader size={25} />
                              <div className="text-center">
                                {t(
                                  'Generating your plan, Once done you can edit and save here.',
                                )}{' '}
                                <strong>{t('DO NOT QUIT')}</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isError && (
                      <div
                        className={`form-block-started w-form font-segoe ${textAlign}`}
                      >
                        <hr />
                        <br />

                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedExec),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu1),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu2),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark1),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark2),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark3),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark4),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedOp1),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMang1),
                            }}
                          />
                        }
                        <br />

                        {readyToGeneratePlan &&
                        planLanguage &&
                        (variantID === '2' ? !isFinanceIncomplete : true ) ? (
                          <FinTable
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
                            initialInvestmentAmount={initialInvestmentAmount}
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
                            planLanguage={planLanguage}
                            planCurrency={planCurrency}
                            planCurrencySymbol={planCurrencySymbol}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedRisk1),
                            }}
                          />
                        }
                        <br />
                        <hr />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center">
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
  const conversionDestinationId = process.env.GOOGLE_TAG_CONVERSION_DESTINATION;
  return {
    props: {
      secretKey,
      fbPixelId,
      ...(await serverSideTranslations(locale, ['index'])),
    },
  };
}
