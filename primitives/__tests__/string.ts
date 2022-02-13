import { String } from "primitives/string";

test<String.Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"
