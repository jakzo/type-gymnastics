// import * as Math from "../math/evaluate";

// type Result = Math.Evaluate<"12 + 34 - 5*(6*7 % 8) + 9">;

import * as Integer from "../primitives/integer";
import { NQueensVisualized } from "../problems/n-queens";

type R = NQueensVisualized<Integer.FromDecimal<4>, Integer.FromDecimal<4>>;
