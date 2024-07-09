import { useTranslation } from 'next-i18next';

export default function ChatbotPopup({ isChatOpen }: { isChatOpen: boolean }) {
  const { t } = useTranslation('index');

  return (
    <>
      {isChatOpen && (
        <>
          <div className="fixed bottom-6 right-6 flex items-center transition-bottom duration-300 opacity-100 animate-[fadeIn_2s_ease-in-out_forwards]">
            <div className="relative bg-white p-4 rounded-xl shadow-lg right-[76px] bottom-[60px]">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] absolute -right-2.5 bottom-0 border-b-white"></div>
              <div className="text-[#161819]">{t('ChatbotPopup')}</div>
            </div>
          </div>
          <div className="fixed z-[100] bg-[#FE6C66] text-white w-[20px] h-[20px] rounded-full right-[38px] bottom-[84px] flex justify-center items-center text-xs">
            1
          </div>
        </>
      )}
    </>
  );
}
