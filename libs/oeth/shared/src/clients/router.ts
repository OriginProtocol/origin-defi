import { createHashRouter } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

export const getRouter = (routes: RouteObject[]) => createHashRouter(routes);
