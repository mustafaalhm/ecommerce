const express = require('express')
const app = express()
require ('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const bodyParser = require('body-parser')
const cookiParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const { dbConnect } = require('./utilies/db')

dbConnect()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use(bodyParser.json())
app.use(cookiParser())
app.use('/api',authRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))