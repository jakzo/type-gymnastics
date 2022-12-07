/** @fileoverview Utilities for working with arrays (TypeScript tuples). */

import * as Integer from "./integer";

export {};

/**
 * Creates an array with the specified dimensions and size where
 * each element is filled with the provided value.
 *
 * @example
 *     type R = Array.Create<[3, 2], 1>;
 *     // => [[1, 1, 1], [1, 1, 1]]
 */
export type Create<Dimensions extends number[], FillValue> = _Create<
  MapNumToInt<Dimensions>,
  FillValue
>;

export type _Create<
  Dimensions extends Integer.Number[],
  FillValue
> = Dimensions extends [
  infer Size extends Integer.Number,
  ...infer DimensionsRest extends Integer.Number[]
]
  ? _Create<DimensionsRest, _ArrOfLen<Size, FillValue>>
  : FillValue;

export type _ArrOfLen<
  Len extends Integer.Number,
  FillValue = unknown,
  Acc extends FillValue[] = [FillValue]
> = Len extends Integer.NonZero
  ? [
      ...(Len extends Integer.Odd ? Acc : []),
      ..._ArrOfLen<
        Integer.ShiftRight<Len, Integer.One>,
        FillValue,
        [...Acc, ...Acc]
      >
    ]
  : [];

/**
 * Returns the max integer in an array.
 *
 * @example
 *     type R = Array.Max<[7, 4, 9, 5]>; // => 9
 */
export type Max<A extends number[]> = Integer.ToNumber<_Max<MapNumToInt<A>>>;

export type _Max<
  A extends Integer.Number[],
  M extends Integer.Number = A extends [
    infer N extends Integer.Number,
    ...number[]
  ]
    ? N
    : Integer.NaN
> = A extends [
  infer N extends Integer.Number,
  ...infer Rest extends Integer.Number[]
]
  ? _Max<Rest, Integer.IsGreaterThan<N, M> extends true ? N : M>
  : M;

/**
 * Returns the index of the max integer in an array.
 *
 * @example
 *     type R = Array.MaxIndex<[7, 4, 9, 5]>; // => 2
 */
export type MaxIndex<A extends number[]> = Integer.ToNumber<
  _MaxIndex<MapNumToInt<A>>
>;

export type _MaxIndex<
  A extends Integer.Number[],
  M extends Integer.Number = A extends [
    infer N extends Integer.Number,
    ...number[]
  ]
    ? N
    : Integer.NaN,
  MI extends Integer.Number = A["length"] extends 0
    ? Integer.NaN
    : Integer.Zero,
  I extends Integer.Number = Integer.Zero
> = A extends [
  infer N extends Integer.Number,
  ...infer Rest extends Integer.Number[]
]
  ? Integer.IsGreaterThan<N, M> extends true
    ? _MaxIndex<Rest, N, I, Integer.Increment<I>>
    : _MaxIndex<Rest, M, MI, Integer.Increment<I>>
  : MI;

/**
 * Converts a list of numbers into a list of {@link Integer.Number}s.
 *
 * @example
 *     type R = Array.MapNumToInt<[1, 2, 3]>;
 *     // => ["0b1", "0b01", "0b11"]
 */
export type MapNumToInt<A extends (number | string)[]> = {
  [K in keyof A]: K extends `${number}` ? Integer.FromDecimal<A[K]> : never;
};

/**
 * Converts a list of {@link Integer.Number}s into a list of numbers.
 *
 * @example
 *     type R = Array.MapIntToNum<["0b1", "0b01", "0b11"]>;
 *     // => [1, 2, 3]
 */
export type MapIntToNum<A extends Integer.Number[]> = {
  [K in keyof A]: K extends `${number}` ? Integer.ToNumber<A[K]> : never;
};

/**
 * Adds all numbers in a list together and returns the result.
 *
 * - Limits: `Arr` = 2000
 * - Time: `O(n)`
 * - Space: `O(n log n)`
 *
 * @example
 *     type R = Array.Sum<[1, 2, 3]>; // => 6
 */
