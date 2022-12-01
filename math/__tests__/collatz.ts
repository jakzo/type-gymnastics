import { Collatz } from "math/collatz";
import { FromDecimal, ToDecimal } from "primitives/integer";

test<Collatz<1>>(); // $ExpectType 0
test<Collatz<2>>(); // $ExpectType 1
test<Collatz<6>>(); // $ExpectType 8
