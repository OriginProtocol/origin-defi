import { useState } from 'react';

import { faker } from '@faker-js/faker';
import { Container, Stack, Typography } from '@mui/material';
import { within } from '@storybook/testing-library';

import { HistoryFilterButton } from './HistoryButton';
import { HistoryTable } from './HistoryTable';

import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnFilter } from '@tanstack/react-table';

import type { HistoryRow } from './HistoryTable';

const rows = faker.helpers.multiple<HistoryRow>(
  () => ({
    date: faker.date.recent({ days: 35 }),
    balance: faker.number.float({
      min: 10000,
      max: 10000000000,
      precision: 10,
    }),
    change: faker.number.float({ min: -10, max: 25 }),
    type: faker.helpers.arrayElement(['swap', 'received', 'sent', 'yield']),
    link: faker.internet.url(),
  }),
  { count: 150 },
);

const WithFilters = () => {
  const [filter, setFilter] = useState<ColumnFilter>({ id: 'type', value: [] });
  return (
    <Stack gap={2} sx={{ paddingBlock: 1.5 }}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography color="primary.contrastText">History</Typography>
        <Stack direction="row" gap={2} sx={{ marginInline: 'auto' }}>
          {['Received', 'Sent', 'Swap', 'Yield'].map((label) => (
            <HistoryFilterButton
              key={label}
              selected={(filter.value as string[]).includes(
                label.toLowerCase(),
              )}
              onClick={() =>
                setFilter((prev) => {
                  const filter = label.toLowerCase();
                  if ((prev.value as string[]).includes(filter)) {
                    return {
                      ...prev,
                      value: [
                        ...(prev.value as string[]).filter(
                          (val) => val !== filter,
                        ),
                      ],
                    };
                  } else {
                    return {
                      ...prev,
                      value: [...(prev.value as string[]), filter],
                    };
                  }
                })
              }
              circle
            >
              {label}
            </HistoryFilterButton>
          ))}
        </Stack>
      </Stack>
      <HistoryTable rows={rows} isLoading={false} filter={filter} />
    </Stack>
  );
};

const meta: Meta<typeof HistoryTable> = {
  component: HistoryTable,
  title: 'History/History table',
  args: {
    isLoading: false,
    rows,
  },
  render: (args) => (
    <Container maxWidth="sm" sx={{ backgroundColor: 'grey.800' }}>
      <HistoryTable {...args} />
    </Container>
  ),
};
export default meta;

export const Primary = {
  args: {},
};

export const Filter: StoryObj<typeof HistoryTable> = {
  render: () => (
    <Container maxWidth="sm" sx={{ backgroundColor: 'grey.800' }}>
      <WithFilters />
    </Container>
  ),
};

export const SelectedFilters: StoryObj<typeof HistoryTable> = {
  render: () => (
    <Container maxWidth="sm" sx={{ backgroundColor: 'grey.800' }}>
      <WithFilters />
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByText('Received').click();
    await canvas.getByText('Yield').click();
  },
};
