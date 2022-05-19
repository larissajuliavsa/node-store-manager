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

  describe('Service getAllProducts com produtos', () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ];

    before(() => {
      sinon.stub(models, 'getAllProducts').resolves(execute)
    });
    
    after(() => {
      models.getAllProducts.restore();
    });

    it('getAllProducts retorna um array', async () => {
      const response = await services.getAllProducts();

      expect(response).to.be.an('array');
    });

    it('getAllProducts é um array de objeto', async () => {
      const [response] = await services.getAllProducts();

      expect(response).to.be.an('object');
    });

    it('getAllProducts retorna as chave id, name e quantity', async () => {
      const [response] = await services.getAllProducts();

      expect(response).to.have.all.keys('id', 'name', 'quantity')
    });
  });
});
