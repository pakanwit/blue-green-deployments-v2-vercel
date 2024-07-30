import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import Step1Obj from '../components/Step1Obj';
import Step2BasicInfo from '../components/Step2BasicInfo';
import Step3CustGroup from '../components/Step3CustGroup';
import Step4Product from '../components/Step4Product';
import Step5KeySuccess from '../components/Step5KeySuccess';
import Step6InitialInvestment from '../components/Step6InitialInvestment';
import Step7Finance from '../components/Step7Finance';
import LastStepPlanGen from '../components/LastStepPlanGen_testing';
import Register1 from '../components/Register1_testing';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { MoonLoader } from 'react-spinners';
import AlertOnLeave from '../components/AlertOnLeave';
import ConfirmLink from '../components/ConfirmLink';
import ExamplePlan from '../components/ExamplePlan';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import us2gb from '../utils/us2gb';
import RefundPolicy from '../components/RefundPolicy';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import trackEvent from '../utils/trackEvent';
import { formDataTitle } from '../constants/formTitle';
import Pixel from '../components/Pixel';
import XPixel from '../components/XPixel';
import useCookies from '../hooks/useCookies';

interface MainWizardProps {
  secretKey: string;
  fbPixelId: string;
  xPixelId: string;
}

export default function mainWizard({ secretKey, fbPixelId, xPixelId }: MainWizardProps) {
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
  const [refId, setRefId] = useState(undefined);
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

  // CTA -----------------------------------------------
  const [callToAction, setCallToAction] = useState('');
  // cancel stream--------------------------
  const executionIdRefExec = useRef(null);
  const executionIdRefSitu1 = useRef(null);
  const executionIdRefSitu2 = useRef(null);
  const executionIdRefMark1 = useRef(null);
  const executionIdRefMark2 = useRef(null);
  const executionIdRefMark3 = useRef(null);
  const executionIdRefMark4 = useRef(null);
  const executionIdRefOp1 = useRef(null);
  const executionIdRefOp2 = useRef(null);
  const executionIdRefMang1 = useRef(null);
  const executionIdRefMang2 = useRef(null);
  const executionIdRefRisk1 = useRef(null);

  const executionIdRefCTA = useRef(null);

  // language -----------------------------------------------
  const [planLanguage, setPlanLanguage] = useState('');

  // currency -----------------------------------------------
  const [planCurrency, setPlanCurrency] = useState('');
  const [planCurrencySymbol, setPlanCurrencySymbol] = useState(''); // currency symbol for other is 1 space

  // country ------------------------------------------------
  const [country, setCountry] = useState('');

  // prices -------------------------------------------------
  const [starterPrice, setStarterPrice] = useState('');
  const [proPrice, setProPrice] = useState('');
  const [discountedStarterPrice, setDiscountedStarterPrice] = useState('');
  const [discountedProPrice, setDiscountedProPrice] = useState('');

  // check if there is a session if there is a session send a get request with fetch to getUserData api route to get the user data then check if userData.planQuota is less than 1 if it is less than 1 then render a div which contains a button to redirect to checkout page
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [userData, setuserData] = useState(null);
  const [validPlanQuota, setValidPlanQuota] = useState(true);

  const { getCookie } = useCookies();
  const variantID = getCookie("variantID")

  useEffect(() => {
    if (!session) {
      return; // Don't run the effect if there is no session
    }

    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      setFetchLoading(true);
      const res = await fetch('/api/getUserData', {
        headers: {
          [API_KEY_HEADER]: secretKey,
        },
      });
      const data = await res.json();
      setuserData(data);

      if (data) {
        console.log('User data fetched successfully: ', data);
        setFetchLoading(false);
        clearInterval(interval);
      } else {
        setFetchError(true);
      }
    }

    counter++; // Increment the counter

    // Clear the interval and stop fetching if the counter reaches 5
    if (counter >= 5) {
      clearInterval(interval);
    }

    fetchUserData(); // Fetch data initially

    // Call the fetchUserData function every 3 seconds
    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    if (userData && parseInt(userData.planQuota) < 1) {
      setValidPlanQuota(false);
    }
  }, [userData]);

  // set initial value to test-------------------------------------------------
  useEffect(() => {
    //CHANGE BACK******************************************************
    setBusinessOperationalStatus('');
    setBusinessPlanObj('');
    setBusinessName('');
    setBusinessType('');
    setNEmployee(0);
    setLocation(''); //where do you serve your customer
    setProductOrService('');
    setSalesChannel(''); // what channel you sell ur product on

    setCustomerDescription1('');
    setCustomerIncome1('');
    setCustomerDescription2('');
    setCustomerIncome2('');
    setCustomerDescription3('');
    setCustomerIncome3('');

    setProductName1('');
    setProductDescription1('');
    setProductName2('');
    setProductDescription2('');
    setProductName3('');
    setProductDescription3('');
    setProductName4('');
    setProductDescription4('');
    setProductName5('');
    setProductDescription5('');

    setSuccessFactor1('');
    setSuccessFactor2('');
    setSuccessFactor3('');
    setWeakness1('');
    setWeakness2('');
    setWeakness3('');

    setInitialInvestmentAmount(0); // add dollar to input
    setInvestmentItem1('');
    setInvestmentAmountItem1(0);
    setInvestmentItem2('');
    setInvestmentAmountItem2(0);
    setInvestmentItem3('');
    setInvestmentAmountItem3(0);

    setFirstYearRevenue(0);
    setRevenueGrowthRate(0);
    setCOGSP(0.4);
    setWageCostP(0.06);
    setMarkCostP(0.05);
    setRentCostP(0);
    setGenCostP(0.01);
    setDepreCostP(0.02);
    setOtherCostP(0.01);
    setIntCostP(0);
    setTaxCostP(0.2);

    setIsError(false);
    setIsPaid(false);

    // SETINPUT 1-----------------------------------------
    // setBusinessOperationalStatus('Upcoming unlaunched business')
    // setBusinessPlanObj('To be used to request fund from investors')
    // setBusinessName("May's Diner")
    // setBusinessType('Diner')
    // setNEmployee(5)
    // setLocation('Barcelona') //where do you serve your customer
    // setProductOrService('service')
    // setSalesChannel('physical location') // what channel you sell ur product on

    // setCustomerDescription1('Families')
    // setCustomerIncome1('Meduim-income')
    // setCustomerDescription2('college students')
    // setCustomerIncome2('Low-income')
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

    // setInitialInvestmentAmount(1000000) // add dollar to input
    // setInvestmentItem1('construction')
    // setInvestmentAmountItem1(500000)
    // setInvestmentItem2('furnishings')
    // setInvestmentAmountItem2(300000)
    // setInvestmentItem3('equipement')
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

    // setPlanLanguage('en')
    // setPlanCurrency('USD')
    // setPlanCurrencySymbol('$')

    // setCurrentStep(7)

    // setIsShow(true)

    // SETINPUT 2-----------------------------------------
    // setBusinessOperationalStatus('Upcoming unlaunched business')
    // setBusinessPlanObj('To be used as reference for workplace projects')
    // setBusinessName("True Services")
    // setBusinessType('Faith Collaboration Nework')
    // setNEmployee(20)
    // setLocation('Jackson, MI') //where do you serve your customer
    // setProductOrService('service')
    // setSalesChannel('online and physical location') // what channel you sell ur product on

    // setCustomerDescription1('Religious Organizations')
    // setCustomerIncome1('Meduim-income')
    // setCustomerDescription2('Social Justice Advocates')
    // setCustomerIncome2('Meduim-income')
    // setCustomerDescription3('Local Volunteers')
    // setCustomerIncome3('Meduim-income')

    // setProductName1(' Community Outreach Programs ')
    // setProductDescription1('')
    // setProductName2('social justice workshops')
    // setProductDescription2('Facilitated by experienced professionals, our workshops provide practical tools and strategies for creating positive change in communities')
    // setProductName3(' Volunteer Training Sessions ')
    // setProductDescription3("True Services' Volunteer Training Sessions provide practical skills and knowledge for serving different communities")
    // setProductName4('Interfaith Dialogue Sessions')
    // setProductDescription4('We strive to promote understanding and respect between different communities through facilitated discussions and open-minded listening')
    // setProductName5('Leadership development programs')
    // setProductDescription5('Our focus on collaboration and teamwork ensures participants will develop strong relationships and networks to support their ongoing development.')

    // setSuccessFactor1(' Our experienced team provides high-quality services and expertise to our customers')
    // setSuccessFactor2(' Our focus on collaboration and community-building sets us apart in the market.')
    // setSuccessFactor3('Our hybrid distribution channels allow us to reach a wider audience and provide convenience for customers')
    // setWeakness1('Our marketing strategy is not effectively reaching our target audience')
    // setWeakness2('We lack strong partnerships with other businesses in our industry')
    // setWeakness3(' We lack a strong social media presence and online engagement with customers')

    // setInitialInvestmentAmount(40000) // add dollar to input
    // setInvestmentItem1('Staff training')
    // setInvestmentAmountItem1(5000)
    // setInvestmentItem2('community outreach programs development')
    // setInvestmentAmountItem2(25000)
    // setInvestmentItem3('Physical location renovation')
    // setInvestmentAmountItem3(10000)

    // setFirstYearRevenue(50000)
    // setRevenueGrowthRate(0.1)
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

    // setPlanCurrency('USD')
    // setPlanCurrencySymbol('$')
    // setPlanLanguage('en')

    // setCurrentStep(6)
    // // 8 is the last step, registration and payment
  }, []);

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
        planQuota: 100,
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
      if (planLanguage === 'en-uk') {
        setGeneratedExec(us2gb(generatedExec));
        setGeneratedSitu1(us2gb(generatedSitu1));
        setGeneratedSitu2(us2gb(generatedSitu2));
        setGeneratedMark1(us2gb(generatedMark1));
        setGeneratedMark2(us2gb(generatedMark2));
      }
    }
  }, [doneExec, doneSitu1, doneSitu2, doneMark1, doneMark2]);

  const [addNewPlanDone, setAddNewPlanDone] = useState(false);

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

  const prevAllDoneGenerating = useRef(false);

  const [showGeneratePlanButton, setShowGeneratePlanButton] = useState(true);

  // for generating example plan
  const startTime = useRef(null);
  const intervalIdRef = useRef(null);
  async function generatePlan() {
    startTime.current = Date.now();
    setIsError(false);
    setShowGeneratePlanButton(false);

    setLoading(true);
    generateExec();
    generateSitu1andMark1(); // mark1
    generateSitu2(); //
    generateMark2();

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
      console.log(
        'allDoneGenerating is true, clearing interval: ',
        intervalIdRef.current,
      );
      clearInterval(intervalIdRef.current);
      setLoading(false);
      setIsShow(true);
    }
  }, [allDoneGenerating]);

  // #region
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

  const [readyToGeneratePlan, setReadyToGeneratePlan] = useState(false);

  const [showGeneratePlanButtonStarter, setShowGeneratePlanButtonStarter] =
    useState(true);

  //productInfoPrompt will be generated from old code

  // starter generation functions---------------------------------------------------------

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

  //main functions------------------------------------------------------------
  async function generateExecStarter() {
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

  async function generateSitu1andMark1Starter() {
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

  async function generateSitu2Starter() {
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

  async function generateMark2Mark3Mark4Starter() {
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

  async function generateMark2Starter() {
    setGeneratedMark2('');

    setAllDoneGeneratingStarter(false);
    setDoneMark2Starter(false);
    setLoadingStarter(true);

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
  }

  async function generateOp1Starter() {
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

        initialInvestmentAmount: initialInvestmentAmount ?? 0,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
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

  async function generateMang1Starter() {
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

  async function generateRisk1Starter() {
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
      investmentAmountItem1: investmentAmountItem1 ?? 0,
      investmentItem2,
      investmentAmountItem2: investmentAmountItem2 ?? 0,
      investmentItem3,
      investmentAmountItem3: investmentAmountItem3 ?? 0,
      investmentItem4,
      investmentAmountItem4: investmentAmountItem4 ?? 0,
      investmentItem5,
      investmentAmountItem5: investmentAmountItem5 ?? 0,
      investmentItem6,
      investmentAmountItem6: investmentAmountItem6 ?? 0,
      investmentItem7,
      investmentAmountItem7: investmentAmountItem7 ?? 0,
      investmentItem8,
      investmentAmountItem8: investmentAmountItem8 ?? 0,
      investmentItem9,
      investmentAmountItem9: investmentAmountItem9 ?? 0,
      investmentItem10,
      investmentAmountItem10: investmentAmountItem10 ?? 0,
      initialInvestmentAmount: initialInvestmentAmount ?? 0,
      firstYearRevenue: firstYearRevenue ?? 0,
      revenueGrowthRate: revenueGrowthRate ?? 0,
      COGSP: COGSP ?? 0,
      wageCostP: wageCostP ?? 0,
      markCostP: markCostP ?? 0,
      rentCostP: rentCostP ?? 0,
      genCostP: genCostP ?? 0,
      depreCostP: depreCostP ?? 0,
      utilCostP: utilCostP ?? 0,
      otherCostP: otherCostP ?? 0,
      intCostP: intCostP ?? 0,
      taxCostP: taxCostP ?? 0,
      planCurrency,
      planCurrencySymbol,
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
          setAddNewPlanDone(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

  const startTimeStarter = useRef<number | null>(null);
  const intervalIdRefStarter = useRef(null);
  async function generatePlanStarter() {
    startTimeStarter.current = Date.now();
    setIsErrorStarter(false);
    setLoadingStarter(true);
    setShowGeneratePlanButtonStarter(false);
    generateExecStarter(); //
    generateSitu1andMark1Starter(); // mark1
    generateSitu2Starter(); //
    generateMark2Mark3Mark4Starter(); //generated in another function above
    generateOp1Starter();
    generateMang1Starter();
    generateRisk1Starter();

    // Set an interval to check if 70 seconds have passed can change 120000 to adjust timeout
    intervalIdRefStarter.current = setInterval(() => {
      if (Date.now() - startTimeStarter.current >= 120000) {
        setIsErrorStarter(true);
        setLoadingStarter(false);
        clearInterval(intervalIdRefStarter.current);
      }
    }, 1000);
  }

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
    if (planLanguage) {
      let limit = 1000;
      if (planLanguage === 'ja') {
        limit = 400;
      } else if (planLanguage === 'ar') {
        limit = 900;
      }

      if (allDoneGeneratingStarter) {
        if (generatedExec.length < limit) generateExecStarter();
        if (generatedSitu2.length < limit) generateSitu2Starter();

        if (generatedSitu1.length < limit) {
          generateSitu1andMark1Starter();
        } else {
          if (generatedMark1.length < limit)
            generateMark1Starter(generatedSitu1);
        }

        if (generatedMark2.length < limit) {
          generateMark2Mark3Mark4Starter();
        } else {
          if (generatedMark3.length < limit)
            generateMark3Starter(generatedMark2);
          if (generatedMark4.length < limit)
            generateMark4Starter(generatedMark2);
        }

        if (generatedOp1.length < limit) generateOp1Starter();
        if (generatedMang1.length < limit) generateMang1Starter();
        if (generatedRisk1.length < limit) generateRisk1Starter();
      }
    }
  }, [allDoneGeneratingStarter, planLanguage]);

  // console.log all done starters
  useEffect(() => {
    console.log('doneExecStarter:', doneExecStarter);
    console.log('doneSitu1Starter:', doneSitu1Starter);
    console.log('doneSitu2Starter:', doneSitu2Starter);
    console.log('doneMark1Starter:', doneMark1Starter);
    console.log('doneMark2Starter:', doneMark2Starter);
    console.log('doneMark3Starter:', doneMark3Starter);
    console.log('doneMark4Starter:', doneMark4Starter);
    console.log('doneOp1Starter:', doneOp1Starter);
    console.log('doneMang1Starter:', doneMang1Starter);
    console.log('doneRisk1Starter:', doneRisk1Starter);
    console.log('allDoneGeneratingStarter:', allDoneGeneratingStarter);
  }, [
    allDoneGeneratingStarter,
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
  // #endregion

  // fullPlanPro code ------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [loadingPro, setLoadingPro] = useState(false);
  const [isErrorPro, setIsErrorPro] = useState(false);

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

  const [showGeneratePlanButtonPro, setShowGeneratePlanButtonPro] =
    useState(true);

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

        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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
    const done = false;

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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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

        investmentAmountItem1: investmentAmountItem1 ?? 0,
        investmentAmountItem2: investmentAmountItem2 ?? 0,
        investmentAmountItem3: investmentAmountItem3 ?? 0,
        investmentAmountItem4: investmentAmountItem4 ?? 0,
        investmentAmountItem5: investmentAmountItem5 ?? 0,
        investmentAmountItem6: investmentAmountItem6 ?? 0,
        investmentAmountItem7: investmentAmountItem7 ?? 0,
        investmentAmountItem8: investmentAmountItem8 ?? 0,
        investmentAmountItem9: investmentAmountItem9 ?? 0,
        investmentAmountItem10: investmentAmountItem10 ?? 0,

        firstYearRevenue: firstYearRevenue ?? 0,
        revenueGrowthRate: revenueGrowthRate ?? 0,

        productInfoPrompt,
        planQuota: userData.planQuota,
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
        planQuota: userData.planQuota,
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
      investmentAmountItem1: investmentAmountItem1 ?? 0,
      investmentItem2,
      investmentAmountItem2: investmentAmountItem2 ?? 0,
      investmentItem3,
      investmentAmountItem3: investmentAmountItem3 ?? 0,
      investmentItem4,
      investmentAmountItem4: investmentAmountItem4 ?? 0,
      investmentItem5,
      investmentAmountItem5: investmentAmountItem5 ?? 0,
      investmentItem6,
      investmentAmountItem6: investmentAmountItem6 ?? 0,
      investmentItem7,
      investmentAmountItem7: investmentAmountItem7 ?? 0,
      investmentItem8,
      investmentAmountItem8: investmentAmountItem8 ?? 0,
      investmentItem9,
      investmentAmountItem9: investmentAmountItem9 ?? 0,
      investmentItem10,
      investmentAmountItem10: investmentAmountItem10 ?? 0,
      initialInvestmentAmount: initialInvestmentAmount ?? 0,
      firstYearRevenue: firstYearRevenue ?? 0,
      revenueGrowthRate: revenueGrowthRate ?? 0,
      COGSP: COGSP ?? 0,
      wageCostP: wageCostP ?? 0,
      markCostP: markCostP ?? 0,
      rentCostP: rentCostP ?? 0,
      genCostP: genCostP ?? 0,
      depreCostP: depreCostP ?? 0,
      utilCostP: utilCostP ?? 0,
      otherCostP: otherCostP ?? 0,
      intCostP: intCostP ?? 0,
      taxCostP: taxCostP ?? 0,

      planCurrency,
      planCurrencySymbol,
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
          setAddNewPlanDone(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [allDoneAndFullContentPro, setAllDoneAndFullContentPro] =
    useState(false);

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
    if (runningExecPro) console.log('runningExec is true');
    if (runningSitu1Pro) console.log('runningSitu1 is true');
    if (runningSitu2Pro) console.log('runningSitu2 is true');
    if (runningMark1Pro) console.log('runningMark1 is true');
    if (runningMark2Pro) console.log('runningMark2 is true');
    if (runningMark3Pro) console.log('runningMark3 is true');
    if (runningMark4Pro) console.log('runningMark4 is true');
    if (runningMark5Pro) console.log('runningMark5 is true');
    if (runningMark6Pro) console.log('runningMark6 is true');
    if (runningOp1Pro) console.log('runningOp1 is true');
    if (runningOp2Pro) console.log('runningOp2 is true');
    if (runningTech1Pro) console.log('runningTech1 is true');
    if (runningTech2Pro) console.log('runningTech2 is true');
    if (runningGrowthPro) console.log('runningGrowth is true');
    if (runningMang1Pro) console.log('runningMang1 is true');
    if (runningMang2Pro) console.log('runningMang2 is true');
    if (runningRiskPro) console.log('runningRisk is true');
  }, [
    runningExecPro,
    runningSitu1Pro,
    runningSitu2Pro,
    runningMark1Pro,
    runningMark2Pro,
    runningMark3Pro,
    runningMark4Pro,
    runningMark5Pro,
    runningMark6Pro,
    runningOp1Pro,
    runningOp2Pro,
    runningTech1Pro,
    runningTech2Pro,
    runningGrowthPro,
    runningMang1Pro,
    runningMang2Pro,
    runningRiskPro,
  ]);

  const [doneTimerPro, setDoneTimerPro] = useState(true);
  useEffect(() => {
    if (allDoneAndFullContentPro) {
      setTimeout(() => {
        setDoneTimerPro(false);
      }, 15000);
    }
  }, [allDoneAndFullContentPro]);

  // sstates that are used in components that is not LastStepPlanGen
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRadioStep1_1, setSelectedRadioStep1_1] = useState(null);
  const [selectedRadioStep1_2, setSelectedRadioStep1_2] = useState(null);

  const [selectedRadioStep2_1, setSelectedRadioStep2_1] = useState(null);
  const [selectedRadioStep2_2, setSelectedRadioStep2_2] = useState(null);

  const [selectedRadioStep3_1, setSelectedRadioStep3_1] = useState(null);
  const [selectedRadioStep3_2, setSelectedRadioStep3_2] = useState(null);
  const [selectedRadioStep3_3, setSelectedRadioStep3_3] = useState(null);

  const [isPaid, setIsPaid] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [showFin, setShowFin] = useState(false);

  const [enableAlertOnLeave, setEnableAlertOnLeave] = useState(true);

  const [formattedFirstYearRevenue, setFormattedFirstYearRevenue] =
    useState('');

  const [isSession, setIsSession] = useState(false);

  const [planPackage, setPlanPackage] = useState('starter');

  // if there is a session then set isSession to true
  useEffect(() => {
    if (session) {
      setIsSession(true);
    }
  }, [session]);

  const handleNextFormik = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextExample = () => {
    setCurrentStep(currentStep + 3);
  };

  const handleBackExample = () => {
    setCurrentStep(currentStep - 3);
  };

  const handleNextRefund = () => {
    setCurrentStep(currentStep + 3);
  };

  const handleBackRefund = () => {
    setCurrentStep(currentStep - 3);
  };

  const [examplePackage, setExamplePackage] = useState('');

  let component;

  // update variantID if it doesn't exist in userData
  //split test code ////////////////////////////////////////////////////
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
          variantID,
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

  const { t } = useTranslation('common');

  useEffect(() => {
    let countryFromLocal;
    if (typeof window !== 'undefined') {
      countryFromLocal = localStorage.getItem('country');
    }
    setCountry(countryFromLocal);
  }, []);

  const { push, query, asPath } = useRouter();

  useLocale(country);

  useEffect(() => {
    console.log('Country from mainWizard: ', country);
  }, [country]);

  const { t: tv } = useTranslation('validate');

  useEffect(() => {
    console.log('isShow: ', isShow);
    console.log('isError: ', isError);
  }, [isShow, isError, isPaid]);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (formData[formDataTitle.REF_ID]) {
      setRefId(formData[formDataTitle.REF_ID]);
    }
    if (formData[formDataTitle.FORM1_1]) {
      setBusinessOperationalStatus(formData[formDataTitle.FORM1_1].value);
      setSelectedRadioStep1_1(formData[formDataTitle.FORM1_1].id);
      document.getElementById(formData[formDataTitle.FORM1_1].id).click();
    }
    if (formData[formDataTitle.FORM1_2]) {
      setBusinessPlanObj(formData[formDataTitle.FORM1_2].value);
      setSelectedRadioStep1_2(formData[formDataTitle.FORM1_2].id);
      document.getElementById(formData[formDataTitle.FORM1_2].id).click();
    }
    if (formData[formDataTitle.FORM2_1]) {
      setBusinessName(formData[formDataTitle.FORM2_1].value);
    }
    if (formData[formDataTitle.FORM2_2]) {
      setBusinessType(formData[formDataTitle.FORM2_2].value);
    }
    if (formData[formDataTitle.FORM2_3]) {
      setNEmployee(formData[formDataTitle.FORM2_3].value);
    }
    if (formData[formDataTitle.FORM2_4]) {
      setProductOrService(formData[formDataTitle.FORM2_4].value);
      setSelectedRadioStep2_1(formData[formDataTitle.FORM2_4].id);
    }
    if (formData[formDataTitle.FORM2_5]) {
      setSalesChannel(formData[formDataTitle.FORM2_5].value);
      setSelectedRadioStep2_2(formData[formDataTitle.FORM2_5].id);
    }
    if (formData[formDataTitle.FORM2_6]) {
      setLocation(formData[formDataTitle.FORM2_6].value);
    }
    if (formData[formDataTitle.FORM3_1]) {
      setCustomerDescription1(formData[formDataTitle.FORM3_1].value);
    }
    if (formData[formDataTitle.FORM3_2]) {
      setCustomerIncome1(formData[formDataTitle.FORM3_2].value);
      setSelectedRadioStep3_1(formData[formDataTitle.FORM3_2].id);
    }
    if (formData[formDataTitle.FORM3_3]) {
      setCustomerDescription2(formData[formDataTitle.FORM3_3].value);
    }
    if (formData[formDataTitle.FORM3_4]) {
      setCustomerIncome2(formData[formDataTitle.FORM3_4].value);
      setSelectedRadioStep3_2(formData[formDataTitle.FORM3_4].id);
    }
    if (formData[formDataTitle.FORM3_5]) {
      setCustomerDescription3(formData[formDataTitle.FORM3_5].value);
    }
    if (formData[formDataTitle.FORM3_6]) {
      setCustomerIncome3(formData[formDataTitle.FORM3_6].value);
      setSelectedRadioStep3_3(formData[formDataTitle.FORM3_6].id);
    }
    if (formData[formDataTitle.FORM4_1]) {
      setProductName1(formData[formDataTitle.FORM4_1].value);
    }
    if (formData[formDataTitle.FORM4_2]) {
      setProductDescription1(formData[formDataTitle.FORM4_2].value);
    }
    if (formData[formDataTitle.FORM4_3]) {
      setProductName2(formData[formDataTitle.FORM4_3].value);
    }
    if (formData[formDataTitle.FORM4_4]) {
      setProductDescription2(formData[formDataTitle.FORM4_4].value);
    }
    if (formData[formDataTitle.FORM4_5]) {
      setProductName3(formData[formDataTitle.FORM4_5].value);
    }
    if (formData[formDataTitle.FORM4_6]) {
      setProductDescription3(formData[formDataTitle.FORM4_6].value);
    }
    if (formData[formDataTitle.FORM4_7]) {
      setProductName4(formData[formDataTitle.FORM4_7].value);
    }
    if (formData[formDataTitle.FORM4_8]) {
      setProductDescription4(formData[formDataTitle.FORM4_8].value);
    }
    if (formData[formDataTitle.FORM4_9]) {
      setProductName5(formData[formDataTitle.FORM4_9].value);
    }
    if (formData[formDataTitle.FORM4_10]) {
      setProductDescription5(formData[formDataTitle.FORM4_10].value);
    }
    if (formData[formDataTitle.FORM5_1]) {
      setSuccessFactor1(formData[formDataTitle.FORM5_1].value);
    }
    if (formData[formDataTitle.FORM5_2]) {
      setSuccessFactor2(formData[formDataTitle.FORM5_2].value);
    }
    if (formData[formDataTitle.FORM5_3]) {
      setSuccessFactor3(formData[formDataTitle.FORM5_3].value);
    }
    if (formData[formDataTitle.FORM5_4]) {
      setWeakness1(formData[formDataTitle.FORM5_4].value);
    }
    if (formData[formDataTitle.FORM5_5]) {
      setWeakness2(formData[formDataTitle.FORM5_5].value);
    }
    if (formData[formDataTitle.FORM5_6]) {
      setWeakness3(formData[formDataTitle.FORM5_6].value);
    }
    if (formData[formDataTitle.FORM6_2]) {
      setInitialInvestmentAmount(formData[formDataTitle.FORM6_2].value);
    }
    if (formData[formDataTitle.FORM6_3]) {
      setInvestmentItem1(formData[formDataTitle.FORM6_3].value);
    }
    if (formData[formDataTitle.FORM6_4]) {
      setInvestmentAmountItem1(formData[formDataTitle.FORM6_4].value);
    }
    if (formData[formDataTitle.FORM6_5]) {
      setInvestmentItem2(formData[formDataTitle.FORM6_5].value);
    }
    if (formData[formDataTitle.FORM6_6]) {
      setInvestmentAmountItem2(formData[formDataTitle.FORM6_6].value);
    }
    if (formData[formDataTitle.FORM6_7]) {
      setInvestmentItem3(formData[formDataTitle.FORM6_7].value);
    }
    if (formData[formDataTitle.FORM6_8]) {
      setInvestmentAmountItem3(formData[formDataTitle.FORM6_8].value);
    }
    if (formData[formDataTitle.FORM6_9]) {
      setInvestmentItem4(formData[formDataTitle.FORM6_9].value);
    }
    if (formData[formDataTitle.FORM6_10]) {
      setInvestmentAmountItem4(formData[formDataTitle.FORM6_10].value);
    }
    if (formData[formDataTitle.FORM6_11]) {
      setInvestmentItem5(formData[formDataTitle.FORM6_11].value);
    }
    if (formData[formDataTitle.FORM6_12]) {
      setInvestmentAmountItem5(formData[formDataTitle.FORM6_12].value);
    }
    if (formData[formDataTitle.FORM6_13]) {
      setInvestmentItem6(formData[formDataTitle.FORM6_13].value);
    }
    if (formData[formDataTitle.FORM6_14]) {
      setInvestmentAmountItem6(formData[formDataTitle.FORM6_14].value);
    }
    if (formData[formDataTitle.FORM6_15]) {
      setInvestmentItem7(formData[formDataTitle.FORM6_15].value);
    }
    if (formData[formDataTitle.FORM6_16]) {
      setInvestmentAmountItem7(formData[formDataTitle.FORM6_16].value);
    }
    if (formData[formDataTitle.FORM6_17]) {
      setInvestmentItem8(formData[formDataTitle.FORM6_17].value);
    }
    if (formData[formDataTitle.FORM6_18]) {
      setInvestmentAmountItem8(formData[formDataTitle.FORM6_18].value);
    }
    if (formData[formDataTitle.FORM6_19]) {
      setInvestmentItem9(formData[formDataTitle.FORM6_19].value);
    }
    if (formData[formDataTitle.FORM6_20]) {
      setInvestmentAmountItem9(formData[formDataTitle.FORM6_20].value);
    }
    if (formData[formDataTitle.FORM6_21]) {
      setInvestmentItem10(formData[formDataTitle.FORM6_21].value);
    }
    if (formData[formDataTitle.FORM6_22]) {
      setInvestmentAmountItem10(formData[formDataTitle.FORM6_22].value);
    }
    if (formData[formDataTitle.FORM7_1]) {
      setFirstYearRevenue(formData[formDataTitle.FORM7_1].value);
    }
    if (formData[formDataTitle.FORM7_2]) {
      setRevenueGrowthRate(
        parseFloat(formData[formDataTitle.FORM7_2].value) / 100,
      );
    }
    if (formData[formDataTitle.FORM7_3]) {
      setCOGSP(parseFloat(formData[formDataTitle.FORM7_3].value) / 100);
    }
    if (formData[formDataTitle.FORM7_4]) {
      setWageCostP(parseFloat(formData[formDataTitle.FORM7_4].value) / 100);
    }
    if (formData[formDataTitle.FORM7_5]) {
      setMarkCostP(parseFloat(formData[formDataTitle.FORM7_5].value) / 100);
    }
    if (formData[formDataTitle.FORM7_6]) {
      setRentCostP(parseFloat(formData[formDataTitle.FORM7_6].value) / 100);
    }
    if (formData[formDataTitle.FORM7_7]) {
      setGenCostP(parseFloat(formData[formDataTitle.FORM7_7].value) / 100);
    }
    if (formData[formDataTitle.FORM7_8]) {
      setDepreCostP(parseFloat(formData[formDataTitle.FORM7_8].value) / 100);
    }
    if (formData[formDataTitle.FORM7_9]) {
      setUtilCostP(parseFloat(formData[formDataTitle.FORM7_9].value) / 100);
    }
    if (formData[formDataTitle.FORM7_10]) {
      setOtherCostP(parseFloat(formData[formDataTitle.FORM7_10].value) / 100);
    }
    if (formData[formDataTitle.FORM7_11]) {
      setIntCostP(parseFloat(formData[formDataTitle.FORM7_11].value) / 100);
    }
    if (formData[formDataTitle.FORM7_12]) {
      setTaxCostP(parseFloat(formData[formDataTitle.FORM7_12].value) / 100);
    }
  }, []);

  if (currentStep === 0) {
    component = (
      <Step1Obj
        businessOperationalStatus={businessOperationalStatus}
        businessPlanObj={businessPlanObj}
        currentStep={currentStep}
        setBusinessOperationalStatus={setBusinessOperationalStatus}
        setBusinessPlanObj={setBusinessPlanObj}
        setCurrentStep={setCurrentStep}
        selectedRadioStep1_1={selectedRadioStep1_1}
        selectedRadioStep1_2={selectedRadioStep1_2}
        setSelectedRadioStep1_1={setSelectedRadioStep1_1}
        setSelectedRadioStep1_2={setSelectedRadioStep1_2}
        isSession={isSession}
        session={session}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 1) {
    component = (
      <Step2BasicInfo
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        productOrService={productOrService}
        salesChannel={salesChannel}
        setBusinessName={setBusinessName}
        setBusinessType={setBusinessType}
        setNEmployee={setNEmployee}
        setLocation={setLocation}
        setProductOrService={setProductOrService}
        setSalesChannel={setSalesChannel}
        selectedRadioStep2_1={selectedRadioStep2_1}
        setSelectedRadioStep2_1={setSelectedRadioStep2_1}
        selectedRadioStep2_2={selectedRadioStep2_2}
        setSelectedRadioStep2_2={setSelectedRadioStep2_2}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        isSession={isSession}
        tv={tv}
      />
    );
  } else if (currentStep === 2) {
    component = (
      <Step3CustGroup
        customerIncome1={customerIncome1}
        customerIncome2={customerIncome2}
        customerIncome3={customerIncome3}
        customerDescription1={customerDescription1}
        customerDescription2={customerDescription2}
        customerDescription3={customerDescription3}
        setCustomerIncome1={setCustomerIncome1}
        setCustomerDescription1={setCustomerDescription1}
        setCustomerIncome2={setCustomerIncome2}
        setCustomerDescription2={setCustomerDescription2}
        setCustomerIncome3={setCustomerIncome3}
        setCustomerDescription3={setCustomerDescription3}
        selectedRadioStep3_1={selectedRadioStep3_1}
        selectedRadioStep3_2={selectedRadioStep3_2}
        selectedRadioStep3_3={selectedRadioStep3_3}
        setSelectedRadioStep3_1={setSelectedRadioStep3_1}
        setSelectedRadioStep3_2={setSelectedRadioStep3_2}
        setSelectedRadioStep3_3={setSelectedRadioStep3_3}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        isSession={isSession}
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        productOrService={productOrService}
        salesChannel={salesChannel}
        tv={tv}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 3) {
    component = (
      <Step4Product
        productName1={productName1}
        productName2={productName2}
        productName3={productName3}
        productName4={productName4}
        productName5={productName5}
        productDescription1={productDescription1}
        productDescription2={productDescription2}
        productDescription3={productDescription3}
        productDescription4={productDescription4}
        productDescription5={productDescription5}
        setProductName1={setProductName1}
        setProductName2={setProductName2}
        setProductName3={setProductName3}
        setProductName4={setProductName4}
        setProductName5={setProductName5}
        setProductDescription1={setProductDescription1}
        setProductDescription2={setProductDescription2}
        setProductDescription3={setProductDescription3}
        setProductDescription4={setProductDescription4}
        setProductDescription5={setProductDescription5}
        handleNextFormik={handleNextFormik}
        handleBack={handleBack}
        isSession={isSession}
        customerDescription1={customerDescription1}
        customerDescription2={customerDescription2}
        customerDescription3={customerDescription3}
        customerIncome1={customerIncome1}
        customerIncome2={customerIncome2}
        customerIncome3={customerIncome3}
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        productOrService={productOrService}
        salesChannel={salesChannel}
        tv={tv}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 4) {
    component = (
      <Step5KeySuccess
        successFactors1={successFactors1}
        successFactors2={successFactors2}
        successFactors3={successFactors3}
        weakness1={weakness1}
        weakness2={weakness2}
        weakness3={weakness3}
        setSuccessFactor1={setSuccessFactor1}
        setSuccessFactor2={setSuccessFactor2}
        setSuccessFactor3={setSuccessFactor3}
        setWeakness1={setWeakness1}
        setWeakness2={setWeakness2}
        setWeakness3={setWeakness3}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        isSession={isSession}
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        productOrService={productOrService}
        salesChannel={salesChannel}
        customerDescription1={customerDescription1}
        customerDescription2={customerDescription2}
        customerDescription3={customerDescription3}
        customerIncome1={customerIncome1}
        customerIncome2={customerIncome2}
        customerIncome3={customerIncome3}
        productName1={productName1}
        productName2={productName2}
        productName3={productName3}
        productName4={productName4}
        productName5={productName5}
        productDescription1={productDescription1}
        productDescription2={productDescription2}
        productDescription3={productDescription3}
        productDescription4={productDescription4}
        productDescription5={productDescription5}
        tv={tv}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 5) {
    component = (
      <Step6InitialInvestment
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
        setInitialInvestmentAmount={setInitialInvestmentAmount}
        setInvestmentItem1={setInvestmentItem1}
        setInvestmentAmountItem1={setInvestmentAmountItem1}
        setInvestmentItem2={setInvestmentItem2}
        setInvestmentAmountItem2={setInvestmentAmountItem2}
        setInvestmentItem3={setInvestmentItem3}
        setInvestmentAmountItem3={setInvestmentAmountItem3}
        setInvestmentItem4={setInvestmentItem4}
        setInvestmentAmountItem4={setInvestmentAmountItem4}
        setInvestmentItem5={setInvestmentItem5}
        setInvestmentAmountItem5={setInvestmentAmountItem5}
        setInvestmentItem6={setInvestmentItem6}
        setInvestmentAmountItem6={setInvestmentAmountItem6}
        setInvestmentItem7={setInvestmentItem7}
        setInvestmentAmountItem7={setInvestmentAmountItem7}
        setInvestmentItem8={setInvestmentItem8}
        setInvestmentAmountItem8={setInvestmentAmountItem8}
        setInvestmentItem9={setInvestmentItem9}
        setInvestmentAmountItem9={setInvestmentAmountItem9}
        setInvestmentItem10={setInvestmentItem10}
        setInvestmentAmountItem10={setInvestmentAmountItem10}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        isSession={isSession}
        successFactors1={successFactors1}
        successFactors2={successFactors2}
        successFactors3={successFactors3}
        weakness1={weakness1}
        weakness2={weakness2}
        weakness3={weakness3}
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        productOrService={productOrService}
        salesChannel={salesChannel}
        customerDescription1={customerDescription1}
        customerDescription2={customerDescription2}
        customerDescription3={customerDescription3}
        customerIncome1={customerIncome1}
        customerIncome2={customerIncome2}
        customerIncome3={customerIncome3}
        productName1={productName1}
        productName2={productName2}
        productName3={productName3}
        productName4={productName4}
        productName5={productName5}
        productDescription1={productDescription1}
        productDescription2={productDescription2}
        productDescription3={productDescription3}
        productDescription4={productDescription4}
        productDescription5={productDescription5}
        planCurrency={planCurrency}
        setPlanCurrency={setPlanCurrency}
        planCurrencySymbol={planCurrencySymbol}
        setPlanCurrencySymbol={setPlanCurrencySymbol}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 6) {
    component = (
      <Step7Finance
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
        setFirstYearRevenue={setFirstYearRevenue}
        setRevenueGrowthRate={setRevenueGrowthRate}
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
        formattedFirstYearRevenue={formattedFirstYearRevenue}
        setFormattedFirstYearRevenue={setFormattedFirstYearRevenue}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        isSession={isSession}
        planLanguage={planLanguage}
        setPlanLanguage={setPlanLanguage}
        planCurrency={planCurrency}
        setPlanCurrency={setPlanCurrency}
        planCurrencySymbol={planCurrencySymbol}
        tv={tv}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 7) {
    component = (
      <LastStepPlanGen
        loading={loading}
        isError={isError}
        isPaid={isPaid}
        isShow={isShow}
        showFin={showFin}
        showGeneratePlanButton={showGeneratePlanButton}
        setShowGeneratePlanButton={setShowGeneratePlanButton}
        setLoading={setLoading}
        setIsError={setIsError}
        setIsPaid={setIsPaid}
        setIsShow={setIsShow}
        setShowFin={setShowFin}
        generatedExec={generatedExec}
        generatedSitu1={generatedSitu1}
        generatedSitu2={generatedSitu2}
        generatedMark1={generatedMark1}
        callToAction={callToAction}
        setCallToAction={setCallToAction}
        generatedMark2={generatedMark2}
        generatedMark3={generatedMark3}
        generatedMark4={generatedMark4}
        generatedOp1={generatedOp1}
        generatedOp2={generatedOp2}
        generatedMang1={generatedMang1}
        generatedMang2={generatedMang2}
        setGeneratedExec={setGeneratedExec}
        setGeneratedSitu1={setGeneratedSitu1}
        setGeneratedSitu2={setGeneratedSitu2}
        setGeneratedMark1={setGeneratedMark1}
        setGeneratedMark2={setGeneratedMark2}
        setGeneratedMark3={setGeneratedMark3}
        setGeneratedMark4={setGeneratedMark4}
        setGeneratedOp1={setGeneratedOp1}
        setGeneratedOp2={setGeneratedOp2}
        setGeneratedMang1={setGeneratedMang1}
        setGeneratedMang2={setGeneratedMang2}
        setGeneratedRisk1={setGeneratedRisk1}
        investmentItem1={investmentItem1}
        investmentAmountItem1={investmentAmountItem1}
        setInvestmentItem1={setInvestmentItem1}
        setInvestmentAmountItem1={setInvestmentAmountItem1}
        investmentItem2={investmentItem2}
        investmentAmountItem2={investmentAmountItem2}
        setInvestmentItem2={setInvestmentItem2}
        setInvestmentAmountItem2={setInvestmentAmountItem2}
        investmentItem3={investmentItem3}
        investmentAmountItem3={investmentAmountItem3}
        setInvestmentItem3={setInvestmentItem3}
        setInvestmentAmountItem3={setInvestmentAmountItem3}
        investmentItem4={investmentItem4}
        investmentAmountItem4={investmentAmountItem4}
        setInvestmentItem4={setInvestmentItem4}
        setInvestmentAmountItem4={setInvestmentAmountItem4}
        investmentItem5={investmentItem5}
        investmentAmountItem5={investmentAmountItem5}
        setInvestmentItem5={setInvestmentItem5}
        setInvestmentAmountItem5={setInvestmentAmountItem5}
        investmentItem6={investmentItem6}
        investmentAmountItem6={investmentAmountItem6}
        setInvestmentItem6={setInvestmentItem6}
        setInvestmentAmountItem6={setInvestmentAmountItem6}
        investmentItem7={investmentItem7}
        investmentAmountItem7={investmentAmountItem7}
        setInvestmentItem7={setInvestmentItem7}
        setInvestmentAmountItem7={setInvestmentAmountItem7}
        investmentItem8={investmentItem8}
        investmentAmountItem8={investmentAmountItem8}
        setInvestmentItem8={setInvestmentItem8}
        setInvestmentAmountItem8={setInvestmentAmountItem8}
        investmentItem9={investmentItem9}
        investmentAmountItem9={investmentAmountItem9}
        setInvestmentItem9={setInvestmentItem9}
        setInvestmentAmountItem9={setInvestmentAmountItem9}
        investmentItem10={investmentItem10}
        investmentAmountItem10={investmentAmountItem10}
        setInvestmentItem10={setInvestmentItem10}
        setInvestmentAmountItem10={setInvestmentAmountItem10}
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
        generatedRisk1={generatedRisk1}
        generatePlan={generatePlan}
        setRunGeneratePrompt={setRunGeneratePrompt}
        handleBack={handleBack}
        handleNextFormik={handleNextFormik}
        handleNextExample={handleNextExample}
        handleBackExample={handleBackExample}
        isSession={isSession}
        doneExec={doneExec}
        doneSitu1={doneSitu1}
        doneSitu2={doneSitu2}
        doneMark1={doneMark1}
        doneMark2={doneMark2}
        allDoneGenerating={allDoneGenerating}
        addNewPlanDone={addNewPlanDone}
        setPlanPackage={setPlanPackage}
        setExamplePackage={setExamplePackage}
        generatePlanStarter={generatePlanStarter}
        loadingStarter={loadingStarter}
        isErrorStarter={isErrorStarter}
        allDoneGeneratingStarter={allDoneGeneratingStarter}
        showGeneratePlanButtonStarter={showGeneratePlanButtonStarter}
        doneTimerStarter={doneTimerStarter}
        generatedExecPro={generatedExecPro}
        generatedSitu1IndKeyPro={generatedSitu1IndKeyPro}
        generatedSitu2SWOTPro={generatedSitu2SWOTPro}
        generatedMark1ObjPro={generatedMark1ObjPro}
        generatedMark2STPPro={generatedMark2STPPro}
        generatedMark3DecisionPro={generatedMark3DecisionPro}
        generatedMark4ProductPro={generatedMark4ProductPro}
        generatedMark5PriceDistPro={generatedMark5PriceDistPro}
        generatedMark6AdPro={generatedMark6AdPro}
        generatedOp1ActKPIsPro={generatedOp1ActKPIsPro}
        generatedOp2QCImpPlanPro={generatedOp2QCImpPlanPro}
        generatedTech1AllPro={generatedTech1AllPro}
        generatedTech2DigiPro={generatedTech2DigiPro}
        generatedMang1StrucRolePro={generatedMang1StrucRolePro}
        generatedMang2RecTrainCSRPro={generatedMang2RecTrainCSRPro}
        generatedGrowthPro={generatedGrowthPro}
        generatedRiskPro={generatedRiskPro}
        generatePlanPro={generatePlanPro}
        loadingPro={loadingPro}
        isErrorPro={isErrorPro}
        allDoneAndFullContentPro={allDoneAndFullContentPro}
        showGeneratePlanButtonPro={showGeneratePlanButtonPro}
        doneTimerPro={doneTimerPro}
        planLanguage={planLanguage}
        planCurrency={planCurrency}
        planCurrencySymbol={planCurrencySymbol}
        country={country}
        starterPrice={starterPrice}
        setStarterPrice={setStarterPrice}
        proPrice={proPrice}
        setProPrice={setProPrice}
        discountedStarterPrice={discountedStarterPrice}
        setDiscountedStarterPrice={setDiscountedStarterPrice}
        discountedProPrice={discountedProPrice}
        setDiscountedProPrice={setDiscountedProPrice}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 8) {
    component = (
      <Register1
        // User Inputs ----------------------
        businessOperationalStatus={businessOperationalStatus}
        businessPlanObj={businessPlanObj}
        businessName={businessName}
        businessType={businessType}
        NEmployee={NEmployee}
        location={location}
        salesChannel={salesChannel}
        productOrService={productOrService}
        customerIncome1={customerIncome1}
        customerIncome2={customerIncome2}
        customerIncome3={customerIncome3}
        customerDescription1={customerDescription1}
        customerDescription2={customerDescription2}
        customerDescription3={customerDescription3}
        productName1={productName1}
        productName2={productName2}
        productName3={productName3}
        productName4={productName4}
        productName5={productName5}
        productDescription1={productDescription1}
        productDescription2={productDescription2}
        productDescription3={productDescription3}
        productDescription4={productDescription4}
        productDescription5={productDescription5}
        successFactors1={successFactors1}
        successFactors2={successFactors2}
        successFactors3={successFactors3}
        weakness1={weakness1}
        weakness2={weakness2}
        weakness3={weakness3}
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
        // Plan Content -------------------------
        generatedExec={generatedExec}
        generatedSitu1={generatedSitu1}
        generatedSitu2={generatedSitu2}
        generatedMark1={generatedMark1}
        generatedMark2={generatedMark2}
        generatedMark3={generatedMark3}
        generatedMark4={generatedMark4}
        generatedOp1={generatedOp1}
        generatedOp2={generatedOp2}
        generatedMang1={generatedMang1}
        generatedMang2={generatedMang2}
        generatedRisk1={generatedRisk1}
        setEnableAlertOnLeave={setEnableAlertOnLeave}
        planPackage={planPackage}
        handleBack={handleBack}
        // experimentID={experimentID}
        // variantID={variantID}

        planLanguage={planLanguage}
        planCurrency={planCurrency}
        planCurrencySymbol={planCurrencySymbol}
        country={country}
        tv={tv}
        handleNextRefund={handleNextRefund}
        starterPrice={starterPrice}
        setStarterPrice={setStarterPrice}
        proPrice={proPrice}
        setProPrice={setProPrice}
        discountedStarterPrice={discountedStarterPrice}
        setDiscountedStarterPrice={setDiscountedStarterPrice}
        discountedProPrice={discountedProPrice}
        setDiscountedProPrice={setDiscountedProPrice}
        secretKey={secretKey}
      />
    );
  } else if (currentStep === 10) {
    component = (
      <ExamplePlan
        examplePackage={examplePackage}
        handleNextExample={handleNextExample}
        handleBackExample={handleBackExample}
        planLanguage={planLanguage}
      />
    );
  } else if (currentStep === 11) {
    component = <RefundPolicy handleBackRefund={handleBackRefund} />;
  }

  const handleSignOut = () => {
    trackEvent({
      event_name: 'sign_out_button',
    });
    signOut();
    Router.push('/');
  };

  //   const chat = new ChatOpenAI({ temperature: 0 });

  // async function langChainCall() {
  //     const responseB = await chat.call([
  //       new SystemChatMessage(
  //         "You are a consultant"
  //       ),
  //       new HumanChatMessage("come up with 3 ideas for a new business"),
  //     ]);

  //     console.log(responseB)
  // }

  // langChainCall()

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      {!enableAlertOnLeave ? <></> : <AlertOnLeave />}
      <Head>
        <title>{t('Plan Generator')}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Plan Generator" />
      </Head>

      <main>
        <div className="body-2">
          <div role="banner" className="navbar w-nav">
            <div className="nav-block">
              <div className="nav">
                <ConfirmLink
                  href="/"
                  message={t('All your progress will be lost if you quit now')}
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
                </ConfirmLink>
              </div>
              {currentStep !== 10 ? (
                <div className="">
                  <ConfirmLink
                    href="/"
                    message={t(
                      'All your progress will be lost if you quit now',
                    )}
                    aria-current="page"
                    className="nav-button-transparent"
                  >
                    {t('Home')}
                  </ConfirmLink>
                </div>
              ) : (
                <div className="">
                  <button
                    onClick={handleBackExample}
                    aria-current="page"
                    className="nav-button-transparent"
                  >
                    {t('Back')}
                  </button>
                </div>
              )}
            </div>
            <div className="navbar-bg"></div>
          </div>

          {fetchLoading ? (
            <div className="flex justify-center items-center mt-32">
              <MoonLoader size={30} />
            </div>
          ) : validPlanQuota ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {component}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="overflow">
              <div className="section-full wf-section">
                <div className="get-started">
                  <div className="form-bg">
                    <div className="flex flex-col justify-center items-center mt-5">
                      <h4>{t('Plan Quota Limit Reached')}</h4>
                      <p>
                        {t(
                          "To make more plan click the button below and click 'Make Business Plan'. Fill out the form and create a new account",
                        )}
                      </p>
                      <button onClick={handleSignOut} className="button">
                        {t('Sign Out and Make New Plan')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'Step1Obj',
        'Step2BasicInfo',
        'Step3CustGroup',
        'Step4Product',
        'Step5KeySuccess',
        'Step6InitialInvestment',
        'Step7Finance',
        'LastStepPlanGen',
        'Register1',
        'ExamplePlan',
        'validate',
        'common',
        'index',
        'privacy_policy',
      ])),
      secretKey,
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
