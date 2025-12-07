const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const { username } = req.body;
    if (!bearerToken) {
      return res.status(401).json({
        messsage: "Bearer token not found",
      });
    }

    const token = bearerToken.split(" ");

    if (token[0] !== "Bearer") {
      return res.status(401).json({
        messsage: "Bearer token is required",
      });
    }

    if (!token[1]) {
      return res.status(401).json({
        messsage: "token not found",
      });
    }

    const decode = jwt.verify(token[1], "secretkey");
    if (decode.username === username) {
      return res.status(403).json({
        messsage: "you are not a " + username,
      });
    }
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({
      messsage: error.messsage,
    });
  }
};

module.exports = authorization;
