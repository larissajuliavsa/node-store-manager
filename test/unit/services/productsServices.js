const sinon = require('sinon');
const { expect } = require('chai');
const models = require('../../../models/product.model');
const services = require('../../../services/product.services');

describe('Teste de Cobertura na Camada Product Services', () => {
  
  describe('Service getAllProducts sem produtos', () => {
    const execute = [];

    before(() => {
      sinon.stub(models, 'getAllProducts').resolves(execute);
    });
    after(() => {
      models.getAllProducts.restore();
    });

    it('getAllProducts retorna um array vazio', async () => {
      const response = await services.getAllProducts();
      
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

});
