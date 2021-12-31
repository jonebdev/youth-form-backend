const routes = require('express').Router()
const youth = require('../helpers/youth_registration')
const church = require('../helpers/church_registration')

routes.post('/youth', youth)
routes.post('/church', church)

module.exports = routes