import jwt from "jsonwebtoken";

const JWT_SECRET = "kritim$b1"; // Put in a secret file

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    console.log("Token not provided");
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Data:", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

export { fetchuser };
