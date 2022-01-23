const Auth = require("./auth");

const { Pool } = require("pg");
const pool = new Pool();
const { query, end } = require("./db")(pool);

const { User } = require("./user")(query);

const ulog = require("ulog");
ulog.level = ulog.LOG;
const log = ulog("auth-test");

const testEmail = "test@test.com";
const testPassword = "testpassword";

describe("Auth", () => {
  beforeEach(async () => {
    await User.deleteUserByEmail(testEmail);
  });
  afterAll(async () => {
    await end();
  });
  it("can logout", async () => {
    const response = await Auth.logout();
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toEqual([
      "token=; Path=/; HttpOnly; Secure"
    ]);
  });

  it("can create an account and login", async () => {
    const create = await Auth.create(testEmail, testPassword);
    expect(create.status).toBe(200);

    const login = await Auth.login(testEmail, testPassword);
    expect(login.status).toBe(200);
    expect(login.headers["set-cookie"][0]).toMatch(/^token=/);
  });

  it("can verify a jwt token", async () => {
    const create = await Auth.create(testEmail, testPassword);
    expect(create.status).toBe(200);

    const login = await Auth.login(testEmail, testPassword);
    expect(login.status).toBe(200);
    const cookieSet = login.headers["set-cookie"][0];
    const tokenStart = cookieSet.indexOf("=", 0) + 1;
    const tokenEnd = cookieSet.indexOf(";", 0);

    const token = cookieSet.substr(tokenStart, tokenEnd - tokenStart);

    const verified = await Auth.verify(token);

    expect(verified.status).toBe(200);
  });
});
