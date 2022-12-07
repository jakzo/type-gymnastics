import { Integer } from "index";
import {
  IsEqual,
  // Add,
  // And,
  // Decrement,
  // Divide,
  // DivMod,
  // FromBase,
  // FromDecimal,
  // Increment,
  IsGreaterThan,
  IsGreaterThanOrEqual,
  IsLessThan,
  IsLessThanOrEqual,
  // Modulo,
  // Multiply,
  // Nand,
  // Not,
  // Or,
  // ShiftLeft,
  // ShiftRight,
  // Subtract,
  // ToBase,
  // ToDecimal,
  // ToNumber,
  // Xor,
} from "primitives/number";

test<IsEqual<0, 0>>(); // $ExpectType true
test<IsEqual<1, 0>>(); // $ExpectType false
test<IsEqual<0, 1>>(); // $ExpectType false
test<IsEqual<-123, -123>>(); // $ExpectType true
test<IsEqual<-123, 123>>(); // $ExpectType false
test<IsEqual<123, 123>>(); // $ExpectType true
test<IsEqual<"123", 123>>(); // $ExpectType true
test<IsEqual<"123.0", 123>>(); // $ExpectType false
test<IsEqual<123, "123.0">>(); // $ExpectType false
test<IsEqual<"123.0", "123.0">>(); // $ExpectType false
test<IsEqual<123n, 123>>(); // $ExpectType true

test<IsLessThan<0, 0>>(); // $ExpectType false
test<IsLessThan<1, 0>>(); // $ExpectType false
test<IsLessThan<0, 1>>(); // $ExpectType true
test<IsLessThan<1, 1>>(); // $ExpectType false
test<IsLessThan<2, 1>>(); // $ExpectType false
test<IsLessThan<1, 2>>(); // $ExpectType true
test<IsLessThan<1, 9>>(); // $ExpectType true
test<IsLessThan<9, 1>>(); // $ExpectType false
test<IsLessThan<4, 5>>(); // $ExpectType true
test<IsLessThan<5, 4>>(); // $ExpectType false
test<IsLessThan<1, 10>>(); // $ExpectType true
test<IsLessThan<10, 1>>(); // $ExpectType false
test<IsLessThan<2, 10>>(); // $ExpectType true
test<IsLessThan<10, 2>>(); // $ExpectType false
test<IsLessThan<10, 100>>(); // $ExpectType true
test<IsLessThan<100, 10>>(); // $ExpectType false
test<IsLessThan<20, 100>>(); // $ExpectType true
test<IsLessThan<100, 20>>(); // $ExpectType false
test<IsLessThan<6543, 12345>>(); // $ExpectType true
test<IsLessThan<12345, 6543>>(); // $ExpectType false
test<IsLessThan<"6543", "12345">>(); // $ExpectType true
test<IsLessThan<"12345", "6543">>(); // $ExpectType false
test<IsLessThan<1, -1>>(); // $ExpectType false
test<IsLessThan<-1, 1>>(); // $ExpectType true
test<IsLessThan<"0x1", "0x2">>(); // $ExpectType false
test<IsLessThan<"1a", "2a">>(); // $ExpectType false
test<IsLessThan<"1", "23a">>(); // $ExpectType false
test<IsLessThan<"1a", "a">>(); // $ExpectType false
test<IsLessThan<"a", "1a">>(); // $ExpectType false
test<IsLessThan<1e20, 1e21>>(); // $ExpectType false
test<IsLessThan<0.04, 0.05>>(); // $ExpectType true
test<IsLessThan<0.05, 0.04>>(); // $ExpectType false
test<IsLessThan<0.04, 0.005>>(); // $ExpectType false
test<IsLessThan<0.005, 0.04>>(); // $ExpectType true
test<IsLessThan<"0.04", "0.05">>(); // $ExpectType true
test<IsLessThan<"0.05", "0.04">>(); // $ExpectType false
test<IsLessThan<20, 100n>>(); // $ExpectType true
test<IsLessThan<100n, 20>>(); // $ExpectType false

test<IsLessThanOrEqual<43, 45>>(); // $ExpectType true
test<IsLessThanOrEqual<45, 43>>(); // $ExpectType false
test<IsLessThanOrEqual<45, 45>>(); // $ExpectType true
test<IsLessThanOrEqual<45n, 45>>(); // $ExpectType true

test<IsGreaterThan<11, 11>>(); // $ExpectType false
test<IsGreaterThan<34, 36>>(); // $ExpectType false
test<IsGreaterThan<36, 34>>(); // $ExpectType true

test<IsGreaterThanOrEqual<43, 45>>(); // $ExpectType false
test<IsGreaterThanOrEqual<45, 43>>(); // $ExpectType true
test<IsGreaterThanOrEqual<45, 45>>(); // $ExpectType true

