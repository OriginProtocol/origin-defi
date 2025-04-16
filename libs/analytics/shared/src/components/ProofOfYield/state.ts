import { useCallback, useEffect, useState } from 'react';

import { movingAverages, ZERO_ADDRESS } from '@origin/shared/utils';
import { produce } from 'immer';
import { pipe, reverse, take } from 'ramda';
import { createContainer } from 'react-tracked';

import { oTokenConfig } from '../../constants';
import { useOTokenStatsQuery } from '../../queries';
import { dailyStatMapper } from '../../utils';

import type { Token } from '@origin/shared/contracts';

import type { OTokenConfig } from '../../constants';
import type { OTokenStatsQuery } from '../../queries';
import type { DailyStatMapped } from './types';

type PoYState = {
  token: Token;
  selectedId: string | null;
  hoveredIdx: number;
  data: DailyStatMapped[] | null;
  chartData: DailyStatMapped[] | null;
  isLoading: boolean;
  config: OTokenConfig;
  xKey: keyof DailyStatMapped;
  yKey: keyof DailyStatMapped;
  lineKey: keyof DailyStatMapped;
  limit: number | undefined;
};

export const { Provider: PoYProvider, useTracked: usePoYState } =
  createContainer(({ token }: { token: Token }) => {
    const [state, setState] = useState<PoYState>({
      token,
      selectedId: null,
      hoveredIdx: -1,
      data: [],
      chartData: [],
      isLoading: false,
      config: oTokenConfig[token.id as keyof typeof oTokenConfig],
      xKey: 'timestamp',
      yKey: 'apy',
      lineKey: 'avg30',
      limit: 30,
    });

    const { data, isLoading } = useOTokenStatsQuery(
      {
        token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from: state.config.from,
      },
      {
        staleTime: 1000 * 60 * 60 * 24,
        select: useCallback(
          (data: OTokenStatsQuery) => {
            const mapped = data.oTokenDailyStats.map((s) =>
              dailyStatMapper(s, token, { currency: state.config.currency }),
            );
            const avg = movingAverages(
              mapped.map(
                (m) =>
                  m[
                    state.yKey as keyof ReturnType<typeof dailyStatMapper>
                  ] as number,
              ),
              [7, 14, 30],
            );

            return mapped.map((m, i) => ({
              ...m,
              avg7: avg[0][i],
              avg14: avg[1][i],
              avg30: avg[2][i],
            }));
          },
          [state.config.currency, state.yKey, token],
        ),
      },
    );

    useEffect(() => {
      setState(
        produce((draft) => {
          draft.isLoading = isLoading;
          if (data) {
            draft.data = data;
            if (!draft.selectedId) {
              draft.selectedId = data[1]?.id;
            }
          }
        }),
      );
    }, [data, isLoading]);

    useEffect(() => {
      setState(
        produce((draft) => {
          draft.chartData = pipe(
            take(state.limit ?? Infinity),
            reverse,
          )(data ?? []) as DailyStatMapped[];
        }),
      );
    }, [data, isLoading, state.limit]);

    return [state, setState];
  });
