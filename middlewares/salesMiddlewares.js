const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSales = (req, _res, next) => {
  const { productId, quantity } = req.body;
  const { error } = schema.validate({ productId, quantity });

  if (error) {
    const errorType = error.message.includes('required') ? 400 : 422;
    return next({ status: errorType, message: error.message });
  }
  next();
};

module.exports = {
  validateSales,
};
