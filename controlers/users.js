import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "invalid input" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      passwordHash,
    });
    await user.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("signIn called: email: ", email, "password: ", password);
    // Validierung
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "invalid input" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).json({ error: "password does not match" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60,
    });
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const matrixshopUsers = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).exec();
    // const users = await User.find().exec();
    return res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
