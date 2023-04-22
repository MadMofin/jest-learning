import React from "react";
import * as operations from "../utils/mathOperations";

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

    setData({
      ...data,
      [v.target.name]: v.target.value,
      result: null,
      error: null,
    });
  };

  const handleSelect = (v) =>
    setData({
      ...data,
      [v.target.name]: v.target.value,
      result: null,
      error: null,
    });

  return (
    <div data-testid="calculator" style={styles.container}>
      <h1 style={styles.title} data-testid="title">
        Simple Calculator
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
      </div>
      <div style={styles.result} data-testid="result" data-value={data.result}>
        <span>{data.result !== null && "Result: "}</span>
        <span>{data.result !== null && data.result}</span>
      </div>
    </div>
  );
};
