const sinon = require('sinon');
const { expect } = require('chai');
const services = require('../../../services/product.services');
const controllers = require('../../../controllers/product.controller');

describe('Teste de Cobertura na Camada Product Controllers', () => {
  describe('Controller getAllProducts sem produtos', () => {
    const response = {};
    const request = {};
    const execute = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(services, 'getAllProducts').resolves(execute);
    });

    after(() => {
      services.getAllProducts.restore();
    });

    it('getAllProducts retorna um array vazio', async () => {
      await controllers.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Controller getAllProducts com produtos', () => {
    const response = {};
    const request = {};

    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services, 'getAllProducts').resolves(execute);
    });

    after(() => {
      services.getAllProducts.restore();
    });

    it('status é retornado com 200', async () => {
      await controllers.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('getAllProducts retorna um array', async () => {
      await controllers.getAllProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    
  });

  describe('Controller getProductId com id errado', () => {
    const response = {};
    const request = {};

    const spy = sinon.spy();
    const execute = { status: 404, message: 'Product not found' }

    before(() => {
      request.params = { id: 100 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(services, 'getProductId').throws(execute);
    });

    after(() => {
      services.getProductId.restore();
    });

    it('é retornado status 404', async () => {
      await controllers.getProductId(request, response, spy);
      expect(spy.calledWith(execute)).to.be.equal(true);
    });
  });

});
