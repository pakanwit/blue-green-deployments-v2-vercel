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
import { useTranslation } from 'next-i18next';
import { API_KEY_HEADER } from '../pages/api/constants';
import trackEvent from '../utils/trackEvent';
import Input from './input';

// your code here
export default function EditorComponent({
  planIdNum,

  Exec,
  Situ1,
  Situ2,
  Mark1,
  Mark2,
  Mark3,
  Mark4,
  Mark5,
  Mark6,
  Op1,
  Op2,
  Tech1,
  Tech2,
  Mang1,
  Mang2,
  Growth,
  Fin,
  Risk,

  originalExecFromDB,
  originalSitu1FromDB,
  originalSitu2FromDB,
  originalMark1FromDB,
  originalMark2FromDB,
  originalMark3FromDB,
  originalMark4FromDB,
  originalMark5FromDB,
  originalMark6FromDB,
  originalOp1FromDB,
  originalOp2FromDB,
  originalTech1FromDB,
  originalTech2FromDB,
  originalMang1FromDB,
  originalMang2FromDB,
  originalGrowthFromDB,
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
  setContentSitu1,
  setContentSitu2,
  setContentMark1,
  setContentMark2,
  setContentMark3,
  setContentMark4,
  setContentMark5,
  setContentMark6,
  setContentOp1,
  setContentOp2,
  setContentTech1,
  setContentTech2,
  setContentMang1,
  setContentMang2,
  setContentFin,
  setContentGrowth,
  setContentRisk,

  contentExec,
  contentSitu1,
  contentSitu2,
  contentMark1,
  contentMark2,
  contentMark3,
  contentMark4,
  contentMark5,
  contentMark6,
  contentOp1,
  contentOp2,
  contentTech1,
  contentTech2,
  contentMang1,
  contentMang2,
  contentFin,
  contentGrowth,
  contentRisk,
  secretKey,
}) {
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
      const response = await fetch('/api/saveEditInputPro/saveEditInput1Exec', {
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
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Executive Summary';

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
      section_id: 'pro_executive_summary',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Executive Summary you first generated?',
      )
    ) {
      setContentExec(originalExecFromDB);
    }
  }

  //Situ1-------------------------------------------------------------------
  const [editInputSitu1, setEditSitu1] = useState('');
  const [isErrorSitu1, setIsErrorSitu1] = useState(false);
  const [isLoadingSitu1, setLoadingSitu1] = useState(false);
  const [doneSitu1, setDoneSitu1] = useState(false);
  const [tempContentSitu1, setTempContentSitu1] = useState('');
  const [replacePTagsSitu1, setReplacePTagsSitu1] = useState(false);
  const [prevContentSitu1, setPrevContentSitu1] = useState('');
  const [currentExIdStateSitu1, setCurrentExIdStateSitu1] = useState(0);
  const [getUpdateFromParentSitu1, setGetUpdateFromParentSitu1] =
    useState(true);
  const [showUndoSitu1, setShowUndoSitu1] = useState(false);
  const [toggleSitu1, setToggleSitu1] = useState(false);

  const editorRefSitu1 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentSitu1) {
      setContentSitu1(Situ1);
    }
  }, [Situ1]);

  const handleEditSitu1 = (event) => {
    setEditSitu1(event.target.value);
  };

  async function saveEditInputSitu1() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput2Situ1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputSitu1,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitSitu1 = (event) => {
    event.preventDefault();
    setPrevContentSitu1(contentSitu1);
    setContentSitu1('');
    saveEditInputSitu1();
    editSitu1();
  };

  useEffect(() => {
    if (prevContentSitu1 === '') {
      setShowUndoSitu1(false);
    } else {
      setShowUndoSitu1(true);
    }
  }, [prevContentSitu1]);

  const UndoChangeSitu1 = () => {
    setIsErrorSitu1(false);
    setLoadingSitu1(false);
    setContentSitu1(prevContentSitu1);
  };

  const editorChangeHandlerSitu1 = (newValue, editor) => {
    setContentSitu1(newValue);
  };

  const exIdRefSitu1 = useRef(0);
  // this function generates edited content for the user
  async function editSitu1() {
    const currentExIdSitu1 = Date.now(); // Generate a unique Situ1Ex ID
    exIdRefSitu1.current = currentExIdSitu1;
    setCurrentExIdStateSitu1(currentExIdSitu1);
    setLoadingSitu1(true);
    setGetUpdateFromParentSitu1(false);

    const existingContent = contentSitu1;
    const editInstruction = editInputSitu1;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Situation Analysis';

    const Situ1 = await fetch('/api/editApi/editStarter', {
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

    if (!Situ1.ok) {
      setIsErrorSitu1(true);
      setLoadingSitu1(false);
      return;
    }

    // This data is a ReadableStream
    const Situ1Stream = Situ1.body;
    if (!Situ1Stream) {
      setIsErrorSitu1(true);
      setLoadingSitu1(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerSitu1 = Situ1Stream.getReader();
    const decoderSitu1 = new TextDecoder();

    let done = false;
    setReplacePTagsSitu1(true);
    while (!done) {
      const { value, done: doneSitu1Reading } = await readerSitu1.read();
      done = doneSitu1Reading;
      const chunkValue = decoderSitu1.decode(value);
      if (exIdRefSitu1.current === currentExIdSitu1) {
        setTempContentSitu1((prev) => prev + chunkValue);
        setContentSitu1((prev) => prev + chunkValue);
      } else {
        // If the Situ1Ex ID has changed, break the loop
        break;
      }
      setToggleSitu1((prev) => !prev);
    }

    if (exIdRefSitu1.current === currentExIdSitu1) {
      setDoneSitu1(true);
      setLoadingSitu1(false);
    }
  }

  useEffect(() => {
    if (replacePTagsSitu1) {
      setContentSitu1(contentSitu1.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleSitu1, replacePTagsSitu1]);

  useEffect(() => {
    if (exIdRefSitu1.current === currentExIdStateSitu1 && doneSitu1) {
      setReplacePTagsSitu1(false);
      setContentSitu1(tempContentSitu1);
      setTempContentSitu1('');
      setGetUpdateFromParentSitu1(true);
      setDoneSitu1(false);
    }
  }, [tempContentSitu1, doneSitu1]);

  function revertToOriginalSitu1() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_situation_analysis1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Industry and Key Trends Analysis you first generated?',
      )
    ) {
      setContentSitu1(originalSitu1FromDB);
    }
  }

  //Situ2-------------------------------------------------------------------
  const [editInputSitu2, setEditSitu2] = useState('');
  const [isErrorSitu2, setIsErrorSitu2] = useState(false);
  const [isLoadingSitu2, setLoadingSitu2] = useState(false);
  const [doneSitu2, setDoneSitu2] = useState(false);
  const [tempContentSitu2, setTempContentSitu2] = useState('');
  const [replacePTagsSitu2, setReplacePTagsSitu2] = useState(false);
  const [prevContentSitu2, setPrevContentSitu2] = useState('');
  const [currentExIdStateSitu2, setCurrentExIdStateSitu2] = useState(0);
  const [getUpdateFromParentSitu2, setGetUpdateFromParentSitu2] =
    useState(true);
  const [showUndoSitu2, setShowUndoSitu2] = useState(false);
  const [toggleSitu2, setToggleSitu2] = useState(false);

  const editorRefSitu2 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentSitu2) {
      setContentSitu2(Situ2);
    }
  }, [Situ2]);

  const handleEditSitu2 = (event) => {
    setEditSitu2(event.target.value);
  };

  async function saveEditInputSitu2() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput3Situ2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputSitu2,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitSitu2 = (event) => {
    event.preventDefault();
    setPrevContentSitu2(contentSitu2);
    setContentSitu2('');
    saveEditInputSitu2();
    editSitu2();
  };

  useEffect(() => {
    if (prevContentSitu2 === '') {
      setShowUndoSitu2(false);
    } else {
      setShowUndoSitu2(true);
    }
  }, [prevContentSitu2]);

  const UndoChangeSitu2 = () => {
    setIsErrorSitu2(false);
    setLoadingSitu2(false);
    setContentSitu2(prevContentSitu2);
  };

  const editorChangeHandlerSitu2 = (newValue, editor) => {
    setContentSitu2(newValue);
  };

  const exIdRefSitu2 = useRef(0);
  // this function generates edited content for the user
  async function editSitu2() {
    const currentExIdSitu2 = Date.now(); // Generate a unique Situ2Ex ID
    exIdRefSitu2.current = currentExIdSitu2;
    setCurrentExIdStateSitu2(currentExIdSitu2);
    setLoadingSitu2(true);
    setGetUpdateFromParentSitu2(false);

    const existingContent = contentSitu2;
    const editInstruction = editInputSitu2;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'SWOT Analysis';

    const Situ2 = await fetch('/api/editApi/editStarter', {
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

    if (!Situ2.ok) {
      setIsErrorSitu2(true);
      setLoadingSitu2(false);
      return;
    }

    // This data is a ReadableStream
    const Situ2Stream = Situ2.body;
    if (!Situ2Stream) {
      setIsErrorSitu2(true);
      setLoadingSitu2(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerSitu2 = Situ2Stream.getReader();
    const decoderSitu2 = new TextDecoder();

    let done = false;
    setReplacePTagsSitu2(true);
    while (!done) {
      const { value, done: doneSitu2Reading } = await readerSitu2.read();
      done = doneSitu2Reading;
      const chunkValue = decoderSitu2.decode(value);
      if (exIdRefSitu2.current === currentExIdSitu2) {
        setTempContentSitu2((prev) => prev + chunkValue);
        setContentSitu2((prev) => prev + chunkValue);
      } else {
        // If the Situ2Ex ID has changed, break the loop
        break;
      }
      setToggleSitu2((prev) => !prev);
    }

    if (exIdRefSitu2.current === currentExIdSitu2) {
      setDoneSitu2(true);
      setLoadingSitu2(false);
    }
  }

  useEffect(() => {
    if (replacePTagsSitu2) {
      setContentSitu2(contentSitu2.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleSitu2, replacePTagsSitu2]);

  useEffect(() => {
    if (exIdRefSitu2.current === currentExIdStateSitu2 && doneSitu2) {
      setReplacePTagsSitu2(false);
      setContentSitu2(tempContentSitu2);
      setTempContentSitu2('');
      setGetUpdateFromParentSitu2(true);
      setDoneSitu2(false);
    }
  }, [tempContentSitu2, doneSitu2]);

  function revertToOriginalSitu2() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_situation_analysis2',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Industry and Key Trends Analysis you first generated?',
      )
    ) {
      setContentSitu2(originalSitu2FromDB);
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
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput4Mark1',
        {
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
        },
      );

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
    const sectionName = 'Business Objectives';

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
      section_id: 'pro_marketing1',
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
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput5Mark2',
        {
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
        },
      );

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
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'STP';

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
      section_id: 'pro_marketing2',
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
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput6Mark3',
        {
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
        },
      );

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
    const sectionName = 'Customer Decision Process';

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
      section_id: 'pro_marketing3',
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

  //Mark4 ------------------------------------------------------------------------------------
  const [editInputMark4, setEditMark4] = useState('');
  const [isErrorMark4, setIsErrorMark4] = useState(false);
  const [isLoadingMark4, setLoadingMark4] = useState(false);
  const [doneMark4, setDoneMark4] = useState(false);
  const [tempContentMark4, setTempContentMark4] = useState('');
  const [replacePTagsMark4, setReplacePTagsMark4] = useState(false);
  const [prevContentMark4, setPrevContentMark4] = useState('');
  const [currentExIdStateMark4, setCurrentExIdStateMark4] = useState(0);
  const [getUpdateFromParentMark4, setGetUpdateFromParentMark4] =
    useState(true);
  const [showUndoMark4, setShowUndoMark4] = useState(false);
  const [toggleMark4, setToggleMark4] = useState(false);

  const editorRefMark4 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark4) {
      setContentMark4(Mark4);
    }
  }, [Mark4]);

  const handleEditMark4 = (event) => {
    setEditMark4(event.target.value);
  };

  async function saveEditInputMark4() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput7Mark4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputMark4,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitMark4 = (event) => {
    event.preventDefault();
    setPrevContentMark4(contentMark4);
    setContentMark4('');
    saveEditInputMark4();
    editMark4();
  };

  useEffect(() => {
    if (prevContentMark4 === '') {
      setShowUndoMark4(false);
    } else {
      setShowUndoMark4(true);
    }
  }, [prevContentMark4]);

  const UndoChangeMark4 = () => {
    setIsErrorMark4(false);
    setLoadingMark4(false);
    setContentMark4(prevContentMark4);
  };

  const editorChangeHandlerMark4 = (newValue, editor) => {
    setContentMark4(newValue);
  };

  const exIdRefMark4 = useRef(0);
  // this function generates edited content for the user
  async function editMark4() {
    const currentExIdMark4 = Date.now(); // Generate a unique Mark4ution ID
    exIdRefMark4.current = currentExIdMark4;
    setCurrentExIdStateMark4(currentExIdMark4);
    setLoadingMark4(true);
    setGetUpdateFromParentMark4(false);

    const existingContent = contentMark4;
    const editInstruction = editInputMark4;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'product strategy and advertising strategy';

    const Mark4 = await fetch('/api/editApi/editStarter', {
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

    if (!Mark4.ok) {
      setIsErrorMark4(true);
      setLoadingMark4(false);
      return;
    }

    // This data is a ReadableStream
    const Mark4Stream = Mark4.body;
    if (!Mark4Stream) {
      setIsErrorMark4(true);
      setLoadingMark4(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark4 = Mark4Stream.getReader();
    const decoderMark4 = new TextDecoder();

    let done = false;
    setReplacePTagsMark4(true);
    while (!done) {
      const { value, done: doneMark4Reading } = await readerMark4.read();
      done = doneMark4Reading;
      const chunkValue = decoderMark4.decode(value);
      if (exIdRefMark4.current === currentExIdMark4) {
        setTempContentMark4((prev) => prev + chunkValue);
        setContentMark4((prev) => prev + chunkValue);
      } else {
        // If the Mark4ution ID has changed, break the loop
        break;
      }
      setToggleMark4((prev) => !prev);
    }

    if (exIdRefMark4.current === currentExIdMark4) {
      setDoneMark4(true);
      setLoadingMark4(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark4) {
      setContentMark4(contentMark4.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark4, replacePTagsMark4]);

  useEffect(() => {
    if (exIdRefMark4.current === currentExIdStateMark4 && doneMark4) {
      setReplacePTagsMark4(false);
      setContentMark4(tempContentMark4);
      setTempContentMark4('');
      setGetUpdateFromParentMark4(true);
      setDoneMark4(false);
    }
  }, [tempContentMark4, doneMark4]);

  function revertToOriginalMark4() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_marketing4',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark4(originalMark4FromDB);
    }
  }

  //Mark5 ------------------------------------------------------------------------------------
  const [editInputMark5, setEditMark5] = useState('');
  const [isErrorMark5, setIsErrorMark5] = useState(false);
  const [isLoadingMark5, setLoadingMark5] = useState(false);
  const [doneMark5, setDoneMark5] = useState(false);
  const [tempContentMark5, setTempContentMark5] = useState('');
  const [replacePTagsMark5, setReplacePTagsMark5] = useState(false);
  const [prevContentMark5, setPrevContentMark5] = useState('');
  const [currentExIdStateMark5, setCurrentExIdStateMark5] = useState(0);
  const [getUpdateFromParentMark5, setGetUpdateFromParentMark5] =
    useState(true);
  const [showUndoMark5, setShowUndoMark5] = useState(false);
  const [toggleMark5, setToggleMark5] = useState(false);

  const editorRefMark5 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark5) {
      setContentMark5(Mark5);
    }
  }, [Mark5]);

  const handleEditMark5 = (event) => {
    setEditMark5(event.target.value);
  };

  async function saveEditInputMark5() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput8Mark5',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputMark5,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitMark5 = (event) => {
    event.preventDefault();
    setPrevContentMark5(contentMark5);
    setContentMark5('');
    saveEditInputMark5();
    editMark5();
  };

  useEffect(() => {
    if (prevContentMark5 === '') {
      setShowUndoMark5(false);
    } else {
      setShowUndoMark5(true);
    }
  }, [prevContentMark5]);

  const UndoChangeMark5 = () => {
    setIsErrorMark5(false);
    setLoadingMark5(false);
    setContentMark5(prevContentMark5);
  };

  const editorChangeHandlerMark5 = (newValue, editor) => {
    setContentMark5(newValue);
  };

  const exIdRefMark5 = useRef(0);
  // this function generates edited content for the user
  async function editMark5() {
    const currentExIdMark5 = Date.now(); // Generate a unique Mark5ution ID
    exIdRefMark5.current = currentExIdMark5;
    setCurrentExIdStateMark5(currentExIdMark5);
    setLoadingMark5(true);
    setGetUpdateFromParentMark5(false);

    const existingContent = contentMark5;
    const editInstruction = editInputMark5;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    let topic = '';
    if (userInput && userInput.productOrService === 'product') {
      topic = 'distribution';
    } else if (userInput && userInput.productOrService === 'service') {
      topic = 'service';
    }
    const sectionName = `pricing strategy and ${topic} strategy`;

    const Mark5 = await fetch('/api/editApi/editStarter', {
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

    if (!Mark5.ok) {
      setIsErrorMark5(true);
      setLoadingMark5(false);
      return;
    }

    // This data is a ReadableStream
    const Mark5Stream = Mark5.body;
    if (!Mark5Stream) {
      setIsErrorMark5(true);
      setLoadingMark5(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark5 = Mark5Stream.getReader();
    const decoderMark5 = new TextDecoder();

    let done = false;
    setReplacePTagsMark5(true);
    while (!done) {
      const { value, done: doneMark5Reading } = await readerMark5.read();
      done = doneMark5Reading;
      const chunkValue = decoderMark5.decode(value);
      if (exIdRefMark5.current === currentExIdMark5) {
        setTempContentMark5((prev) => prev + chunkValue);
        setContentMark5((prev) => prev + chunkValue);
      } else {
        // If the Mark5ution ID has changed, break the loop
        break;
      }
      setToggleMark5((prev) => !prev);
    }

    if (exIdRefMark5.current === currentExIdMark5) {
      setDoneMark5(true);
      setLoadingMark5(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark5) {
      setContentMark5(contentMark5.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark5, replacePTagsMark5]);

  useEffect(() => {
    if (exIdRefMark5.current === currentExIdStateMark5 && doneMark5) {
      setReplacePTagsMark5(false);
      setContentMark5(tempContentMark5);
      setTempContentMark5('');
      setGetUpdateFromParentMark5(true);
      setDoneMark5(false);
    }
  }, [tempContentMark5, doneMark5]);

  function revertToOriginalMark5() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_marketing5',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark5(originalMark5FromDB);
    }
  }

  //Mark6 ------------------------------------------------------------------------------------
  const [editInputMark6, setEditMark6] = useState('');
  const [isErrorMark6, setIsErrorMark6] = useState(false);
  const [isLoadingMark6, setLoadingMark6] = useState(false);
  const [doneMark6, setDoneMark6] = useState(false);
  const [tempContentMark6, setTempContentMark6] = useState('');
  const [replacePTagsMark6, setReplacePTagsMark6] = useState(false);
  const [prevContentMark6, setPrevContentMark6] = useState('');
  const [currentExIdStateMark6, setCurrentExIdStateMark6] = useState(0);
  const [getUpdateFromParentMark6, setGetUpdateFromParentMark6] =
    useState(true);
  const [showUndoMark6, setShowUndoMark6] = useState(false);
  const [toggleMark6, setToggleMark6] = useState(false);

  const editorRefMark6 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMark6) {
      setContentMark6(Mark6);
    }
  }, [Mark6]);

  const handleEditMark6 = (event) => {
    setEditMark6(event.target.value);
  };

  async function saveEditInputMark6() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput9Mark6',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputMark6,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitMark6 = (event) => {
    event.preventDefault();
    setPrevContentMark6(contentMark6);
    setContentMark6('');
    saveEditInputMark6();
    editMark6();
  };

  useEffect(() => {
    if (prevContentMark6 === '') {
      setShowUndoMark6(false);
    } else {
      setShowUndoMark6(true);
    }
  }, [prevContentMark6]);

  const UndoChangeMark6 = () => {
    setIsErrorMark6(false);
    setLoadingMark6(false);
    setContentMark6(prevContentMark6);
  };

  const editorChangeHandlerMark6 = (newValue, editor) => {
    setContentMark6(newValue);
  };

  const exIdRefMark6 = useRef(0);
  // this function generates edited content for the user
  async function editMark6() {
    const currentExIdMark6 = Date.now(); // Generate a unique Mark6ution ID
    exIdRefMark6.current = currentExIdMark6;
    setCurrentExIdStateMark6(currentExIdMark6);
    setLoadingMark6(true);
    setGetUpdateFromParentMark6(false);

    const existingContent = contentMark6;
    const editInstruction = editInputMark6;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'advertising strategy';

    const Mark6 = await fetch('/api/editApi/editStarter', {
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

    if (!Mark6.ok) {
      setIsErrorMark6(true);
      setLoadingMark6(false);
      return;
    }

    // This data is a ReadableStream
    const Mark6Stream = Mark6.body;
    if (!Mark6Stream) {
      setIsErrorMark6(true);
      setLoadingMark6(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMark6 = Mark6Stream.getReader();
    const decoderMark6 = new TextDecoder();

    let done = false;
    setReplacePTagsMark6(true);
    while (!done) {
      const { value, done: doneMark6Reading } = await readerMark6.read();
      done = doneMark6Reading;
      const chunkValue = decoderMark6.decode(value);
      if (exIdRefMark6.current === currentExIdMark6) {
        setTempContentMark6((prev) => prev + chunkValue);
        setContentMark6((prev) => prev + chunkValue);
      } else {
        // If the Mark6ution ID has changed, break the loop
        break;
      }
      setToggleMark6((prev) => !prev);
    }

    if (exIdRefMark6.current === currentExIdMark6) {
      setDoneMark6(true);
      setLoadingMark6(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMark6) {
      setContentMark6(contentMark6.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMark6, replacePTagsMark6]);

  useEffect(() => {
    if (exIdRefMark6.current === currentExIdStateMark6 && doneMark6) {
      setReplacePTagsMark6(false);
      setContentMark6(tempContentMark6);
      setTempContentMark6('');
      setGetUpdateFromParentMark6(true);
      setDoneMark6(false);
    }
  }, [tempContentMark6, doneMark6]);

  function revertToOriginalMark6() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_marketing6',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Marketing content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMark6(originalMark6FromDB);
    }
  }

  //Op------------------------------------------------------------------------------
  const [editInputOp1, setEditOp1] = useState('');
  const [isErrorOp1, setIsErrorOp1] = useState(false);
  const [isLoadingOp1, setLoadingOp1] = useState(false);
  const [doneOp1, setDoneOp1] = useState(false);
  const [tempContentOp1, setTempContentOp1] = useState('');
  const [replacePTagsOp1, setReplacePTagsOp1] = useState(false);
  const [prevContentOp1, setPrevContentOp1] = useState('');
  const [currentExIdStateOp1, setCurrentExIdStateOp1] = useState(0);
  const [getUpdateFromParentOp1, setGetUpdateFromParentOp1] = useState(true);
  const [showUndoOp1, setShowUndoOp1] = useState(false);
  const [toggleOp1, setToggleOp1] = useState(false);

  const editorRefOp1 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentOp1) {
      setContentOp1(Op1);
    }
  }, [Op1]);

  const handleEditOp1 = (event) => {
    setEditOp1(event.target.value);
  };

  async function saveEditInputOp1() {
    try {
      const response = await fetch('/api/saveEditInputPro/saveEditInput10Op1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputOp1,

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

  const handleSubmitOp1 = (event) => {
    event.preventDefault();
    setPrevContentOp1(contentOp1);
    setContentOp1('');
    saveEditInputOp1();
    editOp1();
  };

  useEffect(() => {
    if (prevContentOp1 === '') {
      setShowUndoOp1(false);
    } else {
      setShowUndoOp1(true);
    }
  }, [prevContentOp1]);

  const UndoChangeOp1 = () => {
    setIsErrorOp1(false);
    setLoadingOp1(false);
    setContentOp1(prevContentOp1);
  };

  const editorChangeHandlerOp1 = (newValue, editor) => {
    setContentOp1(newValue);
  };

  const exIdRefOp1 = useRef(0);
  // this function generates edited content for the user
  async function editOp1() {
    const currentExIdOp1 = Date.now(); // Generate a unique Op1ution ID
    exIdRefOp1.current = currentExIdOp1;
    setCurrentExIdStateOp1(currentExIdOp1);
    setLoadingOp1(true);
    setGetUpdateFromParentOp1(false);

    const existingContent = contentOp1;
    const editInstruction = editInputOp1;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Operation';

    const Op1 = await fetch('/api/editApi/editStarter', {
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

    if (!Op1.ok) {
      setIsErrorOp1(true);
      setLoadingOp1(false);
      return;
    }

    // This data is a ReadableStream
    const Op1Stream = Op1.body;
    if (!Op1Stream) {
      setIsErrorOp1(true);
      setLoadingOp1(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerOp1 = Op1Stream.getReader();
    const decoderOp1 = new TextDecoder();

    let done = false;
    setReplacePTagsOp1(true);
    while (!done) {
      const { value, done: doneOp1Reading } = await readerOp1.read();
      done = doneOp1Reading;
      const chunkValue = decoderOp1.decode(value);
      if (exIdRefOp1.current === currentExIdOp1) {
        setTempContentOp1((prev) => prev + chunkValue);
        setContentOp1((prev) => prev + chunkValue);
      } else {
        // If the Op1ution ID has changed, break the loop1
        break;
      }
      setToggleOp1((prev) => !prev);
    }

    if (exIdRefOp1.current === currentExIdOp1) {
      setDoneOp1(true);
      setLoadingOp1(false);
    }
  }

  useEffect(() => {
    if (replacePTagsOp1) {
      setContentOp1(contentOp1.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleOp1, replacePTagsOp1]);

  useEffect(() => {
    if (exIdRefOp1.current === currentExIdStateOp1 && doneOp1) {
      setReplacePTagsOp1(false);
      setContentOp1(tempContentOp1);
      setTempContentOp1('');
      setGetUpdateFromParentOp1(true);
      setDoneOp1(false);
    }
  }, [tempContentOp1, doneOp1]);

  function revertToOriginalOp1() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_operation1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Op1eration content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentOp1(originalOp1FromDB);
    }
  }

  //Op2------------------------------------------------------------------------------
  const [editInputOp2, setEditOp2] = useState('');
  const [isErrorOp2, setIsErrorOp2] = useState(false);
  const [isLoadingOp2, setLoadingOp2] = useState(false);
  const [doneOp2, setDoneOp2] = useState(false);
  const [tempContentOp2, setTempContentOp2] = useState('');
  const [replacePTagsOp2, setReplacePTagsOp2] = useState(false);
  const [prevContentOp2, setPrevContentOp2] = useState('');
  const [currentExIdStateOp2, setCurrentExIdStateOp2] = useState(0);
  const [getUpdateFromParentOp2, setGetUpdateFromParentOp2] = useState(true);
  const [showUndoOp2, setShowUndoOp2] = useState(false);
  const [toggleOp2, setToggleOp2] = useState(false);

  const editorRefOp2 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentOp2) {
      setContentOp2(Op2);
    }
  }, [Op2]);

  const handleEditOp2 = (event) => {
    setEditOp2(event.target.value);
  };

  async function saveEditInputOp2() {
    try {
      const response = await fetch('/api/saveEditInputPro/saveEditInput11Op2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          editInputOp2,

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

  const handleSubmitOp2 = (event) => {
    event.preventDefault();
    setPrevContentOp2(contentOp2);
    setContentOp2('');
    saveEditInputOp2();
    editOp2();
  };

  useEffect(() => {
    if (prevContentOp2 === '') {
      setShowUndoOp2(false);
    } else {
      setShowUndoOp2(true);
    }
  }, [prevContentOp2]);

  const UndoChangeOp2 = () => {
    setIsErrorOp2(false);
    setLoadingOp2(false);
    setContentOp2(prevContentOp2);
  };

  const editorChangeHandlerOp2 = (newValue, editor) => {
    setContentOp2(newValue);
  };

  const exIdRefOp2 = useRef(0);
  // this function generates edited content for the user
  async function editOp2() {
    const currentExIdOp2 = Date.now(); // Generate a unique Op2ution ID
    exIdRefOp2.current = currentExIdOp2;
    setCurrentExIdStateOp2(currentExIdOp2);
    setLoadingOp2(true);
    setGetUpdateFromParentOp2(false);

    const existingContent = contentOp2;
    const editInstruction = editInputOp2;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Operation';

    const Op2 = await fetch('/api/editApi/editStarter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: secretKey,
      },
      body: JSON.stringify({
        existingContent,
        editInstruction,
        parsedPositioningForEdit,
        planLanguage,
        sectionName,
        userInput,
      }),
    });

    console.log('Edge function returned.');

    if (!Op2.ok) {
      setIsErrorOp2(true);
      setLoadingOp2(false);
      return;
    }

    // This data is a ReadableStream
    const Op2Stream = Op2.body;
    if (!Op2Stream) {
      setIsErrorOp2(true);
      setLoadingOp2(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerOp2 = Op2Stream.getReader();
    const decoderOp2 = new TextDecoder();

    let done = false;
    setReplacePTagsOp2(true);
    while (!done) {
      const { value, done: doneOp2Reading } = await readerOp2.read();
      done = doneOp2Reading;
      const chunkValue = decoderOp2.decode(value);
      if (exIdRefOp2.current === currentExIdOp2) {
        setTempContentOp2((prev) => prev + chunkValue);
        setContentOp2((prev) => prev + chunkValue);
      } else {
        // If the Op2ution ID has changed, break the loop2
        break;
      }
      setToggleOp2((prev) => !prev);
    }

    if (exIdRefOp2.current === currentExIdOp2) {
      setDoneOp2(true);
      setLoadingOp2(false);
    }
  }

  useEffect(() => {
    if (replacePTagsOp2) {
      setContentOp2(contentOp2.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleOp2, replacePTagsOp2]);

  useEffect(() => {
    if (exIdRefOp2.current === currentExIdStateOp2 && doneOp2) {
      setReplacePTagsOp2(false);
      setContentOp2(tempContentOp2);
      setTempContentOp2('');
      setGetUpdateFromParentOp2(true);
      setDoneOp2(false);
    }
  }, [tempContentOp2, doneOp2]);

  function revertToOriginalOp2() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_operation2',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Operation Part 2 content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentOp2(originalOp2FromDB);
    }
  }

  //Tech1------------------------------------------------------------------------------
  const [editInputTech1, setEditTech1] = useState('');
  const [isErrorTech1, setIsErrorTech1] = useState(false);
  const [isLoadingTech1, setLoadingTech1] = useState(false);
  const [doneTech1, setDoneTech1] = useState(false);
  const [tempContentTech1, setTempContentTech1] = useState('');
  const [replacePTagsTech1, setReplacePTagsTech1] = useState(false);
  const [prevContentTech1, setPrevContentTech1] = useState('');
  const [currentExIdStateTech1, setCurrentExIdStateTech1] = useState(0);
  const [getUpdateFromParentTech1, setGetUpdateFromParentTech1] =
    useState(true);
  const [showUndoTech1, setShowUndoTech1] = useState(false);
  const [toggleTech1, setToggleTech1] = useState(false);

  const editorRefTech1 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentTech1) {
      setContentTech1(Tech1);
    }
  }, [Tech1]);

  const handleEditTech1 = (event) => {
    setEditTech1(event.target.value);
  };

  async function saveEditInputTech1() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput12Tech1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputTech1,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitTech1 = (event) => {
    event.preventDefault();
    setPrevContentTech1(contentTech1);
    setContentTech1('');
    saveEditInputTech1();
    editTech1();
  };

  useEffect(() => {
    if (prevContentTech1 === '') {
      setShowUndoTech1(false);
    } else {
      setShowUndoTech1(true);
    }
  }, [prevContentTech1]);

  const UndoChangeTech1 = () => {
    setIsErrorTech1(false);
    setLoadingTech1(false);
    setContentTech1(prevContentTech1);
  };

  const editorChangeHandlerTech1 = (newValue, editor) => {
    setContentTech1(newValue);
  };

  const exIdRefTech1 = useRef(0);
  // this function generates edited content for the user
  async function editTech1() {
    const currentExIdTech1 = Date.now(); // Generate a unique Tech1ution ID
    exIdRefTech1.current = currentExIdTech1;
    setCurrentExIdStateTech1(currentExIdTech1);
    setLoadingTech1(true);
    setGetUpdateFromParentTech1(false);

    const existingContent = contentTech1;
    const editInstruction = editInputTech1;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Technology';

    const Tech1 = await fetch('/api/editApi/editStarter', {
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

    if (!Tech1.ok) {
      setIsErrorTech1(true);
      setLoadingTech1(false);
      return;
    }

    // This data is a ReadableStream
    const Tech1Stream = Tech1.body;
    if (!Tech1Stream) {
      setIsErrorTech1(true);
      setLoadingTech1(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerTech1 = Tech1Stream.getReader();
    const decoderTech1 = new TextDecoder();

    let done = false;
    setReplacePTagsTech1(true);
    while (!done) {
      const { value, done: doneTech1Reading } = await readerTech1.read();
      done = doneTech1Reading;
      const chunkValue = decoderTech1.decode(value);
      if (exIdRefTech1.current === currentExIdTech1) {
        setTempContentTech1((prev) => prev + chunkValue);
        setContentTech1((prev) => prev + chunkValue);
      } else {
        // If the Tech1ution ID has changed, break the loTech1
        break;
      }
      setToggleTech1((prev) => !prev);
    }

    if (exIdRefTech1.current === currentExIdTech1) {
      setDoneTech1(true);
      setLoadingTech1(false);
    }
  }

  useEffect(() => {
    if (replacePTagsTech1) {
      setContentTech1(contentTech1.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleTech1, replacePTagsTech1]);

  useEffect(() => {
    if (exIdRefTech1.current === currentExIdStateTech1 && doneTech1) {
      setReplacePTagsTech1(false);
      setContentTech1(tempContentTech1);
      setTempContentTech1('');
      setGetUpdateFromParentTech1(true);
      setDoneTech1(false);
    }
  }, [tempContentTech1, doneTech1]);

  function revertToOriginalTech1() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_technology1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Technology content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentTech1(originalTech1FromDB);
    }
  }

  //Tech2------------------------------------------------------------------------------
  const [editInputTech2, setEditTech2] = useState('');
  const [isErrorTech2, setIsErrorTech2] = useState(false);
  const [isLoadingTech2, setLoadingTech2] = useState(false);
  const [doneTech2, setDoneTech2] = useState(false);
  const [tempContentTech2, setTempContentTech2] = useState('');
  const [replacePTagsTech2, setReplacePTagsTech2] = useState(false);
  const [prevContentTech2, setPrevContentTech2] = useState('');
  const [currentExIdStateTech2, setCurrentExIdStateTech2] = useState(0);
  const [getUpdateFromParentTech2, setGetUpdateFromParentTech2] =
    useState(true);
  const [showUndoTech2, setShowUndoTech2] = useState(false);
  const [toggleTech2, setToggleTech2] = useState(false);

  const editorRefTech2 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentTech2) {
      setContentTech2(Tech2);
    }
  }, [Tech2]);

  const handleEditTech2 = (event) => {
    setEditTech2(event.target.value);
  };

  async function saveEditInputTech2() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput13Tech2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputTech2,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitTech2 = (event) => {
    event.preventDefault();
    setPrevContentTech2(contentTech2);
    setContentTech2('');
    saveEditInputTech2();
    editTech2();
  };

  useEffect(() => {
    if (prevContentTech2 === '') {
      setShowUndoTech2(false);
    } else {
      setShowUndoTech2(true);
    }
  }, [prevContentTech2]);

  const UndoChangeTech2 = () => {
    setIsErrorTech2(false);
    setLoadingTech2(false);
    setContentTech2(prevContentTech2);
  };

  const editorChangeHandlerTech2 = (newValue, editor) => {
    setContentTech2(newValue);
  };

  const exIdRefTech2 = useRef(0);
  // this function generates edited content for the user
  async function editTech2() {
    const currentExIdTech2 = Date.now(); // Generate a unique Tech2ution ID
    exIdRefTech2.current = currentExIdTech2;
    setCurrentExIdStateTech2(currentExIdTech2);
    setLoadingTech2(true);
    setGetUpdateFromParentTech2(false);

    const existingContent = contentTech2;
    const editInstruction = editInputTech2;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Technology';

    const Tech2 = await fetch('/api/editApi/editStarter', {
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

    if (!Tech2.ok) {
      setIsErrorTech2(true);
      setLoadingTech2(false);
      return;
    }

    // This data is a ReadableStream
    const Tech2Stream = Tech2.body;
    if (!Tech2Stream) {
      setIsErrorTech2(true);
      setLoadingTech2(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerTech2 = Tech2Stream.getReader();
    const decoderTech2 = new TextDecoder();

    let done = false;
    setReplacePTagsTech2(true);
    while (!done) {
      const { value, done: doneTech2Reading } = await readerTech2.read();
      done = doneTech2Reading;
      const chunkValue = decoderTech2.decode(value);
      if (exIdRefTech2.current === currentExIdTech2) {
        setTempContentTech2((prev) => prev + chunkValue);
        setContentTech2((prev) => prev + chunkValue);
      } else {
        // If the Tech2ution ID has changed, break the loTech2
        break;
      }
      setToggleTech2((prev) => !prev);
    }

    if (exIdRefTech2.current === currentExIdTech2) {
      setDoneTech2(true);
      setLoadingTech2(false);
    }
  }

  useEffect(() => {
    if (replacePTagsTech2) {
      setContentTech2(contentTech2.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleTech2, replacePTagsTech2]);

  useEffect(() => {
    if (exIdRefTech2.current === currentExIdStateTech2 && doneTech2) {
      setReplacePTagsTech2(false);
      setContentTech2(tempContentTech2);
      setTempContentTech2('');
      setGetUpdateFromParentTech2(true);
      setDoneTech2(false);
    }
  }, [tempContentTech2, doneTech2]);

  function revertToOriginalTech2() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_technology2',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Technology content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentTech2(originalTech2FromDB);
    }
  }

  //Mang1---------------------------------------------------------------------
  const [editInputMang1, setEditMang1] = useState('');
  const [isErrorMang1, setIsErrorMang1] = useState(false);
  const [isLoadingMang1, setLoadingMang1] = useState(false);
  const [doneMang1, setDoneMang1] = useState(false);
  const [tempContentMang1, setTempContentMang1] = useState('');
  const [replacePTagsMang1, setReplacePTagsMang1] = useState(false);
  const [prevContentMang1, setPrevContentMang1] = useState('');
  const [currentExIdStateMang1, setCurrentExIdStateMang1] = useState(0);
  const [getUpdateFromParentMang1, setGetUpdateFromParentMang1] =
    useState(true);
  const [showUndoMang1, setShowUndoMang1] = useState(false);
  const [toggleMang1, setToggleMang1] = useState(false);

  const editorRefMang1 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMang1) {
      setContentMang1(Mang1);
    }
  }, [Mang1]);

  const handleEditMang1 = (event) => {
    setEditMang1(event.target.value);
  };

  async function saveEditInputMang1() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput14Mang1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputMang1,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitMang1 = (event) => {
    event.preventDefault();
    setPrevContentMang1(contentMang1);
    setContentMang1('');
    saveEditInputMang1();
    editMang1();
  };

  useEffect(() => {
    if (prevContentMang1 === '') {
      setShowUndoMang1(false);
    } else {
      setShowUndoMang1(true);
    }
  }, [prevContentMang1]);

  const UndoChangeMang1 = () => {
    setIsErrorMang1(false);
    setLoadingMang1(false);
    setContentMang1(prevContentMang1);
  };

  const editorChangeHandlerMang1 = (newValue, editor) => {
    setContentMang1(newValue);
  };

  const exIdRefMang1 = useRef(0);
  // this function generates edited content for the user
  async function editMang1() {
    const currentExIdMang1 = Date.now(); // Generate a unique Mang1ution ID
    exIdRefMang1.current = currentExIdMang1;
    setCurrentExIdStateMang1(currentExIdMang1);
    setLoadingMang1(true);
    setGetUpdateFromParentMang1(false);

    const existingContent = contentMang1;
    const editInstruction = editInputMang1;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Management';

    const Mang1 = await fetch('/api/editApi/editStarter', {
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

    if (!Mang1.ok) {
      setIsErrorMang1(true);
      setLoadingMang1(false);
      return;
    }

    // This data is a ReadableStream
    const Mang1Stream = Mang1.body;
    if (!Mang1Stream) {
      setIsErrorMang1(true);
      setLoadingMang1(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMang1 = Mang1Stream.getReader();
    const decoderMang1 = new TextDecoder();

    let done = false;
    setReplacePTagsMang1(true);
    while (!done) {
      const { value, done: doneMang1Reading } = await readerMang1.read();
      done = doneMang1Reading;
      const chunkValue = decoderMang1.decode(value);
      if (exIdRefMang1.current === currentExIdMang1) {
        setTempContentMang1((prev) => prev + chunkValue);
        setContentMang1((prev) => prev + chunkValue);
      } else {
        // If the Mang1ution ID has changed, break the loMang1
        break;
      }
      setToggleMang1((prev) => !prev);
    }

    if (exIdRefMang1.current === currentExIdMang1) {
      setDoneMang1(true);
      setLoadingMang1(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMang1) {
      setContentMang1(contentMang1.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMang1, replacePTagsMang1]);

  useEffect(() => {
    if (exIdRefMang1.current === currentExIdStateMang1 && doneMang1) {
      setReplacePTagsMang1(false);
      setContentMang1(tempContentMang1);
      setTempContentMang1('');
      setGetUpdateFromParentMang1(true);
      setDoneMang1(false);
    }
  }, [tempContentMang1, doneMang1]);

  function revertToOriginalMang1() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_management1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Mang1ement content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMang1(originalMang1FromDB);
    }
  }

  //Mang2---------------------------------------------------------------------
  const [editInputMang2, setEditMang2] = useState('');
  const [isErrorMang2, setIsErrorMang2] = useState(false);
  const [isLoadingMang2, setLoadingMang2] = useState(false);
  const [doneMang2, setDoneMang2] = useState(false);
  const [tempContentMang2, setTempContentMang2] = useState('');
  const [replacePTagsMang2, setReplacePTagsMang2] = useState(false);
  const [prevContentMang2, setPrevContentMang2] = useState('');
  const [currentExIdStateMang2, setCurrentExIdStateMang2] = useState(0);
  const [getUpdateFromParentMang2, setGetUpdateFromParentMang2] =
    useState(true);
  const [showUndoMang2, setShowUndoMang2] = useState(false);
  const [toggleMang2, setToggleMang2] = useState(false);

  const editorRefMang2 = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentMang2) {
      setContentMang2(Mang2);
    }
  }, [Mang2]);

  const handleEditMang2 = (event) => {
    setEditMang2(event.target.value);
  };

  async function saveEditInputMang2() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput15Mang2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputMang2,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitMang2 = (event) => {
    event.preventDefault();
    setPrevContentMang2(contentMang2);
    setContentMang2('');
    saveEditInputMang2();
    editMang2();
  };

  useEffect(() => {
    if (prevContentMang2 === '') {
      setShowUndoMang2(false);
    } else {
      setShowUndoMang2(true);
    }
  }, [prevContentMang2]);

  const UndoChangeMang2 = () => {
    setIsErrorMang2(false);
    setLoadingMang2(false);
    setContentMang2(prevContentMang2);
  };

  const editorChangeHandlerMang2 = (newValue, editor) => {
    setContentMang2(newValue);
  };

  const exIdRefMang2 = useRef(0);
  // this function generates edited content for the user
  async function editMang2() {
    const currentExIdMang2 = Date.now(); // Generate a unique Mang2ution ID
    exIdRefMang2.current = currentExIdMang2;
    setCurrentExIdStateMang2(currentExIdMang2);
    setLoadingMang2(true);
    setGetUpdateFromParentMang2(false);

    const existingContent = contentMang2;
    const editInstruction = editInputMang2;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Management';

    const Mang2 = await fetch('/api/editApi/editStarter', {
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

    if (!Mang2.ok) {
      setIsErrorMang2(true);
      setLoadingMang2(false);
      return;
    }

    // This data is a ReadableStream
    const Mang2Stream = Mang2.body;
    if (!Mang2Stream) {
      setIsErrorMang2(true);
      setLoadingMang2(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerMang2 = Mang2Stream.getReader();
    const decoderMang2 = new TextDecoder();

    let done = false;
    setReplacePTagsMang2(true);
    while (!done) {
      const { value, done: doneMang2Reading } = await readerMang2.read();
      done = doneMang2Reading;
      const chunkValue = decoderMang2.decode(value);
      if (exIdRefMang2.current === currentExIdMang2) {
        setTempContentMang2((prev) => prev + chunkValue);
        setContentMang2((prev) => prev + chunkValue);
      } else {
        // If the Mang2ution ID has changed, break the loMang2
        break;
      }
      setToggleMang2((prev) => !prev);
    }

    if (exIdRefMang2.current === currentExIdMang2) {
      setDoneMang2(true);
      setLoadingMang2(false);
    }
  }

  useEffect(() => {
    if (replacePTagsMang2) {
      setContentMang2(contentMang2.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleMang2, replacePTagsMang2]);

  useEffect(() => {
    if (exIdRefMang2.current === currentExIdStateMang2 && doneMang2) {
      setReplacePTagsMang2(false);
      setContentMang2(tempContentMang2);
      setTempContentMang2('');
      setGetUpdateFromParentMang2(true);
      setDoneMang2(false);
    }
  }, [tempContentMang2, doneMang2]);

  function revertToOriginalMang2() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_management2',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Mang2ement content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentMang2(originalMang2FromDB);
    }
  }

  //Growth---------------------------------------------------------------------
  const [editInputGrowth, setEditGrowth] = useState('');
  const [isErrorGrowth, setIsErrorGrowth] = useState(false);
  const [isLoadingGrowth, setLoadingGrowth] = useState(false);
  const [doneGrowth, setDoneGrowth] = useState(false);
  const [tempContentGrowth, setTempContentGrowth] = useState('');
  const [replacePTagsGrowth, setReplacePTagsGrowth] = useState(false);
  const [prevContentGrowth, setPrevContentGrowth] = useState('');
  const [currentExIdStateGrowth, setCurrentExIdStateGrowth] = useState(0);
  const [getUpdateFromParentGrowth, setGetUpdateFromParentGrowth] =
    useState(true);
  const [showUndoGrowth, setShowUndoGrowth] = useState(false);
  const [toggleGrowth, setToggleGrowth] = useState(false);

  const editorRefGrowth = useRef(null);

  useEffect(() => {
    if (getUpdateFromParentGrowth) {
      setContentGrowth(Growth);
    }
  }, [Growth]);

  const handleEditGrowth = (event) => {
    setEditGrowth(event.target.value);
  };

  async function saveEditInputGrowth() {
    try {
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput16Growth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({
            editInputGrowth,

            userEmail,
            planIdNum,
          }),
        },
      );

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

  const handleSubmitGrowth = (event) => {
    event.preventDefault();
    setPrevContentGrowth(contentGrowth);
    setContentGrowth('');
    saveEditInputGrowth();
    editGrowth();
  };

  useEffect(() => {
    if (prevContentGrowth === '') {
      setShowUndoGrowth(false);
    } else {
      setShowUndoGrowth(true);
    }
  }, [prevContentGrowth]);

  const UndoChangeGrowth = () => {
    setIsErrorGrowth(false);
    setLoadingGrowth(false);
    setContentGrowth(prevContentGrowth);
  };

  const editorChangeHandlerGrowth = (newValue, editor) => {
    setContentGrowth(newValue);
  };

  const exIdRefGrowth = useRef(0);
  // this function generates edited content for the user
  async function editGrowth() {
    const currentExIdGrowth = Date.now(); // Generate a unique Growthution ID
    exIdRefGrowth.current = currentExIdGrowth;
    setCurrentExIdStateGrowth(currentExIdGrowth);
    setLoadingGrowth(true);
    setGetUpdateFromParentGrowth(false);

    const existingContent = contentGrowth;
    const editInstruction = editInputGrowth;
    const parsedPositioningForEdit = '';
    const planLanguage =
      userInput && userInput.planLanguage ? userInput.planLanguage : 'en';
    const sectionName = 'Growth Strategy';

    const Growth = await fetch('/api/editApi/editStarter', {
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

    if (!Growth.ok) {
      setIsErrorGrowth(true);
      setLoadingGrowth(false);
      return;
    }

    // This data is a ReadableStream
    const GrowthStream = Growth.body;
    if (!GrowthStream) {
      setIsErrorGrowth(true);
      setLoadingGrowth(false);
      return;
    }

    const remainingQuota = await updateEditQuota();
    if (remainingQuota <= 0) {
      console.log('Edit quota exhausted');
      return;
    }

    const readerGrowth = GrowthStream.getReader();
    const decoderGrowth = new TextDecoder();

    let done = false;
    setReplacePTagsGrowth(true);
    while (!done) {
      const { value, done: doneGrowthReading } = await readerGrowth.read();
      done = doneGrowthReading;
      const chunkValue = decoderGrowth.decode(value);
      if (exIdRefGrowth.current === currentExIdGrowth) {
        setTempContentGrowth((prev) => prev + chunkValue);
        setContentGrowth((prev) => prev + chunkValue);
      } else {
        // If the Growthution ID has changed, break the loGrowth
        break;
      }
      setToggleGrowth((prev) => !prev);
    }

    if (exIdRefGrowth.current === currentExIdGrowth) {
      setDoneGrowth(true);
      setLoadingGrowth(false);
    }
  }

  useEffect(() => {
    if (replacePTagsGrowth) {
      setContentGrowth(contentGrowth.replace(/<p>/g, '').replace(/<\/p>/g, ''));
    }
  }, [toggleGrowth, replacePTagsGrowth]);

  useEffect(() => {
    if (exIdRefGrowth.current === currentExIdStateGrowth && doneGrowth) {
      setReplacePTagsGrowth(false);
      setContentGrowth(tempContentGrowth);
      setTempContentGrowth('');
      setGetUpdateFromParentGrowth(true);
      setDoneGrowth(false);
    }
  }, [tempContentGrowth, doneGrowth]);

  function revertToOriginalGrowth() {
    trackEvent({
      event_name: 'revert_to_original_button',
      section_id: 'pro_growth1',
    });
    if (
      window.confirm(
        'Are you sure you want to revert to the original Growth Strategy content you first generated?',
      )
    ) {
      // If the user clicked OK, then set the content
      setContentGrowth(originalGrowthFromDB);
    }
  }

  //Finance-----------------------------------------------------
  const [updatedHeadFin, setUpdatedHeadFin] = useState('');
  const [updatedHeadFinSetting, setUpdatedHeadFinSetting] = useState(false);
  const [isEdittingFinance, setIsEdittingFinance] = useState(false);
  const [edittedFinance, setEdittedFinance] = useState(false);

  const handleEditFinance = () => {
    trackEvent({
      event_name: 'edit_finance_button',
    });
    setIsEdittingFinance(true);
  };
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

  useEffect(() => {
    if (updatedHeadFinSetting) {
      setContentFin(updatedHeadFin);
      setUpdatedHeadFinSetting(false);
    }
  }, [updatedHeadFinSetting]);

  const editorRefFin = useRef(null);

  const editorChangeHandlerFin = (newValue, editor) => {
    setContentFin(newValue);
  };

  function revertToOriginalFin() {
    if (
      window.confirm(
        'Are you sure you want to revert to the original Finance you first generated?',
      )
    ) {
      setContentFin(updatedHeadFin);
    }
  }

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
      const response = await fetch(
        '/api/saveEditInputPro/saveEditInput17Risk',
        {
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
        },
      );

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
      section_id: 'pro_risk',
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
      const response = await fetch('/api/saveEditPro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [API_KEY_HEADER]: secretKey,
        },
        body: JSON.stringify({
          contentExec,
          contentSitu1,
          contentSitu2,
          contentMark1,
          contentMark2,
          contentMark3,
          contentMark4,
          contentMark5,
          contentMark6,
          contentOp1,
          contentOp2,
          contentTech1,
          contentTech2,
          contentMang1,
          contentMang2,
          contentGrowth,
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
      !isLoadingSitu1 &&
      !isLoadingSitu2 &&
      !isLoadingMark1 &&
      !isLoadingMark2 &&
      !isLoadingMark3 &&
      !isLoadingMark4 &&
      !isLoadingMark5 &&
      !isLoadingMark6 &&
      !isLoadingOp1 &&
      !isLoadingOp2 &&
      !isLoadingTech1 &&
      !isLoadingTech2 &&
      !isLoadingMang1 &&
      !isLoadingMang2 &&
      !isLoadingGrowth &&
      !isLoadingRisk
    ) {
      debouncedSave();
    }

    return () => {
      debouncedSave.cancel(); // cancels the debounce if userEmail changes
    };
  }, [
    contentExec,
    contentSitu1,
    contentSitu2,
    contentMark1,
    contentMark2,
    contentMark3,
    contentMark4,
    contentMark5,
    contentMark6,
    contentOp1,
    contentOp2,
    contentTech1,
    contentTech2,
    contentMang1,
    contentMang2,
    contentGrowth,
    contentFin,
    contentRisk,
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
        setLoadingSitu1(false);
        setLoadingSitu2(false);
        setLoadingMark1(false);
        setLoadingMark2(false);
        setLoadingMark3(false);
        setLoadingMark4(false);
        setLoadingMark5(false);
        setLoadingMark6(false);
        setLoadingOp1(false);
        setLoadingOp2(false);
        setLoadingTech1(false);
        setLoadingTech2(false);
        setLoadingMang1(false);
        setLoadingMang2(false);
        setLoadingGrowth(false);
        setLoadingRisk(false);
      }

      return data.user ? data.user.editQuota : null;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  //sidebar ------------------------------------------
  const refExec = useRef(null);
  const refSitu = useRef(null);
  const refMark = useRef(null);
  const refOp = useRef(null);
  const refTech = useRef(null);
  const refMang = useRef(null);
  const refGrowth = useRef(null);
  const refRisk = useRef(null);

  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: 'smooth' });

  const navButton = 'py-1 px-1 w-full bg-white border-b text-gray-500';
  const topNavButton =
    'py-1 px-1 w-full bg-white border-b border-t text-gray-500';
  const BottomNavButton = 'py-1 px-1 w-full bg-white text-gray-500';

  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

  //if viewport width is less than 550 isSidebar is false
  useEffect(() => {
    if (window.innerWidth < 820) {
      setIsSidebar(false);
    }
  }, []);

  const { t } = useTranslation('EditorPro');

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
          {isSidebar && (
            <div className="flex">
              <div
                className={`fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center p-0 text-sm z-50 rounded-xl w-28 ${showSidebar ? 'bg-white border ml-2' : 'bg-transparent -ml-2'}`}
              >
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="bg-white border p-2 rounded-xl mt-2"
                >
                  <span className="block">
                    {t(showSidebar ? 'Hide' : 'Show')}
                  </span>
                  <span className="block">{t('Navbar')}</span>
                </button>

                {showSidebar && (
                  <div className="">
                    <p className="mb-3 mt-3 text-center font-bold text-black">
                      {t('Go To..')}
                    </p>
                    <button
                      onClick={() => scrollToRef(refExec)}
                      className={topNavButton}
                    >
                      {t('Summary')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refSitu)}
                      className={navButton}
                    >
                      {t('Situation')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refMark)}
                      className={navButton}
                    >
                      {t('Marketing')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refOp)}
                      className={navButton}
                    >
                      {t('Operation')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refTech)}
                      className={navButton}
                    >
                      {t('Technology')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refMang)}
                      className={navButton}
                    >
                      {t('Management')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refGrowth)}
                      className={navButton}
                    >
                      {t('Growth')}
                    </button>
                    <button
                      onClick={() => scrollToRef(refRisk)}
                      className={BottomNavButton}
                    >
                      {t('Risk')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/*------------------------ Executive Summary -----------------------*/}
          <div className="mt-5">
            <div
              ref={refExec}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
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
                page="editor_pro"
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
                          section_id: 'pro_executive_summary',
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
                          className="transparent-button-small  flex items-center"
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

          {/*------------------------ Situation Analysis 1 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refSitu}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>
                {t(
                  'Edit Situation Analysis Part 1: Industry Analysis and Trends',
                )}
              </h3>
              {!isLoadingSitu1 && (
                <button
                  onClick={revertToOriginalSitu1}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefSitu1.current = editor)}
              value={contentSitu1}
              init={editorInit}
              onEditorChange={editorChangeHandlerSitu1}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitSitu1}
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
                  <strong>{t('Situation Analysis Part 1')}</strong>{' '}
                  {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputSitu1}
                onChange={handleEditSitu1}
                placeholder={t(`E.g. drop one weaknesss and add one strength`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputSitu1"
                name="editInputSitu1"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingSitu1 && !isErrorSitu1 && !editLimitReached ? (
                  <>
                    {showUndoSitu1 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeSitu1}
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
                          section_id: 'pro_situation_analysis1',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingSitu1 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorSitu1 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Situation Analysis, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeSitu1}
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
                          onClick={UndoChangeSitu1}
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

          {/*------------------------ Situation Analysis 2 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Situation Analysis Part 2: SWOT Analysis')}</h3>
              {!isLoadingSitu2 && (
                <button
                  onClick={revertToOriginalSitu2}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefSitu2.current = editor)}
              value={contentSitu2}
              init={editorInit}
              onEditorChange={editorChangeHandlerSitu2}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitSitu2}
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
                  <strong>{t('Situation Analysis Part 2')}</strong>{' '}
                  {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputSitu2}
                onChange={handleEditSitu2}
                placeholder={t(`E.g. drop one weaknesss and add one strength`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputSitu2"
                name="editInputSitu2"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingSitu2 && !isErrorSitu2 && !editLimitReached ? (
                  <>
                    {showUndoSitu2 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeSitu2}
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
                          section_id: 'pro_situation_analysis2',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingSitu2 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorSitu2 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Situation Analysis, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeSitu2}
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
                          onClick={UndoChangeSitu2}
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

          {/*------------------------ Marketing 1-----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refMark}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>{t('Edit Marketing Part 1: Objectives')}</h3>
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
                page="editor_pro"
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
                          section_id: 'pro_marketing1',
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

          {/*------------------------ Marketing 2 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 2: Customers')}</h3>
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
                page="editor_pro"
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
                          section_id: 'pro_marketing2',
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

          {/*------------------------ Marketing 3 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 3: Decision Making Process')}</h3>
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
                page="editor_pro"
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
                          section_id: 'pro_marketing3',
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

          {/*------------------------ Marketing 4 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 4: Product')}</h3>
              {!isLoadingMark4 && (
                <button
                  onClick={revertToOriginalMark4}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark4.current = editor)}
              value={contentMark4}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark4}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark4}
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
                  <strong>{t('Marketing Part 4')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark4}
                onChange={handleEditMark4}
                placeholder={t(`E.g. add more advertising tactics`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputMark4"
                name="editInputMark4"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark4 && !isErrorMark4 && !editLimitReached ? (
                  <>
                    {showUndoMark4 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark4}
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
                          section_id: 'pro_marketing4',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark4 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark4 && (
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
                            onClick={UndoChangeMark4}
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
                          onClick={UndoChangeMark4}
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

          {/*------------------------ Marketing 5 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              {userInput && userInput.productOrService === 'product' ? (
                <h3>{t('Edit Marketing Part 5: Pricing and Distribution')}</h3>
              ) : (
                <h3>{t('Edit Marketing Part 5: Pricing and Service')}</h3>
              )}
              {!isLoadingMark5 && (
                <button
                  onClick={revertToOriginalMark5}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark5.current = editor)}
              value={contentMark5}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark5}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark5}
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
                  <strong>{t('Marketing Part 5')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark5}
                onChange={handleEditMark5}
                placeholder={t(`E.g. add more advertising tactics`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputMark5"
                name="editInputMark5"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark5 && !isErrorMark5 && !editLimitReached ? (
                  <>
                    {showUndoMark5 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark5}
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
                          section_id: 'pro_marketing5',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark5 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark5 && (
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
                            onClick={UndoChangeMark5}
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
                          onClick={UndoChangeMark5}
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

          {/*------------------------ Marketing 6 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Marketing Part 6: Advertising')}</h3>
              {!isLoadingMark6 && (
                <button
                  onClick={revertToOriginalMark6}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMark6.current = editor)}
              value={contentMark6}
              init={editorInit}
              onEditorChange={editorChangeHandlerMark6}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMark6}
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
                  <strong>{t('Marketing Part 6')}</strong> {t('above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMark6}
                onChange={handleEditMark6}
                placeholder={t(`E.g. add more advertising tactics`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputMark6"
                name="editInputMark6"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMark6 && !isErrorMark6 && !editLimitReached ? (
                  <>
                    {showUndoMark6 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeMark6}
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
                          section_id: 'pro_marketing6',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMark6 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMark6 && (
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
                            onClick={UndoChangeMark6}
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
                          onClick={UndoChangeMark6}
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

          {/*------------------------ Operation 1-----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refOp}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>{t('Edit Operation Part 1: Activities and KPIs')}</h3>
              {!isLoadingOp1 && (
                <button
                  onClick={revertToOriginalOp1}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefOp1.current = editor)}
              value={contentOp1}
              init={editorInit}
              onEditorChange={editorChangeHandlerOp1}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitOp1}
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
                  <strong>{t('Operations Part 1')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputOp1}
                onChange={handleEditOp1}
                placeholder={t(`E.g. we're focus on speed in key activities`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputOp1"
                name="editInputOp1"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingOp1 && !isErrorOp1 && !editLimitReached ? (
                  <>
                    {showUndoOp1 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeOp1}
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
                          section_id: 'pro_operation1',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingOp1 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorOp1 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Operations content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeOp1}
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
                          onClick={UndoChangeOp1}
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

          {/*------------------------ Operation 2-----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Operation Part 2: QC and Implementation')}</h3>
              {!isLoadingOp2 && (
                <button
                  onClick={revertToOriginalOp2}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefOp2.current = editor)}
              value={contentOp2}
              init={editorInit}
              onEditorChange={editorChangeHandlerOp2}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitOp2}
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
                  <strong>{t('Operations Part 2')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputOp2}
                onChange={handleEditOp2}
                placeholder={t(`E.g. we're focus on speed in key activities`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputOp2"
                name="editInputOp2"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingOp2 && !isErrorOp2 && !editLimitReached ? (
                  <>
                    {showUndoOp2 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeOp2}
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
                          section_id: 'pro_operation2',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingOp2 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorOp2 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Operations content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeOp2}
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
                          onClick={UndoChangeOp2}
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

          {/*------------------------Technology 1-----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refTech}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>{t('Edit Technology Part 1: Technology adoption')}</h3>
              {!isLoadingTech1 && (
                <button
                  onClick={revertToOriginalTech1}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefTech1.current = editor)}
              value={contentTech1}
              init={editorInit}
              onEditorChange={editorChangeHandlerTech1}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitTech1}
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
                  <strong>{t('Technology Part 1')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputTech1}
                onChange={handleEditTech1}
                placeholder={t(`E.g. we're focus on speed in key activities`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputTech1"
                name="editInputTech1"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingTech1 && !isErrorTech1 && !editLimitReached ? (
                  <>
                    {showUndoTech1 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeTech1}
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
                          section_id: 'pro_technology1',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingTech1 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorTech1 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Operations content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeTech1}
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
                          onClick={UndoChangeTech1}
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

          {/*-----------------------Technology 2-----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Technology Part 2: Digital Strategy')}</h3>
              {!isLoadingTech2 && (
                <button
                  onClick={revertToOriginalTech2}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefTech2.current = editor)}
              value={contentTech2}
              init={editorInit}
              onEditorChange={editorChangeHandlerTech2}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitTech2}
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
                  <strong>{t('Technology Part 2')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputTech2}
                onChange={handleEditTech2}
                placeholder={t(`E.g. we're focus on speed in key activities`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputTech2"
                name="editInputTech2"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingTech2 && !isErrorTech2 && !editLimitReached ? (
                  <>
                    {showUndoTech2 && (
                      <button
                        type="button"
                        className="transparent-button-small  flex items-center"
                        onClick={UndoChangeTech2}
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
                          section_id: 'pro_technology2',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingTech2 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorTech2 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Operations content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeTech2}
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
                          onClick={UndoChangeTech2}
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

          {/*------------------------ Management 1 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refMang}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>
                {t('Edit Management Part 1: Structure and Employee Roster')}
              </h3>
              {!isLoadingMang1 && (
                <button
                  onClick={revertToOriginalMang1}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMang1.current = editor)}
              value={contentMang1}
              init={editorInit}
              onEditorChange={editorChangeHandlerMang1}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMang1}
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
                  <strong>{t('Management Part 1')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMang1}
                onChange={handleEditMang1}
                placeholder={t(`E.g. decrease candidate requirements`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputMang1"
                name="editInputMang1"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMang1 && !isErrorMang1 && !editLimitReached ? (
                  <>
                    {showUndoMang1 && (
                      <button
                        type="button"
                        className="transparent-button-small flex items-center"
                        onClick={UndoChangeMang1}
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
                          section_id: 'pro_management1',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMang1 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMang1 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Management content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeMang1}
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
                          onClick={UndoChangeMang1}
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

          {/*------------------------ Management 2 -----------------------*/}
          <div className="mt-5">
            <hr />
            <div className="flex flex-col justify-center items-start mb-6 mt-5">
              <h3>{t('Edit Management Part 2: Recruitment and Training')}</h3>
              {!isLoadingMang2 && (
                <button
                  onClick={revertToOriginalMang2}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefMang2.current = editor)}
              value={contentMang2}
              init={editorInit}
              onEditorChange={editorChangeHandlerMang2}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitMang2}
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
                  <strong>{t('Management Part 2')}</strong>{' '}
                  {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputMang2}
                onChange={handleEditMang2}
                placeholder={t(`E.g. decrease candidate requirements`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputMang2"
                name="editInputMang2"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingMang2 && !isErrorMang2 && !editLimitReached ? (
                  <>
                    {showUndoMang2 && (
                      <button
                        type="button"
                        className="transparent-button-small flex items-center"
                        onClick={UndoChangeMang2}
                      >
                        {t('Undo Change')}
                        <div className="w-1"></div> <BiUndo size={20} />
                      </button>
                    )}
                    <button type="submit" className="button-small">
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingMang2 && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorMang2 && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Management content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeMang2}
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
                            "Edit Quota Limit reached click 'Undo Change', you can still make manual edits and save",
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center m-auto"
                          onClick={UndoChangeMang2}
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
          {/*------------------------ Growth -----------------------*/}
          <div className="mt-5">
            <hr />
            <div
              ref={refGrowth}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
              <h3>{t('Edit Growth Strategy')}</h3>
              {!isLoadingGrowth && (
                <button
                  onClick={revertToOriginalGrowth}
                  className="button-small-red-transparent h-1/2 flex gap-1"
                >
                  {t('Revert To Original')} <AiOutlineUndo size={20} />
                </button>
              )}
            </div>
            <Editor
              apiKey={editorApiKey}
              onInit={(evt, editor) => (editorRefGrowth.current = editor)}
              value={contentGrowth}
              init={editorInit}
              onEditorChange={editorChangeHandlerGrowth}
            />
            <form
              className="flex flex-col justify-center items-start mt-2"
              onSubmit={handleSubmitGrowth}
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
                  <strong>{t('Growth Strategy')}</strong> {t('section above?')}
                </div>
              </div>
              <Input
                type="text"
                value={editInputGrowth}
                onChange={handleEditGrowth}
                placeholder={t(`E.g. decrease candidate requirements`)}
                className={styles.text_input}
                page="editor_pro"
                id="editInputGrowth"
                name="editInputGrowth"
              />
              <div className="w-full flex justify-center items-baseline mt-8 gap-6">
                {!isLoadingGrowth && !isErrorGrowth && !editLimitReached ? (
                  <>
                    {showUndoGrowth && (
                      <button
                        type="button"
                        className="transparent-button-small flex items-center"
                        onClick={UndoChangeGrowth}
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
                          section_id: 'pro_growth',
                        });
                      }}
                    >
                      {t('Make Change')}
                    </button>
                  </>
                ) : (
                  <>
                    {isLoadingGrowth && (
                      <div className="flex flex-col justify-center items-center text-center gap-3">
                        <MoonLoader size={25} />
                        <div className="text-sm">
                          {t("Don't exit while text generation in progress")}
                        </div>
                      </div>
                    )}
                    {isErrorGrowth && (
                      <div className="flex flex-col">
                        <div className="error-box w-full">
                          {t(
                            'Error editing Management content, click Undo Change and Try Again',
                          )}
                        </div>
                        <button
                          type="button"
                          className="transparent-button-small  flex items-center"
                          onClick={UndoChangeGrowth}
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
                          onClick={UndoChangeGrowth}
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
            <div
              ref={refRisk}
              className="flex flex-col justify-center items-start mb-6 mt-5"
            >
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
                page="editor_pro"
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
                          section_id: 'pro_risk',
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
