import {
  fetchUsers,
  commentUrl,
  fetchComments,
} from "../../utils/axiosRequest";
import axios from "axios";
import moxios from "moxios";

// posts mofin
// comments alex
// albums miguel
// todos calliel

let axiosInstance: any;

describe("fetchData", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      axiosInstance = axios.create();
      moxios.install(axiosInstance);
    });

    afterEach(function () {
      moxios.uninstall(axiosInstance);
    });

    it.only("should return data", async () => {
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];

      const posts = [
        { id: 1, name: "Post 1" },
        { id: 2, name: "Post 2" },
      ];

      moxios.stubRequest("https://jsonplaceholder.typicode.com/users", {
        status: 200,
        response: users,
      });

      moxios.stubRequest("https://jsonplaceholder.typicode.com/posts", {
        status: 200,
        response: posts,
      });

      const responseUsers = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const responsePosts = await axiosInstance.get("/posts");

      console.log(responseUsers.data);
      console.log(responsePosts);
      expect(true).toEqual(true);
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
