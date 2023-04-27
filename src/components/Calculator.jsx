import React from "react";
import * as operations from "../utils/mathOperations";
import { OPERATIONS_SYMBOLS } from "../constants/calculatorConstants";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#F6F6F6",
    fontFamily: "sans-serif",
  },
  title: {
    margin: 0,
    fontSize: 36,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  input: {
    margin: 10,
    height: 40,
    fontSize: 20,
    padding: 10,
    border: "1px solid #C4C4C4",
    borderRadius: 5,
    outline: "none",
  },
  select: {
    margin: 10,
    height: 50,
    fontSize: 20,
    padding: 10,
    border: "1px solid #C4C4C4",
    borderRadius: 5,
    outline: "none",
  },
  result: {
    margin: 10,
    height: 35,
    fontSize: 30,
    padding: 10,
    border: "1px solid #C4C4C4",
    borderRadius: 5,
    outline: "none",
    backgroundColor: "#FFFFFF",
  },
};

export const Calculator = () => {
  const [data, setData] = React.useState({
    a: 0,
    b: 0,
    result: null,
    operation: "sum",
  });
  const [history, setHistory] = React.useState([]);
  let auxHistory = [];

  React.useEffect(() => {
    if (
      !(isNaN(parseFloat(data.a)) || isNaN(parseFloat(data.b))) &&
      data.a !== "" &&
      data.b !== ""
    ) {
      const res = operations.operation(
        parseFloat(data.a),
        parseFloat(data.b),
        data.operation
      );
      setData({ ...data, result: res });
    }
    //eslint-disable-next-line
  }, [data.a, data.b, data.operation]);

  const handleChange = (v) => {
    if (isNaN(parseFloat(v.target.value)))
      return setData({
        ...data,
        [v.target.name]: v.target.value,
        result: null,
        error: "Enter a valid number",
      });

    setData({ ...data, [v.target.name]: v.target.value });
  };

  const handleSubmit = () => {
    if (!(isNaN(parseFloat(data.a)) || isNaN(parseFloat(data.b)))) {
      const res = operations.operation(
        parseFloat(data.a),
        parseFloat(data.b),
        data.operation
      );

      setData({
        ...data,
        result: res,
      });
      const getHistory = operations.addDataHistory(newData, res, auxHistory);
      setHistory(getHistory);
    }
  };

  const handleSelect = (v) =>
    setData({ ...data, [v.target.name]: v.target.value });

  React.useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    // eslint-disable-next-line
  }, [history]);

  React.useEffect(() => {
    const getHistoryOperations = JSON.parse(
      localStorage.getItem("calculatorHistory")
    );
    if (getHistoryOperations) setHistory(getHistoryOperations);
    // eslint-disable-next-line
  }, []);

  return (
    <div data-testid="calculator" style={styles.container}>
      <h1 style={styles.title} data-testid="title">
        Simple calculator :DDD
      </h1>
      <div>
        <input
          style={styles.input}
          onChange={handleChange}
          name="a"
          data-testid="a"
          value={data.a}
        />
        <select
          style={styles.select}
          onChange={handleSelect}
          name="operation"
          data-testid="operator"
          value={data.operation}
        >
          <option value="sum">+</option>
          <option value="substract">-</option>
          <option value="divide">/</option>
          <option value="multiply">*</option>
        </select>
        <input
          style={styles.input}
          onChange={handleChange}
          name="b"
          data-testid="b"
          value={data.b}
        />
        <button
          data-testid="submit"
          style={{
            height: 48,
            width: 150,
            color: "white",
            backgroundColor: "hotpink",
            borderRadius: 5,
            border: 0,
          }}
          onClick={handleSubmit}
        >
          Calcular
        </button>
      </div>
      <div
        style={styles.result}
        data-testid="result"
        data-value={`Result: ${data.error ? data.error : data.result}`}
      >
        {data.result !== null && "Result: " + data.result}
      </div>
      <h3 style={{ paddingTop: 12 }}>History of last operations c:</h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <center data-testid="rowHistory">
          {history && history.length > 0 ? (
            history.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  marginBottom: 8,
                  width: "50%",
                }}
              >
                <p data-testid="num1">{item.a}</p>
                <p data-testid="operSymbol">
                  {OPERATIONS_SYMBOLS[item.operation]}
                </p>
                <p data-testid="num2">{item.b}</p>
                <p>=</p>
                <p data-testid="resultHist">{item.result}</p>
              </div>
            ))
          ) : (
            <div data-testid="noHistory">
              <p>No history available</p>
            </div>
          )}
        </center>
      </div>
    </div>
  );
};
