const express = require('express')
const routes = express.Router()
const OngController = require('./controllers/ong-controller')
const IncidentController = require('./controllers/incident-controller')
const ProfileController = require('./controllers/profile-controller')
const SessionController = require('./controllers/session-controller')
const HealthController = require('./controllers/health-controller')

const OngValidator = require('./validators/ong-validator')
const SessionValidator = require('./validators/session-validator')
const ProfileValidator = require('./validators/profile-validator')
const IncidentsValidator = require('./validators/incidents-validator')

routes.post('/session', SessionValidator, SessionController.create)

routes.get('/ongs', OngController.list)
routes.post('/ongs', OngValidator, OngController.create)

routes.get('/profile', ProfileValidator, ProfileController.list)

routes.get('/incidents', IncidentsValidator.list, IncidentController.list)
routes.post('/incidents', IncidentsValidator.create, IncidentController.create)
routes.delete('/incidents/:id', IncidentsValidator.delete, IncidentController.delete)

routes.get('/health', HealthController.health)

module.exports = routes
