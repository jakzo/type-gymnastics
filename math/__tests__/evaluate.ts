import { Evaluate } from "math/evaluate";

test<Evaluate<"1+2">>(); // $ExpectType "3"
test<Evaluate<"1 + 2">>(); // $ExpectType "3"
test<Evaluate<"12+34">>(); // $ExpectType "46"
test<Evaluate<"5-3">>(); // $ExpectType "2"
test<Evaluate<"5*3">>(); // $ExpectType "15"
test<Evaluate<"20/3">>(); // $ExpectType "6"
test<Evaluate<"20%3">>(); // $ExpectType "2"
test<Evaluate<"1+2+3+4+5">>(); // $ExpectType "15"
test<Evaluate<"1+2*3+4">>(); // $ExpectType "11"
test<Evaluate<"1+2*(3+4)">>(); // $ExpectType "15"
test<Evaluate<"(1+2)*(3+4)">>(); // $ExpectType "21"
test<Evaluate<"12 + 34 - 5*(6*7%8) + 9">>(); // $ExpectType "45"
