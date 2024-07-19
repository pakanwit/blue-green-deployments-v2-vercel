import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Wizard.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_KEY_HEADER } from '../api/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ResetPasswordProps {
  secretKey: string;
}

export default function ResetPassword({ secretKey }: ResetPasswordProps) {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      setToken(
        typeof router.query.token === 'string' ? router.query.token : '',
      );
    }
  }, [router.query]);

  const handleSubmit = async (values) => {
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/passwordReset2`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [API_KEY_HEADER]: secretKey,
          },
          body: JSON.stringify({ token, newPassword: values.newPassword }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || 'An error occurred. Please try again later.',
        );
      }

      setMessage('Password successfully reset');
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Required')
      .min(7, 'Password must be more than 6 characters'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  return (
    <>
      <div className="body-2">
        <div role="banner" className="navbar w-nav">
          <div className="nav-block">
            <div className="nav">
              <Link
                href="/"
                aria-current="page"
                className="brand w-nav-brand w--current"
              >
                <Image
                  className="logo"
                  src="/img/final_horizontal_crop_V1.png"
                  width={270}
                  height={40}
                  sizes="(max-width: 479px) 220px, (max-width: 767px) 250px, 270px"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="nav">
              <Link
                href="/"
                aria-current="page"
                className="nav-button-transparent"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="navbar-bg"></div>
        </div>

        <div className="overflow">
          <div className="section-full wf-section">
            <div className="get-started2">
              <div className="form-bg">
                <h4 className="">Enter New Password</h4>
                {/* Your existing JSX code */}
                <div className="form-block-started w-form">
                  <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form className="form-started">
                        <div className="mb-6">
                          <label htmlFor="newPassword" className={styles.label}>
                            Create New Password
                            <span className="text-sm">(required)</span>
                          </label>
                          <Field
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            className={`${styles.text_input}`}
                          />
                          {errors.newPassword && touched.newPassword && (
                            <ErrorMessage name="newPassword">
                              {(msg) => <p className="text-rose-400">{msg}</p>}
                            </ErrorMessage>
                          )}
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="confirmPassword"
                            className={styles.label}
                          >
                            Confirm Password
                            <span className="text-sm">(required)</span>
                          </label>
                          <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className={`${styles.text_input}`}
                          />
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <ErrorMessage name="confirmPassword">
                                {(msg) => (
                                  <p className="text-rose-400">{msg}</p>
                                )}
                              </ErrorMessage>
                            )}
                        </div>
                        {message && <div>{message}</div>}
                        {error && <p className="text-rose-400">{error}</p>}

                        <div className="flex gap-5 justify-center mt-5">
                          <button type="submit" className="button-2 w-button">
                            Reset Password
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                {/* Rest of your JSX code */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  const secretKey = process.env.API_KEY;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'index'])),
      secretKey,
    },
  };
};
