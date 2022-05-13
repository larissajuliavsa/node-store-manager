const models = require('../models');

const errorMessage = (status, message) => ({
  status,
  message,
});

const getAllProducts = async () => {
  const products = await models.products.getAllProducts();
  return products;
};

const getProductId = async (id) => {
  const productId = await models.products.getProductId(id);

  if (!productId) throw errorMessage(404, 'Product not found');

  return productId;
};

module.exports = {
  getAllProducts,
  getProductId,
};
