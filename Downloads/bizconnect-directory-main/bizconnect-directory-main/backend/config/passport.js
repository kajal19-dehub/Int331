const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Debug configuration
console.log('\n🔧 ========== PASSPORT CONFIG ==========');
console.log('Google Client ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret exists:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('=======================================\n');

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback' // Hardcode for now
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('\n🔑 ========== GOOGLE OAUTH PROFILE ==========');
      console.log('Google Profile ID:', profile.id);
      console.log('Email:', profile.emails?.[0]?.value);
      console.log('Name:', profile.displayName);
      console.log('============================================\n');

      if (!profile.emails || !profile.emails[0]) {
        return done(new Error('No email found in Google profile'), null);
      }

      const email = profile.emails[0].value;
      
      // Check if user exists
      let user = await User.findOne({ email: email });
      
      if (!user) {
        console.log('👤 Creating new user...');
        user = new User({
          name: profile.displayName,
          email: email,
          password: 'google-oauth-' + Date.now(), // Random password
          avatar: profile.photos?.[0]?.value,
          googleId: profile.id,
          isVerified: true
        });
        await user.save();
        console.log('✅ New user created:', email);
      } else {
        console.log('✅ Existing user found:', email);
        // Update Google ID if not set
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
      }
      
      return done(null, user);
    } catch (error) {
      console.error('❌ Google OAuth error:', error);
      return done(error, null);
    }
  }
));

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  console.log('📝 Serializing user:', user.email);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('📖 Deserializing user:', user?.email);
    done(null, user);
  } catch (error) {
    console.error('❌ Deserialize error:', error);
    done(error, null);
  }
});

console.log('✅ Passport Google OAuth configured');