import { buffer } from "micro";
import Stripe from "stripe";
import { getRealUserModel } from "../../../model/Schema";
import connectMongo from "../../../database/conn";

async function handleCheckoutSessionCompleted(checkoutSession) {
  const userEmail = checkoutSession.metadata.userEmail;
  const paymentId = checkoutSession.payment_intent;
  const paymentStatus = checkoutSession.payment_status; // Assuming payment succeeded, you can customize this based on your requirements
  const phoneNumber = checkoutSession.customer_details.phone; // Extract the phone number

  try {
    await connectMongo(); // Connect to MongoDB
    const Users = getRealUserModel();
    await Users.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          paymentId: paymentId,
          paymentStatus: paymentStatus,
          phoneNumber: phoneNumber, // Save the phone number to the database
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating user payment info:", error);
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
// Replace with your webhook signing secret from the Stripe Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handleWebhook(request, response) {
  const rawBody = await buffer(request);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log("checkout.session.completed:", checkoutSessionCompleted);

      await handleCheckoutSessionCompleted(checkoutSessionCompleted);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).json({ received: true });
}
