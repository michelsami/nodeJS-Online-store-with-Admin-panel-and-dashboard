import { Router } from "express";
import { validregister  , validlogin } from '../utils/validators/providers.js'
import {creatNewProvider , loginProvider} from '../controllers/providers.js'


const checkRoles = (role) => (req, res, next) => {
    if (!req.user.user[0])
      return res
        .status(403)
        .json({ status: "error", message: "Unautharized" });
  
    if (!req.user.user[0].roles.includes(role))
      return res.status(403).json({ status: "error", message: "UnAuthorized" });
  
    next();
};

export const provRouter = Router();

provRouter.post("/register" , [validregister , creatNewProvider])
provRouter.post("/login" , [validlogin , loginProvider])