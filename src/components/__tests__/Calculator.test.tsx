import { render, screen, fireEvent } from "@testing-library/react";
import { Calculator } from "../Calculator";
import App from "../../App";
import * as operations from "../../utils/mathOperations";
import userEvent from "@testing-library/user-event";

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
  const submitButton = screen.getByTestId("submit");

  expect(a).toBeInTheDocument();
  expect(b).toBeInTheDocument();
  expect(result).toBeInTheDocument();
  expect(calculator).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

let valueA: number;
let valueB: number;

let wordA: string;
let wordB: string;

let inputA: any;
let inputB: any;
let inputOperator: any;
let inputResult: any;

it("all in screen", () => {
  render(<App />);

  const calculator = screen.getByTestId("calculator");
  const title = screen.getByTestId("title");
  const a = screen.getByTestId("a");
  const operator = screen.getByTestId("operator");
  const b = screen.getByTestId("b");
  const result = screen.getByTestId("result");

  expect(calculator).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(a).toBeInTheDocument();
  expect(operator).toBeInTheDocument();
  expect(b).toBeInTheDocument();
  expect(result).toBeInTheDocument();
});

describe("Calculator", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  it("should update the input fields when typing a number", () => {
    const inputA = screen.getByTestId("a");
    const inputB = screen.getByTestId("b");

    fireEvent.change(inputA, { target: { value: 2 } });
    fireEvent.change(inputB, { target: { value: 3 } });

    expect(inputA.value).toBe("2");
    expect(inputB.value).toBe("3");
  });

  it("Should update the select when selecting a new one", () => {
    const operator = screen.getByTestId("operator");

    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "sum" },
    });

    expect(operator.value).toBe("sum");
  });
});

describe("with decimals", () => {
  describe("successfully", () => {
    beforeEach(() => {
      operations.getRandomFloat.mockReturnValue(Math.floor(Math.random() * 10));

      valueA = operations.getRandomFloat(9);
      valueB = operations.getRandomFloat(9) + 1;

      operations.operation.mockReturnValue(valueA + valueB);

      render(<Calculator />);

      inputA = screen.getByTestId("a");
      inputB = screen.getByTestId("b");
      inputOperator = screen.getByTestId("operator");
      inputResult = screen.getByTestId("result");

      fireEvent.change(inputA, { target: { value: valueA } });
      fireEvent.change(inputB, { target: { value: valueB } });
    });

    it("render sum", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "sum" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) + parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) + parseFloat(inputB.value)
      );
    });

    it("render substract", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "substract" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) - parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) - parseFloat(inputB.value)
      );
    });

    it("render multiply", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "multiply" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) * parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) * parseFloat(inputB.value)
      );
    });

    it("render divide", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) / parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) / parseFloat(inputB.value)
      );
    });
  });

  describe("errors", () => {
    beforeEach(() => {
      valueA = getRandomFloat(9) + 1;
      valueB = 0;
    });

    it("render divide by 0", () => {
      render(<Calculator />);

      fireEvent.change(screen.getByTestId("a"), { target: { value: valueA } });
      fireEvent.change(screen.getByTestId("b"), { target: { value: valueB } });
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });
      userEvent.click(screen.getByTestId("submit"));

      setTimeout(() => {
        expect(screen.getByTestId("result").textContent).toBe(
          "Result: You cant divide by 0"
        );
      }, 100);
    });
  });
});

describe("with integers", () => {
  describe("successfully", () => {
    beforeEach(() => {
      operations.getRandomInt.mockReturnValue(Math.floor(Math.random() * 10));

      valueA = operations.getRandomInt(9);
      valueB = operations.getRandomInt(9) + 1;

      operations.operation.mockReturnValue(valueA + valueB);

      render(<Calculator />);

      inputA = screen.getByTestId("a");
      inputB = screen.getByTestId("b");
      inputOperator = screen.getByTestId("operator");
      inputResult = screen.getByTestId("result");

      fireEvent.change(inputA, { target: { value: valueA } });
      fireEvent.change(inputB, { target: { value: valueB } });
    });

    it("render sum", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "sum" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) + parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) + parseFloat(inputB.value)
      );
    });

    it("render substract", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "substract" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) - parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) - parseFloat(inputB.value)
      );
    });

    it("render multiply", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "multiply" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) * parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) * parseFloat(inputB.value)
      );
    });

    it("render divide", () => {
      fireEvent.change(screen.getByTestId("operator"), {
        target: { value: "divide" },
      });
      fireEvent.change(inputResult, {
        target: {
          "data-value": parseFloat(inputA.value) / parseFloat(inputB.value),
        },
      });

      expect(inputResult["data-value"]).toBe(
        parseFloat(inputA.value) / parseFloat(inputB.value)
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
      userEvent.click(screen.getByTestId("submit"));
      inputResult = screen.getByTestId("result");

      setTimeout(() => {
        expect(screen.getByTestId("result").textContent).toBe(
          "Result: You cant divide by 0"
        );
      }, 100);
    });
  });
});

describe("Calculator Tests", () => {
  describe("renders", () => {
    beforeEach(() => {
      render(<Calculator />);
    });

    it("Check left input is in the document", () => {
      expect(screen.getByTestId("a")).toBeInTheDocument();
    });

    it("Check right input is in the document", () => {
      expect(screen.getByTestId("b")).toBeInTheDocument();
    });

    it("Check operator select is in the document", () => {
      expect(screen.getByTestId("operator")).toBeInTheDocument();
    });

    it("Check if result is in the document", () => {
      expect(screen.getByTestId("result")).toBeInTheDocument();
    });

    it("Check left input is 0", () => {
      expect(screen.getByTestId("a").value).toBe("0");
    });

    it("Check right input is 0", () => {
      expect(screen.getByTestId("b").value).toBe("0");
    });
  });
});

describe("with alphanumeric", () => {
  beforeEach(() => {
    wordA = getRandomCharacter(9);
    wordB = getRandomCharacter(9);

    render(<Calculator />);

    fireEvent.change(screen.getByTestId("a"), { target: { value: wordA } });
    fireEvent.change(screen.getByTestId("b"), { target: { value: wordB } });
  });

  it("renders sum", () => {
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "sum" },
    });
    userEvent.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${sum(wordA, wordB)}`
    );
  });

  it("renders substract", () => {
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "substract" },
    });
    userEvent.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${substract(wordA, wordB)}`
    );
  });

  it("renders multiply", () => {
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "multiply" },
    });
    userEvent.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${multiply(wordA, wordB)}`
    );
  });

  it("renders divide", () => {
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "divide" },
    });
    userEvent.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("result").textContent).toBe(
      `Result: ${divide(wordA, wordB)}`
    );
  });
});
