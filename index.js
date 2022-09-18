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




async function k()
{
    //     productModel.create({
    //   name:"Redmi 19",
    //   id:"2222",
    //   category:"Phone",
    //   color:"white",
    //   amount:12990
    // })
    //     productModel.create({
    //   name:"Redmi 10",
    //   id:"111111",
    //   category:"Phone",
    //   color:"white",
    //   amount:12990
    // })
    //     productModel.create({
    //   name:"Mi TV",
    //   id:"29348",
    //   category:"TV",
    //   color:"white",
    //   amount:29483
    // })
//   operatorModel.create({name:'Ben Ten',
//   id: 111111,
//   password: await bcrypt.hash('bentenover',saltRounds),
//   storeType: 'Mi Store',
//   storeName: 'Vijjsd',
//   location: 'America'
// })
//   operatorModel.create({name:'Mike WIck',
//   id: 22222,
//   password: await bcrypt.hash('letsg0',saltRounds),
//   storeType: 'Mi Store',
//   storeName: 'Vijjsd',
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