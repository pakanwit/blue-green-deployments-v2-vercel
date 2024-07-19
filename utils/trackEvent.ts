import { event } from 'nextjs-google-analytics';

declare global {
  interface Window {
    fbq: (
      eventType: string,
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
    twq: (command: string, event: string, data?: object) => void;
  }
}

interface ITrackGaEvent extends Record<string, unknown> {
  event_name: string;
  isInput?: boolean;
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
    try {
      window.twq('event', process.env.X_PIXEL_CONTENT_ID, {
        contents: [{ content_name: event_name, ...rest }],
        email_address: userId,
      });
    } catch (error) {
      console.error({
        message: `${event_name} event failed to track`,
        metadata: { event_name, isInput, ...rest },
      });
    }
  }
};
