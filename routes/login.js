const { Router } = require('express');
const operatorModel = require('../models/operator');
let router=Router()
const bcrypt=require("bcrypt")
const saltRounds=11

router.get("/info",async(req,res)=>{
    try{
        console.log(req.session.user)
    if(req.session.user)
    {
        res.json(await operatorModel.sendData((req.session.user)))
    }
    else{
        res.json({error:"failure"})
    }
    }
    catch{
        res.json({error:"failure"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        // console.log(req.session.user)
        const user=await operatorModel.findOne({id:req.body.id},{_id:0});
        if(user && await bcrypt.compare(req.body.password,user.password)){
            req.session.user=req.body.id
            res.json(await operatorModel.sendData(req.body.id))
        }
        else{
            res.json({error:"invalid username/password"})
        }

    }
    catch(e)
    {
        console.log(e)
        res.json({error:"invalid username/password"})
    }
})

router.post('/update',async(req,res)=>{
    try{
        console.log(req.body)
        const user=await operatorModel.findOne({id:req.session.user});
        user.storeName=req.body.storeName
        user.storeType=req.body.storeType
        user.location=req.body.location
        await user.save()
        console.log(user)
        res.json(await operatorModel.sendData(req.session.user))
    }
    catch(e)
    {
        console.log(e)
        res.json({error:"Error bad request"})
    }
})

module.exports=router