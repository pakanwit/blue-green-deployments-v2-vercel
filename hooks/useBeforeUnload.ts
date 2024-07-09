import { useEffect } from 'react';

const useBeforeUnload = (isActive: boolean = true) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isActive) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to quit? You will lose all your progress';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isActive]);
};

export default useBeforeUnload;