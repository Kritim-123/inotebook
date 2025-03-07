import express from "express";
import { User } from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fetchuser } from "../middleware/fetchuser.js";

const authRoute = express.Router();

const JWT_SECRET = "kritim$b1"; // Put in a secret file

// ROUTE:1 Create a User using: POST "/api/auth/createUser". Doesn't require Auth
authRoute.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be of length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Corrected HTTP status code
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        success = false;
        return res.status(400).json({ success, error: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //signing the token using my secret key
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success, error: "Server error" });
    }
  }
);

// ROUTE:2 Authenticate a User using: POST "/api/auth/login". Doesn't require Auth

authRoute.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(), //Password cannot be blank
  ],
  async (req, res) => {
    let success = false;
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Corrected HTTP status code
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET); //signing the token using my secret key
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success, error: "Internal server error" });
    }
  }
);

// ROUTE:3 Get logged in User Detail using: POST "/api/auth/getuser". Login required

authRoute.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { authRoute };
