const mongoose = require('mongoose')
const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const operatorModel = require('./models/operator')
const productModel = require('./models/products')
const ordersModel=require('./models/orders')
const loginRoutes=require('./routes/login')
const productRoutes=require('./routes/fetchproducts')
const paymentRoutes=require('./routes/payment')
const bcrypt=require("bcrypt")
const saltRounds=11


mongoose.connect('mongodb://localhost:27017/billingApp').then(
  ()=>console.log("connected")
)
const session=require("express-session")
const Time=1000*60*60
const MongoStore=require("connect-mongodb-session")(session)

const sessionMidware=session({
    secret:"hello world",
    resave: false,
    saveUninitialized: false,
    cookie:{
      // sameSite:"none",
      maxAge:Time,
      httpOnly:true,
      // secure:true
    },
    store:new MongoStore({uri:process.env.CONNECT_DB_URL||'mongodb://localhost:27017/billingApp',collection:"sessions"})
  })

app.set('view engine','html')
app.set("trust proxy",1)
app.use(cors(
  {
    origin: (origin,callback)=>{return callback(null,true)},
    credentials:true
  }
))


app.use(sessionMidware)
app.use(express.json())
app.use(loginRoutes)
app.use(productRoutes)
app.use(paymentRoutes)


// productModel.create({
//   name:"Redmi 9",
//   id:"11111",
//   category:"Phone",
//   color:"white",
//   amount:12900
// })

async function k()
{
  // const k=await productModel.findOne({id:"11111"})
  // ordersModel.create({
  //   orderId:"8923874",
  //   products:[{productId:k._id,quantity:3}]
  // })
  
//   operatorModel.create({name:'Ben Ten',
//   id: 111111,
//   password: await bcrypt.hash('bentenover',saltRounds),
//   storeType: 'Mi Store',
//   storeName: 'Vijjus',
//   location: 'America'
// })
}

k()

  
const server = http.createServer(app);
const port = 80

app.get('/', (req, res) => {
  res.send('Hello')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})