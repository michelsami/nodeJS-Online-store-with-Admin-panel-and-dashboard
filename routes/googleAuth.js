import axios from 'axios';
import  express  from 'express';
import User from '../models/authModel.js'

export const googleRouter = express.Router();
googleRouter.post('/auth/google', async (req, res) => {
    try {
      const { code } = req.body;

      // Exchange the authorization code for an access token
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: '221943485788-s6k663ttk54344l6t0e9291pjmlctjmb.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:4400/auth/google',
        grant_type: 'authorization_code',
      });
  
      const { access_token } = tokenResponse.data;
  
      // Retrieve the user's information using the access token
      const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      const profile = userResponse.data;
  
      // Check if the user already exists in the database
      let user = await User.findOne({ googleId: id });
  
      if (!user) {
        // Create a new user if they don't exist
        user = new User({
          googleId: profile.id,
          displayName: profile.name,
          email : profile.email,
          firstName : profile.name ,
          lastName : profile.name , 
          username : profile.name ,
          hash_password : profile.name ,
        });
        await user.save();
      }
  
      // Return the user's information
      res.json({ user });
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      res.status(500).json({ error: 'Google sign-in failed' });
    }
  });