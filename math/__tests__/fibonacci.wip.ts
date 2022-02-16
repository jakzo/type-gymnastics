import { Fibonacci } from "../fibonacci.wip";
import { FromDecimal, ToDecimal } from "../../primitives/integer";
import "../../__tests__/test-utils";

test<ToDecimal<Fibonacci<FromDecimal<1>>>>(); // $ExpectType "1"
test<ToDecimal<Fibonacci<FromDecimal<2>>>>(); // $ExpectType "1"
test<ToDecimal<Fibonacci<FromDecimal<3>>>>(); // $ExpectType "2"
test<ToDecimal<Fibonacci<FromDecimal<4>>>>(); // $ExpectType "3"
test<ToDecimal<Fibonacci<FromDecimal<5>>>>(); // $ExpectType "5"
test<ToDecimal<Fibonacci<FromDecimal<6>>>>(); // $ExpectType "8"
test<ToDecimal<Fibonacci<FromDecimal<20>>>>(); // $ExpectType "6765"