// test<Not<"0b">>(); // $ExpectType "0b"
// test<Not<"0b1">>(); // $ExpectType "0b"
// test<Not<"0b01">>(); // $ExpectType "0b1"
// test<Not<"0b11">>(); // $ExpectType "0b"
// test<Not<"0b101">>(); // $ExpectType "0b01"
// test<Not<"0b001">>(); // $ExpectType "0b11"
// test<Not<"0b110100010111101">>(); // $ExpectType "0b00101110100001"

// test<And<"0b", "0b">>(); // $ExpectType "0b"
// test<And<"0b1", "0b">>(); // $ExpectType "0b"
// test<And<"0b01", "0b">>(); // $ExpectType "0b"
// test<And<"0b11", "0b">>(); // $ExpectType "0b"
// test<And<"0b", "0b1">>(); // $ExpectType "0b"
// test<And<"0b1", "0b1">>(); // $ExpectType "0b1"
// test<And<"0b01", "0b1">>(); // $ExpectType "0b"
// test<And<"0b11", "0b1">>(); // $ExpectType "0b1"
// test<And<"0b", "0b01">>(); // $ExpectType "0b"
// test<And<"0b1", "0b01">>(); // $ExpectType "0b"
// test<And<"0b01", "0b01">>(); // $ExpectType "0b01"
// test<And<"0b11", "0b01">>(); // $ExpectType "0b01"
// test<And<"0b", "0b11">>(); // $ExpectType "0b"
// test<And<"0b1", "0b11">>(); // $ExpectType "0b1"
// test<And<"0b01", "0b11">>(); // $ExpectType "0b01"
// test<And<"0b11", "0b11">>(); // $ExpectType "0b11"
// test<And<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b0101000001101"

// test<Nand<"0b", "0b">>(); // $ExpectType "0b"
// test<Nand<"0b1", "0b">>(); // $ExpectType "0b1"
// test<Nand<"0b01", "0b">>(); // $ExpectType "0b11"
// test<Nand<"0b11", "0b">>(); // $ExpectType "0b11"
// test<Nand<"0b", "0b1">>(); // $ExpectType "0b1"
// test<Nand<"0b1", "0b1">>(); // $ExpectType "0b"
// test<Nand<"0b01", "0b1">>(); // $ExpectType "0b11"
// test<Nand<"0b11", "0b1">>(); // $ExpectType "0b01"
// test<Nand<"0b", "0b01">>(); // $ExpectType "0b11"
// test<Nand<"0b1", "0b01">>(); // $ExpectType "0b11"
// test<Nand<"0b01", "0b01">>(); // $ExpectType "0b1"
// test<Nand<"0b11", "0b01">>(); // $ExpectType "0b1"
// test<Nand<"0b", "0b11">>(); // $ExpectType "0b11"
// test<Nand<"0b1", "0b11">>(); // $ExpectType "0b01"
// test<Nand<"0b01", "0b11">>(); // $ExpectType "0b1"
// test<Nand<"0b11", "0b11">>(); // $ExpectType "0b"
// test<Nand<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101011111001011"

// test<Or<"0b", "0b">>(); // $ExpectType "0b"
// test<Or<"0b1", "0b">>(); // $ExpectType "0b1"
// test<Or<"0b01", "0b">>(); // $ExpectType "0b01"
// test<Or<"0b11", "0b">>(); // $ExpectType "0b11"
// test<Or<"0b", "0b1">>(); // $ExpectType "0b1"
// test<Or<"0b1", "0b1">>(); // $ExpectType "0b1"
// test<Or<"0b01", "0b1">>(); // $ExpectType "0b11"
// test<Or<"0b11", "0b1">>(); // $ExpectType "0b11"
// test<Or<"0b", "0b01">>(); // $ExpectType "0b01"
// test<Or<"0b1", "0b01">>(); // $ExpectType "0b11"
// test<Or<"0b01", "0b01">>(); // $ExpectType "0b01"
// test<Or<"0b11", "0b01">>(); // $ExpectType "0b11"
// test<Or<"0b", "0b11">>(); // $ExpectType "0b11"
// test<Or<"0b1", "0b11">>(); // $ExpectType "0b11"
// test<Or<"0b01", "0b11">>(); // $ExpectType "0b11"
// test<Or<"0b11", "0b11">>(); // $ExpectType "0b11"
// test<Or<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b111101011111101"

