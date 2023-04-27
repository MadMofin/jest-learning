import { addDataHistory } from "../../utils/mathOperations";
import * as operations from "../../utils/mathOperations";
import { Calculator } from "../Calculator";
import { render, screen, fireEvent } from "@testing-library/react";
import historyFactoryNum from "../../factory/createOperations";

const { getRandomInt } = operations;

const number1 = getRandomInt(9);
const number2 = getRandomInt(9) + 1;
const operationRandom = operations.getRandomWord();
let newData = {};
let history: any[] = [];
let res = operations.operation(number1, number2, operationRandom);
const MAX_HISTORY_LENGHT = 10;
const NUMBER_OPERATIONS = 15;

describe("addDataHistory", () => {
  it("Render History Container", () => {
    render(<Calculator />);

    const historyContainer = screen.getByTestId("rowHistory");
    const noHistoryMessage = screen.getByTestId("noHistory");

    expect(historyContainer).toBeInTheDocument();
    expect(noHistoryMessage).toBeInTheDocument();
  });

  test("Displays the history of 10 operations", () => {
    const { getByTestId } = render(<Calculator />);

    for (let i = 1; i <= 10; i++) {
      const aInput = getByTestId("a");
      const bInput = getByTestId("b");
      const operatorSelect = getByTestId("operator");
      const result = getByTestId(`result`);
      fireEvent.change(aInput, { target: { value: i } });
      fireEvent.change(bInput, { target: { value: i + 1 } });
      fireEvent.change(operatorSelect, { target: { value: "sum" } });
      expect(result.textContent).toBe(`Result: ${i + i + 1}`);
    }

    // Check that the history shows only the last 10 operations
    const rowHistory = getByTestId("rowHistory");
    expect(rowHistory.children.length).toBeLessThanOrEqual(10);
  });

  test("update History", () => {
    newData = {
      a: number1,
      b: number2,
      result: res,
      operation: operationRandom,
    };

    addDataHistory(newData, res, history);
    expect(history).toEqual(history);
  });

  test("limit 10 last operations", () => {
    for (let i = 1; i < NUMBER_OPERATIONS; i++) {
      const number1 = getRandomInt(9);
      const number2 = getRandomInt(9) + 1;
      const operationRandom = operations.getRandomWord();
      let newData = {};
      let history: any[] = [];
      let res = operations.operation(number1, number2, operationRandom);
      newData = {
        a: number1,
        b: number2,
        result: res,
        operation: operationRandom,
      };
      history = addDataHistory(newData, res, history);
    }
    expect(history.length).toBeLessThanOrEqual(MAX_HISTORY_LENGHT);
  });
});
