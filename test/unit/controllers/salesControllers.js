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

  describe('Controller getAllSales com produtos', () => {
    const response = {};
    const request = {};
  
    const execute = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]
  
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services, 'getAllSales').resolves(execute);
    });
  
    after(() => {
      services.getAllSales.restore();
    });
  
    it('status é retornado com 200', async () => {
      await controllers.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('getAllSales retorna um array', async () => {
      await controllers.getAllSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    
  });

  describe('Controller getSaleId com id errado', () => {
    const response = {};
    const request = {};
  
    const spy = sinon.spy();
    const execute = { status: 404, message: 'Sale not found' }
  
    before(() => {
      request.params = { id: 100 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
  
      sinon.stub(services, 'getSaleId').throws(execute);
    });
  
    after(() => {
      services.getSaleId.restore();
    });
  
    it('é retornado status 404', async () => {
      await controllers.getSaleId(request, response, spy);
      expect(spy.calledWith(execute)).to.be.equal(true);
    });
  });

});
