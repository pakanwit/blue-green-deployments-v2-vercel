interface Step4KeySuccessErrors {
  successFactors1?: string;
  successFactors2?: string;
  successFactors3?: string;
  weakness1?: string;
  weakness2?: string;
  weakness3?: string;
  planCurrency?: string;
}

export default function Step3CustGroupValidate(values, tv) {
  const errors: Step4KeySuccessErrors = {}

  if (!values.successFactors1) {
    errors.successFactors1 = tv("Required")
  } else if (values.successFactors1.length > 300) {
    errors.successFactors1 = tv("Success factor must be between 1 and 300 characters")
  }

  if (values.successFactors2.length > 300) {
    errors.successFactors2 = tv("Success factor must be between 1 and 300 characters")
  }

  if (values.successFactors3.length > 300) {
    errors.successFactors3 = tv("Success factor must be between 1 and 300 characters")
  }

  if (values.weakness1.length > 300) {
    errors.weakness1 = tv("Weakness must be between 1 and 300 characters")
  }

  if (values.weakness2.length > 300) {
    errors.weakness2 = tv("Weakness must be between 1 and 300 characters")
  }

  if (values.weakness3.length > 300) {
    errors.weakness3 = tv("Weakness must be between 1 and 300 characters")
  }

  return errors;
}