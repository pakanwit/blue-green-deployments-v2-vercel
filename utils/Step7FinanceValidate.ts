// add interface Step6FinanceErrors
interface Step6FinanceErrors {
  firstYearRevenue?: string;
  revenueGrowthRate?: string;
  COGSP?: string;
  wageCostP?: string;
  markCostP?: string;
  rentCostP?: string;
  genCostP?: string;
  depreCostP?: string;
  utilCostP?: string;
  otherCostP?: string;
  intCostP?: string;
  taxCostP?: string;

  planLanguage?: string;
}

export default function Step7FinanceValidate(values, tv) {
  const errors: Step6FinanceErrors = {}

  if (!values.firstYearRevenue) {
    errors.firstYearRevenue = tv("Required")
  } else if (values.firstYearRevenue < 0) {
    errors.firstYearRevenue = tv("Revenue must be more than 0")
  }

  if (!values.revenueGrowthRate) {
    errors.revenueGrowthRate = tv("Required")
  } else if (values.revenueGrowthRate < 0) {
    errors.revenueGrowthRate = tv("Revenue growth rate must be more than 0")
  }
  
  if (values.COGSP < 0) {
    errors.COGSP = tv("COGS percent must not be negative")
  }

  if (values.wageCostP < 0) {
    errors.wageCostP = tv("Wage cost percent must not be negative")
  }

  if (values.markCostP < 0) {
    errors.markCostP = tv("Marketing cost percent must not be negative")
  }

  if (values.rentCostP < 0) {
    errors.rentCostP = tv("Rent cost percent must not be negative")
  }

  if (values.genCostP < 0) {
    errors.genCostP = tv("General cost percent must not be negative")
  }

  if (values.depreCostP < 0) {
    errors.depreCostP = tv("Depreciation cost percent must not be negative")
  }

  if (values.utilCostP < 0) {
    errors.utilCostP = tv("Utilities cost percent must not be negative")
  }

  if (values.otherCostP < 0) {
    errors.otherCostP = tv("Other cost percent must not be negative")
  }

  if (values.intCostP < 0) {
    errors.intCostP = tv("Interest cost percent must not be negative")
  }

  if (values.taxCostP < 0) {
    errors.taxCostP = tv("Tax cost percent must not be negative")
  }

  return errors;
}