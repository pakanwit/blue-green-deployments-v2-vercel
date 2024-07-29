import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import styles from "../styles/Wizard.module.css";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import useLocale from "../hooks/useLocale";
import trackEvent from "../utils/trackEvent";
import Pixel from "../components/Pixel";
import { API_KEY_HEADER } from "./api/constants";
import XPixel from "../components/XPixel";

export default function Login({ fbPixelId, secretKey, xPixelId }) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function onSubmit(values) {
    async function fetchUserData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllUserData`,
        {
          headers: {
            [API_KEY_HEADER]: secretKey,
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      localStorage.setItem("userId", data._id);
    }
    console.log(" process.env.NEXTAUTH_URL", process.env.NEXTAUTH_URL);

    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/userHomepage`,
    });

    console.log("status: ", status);
    if (status.ok) {
      // await fetchUserData();
      router.push("/userHomepage");
    } else {
      setIsError(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: registerFormValidate,
    onSubmit,
  });

  const { data: session } = useSession();
  console.log("useSession: Login session CANARY", session);

  if (session) {
    Router.push("/userHomepage");
  }

  const { t } = useTranslation("login");

  //set language
  const { push, asPath } = useRouter();
  const [country, setCountry] = useState(
    typeof window !== "undefined" ? localStorage.getItem("country") || "" : ""
  );

  useLocale(country);

  return (
    <>
      <Pixel id={fbPixelId} />
      <XPixel id={xPixelId} />
      <Head>
        <title>{t("Login")}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content={t("Login Page")} />
      </Head>

      <main>
        <div className="body-2">
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
                <Link
                  href="/"
                  aria-current="page"
                  className="nav-button w-button w--current"
                >
                  {t("Home")}
                </Link>
              </div>
            </div>
            <div className="navbar-bg"></div>
          </div>

          <div className="overflow">
            <div className="section-full wf-section">
              <div className="get-started2">
                <div className="form-bg">
                  <h4 className="">{t("Login to your account")}</h4>
                  <div className="form-block-started w-form">
                    <form
                      className="form-started"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="mb-6">
                        <label htmlFor="email" className={styles.label}>
                          {t("Email")}{" "}
                          <span className="text-sm">{t("(required)")}</span>
                        </label>
                        <input
                          {...formik.getFieldProps("email")}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "email",
                              e.target.value.toLowerCase()
                            );
                          }}
                          type="email"
                          name="email"
                          id="email"
                          className={`${styles.text_input} ${formik.errors.email && formik.touched.email ? "border-rose-400" : "border-gray-300"} `}
                          placeholder=""
                        />
                        {formik.errors.email && formik.touched.email ? (
                          <span className="text-rose-400">
                            {formik.errors.email as React.ReactNode}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="mb-6">
                        <label htmlFor="password" className={styles.label}>
                          {t("Password")}{" "}
                          <span className="text-sm">{t("(required)")}</span>
                        </label>
                        <input
                          {...formik.getFieldProps("password")}
                          type="password"
                          name="password"
                          id="password"
                          className={`${styles.text_input} ${formik.errors.password && formik.touched.password ? "border-rose-400" : "border-gray-300"}`}
                          placeholder=""
                        />
                        {formik.errors.password && formik.touched.password ? (
                          <span className="text-rose-400">
                            {formik.errors.password as React.ReactNode}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      {isError ? (
                        <div className="text-rose-400 mb-4">
                          {t("Invalid email or password")}
                        </div>
                      ) : (
                        <></>
                      )}
                      <div>
                        <Link
                          href="/passwordReset/RequestPasswordReset"
                          onClick={() => {
                            trackEvent({
                              event_name: "forget_password_button",
                            });
                          }}
                        >
                          {t("Forgot Password?")}
                        </Link>
                      </div>

                      <div className="flex gap-5 justify-center mt-5">
                        <button type="submit" className="button-2 w-button">
                          {t("Sign in")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const fbPixelId = process.env.FB_PIXEL_ID;
  const secretKey = process.env.API_KEY;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login", "index"])),
      fbPixelId,
      secretKey,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
