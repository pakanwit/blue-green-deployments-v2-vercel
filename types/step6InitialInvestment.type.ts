export interface InvestmentItems {
  [key: string]: {
    itemName: string;
    amount: number;
    formattedAmount: string;
  };
}
export interface InvestmentFormValues {
  investmentItems: InvestmentItems;
  planCurrency: string;
  planCurrencySymbol: string;
}
