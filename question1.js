const express=require("express");
const router=express.Router();
const product=require('../models/product')

router.get('/find',async(req,res)=>{
    try{
    const minPrice=req.paramas.minPrice;
    const products=await product.find({price:{$gt:minPrice}}).sort({price:-1}).exec();
    res.json(products);
    }catch(err){
        res.json({message:err});
    }
})
module.exports=router;
