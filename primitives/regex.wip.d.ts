export type Regex<Pattern extends string> = _ParsePattern<Pattern>;
type _ParsePattern<
  Pattern extends string,
  Stack extends _RegexNode[] = [{ children: [] }]
> = Pattern extends `(${infer Rest}`
  ? _ParsePattern<Rest, [{ children: [] }, ...Stack]>
  : Pattern extends `)${infer Rest}`
  ? Stack extends [infer _Frame, ...infer StackRest]
    ? _ParsePattern<Rest, StackRest extends _RegexNode[] ? StackRest : []>
    : _ParseError
  : Pattern extends `|${infer Rest}`
  ? 0
  : Pattern extends `\\${infer _Ch}${infer Rest}`
  ? Stack extends [infer Frame, ...infer StackRest]
    ? _ParsePattern<Rest, [0, ...StackRest]>
    : _ParseError
  : Pattern extends `${infer _Ch}${infer Rest}`
  ? _ParsePattern<Rest, Stack>
  : Stack extends [infer Frame]
  ? Frame
  : _ParseError;
type _ParseError = "(parse error)";
type _RegexNode = { children: _RegexNode[]; char?: string };

// type _Regex<Pattern extends string> = (
//   Pattern extends `\\${infer Ch}${infer Rest}`
//     ? `${Ch}${Rest}`
//     : Pattern extends `${infer Ch}${infer Rest}`
//     ? `${Ch}${Rest}`
//     : ""
// ) extends `${infer Ch}${infer Rest}`
//   ? _RegexNode<Ch>
//   : _RegexTerminator;
// type _RegexTerminator = "(end)";
// type _RegexError = ["Error compiling regex"];
// type _RegexNode<Ch extends string> = { ch: Ch };

export type Match<R extends Regex<string>, Text extends string> = R;

type Test = Regex<"a\\bc">;
