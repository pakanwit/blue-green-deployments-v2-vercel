import Head from 'next/head';
import Image from 'next/image';
import { useFormik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import registerFormValidate from '../utils/registerFormValidate';
import styles from '../styles/Wizard.module.css';
import { motion } from 'framer-motion';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { checkout } from '../utils/checkout';
import { FaStripe } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import ConfirmLink from './ConfirmLink';
import { event } from 'nextjs-google-analytics';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import Input from './input';
import trackEvent from '../utils/trackEvent';

// create interface for props passing from mainWizard.tsx

export default function Register1({
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
  generatedExec,
  generatedSitu1,
  generatedSitu2,
  generatedMark1,
  generatedMark2,
  generatedMark3,
  generatedMark4,
  generatedOp1,
  generatedOp2,
  generatedMang1,
  generatedMang2,
  generatedRisk1,
  setEnableAlertOnLeave,

  planPackage,
  handleBack,
  // experimentID,
  // variantID,

  planLanguage,
  country,
  planCurrency,
  planCurrencySymbol,
  tv,
  handleNextRefund,

  starterPrice,
  setStarterPrice,
  proPrice,
  setProPrice,
  discountedStarterPrice,
  setDiscountedStarterPrice,
  discountedProPrice,
  setDiscountedProPrice,
  secretKey,
}) {
  const { t, i18n } = useTranslation('Register1');

  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (session) {
      setIsLoading(true);
    }
  }, [session]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const uuid = uuidv4();

  interface FormValues {
    email: string;
    password: string;
    CPassword: string;
  }

  async function onSubmit(
    values: FormValues,
    { setErrors, setSubmitting }: FormikHelpers<FormValues>,
  ) {
    if (isSubmitting) return;
    setSubmitting(true);
    setIsSubmitting(true);
    setEnableAlertOnLeave(false);

    const variantIDFromLocal = localStorage.getItem('variantID');
    const experimentIDFromLocal = localStorage.getItem('experimentID');

    console.log('experimentID from register1: ', experimentIDFromLocal);

    const userInput = {
      businessOperationalStatus: businessOperationalStatus ?? 0,
      businessPlanObj: businessPlanObj ?? 0,

      businessName: businessName ?? 0,
      businessType: businessType ?? 0,
      NEmployee: NEmployee ?? 0,
      location: location ?? 0,
      salesChannel: salesChannel ?? 0,
      productOrService: productOrService ?? 0,

      customerIncome1: customerIncome1 ?? 0,
      customerIncome2: customerIncome2 ?? 0,
      customerIncome3: customerIncome3 ?? 0,
      customerDescription1: customerDescription1 ?? 0,
      customerDescription2: customerDescription2 ?? 0,
      customerDescription3: customerDescription3 ?? 0,

      productName1: productName1 ?? 0,
      productName2: productName2 ?? 0,
      productName3: productName3 ?? 0,
      productName4: productName4 ?? 0,
      productName5: productName5 ?? 0,
      productDescription1: productDescription1 ?? 0,
      productDescription2: productDescription2 ?? 0,
      productDescription3: productDescription3 ?? 0,
      productDescription4: productDescription4 ?? 0,
      productDescription5: productDescription5 ?? 0,

      successFactors1: successFactors1 ?? 0,
      successFactors2: successFactors2 ?? 0,
      successFactors3: successFactors3 ?? 0,
      weakness1: weakness1 ?? 0,
      weakness2: weakness2 ?? 0,
      weakness3: weakness3 ?? 0,
      investmentItem1: investmentItem1 ?? 0,
      investmentAmountItem1: investmentAmountItem1 ?? 0,
      investmentItem2: investmentItem2 ?? 0,
      investmentAmountItem2: investmentAmountItem2 ?? 0,
      investmentItem3: investmentItem3 ?? 0,
      investmentAmountItem3: investmentAmountItem3 ?? 0,
      investmentItem4: investmentItem4 ?? 0,
      investmentAmountItem4: investmentAmountItem4 ?? 0,
      investmentItem5: investmentItem5 ?? 0,
      investmentAmountItem5: investmentAmountItem5 ?? 0,
      investmentItem6: investmentItem6 ?? 0,
      investmentAmountItem6: investmentAmountItem6 ?? 0,
      investmentItem7: investmentItem7 ?? 0,
      investmentAmountItem7: investmentAmountItem7 ?? 0,
      investmentItem8: investmentItem8 ?? 0,
      investmentAmountItem8: investmentAmountItem8 ?? 0,
      investmentItem9: investmentItem9 ?? 0,
      investmentAmountItem9: investmentAmountItem9 ?? 0,
      investmentItem10: investmentItem10 ?? 0,
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
      planLanguage: planLanguage ?? 0,
      planCurrency: planCurrency ?? 0,
      planCurrencySymbol: planCurrencySymbol ?? 0,
    };

    const planContent = {
      generatedExecPro: generatedExec ?? 0,
      generatedSitu1IndKeyPro: generatedSitu1 ?? 0,
      generatedSitu2SWOTPro: generatedSitu2 ?? 0,
      generatedMark1ObjPro: generatedMark1 ?? 0,
      generatedMark2STPPro: generatedMark2 ?? 0,
    };

    const originalVer = {
      userInput,
      planContent,
    };

    const dataToSend = {
      email: values.email,
      password: values.password,
      experimentID: experimentIDFromLocal ?? 0,
      variantID: variantIDFromLocal ?? 0,
      planPackage: planPackage ?? 0,
      Ido: uuid,
      country: country ?? 0,
      locale: locale ?? 0,
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
            localStorage.setItem('country', country ?? 0);

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

  const variantIDFromLocal = localStorage.getItem('variantID');

  console.log('country: ', country);

  useEffect(() => {
    let priceId = '';

    const starterTestPlanPriceId = 'price_1OzIhaHawG1pyJK2fK0esDAj';
    const professionalTestPlanPriceId = 'price_1OzIhsHawG1pyJK29nl3qO1h';

    const starterTestPlanPriceIdVariant2 = 'price_1PBJjSHawG1pyJK2fA0XH2je';
    const professionalTestPlanPriceIdVariant2 =
      'price_1PBJJCHawG1pyJK2ZWC8pUDA';

    const starterTestPlanPriceVariant2 = starterTestPlanPriceIdVariant2;
    const proTestPlanPriceVariant2 = professionalTestPlanPriceIdVariant2;

    if (planPackage) {
      if (country === 'TH') {
        console.log('is inside TH');
        priceId =
          planPackage === 'starter'
            ? 'price_1Oawc8HawG1pyJK2wJdOtgqV'
            : 'price_1OawbXHawG1pyJK24TeH7gZc';
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
        priceId =
          planPackage === 'starter'
            ? starterTestPlanPriceId
            : professionalTestPlanPriceId;
      }

      if (country !== 'TH') {
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
        setStarterPrice('$69');
        setProPrice('$99');
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
    event('Register1_component_view', {
      category: 'Component View',
      label: 'Register1 Component View',
    });
  }, []);

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
            <div role="banner" className="navbar w-nav">
              <div className="nav-block">
                <div className="nav">
                  <ConfirmLink
                    message={t(
                      'All your progress will be lost if you quit now',
                    )}
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
                      alt={t('logo')}
                    />
                  </ConfirmLink>
                </div>
                <div className="nav">
                  <ConfirmLink
                    message={t(
                      'All your progress will be lost if you quit now',
                    )}
                    href="/"
                    aria-current="page"
                    className="nav-button-transparent w-button w--current"
                  >
                    {t('Back to Home')}
                  </ConfirmLink>
                </div>
              </div>
              <div className="navbar-bg"></div>
            </div>

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
                          <div className="flex flex-col justify-center items-center fixed inset-0 bg-white bg-opacity-80">
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
                              <div className="">{starterPrice}</div>
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
                              <div className="">{proPrice}</div>
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
                              onClick={handleNextRefund}
                              className="text-ksy-500 underline ml-1"
                            >
                              {t('refund policy')}
                            </button>
                          </div>
                          <button
                            onClick={submitting}
                            type="submit"
                            className="button-2 w-button m-auto"
                          >
                            {t('Register & Purchase')}
                          </button>
                        </div>
                        <p className="mt-3 text-center text-rose-600">
                          {t(
                            "warning: If you don't complete payment your plan will be",
                          )}{' '}
                          <strong className="text-rose-600">{t('LOST')}</strong>{' '}
                        </p>

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
    </>
  );
}
