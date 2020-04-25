function formatUSD(stripeAmount) {
  return `$${(stripeAmount / 100).toFixed(2)}`;
}

function formatStripeAmount(USDString) {
  console.log(USDString, parseFloat(USDString) * 100)
  return parseFloat(USDString) * 100;
}

export default {
  formatUSD,
  formatStripeAmount
};