export type Sum<Arr extends number[]> = Integer.ToNumber<
  _Sum<MapNumToInt<Arr>>
>;

export type _Sum<
  Arr extends Integer.Number[],
  Idx extends Integer.Number = Integer.Zero,
  Len extends Integer.Number = Integer.FromDecimal<Arr["length"]>,
  HalfLen extends Integer.Number = Integer.ShiftRight<Len, Integer.One>
> = 0 extends 1
  ? never
  : Len extends Integer.Zero
  ? Integer.Zero
  : Len extends Integer.One
  ? Arr[Integer.ToNumber<Idx>]
  : Integer.Add<
      _Sum<Arr, Idx, HalfLen>,
      _Sum<
        Arr,
        Integer.Add<Idx, HalfLen>,
        Len extends Integer.Odd ? Integer.Increment<HalfLen> : HalfLen
      >
    >;

/**
 * Counts the number of times a specific value appears in an array.
 *
 * - Limits: `Arr` = 2000
 * - Time: `O(n)`
 * - Space: `O(n log n)`
 *
 * @example
 *     type R = Array.Count<[true, false, true]>; // => 2
 *     type R = Array.Count<["x", "y", "z", "y"], "y">; // => 2
 */
export type Count<Arr extends unknown[], Value = true> = Integer.ToNumber<
  _Sum<{
    [K in keyof Arr]: Arr[K] extends Value ? Integer.One : Integer.Zero;
  }>
>;

/**
 * Sorts using something similar to a bubble sort algorithm where each item is
 * compared to every other item.
 * Time complexity is `O(n^2)` but recursion is `O(log n)`.
 */
export type BubbleSort<Arr extends number[]> = MapIntToNum<
  _BubbleSort<MapNumToInt<Arr>>
>;

export type _BubbleSort<
  Arr extends Integer.Number[],
  SortedIndexes extends Integer.Number[] = {
    [K in keyof Arr]: K extends `${number}`
      ? _Sum<{
          [M in keyof Arr]: M extends `${number}`
            ? Integer.IsLessThan<Arr[M], Arr[K]> extends true
              ? Integer.One
              : Arr[M] extends Arr[K]
              ? Integer.IsLessThan<
                  Integer.FromDecimal<M>,
                  Integer.FromDecimal<K>
                > extends true
                ? Integer.One
                : Integer.Zero
              : Integer.Zero
            : Integer.Zero;
        }>
      : never;
  }
> = {
  [K in keyof Arr]: K extends `${number}`
    ? Integer.FromDecimal<K> extends infer N
      ? Arr[{
          [M in keyof SortedIndexes]: SortedIndexes[M] extends N ? M : never;
        }[number]]
      : never
    : never;
};

/**
 * Sorts using the merge sort algorithm.
 * Time complexity is `O(n log n)` and recursion is `O(n)`.
 */
export type MergeSort<Arr extends number[]> = MapIntToNum<
  _MergeSort<MapNumToInt<Arr>>
>;

export type _MergeSort<
  Arr extends Integer.Number[],
  Len extends Integer.Number = Integer.FromDecimal<Arr["length"]>,
  Size extends Integer.Number = Integer.One
> = 0 extends 1
  ? never
  : Integer.IsGreaterThan<Len, Size> extends true
  ? _MergeSort<
      _SortSubarraysOfSize<Arr, Size>,
      Len,
      Integer.ShiftLeft<Size, Integer.One>
    >
  : Arr;

type _SortSubarraysOfSize<
  Arr extends Integer.Number[],
  Size extends Integer.Number,
  A extends [Integer.Number[], Integer.Number[]] = _SplitAt<Arr, Size>,
  B extends [Integer.Number[], Integer.Number[]] = _SplitAt<A[1], Size>
