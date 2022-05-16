const service = require('../services');

const getAllSales = async (_req, res) => {
  const sales = await service.sales.getAllSales();
  return res.status(200).json(sales);
};

const getSaleId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = await service.sales.getSaleId(id);
    return res.status(200).json(saleId);
  } catch (err) {
    next(err);
  }
};

const createSales = async (req, res) => {
  const create = req.body;
  const newSales = await service.sales.createSales(create);
  return res.status(201).json(newSales);
};

module.exports = {
  getAllSales,
  getSaleId,
  createSales,
};
