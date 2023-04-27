export const personFactory =
  Factory.Sync.makeFactory <
  User >
  {
    id: Factory.each((i) => i),
    name: "default name",
    lastName: "default last name",
    email: "default@live.com",
  };

export const postFactory =
  Factory.Sync.makeFactory <
  Post >
  {
    id: Factory.each((i) => i),
    title: "default title",
    text: "default text",
  };

export const todoFactory =
  Factory.Sync.makeFactory <
  Todo >
  {
    id: Factory.each((i) => i),
    title: "default title",
    tasks: [],
  };

export const commentFactory =
  Factory.Sync.makeFactory <
  Comment >
  {
    id: Factory.each((i) => i),
    text: "default text",
  };

export const albumFactory =
  Factory.Sync.makeFactory <
  Album >
  {
    id: Factory.each((i) => i),
    title: "default title",
    songs: [],
  };

export const historyFactory = factory.makeFactory({
  a: factory.sequence("a", (n) => n),
  b: factory.sequence("b", (n) => n + 1),
  operation: factory.random.oneOf(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]),
  result: factory.lazy((attrs) => {
    const { a, b, operation } = attrs;
    switch (operation) {
      case "ADD":
        return a + b;
      case "SUBTRACT":
        return a - b;
      case "MULTIPLY":
        return a * b;
      case "DIVIDE":
        return a / b;
      default:
        return null;
    }
  }),
});

const history = historyFactory.buildList(10); // crea una lista de 10 elementos aleatorios basados en la estructura definida

export default history;
