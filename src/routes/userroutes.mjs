import { Router } from "express";
import {query,validationResult,checkSchema,matchedData} from "express-validator"
import { userQuerySchema,uservalidation } from "../utlis/validationschema.mjs";
import user from "../utlis/constant.mjs";
import { modeluser } from "../mongoose/schemas/schemauser.mjs";
const router = Router();
router.get("/userss",(req,res)=>{
    console.log(req.sessionID);
    console.log(req.signedCookies.token);
    req.sessionStore.get(req.sessionID,(err,sessionData)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log(sessionData);

    })
    if(req.signedCookies.token && req.signedCookies.token==="1234")
        return res.send(user);
    return res.send({ msg:"sorry wrong cookie"});
})
router.get("/users",checkSchema( userQuerySchema), (req, res) => {
    const error= validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).send({error:error.array()})
    }
    const { query: { filter, value } } = req;
    if (!filter && !value) return res.send(user);
    if (filter && value) return res.send(user.filter((user) => user[filter].includes(value)));
});
router.post("/user",
    checkSchema(uservalidation) ,async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({error:result.array()})
    }
    const data = matchedData(result);
    const newuser = new modeluser(data);
    try{
        const saveuser = await newuser.save();
         res.status(201).send(saveuser);
    }
    catch(err){
        console.log(err);
    }
   
});
router.get("/user/:id", (req, res) => {
    const finduser = user.find((user) => user.id == req.params.id);
    res.status(200).send(finduser);
});
router.put("/user/:id",(req,res)=>{
    const{body,params:{id}} = req;
    const index = user.findIndex((user)=>user.id == id);
    if(index == -1) return res.sendStatus(400);
    user[index] = {id,...body};
    return res.sendStatus(200);
});
router.patch("/user/:id",(req,res)=>{
    const{body,params:{id}} = req;
    const index = user.findIndex((user)=>user.id == id);
    if(index == -1) return res.sendStatus(400);
    user[index] = {...user[index],...body};
    return res.sendStatus(200);
});
router.delete("/user/:id",(req,res)=>{
    const{body,params:{id}} = req;
    const index = user.findIndex((user)=>user.id == id);
    if(index == -1) return res.sendStatus(400);
    user.splice(index,1);
    return res.sendStatus(200);
});

export default router;
