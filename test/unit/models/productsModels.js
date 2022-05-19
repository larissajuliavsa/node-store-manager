const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const models = require('../../../models/product.model');


describe('Teste de Cobertura na Camada Product Models', () => {

  describe('Model getAllProducts sem produtos', () => {
    const execute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('getAllProducts retorna um array vazio', async () => {
      const response = await models.getAllProducts();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

});
