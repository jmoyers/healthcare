var crypto = require("crypto");
var jwt = require("jsonwebtoken");

crypto.randomBytes(256, function(ex, buf) {
  if (ex) throw ex;
  console.log(buf.toString("base64"));
});
