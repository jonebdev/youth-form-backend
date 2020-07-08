require('dotenv').config({ path: '.env' });
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const routes = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})