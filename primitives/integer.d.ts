/**
 * @fileoverview
 * A binary big-integer implementation. These are strings of the format `"0b${1 | 0}..."`.
 * Each character is a bit. Due to TypeScript recursion limitations, you may encounter
 * issues using integers larger than 32 bits in size.
 */

import * as String from "./string";

export {};

type _MapChar<
  S extends string,
  NewChar extends string
> = S extends `${infer _Char}${infer Rest}`
  ? `${NewChar}${_MapChar<Rest, NewChar>}`
  : "";

type _ToIntOrNaN<DigitsOrNaN extends string> = DigitsOrNaN extends NaN
  ? DigitsOrNaN
  : `0b${_StripTrailingZeroes<DigitsOrNaN>}`;

type _StripTrailingZeroes<Digits extends string> =
  Digits extends `${infer Rest}0` ? _StripTrailingZeroes<Rest> : Digits;

/**
 * A binary integer, including {@link NaN}. It is in **big endian** format (most
 * significant bit comes last, not like the JS binary notation and most other
 * representitations where it comes first).
 *
 * This is binary big-integer implementation. These are strings of the format `"0b${1 | 0}..."`.
 * Each character is a bit. Due to TypeScript recursion limitations, you may encounter
 * issues using integers larger than 32 bits in size.
 *
 * @example
 *     const n: Integer.Number = "0b01101"; // 22 in decimal
 */
export type Number = Integer | NaN;

/**
 * A concrete integer (not {@link NaN}).
 *
 * @example
 *     const n: Integer.Number = "0b01101"; // 22 in decimal
 */
export type Integer = `0b${string}`;

/**
 * A non-zero concrete integer (not {@link NaN}).
 *
 * @example
 *     const n: Integer.NonZero = "0b01101"; // 22 in decimal
 */
export type NonZero = `0b${"0" | "1"}${string}`;

/**
 * An even non-zero integer.
 *
 * @example
 *     const n: Integer.Even = "0b01101"; // 22 in decimal
 */
export type Even = `0b0${string}`;

/**
 * An odd non-zero integer.
 *
 * @example
 *     const n: Integer.Odd = "0b11101"; // 23 in decimal
 */
export type Odd = `0b1${string}`;

/**
 * Not-a-number. When an operation that returns a number is not defined (eg.
 * dividing by zero) it will return this.
 */
export type NaN = `NaN`;

/** The number 0 as an {@link Integer}. */
export type Zero = _DigitToNum[0];
/** The number 1 as an {@link Integer}. */
export type One = _DigitToNum[1];
/** The number 2 as an {@link Integer}. */
export type Two = _DigitToNum[2];
/** The number 3 as an {@link Integer}. */
export type Three = _DigitToNum[3];
/** The number 4 as an {@link Integer}. */
export type Four = _DigitToNum[4];
/** The number 5 as an {@link Integer}. */
export type Five = _DigitToNum[5];
/** The number 6 as an {@link Integer}. */
export type Six = _DigitToNum[6];
/** The number 7 as an {@link Integer}. */
export type Seven = _DigitToNum[7];
/** The number 8 as an {@link Integer}. */
export type Eight = _DigitToNum[8];
/** The number 9 as an {@link Integer}. */
export type Nine = _DigitToNum[9];
/** The number 10 as an {@link Integer}. */
export type Ten = _DigitToNum["A"];

/** Any base-10 digit character. */
export type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

/**
 * Returns `true` if `A` is less than `B`, else `false`.
 *
 * @example
 *     type R = Integer.IsLessThan<FromDecimal<5>, FromDecimal<6>>; // => true
 *     type R = Integer.IsLessThan<FromDecimal<7>, FromDecimal<6>>; // => false
 *     type R = Integer.IsLessThan<FromDecimal<6>, FromDecimal<6>>; // => false
 */
export type IsLessThan<A extends Number, B extends Number> = A extends B
  ? false
  : A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _IsLessThan<ADigits, BDigits>
    : false
  : false;

type _IsLessThan<
  A extends string,
  B extends string,
  IsLesser = false
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? _IsLessThan<
        ARest,
        BRest,
        ADigit extends BDigit ? IsLesser : ADigit extends "1" ? false : true
      >
    : false
  : B extends `${infer _BDigit}${infer _BRest}`
  ? true
  : IsLesser;

