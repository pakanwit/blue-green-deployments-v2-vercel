import Head from 'next/head';
import { useFormik, FormikHelpers } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import registerFormValidate from '../../utils/registerFormValidate';
import styles from '../../styles/Wizard.module.css';
import { motion } from 'framer-motion';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { checkout } from '../../utils/checkout';
import { FaStripe } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { event } from 'nextjs-google-analytics';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { API_KEY_HEADER } from '../api/constants';
import Input from '../../components/input';
import trackEvent from '../../utils/trackEvent';
import Navbar from '../../components/navbar';
import PrivacyPolicyModal from '../../components/modal/PrivacyPolicyModal';
import RefundPolicyModal from '../../components/modal/RefundPolicyModal';
import { useLoadFormData } from '../../hooks/useLoadFormData';
import { useRouter } from 'next/router';
import { AppContext } from '../../context/appContext';
import { ROUTE_PATH } from '../../constants/path';
import TrustBox from '../../components/trustBox';
import { IReviewsResponse } from '../../model/Schema';
import Image from 'next/image';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import {
  PHAndMYPriceIDProd,
  PHAndMYPriceIDTest,
} from '../../constants/stripe/priceID';

// create interface for props passing from mainWizard.tsx
interface FormValues {
  email: string;
  password: string;
  CPassword: string;
}

