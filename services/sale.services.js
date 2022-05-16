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

const createSales = async (create) => {
  const idCreated = await models.sales.createSaleId();

  await Promise.all(create.map(({ productId, quantity }) =>
    models.sales.createSales(idCreated, productId, quantity)));
  // console.log('Console Services:  ', create) ----  retornando como Promise pending, resolver com PromiseAll

  return { id: idCreated, itemsSold: [...create] };
};

module.exports = {
  getAllSales,
  getSaleId,
  createSales,
};
