const Joi = require('joi');

const schemaSales = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).integer().required(),
});

const validateSales = (req, _res, next) => {
  const { body } = req;

  body.forEach(({ productId, quantity }) => {
    const { error } = schemaSales.validate({ productId, quantity });
    if (error) {
        const errorType = error.message.includes('required') ? 400 : 422;
        return next({ status: errorType, message: error.message });
      }
  });

  next();
};

module.exports = {
  validateSales,
};
