import { Array, Integer } from "index";

export {};

export type PartA<Input extends number[]> = Array.Count<{
  [K in keyof Input]: Integer.IsGreaterThan<
    Integer.FromDecimal<Input[K]>,
    Integer.FromDecimal<
      Input[Integer.ToNumber<Integer.Decrement<Integer.FromDecimal<K>>>]
    >
  >;
}>;

// export type PartABig<Input extends number[]> = Array.Count<{
//   [K in keyof Input]: Integer.IsGreaterThan<
//     Integer.FromDecimal<Input[K]>,
//     Integer.FromDecimal<
//       Input[Integer.ToNumber<Integer.Decrement<Integer.FromDecimal<K>>>]
//     >
//   >;
// }>;

// export type Precache<Input extends number[]> = Array.Count<{
//   [K in keyof Input]: Integer.IsGreaterThan<
//     Integer.FromDecimal<Input[K]>,
//     Integer.FromDecimal<
//       Input[Integer.ToNumber<Integer.Decrement<Integer.FromDecimal<K>>>]
//     >
//   >;
// }>;

// export type PrecacheOld<
//   Input extends number[],
//   Size extends Integer.Number = Integer.FromDecimal<1500>,
//   Gt extends Integer.Number[] = {
//     [K in keyof Input]: Integer.IsGreaterThan<
//       Integer.FromDecimal<Input[K]>,
//       Integer.FromDecimal<
//         Input[Integer.ToNumber<Integer.Decrement<Integer.FromDecimal<K>>>]
//       >
//     > extends true
//       ? Integer.One
//       : Integer.Zero;
//   }
// > = Array._SumBinary<Gt, Integer.Zero, Size>;

export type PartB<Input extends number[]> = 0;
