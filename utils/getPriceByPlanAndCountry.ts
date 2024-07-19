import { PlanType, planType, price } from './../constants/plan';

const getPriceByPlanAndCountry = (type: PlanType, country: string) => {
  if (
    country === 'IN' ||
    country === 'AR' ||
    country === 'CL' ||
    country === 'BR' ||
    country === 'PH' ||
    country === 'MY'
  ) {
    return type === planType.STARTER
      ? price.STARTER_SPECIAL
      : price.PRO_SPECIAL;
  }
  return type === planType.STARTER ? price.STARTER : price.PRO;
};

export default getPriceByPlanAndCountry;
