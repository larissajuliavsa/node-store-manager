const express = require('express');
const bodyParser = require('body-parser');

const { throwMiddleware } = require('./middlewares/handleErrorMiddleware');
const { validateProducts } = require('./middlewares/productsMiddleware');
const { validateSales } = require('./middlewares/salesMiddlewares');
const controller = require('./controllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.products.getAllProducts);
app.get('/products/:id', controller.products.getProductId);

app.post('/products', validateProducts, controller.products.createProduct);

app.put('/products/:id', validateProducts, controller.products.updateProduct);

app.delete('/products/:id', controller.products.deleteProduct);

app.get('/sales', controller.sales.getAllSales);
app.get('/sales/:id', controller.sales.getSaleId);

app.post('/sales', validateSales, controller.sales.createSales);

app.put('/sales/:id', validateSales, controller.sales.updateSales);

app.delete('/sales/:id', controller.sales.deleteSales);

app.use(throwMiddleware);

module.exports = app;
