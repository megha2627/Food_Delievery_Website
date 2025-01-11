const express = require('express')
const cors = require('cors')
const app = express()
const mongoDB = require('./db')

// Middleware to parse JSON bodies
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

})

// Connect route
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require('./Routes/OrderData'))

mongoDB();

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})