const express = require('express')
const router = express.Router()



router.get('/', (req, res) =>{
    res.json({message: 'your server is running successfully.'})
})



module.exports = router;