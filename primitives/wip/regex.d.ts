export type Regex<Pattern extends string> = _ParsePattern<Pattern>;
type _ParsePattern<Pattern extends string> =
  Pattern extends `${infer Ch}${infer Rest1}`
    ? (
        Rest1 extends `\\${infer Rest2}`
          ? Rest2 extends `${infer _Ch}${infer Rest3}`
            ? _RegexToken<Rest3>
            : _RegexError
          : Ch extends "*"
          ? _RegexError<"Nothing to repeat">
          : _RegexToken<Rest1, Ch>
      ) extends _RegexToken<infer Rest, infer SpecialCh>
      ? SpecialCh extends "("
        ? _RegexGroup<"", false>
        : SpecialCh extends ")"
        ? TODO
        : SpecialCh extends "|"
        ? TODO
        : (
            Rest extends `${infer Ch2}${infer Rest2}`
              ? Ch2 extends "*"
                ? _RegexToken<Rest2, Ch2>
                : _RegexToken<Rest>
              : _RegexToken<Rest>
          ) extends _RegexToken<infer Rest2, infer Flag>
        ? _RegexChar<Ch, Flag extends "*" ? true : false, _ParsePattern<Rest2>>
        : _RegexError
      : _RegexError
    : _RegexTerminator;

type _RegexToken<Rest extends string, SpecialCh extends string = ""> = [
  Rest,
  SpecialCh
];

type TODO = "TODO";

type _RegexNode =
  | _RegexGroup<string, boolean, _RegexNode>
  | _RegexChar<string, boolean, _RegexNode>
  | _RegexTerminator
  | _RegexError;
interface _RegexChar<
  Char extends string,
  IsRecursive extends boolean,
  Next extends _RegexNode
> {
  char: Char;
  isRecursive: IsRecursive;
  next: Next;
}
interface _RegexGroup<
  Name extends string,
  IsRecursive extends boolean,
  Next extends _RegexNode
> {
  name: Name;
  isRecursive: IsRecursive;
  next: Next;
}
interface _RegexTerminator {
  terminator: true;
}
interface _RegexError<Message extends string = "unknown"> {
  error: Message;
}

export type Match<R extends Regex<string>, Text extends string> = R;

type Test = Regex<"a\\b*c">;
