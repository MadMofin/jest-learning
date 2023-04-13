import { fetchUsers } from "../../utils/axiosRequest";
import axios from "axios";
import moxios from "moxios";

jest.useRealTimers();
// posts mofin
// comments alex
// albums miguel
// todos calliel

let axiosInstance: any;

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Andrew" },
];

const posts = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
];

const todos = [
  { id: 1, name: "Todo 1" },
  { id: 2, name: "Todo 2" },
];

const comments = [
  { id: 1, name: "Comment 1" },
  { id: 2, name: "Comment 2" },
];

const albums = [
  { id: 1, name: "Album 1" },
  { id: 2, name: "Album 2" },
];

describe("fetchData", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      axiosInstance = axios.create();
      moxios.install(axiosInstance);

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
