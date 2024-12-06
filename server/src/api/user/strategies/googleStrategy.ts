import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../../../utils/db.js";
import { randomBytes } from "crypto";
import { hashPassword } from "../utils/passwordUtils.js";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
    throw new Error('Google client ID and secret must be set in environment variables.');
}

const randomPassword = randomBytes(20).toString('hex');
const hashedPassword = await hashPassword(randomPassword)

passport.use(
    new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "https://taskmate-gr45.onrender.com/api/user/google/redirect",
    },async (accessToken:any,refreshToken:any,profile:any,done:any)=> {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    email: profile.emails?.[0].value
                }
            });
            if(!user) {
                user = await prisma.user.create({
                    data: {
                        name: profile.displayName || profile._json.name,
                        email: profile.emails?.[0].value || '',
                        title: 'Developer',
                        role: "Software Developer",
                        isAdmin: true,
                        isActive: true,
                        password: hashedPassword
                    },
                })
            }
            done(null, user);
        } catch (error:any) {
            console.log("Error in google strategy", error);
            done(error, null);
        }
    })
)

passport.serializeUser((user:any, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((userId:any, done) => {
try {
    const user = prisma.user.findUnique({
        where: { id: userId },
    });
    done(null, user);
} catch (error:any) {
    done(error, null);
}
});