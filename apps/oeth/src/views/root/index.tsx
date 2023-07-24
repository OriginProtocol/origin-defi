// placeholder component until we actually start migration
import { DefiOeth } from '@origin/defi/oeth';
import { useIntl } from 'react-intl';

export function OethRoot() {
  const intl = useIntl();
  return (
    <>
      <h1>{intl.formatMessage({ defaultMessage: 'test OEth' })}</h1>
      <DefiOeth />
    </>
  );
}
