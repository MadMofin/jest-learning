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
