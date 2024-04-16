import { HistoryType } from '@origin/oeth/shared';
import { defineMessage } from 'react-intl';

import { FilterButton } from '../../FilterButton';

import type { Dispatch, SetStateAction } from 'react';

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'Yield' }),
    value: HistoryType.Yield,
  },
  // { label: defineMessage({ defaultMessage: 'Swap' }), value: HistoryType.Swap },
  { label: defineMessage({ defaultMessage: 'Sent' }), value: HistoryType.Sent },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: HistoryType.Received,
  },
];

export type HistoryFiltersProps = {
  filters: HistoryType[];
  setFilters: Dispatch<SetStateAction<HistoryType[]>>;
};

export function HistoryFilters({ filters, setFilters }: HistoryFiltersProps) {
  return <FilterButton {...{ filters, setFilters, filterOptions }} />;
}
