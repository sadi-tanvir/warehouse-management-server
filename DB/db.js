const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.jnizw.mongodb.net/Fruits-Warehouse-Management?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB connected`))
.catch(error => console.log(error))