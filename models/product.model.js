const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);
  return products;
};

const getProductId = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [productId] = await connection.execute(query, [id]);
  return productId[0];
};

module.exports = {
  getAllProducts,
  getProductId,
};
