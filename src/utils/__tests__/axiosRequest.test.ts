import {
  fetchUsers,
  fetchTodos,
  commentUrl,
  fetchComments,
} from "../../utils/axiosRequest";
import axios from "axios";
import moxios from "moxios";

jest.mock("axios");

// posts mofin
// comments alex
// albums miguel
// todos calliel

describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });

    it("should return users list", async () => {
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];

      moxios.stubRequest("https://jsonplaceholder.typicode.com/users", {
        status: 200,
        data: users,
      });

      axios.get.mockResolvedValueOnce(users);

      const result = await fetchUsers();

      expect(axios.get).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/users`
      );
      expect(result).toEqual(users);
    });

    it("should return post coments", async () => {
      const comments = [
        { id: 1, message: "oli" },
        { id: 2, message: "how" },
        { id: 3, message: "r" },
        { id: 4, message: "u" },
      ];
      axios.get.mockResolvedValueOnce(comments);

      const result = fetchComments();

      expect(axios.get).toHaveBeenCalledWith(commentUrl);
      expect(result).toEqual(comments);
    });
  });

  describe("fetchTodos", () => {
    describe("when API call is successful", () => {
      beforeEach(function () {
        moxios.install();
      });

      afterEach(function () {
        moxios.uninstall();
      });

      it("should return todos list", async () => {
        const todos = [
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          },
          {
            userId: 1,
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: false,
          },
          {
            userId: 1,
            id: 3,
            title: "fugiat veniam minus",
            completed: false,
          },
          {
            userId: 1,
            id: 4,
            title: "et porro tempora",
            completed: true,
          },
        ];

        axios.get.mockResolvedValueOnce(todos);

        const result = await fetchTodos();

        expect(axios.get).toHaveBeenCalledWith(
          `https://jsonplaceholder.typicode.com/users`
        );
        expect(result).toEqual(todos);
      });
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      const result = await fetchUsers();

      expect(axios.get).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/users`
      );
      expect(result).toEqual([]);
    });
  });
});

describe("fecthAlbum", () => {
  describe("when API call is successful", () => {
    it("should return album list", async () => {
      const Album = [
        {
          userId: 1,
          id: 1,
          title: "quidem molestiae enim",
        },
        {
          userId: 1,
          id: 2,
          title: "sunt qui excepturi placeat culpa",
        },
        {
          userId: 1,
          id: 3,
          title: "omnis laborum odio",
        },
        {
          userId: 1,
          id: 4,
          title: "non esse culpa molestiae omnis sed optio",
        },
      ];
      axios.get.mockResolvedValueOnce(Album);

      const;
    });
  });
});
