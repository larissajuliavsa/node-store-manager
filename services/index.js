const productService = require('./product.services');
const saleService = require('./sale.services');

module.exports = {
  products: productService,
  sales: saleService,
};
