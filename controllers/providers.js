import {createHash} from 'crypto';
import jwt from 'jsonwebtoken'
import {providerModel} from '../models/provider-model.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });



export const creatNewProvider = async (req , res) => {
    const body = req.body;
    const password = body.password;
    const hash_pass = createHash('sha256').update(password , 'utf-8').digest('hex');
    body.password = hash_pass ;
    const user = await createUser(body);
    if(user == undefined) { return res.status(500).send("server error")}
    if(user == 400) { return res.status(400).json({error : "email already used before"})}
    return res.status(201).json({success : true});
}

export const loginProvider = async (req , res) => {
    const {email , password} = req.body;
    const hashed_pass = createHash('sha256').update(password , 'utf-8').digest('hex')
    const user = await login({email : email , password : hashed_pass});
    if(user.length == 0 ){ return res.status(404).send("sign up first")}
    if (user[0].email == undefined) { return res.status(404).send("sign up first")}
    const token = jwt.sign({user} , process.env.JWT_PASS )
    return res.status(200).json({...user , token})
}


//helper functions 
const createUser = async (obj) => {
    let status = 200 ;
    const doc = new providerModel( {
        firstName : obj.firstName ,
        lastName : obj.lastName,
        email : obj.email,
        password : obj.password,
        contactNumber : obj.contactNumber,
        profilePicture : obj.profilePicture
    })
    await doc.save().catch( (e) => { 
        if (e.code == 11000) {status = 400}
        else {status = undefined}
    })
    return status;
}

const login = async (obj) => {
    const doc = await providerModel.find({email : obj.email , password : obj.password} , {__v:0})
    return doc ;
}