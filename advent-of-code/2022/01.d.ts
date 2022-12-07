import { Array, Integer, String } from "index";

export {};

export type PartA<Input extends string> = Integer.ToNumber<
  Array._Max<GetInputSums<Input>>
>;

export type PartB<Input extends string> = Integer.ToNumber<
  Array._Sum<Top<GetInputSums<Input>, Integer.Three>>
>;

export type PartBSort<Input extends string> = Integer.ToNumber<
  Array._Sum<
    Array.Slice<Array.ReverseMap<Array._MergeSort<GetInputSums<Input>>>, 0, 3>
  >
>;

type GetInputSums<
  Input extends string,
  Groups extends string[] = String.Split<Input, "\n\n">
> = {
  [K in keyof Groups]: K extends `${number}`
    ? Array._Sum<String._ParseInts<Groups[K]>>
    : never;
};

type Top<
  A extends Integer.Number[],
  N extends Integer.Number,
  Res extends Integer.Number[] = [],
  MI extends string = `${Integer.ToNumber<Array._MaxIndex<A>>}`
> = N extends Integer.Zero
  ? Res
  : Top<
      { [K in keyof A]: K extends MI ? Integer.Zero : A[K] },
      Integer.Decrement<N>,
      MI extends keyof A ? [...Res, A[MI]] : Res
    >;
