import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import {
  divide,
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

it("sum operation", () => {
  render(<App />);

  const a = screen.getByTestId("a");
  const b = screen.getByTestId("b");

  const valueA = getRandomInt(10);
  const valueB = getRandomInt(10);

  fireEvent.change(a, { target: { value: valueA } });
  fireEvent.change(b, { target: { value: valueB } });

  const suma = sum(valueA, valueB);

  expect(suma).toBe(valueA + valueB);
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
