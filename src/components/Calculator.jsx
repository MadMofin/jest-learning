import React from "react";
import { operation } from "../utils/mathOperations";

const styles = {
  input: { margin: 10, height: 25, fontSize: 20, padding: 10 },
  select: { margin: 10, height: 50, fontSize: 20, padding: 10 },
  result: { margin: 10, height: 25, fontSize: 40, padding: 10 },
};

export const Calculator = () => {
  const [data, setData] = React.useState({
    a: 0,
    b: 0,
    result: 0,
    operation: "sum",
  });

  React.useEffect(() => {
    const res = operation(data.a, data.b, data.operation);
    setData({ ...data, result: res });
  }, [data.a, data.b, data.operation]);

  const handleChange = (v) =>
    setData({ ...data, [v.target.name]: parseInt(v.target.value) });

  const handleSelect = (v) =>
    setData({ ...data, [v.target.name]: v.target.value });

  return (
    <div data-testid="calculator">
      <h1>Simple calculator</h1>
      <input
        style={styles.input}
        onChange={handleChange}
        name="a"
        type="text"
        data-testid="a"
      ></input>
      <input
        style={styles.input}
        onChange={handleChange}
        name="b"
        type="text"
        data-testid="b"
      ></input>
      <select style={styles.select} onChange={handleSelect} name="operation">
        <option value="sum">Sum</option>
        <option value="substract">Substract</option>
        <option value="divide">Divide</option>
        <option value="multiply">Multiply</option>
      </select>
      {data.result !== null && (
        <div style={styles.result} data-testid="result">
          Result: {data.result}
        </div>
      )}
    </div>
  );
};
