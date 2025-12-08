const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        messsage: "Authorization header missing",
      });
    }

    const [type, token] = bearerToken.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        messsage: "Invalid authorization format",
      });
    }

    const decode = jwt.verify(token, "secretkey");

    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      messsage: "Invalid or expired token",
    });
  }
};

module.exports = authorization;
