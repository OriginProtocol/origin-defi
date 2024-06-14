export const getTradePrice = (point: Point) => {
  if (
    !point ||
    point?.final_out === undefined ||
    point?.amm_in === undefined ||
    Number(point.amm_in) === 0
  ) {
    return 0;
  }

  return Number(point.final_out) / Number(point.amm_in);
};

export const getBoughtAmount = (point: Point) => {
  if (!point || point?.bought_amount === undefined) {
    return 0;
  }

  return Number(point.bought_amount);
};

export const getARMPrice = (point: Point) => {
  if (
    !point ||
    point?.offer === undefined ||
    point?.amm_in === undefined ||
    Number(point.amm_in) === 0
  ) {
    return 0;
  }

  return Number(point.offer) / Number(point.amm_in);
};

export const getBaseAmount = (point: Point) => {
  if (!point || point?.base_amount === undefined) {
    return 0;
  }
  const res = Number(point.base_amount);

  return res > 1e-12 ? res : 0;
};

export const getQueueAmount = (point: Point) => {
  if (!point || point?.queue_amount === undefined) {
    return 0;
  }
  const res = Number(point.queue_amount);

  return res > 1e-12 ? res : 0;
};

export const getTimestamp = (point: Point) => {
  if (!point || point?.time === undefined) {
    return new Date();
  }

  return new Date(point.time);
};

export const getIsWonTrade = (point: Point) => {
  if (!point || point?.won_trade === undefined) {
    return false;
  }

  return point.won_trade === 'True';
};
