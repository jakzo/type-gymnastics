import { Integer } from "./integer";

export {};

/** Utilities for working with strings. */
export namespace String {
  /**
   * Reverses a string.
   *
   * @example
   *     type R = String.Reverse<"Hello, world!">; // => "!dlrow ,olleH"
   */
  type Reverse<Str extends string> = Str extends `${infer Ch}${infer Rest}`
    ? `${Reverse<Rest>}${Ch}`
    : "";

  /**
   * Repeats a string the specified number of times.
   *
   * @example
   *     type R = String.Repeat<"abc", Integer.FromDecimal<3>>; // => "abcabcabc"
   */
  type Repeat<
    Str extends string,
    Times extends Integer.Number
  > = Integer.IsLessThanOrEqual<Times, Integer.Zero> extends true
    ? ""
    : `${Str}${Repeat<Str, Integer.Decrement<Times>>}`;
}
