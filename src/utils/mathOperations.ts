export function sum(a: number | string, b: number | string) {
  if (typeof a === "string" || typeof b === "string")
    return "Enter a valid number";

  return a + b;
}

export function substract(a: number | string, b: number | string) {
  if (typeof a === "string" || typeof b === "string")
    return "Enter a valid number";

  return a - b;
}

export function multiply(a: number | string, b: number | string) {
  if (typeof a === "string" || typeof b === "string")
    return "Enter a valid number";

  return a * b;
}

export function divide(a: number | string, b: number | string) {
  if (typeof a === "string" || typeof b === "string")
    return "Enter a valid number";

  if (b === 0) return "You cant divide by 0 :(";
  return a / b;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomFloat(max: number) {
  return parseFloat((Math.random() * max).toFixed(2));
}

const getCharacters = (length: number) => {
  let result = "";
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz´+{}_.<>¨*][]_-!#$%&/()="';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export function getRandomCharacter(max: number) {
  return getCharacters(max);
}

interface IDictionary<Number> {
  [id: string]: number | string;
}

export function operation(a: number, b: number, operation: any) {
  const OPERATIONS: IDictionary<string> = {
    sum: sum(a, b),
    substract: substract(a, b),
    divide: divide(a, b),
    multiply: multiply(a, b),
  };

  return OPERATIONS[operation];
}
