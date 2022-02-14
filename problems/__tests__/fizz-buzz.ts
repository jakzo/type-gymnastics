import { FromDecimal } from "primitives/integer";
import { FizzBuzz } from "problems/fizz-buzz";

test<FizzBuzz>(); // $ExpectType ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16"]
test<FizzBuzz<FromDecimal<4>>>(); // $ExpectType ["1", "2", "Fizz", "4"]