export {};

export type PartA<Input extends string> = Calculate<Input, 4>;
export type PartB<Input extends string> = Calculate<Input, 14>;

type Calculate<
  Str extends string,
  WindowSize extends number,
  Window extends string[] = [],
  Processed extends string[] = []
> = Window["length"] extends WindowSize
  ? _Calculate<Str, Window, Processed>
  : Str extends `${infer Ch}${infer Rest}`
  ? Calculate<Rest, WindowSize, [...Window, Ch], [...Processed, Ch]>
  : never;
type _Calculate<
  Str extends string,
  Window extends string[],
  Processed extends string[]
> = 0 extends 1
  ? never
  : HasDuplicates<Window> extends true
  ? Str extends `${infer Ch}${infer StrRest}`
    ? Window extends [string, ...infer WindowRest extends string[]]
      ? _Calculate<StrRest, [...WindowRest, Ch], [...Processed, Ch]>
      : never
    : never
  : Processed["length"];

type HasDuplicates<Arr extends unknown[]> = Arr extends [infer A, ...infer Rest]
  ? Contains<Rest, A> extends true
    ? true
    : HasDuplicates<Rest>
  : false;

type Contains<Arr extends unknown[], V> = Arr extends [infer A, ...infer Rest]
  ? A extends V
    ? true
    : Contains<Rest, V>
  : false;
