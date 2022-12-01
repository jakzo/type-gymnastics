import * as Integer from "../primitives/integer";

export {};

/**
 * Returns the `N`th number in the [Fibonacci sequence](https://wikipedia.org/wiki/Fibonacci_number).
 *
 * This is defined using the simple `f(i) = f(i-1) + f(i-2)` formula.
 * This still works efficiently for large numbers because TypeScript automatically
 * caches the results.
 *
 * @example
 *     type R = Math.Fibonacci<6>; // => 8
 */
export type Fibonacci<N extends number> = Integer.ToNumber<
  _Fibonacci<Integer.FromDecimal<N>>
>;

export type _Fibonacci<N extends Integer.Number> = Integer.IsLessThanOrEqual<
  N,
  Integer.Two
> extends true
  ? Integer.One
  : Integer.Add<
      _Fibonacci<Integer.Subtract<N, Integer.One>>,
      _Fibonacci<Integer.Subtract<N, Integer.Two>>
    >;
