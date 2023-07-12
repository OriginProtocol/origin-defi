import { useIntl } from 'react-intl';

/* eslint-disable-next-line */
export interface DefiOethProps {}

export function DefiOeth(props: DefiOethProps) {
  const intl = useIntl();
  return (
    <div>
      <h1>{intl.formatMessage({ defaultMessage: 'Welcome to DefiOeth!' })}</h1>
    </div>
  );
}

export default DefiOeth;
