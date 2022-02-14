import { FromDecimal } from "primitives/integer";
import { NQueens, NQueensVisualized } from "problems/n-queens";

test<NQueens>(); // $ExpectType [["0b11", "0b111"], ["0b1", "0b011"], ["0b011", "0b101"], ["0b01", "0b001"], ["0b101", "0b11"], ["0b111", "0b01"], ["0b001", "0b1"], ["0b", "0b"]]
test<NQueens<FromDecimal<4>, FromDecimal<4>>>(); // $ExpectType [["0b01", "0b11"], ["0b", "0b01"], ["0b11", "0b1"], ["0b1", "0b"]]
test<NQueens<FromDecimal<4>, FromDecimal<3>>>(); // $ExpectType undefined

// tslint:disable-next-line: max-line-length no-irregular-whitespace
// $ExpectType "                                                 ◻️ ♕ ◻️ ◼️                                                  ◼️ ◻️ ◼️ ♕                                                  ♕ ◼️ ◻️ ◼️                                                  ◼️ ◻️ ♕ ◻️                                                  "
test<
  NQueensVisualized<NQueens<FromDecimal<4>, FromDecimal<4>>, FromDecimal<4>>
>();
