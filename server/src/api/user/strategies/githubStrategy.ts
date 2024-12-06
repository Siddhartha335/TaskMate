import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "../../../utils/db.js";
import { randomBytes } from "crypto";
import { hashPassword } from "../utils/passwordUtils.js";

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!clientID || !clientSecret) {
    throw new Error('GitHub client ID and secret must be set in environment variables.');
}

const randomPassword = randomBytes(20).toString('hex');
const hashedPassword = await hashPassword(randomPassword)

passport.use(
    new GitHubStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "https://taskmate-gr45.onrender.com/api/user/github/redirect",
        scope: ["user:email"]
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
                        name: profile.displayName || profile.username,
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
            console.log("Error in github strategy", error);
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