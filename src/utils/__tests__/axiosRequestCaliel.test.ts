import { fetchTodos } from "../../utils/axiosRequest";
import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";
import { equal } from "assert";

jest.mock("axios");

describe("fetchTodos", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });

    it("axios", (done) => {
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

      moxios.stubRequest("https://jsonplaceholder.typicode.com/todos", {
        status: 200,
        data: todos,
      });

      let onFulfilled = sinon.spy();
      axios.get("https://jsonplaceholder.typicode.com/todos").then(onFulfilled);

      moxios.wait(function () {
        equal(onFulfilled.getCall(0).args[0].data, "hello");
        done();
      });

      it("should return todos list", (done) => {
        let onFulfilled = sinon.spy();

        axios
          .get(`https://jsonplaceholder.typicode.com/todos`)
          .then(onFulfilled);

        moxios.wait(function () {
          let request = moxios.requests.mostRecent();
          request
            .respondWith({
              status: 200,
              response: {
                userId: 1,
                id: 1,
                title: "delectus aut autem",
                completed: false,
              },
            })
            .then(function () {
              equal(onFulfilled.called, true);
              done();
            });
        });
      });
    });
  });
});

{
  /*moxios.withMock(function () {
  axios.get.mockResolvedValueOnce(todos);

  const result = await fetchTodos();

  expect(axios.get).toHaveBeenCalledWith(
    `https://jsonplaceholder.typicode.com/todos`
  );
  expect(result).toEqual(todos);
});*/
}
