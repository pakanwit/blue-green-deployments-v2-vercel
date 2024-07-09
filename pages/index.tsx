import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FadeAnimation from '../components/animations/fadeAnimation';
import FadeInFromBottom from '../components//animations/fadeInFromBottom';
import { event } from 'nextjs-google-analytics';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import useLocale from '../hooks/useLocale';
import {
  US,
  DE,
  FR,
  ES,
  IT,
  NL,
  JP,
  SA,
  SE,
  FI,
  DK,
  NO,
} from 'country-flag-icons/react/3x2';
import trackEvent from '../utils/trackEvent';
import Pixel from '../components/Pixel';
import { API_KEY_HEADER } from './api/constants';
import TrustBox from '../components/trustBox';
import { IReviewsResponse } from '../model/Schema';
import { ROUTE_PATH } from '../constants/path';

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

export default function Home({ fbPixelId, secretKey }) {
  const [variantID, setVariantID] = useState('');

  function addition(a, b) {
    return a + b;
  }

  addition(1, 2);

  const [userData, setUserData] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    let interval;
    let counter = 0;

    async function fetchUserData() {
      try {
        const res = await fetch('/api/getUserData', {
          headers: {
            [API_KEY_HEADER]: secretKey,
          },
        });
        const data = await res.json();

        if (data) {
          if (data.paymentStatus !== 'paid') {
            setUserData(data);
            signOut(); // signOut if not paid
            return;
          }
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    }

    counter++;

    if (counter >= 5) {
      clearInterval(interval);
    }

    fetchUserData();

    interval = setInterval(() => {
      fetchUserData();
    }, 3000);
    push('/userHomepage');
    return () => clearInterval(interval);
  }, [session]);

  //split test code ////////////////////////////////////////////////////
  useEffect(() => {
    if (userData && !userData.variantID) {
      fetch('/api/updateUserVariant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          email: userData.email,
          variantID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData]);
  //split test code done ////////////////////////////////////////////////////

  // split test code ////////////////////////////////////////////////////
  // NO_EXPERIMENT for no experiment ****there are some first few with value other than NO_EXPERIMENT****
  const [country, setCountry] = useState('');
  const [userLocalData, setUserLocalData] = useState('');
  const [reviews, setReviews] = useState<IReviewsResponse[]>([]);

  const fetchCountry = async () => {
    const response = await fetch(
      `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_KEY}`,
    );
    const data = await response.json();
    const country = data.country;
    setCountry(country);
    localStorage.setItem('country', country);
  };

  const fetchReviews = async () => {
    const res = await fetch('/api/trustpilot/reviews', {
      headers: {
        [API_KEY_HEADER]: secretKey,
      },
    });
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    const variantID =
      typeof window !== 'undefined' ? localStorage.getItem('variantID') : '';
    setVariantID(variantID);

    event('index_page_view', {
      category: 'Page View',
      label: 'Index Page View',
    });
    const userLocalData =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('formData')
        : null;
    setUserLocalData(userLocalData);
    fetchCountry();
    fetchReviews();
  }, []);

  // split test code done //////////////////////////////////////////////

  const { push } = useRouter();

  const { t } = useTranslation('index');

  // set locale based on user's browser language
  useLocale(country);

  const makePlanButton = userLocalData ? t('Continue') : t('Make Plan');
  const makeBusinessPlanButton = userLocalData
    ? t('Continue')
    : t('Make Business Plan');

  return (
    <>
      <Pixel id={fbPixelId} />
      <Head>
        <meta charSet="utf-8" />
        <title>{t('AI Business Plan Generator | Be Done In 15 Minutes')}</title>
        <meta
          content={t(
            '15 Minutes Needed | 24/7 Support | Professional Business Plan | Presentation-Ready. Make a Business Plan In Minutes With 15minuteplan.ai Using AI',
          )}
          name="description"
        />
        <meta
          content={t(
            'Get Started - 15minuteplan.ai - AI business plan generator',
          )}
          property="og:title"
        />
        <meta
          content={t(
            '15 Minutes Needed | 24/7 Support | Professional Business Plan | Presentation-Ready. Make a Business Plan In Minutes With 15minuteplan.ai Using AI',
          )}
          property="og:description"
        />
        <meta
          content={t(
            'Get Started - 15minuteplan.ai - AI business plan generator',
          )}
          property="twitter:title"
        />
        <meta
          content={t(
            '15 Minutes Needed | 24/7 Support | Professional Business Plan | Presentation-Ready. Make a Business Plan In Minutes With 15minuteplan.ai Using AI',
          )}
          property="twitter:description"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="google-site-verification"
          content="lhlmLanBzVNWRcW0CtEHx-t9oa6gB0RNm1KC2G_HSmw"
        />
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/8a7195ffc313c07981fbebfa/script.js"
        ></script>
      </Head>

      {/* <div className={`body`}>
        <h2>Website Under Maintenance. If you encounter issues please contact help@15minuteplan.ai</h2>
      </div> */}

      <div className={`body`}>
        <div role="banner" className="navbar w-nav">
          <div className="nav-block">
            <div className="nav">
              <Link
                href="/"
                aria-current="page"
                className="brand"
                onClick={() => {
                  trackEvent({
                    event_name: 'home_button',
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
              <nav role="navigation" className="nav-menu w-nav-menu"></nav>
              <Link
                href={{ pathname: ROUTE_PATH.objective }}
                className="nav-button w-button"
                onClick={() => {
                  trackEvent({
                    event_name: 'landing_page_top_make_plan_button',
                  });
                }}
              >
                {makePlanButton}
              </Link>
            </div>
          </div>
          <div className="navbar-bg"></div>
        </div>

        <FadeAnimation>
          <div className="overflow">
            <div className="section-hero wf-section">
              <div className="content">
                <div className="block-hero">
                  <LanguageSwitcher eventName="landing_page_change_language_button" />

                  <h1 className="heading-hero">
                    {t("World's Best AI Business Plan Generator")}
                  </h1>

                  <p className="text-xl">
                    {t(
                      'Fill out simple forms, select language, and get a business plan in under 15 minutes. Try It Out!',
                    )}
                  </p>

                  <div className="flex flex-col">
                    {
                      <Link
                        href={{ pathname: ROUTE_PATH.objective }}
                        className="button"
                        onClick={() => {
                          const time = performance.now();
                          console.log('index', time);
                          trackEvent({
                            event_name: 'landing_page_center_make_plan_button',
                          });
                        }}
                      >
                        {makeBusinessPlanButton}
                      </Link>
                    }
                    <br />
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-1/2 border-b border-gray-300"></div>
                      <div className="text-gray-600 px-4">{t('or')}</div>
                      <div className="w-1/2 border-b border-gray-300"></div>
                    </div>
                    <Link
                      href={{ pathname: '/login' }}
                      className="transparent-button w-button"
                      onClick={() => {
                        trackEvent({
                          event_name: 'landing_page_top_login_button',
                        });
                      }}
                    >
                      {t("Login if you've already made a plan")}
                    </Link>
                    <div className="relative">
                      <div>
                        <Image
                          className="blurred-red---hero"
                          src="/img/blurred_1.png"
                          width={114 * 3}
                          height={93 * 3}
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          className="blurred-blue---hero"
                          src="/img/blurred_2.png"
                          width={114 * 3}
                          height={93 * 3}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">{t('Who is this for?')}</h2>
                </div>
                <div className="w-layout-grid grid-3-columns">
                  <FadeInFromBottom>
                    <div className="sequence shadow-on-hover">
                      <div className="icon-sequence-bg">
                        <Image
                          src="/img/attach_money.svg"
                          width={500}
                          height={500}
                          alt=""
                          className="icon-sequence"
                        />
                      </div>
                      <h6 className="heading-sequence">
                        {t('Entrepreneurs looking for investor funding')}
                      </h6>
                      <p>
                        {t(
                          'Our AI business plan generator helps entrepreneurs in creating professional business plans designed to impress potential investors and secure funding',
                        )}
                      </p>
                    </div>
                  </FadeInFromBottom>

                  <FadeInFromBottom>
                    <div className=" sequence shadow-on-hover">
                      <div className="icon-sequence-bg">
                        <Image
                          src="/img/account_balance.svg"
                          width={500}
                          height={500}
                          alt=""
                          className="icon-sequence"
                        />
                      </div>
                      <h6 className="heading-sequence">
                        {t(
                          'Business owners and entrepreneurs looking for a bank loan',
                        )}
                      </h6>
                      <p>
                        {t(
                          "Our AI business plan generator is SBA-approved and follows to most banks' business plan template.",
                        )}
                      </p>
                    </div>
                  </FadeInFromBottom>

                  <FadeInFromBottom>
                    <div className="sequence shadow-on-hover">
                      <div className="icon-sequence-bg">
                        <Image
                          src="/img/person.svg"
                          width={500}
                          height={500}
                          alt=""
                          className="icon-sequence"
                        />
                      </div>
                      <h6 className="heading-sequence">
                        {t('For anyone looking to make a business plan')}
                      </h6>
                      <p>
                        {t(
                          "Whether you want an AI generated business plan for self-learning, as a reference for a project, or for submission to a non-financial institution, we've got you covered.",
                        )}
                      </p>
                    </div>
                  </FadeInFromBottom>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">
                    {t('What customers say about us')}
                  </h2>
                  <p className="text-xl">
                    {t('Our ultimate goal is to make a product that')}{' '}
                    <strong>{t('you')}</strong>{' '}
                    {t(
                      'love, to do that we need feedback. So we try to talk to as many customers as we can',
                    )}
                  </p>
                </div>
                <div className="w-layout-grid grid-3-columns">
                  <div className="sequence shadow-on-hover">
                    <p className="text-2xl">
                      <strong>{t('Zede H.')}</strong>
                    </p>
                    <Image
                      src="/img/zede1.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                    <br />
                    <Image
                      src="/img/zede2.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                  </div>

                  <div className="sequence shadow-on-hover">
                    <p className="text-2xl">
                      <strong>{t('Jason C.')}</strong>
                    </p>
                    <Image
                      src="/img/jason2.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                    <br />
                    <Image
                      src="/img/jason1.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                  </div>

                  <div className="sequence shadow-on-hover">
                    <p className="text-2xl">
                      <strong>{t('Parker A.')}</strong>
                    </p>
                    <Image
                      src="/img/parker1.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                    <br />
                    <Image
                      src="/img/parker2.png"
                      width={500}
                      height={500}
                      quality={100}
                      alt=""
                    />
                  </div>
                </div>
                {reviews.length > 0 && (
                  <div className="w-full flex flex-col items-center justify-center gap-4 mt-8 mb-12">
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                      {reviews?.map((review) => (
                        <div key={review.id} className="w-full">
                          <TrustBox {...review} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-black">
                      {t('Reviews From')}
                      <Image
                        src="https://plannit.ai/assets/trustpilot.svg"
                        width={100}
                        height={100}
                        alt="Trustpilot"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="section wf-section" style={{ marginTop: -100 }}>
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">
                    {t('Mentioned In..')}{' '}
                    {/*******add in locale json********* */}
                  </h2>
                </div>
                <br />

                <div className="flex flex-wrap gap-10 justify-center items-center">
                  <Link
                    href="https://apnews.com/press-release/ein-presswire-newsmatics/artificial-intelligence-f08eb45f39d6c0bcbbc09119379744c2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/AP_logo_rmb.png'}
                      alt="AP_logo"
                      width={80}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://finance.yahoo.com/news/15minuteplan-ai-introduces-novel-ai-211500897.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/yahoo_logo_rmb.png'}
                      alt="yahoo_logo"
                      width={150}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://www.marketwatch.com/press-release/15minuteplan-ai-introduces-novel-ai-powered-business-plan-creation-tool-e28abe8d?mod=search_headline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/marketWatch_logo_rmb.svg'}
                      alt="marketWatch_logo"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://www.bloomberg.com/professional/solution/bloomberg-terminal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={
                        '/img/AsMentionLogos/Bloomberg_Terminal_logo_rmb.png'
                      }
                      alt="Bloomberg_Terminal_logo"
                      width={150}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://medium.com/aasaan-blog/10-business-plan-ai-generators-01556e856e52"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/Medium_logo_rmb.png'}
                      alt="Medium_logo"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://seekingalpha.com/pr/19596934-15minuteplan-ai-introduces-novel-ai-powered-business-plan-creation-tool"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/seeking_alpha_logo_rmb.png'}
                      alt="seeking_alpha_logo"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://www.finanzen.net/nachricht/aktien/15minuteplan-ai-introduces-novel-ai-powered-business-plan-creation-tool-13192156"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/finanzen_logo_rmb.png'}
                      alt="finanzen_logo"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://www.benzinga.com/pressreleases/24/01/n36702136/15minuteplan-ai-introduces-novel-ai-powered-business-plan-creation-tool"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/benzinga_logo_rmb.png'}
                      alt="benzinga_logo"
                      width={200}
                      height={100}
                    />
                  </Link>

                  <Link
                    href="https://10web.io/blog/ai-business-plan-generators/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={'/img/AsMentionLogos/10web_logo_rmb.png'}
                      alt="10web_logo"
                      width={200}
                      height={100}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">
                    {t('Language Support')}{' '}
                    {/*******add in locale json********* */}
                  </h2>
                  <p>
                    {t(
                      'At the end of the plan creation process you can choose to generate a plan in multiple languages including..',
                    )}
                  </p>
                </div>
                <div className="w-layout-grid grid-3-columns">
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <US title="US" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('English (US & UK)')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <DE title="DE" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('German')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <FR title="FR" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('French')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <ES title="ES" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Spanish')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <IT title="IT" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Italian')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <NL title="NL" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Dutch')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <JP title="JP" className="w-20 h-20 border" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Japanese')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <SA title="SA" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Arabic')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <SE title="SE" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Swedish')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <FI title="FI" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Finnish')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <DK title="DK" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Danish')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="language_box shadow-on-hover">
                      <div className="w-1/2 flex justify-center items-center">
                        <NO title="NO" className="w-20 h-20" />
                      </div>
                      <div className="w-1/2 flex justify-start items-center">
                        {t('Norwegian')}
                      </div>
                    </div>
                  </FadeInFromBottom>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">{t('How it works?')}</h2>
                  <p className="text-xl">
                    {t(
                      'Our AI business plan generator guides you through a few questions, once done a business plan example will be generated',
                    )}
                  </p>
                </div>
                <div className="w-layout-grid grid-2-columns">
                  <FadeInFromBottom>
                    <div className="sequence shadow-on-hover">
                      <div className="icon-sequence-bg">
                        <Image
                          src="/img/fact_check.svg"
                          width={40}
                          height={40}
                          alt=""
                          className="icon-sequence"
                        />
                        <div className="number-sequence-bg">
                          <div className="number-sequence">1</div>
                        </div>
                      </div>
                      <h6 className="heading-sequence">
                        {t('Enter General Business Information')}
                      </h6>
                      <p>
                        {t(
                          'Only basic business information is required e.g. business name, number of employees, and a little financial data',
                        )}
                      </p>
                    </div>
                  </FadeInFromBottom>

                  <FadeInFromBottom>
                    <div className="sequence shadow-on-hover">
                      <div className="icon-sequence-bg">
                        <Image
                          src="/img/edit.svg"
                          width={40}
                          height={40}
                          alt=""
                          className="icon-sequence"
                        />
                        <div className="number-sequence-bg">
                          <div className="number-sequence">2</div>
                        </div>
                      </div>
                      <h6 className="heading-sequence">{t('Edit and Save')}</h6>
                      <p>
                        {t(
                          'Once your AI plan is generated you can easily edit the plan with our "Talk To Plan" feature. You can input what you want changed and AI will take care of the rest',
                        )}
                      </p>
                    </div>
                  </FadeInFromBottom>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="content">
                <div className="block-heading">
                  <h2 className=" heading">{t('Key Benefits')}</h2>
                </div>
                <div className="w-layout-grid grid-2-columns">
                  <FadeInFromBottom>
                    <div className="feature shadow-on-hover-red">
                      <div className="block-heading-feature">
                        <Image
                          src="/img/language.svg"
                          width={500}
                          height={500}
                          alt=""
                          className="icon-feature"
                        />
                        <h5 className="heading-feature">
                          {t(
                            'Our AI draws business knowledge from the entire internet',
                          )}
                        </h5>
                      </div>
                      <p>
                        {t(
                          'GPT-3.5 and GPT-4 are our cutting-edge language models, trained on vast quantities of internet, book-based resources, business plan examples, and has demonstrated its knowledge by',
                        )}{' '}
                        <strong>{t('passing the Wharton MBA exam')}</strong>{' '}
                        {t('among many others')}
                      </p>
                      <Image
                        src="/img/benefit1V2.png"
                        width={640 * 1.5}
                        height={458 * 1.5}
                        layout="responsive"
                        alt=""
                        className="image"
                      />
                    </div>
                  </FadeInFromBottom>
                  <FadeInFromBottom>
                    <div className="feature shadow-on-hover-blue">
                      <div className="block-heading-feature">
                        <Image
                          src="/img/bolt.svg"
                          width={500}
                          height={500}
                          alt=""
                          className="icon-feature"
                        />
                        <h5 className="heading-feature">
                          {t('The whole process can literally take 15 minutes')}
                        </h5>
                      </div>
                      <p>
                        {t(
                          'Gone are the days of laboring over business plans for weeks on end, our AI business plan generator can create a comprehensive plan in just 15 minutes.',
                        )}
                      </p>
                      <Image
                        src="/img/benefit2.png"
                        width={433}
                        height={160}
                        layout="responsive"
                        alt=""
                        className="image-feature"
                      />
                    </div>
                  </FadeInFromBottom>
                </div>
              </div>
            </div>

            <div className="section wf-section">
              <div className="block-right">
                <h2 className="heading">
                  {t(
                    "Our AI generated business plan template won't let you down",
                  )}
                </h2>
                <p className="paragraph-large">
                  {t(
                    'create a professional business plan in just 15 minutes with our AI business plan generator',
                  )}
                </p>
                <div className="flex flex-col">
                  <Link
                    href={{
                      pathname: ROUTE_PATH.objective,
                      query: { country },
                    }}
                    className="button w-button"
                    onClick={() => {
                      trackEvent({
                        event_name: 'landing_page_bottom_make_plan_button',
                      });
                    }}
                  >
                    {makeBusinessPlanButton}
                  </Link>
                  <br />
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-1/2 border-b border-gray-300"></div>
                    <div className="text-gray-600 px-4">{t('or')}</div>
                    <div className="w-1/2 border-b border-gray-300"></div>
                  </div>
                  <Link
                    href="/login"
                    className="transparent-button w-button"
                    onClick={() => {
                      trackEvent({
                        event_name: 'landing_page_center_login_button',
                      });
                    }}
                  >
                    {t("Login if you've already made a plan")}
                  </Link>
                </div>
              </div>
              <div className="content">
                <div className="w-layout-grid grid-2-columns single">
                  <div className="blurred-grid">
                    <div className="blurred">
                      <Image
                        className="blurred-red---grid"
                        src="/img/blurred_1.png"
                        width={114 * 7}
                        height={93 * 7}
                        alt=""
                      />
                      <Image
                        className="blurred-blue---grid"
                        src="/img/blurred_2.png"
                        width={114 * 7}
                        height={93 * 7}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-footer wf-section">
              <div className="content">
                <div className="w-layout-grid grid-footer">
                  <div
                    id="w-node-_2b89f38d-417d-b761-09ed-84893bf9cd2d-3bf9cd2a"
                    className="block-footer"
                  >
                    <Image
                      src="/img/final_horizontal_crop_V1.png"
                      width={270}
                      height={40}
                      sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                      alt=""
                      className="logo-footer"
                    />
                    <a
                      href="mailto:help@15minuteplan.ai"
                      className="icon-link-footer w-inline-block"
                    >
                      <div className="text-footer">
                        {t('Contact us at: help@15minuteplan.ai')}
                      </div>
                    </a>
                  </div>
                  <Link href="/refundPolicy" className="underline text-center">
                    {t('Refund Policy')}
                  </Link>
                    <Link
                      href="/privacy-policy"
                      className="underline text-center"
                    >
                      {t('privacy_policy_link')}
                    </Link>
                </div>
                <div className="footer-down">
                  <div className="text-footer-down">
                    {t('©2023 15minuteplan.ai All rights reserved.')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeAnimation>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  const secretKey = process.env.API_KEY;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index'])),
      fbPixelId,
      xPixelId,
      secretKey,
      // Will be passed to the page component as props
    },
  };
}
