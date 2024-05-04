import {
  GOVERNANCE_DISCUSSION_FORUM_URL,
  GOVERNANCE_SNAPSHOT_VOTES_URL,
  OETH_ANALYTICS_URL,
  OUSD_ANALYTICS_URL,
} from '@origin/shared/constants';
import {
  FaChartPieRegular,
  FaCircleExclamationRegular,
  FaCommentsRegular,
  Snapshot,
} from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { NavItem } from './types';

export const additionalLinks: Record<string, NavItem[]> = {
  oeth: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      subtitle: defineMessage({
        defaultMessage: 'In-depth OETH analytics',
      }),
      icon: FaChartPieRegular,
      href: OETH_ANALYTICS_URL,
    },
  ],
  ousd: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      subtitle: defineMessage({
        defaultMessage: 'In-depth OUSD analytics',
      }),
      icon: FaChartPieRegular,
      href: OUSD_ANALYTICS_URL,
    },
  ],
  ogn: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      subtitle: defineMessage({
        defaultMessage: 'In-depth OGN analytics',
      }),
      icon: FaChartPieRegular,
      href: OUSD_ANALYTICS_URL,
    },
  ],
  more: [
    {
      title: defineMessage({ defaultMessage: 'Info page' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: FaCircleExclamationRegular,
      href: OUSD_ANALYTICS_URL,
    },
    {
      title: defineMessage({ defaultMessage: 'Discussion forum' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: FaCommentsRegular,
      href: GOVERNANCE_DISCUSSION_FORUM_URL,
    },
    {
      title: defineMessage({ defaultMessage: 'Snapshot vote' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: Snapshot,
      href: GOVERNANCE_SNAPSHOT_VOTES_URL,
    },
  ],
};
