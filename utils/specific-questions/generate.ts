import { allSpecificQuestionsFormDataTitle } from '../../constants/formData/specific-questions';

export interface AreAllSpecificQuestionsReady {
  specificOperationQuestion1: string;
  specificOperationQuestion2: string;
  specificOperationQuestion3: string;
  specificOperationQuestion4: string;
  specificOperationQuestion5: string;
  specificProductQuestion1: string;
  specificProductQuestion2: string;
  specificProductQuestion3: string;
  specificProductQuestion4: string;
  specificProductQuestion5: string;
}

const areAllSpecificQuestionsReady = ({
  specificOperationQuestion1,
  specificOperationQuestion2,
  specificOperationQuestion3,
  specificOperationQuestion4,
  specificOperationQuestion5,
  specificProductQuestion1,
  specificProductQuestion2,
  specificProductQuestion3,
  specificProductQuestion4,
  specificProductQuestion5,
}: AreAllSpecificQuestionsReady) => {
  if (
    specificOperationQuestion1 &&
    specificOperationQuestion2 &&
    specificOperationQuestion3 &&
    specificOperationQuestion4 &&
    specificOperationQuestion5 &&
    specificProductQuestion1 &&
    specificProductQuestion2 &&
    specificProductQuestion3 &&
    specificProductQuestion4 &&
    specificProductQuestion5
  ) {
    return true;
  } else {
    return false;
  }
};

const getAllSpecificQuestions = (formData: Record<string, any>) => {
  const questions = { product: [], operation: [] };
  allSpecificQuestionsFormDataTitle.map((title, index) => {
    const data = formData[title];
    if (index <= 4) {
      questions.product.push(data?.value);
    } else {
      questions.operation.push(data?.value);
    }
  });
  return questions;
};

export { areAllSpecificQuestionsReady, getAllSpecificQuestions };
