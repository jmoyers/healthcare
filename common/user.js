const bcrypt = require("bcryptjs");
const assert = require("assert");
const log = require("ulog")("user");

class DuplicateAccountError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateAccountError";
  }
}

module.exports = query => {
  const User = {
    async getUserByEmail(email) {
      const results = await query("SELECT * FROM users WHERE email = $1", [
        email
      ]);

      log.log(`Checked for user with email ${email}`, results);

      return results[0];
    },
    async getUserById(id) {
      const results = await query("SELECT * FROM users WHERE id = $1", [id]);

      log.log(`Checked for user with id ${id}`, results);

      return results[0];
    },
    async deleteUserByEmail(email) {
      log.log(`Deleting user ${email}`);

      const results = await query("DELETE FROM users WHERE email = $1", [
        email
      ]);

      return results[0];
    },
    async checkEmailExists(email) {
      const results = await query("SELECT id FROM users WHERE email = $1", [
        email
      ]);

      if (results[0]) {
        return results[0].id;
      }

      return false;
    },
    async createAccount(email, password) {
      // check if email exists
      if (await User.checkEmailExists(email)) {
        throw new DuplicateAccountError("Email is already registered.");
      }

      // generate password hash with bcrypt
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // store email and password, id, created generated for us

      // This is a brand new email, create an account
      const results = await query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        [email, hash]
      );

      log.log("Created new user", results);

      // return newly created id
      return results[0].id;
    },
    async checkPassword(email, password) {
      const user = await User.getUserByEmail(email);

      if (!user) return false;

      return bcrypt.compare(password, user.password);
    }
  };

  return { User, DuplicateAccountError };
};
