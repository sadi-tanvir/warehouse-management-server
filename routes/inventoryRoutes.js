const express = require('express')
const router = express.Router()
const Inventory = require('../model/Inventory')


// get all inventory items
router.get('/inventory', async (req, res) =>{
    const inventory = await Inventory.find()
    res.json({inventory})
})

// get single inventory item
router.get('/inventory/item', async (req, res) =>{
    const inventoryItem = await Inventory.findOne({_id: req.query.id})
    res.json({inventoryItem})
})


module.exports = router;