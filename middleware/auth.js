const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    // req token from header
    const token = req.headers['x-access-token'];

    // verify token
    jwt.verify(token, process.env.SECRET_KEY,(error, decoded) => {
            if (error) return res.status(400).json({ message: 'Unauthorized User', error })
            
            req.decoded = decoded
            next()
    })
}

module.exports = auth