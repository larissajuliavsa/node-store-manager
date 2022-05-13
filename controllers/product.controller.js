const service = require('../services');

const getAllProducts = async (_req, res) => {
  const products = await service.products.getAllProducts();
  return res.status(200).json(products);
};

const getProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await service.products.getProductId(id);
    return res.status(200).json(productId);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductId,
};