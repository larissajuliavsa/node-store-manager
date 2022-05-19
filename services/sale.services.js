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

  return { id: idCreated, itemsSold: [...create] };
};

const updateSales = async (id, updateBody) => {
  await Promise.all(updateBody.map(({ productId, quantity }) =>
  models.sales.updateSales(id, productId, quantity)));

  return { saleId: id, itemUpdated: [...updateBody] };
};

const deleteSales = async (id) => {
  const findSale = await models.sales.getSaleId(id);
  if (!findSale || findSale.length === 0) throw errorMessage(404, 'Sale not found');

  const deleteSl = await models.sales.deleteSales(id);
  return deleteSl;
};

module.exports = {
  getAllSales,
  getSaleId,
  createSales,
  updateSales,
  deleteSales,
};
