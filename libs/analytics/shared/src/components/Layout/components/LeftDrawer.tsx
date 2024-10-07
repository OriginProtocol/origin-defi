import { Drawer, useTheme } from '@mui/material';

import { useLayout } from '../hooks';
import { getWidthMixin } from '../styles';

import type { Children } from '@origin/shared/utils';

export const LeftDrawer = ({ children }: Children) => {
  const theme = useTheme();
  const [{ isDrawerOpen }, { handleToggleDrawer }] = useLayout();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      sx={[
        {
          width: getWidthMixin(isDrawerOpen, theme).width,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
        },
        getWidthMixin(isDrawerOpen, theme),
        { '& .MuiDrawer-paper': getWidthMixin(isDrawerOpen, theme) },
      ]}
    >
      {children}
    </Drawer>
  );
};
