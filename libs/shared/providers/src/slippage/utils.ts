export const subtractSlippage = (value = 0, slippage = 0) => {
  const slippageFactor = Math.floor(slippage * 10000);
  const slippageAmount = (value * slippageFactor) / 10000;

  return value - slippageAmount;
};
