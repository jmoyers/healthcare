require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool();
const { query, end } = require("./db")(pool);

const { User } = require("./user")(query);

const testEmail = "test@test.com";
const testEmail2 = "test2@test.com";
const testPassword = "asdkfjasdlkjfjkalsd";

describe("User", () => {
  beforeEach(async () => {
    await User.deleteUserByEmail(testEmail);
    await User.deleteUserByEmail(testEmail2);
  });

  afterAll(async () => {
    await end();
  });

  it("can retreive user by email", async () => {
    const id = await User.createAccount(testEmail, testPassword);
    const response = await User.getUserByEmail(testEmail);

    expect(response.email).toBe(testEmail);
    expect(response.id).toBe(id);
  });

  it("can retreive user by id", async () => {
    const id = await User.createAccount(testEmail, testPassword);

    const response = await User.getUserById(id);

    expect(response.email).toBe(testEmail);
  });

  it("can delete a user by email", async () => {
    const id = await User.createAccount(testEmail, testPassword);

    const response = await User.getUserById(id);
    expect(response).toBeTruthy();

    await User.deleteUserByEmail(testEmail);
    const doesntExist = await User.getUserById(id);
    expect(doesntExist).toBeFalsy();
  });

  it("can check if an email exists already", async () => {
    await User.createAccount(testEmail, testPassword);

    const exists = await User.checkEmailExists(testEmail);

    expect(exists).toBeTruthy();

    await User.deleteUserByEmail(testEmail);

    const doesNotExist = await User.checkEmailExists(testEmail);
    expect(doesNotExist).toBeFalsy();
  });

  it("can create an account with a password", async () => {
    const testPass = "aksldjfalksdjf";
    const id = await User.createAccount(testEmail, testPass);

    expect(id).toBeTruthy();

    const goodPassword = await User.checkPassword(testEmail, testPass);

    expect(goodPassword).toBeTruthy();

    const badPassword = await User.checkPassword(testEmail, "bad");
    expect(badPassword).toBeFalsy();
  });
});
