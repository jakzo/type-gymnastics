import { Array } from "primitives/array";
import { Integer } from "primitives/integer";

test<Array.Create<[Integer.FromDecimal<2>, Integer.FromDecimal<3>], 1>>(); // $ExpectType [[1, 1, 1], [1, 1, 1]]
