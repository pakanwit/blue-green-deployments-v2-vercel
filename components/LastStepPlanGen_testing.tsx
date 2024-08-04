import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import DOMPurify from 'dompurify';
import FinTable from './FinTable';
import React from 'react';
import { useSession } from 'next-auth/react';
import { saveAs } from 'file-saver';
import ReactDOMServer from 'react-dom/server';
import { event } from 'nextjs-google-analytics';
import Image from 'next/image';
import styles from '../styles/Editor.module.css';
import { BiUndo } from 'react-icons/bi';
import stylesW from '../styles/Wizard.module.css';
import { useTranslation } from 'react-i18next';
import ReviewTerms from './ReviewTerms';
import trackEvent from '../utils/trackEvent';
import Input from './input';
import { API_KEY_HEADER } from '../pages/api/constants';
import Modal from './modal';

//create interface for props
interface Props {
  loading: boolean;
  isError: boolean;
  isPaid: boolean;
  isShow: boolean;
  showFin: boolean;
  showGeneratePlanButton: boolean;

  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFin: React.Dispatch<React.SetStateAction<boolean>>;

  generatedExec: string;
  generatedSitu1: string;
  generatedSitu2: string;
  generatedMark1: string;
  callToAction: string;
  setCallToAction: React.Dispatch<React.SetStateAction<string>>;
  generatedMark2: string;
  generatedMark3: string;
  generatedMark4: string;
  generatedOp1: string;
  generatedOp2: string;
  generatedMang1: string;
  generatedMang2: string;
  generatedRisk1: string;

  setGeneratedExec: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedSitu1: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedSitu2: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMark1: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMark2: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMark3: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMark4: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedOp1: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedOp2: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMang1: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedMang2: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedRisk1: React.Dispatch<React.SetStateAction<string>>;

  setShowGeneratePlanButton: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  investmentItem1: string;
  investmentAmountItem1: number;
  setInvestmentItem1: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem1: React.Dispatch<React.SetStateAction<number>>;

  investmentItem2: string;
  investmentAmountItem2: number;
  setInvestmentItem2: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem2: React.Dispatch<React.SetStateAction<number>>;

  investmentItem3: string;
  investmentAmountItem3: number;
  setInvestmentItem3: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem3: React.Dispatch<React.SetStateAction<number>>;

  investmentItem4: string;
  investmentAmountItem4: number;
  setInvestmentItem4: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem4: React.Dispatch<React.SetStateAction<number>>;

  investmentItem5: string;
  investmentAmountItem5: number;
  setInvestmentItem5: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem5: React.Dispatch<React.SetStateAction<number>>;

  investmentItem6: string;
  investmentAmountItem6: number;
  setInvestmentItem6: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem6: React.Dispatch<React.SetStateAction<number>>;

  investmentItem7: string;
  investmentAmountItem7: number;
  setInvestmentItem7: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem7: React.Dispatch<React.SetStateAction<number>>;

  investmentItem8: string;
  investmentAmountItem8: number;
  setInvestmentItem8: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem8: React.Dispatch<React.SetStateAction<number>>;

  investmentItem9: string;
  investmentAmountItem9: number;
  setInvestmentItem9: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem9: React.Dispatch<React.SetStateAction<number>>;

  investmentItem10: string;
  investmentAmountItem10: number;
  setInvestmentItem10: React.Dispatch<React.SetStateAction<string>>;
  setInvestmentAmountItem10: React.Dispatch<React.SetStateAction<number>>;

  initialInvestmentAmount: number;
  firstYearRevenue: number;
  revenueGrowthRate: number;

  COGSP: number;
  wageCostP: number;
  markCostP: number;
  rentCostP: number;
  genCostP: number;
  depreCostP: number;
  utilCostP: number;
  otherCostP: number;
  intCostP: number;
  taxCostP: number;

  setRunGeneratePrompt: React.Dispatch<React.SetStateAction<boolean>>;

  generatePlan: () => void;

  handleBack: () => void;
  handleNextFormik: () => void;

  handleNextExample: () => void;
  handleBackExample: () => void;

  isSession: boolean;

  doneExec: boolean;
  doneSitu1: boolean;
  doneSitu2: boolean;
  doneMark1: boolean;
  doneMark2: boolean;

  // experimentID: string;
  // variantID: number;
  allDoneGenerating: boolean;
  addNewPlanDone: boolean;

  setPlanPackage: React.Dispatch<React.SetStateAction<string>>;
  setExamplePackage: React.Dispatch<React.SetStateAction<string>>;

  generatePlanStarter: () => void;
  loadingStarter: boolean;
  isErrorStarter: boolean;
  allDoneGeneratingStarter: boolean;
  showGeneratePlanButtonStarter: boolean;
  doneTimerStarter: boolean;

  generatePlanPro: () => void;
  loadingPro: boolean;
  isErrorPro: boolean;
  allDoneAndFullContentPro: boolean;
  showGeneratePlanButtonPro: boolean;
  doneTimerPro: boolean;

  generatedExecPro: string;
  generatedSitu1IndKeyPro: string;
  generatedSitu2SWOTPro: string;
  generatedMark1ObjPro: string;
  generatedMark2STPPro: string;
  generatedMark3DecisionPro: string;
  generatedMark4ProductPro: string;
  generatedMark5PriceDistPro: string;
  generatedMark6AdPro: string;
  generatedOp1ActKPIsPro: string;
  generatedOp2QCImpPlanPro: string;
  generatedTech1AllPro: string;
  generatedTech2DigiPro: string;
  generatedMang1StrucRolePro: string;
  generatedMang2RecTrainCSRPro: string;
  generatedGrowthPro: string;
  generatedRiskPro: string;

  planLanguage: string;
  planCurrency: string;
  planCurrencySymbol: string;

  country: string;

  starterPrice: string;
  setStarterPrice: React.Dispatch<React.SetStateAction<string>>;
  proPrice: string;
  setProPrice: React.Dispatch<React.SetStateAction<string>>;
  discountedStarterPrice: string;
  setDiscountedStarterPrice: React.Dispatch<React.SetStateAction<string>>;
  discountedProPrice: string;
  setDiscountedProPrice: React.Dispatch<React.SetStateAction<string>>;
  secretKey: string;
}

