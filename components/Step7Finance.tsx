import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step7FinanceValidate from '../utils/Step7FinanceValidate';
import styles from '../styles/Wizard.module.css';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { event } from 'nextjs-google-analytics';
import { useSession, signOut } from 'next-auth/react';
import { set } from 'mongoose';
import { useTranslation } from 'react-i18next';
import trackEvent from '../utils/trackEvent';
import Input from './input';
import { API_KEY_HEADER } from '../pages/api/constants';
import { formDataTitle } from '../constants/formTitle';

const mapPlanLanguage = {
  'English (US)': 'en',
  German: 'de',
  French: 'fr',
  Spanish: 'es',
  Italian: 'it',
  'English (UK)': 'en-uk',
  Dutch: 'nl',
  Japanese: 'ja',
  Arabic: 'ar',
  Swedish: 'sv',
  Finnish: 'fi',
  Norwegian: 'no',
  Danish: 'da',
};

export default function Step5InitialInvestment({
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

  setFirstYearRevenue,
  setRevenueGrowthRate,

  setCOGSP,
  setWageCostP,
  setMarkCostP,
  setRentCostP,
  setGenCostP,
  setDepreCostP,
  setUtilCostP,
  setOtherCostP,
  setIntCostP,
  setTaxCostP,

  formattedFirstYearRevenue,
  setFormattedFirstYearRevenue,

  handleNextFormik,
  handleBack,
  isSession,

  setPlanLanguage,
  planLanguage,

  setPlanCurrency,
  planCurrency,
  planCurrencySymbol,
  tv,
  secretKey,
}) {
  const { t } = useTranslation('Step7Finance');

  const [absoluteCOGSCost, setAbsoluteCOGSCost] = useState(0);
  const [absoluteWageCost, setAbsoluteWageCost] = useState(0);
  const [absoluteMarkCost, setAbsoluteMarkCost] = useState(0);
  const [absoluteRentCost, setAbsoluteRentCost] = useState(0);
  const [absoluteGenCost, setAbsoluteGenCost] = useState(0);
  const [absoluteDepreCost, setAbsoluteDepreCost] = useState(0);
  const [absoluteUtilCost, setAbsoluteUtilCost] = useState(0);
  const [absoluteOtherCost, setAbsoluteOtherCost] = useState(0);
  const [absoluteIntCost, setAbsoluteIntCost] = useState(0);
  const [absoluteTaxCost, setAbsoluteTaxCost] = useState(0);

  const [absoluteTotalCost, setAbsoluteTotalCost] = useState(0);
  const [absoluteNetProfit, setAbsoluteNetProfit] = useState(0);
  const [absoluteNetProfitMargin, setAbsoluteNetProfitMargin] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  document.addEventListener('wheel', (event: WheelEvent) => {
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLInputElement &&
      activeElement.type === 'number'
    ) {
      activeElement.blur();
    }
  });

  const [planLanguageError, setPlanLanguageError] = useState(false);

  interface FormValues {
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

    planLanguage: string;
  }
  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);
    if (!planLanguage) {
      setPlanLanguageError(true);
      return;
    }
    setFirstYearRevenue(formik.values.firstYearRevenue);
    setRevenueGrowthRate(formik.values.revenueGrowthRate / 100);

    setCOGSP(formik.values.COGSP / 100);
    setWageCostP(formik.values.wageCostP / 100);
    setMarkCostP(formik.values.markCostP / 100);
    setRentCostP(formik.values.rentCostP / 100);
    setGenCostP(formik.values.genCostP / 100);
    setDepreCostP(formik.values.depreCostP / 100);
    setUtilCostP(formik.values.utilCostP / 100);
    setOtherCostP(formik.values.otherCostP / 100);
    setIntCostP(formik.values.intCostP / 100);
    setTaxCostP(formik.values.taxCostP / 100);

    handleNextFormik();
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      firstYearRevenue: firstYearRevenue,
      revenueGrowthRate: revenueGrowthRate * 100,

      COGSP: COGSP * 100,
      wageCostP: wageCostP * 100,
      markCostP: markCostP * 100,
      rentCostP: rentCostP * 100,
      genCostP: genCostP * 100,
      depreCostP: depreCostP * 100,
      utilCostP: utilCostP * 100,
      otherCostP: otherCostP * 100,
      intCostP: intCostP * 100,
      taxCostP: taxCostP * 100,

      planLanguage: planLanguage,
    },
    validate: (values) => Step7FinanceValidate(values, tv),
    onSubmit,
  });
  const isCleanCase = Object.keys(formik.errors).length === 0;

  useEffect(() => {
    setAbsoluteCOGSCost(
      Math.round(formik.values.firstYearRevenue * (formik.values.COGSP / 100)),
    );
    setAbsoluteWageCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.wageCostP / 100),
      ),
    );
    setAbsoluteMarkCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.markCostP / 100),
      ),
    );
    setAbsoluteRentCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.rentCostP / 100),
      ),
    );
    setAbsoluteGenCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.genCostP / 100),
      ),
    );
    setAbsoluteDepreCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.depreCostP / 100),
      ),
    );
    setAbsoluteUtilCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.utilCostP / 100),
      ),
    );
    setAbsoluteOtherCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.otherCostP / 100),
      ),
    );
    setAbsoluteIntCost(
      Math.round(
        formik.values.firstYearRevenue * (formik.values.intCostP / 100),
      ),
    );
    // formula for Abosute Tax Cost is (revenue - (all other cost)) * taxCostP, suggest code
    setAbsoluteTaxCost(
      Math.round(
        (formik.values.firstYearRevenue -
          (absoluteCOGSCost +
            absoluteWageCost +
            absoluteMarkCost +
            absoluteRentCost +
            absoluteGenCost +
            absoluteDepreCost +
            absoluteUtilCost +
            absoluteOtherCost +
            absoluteIntCost)) *
          (formik.values.taxCostP / 100),
      ),
    );

    //use setAbsoluteTotalCost to set the total cost
    setAbsoluteTotalCost(
      Math.round(
        absoluteCOGSCost +
          absoluteWageCost +
          absoluteMarkCost +
          absoluteRentCost +
          absoluteGenCost +
          absoluteDepreCost +
          absoluteUtilCost +
          absoluteOtherCost +
          absoluteIntCost +
          absoluteTaxCost,
      ),
    );

    //use setAbsoluteNetProfit to set the net profit
    setAbsoluteNetProfit(
      Math.round(formik.values.firstYearRevenue - absoluteTotalCost),
    );

    //use setAbsoluteNetProfitMargin to set the net profit margin
    setAbsoluteNetProfitMargin(
      Math.round((absoluteNetProfit / formik.values.firstYearRevenue) * 100),
    );
  }, [
    formik.values.firstYearRevenue,

    formik.values.COGSP,
    formik.values.wageCostP,
    formik.values.markCostP,
    formik.values.rentCostP,
    formik.values.genCostP,
    formik.values.depreCostP,
    formik.values.utilCostP,
    formik.values.otherCostP,
    formik.values.intCostP,
    formik.values.taxCostP,

    absoluteCOGSCost,
    absoluteWageCost,
    absoluteMarkCost,
    absoluteRentCost,
    absoluteGenCost,
    absoluteDepreCost,
    absoluteUtilCost,
    absoluteOtherCost,
    absoluteIntCost,
    absoluteTaxCost,
    absoluteTotalCost,
    absoluteNetProfit,
    absoluteNetProfitMargin,
  ]);

  const handleRevenueChange = (e) => {
    const numericValue = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    formik.setFieldValue('firstYearRevenue', numericValue);
    setFirstYearRevenue(numericValue);
    if (numericValue) {
      const formattedValue = new Intl.NumberFormat().format(numericValue);
      setFormattedFirstYearRevenue(formattedValue);
    } else {
      setFormattedFirstYearRevenue('');
    }
  };
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_7_back_button',
      is_clean_case: isCleanCase,
    });
    handleBack();
  };
  useEffect(() => {
    if (firstYearRevenue) {
      const formattedValue = new Intl.NumberFormat().format(firstYearRevenue);
      setFormattedFirstYearRevenue(formattedValue);
    } else {
      setFormattedFirstYearRevenue('');
    }
  }, [firstYearRevenue]);

  const handleRevenueGrowthRateChange = (e) => {
    setRevenueGrowthRate(e.target.value / 100);
    formik.setFieldValue('revenueGrowthRate', e.target.value);
  };

  const handleCOGSPChange = (e) => {
    setCOGSP(e.target.value / 100);
    formik.setFieldValue('COGSP', e.target.value);
  };
  const handleWageCostPChange = (e) => {
    setWageCostP(e.target.value / 100);
    formik.setFieldValue('wageCostP', e.target.value);
  };
  const handleMarkCostPChange = (e) => {
    setMarkCostP(e.target.value / 100);
    formik.setFieldValue('markCostP', e.target.value);
  };
  const handleRentCostPChange = (e) => {
    setRentCostP(e.target.value / 100);
    formik.setFieldValue('rentCostP', e.target.value);
  };
  const handleGenCostPChange = (e) => {
    setGenCostP(e.target.value / 100);
    formik.setFieldValue('genCostP', e.target.value);
  };
  const handleDepreCostPChange = (e) => {
    setDepreCostP(e.target.value / 100);
    formik.setFieldValue('depreCostP', e.target.value);
  };
  const handleUtilCostPChange = (e) => {
    setUtilCostP(e.target.value / 100);
    formik.setFieldValue('utilCostP', e.target.value);
  };
  const handleOtherCostPChange = (e) => {
    setOtherCostP(e.target.value / 100);
    formik.setFieldValue('otherCostP', e.target.value);
  };
  const handleIntCostPChange = (e) => {
    setIntCostP(e.target.value / 100);
    formik.setFieldValue('intCostP', e.target.value);
  };
  const handleTaxCostPChange = (e) => {
    setTaxCostP(e.target.value / 100);
    formik.setFieldValue('taxCostP', e.target.value);
  };

  useEffect(() => {
    if (!isSession) {
      event('Step6Finance_component_view', {
        category: 'Component View',
        label: 'Step6Finance Component View',
      });
    }
  }, []);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return; // Don't run the effect if there is no session
    }

    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      try {
        const res = await fetch('/api/getUserData', {
          headers: {
            [API_KEY_HEADER]: secretKey,
          },
        });
        const data = await res.json();

        if (data) {
          // Check if user payment status is not "paid"
          if (data.paymentStatus !== 'paid') {
            console.log('signing out');
            signOut(); // call signOut function
            return; // stop here, no need to continue
          }
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextLanguage, setSelectedTextLanguage] = useState('Language');
  const [selectedTextCurrency, setSelectedTextCurrency] = useState('Currency');

  const toggleDropdown = () => {
    trackEvent({
      event_name: 'page_7_language_button',
      is_clean_case: isCleanCase,
    });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (formData[formDataTitle.FORM7_13]) {
      const value = formData[formDataTitle.FORM7_13].value;
      setSelectedTextLanguage(value);
      setPlanLanguage(mapPlanLanguage[value]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[value]);
    }
  }, [planLanguage]);

  // for language
  useEffect(() => {
    if (planLanguage === 'en') {
      setSelectedTextLanguage('English (US)');
    } else if (planLanguage === 'de') {
      setSelectedTextLanguage('German');
    } else if (planLanguage === 'fr') {
      setSelectedTextLanguage('French');
    } else if (planLanguage === 'es') {
      setSelectedTextLanguage('Spanish');
    } else if (planLanguage === 'it') {
      setSelectedTextLanguage('Italian');
    } else if (planLanguage === 'en-uk') {
      setSelectedTextLanguage('English (UK)');
    } else if (planLanguage === 'nl') {
      setSelectedTextLanguage('Dutch');
    } else if (planLanguage === 'ja') {
      setSelectedTextLanguage('Japanese');
    } else if (planLanguage === 'ar') {
      setSelectedTextLanguage('Arabic');
    } else if (planLanguage === 'sv') {
      setSelectedTextLanguage('Swedish');
    } else if (planLanguage === 'fi') {
      setSelectedTextLanguage('Finnish');
    } else if (planLanguage === 'no') {
      setSelectedTextLanguage('Norwegian');
    } else if (planLanguage === 'da') {
      setSelectedTextLanguage('Danish');
    } else {
      setSelectedTextLanguage('Language');
    }
  }, []);

  const handleItemClickLanguage = (text) => {
    console.log('text:', text);
    setSelectedTextLanguage(text);

    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    formData[formDataTitle.FORM7_13] = {
      id: 'dropdownDefaultButton',
      value: text,
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    if (text === 'English (US)') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'German') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'French') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Spanish') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Italian') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'English (UK)') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Dutch') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Japanese') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Arabic') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Swedish') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Finnish') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Norwegian') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    } else if (text === 'Danish') {
      setPlanLanguage(mapPlanLanguage[text]);
      formik.setFieldValue('planLanguage', mapPlanLanguage[text]);
    }

    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        key="component-six"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="overflow">
          <div className="section-full wf-section">
            <div className="get-started">
              <div className="form-bg">
                <div className="flex justify-center items-center mt-5 mb-8 text-black">
                  {t('STEP 7 OF 7')}
                </div>
                <h4 className="">
                  {t('Enter Financial Details and Plan Language')}
                </h4>
                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="firstYearRevenue"
                        className={styles.label}
                      >
                        {t('Expected First Year Revenue')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {planCurrencySymbol}
                        </div>
                        <Input
                          {...formik.getFieldProps('firstYearRevenue')}
                          value={formattedFirstYearRevenue}
                          onChange={handleRevenueChange}
                          type="text"
                          name="firstYearRevenue"
                          id="firstYearRevenue"
                          className={`${planCurrencySymbol.length > 1 ? styles.padl12 : styles.padl} ${styles.cash_input}  ${formik.errors.firstYearRevenue && formik.touched.firstYearRevenue ? 'border-rose-400' : 'border-gray-300'} `}
                          page="page_7_finance"
                          saveUserData={{
                            id: 'firstYearRevenue',
                            title: formDataTitle.FORM7_1,
                            isCurrency: true,
                          }}
                        />
                      </div>
                      {formik.errors.firstYearRevenue &&
                      formik.touched.firstYearRevenue ? (
                        <span className="text-rose-400">
                          {formik.errors.firstYearRevenue as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="revenueGrowthRate"
                        className={styles.label}
                      >
                        {t(
                          'How much do you expect your revenue to grow each year?',
                        )}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          %
                        </div>
                        <Input
                          {...formik.getFieldProps('revenueGrowthRate')}
                          onChange={handleRevenueGrowthRateChange}
                          type="number"
                          name="revenueGrowthRate"
                          id="revenueGrowthRate"
                          className={` padl ${styles.percent_input}  ${formik.errors.revenueGrowthRate && formik.touched.revenueGrowthRate ? 'border-rose-400' : 'border-gray-300'} `}
                          page="page_7_finance"
                          saveUserData={{
                            id: 'revenueGrowthRate',
                            title: formDataTitle.FORM7_2,
                            isCurrency: true,
                          }}
                        />
                      </div>
                      {formik.errors.revenueGrowthRate &&
                      formik.touched.revenueGrowthRate ? (
                        <span className="text-rose-400">
                          {formik.errors.revenueGrowthRate as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-2">
                      <label htmlFor="" className={styles.label}>
                        {t('Enter Yearly Business Operations Cost')}
                        <span className="text-sm">
                          {t('(edit percentages or leave as is)')}
                        </span>
                      </label>
                      <hr />
                    </div>

                    {/* first line -----------------------------------*/}
                    <div
                      className={`${styles.grid2} ${styles.lower_height2} ${styles.align_end}`}
                    >
                      <div className=""></div>

                      <div className="">
                        <label className={styles.grid_label}>
                          {t('% of Revenue')}
                        </label>
                        <hr />
                      </div>

                      <div className="">
                        <label className={styles.grid_label}>
                          {t('Total Cost')}
                        </label>
                        <hr />
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={`${styles.label_xs} labelContainer`}>
                        <div>{t('1. Cost of Goods Sold')}</div>
                        <div className="ml-1">
                          <AiFillQuestionCircle size={20} />
                        </div>
                        <div className="textBubble">
                          {t(
                            'Cost of Goods Sold (COGS) refers to the direct costs involved in producing goods, like raw materials and hourly wage paid to line workers. The more stuff you sell the more this cost goes up.',
                          )}
                        </div>
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('COGSP')}
                            onChange={handleCOGSPChange}
                            type="number"
                            name="COGSP"
                            id="COGSP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.COGSP && formik.touched.COGSP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'COGSP',
                              title: formDataTitle.FORM7_3,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteCOGSCost.toLocaleString()}
                      </div>
                    </div>
                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={`${styles.label_xs} labelContainer`}>
                        <div>{t('2. Wages and Benefits')}</div>
                        <div className="ml-1">
                          <AiFillQuestionCircle size={20} />
                        </div>
                        <div className="textBubble">
                          {t(
                            "Wages and benefits are employee expenses that don't change significantly with revenue. For example, a manager's salary remains constant regardless of how many services or goods are sold.",
                          )}
                        </div>
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('wageCostP')}
                            onChange={handleWageCostPChange}
                            type="number"
                            name="wageCostP"
                            id="wageCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.wageCostP && formik.touched.wageCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'wageCostP',
                              title: formDataTitle.FORM7_4,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteWageCost.toLocaleString()}
                      </div>
                    </div>
                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>{t('3. Marketing')}</div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('markCostP')}
                            onChange={handleMarkCostPChange}
                            type="number"
                            name="markCostP"
                            id="markCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.markCostP && formik.touched.markCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'markCostP',
                              title: formDataTitle.FORM7_5,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteMarkCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>{t('4. Rent')}</div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('rentCostP')}
                            onChange={handleRentCostPChange}
                            type="number"
                            name="rentCostP"
                            id="rentCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.rentCostP && formik.touched.rentCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'rentCostP',
                              title: formDataTitle.FORM7_6,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteRentCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>
                        {t('5. General & Administrative')}
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('genCostP')}
                            onChange={handleGenCostPChange}
                            type="number"
                            name="genCostP"
                            id="genCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.genCostP && formik.touched.genCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'genCostP',
                              title: formDataTitle.FORM7_7,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteGenCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={`${styles.label_xs} labelContainer`}>
                        <div>{t('6. Depreciation')}</div>
                        <div className="ml-1">
                          <AiFillQuestionCircle size={20} />
                        </div>
                        <div className="textBubble">
                          {t(
                            'depreciation represents the decrease in value of an asset due to wear and tear or age. For example, a $50,000 truck with a 10-year life has a $5,000 annual depreciation expense. Thus, the more physical assets a business have, the more the depreciation cost.',
                          )}
                        </div>
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('depreCostP')}
                            onChange={handleDepreCostPChange}
                            type="number"
                            name="depreCostP"
                            id="depreCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.depreCostP && formik.touched.depreCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'depreCostP',
                              title: formDataTitle.FORM7_8,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol}{' '}
                        {absoluteDepreCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>{t('7. Utilities')}</div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('utilCostP')}
                            onChange={handleUtilCostPChange}
                            type="number"
                            name="util"
                            id="util"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.utilCostP && formik.touched.utilCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'utilCostP',
                              title: formDataTitle.FORM7_9,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteUtilCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>
                        {t('8. Other Expenses')}
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('otherCostP')}
                            onChange={handleOtherCostPChange}
                            type="number"
                            name="otherCostP"
                            id="otherCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.otherCostP && formik.touched.otherCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'otherCostP',
                              title: formDataTitle.FORM7_10,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol}{' '}
                        {absoluteOtherCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>9. Interest Expense</div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('intCostP')}
                            onChange={handleIntCostPChange}
                            type="number"
                            name="intCostP"
                            id="intCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.intCostP && formik.touched.intCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'intCostP',
                              title: formDataTitle.FORM7_11,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteIntCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>
                        10. Income Taxes{' '}
                        <span className="text-sm">(from EBT)</span>
                      </div>

                      <div className="">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            %
                          </div>
                          <Input
                            {...formik.getFieldProps('taxCostP')}
                            onChange={handleTaxCostPChange}
                            type="number"
                            name="taxCostP"
                            id="taxCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.taxCostP && formik.touched.taxCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="page_7_finance"
                            saveUserData={{
                              id: 'taxCostP',
                              title: formDataTitle.FORM7_12,
                              isCurrency: true,
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        {planCurrencySymbol} {absoluteTaxCost.toLocaleString()}
                      </div>
                    </div>
                    <hr />
                    <div className={styles.label}>
                      {t('Your First Year Total Cost is:')}{' '}
                      <span className="font-bold">
                        <br />
                        {planCurrencySymbol}{' '}
                        {absoluteTotalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.label}>
                      {t('Your First Year Net Profit is:')}
                      <span className="font-bold">
                        <br /> {planCurrencySymbol}{' '}
                        {absoluteNetProfit.toLocaleString()}{' '}
                      </span>
                    </div>
                    <div className={`mb-3 ${styles.label}`}>
                      {t('Your Net Profit Margin is:')}
                      <span className="font-bold">
                        <br />% {absoluteNetProfitMargin}{' '}
                      </span>
                    </div>

                    <hr className="w-full" />

                    <div className="flex flex-col gap-5 justify-center items-center mt-10 ml-auto mr-auto">
                      {(formik.errors.firstYearRevenue &&
                        formik.touched.firstYearRevenue) ||
                      (formik.errors.revenueGrowthRate &&
                        formik.touched.revenueGrowthRate) ||
                      (formik.errors.COGSP && formik.touched.COGSP) ||
                      (formik.errors.wageCostP && formik.touched.wageCostP) ||
                      (formik.errors.markCostP && formik.touched.markCostP) ||
                      (formik.errors.rentCostP && formik.touched.rentCostP) ||
                      (formik.errors.genCostP && formik.touched.genCostP) ||
                      (formik.errors.depreCostP && formik.touched.depreCostP) ||
                      (formik.errors.utilCostP && formik.touched.utilCostP) ||
                      (formik.errors.otherCostP && formik.touched.otherCostP) ||
                      (formik.errors.intCostP && formik.touched.intCostP) ||
                      (formik.errors.taxCostP && formik.touched.taxCostP) ? (
                        <span className="text-rose-400">
                          {t('Please check your inputs')}
                        </span>
                      ) : (
                        <></>
                      )}
                      {/* select language */}

                      <div className="flex gap-5 mb-5 justify-center relative">
                        <div>{t('Select plan language (required)')}</div>

                        <div className="">
                          <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-800"
                            type="button"
                            onClick={toggleDropdown}
                          >
                            {selectedTextLanguage}
                            <svg
                              className="w-2.5 h-2.5 ml-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>

                          <div
                            className={`relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-opacity duration-300 ${isOpen ? 'opacity-100 visibility-visible pointer-events-auto' : 'opacity-0 visibility-hidden pointer-events-none'}`}
                          >
                            {isOpen && (
                              <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('English (US)')
                                  }
                                >
                                  English (US)
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('English (UK)')
                                  }
                                >
                                  English (UK)
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('German')
                                  }
                                >
                                  German
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('French')
                                  }
                                >
                                  French
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Spanish')
                                  }
                                >
                                  Spanish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Italian')
                                  }
                                >
                                  Italian
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Dutch')
                                  }
                                >
                                  Dutch
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Japanese')
                                  }
                                >
                                  Japanese
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Arabic')
                                  }
                                >
                                  Arabic
                                </div>

                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Swedish')
                                  }
                                >
                                  Swedish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Finnish')
                                  }
                                >
                                  Finnish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Norwegian')
                                  }
                                >
                                  Norwegian
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('Danish')
                                  }
                                >
                                  Danish
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {planLanguageError ? (
                        <span className="text-rose-400">
                          {t('Please select plan language')}
                        </span>
                      ) : (
                        <></>
                      )}
                      <div className="flex gap-5 justify-center mt-10">
                        <button
                          type="button"
                          onClick={handleBackButton}
                          className="button back-button white w-button"
                        >
                          {t('Back')}
                        </button>
                        <button
                          type="submit"
                          className="button-2 w-button"
                          onClick={() => {
                            trackEvent({
                              event_name: 'page_7_next_button',
                              is_clean_case: isCleanCase,
                            });
                          }}
                        >
                          {t('Next')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
