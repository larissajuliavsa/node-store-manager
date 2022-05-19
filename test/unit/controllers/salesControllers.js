const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../services/sale.services');
const controllers = require('../../../controllers/sale.controller');

describe('Teste de Cobertura na Camada Sale Controllers', () => {
  describe('Controller getAllSales sem vendas', () => {
    const response = {};
    const request = {};
    const execute = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(services, 'getAllSales').resolves(execute);
    });

    after(() => {
      services.getAllSales.restore();
    });

    it('getAllSales retorna um array vazio', async () => {
      await controllers.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

});
