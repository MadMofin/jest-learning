import {
  sum,
  getRandomInt,
  multiply,
  divide,
  substract,
} from "../mathOperations";

it("sum two random numbers", () => {
  let a = getRandomInt(10);
  let b = getRandomInt(10);

  const result = sum(a, b);
  expect(result).toBe(a + b);
});

it("substract two random numbers", () => {
  let a = getRandomInt(10);
  let b = getRandomInt(10);

  const result = substract(a, b);
  expect(result).toBe(a - b);
});

it("multiply two random numbers", () => {
  let a = getRandomInt(10);
  let b = getRandomInt(10);

  const result = multiply(a, b);
  expect(result).toBe(a * b);
});

it("divide by 0", () => {
  let a = getRandomInt(10);
  let b = 0;

  expect(() => {
    divide(a, b);
  }).toThrowError("You cant divide by 0 :(");
});
