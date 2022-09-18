const {Router}=require('express')
let router=Router()
const Razorpay=require( "razorpay");
const ordersModel = require('../models/orders');
var instance = new Razorpay({
    key_id: 'rzp_test_M63g6VyaN4ll41',//this is just a test key and secret
    key_secret: 'NrbFEEqUhgen6TIE4ZXtzIrz',
});

router.post("/getpayment",async(req,res)=>{
    if(!req.session.user)
    {
        res.send({error:"Bad request"})
    }   
    instance.paymentLink.create({
        amount: req.body.total*100,
        currency: "INR",
        reference_id:req.body.orderId,
        description: "Payment",
        callback_url: "http://localhost/confirm",
        callback_method: "get",
    }).then(async (data)=>{
        console.log(data)
        const order=await ordersModel.create(req.body)
        order.razorpayLink=data.short_url
        await order.save()
        res.json({link:data.short_url})
    }).catch(err=>{
        console.log(err)
        res.json({error:"Bad request"})
    })

})

router.get("/confirm",async(req,res)=>{
    const order=await ordersModel.findOne({orderId:req.query.razorpay_payment_link_reference_id})
    order.razorpaymentID=req.query.razorpay_payment_id
    order.save()
    res.send(`<center><h1>Thank You</h1></center>
    <center><h2>Shopping with us</h2></center>
    `)
})

router.post("/getOrders",async(req,res)=>{
    if(!req.session.user)
    {
        res.send({error:"Bad request"})
    }
    res.json(await ordersModel.find({operatorId:req.session.user},{_id:0,__v:0}))
})

router.post("/addOrders",async(req,res)=>{
    if(!req.session.user)
    {
        res.send({error:"Bad request"})
    }
    try{
    await ordersModel.create(req.body.orders)
    res.json({status:"success"})
    }
    catch{
        res.send({error:"Bad request"})
    }
})

module.exports=router
