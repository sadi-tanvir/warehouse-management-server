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
    if(!inventoryItem) return res.json({message: 'Inventory Item not found'})
    res.json({inventoryItem})
})


// delivered inventory item
router.post('/delivered/:id', async (req, res) => {
    const _inventoryItem = await Inventory.findOne({_id: req.params.id})
    if(!_inventoryItem) return res.json({message: 'Inventory Item not found'})
    _inventoryItem.quantity = _inventoryItem.quantity - 1
    const inventoryItem = await _inventoryItem.save()
    res.json({inventoryItem})
})


// update stock quantity
router.post('/increase/:id', async (req, res) => {
    const _inventoryItem = await Inventory.findOne({_id: req.params.id})
    if(!_inventoryItem) return res.json({message: 'Inventory Item not found'})
    _inventoryItem.quantity = _inventoryItem.quantity + req.body.quantity
    const inventoryItem = await _inventoryItem.save()
    res.json({inventoryItem})
})

module.exports = router;