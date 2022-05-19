const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


// component
const inventoryRoutes = require('./routes/inventoryRoutes')


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// routes define
app.use(inventoryRoutes)


// server listen
app.listen(port, () =>{
    console.log(`server is running at port ${port}`);
})