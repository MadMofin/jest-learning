import * as Factory from "factory.ts";

const historyFactory = Factory.makeFactory({
  a: Math.floor(Math.random() * 10),
  b: Math.floor(Math.random() * 10),
  operation: ["sum", "substract", "divide", "multiply"][
    Math.floor(Math.random() * 4)
  ],
  result: ({ a, b, operation }) => {
    switch (operation) {
      case "sum":
        return a + b;
      case "substract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        return a / b;
      default:
        return null;
    }
  },
});

const historyFactoryNum = historyFactory.buildList(10);

export default historyFactoryNum;
