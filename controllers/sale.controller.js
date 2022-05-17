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

const createSales = async (req, res, next) => {
  try {
    const create = req.body;
    const newSales = await service.sales.createSales(create);
    return res.status(201).json(newSales);
  } catch (err) {
    next(err);
  }
};

const updateSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateBody = req.body;
    const update = await service.sales.updateSales(id, updateBody);
    return res.status(200).json(update);
  } catch (err) {
    next(err);
  }
};

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteSl = await service.sales.deleteSales(id);
    return res.status(204).json(deleteSl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSales,
  getSaleId,
  createSales,
  updateSales,
  deleteSales,
};
