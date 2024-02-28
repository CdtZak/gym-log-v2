const express = require('express')
const morgan = require('morgan')
const app = express()
const userRouter = require('./routes/userRoutes')
const cors = require ('cors')
const path = require('path')
app.use(cors())
app.set('view engine','ejs')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{
    res.send('Welcome to gym log ! ')
})
app.use('/',userRouter)

module.exports = app;