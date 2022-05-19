const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/Fruits-Warehouse-Management'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB connected`))
.catch(error => console.log(error))