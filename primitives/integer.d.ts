import { Reverse } from "./string";

export {};

export type Number = Integer | NaN;
/** Binary integer in BIG ENDIAN (most significant bit comes last, not like
 * the JS binary notation and most other representitations where it comes first). */
export type Integer = `0b${string}`;
export type NaN = `NaN`;
export type Zero = "0b";
export type One = "0b1";
type Ten = "0b0101";

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

export type IsLessThanOrEqual<A extends Number, B extends Number> = A extends B
  ? true
  : IsLessThan<A, B>;

export type IsGreaterThan<A extends Number, B extends Number> = A extends B
  ? false
  : IsLessThan<A, B> extends true
  ? false
  : true;

export type IsGreaterThanOrEqual<
  A extends Number,
  B extends Number
> = A extends B ? true : IsLessThan<A, B> extends true ? false : true;

type _MapChar<
  S extends string,
  NewChar extends string
> = S extends `${infer _Char}${infer Rest}`
  ? `${NewChar}${_MapChar<Rest, NewChar>}`
  : "";

type _ToIntOrNaN<DigitsOrNaN extends string> = DigitsOrNaN extends NaN
  ? DigitsOrNaN
  : `0b${_StripTrailingZeroes<DigitsOrNaN>}`;
type _ToIntsOrNaN<DigitsOrNaNTuple extends Record<string | number, string>> = {
  [K in keyof DigitsOrNaNTuple]: DigitsOrNaNTuple[K] extends string
    ? _ToIntOrNaN<DigitsOrNaNTuple[K]>
    : DigitsOrNaNTuple[K];
};
type _StripTrailingZeroes<Digits extends string> =
  Digits extends `${infer Rest}0` ? _StripTrailingZeroes<Rest> : Digits;

export type Not<N extends Number> = N extends `0b${infer Digits}`
  ? _ToIntOrNaN<_Not<Digits>>
  : NaN;
type _Not<Digits extends string> = Digits extends `${infer Digit}${infer Rest}`
  ? `${Digit extends "1" ? 0 : 1}${_Not<Rest>}`
  : "";

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

export type ShiftLeft<
  N extends Number,
  X extends Number
> = N extends `0b${infer Digits}` ? _ShiftLeft<Digits, X> : NaN;
type _ShiftLeft<Digits extends string, X extends Number> = X extends Zero
  ? Digits
  : _ShiftLeft<`0${Digits}`, Decrement<X>>;

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

export type Increment<N extends Number> = Add<N, "0b1">;

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

export type Decrement<N extends Number> = Subtract<N, "0b1">;

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
interface _DivModResult {
  quotient: Number;
  remainder: Number;
}

// @ts-expect-error - TS says it's "excessively deep" for some reason...
export type Divide<Dividend extends Number, Divisor extends Number> = DivMod<
  Dividend,
  Divisor
>["quotient"];

export type Modulo<Dividend extends Number, Divisor extends Number> = DivMod<
  Dividend,
  Divisor
>["remainder"];

export type FromBase<
  N extends string,
  Base extends Number
> = Base extends Integer ? _FromBase<Reverse<N>, Base, "0b1"> : NaN;
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
  Result extends _DivModResult = DivMod<N, Base>,
  Digit extends string = _ToDigit<Result["remainder"]>
> = N extends Zero
  ? ""
  : // @ts-expect-error - excessively deep in v4.6
    `${_ToBase<
      Result["quotient"] extends Integer ? Result["quotient"] : Zero,
      Base
    >}${Digit}`;

export type FromDecimal<N extends string | number> = FromBase<`${N}`, Ten>;
export type ToDecimal<N extends Number> = ToBase<N, Ten>;

// Generated with:
// a=[];for(i=0;i<36;i++)a.push(`"${i.toString(36).toUpperCase()}": "0b${[...i.toString(2)].reverse().join('')}",`);console.log(a.join('\n'))
type _FromDigit<Digit extends string> = Digit extends keyof _DigitToNum
  ? _DigitToNum[Digit]
  : NaN;
interface _DigitToNum {
  "0": "0b0";
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

export type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
