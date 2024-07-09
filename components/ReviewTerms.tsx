// this is an incomplete feature

import React, { useState, useEffect } from 'react';
import styles from '../styles/Wizard.module.css';
import { useTranslation } from 'next-i18next';

const ReviewTerms = ({
  showReviewTerms,
  setShowReviewTerms,
  starterPrice,
  proPrice,
  discountedStarterPrice,
  discountedProPrice,
  setPlanPackage,
  handleNextFormik,
  setShowReviewTermsFalse,
}) => {
  const { t } = useTranslation('ReviewTerms');

  // Add a state for the checkbox
  const [isChecked, setIsChecked] = useState(false);

  function getDiscountedProPackage() {
    setPlanPackage('professional');
    handleNextFormik();
  }

  function getDiscountedStarterPackage() {
    setPlanPackage('starter');
    handleNextFormik();
  }

  if (!showReviewTerms) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative p-16 bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-auto h-[80%] mt-[18vh] md:mt-[8vh]">
          <button
            onClick={setShowReviewTermsFalse}
            className="absolute top-0 right-0 m-2"
          >
            X
          </button>
          <h4>Review Discount Terms</h4>
          <p>
            To apply for a discount, after using our product you need to leave a
            positive review on Trustpilot. Here’s how it works
          </p>
          <ol>
            <li>
              After agreeing to our discount terms you can select the package
              then you’ll need to register using email and password
            </li>
            <li>
              You’ll be redirected to Stripe and prompted to pay with our
              special price
            </li>
            <li>You make payment</li>
            <li>
              You’ll be redirected back to our site and a plan will be generated
            </li>
            <li>You can review and edit the plan using our AI edit feature</li>
            <li>
              Before you can download you will need to first leave a positive
              review on Trustpilot. Instructions on how to do that would be
              presented to you appropriately. The whole process of leaving a
              review should take 10 minutes.
            </li>
          </ol>

          <div className="flex items-center gap-3">
            <input
              id="terms"
              type="checkbox"
              className="h-12 w-12 text-gray-600 border-gray-300 rounded focus:ring-0" // Increase the size of the checkbox
              onChange={(e) => setIsChecked(e.target.checked)} // Update the state when the checkbox is clicked
            />
            <label htmlFor="terms" className="ml-2 block font-bold">
              I agree that I will leave a positive review on Trustpilot before I
              download the plan for this discount. Otherwise, I will not be able
              to download the plan.
            </label>
          </div>

          <div className="flex justify-center items-center mt-8">
            <div className="w-1/2 flex justify-center mr-1">
              <button
                onClick={getDiscountedStarterPackage}
                className={`transparent-button-unlock w-button mb-5 ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`} // Apply styles conditionally
                disabled={!isChecked} // Disable the button if the checkbox is not checked
              >
                {t('Buy Starter For')} <del>{starterPrice}</del>{' '}
                {discountedStarterPrice}
              </button>
            </div>
            <div className="w-1/2 flex justify-center ml-1">
              <button
                onClick={getDiscountedProPackage}
                className={`button-unlock w-button mb-5 ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`} // Apply styles conditionally
                disabled={!isChecked} // Disable the button if the checkbox is not checked
              >
                {t('Buy Pro For ')} <del>{proPrice}</del> {discountedProPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTerms;
