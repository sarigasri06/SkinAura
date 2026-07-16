const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe PaymentIntent
// @route   POST /api/payments/create-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error('Valid amount is required');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount / 100,
    });
  } catch (error) {
    res.status(res.statusCode || 500);
    throw new Error(error.message);
  }
};

module.exports = {
  createPaymentIntent,
};
