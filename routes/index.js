const routes = require('express').Router()
const youth = require('../helpers/youth_registration')

//more to come
routes.post('/youth', youth)

module.exports = routes