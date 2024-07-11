import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import Step6InitialInvestmentValidate from '../utils/Step6InitialInvestmentValidate';
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
import {
  InvestmentItems,
  InvestmentFormValues,
} from '../types/step6InitialInvestment.type';

// function to check if the value is in the formDataTitle object
const getFormDataTitleByValue = (value) => {
  const key = Object.keys(formDataTitle).find(
    (key) => formDataTitle[key] === value,
  );
  if (!key) {
    return '';
  }
  return value;
};

export const mapPlanCurrency = {
  usd: {
    text: 'USD ($)',
    symbol: '$',
  },
  eur: {
    text: 'EUR (€)',
    symbol: '€',
  },
  gbp: {
    text: 'GBP (£)',
    symbol: '£',
  },
  aud: {
    text: 'AUD (A$)',
    symbol: 'A$',
  },
  zar: {
    text: 'ZAR (R)',
    symbol: 'R',
  },
  cad: {
    text: 'CAD (C$)',
    symbol: 'C$',
  },
  nzd: {
    text: 'NZD (NZ$)',
    symbol: 'NZ$',
  },
  sek: {
    text: 'SEK (kr)',
    symbol: 'kr',
  },
  inr: {
    text: 'INR (₹)',
    symbol: '₹',
  },
  aed: {
    text: 'AED (د.إ)',
    symbol: 'د.إ',
  },
  dkk: {
    text: 'DKK (kr)',
    symbol: 'kr',
  },
  nok: {
    text: 'NOK (kr)',
    symbol: 'kr',
  },
  kwd: {
    text: 'KWD (د.ك)',
    symbol: 'د.ك',
  },
  qar: {
    text: 'QAR (ر.ق)',
    symbol: 'ر.ق',
  },
  bhd: {
    text: '.د.ب',
    symbol: '.د.ب',
  },
  sar: {
    text: 'SAR (ر.س)',
    symbol: 'ر.س',
  },
  jpy: {
    text: 'JPY (¥)',
    symbol: '¥',
  },
  other: {
    text: 'Other',
    symbol: ' ',
  },
  currency: {
    text: 'Currency',
    symbol: '',
  },
};

export const getNumberOfInput = (investmentItems: InvestmentItems) => {
  let numberOfInput = 3;
  for (let i = 0; i < 10; i++) {
    if (investmentItems[i].itemName || investmentItems[i].amount) {
      numberOfInput = i + 1;
    }
  }
  return numberOfInput < 3 ? 3 : numberOfInput;
};

