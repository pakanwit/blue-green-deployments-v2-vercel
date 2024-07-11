import { InvestmentFormValues } from '../types/step6InitialInvestment.type';

interface MyFormValuesError {
  investmentItems: {
    [key: number]: {
      itemName?: string;
      amount?: string;
    };
  };
  planCurrency?: string;
}

export default function Step6InitialInvestmentValidate(
  values: InvestmentFormValues,
  tv,
) {
  const errors: MyFormValuesError = {
    investmentItems: {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
    },
  };

  Object.values(values.investmentItems).forEach((item, index) => {
    if (item?.itemName?.length > 200) {
      errors.investmentItems[index].itemName = tv(
        'Investment item must be between 1 and 200 characters',
      );
    }
    if (item?.amount < 0) {
      errors.investmentItems[index].amount = tv(
        'Investment amount mmust be more than 0',
      );
    }
  });

  if (!values.planCurrency) {
    errors.planCurrency = tv('Required');
  }

  // check if error object is empty
  const errorValues = Object.values(errors.investmentItems).map(
    (item) => Object.values(item),
  );
  if(errorValues.flat().every((item) => !item) && !errors.planCurrency) {
    return {};
  }
  return errors;
}
