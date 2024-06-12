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

  return Number(point.base_amount);
};

export const getQueueAmount = (point: Point) => {
  if (!point || point?.queue_amount === undefined) {
    return 0;
  }

  return Number(point.queue_amount);
};
