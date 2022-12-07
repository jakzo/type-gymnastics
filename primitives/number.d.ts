/**
 * @fileoverview
 * Utilities for working with numbers (including bigints).
 *
 * Note that scientific notation is not supported.
 */

export {};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
> = A extends B
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