export default function Register1({ secretKey, fbPixelId }) {
  const { t, i18n } = useTranslation('Register1');
  const {
    businessOperationalStatus,
    businessPlanObj,
    businessName,
    businessType,
    NEmployee,
    location,
    productOrService,
    salesChannel,
    customerDescription1,
    customerIncome1,
    customerDescription2,
    customerIncome2,
    customerDescription3,
    customerIncome3,
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
    planCurrency,
    planCurrencySymbol,
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
  } = useLoadFormData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { t: tv } = useTranslation('validate');
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState('');
  const [country, setCountry] = useState('');
  const [reviews, setReviews] = useState<IReviewsResponse[]>([]);

  const {
    get: {
      generatedExec,
      generatedSitu1,
      generatedSitu2,
      generatedMark1,
      generatedMark2,
      planPackage,
      proPrice,
      starterPrice,
    },
    set: { setStarterPrice, setProPrice },
  } = useContext(AppContext);

  const [isUnloadActive, setIsUnloadActive] = useState(true);
  useBeforeUnload(isUnloadActive);

  const fetchReviews = async () => {
    const res = await fetch('/api/trustpilot/reviewsRegister', {
      headers: {
        [API_KEY_HEADER]: secretKey,
      },
    });
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    if (session) {
      setIsLoading(true);
    }
  }, [session]);

  useEffect(() => {
    event('Register1_component_view', {
      category: 'Component View',
      label: 'Register1 Component View',
    });
    window.scrollTo(0, 0);
    let countryFromLocal;
    if (typeof window !== 'undefined') {
      countryFromLocal = localStorage.getItem('country');
    }
    console.log('country:', countryFromLocal);
    setCountry(countryFromLocal);
    fetchReviews();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false);
  const onOpenPrivacyPolicyModal = (): void =>
    setIsPrivacyPolicyModalOpen(true);
  const closePrivacyPolicyModal = (): void =>
    setIsPrivacyPolicyModalOpen(false);

  const [isRefundPolicyModalOpen, setIsRefundPolicyModalOpen] = useState(false);
  const onOpenRefundPolicyModal = (): void => setIsRefundPolicyModalOpen(true);
  const closeRefundPolicyModal = (): void => setIsRefundPolicyModalOpen(false);

  const uuid = uuidv4();

  const handleBack = () => {
    router.push(ROUTE_PATH.generateResult);
  };

  async function onSubmit(
    values: FormValues,
    { setErrors, setSubmitting }: FormikHelpers<FormValues>,
  ) {
    if (isSubmitting) return;
    setSubmitting(true);
    setIsSubmitting(true);

    const variantIDFromLocal = localStorage.getItem('variantID');
    const experimentIDFromLocal = localStorage.getItem('experimentID');

    console.log('experimentID from register1: ', experimentIDFromLocal);

    const userInput = {
      businessOperationalStatus,
      businessPlanObj,
      businessName,
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
      planCurrency,
      planCurrencySymbol,
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
    };

    const planContent = {
      generatedExecPro: generatedExec,
      generatedSitu1IndKeyPro: generatedSitu1,
      generatedSitu2SWOTPro: generatedSitu2,
      generatedMark1ObjPro: generatedMark1,
      generatedMark2STPPro: generatedMark2,
    };

    const originalVer = {
      userInput,
      planContent,
    };

    const dataToSend = {
      email: values.email,
      password: values.password,
      experimentID: experimentIDFromLocal,
      variantID: variantIDFromLocal,
      planPackage,
      Ido: uuid,
      country,
      locale,
      plans: [
        {
          originalVer,
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify(dataToSend),
    };

    await fetch('/api/auth/signup', options)
      .then(async (res) => {
        if (res.status === 422) {
          const data = await res.json();
          setErrors({ email: data.message });
        } else if (res.status === 401) {
          setErrors({ email: 'Unauthorized' });
        } else {
          const data = await res.json();
          if (data) {
            // log the user in with next-auth using credentials with the email and password provided in the form
            await signIn('credentials', {
              redirect: false,
              email: values.email,
              password: values.password,
            });

            //set values.email to localstorage

            localStorage.setItem('Ido', uuid);
            localStorage.setItem('email', values.email);
            localStorage.setItem('country', country);

            setUserEmail(values.email);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Incase of testing on localhost or vercel development.
    // Do not send email to zapier.
    if (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '15minuteplan-ai.vercel.app'
    ) {
      //send email to zapier
      try {
        const response = await fetch('/api/sendEmailToZapier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            remarketingEmail: values.email,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setIsSubmitting(false);
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      CPassword: '',
    },
    validate: (values) => registerFormValidate(values, tv),
    onSubmit,
  });

  const locale = i18n.language;

  const variantIDFromLocal =
    typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';

  useEffect(() => {
    let priceId = '';

    const starterTestPlanPriceId = 'price_1OzIhaHawG1pyJK2fK0esDAj';
    const professionalTestPlanPriceId = 'price_1OzIhsHawG1pyJK29nl3qO1h';

    if (planPackage) {
      if (country === 'BN') {
        console.log('test country Brunei');
        priceId =
          planPackage === 'starter'
            ? 'price_1PVzsEHawG1pyJK2n6nn7tkZ'
            : 'price_1PVzt3HawG1pyJK2o2QyBxNP';
      } else if (country === 'TH') {
        console.log('is inside TH');
        priceId =
          planPackage === 'starter'
            ? 'price_1PVzbDHawG1pyJK2wDOR9FQg'
            : 'price_1PVzc8HawG1pyJK2WujgH2tn';
      } else if (['PH', 'MY'].includes(country)) {
        console.log('is inside PH or MY');
        priceId =
          planPackage === 'starter'
            ? PHAndMYPriceIDProd.STARTER
            : PHAndMYPriceIDProd.PRO;
      } else {
        if (planPackage === 'starter') {
          priceId = 'price_1PBJjSHawG1pyJK2fA0XH2je';
        } else if (planPackage === 'professional') {
          priceId = 'price_1PBJJCHawG1pyJK2ZWC8pUDA';
        } else {
          console.log('no planPackage');
        }
      }

      // Incase of testing on localhost or vercel development.
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '15minuteplan-ai.vercel.app'
      ) {
        if (['PH', 'MY'].includes(country)) {
          priceId =
            planPackage === 'starter'
              ? PHAndMYPriceIDTest.STARTER
              : PHAndMYPriceIDTest.PRO;
        } else {
          priceId =
            planPackage === 'starter'
              ? starterTestPlanPriceId
              : professionalTestPlanPriceId;
        }
      }

      if (country !== 'BN') {
        const currencyMappingsVAR1 = {
          AE: {
            currency: 'AED',
            starterPrice: 'د.إ365',
            proPrice: 'د.إ499',
            starterPriceVariant2: 'د.249',
            proPriceVariant2: 'د.365',
            discountedStarterPrice: 'د.إ255',
            discountedProPrice: 'د.إ349',
          },
          AU: {
            currency: 'AUD',
            starterPrice: 'A$ 155',
            proPrice: 'A$ 219',
            starterPriceVariant2: 'A$ 109',
            proPriceVariant2: 'A$ 155',
            discountedStarterPrice: 'A$ 108',
            discountedProPrice: 'A$ 153',
          },
          CA: {
            currency: 'CAD',
            starterPrice: 'CA$ 135',
            proPrice: 'CA$ 189',
            starterPriceVariant2: 'CA$ 95',
            proPriceVariant2: 'CA$ 135',
            discountedStarterPrice: 'CA$ 94',
            discountedProPrice: 'CA$ 132',
          },
          CH: {
            currency: 'CHF',
            starterPrice: 'CHF 89',
            proPrice: 'CHF 125',
            starterPriceVariant2: 'CHF 65',
            proPriceVariant2: 'CHF 89',
            discountedStarterPrice: 'CHF 62',
            discountedProPrice: 'CHF 88',
          },
          EU: {
            currency: 'EUR',
            starterPrice: '€95',
            proPrice: '€129',
            starterPriceVariant2: '€65',
            proPriceVariant2: '€95',
            discountedStarterPrice: '€66',
            discountedProPrice: '€90',
          },
          GB: {
            currency: 'GBP',
            starterPrice: '£79',
            proPrice: '£109',
            starterPriceVariant2: '£55',
            proPriceVariant2: '£79',
            discountedStarterPrice: '£55',
            discountedProPrice: '£76',
          },
          NZ: {
            currency: 'NZD',
            starterPrice: 'NZ$ 169',
            proPrice: 'NZ$ 235',
            starterPriceVariant2: 'NZ$ 115',
            proPriceVariant2: 'NZ$ 169',
            discountedStarterPrice: 'NZ$ 118',
            discountedProPrice: 'NZ$ 164',
          },
          SG: {
            currency: 'SGD',
            starterPrice: 'SGD 135',
            proPrice: 'SGD 189',
            starterPriceVariant2: 'SGD 95',
            proPriceVariant2: 'SGD 135',
            discountedStarterPrice: 'SGD 94',
            discountedProPrice: 'SGD 132',
          },
          ZA: {
            currency: 'ZAR',
            starterPrice: 'R1,850',
            proPrice: 'R2,590',
            starterPriceVariant2: 'R1,290',
            proPriceVariant2: 'R1,850',
            discountedStarterPrice: 'R1,295',
            discountedProPrice: 'R1,813',
          },
          HK: {
            currency: 'HKD',
            starterPrice: 'HK$ 779',
            proPrice: 'HK$ 1,090',
            starterPriceVariant2: 'HK$ 539',
            proPriceVariant2: 'HK$ 779',
            discountedStarterPrice: 'HK$ 545',
            discountedProPrice: 'HK$ 763',
          },
          SE: {
            currency: 'SEK',
            starterPrice: '1,090kr',
            proPrice: '1,490kr',
            starterPriceVariant2: '759kr',
            proPriceVariant2: '1,090kr',
            discountedStarterPrice: '763kr',
            discountedProPrice: '1,043kr',
          },
          DK: {
            currency: 'DKK',
            starterPrice: '709kr',
            proPrice: '990kr',
            starterPriceVariant2: '479kr',
            proPriceVariant2: '709kr',
            discountedStarterPrice: '496kr',
            discountedProPrice: '693kr',
          },
          NO: {
            currency: 'NOK',
            starterPrice: '1090kr',
            proPrice: '1490kr',
            starterPriceVariant2: '765kr',
            proPriceVariant2: '1090kr',
            discountedStarterPrice: '763kr',
            discountedProPrice: '1,043kr',
          },
          JP: {
            currency: 'JPY',
            starterPrice: '¥14,900',
            proPrice: '¥20,900',
            starterPriceVariant2: '¥10,900',
            proPriceVariant2: '¥14,900',
            discountedStarterPrice: '¥10,430',
            discountedProPrice: '¥14,630',
          },
          QA: {
            currency: 'QAR',
            starterPrice: 'QR 359',
            proPrice: 'QR 509',
            starterPriceVariant2: 'QR 249',
            proPriceVariant2: 'QR 359',
            discountedStarterPrice: 'QR 251',
            discountedProPrice: 'QR 356',
          },
          SA: {
            currency: 'SAR',
            starterPrice: 'SR 379',
            proPrice: 'SR 519',
            starterPriceVariant2: 'SR 259',
            proPriceVariant2: 'SR 379',
            discountedStarterPrice: 'SR 265',
            discountedProPrice: 'SR 363',
          },
          IN: {
            currency: 'INR',
            starterPrice: '₹2,990',
            proPrice: '₹3,990',
            starterPriceVariant2: '₹2,990',
            proPriceVariant2: '₹3,990',
            discountedStarterPrice: '₹2,093',
            discountedProPrice: '₹2,793',
          },
          AR: {
            currency: 'ARS',
            starterPrice: 'ARS 29,000',
            proPrice: 'ARS 39,500',
            starterPriceVariant2: 'ARS 29,000',
            proPriceVariant2: 'ARS 39,500',
            discountedStarterPrice: 'ARS 20,300',
            discountedProPrice: 'ARS 27,650',
          },
          CL: {
            currency: 'CLP',
            starterPrice: 'CLP 32,900',
            proPrice: 'CLP 43,900',
            starterPriceVariant2: 'CLP 32,900',
            proPriceVariant2: 'CLP 43,900',
            discountedStarterPrice: 'CLP 23,030',
            discountedProPrice: 'CLP 30,730',
          },
          BR: {
            currency: 'BRL',
            starterPrice: 'R$ 175',
            proPrice: 'R$ 235',
            starterPriceVariant2: 'R$ 175',
            proPriceVariant2: 'R$ 235',
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
          setStarterPrice(countryMapping.starterPrice);
          setProPrice(countryMapping.proPrice);
          // setDiscountedStarterPrice(countryMapping.discountedStarterPrice);
          // setDiscountedProPrice(countryMapping.discountedProPrice);
        } else if (euroCountries.includes(country)) {
          console.log('is euro country inside: ', country);
          setStarterPrice('€65');
          setProPrice('€95');
          // setDiscountedStarterPrice('€66');
          // setDiscountedProPrice('€90');
        } else {
          console.log('no country match inside: ', country);
          setStarterPrice('$69');
          setProPrice('$99');
          // setDiscountedStarterPrice('$69');
          // setDiscountedProPrice('$97');
        }
      } else {
        console.log('no country: ', country);
        setStarterPrice('10 THB');
        setProPrice('10 THB');
        // setDiscountedStarterPrice('$69');
        // setDiscountedProPrice('$97');
      }

      if (userEmail) {
        checkout({
          lineitems: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          userEmail,
          secretKey,
        });
      }
    } else {
      console.log('no plan package');
    }
  }, [country, planPackage, userEmail]);

  // const handleGoogleSignin = async () => {
  //   signIn('google', { callbackUrl: '/stripeCheckout' })
  // }
  // if there is formik.errors, then set isloading to false

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {
      setIsLoading(false);
    }
  }, [formik.errors]);

  useEffect(() => {
    if (isSubmitting) {
      event('final_register_and_purchase_clicked', {
        category: 'Button Click',
        label: 'Register and Purchase button clicked at Register1 component',
      });
    }
  }, [isSubmitting]);

  const submitting = () => {
    trackEvent({
      event_name: 'payment_cta_button',
    });
    if (Object.keys(formik.errors).length > 0) {
      return;
    } else {
      setIsLoading(true);
      setIsUnloadActive(false); // Disable unload event
      formik.handleSubmit();
    }
  };

  function handleBackandCancelDiscount() {
    trackEvent({
      event_name: 'payment_back_button',
    });
    handleBack();
  }

  return (
    <>
      <Navbar fbPixelId={fbPixelId} />
      <motion.div
        key="component-eight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Head>
          <title>{t('Register')}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <meta name="description" content={t('Plan Generator')} />
        </Head>

        <main>
          <div className="body-2">
            <div className="overflow">
              <div className="section-full wf-section">
                <div className="get-started2">
                  <div className="form-bg">
                    <h4 className="">{t('Registration and Payment')}</h4>

                    <div className="form-block-started w-form">
                      <form
                        className="form-started"
                        onSubmit={formik.handleSubmit}
                      >
                        {/* <button className={styles.register_button} onClick={handleGoogleSignin}>
                          <FcGoogle size={32} className="mr-2 " />
                          {t("Continue With Google")}
                        </button> */}

                        {/* <div className="flex items-center justify-between mb-4">
                          <div className="w-1/2 border-b border-gray-300"></div>
                          <div className="text-gray-600 px-4">{t("or")}</div>
                          <div className="w-1/2 border-b border-gray-300"></div>
                        </div> */}

                        <div className="mb-6">
                          <label htmlFor="email" className={styles.label}>
                            {t('Email')}{' '}
                            <span className="text-sm">{t('(required)')}</span>
                          </label>
                          <Input
                            {...formik.getFieldProps('email')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                'email',
                                e.target.value.toLowerCase(),
                              );
                            }}
                            type="email"
                            name="email"
                            id="email"
                            className={`${styles.text_input} ${formik.errors.email && formik.touched.email ? 'border-rose-400' : 'border-gray-300'} `}
                            page="Register1"
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <span className="text-rose-400">
                              {formik.errors.email as React.ReactNode}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div className="mb-6">
                          <label htmlFor="password" className={styles.label}>
                            {t('Password')}{' '}
                            <span className="text-sm">{t('(required)')}</span>
                          </label>
                          <Input
                            {...formik.getFieldProps('password')}
                            type="password"
                            name="password"
                            id="password"
                            className={`${styles.text_input} ${formik.errors.password && formik.touched.password ? 'border-rose-400' : 'border-gray-300'} `}
                            page="Register1"
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <span className="text-rose-400">
                              {formik.errors.password as React.ReactNode}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div className="mb-6">
                          <label htmlFor="CPassword" className={styles.label}>
                            {t('Confirm Password')}{' '}
                            <span className="text-sm">{t('(required)')}</span>
                          </label>
                          <Input
                            {...formik.getFieldProps('CPassword')}
                            type="password"
                            name="CPassword"
                            id="CPassword"
                            className={`${styles.text_input} ${formik.errors.CPassword && formik.touched.CPassword ? 'border-rose-400' : 'border-gray-300'}`}
                            page="Register1"
                          />
                          {formik.errors.CPassword &&
                          formik.touched.CPassword ? (
                            <span className="text-rose-400">
                              {formik.errors.CPassword as React.ReactNode}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>

                        {isLoading && (
                          <div className="flex flex-col justify-center items-center fixed inset-0 bg-white bg-opacity-80 z-50">
                            <MoonLoader className="mt-5 mb-5" size={35} />
                            <div className="p-6 text-center">
                              <strong className="text-lg">
                                {t(
                                  'Redirecting to payment page, this can take a minute',
                                )}
                              </strong>
                            </div>
                          </div>
                        )}

                        {planPackage === 'starter' && (
                          <div className="flex flex-col mt-5 border border-gray-400 p-5 rounded-xl">
                            <div className="font-bold">
                              {t('Order Summary:')}
                            </div>
                            <div className="flex justify-between">
                              <div className="">
                                {t('Starter Business Plan')}
                              </div>
                              <div className="">{`${starterPrice}`}</div>
                            </div>

                            <div className="">
                              {t('Pay Once, use forever. No extra costs.')}{' '}
                            </div>
                          </div>
                        )}

                        {planPackage === 'professional' && (
                          <div className="flex flex-col mt-5 border border-gray-400 p-5 rounded-xl">
                            <div className="font-bold">
                              {t('Order Summary:')}
                            </div>
                            <div className="flex justify-between">
                              <div className="">
                                {t('Professional Business Plan')}
                              </div>
                              <div className="">{`${proPrice}`}</div>
                            </div>
                            <div className="">
                              {t('Pay Once, use forever. No extra costs.')}{' '}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col justify-center items-center mt-5 text-center">
                          <div className="flex gap-1 items-center">
                            <div>
                              {t('Guaranteed')}{' '}
                              <strong>{t('Safe and Secure')}</strong>{' '}
                              {t('Payment Powered by')}
                            </div>
                          </div>
                          <div className="flex justify-center gap-2 items-center">
                            <FaStripe size={70} color="#6772E5" />
                            <BsFillShieldLockFill size={30} />
                          </div>
                          {(formik.errors.email && formik.touched.email) ||
                          (formik.errors.password && formik.touched.password) ||
                          (formik.errors.CPassword &&
                            formik.touched.CPassword) ? (
                            <span className="text-rose-400">
                              {t('Please check your inputs')}
                            </span>
                          ) : (
                            <></>
                          )}
                          <div className="text-center text-sm mb-2">
                            {t("By registering you're agreeing to our")}
                            <button
                              type="button"
                              className="text-ksy-500 underline ml-1"
                              onClick={onOpenRefundPolicyModal}
                            >
                              {t('refund_policy_link')}
                            </button>

                            <>
                              {t('agreement_link_conjunction')}
                              <button
                                type="button"
                                className="text-ksy-500 underline ml-1"
                                onClick={onOpenPrivacyPolicyModal}
                              >
                                {t('privacy_policy_link')}
                              </button>
                            </>
                          </div>
                          <button
                            onClick={submitting}
                            type="submit"
                            className="button-2 w-button m-auto"
                          >
                            {t('Register & Purchase')}
                          </button>
                        </div>
                        <div className="mt-3 text-center text-rose-600">
                          {t(
                            "warning: If you don't complete payment your plan will be",
                          )}{' '}
                          <strong className="text-rose-600">{t('LOST')}</strong>{' '}
                        </div>
                        {reviews.length > 0 && (
                          <div className="w-full flex flex-col items-center justify-center gap-4 mb-12">
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
                              {reviews?.map((review) => (
                                <div key={review.id} className="w-full h-full">
                                  <TrustBox {...review} notClickable={true} />
                                </div>
                              ))}
                            </div>
                            <br />
                            <div className="flex flex-row items-center gap-2 text-black">
                              {t('Reviews From')}
                              <Image
                                src="https://plannit.ai/assets/trustpilot.svg"
                                width={100}
                                height={100}
                                alt="Trustpilot"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={handleBackandCancelDiscount}
                            className="button back-button white"
                          >
                            {t('Back')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
      {isPrivacyPolicyModalOpen && (
        <PrivacyPolicyModal closePrivacyPolicyModal={closePrivacyPolicyModal} />
      )}
      {isRefundPolicyModalOpen && (
        <RefundPolicyModal closeRefundPolicyModal={closeRefundPolicyModal} />
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['Register1'])),
      secretKey,
      fbPixelId,
    },
  };
}
