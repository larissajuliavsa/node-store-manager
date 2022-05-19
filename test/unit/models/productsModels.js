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

  describe('Model getAllProducts com produtos', () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ];
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('getAllProducts retorna um array', async () => {
      const response = await models.getAllProducts();
  
      expect(response).to.be.an('array');
    });
  
    it('getAllProducts é um array de objeto', async () => {
      const [response] = await models.getAllProducts();
  
      expect(response).to.be.an('object');
    });
  
    it('getAllProducts retorna as chave id, name e quantity', async () => {
      const [response] = await models.getAllProducts();
  
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    });
  });

  describe('Model getProductId', () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ];
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('getProductId retorna um array', async () => {
      const response = await models.getProductId();
  
      expect(response).to.be.an('array');
    });
  
    it('getProductId se não retorna um array vazio', async () => {
      const response = await models.getProductId();
  
      expect(response).to.not.be.empty;
    });
  
    it('getProductId é um array de objeto', async () => {
      const [response] = await models.getProductId();
  
      expect(response).to.be.an('object');
    });
  
    it('getProductId retorna as chave id, name e quantity', async () => {
      const [response] = await models.getProductId();
  
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    });
  
  });

  describe('Model findProductName', () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ];
  
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    });
  
    it('findProductName retorna um objeto', async () => {
      const [response] = await models.findProductName();
  
      expect(response).to.be.an('object');
    });
  
    it('findProductName retorna o valor de name', async () => {
      const [response] = await models.findProductName();
  
      expect(response).to.have.keys({"name": "Martelo de Thor"});
    });
  
  });

  describe('Model createProduct', () => {
    const product = { "name": "produto", "quantity": 100 }
    
    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(async () => {
      connection.execute.restore();
    });
  
    it('createProduct retorna um array de objetos', async () => {
      const [response] = await models.createProduct(product);
      expect(response).to.be.an('object');
    });
  
    it('createProduct retorna objeto com as chaves id, name, quantity', async () => {
      const [response] = await models.createProduct(product);
      expect(response).to.have.keys({ "id": 1, "name": "produto", "quantity": 10 });
    });
  });

});
