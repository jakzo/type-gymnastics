import { Array, Integer, String } from "index";

export {};

export type PartA<Input extends string> = Calculate<Input, true>;
export type PartB<Input extends string> = Calculate<Input, false>;

type Calculate<
  Input extends string,
  ReverseMoved extends boolean,
  Parts extends string[] = String.Split<Input, "\n\n">,
  State extends string[][] = ParseState<Parts[0]>,
  Instructions extends IInstruction[] = ParseInstructions<Parts[1]>
> = Process<State, Instructions, ReverseMoved>;

type Process<
  State extends string[][],
  Instructions extends IInstruction[],
  ReverseMoved extends boolean
> = Instructions extends [
  infer Instruction extends IInstruction,
  ...infer Rest extends IInstruction[]
]
  ? Process<
      ApplyInstruction<State, Instruction, ReverseMoved>,
      Rest,
      ReverseMoved
    >
  : String.Join<{
      [K in keyof State]: K extends `${number}` ? Array.Last<State[K]> : never;
    }>;

type ApplyInstruction<
  State extends string[][],
  Instruction extends IInstruction,
  ReverseMoved extends boolean,
  FromIdx extends Integer.Number = Integer.Subtract<
    Integer.FromDecimal<State[Instruction["from"]]["length"]>,
    Instruction["n"]
  >,
  Moved extends string[] = Array._Slice<State[Instruction["from"]], FromIdx>
> = {
  [K in keyof State]: K extends `${number}`
    ? K extends `${Instruction["from"]}`
      ? Array._Slice<State[K], Integer.Zero, FromIdx>
      : K extends `${Instruction["to"]}`
      ? [
          ...State[K],
          ...(ReverseMoved extends true ? Array.Reverse<Moved> : Moved)
        ]
      : State[K]
    : never;
};

type ParseState<
  Str extends string,
  Lines extends string[] = String.Split<Str, "\n">
> = _ParseState<Array.Last<String._ParseInts<Array.Last<Lines>>>, Lines>;
type _ParseState<
  NumStacks extends Integer.Number,
  Lines extends string[],
  StackIdx extends Integer.Number = Integer.Zero,
  State extends string[][] = []
> = StackIdx extends NumStacks
  ? State
  : _ParseState<
      NumStacks,
      Lines,
      Integer.Increment<StackIdx>,
      [...State, _ParseStack<Lines, StackIdx>]
    >;
type _ParseStack<
  Lines extends string[],
  StackIdx extends Integer.Number,
  LineIdx extends Integer.Number = Integer.Decrement<
    Integer.FromDecimal<Lines["length"]>
  >,
  Stack extends string[] = [],
  NextLineIdx extends Integer.Number = Integer.Decrement<LineIdx>,
  Line extends string = Lines[Integer.ToNumber<NextLineIdx>],
  Ch extends string = String._Substr<
    Line,
    Integer.Increment<Integer.Multiply<StackIdx, Integer.Four>>,
    Integer.One
  >
> = LineIdx extends Integer.Zero
  ? Stack
  : Ch extends " "
  ? Stack
  : _ParseStack<Lines, StackIdx, NextLineIdx, [...Stack, Ch]>;

type ParseInstructions<
  Str extends string,
  Lines extends string[] = String.Split<Str, "\n">
> = {
  [K in keyof Lines]: K extends `${number}`
    ? String._ParseInts<Lines[K]> extends [
        infer N extends Integer.Number,
        infer From extends Integer.Number,
        infer To extends Integer.Number
      ]
      ? NewInstruction<{
          n: N;
          from: Integer.ToNumber<Integer.Decrement<From>>;
          to: Integer.ToNumber<Integer.Decrement<To>>;
        }>
      : never
    : never;
};

interface IInstruction {
  n: Integer.Number;
  from: number;
  to: number;
}
type NewInstruction<T extends IInstruction> = T;
