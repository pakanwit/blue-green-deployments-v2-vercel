import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const AlertOnLeave = () => {
  const { t, i18n } = useTranslation('common');

  let warning = '';

  if (i18n.language === 'en') {
    warning = 'All your progress will be lost if you quit now';
  } else if (i18n.language === 'de') {
    warning = 'All Ihre Fortschritte gehen verloren, wenn Sie jetzt aufhören.';
  } else {
    warning = 'All your progress will be lost if you quit now';
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = warning;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

export default AlertOnLeave;
