import { StatusCodes } from "http-status-codes";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
import shortid from "shortid";

const { sign, verify } = jwt;

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

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const authenticated = await user.authenticate(req.body.password);
      if (authenticated) {
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

export const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "Authorization Failed" });
    }
    const info = verify(token, process.env.JWT_SECRET)
    // const newTokens = tokens.filter((t) => t.token === token);
    const user = await User.findById(info);
    // console.log(user);
    res.json({ success: true, message: "Sign Out Successfully",user });
  }
};

// export const signout = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     console.log(req.body.token);
//     req.user.deleteToken(req.token, (err, user) => {
//       res.status(200).json({ message: "logout success" });
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// logout.prototype.logoutUser = function(req, res, callback){
//   var sess = req.session.user;
//   if(sess){
//       req.session.user = null;
//       return callback(null, {'success': true, "message": "user logout successfully"});
//   }
//   callback(null, {'success': true, "message": "user logout successfully"});
// }
