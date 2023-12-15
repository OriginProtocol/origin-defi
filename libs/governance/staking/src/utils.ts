// Calculation imported from https://github.com/OriginProtocol/ousd-governance/blob/d420f0fe4dd6ac3bdb704ac354975d1f7ce37a47/client/utils/apy.tsx#L1

import { fromUnixTime, getUnixTime } from 'date-fns';

// format: start_timestamp, end_timestamp, daily emissions
const dailyEmissionMatrix = [
  [0, 1660176000, 3333333],
  [1660176000, 1665360000, 2666667],
  [1665360000, 1675728000, 1866667],
  [1675728000, 1696464000, 1120000],
  [1696464000, 1727568000, 560000],
  [1727568000, 1779408000, 224000],
  [1779408000, 1862352000, 67200],
];

export function getDailyRewardsEmissions(time = Date.now() / 1000) {
  const reward = dailyEmissionMatrix.find(
    ([startTime, endTime, dailyRewards]) => time > startTime && time < endTime,
  );

  // 0 when rewards period has already finished
  return reward ? reward[2] : 0;
}

export function getRewardsApy(
  veOgvReceived: number,
  ogvToStake: number,
  totalSupplyVeOgv: number,
) {
  if (totalSupplyVeOgv === 0 || ogvToStake === 0 || veOgvReceived === 0) {
    return 0;
  }

  const ogvPercentageOfRewards =
    veOgvReceived / (totalSupplyVeOgv + veOgvReceived);
  const dailyEmissions = getDailyRewardsEmissions();
  if (dailyEmissions === 0) {
    console.warn(
      'Reason for APY 0% -> no reward emissions for current timestamp.',
    );
  }
  const ogvRewardsDaily = dailyEmissions * ogvPercentageOfRewards;
  const ogvRewardsYearly = ogvRewardsDaily * 365.25;
  // No need to use actual prices since originating tokens and reward tokens have the same price
  const ogvLockupRewardApr = ogvRewardsYearly / ogvToStake;

  /* APR to APY formula:
   * APY = Math.pow((1 + Periodic Rate), Number of periods) – 1
   *
   * picking 1 (1 year) as a number of periods. Since the rewards are not really going to be
   * compounding in this case
   */
  return ((1 + ogvLockupRewardApr / 1) ** 1 - 1) * 100;
}

export function getNextEmissionDate() {
  const now = getUnixTime(new Date());
  const range = dailyEmissionMatrix.find(
    ([startTime, endTime]) => now > startTime && now < endTime,
  );

  return fromUnixTime(range[1]);
}
