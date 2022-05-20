const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema({
    email: String,
    name: String,
    img:String,
    description: String,
    quantity: Number,
    price:Number,
    supplier:String
})


module.exports = new mongoose.model('Inventory', inventorySchema)