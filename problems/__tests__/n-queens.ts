import { Integer } from "primitives/integer";
import { Problems } from "problems/n-queens";

test<Problems.NQueens>(); // $ExpectType [["0b11", "0b111"], ["0b1", "0b011"], ["0b011", "0b101"], ["0b01", "0b001"], ["0b101", "0b11"], ["0b111", "0b01"], ["0b001", "0b1"], ["0b", "0b"]]
test<Problems.NQueens<Integer.FromDecimal<4>, Integer.FromDecimal<4>>>(); // $ExpectType [["0b01", "0b11"], ["0b", "0b01"], ["0b11", "0b1"], ["0b1", "0b"]]
test<Problems.NQueens<Integer.FromDecimal<4>, Integer.FromDecimal<3>>>(); // $ExpectType undefined

// tslint:disable-next-line: max-line-length no-irregular-whitespace
// $ExpectType "                                                 ◻️ ♕ ◻️ ◼️                                                  ◼️ ◻️ ◼️ ♕                                                  ♕ ◼️ ◻️ ◼️                                                  ◼️ ◻️ ♕ ◻️                                                  "
test<
  Problems.NQueensVisualized<
    Problems.NQueens<Integer.FromDecimal<4>, Integer.FromDecimal<4>>,
    Integer.FromDecimal<4>
  >
>();
