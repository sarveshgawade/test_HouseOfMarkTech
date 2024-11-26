import express from 'express'
import connectToDB from './config/connectToDB.js'
import urlRouter from './routes/urlRoutes.js'
import rateLimit from 'express-rate-limit'

// taking instance of express
const app = express()

// connecting to DB
connectToDB()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// applying rate limiter to all routes
const limiter = rateLimit({
    windowMs: 60*1000,
    max: 100,
    message: 'Request limit reached. Please try again later'
})

// root route
app.use('/',urlRouter)

// testing route
app.get('/ping',(req,res)=>{
    res.send("pong")
})


// exporting the app 
export default app