import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/userHomepage.module.css";
import { MoonLoader } from "react-spinners";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageSwitcher from "../components/LanguageSwitcher";
import useLocale from "../hooks/useLocale";
import { API_KEY_HEADER } from "./api/constants";
import trackEvent from "../utils/trackEvent";
import Pixel from "../components/Pixel";
import dayjs from "dayjs";
import { is45MinutesPassed } from "../utils/date";
import Survey from "../components/Survey";
import { ROUTE_PATH } from "../constants/path";
import XPixel from "../components/XPixel";
import useCookies from "../hooks/useCookies";

export default function userHomepage({ secretKey, fbPixelId, xPixelId }) {
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [isSecondSurvey, setIsSecondSurvey] = useState(false);

  const { data: session } = useSession();
  const { isCanary, getCookie } = useCookies();

  console.log("session: UserHomepage CANARY", session, isCanary);
  const varaintID = getCookie("varaintID");
  console.log("varintID", varaintID);

  //create signout function
  const handleSignout = async () => {
    trackEvent({
      event_name: "sign_out_button",
    });
    localStorage.removeItem("formData");
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  useEffect(() => {
    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      setLoading(true);
      const res = await fetch("/api/getAllUserData", {
        headers: {
          [API_KEY_HEADER]: secretKey,
        },
      });
      const data = await res.json();

      if (data) {
        setLoading(false);
      } else {
        setIsError(true);
      }

      if (data.paymentStatus === "paid" && data.paymentId) {
        setPaid(true);
        clearInterval(interval); // Clear the interval when paymentStatus is "paid"
      }

      setuserData(data);

      counter++; // Increment the counter

      // Clear the interval and stop fetching if the counter reaches 5
      if (counter >= 5) {
        clearInterval(interval);
        setPaymentError(true);
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
    if (paymentError) signOut();
  }, [paymentError]);

  // if userData exist and userData.planPackage is "professional" then viewPath is "loggedInFullPlanPro"
  const [viewPath, setViewPath] = useState("");
  const [editPath, setEditPath] = useState("");

  useEffect(() => {
    if (userData && userData.planPackage === "professional") {
      setEditPath("/editPlanPro");
      setViewPath("/loggedInFullPlanPro");
    } else if (userData && userData.planPackage === "starter") {
      setEditPath("/editPlanStarter");
      setViewPath("/loggedInFullPlan");
    }
    const surveyResult = userData?.surveyResult;
    const surveyResult2 = userData?.surveyResult2;
    const createdAt = surveyResult?.createdAt;
    if (surveyResult && !surveyResult2) {
      if (!createdAt) {
        setShowSurvey(true);
      } else if (dayjs(createdAt).isValid() && is45MinutesPassed(createdAt)) {
        setShowSurvey(true);
        setIsSecondSurvey(true);
      } else {
        const interval = setInterval(
          () => {
            if (is45MinutesPassed(createdAt)) {
              setShowSurvey(true);
              setIsSecondSurvey(true);
              // 45 minutes have passed since startDate
              clearInterval(interval); // Stop the interval
            }
          },
          5 * 60 * 1000
        ); // Check every 5 minutes

        return () => clearInterval(interval); // Cleanup on component unmount
      }
    }
  }, [userData]);

  const { t } = useTranslation("userHomepage");

  //set language
  const [country, setCountry] = useState(
    typeof window !== "undefined" ? localStorage.getItem("country") || "" : ""
  );

  useLocale(country);

  const [variantIDFromLocal, setVariantIDFromLocal] = useState("");

  useEffect(() => {
    setVariantIDFromLocal(localStorage.getItem("variantID"));
  }, []);

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      <div>{session ? User({ session }) : Guest()}</div>
    </>
  );

  function User({ session }) {
    return (
      <div className="overflow">
        {session && showSurvey && (
          <Survey
            showSurvey={showSurvey}
            setShowSurvey={setShowSurvey}
            isSecondSurvey={isSecondSurvey}
            session={session}
            secretKey={secretKey}
          />
        )}
        <div role="banner" className="navbar w-nav">
          <div className="nav-block">
            <div className="nav">
              <Link
                href="/"
                aria-current="page"
                className="brand w-nav-brand w--current"
              >
                <Image
                  className="logo"
                  src="/img/final_horizontal_crop_V1.png"
                  width={270}
                  height={40}
                  sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                  alt={t("logo")}
                />
              </Link>
            </div>
            <div className="nav">
              <button
                onClick={handleSignout}
                className="nav-button-transparent w-button"
              >
                {t("Sign Out")}
              </button>
            </div>
          </div>
          <div className="navbar-bg"></div>
        </div>

        <div className="section-full wf-section">
          <div className="get-started">
            <div className="form-bg">
              {paid ? (
                <>
                  <div className="form-block-started w-form">
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isError && (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold text-red-700">
                            {t("Failed to load business plan ")}
                          </strong>
                          <span className="block sm:inline">
                            {t("Please try again")}
                          </span>
                          <br />
                          <span>
                            {t("Or contact us at help@15minuteplan.ai")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center items-center text-center">
                      <div>
                        {t("You're logged in as: ")}
                        <strong>{session.user.email}</strong>
                      </div>
                      <div>
                        <p>
                          {t("You can make ")}
                          <strong>{userData && userData.planQuota}</strong>
                          {t(" more plans")}
                        </p>
                      </div>
                      <p className="text-sm">
                        {t(
                          "Note: Once you've paid, there will be no additional charges, and you'll have access to your account indefinitely."
                        )}
                      </p>
                    </div>
                    <h3 className="">{t("My Plans:")}</h3>

                    {userData && userData.planPackage ? (
                      userData.plans.slice(1).map((plan, index) => (
                        <div key={index} className={styles.plan_box}>
                          <div className={styles.inside_box}>
                            <div className="text-center">
                              <strong>
                                {t("Plan ")}
                                {index + 1}:{" "}
                              </strong>
                              {plan.originalVer.userInput.businessName}
                              <div className="text-xs leading-3">
                                {plan.originalVer.refId &&
                                  t("duplicatedPlanForm", {
                                    refId: plan.originalVer.refId,
                                    businessName:
                                      userData.plans[plan.originalVer.refId]
                                        .originalVer.userInput.businessName,
                                  })}
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <Link
                                className="transparent-button-small-rounded"
                                href={{
                                  pathname: viewPath,
                                  query: { planId: index + 1 },
                                }}
                                onClick={() => {
                                  trackEvent({
                                    event_name: "my_plan_view_button",
                                    plan_id: index + 1,
                                  });
                                }}
                              >
                                {t("View")}
                              </Link>
                              <Link
                                className="button-small-rounded"
                                href={{
                                  pathname: editPath,
                                  query: { planId: index + 1 },
                                }}
                                onClick={() => {
                                  trackEvent({
                                    event_name: "my_plan_edit_and_save_button",
                                    plan_id: index + 1,
                                  });
                                }}
                              >
                                {t("Edit & Save")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}

                    {userData && !userData.planPackage ? (
                      userData.plans.map((plan, index) => (
                        <div key={index} className={styles.plan_box}>
                          <div className={styles.inside_box}>
                            <div className="text-center">
                              <strong>
                                {t("Plan ")}
                                {index + 1}:{" "}
                              </strong>
                              {plan.originalVer.userInput.businessName}
                            </div>
                            <div className="flex gap-4">
                              <Link
                                className="transparent-button-small-rounded"
                                href={{
                                  pathname: "/loggedInFullPlan",
                                  query: { planId: index },
                                }}
                              >
                                {t("View")}
                              </Link>
                              <Link
                                className="button-small-rounded"
                                href={{
                                  pathname: "/editPlanStarter",
                                  query: {
                                    planId: index,
                                    fromUserHomepage: true,
                                  },
                                }}
                              >
                                {t("Edit")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}

                    {!userData.planPackage ? (
                      <div className="flex justify-center mt-10">
                        <Link
                          href={ROUTE_PATH.objective}
                          className="button w-button"
                          onClick={() => {
                            trackEvent({
                              event_name: "my_plan_add_plan_button",
                            });
                          }}
                        >
                          {t("+ Add Plan")}
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}

                    {userData.plans.length > 1 && userData.planPackage ? (
                      <div className="flex justify-center mt-10">
                        <Link
                          href={ROUTE_PATH.objective}
                          className="button w-button"
                          onClick={() => {
                            trackEvent({
                              event_name: "my_plan_add_plan_button",
                            });
                          }}
                        >
                          {t("+ Add Plan")}
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}

                    {userData.plans.length === 1 && userData.planPackage ? (
                      <div className="flex justify-center mt-10">
                        <Link href="/fullPlan" className="button w-button">
                          {t("Retrieve First Plan")}
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}

                    {userData.plans.length < 1 && userData.planPackage ? (
                      <div className="flex justify-center mt-10">
                        <Link
                          href={ROUTE_PATH.objective}
                          className="button w-button"
                          onClick={() => {
                            trackEvent({
                              event_name: "my_plan_add_plan_button",
                            });
                          }}
                        >
                          {t("+ Add Plan")}
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="mt-8 flex">
                    <LanguageSwitcher eventName="my_plan_change_language_button" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center text-center">
                  {paymentError ? (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                      role="alert"
                    >
                      {t("There was a problem with your payment")}
                    </div>
                  ) : (
                    <span>{t("Verifying Account...")}</span>
                  )}
                  <br />
                  <span>
                    {t(
                      'If you have paid but are unable to Login please contact us at help@15minuteplan.ai, If you haven\'t paid please click "Sign Out" and click "Make Business Plan"'
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Guest() {
    return (
      <div className="flex flex-col gap-2 justify-center items-center mt-8">
        {!loading ? (
          <>
            <p>{t("You need to be logged in to view this page")}</p>
            <Link href="/login">{t("Login")}</Link>
          </>
        ) : (
          <MoonLoader size={20} />
        )}
      </div>
    );
  }
}

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["userHomepage", "index"])),
      secretKey,
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
