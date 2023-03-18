require('dotenv').config({ path: '.env' })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// uncomment for local use
// const PORT = process.env.PORT || 9000
const routes = require('./src/routes')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', routes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// uncomment for local use

// app.listen(PORT, () => {
//     console.log(`listening on port ${9000}`)
// })

module.exports = { app }
