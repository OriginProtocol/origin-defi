import { useIntl } from 'react-intl';

/* eslint-disable-next-line */
export interface DefiOusdProps {}

export function DefiOusd(props: DefiOusdProps) {
  const intl = useIntl();
  return (
    <div>
      <h1>{intl.formatMessage({ defaultMessage: 'Welcome to DefiOusd!' })}</h1>
    </div>
  );
}

export default DefiOusd;
