/**
 * @fileoverview
 * Utilities for working with numbers (including bigints).
 *
 * Note that scientific notation is not supported.
 */

export {};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Returns `true` if `A` is equal to `B`.
 *
 * @example
 *     type R = Number.IsEqual<4, 4>; // => true
 */
export type IsEqual<
  A extends number | bigint | string,
  B extends number | bigint | string
> = `${A}` extends `${infer ANum extends number | bigint}`
  ? `${B}` extends `${infer BNum extends number | bigint}`
    ? ANum extends BNum
      ? number | bigint extends BNum
        ? false
        : true
      : false
    : false
  : false;

/**
 * Returns `true` if `A` is less than `B`.
 *
 * @example
 *     type R = Number.IsLessThan<3, 4>; // => true
 */
export type IsLessThan<
  A extends number | bigint | string,
  B extends number | bigint | string,
  AStr extends string = `${A}`,
  BStr extends string = `${B}`
> = IsEqual<A, B> extends true
  ? false
  : AStr extends `-${infer ANum extends number | bigint}`
  ? BStr extends `-${infer BNum extends number | bigint}`
    ? _IsLessThanValidate<`${ANum}`, `${BNum}`> extends true
      ? false
      : true
    : true
  : BStr extends `-${number | bigint}`
  ? false
  : _IsLessThanValidate<AStr, BStr>;

type _IsLessThanValidate<
  A extends string,
  B extends string
> = A extends `${infer ANum extends number | bigint}`
  ? number extends ANum
    ? false
    : B extends `${infer BNum extends number | bigint}`
    ? number extends BNum
      ? false
      : _IsLessThan<A, B, boolean>
    : false
  : false;

type _IsLessThan<
  A extends string,
  B extends string,
  IsLesser extends boolean
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? ADigit extends "."
      ? BDigit extends "."
        ? _IsLessThanDecimal<ARest, BRest>
        : true
      : _IsLessThan<
          ARest,
          BRest,
          ADigit extends BDigit
            ? IsLesser
            : boolean extends IsLesser
            ? _IsDigitLesser<A, B>
            : IsLesser
        >
    : ADigit extends "."
    ? IsLesser extends true
      ? true
      : false
    : false
  : B extends `${infer _}${string}`
  ? true
  : boolean extends IsLesser
  ? false
  : IsLesser;

type _IsLessThanDecimal<
  A extends string,
  B extends string
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? ADigit extends BDigit
      ? _IsLessThanDecimal<ARest, BRest>
      : _IsDigitLesser<ADigit, BDigit>
    : false
  : B extends `${infer _}${string}`
  ? true
  : false;

type _IsDigitLesser<
  A extends string,
  B extends string
> = B extends keyof _DigitLookups
  ? A extends keyof _DigitLookups[B]
    ? true
    : false
  : false;
type _DigitLookups = [
  [],
  [0],
  [0, 0],
  [0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * Returns `true` if `A` is less than or equal to `B`.
 *
 * @example
 *     type R = Number.IsLessThanOrEqual<3, 4>; // => true
 *     type R = Number.IsLessThanOrEqual<4, 4>; // => true
 */
export type IsLessThanOrEqual<
  A extends number | bigint | string,
  B extends number | bigint | string
> = IsEqual<A, B> extends true ? true : IsLessThan<A, B>;

/**
 * Returns `true` if `A` is greater than `B`.
 *
 * @example
 *     type R = Number.IsGreater<5, 4>; // => true
 */
export type IsGreaterThan<
  A extends number | bigint | string,
  B extends number | bigint | string
> = IsLessThan<B, A>;

/**
 * Returns `true` if `A` is greater than or equal to `B`.
 *
 * @example
 *     type R = Number.IsGreaterThanOrEqual<5, 4>; // => true
 *     type R = Number.IsGreaterThanOrEqual<4, 4>; // => true
 */
export type IsGreaterThanOrEqual<
  A extends number | bigint | string,
  B extends number | bigint | string
> = IsEqual<A, B> extends true ? true : IsLessThan<B, A>;
