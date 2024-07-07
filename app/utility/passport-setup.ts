import passport from "passport";

import GoogleStrategy from "passport-google-oauth2";

const googleStrategy = GoogleStrategy.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as any);
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

export let userProfile: any;
passport.use(
  new googleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: GOOGLE_CALLBACK_URL as string,
      passReqToCallback: true,
    },
    (
      request: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      userProfile = profile;
      return done(null, profile);
    }
  )
);
