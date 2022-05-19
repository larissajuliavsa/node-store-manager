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

  describe('Model getAllSales com vendas', () => {
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
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('getAllSales retorna um array', async () => {
      const response = await models.getAllSales();
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(2);
    });
  
    it('getAllSales retorna objeto com suas chaves', async () => {
      const [response] = await models.getAllSales();
      expect(response[0]).to.be.an('object');
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    });
    
  });
});
