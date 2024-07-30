import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import Pixel from "../components/Pixel";
import XPixel from "../components/XPixel";

const isDevelopment = process.env.NODE_ENV === "development";

class MyDocument extends Document {
  render() {
    const scriptSrc =
      "object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'nonce-ranD0m1z3' 'nonce-rAnd0mIze' 'nonce-ranD0mIz3' 'nonce-rAnD0m8ld' 'nonce-rAnD0m1z4' 'nonce-rAnD0m1z5' 'nonce-rAnD0m1z6' 'sha256-h2iROQedXbmqGqKxY9WFayLY/Ix/40S5Vh1CsFrIqcU=' https://js.stripe.com https://www.googletagmanager.com https://gc.kis.v2.scr.kaspersky-labs.com wss://gc.kis.v2.scr.kaspersky-labs.com https://cdn.tiny.cloud https://www.googleadservices.com https://td.doubleclick.net https://js.driftt.com https://static.hotjar.com https://script.hotjar.com https://connect.facebook.net https://googleads.g.doubleclick.net https://mediafiles.botpress.cloud https://cdn.botpress.cloud https://15minuteplan-ai.vercel.app https://canary-15minuteplan-ai.vercel.app https://canary-15minuteplan-ai.kanoonth.com/; frame-src 'self' https://js.stripe.com https://js.driftt.com https://widget.drift.com https://td.doubleclick.net https://www.facebook.com https://cdn.botpress.cloud https://static.ads-twitter.com;";
    return (
      <Html lang="en">
        <Pixel id={process.env.FB_PIXEL_ID} />
        <XPixel id={process.env.X_PIXEL_ID} />
        <Head>
          <script
            nonce="rAnD0m1z6"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_ID}');
              `,
            }}
          ></script>
          {!isDevelopment && (
            <meta
              httpEquiv="Content-Security-Policy"
              content={`${scriptSrc}; font-src 'self' https://fonts.gstatic.com`}
            />
          )}
          <script
            nonce="rAnD0m8ld"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function loadScript(src, id) {
                    return new Promise((resolve, reject) => {
                      if (document.getElementById(id)) {
                        resolve();
                        return;
                      }
                      const script = document.createElement('script');
                      script.src = src;
                      script.id = id;
                      script.defer = true;
                      script.onload = resolve;
                      script.onerror = reject;
                      document.head.appendChild(script);
                    });
                  }

                  var ensureVariantIDIsSet = function() {
                    if (localStorage.getItem('variantID')) {
                      if (!window.botpressWebChat) {
                        initBotpress();
                      }
                    } else {
                      setTimeout(ensureVariantIDIsSet, 0);
                    }
                  }

                  async function initBotpress() {
                    try {
                      await loadScript('https://cdn.botpress.cloud/webchat/v1/inject.js', 'botpress-inject');
                      await loadScript('https://mediafiles.botpress.cloud/9da8863b-59de-4f58-84bd-b1a54559e57f/webchat/config.js', 'botpress-config');
                      if (window.botpressWebChat) {
                        window.botpressWebChat.init();
                      }
                    } catch (error) {
                      console.error('Botpress script load error:', error);
                    }
                  }

                  // ensureVariantIDIsSet() // Hide chatbot for now
                })();
              `,
            }}
          ></script>
          <script
            nonce="ranD0mIz3"
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.HOTJAR_ID},hjsv:${process.env.HOTJAR_SV}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript nonce="ranD0m1z3" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