export default function LastStepPlanGen({
  loading,
  isError,
  isPaid,
  isShow,
  showFin,
  showGeneratePlanButton,

  setIsError,
  setIsPaid,
  setIsShow,
  setShowFin,

  generatedExec,
  generatedSitu1,
  generatedSitu2,
  generatedMark1,
  callToAction,
  setCallToAction,
  generatedMark2,
  generatedMark3,
  generatedMark4,
  generatedOp1,
  generatedOp2,
  generatedMang1,
  generatedMang2,
  generatedRisk1,

  setGeneratedExec,
  setGeneratedSitu1,
  setGeneratedSitu2,
  setGeneratedMark1,
  setGeneratedMark2,
  setGeneratedMark3,
  setGeneratedMark4,
  setGeneratedOp1,
  setGeneratedOp2,
  setGeneratedMang1,
  setGeneratedMang2,
  setGeneratedRisk1,

  setShowGeneratePlanButton,
  setLoading,

  investmentItem1,
  investmentAmountItem1,
  setInvestmentItem1,
  setInvestmentAmountItem1,

  investmentItem2,
  investmentAmountItem2,
  setInvestmentItem2,
  setInvestmentAmountItem2,

  investmentItem3,
  investmentAmountItem3,
  setInvestmentItem3,
  setInvestmentAmountItem3,

  investmentItem4,
  investmentAmountItem4,
  setInvestmentItem4,
  setInvestmentAmountItem4,

  investmentItem5,
  investmentAmountItem5,
  setInvestmentItem5,
  setInvestmentAmountItem5,

  investmentItem6,
  investmentAmountItem6,
  setInvestmentItem6,
  setInvestmentAmountItem6,

  investmentItem7,
  investmentAmountItem7,
  setInvestmentItem7,
  setInvestmentAmountItem7,

  investmentItem8,
  investmentAmountItem8,
  setInvestmentItem8,
  setInvestmentAmountItem8,

  investmentItem9,
  investmentAmountItem9,
  setInvestmentItem9,
  setInvestmentAmountItem9,

  investmentItem10,
  investmentAmountItem10,
  setInvestmentItem10,
  setInvestmentAmountItem10,

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

  generatePlan,
  setRunGeneratePrompt,

  handleBack,
  handleNextFormik,

  handleNextExample,
  handleBackExample,
  isSession,

  doneExec: doneExecFromMainWizard,
  doneSitu1: doneSitu1FromMainWizard,
  doneSitu2: doneSitu2FromMainWizard,
  doneMark1: doneMark1FromMainWizard,
  doneMark2: doneMark2FromMainWizard,

  // experimentID,
  // variantID,
  allDoneGenerating,
  addNewPlanDone,

  setPlanPackage,
  setExamplePackage,

  generatePlanStarter,
  loadingStarter,
  isErrorStarter,
  allDoneGeneratingStarter,
  showGeneratePlanButtonStarter,
  doneTimerStarter,

  generatePlanPro,
  loadingPro,
  isErrorPro,
  allDoneAndFullContentPro,
  showGeneratePlanButtonPro,
  doneTimerPro,

  generatedExecPro,
  generatedSitu1IndKeyPro,
  generatedSitu2SWOTPro,
  generatedMark1ObjPro,
  generatedMark2STPPro,
  generatedMark3DecisionPro,
  generatedMark4ProductPro,
  generatedMark5PriceDistPro,
  generatedMark6AdPro,
  generatedOp1ActKPIsPro,
  generatedOp2QCImpPlanPro,
  generatedTech1AllPro,
  generatedTech2DigiPro,
  generatedMang1StrucRolePro,
  generatedMang2RecTrainCSRPro,
  generatedGrowthPro,
  generatedRiskPro,

  planLanguage,
  planCurrency,
  planCurrencySymbol,
  country,

  starterPrice,
  setStarterPrice,
  proPrice,
  setProPrice,
  discountedStarterPrice,
  setDiscountedStarterPrice,
  discountedProPrice,
  setDiscountedProPrice,
  secretKey,
}: Props) {
  const { t, i18n } = useTranslation('LastStepPlanGen');

  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    fn: () => {},
  });
  const [saveAsWordLoading, setSaveAsWordLoading] = useState(false);

  const [userData, setuserData] = useState(null);
  const [getUserDataloading, setGetUserDataLoading] = useState(true);
  const [userDataIsError, setUserDataIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const { data: session } = useSession();
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_8_back_button',
      is_clean_case: true,
    });
    handleBack();
  };
  // useEffect(() => { ******************uncomment when ready******************
  //   window.scrollTo(0, 0);
  // }, []);

  const finTableHtml = ReactDOMServer.renderToString(
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

      planLanguage: planLanguage,
      planCurrency: planCurrency,
      planCurrencySymbol: planCurrencySymbol,
    }),
  );

  function updateHeadingTags(htmlContent) {
    return htmlContent
      .replace(/<(\/?)h3>/g, '<$1h1>')
      .replace(/<(\/?)h4>/g, '<$1h2>')
      .replace(/<(\/?)h5>/g, '<$1h3>')
      .replace(/<(\/?)h6>/g, '<$1h4>');
  }

  const handleGeneratePlan = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    generatePlan();
    localStorage.removeItem('formData');
  };

  const formData = JSON.parse(localStorage.getItem('formData'));

  const handleGeneratePlanStarter = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    setWarningModal({ isOpen: false, fn: () => {} });
    generatePlanStarter();
    localStorage.removeItem('formData');
  };
  const handleGeneratePlanPro = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    setWarningModal({ isOpen: false, fn: () => {} });
    generatePlanPro();
    localStorage.removeItem('formData');
  };
  async function saveAsWord() {
    // Set setSaveAsWordLoading to true for 10 seconds then set it to false
    setSaveAsWordLoading(true);
    setTimeout(() => {
      setSaveAsWordLoading(false);
    }, 10000);

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
        </head>
        <body>
          ${DOMPurify.sanitize(generatedExec)}
          ${DOMPurify.sanitize(generatedSitu1)}
          ${DOMPurify.sanitize(generatedSitu2)}
          ${DOMPurify.sanitize(generatedMark1)}
          ${DOMPurify.sanitize(generatedMark2)}
          ${DOMPurify.sanitize(generatedMark3)}
          ${DOMPurify.sanitize(generatedMark4)}
          ${DOMPurify.sanitize(generatedOp1)}
          ${DOMPurify.sanitize(generatedMang1)}
          ${finTableHtml}
          ${DOMPurify.sanitize(generatedRisk1)}
        </body>
      </html>
    `;

    const newHeadingHtmlContent = updateHeadingTags(htmlContent);

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

  useEffect(() => {
    if (!session) return;

    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      setGetUserDataLoading(true);
      const res = await fetch('/api/getAllUserData', {
        headers: {
          [API_KEY_HEADER]: secretKey,
        },
      });
      const data = await res.json();
      setuserData(data);

      if (data) {
        setGetUserDataLoading(false);
        if (data.paymentStatus === 'paid' && data.paymentId) {
          setPaid(true);
          clearInterval(interval); // Clear the interval when paymentStatus is "paid"
          return;
        }
      } else {
        setUserDataIsError(true);
      }

      counter++; // Increment the counter

      // Clear the interval and stop fetching if the counter reaches 5
      if (counter >= 5) {
        clearInterval(interval);
        setPaymentError(true);
      }
    }

    fetchUserData(); // Fetch data initially

    // Call the fetchUserData function every 5 seconds (5000 ms)
    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [addNewPlanDone]);

  useEffect(() => {
    setRunGeneratePrompt(true);
  }, []);

  const [previewQuota, setPreviewQuota] = useState(10);
  const [editLimitReached, setEditLimitReached] = useState(false);

  useEffect(() => {
    if (previewQuota <= 0) {
      setEditLimitReached(true);
    }
  }, [previewQuota]);

  async function savePreviewEditFunc(editInput, sectionOrigin) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/savePreviewEdit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInput,
            sectionOrigin,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  //Exec form-------------------------------------------------------------------------------
  const [editInputExec, setEditInputExec] = useState('');
  const [isErrorExec, setIsErrorExec] = useState(false);
  const [isLoadingExec, setLoadingExec] = useState(false);
  const [doneExec, setDoneExec] = useState(false);
  const [prevGeneratedExec, setPrevGeneratedExec] = useState('');
  const [currentExIdStateExec, setCurrentExIdStateExec] = useState(0);
  const [showUndoExec, setShowUndoExec] = useState(false);
  const [focusExec, setFocusExec] = useState(false);
  const [toggleFocusExec, setToggleFocusExec] = useState(false);

  const [editedExec, setEditedExec] = useState('');

  const handleEditExec = (event) => {
    setEditInputExec(event.target.value);
  };

  const inputRefExec = useRef<HTMLInputElement>(null);
  const handleSubmitExec = (event) => {
    event.preventDefault();
    setToggleFocusExec(false);
    setPrevGeneratedExec(generatedExec);
    setEditedExec('');
    savePreviewEditFunc(editInputExec, 'Exec');
    editExec();
  };

  useEffect(() => {
    console.log('focusExec useEffect triggering', focusExec);
    if (focusExec && inputRefExec.current) {
      inputRefExec.current.focus();
      const elementRect = inputRefExec.current.getBoundingClientRect();
      if (elementRect) {
        const topPositionToScroll =
          elementRect.top + window.scrollY - window.innerHeight / 2;
        window.scrollTo({ top: topPositionToScroll, behavior: 'smooth' });
      }
      setFocusExec(false);
    }
  }, [focusExec]);

  // if prevContnetExec is empty then showUndoExec is false
  useEffect(() => {
    if (prevGeneratedExec === '') {
      setShowUndoExec(false);
    } else {
      setShowUndoExec(true);
    }
  }, [prevGeneratedExec]);

  const UndoChangeExec = () => {
    setIsErrorExec(false);
    setLoadingExec(false);
    setEditedExec(prevGeneratedExec);
  };

  const exIdRefExec = useRef(0);
  // this function generates edited content for the user
  async function editExec() {
    const currentExIdExec = Date.now(); // Generate a unique ex ID
    exIdRefExec.current = currentExIdExec;
    setCurrentExIdStateExec(currentExIdExec);
    setLoadingExec(true);

    let promptContentExec = '';
    if (editedExec) promptContentExec = editedExec;
    else promptContentExec = generatedExec;

    const exec = await fetch('/api/editPreviewApi/editPreview1Exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        promptContentExec,
        editInputExec,
      }),
    });

    console.log('Edge function returned.');

    if (!exec.ok) {
      setIsErrorExec(true);
      setLoadingExec(false);
      return;
    }

    // This data is a ReadableStream
    const execStream = exec.body;
    if (!execStream) {
      setIsErrorExec(true);
      setLoadingExec(false);
      return;
    }

    // use state to keep track of quota
    setPreviewQuota((prev) => prev - 1);
    if (previewQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerExec = execStream.getReader();
    const decoderExec = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneExecReading } = await readerExec.read();
      done = doneExecReading;
      const chunkValue = decoderExec.decode(value);
      if (exIdRefExec.current === currentExIdExec) {
        setEditedExec((prev) => prev + chunkValue);
        setToggleFocusExec(true);
      } else {
        // If the ex ID has changed, break the loop
        break;
      }
    }

    if (exIdRefExec.current === currentExIdExec) {
      setDoneExec(true);
      setLoadingExec(false);
    }
  }

  useEffect(() => {
    if (exIdRefExec.current === currentExIdStateExec && doneExec) {
      setDoneExec(false);
    }
  }, [editedExec, doneExec]);

  useEffect(() => {
    if (toggleFocusExec) {
      setFocusExec(true);
    }
  }, [toggleFocusExec]);
  // end of exec form code -------------------------------------------------------------------------------

  const [planId, setPlanId] = useState(null);
  //get the last array number in userData.plans array and setPlanId to that number
  useEffect(() => {
    if (userData) {
      if (userData.plans.length > 0) {
        console.log('userData.plans.length - 1', userData.plans.length - 1);
        setPlanId(userData.plans.length - 1);
      }
    }
  }, [userData]);

  // Get today's date
  const today = new Date();

  // Subtract one day to get yesterday's date
  today.setDate(today.getDate() - 2);

  // Format the date in MM/DD/YYYY format
  const formattedDate =
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    today.getDate().toString().padStart(2, '0') +
    '/' +
    today.getFullYear();

  //when alldonegenerating is true set a timer for 10 seconds and then set doneTimer to false
  const [doneTimer, setDoneTimer] = useState(true);
  useEffect(() => {
    if (allDoneGenerating) {
      setTimeout(() => {
        setDoneTimer(false);
      }, 15000);
    }
  }, [allDoneGenerating]);

  function getProPackage() {
    trackEvent({
      event_name: 'professional_cta_button',
    });
    setPlanPackage('professional');
    handleNextFormik();
  }

  function getStarterPackage() {
    trackEvent({
      event_name: 'starter_cta_button',
    });
    setPlanPackage('starter');
    handleNextFormik();
  }

  function viewExamplePro() {
    setExamplePackage('professional');
    handleNextExample();
  }

  function viewExampleStarter() {
    setExamplePackage('starter');
    handleNextExample();
  }

  const refStarter = useRef(null);
  const refPro = useRef(null);

  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: 'smooth' });

  let packageImgSrcSM = '';
  let packageImgSrcLG = '';

  if (i18n.language === 'en') {
    packageImgSrcSM = '/img/packageComp1EN_SM.png';
    packageImgSrcLG = '/img/packageComp2EN_LG.png';
  } else if (i18n.language === 'de') {
    packageImgSrcSM = '/img/packageComp3DE_SM.png';
    packageImgSrcLG = '/img/packageComp4DE_LG.png';
  } else if (i18n.language === 'fr') {
    packageImgSrcSM = '/img/packageComp5FR_SM.png';
    packageImgSrcLG = '/img/packageComp6FR_LG.png';
  } else if (i18n.language === 'es') {
    packageImgSrcSM = '/img/packageComp7ES_SM.png';
    packageImgSrcLG = '/img/packageComp8ES_LG.png';
  } else if (i18n.language === 'it') {
    packageImgSrcSM = '/img/packageComp9IT_SM.png';
    packageImgSrcLG = '/img/packageComp10IT_LG.png';
  } else if (i18n.language === 'nl') {
    packageImgSrcSM = '/img/packageComp11NL_SM.png';
    packageImgSrcLG = '/img/packageComp12NL_LG.png';
  } else if (i18n.language === 'ja') {
    packageImgSrcSM = '/img/packageComp13JA_SM.png';
    packageImgSrcLG = '/img/packageComp14JA_LG.png';
  } else if (i18n.language === 'sv') {
    packageImgSrcSM = '/img/packageComp15SV_SM.png';
    packageImgSrcLG = '/img/packageComp16SV_LG.png';
  } else if (i18n.language === 'fi') {
    packageImgSrcSM = '/img/packageComp17FI_SM.png';
    packageImgSrcLG = '/img/packageComp18FI_LG.png';
  } else if (i18n.language === 'da') {
    packageImgSrcSM = '/img/packageComp19DA_SM.png';
    packageImgSrcLG = '/img/packageComp20DA_LG.png';
  } else if (i18n.language === 'no') {
    packageImgSrcSM = '/img/packageComp21NO_SM.png';
    packageImgSrcLG = '/img/packageComp22NO_LG.png';
  } else {
    packageImgSrcSM = '/img/packageComp1EN_SM.png';
    packageImgSrcLG = '/img/packageComp2EN_LG.png';
  }
  const [priceAbb, setPriceAbb] = useState('');

  const variantIDFromLocal = localStorage.getItem('variantID');

  console.log('country: ', country);

  useEffect(() => {
    console.log('country from laststep: ', country);
    const variantID = localStorage.getItem('variantID');
    if (country) {
      const currencyMappingsVAR1 = {
        AE: {
          currency: 'AED',
          starterPrice: 'د.إ365',
          proPrice: 'د.إ499',
          discountedStarterPrice: 'د.إ255',
          discountedProPrice: 'د.إ349',
        },
        AU: {
          currency: 'AUD',
          starterPrice: 'A$ 155',
          proPrice: 'A$ 219',
          discountedStarterPrice: 'A$ 108',
          discountedProPrice: 'A$ 153',
        },
        CA: {
          currency: 'CAD',
          starterPrice: 'CA$ 135',
          proPrice: 'CA$ 189',
          discountedStarterPrice: 'CA$ 94',
          discountedProPrice: 'CA$ 132',
        },
        CH: {
          currency: 'CHF',
          starterPrice: 'CHF 89',
          proPrice: 'CHF 125',
          discountedStarterPrice: 'CHF 62',
          discountedProPrice: 'CHF 88',
        },
        EU: {
          currency: 'EUR',
          starterPrice: '€95',
          proPrice: '€129',
          discountedStarterPrice: '€66',
          discountedProPrice: '€90',
        },
        GB: {
          currency: 'GBP',
          starterPrice: '£79',
          proPrice: '£109',
          discountedStarterPrice: '£55',
          discountedProPrice: '£76',
        },
        NZ: {
          currency: 'NZD',
          starterPrice: 'NZ$ 169',
          proPrice: 'NZ$ 235',
          discountedStarterPrice: 'NZ$ 118',
          discountedProPrice: 'NZ$ 164',
        },
        SG: {
          currency: 'SGD',
          starterPrice: 'SGD 135',
          proPrice: 'SGD 189',
          discountedStarterPrice: 'SGD 94',
          discountedProPrice: 'SGD 132',
        },
        ZA: {
          currency: 'ZAR',
          starterPrice: 'R1,850',
          proPrice: 'R2,590',
          discountedStarterPrice: 'R1,295',
          discountedProPrice: 'R1,813',
        },
        HK: {
          currency: 'HKD',
          starterPrice: 'HK$ 779',
          proPrice: 'HK$ 1,090',
          discountedStarterPrice: 'HK$ 545',
          discountedProPrice: 'HK$ 763',
        },
        SE: {
          currency: 'SEK',
          starterPrice: '1,090kr',
          proPrice: '1,490kr',
          discountedStarterPrice: '763kr',
          discountedProPrice: '1,043kr',
        },
        DK: {
          currency: 'DKK',
          starterPrice: '709kr',
          proPrice: '990kr',
          discountedStarterPrice: '496kr',
          discountedProPrice: '693kr',
        },
        NO: {
          currency: 'NOK',
          starterPrice: '1090kr',
          proPrice: '1490kr',
          discountedStarterPrice: '763kr',
          discountedProPrice: '1,043kr',
        },
        JP: {
          currency: 'JPY',
          starterPrice: '¥14,900',
          proPrice: '¥20,900',
          discountedStarterPrice: '¥10,430',
          discountedProPrice: '¥14,630',
        },
        QA: {
          currency: 'QAR',
          starterPrice: 'QR 359',
          proPrice: 'QR 509',
          discountedStarterPrice: 'QR 251',
          discountedProPrice: 'QR 356',
        },
        SA: {
          currency: 'SAR',
          starterPrice: 'SR 379',
          proPrice: 'SR 519',
          discountedStarterPrice: 'SR 265',
          discountedProPrice: 'SR 363',
        },
        IN: {
          currency: 'INR',
          starterPrice: '₹2,990',
          proPrice: '₹3,990',
          discountedStarterPrice: '₹2,093',
          discountedProPrice: '₹2,793',
        },
        AR: {
          currency: 'ARS',
          starterPrice: 'ARS 29,000',
          proPrice: 'ARS 39,500',
          discountedStarterPrice: 'ARS 20,300',
          discountedProPrice: 'ARS 27,650',
        },
        CL: {
          currency: 'CLP',
          starterPrice: 'CLP 32,900',
          proPrice: 'CLP 43,900',
          discountedStarterPrice: 'CLP 23,030',
          discountedProPrice: 'CLP 30,730',
        },
        BR: {
          currency: 'BRL',
          starterPrice: 'R$ 175',
          proPrice: 'R$ 235',
          discountedStarterPrice: 'R$ 122',
          discountedProPrice: 'R$ 164',
        },
      };
      // split test code here
      const currencyMappingsVAR2 = {
        AE: {
          currency: 'AED',
          starterPrice: 'د.إ249',
          proPrice: 'د.إ365',
        },
        AR: {
          currency: 'ARS',
          starterPrice: 'ARS 29,000',
          proPrice: 'ARS 39,500',
        },
        AU: {
          currency: 'AUD',
          starterPrice: 'A$ 109',
          proPrice: 'A$ 155',
        },
        BR: {
          currency: 'BRL',
          starterPrice: 'R$ 175',
          proPrice: 'R$ 235',
        },
        CA: {
          currency: 'CAD',
          starterPrice: 'CA$ 95',
          proPrice: 'CA$ 135',
        },
        CH: {
          currency: 'CHF',
          starterPrice: 'CHF 65',
          proPrice: 'CHF 89',
        },
        CL: {
          currency: 'CLP',
          starterPrice: 'CLP 32,900',
          proPrice: 'CLP 43,900',
        },
        DK: {
          currency: 'DKK',
          starterPrice: '479kr',
          proPrice: '709kr',
        },
        EU: {
          currency: 'EUR',
          starterPrice: '€65',
          proPrice: '€95',
        },
        GB: {
          currency: 'GBP',
          starterPrice: '£55',
          proPrice: '£79',
        },
        HK: {
          currency: 'HKD',
          starterPrice: 'HK$ 539',
          proPrice: 'HK$ 779',
        },
        IN: {
          currency: 'INR',
          starterPrice: '₹2,990',
          proPrice: '₹3,990',
        },
        JP: {
          currency: 'JPY',
          starterPrice: '¥10,900',
          proPrice: '¥14,900',
        },
        NO: {
          currency: 'NOK',
          starterPrice: '765kr',
          proPrice: '1090kr',
        },
        NZ: {
          currency: 'NZD',
          starterPrice: 'NZ$ 115',
          proPrice: 'NZ$ 169',
        },
        QA: {
          currency: 'QAR',
          starterPrice: 'QR 249',
          proPrice: 'QR 359',
        },
        SA: {
          currency: 'SAR',
          starterPrice: 'SR 259',
          proPrice: 'SR 379',
        },
        SE: {
          currency: 'SEK',
          starterPrice: '759kr',
          proPrice: '1,090kr',
        },
        SG: {
          currency: 'SGD',
          starterPrice: 'SGD 95',
          proPrice: 'SGD 135',
        },
        ZA: {
          currency: 'ZAR',
          starterPrice: 'R1,290',
          proPrice: 'R1,850',
        },
      };

      const euroCountries = [
        'DE',
        'FR',
        'IT',
        'ES',
        'NL',
        'BE',
        'LU',
        'IE',
        'PT',
        'AT',
        'FI',
        'GR',
        'CY',
        'MT',
        'EE',
        'LV',
        'LT',
        'SK',
        'SI',
      ];

      const countryMapping = currencyMappingsVAR2[country];

      if (!euroCountries.includes(country) && countryMapping) {
        console.log('not euro country inside: ', country);
        setPriceAbb(`(${countryMapping.currency})`);
        setStarterPrice(countryMapping.starterPrice);
        setProPrice(countryMapping.proPrice);
        // setDiscountedStarterPrice(countryMapping.discountedStarterPrice);
        // setDiscountedProPrice(countryMapping.discountedProPrice);
      } else if (euroCountries.includes(country)) {
        console.log('is euro country inside: ', country);
        setPriceAbb('(EUR)');
        setStarterPrice('€65');
        setProPrice('€95');
        // setDiscountedStarterPrice('€66');
        // setDiscountedProPrice('€90');
      } else {
        console.log('no country match inside: ', country);
        setPriceAbb('(USD)');
        setStarterPrice('$69');
        setProPrice('$99');
        // setDiscountedStarterPrice('$69');
        // setDiscountedProPrice('$97');
      }
    } else {
      console.log('no country: ', country);
      setPriceAbb('(USD)');
      setStarterPrice('$69');
      setProPrice('$99');
      // setDiscountedStarterPrice('$69');
      // setDiscountedProPrice('$97');
    }
  }, [country]);

  // for testing ---------------------------
  // useEffect(() => {
  //   setIsShow(true);
  //   setIsError(false);
  //   setPaid(false);
  // }, []);

  //log paid
  useEffect(() => {
    console.log('is paid: ', paid);
  }, [paid]);

  const [textAlign, setTextAlign] = useState('');

  useEffect(() => {
    if (planLanguage === 'ar') {
      setTextAlign('text-right');
    }
  }, [planLanguage]);

  const [showReviewTerms, setShowReviewTerms] = useState(false);

  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    console.log('showReviewTerms: ', showReviewTerms);
    toggleBodyScroll(showReviewTerms);
    return () => toggleBodyScroll(false);
  }, [showReviewTerms]);

  function setShowReviewTermsFalse(event) {
    event.stopPropagation(); // Prevent event from propagating to parent elements
    console.log('Setting showReviewTerms to false: ', showReviewTerms);
    setShowReviewTerms(false);
  }

  return (
    <div>
      {!session ? noSession() : <></>}
      {userData && session && !paid ? noSession() : <></>}
      {userData &&
      session &&
      userData.planPackage === 'professional' &&
      paid ? (
        sessionPro()
      ) : (
        <></>
      )}
      {userData && session && userData.planPackage === 'starter' && paid ? (
        sessionStarter()
      ) : (
        <></>
      )}
      {userData && session && !userData.planPackage && paid ? (
        sessionStarter()
      ) : (
        <></>
      )}
      {session && !userData ? (
        <div className="flex justify-center items-center mt-32">
          <MoonLoader size={30} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  function noSession() {
    return (
      <>
        <motion.div
          key="component-seven"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overflow">
            {loading && !session ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    <MoonLoader size={20} />
                  </div>
                  <div className="">
                    {t(
                      'Generating plan... once done you can get the full plan at the end of the page. DO NOT QUIT, this can take a minute',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {allDoneGenerating && doneTimer && !session ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-1 items-center justify-center">
                  <div>
                    <strong>{t('All done!')}</strong>{' '}
                    {t('you can get the full plan at the end of the page')}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <ReviewTerms
              showReviewTerms={showReviewTerms}
              setShowReviewTerms={setShowReviewTerms}
              starterPrice={starterPrice}
              proPrice={proPrice}
              discountedStarterPrice={discountedStarterPrice}
              discountedProPrice={discountedProPrice}
              setPlanPackage={setPlanPackage}
              handleNextFormik={handleNextFormik}
              setShowReviewTermsFalse={setShowReviewTermsFalse}
            />
            <div className="section-full wf-section">
              <div className="get-started">
                <div className="form-bg">
                  <div className="form-block-started w-form">
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isError && (
                        <div
                          className="flex flex-col gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative text-center"
                          role="alert"
                        >
                          <strong className="font-bold text-red-700">
                            {t('Failed to generate business plan')}
                          </strong>
                          <span className="block sm:inline">
                            {t(
                              'OpenAI servers might be down, please try again later, retry on',
                            )}{' '}
                            <strong className="text-red-700">{t('PC')}</strong>,{' '}
                            {t('or try using a')}{' '}
                            <strong className="text-red-700">
                              {t('different browser')}
                            </strong>
                          </span>
                          <button onClick={generatePlan} className="button">
                            {t('Regenerate Plan')}
                          </button>
                        </div>
                      )}
                    </div>

                    {showGeneratePlanButton && (
                      <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            className="button back-button white w-button"
                            onClick={handleBackButton}
                          >
                            {t('Back')}
                          </button>
                          <button
                            className="button"
                            onClick={handleGeneratePlan}
                          >
                            {t('Generate Plan')}
                          </button>
                        </div>
                        <div className="flex justify-center items-center text-center">
                          <p>
                            {t(
                              'Note: Please check your inputs before generating plan, once you click generate plan you will not be able to edit your inputs',
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-block-started w-form">
                    {loading ? (
                      <div className="flex flex-col gap-5 justify-center items-center text-center mb-10">
                        <MoonLoader size={30} />
                        <strong>
                          {t(
                            "We're generating parts of the plan for you, once done loading you can get the full plan at the end of the page",
                          )}
                        </strong>
                      </div>
                    ) : (
                      <></>
                    )}

                    {!loading && allDoneGenerating && !isError && !paid ? (
                      <div className="flex justify-center items-center text-center mb-10">
                        <strong>
                          {t(
                            "We've generated parts of the plan for you. To get full plan, go to the end of the page to proceed",
                          )}
                        </strong>
                      </div>
                    ) : (
                      <></>
                    )}

                    {!isError && (
                      <div className="font-segoe">
                        <hr />
                        <br />
                        {editedExec ? (
                          <div
                            className={textAlign}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(editedExec),
                            }}
                          />
                        ) : (
                          <div
                            className={textAlign}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedExec),
                            }}
                          />
                        )}
                        {doneExecFromMainWizard && !session ? (
                          <form
                            className="flex flex-col justify-center items-center mt-20 font-poppins border border-gray-700 rounded-xl p-6 relative"
                            onSubmit={handleSubmitExec}
                          >
                            <div className="absolute top-[-65px] left-1/2 transform -translate-x-1/2 bg-white px-2 whitespace-nowrap">
                              <i>{t('Try Our AI Edit Feature!')}</i>
                            </div>

                            <Image
                              src="/img/TalkToPlan.png"
                              width={250}
                              height={40}
                              alt="logo"
                              className="absolute top-[-63px] left-1/2 transform -translate-x-1/2"
                            />
                            <div className={`${styles.label} mb-4 mt-8`}>
                              {t('What would you like to change about the')}{' '}
                              <strong>{t('Executive Summary')}</strong>{' '}
                              {t('above?')}
                            </div>
                            <Input
                              type="text"
                              value={editInputExec}
                              onChange={handleEditExec}
                              placeholder={t(
                                `E.g. replace business origins topic with product description topic`,
                              )}
                              className={styles.text_input}
                              ref={inputRefExec}
                              page="last_page_editor_starter"
                              id="editInputExec"
                              name="editInputExec"
                            />
                            <div className="text-sm">
                              {t(
                                "Note: changes here won't apply to the final plan so you can explore freely. Full editing will be available once unlocked at the end of the page.",
                              )}
                            </div>
                            <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                              {!isLoadingExec &&
                              !isErrorExec &&
                              !editLimitReached ? (
                                <>
                                  {showUndoExec && (
                                    <button
                                      type="button"
                                      className="transparent-button-small  flex items-center"
                                      onClick={UndoChangeExec}
                                    >
                                      {t('Undo Change')}
                                      <div className="w-1"></div>{' '}
                                      <BiUndo size={20} />
                                    </button>
                                  )}
                                  <button
                                    type="submit"
                                    className="button-small"
                                  >
                                    {t('Make Change')}
                                  </button>
                                </>
                              ) : (
                                <>
                                  {isLoadingExec && (
                                    <div className="flex flex-col justify-center items-center text-center gap-3">
                                      <MoonLoader size={25} />
                                    </div>
                                  )}
                                  {isErrorExec && (
                                    <div className="flex flex-col">
                                      <div className="error-box w-full">
                                        {t(
                                          'Error editing Executive Summary, click Undo Change and Try Again',
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        className="transparent-button-small flex items-center"
                                        onClick={UndoChangeExec}
                                      >
                                        {t('Undo Change')}
                                        <div className="w-1"></div>{' '}
                                        <BiUndo size={20} />
                                      </button>
                                    </div>
                                  )}
                                  {editLimitReached && (
                                    <div className="flex-col justify-center items-center">
                                      <div className="error-box w-full">
                                        {t(
                                          'Edit Quota Limit reached, go to the end of the page to unlock full editing',
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </form>
                        ) : (
                          <></>
                        )}

                        <br />
                        <div className={textAlign}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu1),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu2),
                            }}
                          />

                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark1),
                            }}
                          />

                          <br />
                          <div className="relative">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(generatedMark2),
                              }}
                            />
                            {!paid && isShow ? (
                              <div className="absolute bottom-0 w-full h-60 bg-gradient-to-t from-white"></div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {isShow && !isError && !paid ? (
                      <div
                        className="shadow-lg rounded-xl relative text-center flex flex-col items-center justify-center p-5 m-auto"
                        role="alert"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <h5 className="font-bold">
                            {' '}
                            {t('Unlock Business Plan With a One-time Fee Of..')}
                          </h5>
                          <br />
                          <button
                            onClick={() => scrollToRef(refPro)}
                            className="text-7xl text-black flex gap-2"
                          >
                            {proPrice}
                            <span className="text-lg">
                              {priceAbb + t(' for professional package')}
                            </span>
                          </button>
                          <div className="">{t('Or')}</div>
                          <br />
                          <button
                            onClick={() => scrollToRef(refStarter)}
                            className="text-7xl text-black flex gap-2"
                          >
                            {starterPrice}
                            <span className="text-lg">
                              {priceAbb + t(' for starter package')}
                            </span>
                          </button>
                        </div>

                        <br />
                        <br />

                        {/* <p className="block sm:inline mb-0">{callToAction}</p> */}

                        <p className="text-2xl">
                          <strong>{t('What Our Customers Say')}</strong>
                        </p>
                        <div className="w-layout-grid grid-3-columns">
                          <div className="">
                            <p className="text-xl">
                              <strong>{t('Zede H.')}</strong>
                            </p>
                            <Image
                              src="/img/zede1.png"
                              width={500}
                              height={500}
                              quality={100}
                              alt=""
                            />
                            <br />
                          </div>

                          <div className="">
                            <p className="text-xl">
                              <strong>{t('Jason C.')}</strong>
                            </p>
                            <Image
                              src="/img/jason1.png"
                              width={500}
                              height={500}
                              quality={100}
                              alt=""
                            />
                            <br />
                          </div>

                          <div className="">
                            <p className="text-xl">
                              <strong>{t('Parker A.')}</strong>
                            </p>
                            <Image
                              src="/img/parker1.png"
                              width={500}
                              height={500}
                              quality={100}
                              alt=""
                            />
                            <br />
                          </div>
                        </div>

                        <p className="text-2xl mt-10">
                          <strong>{t('Mentioned In..')}</strong>
                        </p>

                        <div className="flex flex-wrap gap-10 justify-center items-center mb-16 p-3">
                          <Image
                            src={'/img/AsMentionLogos/AP_logo_rmb.png'}
                            alt="AP_logo"
                            width={67.2}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/yahoo_logo_rmb.png'}
                            alt="yahoo_logo"
                            width={126}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/marketWatch_logo_rmb.svg'}
                            alt="marketWatch_logo"
                            width={168}
                            height={84}
                          />

                          <Image
                            src={
                              '/img/AsMentionLogos/Bloomberg_Terminal_logo_rmb.png'
                            }
                            alt="Bloomberg_Terminal_logo"
                            width={126}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/Medium_logo_rmb.png'}
                            alt="Medium_logo"
                            width={168}
                            height={84}
                          />

                          <Image
                            src={
                              '/img/AsMentionLogos/seeking_alpha_logo_rmb.png'
                            }
                            alt="seeking_alpha_logo"
                            width={168}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/finanzen_logo_rmb.png'}
                            alt="finanzen_logo"
                            width={168}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/benzinga_logo_rmb.png'}
                            alt="benzinga_logo"
                            width={168}
                            height={84}
                          />

                          <Image
                            src={'/img/AsMentionLogos/10web_logo_rmb.png'}
                            alt="10web_logo"
                            width={168}
                            height={84}
                          />
                        </div>

                        <div className="border p-4 rounded-xl bg-sky-100 border-sky-600 mb-8">
                          <div className="mt-3 mb-3">
                            <strong className="text-2xl">
                              {t(
                                'There are many business plan softwares out there...',
                              )}
                            </strong>
                          </div>
                          {t('...including popular ones like')}{' '}
                          <strong>{t('LivePlan')}</strong>,{' '}
                          <strong>{t('PlanBuildr')}</strong>,{' '}
                          <strong>{t('IdeaBuddy')}</strong>, {t(', and')}{' '}
                          <strong>{t('Enloop')}</strong>.{' '}
                          {t(
                            'They all require you to manually write the business plan yourself(LivePlan, IdeaBuddy) or provide you with a very generic template(PlanBuildr, Enloop). Additionally, manual business plan services could easily cost you more than',
                          )}{' '}
                          <strong> 700 USD </strong> {t('for a single plan')}.{' '}
                          {t(
                            'Many manual business plan services actually use our product and sell our plans for a large profit.',
                          )}{' '}
                          {t('Last we checked at')} {formattedDate},{' '}
                          <strong>{t('15minuteplan.ai')}</strong>{' '}
                          {t(
                            'is the only AI Business Plan Generator that can generate up to 10 business plans specifically for',
                          )}{' '}
                          <strong>{t('you')}</strong> {t('at the')}{' '}
                          <strong>{t('fraction')}</strong>{' '}
                          {t('of the cost of professional services')}.{' '}
                          {t(
                            'We encourage you to try out the other products and see for yourself. If you find a product that makes a business plan that matches our quality and value-for-money send us a link and you can use our product for free.',
                          )}
                          <br />
                          <div className="mt-3 mb-3">
                            <strong>
                              {t(
                                "We've made our product with love and we 100% stand behind it so we'd be thrilled if you give our product a try.",
                              )}
                            </strong>
                          </div>
                        </div>

                        <div className="flex-col justify-center items-center">
                          <div className="text-2xl mt-6">
                            <strong>
                              {t('Freelance Business Plan Service Prices')}
                            </strong>{' '}
                            <strong className="underline">
                              {t('For 1 Plan')}
                            </strong>
                          </div>
                          <img
                            src="/img/fiverr_price.png"
                            alt="package comparison"
                            width="840"
                          />
                        </div>

                        <div className="mt-5">
                          <p className="text-2xl">
                            <strong>
                              {t(
                                'With 15minuteplan.ai you can choose from 2 packages..',
                              )}
                            </strong>
                          </p>
                          <picture className="flex justify-center items-center">
                            <source
                              srcSet={packageImgSrcLG}
                              media="(max-width: 768px)"
                            />
                            <img
                              src={packageImgSrcSM}
                              alt="package comparison"
                              width="650"
                            />
                          </picture>
                          <div className="flex justify-center items-center mt-5 gap-2">
                            <div className="w-1/2 flex justify-center mr-1">
                              <button
                                onClick={viewExampleStarter}
                                className="transparent-button-small-example mb-5"
                              >
                                {t('View Starter Example Plan')}
                              </button>
                            </div>
                            <div className="w-1/2 flex justify-center ml-1">
                              {' '}
                              <button
                                onClick={viewExamplePro}
                                className="transparent-button-small-example mb-5"
                              >
                                {t('View Professional Example Plan')}
                              </button>
                            </div>
                          </div>

                          <br />

                          <div className="text-rose-600">
                            {t('warning: If you')}{' '}
                            <strong className="text-rose-600">
                              {t('QUIT')}
                            </strong>{' '}
                            {t('your plan will be')}{' '}
                            <strong className="text-rose-600">
                              {t('LOST')}
                            </strong>
                          </div>

                          <hr />

                          <br />

                          <div>
                            <div className="">
                              <strong>
                                {t('Pay Once, use forever. No extra costs.')}{' '}
                              </strong>
                            </div>

                            <br />
                          </div>

                          <div className="flex justify-center items-center">
                            <div
                              ref={refStarter}
                              className="w-1/2 flex justify-center mr-1"
                            >
                              <button
                                ref={refStarter}
                                onClick={getStarterPackage}
                                className="transparent-button-unlock w-button mb-5"
                              >
                                {t('Unlock Starter For ')} {starterPrice}
                              </button>
                            </div>
                            <div className="w-1/2 flex justify-center ml-1">
                              {' '}
                              <button
                                ref={refPro}
                                onClick={getProPackage}
                                className="button-unlock w-button mb-5"
                              >
                                {t('Unlock Professional For ')} {proPrice}
                              </button>
                            </div>
                          </div>

                          {/* <div className="flex mt-10">
                            <button role="button" onClick={() => setShowReviewTerms(true)} className=""><u>{t("Apply for review discount")}</u></button>
                          </div> */}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  function sessionStarter() {
    return (
      <>
        {warningModal.isOpen && (
          <Modal
            onClose={() => setWarningModal({ isOpen: false, fn: () => {} })}
            onOK={warningModal.fn}
          >
            {t('confirmCopyPlanMessage')}
          </Modal>
        )}
        <motion.div
          key="component-seven"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overflow">
            {loadingStarter ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    <MoonLoader size={20} speedMultiplier={0.7} />{' '}
                  </div>
                  <div>
                    {t(
                      'Generating plan, once done you can edit and save at the top of the page. DO NOT QUIT',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {allDoneGeneratingStarter && doneTimerStarter ? (
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
            <div className="section-full wf-section">
              <div className="get-started">
                <div className="form-bg">
                  <div className="form-block-started w-form">
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isErrorStarter && (
                        <div
                          className="flex flex-col gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative text-center"
                          role="alert"
                        >
                          <strong className="font-bold text-red-700">
                            {t('Failed to generate business plan')}
                          </strong>
                          <span className="block sm:inline">
                            {t(
                              'OpenAI servers might be down, please try again later, retry on',
                            )}{' '}
                            <strong className="text-red-700">{t('PC')}</strong>,{' '}
                            {t('or try using a')}{' '}
                            <strong className="text-red-700">
                              {t('different browser')}
                            </strong>
                          </span>
                          <button
                            onClick={generatePlanStarter}
                            className="button"
                          >
                            {t('Regenerate Plan')}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center mb-10">
                      {!loadingStarter &&
                      !showGeneratePlanButtonStarter &&
                      !isErrorStarter &&
                      paid ? (
                        <div className="flex gap-3">
                          <Link
                            href={{
                              pathname: '/editPlanStarter',
                              query: { planId: planId },
                            }}
                            className="button"
                            onClick={() => {
                              trackEvent({
                                event_name: 'edit_and_save_button',
                              });
                            }}
                          >
                            {' '}
                            {t('Edit & Save')}
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )}

                      {showGeneratePlanButtonStarter && (
                        <div className="flex flex-col justify-center items-center gap-4">
                          <div className="flex justify-center items-center gap-4">
                            <button
                              className="button back-button white w-button"
                              onClick={handleBackButton}
                            >
                              {t('Back')}
                            </button>
                            <button
                              className="button"
                              onClick={
                                formData?.refId
                                  ? () =>
                                      setWarningModal({
                                        isOpen: true,
                                        fn: handleGeneratePlanStarter,
                                      })
                                  : handleGeneratePlanStarter
                              }
                            >
                              {t('Generate Plan')}
                            </button>
                          </div>
                          <div className="flex justify-center items-center text-center">
                            <p>
                              {t(
                                'Note: Please check your inputs before generating plan, once you click generate plan you will not be able to edit your inputs',
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-block-started w-form">
                      {loadingStarter && paid ? (
                        <div className="flex flex-col gap-5 justify-center items-center text-center mb-10">
                          <MoonLoader size={30} />
                          <strong>
                            {t(
                              "We're generating the plan for you, once done you can edit and save here",
                            )}
                          </strong>
                        </div>
                      ) : (
                        <></>
                      )}

                      <hr />
                      <br />

                      {!isErrorStarter && paid ? (
                        <div className={`font-segoe ${textAlign}`}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedExec),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu1),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedSitu2),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark1),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark2),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark3),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMark4),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedOp1),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedMang1),
                            }}
                          />
                          <br />
                          {!showGeneratePlanButtonStarter && (
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
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(generatedRisk1),
                            }}
                          />
                          <br />
                          <hr />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  function sessionPro() {
    return (
      <>
        {warningModal.isOpen && (
          <Modal
            onClose={() => setWarningModal({ isOpen: false, fn: () => {} })}
            onOK={warningModal.fn}
          >
            {t('confirmCopyPlanMessage')}
          </Modal>
        )}
        <motion.div
          key="component-seven"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overflow">
            {loadingPro ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    <MoonLoader size={20} speedMultiplier={0.7} />{' '}
                  </div>
                  <div>
                    {t(
                      'Generating plan, once done you can edit and save at the top of the page. DO NOT QUIT, this could take a minute',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {allDoneAndFullContentPro && doneTimerPro ? (
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
            <div className="section-full wf-section">
              <div className="get-started">
                <div className="form-bg">
                  <div className="form-block-started w-form">
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isErrorPro && (
                        <div
                          className="flex flex-col gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative text-center"
                          role="alert"
                        >
                          <strong className="font-bold text-red-700">
                            {t('Failed to generate business plan')}
                          </strong>
                          <span className="block sm:inline">
                            {t(
                              'OpenAI servers might be down, please try again later, retry on',
                            )}{' '}
                            <strong className="text-red-700">{t('PC')}</strong>,{' '}
                            {t('or try using a')}{' '}
                            <strong className="text-red-700">
                              {t('different browser')}
                            </strong>
                          </span>
                          <button onClick={generatePlanPro} className="button">
                            {t('Regenerate Plan')}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center mb-10">
                      {!loadingPro &&
                      !showGeneratePlanButtonPro &&
                      !isErrorPro &&
                      paid ? (
                        <div className="flex gap-3">
                          <Link
                            href={{
                              pathname: '/editPlanPro',
                              query: { planId: planId },
                            }}
                            className="button"
                            onClick={() => {
                              trackEvent({
                                event_name: 'edit_and_save_button',
                              });
                            }}
                          >
                            {' '}
                            {t('Edit & Save')}
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )}

                      {showGeneratePlanButtonPro && (
                        <div className="flex flex-col justify-center items-center gap-4">
                          <div className="flex justify-center items-center gap-4">
                            <button
                              className="button back-button white w-button"
                              onClick={handleBackButton}
                            >
                              {t('Back')}
                            </button>
                            <button
                              className="button"
                              onClick={
                                formData?.refId
                                  ? () =>
                                      setWarningModal({
                                        isOpen: true,
                                        fn: handleGeneratePlanPro,
                                      })
                                  : handleGeneratePlanPro
                              }
                            >
                              {t('Generate Plan')}
                            </button>
                          </div>
                          <div className="flex justify-center items-center text-center">
                            <p>
                              {t(
                                'Note: Please check your inputs before generating plan, once you click generate plan you will not be able to edit your inputs',
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-block-started w-form">
                      {loadingPro && paid ? (
                        <div className="flex flex-col gap-5 justify-center items-center text-center mb-10">
                          <MoonLoader size={30} />
                          <strong>
                            {t(
                              "We're generating the plan for you, once done you can edit and save here",
                            )}
                          </strong>
                        </div>
                      ) : (
                        <></>
                      )}

                      <hr />
                      <br />

                      {!isErrorPro && (
                        <div
                          className={`form-block-started w-form font-segoe ${textAlign}`}
                        >
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
                                __html: DOMPurify.sanitize(
                                  generatedSitu2SWOTPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  DOMPurify.sanitize(generatedMark1ObjPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  DOMPurify.sanitize(generatedMark2STPPro),
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
                                __html:
                                  DOMPurify.sanitize(generatedTech1AllPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  generatedTech2DigiPro,
                                ),
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

                          {!showGeneratePlanButtonPro && (
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
}
