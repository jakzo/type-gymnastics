import * as String from "../primitives/string";
import * as Integer from "../primitives/integer";

export {};

type Coord = [number, number];
type _Coord = [Integer.Number, Integer.Number];

type CoordNumsToInts<Coords extends Coord[]> = Coords extends [
  [infer X extends number, infer Y extends number],
  ...infer Rest extends Coord[]
]
  ? [[Integer.FromDecimal<X>, Integer.FromDecimal<Y>], ...CoordNumsToInts<Rest>]
  : [];

type CoordIntsToNums<Coords extends _Coord[]> = Coords extends [
  [infer X extends Integer.Number, infer Y extends Integer.Number],
  ...infer Rest extends _Coord[]
]
  ? [[Integer.ToNumber<X>, Integer.ToNumber<Y>], ...CoordIntsToNums<Rest>]
  : [];

/**
 * Solves the classical [n queens](https://wikipedia.org/wiki/Eight_queens_puzzle)
 * problem and returns a list of `[x, y]` pairs of 0-indexed coordinates where
 * the queens should be placed such that none can attack another on the next
 * turn, or `undefined` if there is no solution.
 *
 * See {@link NQueensVisualized} to get a more human-friendly output.
 *
 * @example
 *     type R = Problems.NQueens<8, 8>;
 *     // => [["0b11", "0b111"], ["0b1", "0b011"], ["0b011", "0b101"], ["0b01", "0b001"], ["0b101", "0b11"], ["0b111", "0b01"], ["0b001", "0b1"], ["0b", "0b"]]
 */
export type NQueens<ToPlace extends number, GridSize extends number> = _NQueens<
  Integer.FromDecimal<ToPlace>,
  Integer.FromDecimal<GridSize>
> extends infer R extends _Coord[]
  ? CoordIntsToNums<R>
  : undefined;

export type _NQueens<
  ToPlace extends Integer.Number,
  GridSize extends Integer.Number,
  Queens extends _Coord[] = [],
  X extends Integer.Number = Integer.Zero,
  Y extends Integer.Number = Integer.Zero
> = ToPlace extends Integer.Zero
  ? Queens
  : Integer.IsGreaterThanOrEqual<X, GridSize> extends true
  ? _NQueens<ToPlace, GridSize, Queens, Integer.Zero, Integer.Increment<Y>>
  : Integer.IsGreaterThanOrEqual<Y, GridSize> extends true
  ? undefined
  : _IsThreatened<X, Y, Queens, GridSize> extends false
  ? _NQueens<
      Integer.Decrement<ToPlace>,
      GridSize,
      [[X, Y], ...Queens],
      Integer.Increment<X>,
      Y
    > extends _Coord[]
    ? _NQueens<
        Integer.Decrement<ToPlace>,
        GridSize,
        [[X, Y], ...Queens],
        Integer.Increment<X>,
        Y
      >
    : _NQueens<ToPlace, GridSize, Queens, Integer.Increment<X>, Y>
  : _NQueens<ToPlace, GridSize, Queens, Integer.Increment<X>, Y>;

type _IsThreatened<
  X extends Integer.Number,
  Y extends Integer.Number,
  Queens extends _Coord[],
  GridSize extends Integer.Number
> = Queens extends [
  [infer QX extends Integer.Number, infer QY extends Integer.Number],
  ...infer QueensRest extends _Coord[]
]
  ? QX extends X
    ? true
    : QY extends Y
    ? true
    : Integer.Subtract<Integer.Add<X, GridSize>, Y> extends Integer.Subtract<
        Integer.Add<GridSize, QX>,
        QY
      >
    ? true
    : Integer.Subtract<
        Integer.Add<Integer.Subtract<GridSize, X>, GridSize>,
        Y
      > extends Integer.Subtract<
        Integer.Add<Integer.Subtract<GridSize, QX>, GridSize>,
        QY
      >
    ? true
    : _IsThreatened<X, Y, QueensRest, GridSize>
  : false;

/**
 * Returns a visual representation of a result from {@link NQueens}. This string is
 * designed to be viewed in the IntelliSense tooltip that appears when hovering
 * the mouse over a type, and may not appear correctly in other locations.
 *
 * @example
 *     type R = Problems.NQueensVisualized<
 *       Problems.NQueens<4, 4>, 4>; // => "
 *     // ◻️ ♕ ◻️ ◼️
 *     // ◼️ ◻️ ◼️ ♕
 *     // ♕ ◼️ ◻️ ◼️
 *     // ◼️ ◻️ ♕ ◻️"
 */
export type NQueensVisualized<
  Queens extends Coord[],
  GridSize extends number
> = _NQueensVisualized<CoordNumsToInts<Queens>, Integer.FromDecimal<GridSize>>;

export type _NQueensVisualized<
  Queens extends _Coord[],
  GridSize extends Integer.Number,
  Y extends Integer.Number = Integer.Zero
> = Y extends GridSize
  ? _TooltipLinebreak
  : `${_TooltipLinebreak}${_NQueensVisualizedRow<
      Queens,
      GridSize,
      Y
    >}${_NQueensVisualized<Queens, GridSize, Integer.Increment<Y>>}`;

type _NQueensVisualizedRow<
  Queens extends _Coord[],
  GridSize extends Integer.Number,
  Y extends Integer.Number,
  X extends Integer.Number = Integer.Zero
> = X extends GridSize
  ? ""
  : `${_IsQueenAt<Queens, X, Y> extends true
      ? "♕"
      : Integer.Modulo<Integer.Add<X, Y>, Integer.Two> extends Integer.One
      ? "◼️"
      : "◻️"}${_NBSP}${_NQueensVisualizedRow<
      Queens,
      GridSize,
      Y,
      Integer.Increment<X>
    >}`;

type _IsQueenAt<
  Queens extends _Coord[],
  X extends Integer.Number,
  Y extends Integer.Number
> = Queens extends [[infer QX, infer QY], ...infer QueensRest]
  ? (QX extends X ? (QY extends Y ? true : false) : false) extends true
    ? true
    : _IsQueenAt<QueensRest extends _Coord[] ? QueensRest : [], X, Y>
  : false;

type _TooltipLinebreak = `${String.Repeat<_NBSP, 200>} `;
type _NBSP = "\u00A0";
