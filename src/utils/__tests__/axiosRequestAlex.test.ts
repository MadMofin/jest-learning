import {
  fetchUsers,
  fetchTodos,
  commentUrl,
  fetchComments,
} from "../../utils/axiosRequest";
import axios from "axios";
import moxios from "moxios";

jest.mock("axios");

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
