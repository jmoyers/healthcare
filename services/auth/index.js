require("dotenv").config();

const ulog = require("ulog");
const log = require("ulog")("rest");

const { Pool } = require("pg");
const pool = new Pool();

const {
  createQuery,
  createUserAPI,
  JWT
} = require("@opencourse/common");

const { query } = createQuery(pool);
const { User, DuplicateAccountError } = createUserAPI(query);

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true
  })
);

const COOKIE_NAME = "token";

app.get("/auth/logout", (req, res) => {
  log.log("Received logout request", req.connection.remoteAddress);
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true
  });
  res.sendStatus(200);
});

app.post("/auth/verify", async (req, res) => {
  log.log("Received verify request", req.connection.remoteAddress);

  const token = req.cookies[COOKIE_NAME] || req.body.token;

  if (token) {
    try {
      const verified = JWT.verifyLocal(token);

      if (verified) {
        log("We got an identity, generating fresh jwt");

        const newJWT = JWT.generate(
          verified.userId,
          verified.external,
          "Web",
          req.headers["user-agent"]
        );

        res.cookie(COOKIE_NAME, newJWT, {
          httpOnly: true,
          secure: true
        });

        log.log(
          "Local token looks good",
          verified.userId,
          req.connection.remoteAddress
        );

        return res.json({
          userId: verified.userId
        });
      }
    } catch (e) {
      log.warn("Got malformed token:", e.message);
    }
  }

  res.sendStatus(403);
});

app.post("/auth/login", async (req, res) => {
  log.log("Received login request", req.connection.remoteAddress);

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const passwordMatch = await User.checkPassword(username, password);

    if (passwordMatch) {
      log.log(
        `Passwords match for login request for ${username}`,
        req.connection.remoteAddress
      );

      const user = await User.getUserByEmail(username);

      log.log(username, user);

      const jwtContents = JWT.generate(
        user.id,
        false,
        "Web",
        req.headers["user-agent"]
      );

      res.cookie(COOKIE_NAME, jwtContents, {
        httpOnly: true,
        secure: true
      });

      return res.sendStatus(200);
    }
  }

  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true
  });

  res.sendStatus(403);
});

app.post("/auth/create", async (req, res) => {
  log.log("Received account creation request", req.connection.remoteAddress);

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const id = await User.createAccount(username, password);
      res.json({ id });
    } catch (e) {
      if (e instanceof DuplicateAccountError) {
        log.log(
          "Duplicate account exists for request already",
          req.connection.remoteAddress
        );
        res.status(400);
        res.json({
          errors: [e.message]
        });
      } else {
        log.error("Unknown account creation error", e);
      }
    }
  }
});

app.get("/auth/google/response", async (req, res) => {
  log.log("Received redirect from google auth process");

  // received from google, nowe we can retrieve tokens
  const code = req.query.code;
  const client = JWT.getGoogleOAuthClient();

  try {
    log.log("Sending code in exchange for token");
    const response = await client.getToken(code);
    log.log("Got reponse from code -> token", response);

    const {
      tokens: { id_token }
    } = response;

    // this retrieves google public keys and verifies the jwt so someone
    // can't impersonate a user from google who's already signed up
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { sub, email } = payload;

    if (!sub || !email) {
      log.error("Didn't receive sub or email in google payload", sub, email);
      return res.sendStatus(500);
    }

    log.log("Sub / Email", sub, email);

    const user = await User.getUserByExternal(sub);

    let jwt;

    if (!user) {
      log.log("Looks like we're going to create a new user with google id");
      // This google id has no account associated with it
      // so lets create a new one and attach it
      const newUser = await User.createAccountWithExt(email, sub, "google");

      log.log("Here is the newly created user", newUser);

      jwt = JWT.generate(
        newUser.id,
        {
          type: "google",
          payload: id_token
        },
        "Web",
        req.headers["user-agent"]
      );
    } else {
      log.log("We got a google callback with an existing user", user);
      // This google id has an account associated with it,
      // just sign them in

      jwt = JWT.generate(
        user.user_id,
        {
          type: "google",
          payload: id_token
        },
        "Web",
        req.headers["user-agent"]
      );
    }

    res.cookie(COOKIE_NAME, jwt, {
      httpOnly: true,
      secure: true
    });

    res.redirect("/explore");
  } catch (e) {
    log.error("Error with response from google auth", e);
    return res.sendStatus(403);
  }
});

app.get("/auth/google", async (req, res) => {
  const authUrl = JWT.getGoogleAuthUrl();
  res.redirect(authUrl);
});

app.get("*", function(req, res) {
  log.error("API request", req);
  res.sendStatus(404);
});

app.listen(5000, () => {
  log.log("Listening on 5000 🚀");
});
