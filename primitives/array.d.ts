/** @fileoverview Utilities for working with arrays (TypeScript tuples). */

import * as Integer from "./integer";

export {};

/**
 * Creates a multi-dimensional array with the specified dimensions and
 * with each element filled with the provided value.
 *
 * @example
 *     type R = Array.Create<[2, 3], 1>;
 *     // => [[1, 1, 1], [1, 1, 1]]
 */
export type Create<Dimensions extends number[], FillValue> = _Create<
  DimsToInts<Dimensions>,
  FillValue
>;

export type _Create<
  Dimensions extends Integer.Number[],
  FillValue
> = Dimensions extends [
  infer Size extends Integer.Number,
  ...infer DimensionsRest extends Integer.Number[]
]
  ? Size extends Integer.Zero
    ? []
    : [
        DimensionsRest extends []
          ? FillValue
          : _Create<DimensionsRest, FillValue>,
        ..._Create<[Integer.Decrement<Size>, ...DimensionsRest], FillValue>
      ]
  : [];

type DimsToInts<Dimensions extends number[]> = Dimensions extends [
  infer N extends number,
  ...infer Rest extends number[]
]
  ? [Integer.FromDecimal<N>, ...DimsToInts<Rest>]
  : [];
