import { Reverse, Repeat } from "primitives/string";

test<Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"

test<Repeat<"abc", 3>>(); // $ExpectType "abcabcabc"
