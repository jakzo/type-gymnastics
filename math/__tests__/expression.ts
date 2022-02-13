import { EvaluateMathExpression } from "math/expression";

test<EvaluateMathExpression<"1+2">>(); // $ExpectType "3"
test<EvaluateMathExpression<"1 + 2">>(); // $ExpectType "3"
test<EvaluateMathExpression<"12+34">>(); // $ExpectType "46"
test<EvaluateMathExpression<"5-3">>(); // $ExpectType "2"
test<EvaluateMathExpression<"5*3">>(); // $ExpectType "15"
test<EvaluateMathExpression<"20/3">>(); // $ExpectType "6"
test<EvaluateMathExpression<"20%3">>(); // $ExpectType "2"
test<EvaluateMathExpression<"1+2+3+4+5">>(); // $ExpectType "15"
test<EvaluateMathExpression<"1+2*3+4">>(); // $ExpectType "11"
test<EvaluateMathExpression<"1+2*(3+4)">>(); // $ExpectType "15"
test<EvaluateMathExpression<"(1+2)*(3+4)">>(); // $ExpectType "21"
test<EvaluateMathExpression<"12 + 34 - 5*(6*7%8) + 9">>(); // $ExpectType "45"
