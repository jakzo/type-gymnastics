/** @fileoverview Utilities for working with arrays (TypeScript tuples). */

import * as Integer from "./integer";

export {};

/**
 * Creates a multi-dimensional array with the specified dimensions and
 * with each element filled with the provided value.
 *
 * @example
 *     type R = Array.Create<[Integer.FromDecimal<2>, Integer.FromDecimal<3>], 1>;
 *     // => [[1, 1, 1], [1, 1, 1]]
 */
export type Create<
  Dimensions extends Integer.Number[],
  FillValue
> = Dimensions extends [infer Size, ...infer DimensionsRest]
  ? Size extends Integer.Number
    ? DimensionsRest extends Integer.Number[]
      ? Size extends Integer.Zero
        ? []
        : [
            DimensionsRest extends []
              ? FillValue
              : Create<DimensionsRest, FillValue>,
            ...Create<[Integer.Decrement<Size>, ...DimensionsRest], FillValue>
          ]
      : []
    : []
  : [];
