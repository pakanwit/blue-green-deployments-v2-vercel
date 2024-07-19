import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Pixel from '../components/Pixel';

import trackEvent from '../utils/trackEvent';
import XPixel from '../components/XPixel';

export default ({ fbPixelId, xPixelId }) => {
  const { t } = useTranslation('privacy_policy');

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      <motion.div
        key="component-seven"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="overflow">
          <div role="banner" className="navbar w-nav">
            <div className="nav-block">
              <div className="nav">
                <Link
                  href="/"
                  aria-current="page"
                  className="brand w-nav-brand w--current"
                  onClick={() => {
                    trackEvent({
                      event_name: 'privacy_policy_page_home_logo_button',
                    });
                  }}
                >
                  <Image
                    className="logo"
                    src="/img/final_horizontal_crop_V1.png"
                    width={270}
                    height={40}
                    sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="nav">
                <Link
                  href="/"
                  onClick={() => {
                    trackEvent({
                      event_name: 'privacy_policy_page_home_button',
                    });
                  }}
                >
                  <button className="nav-button-transparent">
                    {t('privacy_policy_home')}
                  </button>
                </Link>
              </div>
            </div>
            <div className="navbar-bg"></div>
          </div>
          <div className="section-full wf-section">
            <div className="get-started">
              <div className="form-bg">
                <div>
                  <h1>{t('privacy_policy_header')}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t('privacy_policy_content'),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['privacy_policy', 'index'])),
      fbPixelId,
      xPixelId,
    },
  };
}
