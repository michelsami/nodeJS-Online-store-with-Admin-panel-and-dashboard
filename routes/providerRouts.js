import { Router } from "express";
import { validregister  , validlogin , validAdminUpdate} from '../utils/validators/providers.js'
import {creatNewProvider , loginProvider , assignNewAdmin ,
     updateProviderDataByAdmin , logout , getall , getById , deleteProvider , ActiveUsers } from '../controllers/providers.js'
import {valid_token} from '../utils/auth/Authntication.js'


const checkRoles = (role , role1 = undefined) => (req, res, next) => {
    if (!req.user.user[0])
    return res
      .status(403)
      .json({ status: "error", message: "Unautharized" });

    if(!role1){
      if (req.user.user[0].roles !== role)
        return res.status(403).json({ status: "error", message: "UnAuthorized" });
    }
    else{    
      if (req.user.user[0].roles !== role && req.user.user[0].roles !== role1)
        return res.status(403).json({ status: "error", message: "UnAuthorized" });
    }  
    next();
};

export const provRouter = Router();

provRouter
    .post("/register" , [validregister , creatNewProvider])
    .post("/login" , [validlogin , loginProvider])
    .post("/logout/:id" , [valid_token , logout])
    .patch("/newadmin/:id" , [valid_token , checkRoles('owner') , assignNewAdmin])
    .patch("/updateprovider/:id" , [valid_token , validAdminUpdate , checkRoles('admin') , updateProviderDataByAdmin])
    .get("/" ,  [valid_token , checkRoles('owner' , 'admin') , getall]) 
    .get("/:id" , [valid_token , checkRoles('owner' , 'admin') , getById])
    .delete("/:id" , [valid_token , checkRoles('admin') , deleteProvider])

// provRouter
//     .get("/activenow" , [valid_token , checkRoles('owner','admin') , ActiveUsers] )

provRouter.get ('/activenow' , async (req , res) => {
    return res.status(200).json({message : "hiiiii"})
})
        