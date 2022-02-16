import { Collatz } from "../collatz";
import { FromDecimal, ToDecimal } from "../../primitives/integer";
import "../../__tests__/test-utils";

test<ToDecimal<Collatz<FromDecimal<1>>>>(); // $ExpectType "0"
test<ToDecimal<Collatz<FromDecimal<2>>>>(); // $ExpectType "1"
test<ToDecimal<Collatz<FromDecimal<6>>>>(); // $ExpectType "8"
