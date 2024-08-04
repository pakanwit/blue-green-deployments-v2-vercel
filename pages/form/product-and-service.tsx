import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import { event } from 'nextjs-google-analytics';
import { AiOutlineUndo } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MoonLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import FadeAnimation from '../../components/animations/fadeAnimation';
import Step4ProductValidate from '../../utils/Step4ProductValidate';
import styles from '../../styles/Wizard.module.css';
import trackEvent from '../../utils/trackEvent';
import Input from '../../components/input';
import { API_KEY_HEADER } from '../api/constants';
import { formDataTitle } from '../../constants/formTitle';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar';
import { useLoadFormData } from '../../hooks/useLoadFormData';
import { ROUTE_PATH } from '../../constants/path';
import useBeforeUnload from '../../hooks/useBeforeUnload';

interface FormValues {
  productName1: string;
  productName2: string;
  productName3: string;
  productName4: string;
  productName5: string;

  productDescription1: string;
  productDescription2: string;
  productDescription3: string;
  productDescription4: string;
  productDescription5: string;
}

export default function Step4Product({ fbPixelId, secretKey }) {
  const { t } = useTranslation('Step4Product');
  const { t: tv } = useTranslation('validate');
  const { data: session } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      productName1: '',
      productName2: '',
      productName3: '',
      productName4: '',
      productName5: '',

      productDescription1: '',
      productDescription2: '',
      productDescription3: '',
      productDescription4: '',
      productDescription5: '',
    },
    validate: (values) => Step4ProductValidate(values, tv),
    onSubmit,
  });
  const {
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
  } = useLoadFormData();

  const isCleanCase = Object.keys(formik.errors).length === 0;

  useEffect(() => {
    router.prefetch(ROUTE_PATH.successDrivers);
  }, [router]);

  useBeforeUnload();

  useEffect(() => {
    window.scrollTo(0, 0);
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (formData[formDataTitle.FORM4_1]) {
      formik.setFieldValue(
        formDataTitle.FORM4_1,
        formData[formDataTitle.FORM4_1].value,
      );
    }
    if (formData[formDataTitle.FORM4_2]) {
      formik.setFieldValue(
        formDataTitle.FORM4_2,
        formData[formDataTitle.FORM4_2].value,
      );
    }
    if (formData[formDataTitle.FORM4_3]) {
      formik.setFieldValue(
        formDataTitle.FORM4_3,
        formData[formDataTitle.FORM4_3].value,
      );
    }
    if (formData[formDataTitle.FORM4_4]) {
      formik.setFieldValue(
        formDataTitle.FORM4_4,
        formData[formDataTitle.FORM4_4].value,
      );
    }
    if (formData[formDataTitle.FORM4_5]) {
      formik.setFieldValue(
        formDataTitle.FORM4_5,
        formData[formDataTitle.FORM4_5].value,
      );
    }
    if (formData[formDataTitle.FORM4_6]) {
      formik.setFieldValue(
        formDataTitle.FORM4_6,
        formData[formDataTitle.FORM4_6].value,
      );
    }
    if (formData[formDataTitle.FORM4_7]) {
      formik.setFieldValue(
        formDataTitle.FORM4_7,
        formData[formDataTitle.FORM4_7].value,
      );
    }
    if (formData[formDataTitle.FORM4_8]) {
      formik.setFieldValue(
        formDataTitle.FORM4_8,
        formData[formDataTitle.FORM4_8].value,
      );
    }
    if (formData[formDataTitle.FORM4_9]) {
      formik.setFieldValue(
        formDataTitle.FORM4_9,
        formData[formDataTitle.FORM4_9].value,
      );
    }
    if (formData[formDataTitle.FORM4_10]) {
      formik.setFieldValue(
        formDataTitle.FORM4_10,
        formData[formDataTitle.FORM4_10].value,
      );
    }
  }, []);

  useEffect(() => {
    if (!session) {
      event('Step4Product_component_view', {
        category: 'Component View',
        label: 'Step4Product Component View',
      });
    }
  }, [session]);

  async function onSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) {
    setSubmitting(true);
    router.push(ROUTE_PATH.successDrivers);
    setSubmitting(false);
  }
  const [productName1Clicked, setProductName1Clicked] = useState(false);
  const [productName2Clicked, setProductName2Clicked] = useState(false);
  const [productName3Clicked, setProductName3Clicked] = useState(false);
  const [productName4Clicked, setProductName4Clicked] = useState(false);
  const [productName5Clicked, setProductName5Clicked] = useState(false);

  const [productName1ShowSuggestion, setProductName1ShowSuggestion] =
    useState(false);
  const [productName2ShowSuggestion, setProductName2ShowSuggestion] =
    useState(false);
  const [productName3ShowSuggestion, setProductName3ShowSuggestion] =
    useState(false);
  const [productName4ShowSuggestion, setProductName4ShowSuggestion] =
    useState(false);
  const [productName5ShowSuggestion, setProductName5ShowSuggestion] =
    useState(false);

  const handleInputChangeProductName1 = (event) => {
    setProductName1Clicked(true);
    setProductName1ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductName2 = (event) => {
    setProductName2Clicked(true);
    setProductName2ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductName3 = (event) => {
    setProductName3Clicked(true);
    setProductName3ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductName4 = (event) => {
    setProductName4Clicked(true);
    setProductName4ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductName5 = (event) => {
    setProductName5Clicked(true);
    setProductName5ShowSuggestion(true);
    formik.handleChange(event);
  };

  const [productDescription1Clicked, setProductDescription1Clicked] =
    useState(false);
  const [productDescription2Clicked, setProductDescription2Clicked] =
    useState(false);
  const [productDescription3Clicked, setProductDescription3Clicked] =
    useState(false);
  const [productDescription4Clicked, setProductDescription4Clicked] =
    useState(false);
  const [productDescription5Clicked, setProductDescription5Clicked] =
    useState(false);

  const [
    productDescription1ShowSuggestion,
    setProductDescription1ShowSuggestion,
  ] = useState(false);
  const [
    productDescription2ShowSuggestion,
    setProductDescription2ShowSuggestion,
  ] = useState(false);
  const [
    productDescription3ShowSuggestion,
    setProductDescription3ShowSuggestion,
  ] = useState(false);
  const [
    productDescription4ShowSuggestion,
    setProductDescription4ShowSuggestion,
  ] = useState(false);
  const [
    productDescription5ShowSuggestion,
    setProductDescription5ShowSuggestion,
  ] = useState(false);

  const handleInputChangeProductDescription1 = (event) => {
    setProductDescription1Clicked(true);
    setProductDescription1ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductDescription2 = (event) => {
    setProductDescription2Clicked(true);
    setProductDescription2ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductDescription3 = (event) => {
    setProductDescription3Clicked(true);
    setProductDescription3ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductDescription4 = (event) => {
    setProductDescription4Clicked(true);
    setProductDescription4ShowSuggestion(true);
    formik.handleChange(event);
  };

  const handleInputChangeProductDescription5 = (event) => {
    setProductDescription5Clicked(true);
    setProductDescription5ShowSuggestion(true);
    formik.handleChange(event);
  };
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_4_back_button',
      is_clean_case: isCleanCase,
    });
    router.push(ROUTE_PATH.customerGroup);
  };

  const [suggestionsProductName1, setSuggestionsProductName1] = useState([]);
  const [suggestionsProductName2, setSuggestionsProductName2] = useState([]);
  const [suggestionsProductName3, setSuggestionsProductName3] = useState([]);
  const [suggestionsProductName4, setSuggestionsProductName4] = useState([]);
  const [suggestionsProductName5, setSuggestionsProductName5] = useState([]);
  const [suggestionLoadingProductName1, setSuggestionLoadingProductName1] =
    useState(false);
  const [suggestionLoadingProductName2, setSuggestionLoadingProductName2] =
    useState(false);
  const [suggestionLoadingProductName3, setSuggestionLoadingProductName3] =
    useState(false);
  const [suggestionLoadingProductName4, setSuggestionLoadingProductName4] =
    useState(false);
  const [suggestionLoadingProductName5, setSuggestionLoadingProductName5] =
    useState(false);
  const [suggestionErrorProductName1, setSuggestionErrorProductName1] =
    useState(false);
  const [suggestionErrorProductName2, setSuggestionErrorProductName2] =
    useState(false);
  const [suggestionErrorProductName3, setSuggestionErrorProductName3] =
    useState(false);
  const [suggestionErrorProductName4, setSuggestionErrorProductName4] =
    useState(false);
  const [suggestionErrorProductName5, setSuggestionErrorProductName5] =
    useState(false);

  const [suggestionsProductDescription1, setSuggestionsProductDescription1] =
    useState([]);
  const [suggestionsProductDescription2, setSuggestionsProductDescription2] =
    useState([]);
  const [suggestionsProductDescription3, setSuggestionsProductDescription3] =
    useState([]);
  const [suggestionsProductDescription4, setSuggestionsProductDescription4] =
    useState([]);
  const [suggestionsProductDescription5, setSuggestionsProductDescription5] =
    useState([]);
  const [
    suggestionLoadingProductDescription1,
    setSuggestionLoadingProductDescription1,
  ] = useState(false);
  const [
    suggestionLoadingProductDescription2,
    setSuggestionLoadingProductDescription2,
  ] = useState(false);
  const [
    suggestionLoadingProductDescription3,
    setSuggestionLoadingProductDescription3,
  ] = useState(false);
  const [
    suggestionLoadingProductDescription4,
    setSuggestionLoadingProductDescription4,
  ] = useState(false);
  const [
    suggestionLoadingProductDescription5,
    setSuggestionLoadingProductDescription5,
  ] = useState(false);
  const [
    suggestionErrorProductDescription1,
    setSuggestionErrorProductDescription1,
  ] = useState(false);
  const [
    suggestionErrorProductDescription2,
    setSuggestionErrorProductDescription2,
  ] = useState(false);
  const [
    suggestionErrorProductDescription3,
    setSuggestionErrorProductDescription3,
  ] = useState(false);
  const [
    suggestionErrorProductDescription4,
    setSuggestionErrorProductDescription4,
  ] = useState(false);
  const [
    suggestionErrorProductDescription5,
    setSuggestionErrorProductDescription5,
  ] = useState(false);

  const callCounterProductName = useRef(0);
  const callTimeoutProductName = useRef(null);
  const pendingExecutionProductName = useRef(null);

  async function getSuggestionProductName(id, retryCount = 0) {
    const variantID =
      typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';

    callCounterProductName.current += 1;

    if (callCounterProductName.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounterProductName.current = 0;

      // Clear global timeout if it exists
      if (callTimeoutProductName.current) {
        clearTimeout(callTimeoutProductName.current);
        callTimeoutProductName.current = null;
      }

      // Cancel pending execution
      if (pendingExecutionProductName.current) {
        clearTimeout(pendingExecutionProductName.current);
        pendingExecutionProductName.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeoutProductName.current) {
      callTimeoutProductName.current = setTimeout(() => {
        callCounterProductName.current = 0;
        callTimeoutProductName.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecutionProductName.current = setTimeout(async () => {
      try {
        if (id === '1') {
          setSuggestionErrorProductName1(false);
          setSuggestionLoadingProductName1(true);
        } else if (id === '2') {
          setSuggestionErrorProductName2(false);
          setSuggestionLoadingProductName2(true);
        } else if (id === '3') {
          setSuggestionErrorProductName3(false);
          setSuggestionLoadingProductName3(true);
        } else if (id === '4') {
          setSuggestionErrorProductName4(false);
          setSuggestionLoadingProductName4(true);
        } else if (id === '5') {
          setSuggestionErrorProductName5(false);
          setSuggestionLoadingProductName5(true);
        }

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep4SuggestionsProductName',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              [API_KEY_HEADER]: secretKey,
            },
            body: JSON.stringify({
              businessName: businessName,
              businessType: businessType,
              NEmployee: NEmployee,
              location: location,
              productOrService: productOrService,
              salesChannel: salesChannel,

              customerDescription1: customerDescription1,
              customerDescription2: customerDescription2,
              customerDescription3: customerDescription3,
              customerIncome1: customerIncome1,
              customerIncome2: customerIncome2,
              customerIncome3: customerIncome3,

              productName1: formik.values.productName1,
              productName2: formik.values.productName2,
              productName3: formik.values.productName3,
              productName4: formik.values.productName4,
              productName5: formik.values.productName5,
              productDescription1: formik.values.productDescription1,
              productDescription2: formik.values.productDescription2,
              productDescription3: formik.values.productDescription3,
              productDescription4: formik.values.productDescription4,
              productDescription5: formik.values.productDescription5,

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
        const productNamesArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', productNamesArr);

          // Check for non-alphanumeric characters
          const hasNonAlphanumeric = productNamesArr.some((name) =>
            /[^a-z0-9\s-'&]/i.test(name),
          );
          if (hasNonAlphanumeric) {
            // Retry if we have not already retried too many times
            if (retryCount < 5) {
              // adjust the retry limit as needed
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionProductName(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }

          if (id === '1') {
            setSuggestionsProductName1(productNamesArr);
            setSuggestionLoadingProductName1(false);
          } else if (id === '2') {
            setSuggestionsProductName2(productNamesArr);
            setSuggestionLoadingProductName2(false);
          } else if (id === '3') {
            setSuggestionsProductName3(productNamesArr);
            setSuggestionLoadingProductName3(false);
          } else if (id === '4') {
            setSuggestionsProductName4(productNamesArr);
            setSuggestionLoadingProductName4(false);
          } else if (id === '5') {
            setSuggestionsProductName5(productNamesArr);
            setSuggestionLoadingProductName5(false);
          }
        } else {
          console.log('Error fetching suggestions', productNamesArr);

          if (id === '1') {
            setSuggestionErrorProductName1(true);
          } else if (id === '2') {
            setSuggestionErrorProductName2(true);
          } else if (id === '3') {
            setSuggestionErrorProductName3(true);
          } else if (id === '4') {
            setSuggestionErrorProductName4(true);
          } else if (id === '5') {
            setSuggestionErrorProductName5(true);
          }
        }
      } catch (error) {
        console.error(error);

        if (id === '1') {
          setSuggestionErrorProductName1(true);
        } else if (id === '2') {
          setSuggestionErrorProductName2(true);
        } else if (id === '3') {
          setSuggestionErrorProductName3(true);
        } else if (id === '4') {
          setSuggestionErrorProductName4(true);
        } else if (id === '5') {
          setSuggestionErrorProductName5(true);
        }
      }
      pendingExecutionProductName.current = null;
    }, 50);
  }

  const callCounterProductDescription = useRef(0);
  const callTimeoutProductDescription = useRef(null);
  const pendingExecutionProductDescription = useRef(null);

  const { i18n } = useTranslation();
  const locale = i18n.language;

  async function getSuggestionProductDescription(id, retryCount = 0) {
    const variantID =
      typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';

    console.log('getSuggestionProductDescription called id: ', id);
    callCounterProductDescription.current += 1;

    if (callCounterProductDescription.current >= 2) {
      console.log(
        'Function called more than once rapidly. Cancelling all calls...',
      );

      // Reset global counter
      callCounterProductDescription.current = 0;

      // Clear global timeout if it exists
      if (callTimeoutProductDescription.current) {
        clearTimeout(callTimeoutProductDescription.current);
        callTimeoutProductDescription.current = null;
      }

      // Cancel pending execution
      if (pendingExecutionProductDescription.current) {
        clearTimeout(pendingExecutionProductDescription.current);
        pendingExecutionProductDescription.current = null;
      }

      return; // Exit the function early
    }

    // Set a global timeout to reset the counter after 100ms
    if (!callTimeoutProductDescription.current) {
      callTimeoutProductDescription.current = setTimeout(() => {
        callCounterProductDescription.current = 0;
        callTimeoutProductDescription.current = null;
      }, 100);
    }

    // Delay the actual function logic by 50ms to see if another call comes in rapidly
    pendingExecutionProductDescription.current = setTimeout(async () => {
      try {
        if (id === '1') {
          setSuggestionErrorProductDescription1(false);
          setSuggestionLoadingProductDescription1(true);
        } else if (id === '2') {
          setSuggestionErrorProductDescription2(false);
          setSuggestionLoadingProductDescription2(true);
        } else if (id === '3') {
          setSuggestionErrorProductDescription3(false);
          setSuggestionLoadingProductDescription3(true);
        } else if (id === '4') {
          setSuggestionErrorProductDescription4(false);
          setSuggestionLoadingProductDescription4(true);
        } else if (id === '5') {
          setSuggestionErrorProductDescription5(false);
          setSuggestionLoadingProductDescription5(true);
        }

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep4SuggestionsProductDescription',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              [API_KEY_HEADER]: secretKey,
            },
            body: JSON.stringify({
              businessName: businessName,
              businessType: businessType,
              NEmployee: NEmployee,
              location: location,
              productOrService: productOrService,
              salesChannel: salesChannel,

              customerDescription1: customerDescription1,
              customerDescription2: customerDescription2,
              customerDescription3: customerDescription3,
              customerIncome1: customerIncome1,
              customerIncome2: customerIncome2,
              customerIncome3: customerIncome3,

              productName1: formik.values.productName1,
              productName2: formik.values.productName2,
              productName3: formik.values.productName3,
              productName4: formik.values.productName4,
              productName5: formik.values.productName5,
              productDescription1: formik.values.productDescription1,
              productDescription2: formik.values.productDescription2,
              productDescription3: formik.values.productDescription3,
              productDescription4: formik.values.productDescription4,
              productDescription5: formik.values.productDescription5,
              id,
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
        const productDescriptionsArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', productDescriptionsArr);

          // Check for non-alphanumeric characters
          const hasNonAlphanumeric = productDescriptionsArr.some((name) =>
            /[^a-z0-9\s-.,']/i.test(name),
          );
          if (hasNonAlphanumeric) {
            // Retry if we have not already retried too many times
            if (retryCount < 5) {
              // adjust the retry limit as needed
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionProductDescription(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }

          if (id === '1') {
            setSuggestionsProductDescription1(productDescriptionsArr);
            setSuggestionLoadingProductDescription1(false);
          } else if (id === '2') {
            setSuggestionsProductDescription2(productDescriptionsArr);
            setSuggestionLoadingProductDescription2(false);
          } else if (id === '3') {
            setSuggestionsProductDescription3(productDescriptionsArr);
            setSuggestionLoadingProductDescription3(false);
          } else if (id === '4') {
            setSuggestionsProductDescription4(productDescriptionsArr);
            setSuggestionLoadingProductDescription4(false);
          } else if (id === '5') {
            setSuggestionsProductDescription5(productDescriptionsArr);
            setSuggestionLoadingProductDescription5(false);
          }
        } else {
          console.log('Error fetching suggestions', productDescriptionsArr);

          if (id === '1') {
            setSuggestionErrorProductDescription1(true);
          } else if (id === '2') {
            setSuggestionErrorProductDescription2(true);
          } else if (id === '3') {
            setSuggestionErrorProductDescription3(true);
          } else if (id === '4') {
            setSuggestionErrorProductDescription4(true);
          } else if (id === '5') {
            setSuggestionErrorProductDescription5(true);
          }
        }
      } catch (error) {
        console.error(error);

        if (id === '1') {
          setSuggestionErrorProductDescription1(true);
        } else if (id === '2') {
          setSuggestionErrorProductDescription2(true);
        } else if (id === '3') {
          setSuggestionErrorProductDescription3(true);
        } else if (id === '4') {
          setSuggestionErrorProductDescription4(true);
        } else if (id === '5') {
          setSuggestionErrorProductDescription5(true);
        }
      }
      pendingExecutionProductDescription.current = null;
    }, 50);
  }
  const [productName1AlreadyClicked, setProductName1AlreadyClicked] =
    useState(false);
  const [productName2AlreadyClicked, setProductName2AlreadyClicked] =
    useState(false);
  const [productName3AlreadyClicked, setProductName3AlreadyClicked] =
    useState(false);
  const [productName4AlreadyClicked, setProductName4AlreadyClicked] =
    useState(false);
  const [productName5AlreadyClicked, setProductName5AlreadyClicked] =
    useState(false);

  useEffect(() => {
    if (
      productName1Clicked &&
      !productName1AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductName('1');
      setProductName1Clicked(false);
      setProductName1AlreadyClicked(true);
    }
  }, [productName1Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productName2Clicked &&
      !productName2AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductName('2');
      setProductName2Clicked(false);
      setProductName2AlreadyClicked(true);
    }
  }, [productName2Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productName3Clicked &&
      !productName3AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductName('3');
      setProductName3Clicked(false);
      setProductName3AlreadyClicked(true);
    }
  }, [productName3Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productName4Clicked &&
      !productName4AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductName('4');
      setProductName4Clicked(false);
      setProductName4AlreadyClicked(true);
    }
  }, [productName4Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productName5Clicked &&
      !productName5AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductName('5');
      setProductName5Clicked(false);
      setProductName5AlreadyClicked(true);
    }
  }, [productName5Clicked, formik.isSubmitting]);

  const handleSuggestionClickProductName1 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productName1',
      value: suggestion,
    });
    formik.setFieldValue('productName1', suggestion, true);
  };
  const handleSuggestionClickProductName2 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productName2',
      value: suggestion,
    });
    formik.setFieldValue('productName2', suggestion, true);
  };
  const handleSuggestionClickProductName3 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productName3',
      value: suggestion,
    });
    formik.setFieldValue('productName3', suggestion, true);
  };
  const handleSuggestionClickProductName4 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productName4',
      value: suggestion,
    });
    formik.setFieldValue('productName4', suggestion, true);
  };
  const handleSuggestionClickProductName5 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productName5',
      value: suggestion,
    });
    formik.setFieldValue('productName5', suggestion, true);
  };

  const [
    productDescription1AlreadyClicked,
    setProductDescription1AlreadyClicked,
  ] = useState(false);
  const [
    productDescription2AlreadyClicked,
    setProductDescription2AlreadyClicked,
  ] = useState(false);
  const [
    productDescription3AlreadyClicked,
    setProductDescription3AlreadyClicked,
  ] = useState(false);
  const [
    productDescription4AlreadyClicked,
    setProductDescription4AlreadyClicked,
  ] = useState(false);
  const [
    productDescription5AlreadyClicked,
    setProductDescription5AlreadyClicked,
  ] = useState(false);

  useEffect(() => {
    if (
      productDescription1Clicked &&
      !productDescription1AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductDescription('1');
      setProductDescription1Clicked(false);
      setProductDescription1AlreadyClicked(true);
    }
  }, [productDescription1Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productDescription2Clicked &&
      !productDescription2AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductDescription('2');
      setProductDescription2Clicked(false);
      setProductDescription2AlreadyClicked(true);
    }
  }, [productDescription2Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productDescription3Clicked &&
      !productDescription3AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductDescription('3');
      setProductDescription3Clicked(false);
      setProductDescription3AlreadyClicked(true);
    }
  }, [productDescription3Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productDescription4Clicked &&
      !productDescription4AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductDescription('4');
      setProductDescription4Clicked(false);
      setProductDescription4AlreadyClicked(true);
    }
  }, [productDescription4Clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      productDescription5Clicked &&
      !productDescription5AlreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionProductDescription('5');
      setProductDescription5Clicked(false);
      setProductDescription5AlreadyClicked(true);
    }
  }, [productDescription5Clicked, formik.isSubmitting]);

  const handleSuggestionClickProductDescription1 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productDescription1',
      value: suggestion,
    });
    formik.setFieldValue('productDescription1', suggestion, true);
  };
  const handleSuggestionClickProductDescription2 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productDescription2',
      value: suggestion,
    });
    formik.setFieldValue('productDescription2', suggestion, true);
  };
  const handleSuggestionClickProductDescription3 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productDescription3',
      value: suggestion,
    });
    formik.setFieldValue('productDescription3', suggestion, true);
  };
  const handleSuggestionClickProductDescription4 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productDescription4',
      value: suggestion,
    });
    formik.setFieldValue('productDescription4', suggestion, true);
  };
  const handleSuggestionClickProductDescription5 = (suggestion) => {
    trackEvent({
      event_name: 'page_4_suggestions',
      related_field_id: 'productDescription5',
      value: suggestion,
    });
    formik.setFieldValue('productDescription5', suggestion, true);
  };

  function handleOnFocusProductName1(event) {
    handleInputChangeProductName1(event);
    formik.setFieldTouched('productName1', true, false);
  }
  function handleOnFocusProductName2(event) {
    handleInputChangeProductName2(event);
    formik.setFieldTouched('productName2', true, false);
  }
  function handleOnFocusProductName3(event) {
    handleInputChangeProductName3(event);
    formik.setFieldTouched('productName3', true, false);
  }
  function handleOnFocusProductName4(event) {
    handleInputChangeProductName4(event);
    formik.setFieldTouched('productName4', true, false);
  }
  function handleOnFocusProductName5(event) {
    handleInputChangeProductName5(event);
    formik.setFieldTouched('productName5', true, false);
  }
  function handleOnFocusProductDescription1(event) {
    handleInputChangeProductDescription1(event);
    formik.setFieldTouched('productDescription1', true, false);
  }
  function handleOnFocusProductDescription2(event) {
    handleInputChangeProductDescription2(event);
    formik.setFieldTouched('productDescription2', true, false);
  }
  function handleOnFocusProductDescription3(event) {
    handleInputChangeProductDescription3(event);
    formik.setFieldTouched('productDescription3', true, false);
  }
  function handleOnFocusProductDescription4(event) {
    handleInputChangeProductDescription4(event);
    formik.setFieldTouched('productDescription4', true, false);
  }
  function handleOnFocusProductDescription5(event) {
    handleInputChangeProductDescription5(event);
    formik.setFieldTouched('productDescription5', true, false);
  }

  return (
    <>
      <Navbar fbPixelId={fbPixelId} />
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
                  {t('STEP 4 OF 7')}
                </div>
                <h4 className="">{t('Enter Product or Service Details')}</h4>
                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <h5>
                      {t('Product or Service 1')}
                      <span className="text-lg"> {t('(required)')}</span>
                    </h5>
                    <hr className="mb-3" />

                    <div className="mb-3">
                      <label htmlFor="productName1" className={styles.label}>
                        {t('Product or Service 1 Name')}
                        <span className="text-sm"> {t('(required)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productName1')}
                        type="text"
                        name="productName1"
                        id="productName1"
                        className={`${styles.text_input} ${formik.errors.productName1 && formik.touched.productName1 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductName1}
                        onFocus={handleOnFocusProductName1}
                        onBlur={() => formik.validateField('productName1')}
                        page="page_4_product"
                        saveUserData={{
                          id: 'productName1',
                          title: formDataTitle.FORM4_1,
                        }}
                      />
                      {formik.errors.productName1 &&
                      formik.touched.productName1 ? (
                        <span className="text-rose-400">
                          {formik.errors.productName1 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}

                      {productName1ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductName1 &&
                            !suggestionErrorProductName1 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName1(
                                      suggestionsProductName1[0],
                                    )
                                  }
                                >
                                  {suggestionsProductName1[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName1(
                                      suggestionsProductName1[1],
                                    )
                                  }
                                >
                                  {suggestionsProductName1[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName1(
                                      suggestionsProductName1[2],
                                    )
                                  }
                                >
                                  {suggestionsProductName1[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName1(
                                      suggestionsProductName1[3],
                                    )
                                  }
                                >
                                  {suggestionsProductName1[3]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName1(
                                      suggestionsProductName1[4],
                                    )
                                  }
                                >
                                  {suggestionsProductName1[4]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductName1 &&
                            !suggestionErrorProductName1 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductName1 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionProductName('1')}
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
                      <label
                        htmlFor="productDescription1"
                        className={styles.label}
                      >
                        {t('Product or Service 1 Description')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productDescription1')}
                        type="text"
                        name="productDescription1"
                        id="productDescription1"
                        className={`${styles.text_input} ${formik.errors.productDescription1 && formik.touched.productDescription1 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductDescription1}
                        onFocus={handleOnFocusProductDescription1}
                        onBlur={() =>
                          formik.validateField('productDescription1')
                        }
                        page="page_4_product"
                        saveUserData={{
                          id: 'productDescription1',
                          title: formDataTitle.FORM4_2,
                        }}
                      />
                      {formik.errors.productDescription1 &&
                      formik.touched.productDescription1 ? (
                        <span className="text-rose-400">
                          {formik.errors.productDescription1 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productDescription1ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductDescription1 &&
                            !suggestionErrorProductDescription1 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription1(
                                      suggestionsProductDescription1[0],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription1[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription1(
                                      suggestionsProductDescription1[1],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription1[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription1(
                                      suggestionsProductDescription1[2],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription1[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductDescription1 &&
                            !suggestionErrorProductDescription1 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductDescription1 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionProductDescription('1')
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

                    {/* ---------------------------------------------------- */}

                    <h5>
                      {t('Product or Service 2')}
                      <span className="text-lg"> {t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />

                    <div className="mb-3">
                      <label htmlFor="productName2" className={styles.label}>
                        {t('Product or Service 2 Name')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productName2')}
                        type="text"
                        name="productName2"
                        id="productName2"
                        className={`${styles.text_input} ${formik.errors.productName2 && formik.touched.productName2 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductName2}
                        onFocus={handleOnFocusProductName2}
                        onBlur={() => formik.validateField('productName2')}
                        page="page_4_product"
                        saveUserData={{
                          id: 'productName2',
                          title: formDataTitle.FORM4_3,
                        }}
                      />
                      {formik.errors.productName2 &&
                      formik.touched.productName2 ? (
                        <span className="text-rose-400">
                          {formik.errors.productName2 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productName2ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductName2 &&
                            !suggestionErrorProductName2 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName2(
                                      suggestionsProductName2[0],
                                    )
                                  }
                                >
                                  {suggestionsProductName2[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName2(
                                      suggestionsProductName2[1],
                                    )
                                  }
                                >
                                  {suggestionsProductName2[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName2(
                                      suggestionsProductName2[2],
                                    )
                                  }
                                >
                                  {suggestionsProductName2[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName2(
                                      suggestionsProductName2[3],
                                    )
                                  }
                                >
                                  {suggestionsProductName2[3]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName2(
                                      suggestionsProductName2[4],
                                    )
                                  }
                                >
                                  {suggestionsProductName2[4]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductName2 &&
                            !suggestionErrorProductName2 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductName2 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionProductName('2')}
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
                      <label
                        htmlFor="productDescription2"
                        className={styles.label}
                      >
                        {t('Product or Service 2 Description')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productDescription2')}
                        type="text"
                        name="productDescription2"
                        id="productDescription2"
                        className={`${styles.text_input} ${formik.errors.productDescription2 && formik.touched.productDescription2 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductDescription2}
                        onFocus={handleOnFocusProductDescription2}
                        onBlur={() =>
                          formik.validateField('productDescription2')
                        }
                        page="page_4_product"
                        saveUserData={{
                          id: 'productDescription2',
                          title: formDataTitle.FORM4_4,
                        }}
                      />
                      {formik.errors.productDescription2 &&
                      formik.touched.productDescription2 ? (
                        <span className="text-rose-400">
                          {formik.errors.productDescription2 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productDescription2ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductDescription2 &&
                            !suggestionErrorProductDescription2 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription2(
                                      suggestionsProductDescription2[0],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription2[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription2(
                                      suggestionsProductDescription2[1],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription2[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription2(
                                      suggestionsProductDescription2[2],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription2[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductDescription2 &&
                            !suggestionErrorProductDescription2 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductDescription2 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionProductDescription('2')
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

                    {/* ---------------------------------------------------- */}

                    <h5>
                      {t('Product or Service 3')}
                      <span className="text-lg"> {t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />

                    <div className="mb-3">
                      <label htmlFor="productName3" className={styles.label}>
                        {t('Product or Service 3 Name')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productName3')}
                        type="text"
                        name="productName3"
                        id="productName3"
                        className={`${styles.text_input} ${formik.errors.productName3 && formik.touched.productName3 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductName3}
                        onFocus={handleOnFocusProductName3}
                        onBlur={() => formik.validateField('productName3')}
                        page="page_4_product"
                        saveUserData={{
                          id: 'productName3',
                          title: formDataTitle.FORM4_5,
                        }}
                      />
                      {formik.errors.productName3 &&
                      formik.touched.productName3 ? (
                        <span className="text-rose-400">
                          {formik.errors.productName3 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productName3ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductName3 &&
                            !suggestionErrorProductName3 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName3(
                                      suggestionsProductName3[0],
                                    )
                                  }
                                >
                                  {suggestionsProductName3[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName3(
                                      suggestionsProductName3[1],
                                    )
                                  }
                                >
                                  {suggestionsProductName3[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName3(
                                      suggestionsProductName3[2],
                                    )
                                  }
                                >
                                  {suggestionsProductName3[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName3(
                                      suggestionsProductName3[3],
                                    )
                                  }
                                >
                                  {suggestionsProductName3[3]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName3(
                                      suggestionsProductName3[4],
                                    )
                                  }
                                >
                                  {suggestionsProductName3[4]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductName3 &&
                            !suggestionErrorProductName3 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductName3 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionProductName('3')}
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
                      <label
                        htmlFor="productDescription3"
                        className={styles.label}
                      >
                        {t('Product or Service 3 Description')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productDescription3')}
                        type="text"
                        name="productDescription3"
                        id="productDescription3"
                        className={`${styles.text_input} ${formik.errors.productDescription3 && formik.touched.productDescription3 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductDescription3}
                        onFocus={handleOnFocusProductDescription3}
                        onBlur={() =>
                          formik.validateField('productDescription3')
                        }
                        page="page_4_product"
                        saveUserData={{
                          id: 'productDescription3',
                          title: formDataTitle.FORM4_6,
                        }}
                      />
                      {formik.errors.productDescription3 &&
                      formik.touched.productDescription3 ? (
                        <span className="text-rose-400">
                          {formik.errors.productDescription3 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productDescription3ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductDescription3 &&
                            !suggestionErrorProductDescription3 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription3(
                                      suggestionsProductDescription3[0],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription3[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription3(
                                      suggestionsProductDescription3[1],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription3[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription3(
                                      suggestionsProductDescription3[2],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription3[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductDescription3 &&
                            !suggestionErrorProductDescription3 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductDescription3 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionProductDescription('3')
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

                    {/* ---------------------------------------------------- */}

                    <h5>
                      {t('Product or Service 4')}
                      <span className="text-lg"> {t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />

                    <div className="mb-3">
                      <label htmlFor="productName4" className={styles.label}>
                        {t('Product or Service 4 Name')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productName4')}
                        type="text"
                        name="productName4"
                        id="productName4"
                        className={`${styles.text_input} ${formik.errors.productName4 && formik.touched.productName4 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductName4}
                        onFocus={handleOnFocusProductName4}
                        onBlur={() => formik.validateField('productName4')}
                        page="page_4_product"
                        saveUserData={{
                          id: 'productName4',
                          title: formDataTitle.FORM4_7,
                        }}
                      />
                      {formik.errors.productName4 &&
                      formik.touched.productName4 ? (
                        <span className="text-rose-400">
                          {formik.errors.productName4 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productName4ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductName4 &&
                            !suggestionErrorProductName4 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName4(
                                      suggestionsProductName4[0],
                                    )
                                  }
                                >
                                  {suggestionsProductName4[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName4(
                                      suggestionsProductName4[1],
                                    )
                                  }
                                >
                                  {suggestionsProductName4[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName4(
                                      suggestionsProductName4[2],
                                    )
                                  }
                                >
                                  {suggestionsProductName4[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName4(
                                      suggestionsProductName4[3],
                                    )
                                  }
                                >
                                  {suggestionsProductName4[3]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName4(
                                      suggestionsProductName4[4],
                                    )
                                  }
                                >
                                  {suggestionsProductName4[4]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductName4 &&
                            !suggestionErrorProductName4 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductName4 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionProductName('4')}
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
                      <label
                        htmlFor="productDescription4"
                        className={styles.label}
                      >
                        {t('Product or Service 4 Description')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productDescription4')}
                        type="text"
                        name="productDescription4"
                        id="productDescription4"
                        className={`${styles.text_input} ${formik.errors.productDescription4 && formik.touched.productDescription4 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductDescription4}
                        onFocus={handleOnFocusProductDescription4}
                        onBlur={() =>
                          formik.validateField('productDescription4')
                        }
                        page="page_4_product"
                        saveUserData={{
                          id: 'productDescription4',
                          title: formDataTitle.FORM4_8,
                        }}
                      />
                      {formik.errors.productDescription4 &&
                      formik.touched.productDescription4 ? (
                        <span className="text-rose-400">
                          {formik.errors.productDescription4 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productDescription4ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductDescription4 &&
                            !suggestionErrorProductDescription4 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription4(
                                      suggestionsProductDescription4[0],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription4[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription4(
                                      suggestionsProductDescription4[1],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription4[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription4(
                                      suggestionsProductDescription4[2],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription4[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductDescription4 &&
                            !suggestionErrorProductDescription4 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductDescription4 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionProductDescription('4')
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

                    {/* ---------------------------------------------------- */}

                    <h5>
                      {t('Product or Service 5')}
                      <span className="text-lg"> {t('(optional)')}</span>
                    </h5>
                    <hr className="mb-3" />

                    <div className="mb-3">
                      <label htmlFor="productName5" className={styles.label}>
                        {t('Product or Service 5 Name')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productName5')}
                        type="text"
                        name="productName5"
                        id="productName5"
                        className={`${styles.text_input} ${formik.errors.productName5 && formik.touched.productName5 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductName5}
                        onFocus={handleOnFocusProductName5}
                        onBlur={() => formik.validateField('productName5')}
                        page="page_4_product"
                        saveUserData={{
                          id: 'productName5',
                          title: formDataTitle.FORM4_9,
                        }}
                      />
                      {formik.errors.productName5 &&
                      formik.touched.productName5 ? (
                        <span className="text-rose-400">
                          {formik.errors.productName5 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productName5ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductName5 &&
                            !suggestionErrorProductName5 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName5(
                                      suggestionsProductName5[0],
                                    )
                                  }
                                >
                                  {suggestionsProductName5[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName5(
                                      suggestionsProductName5[1],
                                    )
                                  }
                                >
                                  {suggestionsProductName5[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName5(
                                      suggestionsProductName5[2],
                                    )
                                  }
                                >
                                  {suggestionsProductName5[2]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName5(
                                      suggestionsProductName5[3],
                                    )
                                  }
                                >
                                  {suggestionsProductName5[3]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductName5(
                                      suggestionsProductName5[4],
                                    )
                                  }
                                >
                                  {suggestionsProductName5[4]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductName5 &&
                            !suggestionErrorProductName5 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductName5 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() => getSuggestionProductName('5')}
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
                      <label
                        htmlFor="productDescription5"
                        className={styles.label}
                      >
                        {t('Product or Service 5 Description')}
                        <span className="text-sm"> {t('(optional)')}</span>
                      </label>
                      <Input
                        {...formik.getFieldProps('productDescription5')}
                        type="text"
                        name="productDescription5"
                        id="productDescription5"
                        className={`${styles.text_input} ${formik.errors.productDescription5 && formik.touched.productDescription5 ? 'border-rose-400' : 'border-gray-300'} `}
                        onChange={handleInputChangeProductDescription5}
                        onFocus={handleOnFocusProductDescription5}
                        onBlur={() =>
                          formik.validateField('productDescription5')
                        }
                        page="page_4_product"
                        saveUserData={{
                          id: 'productDescription5',
                          title: formDataTitle.FORM4_10,
                        }}
                      />
                      {formik.errors.productDescription5 &&
                      formik.touched.productDescription5 ? (
                        <span className="text-rose-400">
                          {formik.errors.productDescription5 as React.ReactNode}
                        </span>
                      ) : (
                        <></>
                      )}
                      {productDescription5ShowSuggestion ? (
                        <FadeAnimation>
                          <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                            {!suggestionLoadingProductDescription5 &&
                            !suggestionErrorProductDescription5 ? (
                              <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription5(
                                      suggestionsProductDescription5[0],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription5[0]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription5(
                                      suggestionsProductDescription5[1],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription5[1]}
                                </button>
                                <button
                                  className="button-suggestion"
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClickProductDescription5(
                                      suggestionsProductDescription5[2],
                                    )
                                  }
                                >
                                  {suggestionsProductDescription5[2]}
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}

                            {suggestionLoadingProductDescription5 &&
                            !suggestionErrorProductDescription5 ? (
                              <div className="m-auto mt-3 mb-3">
                                <MoonLoader size={20} />
                              </div>
                            ) : (
                              <></>
                            )}
                            {suggestionErrorProductDescription5 && (
                              <div className="text-rose-400 text-center">
                                {t('Error, please regenerate again')}
                              </div>
                            )}
                            <div className="flex gap-4 justify-center">
                              <button
                                type="button"
                                className="button-regenerate flex gap-2"
                                onClick={() =>
                                  getSuggestionProductDescription('5')
                                }
                              >
                                <AiOutlineUndo size={20} />{' '}
                                <div
                                  className="font-normal"
                                  onClick={() => {
                                    trackEvent({
                                      event_name:
                                        'page_4_regenerate_suggestions',
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

                    {/* ---------------------------------------------------- */}

                    <div className="flex flex-col gap-5 justify-center items-center mt-10 ml-auto mr-auto">
                      {(formik.errors.productName1 &&
                        formik.touched.productName1) ||
                      (formik.errors.productDescription1 &&
                        formik.touched.productDescription1) ||
                      (formik.errors.productName2 &&
                        formik.touched.productName2) ||
                      (formik.errors.productDescription2 &&
                        formik.touched.productDescription2) ||
                      (formik.errors.productName3 &&
                        formik.touched.productName3) ||
                      (formik.errors.productDescription3 &&
                        formik.touched.productDescription3) ||
                      (formik.errors.productName4 &&
                        formik.touched.productName4) ||
                      (formik.errors.productDescription4 &&
                        formik.touched.productDescription4) ||
                      (formik.errors.productName5 &&
                        formik.touched.productName5) ||
                      (formik.errors.productDescription5 &&
                        formik.touched.productDescription5) ? (
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
                              event_name: 'page_4_next_button',
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
      ...(await serverSideTranslations(locale, ['Step4Product', 'validate'])),
      secretKey,
      fbPixelId,
      // Will be passed to the page component as props
    },
  };
}
