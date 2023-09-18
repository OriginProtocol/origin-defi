export function votingPowerMultiplier(x: number): number {
  if (x === 0) return 1;
  const a = 0.71124907;
  const b = 0.46242241;
  const c = -0.02494931;
  const d = 0.00078924;
  const e = -0.00000592;

  return a + b * x + c * x * x + d * x * x * x + e * x * x * x * x;
}

export function estimateAPY(x: number): number {
  if (x === 0) return 0;
  const a = 2.01973731;
  const b = 1.22048809;
  const c = -0.06751627;
  const d = 0.00215409;
  const e = -0.00001645;

  return a + b * x + c * x * x + d * x * x * x + e * x * x * x * x;
}
