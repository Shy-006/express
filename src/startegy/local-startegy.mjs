import passport from "passport";
import { Strategy } from "passport-local";
import user from "../utlis/constant.mjs";
import { modeluser } from "../mongoose/schemas/schemauser.mjs";

passport.serializeUser((user,done)=>{
    console.log(`inside serial user`);
    console.log(user);
    done(null,user.id);
})
passport.deserializeUser( async(id,done)=>{
    console.log(`deserialise user`);
    console.log(`id:${id}`);
   try{
     const finduser =  await modeluser.findById(id);
    if(!finduser) throw new Error("user not found");
    done(null,finduser);
   }
   catch(err) {
    done(err,null);
   }
})

passport.use(
  new Strategy(
    {
      usernameField: "username", 
      passwordField: "pass",    
    },
    async (username, pass, done) => {
      try {
        const finduser = await modeluser.findOne({username});
        if (!finduser) throw new Error("user not found");
        if (finduser.pass !== pass) throw new Error("Bad Credentials");
        done(null, finduser);
      } catch (err) {
         done(err, null);
      }
    }
  )
);

export default passport;
