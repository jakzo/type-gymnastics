import { Reverse } from "primitives/string";

test<Reverse<"Hello, world!">>(); // $ExpectType "!dlrow ,olleH"
