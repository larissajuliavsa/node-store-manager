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

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return { id, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  // const [update] = await connection.execute(query, [name, quantity, id]);
  // console.log(update);
  await connection.execute(query, [name, quantity, id]);
  return { id, name, quantity };
};

module.exports = {
  getAllProducts,
  getProductId,
  findProductName,
  createProduct,
  updateProduct,
};
