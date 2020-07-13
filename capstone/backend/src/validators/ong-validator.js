const { celebrate, Segments, Joi } = require('celebrate')

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(1).max(256),
    email: Joi.string().required().email().max(256),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required().min(1).max(256),
    uf: Joi.string().required().length(2)
  })

})
