import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step7FinanceValidate from '../../utils/Step7FinanceValidate';
import styles from '../../styles/Wizard.module.css';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { event } from 'nextjs-google-analytics';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import trackEvent from '../../utils/trackEvent';
import Input from '../../components/input';
import { API_KEY_HEADER } from '../api/constants';
import { formDataTitle } from '../../constants/formTitle';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '../../components/navbar';
import { useLoadFormData } from '../../hooks/useLoadFormData';
import { ROUTE_PATH } from '../../constants/path';
import { MoonLoader } from 'react-spinners';
import useBeforeUnload from '../../hooks/useBeforeUnload';

const mapPlanLanguage = {
  en: 'English (US)',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  'en-uk': 'English (UK)',
  nl: 'Dutch',
  ja: 'Japanese',
  ar: 'Arabic',
  sv: 'Swedish',
  fi: 'Finnish',
  no: 'Norwegian',
  da: 'Danish',
};

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

export default function Fincance({ fbPixelId, secretKey }) {
  const { t } = useTranslation('Step7Finance');
  const { t: tValidate } = useTranslation('validate');
  const { data: session } = useSession();
  const router = useRouter();
  const { planCurrencySymbol = '' } = useLoadFormData();

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
  const [planLanguageError, setPlanLanguageError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextLanguage, setSelectedTextLanguage] = useState('Language');

  useBeforeUnload()

  useEffect(() => {
    router.prefetch(ROUTE_PATH.generateResult);
  }, [router]);

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);
    if (!values.planLanguage) {
      setPlanLanguageError(true);
      return;
    }
    router.push(ROUTE_PATH.generateResult);
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      firstYearRevenue: 0,
      revenueGrowthRate: 0,

      COGSP: 0.4 * 100,
      wageCostP: 0.06 * 100,
      markCostP: 0.05 * 100,
      rentCostP: 0,
      genCostP: 0.01 * 100,
      depreCostP: 0.02 * 100,
      utilCostP: 0,
      otherCostP: 0.01 * 100,
      intCostP: 0,
      taxCostP: 0.2 * 100,

      planLanguage: '',
    },
    validate: (values) => Step7FinanceValidate(values, tValidate),
    onSubmit,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const formData = JSON.parse(localStorage.getItem('formData')) || {};

    if (formData[formDataTitle.FORM7_1]) {
      formik.setFieldValue(
        'firstYearRevenue',
        formData[formDataTitle.FORM7_1].value,
      );
    }
    if (formData[formDataTitle.FORM7_2]) {
      formik.setFieldValue(
        'revenueGrowthRate',
        parseFloat(formData[formDataTitle.FORM7_2].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_3]) {
      formik.setFieldValue(
        'COGSP',
        parseFloat(formData[formDataTitle.FORM7_3].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_4]) {
      formik.setFieldValue(
        'wageCostP',
        parseFloat(formData[formDataTitle.FORM7_4].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_5]) {
      formik.setFieldValue(
        'markCostP',
        parseFloat(formData[formDataTitle.FORM7_5].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_6]) {
      formik.setFieldValue(
        'rentCostP',
        parseFloat(formData[formDataTitle.FORM7_6].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_7]) {
      formik.setFieldValue(
        'genCostP',
        parseFloat(formData[formDataTitle.FORM7_7].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_8]) {
      formik.setFieldValue(
        'depreCostP',
        parseFloat(formData[formDataTitle.FORM7_8].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_9]) {
      formik.setFieldValue(
        'utilCostP',
        parseFloat(formData[formDataTitle.FORM7_9].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_10]) {
      formik.setFieldValue(
        'otherCostP',
        parseFloat(formData[formDataTitle.FORM7_10].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_11]) {
      formik.setFieldValue(
        'intCostP',
        parseFloat(formData[formDataTitle.FORM7_11].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_12]) {
      formik.setFieldValue(
        'taxCostP',
        parseFloat(formData[formDataTitle.FORM7_12].value) * 100,
      );
    }
    if (formData[formDataTitle.FORM7_13]) {
      const value = formData[formDataTitle.FORM7_13].value;
      setSelectedTextLanguage(mapPlanLanguage[value]);
      formik.setFieldValue('planLanguage', value);
    }
  }, []);

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

  const formatedCurrency = (value: number = 0) => {
    if (!value) return '';
    return new Intl.NumberFormat().format(value);
  };
  const handleRevenueChange = (e) => {
    const numericValue = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    formik.setFieldValue('firstYearRevenue', numericValue);
  };
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_7_back_button',
      is_clean_case: isCleanCase,
    });
    router.push(ROUTE_PATH.investmentItems);
  };

  const handleRevenueGrowthRateChange = (e) => {
    formik.setFieldValue('revenueGrowthRate', e.target.value);
  };

  const handleCOGSPChange = (e) => {
    formik.setFieldValue('COGSP', e.target.value);
  };
  const handleWageCostPChange = (e) => {
    formik.setFieldValue('wageCostP', e.target.value);
  };
  const handleMarkCostPChange = (e) => {
    formik.setFieldValue('markCostP', e.target.value);
  };
  const handleRentCostPChange = (e) => {
    formik.setFieldValue('rentCostP', e.target.value);
  };
  const handleGenCostPChange = (e) => {
    formik.setFieldValue('genCostP', e.target.value);
  };
  const handleDepreCostPChange = (e) => {
    formik.setFieldValue('depreCostP', e.target.value);
  };
  const handleUtilCostPChange = (e) => {
    formik.setFieldValue('utilCostP', e.target.value);
  };
  const handleOtherCostPChange = (e) => {
    formik.setFieldValue('otherCostP', e.target.value);
  };
  const handleIntCostPChange = (e) => {
    formik.setFieldValue('intCostP', e.target.value);
  };
  const handleTaxCostPChange = (e) => {
    formik.setFieldValue('taxCostP', e.target.value);
  };

  useEffect(() => {
    if (!session) {
      event('Step6Finance_component_view', {
        category: 'Component View',
        label: 'Step6Finance Component View',
      });
      return; // Don't run the effect if there is no session
    }

    let interval = null;
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

  const toggleDropdown = () => {
    trackEvent({
      event_name: 'page_7_language_button',
      is_clean_case: isCleanCase,
    });
    setIsOpen(!isOpen);
  };

  const handleItemClickLanguage = (text) => {
    setSelectedTextLanguage(mapPlanLanguage[text]);
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    formData[formDataTitle.FORM7_13] = {
      id: 'dropdownDefaultButton',
      value: text,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    formik.setFieldValue('planLanguage', text);

    setIsOpen(false);
  };

  return (
    <>
      <Navbar fbPixelId={fbPixelId} />
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
                          value={formatedCurrency(
                            formik.values.firstYearRevenue,
                          )}
                          onChange={handleRevenueChange}
                          type="text"
                          name="firstYearRevenue"
                          id="firstYearRevenue"
                          className={`${planCurrencySymbol?.length > 1 ? styles.padl12 : styles.padl} ${styles.cash_input}  ${formik.errors.firstYearRevenue && formik.touched.firstYearRevenue ? 'border-rose-400' : 'border-gray-300'} `}
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
                          onWheel={(e) => e.currentTarget.blur()}
                          page="page_7_finance"
                          saveUserData={{
                            id: 'revenueGrowthRate',
                            title: formDataTitle.FORM7_2,
                            isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                              isPercent: true,
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
                        <br />%{' '}
                        {!isNaN(absoluteNetProfitMargin)
                          ? absoluteNetProfitMargin
                          : 0}{' '}
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
                                  onClick={() => handleItemClickLanguage('en')}
                                >
                                  English (US)
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() =>
                                    handleItemClickLanguage('en-uk')
                                  }
                                >
                                  English (UK)
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('de')}
                                >
                                  German
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('fr')}
                                >
                                  French
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('es')}
                                >
                                  Spanish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('it')}
                                >
                                  Italian
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('nl')}
                                >
                                  Dutch
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('ja')}
                                >
                                  Japanese
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('ar')}
                                >
                                  Arabic
                                </div>

                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('sv')}
                                >
                                  Swedish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('fi')}
                                >
                                  Finnish
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('no')}
                                >
                                  Norwegian
                                </div>
                                <div
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  onClick={() => handleItemClickLanguage('da')}
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
                          className={`button back-button w-[110px] white w-button`}
                        >
                          {t('Back')}
                        </button>
                        <button
                          type="submit"
                          className={`button-2 w-[110px] w-button m-auto`}
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

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['Step7Finance', 'validate'])),
      secretKey,
      fbPixelId,
      // Will be passed to the page component as props
    },
  };
}