/**
 * Returns `true` if `A` is less than or equal to `B`, else `false`.
 *
 * @example
 *     type R = Integer.IsLessThanOrEqual<FromDecimal<5>, FromDecimal<6>>; // => true
 *     type R = Integer.IsLessThanOrEqual<FromDecimal<7>, FromDecimal<6>>; // => false
 *     type R = Integer.IsLessThanOrEqual<FromDecimal<6>, FromDecimal<6>>; // => true
 */
export type IsLessThanOrEqual<A extends Number, B extends Number> = A extends B
  ? true
  : IsLessThan<A, B>;

/**
 * Returns `true` if `A` is greater than `B`, else `false`.
 *
 * @example
 *     type R = Integer.IsGreaterThan<FromDecimal<5>, FromDecimal<6>>; // => false
 *     type R = Integer.IsGreaterThan<FromDecimal<7>, FromDecimal<6>>; // => true
 *     type R = Integer.IsGreaterThan<FromDecimal<6>, FromDecimal<6>>; // => false
 */
export type IsGreaterThan<A extends Number, B extends Number> = A extends B
  ? false
  : IsLessThan<A, B> extends true
  ? false
  : true;

/**
 * Returns `true` if `A` is greater than or equal to `B`, else `false`.
 *
 * @example
 *     type R = Integer.IsGreaterThanOrEqual<FromDecimal<5>, FromDecimal<6>>; // => false
 *     type R = Integer.IsGreaterThanOrEqual<FromDecimal<7>, FromDecimal<6>>; // => true
 *     type R = Integer.IsGreaterThanOrEqual<FromDecimal<6>, FromDecimal<6>>; // => true
 */
export type IsGreaterThanOrEqual<
  A extends Number,
  B extends Number
> = A extends B ? true : IsLessThan<A, B> extends true ? false : true;

/**
 * Returns bitwise NOT of `N` (all bits flipped).
 *
 * Note that this **does not** return one or two's complement (ie. `-N-1`)
 * like most other languages because negative numbers are not yet supported.
 * This means that applying `Not` twice will not produce the original number.
 *
 * @example
 *     type R = Integer.Not<"0b01101">; // => "0b1001"
 */
export type Not<N extends Number> = N extends `0b${infer Digits}`
  ? _ToIntOrNaN<_Not<Digits>>
  : NaN;

type _Not<Digits extends string> = Digits extends `${infer Digit}${infer Rest}`
  ? `${Digit extends "1" ? 0 : 1}${_Not<Rest>}`
  : "";

/**
 * Returns bitwise AND of `A` and `B`.
 *
 * @example
 *     type R = Integer.And<"0b01101", "0b11001">; // => "0b01001"
 */
export type And<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_And<ADigits, BDigits>>
    : NaN
  : NaN;

type _And<
  A extends string,
  B extends string
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? `${`${ADigit}${BDigit}` extends "11" ? 1 : 0}${_And<ARest, BRest>}`
    : _MapChar<A, "0">
  : _MapChar<B, "0">;

/**
 * Returns bitwise NAND (1 if `A` and `B` are not both 1) of `A` and `B`.
 *
 * @example
 *     type R = Integer.Nand<"0b01101", "0b11001">; // => "0b1011"
 */
export type Nand<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Nand<ADigits, BDigits>>
    : NaN
  : NaN;

type _Nand<
  A extends string,
  B extends string
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? `${`${ADigit}${BDigit}` extends "11" ? 0 : 1}${_Nand<ARest, BRest>}`
    : _MapChar<A, "1">
  : _MapChar<B, "1">;

/**
 * Returns bitwise OR of `A` and `B`.
 *
 * @example
 *     type R = Integer.Or<"0b01101", "0b11001">; // => "0b11101"
 */
export type Or<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Or<ADigits, BDigits>>
    : NaN
  : NaN;

type _Or<
  A extends string,
  B extends string
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? `${ADigit extends "1" ? 1 : BDigit extends "1" ? 1 : 0}${_Or<
        ARest,
        BRest
      >}`
    : A
  : B;

/**
 * Returns bitwise XOR of `A` and `B`.
 *
 * @example
 *     type R = Integer.Xor<"0b01101", "0b11001">; // => "0b01001"
 */
