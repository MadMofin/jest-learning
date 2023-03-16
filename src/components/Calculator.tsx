import { useEffect, useState } from "react";

export const Calculator = () => {
  const [a, setA] = useState<number>();
  const [b, setB] = useState<number>();
  const [operation, setOperation] = useState<string>();
  const [result, setResult] = useState<string>();

  // TODO: Call operation
  useEffect(() => {
    // operation
    // const result = operation(a,b);
    setResult(result);
  }, [a, b, operation]);

  return (
    <div data-testid="calculator">
      <input type="text" data-testid="a"></input>
      <input type="text" data-testid="b"></input>
      <select>
        <option value="sum">Sum</option>
        <option value="substract">Substract</option>
        <option value="multiplication">Multiplication</option>
        <option value="divide">Divide</option>
      </select>
      <div data-testid="result">{result}</div>
    </div>
  );
};
