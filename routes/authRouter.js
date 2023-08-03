import { signUp, signIn, signOut } from "../controllers/authController.js";
import {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
} from "../utils/validators/authValidator.js";
import { Router } from "express";
export const router = Router();

router.post("/signin", validateSignInRequest, isRequestValidated, signIn);

router.post("/signup", validateSignUpRequest, isRequestValidated, signUp);

router.post("/signout", signOut);

router.get("/", (req, res) => {
  res.send("Hello World");
});
