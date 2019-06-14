const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }
  try {
    //sets a variable that verified the jwt and uses config to get the token from db.js folder
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //sets the request equal to the decoded user token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
