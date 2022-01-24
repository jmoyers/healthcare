require("dotenv").config();

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
    email: {
      hashKey: true,
      type: String,
    },
    id: {
      index: {
        name: "idIndex",
        global: true,
      },
      type: String,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const Account = dynamoose.model("Account", AccountSchema, {
  update: true,
});

async function ensureTableExists() {
  await Account.table.create.request();
}

ensureTableExists();

const AccountAPI = {
  async getAccountByEmail(email) {
    try {
      const results = await Account.query("email").eq(email).exec();
      return results.toJSON()[0];
    } catch (e) {
      log.error("Problem getting account by email", e);
    }

    return false;
  },
  async getAccountById(id) {
    log("Getting account by id", id);

    try {
      const results = await Account.query("id").eq(id).exec();
      return results.toJSON()[0];
    } catch (e) {
      log.error("Problem getting account by id", e);
    }

    return false;
  },
  async deleteAccountByEmail(email) {
    try {
      const results = await Account.delete(email);
      return true;
    } catch (e) {
      log.error("Problem getting account by id", e);
      return false;
    }
  },
  async checkEmailExists(email) {
    const result = await AccountAPI.getAccountByEmail(email);
    return result ? true : false;
  },
  async createAccount(email, password) {
    // generate password hash with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const account = new Account({ id: nanoid(), email, password: hash });
      await account.save();
      const json = account.toJSON();
      log("Saved account", json);
      return json;
    } catch (e) {
      log.error("Problem creating account", e);
      return false;
    }
  },
  async checkPassword(email, password) {
    const user = await AccountAPI.getAccountByEmail(email);

    if (!user) return false;

    return bcrypt.compare(password, user.password);
  },
};

module.exports = AccountAPI;
