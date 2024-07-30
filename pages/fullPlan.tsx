import FullPlanStarter from './fullPlanStarter';
import FullPlanPro from './fullPlanPro';
import { useState, useEffect, useContext } from 'react';
import { MoonLoader } from 'react-spinners';
import { useSession, signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import Pixel from '../components/Pixel';
import getPriceByPlanAndCountry from '../utils/getPriceByPlanAndCountry';
import { planType } from '../constants/plan';
import { AppContext } from '../context/appContext';
import XPixel from '../components/XPixel';

export default function fullPlan({
  secretKey,
  fbPixelId,
  xPixelId,
  xPixelPurchaseId,
  conversionDestinationId,
}) {
  const { t } = useTranslation('fullPlan');

  const [userData, setuserData] = useState(null);
  const [UserDataLoading, setUserDataLoading] = useState(true);
  const [UserDataIsError, setUserDataIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isFirstPlan, setIsFirstPlan] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [Ido, setIdo] = useState('');
  const { data: session } = useSession();
  const { setPlanId } = useContext(AppContext);

  useEffect(() => {
    // This component is called only after finished registration step
    setPlanId('1');
  }, []);
  const isStarter =
    userData && paid && isFirstPlan && userData.planPackage === 'starter';
  const isPro =
    userData && paid && isFirstPlan && userData.planPackage === 'professional';
  useEffect(() => {
    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      setUserEmail(localStorage.getItem('email'));
      setIdo(localStorage.getItem('Ido'));
      const emailFromLocal = localStorage.getItem('email');

      let finalEmail = '';

      if (session) {
        finalEmail = session.user.email;
      } else {
        finalEmail = emailFromLocal;
      }

      setUserDataLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          email: finalEmail,
        }),
      };

      const res = await fetch('/api/getAllUserDataFirstLogin', options);
      const data = await res.json();
      setuserData(data);

      if (data) {
        setUserDataLoading(false);
      }

      if (data && data.paymentStatus === 'paid' && data.paymentId) {
        clearInterval(interval); // Clear the interval when paymentStatus is "paid"
        setPaid(true);
      }

      if (data && data.paymentStatus !== 'paid' && !data.paymentId) {
        clearInterval(interval);
        setPaymentError(true);
      }

      if (data.plans.length === 1) {
        console.log('isFirstPlan');
        setIsFirstPlan(true);
      }

      counter++; // Increment the counter

      // Clear the interval and stop fetching if the counter reaches 5
      if (counter >= 5) {
        clearInterval(interval);
        setUserDataIsError(true);
      }
    }

    fetchUserData(); // Fetch data initially

    // Call the fetchUserData function every 5 seconds (5000 ms)
    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const isVisitFullPlan = localStorage.getItem('isVisitFullPlan');
    try {
      if (
        typeof window !== 'undefined' &&
        !isVisitFullPlan &&
        (isStarter || isPro)
      ) {
        const value = getPriceByPlanAndCountry(
          isStarter ? planType.STARTER : planType.PRO,
          userData.country,
        );
        value &&
          window.fbq('track', 'fullplan_pageview_conversion', {
            value,
            currency: 'USD',
          });
        value &&
          window.twq('event', xPixelPurchaseId, {
            value,
            currency: 'USD',
            contents: [
              {
                content_id: 'email',
                content_name: userData.email,
              },
            ],
          });
        localStorage.setItem('isVisitFullPlan', 'true');
      }
    } catch {
      console.error('error tracking full plan pageview conversion');
    }
  }, [isStarter, isPro]);
  useEffect(() => {
    if (userData) console.log('userData: ', userData);
  }, [userData]);

  //set language
  const { push, asPath } = useRouter();
  const [country, setCountry] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('country') || '' : '',
  );

  useLocale(country);
  return (
    <>
      {!isStarter && !isPro && (
        <>
          <Pixel id={fbPixelId} />
          <XPixel id={xPixelId} />
        </>
      )}
      {!userData && (
        <div className=" flex justify-center mt-5 m-auto">
          <MoonLoader size={20} />
        </div>
      )}
      {isStarter ? (
        <FullPlanStarter
          userData={userData}
          secretKey={secretKey}
          fbPixelId={fbPixelId}
          xPixelId={xPixelId}
          conversionDestinationId={conversionDestinationId}
        />
      ) : (
        <></>
      )}
      {isPro ? (
        <FullPlanPro
          userData={userData}
          secretKey={secretKey}
          fbPixelId={fbPixelId}
          xPixelId={xPixelId}
          conversionDestinationId={conversionDestinationId}
        />
      ) : (
        <></>
      )}
      {UserDataIsError && (
        <div className="flex justify-center mt-5 m-auto text-rose-600">
          {t(
            "Error Getting User Data, if you've paid but are unable to access plan please contact help@15minuteplan.ai",
          )}
        </div>
      )}
      {paymentError && (
        <div className="flex justify-center mt-5 m-auto text-rose-600">
          {t(
            "Error With Payment, if you've paid but are unable to access plan please contact help@15minuteplan.ai",
          )}
        </div>
      )}
      {userData && !isFirstPlan ? (
        <div className="flex justify-center mt-5 m-auto text-rose-600">
          {t(
            "You've already made a plan, you can't make new plans with this link anymore",
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelPurchaseId = process.env.X_PIXEL_PURCHASE_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  const conversionDestinationId = process.env.GOOGLE_TAG_CONVERSION_DESTINATION;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'fullPlan',
        'fullPlanPro',
        'fullPlanStarter',
        'FinTable',
        'index',
      ])),
      secretKey,
      fbPixelId,
      xPixelId,
      xPixelPurchaseId,
      conversionDestinationId,
    },
  };
}
