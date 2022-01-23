const JWT = require("./jwt");
const jsonwebtoken = require("jsonwebtoken");
const log = require("ulog")("jwt-test");

const testUserId = "2341234123";

const testUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

describe("JWT", () => {
  it("can generate a opencourse JWT", () => {
    const token = JWT.generate(testUserId);

    expect(token).toBeTruthy();

    const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    expect(verify).toBeTruthy();

    expect(verify.userId).toBe(testUserId);
    expect(verify.version).toBe("1.0");
    expect(verify.aud).toBe("Web");
  });

  it("can verify a opencourse JWT", () => {
    const token = JWT.generate(testUserId);

    expect(token).toBeTruthy();

    const verify = JWT.verifyLocal(token);

    expect(verify.userId).toBe(testUserId);
    expect(verify.version).toBe("1.0");
    expect(verify.aud).toBe("Web");
  });

  it("properly parse user agent string into JWT", () => {
    const token = JWT.generate(testUserId, "Web", testUserAgent);

    expect(token).toBeTruthy();

    const verify = JWT.verifyLocal(token);

    expect(verify.device).toStrictEqual({
      os: { name: "Windows", version: "10" },
      browser: { name: "Chrome", version: "74.0.3729.169", major: "74" }
    });
  });
});
