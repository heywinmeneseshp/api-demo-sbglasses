const express = require('express');
const ProductsService = require('../services/products.service')

const router = express.Router();
const service = new ProductsService();

//Todos los productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Filtrar productos
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
});

//Encontrar un producto
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json(product);
});

//Crear producto
router.post('/', async (req, res) => {
  const body = req.body;
  const rta = await service.create(body)
  res.status(201).json(rta)
});
//Actualizar producto parcialmente
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const rta = await service.update(id, body)
  res.json(rta);
});
//Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta)
});

module.exports = router;