export type Xor<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Xor<ADigits, BDigits>>
    : NaN
  : NaN;

type _Xor<
  A extends string,
  B extends string
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? `${ADigit extends BDigit ? 0 : 1}${_Xor<ARest, BRest>}`
    : A
  : B;

/**
 * Returns `N` bitwise shifted `X` times to the left.
 *
 * Note that despite integers being notated in big endian, this is named as
 * if they are in little endian, meaning it makes numbers larger.
 *
 * @example
 *     type R = Integer.ShiftLeft<"0b1101", Integer.FromDecimal<2>>; // => "0b001101"
 */
export type ShiftLeft<
  N extends Number,
  X extends Number
> = N extends `0b${infer Digits}` ? `0b${_ShiftLeft<Digits, X>}` : NaN;

type _ShiftLeft<Digits extends string, X extends Number> = IsLessThanOrEqual<
  X,
  Zero
> extends true
  ? Digits
  : _ShiftLeft<`0${Digits}`, Decrement<X>>;

/**
 * Returns `N` bitwise shifted `X` times to the right.
 *
 * Note that despite integers being notated in big endian, this is named as
 * if they are in little endian, meaning it makes numbers smaller.
 *
 * @example
 *     type R = Integer.ShiftRight<"0b1101", Integer.FromDecimal<2>>; // => "0b01"
 */
export type ShiftRight<
  N extends Number,
  X extends Number
> = N extends `0b${infer Digits}` ? `0b${_ShiftRight<Digits, X>}` : NaN;

type _ShiftRight<Digits extends string, X extends Number> = IsLessThanOrEqual<
  X,
  Zero
> extends true
  ? Digits
  : Digits extends `${infer _Digit}${infer Rest}`
  ? _ShiftRight<Rest, Decrement<X>>
  : "";

/**
 * Returns the sum of `A` and `B`.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Add<Integer.FromDecimal<23>, Integer.FromDecimal<45>>
 *     >; // => "68"
 */
export type Add<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Add<ADigits, BDigits>>
    : NaN
  : NaN;

type _Add<
  A extends string,
  B extends string,
  Carry extends string = "0"
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? `${_Xor<_Xor<ADigit, BDigit>, Carry>}${_Add<
        ARest,
        BRest,
        _Or<_And<_Xor<ADigit, BDigit>, Carry>, _And<ADigit, BDigit>>
      >}`
    : _Add<A, _MapChar<A, "0">, Carry>
  : B extends `${infer _BDigit}${infer _BRest}`
  ? _Add<_MapChar<B, "0">, B, Carry>
  : Carry extends "1"
  ? "1"
  : "";

/**
 * Returns `N+1`.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Increment<Integer.FromDecimal<5>>
 *     >; // => "6"
 */
export type Increment<N extends Number> = Add<N, One>;

/**
 * Returns `A-B`.
 *
 * Note that negative integers are not yet supported so if the result would be
 * negative it returns {@link NaN} instead.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Subtract<Integer.FromDecimal<45>, Integer.FromDecimal<23>>
 *     >; // => "22"
 *     type R = Integer.ToDecimal<
 *       Integer.Subtract<Integer.FromDecimal<2>, Integer.FromDecimal<3>>
 *     >; // => "NaN"
 */
export type Subtract<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Subtract<ADigits, BDigits>>
    : NaN
  : NaN;

type _Subtract<
  A extends string,
  B extends string,
  Carry extends string = "0",
  Result extends string = ""
> = A extends `${infer ADigit}${infer ARest}`
  ? B extends `${infer BDigit}${infer BRest}`
    ? _Subtract<
        ARest,
        BRest,
        _Or<_And<_Not<ADigit>, _Xor<BDigit, Carry>>, _And<BDigit, Carry>>,
        `${Result}${_Xor<_Xor<ADigit, BDigit>, Carry>}`
      >
    : Carry extends "1"
    ? _Subtract<
        ARest,
        B,
        _Xor<ADigit, Carry>,
        `${Result}${_Xor<ADigit, Carry>}`
      >
    : `${Result}${A}`
  : B extends `${infer _BDigit}${infer _BRest}`
  ? NaN
  : Result;

/**
 * Returns `N-1`.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Decrement<Integer.FromDecimal<5>>
 *     >; // => "4"
 */
