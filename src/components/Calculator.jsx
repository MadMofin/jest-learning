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
    result: null,
    operation: "sum",
  });

  React.useEffect(() => {
    if (!(isNaN(parseFloat(data.a)) || isNaN(parseFloat(data.b)))) {
      const res = operation(
        parseFloat(data.a),
        parseFloat(data.b),
        data.operation
      );
      setData({ ...data, result: res });
    }
  }, [data.a, data.b, data.operation]);

  const handleChange = (v) => {
    if (isNaN(parseFloat(v.target.value)))
      return setData({
        ...data,
        [v.target.name]: v.target.value,
        result: "Enter a valid number",
      });

    return setData({ ...data, [v.target.name]: v.target.value });
  };

  const handleSelect = (v) =>
    setData({ ...data, [v.target.name]: v.target.value });

  return (
    <div data-testid="calculator">
      <h1>Simple calculator</h1>
      <input
        style={styles.input}
        onChange={handleChange}
        name="a"
        data-testid="a"
        value={data.a}
      />
      <input
        style={styles.input}
        onChange={handleChange}
        name="b"
        data-testid="b"
        value={data.b}
      />
      <select
        style={styles.select}
        onChange={handleSelect}
        name="operation"
        data-testid="operator"
        value={data.operation}
      >
        <option value="sum">Sum</option>
        <option value="substract">Substract</option>
        <option value="divide">Divide</option>
        <option value="multiply">Multiply</option>
      </select>
      <div style={styles.result} data-testid="result" data-value={data.result}>
        {data.result !== null && "Result: " + data.result}
      </div>
    </div>
  );
};
