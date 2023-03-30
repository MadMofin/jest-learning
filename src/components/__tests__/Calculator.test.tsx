import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import {
  divide,
  getRandomFloat,
  getRandomInt,
  multiply,
  substract,
  sum,
} from "../../utils/mathOperations";

let valueA: number;
let valueB: number;

describe("with decimals", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomInt(10);
      valueB = getRandomInt(10);
    });

    it("sum", () => {
      render(<App />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });

      const suma = sum(valueA, valueB);

      expect(suma).toBe(valueA + valueB);
    });
  });
});

describe("with floats", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomFloat(10);
      valueB = getRandomFloat(10);
    });

    it("sum", () => {
      render(<App />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });

      const suma = sum(valueA, valueB);

      expect(suma).toBe(valueA + valueB);
    });
  });
});
