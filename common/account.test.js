require("dotenv").config();

const Account = require("./account");

const testEmail = "test@test.com";
const testEmail2 = "test2@test.com";
const testPassword = "asdkfjasdlkjfjkalsd";

describe("Account", () => {
  beforeEach(async () => {
    await Account.deleteAccountByEmail(testEmail);
    await Account.deleteAccountByEmail(testEmail2);
  });

  afterAll(async () => {
    await end();
  });

  it("can retreive user by email", async () => {
    const id = await Account.createAccount(testEmail, testPassword);
    const response = await Account.getAccountByEmail(testEmail);

    expect(response.email).toBe(testEmail);
    expect(response.id).toBe(id);
  });

  it("can retreive user by id", async () => {
    const id = await Account.createAccount(testEmail, testPassword);

    const response = await Account.getAccountById(id);

    expect(response.email).toBe(testEmail);
  });

  it("can delete a user by email", async () => {
    const id = await Account.createAccount(testEmail, testPassword);

    const response = await Account.getAccountById(id);
    expect(response).toBeTruthy();

    await Account.deleteAccountByEmail(testEmail);
    const doesntExist = await Account.getAccountById(id);
    expect(doesntExist).toBeFalsy();
  });

  it("can check if an email exists already", async () => {
    await Account.createAccount(testEmail, testPassword);

    const exists = await Account.checkEmailExists(testEmail);

    expect(exists).toBeTruthy();

    await Account.deleteAccountByEmail(testEmail);

    const doesNotExist = await Account.checkEmailExists(testEmail);
    expect(doesNotExist).toBeFalsy();
  });

  it("can create an account with a password", async () => {
    const testPass = "aksldjfalksdjf";
    const id = await Account.createAccount(testEmail, testPass);

    expect(id).toBeTruthy();

    const goodPassword = await Account.checkPassword(testEmail, testPass);

    expect(goodPassword).toBeTruthy();

    const badPassword = await Account.checkPassword(testEmail, "bad");
    expect(badPassword).toBeFalsy();
  });
});
