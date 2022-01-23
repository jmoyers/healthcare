require("dotenv").config();

const log = require("ulog")("jwt");
const jwt = require("jsonwebtoken");
const UAParser = require("ua-parser-js");

const JWT = {
  verifyLocal(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
  generate(userId, aud = "Web", userAgentString = false) {
    if (!userId) {
      throw Error("userId required to generate a JWT");
    }

    let device = false;

    if (userAgentString) {
      const parser = new UAParser(userAgentString);
      device = {
        os: parser.getOS(),
        browser: parser.getBrowser()
      };
    }

    const jwtContents = {
      userId,
      iat: Date.now(),
      exp: Date.now() + 30 * 24 * 60 * 60,
      version: "1.0",
      device,
      aud
    };

    log.log("Generating jwt", jwtContents);

    const token = jwt.sign(jwtContents, process.env.JWT_SECRET);

    return token;
  }
};

module.exports = JWT;
