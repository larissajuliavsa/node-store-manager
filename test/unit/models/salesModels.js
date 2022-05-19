const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const models = require('../../../models/sale.model');

describe('Teste de Cobertura na Camada Sale Models', () => {

  describe('Model getAllSales sem vendas', () => {
    const execute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('getAllSales retorna um array vazio', async () => {
      const response = await models.getAllSales();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });


});
