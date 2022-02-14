import * as Integer from "../primitives/integer";

export {};

/**
 * Solves the classic [fuzz buzz](https://wikipedia.org/wiki/Fizz_buzz)
 * exercise. Returns a list of numbers and the words "fizz" and/or "buzz".
 *
 * @example
 *     type R = Problems.FizzBuzz<Integer.FromDecimal<5>>;
 *     // => ["1", "2", "Fizz", "4", "Buzz"]
 */
export type FizzBuzz<UpTo extends Integer.Number = Integer.FromDecimal<16>> =
  _FizzBuzz<UpTo>;

type _FizzBuzz<
  UpTo extends Integer.Number,
  N extends Integer.Number = Integer.One
> = Integer.IsLessThanOrEqual<N, UpTo> extends true
  ? [
      Integer.Modulo<N, _Three> extends Integer.Zero
        ? Integer.Modulo<N, _Five> extends Integer.Zero
          ? "FizzBuzz"
          : "Fizz"
        : Integer.Modulo<N, _Five> extends Integer.Zero
        ? "Buzz"
        : Integer.ToDecimal<N>,
      ..._FizzBuzz<UpTo, Integer.Increment<N>>
    ]
  : [];
type _Three = Integer.FromDecimal<3>;
type _Five = Integer.FromDecimal<5>;
