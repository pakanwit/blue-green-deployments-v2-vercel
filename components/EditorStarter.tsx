import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../styles/Editor.module.css';
import { MoonLoader } from 'react-spinners';
import { BiUndo } from 'react-icons/bi';
import Image from 'next/image';
import _ from 'lodash';
import { AiOutlineUndo } from 'react-icons/ai';
import FinTable from './FinTable';
import ReactDOMServer from 'react-dom/server';
import EditFinance from './EditFinance';
import DOMPurify from 'dompurify';
import { set } from 'mongoose';
import { useTranslation } from 'next-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import trackEvent from '../utils/trackEvent';
import Input from './input';

export default function EditorComponent({
  planIdNum,

  Exec,
  Situ,
  Mark1,
  Mark2,
  Mark3,
  Op,
  Mang,
  Fin,
  Risk,

  originalExecFromDB,
  originalSituFromDB,
  originalMark1FromDB,
  originalMark2FromDB,
  originalMark3FromDB,
  originalOpFromDB,
  originalMangFromDB,
  originalRiskFromDB,

  initialInvestmentAmount,
  investmentItem1,
  investmentAmountItem1,
  investmentItem2,
  investmentAmountItem2,
  investmentItem3,
  investmentAmountItem3,
  investmentItem4,
  investmentAmountItem4,
  investmentItem5,
  investmentAmountItem5,
  investmentItem6,
  investmentAmountItem6,
  investmentItem7,
  investmentAmountItem7,
  investmentItem8,
  investmentAmountItem8,
  investmentItem9,
  investmentAmountItem9,
  investmentItem10,
  investmentAmountItem10,
  firstYearRevenue,
  revenueGrowthRate,
  COGSP,
  wageCostP,
  markCostP,
  rentCostP,
  genCostP,
  depreCostP,
  utilCostP,
  otherCostP,
  intCostP,
  taxCostP,

  userEmail,
  userInput,

  showSurvey,
  // surveyAlreadyDoneWord,
  // surveyAlreadyDonePDF,
  updateContentStatesWord,
  updateContentStatesPDF,

  setCOGSP,
  setWageCostP,
  setMarkCostP,
  setRentCostP,
  setGenCostP,
  setDepreCostP,
  setUtilCostP,
  setOtherCostP,
  setIntCostP,
  setTaxCostP,

  setFirstYearRevenue,
  setRevenueGrowthRate,

  setShowTopContent,

  setContentExec,
  setContentSitu,
  setContentMark1,
  setContentMark2,
  setContentMark3,
  setContentOp,
  setContentMang,
  setContentFin,
  setContentRisk,
  contentExec,
  contentSitu,
  contentMark1,
  contentMark2,
  contentMark3,
  contentOp,
  contentMang,
  contentFin,
  contentRisk,
  secretKey,
}) {
  // console.log("initialInvestmentAmount: ", initialInvestmentAmount);
  // console.log("investmentItem1: ", investmentItem1);
  // console.log("investmentAmountItem1: ", investmentAmountItem1);
  // console.log("investmentItem2: ", investmentItem2);
  // console.log("investmentAmountItem2: ", investmentAmountItem2);
  // console.log("investmentItem3: ", investmentItem3);
  // console.log("investmentAmountItem3: ", investmentAmountItem3);
  // console.log("investmentItem4: ", investmentItem4);
  // console.log("investmentAmountItem4: ", investmentAmountItem4);
  // console.log("investmentItem5: ", investmentItem5);
  // console.log("investmentAmountItem5: ", investmentAmountItem5);
  // console.log("investmentItem6: ", investmentItem6);
  // console.log("investmentAmountItem6: ", investmentAmountItem6);
  // console.log("investmentItem7: ", investmentItem7);
  // console.log("investmentAmountItem7: ", investmentAmountItem7);
  // console.log("investmentItem8: ", investmentItem8);
  // console.log("investmentAmountItem8: ", investmentAmountItem8);
  // console.log("investmentItem9: ", investmentItem9);
  // console.log("investmentAmountItem9: ", investmentAmountItem9);
  // console.log("investmentItem10: ", investmentItem10);
  // console.log("investmentAmountItem10: ", investmentAmountItem10);
  // console.log("firstYearRevenue: ", firstYearRevenue);
  // console.log("revenueGrowthRate: ", revenueGrowthRate);

  // console.log("COGSP: ", COGSP);
  // console.log("wageCostP: ", wageCostP);
  // console.log("markCostP: ", markCostP);
  // console.log("rentCostP: ", rentCostP);
  // console.log("genCostP: ", genCostP);
  // console.log("depreCostP: ", depreCostP);
  // console.log("utilCostP: ", utilCostP);
  // console.log("otherCostP: ", otherCostP);
  // console.log("intCostP: ", intCostP);
  // console.log("taxCostP: ", taxCostP);

  useEffect(() => {
    setShowTopContent(true);
  }, []);

  //Exec ------------------------------------------------------------------
  const [editInputExec, setEditExec] = useState('');
  const [isErrorExec, setIsErrorExec] = useState(false);
  const [isLoadingExec, setLoadingExec] = useState(false);
  const [doneExec, setDoneExec] = useState(false);
  const [tempContentExec, setTempContentExec] = useState('');
  const [replacePTagsExec, setReplacePTagsExec] = useState(false);
  const [prevContentExec, setPrevContentExec] = useState('');
  const [currentExIdStateExec, setCurrentExIdStateExec] = useState(0);
  const [getUpdateFromParentExec, setGetUpdateFromParentExec] = useState(true);
  const [showUndoExec, setShowUndoExec] = useState(false);
  const [toggleExec, setToggleExec] = useState(false);

  const editorRefExec = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentExec) {
      setContentExec(Exec);
    }
  }, [Exec]);

  const handleEditExec = (event) => {
    setEditExec(event.target.value);
  };

  async function saveEditInputExec() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput1Exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputExec,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitExec = (event) => {
    event.preventDefault();
    setPrevContentExec(contentExec);
    setContentExec('');
    saveEditInputExec();
    editExec();
  };

  // if prevContnetExec is empty then showUndoExec is false
  useEffect(() => {
    if (prevContentExec === '') {
      setShowUndoExec(false);
    } else {
      setShowUndoExec(true);
    }
  }, [prevContentExec]);

  const UndoChangeExec = () => {
    setIsErrorExec(false);
    setLoadingExec(false);
    setContentExec(prevContentExec);
  };

  const editorChangeHandlerExec = (newValue, editor) => {
    setContentExec(newValue);
  };

  const exIdRefExec = useRef(0);
  // this function generates edited content for the user
  async function editExec() {
    const currentExIdExec = Date.now(); // Generate a unique ex ID
    exIdRefExec.current = currentExIdExec;
    setCurrentExIdStateExec(currentExIdExec);
    setLoadingExec(true);
    setGetUpdateFromParentExec(false);

    const existingContent = contentExec;
    const editInstruction = editInputExec;
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Executive Summary';
    const parsedPositioningForEdit = '';

    console.log('planLanguage from EditorStarter editExec: ', planLanguage);

    const exec = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!exec.ok) {
      setIsErrorExec(true);
      setLoadingExec(false);
      return;
    }

    // This data is a ReadableStream
    const execStream = exec.body;
    if (!execStream) {
      setIsErrorExec(true);
      setLoadingExec(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerExec = execStream.getReader();
    const decoderExec = new TextDecoder();

    let done = false;
    setReplacePTagsExec(true);
    while (!done) {
      const { value, done: doneExecReading } = await readerExec.read();
      done = doneExecReading;
      const chunkValue = decoderExec.decode(value);
      if (exIdRefExec.current === currentExIdExec) {
        setTempContentExec((prev) => prev + chunkValue);
        setContentExec((prev) => prev + chunkValue);
      } else {
        // If the ex ID has changed, break the loop
        break;
      }
      setToggleExec((prev) => !prev);
    }

    if (exIdRefExec.current === currentExIdExec) {
      setDoneExec(true);
      setLoadingExec(false);
    }
  }

  useEffect(() => {
    if (replacePTagsExec) {
      setContentExec(contentExec.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleExec, replacePTagsExec]);

  useEffect(() => {
    if (exIdRefExec.current === currentExIdStateExec && doneExec) {
      setReplacePTagsExec(false);
      setContentExec(tempContentExec);
      setTempContentExec('');
      setGetUpdateFromParentExec(true);
      setDoneExec(false);
    }
  }, [tempContentExec, doneExec]);

  function revertToOriginalExec() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_executive_summary',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Executive Summary you first generated?',
      )
    ) {
      setContentExec(originalExecFromDB);
    }
  }

  //Situ -------------------------------------------------------------------------
  const [editInputSitu, setEditSitu] = useState('');
  const [isErrorSitu, setIsErrorSitu] = useState(false);
  const [isLoadingSitu, setLoadingSitu] = useState(false);
  const [doneSitu, setDoneSitu] = useState(false);
  const [tempContentSitu, setTempContentSitu] = useState('');
  const [replacePTagsSitu, setReplacePTagsSitu] = useState(false);
  const [prevContentSitu, setPrevContentSitu] = useState('');
  const [currentExIdStateSitu, setCurrentExIdStateSitu] = useState(0);
  const [getUpdateFromParentSitu, setGetUpdateFromParentSitu] = useState(true);
  const [showUndoSitu, setShowUndoSitu] = useState(false);
  const [toggleSitu, setToggleSitu] = useState(false);

  const editorRefSitu = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentSitu) {
      setContentSitu(Situ);
    }
  }, [Situ]);

  const handleEditSitu = (event) => {
    setEditSitu(event.target.value);
  };

  async function saveEditInputSitu() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput2Situ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputSitu,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitSitu = (event) => {
    event.preventDefault();
    setPrevContentSitu(contentSitu);
    setContentSitu('');
    saveEditInputSitu();
    editSitu();
  };

  useEffect(() => {
    if (prevContentSitu === '') {
      setShowUndoSitu(false);
    } else {
      setShowUndoSitu(true);
    }
  }, [prevContentSitu]);

  const UndoChangeSitu = () => {
    setIsErrorSitu(false);
    setLoadingSitu(false);
    setContentSitu(prevContentSitu);
  };

  const editorChangeHandlerSitu = (newValue, editor) => {
    setContentSitu(newValue);
  };

  const exIdRefSitu = useRef(0);

  // this function generates edited content for the user
  async function editSitu() {
    const currentExIdSitu = Date.now(); // Generate a unique SituEx ID
    exIdRefSitu.current = currentExIdSitu;
    setCurrentExIdStateSitu(currentExIdSitu);
    setLoadingSitu(true);
    setGetUpdateFromParentSitu(false);

    const existingContent = contentSitu;
    const editInstruction = editInputSitu;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Situation Analysis';

    const Situ = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Situ.ok) {
      setIsErrorSitu(true);
      setLoadingSitu(false);
      return;
    }

    // This data is a ReadableStream
    const SituStream = Situ.body;
    if (!SituStream) {
      setIsErrorSitu(true);
      setLoadingSitu(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerSitu = SituStream.getReader();
    const decoderSitu = new TextDecoder();

    let done = false;
    setReplacePTagsSitu(true);
    while (!done) {
      const { value, done: doneSituReading } = await readerSitu.read();
      done = doneSituReading;
      const chunkValue = decoderSitu.decode(value);
      if (exIdRefSitu.current === currentExIdSitu) {
        setTempContentSitu((prev) => prev + chunkValue);
        setContentSitu((prev) => prev + chunkValue);
      } else {
        // If the SituEx ID has changed, break the loop
        break;
      }
      setToggleSitu((prev) => !prev);
    }

    if (exIdRefSitu.current === currentExIdSitu) {
      setDoneSitu(true);
      setLoadingSitu(false);
    }
  }

  useEffect(() => {
    if (replacePTagsSitu) {
      setContentSitu(contentSitu.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleSitu, replacePTagsSitu]);

  useEffect(() => {
    if (exIdRefSitu.current === currentExIdStateSitu && doneSitu) {
      setReplacePTagsSitu(false);
      setContentSitu(tempContentSitu);
      setTempContentSitu('');
      setGetUpdateFromParentSitu(true);
      setDoneSitu(false);
    }
  }, [tempContentSitu, doneSitu]);

  function revertToOriginalSitu() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_situation_analysis',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Situation Analysis you first generated?',
      )
    ) {
      setContentSitu(originalSituFromDB);
    }
  }

  //Mark1 ------------------------------------------------------------------------------------
  const [editInputMark1, setEditMark1] = useState('');
  const [isErrorMark1, setIsErrorMark1] = useState(false);
  const [isLoadingMark1, setLoadingMark1] = useState(false);
  const [doneMark1, setDoneMark1] = useState(false);
  const [tempContentMark1, setTempContentMark1] = useState('');
  const [replacePTagsMark1, setReplacePTagsMark1] = useState(false);
  const [prevContentMark1, setPrevContentMark1] = useState('');
  const [currentExIdStateMark1, setCurrentExIdStateMark1] = useState(0);
  const [getUpdateFromParentMark1, setGetUpdateFromParentMark1] =
    useState(true);
  const [showUndoMark1, setShowUndoMark1] = useState(false);
  const [toggleMark1, setToggleMark1] = useState(false);

  const editorRefMark1 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark1) {
      setContentMark1(Mark1);
    }
  }, [Mark1]);

  const handleEditMark1 = (event) => {
    setEditMark1(event.target.value);
  };

  async function saveEditInputMark1() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput3Mark1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputMark1,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitMark1 = (event) => {
    event.preventDefault();
    setPrevContentMark1(contentMark1);
    setContentMark1('');
    saveEditInputMark1();
    editMark1();
  };

  useEffect(() => {
    if (prevContentMark1 === '') {
      setShowUndoMark1(false);
    } else {
      setShowUndoMark1(true);
    }
  }, [prevContentMark1]);

  const UndoChangeMark1 = () => {
    setIsErrorMark1(false);
    setLoadingMark1(false);
    setContentMark1(prevContentMark1);
  };

  const editorChangeHandlerMark1 = (newValue, editor) => {
    setContentMark1(newValue);
  };

  const exIdRefMark1 = useRef(0);
  // this function generates edited content for the user
  async function editMark1() {
    const currentExIdMark1 = Date.now(); // Generate a unique Mark1ution ID
    exIdRefMark1.current = currentExIdMark1;
    setCurrentExIdStateMark1(currentExIdMark1);
    setLoadingMark1(true);
    setGetUpdateFromParentMark1(false);

    const existingContent = contentMark1;
    const editInstruction = editInputMark1;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'business objectives and STP';

    console.log('planLanguage from EditorStarter: ', planLanguage);

    const Mark1 = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Mark1.ok) {
      setIsErrorMark1(true);
      setLoadingMark1(false);
      return;
    }

    // This data is a ReadableStream
    const Mark1Stream = Mark1.body;
    if (!Mark1Stream) {
      setIsErrorMark1(true);
      setLoadingMark1(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark1 = Mark1Stream.getReader();
    const decoderMark1 = new TextDecoder();

    let done = false;
    setReplacePTagsMark1(true);
    while (!done) {
      const { value, done: doneMark1Reading } = await readerMark1.read();
      done = doneMark1Reading;
      const chunkValue = decoderMark1.decode(value);
      if (exIdRefMark1.current === currentExIdMark1) {
        setTempContentMark1((prev) => prev + chunkValue);
        setContentMark1((prev) => prev + chunkValue);
      } else {
        // If the Mark1Ex ID has changed, break the loop
        break;
      }
      setToggleMark1((prev) => !prev);
    }

    if (exIdRefMark1.current === currentExIdMark1) {
      setDoneMark1(true);
      setLoadingMark1(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark1) {
      setContentMark1(contentMark1.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark1, replacePTagsMark1]);

  useEffect(() => {
    if (exIdRefMark1.current === currentExIdStateMark1 && doneMark1) {
      setReplacePTagsMark1(false);
      setContentMark1(tempContentMark1);
      setTempContentMark1('');
      setGetUpdateFromParentMark1(true);
      setDoneMark1(false);
    }
  }, [tempContentMark1, doneMark1]);

  function revertToOriginalMark1() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_marketing1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark1(originalMark1FromDB);
    }
  }

  useEffect(() => {
    if (contentMark1) {
      let startIndex = contentMark1.indexOf('<h3>Positioning</h3>');

      if (startIndex === -1) {
        startIndex = contentMark1.indexOf('Positioning');
      }

      if (startIndex === -1) {
        startIndex = contentMark1.indexOf('positioning');
      }

      if (startIndex === -1) {
        startIndex = 0;
      }

      const endIndex = contentMark1.length;
      const parsedContent = contentMark1.substring(startIndex, endIndex);
      setParsedPositioning(parsedContent);
    }
  }, [contentMark1]);

  const [parsedPositioning, setParsedPositioning] = useState('');

  //Mark2 ------------------------------------------------------------------------------------
  const [editInputMark2, setEditMark2] = useState('');
  const [isErrorMark2, setIsErrorMark2] = useState(false);
  const [isLoadingMark2, setLoadingMark2] = useState(false);
  const [doneMark2, setDoneMark2] = useState(false);
  const [tempContentMark2, setTempContentMark2] = useState('');
  const [replacePTagsMark2, setReplacePTagsMark2] = useState(false);
  const [prevContentMark2, setPrevContentMark2] = useState('');
  const [currentExIdStateMark2, setCurrentExIdStateMark2] = useState(0);
  const [getUpdateFromParentMark2, setGetUpdateFromParentMark2] =
    useState(true);
  const [showUndoMark2, setShowUndoMark2] = useState(false);
  const [toggleMark2, setToggleMark2] = useState(false);

  const editorRefMark2 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark2) {
      setContentMark2(Mark2);
    }
  }, [Mark2]);

  const handleEditMark2 = (event) => {
    setEditMark2(event.target.value);
  };

  async function saveEditInputMark2() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput3Mark2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputMark2,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitMark2 = (event) => {
    event.preventDefault();
    setPrevContentMark2(contentMark2);
    setContentMark2('');
    saveEditInputMark2();
    editMark2();
  };

  useEffect(() => {
    if (prevContentMark2 === '') {
      setShowUndoMark2(false);
    } else {
      setShowUndoMark2(true);
    }
  }, [prevContentMark2]);

  const UndoChangeMark2 = () => {
    setIsErrorMark2(false);
    setLoadingMark2(false);
    setContentMark2(prevContentMark2);
  };

  const editorChangeHandlerMark2 = (newValue, editor) => {
    setContentMark2(newValue);
  };

  const exIdRefMark2 = useRef(0);
  // this function generates edited content for the user
  async function editMark2() {
    const currentExIdMark2 = Date.now(); // Generate a unique Mark2ution ID
    exIdRefMark2.current = currentExIdMark2;
    setCurrentExIdStateMark2(currentExIdMark2);
    setLoadingMark2(true);
    setGetUpdateFromParentMark2(false);

    const existingContent = contentMark2;
    const editInstruction = editInputMark2;
    const parsedPositioningForEdit = parsedPositioning;
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Product and Pricing Strategy';

    const Mark2 = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Mark2.ok) {
      setIsErrorMark2(true);
      setLoadingMark2(false);
      return;
    }

    // This data is a ReadableStream
    const Mark2Stream = Mark2.body;
    if (!Mark2Stream) {
      setIsErrorMark2(true);
      setLoadingMark2(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark2 = Mark2Stream.getReader();
    const decoderMark2 = new TextDecoder();

    let done = false;
    setReplacePTagsMark2(true);
    while (!done) {
      const { value, done: doneMark2Reading } = await readerMark2.read();
      done = doneMark2Reading;
      const chunkValue = decoderMark2.decode(value);
      if (exIdRefMark2.current === currentExIdMark2) {
        setTempContentMark2((prev) => prev + chunkValue);
        setContentMark2((prev) => prev + chunkValue);
      } else {
        // If the Mark2ution ID has changed, break the loop
        break;
      }
      setToggleMark2((prev) => !prev);
    }

    if (exIdRefMark2.current === currentExIdMark2) {
      setDoneMark2(true);
      setLoadingMark2(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark2) {
      setContentMark2(contentMark2.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark2, replacePTagsMark2]);

  useEffect(() => {
    if (exIdRefMark2.current === currentExIdStateMark2 && doneMark2) {
      setReplacePTagsMark2(false);
      setContentMark2(tempContentMark2);
      setTempContentMark2('');
      setGetUpdateFromParentMark2(true);
      setDoneMark2(false);
    }
  }, [tempContentMark2, doneMark2]);

  function revertToOriginalMark2() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_marketing2',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark2(originalMark2FromDB);
    }
  }

  //Mark3 ------------------------------------------------------------------------------------
  const [editInputMark3, setEditMark3] = useState('');
  const [isErrorMark3, setIsErrorMark3] = useState(false);
  const [isLoadingMark3, setLoadingMark3] = useState(false);
  const [doneMark3, setDoneMark3] = useState(false);
  const [tempContentMark3, setTempContentMark3] = useState('');
  const [replacePTagsMark3, setReplacePTagsMark3] = useState(false);
  const [prevContentMark3, setPrevContentMark3] = useState('');
  const [currentExIdStateMark3, setCurrentExIdStateMark3] = useState(0);
  const [getUpdateFromParentMark3, setGetUpdateFromParentMark3] =
    useState(true);
  const [showUndoMark3, setShowUndoMark3] = useState(false);
  const [toggleMark3, setToggleMark3] = useState(false);

  const editorRefMark3 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark3) {
      setContentMark3(Mark3);
    }
  }, [Mark3]);

  const handleEditMark3 = (event) => {
    setEditMark3(event.target.value);
  };

  async function saveEditInputMark3() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput3Mark3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputMark3,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitMark3 = (event) => {
    event.preventDefault();
    setPrevContentMark3(contentMark3);
    setContentMark3('');
    saveEditInputMark3();
    editMark3();
  };

  useEffect(() => {
    if (prevContentMark3 === '') {
      setShowUndoMark3(false);
    } else {
      setShowUndoMark3(true);
    }
  }, [prevContentMark3]);

  const UndoChangeMark3 = () => {
    setIsErrorMark3(false);
    setLoadingMark3(false);
    setContentMark3(prevContentMark3);
  };

  const editorChangeHandlerMark3 = (newValue, editor) => {
    setContentMark3(newValue);
  };

  const exIdRefMark3 = useRef(0);
  // this function generates edited content for the user
  async function editMark3() {
    const currentExIdMark3 = Date.now(); // Generate a unique Mark3ution ID
    exIdRefMark3.current = currentExIdMark3;
    setCurrentExIdStateMark3(currentExIdMark3);
    setLoadingMark3(true);
    setGetUpdateFromParentMark3(false);

    const existingContent = contentMark3;
    const editInstruction = editInputMark3;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';

    let topic = '';
    if (userInput && userInput.productOrService === 'product') {
      topic = 'distribution';
    } else if (userInput && userInput.productOrService === 'service') {
      topic = 'service';
    }

    const sectionName = `${topic} strategy and advertising strategy`;

    const Mark3 = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Mark3.ok) {
      setIsErrorMark3(true);
      setLoadingMark3(false);
      return;
    }

    // This data is a ReadableStream
    const Mark3Stream = Mark3.body;
    if (!Mark3Stream) {
      setIsErrorMark3(true);
      setLoadingMark3(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark3 = Mark3Stream.getReader();
    const decoderMark3 = new TextDecoder();

    let done = false;
    setReplacePTagsMark3(true);
    while (!done) {
      const { value, done: doneMark3Reading } = await readerMark3.read();
      done = doneMark3Reading;
      const chunkValue = decoderMark3.decode(value);
      if (exIdRefMark3.current === currentExIdMark3) {
        setTempContentMark3((prev) => prev + chunkValue);
        setContentMark3((prev) => prev + chunkValue);
      } else {
        // If the Mark3ution ID has changed, break the loop
        break;
      }
      setToggleMark3((prev) => !prev);
    }

    if (exIdRefMark3.current === currentExIdMark3) {
      setDoneMark3(true);
      setLoadingMark3(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark3) {
      setContentMark3(contentMark3.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark3, replacePTagsMark3]);

  useEffect(() => {
    if (exIdRefMark3.current === currentExIdStateMark3 && doneMark3) {
      setReplacePTagsMark3(false);
      setContentMark3(tempContentMark3);
      setTempContentMark3('');
      setGetUpdateFromParentMark3(true);
      setDoneMark3(false);
    }
  }, [tempContentMark3, doneMark3]);

  function revertToOriginalMark3() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_marketing3',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark3(originalMark3FromDB);
    }
  }

  //Op ------------------------------------------------------------------------------
  const [editInputOp, setEditOp] = useState('');
  const [isErrorOp, setIsErrorOp] = useState(false);
  const [isLoadingOp, setLoadingOp] = useState(false);
  const [doneOp, setDoneOp] = useState(false);
  const [tempContentOp, setTempContentOp] = useState('');
  const [replacePTagsOp, setReplacePTagsOp] = useState(false);
  const [prevContentOp, setPrevContentOp] = useState('');
  const [currentExIdStateOp, setCurrentExIdStateOp] = useState(0);
  const [getUpdateFromParentOp, setGetUpdateFromParentOp] = useState(true);
  const [showUndoOp, setShowUndoOp] = useState(false);
  const [toggleOp, setToggleOp] = useState(false);

  const editorRefOp = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentOp) {
      setContentOp(Op);
    }
  }, [Op]);

  const handleEditOp = (event) => {
    setEditOp(event.target.value);
  };

  async function saveEditInputOp() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput4Op', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputOp,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitOp = (event) => {
    event.preventDefault();
    setPrevContentOp(contentOp);
    setContentOp('');
    saveEditInputOp();
    editOp();
  };

  useEffect(() => {
    if (prevContentOp === '') {
      setShowUndoOp(false);
    } else {
      setShowUndoOp(true);
    }
  }, [prevContentOp]);

  const UndoChangeOp = () => {
    setIsErrorOp(false);
    setLoadingOp(false);
    setContentOp(prevContentOp);
  };

  const editorChangeHandlerOp = (newValue, editor) => {
    setContentOp(newValue);
  };

  const exIdRefOp = useRef(0);
  // this function generates edited content for the user
  async function editOp() {
    const currentExIdOp = Date.now(); // Generate a unique Opution ID
    exIdRefOp.current = currentExIdOp;
    setCurrentExIdStateOp(currentExIdOp);
    setLoadingOp(true);
    setGetUpdateFromParentOp(false);

    const existingContent = contentOp;
    const editInstruction = editInputOp;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Operations';

    const Op = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Op.ok) {
      setIsErrorOp(true);
      setLoadingOp(false);
      return;
    }

    // This data is a ReadableStream
    const OpStream = Op.body;
    if (!OpStream) {
      setIsErrorOp(true);
      setLoadingOp(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerOp = OpStream.getReader();
    const decoderOp = new TextDecoder();

    let done = false;
    setReplacePTagsOp(true);
    while (!done) {
      const { value, done: doneOpReading } = await readerOp.read();
      done = doneOpReading;
      const chunkValue = decoderOp.decode(value);
      if (exIdRefOp.current === currentExIdOp) {
        setTempContentOp((prev) => prev + chunkValue);
        setContentOp((prev) => prev + chunkValue);
      } else {
        // If the Opution ID has changed, break the loop
        break;
      }
      setToggleOp((prev) => !prev);
    }

    if (exIdRefOp.current === currentExIdOp) {
      setDoneOp(true);
      setLoadingOp(false);
    }
  }

  useEffect(() => {
    if (replacePTagsOp) {
      setContentOp(contentOp.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleOp, replacePTagsOp]);

  useEffect(() => {
    if (exIdRefOp.current === currentExIdStateOp && doneOp) {
      setReplacePTagsOp(false);
      setContentOp(tempContentOp);
      setTempContentOp('');
      setGetUpdateFromParentOp(true);
      setDoneOp(false);
    }
  }, [tempContentOp, doneOp]);

  function revertToOriginalOp() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_operation',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Operation content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentOp(originalOpFromDB);
    }
  }

  //Mang---------------------------------------------------------------------
  const [editInputMang, setEditMang] = useState('');
  const [isErrorMang, setIsErrorMang] = useState(false);
  const [isLoadingMang, setLoadingMang] = useState(false);
  const [doneMang, setDoneMang] = useState(false);
  const [tempContentMang, setTempContentMang] = useState('');
  const [replacePTagsMang, setReplacePTagsMang] = useState(false);
  const [prevContentMang, setPrevContentMang] = useState('');
  const [currentExIdStateMang, setCurrentExIdStateMang] = useState(0);
  const [getUpdateFromParentMang, setGetUpdateFromParentMang] = useState(true);
  const [showUndoMang, setShowUndoMang] = useState(false);
  const [toggleMang, setToggleMang] = useState(false);

  const editorRefMang = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMang) {
      setContentMang(Mang);
    }
  }, [Mang]);

  const handleEditMang = (event) => {
    setEditMang(event.target.value);
  };

  async function saveEditInputMang() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput5Mang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputMang,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitMang = (event) => {
    event.preventDefault();
    setPrevContentMang(contentMang);
    setContentMang('');
    saveEditInputMang();
    editMang();
  };

  useEffect(() => {
    if (prevContentMang === '') {
      setShowUndoMang(false);
    } else {
      setShowUndoMang(true);
    }
  }, [prevContentMang]);

  const UndoChangeMang = () => {
    setIsErrorMang(false);
    setLoadingMang(false);
    setContentMang(prevContentMang);
  };

  const editorChangeHandlerMang = (newValue, editor) => {
    setContentMang(newValue);
  };

  const exIdRefMang = useRef(0);
  // this function generates edited content for the user
  async function editMang() {
    const currentExIdMang = Date.now(); // Generate a unique Mangution ID
    exIdRefMang.current = currentExIdMang;
    setCurrentExIdStateMang(currentExIdMang);
    setLoadingMang(true);
    setGetUpdateFromParentMang(false);

    const existingContent = contentMang;
    const editInstruction = editInputMang;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Management';

    const Mang = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Mang.ok) {
      setIsErrorMang(true);
      setLoadingMang(false);
      return;
    }

    // This data is a ReadableStream
    const MangStream = Mang.body;
    if (!MangStream) {
      setIsErrorMang(true);
      setLoadingMang(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMang = MangStream.getReader();
    const decoderMang = new TextDecoder();

    let done = false;
    setReplacePTagsMang(true);
    while (!done) {
      const { value, done: doneMangReading } = await readerMang.read();
      done = doneMangReading;
      const chunkValue = decoderMang.decode(value);
      if (exIdRefMang.current === currentExIdMang) {
        setTempContentMang((prev) => prev + chunkValue);
        setContentMang((prev) => prev + chunkValue);
      } else {
        // If the Mangution ID has changed, break the loMang
        break;
      }
      setToggleMang((prev) => !prev);
    }

    if (exIdRefMang.current === currentExIdMang) {
      setDoneMang(true);
      setLoadingMang(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMang) {
      setContentMang(contentMang.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMang, replacePTagsMang]);

  useEffect(() => {
    if (exIdRefMang.current === currentExIdStateMang && doneMang) {
      setReplacePTagsMang(false);
      setContentMang(tempContentMang);
      setTempContentMang('');
      setGetUpdateFromParentMang(true);
      setDoneMang(false);
    }
  }, [tempContentMang, doneMang]);

  function revertToOriginalMang() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_management',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Mangement content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMang(originalMangFromDB);
    }
  }
  //Finance-----------------------------------------------------
  const [updatedHeadFin, setUpdatedHeadFin] = useState('');
  const [updatedHeadFinSetting, setUpdatedHeadFinSetting] = useState(false);
  const [isEdittingFinance, setIsEdittingFinance] = useState(false);
  const [edittedFinance, setEdittedFinance] = useState(false);

  useEffect(() => {
    const finTableHtml = ReactDOMServer.renderToString(
      FinTable({
        initialInvestmentAmount: initialInvestmentAmount,
        investmentItem1: investmentItem1,
        investmentAmountItem1: investmentAmountItem1,

        investmentItem2: investmentItem2,
        investmentAmountItem2: investmentAmountItem2,

        investmentItem3: investmentItem3,
        investmentAmountItem3: investmentAmountItem3,

        investmentItem4: investmentItem4,
        investmentAmountItem4: investmentAmountItem4,

        investmentItem5: investmentItem5,
        investmentAmountItem5: investmentAmountItem5,

        investmentItem6: investmentItem6,
        investmentAmountItem6: investmentAmountItem6,

        investmentItem7: investmentItem7,
        investmentAmountItem7: investmentAmountItem7,

        investmentItem8: investmentItem8,
        investmentAmountItem8: investmentAmountItem8,

        investmentItem9: investmentItem9,
        investmentAmountItem9: investmentAmountItem9,

        investmentItem10: investmentItem10,
        investmentAmountItem10: investmentAmountItem10,

        firstYearRevenue: firstYearRevenue,
        revenueGrowthRate: revenueGrowthRate,

        COGSP: COGSP,
        wageCostP: wageCostP,
        markCostP: markCostP,
        rentCostP: rentCostP,
        genCostP: genCostP,
        depreCostP: depreCostP,
        utilCostP: utilCostP,
        otherCostP: otherCostP,
        intCostP: intCostP,
        taxCostP: taxCostP,

        planLanguage:
          userInput && userInput.planLanguage ? userInput.planLanguage : 'en',
        planCurrency:
          userInput && userInput.planCurrency ? userInput.planCurrency : 'usd',
        planCurrencySymbol:
          userInput && userInput.planCurrencySymbol
            ? userInput.planCurrencySymbol
            : '$',
      }),
    );

    const updatedHeadFin = finTableHtml
      .replace(/<h1>/g, '<h4>')
      .replace(/<\/h1>/g, '</h4>')
      .replace(/<h2>/g, '<h5>')
      .replace(/<\/h2>/g, '</h5>')
      .replace(/<h3>/g, '<h6>')
      .replace(/<\/h3>/g, '</h6>');

    const updatedHeadFinEditedVer = Fin.replace(/<h1>/g, '<h4>')
      .replace(/<\/h1>/g, '</h4>')
      .replace(/<h2>/g, '<h5>')
      .replace(/<\/h2>/g, '</h5>')
      .replace(/<h3>/g, '<h6>')
      .replace(/<\/h3>/g, '</h6>');

    if (Fin) {
      setContentFin(updatedHeadFinEditedVer);

      if (edittedFinance) setContentFin(updatedHeadFin);
    } else {
      setContentFin(updatedHeadFin);
    }
  }, [
    initialInvestmentAmount,
    investmentItem1,
    investmentAmountItem1,
    investmentItem2,
    investmentAmountItem2,
    investmentItem3,
    investmentAmountItem3,
    investmentItem4,
    investmentAmountItem4,
    investmentItem5,
    investmentAmountItem5,
    investmentItem6,
    investmentAmountItem6,
    investmentItem7,
    investmentAmountItem7,
    investmentItem8,
    investmentAmountItem8,
    investmentItem9,
    investmentAmountItem9,
    investmentItem10,
    investmentAmountItem10,
    firstYearRevenue,
    revenueGrowthRate,
    COGSP,
    wageCostP,
    markCostP,
    rentCostP,
    genCostP,
    depreCostP,
    utilCostP,
    otherCostP,
    intCostP,
    taxCostP,

    Fin,
  ]);

  //Risk-------------------------------------------------------------------
  const [editInputRisk, setEditRisk] = useState('');
  const [isErrorRisk, setIsErrorRisk] = useState(false);
  const [isLoadingRisk, setLoadingRisk] = useState(false);
  const [doneRisk, setDoneRisk] = useState(false);
  const [tempContentRisk, setTempContentRisk] = useState('');
  const [replacePTagsRisk, setReplacePTagsRisk] = useState(false);
  const [prevContentRisk, setPrevContentRisk] = useState('');
  const [currentExIdStateRisk, setCurrentExIdStateRisk] = useState(0);
  const [getUpdateFromParentRisk, setGetUpdateFromParentRisk] = useState(true);
  const [showUndoRisk, setShowUndoRisk] = useState(false);
  const [toggleRisk, setToggleRisk] = useState(false);

  const editorRefRisk = useRef(null);

  const handleEditFinance = () => {
    trackEvent({
      event_name: 'edit_finance_button',
    });
    setIsEdittingFinance(true);
  };

  useEffect(() => {
    if (getUpdateFromParentRisk) {
      setContentRisk(Risk);
    }
  }, [Risk]);

  const handleEditRisk = (event) => {
    setEditRisk(event.target.value);
  };

  async function saveEditInputRisk() {
    try {
      const response = await fetch('/api/saveEditInput/saveEditInput6Risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputRisk,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleSubmitRisk = (event) => {
    event.preventDefault();
    setPrevContentRisk(contentRisk);
    setContentRisk('');
    saveEditInputRisk();
    editRisk();
  };

  useEffect(() => {
    if (prevContentRisk === '') {
      setShowUndoRisk(false);
    } else {
      setShowUndoRisk(true);
    }
  }, [prevContentRisk]);

  const UndoChangeRisk = () => {
    setIsErrorRisk(false);
    setLoadingRisk(false);
    setContentRisk(prevContentRisk);
  };

  const editorChangeHandlerRisk = (newValue, editor) => {
    setContentRisk(newValue);
  };

  const exIdRefRisk = useRef(0);
  // this function generates edited content for the user
  async function editRisk() {
    const currentExIdRisk = Date.now(); // Generate a unique Riskution ID
    exIdRefRisk.current = currentExIdRisk;
    setCurrentExIdStateRisk(currentExIdRisk);
    setLoadingRisk(true);
    setGetUpdateFromParentRisk(false);

    const existingContent = contentRisk;
    const editInstruction = editInputRisk;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Risk and Mitigation';

    const Risk = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,

        userInput,
        planLanguage,
        sectionName,
      }),
    });

    console.log('Edge function returned.');

    if (!Risk.ok) {
      setIsErrorRisk(true);
      setLoadingRisk(false);
      return;
    }

    // This data is a ReadableStream
    const RiskStream = Risk.body;
    if (!RiskStream) {
      setIsErrorRisk(true);
      setLoadingRisk(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerRisk = RiskStream.getReader();
    const decoderRisk = new TextDecoder();

    let done = false;
    setReplacePTagsRisk(true);
    while (!done) {
      const { value, done: doneRiskReading } = await readerRisk.read();
      done = doneRiskReading;
      const chunkValue = decoderRisk.decode(value);
      if (exIdRefRisk.current === currentExIdRisk) {
        setTempContentRisk((prev) => prev + chunkValue);
        setContentRisk((prev) => prev + chunkValue);
      } else {
        // If the Riskution ID has changed, break the loRisk
        break;
      }
      setToggleRisk((prev) => !prev);
    }

    if (exIdRefRisk.current === currentExIdRisk) {
      setDoneRisk(true);
      setLoadingRisk(false);
    }
  }

  useEffect(() => {
    if (replacePTagsRisk) {
      setContentRisk(contentRisk.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleRisk, replacePTagsRisk]);

  useEffect(() => {
    if (exIdRefRisk.current === currentExIdStateRisk && doneRisk) {
      setReplacePTagsRisk(false);
      setContentRisk(tempContentRisk);
      setTempContentRisk('');
      setGetUpdateFromParentRisk(true);
      setDoneRisk(false);
    }
  }, [tempContentRisk, doneRisk]);

  function revertToOriginalRisk() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'starter_risk',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Risk and Mitigation you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentRisk(originalRiskFromDB);
    }
  }

  //General ------------------------------------------------------------------------
  const [editLimitReached, setEditLimitReached] = useState(false);
  const [planLanguage, setPlanLanguage] = useState('en');

  useEffect(() => {
    setPlanLanguage(
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en',
    );
  }, [userInput]);

  // Define common editor prMangs
  const editorApiKey = 'w8akvuenco5bc2a35ee29tjd7fwuh3p80ym7cn8dic0bc92s';
  const [editorInit, setEditorInit] = useState({
    height: 500,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | blocks | ' +
      'bold italic | ' +
      'alignleft aligncenter alignjustify alignright | bullist numlist outdent indent | help',
    content_style: 'body { font-family:"Segoe UI",sans-serif; font-size:16px }',
    branding: false,
    directionality: planLanguage === 'ar' ? 'rtl' : ('ltr' as 'rtl' | 'ltr'),
  });

  useEffect(() => {
    if (userInput && userInput.planLanguage) {
      setEditorInit((prevState) => ({
        ...prevState,
        directionality: (userInput.planLanguage === 'ar' ? 'rtl' : 'ltr') as
          | 'rtl'
          | 'ltr',
      }));
    }
  }, [userInput]);

  const debouncedSave = _.debounce(saveContentToDB, 2000);

  async function saveContentToDB() {
    console.log('saveContentToDB() called');
    try {
      const response = await fetch('/api/saveEditStarter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          contentExec,
          contentSitu,
          contentMark1,
          contentMark2,
          contentMark3,
          contentOp,
          contentMang,
          contentFin,
          contentRisk,

          userEmail,
          planIdNum,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // assuming your API returns a JSON response
      return data; // use or return the data as needed
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (
      userEmail &&
      !isLoadingExec &&
      !isLoadingSitu &&
      !isLoadingMark1 &&
      !isLoadingMark2 &&
      !isLoadingMark3 &&
      !isLoadingOp &&
      !isLoadingMang &&
      !isLoadingRisk
    ) {
      debouncedSave();
    }

    return () => {
      debouncedSave.cancel(); // cancels the debounce if userEmail changes
    };
  }, [
    contentExec,
    contentSitu,
    contentMark1,
    contentMark2,
    contentMark3,
    contentOp,
    contentMang,
    contentRisk,
    contentFin,
    userEmail,
  ]);

  async function updateEditQuota() {
    try {
      const response = await fetch('/api/updateEditQuota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.user && data.user.editQuota <= 0) {
        setEditLimitReached(true);
        setTimeout(() => {
          setEditLimitReached(false);
        }, 20000);
        setLoadingExec(false);
        setLoadingSitu(false);
      }

      return data.user ? data.user.editQuota : null;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const { t } = useTranslation('EditorStarter');

  return (
    <>
      {isEdittingFinance ? (
        <div>
          <EditFinance
            setCOGSP={setCOGSP}
            setWageCostP={setWageCostP}
            setMarkCostP={setMarkCostP}
            setRentCostP={setRentCostP}
            setGenCostP={setGenCostP}
            setDepreCostP={setDepreCostP}
            setUtilCostP={setUtilCostP}
            setOtherCostP={setOtherCostP}
            setIntCostP={setIntCostP}
            setTaxCostP={setTaxCostP}
            setFirstYearRevenue={setFirstYearRevenue}
            setRevenueGrowthRate={setRevenueGrowthRate}
            COGSP={COGSP}
            wageCostP={wageCostP}
            markCostP={markCostP}
            rentCostP={rentCostP}
            genCostP={genCostP}
            depreCostP={depreCostP}
            utilCostP={utilCostP}
            otherCostP={otherCostP}
            intCostP={intCostP}
            taxCostP={taxCostP}
            firstYearRevenue={firstYearRevenue}
            revenueGrowthRate={revenueGrowthRate}
            setIsEdittingFinance={setIsEdittingFinance}
            initialInvestmentAmount={initialInvestmentAmount}
            investmentItem1={investmentItem1}
            investmentAmountItem1={investmentAmountItem1}
            investmentItem2={investmentItem2}
            investmentAmountItem2={investmentAmountItem2}
            investmentItem3={investmentItem3}
            investmentAmountItem3={investmentAmountItem3}
            investmentItem4={investmentItem4}
            investmentAmountItem4={investmentAmountItem4}
            investmentItem5={investmentItem5}
            investmentAmountItem5={investmentAmountItem5}
            investmentItem6={investmentItem6}
            investmentAmountItem6={investmentAmountItem6}
            investmentItem7={investmentItem7}
            investmentAmountItem7={investmentAmountItem7}
            investmentItem8={investmentItem8}
            investmentAmountItem8={investmentAmountItem8}
            investmentItem9={investmentItem9}
            investmentAmountItem9={investmentAmountItem9}
            investmentItem10={investmentItem10}
            investmentAmountItem10={investmentAmountItem10}
            setEdittedFinance={setEdittedFinance}
            setShowTopContent={setShowTopContent}
            planIdNum={planIdNum}
            secretKey={secretKey}
          />
        </div>
      ) : (
        <div>
          {/*------------------------ Executive Summary -----------------------*/}
          <div className="mt-5">
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Executive Summary')}</h3>
              {!isLoadingExec && (
                <button
                  onClick={revertToOriginalExec}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefExec.current = editor)}
              value={contentExec}
              init={editorInit}
              onEditorChange={editorChangeHandlerExec}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitExec}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Executive Summary')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputExec}
                onChange={handleEditExec}
                placeholder={t(`E.g. make shorter`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputExec"
                name="editInputExec"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingExec && !isErrorExec && !editLimitReached ? (
                  <>
                    {showUndoExec && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeExec}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_executive_summary',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingExec && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorExec && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Executive Summary, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small flex items-center"
                          onClick={UndoChangeExec}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeExec}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>
          {/*------------------------ Situation Analysis -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Situation Analysis')}</h3>
              {!isLoadingSitu && (
                <button
                  onClick={revertToOriginalSitu}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefSitu.current = editor)}
              value={contentSitu}
              init={editorInit}
              onEditorChange={editorChangeHandlerSitu}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitSitu}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Situation Analysis')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputSitu}
                onChange={handleEditSitu}
                placeholder={t(`E.g. drop one weaknesss and add one strength`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputSitu"
                name="editInputSitu"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingSitu && !isErrorSitu && !editLimitReached ? (
                  <>
                    {showUndoSitu && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeSitu}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_situation_analysis',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingSitu && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorSitu && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Situation Analysis, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeSitu}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeSitu}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Marketing1 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 1: Objectives and Customers')}</h3>
              {!isLoadingMark1 && (
                <button
                  onClick={revertToOriginalMark1}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark1.current = editor)}
              value={contentMark1}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark1}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark1}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Marketing Part 1')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark1}
                onChange={handleEditMark1}
                placeholder={t(
                  `E.g. target segment 2 in addition to target segment 1`,
                )}
                className={styles.text_input}
                page="editor_starter"
                id="editInputMark1"
                name="editInputMark1"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark1 && !isErrorMark1 && !editLimitReached ? (
                  <>
                    {showUndoMark1 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark1}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_marketing1',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark1 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark1 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Marketing content, click Undo Change and Try Again',
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            className="transparent-button-small flex items-center"
                            onClick={UndoChangeMark1}
                          >
                            {t('Undo Change')}
                            <div className="w-1"></div> <BiUndo size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeMark1}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Marketing2 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 2: Product and Pricing')}</h3>
              {!isLoadingMark2 && (
                <button
                  onClick={revertToOriginalMark2}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark2.current = editor)}
              value={contentMark2}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark2}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark2}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Marketing Part 2')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark2}
                onChange={handleEditMark2}
                placeholder={t(
                  `E.g. be more specific in product differentiation`,
                )}
                className={styles.text_input}
                page="editor_starter"
                id="editInputMark2"
                name="editInputMark2"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark2 && !isErrorMark2 && !editLimitReached ? (
                  <>
                    {showUndoMark2 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark2}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_marketing2',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark2 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark2 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Marketing content, click Undo Change and Try Again',
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            className="transparent-button-small flex items-center"
                            onClick={UndoChangeMark2}
                          >
                            {t('Undo Change')}
                            <div className="w-1"></div> <BiUndo size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeMark2}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Marketing3 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              {userInput && userInput.productOrService === 'product' ? (
                <h3>
                  {t('Edit Marketing Part 3: Distribution and Advertising')}
                </h3>
              ) : (
                <h3>{t('Edit Marketing Part 3: Service and Advertising')}</h3>
              )}
              {!isLoadingMark3 && (
                <button
                  onClick={revertToOriginalMark3}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark3.current = editor)}
              value={contentMark3}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark3}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark3}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Marketing Part 3')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark3}
                onChange={handleEditMark3}
                placeholder={t(`E.g. add more advertising tactics`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputMark3"
                name="editInputMark3"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark3 && !isErrorMark3 && !editLimitReached ? (
                  <>
                    {showUndoMark3 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark3}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_marketing3',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark3 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark3 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Marketing content, click Undo Change and Try Again',
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            className="transparent-button-small flex items-center"
                            onClick={UndoChangeMark3}
                          >
                            {t('Undo Change')}
                            <div className="w-1"></div> <BiUndo size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeMark3}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Operation -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Operation')}</h3>
              {!isLoadingOp && (
                <button
                  onClick={revertToOriginalOp}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefOp.current = editor)}
              value={contentOp}
              init={editorInit}
              onEditorChange={editorChangeHandlerOp}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitOp}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Operations')}</strong> {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputOp}
                onChange={handleEditOp}
                placeholder={t(`E.g. we're focus on speed in key activities`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputOp"
                name="editInputOp"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingOp && !isErrorOp && !editLimitReached ? (
                  <>
                    {showUndoOp && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeOp}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_operation',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingOp && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorOp && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Operations content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeOp}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeOp}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Managemnet -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Management')}</h3>
              {!isLoadingMang && (
                <button
                  onClick={revertToOriginalMang}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMang.current = editor)}
              value={contentMang}
              init={editorInit}
              onEditorChange={editorChangeHandlerMang}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMang}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Management')}</strong> {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMang}
                onChange={handleEditMang}
                placeholder={t(`E.g. decrease candidate requirements`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputMang"
                name="editInputMang"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMang && !isErrorMang && !editLimitReached ? (
                  <>
                    {showUndoMang && (
                      <button
                        type="button"
                        className="transparent-button-small flex items-center"
                        onClick={UndoChangeMang}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_management',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMang && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMang && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Management content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeMang}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeMang}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>

          {/*------------------------ Finance -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Finance')}</h3>
              <div className="">
                {t(
                  'Note: If you want to edit initial invesment you can download the plan in word format and edit it there, but for the income statement you can scroll to the bottom of the charts to edit',
                )}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentFin),
              }}
            />
            <br />
            <div className="flex justify-center items-center mb-6 mt-5">
              <button
                type="button"
                className="button-small"
                onClick={handleEditFinance}
              >
                {t('Edit Finance')}
              </button>
            </div>
          </div>

          {/*------------------------ Risk and Mitigation -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Risk and Mitigation')}</h3>
              {!isLoadingRisk && (
                <button
                  onClick={revertToOriginalRisk}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefRisk.current = editor)}
              value={contentRisk}
              init={editorInit}
              onEditorChange={editorChangeHandlerRisk}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitRisk}
            >
              <div className="flex items-center mt-3 mb-3">
                <div className="relative">
                  {' '}
                  {/* Add relative here */}
                  <Image
                    src="/img/TalkToPlan.png"
                    width={200}
                    height={40}
                    alt="logo"
                    className="ml-[-25px]"
                    // Add absolute positioning here
                  />
                </div>
                <div className={`${styles.label} ml-[-30px]`}>
                  {t('What would you like to change about the')}{' '}
                  <strong>{t('Risk and Mitigation')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputRisk}
                onChange={handleEditRisk}
                placeholder={t(`E.g. make risk sound benign`)}
                className={styles.text_input}
                page="editor_starter"
                id="editInputRisk"
                name="editInputRisk"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingRisk && !isErrorRisk && !editLimitReached ? (
                  <>
                    {showUndoRisk && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeRisk}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button-small"
                      onClick={() => {
                        trackEvent({
                          event_name: 'make_change_button',
                          section_id: 'starter_risk',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingRisk && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorRisk && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Risk and Mitigation, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeRisk}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div> <BiUndo size={20} />
                        </button>
                      </div>
                    )}
                    {editLimitReached && (
                      <div className="flex-col justify-center items-center">
                        <div className="error-box w-full">
                          {t(
                            'Edit Quota Limit reached click "Undo Change", you can still make manual edits and save',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeRisk}
                        >
                          {t('Undo Change')}
                          <div className="w-1"></div>{' '}
                          <AiOutlineUndo size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
            <br />
          </div>
        </div>
      )}
    </>
  );
}
