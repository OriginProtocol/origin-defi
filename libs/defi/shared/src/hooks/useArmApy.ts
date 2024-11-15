import { ArmDailyStatOrderByInput } from '../generated/graphql';
import { useArmDailyStatsQuery } from '../queries';

export const useArmApy = (trailing = 1) => {
  return useArmDailyStatsQuery(
    {
      limit: trailing,
      orderBy: ArmDailyStatOrderByInput.TimestampDesc,
      offset: 1,
    },
    {
      select: (data) => {
        if (!data?.armDailyStats || data.armDailyStats.length === 0) {
          return 0;
        }

        return (
          data.armDailyStats.reduce((acc, curr) => acc + curr.apy, 0) /
          data.armDailyStats.length
        );
      },
    },
  );
};
