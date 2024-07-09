interface Step4ProductErrors {
  productName1?: string;
  productName2?: string;
  productName3?: string;
  productName4?: string;
  productName5?: string;

  productDescription1?: string;
  productDescription2?: string;
  productDescription3?: string;
  productDescription4?: string;
  productDescription5?: string;
}


export default function Step4ProductValidate(values, tv) {
  const errors: Step4ProductErrors = {};

  if (!values.productName1) {
    errors.productName1 = tv("Required")
  } else if (values.productName1.length > 150) {
    errors.productName1 = tv("Product or service name must be between 1 and 150 characters")
  }

  if (values.productName2.length > 150) {
    errors.productName2 = tv("Product or service name must be between 1 and 150 characters")
  }

  if (values.productName3.length > 150) {
    errors.productName3 = tv("Product or service name must be between 1 and 150 characters")
  }

  if (values.productName4.length > 150) {
    errors.productName4 = tv("Product or service name must be between 1 and 150 characters")
  }

  if (values.productName5.length > 150) {
    errors.productName5 = tv("Product or service name must be between 1 and 150 characters")
  }

  if (values.productDescription1.length > 300) {
    errors.productDescription1 = tv("Product or service description must be between 1 and 300 characters")
  }

  if (values.productDescription2.length > 300) {
    errors.productDescription2 = tv("Product or service description must be between 1 and 300 characters")
  }

  if (values.productDescription3.length > 300) {
    errors.productDescription3 = tv("Product or service description must be between 1 and 300 characters")
  }

  if (values.productDescription4.length > 300) {
    errors.productDescription4 = tv("Product or service description must be between 1 and 300 characters")
  }

  if (values.productDescription5.length > 300) {
    errors.productDescription5 = tv("Product or service description must be between 1 and 300 characters")
  }

  return errors;
}