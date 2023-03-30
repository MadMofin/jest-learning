import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import {
  divide,
  getRandomFloat,
  getRandomInt,
  multiply,
  substract,
  sum,
} from "../../utils/mathOperations";

it("all in screen", () => {
  render(<App />);

  const calculator = screen.getByTestId("calculator");

  const a = screen.getByTestId("a");
  const b = screen.getByTestId("b");
  const result = screen.getByTestId("result");

  expect(a).toBeInTheDocument();
  expect(b).toBeInTheDocument();
  expect(result).toBeInTheDocument();
  expect(calculator).toBeInTheDocument();
});

let valueA: number;
let valueB: number;

describe("with decimals", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomFloat(9) + 1;
      valueB = getRandomFloat(9) + 1;
    });

    it("sum", () => {
      render(<App />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });

      expect(sum(valueA, valueB)).toBe(valueA + valueB);
    });
  });
});

describe("with integers", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomInt(9) + 1;
      valueB = getRandomInt(9) + 1;
    });

    it("sum", () => {
      render(<App />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });

      expect(sum(valueA, valueB)).toBe(valueA + valueB);
    });
  });
});

it("substract operation", () => {
  render(<App />);

  const a = screen.getByTestId("a");
  const b = screen.getByTestId("b");

  const valueA = getRandomInt(10);
  const valueB = getRandomInt(10);

  fireEvent.change(a, { target: { value: valueA } });
  fireEvent.change(b, { target: { value: valueB } });

  const resta = substract(valueA, valueB);

  expect(resta).toBe(valueA - valueB);
});

it("multiply operation", () => {
  render(<App />);

  const a = screen.getByTestId("a");
  const b = screen.getByTestId("b");

  const valueA = getRandomInt(10);
  const valueB = getRandomInt(10);

  fireEvent.change(a, { target: { value: valueA } });
  fireEvent.change(b, { target: { value: valueB } });

  const multiplicacion = multiply(valueA, valueB);

  expect(multiplicacion).toBe(valueA * valueB);
});

it("divide operation", () => {
  render(<App />);

  const a = screen.getByTestId("a");
  const b = screen.getByTestId("b");

  const valueA = getRandomInt(10);
  const valueB = getRandomInt(10);

  fireEvent.change(a, { target: { value: valueA } });
  fireEvent.change(b, { target: { value: valueB } });

  const division = divide(valueA, valueB);

  expect(division).toBe(valueA / valueB);
});

it("divide by 0 operation", () => {
  render(<App />);

  const a = screen.getByTestId("a");

  const valueA = getRandomInt(10);

  fireEvent.change(a, { target: { value: valueA } });

  expect(() => {
    divide(valueA, 0);
  }).toThrowError("You cant divide by 0 :(");
});
