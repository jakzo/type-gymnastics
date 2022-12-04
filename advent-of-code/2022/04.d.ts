import { Array, Integer, String } from "index";

export {};

export type PartA<
  Input extends string[],
  Pairs extends Pair[] = Parse<Input>
> = Array.Count<{ [K in keyof Pairs]: IsEncapsulated<Pairs[K]> }>;

type IsEncapsulated<P extends Pair> = true extends
  | (Integer.IsLessThanOrEqual<P["al"], P["bl"]> &
      Integer.IsGreaterThanOrEqual<P["ar"], P["br"]>)
  | (Integer.IsLessThanOrEqual<P["bl"], P["al"]> &
      Integer.IsGreaterThanOrEqual<P["br"], P["ar"]>)
  ? true
  : false;

export type PartB<
  Input extends string[],
  Pairs extends Pair[] = Parse<Input>
> = Array.Count<{ [K in keyof Pairs]: IsOverlapping<Pairs[K]> }>;

type IsOverlapping<P extends Pair> = true extends
  | (Integer.IsLessThanOrEqual<P["al"], P["bl"]> &
      Integer.IsGreaterThanOrEqual<P["ar"], P["bl"]>)
  | (Integer.IsLessThanOrEqual<P["bl"], P["al"]> &
      Integer.IsGreaterThanOrEqual<P["br"], P["al"]>)
  ? true
  : false;

type Parse<Input extends string[]> = {
  [K in keyof Input]: String._ParseInts<
    Input[K]
  > extends infer Nums extends Integer.Number[]
    ? AsPair<{ al: Nums[0]; ar: Nums[1]; bl: Nums[2]; br: Nums[3] }>
    : never;
};
type AsPair<T> = T extends Pair ? T : never;

interface Pair {
  al: Integer.Number;
  ar: Integer.Number;
  bl: Integer.Number;
  br: Integer.Number;
}
