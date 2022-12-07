import { Integer, String } from "index";

export {};

export type PartA<Input extends string> = Integer.ToNumber<
  Traverse<
    String.Split<Input, "\n">,
    Integer.FromDecimal<100000>
  >["SumBelowThreshold"]
>;

export type PartB<
  Input extends string,
  Lines extends string[] = String.Split<Input, "\n">,
  TotalUsedSpace extends Integer.Number = Traverse<
    Lines,
    Integer.Zero
  >["TotalUsedSpace"]
> = Integer.ToNumber<
  Traverse<
    Lines,
    Integer.Subtract<
      RequiredSpace,
      Integer.Subtract<TotalSpace, TotalUsedSpace>
    >
  >["SmallestAboveThreshold"]
>;

type TotalSpace = Integer.FromDecimal<70000000>;
type RequiredSpace = Integer.FromDecimal<30000000>;

type Traverse<
  Lines extends string[],
  Threshold extends Integer.Number,
  Stack extends Integer.Number[] = [],
  SumBelowThreshold extends Integer.Number = Integer.Zero,
  SmallestAboveThreshold extends Integer.Number = TotalSpace
> = Lines extends [
  infer Line extends string,
  ...infer RestLines extends string[]
]
  ? Traverse<
      RestLines,
      Threshold,
      Line extends "$ cd .."
        ? Stack extends [
            Integer.Number,
            Integer.Number,
            ...infer RestStack extends Integer.Number[]
          ]
          ? [Integer.Add<Stack[0], Stack[1]>, ...RestStack]
          : never
        : Line extends `$ cd ${string}`
        ? [Integer.Zero, ...Stack]
        : Line extends `${Integer.Digit}${string}`
        ? Stack extends [
            infer X extends Integer.Number,
            ...infer RestStack extends Integer.Number[]
          ]
          ? [Integer.Add<X, String._ParseInts<Line>[0]>, ...RestStack]
          : never
        : Stack,
      Line extends "$ cd .."
        ? UpdateSumBelowThreshold<Threshold, Stack, SumBelowThreshold>
        : SumBelowThreshold,
      Line extends "$ cd .."
        ? UpdateSmallestAboveThreshold<Threshold, Stack, SmallestAboveThreshold>
        : SmallestAboveThreshold
    >
  : Stack extends [
      infer X extends Integer.Number,
      infer Y extends Integer.Number,
      ...infer StackRest extends Integer.Number[]
    ]
  ? Traverse<
      [],
      Threshold,
      [Integer.Add<X, Y>, ...StackRest],
      UpdateSumBelowThreshold<Threshold, Stack, SumBelowThreshold>,
      UpdateSmallestAboveThreshold<Threshold, Stack, SmallestAboveThreshold>
    >
  : NewResult<{
      SumBelowThreshold: SumBelowThreshold;
      SmallestAboveThreshold: SmallestAboveThreshold;
      TotalUsedSpace: Stack[0] extends Integer.Number ? Stack[0] : never;
    }>;

type UpdateSumBelowThreshold<
  Threshold extends Integer.Number,
  Stack extends Integer.Number[],
  SumBelowThreshold extends Integer.Number
> = Integer.IsLessThanOrEqual<Stack[0], Threshold> extends true
  ? Integer.Add<SumBelowThreshold, Stack[0]>
  : SumBelowThreshold;

type UpdateSmallestAboveThreshold<
  Threshold extends Integer.Number,
  Stack extends Integer.Number[],
  SmallestAboveThreshold extends Integer.Number
> = true extends Integer.IsGreaterThanOrEqual<Stack[0], Threshold> &
  Integer.IsLessThan<Stack[0], SmallestAboveThreshold>
  ? Stack[0]
  : SmallestAboveThreshold;

interface IResult {
  SumBelowThreshold: Integer.Number;
  SmallestAboveThreshold: Integer.Number;
  TotalUsedSpace: Integer.Number;
}
type NewResult<T extends IResult> = T;
