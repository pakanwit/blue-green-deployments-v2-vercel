import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "react-quill/dist/quill.snow.css";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import { AppContext } from "../context/appContext";
import { useRouter } from "next/router";
import { ROUTE_PATH } from "../constants/path";
import ChatbotPopup from "../components/chatbotPopup";
function App({ Component, pageProps }) {
  const router = useRouter();
  const [generatedExec, setGeneratedExec] = useState("");
  const [generatedSitu1, setGeneratedSitu1] = useState("");
  const [generatedSitu2, setGeneratedSitu2] = useState("");
  const [generatedMark1, setGeneratedMark1] = useState("");
  const [generatedMark2, setGeneratedMark2] = useState("");
  const [generatedMark3, setGeneratedMark3] = useState("");
  const [generatedMark4, setGeneratedMark4] = useState("");
  const [generatedOp1, setGeneratedOp1] = useState("");
  const [generatedOp2, setGeneratedOp2] = useState("");
  const [generatedMang1, setGeneratedMang1] = useState("");
  const [generatedMang2, setGeneratedMang2] = useState("");
  const [generatedFin1, setGeneratedFin1] = useState("");
  const [generatedRisk1, setGeneratedRisk1] = useState("");
  const [planPackage, setPlanPackage] = useState("");
  const [starterPrice, setStarterPrice] = useState("");
  const [proPrice, setProPrice] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (router.pathname.startsWith("/form")) {
      router.push(ROUTE_PATH.objective);
    }
    const ensureVariantIDIsSet = function () {
      if (localStorage.getItem("variantID")) {
        const chatbotAutoSuggestionLeft = localStorage.getItem(
          "chatbotAutoSuggestionLeft"
        );
        const chatbotAutoSuggestionLeftInt = chatbotAutoSuggestionLeft
          ? parseInt(chatbotAutoSuggestionLeft)
          : 3;

        if (!chatbotAutoSuggestionLeft) {
          localStorage.setItem("chatbotAutoSuggestionLeft", "3");
        }

        const handleMessage = (event) => {
          if (event.data.type === "UI.OPENED") {
            setIsChatOpen(false);
            clearTimeout(timer);
          }
        };

        window.addEventListener("message", handleMessage);

        const timer = setTimeout(() => {
          if (chatbotAutoSuggestionLeftInt > 0) {
            setIsChatOpen(true);
            localStorage.setItem(
              "chatbotAutoSuggestionLeft",
              (chatbotAutoSuggestionLeftInt - 1).toString()
            );
          }
        }, 60000);

        return () => {
          window.removeEventListener("message", handleMessage);
          clearTimeout(timer);
        };
      } else {
        setTimeout(ensureVariantIDIsSet, 0);
      }
    };

    // ensureVariantIDIsSet(); // Hide chatbot for now
  }, []);

  console.log("_app CANARY", process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <SessionProvider
        baseUrl={"https://15minuteplan-ai.kanoonth.com"}
        basePath={"/api/auth"}
        session={pageProps.session}
      >
        <GoogleAnalytics trackPageViews nonce="rAnD0m1z5" />
        <AppContext.Provider
          value={{
            get: {
              generatedExec,
              generatedSitu1,
              generatedSitu2,
              generatedMark1,
              generatedMark2,
              generatedMark3,
              generatedMark4,
              generatedOp1,
              generatedOp2,
              generatedMang1,
              generatedMang2,
              generatedFin1,
              generatedRisk1,
              planPackage,
              starterPrice,
              proPrice,
            },
            set: {
              setGeneratedExec,
              setGeneratedSitu1,
              setGeneratedSitu2,
              setGeneratedMark1,
              setGeneratedMark2,
              setGeneratedMark3,
              setGeneratedMark4,
              setGeneratedOp1,
              setGeneratedOp2,
              setGeneratedMang1,
              setGeneratedMang2,
              setGeneratedFin1,
              setGeneratedRisk1,
              setPlanPackage,
              setStarterPrice,
              setProPrice,
            },
          }}
        >
          <Component {...pageProps} />
        </AppContext.Provider>
        <ChatbotPopup isChatOpen={isChatOpen} />
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(App);
