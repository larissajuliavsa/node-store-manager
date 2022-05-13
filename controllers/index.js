const productController = require('./product.controller');
const saleController = require('./sale.controller');

module.exports = {
  products: productController,
  sales: saleController,
};
