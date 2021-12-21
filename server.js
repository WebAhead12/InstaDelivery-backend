const express = require('express')
const cors = require('cors')

const router = require('./router')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})