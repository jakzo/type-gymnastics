import {
  Reverse,
  Repeat,
  Chomp,
  Take,
  Len,
  Chars,
  ParseInts,
} from "primitives/string";

test<Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"

test<Repeat<"abc", 3>>(); // $ExpectType "abcabcabc"

test<Chomp<"abcde", 3>>(); // $ExpectType "de"
test<Chomp<"abcde", 0>>(); // $ExpectType "abcde"
test<Chomp<"abcde", 5>>(); // $ExpectType ""

test<Take<"abcde", 3>>(); // $ExpectType "abc"
test<Take<"abcde", 0>>(); // $ExpectType ""
test<Take<"abcde", 5>>(); // $ExpectType "abcde"

test<Len<"abcde">>(); // $ExpectType 5
test<Len<"">>(); // $ExpectType 0

test<Chars<"abc">>(); // $ExpectType ["a", "b", "c"]
test<Chars<"">>(); // $ExpectType []

test<ParseInts<"1+2.3-4">>(); // $ExpectType [1, 2, 3, 4]
test<ParseInts<"">>(); // $ExpectType []
test<ParseInts<" 1234 5 ">>(); // $ExpectType [1234, 5]
