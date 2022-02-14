/** @fileoverview Utilities for working with strings. */

import * as Integer from "./integer";

export {};

/**
 * Reverses a string.
 *
 * @example
 *     type R = String.Reverse<"Hello, world!">; // => "!dlrow ,olleH"
 */
export type Reverse<Str extends string> = Str extends `${infer Ch}${infer Rest}`
  ? `${Reverse<Rest>}${Ch}`
  : "";

/**
 * Repeats a string the specified number of times.
 *
 * @example
 *     type R = String.Repeat<"abc", Integer.FromDecimal<3>>; // => "abcabcabc"
 */
export type Repeat<
  Str extends string,
  Times extends Integer.Number
> = Integer.IsLessThanOrEqual<Times, Integer.Zero> extends true
  ? ""
  : `${Str}${Repeat<Str, Integer.Decrement<Times>>}`;
