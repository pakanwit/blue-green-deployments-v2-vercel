import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/Wizard.module.css';
import Navbar from '../../components/navbar';
import { AppContext } from '../../context/appContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useLoadFormData } from '../../hooks/useLoadFormData';
import useDynamicQuestion, {
  getDynamicQuestions,
} from '../../hooks/useDynamicQuestion';
import { useFormik } from 'formik';
import Input from '../../components/input';
import { formDataTitle } from '../../constants/formTitle';
import FadeAnimation from '../../components/animations/fadeAnimation';
import { MoonLoader } from 'react-spinners';
import { AiOutlineUndo } from 'react-icons/ai';
import trackEvent from '../../utils/trackEvent';
import { API_KEY_HEADER } from '../api/constants';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '../../constants/path';
import useCookies from '../../hooks/useCookies';

const SpecificQuestion = ({ secretKey, fbPixelId, xPixelId }) => {
  const { t } = useTranslation('SpecificQuestion');
  const { t: tCommon } = useTranslation('common');
  const { i18n } = useTranslation();
  const router = useRouter();
  const locale = i18n.language;

  const { getCookie } = useCookies();
  const variantID = getCookie("variantID")

  const {
    planLanguage,
    businessType,
    businessName,
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

    specificProductQuestion1,
    specificProductQuestion2,
    specificProductQuestion3,
    specificProductQuestion4,
    specificProductQuestion5,
    specificOperationQuestion1,
    specificOperationQuestion2,
    specificOperationQuestion3,
    specificOperationQuestion4,
    specificOperationQuestion5,
    specificProductAnswer1,
    specificProductAnswer2,
    specificProductAnswer3,
    specificProductAnswer4,
    specificProductAnswer5,
    specificOperationAnswer1,
    specificOperationAnswer2,
    specificOperationAnswer3,
    specificOperationAnswer4,
    specificOperationAnswer5,
  } = useLoadFormData();
  const {
    get: { productInfoPrompt },
  } = useContext(AppContext);
  const hasGenDynamicQuestion =
    (typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('hasGenDynamicQuestion'))) ||
    false;

  const isReadyToFetch =
    !!(productInfoPrompt && planLanguage && businessType) &&
    !hasGenDynamicQuestion;
  const questionsGeneration = useDynamicQuestion({
    params: { productInfoPrompt, businessType },
    planLanguage,
    secretKey,
    isReadyToFetch,
    existingQuestions: {
      specificProductQuestion1,
      specificProductQuestion2,
      specificProductQuestion3,
      specificProductQuestion4,
      specificProductQuestion5,
      specificOperationQuestion1,
      specificOperationQuestion2,
      specificOperationQuestion3,
      specificOperationQuestion4,
      specificOperationQuestion5,
    },
  });

  const initialQuestions = useRef(questionsGeneration.questions);
  const initialGenerationError = useRef(questionsGeneration.generationError);

  const [questions, setQuestions] = useState({});
  const [generationError, setGenerationError] = useState(false);
  const [productQuestions, setProductQuestions] = useState([]);
  const [operationQuestions, setOperationQuestions] = useState([]);
  const [suggestionAndPropertyItems, setSuggestionAndPropertyItems] = useState(
    {},
  );
  console.log('suggestionAndPropertyItems:', suggestionAndPropertyItems);

  useEffect(() => {
    // Using this to set states for questions and generationError after get the result from useDynamicQuestion hook
    if (
      questionsGeneration.questions !== initialQuestions.current ||
      questionsGeneration.generationError !== initialGenerationError.current
    ) {
      setQuestions(questionsGeneration.questions);
      setGenerationError(questionsGeneration.generationError);
      initialQuestions.current = questionsGeneration.questions;
      initialGenerationError.current = questionsGeneration.generationError;
    }
  }, [questionsGeneration]);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (
      specificProductQuestion1 &&
      specificProductQuestion2 &&
      specificProductQuestion3 &&
      specificProductQuestion4 &&
      specificProductQuestion5 &&
      specificOperationQuestion1 &&
      specificOperationQuestion2 &&
      specificOperationQuestion3 &&
      specificOperationQuestion4 &&
      specificOperationQuestion5
    ) {
      setProductQuestions([
        specificProductQuestion1.value,
        specificProductQuestion2.value,
        specificProductQuestion3.value,
        specificProductQuestion4.value,
        specificProductQuestion5.value,
      ]);
      setOperationQuestions([
        specificOperationQuestion1.value,
        specificOperationQuestion2.value,
        specificOperationQuestion3.value,
        specificOperationQuestion4.value,
        specificOperationQuestion5.value,
      ]);
    } else if (Object.keys(questions).length > 0) {
      if (Object.keys(questions?.product || {}).length > 0) {
        Object.keys(questions.product).forEach((topic, index) => {
          formData[
            formDataTitle[`FORM_SPECIFIC_PRODUCT_QUESTION_${index + 1}`]
          ] = {
            id: 'specificProductQuestion',
            value: questions.product[topic],
            topic: topic,
          };
          setProductQuestions((prev) => [...prev, questions.product[topic]]);
        });
      }
      if (Object.keys(questions?.operation || {}).length > 0) {
        Object.keys(questions.operation).forEach((topic, index) => {
          formData[
            formDataTitle[`FORM_SPECIFIC_OPERATION_QUESTION_${index + 1}`]
          ] = {
            id: 'specificOperationQuestion',
            value: questions.operation[topic],
            topic: topic,
          };
          setOperationQuestions((prev) => [
            ...prev,
            questions.operation[topic],
          ]);
        });
      }
      localStorage.setItem('hasGenDynamicQuestion', JSON.stringify(true));
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [
    questions,
    specificProductQuestion1,
    specificProductQuestion2,
    specificProductQuestion3,
    specificProductQuestion4,
    specificProductQuestion5,
    specificOperationQuestion1,
    specificOperationQuestion2,
    specificOperationQuestion3,
    specificOperationQuestion4,
    specificOperationQuestion5,
  ]);

  useEffect(() => {
    const productAnswers = [
      specificProductAnswer1,
      specificProductAnswer2,
      specificProductAnswer3,
      specificProductAnswer4,
      specificProductAnswer5,
    ];
    const operationAnswers = [
      specificOperationAnswer1,
      specificOperationAnswer2,
      specificOperationAnswer3,
      specificOperationAnswer4,
      specificOperationAnswer5,
    ];

    productAnswers.forEach((answer, index) => {
      if (answer) {
        formik.setFieldValue(`product_${index + 1}`, answer);
      }
    });

    operationAnswers.forEach((answer, index) => {
      if (answer) {
        formik.setFieldValue(`operation_${index + 1}`, answer);
      }
    });
  }, [
    specificProductAnswer1,
    specificProductAnswer2,
    specificProductAnswer3,
    specificProductAnswer4,
    specificProductAnswer5,
    specificOperationAnswer1,
    specificOperationAnswer2,
    specificOperationAnswer3,
    specificOperationAnswer4,
    specificOperationAnswer5,
  ]);

  const handleRegenerateQuestions = async () => {
    setGenerationError(false);
    const result = await getDynamicQuestions({
      params: { productInfoPrompt, businessType },
      planLanguage,
      secretKey,
    });
    if (
      !result.generationError &&
      Object.keys(result.questions?.product).length === 5 &&
      Object.keys(result.questions?.operation).length === 5
    ) {
      setQuestions(result.questions);
      setGenerationError(result.generationError);
    }
  };

  const handleBackButton = () => {
    trackEvent({
      event_name: 'specific_question_back_button',
      is_clean_case: true,
    });
    router.push(ROUTE_PATH.successDrivers);
  };
  const callCounterInvestmentItem = useRef(0);
  const callTimeoutInvestmentItem = useRef(null);
  const pendingExecutionInvestmentItem = useRef(null);
  async function getSuggestionSpecificQuestion(
    itemName,
    question,
    retryCount = 0,
  ) {
    callCounterInvestmentItem.current += 1;

    if (callCounterInvestmentItem.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounterInvestmentItem.current = 0;

      // Clear global timeout if it exists
      if (callTimeoutInvestmentItem.current) {
        clearTimeout(callTimeoutInvestmentItem.current);
        callTimeoutInvestmentItem.current = null;
      }

      // Cancel pending execution
      if (pendingExecutionInvestmentItem.current) {
        clearTimeout(pendingExecutionInvestmentItem.current);
        pendingExecutionInvestmentItem.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeoutInvestmentItem.current) {
      callTimeoutInvestmentItem.current = setTimeout(() => {
        callCounterInvestmentItem.current = 0;
        callTimeoutInvestmentItem.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecutionInvestmentItem.current = setTimeout(async () => {
      try {
        setSuggestionAndPropertyItems((prev) => ({
          ...prev,
          [itemName]: {
            ...prev[itemName],
            loading: true,
            error: false,
          },
        }));
        const responsePromise = fetch(
          '/api/inputSuggestion/getStep5NewSuggestionsAIQuestion',
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

              locale,
              question,
            }),
          },
        );
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 7000),
        );

        const result = await Promise.race([responsePromise, timeoutPromise]);
        console.log('result:', result);

        if (!(result instanceof Response)) {
          throw new Error('Request timed out');
        }

        const response = result;
        const suggestionItemArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', suggestionItemArr);

          const hasNonAlphanumeric = suggestionItemArr.some((name) =>
            /[^a-z0-9\s-.,'&]/i.test(name),
          );
          if (hasNonAlphanumeric) {
            if (retryCount < 5) {
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionSpecificQuestion(
                itemName,
                question,
                retryCount + 1,
              );
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }
          setSuggestionAndPropertyItems((prev) => ({
            ...prev,
            [itemName]: {
              ...prev[itemName],
              loading: false,
              items: suggestionItemArr,
            },
          }));
        } else {
          console.log('Error fetching suggestions', suggestionItemArr);
          setSuggestionAndPropertyItems((prev) => ({
            ...prev,
            [itemName]: {
              ...prev[itemName],
              error: true,
            },
          }));
        }
      } catch (error) {
        console.error(error);
        setSuggestionAndPropertyItems((prev) => ({
          ...prev,
          [itemName]: {
            ...suggestionAndPropertyItems[itemName],
            error: true,
          },
        }));
      }
      pendingExecutionInvestmentItem.current = null;
    }, 50);
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

  const handleFocusInput = (itemName, question) => {
    if (!suggestionAndPropertyItems[itemName]?.clicked) {
      getSuggestionSpecificQuestion(itemName, question);
    }
    setSuggestionAndPropertyItems((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        isShowSuggestion: true,
        clicked: true,
      },
    }));
  };

  const handleSuggestionClickInvestmentItem = (itemName, suggestion) => {
    trackEvent({
      event_name: 'specific_question_suggestions',
      related_field_id: `${itemName}`,
      value: suggestion,
    });
    formik.setFieldValue(itemName, suggestion, true);
  };

  return (
    <div>
      <Navbar fbPixelId={fbPixelId} xPixelId={xPixelId} />
      <motion.div
        key="specific-question"
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
                  {tCommon('step')} 6 {tCommon('of')} {variantID === '2' ? 8 : 7}
                </div>
                <h4 className="">{t('productAndOperation')}</h4>
                <div className="form-block-started w-form">
                  {generationError ? (
                    <div className="flex flex-col gap-y-4">
                      <div className="text-rose-400 text-center">
                        {t('Error, please regenerate again')}
                      </div>
                      <div className="flex gap-4 justify-center">
                        <button
                          type="button"
                          className="button-regenerate flex gap-2"
                          onClick={handleRegenerateQuestions}
                        >
                          <AiOutlineUndo size={20} />{' '}
                          <div className="font-normal">
                            {t('Regenerate Product and Operation Questions')}
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      className="form-started"
                      onSubmit={formik.handleSubmit}
                    >
                      <h5>
                        {t('product')}{' '}
                        <span className="text-sm">{tCommon('optional')}</span>
                      </h5>
                      <hr className="mb-3" />
                      {productQuestions.length > 0 ? (
                        productQuestions?.map((question, index) => {
                          return (
                            <div
                              className="flex flex-col mb-3"
                              key={`${index}-${question}`}
                            >
                              <label
                                htmlFor={`product_${index + 1}`}
                                className={styles.label}
                              >
                                {`${question}`}
                              </label>
                              <Input
                                className={styles.text_input}
                                id={`product_${index + 1}`}
                                name={`product_${index + 1}`}
                                page="specific-question"
                                value={formik.values[`product_${index + 1}`]}
                                onChange={formik.handleChange}
                                onFocus={() =>
                                  handleFocusInput(
                                    `product_${index + 1}`,
                                    question,
                                  )
                                }
                                type="text"
                                saveUserData={{
                                  id: 'productSpecific',
                                  title:
                                    formDataTitle[
                                      `FORM_SPECIFIC_PRODUCT_ANSWER_${index + 1}`
                                    ],
                                }}
                              />
                              {suggestionAndPropertyItems[
                                `product_${index + 1}`
                              ]?.isShowSuggestion ? (
                                <FadeAnimation>
                                  <div
                                    className={styles.flex_container_suggestion}
                                  >
                                    <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                                      {!suggestionAndPropertyItems[
                                        `product_${index + 1}`
                                      ]?.loading &&
                                        !suggestionAndPropertyItems[
                                          `product_${index + 1}`
                                        ]?.error && (
                                          <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                            {suggestionAndPropertyItems[
                                              `product_${index + 1}`
                                            ]?.items?.map((suggestion) => (
                                              <button
                                                className="button-suggestion"
                                                type="button"
                                                key={suggestion}
                                                onClick={() =>
                                                  handleSuggestionClickInvestmentItem(
                                                    `product_${index + 1}`,
                                                    suggestion,
                                                  )
                                                }
                                              >
                                                {suggestion}
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      {suggestionAndPropertyItems[
                                        `product_${index + 1}`
                                      ]?.loading &&
                                        !suggestionAndPropertyItems[
                                          `product_${index + 1}`
                                        ]?.error && (
                                          <div className="m-auto mt-3 mb-3">
                                            <MoonLoader size={20} />
                                          </div>
                                        )}
                                      {suggestionAndPropertyItems[
                                        `product_${index + 1}`
                                      ]?.error && (
                                        <div className="text-rose-400 text-center">
                                          {t('Error, please regenerate again')}
                                        </div>
                                      )}
                                      <div className="flex gap-4 justify-center">
                                        <button
                                          type="button"
                                          className="button-regenerate flex gap-2"
                                          onClick={() =>
                                            getSuggestionSpecificQuestion(
                                              `product_${index + 1}`,
                                              question,
                                            )
                                          }
                                        >
                                          <AiOutlineUndo size={20} />{' '}
                                          <div
                                            className="font-normal"
                                            onClick={() => {
                                              trackEvent({
                                                event_name:
                                                  'specific_question_regenerate_suggestions',
                                                related_field_id: `product_${index + 1}`,
                                              });
                                            }}
                                          >
                                            {t('Regenerate Suggestions')}
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </FadeAnimation>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex justify-center items-center mt-5 mb-8 text-black">
                          <MoonLoader size={20} />
                        </div>
                      )}
                      <h5>
                        {t('operation')}{' '}
                        <span className="text-sm">{tCommon('optional')}</span>
                      </h5>
                      <hr className="mb-3" />
                      {operationQuestions.length > 0 ? (
                        operationQuestions?.map((question, index) => {
                          return (
                            <div className="flex flex-col mb-3">
                              <label
                                htmlFor={`operation_${index + 1}`}
                                className={styles.label}
                              >
                                {`${question}`}
                              </label>
                              <Input
                                className={styles.text_input}
                                id={`operation_${index + 1}`}
                                name={`operation_${index + 1}`}
                                page="specific-question"
                                value={formik.values[`operation_${index + 1}`]}
                                onChange={formik.handleChange}
                                onFocus={() =>
                                  handleFocusInput(
                                    `operation_${index + 1}`,
                                    question,
                                  )
                                }
                                type="text"
                                saveUserData={{
                                  id: 'operationSpecific',
                                  title:
                                    formDataTitle[
                                      `FORM_SPECIFIC_OPERATION_ANSWER_${index + 1}`
                                    ],
                                }}
                              />
                              {suggestionAndPropertyItems[
                                `operation_${index + 1}`
                              ]?.isShowSuggestion ? (
                                <FadeAnimation>
                                  <div
                                    className={styles.flex_container_suggestion}
                                  >
                                    <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                                      {!suggestionAndPropertyItems[
                                        `operation_${index + 1}`
                                      ]?.loading &&
                                        !suggestionAndPropertyItems[
                                          `operation_${index + 1}`
                                        ]?.error && (
                                          <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                            {suggestionAndPropertyItems[
                                              `operation_${index + 1}`
                                            ]?.items?.map((suggestion) => (
                                              <button
                                                className="button-suggestion"
                                                type="button"
                                                key={suggestion}
                                                onClick={() =>
                                                  handleSuggestionClickInvestmentItem(
                                                    `operation_${index + 1}`,
                                                    suggestion,
                                                  )
                                                }
                                              >
                                                {suggestion}
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      {suggestionAndPropertyItems[
                                        `operation_${index + 1}`
                                      ]?.loading &&
                                        !suggestionAndPropertyItems[
                                          `operation_${index + 1}`
                                        ]?.error && (
                                          <div className="m-auto mt-3 mb-3">
                                            <MoonLoader size={20} />
                                          </div>
                                        )}
                                      {suggestionAndPropertyItems[
                                        `operation_${index + 1}`
                                      ]?.error && (
                                        <div className="text-rose-400 text-center">
                                          {t('Error, please regenerate again')}
                                        </div>
                                      )}
                                      <div className="flex gap-4 justify-center">
                                        <button
                                          type="button"
                                          className="button-regenerate flex gap-2"
                                          onClick={() =>
                                            getSuggestionSpecificQuestion(
                                              `operation_${index + 1}`,
                                              question,
                                            )
                                          }
                                        >
                                          <AiOutlineUndo size={20} />{' '}
                                          <div
                                            className="font-normal"
                                            onClick={() => {
                                              trackEvent({
                                                event_name:
                                                  'specific_question_regenerate_suggestions',
                                                related_field_id: `operation_${index + 1}`,
                                              });
                                            }}
                                          >
                                            {t('Regenerate Suggestions')}
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </FadeAnimation>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex justify-center items-center mt-5 mb-8 text-black">
                          <MoonLoader size={20} />
                        </div>
                      )}
                    </form>
                  )}

                  <div className="flex gap-5 justify-center items-center mt-8 ml-auto mr-auto">
                    <button
                      type="button"
                      onClick={handleBackButton}
                      className="button back-button white w-button"
                    >
                      {t('Back')}
                    </button>
                    <button
                      type="submit"
                      className={`button-2 w-button ${operationQuestions.length === 0 ? 'opacity-50 cursor-not-allowed hover:bg-gray-500' : ''}`}
                      disabled={operationQuestions.length === 0}
                      onClick={() => {
                        trackEvent({
                          event_name: 'specific_question_next_button',
                          is_clean_case: true,
                        });
                        router.push(variantID === '2' ? ROUTE_PATH.generateResult : ROUTE_PATH.successDrivers);
                      }}
                    >
                      {t('Next')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecificQuestion;

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
        'SpecificQuestion',
      ])),
      secretKey,
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
