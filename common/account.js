const bcrypt = require("bcryptjs");
const assert = require("assert");
const log = require("ulog")("user");
const dynamoose = require("dynamoose");
const { nanoid } = require("nanoid");

dynamoose.aws.sdk.config.update({
  region: "us-west-1",
});

dynamoose.aws.ddb.local();

const AccountSchema = new dynamoose.Schema(
  {
    id: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const AccountModel = dynamoose.model("Account", AccountSchema);

const AccountAPI = {
  async getAccountByEmail(email) {},
  async getAccountById(id) {},
  async deleteAccountByEmail(email) {},
  async checkEmailExists(email) {
    return false;
  },
  async createAccount(email, password) {
    // check if email exists
    if (await AccountAPI.checkEmailExists(email)) {
      throw new Error("Email is already registered.");
    }

    // generate password hash with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const account = new Account({ id: nanoid(), email, password: hash });
      await account.save();
    } catch (e) {
      log.error("Problem creating account", e);
    }
  },
  async checkPassword(email, password) {
    const user = await Account.getAccountByEmail(email);

    if (!user) return false;

    return bcrypt.compare(password, user.password);
  },
};

module.exports = AccountAPI;
