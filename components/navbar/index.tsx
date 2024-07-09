import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ConfirmLink from '../ConfirmLink';
import Pixel from '../Pixel';

const Navbar = ({ fbPixelId }: { fbPixelId: string }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  
  return (
    <>
      <Pixel id={fbPixelId} />
      <Head>
        <title>{t('Plan Generator')}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Plan Generator" />
      </Head>
      <div role="banner" className="navbar w-nav">
        <div className="nav-block">
          <div className="nav">
            <ConfirmLink
              href="/"
              message={t('All your progress will be lost if you quit now')}
              aria-current="page"
              className="brand w-nav-brand w--current"
            >
              <Image
                className="logo"
                src="/img/final_horizontal_crop_V1.png"
                width={270}
                height={40}
                sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                alt="logo"
              />
            </ConfirmLink>
          </div>
          {/** TODO: Check the correct path for currentStep 10 */}
          {router.pathname !== '/form/example-plan' ? (
            <div className="">
              <ConfirmLink
                href="/"
                message={t('All your progress will be lost if you quit now')}
                aria-current="page"
                className="nav-button-transparent"
              >
                {t('Home')}
              </ConfirmLink>
            </div>
          ) : (
            <div className="">
              <button
                onClick={handleBack}
                aria-current="page"
                className="nav-button-transparent"
              >
                {t('Back')}
              </button>
            </div>
          )}
        </div>
        <div className="navbar-bg"></div>
      </div>
    </>
  );
};

export default Navbar;
