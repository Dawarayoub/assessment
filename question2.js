const express=require("express")
const bcrypt=require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userRoutes=express.Router()

const generateAcessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_SECURITY_KEY,{expiresIn:'10m'});    
}
userRoutes.post('/update',async (req,res)=>{
    let data = req.body;
    let userData = await userModel.find({user_name:data.user_name});
    
    if(userData.length<=0){
        res.json({msg:"Invalid User Name",status:false});
    }
    else{
        let validPass=await bcrypt.compare(data.password,userData[0].password);
        if(validPass){
            let access_token=generateAcessToken(data)
            let rawPass=req.body.newPassword
            let encPass=await bcrypt.hash(rawPass,10);
            let user=new userModel({...req.body,password:encPass})
            await user.save();
            res.json({msg:"password updated",status:true,token:access_token})
        }
        else{
            res.json({msg:"Invalid Password",status:false})
        }
    }
})
module.exports=userRoutes;