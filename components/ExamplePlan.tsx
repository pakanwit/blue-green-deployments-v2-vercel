import React from 'react';
import { useEffect } from 'react';
import { event } from 'nextjs-google-analytics';
import { useTranslation } from 'next-i18next';
import Starter_1en from './examplePlans/starter_1en';
import Starter_2de from './examplePlans/starter_2de';
import Starter_3fr from './examplePlans/starter_3fr';
import Starter_4es from './examplePlans/starter_4es';
import Starter_5it from './examplePlans/starter_5it';
import Starter_6nl from './examplePlans/starter_6nl';
import Pro_1en from './examplePlans/pro_1en';
import Pro_2de from './examplePlans/pro_2de';
import Pro_3fr from './examplePlans/pro_3fr';
import Pro_4es from './examplePlans/pro_4es';
import Pro_5it from './examplePlans/pro_5it';
import Pro_6nl from './examplePlans/pro_6nl';
import Starter_7ja from './examplePlans/starter_7ja';
import Starter_8ar from './examplePlans/starter_8ar';
import Pro_7ja from './examplePlans/pro_7ja';
import Pro_8ar from './examplePlans/pro_8ar';
import Starter_9sv from './examplePlans/starter_9sv';
import Starter_10fi from './examplePlans/starter_10fi';
import Starter_11da from './examplePlans/starter_11da';
import Starter_12no from './examplePlans/starter_12no';
import Pro_9sv from './examplePlans/pro_9sv';
import Pro_10fi from './examplePlans/pro_10fi';
import Pro_11da from './examplePlans/pro_11da';
import Pro_12no from './examplePlans/pro_12no';

const planComponents = {
  starter: {
    en: <Starter_1en />,
    'en-uk': <Starter_1en />,
    de: <Starter_2de />,
    fr: <Starter_3fr />,
    es: <Starter_4es />,
    it: <Starter_5it />,
    nl: <Starter_6nl />,
    ja: <Starter_7ja />,
    ar: <Starter_8ar />,
    sv: <Starter_9sv />,
    fi: <Starter_10fi />,
    da: <Starter_11da />,
    no: <Starter_12no />,
  },
  professional: {
    en: <Pro_1en />,
    'en-uk': <Pro_1en />,
    de: <Pro_2de />,
    fr: <Pro_3fr />,
    es: <Pro_4es />,
    it: <Pro_5it />,
    nl: <Pro_6nl />,
    ja: <Pro_7ja />,
    ar: <Pro_8ar />,
    sv: <Pro_9sv />,
    fi: <Pro_10fi />,
    da: <Pro_11da />,
    no: <Pro_12no />,
  },
};

export default function ExamplePlan({
  handleNextExample,
  handleBackExample,
  examplePackage,
  planLanguage,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    event('ExamplePlan_component_view', {
      category: 'Component View',
      label: 'ExamplePlan Component View',
    });
  }, []);

  const { t, i18n } = useTranslation('ExamplePlan');

  const language = i18n.language;

  // If planLanguage is not provided, default to 'en'
  const plan = planComponents[examplePackage][planLanguage || 'en'];

  return (
    <div className="overflow">
      <div className="section-full wf-section">
        <div className="get-started">
          <div className="form-bg">
            <div className="flex justify-center items-center mb-8">
              <button className="button" onClick={handleBackExample}>
                Back
              </button>
            </div>
            {plan || <div>{t('noPlan')}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
