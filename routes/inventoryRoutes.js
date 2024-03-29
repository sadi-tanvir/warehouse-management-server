const express = require('express')
const router = express.Router()
const Inventory = require('../model/Inventory')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')




// get all inventory items
router.get('/inventory',  async (req, res) =>{
    const page = req.query.page;
    const size = req.query.size;
    const inventory = await Inventory.find().skip(page * size).limit(size)
    res.json({inventory})
})


// product count
router.get('/inventoryCount',async (req, res) => {
    const count = await Inventory.estimatedDocumentCount()
    res.json({count})
})

// get all inventory items
router.get('/homeInventory', async (req, res) =>{
    const inventory = await Inventory.find().limit(6)
    res.json({inventory})
})

// get My items
router.get('/myInventory', auth, async (req, res) =>{
    const inventory = await Inventory.find({email: req.query.email})
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


// add inventory item
router.post('/addInventory', async (req, res) => {
    const {email,name,img,description,quantity,price,supplier} = req.body;
    const _addInventoryItem = new Inventory({
        email,
        name,
        img,
        description,
        quantity,
        price,
        supplier
    })

    const _addedInventory = await _addInventoryItem.save()
    if(!_addedInventory) return res.json({message: 'Inventory Item adding failed'})
    res.json({
        message: 'Inventory Item added successfully.',
        _addedInventory
    })
})


// delete inventory item
router.delete('/deleteItem/:id', async (req, res) => {
    const _inventoryItem = await Inventory.findOneAndDelete({_id: req.params.id})
    if(!_inventoryItem) return res.json({message: 'Inventory Item not found'})

    res.json({
        message: 'Inventory Item deleted successfully.',
        _inventoryItem
    })
})



module.exports = router;