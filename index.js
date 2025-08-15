require("dotenv").config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRouter = require('./route/product.route')
const userRouter = require('./route/user.route')
const adminRoute = require('./route/admin.route')
const authMiddleware = require('./middleware/auth.middleware')
const adminMiddleware = require('./middleware/adminAuth.middleware')
const errorHandlerMiddleware = require('./middleware/errorHandler.middleware')
PORT = process.env.PORT || 3000


app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});
app.use('/api/v1/user',userRouter)
app.use('/api/v1/products',authMiddleware,productRouter)
app.use('/api/v1/admin',adminMiddleware,adminRoute)

// route not found
app.all('*', (req, res) => { 
  res.status(404).json({ message: 'page not found' }); 
});;


app.use(errorHandlerMiddleware)

const startServer= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT,()=>{
        console.log(`app is listening at ${PORT} and db connected`)
    })
    } catch (error) {
      console.log(error)  
    }
}
startServer()