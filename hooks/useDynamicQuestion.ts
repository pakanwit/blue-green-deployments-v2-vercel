import {
  areAllSpecificQuestionsReady,
  getAllSpecificQuestions,
} from '../utils/specific-questions/generate';
import { useEffect, useState } from 'react';
import { API_KEY_HEADER } from '../pages/api/constants';

export const getDynamicQuestions = async ({
  params,
  planLanguage,
  secretKey,
}) => {
  const responseTopics = await fetch('/api/generateTopics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_HEADER]: secretKey,
    },
    body: JSON.stringify({ ...params, planLanguage }),
  });
  if (!responseTopics.ok) {
    throw new Error('Network response was not ok');
  }
  const topics = await responseTopics.json();
  const responseQuestions = await fetch('/api/generateQuestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_HEADER]: secretKey,
    },
    body: JSON.stringify({
      topics,
      planLanguage,
    }),
  });
  if (!responseQuestions.ok) {
    return {
      questions: {},
      generationError: true,
    };
  }
  const questions = await responseQuestions.json();
  return {
    questions,
    generationError: false,
  };
};

const useDynamicQuestion = ({
  params,
  planLanguage,
  secretKey,
  isReadyToFetch,
  existingQuestions,
}) => {
  const [questions, setQuestions] = useState({});
  const [generationError, setGenerationError] = useState(false);
  useEffect(() => {
    const getQuestions = async () => {
      const result = await getDynamicQuestions({
        params,
        planLanguage,
        secretKey,
      });
      if (!result.generationError) {
        setQuestions(result.questions);
      } else {
        setGenerationError(result.generationError);
      }
    };
    if (isReadyToFetch) {
      const formData = JSON.parse(localStorage.getItem('formData')) || {};
      if (areAllSpecificQuestionsReady(existingQuestions)) {
        const questions = getAllSpecificQuestions(formData);
        console.log({
          message: 'useDynamicQuestion.getDynamicQuestions: Questions',
          questions,
        });
        setQuestions(questions);
      } else {
        getQuestions();
      }
    }
  }, [isReadyToFetch]);

  return { questions, generationError };
};

export default useDynamicQuestion;
