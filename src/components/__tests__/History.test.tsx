import { addDataHistory } from "../../utils/mathOperations";
import * as operations from "../../utils/mathOperations";
import { Calculator } from "../Calculator";
import { render, screen } from "@testing-library/react";

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
