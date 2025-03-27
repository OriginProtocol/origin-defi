import Plausible from 'plausible-tracker';

const plausible = Plausible({
  domain: 'analytics.originprotocol.com',
});

export const registerPlausible = () => {
  if (import.meta.env.PROD) {
    const { enableAutoPageviews, enableAutoOutboundTracking } = plausible;

    enableAutoPageviews();
    enableAutoOutboundTracking();
  }
};