> = A[1]["length"] extends 0
  ? Arr
  : B[1]["length"] extends 0
  ? _SortMerge<A[0], B[0]>
  : [..._SortMerge<A[0], B[0]>, ..._SortSubarraysOfSize<B[1], Size>];

/** Merges two sorted arrays into a single sorted array. */
type _SortMerge<
  A extends Integer.Number[],
  B extends Integer.Number[]
> = A extends [
  infer X extends Integer.Number,
  ...infer ARest extends Integer.Number[]
]
  ? B extends [
      infer Y extends Integer.Number,
      ...infer BRest extends Integer.Number[]
    ]
    ? Integer.IsLessThan<X, Y> extends true
      ? [X, ..._SortMerge<ARest, B>]
      : [Y, ..._SortMerge<A, BRest>]
    : A
  : B;

/**
 * Splits an array into subarrays of length `Size`.
 *
 * - Limits: `Arr` = 2000
 * - Time: `O(n log n)`
 * - Space: `O(n log n)`
 *
 * @example
 *     type R = Chunked<[1, 2, 3, 4, 5], 2> // => [[1, 2], [3, 4], [5]]
 */
export type Chunked<Arr extends unknown[], Size extends number> = _Chunked<
  Arr,
  Integer.FromDecimal<Size>
>;
export type _Chunked<
  Arr extends unknown[],
  Size extends Integer.Number,
  ChunkSizeResult extends Integer.DivModResult = Integer.DivMod<
    Integer.FromDecimal<Arr["length"]>,
    Size
  >,
  MappeeChunks extends unknown[] = _ArrOfLen<
    ChunkSizeResult["remainder"] extends Integer.Zero
      ? ChunkSizeResult["quotient"]
      : Integer.Increment<ChunkSizeResult["quotient"]>
  >,
  MappeeChunk extends unknown[] = _ArrOfLen<Size>,
  MappeeLastChunk extends unknown[] = _ArrOfLen<ChunkSizeResult["remainder"]>
> = {
  [K in keyof MappeeChunks]: K extends `${number}`
    ? _GetChunk<
        Arr,
        Integer.Multiply<Integer.FromDecimal<K>, Size>,
        Integer.FromDecimal<K> extends ChunkSizeResult["quotient"]
          ? MappeeLastChunk
          : MappeeChunk
      >
    : never;
};
type _GetChunk<
  Arr extends unknown[],
  Idx extends Integer.Number,
  Mappee extends unknown[]
> = {
  [K in keyof Mappee]: K extends `${number}`
    ? Arr[Integer.ToNumber<Integer.Add<Idx, Integer.FromDecimal<K>>>]
    : never;
};

/**
 * Returns a list of numbers starting from 0.
 *
 * - Limits: `Size` = 8000
 * - Time: `O(n log n)`
 * - Space: `O(n log n)`
 *
 * @example
 *     type R = Chunked<[1, 2, 3, 4, 5], 2> // => [[1, 2], [3, 4], [5]]
 */
export type Range<
  Size extends number,
  Mappee extends unknown[] = _ArrOfLen<Integer.FromDecimal<Size>, unknown>
> = {
  [K in keyof Mappee]: K extends `${infer N extends number}` ? N : never;
};

/**
 * Splits an array into two at a specific index.
 *
 * @example
 *     type R = SplitAt<[1, 2, 3, 4, 5], 2>; // => [[1, 2], [3, 4, 5]]
 */
export type SplitAt<Arr extends unknown[], Idx extends number> = _SplitAt<
  Arr,
  Integer.FromDecimal<Idx>
>;

export type _SplitAt<
  Arr extends unknown[],
  Idx extends Integer.Number,
  Subarr extends unknown[] = []
> = Integer.IsLessThanOrEqual<Idx, Integer.Zero> extends true
  ? [Subarr, Arr]
  : Arr extends [infer X, ...infer Rest]
  ? _SplitAt<Rest, Integer.Decrement<Idx>, [...Subarr, X]>
  : [Subarr, Arr];

