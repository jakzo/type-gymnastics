import { Create } from "primitives/array";
import { FromDecimal } from "primitives/integer";

test<Create<[FromDecimal<2>, FromDecimal<3>], 1>>(); // $ExpectType [[1, 1, 1], [1, 1, 1]]
