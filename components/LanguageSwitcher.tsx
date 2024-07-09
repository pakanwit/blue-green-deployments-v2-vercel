import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  US,
  DE,
  FR,
  ES,
  IT,
  NL,
  JP,
  SE,
  FI,
  DK,
  NO,
} from 'country-flag-icons/react/3x2';
import { IoLanguage } from 'react-icons/io5';
import trackEvent from '../utils/trackEvent';

const LanguageSwitcher = ({ eventName }) => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const { push, asPath } = useRouter();

  function handleLanguageChange(e) {
    const localeToSet = e.currentTarget.value;
    localStorage.setItem('locale', localeToSet);
    setShowLanguageOptions(false);
    push(asPath, undefined, { locale: localeToSet });
  }

  return (
    <div className="flex justify-center items-center gap-5 mb-5">
      <button
        className="text-sm underline flex gap-2"
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
      >
        <div>
          <IoLanguage size={22} />
        </div>
        <div
          onClick={() => {
            trackEvent({
              event_name: eventName,
            });
          }}
        >
          change language
        </div>
      </button>
      {/* language option div below*/}
      {showLanguageOptions && (
        <div className="flex gap-5 flex-wrap">
          <button value={'en'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <US title="US" className="w-6 h-6" />
            </div>
          </button>
          <button value={'de'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <DE title="DE" className="w-6 h-6" />
            </div>
          </button>
          <button value={'fr'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <FR title="FR" className="w-6 h-6" />
            </div>
          </button>
          <button value={'es'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <ES title="ES" className="w-6 h-6" />
            </div>
          </button>
          <button value={'it'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <IT title="IT" className="w-6 h-6" />
            </div>
          </button>
          <button value={'nl'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <NL title="NL" className="w-6 h-6" />
            </div>
          </button>
          <button value={'ja'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <JP title="JP" className="w-6 h-6" />
            </div>
          </button>
          <button value={'sv'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <SE title="SE" className="w-6 h-6" />
            </div>
          </button>
          <button value={'fi'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <FI title="FI" className="w-6 h-6" />
            </div>
          </button>
          <button value={'da'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <DK title="DK" className="w-6 h-6" />
            </div>
          </button>
          <button value={'no'} onClick={handleLanguageChange}>
            <div className="cursor-pointer">
              <NO title="NO" className="w-6 h-6" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
