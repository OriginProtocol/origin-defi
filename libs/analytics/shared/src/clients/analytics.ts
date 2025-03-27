import Plausible from 'plausible-tracker';

const plausible = Plausible({
  domain: 'analytics.originprotocol.com',
  hashMode: true,
});

export const registerPlausible = () => {
  if (import.meta.env.PROD) {
    const { enableAutoPageviews, enableAutoOutboundTracking } = plausible;

    enableAutoPageviews();
    enableAutoOutboundTracking();
  }
};
