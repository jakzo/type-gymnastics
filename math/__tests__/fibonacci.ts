import { Fibonacci } from "math/fibonacci";

test<Fibonacci<1>>(); // $ExpectType 1
test<Fibonacci<2>>(); // $ExpectType 1
test<Fibonacci<3>>(); // $ExpectType 2
test<Fibonacci<4>>(); // $ExpectType 3
test<Fibonacci<5>>(); // $ExpectType 5
test<Fibonacci<6>>(); // $ExpectType 8
test<Fibonacci<20>>(); // $ExpectType 6765
