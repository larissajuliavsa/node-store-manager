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

  describe('Service getAllSales com vendas', () => {
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
      sinon.stub(models, 'getAllSales').resolves(execute);
    })
  
    after(() => {
      models.getAllSales.restore();
    });
  
    it('getAllSales retorna um array', async () => {
      const response = await services.getAllSales();
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(2);
    });
  
    it('getAllSales retorna objeto com suas chaves', async () => {
      const [response] = await services.getAllSales();
      expect(response[0]).to.be.an('object');
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    });
    
  });
  
});