export type Decrement<N extends Number> = Subtract<N, One>;

/**
 * Returns the product of `A` and `B`.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Multiply<Integer.FromDecimal<3>, Integer.FromDecimal<7>>
 *     >; // => "21"
 */
export type Multiply<
  A extends Number,
  B extends Number
> = A extends `0b${infer ADigits}`
  ? B extends `0b${infer BDigits}`
    ? _ToIntOrNaN<_Multiply<ADigits, BDigits>>
    : NaN
  : NaN;

type _Multiply<
  A extends string,
  B extends string,
  Result extends string = ""
> = B extends `${infer BDigit}${infer BRest}`
  ? _Multiply<`0${A}`, BRest, BDigit extends "1" ? _Add<Result, A> : Result>
  : Result;

/**
 * Returns both the `quotient` and `remainder` when dividing `Dividend` by
 * `Divisor`.
 *
 * The division algorithm returns both of these, so prefer this method
 * over {@link Divide} and {@link Modulo} if you need both for efficiency.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.DivMod<Integer.FromDecimal<14>, Integer.FromDecimal<3>>
 *     >; // => { quotient: "4"; remainder: "2" }
 */
export type DivMod<
  Dividend extends Number,
  Divisor extends Number
> = Divisor extends Zero
  ? { quotient: NaN; remainder: NaN }
  : Dividend extends `0b${infer ADigits}`
  ? Divisor extends `0b${infer BDigits}`
    ? _DivMod<ADigits, BDigits>
    : { quotient: NaN; remainder: NaN }
  : { quotient: NaN; remainder: NaN };

type _DivMod<
  A extends string,
  B extends string,
  P extends string = "1",
  B2 extends string = `0${B}`,
  P2 extends string = `0${P}`
> = (B extends A ? true : _IsLessThan<B, A>) extends true
  ? _DivMod<A, B2, P2>
  : _DivMod2<A, B2, P2>;
type _DivMod2<
  A extends string,
  B extends string,
  P extends string,
  Q extends string = ""
> = P extends `0${infer PRest}`
  ? B extends `0${infer BRest}`
    ? (BRest extends A ? true : _IsLessThan<BRest, A>) extends true
      ? _DivMod2<
          _StripTrailingZeroes<_Subtract<A, BRest>>,
          BRest,
          PRest,
          `1${Q}`
        >
      : _DivMod2<A, BRest, PRest, `0${Q}`>
    : { quotient: NaN; remainder: NaN }
  : { quotient: _ToIntOrNaN<Q>; remainder: _ToIntOrNaN<A> };

/** The quotient and remainder returned by {@link DivMod}. */
export interface DivModResult<
  Quotient extends Number,
  Remainder extends Number
> {
  quotient: Quotient;
  remainder: Remainder;
}

/**
 * Divides `Dividend` by `Divisor` and returns the result rounded down.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Divide<Integer.FromDecimal<14>, Integer.FromDecimal<3>>
 *     >; // => "4"
 */
// @ts-expect-error - TS says it's "excessively deep" for some reason...
export type Divide<Dividend extends Number, Divisor extends Number> = DivMod<
  Dividend,
  Divisor
>["quotient"];

/**
 * Returns the remainder of dividing `Dividend` by `Divisor`.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.Modulo<Integer.FromDecimal<14>, Integer.FromDecimal<3>>
 *     >; // => "2"
 */
export type Modulo<Dividend extends Number, Divisor extends Number> = DivMod<
  Dividend,
  Divisor
>["remainder"];

/**
 * Converts a string containing a number in the specified base to an integer.
 * Note that letter digits (like A, B, C, etc.) **must be capitalized**.
 *
 * @example
 *     type R = Integer.ToDecimal<
 *       Integer.FromBase<"9F", Integer.FromDecimal<16>>
 *     >; // => "159"
 */
export type FromBase<
  N extends string,
  Base extends Number
> = Base extends Integer ? _FromBase<String.Reverse<N>, Base, "0b1"> : NaN;

type _FromBase<
  Num extends string,
  Base extends Integer,
  Power extends Integer
> = Num extends `${infer Digit}${infer Rest}`
  ? Add<
      Multiply<_FromDigit<Digit>, Power>,
      _FromBase<Rest, Base, Multiply<Power, Base>>
    >
  : "0b";

