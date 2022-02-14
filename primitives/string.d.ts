export {};

/** Utilities for working with strings. */
export namespace String {
  /** Reverses a string.
   * @example type R = String.Reverse<"Hello, world!">; // => "!dlrow ,olleH" */
  type Reverse<Str extends string> = Str extends `${infer Ch}${infer Rest}`
    ? `${Reverse<Rest>}${Ch}`
    : "";
}
