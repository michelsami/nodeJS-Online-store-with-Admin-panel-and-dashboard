import { StatusCodes } from "http-status-codes";
import User from "../models/authModel.js";
// import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import shortid from "shortid";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const hash_password = await hash(password, 10);

  const userData = {
    firstName,
    lastName,
    email,
    username,
    hash_password,
  };

  const user = await User.findOne({ email });
  const usernameValue = await User.findOne({ username });
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered",
    });
  } else if (usernameValue) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered with the same username",
    });
  } else {
    User.create(userData).then((data, err) => {
      if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
      else
        res
          .status(StatusCodes.CREATED)
          .json({ message: "User created Successfully" });
    });
  }
};

export const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await findOne({ email: req.body.email });

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(StatusCodes.OK).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Something went wrong!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
