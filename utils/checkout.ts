import { loadStripe } from '@stripe/stripe-js';
import { API_KEY_HEADER } from '../pages/api/constants';

export async function checkout({ lineitems, userEmail, secretKey }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  // Make a request to your server to create a Checkout Session
  const response = await fetch('/api/createCheckoutSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_HEADER]: secretKey,
    },
    body: JSON.stringify({ lineitems, userEmail }),
  });

  const session = await response.json();
  localStorage.removeItem('formData');
  localStorage.removeItem('hasGenDynamicQuestion');

  await stripe.redirectToCheckout({
    sessionId: session.id,
  });
}
