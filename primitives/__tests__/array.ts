import {
  Chunked,
  Create,
  MapIntToNum,
  MapNumToInt,
  Max,
  Reverse,
  Slice,
  MergeSort,
  SplitAt,
  Sum,
  SumBinary,
  BubbleSort,
  _ArrOfLen,
  MaxIndex,
} from "primitives/array";
import { FromDecimal } from "primitives/integer";

test<Create<[2, 3], 1>>(); // $ExpectType [[1, 1, 1], [1, 1, 1]]

test<Max<[1]>>(); // $ExpectType 1
test<Max<[7, 4, 9, 5]>>(); // $ExpectType 9
test<Max<[23, 111, 3]>>(); // $ExpectType 111

test<MaxIndex<[1]>>(); // $ExpectType 0
test<MaxIndex<[7, 4, 9, 5]>>(); // $ExpectType 2
test<MaxIndex<[23, 111, 3]>>(); // $ExpectType 1

test<MapNumToInt<[1, 2, 3]>>(); // $ExpectType ["0b1", "0b01", "0b11"]

test<MapIntToNum<["0b1", "0b01", "0b11"]>>(); // $ExpectType [1, 2, 3]

test<Sum<[1, 2, 3]>>(); // $ExpectType 6

test<SumBinary<[1, 2, 3]>>(); // $ExpectType 6

test<SplitAt<[1, 2, 3, 4, 5], 2>>(); // $ExpectType [[1, 2], [3, 4, 5]]
test<SplitAt<[], 0>>(); // $ExpectType [[], []]
test<SplitAt<[1, 2], 0>>(); // $ExpectType [[], [1, 2]]
test<SplitAt<[1, 2], 5>>(); // $ExpectType [[1, 2], []]

test<BubbleSort<[]>>(); // $ExpectType []
test<BubbleSort<[1]>>(); // $ExpectType [1]
test<BubbleSort<[1, 2]>>(); // $ExpectType [1, 2]
test<BubbleSort<[2, 1]>>(); // $ExpectType [1, 2]
test<BubbleSort<[5, 3, 8, 2, 4, 1, 5, 9, 6]>>(); // $ExpectType [1, 2, 3, 4, 5, 5, 6, 8, 9]

test<MergeSort<[]>>(); // $ExpectType []
test<MergeSort<[1]>>(); // $ExpectType [1]
test<MergeSort<[1, 2]>>(); // $ExpectType [1, 2]
test<MergeSort<[2, 1]>>(); // $ExpectType [1, 2]
test<MergeSort<[5, 3, 8, 2, 4, 1, 5, 9, 6]>>(); // $ExpectType [1, 2, 3, 4, 5, 5, 6, 8, 9]

test<Slice<[1, 2, 3, 4, 5], 0, 2>>(); // $ExpectType [1, 2]
test<Slice<[1, 2, 3, 4, 5], 3, 2>>(); // $ExpectType [4, 5]
test<Slice<[1, 2, 3, 4, 5], 3>>(); // $ExpectType [4, 5]
test<Slice<[1, 2, 3, 4, 5], 3, 0>>(); // $ExpectType []

test<Reverse<[1, 2, 3]>>(); // $ExpectType [3, 2, 1]

test<Chunked<[1, 2, 3, 4, 5], 2>>(); // $ExpectType [[1, 2], [3, 4], [5]]
test<Chunked<[], 2>>(); // $ExpectType []
test<Chunked<[1], 2>>(); // $ExpectType [[1]]
