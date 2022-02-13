import { Integer } from "primitives/integer";

test<Integer.IsLessThan<"0b", "0b">>(); // $ExpectType false
test<Integer.IsLessThan<"0b1", "0b">>(); // $ExpectType false
test<Integer.IsLessThan<"0b", "0b1">>(); // $ExpectType true
test<Integer.IsLessThan<"0b1", "0b1">>(); // $ExpectType false
test<Integer.IsLessThan<"0b01", "0b1">>(); // $ExpectType false
test<Integer.IsLessThan<"0b1", "0b01">>(); // $ExpectType true
test<Integer.IsLessThan<"0b0001", "0b0001">>(); // $ExpectType false
test<Integer.IsLessThan<"0b00001", "0b0001">>(); // $ExpectType false
test<Integer.IsLessThan<"0b0001", "0b00001">>(); // $ExpectType true
test<Integer.IsLessThan<"0b010001", "0b001001">>(); // $ExpectType true
test<Integer.IsLessThan<"0b001001", "0b010001">>(); // $ExpectType false
test<Integer.IsLessThan<"0b110101", "0b101101">>(); // $ExpectType true
test<Integer.IsLessThan<"0b101101", "0b110101">>(); // $ExpectType false

test<Integer.IsLessThanOrEqual<"0b110101", "0b101101">>(); // $ExpectType true
test<Integer.IsLessThanOrEqual<"0b101101", "0b110101">>(); // $ExpectType false
test<Integer.IsLessThanOrEqual<"0b101101", "0b101101">>(); // $ExpectType true

test<Integer.IsGreaterThan<"0b1101", "0b1101">>(); // $ExpectType false
test<Integer.IsGreaterThan<"0b010001", "0b001001">>(); // $ExpectType false
test<Integer.IsGreaterThan<"0b001001", "0b010001">>(); // $ExpectType true

test<Integer.IsGreaterThanOrEqual<"0b110101", "0b101101">>(); // $ExpectType false
test<Integer.IsGreaterThanOrEqual<"0b101101", "0b110101">>(); // $ExpectType true
test<Integer.IsGreaterThanOrEqual<"0b101101", "0b101101">>(); // $ExpectType true

test<Integer.Not<"0b">>(); // $ExpectType "0b"
test<Integer.Not<"0b1">>(); // $ExpectType "0b"
test<Integer.Not<"0b01">>(); // $ExpectType "0b1"
test<Integer.Not<"0b11">>(); // $ExpectType "0b"
test<Integer.Not<"0b101">>(); // $ExpectType "0b01"
test<Integer.Not<"0b001">>(); // $ExpectType "0b11"
test<Integer.Not<"0b110100010111101">>(); // $ExpectType "0b00101110100001"

test<Integer.And<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.And<"0b1", "0b">>(); // $ExpectType "0b"
test<Integer.And<"0b01", "0b">>(); // $ExpectType "0b"
test<Integer.And<"0b11", "0b">>(); // $ExpectType "0b"
test<Integer.And<"0b", "0b1">>(); // $ExpectType "0b"
test<Integer.And<"0b1", "0b1">>(); // $ExpectType "0b1"
test<Integer.And<"0b01", "0b1">>(); // $ExpectType "0b"
test<Integer.And<"0b11", "0b1">>(); // $ExpectType "0b1"
test<Integer.And<"0b", "0b01">>(); // $ExpectType "0b"
test<Integer.And<"0b1", "0b01">>(); // $ExpectType "0b"
test<Integer.And<"0b01", "0b01">>(); // $ExpectType "0b01"
test<Integer.And<"0b11", "0b01">>(); // $ExpectType "0b01"
test<Integer.And<"0b", "0b11">>(); // $ExpectType "0b"
test<Integer.And<"0b1", "0b11">>(); // $ExpectType "0b1"
test<Integer.And<"0b01", "0b11">>(); // $ExpectType "0b01"
test<Integer.And<"0b11", "0b11">>(); // $ExpectType "0b11"
test<Integer.And<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b0101000001101"

test<Integer.Nand<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Nand<"0b1", "0b">>(); // $ExpectType "0b1"
test<Integer.Nand<"0b01", "0b">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b11", "0b">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b", "0b1">>(); // $ExpectType "0b1"
test<Integer.Nand<"0b1", "0b1">>(); // $ExpectType "0b"
test<Integer.Nand<"0b01", "0b1">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b11", "0b1">>(); // $ExpectType "0b01"
test<Integer.Nand<"0b", "0b01">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b1", "0b01">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b01", "0b01">>(); // $ExpectType "0b1"
test<Integer.Nand<"0b11", "0b01">>(); // $ExpectType "0b1"
test<Integer.Nand<"0b", "0b11">>(); // $ExpectType "0b11"
test<Integer.Nand<"0b1", "0b11">>(); // $ExpectType "0b01"
test<Integer.Nand<"0b01", "0b11">>(); // $ExpectType "0b1"
test<Integer.Nand<"0b11", "0b11">>(); // $ExpectType "0b"
test<Integer.Nand<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101011111001011"

