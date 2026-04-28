const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Remove Bearer if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    console.log("TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
// Authorization: <JWT_TOKEN>

// The middleware will:

// 1️⃣ Read the token
// 2️⃣ Verify it using JWT_SECRET
// 3️⃣ Decode payload
// 4️⃣ Attach user data to request

// {
//   "id": "664f5b6f3a7c9e...",
//   "role": "admin"
// }
// req.user.id
// req.user.role