//create interface for errors
interface RegisterFormErrors {
  email?: string;
  password?: string;
  CPassword?: string;
}

export default function registerFormValidate(values, tv) {  
  const errors: RegisterFormErrors = {};

  if (!values.email) {
    errors.email = tv('Email is required')
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = tv('Email address is invalid')
  }

  if (!values.password) {
    errors.password = tv('Password is required')
  } else if (values.password.length < 6) {
    errors.password = tv('Password needs to be 6 characters or more')
  }

  if (!values.CPassword) {
    errors.CPassword = tv('Confirm Password is required')
  } else if (values.CPassword !== values.password) {
    errors.CPassword = tv('Passwords do not match')
  }

  return errors;
}