test<Integer.Or<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Or<"0b1", "0b">>(); // $ExpectType "0b1"
test<Integer.Or<"0b01", "0b">>(); // $ExpectType "0b01"
test<Integer.Or<"0b11", "0b">>(); // $ExpectType "0b11"
test<Integer.Or<"0b", "0b1">>(); // $ExpectType "0b1"
test<Integer.Or<"0b1", "0b1">>(); // $ExpectType "0b1"
test<Integer.Or<"0b01", "0b1">>(); // $ExpectType "0b11"
test<Integer.Or<"0b11", "0b1">>(); // $ExpectType "0b11"
test<Integer.Or<"0b", "0b01">>(); // $ExpectType "0b01"
test<Integer.Or<"0b1", "0b01">>(); // $ExpectType "0b11"
test<Integer.Or<"0b01", "0b01">>(); // $ExpectType "0b01"
test<Integer.Or<"0b11", "0b01">>(); // $ExpectType "0b11"
test<Integer.Or<"0b", "0b11">>(); // $ExpectType "0b11"
test<Integer.Or<"0b1", "0b11">>(); // $ExpectType "0b11"
test<Integer.Or<"0b01", "0b11">>(); // $ExpectType "0b11"
test<Integer.Or<"0b11", "0b11">>(); // $ExpectType "0b11"
test<Integer.Or<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b111101011111101"

test<Integer.Xor<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Xor<"0b1", "0b">>(); // $ExpectType "0b1"
test<Integer.Xor<"0b01", "0b">>(); // $ExpectType "0b01"
test<Integer.Xor<"0b11", "0b">>(); // $ExpectType "0b11"
test<Integer.Xor<"0b", "0b1">>(); // $ExpectType "0b1"
test<Integer.Xor<"0b1", "0b1">>(); // $ExpectType "0b"
test<Integer.Xor<"0b01", "0b1">>(); // $ExpectType "0b11"
test<Integer.Xor<"0b11", "0b1">>(); // $ExpectType "0b01"
test<Integer.Xor<"0b", "0b01">>(); // $ExpectType "0b01"
test<Integer.Xor<"0b1", "0b01">>(); // $ExpectType "0b11"
test<Integer.Xor<"0b01", "0b01">>(); // $ExpectType "0b"
test<Integer.Xor<"0b11", "0b01">>(); // $ExpectType "0b1"
test<Integer.Xor<"0b", "0b11">>(); // $ExpectType "0b11"
test<Integer.Xor<"0b1", "0b11">>(); // $ExpectType "0b01"
test<Integer.Xor<"0b01", "0b11">>(); // $ExpectType "0b1"
test<Integer.Xor<"0b11", "0b11">>(); // $ExpectType "0b"
test<Integer.Xor<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101001011001001"

test<Integer.Add<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Add<"0b1", "0b">>(); // $ExpectType "0b1"
test<Integer.Add<"0b01", "0b">>(); // $ExpectType "0b01"
test<Integer.Add<"0b11", "0b">>(); // $ExpectType "0b11"
test<Integer.Add<"0b", "0b1">>(); // $ExpectType "0b1"
test<Integer.Add<"0b1", "0b1">>(); // $ExpectType "0b01"
test<Integer.Add<"0b01", "0b1">>(); // $ExpectType "0b11"
test<Integer.Add<"0b11", "0b1">>(); // $ExpectType "0b001"
test<Integer.Add<"0b", "0b01">>(); // $ExpectType "0b01"
test<Integer.Add<"0b1", "0b01">>(); // $ExpectType "0b11"
test<Integer.Add<"0b01", "0b01">>(); // $ExpectType "0b001"
test<Integer.Add<"0b11", "0b01">>(); // $ExpectType "0b101"
test<Integer.Add<"0b", "0b11">>(); // $ExpectType "0b11"
test<Integer.Add<"0b1", "0b11">>(); // $ExpectType "0b001"
test<Integer.Add<"0b01", "0b11">>(); // $ExpectType "0b101"
test<Integer.Add<"0b11", "0b11">>(); // $ExpectType "0b011"
test<Integer.Add<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b100111011010111"

test<Integer.Increment<"0b">>(); // $ExpectType "0b1"
test<Integer.Increment<"0b1">>(); // $ExpectType "0b01"
test<Integer.Increment<"0b01">>(); // $ExpectType "0b11"
test<Integer.Increment<"0b10011101">>(); // $ExpectType "0b01011101"

test<Integer.Subtract<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Subtract<"0b1", "0b">>(); // $ExpectType "0b1"
test<Integer.Subtract<"0b01", "0b">>(); // $ExpectType "0b01"
test<Integer.Subtract<"0b11", "0b">>(); // $ExpectType "0b11"
test<Integer.Subtract<"0b", "0b1">>(); // $ExpectType "NaN"
test<Integer.Subtract<"0b1", "0b1">>(); // $ExpectType "0b"
test<Integer.Subtract<"0b01", "0b1">>(); // $ExpectType "0b1"
test<Integer.Subtract<"0b11", "0b1">>(); // $ExpectType "0b01"
test<Integer.Subtract<"0b", "0b01">>(); // $ExpectType "NaN"
test<Integer.Subtract<"0b1", "0b01">>(); // $ExpectType "NaN"
test<Integer.Subtract<"0b01", "0b01">>(); // $ExpectType "0b"
test<Integer.Subtract<"0b11", "0b01">>(); // $ExpectType "0b1"
test<Integer.Subtract<"0b11", "0b001">>(); // $ExpectType "NaN"
test<Integer.Subtract<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101110101110001"

