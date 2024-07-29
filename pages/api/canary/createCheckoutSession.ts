import Stripe from 'stripe';
import { withApiKeyValidation } from './utils/withApiKeyValidation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(request, response) {
  const createCheckoutSessionHandler = async (req, res) => {
    if (req.method === 'POST') {
      const { lineitems, userEmail } = req.body;

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineitems,
          customer_email: userEmail, // Prefill the email field in the Checkout page
          metadata: {
            userEmail: userEmail, // Add userEmail as metadata
          },
          phone_number_collection: {
            enabled: true, // Enable phone number collection
          }, // Add phone number collection
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fullPlan`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        });

        res.status(200).json(session);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  };

  const createCheckoutSessionHandlerWithApiKeyValidation = withApiKeyValidation(
    createCheckoutSessionHandler,
  );

  await createCheckoutSessionHandlerWithApiKeyValidation(request, response);
}
