import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Wizard.module.css';
import React from 'react';
import { event } from 'nextjs-google-analytics';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import trackEvent from '../utils/trackEvent';
import { formDataTitle } from '../constants/formTitle';
import Input from './input';

export default function Step1Obj({
  businessOperationalStatus,
  businessPlanObj,

  setBusinessOperationalStatus,
  setBusinessPlanObj,
  selectedRadioStep1_1,
  setSelectedRadioStep1_1,

  selectedRadioStep1_2,
  setSelectedRadioStep1_2,

  secretKey,
  handleNextStep,
  setCurrentStep,
}) {
  const [radioError1, setRadioError1] = useState('');
  const [radioError2, setRadioError2] = useState('');
  const isCleanCase = !(radioError1 || radioError2);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedRadioStep1_1) {
      document.getElementById(selectedRadioStep1_1).click();
    }
    if (selectedRadioStep1_2) {
      document.getElementById(selectedRadioStep1_2).click();
    }
  }, []);

  const handleRadioChangeOperationalStatus = (e) => {
    setBusinessOperationalStatus(e.target.value);
    setSelectedRadioStep1_1(e.target.id);
  };

  const handleDivClickOperationalStatus = (value, inputId) => {
    setBusinessOperationalStatus(value);
    document.getElementById(inputId).click();
  };

  const getDivClassesOperationalStatus = (inputId) => {
    const baseClasses =
      'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
    const selectedClasses =
      'border-sky-300 border-2 transition-colors transition-width transition-duration-200';
    const deselectedClasses =
      'border-gray-200 border-opacity-50 transition-colors transition-width transition-duration-200';

    return `${baseClasses} ${selectedRadioStep1_1 === inputId ? selectedClasses : deselectedClasses}`;
  };

  const handleRadioChangeBusinessObj = (e) => {
    setBusinessPlanObj(e.target.value);
    setSelectedRadioStep1_2(e.target.id);
  };

  const handleDivClickBusinessObj = (value, inputId) => {
    setBusinessPlanObj(value);
    document.getElementById(inputId).click();
  };

  const getDivClassesBusinessObj = (inputId) => {
    const baseClasses =
      'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
    const selectedClasses =
      'border-sky-300 border-2 transition-colors transition-width transition-duration-200';
    const deselectedClasses =
      'border-gray-200 border-opacity-50 transition-colors transition-width transition-duration-200';

    return `${baseClasses} ${selectedRadioStep1_2 === inputId ? selectedClasses : deselectedClasses}`;
  };

  const handleNext = (e) => {
    console.time('Step1ToStep2:old');
    e.preventDefault();
    if (!businessOperationalStatus) {
      setRadioError1('Please Select One');
      return;
    }

    if (!businessPlanObj) {
      setRadioError2('Please Select One');
      return;
    }
    setCurrentStep(1);
    // handleNextStep();
  };

  // get session
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      event('Step1Obj_component_view', {
        category: 'Component View22222',
        label: 'Step1Obj Component View',
      });
    }
  }, [session]);

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

  const { i18n, t } = useTranslation('Step1Obj');

  console.timeEnd('firstToStep1:old');
  console.timeEnd('Step2BackToStep1:old');
  return (
    <>
      <motion.div
        key="component-one"
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
                  {t('STEP 1 OF 7')}
                </div>
                <h4 className="">{t('Select Business Plan Objective')}</h4>
                <div className="form-block-started w-form">
                  <form
                    className="form-started"
                    onSubmit={(e) => handleNext(e)}
                  >
                    <label className="font-normal text-lg">
                      {t('Is this an existing or an upcoming business?')}
                    </label>
                    <fieldset className="mb-6">
                      <legend className="sr-only">
                        {t('Business Operational Status')}
                      </legend>

                      <div
                        className={getDivClassesOperationalStatus('radio-1_1')}
                        onClick={(e) => {
                          handleDivClickOperationalStatus(
                            'existing business',
                            'radio-1_1',
                          );
                        }}
                      >
                        <Input
                          id="radio-1_1"
                          name="radio1"
                          type="radio"
                          value="existing business"
                          className={styles.radio_input}
                          onChange={handleRadioChangeOperationalStatus}
                          saveUserData={{
                            id: 'radio-1_1',
                            title: formDataTitle.FORM1_1,
                          }}
                          page="page_1_obj"
                        />
                        <label
                          htmlFor="radio-1_1"
                          className={styles.radio_label}
                        >
                          {t('Existing business')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesOperationalStatus('radio-1_2')}
                        onClick={(e) => {
                          handleDivClickOperationalStatus(
                            'upcoming unlaunched business',
                            'radio-1_2',
                          );
                        }}
                      >
                        <Input
                          id="radio-1_2"
                          name="radio1"
                          type="radio"
                          value="upcoming unlaunched business"
                          className={styles.radio_input}
                          onChange={handleRadioChangeOperationalStatus}
                          saveUserData={{
                            id: 'radio-1_2',
                            title: formDataTitle.FORM1_1,
                          }}
                          page="page_1_obj"
                        />
                        <label
                          htmlFor="radio-1_2"
                          className={styles.radio_label}
                        >
                          {t('Upcoming unlaunched business')}
                        </label>
                      </div>
                      {radioError1 && (
                        <span className="text-rose-400">{radioError1}</span>
                      )}
                    </fieldset>

                    <label className="font-normal text-lg">
                      {t('What will you use this business plan for?')}
                    </label>
                    <fieldset className="mb-10">
                      <legend className="sr-only">{t('Objectives')}</legend>

                      <div
                        className={getDivClassesBusinessObj('radio-2_1')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'To be used to request fund from investors',
                            'radio-2_1',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_1"
                          name="radio2"
                          type="radio"
                          value="To be used to request fund from investors"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_1',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="radio-2_1"
                          className={styles.radio_label}
                        >
                          {t('To be used to request fund from investors')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_2')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'To be used to request fund from banks',
                            'radio-2_2',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_2"
                          name="radio2"
                          type="radio"
                          value="To be used to request fund from banks"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_2',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t('To be used to request fund from banks')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_3')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'For self-learning',
                            'radio-2_3',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_3"
                          name="radio2"
                          type="radio"
                          value="For self-learning"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_3',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t('For self-learning')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_4')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'To be used as reference for school/university project',
                            'radio-2_4',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_4"
                          name="radio2"
                          type="radio"
                          value="To be used as reference for school/university project"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_4',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t(
                            'To be used as reference for school/university project',
                          )}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_5')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'To be used as reference for workplace projects',
                            'radio-2_5',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_5"
                          name="radio2"
                          type="radio"
                          value="To be used as reference for workplace projects"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_5',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t('To be used as reference for workplace projects')}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_6')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'To be used to submit to a non-financial institution for approval (e.g. getting VISA approval, franchise approval, tenant approval)',
                            'radio-2_6',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_6"
                          name="radio2"
                          type="radio"
                          value="To be used to submit to a non-financial institution for approval (e.g. getting VISA approval, franchise approval, tenant approval)"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_6',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t(
                            'To be used to submit to a non-financial institution for approval (e.g. getting VISA approval, franchise approval, tenant approval)',
                          )}
                        </label>
                      </div>

                      <div
                        className={getDivClassesBusinessObj('radio-2_7')}
                        onClick={(e) => {
                          handleDivClickBusinessObj(
                            'Other reasons',
                            'radio-2_7',
                          );
                        }}
                      >
                        <Input
                          id="radio-2_7"
                          name="radio2"
                          type="radio"
                          value="Other reasons"
                          className={styles.radio_input}
                          onChange={handleRadioChangeBusinessObj}
                          page="page_1_obj"
                          saveUserData={{
                            id: 'radio-2_7',
                            title: formDataTitle.FORM1_2,
                          }}
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className={styles.radio_label}
                        >
                          {t('Other reasons')}
                        </label>
                      </div>
                      {radioError2 && (
                        <span className="text-rose-400">{radioError2}</span>
                      )}
                    </fieldset>

                    <div className="flex flex-col gap-5 justify-center items-center m-auto text-center">
                      {radioError1 || radioError2 ? (
                        <div className="text-rose-400">
                          {t('Check your inputs')}
                        </div>
                      ) : (
                        <></>
                      )}
                      <button
                        type="submit"
                        className="button-2 w-button m-auto"
                        onClick={() => {
                          trackEvent({
                            event_name: 'page_1_next_button',
                            is_clean_case: isCleanCase,
                          });
                        }}
                      >
                        {t('Next')}
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
