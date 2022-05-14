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

const findProductName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [productName] = await connection.execute(query, [name]);
  return productName[0];
};

module.exports = {
  getAllProducts,
  getProductId,
  findProductName,
};
