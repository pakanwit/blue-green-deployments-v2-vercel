import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import DOMPurify from 'dompurify';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConvertApi from 'convertapi-js';
import { saveAs } from 'file-saver';
import ReactDOMServer from 'react-dom/server';
import FinTable from '../components/FinTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useLocale from '../hooks/useLocale';
import { API_KEY_HEADER } from './api/constants';
import trackEvent from '../utils/trackEvent';
import Pixel from '../components/Pixel';
import XPixel from '../components/XPixel';

export default function LastStepPlanGen({ secretKey, fbPixelId, xPixelId }) {
  const { t } = useTranslation('loggedInFullPlanPro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [saveAsWordLoading, setSaveAsWordLoading] = useState(false);
  const [planContentOriginal, setPlanContentOriginal] = useState(null);
  const [planContentEdited, setPlanContentEdited] = useState(null);
  const [userInput, setUserInput] = useState(null);

  const router = useRouter();
  const { planId } = router.query;
  const planIdNum = Number(planId);

  useEffect(() => {
    let interval;
    let counter = 0; // Initialize the counter

    async function fetchUserData() {
      console.log('fetchUserData triggered');
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllUserData`,
        {
          headers: {
            [API_KEY_HEADER]: secretKey,
          },
        },
      );
      const data = await res.json();

      if (data) {
        console.log('data found, setting userData');
        setLoading(false);
        setuserData(data);
      } else {
        setIsError(true);
      }

      if (data.paymentStatus === 'paid' && data.paymentId) {
        setPaid(true);
        clearInterval(interval); // Clear the interval when paymentStatus is "paid"
      }

      counter++; // Increment the counter

      if (counter >= 5) {
        clearInterval(interval);
        setPaymentError(true);
      }
    }

    fetchUserData(); // Fetch data initially

    interval = setInterval(() => {
      fetchUserData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('userData loggedIn:', userData);
    if (userData && userData.plans[planIdNum]) {
      if (
        userData.plans[planIdNum].editedVer &&
        userData.plans[planIdNum].editedVer.planContent &&
        userData.plans[planIdNum].editedVer.planContent.generatedExecPro
      ) {
        setPlanContentEdited(userData.plans[planIdNum].editedVer.planContent);
      } else {
        setPlanContentOriginal(
          userData.plans[planIdNum].originalVer.planContent,
        );
      }
      setUserInput(userData.plans[planIdNum].originalVer.userInput);
    }
  }, [userData]);

  //use for downloading word doc
  // const finTableHtml = userData && ReactDOMServer.renderToString(
  //   FinTable({
  //     tableStyle: {
  //       borderCollapse: 'collapse',
  //     },
  //     boldCellStyle: {
  //       fontSize: '11pt',
  //       textAlign: 'left',
  //       border: '1px solid black',
  //       padding: '2px',
  //       fontWeight: 'bold',
  //     },
  //     notBoldCellStyle: {
  //       fontSize: '11pt',
  //       textAlign: 'left',
  //       border: '1px solid black',
  //       padding: '2px',
  //       fontWeight: 'normal',
  //     },
  //     // add an indent style
  //     indentCellStyle: {
  //       fontSize: '11pt',
  //       textAlign: 'left',
  //       border: '1px solid black',
  //       padding: '2px',
  //       fontWeight: 'normal',
  //       textIndent: '20px',
  //     },
  //     investmentItem1: userInput.investmentItem1,
  //     investmentAmountItem1: userInput.investmentAmountItem1,

  //     investmentItem2: userInput.investmentItem2,
  //     investmentAmountItem2: userInput.investmentAmountItem2,

  //     investmentItem3: userInput.investmentItem3,
  //     investmentAmountItem3: userInput.investmentAmountItem3,

  //     investmentItem4: userInput.investmentItem4,
  //     investmentAmountItem4: userInput.investmentAmountItem4,

  //     investmentItem5: userInput.investmentItem5,
  //     investmentAmountItem5: userInput.investmentAmountItem5,

  //     investmentItem6: userInput.investmentItem6,
  //     investmentAmountItem6: userInput.investmentAmountItem6,

  //     investmentItem7: userInput.investmentItem7,
  //     investmentAmountItem7: userInput.investmentAmountItem7,

  //     investmentItem8: userInput.investmentItem8,
  //     investmentAmountItem8: userInput.investmentAmountItem8,

  //     investmentItem9: userInput.investmentItem9,
  //     investmentAmountItem9: userInput.investmentAmountItem9,

  //     investmentItem10: userInput.investmentItem10,
  //     investmentAmountItem10: userInput.investmentAmountItem10,

  //     initialInvestmentAmount: userInput.initialInvestmentAmount,
  //     firstYearRevenue: userInput.firstYearRevenue,
  //     revenueGrowthRate: userInput.revenueGrowthRate,

  //     COGSP: userInput.COGSP,
  //     wageCostP: userInput.wageCostP,
  //     markCostP: userInput.markCostP,
  //     rentCostP: userInput.rentCostP,
  //     genCostP: userInput.genCostP,
  //     depreCostP: userInput.depreCostP,
  //     utilCostP: userInput.utilCostP,
  //     otherCostP: userInput.otherCostP,
  //     intCostP: userInput.intCostP,
  //     taxCostP: userInput.taxCostP,
  //   })
  // );

  function updateHeadingTags(htmlContent) {
    return htmlContent
      .replace(/<(\/?)h4>/g, '<$1h6>')
      .replace(/<(\/?)h3>/g, '<$1h5>')
      .replace(/<(\/?)h2>/g, '<$1h4>')
      .replace(/<(\/?)h1>/g, '<$1h3>');
  }

  //use for downloading word doc
  // async function saveAsWord() {
  //   // Set setSaveAsWordLoading to true for 10 seconds then set it to false
  //   setSaveAsWordLoading(true);
  //   setTimeout(() => {
  //     setSaveAsWordLoading(false);
  //   }, 10000);

  //   const htmlContent = `
  //     <html>
  //       <head>
  //         <meta charset="utf-8" />
  //       </head>
  //       <body>
  //         ${DOMPurify.sanitize(planContent.generatedExec)}
  //         ${DOMPurify.sanitize(planContent.generatedSitu)}
  //         ${DOMPurify.sanitize(planContent.generatedMark)}
  //         ${DOMPurify.sanitize(planContent.generatedOp)}
  //         ${DOMPurify.sanitize(planContent.generatedMang)}
  //         ${finTableHtml ? finTableHtml : planContent.editedFin}
  //         ${DOMPurify.sanitize(planContent.generatedRisk)}
  //       </body>
  //     </html>
  //   `;

  //   const newHeadingHtmlContent = updateHeadingTags(htmlContent);

  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/convertToDocx`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ htmlContent: newHeadingHtmlContent }),
  //     });

  //     if (response.ok) {
  //       const { base64data, filename } = await response.json();
  //       const arrayBuffer = new Uint8Array(Buffer.from(base64data, 'base64'));
  //       const outputFileBlob = new Blob([arrayBuffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

  //       saveAs(outputFileBlob, filename);
  //     } else {
  //       console.error('Error converting document:', response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error converting document:', error);
  //   }
  // }

  //set language
  const { push, asPath } = useRouter();
  const [country, setCountry] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('country') || '' : '',
  );

  useLocale(country);

  const [textAlign, setTextAlign] = useState('');
  useEffect(() => {
    if (
      userData &&
      userData.plans[planIdNum].originalVer.userInput.planLanguage === 'ar'
    )
      setTextAlign('text-right');
  }, [userData]);

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
                >
                  <Image
                    className="logo"
                    src="/img/final_horizontal_crop_V1.png"
                    width={270}
                    height={40}
                    sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                    alt={t('logo')}
                  />
                </Link>
              </div>
              <div className="nav">
                <a
                  href="/userHomepage"
                  aria-current="page"
                  className="nav-button-transparent w--current"
                  onClick={() => {
                    trackEvent({
                      event_name: 'my_plan_button',
                    });
                  }}
                >
                  {t('My Plans')}
                </a>
              </div>
            </div>
            <div className="navbar-bg"></div>
          </div>
          <div className="section-full wf-section">
            <div className="get-started">
              <div className="form-bg">
                {paid ? (
                  <div className="form-block-started w-form">
                    <div className="flex items-center justify-center flex-col mt-10">
                      {isError && (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold text-red-700">
                            {t('Failed to load business plan ')}
                          </strong>
                          <span className="block sm:inline">
                            {t('Please try again')}
                          </span>
                          <br />
                          <span>
                            {t('Or contact us at help@15minuteplan.ai')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-5 justify-center mb-10">
                      <div className="flex gap-3">
                        <Link
                          className="button"
                          href={{
                            pathname: '/editPlanPro',
                            query: { planId: planId },
                          }}
                          onClick={() => {
                            trackEvent({
                              event_name: 'edit_and_save_button',
                            });
                          }}
                        >
                          {t('Edit & Save')}
                        </Link>
                      </div>
                    </div>

                    {planContentEdited &&
                    (planContentEdited.generatedExecPro ||
                      planContentEdited.generatedSitu1IndKeyPro ||
                      planContentEdited.generatedMark1ObjPro ||
                      planContentEdited.generatedOp1ActKPIsPro ||
                      planContentEdited.generatedMang1StrucRolePro ||
                      planContentEdited.generatedFinPro ||
                      planContentEdited.generatedRiskPro) ? (
                      <div
                        className={`form-block-started w-form font-segoe ${textAlign}`}
                      >
                        <div className="flex justify-center items-center">
                          {t('Showing Edited Version')}
                        </div>
                        <hr />
                        <br />
                        <div className="flex justify-center">
                          {loading && <MoonLoader size={30} />}
                        </div>
                        {planContentEdited &&
                        planContentEdited.generatedExecPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedExecPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedSitu1IndKeyPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedSitu1IndKeyPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedSitu2SWOTPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedSitu2SWOTPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedMark1ObjPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark1ObjPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMark2STPPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark2STPPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMark3DecisionPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark3DecisionPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMark4ProductPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark4ProductPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMark5PriceDistPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark5PriceDistPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMark6AdPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMark6AdPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedOp1ActKPIsPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedOp1ActKPIsPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedOp2QCImpPlanPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedOp2QCImpPlanPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedTech1AllPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedTech1AllPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedTech2DigiPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedTech2DigiPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedMang1StrucRolePro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMang1StrucRolePro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentEdited &&
                        planContentEdited.generatedMang2RecTrainCSRPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedMang2RecTrainCSRPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedGrowthPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedGrowthPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentEdited &&
                          planContentEdited.generatedFinPro && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  updateHeadingTags(
                                    planContentEdited.generatedFinPro,
                                  ),
                                ),
                              }}
                            />
                          )}
                        <br />
                        {planContentEdited &&
                        planContentEdited.generatedRiskPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                updateHeadingTags(
                                  planContentEdited.generatedRiskPro,
                                ),
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        <hr />
                      </div>
                    ) : (
                      <div
                        className={`form-block-started w-form font-segoe ${textAlign}`}
                      >
                        <div className="flex justify-center items-center">
                          {t('Showing Original Version')}
                        </div>
                        <hr />
                        <br />
                        <div className="flex justify-center">
                          {loading && <MoonLoader size={30} />}
                        </div>
                        {planContentOriginal &&
                        planContentOriginal.generatedExecPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedExecPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedSitu1IndKeyPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedSitu1IndKeyPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedSitu2SWOTPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedSitu2SWOTPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedMark1ObjPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark1ObjPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMark2STPPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark2STPPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMark3DecisionPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark3DecisionPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMark4ProductPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark4ProductPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMark5PriceDistPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark5PriceDistPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMark6AdPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMark6AdPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedOp1ActKPIsPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedOp1ActKPIsPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedOp2QCImpPlanPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedOp2QCImpPlanPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedTech1AllPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedTech1AllPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedTech2DigiPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedTech2DigiPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedMang1StrucRolePro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMang1StrucRolePro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        {planContentOriginal &&
                        planContentOriginal.generatedMang2RecTrainCSRPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedMang2RecTrainCSRPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedGrowthPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedGrowthPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />

                        {!isError && planContentOriginal ? (
                          <FinTable
                            investmentItem1={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem1
                            }
                            investmentAmountItem1={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem1
                            }
                            investmentItem2={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem2
                            }
                            investmentAmountItem2={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem2
                            }
                            investmentItem3={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem3
                            }
                            investmentAmountItem3={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem3
                            }
                            investmentItem4={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem4
                            }
                            investmentAmountItem4={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem4
                            }
                            investmentItem5={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem5
                            }
                            investmentAmountItem5={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem5
                            }
                            investmentItem6={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem6
                            }
                            investmentAmountItem6={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem6
                            }
                            investmentItem7={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem7
                            }
                            investmentAmountItem7={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem7
                            }
                            investmentItem8={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem8
                            }
                            investmentAmountItem8={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem8
                            }
                            investmentItem9={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem9
                            }
                            investmentAmountItem9={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem9
                            }
                            investmentItem10={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentItem10
                            }
                            investmentAmountItem10={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .investmentAmountItem10
                            }
                            initialInvestmentAmount={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .initialInvestmentAmount
                            }
                            firstYearRevenue={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .firstYearRevenue
                            }
                            revenueGrowthRate={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .revenueGrowthRate
                            }
                            COGSP={
                              userData &&
                              userData.plans[0].originalVer.userInput.COGSP
                            }
                            wageCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.wageCostP
                            }
                            markCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.markCostP
                            }
                            rentCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.rentCostP
                            }
                            genCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.genCostP
                            }
                            depreCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.depreCostP
                            }
                            utilCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.utilCostP
                            }
                            otherCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.otherCostP
                            }
                            intCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.intCostP
                            }
                            taxCostP={
                              userData &&
                              userData.plans[0].originalVer.userInput.taxCostP
                            }
                            planLanguage={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .planLanguage
                                ? userData.plans[0].originalVer.userInput
                                    .planLanguage
                                : 'en'
                            }
                            planCurrency={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .planCurrency
                                ? userData.plans[0].originalVer.userInput
                                    .planCurrency
                                : ''
                            }
                            planCurrencySymbol={
                              userData &&
                              userData.plans[0].originalVer.userInput
                                .planCurrencySymbol
                                ? userData.plans[0].originalVer.userInput
                                    .planCurrencySymbol
                                : ''
                            }
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        {planContentOriginal &&
                        planContentOriginal.generatedRiskPro &&
                        !isError ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                planContentOriginal.generatedRiskPro,
                              ),
                            }}
                          />
                        ) : (
                          <></>
                        )}
                        <br />
                        <hr />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center">
                    {paymentError ? (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
                        role="alert"
                      >
                        {t('There was a problem with your payment')}
                        There was a problem with your payment
                      </div>
                    ) : (
                      <span>Verifying Account...</span>
                    )}
                    <br />
                    <span>
                      If you have paid but are unable to view the plan please
                      contact us at help@15minuteplan.ai
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const secretKey = process.env.API_KEY;
  const fbPixelId = process.env.FB_PIXEL_ID;
  const xPixelId = process.env.X_PIXEL_ID;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'loggedInFullPlanPro',
        'index',
      ])),
      secretKey,
      fbPixelId,
      xPixelId,
      // Will be passed to the page component as props
    },
  };
}
