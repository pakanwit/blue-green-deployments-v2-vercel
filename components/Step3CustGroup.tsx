import { useRef, useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step3CustGroupValidate from '../utils/Step3CustGroupValidate';
import styles from '../styles/Wizard.module.css';
import React from 'react';
import { event } from 'nextjs-google-analytics';
import { AiOutlineUndo } from 'react-icons/ai';
import { MoonLoader } from 'react-spinners';
import FadeAnimation from './animations/fadeAnimation';
import { useTranslation } from 'react-i18next';
import trackEvent from '../utils/trackEvent';
import Input from './input';
import { API_KEY_HEADER } from '../pages/api/constants';
import { formDataTitle } from '../constants/formTitle';
import { useSession } from 'next-auth/react';

export default function Step3CustGroup({
  customerIncome1,
  customerIncome2,
  customerIncome3,

  customerDescription1,
  customerDescription2,
  customerDescription3,

  setCustomerIncome1,
  setCustomerIncome2,
  setCustomerIncome3,

  setCustomerDescription1,
  setCustomerDescription2,
  setCustomerDescription3,

  selectedRadioStep3_1,
  selectedRadioStep3_2,
  selectedRadioStep3_3,

  setSelectedRadioStep3_1,
  setSelectedRadioStep3_2,
  setSelectedRadioStep3_3,

  handleNext,
  handleBack,

  businessName,
  businessType,
  NEmployee,
  location,
  productOrService,
  salesChannel,
  secretKey,
}) {
  const { t } = useTranslation('Step3CustGroup');
  const { t: tValidate } = useTranslation('validate');
  const { data: session } = useSession();

  const [radioError1, setRadioError1] = useState('');
  const [radioError2, setRadioError2] = useState('');
  const [radioError3, setRadioError3] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
    selectedRadioStep3_1 &&
      document.getElementById(selectedRadioStep3_1).click();
    selectedRadioStep3_2 &&
      document.getElementById(selectedRadioStep3_2).click();
    selectedRadioStep3_3 &&
      document.getElementById(selectedRadioStep3_3).click();
  }, []);

  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_3_back_button',
      is_clean_case: isCleanCase,
    });
    handleBack();
  };
  const handleRadioIncome1 = (e) => {
    setCustomerIncome1(e.target.value);
    setSelectedRadioStep3_1(e.target.id);
  };
  const handleRadioIncome2 = (e) => {
    setCustomerIncome2(e.target.value);
    setSelectedRadioStep3_2(e.target.id);
  };
  const handleRadioIncome3 = (e) => {
    setCustomerIncome3(e.target.value);
    setSelectedRadioStep3_3(e.target.id);
  };

  const handleDivClickIncome1 = (value, inputId) => {
    setCustomerIncome1(value);
    document.getElementById(inputId).click();
    customerIncome1 && setRadioError1('');
  };
  const handleDivClickIncome2 = (value, inputId) => {
    setCustomerIncome2(value);
    document.getElementById(inputId).click();
    customerIncome2 && setRadioError2('');
  };
  const handleDivClickIncome3 = (value, inputId) => {
    setCustomerIncome3(value);
    document.getElementById(inputId).click();
    customerIncome3 && setRadioError3('');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  interface FormValues {
    customerDescription1: string;
    customerDescription2: string;
    customerDescription3: string;
  }

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setIsSubmitting(true);

    setCustomerDescription1(formik.values.customerDescription1);
    setCustomerDescription2(formik.values.customerDescription2);
    setCustomerDescription3(formik.values.customerDescription3);

    if (!customerIncome1) {
      setRadioError1('Please Select One');
      return;
    }

    handleNext();
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      customerDescription1: customerDescription1,
      customerDescription2: customerDescription2,
      customerDescription3: customerDescription3,
    },
    validate: (values) => Step3CustGroupValidate(values, tValidate),
    onSubmit,
  });
  const isCleanCase = Object.keys(formik.errors).length === 0;
  const baseClasses =
    'flex mb-3 items-center px-5 pl-4 border rounded-xl dark:border-gray-700';
  const selectedClasses =
    'border-sky-300 border-2 transition-colors transition-width transition';
  const deselectedClasses =
    'border-gray-200 border-opacity-50 transition-colors transition-width transition';

  const getDivClassesRadio1 = (inputId) => {
    return `${baseClasses} ${selectedRadioStep3_1 === inputId ? selectedClasses : deselectedClasses}`;
  };
  const getDivClassesRadio2 = (inputId) => {
    return `${baseClasses} ${selectedRadioStep3_2 === inputId ? selectedClasses : deselectedClasses}`;
  };
  const getDivClassesRadio3 = (inputId) => {
    return `${baseClasses} ${selectedRadioStep3_3 === inputId ? selectedClasses : deselectedClasses}`;
  };

  const radio1_1 = 'radio1_1';
  const radio1_2 = 'radio1_2';
  const radio1_3 = 'radio1_3';
  const radio2_1 = 'radio2_1';
  const radio2_2 = 'radio2_2';
  const radio2_3 = 'radio2_3';
  const radio3_1 = 'radio3_1';
  const radio3_2 = 'radio3_2';
  const radio3_3 = 'radio3_3';

  const [customerDescription1Clicked, setCustomerDescription1Clicked] =
    useState(false);
  const [customerDescription2Clicked, setCustomerDescription2Clicked] =
    useState(false);
  const [customerDescription3Clicked, setCustomerDescription3Clicked] =
    useState(false);

  const [
    customerDescription1ShowSuggestion,
    setCustomerDescription1ShowSuggestion,
  ] = useState(false);
  const [
    customerDescription2ShowSuggestion,
    setCustomerDescription2ShowSuggestion,
  ] = useState(false);
  const [
    customerDescription3ShowSuggestion,
    setCustomerDescription3ShowSuggestion,
  ] = useState(false);

  const handleInputChangeCustomerDescription1 = (event) => {
    setCustomerDescription1Clicked(true);
    setCustomerDescription1ShowSuggestion(true);
    setCustomerDescription1(event.target.value);
    formik.handleChange(event);
  };

  const handleInputChangeCustomerDescription2 = (event) => {
    setCustomerDescription2Clicked(true);
    setCustomerDescription2ShowSuggestion(true);
    setCustomerDescription2(event.target.value);
    formik.handleChange(event);
  };

  const handleInputChangeCustomerDescription3 = (event) => {
    setCustomerDescription3Clicked(true);
    setCustomerDescription3ShowSuggestion(true);
    setCustomerDescription3(event.target.value);
    formik.handleChange(event);
  };

  useEffect(() => {
    if (!session) {
      event('Step3CustGroup_component_view', {
        category: 'Component View',
        label: 'Step3CustGroup Component View',
      });
    }
  }, [session]);

  const [suggestionsCustomerDescription1, setSuggestionsCustomerDescription1] =
    useState([]);
  const [suggestionsCustomerDescription2, setSuggestionsCustomerDescription2] =
    useState([]);
  const [suggestionsCustomerDescription3, setSuggestionsCustomerDescription3] =
    useState([]);
  const [suggestionLoading1, setSuggestionLoading1] = useState(false);
  const [suggestionLoading2, setSuggestionLoading2] = useState(false);
  const [suggestionLoading3, setSuggestionLoading3] = useState(false);
  const [suggestionError1, setSuggestionError1] = useState(false);
  const [suggestionError2, setSuggestionError2] = useState(false);
  const [suggestionError3, setSuggestionError3] = useState(false);

  const callCounter = useRef(0);
  const callTimeout = useRef(null);
  const pendingExecution = useRef(null);

  const { i18n } = useTranslation();
  const locale = i18n.language;

  async function getSuggestionCustomerDescription(id, retryCount = 0) {
    const variantID =
      typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';

    callCounter.current += 1;

    if (callCounter.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounter.current = 0;

      // Clear global timeout if it exists
      if (callTimeout.current) {
        clearTimeout(callTimeout.current);
        callTimeout.current = null;
      }

      // Cancel pending execution
      if (pendingExecution.current) {
        clearTimeout(pendingExecution.current);
        pendingExecution.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeout.current) {
      callTimeout.current = setTimeout(() => {
        callCounter.current = 0;
        callTimeout.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecution.current = setTimeout(async () => {
      try {
        if (id === '1') {
          setSuggestionError1(false);
          setSuggestionLoading1(true);
        } else if (id === '2') {
          setSuggestionError2(false);
          setSuggestionLoading2(true);
        } else if (id === '3') {
          setSuggestionError3(false);
          setSuggestionLoading3(true);
        }

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep3SuggestionsCustomerDescription',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              [API_KEY_HEADER]: secretKey,
            },
            body: JSON.stringify({
              businessName,
              businessType,
              NEmployee,
              location,
              productOrService,
              salesChannel,

              customerDescription1,
              customerDescription2,
              customerDescription3,
              customerIncome1,
              customerIncome2,
              customerIncome3,

              locale,
              variantID,
            }),
          },
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 7000),
        );

        const result = await Promise.race([responsePromise, timeoutPromise]);

        if (!(result instanceof Response)) {
          throw new Error('Request timed out');
        }

        const response = result;
        const customerGroupNamesArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', customerGroupNamesArr);

          // Check for non-alphanumeric characters
          const hasNonAlphanumeric = customerGroupNamesArr.some((name) =>
            /[^a-z0-9\s-'&]/i.test(name),
          );
          if (hasNonAlphanumeric) {
            // Retry if we have not already retried too many times
            if (retryCount < 5) {
              // adjust the retry limit as needed
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionCustomerDescription(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }

          if (id === '1') {
            setSuggestionsCustomerDescription1(customerGroupNamesArr);
            setSuggestionLoading1(false);
          } else if (id === '2') {
            setSuggestionsCustomerDescription2(customerGroupNamesArr);
            setSuggestionLoading2(false);
          } else if (id === '3') {
            setSuggestionsCustomerDescription3(customerGroupNamesArr);
            setSuggestionLoading3(false);
          }
        } else {
          console.log('Error fetching suggestions', customerGroupNamesArr);

          if (id === '1') {
            setSuggestionError1(true);
          } else if (id === '2') {
            setSuggestionError2(true);
          } else if (id === '3') {
            setSuggestionError3(true);
          }
        }
      } catch (error) {
        console.error(error);

        if (id === '1') {
          setSuggestionError1(true);
        } else if (id === '2') {
          setSuggestionError2(true);
        } else if (id === '3') {
          setSuggestionError3(true);
        }
      }

      pendingExecution.current = null;
    }, 50);
  }

  useEffect(() => {
    console.log('suggestionError1', suggestionError1);
    console.log('suggestionError2', suggestionError2);
    console.log('suggestionError3', suggestionError3);
  }, [suggestionError1, suggestionError2, suggestionError3]);

  const handleSuggestionClickCustomerDescription1 = (suggestion) => {
    trackEvent({
      event_name: 'page_3_suggestions',
      related_field_id: 'customerDescription1',
      value: suggestion,
    });
    formik.setFieldValue('customerDescription1', suggestion, true);
    setCustomerDescription1(suggestion);
  };
  const handleSuggestionClickCustomerDescription2 = (suggestion) => {
    trackEvent({
      event_name: 'page_3_suggestions',
      related_field_id: 'customerDescription2',
      value: suggestion,
    });
    formik.setFieldValue('customerDescription2', suggestion, true);
    setCustomerDescription2(suggestion);
  };
  const handleSuggestionClickCustomerDescription3 = (suggestion) => {
    trackEvent({
      event_name: 'page_3_suggestions',
      related_field_id: 'customerDescription3',
      value: suggestion,
    });
    formik.setFieldValue('customerDescription3', suggestion, true);
    setCustomerDescription3(suggestion);
  };

  const [getSuggestions1, setGetSuggestions1] = useState(false);
  const [getSuggestions2, setGetSuggestions2] = useState(false);
  const [getSuggestions3, setGetSuggestions3] = useState(false);

  //console log suggestionsCustomerDescription1, 2, 3
  useEffect(() => {
    console.log(
      'suggestionsCustomerDescription1',
      suggestionsCustomerDescription1,
    );
    console.log(
      'suggestionsCustomerDescription2',
      suggestionsCustomerDescription2,
    );
    console.log(
      'suggestionsCustomerDescription3',
      suggestionsCustomerDescription3,
    );
  }, [
    suggestionsCustomerDescription1,
    suggestionsCustomerDescription2,
    suggestionsCustomerDescription3,
  ]);

  // get suggestion code--------------------------------------------------

  // make it so hook doesn't run again after subsequent clicks
  const [
    customerDescription1AlreadyClicked,
    setCustomerDescription1AlreadyClicked,
  ] = useState(false);
  const [
    customerDescription2AlreadyClicked,
    setCustomerDescription2AlreadyClicked,
  ] = useState(false);
  const [
    customerDescription3AlreadyClicked,
    setCustomerDescription3AlreadyClicked,
  ] = useState(false);

  useEffect(() => {
    if (
      customerDescription1Clicked &&
      !customerDescription1AlreadyClicked &&
      !formik.isSubmitting
    ) {
      console.log('running getSuggestionCustomerDescription1');
      getSuggestionCustomerDescription('1');
      setCustomerDescription1Clicked(false);
      setCustomerDescription1AlreadyClicked(true);
    }
    if (
      customerDescription2Clicked &&
      !customerDescription2AlreadyClicked &&
      !formik.isSubmitting
    ) {
      console.log('running getSuggestionCustomerDescription2');
      getSuggestionCustomerDescription('2');
      setCustomerDescription2Clicked(false);
      setCustomerDescription2AlreadyClicked(true);
    }
    if (
      customerDescription3Clicked &&
      !customerDescription3AlreadyClicked &&
      !formik.isSubmitting
    ) {
      console.log('running getSuggestionCustomerDescription3');
      getSuggestionCustomerDescription('3');
      setCustomerDescription3Clicked(false);
      setCustomerDescription3AlreadyClicked(true);
    }
  }, [
    customerDescription1Clicked,
    customerDescription2Clicked,
    customerDescription3Clicked,
    formik.isSubmitting,
  ]);

  //log formik.errors
  useEffect(() => {
    if (formik.errors) {
      console.log('is formik.errors', formik.errors);
    } else if (!formik.errors) {
      console.log('no formik.errors', formik.errors);
    }
  }, [formik.errors]);

  function handldFocusCustomerDescription1(event) {
    handleInputChangeCustomerDescription1(event);
    formik.setFieldTouched('customerDescription1', true, false);
  }
  function handldFocusCustomerDescription2(event) {
    handleInputChangeCustomerDescription2(event);
    formik.setFieldTouched('customerDescription2', true, false);
  }
  function handldFocusCustomerDescription3(event) {
    handleInputChangeCustomerDescription3(event);
    formik.setFieldTouched('customerDescription3', true, false);
  }

  return (
    <>
      <motion.div
        key="component-three"
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
                  {t('STEP 3 OF 7')}
                </div>
                <h4 className="">{t('Enter Customer Group Details')}</h4>
                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <h5>
                      {t('Customer Group 1')}{' '}
                      <span className="text-lg">{t('(required)')}</span>
                    </h5>
                    <hr className="mb-3" />
                    <div className="mb-3">
                      <label
                        htmlFor="customerDescription1"
                        className={styles.label}
                      >
                        {t('Customer Group 1 Description')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('customerDescription1')}
                        type="text"
                        name="customerDescription1"
                        id="customerDescription1"
                        className={`${styles.text_input} ${formik.errors.customerDescription1 && formik.touched.customerDescription1 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder=""
                        onChange={handleInputChangeCustomerDescription1}
                        onFocus={handldFocusCustomerDescription1}
                        onBlur={() =>
                          formik.validateField('customerDescription1')
                        }
                        page="page_3_customer_group"
                        saveUserData={{
                          id: 'customerDescription1',
                          title: formDataTitle.FORM3_1,
                        }}
                      />
                      {formik.errors.customerDescription1 &&
                      formik.touched.customerDescription1 ? (
                        <span className="text-rose-400">
                          {
                            formik.errors
                              .customerDescription1 as React.ReactNode
                          }
                        </span>
                      ) : (
                        <></>
                      )}
                      {customerDescription1ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoading1 && !suggestionError1 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription1(
                                      suggestionsCustomerDescription1[0],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription1[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription1(
                                      suggestionsCustomerDescription1[1],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription1[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription1(
                                      suggestionsCustomerDescription1[2],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription1[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription1(
                                      suggestionsCustomerDescription1[3],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription1[3]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoading1 && !suggestionError1 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionError1 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionCustomerDescription('1')
                                }
                              >
                                <AiOutlineUndo size={20} />{' '}
                                <div
                                  className="font-normal"
                                  onClick={() => {
                                    trackEvent({
                                      event_name:
                                        'page_3_regenerate_suggestions',
                                      related_field_id: '',
                                    });
                                  }}
                                >
                                  {t('Regenerate Suggestions')}
                                </div>
                              </button>
                            </div>
                          </div>
                        </FadeAnimation>
                      ) : (
                        <></>
                      )}
                    </div>

                    <label className={styles.label}>
                      {t('Customer Group 1 Income Level')}{' '}
                      <span className="text-sm">{t('(required)')}</span>
                    </label>
                    <fieldset>
                      <legend className="sr-only">{t('Income Level')}</legend>

                      <div
                        className={getDivClassesRadio1(radio1_1)}
                        onClick={(e) => {
                          handleDivClickIncome1('low-income', radio1_1);
                        }}
                      >
                        <Input
                          id={radio1_1}
                          type="radio"
                          value="low-income"
                          name="income1"
                          className={styles.radio_input}
                          onChange={handleRadioIncome1}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio1_1,
                            title: formDataTitle.FORM3_2,
                          }}
                        />
                        <label
                          htmlFor={radio1_1}
                          className={styles.radio_label}
                        >
                          {t('Low-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio1(radio1_2)}
                        onClick={(e) => {
                          handleDivClickIncome1('medium-income', radio1_2);
                        }}
                      >
                        <Input
                          id={radio1_2}
                          type="radio"
                          value="medium-income"
                          name="income1"
                          className={styles.radio_input}
                          onChange={handleRadioIncome1}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio1_2,
                            title: formDataTitle.FORM3_2,
                          }}
                        />
                        <label
                          htmlFor={radio1_2}
                          className={styles.radio_label}
                        >
                          {t('Medium-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio1(radio1_3)}
                        onClick={(e) => {
                          handleDivClickIncome1('high-income', radio1_3);
                        }}
                      >
                        <Input
                          id={radio1_3}
                          type="radio"
                          value="high-income"
                          name="income1"
                          className={styles.radio_input}
                          onChange={handleRadioIncome1}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio1_3,
                            title: formDataTitle.FORM3_2,
                          }}
                        />
                        <label
                          htmlFor={radio1_3}
                          className={styles.radio_label}
                        >
                          {t('High-income')}
                        </label>
                      </div>
                      {radioError1 && (
                        <span className="text-rose-400">{radioError1}</span>
                      )}
                    </fieldset>

                    <h5>
                      {t('Customer Group 2')}
                      <span className="text-lg">{t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />
                    <div className="mb-3">
                      <label
                        htmlFor="customerDescription2"
                        className={styles.label}
                      >
                        {t('Customer Group 2 Description')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('customerDescription2')}
                        type="text"
                        name="customerDescription2"
                        id="customerDescription2"
                        className={`${styles.text_input} ${formik.errors.customerDescription2 && formik.touched.customerDescription2 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder=""
                        onChange={handleInputChangeCustomerDescription2}
                        onFocus={handldFocusCustomerDescription2}
                        onBlur={() =>
                          formik.validateField('customerDescription2')
                        }
                        page="page_3_customer_group"
                        saveUserData={{
                          id: 'customerDescription2',
                          title: formDataTitle.FORM3_3,
                        }}
                      />
                      {formik.errors.customerDescription2 &&
                      formik.touched.customerDescription2 ? (
                        <span className="text-rose-400">
                          {
                            formik.errors
                              .customerDescription2 as React.ReactNode
                          }
                        </span>
                      ) : (
                        <></>
                      )}
                      {customerDescription2ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoading2 && !suggestionError2 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription2(
                                      suggestionsCustomerDescription2[0],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription2[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription2(
                                      suggestionsCustomerDescription2[1],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription2[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription2(
                                      suggestionsCustomerDescription2[2],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription2[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription2(
                                      suggestionsCustomerDescription2[3],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription2[3]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoading2 && !suggestionError2 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionError2 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionCustomerDescription('2')
                                }
                              >
                                <AiOutlineUndo size={20} />{' '}
                                <div className="font-normal">
                                  {t('Regenerate Suggestions')}
                                </div>
                              </button>
                            </div>
                          </div>
                        </FadeAnimation>
                      ) : (
                        <></>
                      )}
                    </div>

                    <label className={styles.label}>
                      {t('Customer Group 2 Income Level')}{' '}
                      <span className="text-sm">{t('(optional)')}</span>
                    </label>
                    <fieldset>
                      <legend className="sr-only">{t('Income Level')}</legend>

                      <div
                        className={getDivClassesRadio2(radio2_1)}
                        onClick={(e) => {
                          handleDivClickIncome2('low-income', radio2_1);
                        }}
                      >
                        <Input
                          id={radio2_1}
                          type="radio"
                          value="low-income"
                          name="income2"
                          className={styles.radio_input}
                          onChange={handleRadioIncome2}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio2_1,
                            title: formDataTitle.FORM3_4,
                          }}
                        />
                        <label
                          htmlFor={radio2_1}
                          className={styles.radio_label}
                        >
                          {t('Low-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio2(radio2_2)}
                        onClick={(e) => {
                          handleDivClickIncome2('medium-income', radio2_2);
                        }}
                      >
                        <Input
                          id={radio2_2}
                          type="radio"
                          value="medium-income"
                          name="income2"
                          className={styles.radio_input}
                          onChange={handleRadioIncome2}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio2_2,
                            title: formDataTitle.FORM3_4,
                          }}
                        />
                        <label
                          htmlFor={radio2_2}
                          className={styles.radio_label}
                        >
                          {t('Medium-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio2(radio2_3)}
                        onClick={(e) => {
                          handleDivClickIncome2('high-income', radio2_3);
                        }}
                      >
                        <Input
                          id={radio2_3}
                          type="radio"
                          value="high-income"
                          name="income2"
                          className={styles.radio_input}
                          onChange={handleRadioIncome2}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio2_3,
                            title: formDataTitle.FORM3_4,
                          }}
                        />
                        <label
                          htmlFor={radio2_3}
                          className={styles.radio_label}
                        >
                          {t('High-income')}
                        </label>
                      </div>
                      {radioError2 && (
                        <span className="text-rose-400">{radioError2}</span>
                      )}
                    </fieldset>

                    <h5>
                      {t('Customer Group 3')}
                      <span className="text-lg">{t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />
                    <div className="mb-3">
                      <label
                        htmlFor="customerDescription3"
                        className={styles.label}
                      >
                        {t('Customer Group 3 Description')}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('customerDescription3')}
                        type="text"
                        name="customerDescription3"
                        id="customerDescription3"
                        className={`${styles.text_input} ${formik.errors.customerDescription3 && formik.touched.customerDescription3 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder=""
                        onChange={handleInputChangeCustomerDescription3}
                        onFocus={handldFocusCustomerDescription3}
                        onBlur={() =>
                          formik.validateField('customerDescription3')
                        }
                        page="page_3_customer_group"
                        saveUserData={{
                          id: 'customerDescription3',
                          title: formDataTitle.FORM3_5,
                        }}
                      />
                      {formik.errors.customerDescription3 &&
                      formik.touched.customerDescription3 ? (
                        <span className="text-rose-400">
                          {
                            formik.errors
                              .customerDescription3 as React.ReactNode
                          }
                        </span>
                      ) : (
                        <></>
                      )}
                      {customerDescription3ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoading3 && !suggestionError3 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription3(
                                      suggestionsCustomerDescription3[0],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription3[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription3(
                                      suggestionsCustomerDescription3[1],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription3[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription3(
                                      suggestionsCustomerDescription3[2],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription3[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickCustomerDescription3(
                                      suggestionsCustomerDescription3[3],
                                    )
                                  }
                                >
                                  {suggestionsCustomerDescription3[3]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoading3 && !suggestionError3 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionError3 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionCustomerDescription('3')
                                }
                              >
                                <AiOutlineUndo size={20} />{' '}
                                <div className="font-normal">
                                  {t('Regenerate Suggestions')}
                                </div>
                              </button>
                            </div>
                          </div>
                        </FadeAnimation>
                      ) : (
                        <></>
                      )}
                    </div>

                    <label className={styles.label}>
                      {t('Customer Group 3 Income Level')}{' '}
                      <span className="text-sm">{t('(optional)')}</span>
                    </label>
                    <fieldset className="mb-10">
                      <legend className="sr-only">{t('Income Level')}</legend>

                      <div
                        className={getDivClassesRadio3(radio3_1)}
                        onClick={(e) => {
                          handleDivClickIncome3('low-income', radio3_1);
                        }}
                      >
                        <Input
                          id={radio3_1}
                          type="radio"
                          value="low-income"
                          name="income3"
                          className={styles.radio_input}
                          onChange={handleRadioIncome3}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio3_1,
                            title: formDataTitle.FORM3_6,
                          }}
                        />
                        <label
                          htmlFor={radio3_1}
                          className={styles.radio_label}
                        >
                          {t('Low-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio3(radio3_2)}
                        onClick={(e) => {
                          handleDivClickIncome3('medium-income', radio3_2);
                        }}
                      >
                        <Input
                          id={radio3_2}
                          type="radio"
                          value="medium-income"
                          name="income3"
                          className={styles.radio_input}
                          onChange={handleRadioIncome3}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio3_2,
                            title: formDataTitle.FORM3_6,
                          }}
                        />
                        <label
                          htmlFor={radio3_2}
                          className={styles.radio_label}
                        >
                          {t('Medium-income')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesRadio3(radio3_3)}
                        onClick={(e) => {
                          handleDivClickIncome3('high-income', radio3_3);
                        }}
                      >
                        <Input
                          id={radio3_3}
                          type="radio"
                          value="high-income"
                          name="income3"
                          className={styles.radio_input}
                          onChange={handleRadioIncome3}
                          page="page_3_customer_group"
                          saveUserData={{
                            id: radio3_3,
                            title: formDataTitle.FORM3_6,
                          }}
                        />
                        <label
                          htmlFor={radio3_3}
                          className={styles.radio_label}
                        >
                          {t('High-income')}
                        </label>
                      </div>
                      {radioError3 && (
                        <span className="text-rose-400">{radioError3}</span>
                      )}
                    </fieldset>

                    <div className="flex flex-col gap-5 justify-center items-center mt-10 ml-auto mr-auto">
                      {(formik.errors.customerDescription1 &&
                        formik.touched.customerDescription1) ||
                      radioError1 ||
                      (formik.errors.customerDescription2 &&
                        formik.touched.customerDescription2) ||
                      radioError2 ||
                      (formik.errors.customerDescription3 &&
                        formik.touched.customerDescription3) ||
                      radioError3 ? (
                        <span className="text-rose-400">
                          {t('Please check your inputs')}
                        </span>
                      ) : (
                        <></>
                      )}

                      <div className="flex gap-5 justify-center">
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
                              event_name: 'page_3_next_button',
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
