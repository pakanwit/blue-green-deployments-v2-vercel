import React from 'react';
import styles from '../styles/Wizard.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import { RadioGroup } from './radio/radioGroup';
import { Session } from 'next-auth';

interface SurveyProps {
  showSurvey: boolean;
  setShowSurvey: React.Dispatch<React.SetStateAction<boolean>>;
  setSurveyDone?: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session;
  setUpdateUserData?: React.Dispatch<React.SetStateAction<boolean>>;
  secretKey: string;
  isSecondSurvey: boolean;
}
const Survey = ({
  showSurvey,
  setShowSurvey,
  setSurveyDone,
  session,
  setUpdateUserData,
  secretKey,
  isSecondSurvey = false,
}: SurveyProps) => {
  const { t } = useTranslation('Survey');

  const [hasReadPlan, setHasReadPlan] = useState('');
  const [priceThought, setPriceThought] = useState('');
  const [priceRadioStyle, setPriceRadioStyle] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const surveyResult = {
      whatTheyDislike: formData.get('whatTheyDislike'),
      whatTheyLike: formData.get('whatTheyLike'),
      RecScore: parseInt(formData.get('RecScore') as string),
      priceThought: priceThought,
      hasReadPlan: hasReadPlan,
      createdAt: new Date(),
    };

    try {
      const response = await fetch('/api/saveSurvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          email: session.user.email,
          surveyResult,
          isSecondSurvey,
        }),
      });
      if (response.ok) {
        setShowSurvey(false);
        setUpdateUserData((prevState) => !prevState);
      } else {
        console.error('Error saving survey result:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving survey result:', error);
    }

    toggleBodyScroll(false);
    setSurveyDone(true);
  };

  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    toggleBodyScroll(showSurvey);
    return () => toggleBodyScroll(false);
  }, [showSurvey]);

  const handleRadioChangePriceThought = (e) => {
    setPriceThought(e.target.value);
    setPriceRadioStyle(e.target.id);
  };

  const handleDivClickPriceThought = (value, inputId) => {
    setPriceThought(value);
    document.getElementById(inputId).click();
  };

  const getRadioStyles = (inputId) => {
    const baseClasses =
      'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
    const selectedClasses =
      'border-sky-300 border-2 transition-colors transition-width transition-duration-200';
    const deselectedClasses =
      'border-gray-200 border-opacity-50 transition-colors transition-width transition-duration-200';

    return `${baseClasses} ${priceRadioStyle === inputId ? selectedClasses : deselectedClasses}`;
  };

  console.log('priceThought:', priceThought);

  document.addEventListener('wheel', () => {
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLInputElement &&
      activeElement.type === 'number'
    ) {
      activeElement.blur();
    }
  });

  if (!showSurvey) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="h-[80vh] flex items-center justify-center">
        <form
          className="relative p-6 bg-white rounded-xl shadow-lg w-4/5 max-w-md overflow-auto h-[80%] mt-[18vh] md:mt-[8vh]"
          onSubmit={handleSubmit}
        >
          <strong>
            {t(
              isSecondSurvey
                ? 'Now you’ve probably read our plan your feedback now is even more valuable to us'
                : 'Congratulations On Making Your First Plan! Complete Survey and Save',
            )}
          </strong>
          <div className="text-sm">
            {t('Tell us what you think so we can improve our product for you')}
          </div>

          <div className="mb-2">
            <label
              htmlFor="whatTheyDislike"
              className={`${styles.label_sm} block mb-1`}
            >
              {t('What you')} <strong>{t("don't like")}</strong>{' '}
              {t('about your experience? or what you think can be improved?')}
            </label>
            <textarea
              className={`${styles.text_input} w-full h-12 p-2 border border-gray-300 rounded-md`}
              id="whatTheyDislike"
              name="whatTheyDislike"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="whatTheyLike"
              className={`${styles.label_sm} block mb-1`}
            >
              {t('What you')} <strong>{t('liked')}</strong>{' '}
              {t('about your experience?')}
            </label>
            <textarea
              className={`${styles.text_input} w-full h-12 p-2 border border-gray-300 rounded-md`}
              id="whatTheyLike"
              name="whatTheyLike"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="RecScore"
              className={`${styles.label_sm} block mb-1`}
            >
              {t('How likely are you to recommend this product to a friend?')} (
              <span className="text-rose-700">
                <strong className="text-rose-700">1</strong> = {t('Nope')}
              </span>
              ,{' '}
              <span className="text-green-600">
                <strong className="text-green-600">10</strong> ={' '}
                {t('Definitely')}
              </span>
              )
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className={`${styles.number_input} w-1/3 h-12 p-2 border border-gray-300 rounded-md`}
              id="RecScore"
              name="RecScore"
            />
          </div>
          <div>
            <label className="font-normal text-base">
              {t('What do you think about the price?')}
            </label>
            <fieldset className="mb-2">
              <legend className="sr-only">{t('Price Thought')}</legend>

              <div
                className={getRadioStyles('radio-1_1')}
                onClick={() => {
                  handleDivClickPriceThought('very cheap', 'radio-1_1');
                }}
              >
                <input
                  id="radio-1_1"
                  name="radio1"
                  type="radio"
                  value="very cheap"
                  className={styles.radio_input}
                  onChange={handleRadioChangePriceThought}
                />
                <label htmlFor="radio-1_1" className={styles.radio_label}>
                  {t('Very Cheap')}
                </label>
              </div>

              <div
                className={getRadioStyles('radio-1_2')}
                onClick={() => {
                  handleDivClickPriceThought('cheap', 'radio-1_2');
                }}
              >
                <input
                  id="radio-1_2"
                  name="radio1"
                  type="radio"
                  value="cheap"
                  className={styles.radio_input}
                  onChange={handleRadioChangePriceThought}
                />
                <label htmlFor="radio-1_2" className={styles.radio_label}>
                  {t('Cheap')}
                </label>
              </div>

              <div
                className={getRadioStyles('radio-1_3')}
                onClick={() => {
                  handleDivClickPriceThought('fair', 'radio-1_3');
                }}
              >
                <input
                  id="radio-1_3"
                  name="radio1"
                  type="radio"
                  value="fair"
                  className={styles.radio_input}
                  onChange={handleRadioChangePriceThought}
                />
                <label htmlFor="radio-1_3" className={styles.radio_label}>
                  {t('Fair')}
                </label>
              </div>

              <div
                className={getRadioStyles('radio-1_4')}
                onClick={() => {
                  handleDivClickPriceThought('expensive', 'radio-1_4');
                }}
              >
                <input
                  id="radio-1_4"
                  name="radio1"
                  type="radio"
                  value="expensive"
                  className={styles.radio_input}
                  onChange={handleRadioChangePriceThought}
                />
                <label htmlFor="radio-1_4" className={styles.radio_label}>
                  {t('Expensive')}
                </label>
              </div>

              <div
                className={getRadioStyles('radio-1_5')}
                onClick={() => {
                  handleDivClickPriceThought('very expensive', 'radio-1_5');
                }}
              >
                <input
                  id="radio-1_5"
                  name="radio1"
                  type="radio"
                  value="very expensive"
                  className={styles.radio_input}
                  onChange={handleRadioChangePriceThought}
                />
                <label htmlFor="radio-1_5" className={styles.radio_label}>
                  {t('Very Expensive')}
                </label>
              </div>
            </fieldset>
          </div>
          <div className="mb-10">
            <label className="font-normal text-base">
              {t('Have you read any plan created by 15minuteplan.ai?')}
            </label>
            <RadioGroup
              options={[
                {
                  label: t('I’ve read almost all of any plan'),
                  value: 'I’ve read almost all of any plan',
                },
                {
                  label: t('I’ve partially read any plan'),
                  value: 'I’ve partially read any plan',
                },
                {
                  label: t('I haven’t read any plan'),
                  value: 'I haven’t read any plan',
                },
              ]}
              selectedOption={hasReadPlan}
              onOptionChange={(value) => setHasReadPlan(value)}
            />
          </div>
          <div className="flex justify-center items-center mt-3 mb-3">
            <button type="submit" className="button">
              {t('Submit & Save File')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Survey;
