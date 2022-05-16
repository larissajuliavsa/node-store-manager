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

const createProduct = async (name, quantity) => {
  const findProduct = await models.products.findProductName(name);

  if (findProduct) throw errorMessage(409, 'Product already exists');

  const newProduct = await models.products.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const findProduct = await models.products.getProductId(id);
  if (!findProduct) throw errorMessage(404, 'Product not found');

  const update = await models.products.updateProduct(id, name, quantity);
  return update;
};

const deleteProduct = async (id) => {
  const findProduct = await models.products.getProductId(id);
  if (!findProduct) throw errorMessage(404, 'Product not found');
  const deletePdt = await models.products.deleteProduct(id);
  return deletePdt;
};

module.exports = {
  getAllProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
};
