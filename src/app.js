require('dotenv').config()
const express = require('express')
const cors = require('cors')
import productRoutes from './routes/products'

const app = express()
const port = 3000 || process.env.PORT
const router = express.Router()

app.use(express.json())
app.use(cors())
app.use('/api', router)

productRoutes(router)

app.listen(port, () => console.log(`running on port ${port}`))