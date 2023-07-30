require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/products')
require('./database/connection')

const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

productRoutes(router)

app.listen(port, () => console.log(`running on port ${port}`))