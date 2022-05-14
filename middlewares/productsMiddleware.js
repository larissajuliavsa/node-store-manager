const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProducts = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = schema.validate({ name, quantity });

  // console.log(error);

  if (error) {
    const errorType = error.message.includes('required') ? 400 : 422;
    return next({ status: errorType, message: error.message });
  }

  next();
};

module.exports = {
  validateProducts,
};
