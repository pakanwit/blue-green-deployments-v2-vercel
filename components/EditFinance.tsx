import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step7FinanceValidate from '../utils/Step7FinanceValidate';
import styles from '../styles/Wizard.module.css';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import trackEvent from '../utils/trackEvent';
import Input from './input';

export default function EditFinance({
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
  setFirstYearRevenue,
  setRevenueGrowthRate,

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
  firstYearRevenue,
  revenueGrowthRate,

  setIsEdittingFinance,

  initialInvestmentAmount,
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

  setEdittedFinance,
  setShowTopContent,

  planIdNum,
  secretKey,
}) {
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
    setEdittedFinance(true);
    setShowTopContent(false);
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
  }

  const { t: tv } = useTranslation('validate');
  const { t } = useTranslation('EditFinance');

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);
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

    setIsEdittingFinance(false);
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
    },
    validate: (values) => Step7FinanceValidate(values, tv),
    onSubmit,
  });

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

  const [formattedFirstYearRevenue, setFormattedFirstYearRevenue] =
    useState('');

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

  const { data: session } = useSession();

  async function saveUserInputFinanceToDB() {
    console.log('saveContentToDB() called');
    try {
      const response = await fetch('/api/saveEditFinance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
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
          firstYearRevenue,
          revenueGrowthRate,

          email: session.user.email,
          planIdNum,
        }),
      });

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

  function doneEditingFinance() {
    setIsEdittingFinance(false);
    setShowTopContent(true);
    saveUserInputFinanceToDB();
    trackEvent({
      event_name: 'edit_finance_done_button',
    });
  }

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
                <h4 className="">{t('Enter Financial Details')}</h4>
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
                          $
                        </div>
                        <Input
                          {...formik.getFieldProps('firstYearRevenue')}
                          value={formattedFirstYearRevenue}
                          onChange={handleRevenueChange}
                          type="text"
                          name="firstYearRevenue"
                          id="firstYearRevenue"
                          className={`padl ${styles.cash_input}  ${formik.errors.firstYearRevenue && formik.touched.firstYearRevenue ? 'border-rose-400' : 'border-gray-300'} `}
                          page="edit_finance"
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
                          page="edit_finance"
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteCOGSCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteWageCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteMarkCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteRentCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteGenCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteDepreCost.toLocaleString()}
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
                            name="utilCostP"
                            id="utilCostP"
                            className={` ${styles.padl} ${styles.grid_cash}  ${formik.errors.utilCostP && formik.touched.utilCostP ? 'border-rose-400' : 'border-gray-300'} `}
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteUtilCost.toLocaleString()}
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteOtherCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>
                        {t('9. Interest Expense')}
                      </div>

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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteIntCost.toLocaleString()}
                      </div>
                    </div>

                    {/*  line -----------------------------------*/}
                    <div className={`${styles.grid2} ${styles.lower_height}`}>
                      <div className={styles.label_xs}>
                        {t('10. Income Taxes')}{' '}
                        <span className="text-sm">{t('(from EBT)')}</span>
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
                            page="edit_finance"
                          />
                        </div>
                      </div>

                      <div className={styles.label_sm}>
                        $ {absoluteTaxCost.toLocaleString()}
                      </div>
                    </div>
                    <hr />
                    <div className={styles.label}>
                      {t('Your First Year Total Cost is:')}{' '}
                      <span className="font-bold">
                        <br />$ {absoluteTotalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.label}>
                      {t('Your First Year Net Profit is:')}
                      <span className="font-bold">
                        <br /> $ {absoluteNetProfit.toLocaleString()}{' '}
                      </span>
                    </div>
                    <div className={`mb-10 ${styles.label}`}>
                      {t('Your Net Profit Margin is:')}{' '}
                      <span className="font-bold">
                        <br />% {absoluteNetProfitMargin}{' '}
                      </span>
                    </div>

                    <div className="flex gap-5 justify-center">
                      <button
                        type="submit"
                        className="button back-button white w-button"
                        onClick={doneEditingFinance}
                      >
                        {t('Done')}
                      </button>
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
