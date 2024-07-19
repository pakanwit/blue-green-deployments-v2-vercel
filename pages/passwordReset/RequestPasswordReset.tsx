import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Wizard.module.css';
import { API_KEY, API_KEY_HEADER } from '../api/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface RequestPasswordResetProps {
  apiKey: string;
}

export default function RequestPasswordReset({
  apiKey,
}: RequestPasswordResetProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const headers = {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: apiKey,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/passwordReset1`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || 'An error occurred. Please try again later.',
        );
      }

      setEmail('');
      setEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

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
                {emailSent ? (
                  <></>
                ) : (
                  <h4 className="">Enter Email to Reset Password</h4>
                )}
                <div className="form-block-started w-form">
                  {emailSent ? (
                    <div className="flex flex-col justify-center items-center text-center">
                      <h5>Password Recovery Email Sent</h5>
                      <Link href="https://mail.google.com/">Go to Gmail</Link>
                    </div>
                  ) : (
                    <form className="form-started" onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="email" className={styles.label}>
                          Email you used to register
                          <span className="text-sm">(required)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value.toLowerCase())
                          }
                          placeholder="Email address"
                          className={`${styles.text_input}`}
                          required
                        />
                      </div>
                      {error && <p className="text-rose-400">{error}</p>}

                      <div className="flex gap-5 justify-center mt-5">
                        <button type="submit" className="button-2 w-button">
                          Send Password Recovery Link
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'index'])),
      apiKey: API_KEY,
    },
  };
};
