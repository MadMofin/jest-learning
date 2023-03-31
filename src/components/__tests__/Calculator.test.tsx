import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import {
  divide,
  getRandomCharacter,
  getRandomFloat,
  getRandomInt,
  multiply,
  substract,
  sum,
} from "../../utils/mathOperations";
import { Calculator } from "../Calculator";

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

describe("with integers", () => {
  describe("successfully", () => {
    beforeEach(() => {
      valueA = getRandomInt(9) + 1;
      valueB = getRandomInt(9) + 1;
    });

    it("renders sum", () => {
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
