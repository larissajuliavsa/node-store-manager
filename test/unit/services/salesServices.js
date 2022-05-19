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

  describe('Service getSaleId', () => {
    const execute = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    before(() => {
      sinon.stub(models, 'getSaleId').resolves(execute);
    })

    after(() => {
      models.getSaleId.restore();
    });

    it('getSaleId retorna um array de objeto', async () => {
      const [response] = await services.getSaleId(1);
      expect(response).to.be.an('object');
    });

    it('getSaleId retorna as chaves do objeto', async () => {
      const [response] = await services.getSaleId(1);

      expect(response).to.have.all.keys('productId', 'quantity')
    });

  });
  
  describe('Service createSales', () => {
    const product = [
      {
        "productId": 1,
        "quantity": 3
      }
    ]
  
    before(async () => {
      const execute = [{ insertId: 3 }]
      sinon.stub(models, 'createSales').resolves(execute);
    });
  
    after(async () => {
      models.createSales.restore();
    })
  
    it('createSales retorna um array de objetos', async () => {
      const [response] = await services.createSales(3, product.productId, product.quantity);
  
      expect(response).to.be.an('object');
    })
  
    it('createSales retorna com as chaves ', async () => {
      const [response] = await services.createSales(3, product.productId, product.quantity);
  
      expect(response).to.have.all.keys('productId', 'quantity')
    });
  });
});
