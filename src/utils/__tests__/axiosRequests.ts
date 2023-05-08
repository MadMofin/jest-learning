import axios from "axios";
import moxios from "moxios";
import { User, Post, Todo, Comment, Album } from "../interfaces";
import * as Factory from "factory.ts";
import { faker } from "@faker-js/faker";
import { getRandomInt } from "../mathOperations";

jest.useRealTimers();

const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each((i) => i),
  name: "default name",
  lastName: "default last name",
  email: "default@live.com",
});

const postFactory = Factory.Sync.makeFactory<Post>({
  id: Factory.each((i) => i),
  title: "default title",
  text: "default text",
});

const todoFactory = Factory.Sync.makeFactory<Todo>({
  id: Factory.each((i) => i),
  title: "default title",
  tasks: [],
});

const commentFactory = Factory.Sync.makeFactory<Comment>({
  id: Factory.each((i) => i),
  text: "default text",
});

const albumFactory = Factory.Sync.makeFactory<Album>({
  id: Factory.each((i) => i),
  title: "default title",
  songs: [],
});

let axiosInstance: any;

let users: Array<User>;
let posts: Array<Post>;
let todos: Array<Todo>;
let comments: Array<Comment>;
let albums: Array<Album>;

const createUsers = (length: number) => {
  let response = [];
  for (let i = 0; i < length; i++) {
    const name = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(name, lastName);

    response.push(userFactory.build({ name, lastName, email }));
  }
  return response;
};

const createPosts = (length: number) => {
  let response = [];
  for (let i = 0; i < length; i++) {
    const title = faker.lorem.words(getRandomInt(3));
    const text = faker.lorem.paragraph();

    response.push(postFactory.build({ text, title }));
  }
  return response;
};

const createTodos = (length: number) => {
  let response = [];
  for (let i = 0; i < length; i++) {
    const title = faker.lorem.words(getRandomInt(5));

    const taskLength = getRandomInt(3);
    let tasks = [];
    for (let j = 0; j < taskLength; j++) {
      tasks.push(faker.lorem.words(getRandomInt(5)));
    }

    response.push(todoFactory.build({ title, tasks }));
  }
  return response;
};

const createComments = (length: number) => {
  let response = [];
  for (let i = 0; i < length; i++) {
    const text = faker.lorem.paragraph();

    response.push(commentFactory.build({ text }));
  }
  return response;
};

const createAlbums = (length: number) => {
  let response = [];
  for (let i = 0; i < length; i++) {
    const title = faker.lorem.words(getRandomInt(5));

    const songsLength = getRandomInt(3);
    let songs = [];
    for (let j = 0; j < songsLength; j++) {
      songs.push(faker.lorem.words(getRandomInt(5)));
    }

    response.push(albumFactory.build({ title, songs }));
  }
  return response;
};

describe("fetchData", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      axiosInstance = axios.create();
      moxios.install(axiosInstance);

      users = createUsers(getRandomInt(10));
      posts = createPosts(getRandomInt(10));
      todos = createTodos(getRandomInt(10));
      comments = createComments(getRandomInt(10));
      albums = createAlbums(getRandomInt(10));

      moxios.stubRequest("https://jsonplaceholder.typicode.com/users", {
        status: 200,
        response: users,
      });

      moxios.stubRequest("https://jsonplaceholder.typicode.com/posts", {
        status: 200,
        response: posts,
      });

      moxios.stubRequest("https://jsonplaceholder.typicode.com/todos", {
        status: 200,
        response: todos,
      });

      moxios.stubRequest("https://jsonplaceholder.typicode.com/comments", {
        status: 200,
        response: comments,
      });

      moxios.stubRequest("https://jsonplaceholder.typicode.com/albums", {
        status: 200,
        response: albums,
      });
    });

    afterEach(function () {
      moxios.uninstall(axiosInstance);
    });

    it("should return users", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const { data } = response;
      expect(data).toEqual(users);
    });

    it("should return posts", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const { data } = response;
      expect(data).toEqual(posts);
    });

    it("should return todos", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const { data } = response;
      expect(data).toEqual(todos);
    });

    it("should return albums", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const { data } = response;
      expect(data).toEqual(albums);
    });

    it("should return comments", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const { data } = response;
      expect(data).toEqual(comments);
    });
  });
});

describe("fetchValues mockImplementation test", () => {
  describe("when is successful", () => {
    beforeEach(function () {
      axiosInstance = axios.create();
      moxios.install(axiosInstance);

      todos = createTodos(getRandomInt(10));

      moxios.stubRequest("https://jsonplaceholder.typicode.com/todos", {
        status: 200,
        response: todos,
      });
    });

    afterEach(function () {
      moxios.uninstall(axiosInstance);
      jest.restoreAllMocks();
    });

    it("should return todos", async () => {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const { data } = response;

      const fetchValuesMock = jest
        .fn()
        .mockImplementation(() => "default")
        .mockImplementationOnce(() => "first call")
        .mockImplementationOnce(() => "second call");

      data.fetchValues = fetchValuesMock;

      const result = [
        data.fetchValues(),
        data.fetchValues(),
        data.fetchValues(),
      ].join(",");

      expect(result).toEqual("first call,second call,default");
    });
  });
});
