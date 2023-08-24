import { formatUnits, parseUnits } from 'viem';

const DEFAULT_DECIMALS = 18;

export class BigDecimal {
  exact: bigint;
  decimals: number;

  constructor(num: bigint, decimals = DEFAULT_DECIMALS) {
    this.exact = num ? (typeof num === 'bigint' ? num : BigInt(num)) : 0n;
    this.decimals = decimals;
  }

  static ZERO(): BigDecimal {
    return new BigDecimal(0n, DEFAULT_DECIMALS);
  }

  static ONE(decimals = DEFAULT_DECIMALS): BigDecimal {
    return new BigDecimal(parseUnits('1', decimals), decimals);
  }

  static parse(
    amountStr: `${number}`,
    decimals = DEFAULT_DECIMALS,
  ): BigDecimal {
    return new BigDecimal(parseUnits(amountStr, decimals), decimals);
  }

  static fromSimple(
    amountNum: number,
    decimals = DEFAULT_DECIMALS,
  ): BigDecimal {
    return new BigDecimal(BigInt(amountNum), decimals);
  }

  get string(): string {
    return formatUnits(this.exact, this.decimals);
  }

  get simple(): number {
    return parseFloat(this.string);
  }

  get simpleRounded(): number {
    return parseFloat(this.simple.toFixed(3).slice(0, -1));
  }

  toJSON(): string {
    return JSON.stringify({
      decimals: this.decimals,
      exact: this.exact.toString(),
    });
  }

  toFixed(decimalPlaces = 2): number {
    return parseFloat(this.simple.toFixed(decimalPlaces + 1).slice(0, -1));
  }

  toPercent(decimalPlaces = 2): number {
    return parseFloat((this.simple * 100).toFixed(decimalPlaces));
  }

  format(decimalPlaces = 2): string {
    return Intl.NumberFormat('en', {
      maximumFractionDigits: decimalPlaces,
    }).format(this.simple);
  }

  add(other: BigDecimal) {
    this.exact += other.exact;
  }

  sub(other: BigDecimal) {
    this.exact -= other.exact;
  }

  mul(other: BigDecimal) {
    this.exact *= other.exact;
  }

  div(other: BigDecimal) {
    this.exact /= other.exact;
  }

  eq(other: BigDecimal): boolean {
    return this.exact === other.exact;
  }

  gt(other: BigDecimal): boolean {
    return this.exact > other.exact;
  }

  gte(other: BigDecimal): boolean {
    return this.exact >= other.exact;
  }

  lt(other: BigDecimal): boolean {
    return this.exact < other.exact;
  }

  lte(other: BigDecimal): boolean {
    return this.exact <= other.exact;
  }

  eq0(): boolean {
    return this.exact === 0n;
  }
}
