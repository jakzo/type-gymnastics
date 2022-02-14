import { Array } from "primitives/array";
import { String } from "primitives/string";
import { Integer } from "../primitives/integer";

export {};

export namespace Problems {
  /**
   * Solves the classical [n queens](https://en.wikipedia.org/wiki/Eight_queens_puzzle) problem.
   *
   * See {@link NQueensVisualized} to get a more human-friendly output.
   *
   * @example
   *     type R = Problems.NQueens<Integer.FromDecimal<8>, Integer.FromDecimal<8>>;
   *     // => [["0b11", "0b111"], ["0b1", "0b011"], ["0b011", "0b101"], ["0b01", "0b001"], ["0b101", "0b11"], ["0b111", "0b01"], ["0b001", "0b1"], ["0b", "0b"]]
   */
  type NQueens<
    ToPlace extends Integer.Number = Integer.FromDecimal<8>,
    GridSize extends Integer.Number = Integer.FromDecimal<8>
  > = _NQueens<ToPlace, GridSize>;

  /**
   * Returns a visual representation of a result from {@link NQueens}. This string is
   * designed to be viewed in the IntelliSense tooltip that appears when hovering
   * the mouse over a type, and may not appear correctly in other locations.
   *
   * @example
   *     type R = Problems.NQueensVisualized<
   *       Problems.NQueens<Integer.FromDecimal<4>, Integer.FromDecimal<4>>,
   *       Integer.FromDecimal<4>
   *     >; // => "
   *     ◻️ ♕ ◻️ ◼️
   *     ◼️ ◻️ ◼️ ♕
   *     ♕ ◼️ ◻️ ◼️
   *     ◼️ ◻️ ♕ ◻️"
   */
  type NQueensVisualized<
    Queens extends _Queen[] = NQueens,
    GridSize extends Integer.Number = Integer.FromDecimal<8>
  > = _NQueensVisualized<Queens, GridSize>;
}

type _Queen = [Integer.Number, Integer.Number];

type _NQueens<
  ToPlace extends Integer.Number,
  GridSize extends Integer.Number,
  Queens extends _Queen[] = [],
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
    > extends _Queen[]
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
  Queens extends _Queen[],
  GridSize extends Integer.Number
> = Queens extends [[infer QX, infer QY], ...infer QueensRest]
  ? QX extends Integer.Number
    ? QY extends Integer.Number
      ? QX extends X
        ? true
        : QY extends Y
        ? true
        : Integer.Subtract<
            Integer.Add<X, GridSize>,
            Y
          > extends Integer.Subtract<Integer.Add<GridSize, QX>, QY>
        ? true
        : Integer.Subtract<
            Integer.Add<Integer.Subtract<GridSize, X>, GridSize>,
            Y
          > extends Integer.Subtract<
            Integer.Add<Integer.Subtract<GridSize, QX>, GridSize>,
            QY
          >
        ? true
        : _IsThreatened<
            X,
            Y,
            QueensRest extends _Queen[] ? QueensRest : [],
            GridSize
          >
      : false
    : false
  : false;

type _NQueensVisualized<
  Queens extends _Queen[],
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
  Queens extends _Queen[],
  GridSize extends Integer.Number,
  Y extends Integer.Number,
  X extends Integer.Number = Integer.Zero
> = X extends GridSize
  ? ""
  : `${_IsQueenAt<Queens, X, Y> extends true
      ? "♕"
      : Integer.Modulo<
          Integer.Add<X, Y>,
          Integer.FromDecimal<2>
        > extends Integer.One
      ? "◼️"
      : "◻️"}\u00A0${_NQueensVisualizedRow<
      Queens,
      GridSize,
      Y,
      Integer.Increment<X>
    >}`;
type _IsQueenAt<
  Queens extends _Queen[],
  X extends Integer.Number,
  Y extends Integer.Number
> = Queens extends [[infer QX, infer QY], ...infer QueensRest]
  ? (QX extends X ? (QY extends Y ? true : false) : false) extends true
    ? true
    : _IsQueenAt<QueensRest extends _Queen[] ? QueensRest : [], X, Y>
  : false;

type _TooltipLinebreak = `${String.Repeat<"\u00A0", Integer.FromDecimal<48>>} `;
