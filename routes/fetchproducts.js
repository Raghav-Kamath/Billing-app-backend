const { Router } = require('express');
const productsModel = require('../models/products');
let router=Router()
const bcrypt=require("bcrypt")
const saltRounds=11

router.get('/products',async(req,res)=>{
    const l=await productsModel.find({},{_id:0,__v:0})
    let ele={}
    l.forEach((p)=>
    {
        ele[p.id]=p
        ele[p.id]['id']=undefined 
    }
    )
    res.json(ele)
})

module.exports=router