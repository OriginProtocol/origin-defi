import { Link } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { LinkProps } from '@mui/material';

export type ChainScanLinkProps = {
  hash?: string;
  blockExplorer?: {
    name: string;
    url: string;
  };
} & Omit<LinkProps, 'href'>;

export const ChainScanLink = ({
  hash,
  blockExplorer,
  ...rest
}: ChainScanLinkProps) => {
  const intl = useIntl();
  const { chain, chains } = useNetwork();

  const base =
    blockExplorer?.url ??
    chain?.blockExplorers?.default?.url ??
    chains[0].blockExplorers.default.url ??
    mainnet.blockExplorers.default.url;
  const name =
    blockExplorer?.name ??
    chain?.blockExplorers?.default?.name ??
    chains[0].blockExplorers.default.name ??
    mainnet.blockExplorers.default.name;

  return (
    <Link
      {...rest}
      href={`${base}/tx/${hash ?? ''}`}
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
