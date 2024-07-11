import { event } from 'nextjs-google-analytics';

declare global {
  interface Window {
    fbq: (eventType: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

interface ITrackGaEvent extends Record<string, unknown> {
  event_name: string;
  isInput?: boolean
}
export default ({ event_name, isInput, ...rest }: ITrackGaEvent) => {
  const userId = localStorage.getItem('userId');
  event(event_name, {
    user_id: userId,
    created_at: new Date().toISOString(),
    ...rest,
  });
  if (typeof window !== 'undefined' && !isInput) {
    window.fbq('track', event_name, { ...rest });
  }
};
