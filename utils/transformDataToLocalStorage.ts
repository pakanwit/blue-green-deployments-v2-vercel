import { radiosForm } from '../constants/formTitle';

export const transformDataToLocalStorage = (data, refId) => {
  const transformedData = {
    refId,
    businessPlanObj: {
      id: radiosForm.businessPlanObj[data.businessPlanObj],
      value: data.businessPlanObj,
    },
    businessName: { id: 'businessName', value: data.businessName },
    planLanguage: {
      id: 'dropdownDefaultButton',
      value: data.planLanguage,
    },
    businessOperationalStatus: {
      id: radiosForm.businessOperationalStatus[data.businessOperationalStatus],
      value: data.businessOperationalStatus,
    },
    businessType: { id: 'businessType', value: data.businessType },
    NEmployee: { id: 'NEmployee', value: data.NEmployee },
    location: { id: 'location', value: data.location },
    salesChannel: {
      id: radiosForm.salesChannel[data.salesChannel.toLowerCase()],
      value: data.salesChannel.toLowerCase(),
    },
    productOrService: {
      id: radiosForm.productOrService[data.productOrService],
      value: data.productOrService,
    },
    customerIncome1: {
      id: radiosForm.customerIncome1[data.customerIncome1],
      value: data.customerIncome1,
    },
    customerIncome2: {
      id: radiosForm.customerIncome2[data.customerIncome2],
      value: data.customerIncome2,
    },
    customerIncome3: {
      id: radiosForm.customerIncome3[data.customerIncome3],
      value: data.customerIncome3,
    },
    customerDescription1: {
      id: 'customerDescription1',
      value: data.customerDescription1,
    },
    customerDescription2: {
      id: 'customerDescription2',
      value: data.customerDescription2,
    },
    customerDescription3: {
      id: 'customerDescription3',
      value: data.customerDescription3,
    },
    productName1: { id: 'productName1', value: data.productName1 },
    productName2: { id: 'productName2', value: data.productName2 },
    productName3: { id: 'productName3', value: data.productName3 },
    productName4: { id: 'productName4', value: data.productName4 },
    productName5: { id: 'productName5', value: data.productName5 },
    productDescription1: {
      id: 'productDescription1',
      value: data.productDescription1,
    },
    productDescription2: {
      id: 'productDescription2',
      value: data.productDescription2,
    },
    productDescription3: {
      id: 'productDescription3',
      value: data.productDescription3,
    },
    productDescription4: {
      id: 'productDescription4',
      value: data.productDescription4,
    },
    productDescription5: {
      id: 'productDescription5',
      value: data.productDescription5,
    },
    successFactors1: { id: 'successFactors1', value: data.successFactors1 },
    successFactors2: { id: 'successFactors2', value: data.successFactors2 },
    successFactors3: { id: 'successFactors3', value: data.successFactors3 },
    weakness1: { id: 'weakness1', value: data.weakness1 },
    weakness2: { id: 'weakness2', value: data.weakness2 },
    weakness3: { id: 'weakness3', value: data.weakness3 },
    investmentItem1: { id: 'investmentItem1', value: data.investmentItem1 },
    investmentAmountItem1: {
      id: 'investmentAmountItem1',
      value: data.investmentAmountItem1,
    },
    investmentItem2: { id: 'investmentItem2', value: data.investmentItem2 },
    investmentAmountItem2: {
      id: 'investmentAmountItem2',
      value: data.investmentAmountItem2,
    },
    investmentItem3: { id: 'investmentItem3', value: data.investmentItem3 },
    investmentAmountItem3: {
      id: 'investmentAmountItem3',
      value: data.investmentAmountItem3,
    },
    investmentItem4: { id: 'investmentItem4', value: data.investmentItem4 },
    investmentAmountItem4: {
      id: 'investmentAmountItem4',
      value: data.investmentAmountItem4,
    },
    investmentItem5: { id: 'investmentItem5', value: data.investmentItem5 },
    investmentAmountItem5: {
      id: 'investmentAmountItem5',
      value: data.investmentAmountItem5,
    },
    investmentItem6: { id: 'investmentItem6', value: data.investmentItem6 },
    investmentAmountItem6: {
      id: 'investmentAmountItem6',
      value: data.investmentAmountItem6,
    },
    investmentItem7: { id: 'investmentItem7', value: data.investmentItem7 },
    investmentAmountItem7: {
      id: 'investmentAmountItem7',
      value: data.investmentAmountItem7,
    },
    investmentItem8: { id: 'investmentItem8', value: data.investmentItem8 },
    investmentAmountItem8: {
      id: 'investmentAmountItem8',
      value: data.investmentAmountItem8,
    },
    investmentItem9: { id: 'investmentItem9', value: data.investmentItem9 },
    investmentAmountItem9: {
      id: 'investmentAmountItem9',
      value: data.investmentAmountItem9,
    },
    investmentItem10: { id: 'investmentItem10', value: data.investmentItem10 },
    investmentAmountItem10: {
      id: 'investmentAmountItem10',
      value: data.investmentAmountItem10,
    },
    initialInvestmentAmount: {
      id: 'initialInvestmentAmount',
      value: data.initialInvestmentAmount,
    },
    firstYearRevenue: { id: 'firstYearRevenue', value: data.firstYearRevenue },
    revenueGrowthRate: {
      id: 'revenueGrowthRate',
      value: data.revenueGrowthRate,
    },
    COGSP: { id: 'COGSP', value: data.COGSP },
    wageCostP: { id: 'wageCostP', value: data.wageCostP },
    markCostP: { id: 'markCostP', value: data.markCostP },
    rentCostP: { id: 'rentCostP', value: data.rentCostP },
    genCostP: { id: 'genCostP', value: data.genCostP },
    depreCostP: { id: 'depreCostP', value: data.depreCostP },
    utilCostP: { id: 'utilCostP', value: data.utilCostP },
    otherCostP: { id: 'otherCostP', value: data.otherCostP },
    intCostP: { id: 'intCostP', value: data.intCostP },
    taxCostP: { id: 'taxCostP', value: data.taxCostP },
    planCurrency: { id: 'dropdownDefaultButton', value: data.planCurrency },
  };
  localStorage.setItem('formData', JSON.stringify(transformedData));
};
