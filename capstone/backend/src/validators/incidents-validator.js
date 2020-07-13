const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {

  list: celebrate({
    [Segments.QUERY]: {
      page: Joi.number().positive(),
      size: Joi.number().positive()
    }

  }),

  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().length(8)
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(1).max(256),
      description: Joi.string().required().min(1).max(512),
      value: Joi.number().required().positive()
    })

  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().length(8)
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required().positive()
    })

  })

}
