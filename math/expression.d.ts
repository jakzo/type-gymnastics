import {
  Add,
  Digit,
  Divide,
  FromDecimal,
  Modulo,
  Multiply,
  NaN,
  Number,
  Subtract,
  ToDecimal,
} from "../primitives/integer";

export {};

type Operators = Operators1 | Operators2;
type Operators1 = "+" | "-";
type Operators2 = "*" | "/" | "%";

export type EvaluateMathExpression<Expr extends string> = _Eval<Expr>;
type _Eval<
  Expr extends string,
  OutputStack extends string[] = [],
  OperatorStack extends string[] = [],
  NumToken extends string = ""
> = Expr extends `${infer Ch}${infer Rest}`
  ? Ch extends Digit
    ? _Eval<
        Rest,
        [
          FromDecimal<`${NumToken}${Ch}`>,
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
        : _Eval<Rest, OutputStack, [Ch, ...OperatorStack]>
      : _Eval<Rest, OutputStack, [Ch, ...OperatorStack]>
    : Ch extends "("
    ? _Eval<Rest, OutputStack, [Ch, ...OperatorStack]>
    : Ch extends ")"
    ? OperatorStack extends [infer Op, ...infer OperatorStackRest]
      ? Op extends "("
        ? _Eval<
            Rest,
            OutputStack,
            OperatorStackRest extends string[] ? OperatorStackRest : []
          >
        : _ApplyOpFromStack<Op, Expr, OutputStack, OperatorStackRest>
      : NaN
    : _Eval<Rest, OutputStack, OperatorStack>
  : OperatorStack extends [infer Op, ...infer OperatorStackRest]
  ? _ApplyOpFromStack<Op, Expr, OutputStack, OperatorStackRest>
  : OutputStack extends [infer N]
  ? N extends Number
    ? ToDecimal<N>
    : NaN
  : NaN;
type _ApplyOpFromStack<
  Op,
  Expr extends string,
  OutputStack,
  OperatorStack
> = OutputStack extends [infer B, infer A, ...infer OutputStackRest]
  ? _Eval<
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
  : NaN;
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
> = A extends Number
  ? B extends Number
    ? Op extends "+"
      ? Add<A, B>
      : Op extends "-"
      ? Subtract<A, B>
      : Op extends "*"
      ? Multiply<A, B>
      : Op extends "/"
      ? Divide<A, B>
      : Op extends "%"
      ? Modulo<A, B>
      : NaN
    : NaN
  : NaN;
