import express from "express";
import passport from 'passport';
import "../utils/google/auth.js"



export const googleRouter = express.Router();


// Set up routes for authentication
googleRouter.get('/',
  passport.authenticate('google', { scope: ['profile'] })
);

googleRouter.get('/callback', 
    passport.authenticate('google', { 
        failureRedirect: 'http://localhost:5500/views/pages/login/login.html' , 
        successRedirect : 'http://localhost:5500/views/pages/login/login.html' }));

