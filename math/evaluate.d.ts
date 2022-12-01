import * as Integer from "../primitives/integer";

export {};

type Operators = Operators1 | Operators2;
type Operators1 = "+" | "-";
type Operators2 = "*" | "/" | "%";

/**
 * Evaluates a mathematical equation. Allowed operators are add (`+`),
 * subtract (`-`), multiply (`*`), divide (`/`) and modulo (`%`).
 * Parentheses and whitespace are also allowed.
 *
 * Note that negative integers are not yet supported so if an intermediate
 * step ever evaluates to a negative number the result will be {@link NaN}.
 *
 * @example
 *     type R = Math.Evaluate<"12 + 34 - 5*(6*7 % 8) + 9">; // => 45
 */
export type Evaluate<Expression extends string> =
  _Evaluate<Expression> extends `${infer N extends number}` ? N : Integer.NaN;

export type _Evaluate<
  Expr extends string,
  OutputStack extends string[] = [],
  OperatorStack extends string[] = [],
  NumToken extends string = ""
> = Expr extends `${infer Ch}${infer Rest}`
  ? Ch extends Integer.Digit
    ? _Evaluate<
        Rest,
        [
          Integer.FromDecimal<`${NumToken}${Ch}`>,
          ...(NumToken extends ""
            ? OutputStack
            : OutputStack extends [string, ...infer OutputStackRest]
            ? OutputStackRest
            : OutputStack)
        ],
        OperatorStack,
        `${NumToken}${Ch}`
      >
    : Ch extends Operators
    ? OperatorStack extends [infer Op, ...infer OperatorStackRest]
      ? _IsGreaterOrEqualPrecedence<
          Op extends string ? Op : "",
          Ch
        > extends true
        ? _ApplyOpFromStack<Op, Expr, OutputStack, OperatorStackRest>
        : _Evaluate<Rest, OutputStack, [Ch, ...OperatorStack]>
      : _Evaluate<Rest, OutputStack, [Ch, ...OperatorStack]>
    : Ch extends "("
    ? _Evaluate<Rest, OutputStack, [Ch, ...OperatorStack]>
    : Ch extends ")"
    ? OperatorStack extends [infer Op, ...infer OperatorStackRest]
      ? Op extends "("
        ? _Evaluate<
            Rest,
            OutputStack,
            OperatorStackRest extends string[] ? OperatorStackRest : []
          >
        : _ApplyOpFromStack<Op, Expr, OutputStack, OperatorStackRest>
      : Integer.NaN
    : _Evaluate<Rest, OutputStack, OperatorStack>
  : OperatorStack extends [infer Op, ...infer OperatorStackRest]
  ? _ApplyOpFromStack<Op, Expr, OutputStack, OperatorStackRest>
  : OutputStack extends [infer N]
  ? N extends Integer.Number
    ? Integer.ToDecimal<N>
    : Integer.NaN
  : Integer.NaN;

type _ApplyOpFromStack<
  Op,
  Expr extends string,
  OutputStack,
  OperatorStack
> = OutputStack extends [infer B, infer A, ...infer OutputStackRest]
  ? _Evaluate<
      Expr,
      [
        _ApplyOp<
          Op extends Operators ? Op : never,
          A extends string ? A : never,
          B extends string ? B : never
        >,
        ...(OutputStackRest extends string[] ? OutputStackRest : [])
      ],
      OperatorStack extends string[] ? OperatorStack : []
    >
  : Integer.NaN;

type _IsGreaterOrEqualPrecedence<
  A extends string,
  B extends string
> = A extends Operators
  ? B extends Operators
    ? A extends Operators2
      ? true
      : B extends Operators1
      ? true
      : false
    : false
  : false;

type _ApplyOp<
  Op extends Operators,
  A extends string,
  B extends string
> = A extends Integer.Number
  ? B extends Integer.Number
    ? Op extends "+"
      ? Integer.Add<A, B>
      : Op extends "-"
      ? Integer.Subtract<A, B>
      : Op extends "*"
      ? Integer.Multiply<A, B>
      : Op extends "/"
      ? Integer.Divide<A, B>
      : Op extends "%"
      ? Integer.Modulo<A, B>
      : Integer.NaN
    : Integer.NaN
  : Integer.NaN;
