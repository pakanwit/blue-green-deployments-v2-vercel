import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useFormik, FormikHelpers } from 'formik';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Step2BasicInfoValidate from '../../utils/Step2BasicInfoValidate';
import styles from '../../styles/Wizard.module.css';
import React from 'react';
import { event } from 'nextjs-google-analytics';
import { useTranslation } from 'react-i18next';
import trackEvent from '../../utils/trackEvent';
import Input from '../../components/input';
import { formDataTitle } from '../../constants/formTitle';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '../../constants/path';
import Navbar from '../../components/navbar';
import useBeforeUnload from '../../hooks/useBeforeUnload';

export default function Step2BasicInfo({ fbPixelId }) {
  const { t } = useTranslation('Step2BasicInfo');
  const { t: tv } = useTranslation('validate');
  const { data: session } = useSession();
  const router = useRouter();

  useBeforeUnload();

  const formik = useFormik<FormValues>({
    initialValues: {
      businessName: '',
      businessType: '',
      NEmployee: 0,
      productOrService: '',
      salesChannel: '',
      location: '',
    },
    validate: (values) => Step2BasicInfoValidate(values, tv),
    onSubmit,
  });

  const [productOrService, setProductOrService] = useState('');
  const [salesChannel, setSalesChannel] = useState('');
  const [selectedRadioStep2_1, setSelectedRadioStep2_1] = useState(null);
  const [selectedRadioStep2_2, setSelectedRadioStep2_2] = useState(null);
  const [radioErrorProductOrService, setRadioErrorProductOrService] =
    useState('');
  const [radioErrorSalesChannel, setRadioErrorSalesChannel] = useState('');

  useEffect(() => {
    router.prefetch(ROUTE_PATH.customerGroup);
  }, [router]);

  useEffect(() => {
    if (selectedRadioStep2_1) {
      document.getElementById(selectedRadioStep2_1).click();
    }

    if (selectedRadioStep2_2) {
      document.getElementById(selectedRadioStep2_2).click();
    }
  }, [selectedRadioStep2_1, selectedRadioStep2_2]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (formData[formDataTitle.FORM2_1]) {
      formik.setFieldValue(
        formDataTitle.FORM2_1,
        formData[formDataTitle.FORM2_1].value,
      );
    }

    if (formData[formDataTitle.FORM2_2]) {
      formik.setFieldValue(
        formDataTitle.FORM2_2,
        formData[formDataTitle.FORM2_2].value,
      );
    }
    if (formData[formDataTitle.FORM2_3]) {
      formik.setFieldValue(
        formDataTitle.FORM2_3,
        formData[formDataTitle.FORM2_3].value,
      );
    }
    if (formData[formDataTitle.FORM2_4]) {
      setProductOrService(formData[formDataTitle.FORM2_4].value);
      setSelectedRadioStep2_1(formData[formDataTitle.FORM2_4].id);
      formik.setFieldValue(
        formDataTitle.FORM2_4,
        formData[formDataTitle.FORM2_4].value,
      );
    }
    if (formData[formDataTitle.FORM2_5]) {
      setSalesChannel(formData[formDataTitle.FORM2_5].value);
      setSelectedRadioStep2_2(formData[formDataTitle.FORM2_5].id);
      formik.setFieldValue(
        formDataTitle.FORM2_5,
        formData[formDataTitle.FORM2_5].value,
      );
    }
    if (formData[formDataTitle.FORM2_6]) {
      formik.setFieldValue(
        formDataTitle.FORM2_6,
        formData[formDataTitle.FORM2_6].value,
      );
    }
    const time = performance.now();
    console.log('business-info', time);
  }, []);

  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_2_back_button',
      is_clean_case: isCleanCase,
    });
    router.push(ROUTE_PATH.objective);
  };

  const handleRadioProductOrService = (e) => {
    setProductOrService(e.target.value);
    setSelectedRadioStep2_1(e.target.id);
  };

  const handleDivClickProductOrService = (value, inputId) => {
    setProductOrService(value);
    document.getElementById(inputId).click();
    productOrService && setRadioErrorProductOrService('');
  };

  const handleRadioSalesChannel = (e) => {
    setSalesChannel(e.target.value);
    setSelectedRadioStep2_2(e.target.id);
  };

  const handleDivClickSalesChannel = (value, inputId) => {
    setSalesChannel(value);
    document.getElementById(inputId).click();
    salesChannel && setRadioErrorSalesChannel('');
  };

  const getDivClassesProductOrService = (inputId) => {
    const baseClasses =
      'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
    const selectedClasses =
      'border-sky-300 border-2 transition-colors transition-width transition';
    const deselectedClasses =
      'border-gray-200 border-opacity-50 transition-colors transition-width transition';

    return `${baseClasses} ${selectedRadioStep2_1 === inputId ? selectedClasses : deselectedClasses}`;
  };

  const getDivClassesSalesChannel = (inputId) => {
    const baseClasses =
      'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
    const selectedClasses =
      'border-sky-300 border-2 transition-colors transition-width transition';
    const deselectedClasses =
      'border-gray-200 border-opacity-50 transition-colors transition-width transition';

    return `${baseClasses} ${selectedRadioStep2_2 === inputId ? selectedClasses : deselectedClasses}`;
  };

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);

    if (!productOrService) {
      setRadioErrorProductOrService('Please Select One');
      return;
    }

    if (!salesChannel) {
      setRadioErrorSalesChannel('Please Select One');
      return;
    }
    router.push(ROUTE_PATH.customerGroup);
    setSubmitting(false);
  }

  interface FormValues {
    businessName: string;
    businessType: string;
    NEmployee: number;
    productOrService: string;
    salesChannel: string;
    location: string;
  }

  const isCleanCase = Object.keys(formik.errors).length === 0;
  const handleInputChangeBusinessName = (e) => {
    formik.handleChange(e);
  };
  //handle input change and save to state accordingly for all input
  const handleInputChangeBusinessType = (e) => {
    formik.handleChange(e);
  };

  const handleInputChangeNEmployee = (e) => {
    formik.handleChange(e);
  };

  const handleInputChangeLocation = (e) => {
    formik.handleChange(e);
  };

  useEffect(() => {
    if (!session) {
      event('Step2BasicInfo_component_view', {
        category: 'Component View',
        label: 'Step2BasicInfo Component View',
      });
    }
  }, [session]);

  console.timeEnd('Step1ToStep2:new');
  return (
    <>
      <Navbar fbPixelId={fbPixelId} />
      <motion.div
        key="component-two"
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
                  {t('STEP 2 OF 7')}
                </div>
                <h4 className="">{t('Enter Basic Business Information')}</h4>
                <p>
                  {t('Note: Answer these questions as if you would a person')}
                </p>
                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="businessName" className={styles.label}>
                        {t('Your business name')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('businessName')}
                        type="text"
                        name="businessName"
                        id="businessName"
                        className={`${styles.text_input} ${formik.errors.businessName && formik.touched.businessName ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeBusinessName}
                        page="page_2_basic_info"
                        saveUserData={{
                          id: 'businessName',
                          title: formDataTitle.FORM2_1,
                        }}
                      />
                      {formik.errors.businessName &&
                      formik.touched.businessName ? (
                        <span className="text-rose-400">
                          {formik.errors.businessName as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="businessType" className={styles.label}>
                        {t('Your business description')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('businessType')}
                        type="text"
                        name="businessType"
                        id="businessType"
                        className={`${styles.text_input} ${formik.errors.businessType && formik.touched.businessType ? 'border-rose-400' : 'border-gray-300'}`}
                        placeholder={t(
                          'e.g. hotel / restaurant / online clothing store / Auto Repair / Real Estate Agent',
                        )}
                        onChange={handleInputChangeBusinessType}
                        page="page_2_basic_info"
                        saveUserData={{
                          id: 'businessType',
                          title: formDataTitle.FORM2_2,
                        }}
                      />
                      {formik.errors.businessType &&
                      formik.touched.businessType ? (
                        <span className="text-rose-400">
                          {formik.errors.businessType as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="NEmployee" className={styles.label}>
                        {t('Number of employees')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('NEmployee')}
                        type="number"
                        name="NEmployee"
                        id="NEmployee"
                        className={`${styles.number_input} ${formik.errors.NEmployee && formik.touched.NEmployee ? 'border-rose-400' : 'border-gray-300'}`}
                        onChange={handleInputChangeNEmployee}
                        onWheel={(e) => e.currentTarget.blur()}
                        page="page_2_basic_info"
                        saveUserData={{
                          id: 'NEmployee',
                          title: formDataTitle.FORM2_3,
                        }}
                      />
                      {formik.errors.NEmployee && formik.touched.NEmployee ? (
                        <span className="text-rose-400">
                          {formik.errors.NEmployee as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className={styles.label}>
                        {t('Do you offer a product or service?')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <fieldset className="">
                        <legend className="sr-only">
                          {t('Product or Service')}
                        </legend>
                        <div
                          className={getDivClassesProductOrService('radio-1_1')}
                          onClick={(e) => {
                            handleDivClickProductOrService(
                              'product',
                              'radio-1_1',
                            );
                          }}
                        >
                          <Input
                            id="radio-1_1"
                            type="radio"
                            value="product"
                            name="radio-1"
                            className={styles.radio_input}
                            onChange={handleRadioProductOrService}
                            page="page_2_basic_info"
                            saveUserData={{
                              id: 'radio-1_1',
                              title: formDataTitle.FORM2_4,
                            }}
                          />
                          <label
                            htmlFor="radio-1_1"
                            className={styles.radio_label}
                          >
                            {t('Product')}
                          </label>
                        </div>

                        <div
                          className={getDivClassesProductOrService('radio-1_2')}
                          onClick={(e) => {
                            handleDivClickProductOrService(
                              'service',
                              'radio-1_2',
                            );
                          }}
                        >
                          <Input
                            id="radio-1_2"
                            type="radio"
                            value="service"
                            name="radio-1"
                            className={styles.radio_input}
                            onChange={handleRadioProductOrService}
                            page="page_2_basic_info"
                            saveUserData={{
                              id: 'radio-1_2',
                              title: formDataTitle.FORM2_4,
                            }}
                          />
                          <label
                            htmlFor="bordered-radio-1"
                            className={styles.radio_label}
                          >
                            {t(
                              'Service (retail businesses are considered service)',
                            )}
                          </label>
                        </div>
                        {radioErrorProductOrService && (
                          <span className="text-rose-400">
                            {radioErrorProductOrService}
                          </span>
                        )}
                      </fieldset>
                    </div>

                    <div className="mb-6">
                      <label className={styles.label}>
                        {t('How can customer get your product or service?')}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>
                      <fieldset className="">
                        <legend className="sr-only">
                          {t('Sales Channel')}
                        </legend>

                        <div
                          className={getDivClassesSalesChannel('radio-2_1')}
                          onClick={(e) => {
                            handleDivClickSalesChannel('online', 'radio-2_1');
                          }}
                        >
                          <Input
                            id="radio-2_1"
                            type="radio"
                            value="online"
                            name="radio-2"
                            className={styles.radio_input}
                            onChange={handleRadioSalesChannel}
                            page="page_2_basic_info"
                            saveUserData={{
                              id: 'radio-2_1',
                              title: formDataTitle.FORM2_5,
                            }}
                          />
                          <label
                            htmlFor="radio-2_1"
                            className={styles.radio_label}
                          >
                            {t('Online')}
                          </label>
                        </div>

                        <div
                          className={getDivClassesSalesChannel('radio-2_2')}
                          onClick={(e) => {
                            handleDivClickSalesChannel(
                              'physical location',
                              'radio-2_2',
                            );
                          }}
                        >
                          <Input
                            id="radio-2_2"
                            type="radio"
                            value="physical location"
                            name="radio-2"
                            className={styles.radio_input}
                            onChange={handleRadioSalesChannel}
                            page="page_2_basic_info"
                            saveUserData={{
                              id: 'radio-2_2',
                              title: formDataTitle.FORM2_5,
                            }}
                          />
                          <label
                            htmlFor="bordered-radio-1"
                            className={styles.radio_label}
                          >
                            {t('Physical Location')}
                          </label>
                        </div>

                        <div
                          className={getDivClassesSalesChannel('radio-2_3')}
                          onClick={(e) => {
                            handleDivClickSalesChannel(
                              'online and physical location',
                              'radio-2_3',
                            );
                          }}
                        >
                          <Input
                            id="radio-2_3"
                            type="radio"
                            value="online and physical location"
                            name="radio-2"
                            className={styles.radio_input}
                            onChange={handleRadioSalesChannel}
                            page="page_2_basic_info"
                            saveUserData={{
                              id: 'radio-2_3',
                              title: formDataTitle.FORM2_5,
                            }}
                          />
                          <label
                            htmlFor="bordered-radio-1"
                            className={styles.radio_label}
                          >
                            {t('Both online and physical location')}
                          </label>
                        </div>
                      </fieldset>
                      {radioErrorSalesChannel && (
                        <span className="text-rose-400">
                          {radioErrorSalesChannel}
                        </span>
                      )}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="location" className={styles.label}>
                        {t('Where do you serve your customers?')}
                        <span className="text-sm">{t('(required)')}</span>
                      </label>

                      <Input
                        {...formik.getFieldProps('location')}
                        type="text"
                        name="location"
                        id="location"
                        className={`${styles.text_input} ${formik.errors.location && formik.touched.location ? 'border-rose-400' : 'border-gray-300'}`}
                        placeholder={t(
                          'E.g. New York City, New York/ London, UK / Europe and US',
                        )}
                        onChange={handleInputChangeLocation}
                        page="page_2_basic_info"
                        saveUserData={{
                          id: 'location',
                          title: formDataTitle.FORM2_6,
                        }}
                      />
                      {formik.errors.location && formik.touched.location ? (
                        <span className="text-rose-400">
                          {formik.errors.location as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex flex-col gap-5 justify-center items-center mt-10 ml-auto mr-auto">
                      {(formik.errors.businessName &&
                        formik.touched.businessName) ||
                      (formik.errors.businessType &&
                        formik.touched.businessType) ||
                      (formik.errors.NEmployee && formik.touched.NEmployee) ||
                      radioErrorProductOrService ||
                      radioErrorSalesChannel ||
                      (formik.errors.location && formik.touched.location) ? (
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
                          className={`button back-button w-[110px] white w-button`}
                        >
                          {t('Back')}
                        </button>
                        <button
                          type="submit"
                          className={`button-2 w-[110px] w-button m-auto`}
                          onClick={() => {
                            trackEvent({
                              event_name: 'page_2_next_button',
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
  const fbPixelId = process.env.FB_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'Step2BasicInfo',
        'validate',
        'common',
      ])),
      fbPixelId,
    },
  };
}
