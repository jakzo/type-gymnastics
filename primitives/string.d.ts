export {};

export namespace String {
  /** Reverses a string. */
  type Reverse<Str extends string> = Str extends `${infer Ch}${infer Rest}`
    ? `${Reverse<Rest>}${Ch}`
    : "";
}
