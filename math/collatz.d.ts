import * as Integer from "../primitives/integer";

export {};

/**
 * Returns the number of steps it takes to reach 1 when repeatedly applying the rules:
 * - If `N` is even, set it to `N/2`
 * - If `N` is odd, set it to `N*3+1`
 *
 * According to the [Collatz conjecture](https://wikipedia.org/wiki/Collatz_conjecture)
 * every positive integer should reach 1 eventually, though it is famously yet to be proven.
 *
 * @example
 *     type R = Math.Collatz<6>; // => 8
 */
export type Collatz<N extends number> = Integer.ToNumber<
  _Collatz<Integer.FromDecimal<N>>
>;
// @ts-expect-error - excessively deep
type _Collatz<
  N extends Integer.Number,
  Result extends Integer.DivModResult<
    Integer.Number,
    Integer.Number
  > = Integer.DivMod<N, Integer.Two>
> = N extends Integer.One
  ? Integer.Zero
  : // @ts-expect-error - excessively deep
    Integer.Increment<
      _Collatz<
        Result["remainder"] extends Integer.Zero
          ? Result["quotient"]
          : Integer.Increment<Integer.Multiply<N, Integer.Three>>
      >
    >;
