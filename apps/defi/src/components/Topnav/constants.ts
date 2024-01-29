import {
  ANALYTICS_URL,
  GOVERNANCE_DISCUSSION_FORUM,
  GOVERNANCE_SNAPSHOT_VOTES,
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
      href: ANALYTICS_URL,
    },
  ],
  ousd: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      subtitle: defineMessage({
        defaultMessage: 'In-depth OUSD analytics',
      }),
      icon: FaChartPieRegular,
      href: ANALYTICS_URL,
    },
  ],
  ogv: [
    {
      title: defineMessage({ defaultMessage: 'Analytics' }),
      subtitle: defineMessage({
        defaultMessage: 'In-depth OGV analytics',
      }),
      icon: FaChartPieRegular,
      href: ANALYTICS_URL,
    },
  ],
  governance: [
    {
      title: defineMessage({ defaultMessage: 'Info page' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: FaCircleExclamationRegular,
      href: ANALYTICS_URL,
    },
    {
      title: defineMessage({ defaultMessage: 'Discussion forum' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: FaCommentsRegular,
      href: GOVERNANCE_DISCUSSION_FORUM,
    },
    {
      title: defineMessage({ defaultMessage: 'Snapshot vote' }),
      subtitle: defineMessage({
        defaultMessage: 'Horem ipsum dolor ',
      }),
      icon: Snapshot,
      href: GOVERNANCE_SNAPSHOT_VOTES,
    },
  ],
};
