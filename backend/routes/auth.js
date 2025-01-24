import express from "express";
import {User} from "../models/User.js";
import { body, validationResult } from "express-validator";

const authRoute = express.Router();

// Create a User using: POST "/api/auth/". Doesn't require Auth
authRoute.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
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
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export {authRoute};