// test<Xor<"0b", "0b">>(); // $ExpectType "0b"
// test<Xor<"0b1", "0b">>(); // $ExpectType "0b1"
// test<Xor<"0b01", "0b">>(); // $ExpectType "0b01"
// test<Xor<"0b11", "0b">>(); // $ExpectType "0b11"
// test<Xor<"0b", "0b1">>(); // $ExpectType "0b1"
// test<Xor<"0b1", "0b1">>(); // $ExpectType "0b"
// test<Xor<"0b01", "0b1">>(); // $ExpectType "0b11"
// test<Xor<"0b11", "0b1">>(); // $ExpectType "0b01"
// test<Xor<"0b", "0b01">>(); // $ExpectType "0b01"
// test<Xor<"0b1", "0b01">>(); // $ExpectType "0b11"
// test<Xor<"0b01", "0b01">>(); // $ExpectType "0b"
// test<Xor<"0b11", "0b01">>(); // $ExpectType "0b1"
// test<Xor<"0b", "0b11">>(); // $ExpectType "0b11"
// test<Xor<"0b1", "0b11">>(); // $ExpectType "0b01"
// test<Xor<"0b01", "0b11">>(); // $ExpectType "0b1"
// test<Xor<"0b11", "0b11">>(); // $ExpectType "0b"
// test<Xor<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101001011001001"

// test<ShiftLeft<"0b", "0b">>(); // $ExpectType "0b"
// test<ShiftLeft<"0b1", "0b">>(); // $ExpectType "0b1"
// test<ShiftLeft<"0b1", "0b1">>(); // $ExpectType "0b01"
// test<ShiftLeft<"0b1", "0b11">>(); // $ExpectType "0b0001"
// test<ShiftLeft<"0b1101", "0b11">>(); // $ExpectType "0b0001101"

// test<ShiftRight<"0b", "0b">>(); // $ExpectType "0b"
// test<ShiftRight<"0b1", "0b">>(); // $ExpectType "0b1"
// test<ShiftRight<"0b1", "0b1">>(); // $ExpectType "0b"
// test<ShiftRight<"0b1", "0b11">>(); // $ExpectType "0b"
// test<ShiftRight<"0b11101", "0b11">>(); // $ExpectType "0b01"

// test<Add<"0b", "0b">>(); // $ExpectType "0b"
// test<Add<"0b1", "0b">>(); // $ExpectType "0b1"
// test<Add<"0b01", "0b">>(); // $ExpectType "0b01"
// test<Add<"0b11", "0b">>(); // $ExpectType "0b11"
// test<Add<"0b", "0b1">>(); // $ExpectType "0b1"
// test<Add<"0b1", "0b1">>(); // $ExpectType "0b01"
// test<Add<"0b01", "0b1">>(); // $ExpectType "0b11"
// test<Add<"0b11", "0b1">>(); // $ExpectType "0b001"
// test<Add<"0b", "0b01">>(); // $ExpectType "0b01"
// test<Add<"0b1", "0b01">>(); // $ExpectType "0b11"
// test<Add<"0b01", "0b01">>(); // $ExpectType "0b001"
// test<Add<"0b11", "0b01">>(); // $ExpectType "0b101"
// test<Add<"0b", "0b11">>(); // $ExpectType "0b11"
// test<Add<"0b1", "0b11">>(); // $ExpectType "0b001"
// test<Add<"0b01", "0b11">>(); // $ExpectType "0b101"
// test<Add<"0b11", "0b11">>(); // $ExpectType "0b011"
// test<Add<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b100111011010111"

// test<Increment<"0b">>(); // $ExpectType "0b1"
// test<Increment<"0b1">>(); // $ExpectType "0b01"
// test<Increment<"0b01">>(); // $ExpectType "0b11"
// test<Increment<"0b10011101">>(); // $ExpectType "0b01011101"

// test<Subtract<"0b", "0b">>(); // $ExpectType "0b"
// test<Subtract<"0b1", "0b">>(); // $ExpectType "0b1"
// test<Subtract<"0b01", "0b">>(); // $ExpectType "0b01"
// test<Subtract<"0b11", "0b">>(); // $ExpectType "0b11"
// test<Subtract<"0b", "0b1">>(); // $ExpectType "NaN"
// test<Subtract<"0b1", "0b1">>(); // $ExpectType "0b"
// test<Subtract<"0b01", "0b1">>(); // $ExpectType "0b1"
// test<Subtract<"0b11", "0b1">>(); // $ExpectType "0b01"
// test<Subtract<"0b", "0b01">>(); // $ExpectType "NaN"
// test<Subtract<"0b1", "0b01">>(); // $ExpectType "NaN"
// test<Subtract<"0b01", "0b01">>(); // $ExpectType "0b"
// test<Subtract<"0b11", "0b01">>(); // $ExpectType "0b1"
// test<Subtract<"0b11", "0b001">>(); // $ExpectType "NaN"
// test<Subtract<"0b110100010111101", "0b0111010011101">>(); // $ExpectType "0b101110101110001"

