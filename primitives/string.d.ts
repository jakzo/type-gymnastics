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
 *     type R = String.Repeat<"abc", 3>; // => "abcabcabc"
 */
export type Repeat<Str extends string, Times extends number> = _Repeat<
  Str,
  Integer.FromDecimal<Times>
>;

export type _Repeat<
  Str extends string,
  Times extends Integer.Number,
  S extends string = Str
> = Integer.IsGreaterThan<Times, Integer.Zero> extends true
  ? `${Times extends `0b1${string}` ? S : ""}${_Repeat<
      Str,
      Integer.ShiftRight<Times, Integer.One>,
      `${S}${S}`
    >}`
  : "";
