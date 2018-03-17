// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_247gf9Be9DzG90WyEZAJ0yDQ");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
var token = 'tok_1C6dUjLBs2asCzKJNo0wLMH7'; // Using Express

// Charge the user's card:
stripe.charges.create({
  amount: 999,
  currency: "usd",
  description: "Example charge",
  statement_descriptor: "Custom descriptor",
  source: token,
}, function(err, charge) {
  // asynchronously called
});