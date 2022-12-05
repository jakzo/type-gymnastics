import { Array, Integer } from "index";

export {};

export type PartA<A extends number[][]> = Array.Max<GetInputSums<A>>;

export type PartB<A extends number[][]> = Array.Sum<Top<GetInputSums<A>, 3>>;

export type PartBSort<A extends number[][]> = Array.Sum<TopSorted<A>>;
type TopSorted<A extends number[][]> = Array.SplitAt<
  GetInputSortedSums<A>,
  3
>[0] extends infer R extends number[]
  ? R
  : never;

type GetInputSums<A extends number[][]> = {
  [K in keyof A]: A[K] extends number[] ? Array.Sum<A[K]> : never;
};

type GetInputSortedSums<A extends number[][]> = Array.Reverse<
  Array.BubbleSort<GetInputSums<A>>
>;

type Top<A extends number[], N extends number> = _Top<
  A,
  Integer.FromDecimal<N>
>;
type _Top<
  A extends number[],
  N extends Integer.Number,
  MI extends string = `${Array.MaxIndex<A>}`
> = N extends Integer.Zero
  ? []
  : // @ts-expect-error
    [
      ...(MI extends keyof A ? [A[MI]] : []),
      ..._Top<{ [K in keyof A]: K extends MI ? 0 : A[K] }, Integer.Decrement<N>>
    ];
