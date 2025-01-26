import express from "express";
import { User } from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoute = express.Router();

const JWT_SECRET = "kritim$b1"; // Put in a secret file

// Create a User using: POST "/api/auth/createUser". Doesn't require Auth
authRoute.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be of length 5").isLength({ min: 5 }),
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

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Authenticate a User using: POST "/api/auth/login". Doesn't require Auth

authRoute.post(
  "/login",
  [body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(), //Password cannot be blank
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Corrected HTTP status code
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }


      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET); //signing the token using my secret key
      res.json(authToken);


    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export { authRoute };
