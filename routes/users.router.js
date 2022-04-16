const express = require('express');
const UsersService = require('../services/users.service.js');

const router = express.Router();
const service = new UsersService();
//Parametros tipo query
//Ejemplo de envio /users?limit=10&offset=20
//Conseguir usuarios
router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

//Conseguir un usurio
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await service.findOne(username);
  res.json(user);
});

//Crear usurio
router.post('/', async (req, res) => {
  const body = req.body;
  const rta = await service.create(body);
  res.status(201).json(rta);
});

//Actualizar usuario
router.patch('/:username', async (req, res) => {
  const { username } = req.params;
  const body = req.body;
  const rta = await service.update(username, body);
  res.status(201).json(rta);
});

//Eliminar usuario
router.delete('/:username', async (req, res) => {
  const { username } = req.params;
  const rta = await service.delete(username);
  res.status(201).json(rta);
});

module.exports = router;
