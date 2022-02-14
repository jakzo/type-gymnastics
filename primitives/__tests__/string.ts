import { Integer } from "primitives/integer";
import { String } from "primitives/string";

test<String.Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"

test<String.Repeat<"abc", Integer.FromDecimal<3>>>(); // $ExpectType "abcabcabc"
