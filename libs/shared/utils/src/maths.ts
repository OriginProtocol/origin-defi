export const subtractPercentage = (value = 0, percent = 0) => {
  const factor = Math.floor(percent * 10000);
  const amount = (value * factor) / 10000;

  return value - amount;
};
