const express = require('express');
const bodyParser = require('body-parser');

const { throwMiddleware } = require('./middlewares/handleErrorMiddleware');
const { validateProducts } = require('./middlewares/productsMiddleware');
const controller = require('./controllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.products.getAllProducts);
app.get('/products/:id', controller.products.getProductId);

app.get('/sales', controller.sales.getAllSales);
app.get('/sales/:id', controller.sales.getSaleId);

app.post('/products', validateProducts, controller.products.createProduct);

app.put('/products/:id', controller.products.updateProduct);

app.use(throwMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
