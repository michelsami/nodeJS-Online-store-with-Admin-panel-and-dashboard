import { Router } from "express";
import { validregister  , validlogin } from '../utils/validators/providers.js'
import {creatNewProvider , loginProvider , assignNewAdmin} from '../controllers/providers.js'
import {valid_token} from '../utils/auth/Authntication.js'


const checkRoles = (role) => (req, res, next) => {
    if (!req.user.user[0])
      return res
        .status(403)
        .json({ status: "error", message: "Unautharized" });
  
    if (req.user.user[0].roles !== role)
      return res.status(403).json({ status: "error", message: "UnAuthorized" });
  
    next();
};

export const provRouter = Router();

provRouter.post("/register" , [validregister , creatNewProvider])
provRouter.post("/login" , [validlogin , loginProvider])
provRouter.patch("/:id" , [valid_token , checkRoles('owner') , assignNewAdmin])