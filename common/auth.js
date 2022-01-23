require("dotenv").config();

const log = require("ulog")("Auth");

const axios = require("axios");
const https = require("https");

log("Auth library environment: ", process.env.NODE_ENV);

const client =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
          withCredentials: true
        })
      })
    : axios.create({
        httpsAgent: new https.Agent(),
        withCredentials: true
      });

const base = process.env.BASE_URL ? process.env.BASE_URL : "localhost:3001";

const Auth = {
  // /auth/logout - GET
  async logout() {
    return client.get(`${base}/auth/logout`);
  },
  // /auth/verify - POST - body.token or cookie[token]
  async verify(token) {
    return client.post(`${base}/auth/verify`, {
      token
    });
  },
  // /auth/login - POST - body.username, body.password
  async login(username, password) {
    return client.post(`${base}/auth/login`, {
      username,
      password
    });
  },
  // /auth/create - POST - body.username, body.password
  async create(username, password) {
    return client.post(`${base}/auth/create`, {
      username,
      password
    });
  }
};

module.exports = Auth;
