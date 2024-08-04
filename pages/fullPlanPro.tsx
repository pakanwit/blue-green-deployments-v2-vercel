import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { MoonLoader } from 'react-spinners';
import Router from 'next/router';
import Confetti from 'react-confetti';
import { event } from 'nextjs-google-analytics';
import DOMPurify from 'dompurify';
import FinTable from '../components/FinTable';
import stylesW from '../styles/Wizard.module.css';
import { set } from 'mongoose';
import { useTranslation } from 'next-i18next';
import us2gb from '../utils/us2gb';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import trackEvent from '../utils/trackEvent';
import Pixel from '../components/Pixel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import XPixel from '../components/XPixel';

declare let gtag: (...args: any[]) => void;

export default function fullPlanPro({
  userData,
  secretKey,
  fbPixelId,
  xPixelId,
  conversionDestinationId,
}) {
  const { t } = useTranslation('fullPlanPro');

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSaveAsWord, setShowSaveAsWord] = useState(false);
  const [isPayWall, setIsPayWall] = useState(true);

  // start checkers-----------------------------------------------
  const [runningExec, setRunningExec] = useState(false);
  const [runningSitu1, setRunningSitu1] = useState(false);
  const [runningSitu2, setRunningSitu2] = useState(false);

  const [runningMark1, setRunningMark1] = useState(false);
  const [runningMark2, setRunningMark2] = useState(false);
  const [runningMark3, setRunningMark3] = useState(false);
  const [runningMark4, setRunningMark4] = useState(false);
  const [runningMark5, setRunningMark5] = useState(false);
  const [runningMark6, setRunningMark6] = useState(false);

  const [runningOp1, setRunningOp1] = useState(false);
  const [runningOp2, setRunningOp2] = useState(false);

  const [runningTech1, setRunningTech1] = useState(false);
  const [runningTech2, setRunningTech2] = useState(false);

  const [runningMang1, setRunningMang1] = useState(false);
  const [runningMang2, setRunningMang2] = useState(false);

  const [runningGrowth, setRunningGrowth] = useState(false);

  const [runningRisk, setRunningRisk] = useState(false);
  // done checkers-----------------------------------------------
  const [doneExec, setDoneExec] = useState(false);
  const [doneSitu1, setDoneSitu1] = useState(false);
  const [doneSitu2, setDoneSitu2] = useState(false);

  const [doneMark1, setDoneMark1] = useState(false);
  const [doneMark2, setDoneMark2] = useState(false);
  const [doneMark3, setDoneMark3] = useState(false);
  const [doneMark4, setDoneMark4] = useState(false);
  const [doneMark5, setDoneMark5] = useState(false);
  const [doneMark6, setDoneMark6] = useState(false);

  const [doneOp1, setDoneOp1] = useState(false);
  const [doneOp2, setDoneOp2] = useState(false);

  const [doneTech1, setDoneTech1] = useState(false);
  const [doneTech2, setDoneTech2] = useState(false);

  const [doneGrowth, setDoneGrowth] = useState(false);

  const [doneMang1, setDoneMang1] = useState(false);
  const [doneMang2, setDoneMang2] = useState(false);

  const [doneRisk, setDoneRisk] = useState(false);

  // counting chars ----------------------------------------------
  const [doneAndFullContentExec, setDoneAndFullContentExec] = useState(false);
  const [doneAndFullContentSitu1, setDoneAndFullContentSitu1] = useState(false);
  const [doneAndFullContentSitu2, setDoneAndFullContentSitu2] = useState(false);

  const [doneAndFullContentMark1, setDoneAndFullContentMark1] = useState(false);
  const [doneAndFullContentMark2, setDoneAndFullContentMark2] = useState(false);
  const [doneAndFullContentMark3, setDoneAndFullContentMark3] = useState(false);
  const [doneAndFullContentMark4, setDoneAndFullContentMark4] = useState(false);
  const [doneAndFullContentMark5, setDoneAndFullContentMark5] = useState(false);
  const [doneAndFullContentMark6, setDoneAndFullContentMark6] = useState(false);

  const [doneAndFullContentOp1, setDoneAndFullContentOp1] = useState(false);
  const [doneAndFullContentOp2, setDoneAndFullContentOp2] = useState(false);

  const [doneAndFullContentTech1, setDoneAndFullContentTech1] = useState(false);
  const [doneAndFullContentTech2, setDoneAndFullContentTech2] = useState(false);

  const [doneAndFullContentMang1, setDoneAndFullContentMang1] = useState(false);
  const [doneAndFullContentMang2, setDoneAndFullContentMang2] = useState(false);

  const [doneAndFullContentGrowth, setDoneAndFullContentGrowth] =
    useState(false);

  const [doneAndFullContentRisk, setDoneAndFullContentRisk] = useState(false);
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
  // one has s one doesn't!!!!!!!
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
  const [generatedExecPro, setGeneratedExecPro] = useState('');
  const [generatedSitu1IndKeyPro, setGeneratedSitu1IndKeyPro] = useState('');
  const [generatedSitu2SWOTPro, setGeneratedSitu2SWOTPro] = useState('');
  const [generatedMark1ObjPro, setGeneratedMark1ObjPro] = useState('');
  const [generatedMark2STPPro, setGeneratedMark2STPPro] = useState('');
  const [generatedMark3DecisionPro, setGeneratedMark3DecisionPro] =
    useState('');
  const [generatedMark4ProductPro, setGeneratedMark4ProductPro] = useState('');
  const [generatedMark5PriceDistPro, setGeneratedMark5PriceDistPro] =
    useState('');
  const [generatedMark6AdPro, setGeneratedMark6AdPro] = useState('');
  const [generatedOp1ActKPIsPro, setGeneratedOp1ActKPIsPro] = useState('');
  const [generatedOp2QCImpPlanPro, setGeneratedOp2QCImpPlanPro] = useState('');
  const [generatedTech1AllPro, setGeneratedTech1AllPro] = useState('');
  const [generatedTech2DigiPro, setGeneratedTech2DigiPro] = useState('');
  const [generatedMang1StrucRolePro, setGeneratedMang1StrucRolePro] =
    useState('');
  const [generatedMang2RecTrainCSRPro, setGeneratedMang2RecTrainCSRPro] =
    useState('');
  const [generatedGrowthPro, setGeneratedGrowthPro] = useState('');
  const [generatedRiskPro, setGeneratedRiskPro] = useState('');

  // cancel stream--------------------------
  const executionIdRefExec = useRef(null);
  const executionIdRefSitu1 = useRef(null);
  const executionIdRefSitu2 = useRef(null);

  const executionIdRefMark1 = useRef(null);
  const executionIdRefMark2 = useRef(null);
  const executionIdRefMark3 = useRef(null);
  const executionIdRefMark4 = useRef(null);
  const executionIdRefMark5 = useRef(null);
  const executionIdRefMark6 = useRef(null);
  const executionIdRefMark7 = useRef(null);

  const executionIdRefOp1 = useRef(null);
  const executionIdRefOp2 = useRef(null);

  const executionIdRefTech1 = useRef(null);
  const executionIdRefTech2 = useRef(null);
  const executionIdRefTech3 = useRef(null);

  const executionIdRefMang1 = useRef(null);
  const executionIdRefMang2 = useRef(null);
  const executionIdRefMang3 = useRef(null);

  const executionIdRefGrowth = useRef(null);

  const executionIdRefRisk1 = useRef(null);

  // lanuguage ------------------------------------------
  const [planLanguage, setPlanLanguage] = useState('');

  //currency --------------------------------------------
  const [planCurrency, setPlanCurrency] = useState('');
  const [planCurrencySymbol, setPlanCurrencySymbol] = useState('');

  // check if there is a session if there is a session send a get request with fetch to getUserData api route to get the user data then check if userData.planQuota is less than 1 if it is less than 1 then render a div which contains a button to redirect to checkout page

  // from old /fullPlan ---------------------------------------

  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [UserDataLoading, setUserDataLoading] = useState(true);
  const [UserDataIsError, setUserDataIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [readyToGeneratePlan, setReadyToGeneratePlan] = useState(false);
  const [isGenerateMark1, setIsGenerateMark1] = useState(false);

  const variantID =
    typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';

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

      console.log(
        'setting planLanguage userInput.planLanguage: ',
        userInput.planLanguage,
      );
      setPlanLanguage(userInput.planLanguage || 'en');
      setPlanCurrency(userInput.planCurrency || '');
      setPlanCurrencySymbol(userInput.planCurrencySymbol || '');
    }

    // // for testing /////////////////////////////////////////////////
    // setBusinessOperationalStatus('Upcoming unlaunched business')
    // setBusinessPlanObj('To be used to request fund from investors')
    // setBusinessName("May's Diner")
    // setBusinessType('Diner')
    // setNEmployee(5)
    // setLocation('Atlanta, Georgia') //where do you serve your customer
    // setProductOrService('service')
    // setSalesChannel('physical location') // what channel you sell ur product on
    // setCustomerDescription1('Families')
    // setCustomerIncome1('Meduim-income')
    // setCustomerDescription2('')
    // setCustomerIncome2('')
    // setCustomerDescription3('')
    // setCustomerIncome3('')
    // setProductName1('breakfast')
    // setProductDescription1('')
    // setProductName2('lunch')
    // setProductDescription2('')
    // setProductName3('dinner')
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
    // setInvestmentItem1('construction')
    // setInvestmentAmountItem1(500000)
    // setInvestmentItem2('furnishings')
    // setInvestmentAmountItem2(300000)
    // setInvestmentItem3('equipment')
    // setInvestmentAmountItem3(100000)
    // setInvestmentItem4('working capital')
    // setInvestmentAmountItem4(100000)
    // setFirstYearRevenue(1000000)
    // setRevenueGrowthRate(0.15)
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
    // // for testing /////////////////////////////////////////////////

    setReadyToGeneratePlan(true);
  }, [userData]);

  useEffect(() => {
    if (planLanguage) {
      console.log('planLanguage in useEffect', planLanguage);
      let limit;

      if (planLanguage === 'ja') {
        limit = 200;
      } else if (planLanguage === 'ar') {
        limit = 400;
      } else {
        console.log(
          'planLanguage in useEffect is not ja or ar its: ',
          planLanguage,
        );
        limit = 500;
      }

      if (userData && userData.plans[0].originalVer.planContent) {
        const planContent = userData.plans[0].originalVer.planContent;

        if (planContent.generatedExecPro.length > limit) {
          console.log(`generatedExecPro.length > ${limit}`);
          setGeneratedExecPro(planContent.generatedExecPro);
          setDoneAndFullContentExec(true);
        } else {
          console.log(
            `generatedExecPro.length(${planContent.generatedExecPro.length})<= limit(${limit})`,
          );
          generateExecPro();
        }

        if (planContent.generatedSitu1IndKeyPro.length > limit) {
          console.log(`generatedSitu1IndKeyPro.length > ${limit}`);
          setGeneratedSitu1IndKeyPro(planContent.generatedSitu1IndKeyPro);
          setIsGenerateMark1(false);
          setDoneAndFullContentSitu1(true);
        } else {
          generateSitu1IndKeyPro();
        }

        if (planContent.generatedMark1ObjPro.length > limit) {
          console.log(`generatedMark1ObjPro.length > ${limit}`);
          setGeneratedMark1ObjPro(planContent.generatedMark1ObjPro);
          setDoneAndFullContentMark1(true);
        } else {
          generateSitu1IndKeyPro();
        }

        if (planContent.generatedSitu2SWOTPro.length > limit) {
          console.log(`generatedSitu2SWOTPro.length > ${limit}`);
          setGeneratedSitu2SWOTPro(planContent.generatedSitu2SWOTPro);
          setDoneAndFullContentSitu2(true);
        } else {
          generateSitu2SWOTPro();
        }

        if (planContent.generatedMark2STPPro.length > limit) {
          console.log(`generatedMark2STPPro.length > ${limit}`);
          setGeneratedMark2STPPro(planContent.generatedMark2STPPro);
          setDoneAndFullContentMark2(true);
        } else {
          generateMark2STPPro();
        }
      }
    }
  }, [planLanguage]);

  // useEffect(() => {
  //   if (generatedSitu1IndKeyPro.length > 1000 && userData && doneAndFullContentSitu1) {
  //     const planContent = userData.plans[0].originalVer.planContent
  //     if (planContent.generatedMark1ObjPro.length < 1000) {
  //       generateMark1ObjPro(generatedSitu1IndKeyPro)
  //     } else {
  //       console.log("generatedMark1ObjPro.length > 1000")
  //       setGeneratedMark1ObjPro(planContent.generatedMark1ObjPro)
  //       setDoneAndFullContentMark1(true)
  //     }
  //   }
  // }, [doneAndFullContentSitu1]);

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

  // google conversion code --------------------------------------------------
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
    const experimentIDFromLocal = localStorage.getItem('experimentID');
    let price;
    if (
      userData.country === 'IN' ||
      userData.country === 'AR' ||
      userData.country === 'CL' ||
      userData.country === 'BR' ||
      userData.country === 'PH' ||
      userData.country === 'MY'
    ) {
      price = 48;
    } else {
      price = 99;
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

  // enchanced conv
  useEffect(() => {
    if (paid && userData && session) {
      const hasFiredEvent = localStorage.getItem(
        `enhanced_pro_fullPlan_page_view_conversion_${session.user.email || userData.email}`,
      );

      if (!hasFiredEvent) {
        handleConversion();
        localStorage.setItem(
          `enhanced_pro_fullPlan_page_view_conversion_${session.user.email || userData.email}`,
          'true',
        );
      }
    }
  }, [paid, userData, session]);
  // end of google conversion code --------------------------------------------------

  //log planlanguage in useeffect
  useEffect(() => {
    console.log('planLanguage from fullPlanPro', planLanguage);
  }, [planLanguage]);

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
    if (readyToGeneratePlan) {
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
    }
  }, [readyToGeneratePlan]);

  async function generateMark1ObjPro(situ1Ref) {
    setRunningMark1(true);
    setGeneratedMark1ObjPro('');
    setDoneMark1(false);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark1.current = currentExecutionId;
    const mark1 = await fetch('/api/mainApiPro/api4Mark1ObjPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedMark1ObjPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark1.current === currentExecutionId) {
      setDoneMark1(true);
      setRunningMark1(false);
      console.log('set Mark1 done');
    }
  }

  async function generateMark3DecisionPro(mark2Ref) {
    setRunningMark3(true);
    setGeneratedMark3DecisionPro('');
    setDoneMark3(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark3.current = currentExecutionId;
    const mark3 = await fetch('/api/mainApiPro/api6Mark3DecisionPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedMark3DecisionPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark3.current === currentExecutionId) {
      setDoneMark3(true);
      setRunningMark3(false);
      console.log('set Mark3 done');
    }
  }

  async function generateMark4ProductPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark4(true);
    setGeneratedMark4ProductPro('');
    setDoneMark4(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark4.current = currentExecutionId;
    const mark4 = await fetch('/api/mainApiPro/api7Mark4ProductPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedMark4ProductPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark4.current === currentExecutionId) {
      setDoneMark4(true);
      setRunningMark4(false);
      console.log('set Mark4 done');
    }
  }

  async function generateMark5PriceDistPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark5(true);
    setGeneratedMark5PriceDistPro('');
    setDoneMark5(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark5.current = currentExecutionId;
    const mark5 = await fetch('/api/mainApiPro/api8Mark5PriceDistPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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

    if (!mark5.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark5Stream = mark5.body;
    if (!mark5Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark5 = mark5Stream.getReader();
    const decoderMark5 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark5Reading } = await readerMark5.read();
      done = doneMark5Reading;
      const chunkValue = decoderMark5.decode(value);
      if (executionIdRefMark5.current === currentExecutionId) {
        setGeneratedMark5PriceDistPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark5.current === currentExecutionId) {
      setDoneMark5(true);
      setRunningMark5(false);
      console.log('set Mark5 done');
    }
  }

  async function generateMark6AdPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark6(true);
    setGeneratedMark6AdPro('');
    setDoneMark6(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark6.current = currentExecutionId;
    const mark6 = await fetch('/api/mainApiPro/api9Mark6AdPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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

    if (!mark6.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const mark6Stream = mark6.body;
    if (!mark6Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMark6 = mark6Stream.getReader();
    const decoderMark6 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark6Reading } = await readerMark6.read();
      done = doneMark6Reading;
      const chunkValue = decoderMark6.decode(value);
      if (executionIdRefMark6.current === currentExecutionId) {
        setGeneratedMark6AdPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark6.current === currentExecutionId) {
      setDoneMark6(true);
      setRunningMark6(false);
      console.log('set Mark6 done');
    }
  }

  //main functions------------------------------------------------------------

  async function generateExecPro() {
    setRunningExec(true);
    setGeneratedExecPro('');
    setDoneExec(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefExec.current = currentExecutionId;

    const exec = await fetch('/api/mainApiPro/api1ExecPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedExecPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefExec.current === currentExecutionId) {
      setDoneExec(true);
      setRunningExec(false);
      console.log('set Exec done');
    }
  }

  const doneRef1 = useRef(false);
  const generatedSitu1Ref = useRef('');

  async function generateSitu1IndKeyPro() {
    setRunningSitu1(true);
    // generate situ1 first
    setGeneratedSitu1IndKeyPro('');
    setDoneSitu1(false);
    setDoneMark1(false);
    setLoading(true);

    doneRef1.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu1.current = currentExecutionId;
    const situ1 = await fetch('/api/mainApiPro/api2Situ1IndKeyPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedSitu1IndKeyPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu1.current === currentExecutionId) {
      setDoneSitu1(true);
      setRunningSitu1(false);
      console.log('set Situ1 done');
    }
  }

  async function generateSitu2SWOTPro() {
    setRunningSitu2(true);
    setGeneratedSitu2SWOTPro('');
    setDoneSitu2(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu2.current = currentExecutionId;

    const situ2 = await fetch('/api/mainApiPro/api3Situ2SWOTPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedSitu2SWOTPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu2.current === currentExecutionId) {
      setDoneSitu2(true);
      setRunningSitu2(false);
      console.log('set Situ2 done');
    }
  }

  const doneRefMark2 = useRef(false);
  const generatedMark2Ref = useRef('');

  async function generateMark2STPPro() {
    setRunningMark2(true);
    setGeneratedMark2STPPro('');
    setDoneMark2(false);
    setLoading(true);
    doneRefMark2.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark2.current = currentExecutionId;

    const mark2 = await fetch('/api/mainApiPro/api5Mark2STPPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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

    while (!doneRefMark2.current) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      doneRefMark2.current = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      generatedMark2Ref.current = generatedMark2Ref.current + chunkValue;
      if (executionIdRefMark2.current === currentExecutionId) {
        setGeneratedMark2STPPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMark2.current === currentExecutionId) {
      setDoneMark2(true);
      setRunningMark2(false);
      console.log('set Mark2 done');
    }
  }

  async function generateOp1ActKPIsPro() {
    setRunningOp1(true);
    setGeneratedOp1ActKPIsPro('');
    setDoneOp1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp1.current = currentExecutionId;
    const op1 = await fetch('/api/mainApiPro/api10Op1ActKPIsPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        setGeneratedOp1ActKPIsPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp1.current === currentExecutionId) {
      setDoneOp1(true);
      setRunningOp1(false);
      console.log('set Op1 done');
    }
  }

  async function generateOp2QCImpPlanPro() {
    setRunningOp2(true);
    setGeneratedOp2QCImpPlanPro('');
    setDoneOp2(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp2.current = currentExecutionId;
    const op2 = await fetch('/api/mainApiPro/api11Op2QCImpPlanPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
      }),
    });
    console.log('Edge function returned.');

    if (!op2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const op2Stream = op2.body;
    if (!op2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerOp2 = op2Stream.getReader();
    const decoderOp2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneOp2Reading } = await readerOp2.read();
      done = doneOp2Reading;
      const chunkValue = decoderOp2.decode(value);
      if (executionIdRefOp2.current === currentExecutionId) {
        setGeneratedOp2QCImpPlanPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp2.current === currentExecutionId) {
      setDoneOp2(true);
      setRunningOp2(false);
      console.log('set Op2 done');
    }
  }

  async function generateTech1AllPro() {
    setRunningTech1(true);
    setGeneratedTech1AllPro('');
    setDoneTech1(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefTech1.current = currentExecutionId;
    const Tech1 = await fetch('/api/mainApiPro/api12Tech1AllPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
      }),
    });
    console.log('Edge function returned.');

    if (!Tech1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const Tech1Stream = Tech1.body;
    if (!Tech1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerTech1 = Tech1Stream.getReader();
    const decoderTech1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneTech1Reading } = await readerTech1.read();
      done = doneTech1Reading;
      const chunkValue = decoderTech1.decode(value);
      if (executionIdRefTech1.current === currentExecutionId) {
        setGeneratedTech1AllPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefTech1.current === currentExecutionId) {
      setDoneTech1(true);
      setRunningTech1(false);
      console.log('set Tech1 done');
    }
  }

  async function generateTech2DigiPro() {
    setRunningTech2(true);
    setGeneratedTech2DigiPro('');
    setDoneTech2(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefTech2.current = currentExecutionId;
    const Tech2 = await fetch('/api/mainApiPro/api13Tech2DigiPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
      }),
    });
    console.log('Edge function returned.');

    if (!Tech2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const Tech2Stream = Tech2.body;
    if (!Tech2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerTech2 = Tech2Stream.getReader();
    const decoderTech2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneTech2Reading } = await readerTech2.read();
      done = doneTech2Reading;
      const chunkValue = decoderTech2.decode(value);
      if (executionIdRefTech2.current === currentExecutionId) {
        setGeneratedTech2DigiPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefTech2.current === currentExecutionId) {
      setDoneTech2(true);
      setRunningTech2(false);
      console.log('set Tech2 done');
    }
  }

  const doneRefMang1 = useRef(false);
  const generatedMang1Ref = useRef('');

  async function generateMang1StrucRolePro() {
    setRunningMang1(true);
    setGeneratedMang1StrucRolePro('');
    setDoneMang1(false);
    setDoneMang2(false);
    setLoading(true);
    doneRefMang1.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang1.current = currentExecutionId;
    const Mang1 = await fetch('/api/mainApiPro/api14Mang1StrucRolePro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
      }),
    });
    console.log('Edge function returned.');

    if (!Mang1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const Mang1Stream = Mang1.body;
    if (!Mang1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMang1 = Mang1Stream.getReader();
    const decoderMang1 = new TextDecoder();
    const done = false;

    while (!doneRefMang1.current) {
      const { value, done: doneMang1Reading } = await readerMang1.read();
      doneRefMang1.current = doneMang1Reading;
      const chunkValue = decoderMang1.decode(value);
      generatedMang1Ref.current = generatedMang1Ref.current + chunkValue;
      if (executionIdRefMang1.current === currentExecutionId) {
        setGeneratedMang1StrucRolePro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang1.current === currentExecutionId) {
      setDoneMang1(true);
      setRunningMang1(false);
      console.log('set Mang1 done');
    }
  }

  async function generateMang2RecTrainCSRPro(mang1Ref) {
    setRunningMang2(true);
    setGeneratedMang2RecTrainCSRPro('');
    setDoneMang2(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang2.current = currentExecutionId;
    const Mang2 = await fetch('/api/mainApiPro/api15Mang2RecTrainCSRPro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
        mang1Ref,
      }),
    });
    console.log('Edge function returned.');

    if (!Mang2.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const Mang2Stream = Mang2.body;
    if (!Mang2Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerMang2 = Mang2Stream.getReader();
    const decoderMang2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMang2Reading } = await readerMang2.read();
      done = doneMang2Reading;
      const chunkValue = decoderMang2.decode(value);
      if (executionIdRefMang2.current === currentExecutionId) {
        setGeneratedMang2RecTrainCSRPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang2.current === currentExecutionId) {
      setDoneMang2(true);
      setRunningMang2(false);
      console.log('set Mang2 done');
    }
  }

  async function generateGrowthPro() {
    setRunningGrowth(true);
    setGeneratedGrowthPro('');
    setDoneGrowth(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefGrowth.current = currentExecutionId;
    const Growth = await fetch('/api/mainApiPro/api16Growth1Pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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
      }),
    });
    console.log('Edge function returned.');

    if (!Growth.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const GrowthStream = Growth.body;
    if (!GrowthStream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerGrowth = GrowthStream.getReader();
    const decoderGrowth = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneGrowthReading } = await readerGrowth.read();
      done = doneGrowthReading;
      const chunkValue = decoderGrowth.decode(value);
      if (executionIdRefGrowth.current === currentExecutionId) {
        setGeneratedGrowthPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefGrowth.current === currentExecutionId) {
      setDoneGrowth(true);
      setRunningGrowth(false);
      console.log('set Growth done');
    }
  }

  async function generateRiskPro() {
    setRunningRisk(true);
    setGeneratedRiskPro('');
    setDoneRisk(false);
    setLoading(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefRisk1.current = currentExecutionId;
    const Risk1 = await fetch('/api/mainApiPro/api17Risk1Pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID,
        planQuota: userData.planQuota,
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

    if (!Risk1.ok) {
      setIsError(true);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const Risk1Stream = Risk1.body;
    if (!Risk1Stream) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const readerRisk1 = Risk1Stream.getReader();
    const decoderRisk1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneRiskReading } = await readerRisk1.read();
      done = doneRiskReading;
      const chunkValue = decoderRisk1.decode(value);
      if (executionIdRefRisk1.current === currentExecutionId) {
        setGeneratedRiskPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefRisk1.current === currentExecutionId) {
      setDoneRisk(true);
      setRunningRisk(false);
      console.log('set Risk1 done');
    }
  }

  // if every state with done is true then setAllDoneGenerating to true

  const [addNewPlanDone, setAddNewPlanDone] = useState(false);

  async function addNewPlan() {
    const userInput = {
      businessPlanObj,
      businessName,
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

      planLanguage,
      planCurrency,
      planCurrencySymbol,
    };

    const planContent = {
      generatedExecPro: convertMarkdownBoldToHtml(generatedExecPro),
      generatedSitu1IndKeyPro: convertMarkdownBoldToHtml(generatedSitu1IndKeyPro),
      generatedSitu2SWOTPro: convertMarkdownBoldToHtml(generatedSitu2SWOTPro),
      generatedMark1ObjPro: convertMarkdownBoldToHtml(generatedMark1ObjPro),
      generatedMark2STPPro: convertMarkdownBoldToHtml(generatedMark2STPPro),
      generatedMark3DecisionPro: convertMarkdownBoldToHtml(generatedMark3DecisionPro),
      generatedMark4ProductPro: convertMarkdownBoldToHtml(generatedMark4ProductPro),
      generatedMark5PriceDistPro: convertMarkdownBoldToHtml(generatedMark5PriceDistPro),
      generatedMark6AdPro: convertMarkdownBoldToHtml(generatedMark6AdPro),
      generatedOp1ActKPIsPro: convertMarkdownBoldToHtml(generatedOp1ActKPIsPro),
      generatedOp2QCImpPlanPro: convertMarkdownBoldToHtml(generatedOp2QCImpPlanPro),
      generatedTech1AllPro: convertMarkdownBoldToHtml(generatedTech1AllPro),
      generatedTech2DigiPro: convertMarkdownBoldToHtml(generatedTech2DigiPro),
      generatedMang1StrucRolePro: convertMarkdownBoldToHtml(generatedMang1StrucRolePro),
      generatedMang2RecTrainCSRPro: convertMarkdownBoldToHtml(generatedMang2RecTrainCSRPro),
      generatedGrowthPro: convertMarkdownBoldToHtml(generatedGrowthPro),
      generatedRiskPro: convertMarkdownBoldToHtml(generatedRiskPro),
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

  const [allDoneandFullContent, setAllDoneAndFullContent] = useState(false);

  const [latestPlanIDPro, setLatestPlanIDStarterPro] = useState('');

  //set setLatestPlanIDStarterPro with userData.latestPlanID
  useEffect(() => {
    if (userData) {
      setLatestPlanIDStarterPro(userData.latestPlanID.toString());
    }
  }, [userData]);

  //set latestPlanIDPro to local storage use useEffect
  useEffect(() => {
    console.log('storing latestPlanIDPro:', latestPlanIDPro);
    localStorage.setItem('latestPlanIDPro', latestPlanIDPro);
  }, [latestPlanIDPro]);

  const [hasAddedNewPlanPro, setHasAddedNewPlanPro] = useState(false);

  useEffect(() => {
    if (session) {
      const storedValue = localStorage.getItem(
        `hasAddedNewPlanPro_${session.user.email}_${latestPlanIDPro}`,
      );
      if (storedValue === 'true') {
        setHasAddedNewPlanPro(true);
      }
    }
  }, [latestPlanIDPro]);

  function convertMarkdownBoldToHtml(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  function turnAllgeneratedBoldToHtml() {
    setGeneratedExecPro(convertMarkdownBoldToHtml(generatedExecPro));
    setGeneratedSitu1IndKeyPro(convertMarkdownBoldToHtml(generatedSitu1IndKeyPro));
    setGeneratedSitu2SWOTPro(convertMarkdownBoldToHtml(generatedSitu2SWOTPro));
    setGeneratedMark1ObjPro(convertMarkdownBoldToHtml(generatedMark1ObjPro));
    setGeneratedMark2STPPro(convertMarkdownBoldToHtml(generatedMark2STPPro));
    setGeneratedMark3DecisionPro(convertMarkdownBoldToHtml(generatedMark3DecisionPro));
    setGeneratedMark4ProductPro(convertMarkdownBoldToHtml(generatedMark4ProductPro));
    setGeneratedMark5PriceDistPro(convertMarkdownBoldToHtml(generatedMark5PriceDistPro));
    setGeneratedMark6AdPro(convertMarkdownBoldToHtml(generatedMark6AdPro));
    setGeneratedOp1ActKPIsPro(convertMarkdownBoldToHtml(generatedOp1ActKPIsPro));
    setGeneratedOp2QCImpPlanPro(convertMarkdownBoldToHtml(generatedOp2QCImpPlanPro));
    setGeneratedTech1AllPro(convertMarkdownBoldToHtml(generatedTech1AllPro));
    setGeneratedTech2DigiPro(convertMarkdownBoldToHtml(generatedTech2DigiPro));
    setGeneratedMang1StrucRolePro(convertMarkdownBoldToHtml(generatedMang1StrucRolePro));
    setGeneratedMang2RecTrainCSRPro(convertMarkdownBoldToHtml(generatedMang2RecTrainCSRPro));
    setGeneratedGrowthPro(convertMarkdownBoldToHtml(generatedGrowthPro));
    setGeneratedRiskPro(convertMarkdownBoldToHtml(generatedRiskPro));
  }

  useEffect(() => {
    if (
      doneAndFullContentExec &&
      doneAndFullContentSitu1 &&
      doneAndFullContentSitu2 &&
      doneAndFullContentMark1 &&
      doneAndFullContentMark2 &&
      doneAndFullContentMark3 &&
      doneAndFullContentMark4 &&
      doneAndFullContentMark5 &&
      doneAndFullContentMark6 &&
      doneAndFullContentOp1 &&
      doneAndFullContentOp2 &&
      doneAndFullContentTech1 &&
      doneAndFullContentTech2 &&
      doneAndFullContentMang1 &&
      doneAndFullContentMang2 &&
      doneAndFullContentGrowth &&
      doneAndFullContentRisk &&
      !hasAddedNewPlanPro
    ) {
      turnAllgeneratedBoldToHtml()
      console.log('addNewPlanPro running');
      addNewPlan();
      if (session) {
        localStorage.setItem(
          `hasAddedNewPlanPro_${session.user.email}_${latestPlanIDPro}`,
          'true',
        );
      }
      setHasAddedNewPlanPro(true);
      setAllDoneAndFullContent(true);
      setLoading(false);
      if (planLanguage === 'en-uk') {
        setGeneratedExecPro(us2gb(generatedExecPro));
        setGeneratedSitu1IndKeyPro(us2gb(generatedSitu1IndKeyPro));
        setGeneratedSitu2SWOTPro(us2gb(generatedSitu2SWOTPro));
        setGeneratedMark1ObjPro(us2gb(generatedMark1ObjPro));
        setGeneratedMark2STPPro(us2gb(generatedMark2STPPro));
        setGeneratedMark3DecisionPro(us2gb(generatedMark3DecisionPro));
        setGeneratedMark4ProductPro(us2gb(generatedMark4ProductPro));
        setGeneratedMark5PriceDistPro(us2gb(generatedMark5PriceDistPro));
        setGeneratedMark6AdPro(us2gb(generatedMark6AdPro));
        setGeneratedOp1ActKPIsPro(us2gb(generatedOp1ActKPIsPro));
        setGeneratedOp2QCImpPlanPro(us2gb(generatedOp2QCImpPlanPro));
        setGeneratedTech1AllPro(us2gb(generatedTech1AllPro));
        setGeneratedTech2DigiPro(us2gb(generatedTech2DigiPro));
        setGeneratedMang1StrucRolePro(us2gb(generatedMang1StrucRolePro));
        setGeneratedMang2RecTrainCSRPro(us2gb(generatedMang2RecTrainCSRPro));
        setGeneratedGrowthPro(us2gb(generatedGrowthPro));
        setGeneratedRiskPro(us2gb(generatedRiskPro));
      }
    }
  }, [
    doneAndFullContentExec,
    doneAndFullContentSitu1,
    doneAndFullContentSitu2,
    doneAndFullContentMark1,
    doneAndFullContentMark2,
    doneAndFullContentMark3,
    doneAndFullContentMark4,
    doneAndFullContentMark5,
    doneAndFullContentMark6,
    doneAndFullContentOp1,
    doneAndFullContentOp2,
    doneAndFullContentTech1,
    doneAndFullContentTech2,
    doneAndFullContentMang1,
    doneAndFullContentMang2,
    doneAndFullContentGrowth,
    doneAndFullContentRisk,
    hasAddedNewPlanPro,
    latestPlanIDPro,
  ]);

  useEffect(() => {
    console.log('doneAndFullContentExec:', doneAndFullContentExec);
    console.log('doneAndFullContentSitu1:', doneAndFullContentSitu1);
    console.log('doneAndFullContentSitu2:', doneAndFullContentSitu2);
    console.log('doneAndFullContentMark1:', doneAndFullContentMark1);
    console.log('doneAndFullContentMark2:', doneAndFullContentMark2);
    console.log('doneAndFullContentMark3:', doneAndFullContentMark3);
    console.log('doneAndFullContentMark4:', doneAndFullContentMark4);
    console.log('doneAndFullContentMark5:', doneAndFullContentMark5);
    console.log('doneAndFullContentMark6:', doneAndFullContentMark6);
    console.log('doneAndFullContentOp1:', doneAndFullContentOp1);
    console.log('doneAndFullContentOp2:', doneAndFullContentOp2);
    console.log('doneAndFullContentTech1:', doneAndFullContentTech1);
    console.log('doneAndFullContentTech2:', doneAndFullContentTech2);
    console.log('doneAndFullContentMang1:', doneAndFullContentMang1);
    console.log('doneAndFullContentMang2:', doneAndFullContentMang2);
    console.log('doneAndFullContentGrowth:', doneAndFullContentGrowth);
    console.log('doneAndFullContentRisk:', doneAndFullContentRisk);
  }, [
    doneAndFullContentExec,
    doneAndFullContentSitu1,
    doneAndFullContentSitu2,
    doneAndFullContentMark1,
    doneAndFullContentMark2,
    doneAndFullContentMark3,
    doneAndFullContentMark4,
    doneAndFullContentMark5,
    doneAndFullContentMark6,
    doneAndFullContentOp1,
    doneAndFullContentOp2,
    doneAndFullContentTech1,
    doneAndFullContentTech2,
    doneAndFullContentMang1,
    doneAndFullContentMang2,
    doneAndFullContentGrowth,
    doneAndFullContentRisk,
  ]);

  // if allDoneGenerating is not true than set loading to false

  const startTime = useRef<number | null>(null);
  const intervalIdRef = useRef(null);
  async function generatePlan() {
    startTime.current = Date.now();
    setAllDoneAndFullContent(false);

    setIsError(false);

    setLoading(true);
    setShowSaveAsWord(true);

    // generateExecPro()

    // generateSitu1IndKeyPro() // this will trigger mark1
    // generateSitu2SWOTPro()

    // generateMark2STPPro() // this will trigger mark3, mark4, mark5, mark6
    // search for THE REST OF GENERATE FUNCTION------------------------------------------------------------------------------------
    generateOp1ActKPIsPro();
    generateOp2QCImpPlanPro();
    generateTech1AllPro();
    generateTech2DigiPro();

    generateMang1StrucRolePro(); // this will trigger mang2

    generateGrowthPro();

    generateRiskPro();

    intervalIdRef.current = setInterval(() => {
      if (Date.now() - startTime.current >= 900000) {
        setIsError(true);
        setLoading(false);
        clearInterval(intervalIdRef.current);
      }
    }, 1000);
  }

  // THE REST OF GENERATE FUNCTION
  useEffect(() => {
    if (doneAndFullContentMark2) {
      generateMark3DecisionPro(generatedMark2STPPro);
      generateMark4ProductPro(generatedMark2STPPro);
      generateMark5PriceDistPro(generatedMark2STPPro);
      generateMark6AdPro(generatedMark2STPPro);
    }
  }, [doneAndFullContentMark2]);

  useEffect(() => {
    if (allDoneandFullContent) {
      clearInterval(intervalIdRef.current);
      setLoading(false);
    }
  }, [allDoneandFullContent]);

  useEffect(() => {
    if (userData && userData.plans[0].originalVer.planContent && planLanguage) {
      const planContent = userData.plans[0].originalVer.planContent;
      let limit;
      if (planLanguage === 'ja') limit = 200;
      else if (planLanguage === 'ar') limit = 400;
      else limit = 500;

      if (planContent.generatedExecPro.length < limit) {
        console.log('exec length less than limit');
        generateExecPro();
      }
      if (planContent.generatedSitu1IndKeyPro.length < limit)
        generateSitu1IndKeyPro();
      if (planContent.generatedSitu2SWOTPro.length < limit)
        generateSitu2SWOTPro();
      // if (planContent.generatedMark1ObjPro.length < limit) generateMark1ObjPro(); // running generateSitu1IndKeyPro() automatically triggers generateMark1ObjPro
      if (planContent.generatedMark2STPPro.length < limit)
        generateMark2STPPro();
    }
  }, [userData, planLanguage]);

  useEffect(() => {
    if (readyToGeneratePlan) generatePlan();
  }, [readyToGeneratePlan]);

  const [limit, setLimit] = useState(1000);

  useEffect(() => {
    if (planLanguage === 'ja') {
      setLimit(400);
    } else if (planLanguage === 'ar') {
      setLimit(900);
    } else {
      setLimit(1000);
    }
  }, [planLanguage]);

  useEffect(() => {
    if (doneExec && limit) {
      const cleanedTextExec = generatedExecPro.replace(/^"|"$/g, '');
      setGeneratedExecPro(cleanedTextExec);

      const execLength = generatedExecPro.length;
      if (execLength <= limit) {
        console.log(
          `generatedExecPro has less than ${limit} chars, generating again`,
        );
        generateExecPro();
      } else {
        setDoneAndFullContentExec(true);
      }
    }
  }, [doneExec, limit]);

  useEffect(() => {
    if (doneSitu1 && limit) {
      const cleanedTextSitu1 = generatedSitu1IndKeyPro.replace(/^"|"$/g, '');
      setGeneratedSitu1IndKeyPro(cleanedTextSitu1);

      const situ1Length = generatedSitu1IndKeyPro.length;
      if (situ1Length <= limit) {
        console.log(
          `generatedSitu1IndKeyPro has less than ${limit} chars, generating again`,
        );
        generateSitu1IndKeyPro(); // this will trigger mark1
      } else {
        setIsGenerateMark1(true);
        setDoneAndFullContentSitu1(true);
      }
    }
  }, [doneSitu1, limit]);

  useEffect(() => {
    if (doneAndFullContentSitu1 && isGenerateMark1) {
      generateMark1ObjPro(generatedSitu1IndKeyPro);
    }
  }, [doneAndFullContentSitu1]);

  useEffect(() => {
    if (doneSitu2 && limit) {
      const cleanedTextSitu2 = generatedSitu2SWOTPro.replace(/^"|"$/g, '');
      setGeneratedSitu2SWOTPro(cleanedTextSitu2);

      const situ2Length = generatedSitu2SWOTPro.length;
      if (situ2Length <= limit) {
        console.log(
          `generatedSitu2SWOTPro has less than ${limit} chars, generating again`,
        );
        generateSitu2SWOTPro();
      } else {
        setDoneAndFullContentSitu2(true);
      }
    }
  }, [doneSitu2, limit]);

  useEffect(() => {
    if (doneMark1 && limit) {
      const cleanedTextMark1 = generatedMark1ObjPro.replace(/^"|"$/g, '');
      setGeneratedMark1ObjPro(cleanedTextMark1);

      const mark1Length = generatedMark1ObjPro.length;
      if (mark1Length <= limit && doneSitu1) {
        console.log(
          `generatedMark1ObjPro has less than ${limit} chars, generating again`,
        );
        generateMark1ObjPro(generatedSitu1IndKeyPro);
      } else {
        setDoneAndFullContentMark1(true);
      }
    }
  }, [doneMark1, limit]);

  useEffect(() => {
    if (doneMark2 && limit) {
      const cleanedTextMark2 = generatedMark2STPPro.replace(/^"|"$/g, '');
      setGeneratedMark2STPPro(cleanedTextMark2);

      const mark2Length = generatedMark2STPPro.length;
      if (mark2Length <= limit) {
        console.log(
          `generatedMark2STPPro has less than ${limit} chars, generating again`,
        );
        generateMark2STPPro();
      } else {
        setDoneAndFullContentMark2(true);
      }
    }
  }, [doneMark2, limit]);

  useEffect(() => {
    if (doneMark3 && limit) {
      const cleanedTextMark3 = generatedMark3DecisionPro.replace(/^"|"$/g, '');
      setGeneratedMark3DecisionPro(cleanedTextMark3);

      const mark3Length = generatedMark3DecisionPro.length;
      if (mark3Length <= limit) {
        console.log(
          `generatedMark3DecisionPro again / mark3Length: ${mark3Length} <= limit: ${limit} /  `,
        );
        if (doneAndFullContentMark2)
          generateMark3DecisionPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark3(true);
      }
    }
  }, [doneMark3, limit]);

  useEffect(() => {
    if (doneMark4 && limit) {
      const cleanedTextMark4 = generatedMark4ProductPro.replace(/^"|"$/g, '');
      setGeneratedMark4ProductPro(cleanedTextMark4);

      const mark4Length = generatedMark4ProductPro.length;
      if (mark4Length <= limit) {
        if (doneAndFullContentMark2)
          generateMark4ProductPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark4(true);
      }
    }
  }, [doneMark4, limit]);

  useEffect(() => {
    if (doneMark5 && limit) {
      const cleanedTextMark5 = generatedMark5PriceDistPro.replace(/^"|"$/g, '');
      setGeneratedMark5PriceDistPro(cleanedTextMark5);

      const mark5Length = generatedMark5PriceDistPro.length;
      if (mark5Length <= limit) {
        if (doneAndFullContentMark2)
          generateMark5PriceDistPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark5(true);
      }
    }
  }, [doneMark5, limit]);

  useEffect(() => {
    if (doneMark6 && limit) {
      const cleanedTextMark6 = generatedMark6AdPro.replace(/^"|"$/g, '');
      setGeneratedMark6AdPro(cleanedTextMark6);

      const mark6Length = generatedMark6AdPro.length;
      if (mark6Length <= limit) {
        if (doneAndFullContentMark2) generateMark6AdPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark6(true);
      }
    }
  }, [doneMark6, limit]);

  useEffect(() => {
    if (doneOp1 && limit) {
      const cleanedTextOp1 = generatedOp1ActKPIsPro.replace(/^"|"$/g, '');
      setGeneratedOp1ActKPIsPro(cleanedTextOp1);

      const op1Length = generatedOp1ActKPIsPro.length;
      if (op1Length <= limit) {
        generateOp1ActKPIsPro();
      } else {
        setDoneAndFullContentOp1(true);
      }
    }
  }, [doneOp1, limit]);

  useEffect(() => {
    if (doneOp2 && limit) {
      const cleanedTextOp2 = generatedOp2QCImpPlanPro.replace(/^"|"$/g, '');
      setGeneratedOp2QCImpPlanPro(cleanedTextOp2);

      const op2Length = generatedOp2QCImpPlanPro.length;
      if (op2Length <= limit) {
        generateOp2QCImpPlanPro();
      } else {
        setDoneAndFullContentOp2(true);
      }
    }
  }, [doneOp2, limit]);

  useEffect(() => {
    if (doneTech1 && limit) {
      const cleanedTextTech1 = generatedTech1AllPro.replace(/^"|"$/g, '');
      setGeneratedTech1AllPro(cleanedTextTech1);

      const tech1Length = generatedTech1AllPro.length;
      if (tech1Length <= limit) {
        generateTech1AllPro();
      } else {
        setDoneAndFullContentTech1(true);
      }
    }
  }, [doneTech1, limit]);

  useEffect(() => {
    if (doneTech2 && limit) {
      const cleanedTextTech2 = generatedTech2DigiPro.replace(/^"|"$/g, '');
      setGeneratedTech2DigiPro(cleanedTextTech2);

      const tech2Length = generatedTech2DigiPro.length;
      if (tech2Length <= limit) {
        generateTech2DigiPro();
      } else {
        setDoneAndFullContentTech2(true);
      }
    }
  }, [doneTech2, limit]);

  useEffect(() => {
    if (doneMang1 && limit) {
      const cleanedTextMang1 = generatedMang1StrucRolePro.replace(/^"|"$/g, '');
      setGeneratedMang1StrucRolePro(cleanedTextMang1);

      const mang1Length = generatedMang1StrucRolePro.length;
      if (mang1Length <= limit) {
        generateMang1StrucRolePro();
      } else {
        setDoneAndFullContentMang1(true);
      }
    }
  }, [doneMang1, limit]);

  useEffect(() => {
    if (doneAndFullContentMang1) {
      generateMang2RecTrainCSRPro(generatedMang1StrucRolePro);
    }
  }, [doneAndFullContentMang1]);

  useEffect(() => {
    if (doneMang2 && limit) {
      const cleanedTextMang2 = generatedMang2RecTrainCSRPro.replace(
        /^"|"$/g,
        '',
      );
      setGeneratedMang2RecTrainCSRPro(cleanedTextMang2);

      const mang2Length = generatedMang2RecTrainCSRPro.length;
      if (mang2Length <= limit) {
        generateMang2RecTrainCSRPro(generatedMang2RecTrainCSRPro);
      } else {
        setDoneAndFullContentMang2(true);
      }
    }
  }, [doneMang2, limit]);

  useEffect(() => {
    if (doneGrowth && limit) {
      const cleanedTextGrowth = generatedGrowthPro.replace(/^"|"$/g, '');
      setGeneratedGrowthPro(cleanedTextGrowth);

      const growthLength = generatedGrowthPro.length;
      if (growthLength <= limit) {
        generateGrowthPro();
      } else {
        setDoneAndFullContentGrowth(true);
      }
    }
  }, [doneGrowth, limit]);

  useEffect(() => {
    if (doneRisk && limit) {
      const cleanedTextRisk = generatedRiskPro.replace(/^"|"$/g, '');
      setGeneratedRiskPro(cleanedTextRisk);

      const riskLength = generatedRiskPro.length;
      if (riskLength <= limit) {
        generateRiskPro();
      } else {
        setDoneAndFullContentRisk(true);
      }
    }
  }, [doneRisk, limit]);

  // if runningSitu1 is true for more than 2 minutes than run generateExecPro again. also do this for all other generate functions

  const timerRefExec = useRef(null);
  const timerRefSitu1 = useRef(null);
  const timerRefSitu2 = useRef(null);
  const timerRefMark1 = useRef(null);
  const timerRefMark2 = useRef(null);
  const timerRefMark3 = useRef(null);
  const timerRefMark4 = useRef(null);
  const timerRefMark5 = useRef(null);
  const timerRefMark6 = useRef(null);
  const timerRefOp1 = useRef(null);
  const timerRefOp2 = useRef(null);
  const timerRefTech1 = useRef(null);
  const timerRefTech2 = useRef(null);
  const timerRefMang1 = useRef(null);
  const timerRefMang2 = useRef(null);
  const timerRefGrowth = useRef(null);
  const timerRefRisk = useRef(null);

  useEffect(() => {
    if (runningExec) {
      timerRefExec.current = setTimeout(() => {
        console.log(
          'generateExecPro took longer than 2 minutes, generating again',
        );
        generateExecPro();
      }, 300000);
    } else {
      console.log('runningExec is false, clearing timeout');
      clearTimeout(timerRefExec.current);
    }

    return () => {
      if (!runningExec) clearTimeout(timerRefExec.current);
    };
  }, [runningExec]);

  useEffect(() => {
    if (runningSitu1) {
      timerRefSitu1.current = setTimeout(() => {
        console.log(
          'generateSitu1IndKeyPro() took longer than 4 minutes, generating again',
        );
        generateSitu1IndKeyPro();
      }, 300000);
    } else {
      console.log('runningSitu1 is false, clearing timeout');
      clearTimeout(timerRefSitu1.current);
    }

    return () => {
      if (!runningSitu1) clearTimeout(timerRefSitu1.current);
    };
  }, [runningSitu1]);

  useEffect(() => {
    if (runningSitu2) {
      timerRefSitu2.current = setTimeout(() => {
        console.log(
          'generateSitu2SWOTPro took longer than 2 minutes, generating again',
        );
        generateSitu2SWOTPro();
      }, 300000);
    } else {
      console.log('runningSitu2 is false, clearing timeout');
      clearTimeout(timerRefSitu2.current);
    }

    return () => {
      console.log('Cleanup: clearing timeout');
      clearTimeout(timerRefSitu2.current);
    };
  }, [runningSitu2]);

  useEffect(() => {
    if (runningMark1) {
      if (doneAndFullContentSitu1) {
        timerRefMark1.current = setTimeout(() => {
          console.log(
            'generateMark1ObjPro took longer than 2 minutes, generating again',
          );
          generateMark1ObjPro(generatedSitu1IndKeyPro);
        }, 300000);
      }
    } else {
      console.log('runningMark1 is false, clearing timeout');
      clearTimeout(timerRefMark1.current);
    }

    return () => {
      if (!runningMark1) clearTimeout(timerRefMark1.current);
    };
  }, [runningMark1]);

  useEffect(() => {
    if (runningMark2) {
      timerRefMark2.current = setTimeout(() => {
        console.log(
          'generateMark2STPPro took longer than 2 minutes, generating again',
        );
        generateMark2STPPro();
      }, 300000);
    } else {
      console.log('runningMark2 is false, clearing timeout');
      clearTimeout(timerRefMark2.current);
    }

    return () => {
      if (!runningMark2) clearTimeout(timerRefMark2.current);
    };
  }, [runningMark2]);

  useEffect(() => {
    if (runningMark3) {
      if (doneAndFullContentMark2) {
        timerRefMark3.current = setTimeout(() => {
          generateMark3DecisionPro(generatedMark2STPPro);
        }, 300000);
      }
    } else {
      console.log('runningMark3 is false, clearing timeout');
      clearTimeout(timerRefMark3.current);
    }

    return () => {
      if (!runningMark3) clearTimeout(timerRefMark3.current);
    };
  }, [runningMark3]);

  useEffect(() => {
    if (runningMark4) {
      if (doneAndFullContentMark2) {
        timerRefMark4.current = setTimeout(() => {
          generateMark4ProductPro(generatedMark2STPPro);
        }, 300000);
      }
    } else {
      console.log('runningMark4 is false, clearing timeout');
      clearTimeout(timerRefMark4.current);
    }

    return () => {
      if (!runningMark4) clearTimeout(timerRefMark4.current);
    };
  }, [runningMark4]);

  useEffect(() => {
    if (runningMark5) {
      if (doneAndFullContentMark2) {
        timerRefMark5.current = setTimeout(() => {
          generateMark5PriceDistPro(generatedMark2STPPro);
        }, 300000);
      }
    } else {
      console.log('runningMark5 is false, clearing timeout');
      clearTimeout(timerRefMark5.current);
    }

    return () => {
      if (!runningMark5) clearTimeout(timerRefMark5.current);
    };
  }, [runningMark5]);

  useEffect(() => {
    if (runningMark6) {
      if (doneAndFullContentMark2) {
        timerRefMark6.current = setTimeout(() => {
          generateMark6AdPro(generatedMark2STPPro);
        }, 300000);
      }
    } else {
      console.log('runningMark6 is false, clearing timeout');
      clearTimeout(timerRefMark6.current);
    }

    return () => {
      if (!runningMark6) clearTimeout(timerRefMark6.current);
    };
  }, [runningMark6]);

  useEffect(() => {
    if (runningOp1) {
      timerRefOp1.current = setTimeout(() => {
        generateOp1ActKPIsPro();
      }, 300000);
    } else {
      console.log('runningOp1 is false, clearing timeout');
      clearTimeout(timerRefOp1.current);
    }

    return () => {
      if (!runningOp1) clearTimeout(timerRefOp1.current);
    };
  }, [runningOp1]);

  useEffect(() => {
    if (runningOp2) {
      timerRefOp2.current = setTimeout(() => {
        generateOp2QCImpPlanPro();
      }, 300000);
    } else {
      console.log('runningOp2 is false, clearing timeout');
      clearTimeout(timerRefOp2.current);
    }

    return () => {
      if (!runningOp2) clearTimeout(timerRefOp2.current);
    };
  }, [runningOp2]);

  useEffect(() => {
    if (runningTech1) {
      timerRefTech1.current = setTimeout(() => {
        generateTech1AllPro();
      }, 300000);
    } else {
      console.log('runningTech1 is false, clearing timeout');
      clearTimeout(timerRefTech1.current);
    }

    return () => {
      if (!runningTech1) clearTimeout(timerRefTech1.current);
    };
  }, [runningTech1]);

  useEffect(() => {
    if (runningTech2) {
      timerRefTech2.current = setTimeout(() => {
        generateTech2DigiPro();
      }, 300000);
    } else {
      console.log('runningTech2 is false, clearing timeout');
      clearTimeout(timerRefTech2.current);
    }

    return () => {
      if (!runningTech2) clearTimeout(timerRefTech2.current);
    };
  }, [runningTech2]);

  useEffect(() => {
    if (runningMang1) {
      timerRefMang1.current = setTimeout(() => {
        generateMang1StrucRolePro();
      }, 300000);
    } else {
      console.log('runningMang1 is false, clearing timeout');
      clearTimeout(timerRefMang1.current);
    }

    return () => {
      if (!runningMang1) clearTimeout(timerRefMang1.current);
    };
  }, [runningMang1]);

  useEffect(() => {
    if (runningMang2) {
      if (doneAndFullContentMang1) {
        timerRefMang2.current = setTimeout(() => {
          generateMang2RecTrainCSRPro(generatedMang1StrucRolePro);
        }, 300000);
      }
    } else {
      console.log('runningMang2 is false, clearing timeout');
      clearTimeout(timerRefMang2.current);
    }

    return () => {
      if (!runningMang2) clearTimeout(timerRefMang2.current);
    };
  }, [runningMang2]);

  useEffect(() => {
    if (runningGrowth) {
      timerRefGrowth.current = setTimeout(() => {
        generateGrowthPro();
      }, 300000);
    } else {
      console.log('runningGrowth is false, clearing timeout');
      clearTimeout(timerRefGrowth.current);
    }

    return () => {
      if (!runningGrowth) clearTimeout(timerRefGrowth.current);
    };
  }, [runningGrowth]);

  useEffect(() => {
    if (runningRisk) {
      timerRefRisk.current = setTimeout(() => {
        generateRiskPro();
      }, 300000);
    } else {
      console.log('runningRisk is false, clearing timeout');
      clearTimeout(timerRefRisk.current);
    }

    return () => {
      if (!runningRisk) clearTimeout(timerRefRisk.current);
    };
  }, [runningRisk]);

  useEffect(() => {
    if (runningExec) console.log('runningExec is true');
    if (runningSitu1) console.log('runningSitu1 is true');
    if (runningSitu2) console.log('runningSitu2 is true');
    if (runningMark1) console.log('runningMark1 is true');
    if (runningMark2) console.log('runningMark2 is true');
    if (runningMark3) console.log('runningMark3 is true');
    if (runningMark4) console.log('runningMark4 is true');
    if (runningMark5) console.log('runningMark5 is true');
    if (runningMark6) console.log('runningMark6 is true');
    if (runningOp1) console.log('runningOp1 is true');
    if (runningOp2) console.log('runningOp2 is true');
    if (runningTech1) console.log('runningTech1 is true');
    if (runningTech2) console.log('runningTech2 is true');
    if (runningGrowth) console.log('runningGrowth is true');
    if (runningMang1) console.log('runningMang1 is true');
    if (runningMang2) console.log('runningMang2 is true');
    if (runningRisk) console.log('runningRisk is true');
  }, [
    runningExec,
    runningSitu1,
    runningSitu2,
    runningMark1,
    runningMark2,
    runningMark3,
    runningMark4,
    runningMark5,
    runningMark6,
    runningOp1,
    runningOp2,
    runningTech1,
    runningTech2,
    runningGrowth,
    runningMang1,
    runningMang2,
    runningRisk,
  ]);

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
                  <strong>{t('DO NOT QUIT')}</strong>{' '}
                  {t(', it can take a while')}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {allDoneandFullContent ? (
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
          {}

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
                              <p>
                                <strong>
                                  {t(
                                    'Congratulations On Making Your First Plan!',
                                  )}
                                </strong>
                              </p>
                              <Link
                                href={{
                                  pathname: '/editPlanPro',
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
                            </div>
                          ) : (
                            <></>
                          )}

                          {loading && (
                            <div className="flex flex-col gap-4 justify-center items-center text-center">
                              <MoonLoader size={25} />
                              <div>
                                {t(
                                  'Generating plan, once done you can edit and save at the top of the page.',
                                )}{' '}
                                <strong>{t('DO NOT QUIT')}</strong>{' '}
                                {t(', it can take a while')}
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
                              __html: DOMPurify.sanitize(generatedExecPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedSitu1IndKeyPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu2SWOTPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark1ObjPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark2STPPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedMark3DecisionPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedMark4ProductPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedMark5PriceDistPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark6AdPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedOp1ActKPIsPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedOp2QCImpPlanPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedTech1AllPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedTech2DigiPro),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedMang1StrucRolePro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                generatedMang2RecTrainCSRPro,
                              ),
                            }}
                          />
                        }
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedGrowthPro),
                            }}
                          />
                        }

                        <br />

                        {readyToGeneratePlan && (
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
                        )}
                        <br />
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedRiskPro),
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
  const xPixelId = process.env.X_PIXEL_ID;
  const conversionDestinationId = process.env.GOOGLE_TAG_CONVERSION_DESTINATION;
  return {
    props: {
      secretKey,
      fbPixelId,
      conversionDestinationId,
      xPixelId,
      ...(await serverSideTranslations(locale, ['index'])),
    },
  };
}
