interface Step3CustGroupErrors {
  customerDescription1?: string;
  customerDescription2?: string;
  customerDescription3?: string;
}


export default function Step3CustGroupValidate(values, tv) {
  const errors: Step3CustGroupErrors = {};

  if (!values.customerDescription1) {
    errors.customerDescription1 = tv("Required")
  } else if (values.customerDescription1.length > 300) {
    errors.customerDescription1 = tv("Customer Description must be between 1 and 300 characters")
  }

  if (values.customerDescription2.length > 300) {
    errors.customerDescription2 = tv("Customer Description must be between 1 and 300 characters")
  }

  if (values.customerDescription3.length > 300) {
    errors.customerDescription3 = tv("Customer Description must be between 1 and 300 characters")
  }


  return errors;
}