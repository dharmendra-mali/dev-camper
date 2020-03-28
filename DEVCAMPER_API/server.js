const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const color = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')
const cookieparser =require('cookie-parser')
//Load evn vars
dotenv.config({ path: "./config/config.env" })

//Connect to database
connectDB()

//Route files
const bootcamps = require('./routes/bootcamp')
const courses = require('./routes/course')
const auth = require('./routes/auth')
const reviews = require('./routes/review')


const app = express()


//Body parser
app.use(express.json())

//Dev logging middleware
// if (process.env.NODE_ENV === 'devlopment') {
//     app.use(morgan())
// }
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(fileUpload())

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/reviews', reviews)


app.use(cookieparser)
 
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
)

//Handle unhandle rejections
process.on('unhandledRejection', (error, Promise) => {
    console.log(`Error :${error.message}`);
    //Close server & exit process
    server.close(() => process.exit(1))
})
