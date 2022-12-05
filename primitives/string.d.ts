/** @fileoverview Utilities for working with strings. */

import * as Array from "./array";
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

/**
 * Returns a substring of `Str`.
 *
 * @example
 *     type R = String.Substr<"abcdef", 2, 3>; // => "cde"
 */
export type Substr<
  Str extends string,
  Idx extends number,
  Len extends number
> = Take<Chomp<Str, Idx>, Len>;
export type _Substr<
  Str extends string,
  Idx extends Integer.Number,
  Len extends Integer.Number
> = _Take<_Chomp<Str, Idx>, Len>;

/**
 * Returns a list of characters in `Str`.
 *
 * @example
 *     type R = String.Chars<"abc">; // => ["a", "b", "c"]
 */
export type Chars<Str extends string> = Str extends `${infer Ch}${infer Rest}`
  ? [Ch, ...Chars<Rest>]
  : [];

/**
 * Parses all distinct decimal integers found in `Str`.
 *
 * @example
 *     type R = String.ParseInts<"1+2.3-4">; // => [1, 2, 3, 4]
 */
export type ParseInts<Str extends string> = Array.MapIntToNum<_ParseInts<Str>>;
export type _ParseInts<
  Str extends string,
  Res extends Integer.Number[] = [],
  Digits extends string = ""
> = 0 extends 1
  ? never
  : Str extends `${infer Ch}${infer Rest}`
  ? Ch extends Integer.Digit
    ? _ParseInts<Rest, Res, `${Digits}${Ch}`>
    : _ParseInts<Rest, _ParseIntsAdd<Res, Digits>, "">
  : _ParseIntsAdd<Res, Digits>;
type _ParseIntsAdd<
  Res extends Integer.Number[],
  Digits extends string
> = Digits extends `${Integer.Digit}${string}`
  ? [...Res, Integer.FromDecimal<Digits>]
  : Res;

/**
 * Splits `Str` into a list of strings by removing `Separator`.
 *
 * @example
 *     type R = String.Split<"a.bc.def", ".">; // => ["a", "bc", "def"]
 */
export type Split<
  Str extends string,
  Separator extends string,
  Res extends string[] = [],
  Acc extends string = ""
> = true extends true
  ? Str extends `${Separator}${infer Rest}`
    ? Split<Rest, Separator, [...Res, Acc]>
    : Str extends `${infer Ch}${infer Rest}`
    ? Split<Rest, Separator, Res, `${Acc}${Ch}`>
    : [...Res, Acc]
  : [];

/**
 * Removes all instances of `Remove` from the start and end of `Str`.
 *
 * `Remove` defaults to any whitespace.
 *
 * @example
 *     type R = String.Trim<" a\n">; // => "a"
 *     type R = String.Trim<"..a..", ".">; // => "a"
 */
export type Trim<
  Str extends string,
  Remove extends string = Whitespace
> = true extends false
  ? never
  : Str extends `${Remove}${infer Rest}`
  ? Trim<Rest, Remove>
  : Str extends `${infer Rest}${Remove}`
  ? Trim<Rest, Remove>
  : Str;

export type Whitespace = " " | "\t" | "\n";

/**
 * Joins all items in `Arr` into a string with `Separator` between them.
 *
 * @example
 *     type R = String.Join<["a", "b", "c"]>; // => "abc"
 *     type R = String.Join<["a", "b", "c"], ".">; // => "a.b.c"
 */
export type Join<
  Arr extends string[],
  Separator extends string = ""
> = Arr extends [infer Item extends string, ...infer Rest extends string[]]
  ? `${Item}${_JoinRest<Rest, Separator>}`
  : "";
type _JoinRest<Arr extends string[], Separator extends string> = 0 extends 1
  ? never
  : Arr extends [infer Item extends string, ...infer Rest extends string[]]
  ? `${Separator}${Item}${_JoinRest<Rest, Separator>}`
  : "";
