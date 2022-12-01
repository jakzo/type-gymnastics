import { Create } from "primitives/array";

test<Create<[2, 3], 1>>(); // $ExpectType [[1, 1, 1], [1, 1, 1]]