test<Integer.Decrement<"0b">>(); // $ExpectType "NaN"
test<Integer.Decrement<"0b1">>(); // $ExpectType "0b"
test<Integer.Decrement<"0b01">>(); // $ExpectType "0b1"
test<Integer.Decrement<"0b11">>(); // $ExpectType "0b01"
test<Integer.Decrement<"0b10011101">>(); // $ExpectType "0b00011101"

test<Integer.Multiply<"0b", "0b">>(); // $ExpectType "0b"
test<Integer.Multiply<"0b1", "0b">>(); // $ExpectType "0b"
test<Integer.Multiply<"0b", "0b1">>(); // $ExpectType "0b"
test<Integer.Multiply<"0b1", "0b1">>(); // $ExpectType "0b1"
test<Integer.Multiply<"0b01", "0b1">>(); // $ExpectType "0b01"
test<Integer.Multiply<"0b1", "0b01">>(); // $ExpectType "0b01"
test<Integer.Multiply<"0b101", "0b1">>(); // $ExpectType "0b101"
test<Integer.Multiply<"0b101", "0b001">>(); // $ExpectType "0b00101"
test<Integer.Multiply<"0b101", "0b111">>(); // $ExpectType "0b110001"

test<Integer.DivMod<"0b", "0b1">>(); // $ExpectType { quotient: "0b"; remainder: "0b"; }
test<Integer.DivMod<"0b1", "0b1">>(); // $ExpectType { quotient: "0b1"; remainder: "0b"; }
test<Integer.DivMod<"0b1", "0b">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
test<Integer.DivMod<"NaN", "0b1">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
test<Integer.DivMod<"0b1", "NaN">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
test<Integer.DivMod<"0b01", "0b1">>(); // $ExpectType { quotient: "0b01"; remainder: "0b"; }
test<Integer.DivMod<"0b11", "0b111">>(); // $ExpectType { quotient: "0b"; remainder: "0b11"; }
test<Integer.DivMod<"0b1101", "0b1">>(); // $ExpectType { quotient: "0b1101"; remainder: "0b"; }
test<Integer.DivMod<"0b0001", "0b01">>(); // $ExpectType { quotient: "0b001"; remainder: "0b"; }
test<Integer.DivMod<"0b1111", "0b101">>(); // $ExpectType { quotient: "0b11"; remainder: "0b"; }
test<Integer.DivMod<"0b1111", "0b001">>(); // $ExpectType { quotient: "0b11"; remainder: "0b11"; }
test<Integer.DivMod<"0b10011100000011", "0b1100001">>(); // $ExpectType { quotient: "0b00011101"; remainder: "0b10001"; }

test<Integer.Divide<"0b10011100000011", "0b1100001">>(); // $ExpectType "0b00011101"

test<Integer.Modulo<"0b10011100000011", "0b1100001">>(); // $ExpectType "0b10001"

test<Integer.ToBase<"0b10011100000011", "0b001001">>(); // $ExpectType "9IX"

test<Integer.FromBase<"9IX", "0b001001">>(); // $ExpectType "0b10011100000011"

test<Integer.FromDecimal<0>>(); // $ExpectType "0b"
test<Integer.FromDecimal<1>>(); // $ExpectType "0b1"
test<Integer.FromDecimal<2>>(); // $ExpectType "0b01"
test<Integer.FromDecimal<3>>(); // $ExpectType "0b11"
test<Integer.FromDecimal<4>>(); // $ExpectType "0b001"
test<Integer.FromDecimal<5>>(); // $ExpectType "0b101"
test<Integer.FromDecimal<9>>(); // $ExpectType "0b1001"
test<Integer.FromDecimal<10>>(); // $ExpectType "0b0101"
test<Integer.FromDecimal<12345>>(); // $ExpectType "0b10011100000011"
test<Integer.FromDecimal<"12345">>(); // $ExpectType "0b10011100000011"

test<Integer.ToDecimal<"0b">>(); // $ExpectType "0"
test<Integer.ToDecimal<"0b1">>(); // $ExpectType "1"
test<Integer.ToDecimal<"0b01">>(); // $ExpectType "2"
test<Integer.ToDecimal<"0b11">>(); // $ExpectType "3"
test<Integer.ToDecimal<"0b001">>(); // $ExpectType "4"
test<Integer.ToDecimal<"0b101">>(); // $ExpectType "5"
test<Integer.ToDecimal<"0b1001">>(); // $ExpectType "9"
test<Integer.ToDecimal<"0b0101">>(); // $ExpectType "10"
test<Integer.ToDecimal<"0b10011100000011">>(); // $ExpectType "12345"
