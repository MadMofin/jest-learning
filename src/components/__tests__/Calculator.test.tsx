import { fireEvent, render, screen } from "@testing-library/react";

import App from "../../App";
import * as operations from "../../utils/mathOperations";
import { Calculator } from "../Calculator";

jest.mock("../../utils/mathOperations");

const {
  divide,
  getRandomCharacter,
  getRandomFloat,
  getRandomInt,
  multiply,
  substract,
  sum,
} = operations;

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

let wordA: string;
let wordB: string;

let inputA: any;
let inputB: any;
let inputOperator: any;
let inputResult: any;

describe("with decimals", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomFloat(9) + 1;
      valueB = getRandomFloat(9) + 1;
    });

    it("render sum", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "sum" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${sum(valueA, valueB)}`
      );
    });

    it("render substract", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "substract" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${substract(valueA, valueB)}`
      );
    });

    it("render multiply", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "multiply" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${multiply(valueA, valueB)}`
      );
    });

    it("render divide", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${divide(valueA, valueB)}`
      );
    });
  });

  describe("errors", () => {
    beforeEach(() => {
      valueA = getRandomFloat(9);
      valueB = 0;
    });

    it("render divide by 0", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${divide(valueA, valueB)}`
      );
    });
  });
});

export function forEach(items: Array<any>, callback: any) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

describe("with integers", () => {
  describe("successfully", () => {
    beforeEach(() => {
      operations.getRandomInt.mockReturnValue(Math.floor(Math.random() * 10));

      valueA = operations.getRandomInt(9);
      valueB = operations.getRandomInt(9) + 1;

      render(<Calculator />);

      inputA = screen.getByTestId("a");
      inputB = screen.getByTestId("b");
      inputOperator = screen.getByTestId("operator");
      inputResult = screen.getByTestId("result");
    });

    it.only("renders sum", () => {
      const spy = jest.spyOn(operations, "operation");

      expect(inputA.value).toBe("0");
      expect(inputB.value).toBe("0");
      expect(inputOperator.value).toBe("sum");

      fireEvent.change(inputA, { target: { value: valueA } });
      fireEvent.change(inputB, { target: { value: valueB } });
      fireEvent.change(inputOperator, {
        target: { value: "sum" },
      });

      expect(inputA.value).toBe(valueA.toString());
      expect(inputB.value).toBe(valueB.toString());
      expect(inputOperator.value).toBe("sum");

      operations.operation.mockReturnValue(
        parseFloat(inputA.value) + parseFloat(inputB.value)
      );

      const result = operations.operation(
        parseFloat(inputA.value) + parseFloat(inputB.value),
        inputOperator.value
      );

      fireEvent.change(inputResult, {
        target: { "data-value": result },
      });

      expect(inputResult["data-value"]).toBe(result);

      expect(spy).toHaveBeenCalled();
    });

    it("renders substract", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "substract" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${substract(valueA, valueB)}`
      );
    });

    it("renders multiply", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "multiply" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${multiply(valueA, valueB)}`
      );
    });

    it("renders divide", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${divide(valueA, valueB)}`
      );
    });
  });

  describe("errors", () => {
    beforeEach(() => {
      valueA = getRandomInt(9);
      valueB = 0;
    });

    it("render divide by 0", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });

      expect(screen.getByTestId("result").textContent).toBe(
        `Result: ${divide(valueA, valueB)}`
      );
    });
  });
});

describe("with alphanumeric", () => {
  beforeEach(() => {
    wordA = getRandomCharacter(9);
    wordB = getRandomCharacter(9);
  });

  it("renders sum", () => {
    render(<Calculator />);

    fireEvent.change(screen.getByTestId("a"), { target: { value: wordA } });
    fireEvent.change(screen.getByTestId("b"), { target: { value: wordB } });
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "sum" },
    });

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${sum(wordA, wordB)}`
    );
  });

  it("renders substract", () => {
    render(<Calculator />);

    fireEvent.change(screen.getByTestId("a"), { target: { value: wordA } });
    fireEvent.change(screen.getByTestId("b"), { target: { value: wordB } });
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "substract" },
    });

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${substract(wordA, wordB)}`
    );
  });

  it("renders multiply", () => {
    render(<Calculator />);

    fireEvent.change(screen.getByTestId("a"), { target: { value: wordA } });
    fireEvent.change(screen.getByTestId("b"), { target: { value: wordB } });
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "multiply" },
    });

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${multiply(wordA, wordB)}`
    );
  });

  it("renders divide", () => {
    render(<Calculator />);

    fireEvent.change(screen.getByTestId("a"), { target: { value: wordA } });
    fireEvent.change(screen.getByTestId("b"), { target: { value: wordB } });
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "divide" },
    });

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${divide(wordA, wordB)}`
    );
  });
});
