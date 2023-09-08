// placeholder component until we actually start migration
import { useIntl } from 'react-intl';

export function OUSDRoot() {
  const intl = useIntl();
  return <h1>{intl.formatMessage({ defaultMessage: 'test OUSD' })}</h1>;
}
