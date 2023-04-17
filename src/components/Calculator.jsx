import React from "react";
import * as operations from "../utils/mathOperations";

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
  const [history, setHistory] = React.useState([]);
  const [historyPos, setHistoryPos] = React.useState(0);

  React.useEffect(() => {
    if (!(isNaN(parseFloat(data.a)) || isNaN(parseFloat(data.b)))) {
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
        result: "Enter a valid number",
      });

    const newData = { ...data, [v.target.name]: v.target.value };
    const res = operations.operation(
      parseFloat(newData.a),
      parseFloat(newData.b),
      newData.operation
    );

    const newHistory = [...history.slice(0, historyPos), newData];

    if (newHistory.length >= 10) newHistory.shift();
    newHistory.push({ ...newData, result: res });

    setData({ ...newData, result: res });
    setHistory(newHistory);
    setHistoryPos(newHistory.length);
  };

  const handleSelect = (v) => {
    const newData = { ...data, [v.target.name]: v.target.value };
    const res = operations.operation(
      parseFloat(newData.a),
      parseFloat(newData.b),
      newData.operation
    );

    setData({ ...newData, result: res });

    const newHistoryPos = history.length;
    setHistoryPos(newHistoryPos);
  };

  React.useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    // eslint-disable-next-line
  }, [history]);

  React.useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("calculatorHistory"));
    if (storedHistory) setHistory(storedHistory);
    // eslint-disable-next-line
  }, []);

  const operSimbols = {
    sum: "+",
    substract: "-",
    multiply: "*",
    divide: "/",
  };

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
      <br />
      <br />
      <h3>History of last operations c:</h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <center>
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
                <p>{item.a}</p>
                <p>{operSimbols[item.operation]}</p>
                <p>{item.b}</p>
                <p>=</p>
                <p>{item.result}</p>
              </div>
            ))
          ) : (
            <p>No history available</p>
          )}
        </center>
      </div>
    </div>
  );
};
