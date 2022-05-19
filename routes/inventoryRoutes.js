const express = require('express')
const router = express.Router()
const Inventory = require('../model/Inventory')



router.get('/inventory', async (req, res) =>{
    const inventory = await Inventory.find()
    res.json({inventory})
})



module.exports = router;