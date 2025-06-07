import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Register
const generateToken = (userId: string) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: "Username is already taken" });
      return;
    }

    if (!password || password.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Add "local" authProvider
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      authProvider: "local",
    });

    await newUser.save();

    const token = generateToken(newUser._id.toString());

    res.status(201).json({
      token,
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

// Log in (username or email + password)
export const login = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body; // identifier = username or email

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password"); 

    if (!user) {
      res
        .status(404)
        .json({ message: "User not found with given e-mail or username" });
      return;
    }

    if (user.authProvider !== "local") {
      res.status(400).json({
        message:
          "User registered with Google. Please log in using Google login.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

// Google OAuth login
export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idToken, username } = req.body;

  console.log("Expected Google Client ID:", GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(400).json({ message: "Invalid Google token" });
      return;
    }

    const { email } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      if (!username) {
        res.status(400).json({ message: "Username is required for new users" });
        return;
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        res.status(400).json({ message: "Username is already taken" });
        return;
      }

      user = new User({
        username,
        email,
        authProvider: "google",
      });

      await user.save();
    } else if (user.authProvider !== "google") {
      res.status(400).json({
        message:
          "User registered with email/password. Please login with username and password.",
      });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({
      message: "Google login failed",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Log out
export const logout = (_req: Request, res: Response): void => {
  res.status(200).json({ message: "Logged out successfully" });
};