export default function Step6InitialInvestment({
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

  setInvestmentItem1,
  setInvestmentAmountItem1,

  setInvestmentItem2,
  setInvestmentAmountItem2,

  setInvestmentItem3,
  setInvestmentAmountItem3,

  setInvestmentItem4,
  setInvestmentAmountItem4,

  setInvestmentItem5,
  setInvestmentAmountItem5,

  setInvestmentItem6,
  setInvestmentAmountItem6,

  setInvestmentItem7,
  setInvestmentAmountItem7,

  setInvestmentItem8,
  setInvestmentAmountItem8,

  setInvestmentItem9,
  setInvestmentAmountItem9,

  setInvestmentItem10,
  setInvestmentAmountItem10,
  setInitialInvestmentAmount,
  handleNextFormik,
  handleBack,
  isSession,

  successFactors1,
  successFactors2,
  successFactors3,
  weakness1,
  weakness2,
  weakness3,
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

  planCurrency,
  setPlanCurrency,
  planCurrencySymbol,
  setPlanCurrencySymbol,
  secretKey,
}) {
  const handleBackButton = () => {
    trackEvent({
      event_name: 'page_6_back_button',
      is_clean_case: isCleanCase,
    });
    handleBack();
  };

  const { t } = useTranslation('Step6InitialInvestment');
  const [numberOfInput, setNumberOfInput] = useState([]);

  const [suggestionAndPropertyItems, setSuggestionAndPropertyItems] = useState(
    {},
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // create a variable that com

  document.addEventListener('wheel', () => {
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLInputElement &&
      activeElement.type === 'number'
    ) {
      activeElement.blur();
    }
  });

  async function onSubmit(
    values: InvestmentFormValues,
    { setSubmitting }: FormikHelpers<InvestmentFormValues>,
  ) {
    console.log('values:', values);
    setSubmitting(true);
    setInvestmentItem1(values.investmentItems[0].itemName);
    setInvestmentAmountItem1(values.investmentItems[0].amount || 0);

    setInvestmentItem2(values.investmentItems[1].itemName);
    setInvestmentAmountItem2(values.investmentItems[1].amount || 0);

    setInvestmentItem3(values.investmentItems[2].itemName);
    setInvestmentAmountItem3(values.investmentItems[2].amount || 0);

    setInvestmentItem4(values.investmentItems[3].itemName);
    setInvestmentAmountItem4(values.investmentItems[3].amount || 0);

    setInvestmentItem5(values.investmentItems[4].itemName);
    setInvestmentAmountItem5(values.investmentItems[4].amount || 0);

    setInvestmentItem6(values.investmentItems[5].itemName);
    setInvestmentAmountItem6(values.investmentItems[5].amount || 0);

    setInvestmentItem7(values.investmentItems[6].itemName);
    setInvestmentAmountItem7(values.investmentItems[6].amount || 0);

    setInvestmentItem8(values.investmentItems[7].itemName);
    setInvestmentAmountItem8(values.investmentItems[7].amount || 0);

    setInvestmentItem9(values.investmentItems[8].itemName);
    setInvestmentAmountItem9(values.investmentItems[8].amount || 0);

    setInvestmentItem10(values.investmentItems[9].itemName);
    setInvestmentAmountItem10(values.investmentItems[9].amount || 0);

    handleNextFormik();
    setSubmitting(false);
  }

  const formik = useFormik<InvestmentFormValues>({
    initialValues: {
      investmentItems: {
        0: {
          itemName: investmentItem1,
          amount: investmentAmountItem1,
          formattedAmount: investmentAmountItem1
            ? new Intl.NumberFormat().format(investmentAmountItem1)
            : '',
        },
        1: {
          itemName: investmentItem2,
          amount: investmentAmountItem2,
          formattedAmount: investmentAmountItem2
            ? new Intl.NumberFormat().format(investmentAmountItem2)
            : '',
        },
        2: {
          itemName: investmentItem3,
          amount: investmentAmountItem3,
          formattedAmount: investmentAmountItem3
            ? new Intl.NumberFormat().format(investmentAmountItem3)
            : '',
        },
        3: {
          itemName: investmentItem4,
          amount: investmentAmountItem4,
          formattedAmount: investmentAmountItem4
            ? new Intl.NumberFormat().format(investmentAmountItem4)
            : '',
        },
        4: {
          itemName: investmentItem5,
          amount: investmentAmountItem5,
          formattedAmount: investmentAmountItem5
            ? new Intl.NumberFormat().format(investmentAmountItem5)
            : '',
        },
        5: {
          itemName: investmentItem6,
          amount: investmentAmountItem6,
          formattedAmount: investmentAmountItem6
            ? new Intl.NumberFormat().format(investmentAmountItem6)
            : '',
        },
        6: {
          itemName: investmentItem7,
          amount: investmentAmountItem7,
          formattedAmount: investmentAmountItem7
            ? new Intl.NumberFormat().format(investmentAmountItem7)
            : '',
        },
        7: {
          itemName: investmentItem8,
          amount: investmentAmountItem8,
          formattedAmount: investmentAmountItem8
            ? new Intl.NumberFormat().format(investmentAmountItem8)
            : '',
        },
        8: {
          itemName: investmentItem9,
          amount: investmentAmountItem9,
          formattedAmount: investmentAmountItem9
            ? new Intl.NumberFormat().format(investmentAmountItem9)
            : '',
        },
        9: {
          itemName: investmentItem10,
          amount: investmentAmountItem10,
          formattedAmount: investmentAmountItem10
            ? new Intl.NumberFormat().format(investmentAmountItem10)
            : '',
        },
      },
      planCurrency: planCurrency,
    },
    validate: (values) => Step6InitialInvestmentValidate(values, t),
    onSubmit,
  });
  useEffect(() => {
    setNumberOfInput(
      Array.from(Array(getNumberOfInput(formik.values.investmentItems)).keys()),
    );
  }, [formik.values.investmentItems]);

  const isCleanCase = Object.keys(formik.errors).length === 0;
  const totalInvestments = useMemo(
    () =>
      Object.values(formik.values.investmentItems).reduce(
        (total, item) => total + (item?.amount || 0),
        0,
      ),
    [formik.values.investmentItems],
  );
  const formattedTotalInvestments = useMemo(
    () => new Intl.NumberFormat().format(totalInvestments),
    [totalInvestments],
  );

  useEffect(() => {
    setInitialInvestmentAmount(totalInvestments);
  }, [totalInvestments]);

  const handleInvestmentAmountItemChange = (e, index) => {
    const numericValue = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    const formattedValue = numericValue
      ? new Intl.NumberFormat().format(numericValue)
      : '';
    formik.setFieldValue(`investmentItems[${index}].amount`, numericValue);
    formik.setFieldValue(
      `investmentItems[${index}].formattedAmount`,
      formattedValue,
    );
  };

  const handleInputChangeInvestmentItem = (e, index) => {
    formik.setFieldValue(`investmentItems[${index}].itemName`, e.target.value);
  };

  useEffect(() => {
    if (!isSession) {
      event('Step5InitialInvestment_component_view', {
        category: 'Component View',
        label: 'Step5InitialInvestment Component View',
      });
    }
  }, []);

  const callCounterInvestmentItem = useRef(0);
  const callTimeoutInvestmentItem = useRef(null);
  const pendingExecutionInvestmentItem = useRef(null);

  const { i18n } = useTranslation();
  const locale = i18n.language;

  async function getSuggestionInvestmentItem(id, retryCount = 0) {
    console.log('getSuggestionInvestmentItem called id: ', id);
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
          [id - 1]: {
            ...prev[id - 1],
            loading: true,
            error: false,
          },
        }));

        const responsePromise = fetch(
          '/api/inputSuggestion/getStep6SuggestionsInvestmentItem',
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

              investmentItem1: formik.values.investmentItems[0].itemName,
              investmentItem2: formik.values.investmentItems[1].itemName,
              investmentItem3: formik.values.investmentItems[2].itemName,
              investmentItem4: formik.values.investmentItems[3].itemName,
              investmentItem5: formik.values.investmentItems[4].itemName,
              investmentItem6: formik.values.investmentItems[5].itemName,
              investmentItem7: formik.values.investmentItems[6].itemName,
              investmentItem8: formik.values.investmentItems[7].itemName,
              investmentItem9: formik.values.investmentItems[8].itemName,
              investmentItem10: formik.values.investmentItems[9].itemName,

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
        const investmentItemArr = await response.json();

        if (response.ok) {
          console.log('Success fetching suggestions:', investmentItemArr);

          const hasNonAlphanumeric = investmentItemArr.some((name) =>
            /[^a-z0-9\s-.,'&]/i.test(name),
          );
          if (hasNonAlphanumeric) {
            if (retryCount < 5) {
              console.log('Retrying due to non-alphanumeric character...');
              return getSuggestionInvestmentItem(id, retryCount + 1);
            } else {
              console.log(
                'Reached retry limit, using suggestions with non-alphanumeric characters',
              );
            }
          }
          setSuggestionAndPropertyItems((prev) => ({
            ...prev,
            [id - 1]: {
              ...prev[id - 1],
              loading: false,
              items: investmentItemArr,
            },
          }));
        } else {
          console.log('Error fetching suggestions', investmentItemArr);
          setSuggestionAndPropertyItems((prev) => ({
            ...prev,
            [id - 1]: {
              ...prev[id - 1],
              error: true,
            },
          }));
        }
      } catch (error) {
        console.error(error);
        setSuggestionAndPropertyItems((prev) => ({
          ...prev,
          [id - 1]: {
            ...suggestionAndPropertyItems[id - 1],
            error: true,
          },
        }));
      }
      pendingExecutionInvestmentItem.current = null;
    }, 50);
  }
  const handleSuggestionClickInvestmentItem = (suggestion, index) => {
    trackEvent({
      event_name: 'page_6_suggestions',
      related_field_id: `investmentItem${index}`,
      value: suggestion,
    });
    formik.setFieldValue(
      `investmentItems[${index}].itemName`,
      suggestion,
      true,
    );
  };

  useEffect(() => {
    if (
      suggestionAndPropertyItems[0]?.clicked &&
      !suggestionAndPropertyItems[0]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('1');
      setSuggestionAndPropertyItems((prev) => ({
        ...prev,
        [0]: {
          ...prev[0],
          clicked: false,
          alreadyClicked: true,
        },
      }));
    }
  }, [suggestionAndPropertyItems[0]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[1]?.clicked &&
      !suggestionAndPropertyItems[1]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('2');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [1]: {
          ...suggestionAndPropertyItems[1],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[1]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[2]?.clicked &&
      !suggestionAndPropertyItems[2]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('3');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [2]: {
          ...suggestionAndPropertyItems[2],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[2]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[3]?.clicked &&
      !suggestionAndPropertyItems[3]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('4');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [3]: {
          ...suggestionAndPropertyItems[3],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[3]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[4]?.clicked &&
      !suggestionAndPropertyItems[4]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('5');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [4]: {
          ...suggestionAndPropertyItems[4],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[4]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[5]?.clicked &&
      !suggestionAndPropertyItems[5]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('6');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [5]: {
          ...suggestionAndPropertyItems[5],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[5]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[6]?.clicked &&
      !suggestionAndPropertyItems[6]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('7');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [6]: {
          ...suggestionAndPropertyItems[6],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[6]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[7]?.clicked &&
      !suggestionAndPropertyItems[7]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('8');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [7]: {
          ...suggestionAndPropertyItems[7],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[7]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[8]?.clicked &&
      !suggestionAndPropertyItems[8]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('9');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [8]: {
          ...suggestionAndPropertyItems[8],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[8]?.clicked, formik.isSubmitting]);

  useEffect(() => {
    if (
      suggestionAndPropertyItems[9]?.clicked &&
      !suggestionAndPropertyItems[9]?.alreadyClicked &&
      !formik.isSubmitting
    ) {
      getSuggestionInvestmentItem('10');
      setSuggestionAndPropertyItems({
        ...suggestionAndPropertyItems,
        [9]: {
          ...suggestionAndPropertyItems[9],
          clicked: false,
          alreadyClicked: true,
        },
      });
    }
  }, [suggestionAndPropertyItems[9]?.clicked, formik.isSubmitting]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTextCurrency, setSelectedTextCurrency] = useState('Currency');

  const toggleDropdown = () => {
    trackEvent({
      event_name: 'page_6_currency_button',
      is_clean_case: isCleanCase,
    });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    if (formData[formDataTitle.FORM6_1]) {
      const value = formData[formDataTitle.FORM6_1].value;
      setPlanCurrency(value);
      const planCurrencyValue = value || mapPlanCurrency.currency;
      setPlanCurrencySymbol(
        mapPlanCurrency[planCurrencyValue].symbol ||
          mapPlanCurrency.currency.symbol,
      );
      setSelectedTextCurrency(
        mapPlanCurrency[planCurrencyValue].text ||
          mapPlanCurrency.currency.symbol,
      );
      formik.setFieldValue('planCurrency', value);
    }
  }, []);

  // for currency
  useEffect(() => {
    switch (planCurrency) {
      case 'usd':
        setSelectedTextCurrency(mapPlanCurrency.usd.text);
        break;
      case 'eur':
        setSelectedTextCurrency(mapPlanCurrency.eur.text);
        break;
      case 'gbp':
        setSelectedTextCurrency(mapPlanCurrency.gbp.text);
        break;
      case 'aud':
        setSelectedTextCurrency(mapPlanCurrency.aud.text);
        break;
      case 'zar':
        setSelectedTextCurrency(mapPlanCurrency.zar.text);
        break;
      case 'cad':
        setSelectedTextCurrency(mapPlanCurrency.cad.text);
        break;
      case 'nzd':
        setSelectedTextCurrency(mapPlanCurrency.nzd.text);
        break;
      case 'sek':
        setSelectedTextCurrency(mapPlanCurrency.sek.text);
        break;
      case 'inr':
        setSelectedTextCurrency(mapPlanCurrency.inr.text);
        break;
      case 'aed':
        setSelectedTextCurrency(mapPlanCurrency.aed.text);
        break;
      case 'dkk':
        setSelectedTextCurrency(mapPlanCurrency.dkk.text);
        break;
      case 'nok':
        setSelectedTextCurrency(mapPlanCurrency.nok.text);
        break;
      case 'kwd':
        setSelectedTextCurrency(mapPlanCurrency.kwd.text);
        break;
      case 'qar':
        setSelectedTextCurrency(mapPlanCurrency.qar.text);
        break;
      case 'bhd':
        setSelectedTextCurrency(mapPlanCurrency.bhd.text);
        break;
      case 'sar':
        setSelectedTextCurrency(mapPlanCurrency.sar.text);
        break;
      case 'jpy':
        setSelectedTextCurrency(mapPlanCurrency.jpy.text);
        break;

      case 'other':
        setSelectedTextCurrency(mapPlanCurrency.other.text);
        break;
      default:
        setSelectedTextCurrency('Currency');
    }
  }, [planCurrency, selectedTextCurrency]);

  const handleItemClickCurrency = (text) => {
    console.log('text:', text);
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    formData[formDataTitle.FORM6_1] = {
      id: 'dropdownDefaultButton',
      value: text,
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    switch (text) {
      case 'usd':
        setPlanCurrency('usd');
        formik.setFieldValue('planCurrency', 'usd');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'eur':
        setPlanCurrency('eur');
        formik.setFieldValue('planCurrency', 'eur');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'gbp':
        setPlanCurrency('gbp');
        formik.setFieldValue('planCurrency', 'gbp');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'aud':
        setPlanCurrency('aud');
        formik.setFieldValue('planCurrency', 'aud');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'zar':
        setPlanCurrency('zar');
        formik.setFieldValue('planCurrency', 'zar');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'cad':
        setPlanCurrency('cad');
        formik.setFieldValue('planCurrency', 'cad');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'nzd':
        setPlanCurrency('nzd');
        formik.setFieldValue('planCurrency', 'nzd');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'sek':
        setPlanCurrency('sek');
        formik.setFieldValue('planCurrency', 'sek');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'inr':
        setPlanCurrency('inr');
        formik.setFieldValue('planCurrency', 'inr');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'aed':
        setPlanCurrency('aed');
        formik.setFieldValue('planCurrency', 'aed');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'dkk':
        setPlanCurrency('dkk');
        formik.setFieldValue('planCurrency', 'dkk');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'nok':
        setPlanCurrency('nok');
        formik.setFieldValue('planCurrency', 'nok');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'kwd':
        setPlanCurrency('kwd');
        formik.setFieldValue('planCurrency', 'kwd');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'qar':
        setPlanCurrency('qar');
        formik.setFieldValue('planCurrency', 'qar');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'bhd':
        setPlanCurrency('bhd');
        formik.setFieldValue('planCurrency', 'bhd');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'sar':
        setPlanCurrency('sar');
        formik.setFieldValue('planCurrency', 'sar');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;
      case 'jpy':
        setPlanCurrency('jpy');
        formik.setFieldValue('planCurrency', 'jpy');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(mapPlanCurrency[text].symbol);
        break;

      case 'other':
        setPlanCurrency('other');
        formik.setFieldValue('planCurrency', 'other');
        setSelectedTextCurrency(mapPlanCurrency[text].text);
        setPlanCurrencySymbol(' ');
        break;
    }

    setIsOpen(false);
  };

  //log formik.errors
  useEffect(() => {
    console.log('formik.errors:', formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    console.log('planCurrency:', planCurrency);
    console.log('planCurrencySymbol:', planCurrencySymbol);
  }, [planCurrency, planCurrencySymbol]);

  const handleOnFocusInvestmentItem = (index) => {
    // getSuggestionInvestmentItem(index + 1);
    setSuggestionAndPropertyItems((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        isShowSuggestion: true,
        clicked: true,
      },
    }));
  };

  const handleAddInvestmentItem = () => {
    setNumberOfInput((prev) => [...prev, prev.length]);
  };

  return (
    <>
      <motion.div
        key="component-five"
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
                  {t('STEP 6 OF 7')}
                </div>
                <h4 className="">
                  {t('Enter Currency and Initial Investment Details')}
                  <span className="text-lg">
                    {t('(for businesses investing in something)')}
                  </span>
                </h4>

                <div className="form-block-started w-form">
                  <form className="form-started" onSubmit={formik.handleSubmit}>
                    <div className="flex gap-5 mb-5">
                      <div className="text-lg">
                        {t('Select plan currency')}{' '}
                        <span className="text-sm">{t('(required)')}</span>
                      </div>
                      <div className="relative">
                        <button
                          id="dropdownDefaultButton"
                          data-dropdown-toggle="dropdown"
                          className="text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-800"
                          type="button"
                          onClick={toggleDropdown}
                        >
                          {selectedTextCurrency}
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
                          className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-opacity duration-300 ${isOpen ? 'opacity-100 visibility-visible pointer-events-auto' : 'opacity-0 visibility-hidden pointer-events-none'}`}
                        >
                          {isOpen && (
                            <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('usd')}
                              >
                                {t('USD ($)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('eur')}
                              >
                                {t('EUR (€)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('gbp')}
                              >
                                {t('GBP (£)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('aud')}
                              >
                                {t('AUD (A$)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('zar')}
                              >
                                {t('ZAR (R)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('cad')}
                              >
                                {t('CAD (C$)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('nzd')}
                              >
                                {t('NZD (NZ$)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('sek')}
                              >
                                {t('SEK (kr)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('jpy')}
                              >
                                {t('JPY (¥)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('aed')}
                              >
                                {t('AED (د.إ)')}
                              </div>

                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('dkk')}
                              >
                                {t('DKK (kr)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('nok')}
                              >
                                {t('NOK (kr)')}
                              </div>

                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('inr')}
                              >
                                {t('INR (₹)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('kwd')}
                              >
                                {t('KWD (د.ك)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('qar')}
                              >
                                {t('QAR (ر.ق)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('bhd')}
                              >
                                {t('BHD (.د.ب)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('sar')}
                              >
                                {t('SAR (ر.س)')}
                              </div>
                              <div
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleItemClickCurrency('other')}
                              >
                                {t('Other')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="w-full" />
                    {formik.errors.planCurrency && (
                      <div className="text-rose-400">
                        {t('Please select currency')}
                      </div>
                    )}

                    <div className="mb-3">
                      <p>
                        {t(
                          "Note: If your business sells a physical product, don't include the cost of making or buying the first batch of product in your initial investment. You should list this expense under 'Cost of Goods Sold (COGS)' on the next page",
                        )}
                      </p>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="" className={styles.label}>
                        {t('What will you spend your initial investment on?')}
                      </label>
                      <hr />
                    </div>

                    {/* first line -----------------------------------*/}
                    <div
                      className={`${styles.grid_head} ${styles.lower_height}`}
                    >
                      <div></div>
                      <div className="">
                        <label
                          htmlFor="initialInvestmentAmount"
                          className={styles.grid_label}
                        >
                          {t('Investment Item')}{' '}
                          <span className="text-sm">{t('(optional)')}</span>
                        </label>
                        <hr />
                      </div>
                      <div className="">
                        <label
                          htmlFor="initialInvestmentAmount"
                          className={styles.grid_label}
                        >
                          {t('Investment Amount')}
                        </label>
                        <hr />
                      </div>
                    </div>
                    {numberOfInput.map((_item, index) => (
                      <div key={`investmentItems[${index}]`}>
                        <div className={styles.flex_container1}>
                          <div
                            className={` ${styles.label} ${styles.flex_child1}`}
                          >
                            {t(`${index + 1}`)}
                          </div>
                          <div className={`${styles.flex_child2}`}>
                            <Input
                              {...formik.getFieldProps(
                                `investmentItems[${index}].itemName`,
                              )}
                              type="text"
                              name={`investmentItem${index + 1}`}
                              id={`investmentItem${index + 1}`}
                              className={`padl ${styles.text_input}  ${formik.errors.investmentItems?.[index]?.itemName ? 'border-rose-400' : 'border-gray-300'} `}
                              onChange={(e) =>
                                handleInputChangeInvestmentItem(e, index)
                              }
                              onFocus={() => handleOnFocusInvestmentItem(index)}
                              onBlur={() =>
                                formik.validateField(
                                  `investmentItems[${index}].itemName`,
                                )
                              }
                              page="page_6_initial_investment"
                              saveUserData={{
                                id: `investmentItem${index + 1}`,
                                title: getFormDataTitleByValue(
                                  `investmentItem${index + 1}`,
                                ),
                              }}
                            />
                          </div>
                          {formik.errors.investmentItems?.[index]?.itemName && (
                            <span className="text-rose-400">
                              {
                                formik.errors.investmentItems[index]
                                  .itemName as React.ReactNode
                              }
                            </span>
                          )}

                          <div className={`${styles.flex_child3}`}>
                            <div className="relative ">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                {planCurrencySymbol}
                              </div>
                              <Input
                                {...formik.getFieldProps(
                                  `investmentItems[${index}].amount`,
                                )}
                                type="text"
                                value={
                                  formik.values.investmentItems[index]
                                    ?.formattedAmount
                                }
                                onChange={(e) =>
                                  handleInvestmentAmountItemChange(e, index)
                                }
                                name={`investmentAmountItem${index + 1}`}
                                id={`investmentAmountItem${index + 1}`}
                                className={`${planCurrencySymbol.length > 1 ? styles.padl12 : styles.padl} ${styles.grid_cash} ${formik.errors.investmentItems?.[index]?.amount ? 'border-rose-400' : 'border-gray-300'}`}
                                page="page_6_initial_investment"
                                saveUserData={{
                                  id: `investmentAmountItem${index + 1}`,
                                  title: getFormDataTitleByValue(
                                    `investmentAmountItem${index + 1}`,
                                  ),
                                  isCurrency: true,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {suggestionAndPropertyItems[index]
                          ?.isShowSuggestion && (
                          <FadeAnimation>
                            <div className={styles.flex_container_suggestion}>
                              <div className="flex flex-col gap-4 mt-2 mb-6 flex-wrap">
                                {!suggestionAndPropertyItems[index]?.loading &&
                                  !suggestionAndPropertyItems[index]?.error && (
                                    <div className="flex gap-4 mb-2 flex-wrap justify-center">
                                      {suggestionAndPropertyItems[
                                        index
                                      ]?.items?.map((suggestion) => (
                                        <button
                                          className="button-suggestion"
                                          type="button"
                                          key={suggestion}
                                          onClick={() =>
                                            handleSuggestionClickInvestmentItem(
                                              suggestion,
                                              index,
                                            )
                                          }
                                        >
                                          {suggestion}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                {suggestionAndPropertyItems[index]?.loading &&
                                  !suggestionAndPropertyItems[index]?.error && (
                                    <div className="m-auto mt-3 mb-3">
                                      <MoonLoader size={20} />
                                    </div>
                                  )}
                                {suggestionAndPropertyItems[index]?.error && (
                                  <div className="text-rose-400 text-center">
                                    {t('Error, please regenerate again')}
                                  </div>
                                )}
                                <div className="flex gap-4 justify-center">
                                  <button
                                    type="button"
                                    className="button-regenerate flex gap-2"
                                    onClick={() =>
                                      getSuggestionInvestmentItem(index + 1)
                                    }
                                  >
                                    <AiOutlineUndo size={20} />{' '}
                                    <div
                                      className="font-normal"
                                      onClick={() => {
                                        trackEvent({
                                          event_name:
                                            'page_6_regenerate_suggestions',
                                          related_field_id: '',
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
                        )}
                      </div>
                    ))}
                    <hr />
                    {numberOfInput.length < 10 && (
                      <div className="flex justify-center m-8">
                        <button
                          type="button"
                          onClick={handleAddInvestmentItem}
                          className="button back-button white w-button"
                        >
                          {t('addNewInvestmentItem')}
                        </button>
                      </div>
                    )}
                    <div className="text-center font-bold text-2xl">
                      {t('Total Initial Investment')}: {planCurrencySymbol}{' '}
                      {formattedTotalInvestments}
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-center mt-8 ml-auto mr-auto">
                      {formik.errors.planCurrency && (
                        <div className="text-rose-400">
                          {t('Please select currency')}
                        </div>
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
                              event_name: 'page_6_next_button',
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