/**
 * Converts an integer to a string in the specified base. Letter digits
 * will be capitalized.
 *
 * @example
 *     type R = Integer.ToBase<Integer.FromDecimal<159>, Integer.FromDecimal<16>>; // => "9F"
 */
export type ToBase<N extends Number, Base extends Number> = N extends Integer
  ? Base extends Integer
    ? N extends Zero
      ? _ToDigit<N>
      : // @ts-expect-error - excessively deep
        _ToBase<N, Base>
    : NaN
  : NaN;

type _ToBase<
  N extends Integer,
  Base extends Integer,
  Result extends DivModResult<Number, Number> = DivMod<N, Base>,
  Digit extends string = _ToDigit<Result["remainder"]>
> = N extends Zero
  ? ""
  : // @ts-expect-error - excessively deep in v4.6
    `${_ToBase<
      Result["quotient"] extends Integer ? Result["quotient"] : Zero,
      Base
    >}${Digit}`;

/**
 * Converts a base-10 string or number into an {@link Integer}.
 *
 * @example
 *     type R = Integer.FromDecimal<"6">; // => "0b011"
 */
export type FromDecimal<N extends string | number> = FromBase<`${N}`, Ten>;

/**
 * Converts an {@link Integer} to a base-10 string.
 *
 * @example
 *     type R = Integer.ToDecimal<"0b011">; // => "6"
 */
export type ToDecimal<N extends Number> = ToBase<N, Ten>;

/**
 * Converts an {@link Integer} to a number.
 *
 * @example
 *     type R = Integer.ToNumber<"0b011">; // => 6
 */
export type ToNumber<N extends Number> = ToBase<
  N,
  Ten
> extends `${infer N extends number}`
  ? N
  : number;

// Generated with:
// a=[];for(i=0;i<36;i++)a.push(`"${i.toString(36).toUpperCase()}": "0b${[...i.toString(2)].reverse().join('')}",`);console.log(a.join('\n'))
type _FromDigit<Digit extends string> = Digit extends keyof _DigitToNum
  ? _DigitToNum[Digit]
  : NaN;
interface _DigitToNum {
  "0": "0b";
  "1": "0b1";
  "2": "0b01";
  "3": "0b11";
  "4": "0b001";
  "5": "0b101";
  "6": "0b011";
  "7": "0b111";
  "8": "0b0001";
  "9": "0b1001";
  A: "0b0101";
  B: "0b1101";
  C: "0b0011";
  D: "0b1011";
  E: "0b0111";
  F: "0b1111";
  G: "0b00001";
  H: "0b10001";
  I: "0b01001";
  J: "0b11001";
  K: "0b00101";
  L: "0b10101";
  M: "0b01101";
  N: "0b11101";
  O: "0b00011";
  P: "0b10011";
  Q: "0b01011";
  R: "0b11011";
  S: "0b00111";
  T: "0b10111";
  U: "0b01111";
  V: "0b11111";
  W: "0b000001";
  X: "0b100001";
  Y: "0b010001";
  Z: "0b110001";
}
type _ToDigit<Num extends Number> = Num extends keyof _NumToDigit
  ? _NumToDigit[Num]
  : NaN;
interface _NumToDigit {
  "0b": "0";
  "0b1": "1";
  "0b01": "2";
  "0b11": "3";
  "0b001": "4";
  "0b101": "5";
  "0b011": "6";
  "0b111": "7";
  "0b0001": "8";
  "0b1001": "9";
  "0b0101": "A";
  "0b1101": "B";
  "0b0011": "C";
  "0b1011": "D";
  "0b0111": "E";
  "0b1111": "F";
  "0b00001": "G";
  "0b10001": "H";
  "0b01001": "I";
  "0b11001": "J";
  "0b00101": "K";
  "0b10101": "L";
  "0b01101": "M";
  "0b11101": "N";
  "0b00011": "O";
  "0b10011": "P";
  "0b01011": "Q";
  "0b11011": "R";
  "0b00111": "S";
  "0b10111": "T";
  "0b01111": "U";
  "0b11111": "V";
  "0b000001": "W";
  "0b100001": "X";
  "0b010001": "Y";
  "0b110001": "Z";
}
