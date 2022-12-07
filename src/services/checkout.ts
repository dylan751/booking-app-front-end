import { loadStripe } from '@stripe/stripe-js';

export const checkout = async ({ lineItems }) => {
  let stripePromise: any = null;

  // Load Stripe
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  // Redirect to Stripe checkout page
  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}`,
    cancelUrl: `${window.location.origin}`,
  });
};
