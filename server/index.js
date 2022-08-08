require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const projectRouter = require('./routes/project')
const contactRouter = require('./routes/contact')
const mainPictureRouter = require('./routes/mainPicture')
const loginRouter = require('./routes/login')
const skillRouter = require('./routes/skill')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const xss =  require('xss-clean')
const rateLimiter = require('express-rate-limit');

const port =  process.env.PORT || 5000
const app = express()

app.set('trust proxy',1);
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));
app.get('/',(req,res)=>{
    res.send({msg:"hello"})
})
//routes
app.use('/project',projectRouter)
app.use('/contact',contactRouter)
app.use('/mainpicture',mainPictureRouter)
app.use('/skill',skillRouter)
app.use('/login',loginRouter)

async function start () {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
