import { secondsInYear } from 'date-fns/constants';

export const getRewardsApy = (
  xOgnReceived?: number,
  xOgnTotalSupply?: number,
  rewardsPerSecond = 0,
) => {
  if (!xOgnReceived || !xOgnTotalSupply) {
    return 0;
  }

  const xOgnPercentageOfRewards =
    xOgnReceived / (xOgnTotalSupply + xOgnReceived);
  const xOgnRewardsPerSecond = rewardsPerSecond * xOgnPercentageOfRewards;
  const xOgnRewardsPerYear = xOgnRewardsPerSecond * secondsInYear;

  return xOgnRewardsPerYear / (xOgnTotalSupply + xOgnReceived);
};

export const getLockupApy = (
  ognLockup?: number,
  xOgnReceived?: number,
  xOgnTotalSupply?: number,
  rewardsPerSecond = 0,
) => {
  if (!ognLockup || !xOgnReceived || !xOgnTotalSupply) {
    return 0;
  }

  const xOgnPercentageOfRewards = xOgnReceived / xOgnTotalSupply;
  const xOgnRewardsPerSecond = rewardsPerSecond * xOgnPercentageOfRewards;
  const xOgnRewardsPerYear = xOgnRewardsPerSecond * secondsInYear;

  return xOgnRewardsPerYear / ognLockup;
};
