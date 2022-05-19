const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../models/sale.model');
const services = require('../../../services/sale.services');

describe('Teste de Cobertura na Camada Sale Services', () => {
  describe('Service getAllSales sem vendas', () => {
    const execute = [[]];

    before(() => {
      sinon.stub(models, 'getAllSales').resolves(execute);
    });

    after(() => {
      models.getAllSales.restore();
    });

    it('getAllSales retorna um array vazio', async () => {
      const response = await services.getAllSales();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

});
