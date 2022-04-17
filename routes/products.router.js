const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

//Todos los productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Filtrar productos
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Encontrar un producto
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Crear producto
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json(rta);
  }
);

//Actualizar producto parcialmente
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rta = await service.update(id, body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);
//Eliminar producto
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
