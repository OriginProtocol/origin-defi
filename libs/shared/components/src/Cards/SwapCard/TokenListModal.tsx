import { Dialog, MenuList } from '@mui/material';
import { eq } from 'lodash';

import { TokenListItem } from './TokenListItem';

interface MixOption {
  imgSrc: string[];
  abbreviation: string[];
}

export interface SwapOption {
  imgSrc: string;
  abbreviation: string;
}

export type Option = { name: string; value: number; quantity: number } & (
  | SwapOption
  | MixOption
);

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  options: Option[];
  onSelection: (option: Pick<Option, 'name' | 'imgSrc'>) => void;
  selected: string | string[];
}

export function TokenListModal({
  handleClose,
  isOpen,
  options,
  onSelection,
  selected,
}: Props) {
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      maxWidth="sm"
      PaperProps={{
        elevation: 23,
        sx: {
          paddingBlock: 2,
          paddingInline: 0,
          background: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          border: '1px solid',
          borderColor: (theme) => theme.palette.grey[800],
          backgroundImage: 'none',
          margin: 0,
          minWidth: 'min(90vw, 33rem)',
        },
      }}
    >
      <MenuList
        sx={{
          padding: 0,
        }}
      >
        {options.map((option) => (
          <TokenListItem
            key={option.name}
            option={option}
            onSelection={(option) => {
              onSelection(option);
              handleClose();
            }}
            selected={eq(selected, option.abbreviation)}
          />
        ))}
      </MenuList>
    </Dialog>
  );
}
