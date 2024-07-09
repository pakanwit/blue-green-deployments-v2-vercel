import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step5KeySuccessValidate from '../utils/Step5KeySuccessValidate';
import styles from '../styles/Wizard.module.css';
import React from 'react';
import { event } from 'nextjs-google-analytics';
import { AiOutlineUndo } from 'react-icons/ai';
import { MoonLoader } from 'react-spinners';
import FadeAnimation from './animations/fadeAnimation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import trackEvent from '../utils/trackEvent';
import Input from './input';
import { API_KEY_HEADER } from '../pages/api/constants';
import { formDataTitle } from '../constants/formTitle';

//****successFactors1 has s but setSuccessFactor1 does not have s****
export default function Step4KeySuccess({
  successFactors1,
  successFactors2,
  successFactors3,

  weakness1,
  weakness2,
  weakness3,

  setSuccessFactor1,
  setSuccessFactor2,
  setSuccessFactor3,

  setWeakness1,
  setWeakness2,
  setWeakness3,

  handleNextFormik,
  handleBack,
  isSession,

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
  tv,
  secretKey,
}) {
  const { t } = useTranslation('Step5KeySuccess');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  interface FormValues {
    successFactors1: string;
    successFactors2: string;
    successFactors3: string;

    weakness1: string;
    weakness2: string;
    weakness3: string;
  }

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);
    setSuccessFactor1(formik.values.successFactors1);
    setSuccessFactor2(formik.values.successFactors2);
    setSuccessFactor3(formik.values.successFactors3);

    setWeakness1(formik.values.weakness1);
    setWeakness2(formik.values.weakness2);
    setWeakness3(formik.values.weakness3);

    handleNextFormik();
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      successFactors1: successFactors1,
      successFactors2: successFactors2,
      successFactors3: successFactors3,

      weakness1: weakness1,
      weakness2: weakness2,
      weakness3: weakness3,
    },
    validate: (values) => Step5KeySuccessValidate(values, tv),
    onSubmit,
  });
  const isCleanCase = Object.keys(formik.errors).length === 0;
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_5_back_button',
      is_clean_case: isCleanCase,
    });
    handleBack();
  };

  const [successFactor1Clicked, setSuccessFactor1Clicked] = useState(false);
  const [successFactor2Clicked, setSuccessFactor2Clicked] = useState(false);
  const [successFactor3Clicked, setSuccessFactor3Clicked] = useState(false);
  const [weakness1Clicked, setWeakness1Clicked] = useState(false);
  const [weakness2Clicked, setWeakness2Clicked] = useState(false);
  const [weakness3Clicked, setWeakness3Clicked] = useState(false);

  const [successFactor1ShowSuggestion, setSuccessFactor1ShowSuggestion] =
    useState(false);
  const [successFactor2ShowSuggestion, setSuccessFactor2ShowSuggestion] =
    useState(false);
  const [successFactor3ShowSuggestion, setSuccessFactor3ShowSuggestion] =
    useState(false);
  const [weakness1ShowSuggestion, setWeakness1ShowSuggestion] = useState(false);
  const [weakness2ShowSuggestion, setWeakness2ShowSuggestion] = useState(false);
  const [weakness3ShowSuggestion, setWeakness3ShowSuggestion] = useState(false);

  const handleInputChangeSuccessFactor1 = (e) => {
    setSuccessFactor1Clicked(true);
    setSuccessFactor1ShowSuggestion(true);
    setSuccessFactor1(e.target.value);
    formik.handleChange(e);
  };
  const handleInputChangeSuccessFactor2 = (e) => {
    setSuccessFactor2Clicked(true);
    setSuccessFactor2ShowSuggestion(true);
    setSuccessFactor2(e.target.value);
    formik.handleChange(e);
  };
  const handleInputChangeSuccessFactor3 = (e) => {
    setSuccessFactor3Clicked(true);
    setSuccessFactor3ShowSuggestion(true);
    setSuccessFactor3(e.target.value);
    formik.handleChange(e);
  };

  const handleInputChangeWeakness1 = (e) => {
    setWeakness1Clicked(true);
    setWeakness1ShowSuggestion(true);
    setWeakness1(e.target.value);
    formik.handleChange(e);
  };
  const handleInputChangeWeakness2 = (e) => {
    setWeakness2Clicked(true);
    setWeakness2ShowSuggestion(true);
    setWeakness2(e.target.value);
    formik.handleChange(e);
  };
  const handleInputChangeWeakness3 = (e) => {
    setWeakness3Clicked(true);
    setWeakness3ShowSuggestion(true);
    setWeakness3(e.target.value);
    formik.handleChange(e);
  };

  useEffect(() => {
    if (!isSession) {
      event('Step4KeySuccess_component_view', {
        category: 'Component View',
        label: 'Step4KeySuccess Component View',
      });
    }
  }, []);

  const [suggestionsSuccessFactors1, setSuggestionsSuccessFactors1] = useState(
    [],
  );
  const [suggestionsSuccessFactors2, setSuggestionsSuccessFactors2] = useState(
    [],
  );
  const [suggestionsSuccessFactors3, setSuggestionsSuccessFactors3] = useState(
    [],
  );
  const [
    suggestionLoadingSuccessFactors1,
    setSuggestionLoadingSuccessFactors1,
  ] = useState(false);
  const [
    suggestionLoadingSuccessFactors2,
    setSuggestionLoadingSuccessFactors2,
  ] = useState(false);
  const [
    suggestionLoadingSuccessFactors3,
    setSuggestionLoadingSuccessFactors3,
  ] = useState(false);
  const [suggestionErrorSuccessFactors1, setSuggestionErrorSuccessFactors1] =
    useState(false);
  const [suggestionErrorSuccessFactors2, setSuggestionErrorSuccessFactors2] =
    useState(false);
  const [suggestionErrorSuccessFactors3, setSuggestionErrorSuccessFactors3] =
    useState(false);
  const [suggestionsWeakness1, setSuggestionsWeakness1] = useState([]);
  const [suggestionsWeakness2, setSuggestionsWeakness2] = useState([]);
  const [suggestionsWeakness3, setSuggestionsWeakness3] = useState([]);
  const [suggestionLoadingWeakness1, setSuggestionLoadingWeakness1] =
    useState(false);
  const [suggestionLoadingWeakness2, setSuggestionLoadingWeakness2] =
    useState(false);
  const [suggestionLoadingWeakness3, setSuggestionLoadingWeakness3] =
    useState(false);
  const [suggestionErrorWeakness1, setSuggestionErrorWeakness1] =
    useState(false);
  const [suggestionErrorWeakness2, setSuggestionErrorWeakness2] =
    useState(false);
  const [suggestionErrorWeakness3, setSuggestionErrorWeakness3] =
    useState(false);

  const callCounterSuccess = useRef(0);
  const callTimeoutSuccess = useRef(null);
  const pendingExecutionSuccess = useRef(null);

  const { i18n } = useTranslation();
  const locale = i18n.language;

  async function getSuggestionSuccessFactors(id, retryCount = 0) {
    callCounterSuccess.current += 1;

    if (callCounterSuccess.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounterSuccess.current = 0;

      // Clear global timeout if it exists
      if (callTimeoutSuccess.current) {
        clearTimeout(callTimeoutSuccess.current);
        callTimeoutSuccess.current = null;
      }

      // Cancel pending execution
      if (pendingExecutionSuccess.current) {
        clearTimeout(pendingExecutionSuccess.current);
        pendingExecutionSuccess.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeoutSuccess.current) {
      callTimeoutSuccess.current = setTimeout(() => {
        callCounterSuccess.current = 0;
        callTimeoutSuccess.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecutionSuccess.current = setTimeout(async () => {
      try {
        if (id === '1') {
          setSuggestionErrorSuccessFactors1(false);
          setSuggestionLoadingSuccessFactors1(true);
        } else if (id === '2') {
          setSuggestionErrorSuccessFactors2(false);
          setSuggestionLoadingSuccessFactors2(true);
        } else if (id === '3') {
          setSuggestionErrorSuccessFactors3(false);
          setSuggestionLoadingSuccessFactors3(true);
        }

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep5SuggestionsKeySuccess',
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

              locale,
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
        const successFactorsArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', successFactorsArr);

          // Check for non-alphanumeric characters
          const hasNonAlphanumeric = successFactorsArr.some((name) =>
            /[^a-z0-9\s-.,'&]/i.test(name),
          );
          if (hasNonAlphanumeric) {
            // Retry if we have not already retried too many times
            if (retryCount < 5) {
              // adjust the retry limit as needed
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionSuccessFactors(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }

          if (id === '1') {
            setSuggestionsSuccessFactors1(successFactorsArr);
            setSuggestionLoadingSuccessFactors1(false);
          } else if (id === '2') {
            setSuggestionsSuccessFactors2(successFactorsArr);
            setSuggestionLoadingSuccessFactors2(false);
          } else if (id === '3') {
            setSuggestionsSuccessFactors3(successFactorsArr);
            setSuggestionLoadingSuccessFactors3(false);
          }
        } else {
          console.log('Error fetching suggestions', successFactorsArr);

          if (id === '1') {
            setSuggestionErrorSuccessFactors1(true);
          } else if (id === '2') {
            setSuggestionErrorSuccessFactors2(true);
          } else if (id === '3') {
            setSuggestionErrorSuccessFactors3(true);
          }
        }
      } catch (error) {
        console.error(error);

        if (id === '1') {
          setSuggestionErrorSuccessFactors1(true);
        } else if (id === '2') {
          setSuggestionErrorSuccessFactors2(true);
        } else if (id === '3') {
          setSuggestionErrorSuccessFactors3(true);
        }
      }
      pendingExecutionSuccess.current = null;
    }, 50);
  }

  const handleSuggestionClickSuccessFactors1 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'successFactors1',
      value: suggestion,
    });
    formik.setFieldValue('successFactors1', suggestion, true);
    setSuccessFactor1(suggestion);
  };
  const handleSuggestionClickSuccessFactors2 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'successFactors2',
      value: suggestion,
    });
    formik.setFieldValue('successFactors2', suggestion, true);
    setSuccessFactor2(suggestion);
  };
  const handleSuggestionClickSuccessFactors3 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'successFactors3',
      value: suggestion,
    });
    formik.setFieldValue('successFactors3', suggestion, true);
    setSuccessFactor3(suggestion);
  };

  const callCounterWeakness = useRef(0);
  const callTimeoutWeakness = useRef(null);
  const pendingExecutionWeakness = useRef(null);

  async function getSuggestionWeakness(id, retryCount = 0) {
    callCounterWeakness.current += 1;

    if (callCounterWeakness.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounterWeakness.current = 0;

      // Clear global timeout if it exists
      if (callTimeoutWeakness.current) {
        clearTimeout(callTimeoutWeakness.current);
        callTimeoutWeakness.current = null;
      }

      // Cancel pending execution
      if (pendingExecutionWeakness.current) {
        clearTimeout(pendingExecutionWeakness.current);
        pendingExecutionWeakness.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeoutWeakness.current) {
      callTimeoutWeakness.current = setTimeout(() => {
        callCounterWeakness.current = 0;
        callTimeoutWeakness.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecutionWeakness.current = setTimeout(async () => {
      try {
        if (id === '1') {
          setSuggestionErrorWeakness1(false);
          setSuggestionLoadingWeakness1(true);
        } else if (id === '2') {
          setSuggestionErrorWeakness2(false);
          setSuggestionLoadingWeakness2(true);
        } else if (id === '3') {
          setSuggestionErrorWeakness3(false);
          setSuggestionLoadingWeakness3(true);
        }

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep5SuggestionsWeakness',
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

              locale,
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
        const weaknessArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', weaknessArr);

          const hasNonAlphanumeric = weaknessArr.some((name) =>
            /[^a-z0-9\s-.,']/i.test(name),
          );
          if (hasNonAlphanumeric) {
            if (retryCount < 5) {
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionWeakness(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }

          if (id === '1') {
            setSuggestionsWeakness1(weaknessArr);
            setSuggestionLoadingWeakness1(false);
          } else if (id === '2') {
            setSuggestionsWeakness2(weaknessArr);
            setSuggestionLoadingWeakness2(false);
          } else if (id === '3') {
            setSuggestionsWeakness3(weaknessArr);
            setSuggestionLoadingWeakness3(false);
          }
        } else {
          console.log('Error fetching suggestions', weaknessArr);

          if (id === '1') {
            setSuggestionErrorWeakness1(true);
          } else if (id === '2') {
            setSuggestionErrorWeakness2(true);
          } else if (id === '3') {
            setSuggestionErrorWeakness3(true);
          }
        }
      } catch (error) {
        console.error(error);

        if (id === '1') {
          setSuggestionErrorWeakness1(true);
        } else if (id === '2') {
          setSuggestionErrorWeakness2(true);
        } else if (id === '3') {
          setSuggestionErrorWeakness3(true);
        }
      }
      pendingExecutionWeakness.current = null;
    }, 50);
  }

  const handleSuggestionClickWeakness1 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'weakness1',
      value: suggestion,
    });
    formik.setFieldValue('weakness1', suggestion, true);
    setWeakness1(suggestion);
  };
  const handleSuggestionClickWeakness2 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'weakness2',
      value: suggestion,
    });
    formik.setFieldValue('weakness2', suggestion, true);
    setWeakness2(suggestion);
  };
  const handleSuggestionClickWeakness3 = (suggestion) => {
    trackEvent({
      event_name: 'page_5_suggestions',
      related_field_id: 'weakness3',
      value: suggestion,
    });
    formik.setFieldValue('weakness3', suggestion, true);
    setWeakness3(suggestion);
  };

  const [successFactor1AlreadyClicked, setSuccessFactor1AlreadyClicked] =
    useState(false);
  const [successFactor2AlreadyClicked, setSuccessFactor2AlreadyClicked] =
    useState(false);
  const [successFactor3AlreadyClicked, setSuccessFactor3AlreadyClicked] =
    useState(false);
  const [weakness1AlreadyClicked, setWeakness1AlreadyClicked] = useState(false);
  const [weakness2AlreadyClicked, setWeakness2AlreadyClicked] = useState(false);
  const [weakness3AlreadyClicked, setWeakness3AlreadyClicked] = useState(false);

  useEffect(() => {
    if (
      successFactor1Clicked &&
      !successFactor1AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionSuccessFactors('1');
      setSuccessFactor1Clicked(false);
      setSuccessFactor1AlreadyClicked(true);
    }
  }, [successFactor1Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      successFactor2Clicked &&
      !successFactor2AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionSuccessFactors('2');
      setSuccessFactor2Clicked(false);
      setSuccessFactor2AlreadyClicked(true);
    }
  }, [successFactor2Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      successFactor3Clicked &&
      !successFactor3AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionSuccessFactors('3');
      setSuccessFactor3Clicked(false);
      setSuccessFactor3AlreadyClicked(true);
    }
  }, [successFactor3Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (weakness1Clicked && !weakness1AlreadyClicked && !formik.isSubmitting) {
      getSuggestionWeakness('1');
      setWeakness1Clicked(false);
      setWeakness1AlreadyClicked(true);
    }
  }, [weakness1Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (weakness2Clicked && !weakness2AlreadyClicked && !formik.isSubmitting) {
      getSuggestionWeakness('2');
      setWeakness2Clicked(false);
      setWeakness2AlreadyClicked(true);
    }
  }, [weakness2Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (weakness3Clicked && !weakness3AlreadyClicked && !formik.isSubmitting) {
      getSuggestionWeakness('3');
      setWeakness3Clicked(false);
      setWeakness3AlreadyClicked(true);
    }
  }, [weakness3Clicked, formik.isSubmitting]);

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

  //log formik.errors
  useEffect(() => {
    console.log('formik.errors success:', formik.errors);
  }, [formik.errors]);

  function handleOnFocusSuccessFactor1(event) {
    handleInputChangeSuccessFactor1(event);
    formik.setFieldTouched('successFactors1', true, false);
  }

  function handleOnFocusSuccessFactor2(event) {
    handleInputChangeSuccessFactor2(event);
    formik.setFieldTouched('successFactors2', true, false);
  }

  function handleOnFocusSuccessFactor3(event) {
    handleInputChangeSuccessFactor3(event);
    formik.setFieldTouched('successFactors3', true, false);
  }

  function handleOnFocusWeakness1(event) {
    handleInputChangeWeakness1(event);
    formik.setFieldTouched('weakness1', true, false);
  }

  function handleOnFocusWeakness2(event) {
    handleInputChangeWeakness2(event);
    formik.setFieldTouched('weakness2', true, false);
  }

  function handleOnFocusWeakness3(event) {
    handleInputChangeWeakness3(event);
    formik.setFieldTouched('weakness3', true, false);
  }

  return (
    <>
      <motion.div
        key="component-four"
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
                  {t('STEP 5 OF 7')}
                </div>
                <h4 className="">{t('Enter Success Drivers')}</h4>
                <p className="subheading-form">
                  {t(
                    'Success Drivers are the most important things that contribute to the success of a business.',
                  )}
                </p>
                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <h5>{t('Success Drivers')}</h5>
                    <hr className="mb-3" />
                    <div className="mb-3">
                      <label htmlFor="successFactors1" className={styles.label}>
                        {t('Success Driver 1')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('successFactors1')}
                        type="text"
                        name="successFactors1"
                        id="successFactors1"
                        className={`${styles.text_input} ${formik.errors.successFactors1 && formik.touched.successFactors1 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t('E.g. Our product is high quality')}
                        onChange={handleInputChangeSuccessFactor1}
                        onFocus={handleOnFocusSuccessFactor1}
                        onBlur={() => formik.validateField('successFactors1')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'successFactors1',
                          title: formDataTitle.FORM5_1,
                        }}
                      />
                      {formik.errors.successFactors1 &&
                      formik.touched.successFactors1 ? (
                        <span className="text-rose-400">
                          {formik.errors.successFactors1 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {successFactor1ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingSuccessFactors1 &&
                            !suggestionErrorSuccessFactors1 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors1(
                                      suggestionsSuccessFactors1[0],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors1[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors1(
                                      suggestionsSuccessFactors1[1],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors1[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors1(
                                      suggestionsSuccessFactors1[2],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors1[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingSuccessFactors1 &&
                            !suggestionErrorSuccessFactors1 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorSuccessFactors1 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionSuccessFactors('1')}
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

                    <div className="mb-3">
                      <label htmlFor="successFactors2" className={styles.label}>
                        {t('Success Driver 2')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('successFactors2')}
                        type="text"
                        name="successFactors2"
                        id="successFactors2"
                        className={`${styles.text_input} ${formik.errors.successFactors2 && formik.touched.successFactors2 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t(
                          'E.g. Our marketing team is highly experienced',
                        )}
                        onChange={handleInputChangeSuccessFactor2}
                        onFocus={handleOnFocusSuccessFactor2}
                        onBlur={() => formik.validateField('successFactors2')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'successFactors2',
                          title: formDataTitle.FORM5_2,
                        }}
                      />

                      {formik.errors.successFactors2 &&
                      formik.touched.successFactors2 ? (
                        <span className="text-rose-400">
                          {formik.errors.successFactors2 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {successFactor2ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingSuccessFactors2 &&
                            !suggestionErrorSuccessFactors2 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors2(
                                      suggestionsSuccessFactors2[0],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors2[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors2(
                                      suggestionsSuccessFactors2[1],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors2[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors2(
                                      suggestionsSuccessFactors2[2],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors2[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingSuccessFactors2 &&
                            !suggestionErrorSuccessFactors2 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorSuccessFactors2 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionSuccessFactors('2')}
                              >
                                <AiOutlineUndo size={20} />{' '}
                                <div
                                  className="font-normal"
                                  onClick={() => {
                                    trackEvent({
                                      event_name:
                                        'page_5_regenerate_suggestions',
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

                    <div className="mb-3">
                      <label htmlFor="successFactors3" className={styles.label}>
                        {t('Success Driver 3')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('successFactors3')}
                        type="text"
                        name="successFactors3"
                        id="successFactors3"
                        className={`${styles.text_input} ${formik.errors.successFactors3 && formik.touched.successFactors3 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t('E.g. We have great business partners')}
                        onChange={handleInputChangeSuccessFactor3}
                        onFocus={handleOnFocusSuccessFactor3}
                        onBlur={() => formik.validateField('successFactors3')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'successFactors3',
                          title: formDataTitle.FORM5_3,
                        }}
                      />
                      {formik.errors.successFactors3 &&
                      formik.touched.successFactors3 ? (
                        <span className="text-rose-400">
                          {formik.errors.successFactors3 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {successFactor3ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingSuccessFactors3 &&
                            !suggestionErrorSuccessFactors3 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors3(
                                      suggestionsSuccessFactors3[0],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors3[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors3(
                                      suggestionsSuccessFactors3[1],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors3[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickSuccessFactors3(
                                      suggestionsSuccessFactors3[2],
                                    )
                                  }
                                >
                                  {suggestionsSuccessFactors3[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingSuccessFactors3 &&
                            !suggestionErrorSuccessFactors3 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorSuccessFactors3 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionSuccessFactors('3')}
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
                    {/* weakness---------------------------------------------------- */}
                    <h5>{t('Weakness')}</h5>
                    <hr className="mb-3" />
                    <div className="mb-3">
                      <label htmlFor="weakness1" className={styles.label}>
                        {t('Weakness 1')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('weakness1')}
                        type="text"
                        name="weakness1"
                        id="weakness1"
                        className={`${styles.text_input} ${formik.errors.weakness1 && formik.touched.weakness1 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t(
                          'E.g. we are a new player in the market',
                        )}
                        onChange={handleInputChangeWeakness1}
                        onFocus={handleOnFocusWeakness1}
                        onBlur={() => formik.validateField('weakness1')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'weakness1',
                          title: formDataTitle.FORM5_4,
                        }}
                      />
                      {formik.errors.weakness1 && formik.touched.weakness1 ? (
                        <span className="text-rose-400">
                          {formik.errors.weakness1 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {weakness1ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingWeakness1 &&
                            !suggestionErrorWeakness1 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness1(
                                      suggestionsWeakness1[0],
                                    )
                                  }
                                >
                                  {suggestionsWeakness1[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness1(
                                      suggestionsWeakness1[1],
                                    )
                                  }
                                >
                                  {suggestionsWeakness1[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness1(
                                      suggestionsWeakness1[2],
                                    )
                                  }
                                >
                                  {suggestionsWeakness1[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingWeakness1 &&
                            !suggestionErrorWeakness1 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorWeakness1 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionWeakness('1')}
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

                    <div className="mb-3">
                      <label htmlFor="weakness2" className={styles.label}>
                        {t('Weakness 2')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('weakness2')}
                        type="text"
                        name="weakness2"
                        id="weakness2"
                        className={`${styles.text_input} ${formik.errors.weakness2 && formik.touched.weakness2 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t('E.g. our budget is limited')}
                        onChange={handleInputChangeWeakness2}
                        onFocus={handleOnFocusWeakness2}
                        onBlur={() => formik.validateField('weakness2')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'weakness2',
                          title: formDataTitle.FORM5_5,
                        }}
                      />
                      {formik.errors.weakness2 && formik.touched.weakness2 ? (
                        <span className="text-rose-400">
                          {formik.errors.weakness2 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {weakness2ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingWeakness2 &&
                            !suggestionErrorWeakness2 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness2(
                                      suggestionsWeakness2[0],
                                    )
                                  }
                                >
                                  {suggestionsWeakness2[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness2(
                                      suggestionsWeakness2[1],
                                    )
                                  }
                                >
                                  {suggestionsWeakness2[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness2(
                                      suggestionsWeakness2[2],
                                    )
                                  }
                                >
                                  {suggestionsWeakness2[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingWeakness2 &&
                            !suggestionErrorWeakness2 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorWeakness2 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionWeakness('2')}
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

                    <div className="mb-10">
                      <label htmlFor="weakness3" className={styles.label}>
                        {t('Weakness 3')}{' '}
                        <span className="text-sm">{t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('weakness3')}
                        type="text"
                        name="weakness3"
                        id="weakness3"
                        className={`${styles.text_input} ${formik.errors.weakness3 && formik.touched.weakness3 ? 'border-rose-400' : 'border-gray-300'} `}
                        placeholder={t(
                          'E.g. our margins are worst than competitors',
                        )}
                        onChange={handleInputChangeWeakness3}
                        onFocus={handleOnFocusWeakness3}
                        onBlur={() => formik.validateField('weakness3')}
                        page="page_5_key_success"
                        saveUserData={{
                          id: 'weakness2',
                          title: formDataTitle.FORM5_6,
                        }}
                      />
                      {formik.errors.weakness3 && formik.touched.weakness3 ? (
                        <span className="text-rose-400">
                          {formik.errors.weakness3 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {weakness3ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingWeakness3 &&
                            !suggestionErrorWeakness3 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness3(
                                      suggestionsWeakness3[0],
                                    )
                                  }
                                >
                                  {suggestionsWeakness3[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness3(
                                      suggestionsWeakness3[1],
                                    )
                                  }
                                >
                                  {suggestionsWeakness3[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickWeakness3(
                                      suggestionsWeakness3[2],
                                    )
                                  }
                                >
                                  {suggestionsWeakness3[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionLoadingWeakness3 &&
                            !suggestionErrorWeakness3 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorWeakness3 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionWeakness('3')}
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

                    <div className="flex flex-col gap-5 justify-center items-center mt-10 ml-auto mr-auto">
                      {(formik.errors.successFactors1 &&
                        formik.touched.successFactors1) ||
                      (formik.errors.successFactors2 &&
                        formik.touched.successFactors2) ||
                      (formik.errors.successFactors3 &&
                        formik.touched.successFactors3) ||
                      (formik.errors.weakness1 && formik.touched.weakness1) ||
                      (formik.errors.weakness2 && formik.touched.weakness2) ||
                      (formik.errors.weakness3 && formik.touched.weakness3) ? (
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
                              event_name: 'page_5_next_button',
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
