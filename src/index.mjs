import express from "express";
import cookieParser, { signedCookie } from "cookie-parser";
import session from "express-session";
import user from "./utlis/constant.mjs";
import passport from "passport";
import "./startegy/local-startegy.mjs";
import router from "./routes/userroutes.mjs";
import mongoose from "mongoose";


const app = express();
mongoose.connect("mongodb://localhost/express")
.then(()=> console.log(`connected to database`))
.catch((err) => console.log(`err:${err}`))


app.use(express.json());
app.use(cookieParser("token"));
app.use(session({
    secret:"my secret key",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge: 60000*60},
    
}))

app.listen(3000, () => {
    console.log(`{port running on 3000}`);
});


app.use(router);
app.get("/",(req,res)=>{
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited=true;
    res.cookie("token","1234",{maxAge:60000*60,signed:true});
    res.status(201).send({msg:"hello"});
});
app.post("/auth", (req, res) => {
  const { username, pass } = req.body; 
  const finduser = user.find(u => u.username === username);
  if (!finduser || finduser.pass !== pass) {
    return res.status(400).send({ msg: "not valid credential" });
  }

  req.session.user = finduser;
  console.log(finduser);
  return res.status(200).send(finduser);
});
app.get("/auth/status",(req,res)=>{
     return  req.session.user ? res.status(200).send( req.session.user):res.status(400).send({ msg: "not authenticated" });
})


app.post("/cart", (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    const { body: item } = request;
    const { cart } = request.session;

    if (cart) {
        cart.push(item);
    } else {
        request.session.cart = [item];
    }

    return response.status(201).send(item);
});
app.get("/cart", (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    return response.send(request.session.cart ?? []);
});
app.use(passport.initialize());
app.use(passport.session());

app.post("/api",passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});
app.get("/api/status",(req,res)=>{
    console.log(`inside /api/status`);
    console.log(req.session);
    return req.user?res.send(req.user):res.sendStatus(401);
})
app.post("/api/logout",(req,res)=>{
    console.group(`logout`);
    if(!req.user) return res.sendStatus(401);
    req.logOut((err)=>{
        if(err) return res.sendStatus(400);
        return res.sendStatus(200);
    })
})




