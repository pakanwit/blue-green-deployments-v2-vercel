import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';

interface TrustpilotModalProps {
  onClick: () => void;
}
const TrustpilotModal = ({ onClick }: TrustpilotModalProps) => {
  const { t } = useTranslation('common');
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative p-8 bg-white rounded-xl shadow-lg w-4/5 max-w-md overflow-auto mt-[18vh] md:mt-[8vh]">
          <div className="flex gap-8 flex-col items-center justify-center">
            <div className="flex flex-col gap-2 justify-center">
              <Image
                src="/img/trustpilot_black_logo.png"
                alt="Trustpilot"
                width={144}
                height={40}
              />
              <Image
                src="https://images-static.trustpilot.com/api/stars/5/star.svg"
                alt="Trustpilot"
                width={144}
                height={40}
              />
            </div>

            <div className="flex flex-col gap-1 text-center">
              <span className="text-2xl font-bold text-black">
                {t('modal.trustpilot.title')}
              </span>
              <span>{t('modal.trustpilot.description')}</span>
            </div>

            <div>
              <button type="submit" className="button" onClick={onClick}>
                {t('modal.trustpilot.reviewUsOnTrustpilot')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustpilotModal;
