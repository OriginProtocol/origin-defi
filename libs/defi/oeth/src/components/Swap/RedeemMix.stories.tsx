import { Box } from '@mui/material';

import { RedeemMix } from './RedeemMix';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RedeemMix> = {
  component: RedeemMix,
  title: 'Swap/Redeem Mix',
  args: {
    selected: 4,
    index: 2,
    route: {
      value: 282967.55,
      quantity: 149.55,
      name: 'Redeem for mix via OETH vault',
      waitTime: '1 min',
      transactionCost: 135.83,
      rate: 0.995,
      type: 'redeem',
      tokenAbbreviation: '',
      icon: [
        'https://app.oeth.com/images/currency/weth-icon-small.png',
        'https://app.oeth.com/images/currency/reth-icon-small.png',
        'https://app.oeth.com/images/currency/steth-icon-small.svg',
        'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
      ],
    },
    composition: [
      {
        name: 'wETH',
        quantity: 117.0437,
        value: 238378.36,
        icon: 'https://app.oeth.com/images/currency/weth-icon-small.png',
      },
      {
        name: 'frxETH',
        quantity: 13.1245,
        value: 17643.75,
        icon: 'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
      },
      {
        name: 'rETH',
        quantity: 13.1144,
        value: 13138.96,
        icon: 'https://app.oeth.com/images/currency/reth-icon-small.png',
      },
      {
        name: 'sETH',
        quantity: 4.8354,
        value: 13138.96,
        icon: 'https://app.oeth.com/images/currency/steth-icon-small.svg',
      },
    ],
  },
  render: (args) => (
    <Box sx={{ maxWidth: { xs: 317, md: 471 } }}>
      <RedeemMix {...args} />
    </Box>
  ),
};

export default meta;

export const Default: StoryObj<typeof RedeemMix> = {};

export const Hover: StoryObj<typeof RedeemMix> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};
export const Selected: StoryObj<typeof RedeemMix> = {
  args: {
    index: 4,
  },
};

export const SmallMobile: StoryObj<typeof RedeemMix> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const LargeMobile: StoryObj<typeof RedeemMix> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
