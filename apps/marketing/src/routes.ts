import { ArmView } from '@origin/marketing/arm';
import { BlogView } from '@origin/marketing/blog';
import { HomeView } from '@origin/marketing/home';
import { OethView } from '@origin/marketing/oeth';
import { OpportunitiesView } from '@origin/marketing/opportunities';
import { OsView } from '@origin/marketing/os';
import { OusdView } from '@origin/marketing/ousd';
import { SuperView } from '@origin/marketing/super';
import { NotFoundPage } from '@origin/shared/components';

import { App } from './App';

import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    Component: App,
    children: [
      {
        index: true,
        Component: HomeView,
      },
      {
        path: 'arm',
        Component: ArmView,
      },
      {
        path: 'blog',
        Component: BlogView,
      },
      {
        path: 'oeth',
        Component: OethView,
      },
      {
        path: 'opportunities',
        Component: OpportunitiesView,
      },
      {
        path: 'os',
        Component: OsView,
      },
      {
        path: 'ousd',
        Component: OusdView,
      },
      {
        path: 'super',
        Component: SuperView,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
