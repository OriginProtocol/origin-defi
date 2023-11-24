import { tokens } from '@origin/shared/contracts';

import type { Proposal } from './types';

export const proposals: Proposal[] = [
  {
    id: '0x901e441ce7a82563aab641b0aa680b0baf73f0597948c79cd228b0b1f89bd6f8',
    title: 'Reallocate funds from Morpho Compound USDC to Morpho Aave USDC',
    status: 'closed',
    startDate: '2023-11-15T12:10:24.718Z',
    endDate: '2023-11-17T12:10:24.718Z',
    quorum: BigInt(50e6),
    token: tokens.mainnet.OUSD,
    outcomes: [
      { title: 'For', votes: BigInt(90e6) },
      { title: 'Against', votes: BigInt(15e6) },
    ],
  },
  {
    id: '0x2694b666a1b8b01572008b6821f0f8a6842c30eb556883b7f2929a9c67fbb7ee',
    title: 'OETH Funds Management',
    status: 'active',
    startDate: '2023-11-13T06:15:24.718Z',
    endDate: '2023-11-20T06:15:24.718Z',
    quorum: BigInt(50e6),
    token: tokens.mainnet.OETH,
    outcomes: [
      { title: 'For', votes: BigInt(646e6) },
      { title: 'Against', votes: 0n },
    ],
  },
  {
    id: '0x97de2e7f7fee68bc8419eb147c71450ae51d2af054523ccc9cc607debc963047',
    title: 'Claiming protocol owned vePRISMA',
    status: 'closed',
    startDate: '2023-11-09T06:15:24.718Z',
    endDate: '2023-11-11T06:15:24.718Z',
    quorum: BigInt(50e6),
    token: tokens.mainnet.OETH,
    outcomes: [
      { title: 'Claim cvxPRISMA on cvx', votes: BigInt(87e6) },
      { title: 'Claim vePRISMA on Prisma', votes: BigInt(14e6) },
      { title: 'Sell for ETH (yield for OETH)', votes: 0n },
      { title: 'Sell for OGV (staking rewards)', votes: 0n },
      { title: 'Sell for CVX (flywheel investmt', votes: 0n },
    ],
  },
  {
    id: '0x6948818628ecb112f8eacd13ea81e3c321464920f6ef34ef75f6e3f43e2cd375',
    title: 'Add two new Balancer + Aura Strategies',
    status: 'cancelled',
    startDate: '2023-11-06T06:15:24.718Z',
    endDate: '2023-11-10T06:15:24.718Z',
    quorum: BigInt(50e6),
    token: tokens.mainnet.OETH,
    outcomes: [
      { title: 'For', votes: BigInt(106e6) },
      { title: 'Against', votes: 0n },
      { title: 'Abstain', votes: 0n },
    ],
  },
  {
    id: '0x66a9e0040db9a6f993a43edfb6058d7a8eee355fdf866878ab9e990be38672f6',
    title:
      'Determine % of OUSD and OETH Performance Fees Used for OGV Buybacks',
    status: 'closed',
    startDate: '2023-10-11T06:15:24.718Z',
    endDate: '2023-10-17T06:15:24.718Z',
    quorum: BigInt(50e6),
    token: tokens.mainnet.OETH,
    outcomes: [
      { title: '50% flywheel/50% OGV buybacks', votes: BigInt(825e6) },
      { title: '0% flywheel / 100% OGV buybacks', votes: BigInt(541e6) },
      { title: '100% flywheel/ 0% OGV buybacks', votes: BigInt(42e6) },
      { title: '25% flywheel/ 75% OGV buybacks', votes: BigInt(10e6) },
      { title: '75% flywheel/ 25% OGV buybacks', votes: 0n },
      { title: 'No change', votes: 0n },
    ],
  },
];
