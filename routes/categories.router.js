const express = require('express');
const CategoriesService = require('../services/categories.service.js')

const router = express.Router();
const service = new CategoriesService()

//Listar categories
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories)
});

//Encontrar categoria
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.findOne(id);
  res.json(category);
});

//Crear categoria
router.post('/', async (req, res) => {
  const category = req.body;
  const rta = await service.create(category);
  res.status(201).json(rta)
});

//endPoint con dos parametros
router.get('/:categoryId/product/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId,
    }
  )
})

//Actualizar categoria
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const rta = await service.update(id, body);
  res.json(rta);
});
//Eliminar categoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});


module.exports = router;
