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

module.exports = {
  getAllSales,
  getSaleId,
};
