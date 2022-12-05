import { Array, Integer, String } from "index";

export {};

export type PartA<
  Input extends string,
  InputArr extends string[] = String.Split<String.Trim<Input>, "\n">
> = CalcResult<{
  [K in keyof InputArr]: CommonChar<InputArr[K]>;
}>;

type CalcResult<Chars extends string[]> = Array.Sum<{
  [K in keyof Chars]: CalcPoints<Chars[K]>;
}>;
type CalcPoints<Ch extends string> = CharMap &
  `${Ch}${string}` extends `${string}${infer N extends number}`
  ? N
  : 0;

type CommonChar<
  Str extends string,
  HalfLen extends Integer.Number = Integer.ShiftRight<
    Integer.FromDecimal<String.Len<Str>>,
    Integer.One
  >
> = String.Chars<String._Take<Str, HalfLen>>[number] &
  String.Chars<String._Chomp<Str, HalfLen>>[number];

export type PartB<
  Input extends string,
  InputArr extends string[] = String.Split<String.Trim<Input>, "\n">,
  Groups = Array.Chunked<InputArr, 3>
> = CalcResult<
  AsStringArr<{
    [K in keyof Groups]: GroupCommon<Groups[K]>;
  }>
>;

type AsStringArr<T> = T extends string[] ? T : never;

type GroupCommon<Group> = Group extends [string, string, string]
  ? GroupChars<Group[0]> & GroupChars<Group[1]> & GroupChars<Group[2]>
  : never;
type GroupChars<Str extends string> = String.Chars<Str>[number];

type CharsLower = "abcdefghijklmnopqrstuvwxyz";
type CharsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
type Chars = [" ", ...String.Chars<CharsLower>, ...String.Chars<CharsUpper>];
type CharMap = {
  [K in keyof Chars]: K extends `${number}` ? `${Chars[K]}${K}` : never;
}[keyof Chars];
