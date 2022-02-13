export type Reverse<Str extends string> = Str extends `${infer Ch}${infer Rest}`
  ? `${Reverse<Rest>}${Ch}`
  : "";
