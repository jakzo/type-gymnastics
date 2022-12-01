import { Reverse } from "./string";

export type Regex<Pattern extends string> = _ParsePattern<Reverse<Pattern>>;
type _ParsePattern<
  Pattern extends string,
  Stack extends _StackNodeAny[] = [_StackNode<_Nfa<_NfaTerminator>>],
  Flag extends string = ""
> = Pattern extends `${infer Ch}${infer Rest1}`
  ? (
      Rest1 extends `\\${infer Rest2}`
        ? _RegexToken<Rest2>
        : Ch extends "*"
        ? _RegexToken<Rest1, Ch, true>
        : _RegexToken<Rest1, Ch>
    ) extends _RegexToken<infer Rest, infer SymCh, infer IsFlag>
    ? IsFlag extends true
      ? Flag extends ""
        ? _ParsePattern<Rest, Stack, Ch>
        : _ParseError<"Flag applied to nothing">
      : SymCh extends ")"
      ? _ParsePattern<
          Rest,
          [...Stack, _StackNode<_Nfa<null, Flag extends "*" ? true : false>>]
        >
      : SymCh extends "("
      ? Stack extends _StackRest<
          _StackRest<infer StackRest, _StackNode<infer End1, infer Starts1>>,
          _StackNode<
            _Nfa<string, infer IsSelfReferential, _NfaAny[]>,
            infer Starts2
          >
        >
        ? Starts1 extends [...infer StartsRest, infer Start]
          ? StartsRest extends _NfaAny[]
            ? Start extends _NfaAny
              ? _ParsePattern<
                  Rest,
                  [
                    ...StackRest,
                    _StackNode<
                      End1,
                      [...StartsRest, _Nfa<null, IsSelfReferential, Starts2>]
                    >
                  ]
                >
              : _ParseError
            : _ParseError
          : _ParseError
        : _ParseError<"unclosed group">
      : Stack extends _StackRest<
          infer StackRest,
          _StackNode<infer End, infer Starts>
        >
      ? _ParsePattern<
          Rest,
          [
            ...StackRest,
            _StackNode<
              End,
              Starts extends [...infer StartsRest, infer Start]
                ? [
                    ...StartsRest,
                    _Nfa<
                      Ch,
                      Flag extends "*" ? true : false,
                      Start extends _NfaAny ? [Start] : []
                    >
                  ]
                : // TODO: Consolidate with identical logic above
                  [_Nfa<Ch, Flag extends "*" ? true : false>]
            >
          ]
        >
      : _ParseError<"Stack popped early">
    : _ParseError<"_RegexToken">
  : Flag extends ""
  ? Stack extends [infer Nfa]
    ? Nfa
    : _ParseError<"Stack">
  : _ParseError<"Flag applied to nothing">;

type _ParseError<Message extends string = "unknown"> =
  `Parse error: ${Message}`;
type _RegexToken<
  Rest extends string,
  SymCh extends string = "",
  IsFlag extends boolean = false
> = [IsFlag, SymCh, Rest];
type _StackRest<
  StackRest extends _StackNodeAny[],
  StackNode extends _StackNodeAny
> = [...StackRest, StackNode];
type _StackNode<End extends _NfaAny, Starts extends _NfaAny[] = [End]> = [
  End,
  Starts
];
type _StackNodeAny = _StackNode<_NfaAny, _NfaAny[]>;

interface _Nfa<
  Value extends _NfaTerminator | string | null = string,
  IsSelfReferential extends boolean = false,
  Transitions extends _NfaAny[] = []
> {
  value: Value;
  isSelfReferential: IsSelfReferential;
  transitions: Transitions;
}
type _NfaTerminator = "(end)";
type _NfaAny = _Nfa<_NfaTerminator | string | null, boolean, _NfaAny[]>;

export type Match<R extends Regex<string>, Text extends string> = R;

type Test = Regex<"a\\b*c">;
