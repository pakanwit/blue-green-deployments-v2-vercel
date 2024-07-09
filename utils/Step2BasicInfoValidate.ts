import { useTranslation } from 'next-i18next'

interface Step2BasicInfoErrors {
  businessName?: string;
  businessType?: string;
  NEmployee?: string;
  location?: string;
  tv?: any;
}


export default function Step2BasicInfoValidate(values, tv) {
  
  const errors: Step2BasicInfoErrors = {};

  if (!values.businessName) {
    errors.businessName = tv("Required")
  } else if (values.businessName.length > 100) {
    errors.businessName = tv("Business name must be between 1 and 100 characters")
  }

  if (!values.businessType) {
    errors.businessType = tv("Required")
  } else if (values.businessType.length > 300) {
    errors.businessType = tv("Business Type must be bwtween 1 and 300 characters")
  }

  if (!values.NEmployee) {
    errors.NEmployee = tv("Required")
  } else if (values.NEmployee < 1) {
    errors.NEmployee = tv("Must be more than 1 employee")
  } else if (values.NEmployee % 1 !== 0) {
    errors.NEmployee = tv("Must be whole number")
  }

  if (!values.location) {
    errors.location = tv("Required")
  } else if (values.location.length > 200) {
    errors.location = tv("Location must be between 1 and 200 characters")
  }


  return errors;
}