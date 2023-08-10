import passport from 'passport';
import GoogleStrategy  from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = "221943485788-s6k663ttk54344l6t0e9291pjmlctjmb.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
passport.use(new GoogleStrategy.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4400/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user , done) {
    done(null , user)
})

passport.deserializeUser(function (user , done) {
    done(null , user)
})