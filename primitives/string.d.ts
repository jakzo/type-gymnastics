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

/**
 * Removes `Num` characters from the beginning of `Str`.
 *
 * @example
 *     type R = String.Chomp<"abcde", 3>; // => "de"
 */
export type Chomp<Str extends string, Num extends number> = _Chomp<
  Str,
  Integer.FromDecimal<Num>
>;
export type _Chomp<
  Str extends string,
  Num extends Integer.Number
> = Num extends Integer.NonZero
  ? Str extends `${infer _Ch}${infer Rest}`
    ? _Chomp<Rest, Integer.Decrement<Num>>
    : Str
  : Str;

/**
 * Returns the first `Num` characters from the beginning of `Str`.
 *
 * @example
 *     type R = String.Take<"abcde", 3>; // => "abc"
 */
export type Take<Str extends string, Num extends number> = _Take<
  Str,
  Integer.FromDecimal<Num>
>;
export type _Take<
  Str extends string,
  Num extends Integer.Number,
  Taken extends string = ""
> = Num extends Integer.NonZero
  ? Str extends `${infer Ch}${infer Rest}`
    ? _Take<Rest, Integer.Decrement<Num>, `${Taken}${Ch}`>
    : Taken
  : Taken;

/**
 * Returns the length of `Str`.
 *
 * @example
 *     type R = String.Len<"abcde">; // => 5
 */
export type Len<Str extends string> = Integer.ToNumber<_Len<Str>>;
export type _Len<Str extends string> = Str extends `${infer _Ch}${infer Rest}`
  ? Integer.Increment<_Len<Rest>>
  : Integer.Zero;

export type Substr<
  Str extends string,
  Idx extends number,
  Len extends number
> = Take<Chomp<Str, Idx>, Len>;

/**
 * Returns a list of characters in `Str`.
 *
 * @example
 *     type R = String.Chars<"abc">; // => ["a", "b", "c"]
 */
export type Chars<Str extends string> = Str extends `${infer Ch}${infer Rest}`
  ? [Ch, ...Chars<Rest>]
  : [];
