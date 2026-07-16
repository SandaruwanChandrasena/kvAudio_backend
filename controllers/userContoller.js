import User from "../models/user.js";
import bcrypt from "bcrypt";

// Register user
export async function registerUser(req, res) {
  try {
    const data = req.body;

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = new User(data);
    const result = await newUser.save();

    res.status(201).json({
      message: "User save Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "User saved Failed",
      error: error.message,
    });
  }
}

// Login User

export async function loginUser(req, res) {
  try {
    const dataUser = req.body;

    const user = await User.findOne({ email: dataUser.email });

    if (!user) {
      res
        .status(404)
        .json({ message: "Your not a register user. Register first" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      dataUser.password,
      user.password,
    );

    if (isPasswordCorrect) {
      return res.json({
        message: "Login Successfull",
        user: dataUser.email,
      });
    } else {
      return res.json({
        error: "Login error",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "User Login failed",
      error: error.message,
    });
  }
  
}
