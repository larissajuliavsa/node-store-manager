const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT salePrd.sale_id AS 'saleId',
                        sale.date,
                        salePrd.product_id AS 'productId',
                        salePrd.quantity
                FROM StoreManager.sales_products AS salePrd
                JOIN StoreManager.sales AS sale ON salePrd.sale_id = sale.id
                ORDER BY 'saleId', 'productId'`;

  const [sales] = await connection.execute(query);
  return sales;
};

const getSaleId = async (id) => {
  const query = `SELECT sale.date,
                        salePrd.product_id AS 'productId',
                        salePrd.quantity
                FROM StoreManager.sales_products AS salePrd
                JOIN StoreManager.sales AS sale ON salePrd.sale_id = sale.id
                WHERE salePrd.sale_id = ?
                ORDER BY 'productId'`;
  const [saleId] = await connection.execute(query, [id]);
  return saleId;
};

const createSaleId = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId: id }] = await connection.execute(query);
  return id;
};

const createSales = async (id, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;
  const [create] = await connection.execute(query, [id, productId, quantity]);
  return create;
};

const updateSales = async (id, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products SET quantity = ? 
                  WHERE sale_id = ? AND product_id = ?;`;
  const [update] = await connection.execute(query, [quantity, id, productId]);
  return update;
};

const deleteSales = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';
  await connection.execute(query, [id]);
};

const sumSalesQuantity = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?;';
  const [salesQuantity] = await connection.execute(query, [quantity, id]);
  return salesQuantity;
};

const minusSalesQuantity = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?;';
  const [salesQuantity] = await connection.execute(query, [quantity, id]);
  return salesQuantity;
};

module.exports = {
  getAllSales,
  getSaleId,
  createSaleId,
  createSales,
  updateSales,
  deleteSales,
  sumSalesQuantity,
  minusSalesQuantity,
};
