/* eslint-disable */
const randomString = require("../utils/randomString");

describe("Random string generator", () => {
  test("should respond with a 8 characters string", async () => {
    const res = randomString(8);
    expect(res.length).toBe(8);
  });
});
