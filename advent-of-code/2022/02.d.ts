import { Array, Integer } from "index";

export {};

export type PartA<Input extends string[]> = Calculate<Input, LookupA>;
export type PartABig<Input extends string[]> = CalculateBig<Input, LookupA>;
type LookupA = {
  "A X": 4;
  "A Y": 8;
  "A Z": 3;
  "B X": 1;
  "B Y": 5;
  "B Z": 9;
  "C X": 7;
  "C Y": 2;
  "C Z": 6;
};

export type PartB<Input extends string[]> = Calculate<Input, LookupB>;
export type PartBBig<Input extends string[]> = CalculateBig<Input, LookupB>;
type LookupB = {
  "A X": 3;
  "A Y": 4;
  "A Z": 8;
  "B X": 1;
  "B Y": 5;
  "B Z": 9;
  "C X": 2;
  "C Y": 6;
  "C Z": 7;
};

type Calculate<
  Input extends string[],
  LookupTable extends Record<string, number>,
  Points extends Integer.Number[] = GetPoints<Input, LookupTable>
> = Integer.ToNumber<Array._SumBinary<Points>>;

type PartitionSize = Integer.FromDecimal<1500>;
type CalculateBig<
  Input extends string[],
  LookupTable extends Record<string, number>,
  Points extends Integer.Number[] = GetPoints<Input, LookupTable>,
  Len extends Integer.Number = Integer.FromDecimal<Input["length"]>,
  PartitionedSum extends Integer.Number = Integer.Add<
    Array._SumBinary<Points, Integer.Zero, PartitionSize>,
    Array._SumBinary<
      Points,
      PartitionSize,
      Integer.Subtract<Len, PartitionSize>
    >
  >
> = Integer.ToNumber<PartitionedSum>;

type GetPoints<
  Input extends string[],
  LookupTable extends Record<string, number>,
  _Lookup = {
    [K in keyof LookupTable]: LookupTable[K] extends number
      ? Integer.FromDecimal<LookupTable[K]>
      : never;
  }
> = {
  [K in keyof Input]: _Lookup[Input[K] extends keyof _Lookup
    ? Input[K]
    : never] extends infer N extends Integer.Number
    ? N
    : never;
};
