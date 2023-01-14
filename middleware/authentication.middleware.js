const jws = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.headers.authenticate;
  if (token) {
    const decode = jws.verify(token, process.env.key);
    if (decode) {
      const userID = decode.userID;
      req.body.userID = userID;
      next();
    } else {
      res.send("please login first");
    }
  } else {
    res.send("enter a token");
  }
}

module.exports = { authentication };
