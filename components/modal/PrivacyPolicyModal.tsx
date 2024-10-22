import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface PrivacyPolicyModalProps {
  closePrivacyPolicyModal: () => void;
}
const PrivacyPolicyModal = ({
  closePrivacyPolicyModal,
}: PrivacyPolicyModalProps) => {
  const { t } = useTranslation('privacy_policy');
  return (
    <>
      <motion.div
        key="privacy-policy-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="fixed inset-0 z-1000">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closePrivacyPolicyModal}
          ></div>
          <div className="h-[80vh] flex items-center justify-center p-8 sm:p-16">
            <div className="section-full wf-section w-full max-w-3xl relative">
              <button
                className="absolute top-4 right-4 text-black bg-white rounded-full p-2 z-1050"
                onClick={closePrivacyPolicyModal}
              >
                &times;
              </button>
              <div className="get-started">
                <div className="form-bg h-[80vh] mt-[20vh] overflow-scroll p-4 sm:p-8">
                  <div>
                    <h1>Privacy Policy</h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
                        <p>Last updated: May 23, 2024</p><p>Chip Business Solution (\"we,\" \"us,\" or \"our\") operates the 15minuteplan.ai website (the \"Service\"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p><h2>Information Collection and Use</h2><p>We collect personal information that you voluntarily provide to us when using the Service, such as when you fill out forms to generate a business plan. The personal information we collect may include, but is not limited to:</p><ul><li>Your name</li><li>Email address</li><li>Business name</li><li>Business address</li><li>Business industry</li><li>Financial information related to your business</li><li>Other information necessary to generate your business plan</li></ul><p>The information you provide is used solely for the purpose of generating your business plan and improving our Service. We do not share your data with any third parties, and we do not use your information for any other purposes without your explicit consent.</p><p>We will never steal your business idea or use the information you provide to create the business ourselves. Your intellectual property remains strictly yours.<p>We may also collect non-personal information about your interaction with our Service, such as the pages you visit, the time and date of your visits, and the links you click on. This information is used to analyze trends, administer the site, track users' movements around the site, and gather demographic information about our user base as a whole.</p><h2>Data Access and Security</h2><p>Access to user data is strictly limited to select individuals within our organization who require access to perform their job functions. These individuals are bound by strict confidentiality agreements and are required to follow specific protocols when handling user data.</p><p>We take reasonable measures to protect the security of your personal information, including:</p><ul><li>Use of secure servers and encryption of sensitive data</li><li>Regular security audits and penetration testing</li><li>Access control measures to ensure data is only accessible to authorized personnel</li><li>Employee training on data security best practices</li><li>Implementation of firewalls and intrusion detection systems</li><li>Secure backup and disaster recovery procedures</li></ul><p>We follow industry best practices and implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk involved in processing your personal data.</p><h2>Data Retention</h2><p>We retain your personal information only for as long as necessary to provide the Service and for our internal business purposes, such as maintaining and improving the Service, complying with legal obligations, and resolving disputes.</p><p>If you wish to request the deletion of your data, please contact us at help@15minuteplan.ai. We will promptly process your request in accordance with applicable laws and regulations.</p><h2>Cookies and Tracking Technologies</h2><p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p><p>We may also use third-party services, such as Google Analytics, that collect, monitor, and analyze user behavior on our Service. These third-party service providers have their own privacy policies addressing how they use such information.</p><h2>Your Rights</h2><p>Depending on your location and subject to applicable laws, you may have certain rights regarding your personal data, such as the right to access, rectify, erase, restrict processing, object to processing, and data portability. To exercise these rights, please contact us at help@15minuteplan.ai.</p><h2>Changes to This Privacy Policy</h2><p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically for any changes.</p><h2>Your Acceptance of These Terms</h2><p>By using this Service, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our Service. Your continued use of the Service following the posting of changes to this policy will be deemed your acceptance of those changes.</p><h2>Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us by email at help@15minuteplan.ai.</p><p>We are committed to protecting your privacy and ensuring the security of your personal information. Thank you for trusting us with your data.</p>
                        `,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicyModal;
