import { FromDecimal } from "primitives/integer";
import { Reverse, Repeat } from "primitives/string";

test<Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"

test<Repeat<"abc", FromDecimal<3>>>(); // $ExpectType "abcabcabc"
