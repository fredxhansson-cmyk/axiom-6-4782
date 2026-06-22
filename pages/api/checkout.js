import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'sek', product_data: { name: process.env.PRODUCT_NAME || 'Hållbar Reseguide', description: process.env.PRODUCT_DESCRIPTION || 'En digital guide som hjälper resenärer hitta och boka hållbara alternativ.' }, unit_amount: 9900 }, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      locale: 'sv',
    });
    res.json({ url: session.url });
  } catch (err) { res.status(500).json({ error: err.message }); }
}