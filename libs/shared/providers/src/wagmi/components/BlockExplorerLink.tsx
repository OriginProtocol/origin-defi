import { Link } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { LinkProps } from '@mui/material';

export type BlockExplorerLinkProps = {
  hash?: string;
  blockExplorer?: {
    name: string;
    url: string;
  };
} & Omit<LinkProps, 'href'>;

export const BlockExplorerLink = ({
  hash,
  blockExplorer,
  ...rest
}: BlockExplorerLinkProps) => {
  const intl = useIntl();
  const { chains } = useConfig();
  const { chain } = useAccount();

  const baseUrl =
    blockExplorer?.url ??
    chain?.blockExplorers?.default?.url ??
    chains?.[0]?.blockExplorers?.default?.url ??
    mainnet.blockExplorers.default.url;
  const name =
    blockExplorer?.name ??
    chain?.blockExplorers?.default?.name ??
    chains?.[0]?.blockExplorers?.default?.name ??
    mainnet.blockExplorers.default.name;

  return (
    <Link
      {...rest}
      href={`${baseUrl}/tx/${hash ?? ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {intl.formatMessage(
        {
          defaultMessage: 'View on {name}',
        },
        { name },
      )}
    </Link>
  );
};
