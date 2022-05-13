const models = require('../models');

const errorMessage = (status, message) => ({
  status,
  message,
});

const getAllSales = async () => {
  const sales = await models.sales.getAllSales();
  return sales;
};

const getSaleId = async (id) => {
  const saleId = await models.sales.getSaleId(id);

  if (!saleId || saleId.length === 0) throw errorMessage(404, 'Sale not found');

  return saleId;
};

module.exports = {
  getAllSales,
  getSaleId,
};