// test<Decrement<"0b">>(); // $ExpectType "NaN"
// test<Decrement<"0b1">>(); // $ExpectType "0b"
// test<Decrement<"0b01">>(); // $ExpectType "0b1"
// test<Decrement<"0b11">>(); // $ExpectType "0b01"
// test<Decrement<"0b10011101">>(); // $ExpectType "0b00011101"

// test<Multiply<"0b", "0b">>(); // $ExpectType "0b"
// test<Multiply<"0b1", "0b">>(); // $ExpectType "0b"
// test<Multiply<"0b", "0b1">>(); // $ExpectType "0b"
// test<Multiply<"0b1", "0b1">>(); // $ExpectType "0b1"
// test<Multiply<"0b01", "0b1">>(); // $ExpectType "0b01"
// test<Multiply<"0b1", "0b01">>(); // $ExpectType "0b01"
// test<Multiply<"0b101", "0b1">>(); // $ExpectType "0b101"
// test<Multiply<"0b101", "0b001">>(); // $ExpectType "0b00101"
// test<Multiply<"0b101", "0b111">>(); // $ExpectType "0b110001"

// test<DivMod<"0b", "0b1">>(); // $ExpectType { quotient: "0b"; remainder: "0b"; }
// test<DivMod<"0b1", "0b1">>(); // $ExpectType { quotient: "0b1"; remainder: "0b"; }
// test<DivMod<"0b1", "0b">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
// test<DivMod<"NaN", "0b1">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
// test<DivMod<"0b1", "NaN">>(); // $ExpectType { quotient: "NaN"; remainder: "NaN"; }
// test<DivMod<"0b01", "0b1">>(); // $ExpectType { quotient: "0b01"; remainder: "0b"; }
// test<DivMod<"0b11", "0b111">>(); // $ExpectType { quotient: "0b"; remainder: "0b11"; }
// test<DivMod<"0b1101", "0b1">>(); // $ExpectType { quotient: "0b1101"; remainder: "0b"; }
// test<DivMod<"0b0001", "0b01">>(); // $ExpectType { quotient: "0b001"; remainder: "0b"; }
// test<DivMod<"0b1111", "0b101">>(); // $ExpectType { quotient: "0b11"; remainder: "0b"; }
// test<DivMod<"0b1111", "0b001">>(); // $ExpectType { quotient: "0b11"; remainder: "0b11"; }
// test<DivMod<"0b10011100000011", "0b1100001">>(); // $ExpectType { quotient: "0b00011101"; remainder: "0b10001"; }

// test<Divide<"0b10011100000011", "0b1100001">>(); // $ExpectType "0b00011101"

// test<Modulo<"0b10011100000011", "0b1100001">>(); // $ExpectType "0b10001"

// test<ToBase<"0b10011100000011", "0b001001">>(); // $ExpectType "9IX"

// test<FromBase<"9IX", "0b001001">>(); // $ExpectType "0b10011100000011"

// test<FromDecimal<0>>(); // $ExpectType "0b"
// test<FromDecimal<1>>(); // $ExpectType "0b1"
// test<FromDecimal<2>>(); // $ExpectType "0b01"
// test<FromDecimal<3>>(); // $ExpectType "0b11"
// test<FromDecimal<4>>(); // $ExpectType "0b001"
// test<FromDecimal<5>>(); // $ExpectType "0b101"
// test<FromDecimal<9>>(); // $ExpectType "0b1001"
// test<FromDecimal<10>>(); // $ExpectType "0b0101"
// test<FromDecimal<12345>>(); // $ExpectType "0b10011100000011"
// test<FromDecimal<"12345">>(); // $ExpectType "0b10011100000011"

// test<ToDecimal<"0b">>(); // $ExpectType "0"
// test<ToDecimal<"0b1">>(); // $ExpectType "1"
// test<ToDecimal<"0b01">>(); // $ExpectType "2"
// test<ToDecimal<"0b11">>(); // $ExpectType "3"
// test<ToDecimal<"0b001">>(); // $ExpectType "4"
// test<ToDecimal<"0b101">>(); // $ExpectType "5"
// test<ToDecimal<"0b1001">>(); // $ExpectType "9"
// test<ToDecimal<"0b0101">>(); // $ExpectType "10"
// test<ToDecimal<"0b10011100000011">>(); // $ExpectType "12345"

// test<ToNumber<"0b">>(); // $ExpectType 0
// test<ToNumber<"0b1">>(); // $ExpectType 1
// test<ToNumber<"0b01">>(); // $ExpectType 2
// test<ToNumber<"0b11">>(); // $ExpectType 3
// test<ToNumber<"0b001">>(); // $ExpectType 4
// test<ToNumber<"0b101">>(); // $ExpectType 5
// test<ToNumber<"0b1001">>(); // $ExpectType 9
// test<ToNumber<"0b0101">>(); // $ExpectType 10
// test<ToNumber<"0b10011100000011">>(); // $ExpectType 12345
