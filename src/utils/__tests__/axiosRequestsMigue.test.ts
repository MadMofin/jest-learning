import axios from "axios";
import moxios from "moxios";
import { fecthAlbum } from "../axiosRequest";

const config = { headers: { "Accept-Encoding": "gzip,deflate,compress" } };

let axiosInstance;

describe("fecthAlbum", () => {
  describe("when API call is successful", () => {
    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });
    it("should return album list", async () => {
      const album = [
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

      moxios.stubRequest("https://jsonplaceholder.typicode.com/albums", {
        status: 200,
        data: album,
      });
      axios.get.mockResolvedValueOnce(album, config);
      const res = await fecthAlbum();

      const albumRes = await axios.get(
        "https://jsonplaceholder.typicode.com/albums",
        config
      );

      expect(axios.get).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/albums`
      );
      expect(res).toEqual(album);
    });
  });
});
