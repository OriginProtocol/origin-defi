import { faker } from '@faker-js/faker';

import { FinancialStatement } from './FinancialStatement';

import type { Meta, StoryObj } from '@storybook/react';

faker.seed(4548);

function array<T>(n: number, initial: T, fn: (last: T) => T) {
  let last: T = initial;
  return new Array(n).fill(0).map((_, index) => {
    if (index === 0) return last;
    return (last = fn(last));
  });
}

function randomValues(min = 100000, max = 30000000) {
  return array(2, faker.number.int({ min, max }), (last) =>
    faker.number.int({ min: last * 0.75, max: last * 1.25 }),
  );
}

const meta: Meta<typeof FinancialStatement> = {
  component: FinancialStatement,
  title: 'Analytics/FinancialStatement',
  args: {
    dataLastUpdated: 123456789,
    columns: ['31 August 2023', '1 week ago'],
    data: {
      Assets: {
        Vault: {
          ETH: [125000, 0],
          WETH: [125000, 1],
          stETH: [0, 125000],
          rETH: [1, 125000],
          frxETH: [0, 0],
        },
        Curve: {
          ETH: randomValues(),
          OETH: randomValues(),
        },
        'Frax Staking': {
          ETH: randomValues(),
          OETH: randomValues(),
        },
        'Morpho Aave': {
          WETH: randomValues(),
        },
        Dripper: {
          WETH: randomValues(20000, 50000),
        },
      },
      Liabilities: {
        'Token supply': {
          OETH: randomValues(10000000, 1000000000),
        },
      },
    },
  },
  render: (args) => <FinancialStatement {...args} />,
};

export default meta;

export const Default: StoryObj<typeof FinancialStatement> = {};