// TODO: This should work for bigger arrays but TS hangs
export type _SplitAtSlice<Arr extends unknown[], Idx extends Integer.Number> = [
  _Slice<Arr, Integer.Zero, Idx>,
  _Slice<Arr, Idx>
];

export type Slice<
  Arr extends unknown[],
  Idx extends number,
  Len extends number = Integer.ToNumber<
    Integer.Subtract<
      Integer.FromDecimal<Arr["length"]>,
      Integer.FromDecimal<Idx>
    >
  >
> = _Slice<Arr, Integer.FromDecimal<Idx>, Integer.FromDecimal<Len>>;

export type _Slice<
  Arr extends unknown[],
  Idx extends Integer.Number,
  Len extends Integer.Number = Integer.Subtract<
    Integer.FromDecimal<Arr["length"]>,
    Idx
  >,
  HalfLen extends Integer.Number = Integer.ShiftRight<Len, Integer.One>
> = 0 extends 1
  ? never
  : Len extends Integer.Zero
  ? []
  : Len extends Integer.One
  ? [Arr[Integer.ToNumber<Idx> extends infer N extends number ? N : never]]
  : [
      ..._Slice<Arr, Idx, HalfLen>,
      ..._Slice<
        Arr,
        Integer.Add<Idx, HalfLen>,
        Len extends Integer.Odd ? Integer.Increment<HalfLen> : HalfLen
      >
    ];

/**
 * Reverses an array.
 *
 * - Limits: `Arr` = 2500
 * - Time: `O(n log n)`
 * - Space: `O(n log n)`
 *
 * @example
 *     type R = Array.Reverse<[1, 2, 3]>; // => [3, 2, 1]
 */
export type Reverse<
  Arr extends unknown[],
  Idx extends Integer.Number = Integer.Zero,
  Size extends Integer.Number = Integer.FromDecimal<Arr["length"]>,
  HalfSize extends Integer.Number = Integer.ShiftRight<Size, Integer.One>
> = 0 extends 1
  ? never
  : Size extends Integer.Zero
  ? []
  : Size extends Integer.One
  ? [Arr[Integer.ToNumber<Idx>]]
  : [
      ...Reverse<
        Arr,
        Integer.Add<Idx, HalfSize>,
        Size extends Integer.Odd ? Integer.Increment<HalfSize> : HalfSize
      >,
      ...Reverse<Arr, Idx, HalfSize>
    ];

/**
 * Reverses an array.
 *
 * - Limits: `Arr` = 2000
 * - Time: `O(n)`
 * - Space: `O(n)`
 *
 * @example
 *     type R = Array.Reverse<[1, 2, 3]>; // => [3, 2, 1]
 */
export type ReverseMap<Arr extends unknown[]> = {
  [K in keyof Arr]: K extends `${number}`
    ? Arr[Integer.ToNumber<
        Integer.Decrement<
          Integer.Subtract<
            Integer.FromDecimal<Arr["length"]>,
            Integer.FromDecimal<K>
          >
        >
      >]
    : never;
};

/**
 * Returns the last item of `Arr`.
 *
 * @example
 *     type R = Array.Last<[1, 2, 3]>; // => 3
 */
export type Last<Arr extends unknown[]> = Arr[Integer.ToNumber<
  Integer.Decrement<Integer.FromDecimal<Arr["length"]>>
>];

/**
 * Replaces the item at `Idx` of `Arr` with `Value`.
 *
 * @example
 *     type R = Array.UpdateAt<[1, 2, 3], 1, 9>; // => [1, 9, 3]
 */
export type UpdateAt<
  Arr extends unknown[],
  Idx extends number,
  Value
> = _UpdateAt<Arr, Integer.FromDecimal<Idx>, Value>;
type _UpdateAt<Arr extends unknown[], Idx extends Integer.Number, Value> = [
  ..._Slice<Arr, Integer.Zero, Idx>,
  Value,
  ..._Slice<Arr, Integer.Increment<Idx>>
];
