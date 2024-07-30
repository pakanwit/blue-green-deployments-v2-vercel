import { useEffect, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import DOMPurify from 'dompurify';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../../styles/Editor.module.css';
import { BiUndo } from 'react-icons/bi';
import stylesW from '../../styles/Wizard.module.css';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '../../components/navbar';
import FinTable from '../../components/FinTable';
import ReviewTerms from '../../components/ReviewTerms';
import trackEvent from '../../utils/trackEvent';
import Input from '../../components/input';
import { API_KEY_HEADER } from '../api/constants';
import Modal from '../../components/modal';
import us2gb from '../../utils/us2gb';
import { useLoadFormData } from '../../hooks/useLoadFormData';
import { AppContext } from '../../context/appContext';
import TrustBox from '../../components/trustBox';
import { IReviewsResponse } from '../../model/Schema';
import { ROUTE_PATH } from '../../constants/path';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import { AI_MODEL } from '../../constants/plan';
import useCookies from '../../hooks/useCookies';

const createDOMPurify = () => {
  if (typeof window !== 'undefined') {
    return DOMPurify(window);
  } else {
    // Return a dummy sanitize function or similar when not in browser environment
    return { sanitize: (html) => html };
  }
};

const domPurify = createDOMPurify();

export default function LastStepPlanGen({ fbPixelId, xPixelId, secretKey }) {
  const router = useRouter();
  const { t, i18n } = useTranslation('LastStepPlanGen');
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    fn: () => {},
  });

  const { getCookie } = useCookies();
  const variantID = getCookie('variantID');

  const [reviews, setReviews] = useState<IReviewsResponse[]>([]);
  const [userData, setuserData] = useState(null);
  const [paid, setPaid] = useState(false);

  const { data: session } = useSession();
  const [hasAddedNewPlan, setHasAddedNewPlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showGeneratePlanButton, setShowGeneratePlanButton] = useState(true);

  // cancel stream--------------------------
  const executionIdRefExec = useRef(null);
  const executionIdRefSitu1 = useRef(null);
  const executionIdRefSitu2 = useRef(null);
  const executionIdRefMark1 = useRef(null);
  const executionIdRefMark2 = useRef(null);

  // done checkers-----------------------------------------------
  const [doneExec, setDoneExec] = useState(false);
  const [doneSitu1, setDoneSitu1] = useState(false);
  const [doneSitu2, setDoneSitu2] = useState(false);
  const [doneMark1, setDoneMark1] = useState(false);
  const [doneMark2, setDoneMark2] = useState(false);
  const [allDoneGenerating, setAllDoneGenerating] = useState(false);
  const doneRef1 = useRef(false);
  const generatedSitu1Ref = useRef('');

  const [allDoneAndFullContentPro, setAllDoneAndFullContentPro] =
    useState(false);

  // fullPlanStarter code  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [loadingStarter, setLoadingStarter] = useState(false);
  const [isErrorStarter, setIsErrorStarter] = useState(false);

  // done checkers-----------------------------------------------
  const [doneExecStarter, setDoneExecStarter] = useState(false);
  const [doneSitu1Starter, setDoneSitu1Starter] = useState(false);
  const [doneSitu2Starter, setDoneSitu2Starter] = useState(false);
  const [doneMark1Starter, setDoneMark1Starter] = useState(false);
  const [doneMark2Starter, setDoneMark2Starter] = useState(false);
  const [doneMark3Starter, setDoneMark3Starter] = useState(false);
  const [doneMark4Starter, setDoneMark4Starter] = useState(false);
  const [doneOp1Starter, setDoneOp1Starter] = useState(false);
  const [doneMang1Starter, setDoneMang1Starter] = useState(false);
  const [doneRisk1Starter, setDoneRisk1Starter] = useState(false);

  const [allDoneGeneratingStarter, setAllDoneGeneratingStarter] =
    useState(false);

  const [showGeneratePlanButtonStarter, setShowGeneratePlanButtonStarter] =
    useState(true);

  // cancel stream--------------------------
  const executionIdRefExecStarter = useRef(null);
  const executionIdRefSitu1Starter = useRef(null);
  const executionIdRefSitu2Starter = useRef(null);
  const executionIdRefMark1Starter = useRef(null);
  const executionIdRefMark2Starter = useRef(null);
  const executionIdRefMark3Starter = useRef(null);
  const executionIdRefMark4Starter = useRef(null);
  const executionIdRefOp1Starter = useRef(null);
  const executionIdRefMang1Starter = useRef(null);
  const executionIdRefRisk1Starter = useRef(null);

  // fullPlanPro code ------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [loadingPro, setLoadingPro] = useState(false);
  const [isErrorPro, setIsErrorPro] = useState(false);
  const [showGeneratePlanButtonPro, setShowGeneratePlanButtonPro] =
    useState(true);

  // start checkers-----------------------------------------------
  const [runningExecPro, setRunningExecPro] = useState(false);
  const [runningSitu1Pro, setRunningSitu1Pro] = useState(false);
  const [runningSitu2Pro, setRunningSitu2Pro] = useState(false);
  const [runningMark1Pro, setRunningMark1Pro] = useState(false);
  const [runningMark2Pro, setRunningMark2Pro] = useState(false);
  const [runningMark3Pro, setRunningMark3Pro] = useState(false);
  const [runningMark4Pro, setRunningMark4Pro] = useState(false);
  const [runningMark5Pro, setRunningMark5Pro] = useState(false);
  const [runningMark6Pro, setRunningMark6Pro] = useState(false);
  const [runningOp1Pro, setRunningOp1Pro] = useState(false);
  const [runningOp2Pro, setRunningOp2Pro] = useState(false);
  const [runningTech1Pro, setRunningTech1Pro] = useState(false);
  const [runningTech2Pro, setRunningTech2Pro] = useState(false);
  const [runningMang1Pro, setRunningMang1Pro] = useState(false);
  const [runningMang2Pro, setRunningMang2Pro] = useState(false);
  const [runningGrowthPro, setRunningGrowthPro] = useState(false);
  const [runningRiskPro, setRunningRiskPro] = useState(false);

  // done checkers-----------------------------------------------
  const [doneExecPro, setDoneExecPro] = useState(false);
  const [doneSitu1Pro, setDoneSitu1Pro] = useState(false);
  const [doneSitu2Pro, setDoneSitu2Pro] = useState(false);
  const [doneMark1Pro, setDoneMark1Pro] = useState(false);
  const [doneMark2Pro, setDoneMark2Pro] = useState(false);
  const [doneMark3Pro, setDoneMark3Pro] = useState(false);
  const [doneMark4Pro, setDoneMark4Pro] = useState(false);
  const [doneMark5Pro, setDoneMark5Pro] = useState(false);
  const [doneMark6Pro, setDoneMark6Pro] = useState(false);
  const [doneOp1Pro, setDoneOp1Pro] = useState(false);
  const [doneOp2Pro, setDoneOp2Pro] = useState(false);
  const [doneTech1Pro, setDoneTech1Pro] = useState(false);
  const [doneTech2Pro, setDoneTech2Pro] = useState(false);
  const [doneGrowthPro, setDoneGrowthPro] = useState(false);
  const [doneMang1Pro, setDoneMang1Pro] = useState(false);
  const [doneMang2Pro, setDoneMang2Pro] = useState(false);
  const [doneRiskPro, setDoneRiskPro] = useState(false);

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
  const executionIdRefExecPro = useRef(null);
  const executionIdRefSitu1Pro = useRef(null);
  const executionIdRefSitu2Pro = useRef(null);
  const executionIdRefMark1Pro = useRef(null);
  const executionIdRefMark2Pro = useRef(null);
  const executionIdRefMark3Pro = useRef(null);
  const executionIdRefMark4Pro = useRef(null);
  const executionIdRefMark5Pro = useRef(null);
  const executionIdRefMark6Pro = useRef(null);
  const executionIdRefOp1Pro = useRef(null);
  const executionIdRefOp2Pro = useRef(null);
  const executionIdRefTech1Pro = useRef(null);
  const executionIdRefTech2Pro = useRef(null);
  const executionIdRefMang1Pro = useRef(null);
  const executionIdRefMang2Pro = useRef(null);
  const executionIdRefGrowthPro = useRef(null);
  const executionIdRefRisk1Pro = useRef(null);

  const [latestPlanIDStarter, setLatestPlanIDStarter] = useState('');
  const [latestPlanIDPro, setLatestPlanIDStarterPro] = useState('');

  const [inputData, setInputData] = useState({});
  const [planContent, setPlanContent] = useState({});

  const {
    set: {
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
      setGeneratedFin1,
      setGeneratedRisk1,
      setPlanPackage,
      setStarterPrice,
      setProPrice,
    },
    get: {
      generatedExec: generatedExecContext,
      generatedSitu1: generatedSitu1Context,
      generatedSitu2: generatedSitu2Context,
      generatedMark1: generatedMark1Context,
      generatedMark2: generatedMark2Context,
      generatedMark3: generatedMark3Context,
      generatedMark4: generatedMark4Context,
      generatedOp1: generatedOp1Context,
      generatedOp2: generatedOp2Context,
      generatedMang1: generatedMang1Context,
      generatedMang2: generatedMang2Context,
      generatedFin1: generatedFin1Context,
      generatedRisk1: generatedRisk1Context,
      proPrice: proPriceContext,
      starterPrice: starterPriceContext,
    },
    planId,
    setPlanId,
    isPlanCompleted,
  } = useContext(AppContext);

  useEffect(() => {
    router.prefetch(ROUTE_PATH.register);
  }, [router]);

  useBeforeUnload();

  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_8_back_button',
      is_clean_case: true,
    });
    router.push(
      variantID === '2' ? ROUTE_PATH.specificQuestion : ROUTE_PATH.finance,
    );
  };

  const dataFromLocalStorage = useLoadFormData();

  const businessPlanObj =
    variantID === '2'
      ? dataFromLocalStorage.businessPlanObj || inputData?.businessPlanObj
      : dataFromLocalStorage.businessPlanObj;
  const businessOperationalStatus =
    variantID === '2'
      ? dataFromLocalStorage.businessOperationalStatus ||
        inputData?.businessOperationalStatus
      : dataFromLocalStorage.businessOperationalStatus;
  const businessName =
    variantID === '2'
      ? dataFromLocalStorage.businessName || inputData?.businessName
      : dataFromLocalStorage.businessName;
  const businessType =
    variantID === '2'
      ? dataFromLocalStorage.businessType || inputData?.businessType
      : dataFromLocalStorage.businessType;
  const NEmployee =
    variantID === '2'
      ? dataFromLocalStorage.NEmployee || inputData?.NEmployee
      : dataFromLocalStorage.NEmployee;
  const productOrService =
    variantID === '2'
      ? dataFromLocalStorage.productOrService || inputData?.productOrService
      : dataFromLocalStorage.productOrService;
  const salesChannel =
    variantID === '2'
      ? dataFromLocalStorage.salesChannel || inputData?.salesChannel
      : dataFromLocalStorage.salesChannel;
  const location =
    variantID === '2'
      ? dataFromLocalStorage.location || inputData?.location
      : dataFromLocalStorage.location;
  const customerDescription1 =
    variantID === '2'
      ? dataFromLocalStorage.customerDescription1 ||
        inputData?.customerDescription1
      : dataFromLocalStorage.customerDescription1;
  const customerIncome1 =
    variantID === '2'
      ? dataFromLocalStorage.customerIncome1 || inputData?.customerIncome1
      : dataFromLocalStorage.customerIncome1;
  const customerDescription2 =
    variantID === '2'
      ? dataFromLocalStorage.customerDescription2 ||
        inputData?.customerDescription2
      : dataFromLocalStorage.customerDescription2;
  const customerIncome2 =
    variantID === '2'
      ? dataFromLocalStorage.customerIncome2 || inputData?.customerIncome2
      : dataFromLocalStorage.customerIncome2;
  const customerDescription3 =
    variantID === '2'
      ? dataFromLocalStorage.customerDescription3 ||
        inputData?.customerDescription3
      : dataFromLocalStorage.customerDescription3;
  const customerIncome3 =
    variantID === '2'
      ? dataFromLocalStorage.customerIncome3 || inputData?.customerIncome3
      : dataFromLocalStorage.customerIncome3;
  const productName1 =
    variantID === '2'
      ? dataFromLocalStorage.productName1 || inputData?.productName1
      : dataFromLocalStorage.productName1;
  const productName2 =
    variantID === '2'
      ? dataFromLocalStorage.productName2 || inputData?.productName2
      : dataFromLocalStorage.productName2;
  const productName3 =
    variantID === '2'
      ? dataFromLocalStorage.productName3 || inputData?.productName3
      : dataFromLocalStorage.productName3;
  const productName4 =
    variantID === '2'
      ? dataFromLocalStorage.productName4 || inputData?.productName4
      : dataFromLocalStorage.productName4;
  const productName5 =
    variantID === '2'
      ? dataFromLocalStorage.productName5 || inputData?.productName5
      : dataFromLocalStorage.productName5;
  const productDescription1 =
    variantID === '2'
      ? dataFromLocalStorage.productDescription1 ||
        inputData?.productDescription1
      : dataFromLocalStorage.productDescription1;
  const productDescription2 =
    variantID === '2'
      ? dataFromLocalStorage.productDescription2 ||
        inputData?.productDescription2
      : dataFromLocalStorage.productDescription2;
  const productDescription3 =
    variantID === '2'
      ? dataFromLocalStorage.productDescription3 ||
        inputData?.productDescription3
      : dataFromLocalStorage.productDescription3;
  const productDescription4 =
    variantID === '2'
      ? dataFromLocalStorage.productDescription4 ||
        inputData?.productDescription4
      : dataFromLocalStorage.productDescription4;
  const productDescription5 =
    variantID === '2'
      ? dataFromLocalStorage.productDescription5 ||
        inputData?.productDescription5
      : dataFromLocalStorage.productDescription5;
  const successFactors1 =
    variantID === '2'
      ? dataFromLocalStorage.successFactors1 || inputData?.successFactors1
      : dataFromLocalStorage.successFactors1;
  const successFactors2 =
    variantID === '2'
      ? dataFromLocalStorage.successFactors2 || inputData?.successFactors2
      : dataFromLocalStorage.successFactors2;
  const successFactors3 =
    variantID === '2'
      ? dataFromLocalStorage.successFactors3 || inputData?.successFactors3
      : dataFromLocalStorage.successFactors3;
  const weakness1 =
    variantID === '2'
      ? dataFromLocalStorage.weakness1 || inputData?.weakness1
      : dataFromLocalStorage.weakness1;
  const weakness2 =
    variantID === '2'
      ? dataFromLocalStorage.weakness2 || inputData?.weakness2
      : dataFromLocalStorage.weakness2;
  const weakness3 =
    variantID === '2'
      ? dataFromLocalStorage.weakness3 || inputData?.weakness3
      : dataFromLocalStorage.weakness3;
  const planCurrency =
    variantID === '2'
      ? dataFromLocalStorage.planCurrency || inputData?.planCurrency
      : dataFromLocalStorage.planCurrency;
  const initialInvestmentAmount =
    variantID === '2'
      ? dataFromLocalStorage.initialInvestmentAmount ||
        inputData?.initialInvestmentAmount
      : dataFromLocalStorage.initialInvestmentAmount;
  const investmentItem1 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem1 || inputData?.investmentItem1
      : dataFromLocalStorage.investmentItem1;
  const investmentAmountItem1 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem1 ||
        inputData?.investmentAmountItem1
      : dataFromLocalStorage.investmentAmountItem1;
  const investmentItem2 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem2 || inputData?.investmentItem2
      : dataFromLocalStorage.investmentItem2;
  const investmentAmountItem2 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem2 ||
        inputData?.investmentAmountItem2
      : dataFromLocalStorage.investmentAmountItem2;
  const investmentItem3 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem3 || inputData?.investmentItem3
      : dataFromLocalStorage.investmentItem3;
  const investmentAmountItem3 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem3 ||
        inputData?.investmentAmountItem3
      : dataFromLocalStorage.investmentAmountItem3;
  const investmentItem4 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem4 || inputData?.investmentItem4
      : dataFromLocalStorage.investmentItem4;
  const investmentAmountItem4 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem4 ||
        inputData?.investmentAmountItem4
      : dataFromLocalStorage.investmentAmountItem4;
  const investmentItem5 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem5 || inputData?.investmentItem5
      : dataFromLocalStorage.investmentItem5;
  const investmentAmountItem5 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem5 ||
        inputData?.investmentAmountItem5
      : dataFromLocalStorage.investmentAmountItem5;
  const investmentItem6 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem6 || inputData?.investmentItem6
      : dataFromLocalStorage.investmentItem6;
  const investmentAmountItem6 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem6 ||
        inputData?.investmentAmountItem6
      : dataFromLocalStorage.investmentAmountItem6;
  const investmentItem7 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem7 || inputData?.investmentItem7
      : dataFromLocalStorage.investmentItem7;
  const investmentAmountItem7 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem7 ||
        inputData?.investmentAmountItem7
      : dataFromLocalStorage.investmentAmountItem7;
  const investmentItem8 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem8 || inputData?.investmentItem8
      : dataFromLocalStorage.investmentItem8;
  const investmentAmountItem8 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem8 ||
        inputData?.investmentAmountItem8
      : dataFromLocalStorage.investmentAmountItem8;
  const investmentItem9 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem9 || inputData?.investmentItem9
      : dataFromLocalStorage.investmentItem9;
  const investmentAmountItem9 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem9 ||
        inputData?.investmentAmountItem9
      : dataFromLocalStorage.investmentAmountItem9;
  const investmentItem10 =
    variantID === '2'
      ? dataFromLocalStorage.investmentItem10 || inputData?.investmentItem10
      : dataFromLocalStorage.investmentItem10;
  const investmentAmountItem10 =
    variantID === '2'
      ? dataFromLocalStorage.investmentAmountItem10 ||
        inputData?.investmentAmountItem10
      : dataFromLocalStorage.investmentAmountItem10;
  const planCurrencySymbol =
    variantID === '2'
      ? dataFromLocalStorage.planCurrencySymbol || inputData?.planCurrencySymbol
      : dataFromLocalStorage.planCurrencySymbol;
  const firstYearRevenue =
    variantID === '2'
      ? dataFromLocalStorage.firstYearRevenue || inputData?.firstYearRevenue
      : dataFromLocalStorage.firstYearRevenue;
  const revenueGrowthRate =
    variantID === '2'
      ? dataFromLocalStorage.revenueGrowthRate || inputData?.revenueGrowthRate
      : dataFromLocalStorage.revenueGrowthRate;
  const COGSP =
    variantID === '2'
      ? dataFromLocalStorage.COGSP || inputData?.COGSP || 0
      : dataFromLocalStorage.COGSP;
  const wageCostP =
    variantID === '2'
      ? dataFromLocalStorage.wageCostP || inputData?.wageCostP || 0
      : dataFromLocalStorage.wageCostP;
  const markCostP =
    variantID === '2'
      ? dataFromLocalStorage.markCostP || inputData?.markCostP || 0
      : dataFromLocalStorage.markCostP;
  const rentCostP =
    variantID === '2'
      ? dataFromLocalStorage.rentCostP || inputData?.rentCostP || 0
      : dataFromLocalStorage.rentCostP;
  const genCostP =
    variantID === '2'
      ? dataFromLocalStorage.genCostP || inputData?.genCostP || 0
      : dataFromLocalStorage.genCostP;
  const depreCostP =
    variantID === '2'
      ? dataFromLocalStorage.depreCostP || inputData?.depreCostP || 0
      : dataFromLocalStorage.depreCostP;
  const utilCostP =
    variantID === '2'
      ? dataFromLocalStorage.utilCostP || inputData?.utilCostP || 0
      : dataFromLocalStorage.utilCostP;
  const otherCostP =
    variantID === '2'
      ? dataFromLocalStorage.otherCostP || inputData?.otherCostP || 0
      : dataFromLocalStorage.otherCostP;
  const intCostP =
    variantID === '2'
      ? dataFromLocalStorage.intCostP || inputData?.intCostP || 0
      : dataFromLocalStorage.intCostP;
  const taxCostP =
    variantID === '2'
      ? dataFromLocalStorage.taxCostP || inputData?.taxCostP || 0
      : dataFromLocalStorage.taxCostP;
  const planLanguage =
    variantID === '2'
      ? dataFromLocalStorage.planLanguage || inputData?.planLanguage
      : dataFromLocalStorage.planLanguage;
  const refId =
    variantID === '2'
      ? dataFromLocalStorage.refId || inputData?.refId
      : dataFromLocalStorage.refId;
  const specificProductQuestion1 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductQuestion1 ||
        inputData?.specificProductQuestion1
      : dataFromLocalStorage.specificProductQuestion1;
  const specificProductQuestion2 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductQuestion2 ||
        inputData?.specificProductQuestion2
      : dataFromLocalStorage.specificProductQuestion2;
  const specificProductQuestion3 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductQuestion3 ||
        inputData?.specificProductQuestion3
      : dataFromLocalStorage.specificProductQuestion3;
  const specificProductQuestion4 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductQuestion4 ||
        inputData?.specificProductQuestion4
      : dataFromLocalStorage.specificProductQuestion4;
  const specificProductQuestion5 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductQuestion5 ||
        inputData?.specificProductQuestion5
      : dataFromLocalStorage.specificProductQuestion5;
  const specificProductAnswer1 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductAnswer1 ||
        inputData?.specificProductAnswer1
      : dataFromLocalStorage.specificProductAnswer1;
  const specificProductAnswer2 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductAnswer2 ||
        inputData?.specificProductAnswer2
      : dataFromLocalStorage.specificProductAnswer2;
  const specificProductAnswer3 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductAnswer3 ||
        inputData?.specificProductAnswer3
      : dataFromLocalStorage.specificProductAnswer3;
  const specificProductAnswer4 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductAnswer4 ||
        inputData?.specificProductAnswer4
      : dataFromLocalStorage.specificProductAnswer4;
  const specificProductAnswer5 =
    variantID === '2'
      ? dataFromLocalStorage.specificProductAnswer5 ||
        inputData?.specificProductAnswer5
      : dataFromLocalStorage.specificProductAnswer5;
  const specificOperationQuestion1 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationQuestion1 ||
        inputData?.specificOperationQuestion1
      : dataFromLocalStorage.specificOperationQuestion1;
  const specificOperationQuestion2 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationQuestion2 ||
        inputData?.specificOperationQuestion2
      : dataFromLocalStorage.specificOperationQuestion2;
  const specificOperationQuestion3 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationQuestion3 ||
        inputData?.specificOperationQuestion3
      : dataFromLocalStorage.specificOperationQuestion3;
  const specificOperationQuestion4 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationQuestion4 ||
        inputData?.specificOperationQuestion4
      : dataFromLocalStorage.specificOperationQuestion4;
  const specificOperationQuestion5 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationQuestion5 ||
        inputData?.specificOperationQuestion5
      : dataFromLocalStorage.specificOperationQuestion5;
  const specificOperationAnswer1 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationAnswer1 ||
        inputData?.specificOperationAnswer1
      : dataFromLocalStorage.specificOperationAnswer1;
  const specificOperationAnswer2 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationAnswer2 ||
        inputData?.specificOperationAnswer2
      : dataFromLocalStorage.specificOperationAnswer2;
  const specificOperationAnswer3 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationAnswer3 ||
        inputData?.specificOperationAnswer3
      : dataFromLocalStorage.specificOperationAnswer3;
  const specificOperationAnswer4 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationAnswer4 ||
        inputData?.specificOperationAnswer4
      : dataFromLocalStorage.specificOperationAnswer4;
  const specificOperationAnswer5 =
    variantID === '2'
      ? dataFromLocalStorage.specificOperationAnswer5 ||
        inputData?.specificOperationAnswer5
      : dataFromLocalStorage.specificOperationAnswer5;
  const generatedExec = generatedExecContext || planContent?.generatedExec;
  const generatedSitu1 = generatedSitu1Context || planContent?.generatedSitu1;
  const generatedSitu2 = generatedSitu2Context || planContent?.generatedSitu2;
  const generatedMark1 = generatedMark1Context || planContent?.generatedMark1;
  const generatedMark2 = generatedMark2Context || planContent?.generatedMark2;
  const generatedMark3 = generatedMark3Context || planContent?.generatedMark3;
  const generatedMark4 = generatedMark4Context || planContent?.generatedMark4;
  const generatedOp1 = generatedOp1Context || planContent?.generatedOp1;
  const generatedOp2 = generatedOp2Context || planContent?.generatedOp2;
  const generatedMang1 = generatedMang1Context || planContent?.generatedMang1;
  const generatedMang2 = generatedMang2Context || planContent?.generatedMang2;
  const generatedFin1 = generatedFin1Context || planContent?.generatedFin1;
  const generatedRisk1 = generatedRisk1Context || planContent?.generatedRisk1;
  const proPrice = proPriceContext || planContent?.proPrice;
  const starterPrice = starterPriceContext || planContent?.starterPrice;

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

  //main functions------------------------------------------------------------
  async function generateExec(modelName?: string) {
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
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });

    console.log('Edge function returned.');
    console.log('execApi:', exec);

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
        variantID: variantID,
        businessOperationalStatus,
        businessName,
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
        planLanguage,
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
        planQuota: 100,
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

  async function generateSitu1andMark1(modelName?: string) {
    // generate situ1 first
    setGeneratedSitu1('');

    setAllDoneGenerating(false);
    setDoneSitu1(false);
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
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        planQuota: 100,
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

  async function generateSitu2(modelName?: string) {
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
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        planQuota: 100,
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

  async function generateMark2(modelName?: string) {
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
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        planQuota: 100,
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

  useEffect(() => {
    if (doneExec && doneSitu1 && doneSitu2 && doneMark1 && doneMark2) {
      setAllDoneGenerating(true);
      if (planLanguage.value === 'en-uk') {
        setGeneratedExec(us2gb(generatedExec));
        setGeneratedSitu1(us2gb(generatedSitu1));
        setGeneratedSitu2(us2gb(generatedSitu2));
        setGeneratedMark1(us2gb(generatedMark1));
        setGeneratedMark2(us2gb(generatedMark2));
      }
    }
  }, [doneExec, doneSitu1, doneSitu2, doneMark1, doneMark2]);

  //main functions------------------------------------------------------------
  async function generateExecStarter(modelName) {
    setGeneratedExec('');

    setAllDoneGeneratingStarter(false);
    setDoneExecStarter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefExecStarter.current = currentExecutionId;

    const exec = await fetch('/api/mainApi/api1Exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });

    console.log('Edge function returned.');

    if (!exec.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const execStream = exec.body;
    if (!execStream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerExec = execStream.getReader();
    const decoderExec = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneExecReading } = await readerExec.read();
      done = doneExecReading;
      const chunkValue = decoderExec.decode(value);
      if (executionIdRefExecStarter.current === currentExecutionId) {
        setGeneratedExec((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefExecStarter.current === currentExecutionId) {
      setDoneExecStarter(true);
    }
  }

  const doneRef1Starter = useRef(false);
  const generatedSitu1RefStarter = useRef('');

  async function generateMark1Starter(situ1Ref) {
    setGeneratedMark1('');

    setAllDoneGeneratingStarter(false);
    setDoneMark1Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark1Starter.current = currentExecutionId;
    const mark1 = await fetch('/api/mainApi/api4Mark1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessOperationalStatus,
        businessName,
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
        planLanguage,
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
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const mark1Stream = mark1.body;
    if (!mark1Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerMark1 = mark1Stream.getReader();
    const decoderMark1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark1Reading } = await readerMark1.read();
      done = doneMark1Reading;
      const chunkValue = decoderMark1.decode(value);
      if (executionIdRefMark1Starter.current === currentExecutionId) {
        setGeneratedMark1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark1Starter.current === currentExecutionId) {
      setDoneMark1Starter(true);
    }
  }

  async function generateMark3Starter(mark2Ref) {
    setGeneratedMark3('');

    setAllDoneGeneratingStarter(false);
    setDoneMark3Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark3Starter.current = currentExecutionId;
    const mark3 = await fetch('/api/mainApi/api6Mark3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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

        mark2Ref: mark2Ref,
        productInfoPrompt,
        AITopic: {
          product: productQuestions?.map((question, index) => ({
            topic: question?.topic,
            question: question?.value,
            answer: productAnswers[index],
          })),
        },
      }),
    });

    console.log('Edge function returned.');

    if (!mark3.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const mark3Stream = mark3.body;
    if (!mark3Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
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
      if (executionIdRefMark3Starter.current === currentExecutionId) {
        setGeneratedMark3((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark3Starter.current === currentExecutionId) {
      setDoneMark3Starter(true);
    }
  }

  async function generateMark4Starter(mark2Ref) {
    // PROBLEM HERE
    setGeneratedMark4('');

    setAllDoneGeneratingStarter(false);
    setDoneMark4Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark4Starter.current = currentExecutionId;
    const mark4 = await fetch('/api/mainApi/api7Mark4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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

        mark2Ref: mark2Ref,
        productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!mark4.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const mark4Stream = mark4.body;
    if (!mark4Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerMark4 = mark4Stream.getReader();
    const decoderMark4 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark4Reading } = await readerMark4.read();
      done = doneMark4Reading;
      const chunkValue = decoderMark4.decode(value);
      if (executionIdRefMark4Starter.current === currentExecutionId) {
        setGeneratedMark4((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark4Starter.current === currentExecutionId) {
      setDoneMark4Starter(true);
    }
  }

  async function generateSitu1andMark1Starter(modelName) {
    // generate situ1 first
    setGeneratedSitu1('');

    setAllDoneGeneratingStarter(false);
    setDoneSitu1Starter(false);
    setDoneMark1Starter(false);
    setLoadingStarter(true);

    doneRef1Starter.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu1Starter.current = currentExecutionId;
    const situ1 = await fetch('/api/mainApi/api2Situ1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });
    console.log('Edge function returned.');

    if (!situ1.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const situ1Stream = situ1.body;
    if (!situ1Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerSitu1 = situ1Stream.getReader();
    const decoderSitu1 = new TextDecoder();
    // let done = false;

    while (!doneRef1Starter.current) {
      //-------------------------------------------------------
      const { value, done: doneSitu1Reading } = await readerSitu1.read();
      doneRef1Starter.current = doneSitu1Reading;
      const chunkValue = decoderSitu1.decode(value);
      generatedSitu1RefStarter.current =
        generatedSitu1RefStarter.current + chunkValue;
      if (executionIdRefSitu1Starter.current === currentExecutionId) {
        setGeneratedSitu1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu1Starter.current === currentExecutionId) {
      setDoneSitu1Starter(true);
    }

    if (doneRef1Starter.current && generatedSitu1RefStarter.current) {
      generateMark1Starter(generatedSitu1RefStarter.current);
    }
  }

  async function generateSitu2Starter(modelName) {
    setGeneratedSitu2('');

    setAllDoneGeneratingStarter(false);
    setDoneSitu2Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu2Starter.current = currentExecutionId;

    const situ2 = await fetch('/api/mainApi/api3Situ2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });

    console.log('Edge function returned.');

    if (!situ2.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const situ2Stream = situ2.body;
    if (!situ2Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerSitu2 = situ2Stream.getReader();
    const decoderSitu2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneSitu2Reading } = await readerSitu2.read();
      done = doneSitu2Reading;
      const chunkValue = decoderSitu2.decode(value);
      if (executionIdRefSitu2Starter.current === currentExecutionId) {
        setGeneratedSitu2((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu2Starter.current === currentExecutionId) {
      setDoneSitu2Starter(true);
    }
  }

  const doneRef2Starter = useRef(false);
  const generatedMark2RefStarter = useRef('');

  async function generateMark2Mark3Mark4Starter(modelName) {
    setGeneratedMark2('');

    setAllDoneGeneratingStarter(false);
    setDoneMark2Starter(false);
    setDoneMark3Starter(false);
    setDoneMark4Starter(false);

    doneRef2Starter.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark2Starter.current = currentExecutionId;

    const mark2 = await fetch('/api/mainApi/api5Mark2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });
    console.log('Edge function returned.');

    if (!mark2.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const mark2Stream = mark2.body;
    if (!mark2Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerMark2 = mark2Stream.getReader();
    const decoderMark2 = new TextDecoder();
    // let done = false;

    while (!doneRef2Starter.current) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      doneRef2Starter.current = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      generatedMark2RefStarter.current =
        generatedMark2RefStarter.current + chunkValue;
      if (executionIdRefMark2Starter.current === currentExecutionId) {
        setGeneratedMark2((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMark2Starter.current === currentExecutionId) {
      setDoneMark2Starter(true);
    }

    if (doneRef2Starter.current && generatedMark2RefStarter.current) {
      generateMark3Starter(generatedMark2RefStarter.current);
      generateMark4Starter(generatedMark2RefStarter.current);
    }
  }

  async function generateOp1Starter(modelName) {
    setGeneratedOp1('');

    setAllDoneGeneratingStarter(false);
    setDoneOp1Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp1Starter.current = currentExecutionId;
    const op1 = await fetch('/api/mainApi/api8Op1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
        AITopic: {
          operation: operationQuestions?.map((question, index) => ({
            topic: question?.topic,
            question: question?.value,
            answer: operationAnswers[index]?.value,
          })),
        },
      }),
    });
    console.log('Edge function returned.');

    if (!op1.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const op1Stream = op1.body;
    if (!op1Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerOp1 = op1Stream.getReader();
    const decoderOp1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneOp1Reading } = await readerOp1.read();
      done = doneOp1Reading;
      const chunkValue = decoderOp1.decode(value);
      if (executionIdRefOp1Starter.current === currentExecutionId) {
        setGeneratedOp1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp1Starter.current === currentExecutionId) {
      setDoneOp1Starter(true);
    }
  }

  async function generateMang1Starter(modelName) {
    setGeneratedMang1('');

    setAllDoneGeneratingStarter(false);
    setDoneMang1Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang1Starter.current = currentExecutionId;
    const mang1 = await fetch('/api/mainApi/api9Mang1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });
    console.log('Edge function returned.');

    if (!mang1.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const mang1Stream = mang1.body;
    if (!mang1Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerMang1 = mang1Stream.getReader();
    const decoderMang1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMang1Reading } = await readerMang1.read();
      done = doneMang1Reading;
      const chunkValue = decoderMang1.decode(value);
      if (executionIdRefMang1Starter.current === currentExecutionId) {
        setGeneratedMang1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang1Starter.current === currentExecutionId) {
      setDoneMang1Starter(true);
    }
  }

  async function generateRisk1Starter(modelName) {
    setGeneratedRisk1('');

    setAllDoneGeneratingStarter(false);
    setDoneRisk1Starter(false);
    setLoadingStarter(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefRisk1Starter.current = currentExecutionId;
    const risk1 = await fetch('/api/mainApi/api11Risk1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        variantID: variantID,
        businessName,
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
        planLanguage,
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
        modelName,
      }),
    });
    console.log('Edge function returned.');

    if (!risk1.ok) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    // This data is a ReadableStream
    const risk1Stream = risk1.body;
    if (!risk1Stream) {
      setIsErrorStarter(true);
      setLoadingStarter(false);
      return;
    }

    const readerRisk1 = risk1Stream.getReader();
    const decoderRisk1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneRisk1Reading } = await readerRisk1.read();
      done = doneRisk1Reading;
      const chunkValue = decoderRisk1.decode(value);
      if (executionIdRefRisk1Starter.current === currentExecutionId) {
        setGeneratedRisk1((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefRisk1Starter.current === currentExecutionId) {
      setDoneRisk1Starter(true);
    }
  }

  useEffect(() => {
    if (
      doneExecStarter &&
      doneSitu1Starter &&
      doneSitu2Starter &&
      doneMark1Starter &&
      doneMark2Starter &&
      doneMark3Starter &&
      doneMark4Starter &&
      doneOp1Starter &&
      doneMang1Starter &&
      doneRisk1Starter
    ) {
      setAllDoneGeneratingStarter(true);
      if (planLanguage.value === 'en-uk') {
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
    doneExecStarter,
    doneSitu1Starter,
    doneSitu2Starter,
    doneMark1Starter,
    doneMark2Starter,
    doneMark3Starter,
    doneMark4Starter,
    doneOp1Starter,
    doneMang1Starter,
    doneRisk1Starter,
  ]);

  //set latestPlanID to local storage use useEffect
  useEffect(() => {
    console.log('storing latestPlanID:', latestPlanIDStarter);
    localStorage.setItem('latestPlanIDStarter', latestPlanIDStarter);
  }, [latestPlanIDStarter]);

  const prevAllDoneGenerating = useRef(false);

  // this is used when user already signs up and is logged in
  async function addNewPlanStarter() {
    console.log('addNewPlanStarter running');
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
        value: specificProductQuestion1?.value,
        topic: specificProductQuestion1?.topic,
      },
      specificProductQuestion2: variantID === '2' && {
        value: specificProductQuestion2?.value,
        topic: specificProductQuestion2?.topic,
      },
      specificProductQuestion3: variantID === '2' && {
        value: specificProductQuestion3?.value,
        topic: specificProductQuestion3?.topic,
      },
      specificProductQuestion4: variantID === '2' && {
        value: specificProductQuestion4?.value,
        topic: specificProductQuestion4?.topic,
      },
      specificProductQuestion5: variantID === '2' && {
        value: specificProductQuestion5?.value,
        topic: specificProductQuestion5?.topic,
      },
      specificProductAnswer1: variantID === '2' && specificProductAnswer1,
      specificProductAnswer2: variantID === '2' && specificProductAnswer2,
      specificProductAnswer3: variantID === '2' && specificProductAnswer3,
      specificProductAnswer4: variantID === '2' && specificProductAnswer4,
      specificProductAnswer5: variantID === '2' && specificProductAnswer5,
      specificOperationQuestion1: variantID === '2' && {
        value: specificOperationQuestion1?.value,
        topic: specificOperationQuestion1?.topic,
      },
      specificOperationQuestion2: variantID === '2' && {
        value: specificOperationQuestion2?.value,
        topic: specificOperationQuestion2?.topic,
      },
      specificOperationQuestion3: variantID === '2' && {
        value: specificOperationQuestion3?.value,
        topic: specificOperationQuestion3?.topic,
      },
      specificOperationQuestion4: variantID === '2' && {
        value: specificOperationQuestion4?.value,
        topic: specificOperationQuestion4?.topic,
      },
      specificOperationQuestion5: variantID === '2' && {
        value: specificOperationQuestion5?.value,
        topic: specificOperationQuestion5?.topic,
      },
      specificOperationAnswer1: variantID === '2' && specificOperationAnswer1,
      specificOperationAnswer2: variantID === '2' && specificOperationAnswer2,
      specificOperationAnswer3: variantID === '2' && specificOperationAnswer3,
      specificOperationAnswer4: variantID === '2' && specificOperationAnswer4,
      specificOperationAnswer5: variantID === '2' && specificOperationAnswer5,
    };

    const planContent = {
      generatedExec,
      generatedSitu1,
      generatedSitu2,
      generatedMark1,
      generatedMark2,
      generatedMark3,
      generatedMark4,
      generatedOp1,
      generatedMang1,
      generatedRisk1,
    };

    const newPlan = {
      userInput,
      planContent,
      refId,
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
          setPlanId(data.planId);
          setAddNewPlanDone(true);
          localStorage.removeItem('formData');
          localStorage.removeItem('hasGenDynamicQuestion');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (
      session &&
      allDoneGeneratingStarter &&
      !prevAllDoneGenerating.current &&
      !hasAddedNewPlan
    ) {
      addNewPlanStarter();
      if (session) {
        localStorage.setItem(
          `hasAddedNewPlanStarter_${session.user.email}_${latestPlanIDStarter}`,
          'true',
        );
      }
      setHasAddedNewPlan(true);
    }
    prevAllDoneGenerating.current = allDoneGenerating;
  }, [session, allDoneGeneratingStarter, hasAddedNewPlan, latestPlanIDStarter]);

  //we're using old code to generate product prompt

  async function generateMark1ObjPro(situ1Ref) {
    setRunningMark1Pro(true);
    setGeneratedMark1ObjPro('');
    setDoneMark1Pro(false);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark1Stream = mark1.body;
    if (!mark1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMark1 = mark1Stream.getReader();
    const decoderMark1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark1Reading } = await readerMark1.read();
      done = doneMark1Reading;
      const chunkValue = decoderMark1.decode(value);
      if (executionIdRefMark1Pro.current === currentExecutionId) {
        setGeneratedMark1ObjPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark1Pro.current === currentExecutionId) {
      setDoneMark1Pro(true);
      setRunningMark1Pro(false);
      console.log('set Mark1 done');
    }
  }

  async function generateMark3DecisionPro(mark2Ref) {
    setRunningMark3Pro(true);
    setGeneratedMark3DecisionPro('');
    setDoneMark3Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark3Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark3Stream = mark3.body;
    if (!mark3Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
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
      if (executionIdRefMark3Pro.current === currentExecutionId) {
        setGeneratedMark3DecisionPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark3Pro.current === currentExecutionId) {
      setDoneMark3Pro(true);
      setRunningMark3Pro(false);
      console.log('set Mark3 done');
    }
  }

  async function generateMark4ProductPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark4Pro(true);
    setGeneratedMark4ProductPro('');
    setDoneMark4Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark4Pro.current = currentExecutionId;
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark4Stream = mark4.body;
    if (!mark4Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMark4 = mark4Stream.getReader();
    const decoderMark4 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark4Reading } = await readerMark4.read();
      done = doneMark4Reading;
      const chunkValue = decoderMark4.decode(value);
      if (executionIdRefMark4Pro.current === currentExecutionId) {
        setGeneratedMark4ProductPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark4Pro.current === currentExecutionId) {
      setDoneMark4Pro(true);
      setRunningMark4Pro(false);
      console.log('set Mark4 done');
    }
  }

  async function generateMark5PriceDistPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark5Pro(true);
    setGeneratedMark5PriceDistPro('');
    setDoneMark5Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark5Pro.current = currentExecutionId;
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
        productInfoPrompt: productInfoPrompt,
      }),
    });

    console.log('Edge function returned.');

    if (!mark5.ok) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark5Stream = mark5.body;
    if (!mark5Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMark5 = mark5Stream.getReader();
    const decoderMark5 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark5Reading } = await readerMark5.read();
      done = doneMark5Reading;
      const chunkValue = decoderMark5.decode(value);
      if (executionIdRefMark5Pro.current === currentExecutionId) {
        setGeneratedMark5PriceDistPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark5Pro.current === currentExecutionId) {
      setDoneMark5Pro(true);
      setRunningMark5Pro(false);
      console.log('set Mark5 done');
    }
  }

  async function generateMark6AdPro(mark2Ref) {
    // PROBLEM HERE
    setRunningMark6Pro(true);
    setGeneratedMark6AdPro('');
    setDoneMark6Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark6Pro.current = currentExecutionId;
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark6Stream = mark6.body;
    if (!mark6Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMark6 = mark6Stream.getReader();
    const decoderMark6 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMark6Reading } = await readerMark6.read();
      done = doneMark6Reading;
      const chunkValue = decoderMark6.decode(value);
      if (executionIdRefMark6Pro.current === currentExecutionId) {
        setGeneratedMark6AdPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }
    if (executionIdRefMark6Pro.current === currentExecutionId) {
      setDoneMark6Pro(true);
      setRunningMark6Pro(false);
      console.log('set Mark6 done');
    }
  }

  //main functions------------------------------------------------------------

  async function generateExecPro() {
    setRunningExecPro(true);
    setGeneratedExecPro('');
    setDoneExecPro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefExecPro.current = currentExecutionId;

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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const execStream = exec.body;
    if (!execStream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerExec = execStream.getReader();
    const decoderExec = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: doneExecReading } = await readerExec.read();
      done = doneExecReading;
      const chunkValue = decoderExec.decode(value);
      if (executionIdRefExecPro.current === currentExecutionId) {
        setGeneratedExecPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefExecPro.current === currentExecutionId) {
      setDoneExecPro(true);
      setRunningExecPro(false);
      console.log('set Exec done');
    }
  }

  const doneRef1Pro = useRef(false);
  const generatedSitu1RefPro = useRef('');

  async function generateSitu1IndKeyPro() {
    setRunningSitu1Pro(true);
    // generate situ1 first
    setGeneratedSitu1IndKeyPro('');
    setDoneSitu1Pro(false);
    setDoneMark1Pro(false);
    setLoadingPro(true);

    doneRef1Pro.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const situ1Stream = situ1.body;
    if (!situ1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerSitu1 = situ1Stream.getReader();
    const decoderSitu1 = new TextDecoder();
    // let done = false;

    while (!doneRef1Pro.current) {
      //-------------------------------------------------------
      const { value, done: doneSitu1Reading } = await readerSitu1.read();
      doneRef1Pro.current = doneSitu1Reading;
      const chunkValue = decoderSitu1.decode(value);
      generatedSitu1RefPro.current = generatedSitu1RefPro.current + chunkValue;
      if (executionIdRefSitu1Pro.current === currentExecutionId) {
        setGeneratedSitu1IndKeyPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu1Pro.current === currentExecutionId) {
      setDoneSitu1Pro(true);
      setRunningSitu1Pro(false);
      console.log('set Situ1 done');
    }
  }

  async function generateSitu2SWOTPro() {
    setRunningSitu2Pro(true);
    setGeneratedSitu2SWOTPro('');
    setDoneSitu2Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefSitu2Pro.current = currentExecutionId;

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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const situ2Stream = situ2.body;
    if (!situ2Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerSitu2 = situ2Stream.getReader();
    const decoderSitu2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneSitu2Reading } = await readerSitu2.read();
      done = doneSitu2Reading;
      const chunkValue = decoderSitu2.decode(value);
      if (executionIdRefSitu2Pro.current === currentExecutionId) {
        setGeneratedSitu2SWOTPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefSitu2Pro.current === currentExecutionId) {
      setDoneSitu2Pro(true);
      setRunningSitu2Pro(false);
      console.log('set Situ2 done');
    }
  }

  const doneRefMark2Pro = useRef(false);
  const generatedMark2RefPro = useRef('');

  async function generateMark2STPPro() {
    setRunningMark2Pro(true);
    setGeneratedMark2STPPro('');
    setDoneMark2Pro(false);
    setLoadingPro(true);
    doneRefMark2Pro.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMark2Pro.current = currentExecutionId;

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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const mark2Stream = mark2.body;
    if (!mark2Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMark2 = mark2Stream.getReader();
    const decoderMark2 = new TextDecoder();
    // let done = false;

    while (!doneRefMark2Pro.current) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      doneRefMark2Pro.current = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      generatedMark2RefPro.current = generatedMark2RefPro.current + chunkValue;
      if (executionIdRefMark2Pro.current === currentExecutionId) {
        setGeneratedMark2STPPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMark2Pro.current === currentExecutionId) {
      setDoneMark2Pro(true);
      setRunningMark2Pro(false);
      console.log('set Mark2 done');
    }
  }

  async function generateOp1ActKPIsPro() {
    setRunningOp1Pro(true);
    setGeneratedOp1ActKPIsPro('');
    setDoneOp1Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const op1Stream = op1.body;
    if (!op1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerOp1 = op1Stream.getReader();
    const decoderOp1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneOp1Reading } = await readerOp1.read();
      done = doneOp1Reading;
      const chunkValue = decoderOp1.decode(value);
      if (executionIdRefOp1Pro.current === currentExecutionId) {
        setGeneratedOp1ActKPIsPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp1Pro.current === currentExecutionId) {
      setDoneOp1Pro(true);
      setRunningOp1Pro(false);
      console.log('set Op1 done');
    }
  }

  async function generateOp2QCImpPlanPro() {
    setRunningOp2Pro(true);
    setGeneratedOp2QCImpPlanPro('');
    setDoneOp2Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefOp2Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const op2Stream = op2.body;
    if (!op2Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerOp2 = op2Stream.getReader();
    const decoderOp2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneOp2Reading } = await readerOp2.read();
      done = doneOp2Reading;
      const chunkValue = decoderOp2.decode(value);
      if (executionIdRefOp2Pro.current === currentExecutionId) {
        setGeneratedOp2QCImpPlanPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefOp2Pro.current === currentExecutionId) {
      setDoneOp2Pro(true);
      setRunningOp2Pro(false);
      console.log('set Op2 done');
    }
  }

  async function generateTech1AllPro() {
    setRunningTech1Pro(true);
    setGeneratedTech1AllPro('');
    setDoneTech1Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefTech1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const Tech1Stream = Tech1.body;
    if (!Tech1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerTech1 = Tech1Stream.getReader();
    const decoderTech1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneTech1Reading } = await readerTech1.read();
      done = doneTech1Reading;
      const chunkValue = decoderTech1.decode(value);
      if (executionIdRefTech1Pro.current === currentExecutionId) {
        setGeneratedTech1AllPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefTech1Pro.current === currentExecutionId) {
      setDoneTech1Pro(true);
      setRunningTech1Pro(false);
      console.log('set Tech1 done');
    }
  }

  async function generateTech2DigiPro() {
    setRunningTech2Pro(true);
    setGeneratedTech2DigiPro('');
    setDoneTech2Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefTech2Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const Tech2Stream = Tech2.body;
    if (!Tech2Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerTech2 = Tech2Stream.getReader();
    const decoderTech2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneTech2Reading } = await readerTech2.read();
      done = doneTech2Reading;
      const chunkValue = decoderTech2.decode(value);
      if (executionIdRefTech2Pro.current === currentExecutionId) {
        setGeneratedTech2DigiPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefTech2Pro.current === currentExecutionId) {
      setDoneTech2Pro(true);
      setRunningTech2Pro(false);
      console.log('set Tech2 done');
    }
  }

  const doneRefMang1Pro = useRef(false);
  const generatedMang1RefPro = useRef('');

  async function generateMang1StrucRolePro() {
    setRunningMang1Pro(true);
    setGeneratedMang1StrucRolePro('');
    setDoneMang1Pro(false);
    setDoneMang2Pro(false);
    setLoadingPro(true);
    doneRefMang1Pro.current = false;

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const Mang1Stream = Mang1.body;
    if (!Mang1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMang1 = Mang1Stream.getReader();
    const decoderMang1 = new TextDecoder();

    while (!doneRefMang1Pro.current) {
      const { value, done: doneMang1Reading } = await readerMang1.read();
      doneRefMang1Pro.current = doneMang1Reading;
      const chunkValue = decoderMang1.decode(value);
      generatedMang1RefPro.current = generatedMang1RefPro.current + chunkValue;
      if (executionIdRefMang1Pro.current === currentExecutionId) {
        setGeneratedMang1StrucRolePro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang1Pro.current === currentExecutionId) {
      setDoneMang1Pro(true);
      setRunningMang1Pro(false);
      console.log('set Mang1 done');
    }
  }

  async function generateMang2RecTrainCSRPro(mang1Ref) {
    setRunningMang2Pro(true);
    setGeneratedMang2RecTrainCSRPro('');
    setDoneMang2Pro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefMang2Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const Mang2Stream = Mang2.body;
    if (!Mang2Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerMang2 = Mang2Stream.getReader();
    const decoderMang2 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneMang2Reading } = await readerMang2.read();
      done = doneMang2Reading;
      const chunkValue = decoderMang2.decode(value);
      if (executionIdRefMang2Pro.current === currentExecutionId) {
        setGeneratedMang2RecTrainCSRPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefMang2Pro.current === currentExecutionId) {
      setDoneMang2Pro(true);
      setRunningMang2Pro(false);
      console.log('set Mang2 done');
    }
  }

  async function generateGrowthPro() {
    setRunningGrowthPro(true);
    setGeneratedGrowthPro('');
    setDoneGrowthPro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefGrowthPro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const GrowthStream = Growth.body;
    if (!GrowthStream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerGrowth = GrowthStream.getReader();
    const decoderGrowth = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneGrowthReading } = await readerGrowth.read();
      done = doneGrowthReading;
      const chunkValue = decoderGrowth.decode(value);
      if (executionIdRefGrowthPro.current === currentExecutionId) {
        setGeneratedGrowthPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefGrowthPro.current === currentExecutionId) {
      setDoneGrowthPro(true);
      setRunningGrowthPro(false);
      console.log('set Growth done');
    }
  }

  async function generateRiskPro() {
    setRunningRiskPro(true);
    setGeneratedRiskPro('');
    setDoneRiskPro(false);
    setLoadingPro(true);

    const currentExecutionId = Date.now(); // Generate a unique execution ID
    executionIdRefRisk1Pro.current = currentExecutionId;
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
        planLanguage,
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
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    // This data is a ReadableStream
    const Risk1Stream = Risk1.body;
    if (!Risk1Stream) {
      setIsErrorPro(true);
      setLoadingPro(false);
      return;
    }

    const readerRisk1 = Risk1Stream.getReader();
    const decoderRisk1 = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneRiskReading } = await readerRisk1.read();
      done = doneRiskReading;
      const chunkValue = decoderRisk1.decode(value);
      if (executionIdRefRisk1Pro.current === currentExecutionId) {
        setGeneratedRiskPro((prev) => prev + chunkValue);
      } else {
        // If the execution ID has changed, break the loop
        break;
      }
    }

    if (executionIdRefRisk1Pro.current === currentExecutionId) {
      setDoneRiskPro(true);
      setRunningRiskPro(false);
      console.log('set Risk1 done');
    }
  }

  const startTimePro = useRef<number | null>(null);
  const intervalIdRefPro = useRef(null);
  async function generatePlanPro() {
    startTimePro.current = Date.now();
    setAllDoneAndFullContentPro(false);
    setIsErrorPro(false);
    setLoadingPro(true);
    setShowGeneratePlanButtonPro(false);
    generateExecPro();

    generateSitu1IndKeyPro(); // this will trigger mark1
    generateSitu2SWOTPro();

    generateMark2STPPro(); // this will trigger mark3, mark4, mark5, mark6

    generateOp1ActKPIsPro();
    generateOp2QCImpPlanPro();

    generateTech1AllPro();
    generateTech2DigiPro();

    generateMang1StrucRolePro(); // this will trigger mang2

    generateGrowthPro();

    generateRiskPro();

    intervalIdRefPro.current = setInterval(() => {
      if (Date.now() - startTimePro.current >= 900000) {
        setIsErrorPro(true);
        setLoadingPro(false);
        clearInterval(intervalIdRefPro.current);
      }
    }, 1000);
  }

  const startTimeStarter = useRef<number | null>(null);
  const intervalIdRefStarter = useRef(null);
  async function generatePlanStarter(modelName?: string) {
    startTimeStarter.current = Date.now();
    setIsErrorStarter(false);
    setLoadingStarter(true);
    setShowGeneratePlanButtonStarter(false);
    generateExecStarter(modelName); //
    generateSitu1andMark1Starter(modelName); // mark1
    generateSitu2Starter(modelName); //
    generateMark2Mark3Mark4Starter(modelName); //generated in another function above
    generateOp1Starter(modelName);
    generateMang1Starter(modelName);
    generateRisk1Starter(modelName);

    // Set an interval to check if 70 seconds have passed can change 120000 to adjust timeout
    intervalIdRefStarter.current = setInterval(() => {
      if (Date.now() - startTimeStarter.current >= 120000) {
        setIsErrorStarter(true);
        setLoadingStarter(false);
        clearInterval(intervalIdRefStarter.current);
      }
    }, 1000);
  }

  // for generating example plan
  const startTime = useRef(null);
  const intervalIdRef = useRef(null);
  async function generatePlan(modelName?: string) {
    startTime.current = Date.now();
    setIsError(false);
    setShowGeneratePlanButton(false);

    setLoading(true);
    generateExec(modelName);
    generateSitu1andMark1(modelName); // mark1
    generateSitu2(modelName); //
    generateMark2(modelName);

    // Set an interval to check if 70 seconds have passed can change 120000 to adjust timeout

    intervalIdRef.current = setInterval(() => {
      if (Date.now() - startTime.current >= 120000) {
        setIsError(true);
        setLoading(false);
        clearInterval(intervalIdRef.current);
      }
    }, 1000);
  }

  const handleGeneratePlan = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    generatePlan();
  };

  const handleGeneratePlanStarter = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    setWarningModal({ isOpen: false, fn: () => {} });
    generatePlanStarter();
  };
  const handleGeneratePlanPro = () => {
    trackEvent({
      event_name: 'page_8_generate_plan_button',
      is_clean_case: true,
    });
    setWarningModal({ isOpen: false, fn: () => {} });
    generatePlanPro();
  };

  const [addNewPlanDone, setAddNewPlanDone] = useState(false);
  const [runGeneratePrompt, setRunGeneratePrompt] = useState(false);
  const [productInfoPrompt, setProductInfoPrompt] = useState('');
  const isFinanceIncomplete =
    !planId || userData?.plans[planId]?.isFinanceIncomplete;

  useEffect(() => {
    if (!session) return;

    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      const res = await fetch('/api/getAllUserData', {
        headers: {
          [API_KEY_HEADER]: secretKey,
        },
      });
      const data = await res.json();
      setuserData(data);

      if (data) {
        if (data.paymentStatus === 'paid' && data.paymentId) {
          setPaid(true);
          clearInterval(interval); // Clear the interval when paymentStatus is "paid"
          return;
        }
      }

      counter++; // Increment the counter

      // Clear the interval and stop fetching if the counter reaches 5
      if (counter >= 5) {
        clearInterval(interval);
      }
    }

    fetchUserData(); // Fetch data initially

    // Call the fetchUserData function every 5 seconds (5000 ms)
    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [addNewPlanDone, isFinanceIncomplete]);

  //helper functions-------------------------------------------------------
  const generatePrompt = (
    products: { name: string; description: string }[],
  ) => {
    let prompt = '';

    products.forEach((product, index) => {
      if (product.name) {
        prompt += `Client's product or service #${index + 1} Name: ${product.name}\n`;
      }

      if (product.description) {
        prompt += `Client's product or service #${index + 1} Description: ${product.description}\n`;
      }
    });

    return prompt;
  };

  useEffect(() => {
    const products = [
      { name: productName1, description: productDescription1 },
      { name: productName2, description: productDescription2 },
      { name: productName3, description: productDescription3 },
      { name: productName4, description: productDescription4 },
      { name: productName5, description: productDescription5 },
    ];

    const prompt = generatePrompt(products);
    setProductInfoPrompt(prompt);
  }, [runGeneratePrompt]);

  const fetchReviews = async () => {
    const res = await fetch('/api/trustpilot/reviews', {
      headers: {
        [API_KEY_HEADER]: secretKey,
      },
    });
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    setRunGeneratePrompt(true);
    fetchReviews();
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
        variantID,
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
    if (toggleFocusExec) {
      setFocusExec(true);
    }
  }, [toggleFocusExec]);
  // end of exec form code -------------------------------------------------------------------------------

  //get the last array number in userData.plans array and setPlanId to that number
  useEffect(() => {
    if (planId) {
      setPlanId(planId);
      setHasAddedNewPlan(true);
      setShowGeneratePlanButtonStarter(false);
      setShowGeneratePlanButtonPro(false);
      setInputData(userData?.plans[planId]?.originalVer?.userInput);
      console.log('userData:', userData, planId);
      setPlanContent(userData?.plans[planId]?.originalVer?.planContent);
      localStorage.removeItem('formData');
      localStorage.removeItem('hasGenDynamicQuestion');
    }
  }, [planId, userData, isFinanceIncomplete]);

  useEffect(() => {
    if (isPlanCompleted) {
      setAllDoneGenerating(false);
      setAllDoneGeneratingStarter(false);
    }
  }, [isPlanCompleted]);

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

  useEffect(() => {
    if (allDoneGenerating) {
      console.log(
        'allDoneGenerating is true, clearing interval: ',
        intervalIdRef.current,
      );
      clearInterval(intervalIdRef.current);
      setLoading(false);
      setIsShow(true);
    }
  }, [allDoneGenerating]);

  useEffect(() => {
    let limit = 1000;
    if (planLanguage === 'ja') {
      limit -= 600;
    } else if (planLanguage === 'ar') {
      limit -= 100;
    }

    if (allDoneGenerating) {
      console.log('Length of generatedExec: ', generatedExec.length);
      if (generatedExec.length < limit) {
        generateExec();
      }
      console.log('Length of generatedSitu2: ', generatedSitu2.length);
      if (generatedSitu2.length < limit) {
        generateSitu2();
      }
      console.log('Length of generatedSitu1: ', generatedSitu1.length);
      if (generatedSitu1.length < limit) {
        generateSitu1andMark1();
      } else {
        console.log('Length of generatedMark1: ', generatedMark1.length);
        if (generatedMark1.length < limit) {
          generateMark1(generatedSitu1);
        }
      }
      console.log('Length of generatedMark2: ', generatedMark2.length);
      if (generatedMark2.length < limit) {
        generateMark2();
      }
    }
  }, [allDoneGenerating]);

  //set setLatestPlanIDStarterPro with userData.latestPlanID

  useEffect(() => {
    console.log('storing latestPlanIDPro:', latestPlanIDPro);
    localStorage.setItem('latestPlanIDPro', latestPlanIDPro);
  }, [latestPlanIDPro]);

  // counting chars ----------------------------------------------
  const [doneAndFullContentExecPro, setDoneAndFullContentExecPro] =
    useState(false);
  const [doneAndFullContentSitu1Pro, setDoneAndFullContentSitu1Pro] =
    useState(false);
  const [doneAndFullContentSitu2Pro, setDoneAndFullContentSitu2Pro] =
    useState(false);
  const [doneAndFullContentMark1Pro, setDoneAndFullContentMark1Pro] =
    useState(false);
  const [doneAndFullContentMark2Pro, setDoneAndFullContentMark2Pro] =
    useState(false);
  const [doneAndFullContentMark3Pro, setDoneAndFullContentMark3Pro] =
    useState(false);
  const [doneAndFullContentMark4Pro, setDoneAndFullContentMark4Pro] =
    useState(false);
  const [doneAndFullContentMark5Pro, setDoneAndFullContentMark5Pro] =
    useState(false);
  const [doneAndFullContentMark6Pro, setDoneAndFullContentMark6Pro] =
    useState(false);
  const [doneAndFullContentOp1Pro, setDoneAndFullContentOp1Pro] =
    useState(false);
  const [doneAndFullContentOp2Pro, setDoneAndFullContentOp2Pro] =
    useState(false);
  const [doneAndFullContentTech1Pro, setDoneAndFullContentTech1Pro] =
    useState(false);
  const [doneAndFullContentTech2Pro, setDoneAndFullContentTech2Pro] =
    useState(false);
  const [doneAndFullContentMang1Pro, setDoneAndFullContentMang1Pro] =
    useState(false);
  const [doneAndFullContentMang2Pro, setDoneAndFullContentMang2Pro] =
    useState(false);
  const [doneAndFullContentGrowthPro, setDoneAndFullContentGrowthPro] =
    useState(false);
  const [doneAndFullContentRiskPro, setDoneAndFullContentRiskPro] =
    useState(false);

  const [hasAddedNewPlanPro, setHasAddedNewPlanPro] = useState(false);
  // this is used when user already signs up and is logged in
  async function addNewPlanPro() {
    console.log('addNewPlanPro running');
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
      specificProductQuestion1: {
        value: specificProductQuestion1?.value,
        topic: specificProductQuestion1?.topic,
      },
      specificProductQuestion2: {
        value: specificProductQuestion2?.value,
        topic: specificProductQuestion2?.topic,
      },
      specificProductQuestion3: {
        value: specificProductQuestion3?.value,
        topic: specificProductQuestion3?.topic,
      },
      specificProductQuestion4: {
        value: specificProductQuestion4?.value,
        topic: specificProductQuestion4?.topic,
      },
      specificProductQuestion5: {
        value: specificProductQuestion5?.value,
        topic: specificProductQuestion5?.topic,
      },
      specificProductAnswer1,
      specificProductAnswer2,
      specificProductAnswer3,
      specificProductAnswer4,
      specificProductAnswer5,
      specificOperationQuestion1: {
        value: specificOperationQuestion1?.value,
        topic: specificOperationQuestion1?.topic,
      },
      specificOperationQuestion2: {
        value: specificOperationQuestion2?.value,
        topic: specificOperationQuestion2?.topic,
      },
      specificOperationQuestion3: {
        value: specificOperationQuestion3?.value,
        topic: specificOperationQuestion3?.topic,
      },
      specificOperationQuestion4: {
        value: specificOperationQuestion4?.value,
        topic: specificOperationQuestion4?.topic,
      },
      specificOperationQuestion5: {
        value: specificOperationQuestion5?.value,
        topic: specificOperationQuestion5?.topic,
      },
      specificOperationAnswer1,
      specificOperationAnswer2,
      specificOperationAnswer3,
      specificOperationAnswer4,
      specificOperationAnswer5,
    };

    const planContent = {
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
    };

    const newPlan = {
      userInput,
      planContent,
      refId,
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
          setPlanId(data.planId);
          localStorage.removeItem('formData');
          localStorage.removeItem('hasGenDynamicQuestion');
          setAddNewPlanDone(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (
      doneAndFullContentExecPro &&
      doneAndFullContentSitu1Pro &&
      doneAndFullContentSitu2Pro &&
      doneAndFullContentMark1Pro &&
      doneAndFullContentMark2Pro &&
      doneAndFullContentMark3Pro &&
      doneAndFullContentMark4Pro &&
      doneAndFullContentMark5Pro &&
      doneAndFullContentMark6Pro &&
      doneAndFullContentOp1Pro &&
      doneAndFullContentOp2Pro &&
      doneAndFullContentTech1Pro &&
      doneAndFullContentTech2Pro &&
      doneAndFullContentMang1Pro &&
      doneAndFullContentMang2Pro &&
      doneAndFullContentGrowthPro &&
      doneAndFullContentRiskPro &&
      !hasAddedNewPlanPro
    ) {
      console.log('addNewPlanPro running');
      addNewPlanPro();
      if (session) {
        localStorage.setItem(
          `hasAddedNewPlanPro_${session.user.email}_${latestPlanIDPro}`,
          'true',
        );
      }
      setHasAddedNewPlanPro(true);
      setAllDoneAndFullContentPro(true);
      setLoadingPro(false);
      if (planLanguage.value === 'en-uk') {
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
    doneAndFullContentExecPro,
    doneAndFullContentSitu1Pro,
    doneAndFullContentSitu2Pro,
    doneAndFullContentMark1Pro,
    doneAndFullContentMark2Pro,
    doneAndFullContentMark3Pro,
    doneAndFullContentMark4Pro,
    doneAndFullContentMark5Pro,
    doneAndFullContentMark6Pro,
    doneAndFullContentOp1Pro,
    doneAndFullContentOp2Pro,
    doneAndFullContentTech1Pro,
    doneAndFullContentTech2Pro,
    doneAndFullContentMang1Pro,
    doneAndFullContentMang2Pro,
    doneAndFullContentGrowthPro,
    doneAndFullContentRiskPro,
    hasAddedNewPlanPro,
    latestPlanIDPro,
  ]);

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

  const handleNextFormik = () => {
    router.push(ROUTE_PATH.register);
  };

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
    router.push({
      pathname: '/form/example-plan',
      query: {
        packagePlan: 'professional',
      },
    });
  }

  function viewExampleStarter() {
    router.push({
      pathname: '/form/example-plan',
      query: {
        packagePlan: 'starter',
      },
    });
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

  // country ------------------------------------------------
  const [country, setCountry] = useState('');
  useEffect(() => {
    let countryFromLocal;
    if (typeof window !== 'undefined') {
      countryFromLocal = localStorage.getItem('country');
    }
    setCountry(countryFromLocal);
  }, []);
  console.log('country: ', country);

  // prices -------------------------------------------------
  const [discountedStarterPrice, setDiscountedStarterPrice] = useState('');
  const [discountedProPrice, setDiscountedProPrice] = useState('');

  const [isShow, setIsShow] = useState(false);

  const [doneTimerPro, setDoneTimerPro] = useState(true);
  useEffect(() => {
    if (allDoneAndFullContentPro) {
      setTimeout(() => {
        setDoneTimerPro(false);
      }, 15000);
    }
  }, [allDoneAndFullContentPro]);

  useEffect(() => {
    if (userData && !userData.variantID) {
      fetch('/api/updateUserVariantID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          email: userData.email,
          variantID: variantID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData]);

  useEffect(() => {
    if (allDoneAndFullContentPro) {
      clearInterval(intervalIdRefPro.current);
      setLoadingPro(false);
    }
  }, [allDoneAndFullContentPro]);

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
    if (doneExecPro && limit) {
      const cleanedTextExec = generatedExecPro.replace(/^"|"$/g, '');
      setGeneratedExecPro(cleanedTextExec);

      const execLength = generatedExecPro.length;
      if (execLength <= limit) {
        console.log(
          `generatedExecPro has less than ${limit} chars, generating again`,
        );
        generateExecPro();
      } else {
        setDoneAndFullContentExecPro(true);
      }
    }
  }, [doneExecPro, limit]);

  useEffect(() => {
    if (doneSitu1Pro && limit) {
      const cleanedTextSitu1 = generatedSitu1IndKeyPro.replace(/^"|"$/g, '');
      setGeneratedSitu1IndKeyPro(cleanedTextSitu1);

      const situ1Length = generatedSitu1IndKeyPro.length;
      if (situ1Length <= limit) {
        console.log(
          `generatedSitu1IndKeyPro has less than ${limit} chars, generating again`,
        );
        generateSitu1IndKeyPro(); // this will trigger mark1
      } else {
        setDoneAndFullContentSitu1Pro(true);
      }
    }
  }, [doneSitu1Pro, limit]);

  useEffect(() => {
    if (doneAndFullContentSitu1Pro) {
      generateMark1ObjPro(generatedSitu1IndKeyPro);
    }
  }, [doneAndFullContentSitu1Pro]);

  useEffect(() => {
    if (doneSitu2Pro && limit) {
      const cleanedTextSitu2 = generatedSitu2SWOTPro.replace(/^"|"$/g, '');
      setGeneratedSitu2SWOTPro(cleanedTextSitu2);

      const situ2Length = generatedSitu2SWOTPro.length;
      if (situ2Length <= limit) {
        console.log(
          `generatedSitu2SWOTPro has less than ${limit} chars, generating again`,
        );
        generateSitu2SWOTPro();
      } else {
        setDoneAndFullContentSitu2Pro(true);
      }
    }
  }, [doneSitu2Pro, limit]);

  useEffect(() => {
    if (doneMark1Pro && limit) {
      const cleanedTextMark1 = generatedMark1ObjPro.replace(/^"|"$/g, '');
      setGeneratedMark1ObjPro(cleanedTextMark1);

      const mark1Length = generatedMark1ObjPro.length;
      if (mark1Length <= limit) {
        console.log(
          `generatedMark1ObjPro has less than ${limit} chars, generating again`,
        );
        if (doneAndFullContentSitu1Pro)
          generateMark1ObjPro(generatedSitu1IndKeyPro);
      } else {
        setDoneAndFullContentMark1Pro(true);
      }
    }
  }, [doneMark1Pro, limit]);

  useEffect(() => {
    if (doneMark2Pro && limit) {
      const cleanedTextMark2 = generatedMark2STPPro.replace(/^"|"$/g, '');
      setGeneratedMark2STPPro(cleanedTextMark2);

      const mark2Length = generatedMark2STPPro.length;
      if (mark2Length <= limit) {
        console.log(
          `generatedMark2STPPro has less than ${limit} chars, generating again`,
        );
        generateMark2STPPro();
      } else {
        setDoneAndFullContentMark2Pro(true);
      }
    }
  }, [doneMark2Pro, limit]);

  useEffect(() => {
    if (doneAndFullContentMark2Pro) {
      generateMark3DecisionPro(generatedMark2STPPro);
      generateMark4ProductPro(generatedMark2STPPro);
      generateMark5PriceDistPro(generatedMark2STPPro);
      generateMark6AdPro(generatedMark2STPPro);
    }
  }, [doneAndFullContentMark2Pro]);

  useEffect(() => {
    if (doneMark3Pro && limit) {
      const cleanedTextMark3 = generatedMark3DecisionPro.replace(/^"|"$/g, '');
      setGeneratedMark3DecisionPro(cleanedTextMark3);

      const mark3Length = generatedMark3DecisionPro.length;
      if (mark3Length <= limit) {
        if (doneAndFullContentMark2Pro)
          generateMark3DecisionPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark3Pro(true);
      }
    }
  }, [doneMark3Pro, limit]);

  useEffect(() => {
    if (doneMark4Pro && limit) {
      const cleanedTextMark4 = generatedMark4ProductPro.replace(/^"|"$/g, '');
      setGeneratedMark4ProductPro(cleanedTextMark4);

      const mark4Length = generatedMark4ProductPro.length;
      if (mark4Length <= limit) {
        if (doneAndFullContentMark2Pro)
          generateMark4ProductPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark4Pro(true);
      }
    }
  }, [doneMark4Pro, limit]);

  useEffect(() => {
    if (doneMark5Pro && limit) {
      const cleanedTextMark5 = generatedMark5PriceDistPro.replace(/^"|"$/g, '');
      setGeneratedMark5PriceDistPro(cleanedTextMark5);

      const mark5Length = generatedMark5PriceDistPro.length;
      if (mark5Length <= limit) {
        if (doneAndFullContentMark2Pro)
          generateMark5PriceDistPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark5Pro(true);
      }
    }
  }, [doneMark5Pro, limit]);

  useEffect(() => {
    if (doneMark6Pro && limit) {
      const cleanedTextMark6 = generatedMark6AdPro.replace(/^"|"$/g, '');
      setGeneratedMark6AdPro(cleanedTextMark6);

      const mark6Length = generatedMark6AdPro.length;
      if (mark6Length <= limit) {
        if (doneAndFullContentMark2Pro)
          generateMark6AdPro(generatedMark2STPPro);
      } else {
        setDoneAndFullContentMark6Pro(true);
      }
    }
  }, [doneMark6Pro, limit]);

  useEffect(() => {
    if (doneOp1Pro && limit) {
      const cleanedTextOp1 = generatedOp1ActKPIsPro.replace(/^"|"$/g, '');
      setGeneratedOp1ActKPIsPro(cleanedTextOp1);

      const op1Length = generatedOp1ActKPIsPro.length;
      if (op1Length <= limit) {
        generateOp1ActKPIsPro();
      } else {
        setDoneAndFullContentOp1Pro(true);
      }
    }
  }, [doneOp1Pro, limit]);

  useEffect(() => {
    if (doneOp2Pro && limit) {
      const cleanedTextOp2 = generatedOp2QCImpPlanPro.replace(/^"|"$/g, '');
      setGeneratedOp2QCImpPlanPro(cleanedTextOp2);

      const op2Length = generatedOp2QCImpPlanPro.length;
      if (op2Length <= limit) {
        generateOp2QCImpPlanPro();
      } else {
        setDoneAndFullContentOp2Pro(true);
      }
    }
  }, [doneOp2Pro, limit]);

  useEffect(() => {
    if (doneTech1Pro && limit) {
      const cleanedTextTech1 = generatedTech1AllPro.replace(/^"|"$/g, '');
      setGeneratedTech1AllPro(cleanedTextTech1);

      const tech1Length = generatedTech1AllPro.length;
      if (tech1Length <= limit) {
        generateTech1AllPro();
      } else {
        setDoneAndFullContentTech1Pro(true);
      }
    }
  }, [doneTech1Pro, limit]);

  useEffect(() => {
    if (doneTech2Pro && limit) {
      const cleanedTextTech2 = generatedTech2DigiPro.replace(/^"|"$/g, '');
      setGeneratedTech2DigiPro(cleanedTextTech2);

      const tech2Length = generatedTech2DigiPro.length;
      if (tech2Length <= limit) {
        generateTech2DigiPro();
      } else {
        setDoneAndFullContentTech2Pro(true);
      }
    }
  }, [doneTech2Pro, limit]);

  useEffect(() => {
    if (doneMang1Pro && limit) {
      const cleanedTextMang1 = generatedMang1StrucRolePro.replace(/^"|"$/g, '');
      setGeneratedMang1StrucRolePro(cleanedTextMang1);

      const mang1Length = generatedMang1StrucRolePro.length;
      if (mang1Length <= limit) {
        generateMang1StrucRolePro();
      } else {
        setDoneAndFullContentMang1Pro(true);
      }
    }
  }, [doneMang1Pro, limit]);

  useEffect(() => {
    if (doneAndFullContentMang1Pro) {
      generateMang2RecTrainCSRPro(generatedMang1StrucRolePro);
    }
  }, [doneAndFullContentMang1Pro]);

  useEffect(() => {
    if (doneMang2Pro && limit) {
      const cleanedTextMang2 = generatedMang2RecTrainCSRPro.replace(
        /^"|"$/g,
        '',
      );
      setGeneratedMang2RecTrainCSRPro(cleanedTextMang2);

      const mang2Length = generatedMang2RecTrainCSRPro.length;
      if (mang2Length <= limit) {
        generateMang2RecTrainCSRPro(generatedMang2RecTrainCSRPro);
      } else {
        setDoneAndFullContentMang2Pro(true);
      }
    }
  }, [doneMang2Pro, limit]);

  useEffect(() => {
    if (doneGrowthPro && limit) {
      const cleanedTextGrowth = generatedGrowthPro.replace(/^"|"$/g, '');
      setGeneratedGrowthPro(cleanedTextGrowth);

      const growthLength = generatedGrowthPro.length;
      if (growthLength <= limit) {
        generateGrowthPro();
      } else {
        setDoneAndFullContentGrowthPro(true);
      }
    }
  }, [doneGrowthPro, limit]);

  useEffect(() => {
    if (doneRiskPro && limit) {
      const cleanedTextRisk = generatedRiskPro.replace(/^"|"$/g, '');
      setGeneratedRiskPro(cleanedTextRisk);

      const riskLength = generatedRiskPro.length;
      if (riskLength <= limit) {
        generateRiskPro();
      } else {
        setDoneAndFullContentRiskPro(true);
      }
    }
  }, [doneRiskPro, limit]);

  const timerRefExecPro = useRef(null);
  const timerRefSitu1Pro = useRef(null);
  const timerRefSitu2Pro = useRef(null);
  const timerRefMark1Pro = useRef(null);
  const timerRefMark2Pro = useRef(null);
  const timerRefMark3Pro = useRef(null);
  const timerRefMark4Pro = useRef(null);
  const timerRefMark5Pro = useRef(null);
  const timerRefMark6Pro = useRef(null);
  const timerRefOp1Pro = useRef(null);
  const timerRefOp2Pro = useRef(null);
  const timerRefTech1Pro = useRef(null);
  const timerRefTech2Pro = useRef(null);
  const timerRefMang1Pro = useRef(null);
  const timerRefMang2Pro = useRef(null);
  const timerRefGrowthPro = useRef(null);
  const timerRefRiskPro = useRef(null);

  useEffect(() => {
    if (runningExecPro) {
      timerRefExecPro.current = setTimeout(() => {
        console.log(
          'generateExecPro took longer than 2 minutes, generating again',
        );
        generateExecPro();
      }, 120000);
    } else {
      console.log('runningExecPro is false, clearing timeout');
      clearTimeout(timerRefExecPro.current);
    }

    return () => {
      if (!runningExecPro) clearTimeout(timerRefExecPro.current);
    };
  }, [runningExecPro]);

  useEffect(() => {
    if (runningSitu1Pro) {
      timerRefSitu1Pro.current = setTimeout(() => {
        console.log(
          'generateSitu1IndKeyPro() took longer than 4 minutes, generating again',
        );
        generateSitu1IndKeyPro();
      }, 240000);
    } else {
      console.log('runningSitu1Pro is false, clearing timeout');
      clearTimeout(timerRefSitu1Pro.current);
    }

    return () => {
      if (!runningSitu1Pro) clearTimeout(timerRefSitu1Pro.current);
    };
  }, [runningSitu1Pro]);

  useEffect(() => {
    if (runningSitu2Pro) {
      timerRefSitu2Pro.current = setTimeout(() => {
        console.log(
          'generateSitu2SWOTPro took longer than 2 minutes, generating again',
        );
        generateSitu2SWOTPro();
      }, 180000);
    } else {
      console.log('runningSitu2Pro is false, clearing timeout');
      clearTimeout(timerRefSitu2Pro.current);
    }

    return () => {
      console.log('Cleanup: clearing timeout');
      clearTimeout(timerRefSitu2Pro.current);
    };
  }, [runningSitu2Pro]);

  useEffect(() => {
    if (runningMark1Pro) {
      if (doneAndFullContentSitu1Pro) {
        timerRefMark1Pro.current = setTimeout(() => {
          console.log(
            'generateMark1ObjPro took longer than 2 minutes, generating again',
          );
          generateMark1ObjPro(generatedSitu1IndKeyPro);
        }, 180000);
      }
    } else {
      console.log('runningMark1Pro is false, clearing timeout');
      clearTimeout(timerRefMark1Pro.current);
    }

    return () => {
      if (!runningMark1Pro) clearTimeout(timerRefMark1Pro.current);
    };
  }, [runningMark1Pro]);

  useEffect(() => {
    if (runningMark2Pro) {
      timerRefMark2Pro.current = setTimeout(() => {
        console.log(
          'generateMark2STPPro took longer than 2 minutes, generating again',
        );
        generateMark2STPPro();
      }, 180000);
    } else {
      console.log('runningMark2Pro is false, clearing timeout');
      clearTimeout(timerRefMark2Pro.current);
    }

    return () => {
      if (!runningMark2Pro) clearTimeout(timerRefMark2Pro.current);
    };
  }, [runningMark2Pro]);

  useEffect(() => {
    if (runningMark3Pro) {
      if (doneAndFullContentMark2Pro) {
        timerRefMark3Pro.current = setTimeout(() => {
          generateMark3DecisionPro(generatedMark2STPPro);
        }, 180000);
      }
    } else {
      console.log('runningMark3Pro is false, clearing timeout');
      clearTimeout(timerRefMark3Pro.current);
    }

    return () => {
      if (!runningMark3Pro) clearTimeout(timerRefMark3Pro.current);
    };
  }, [runningMark3Pro]);

  useEffect(() => {
    if (runningMark4Pro) {
      if (doneAndFullContentMark2Pro) {
        timerRefMark4Pro.current = setTimeout(() => {
          generateMark4ProductPro(generatedMark2STPPro);
        }, 180000);
      }
    } else {
      console.log('runningMark4Pro is false, clearing timeout');
      clearTimeout(timerRefMark4Pro.current);
    }

    return () => {
      if (!runningMark4Pro) clearTimeout(timerRefMark4Pro.current);
    };
  }, [runningMark4Pro]);

  useEffect(() => {
    if (runningMark5Pro) {
      if (doneAndFullContentMark2Pro) {
        timerRefMark5Pro.current = setTimeout(() => {
          generateMark5PriceDistPro(generatedMark2STPPro);
        }, 180000);
      }
    } else {
      console.log('runningMark5Pro is false, clearing timeout');
      clearTimeout(timerRefMark5Pro.current);
    }

    return () => {
      if (!runningMark5Pro) clearTimeout(timerRefMark5Pro.current);
    };
  }, [runningMark5Pro]);

  useEffect(() => {
    if (runningMark6Pro) {
      if (doneAndFullContentMark2Pro) {
        timerRefMark6Pro.current = setTimeout(() => {
          generateMark6AdPro(generatedMark2STPPro);
        }, 180000);
      }
    } else {
      console.log('runningMark6Pro is false, clearing timeout');
      clearTimeout(timerRefMark6Pro.current);
    }

    return () => {
      if (!runningMark6Pro) clearTimeout(timerRefMark6Pro.current);
    };
  }, [runningMark6Pro]);

  useEffect(() => {
    if (runningOp1Pro) {
      timerRefOp1Pro.current = setTimeout(() => {
        generateOp1ActKPIsPro();
      }, 180000);
    } else {
      console.log('runningOp1Pro is false, clearing timeout');
      clearTimeout(timerRefOp1Pro.current);
    }

    return () => {
      if (!runningOp1Pro) clearTimeout(timerRefOp1Pro.current);
    };
  }, [runningOp1Pro]);

  useEffect(() => {
    if (runningOp2Pro) {
      timerRefOp2Pro.current = setTimeout(() => {
        generateOp2QCImpPlanPro();
      }, 180000);
    } else {
      console.log('runningOp2Pro is false, clearing timeout');
      clearTimeout(timerRefOp2Pro.current);
    }

    return () => {
      if (!runningOp2Pro) clearTimeout(timerRefOp2Pro.current);
    };
  }, [runningOp2Pro]);

  useEffect(() => {
    if (runningTech1Pro) {
      timerRefTech1Pro.current = setTimeout(() => {
        generateTech1AllPro();
      }, 180000);
    } else {
      console.log('runningTech1Pro is false, clearing timeout');
      clearTimeout(timerRefTech1Pro.current);
    }

    return () => {
      if (!runningTech1Pro) clearTimeout(timerRefTech1Pro.current);
    };
  }, [runningTech1Pro]);

  useEffect(() => {
    if (runningTech2Pro) {
      timerRefTech2Pro.current = setTimeout(() => {
        generateTech2DigiPro();
      }, 180000);
    } else {
      console.log('runningTech2Pro is false, clearing timeout');
      clearTimeout(timerRefTech2Pro.current);
    }

    return () => {
      if (!runningTech2Pro) clearTimeout(timerRefTech2Pro.current);
    };
  }, [runningTech2Pro]);

  useEffect(() => {
    if (runningMang1Pro) {
      timerRefMang1Pro.current = setTimeout(() => {
        generateMang1StrucRolePro();
      }, 180000);
    } else {
      console.log('runningMang1Pro is false, clearing timeout');
      clearTimeout(timerRefMang1Pro.current);
    }

    return () => {
      if (!runningMang1Pro) clearTimeout(timerRefMang1Pro.current);
    };
  }, [runningMang1Pro]);

  useEffect(() => {
    if (runningMang2Pro) {
      if (doneAndFullContentMang1Pro) {
        timerRefMang2Pro.current = setTimeout(() => {
          generateMang2RecTrainCSRPro(generatedMang1StrucRolePro);
        }, 180000);
      }
    } else {
      console.log('runningMang2Pro is false, clearing timeout');
      clearTimeout(timerRefMang2Pro.current);
    }

    return () => {
      if (!runningMang2Pro) clearTimeout(timerRefMang2Pro.current);
    };
  }, [runningMang2Pro]);

  useEffect(() => {
    if (runningGrowthPro) {
      timerRefGrowthPro.current = setTimeout(() => {
        generateGrowthPro();
      }, 180000);
    } else {
      console.log('runningGrowthPro is false, clearing timeout');
      clearTimeout(timerRefGrowthPro.current);
    }

    return () => {
      if (!runningGrowthPro) clearTimeout(timerRefGrowthPro.current);
    };
  }, [runningGrowthPro]);

  useEffect(() => {
    if (runningRiskPro) {
      timerRefRiskPro.current = setTimeout(() => {
        generateRiskPro();
      }, 180000);
    } else {
      console.log('runningRiskPro is false, clearing timeout');
      clearTimeout(timerRefRiskPro.current);
    }

    return () => {
      if (!runningRiskPro) clearTimeout(timerRefRiskPro.current);
    };
  }, [runningRiskPro]);

  useEffect(() => {
    if (allDoneGeneratingStarter) {
      clearInterval(intervalIdRefStarter.current);
      setLoadingStarter(false);
    }
  }, [allDoneGeneratingStarter]);

  const [doneTimerStarter, setDoneTimerStarter] = useState(true);
  useEffect(() => {
    if (allDoneGeneratingStarter) {
      setTimeout(() => {
        setDoneTimerStarter(false);
      }, 15000);
    }
  }, [allDoneGeneratingStarter]);

  useEffect(() => {
    console.log('country from laststep: ', country);
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
        TH: {
          currency: 'THB',
          starterPrice: '690 THB',
          proPrice: '990 THB',
        },
        PH: {
          currency: 'PHP',
          starterPrice: '₱2,090',
          proPrice: '₱2,790',
        },
        MY: {
          currency: 'MYR',
          starterPrice: 'RM169',
          proPrice: 'RM219',
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

      let countryMapping;
      countryMapping = currencyMappingsVAR2[country];

      if (!euroCountries.includes(country) && countryMapping) {
        console.log('not euro country inside: ', country);
        setPriceAbb(`(${countryMapping.currency})`);
        setStarterPrice(countryMapping.starterPrice);
        setProPrice(countryMapping.proPrice);
      } else if (euroCountries.includes(country)) {
        console.log('is euro country inside: ', country);
        setPriceAbb('(EUR)');
        setStarterPrice('€65');
        setProPrice('€95');
      } else {
        console.log('no country match inside: ', country);
        setPriceAbb('(USD)');
        setStarterPrice('$69');
        setProPrice('$99');
      }
    } else {
      console.log('no country: ', country);
      setPriceAbb('(USD)');
      setStarterPrice('$69');
      setProPrice('$99');
    }
  }, [country]);

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
        <Navbar fbPixelId={fbPixelId} xPixelId={xPixelId} />
        <motion.div
          key="component-seven"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overflow">
            {variantID === '2' && isPlanCompleted ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    {t(
                      'Your finance section has been completed, its at the bottom',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
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
                          <span className="text-red-700">
                            {t('Our main AI model Haiku  is down, but you')}
                          </span>
                          <span className="text-red-700">
                            {t('can use GPT 3.5 Turbo to generate your plan')}
                          </span>
                          <span className="text-red-700">
                            {t(
                              'instead. The 2 models are comparable in quality',
                            )}
                          </span>
                          <div>
                            <button
                              onClick={() =>
                                generatePlan(AI_MODEL.GPT_3_5_TURBO)
                              }
                              className="button mt-1"
                            >
                              {t('Use GPT 3.5 Turbo to generate plan')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {showGeneratePlanButton && !generatedExec && (
                      <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            className={`button back-button w-[110px] white w-button`}
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
                              __html: domPurify.sanitize(editedExec),
                            }}
                          />
                        ) : (
                          <div
                            className={textAlign}
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedExec),
                            }}
                          />
                        )}
                        {doneExec && !session ? (
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
                              __html: domPurify.sanitize(generatedSitu1),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedSitu2),
                            }}
                          />

                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMark1),
                            }}
                          />

                          <br />
                          <div className="relative">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(generatedMark2),
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

                    {(isShow && !isError && !paid) || generatedExec ? (
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
                        <div className="w-full flex flex-col items-center justify-center gap-4 mt-8 mb-12">
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">
                            {reviews?.map((review) => (
                              <div
                                key={review.id}
                                className="w-full h-full text-left"
                              >
                                <TrustBox {...review} notClickable={true} />
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col items-center gap-2 text-black mt-3">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
                              <div className="flex flex-row items-center gap-2 mr-4">
                                <span className="text-lg">Reviews From</span>
                                <div className="flex items-center -mt-2">
                                  <Image
                                    src="https://plannit.ai/assets/trustpilot.svg"
                                    width={120}
                                    height={30}
                                    alt="Trustpilot"
                                  />
                                </div>
                              </div>
                              <Image
                                src="/img/TrustStar4-5.png"
                                width={160}
                                height={24}
                                alt="4.5 star rating"
                              />
                              <div className="text-lg text-center sm:text-left sm:ml-4">
                                TrustScore <strong>4.7</strong> |{' '}
                                <strong>74</strong> Reviews
                              </div>
                            </div>
                            <span className="text-xl mt-2">Excellent</span>
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
        <Navbar fbPixelId={fbPixelId} />
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
            {variantID === '2' && isPlanCompleted ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    {t(
                      'Your finance section has been completed, its at the bottom',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
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
                          <span className="text-red-700">
                            {t('Our main AI model Haiku  is down, but you')}
                          </span>
                          <span className="text-red-700">
                            {t('can use GPT 3.5 Turbo to generate your plan')}
                          </span>
                          <span className="text-red-700">
                            {t(
                              'instead. The 2 models are comparable in quality',
                            )}
                          </span>
                          <div>
                            <button
                              onClick={() =>
                                generatePlanStarter(AI_MODEL.GPT_3_5_TURBO)
                              }
                              className="button mt-1"
                            >
                              {t('Use GPT 3.5 Turbo to generate plan')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center mb-10">
                      {!loadingStarter &&
                        !showGeneratePlanButtonStarter &&
                        !isErrorStarter &&
                        paid &&
                        variantID === '2' &&
                        !isPlanCompleted && (
                          <div className="flex gap-3">
                            <Link
                              href={{
                                pathname: ROUTE_PATH.investmentItems,
                              }}
                              className="button"
                              onClick={() => {
                                setPlanId(planId);
                                trackEvent({
                                  event_name: 'complete_finance_button',
                                });
                              }}
                            >
                              {t('goToFinanceSection')}
                            </Link>
                          </div>
                        )}
                      {!loadingStarter &&
                        !showGeneratePlanButtonStarter &&
                        !isErrorStarter &&
                        paid &&
                        (variantID === '2' ? isPlanCompleted : true) && (
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
                        )}

                      {showGeneratePlanButtonStarter && !generatedExec && (
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
                                refId
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
                              __html: domPurify.sanitize(generatedExec),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedSitu1),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedSitu2),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMark1),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMark2),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMark3),
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMark4),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedOp1),
                            }}
                          />
                          <br />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: domPurify.sanitize(generatedMang1),
                            }}
                          />
                          <br />
                          {!showGeneratePlanButtonStarter &&
                            (variantID === '2' ? isPlanCompleted : true) && (
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
                                initialInvestmentAmount={
                                  initialInvestmentAmount
                                }
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
                              __html: domPurify.sanitize(generatedRisk1),
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
        <Navbar fbPixelId={fbPixelId} />
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
            {variantID === '2' && isPlanCompleted ? (
              <div className={stylesW.loading_box}>
                <div className="flex gap-4 items-center justify-center">
                  <div>
                    {t(
                      'Your finance section has been completed, its at the bottom',
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
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
                          {/* <span className="block sm:inline">
                            {t(
                              'OpenAI servers might be down, please try again later, retry on',
                            )}{' '}
                            <strong className="text-red-700">{t('PC')}</strong>,{' '}
                            {t('or try using a')}{' '}
                            <strong className="text-red-700">
                              {t('different browser')}
                            </strong>
                          </span> */}
                          <div>
                            <button
                              onClick={generatePlanPro}
                              className="button"
                            >
                              {t('Regenerate Plan')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center mb-10">
                      {!loadingPro &&
                        !showGeneratePlanButtonPro &&
                        !isErrorPro &&
                        paid &&
                        variantID === '2' &&
                        !isPlanCompleted && (
                          <div className="flex gap-3">
                            <Link
                              href={{
                                pathname: ROUTE_PATH.investmentItems,
                                query: { planId },
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
                          </div>
                        )}
                      {!loadingPro &&
                        !showGeneratePlanButtonPro &&
                        !isErrorPro &&
                        paid &&
                        (variantID === '2' ? isPlanCompleted : true) && (
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
                        )}

                      {showGeneratePlanButtonPro && !generatedExec && (
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
                                refId
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
                                __html: domPurify.sanitize(generatedExecPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedSitu1IndKeyPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedSitu2SWOTPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  domPurify.sanitize(generatedMark1ObjPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  domPurify.sanitize(generatedMark2STPPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedMark3DecisionPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedMark4ProductPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedMark5PriceDistPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(generatedMark6AdPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedOp1ActKPIsPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedOp2QCImpPlanPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  domPurify.sanitize(generatedTech1AllPro),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedTech2DigiPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedMang1StrucRolePro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(
                                  generatedMang2RecTrainCSRPro,
                                ),
                              }}
                            />
                          }
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: domPurify.sanitize(generatedGrowthPro),
                              }}
                            />
                          }

                          <br />

                          {!showGeneratePlanButtonPro && isPlanCompleted && (
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
                                __html: domPurify.sanitize(generatedRiskPro),
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

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['LastStepPlanGen'])),
      secretKey,
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
