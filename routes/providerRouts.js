import { Router } from "express";
import { validregister  , validlogin , validAdminUpdate} from '../utils/validators/providers.js'
import {creatNewProvider , loginProvider , assignNewAdmin , updateProviderDataByAdmin , logout} from '../controllers/providers.js'
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

provRouter
    .post("/register" , [validregister , creatNewProvider])
    .post("/login" , [validlogin , loginProvider])
    .post("/logout/:id" , [valid_token , logout])
    .patch("/newadmin/:id" , [valid_token , checkRoles('owner') , assignNewAdmin])
    .patch("/updateprovider/:id" , [valid_token , validAdminUpdate , checkRoles('admin') , updateProviderDataByAdmin])