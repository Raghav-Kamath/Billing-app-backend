const mongoose = require('mongoose')
const express = require('express')
const operatorModel = require('./models/operator')


mongoose.connect('mongodb://localhost:27017/billingApp').then(()=>console.log("connected")
)
operatorModel.create({name:'Ben Dover',
  id: 111111,
  password: 'bendover',
  storeType: 'Mi Store',
  storeName: 'Vijjus',
  location: 'Nitte'})
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})