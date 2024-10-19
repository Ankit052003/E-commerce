const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

function Auth(req, res, next) {
  let authHeader = req.headers.authorization;

  // Check if authHeader is present and well formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: false,
      message: "Authorization header missing or malformed",
    });
  }

  // Extract token from Bearer scheme
  const [, token] = authHeader.split(" ");
  
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Token missing",
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      status: false,
      message: "Server misconfiguration: JWT_SECRET not set",
    });
  }

  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      let message = "Invalid Token";
      if (err.name === "TokenExpiredError") {
        message = "Token Expired";
      } else if (err.name === "JsonWebTokenError") {
        message = "Malformed Token";
      }
      return res.status(401).json({
        status: false,
        message: message,
      });
    }

    try {
      // Fetch the user from the database using the token payload (id)
      const existingUser = await UserModel.findById(payload.id);
      if (!existingUser) {
        return res.status(404).json({
          status: false,
          message: "User Not Found",
        });
      }

      // Attach the user object to the request
      req.user = existingUser;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
}

module.exports = Auth;
