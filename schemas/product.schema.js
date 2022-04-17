const Joi = require('joi'); //Libreria para validar datos

//Validar formato de los campos
const id = Joi.string().uuid();
const name = Joi.string();
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const category = Joi.string();
const isBlock = Joi.boolean()

//Crear esquema
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category: category.required(),
  isBlock: isBlock,
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  category: category,
  isBlock: isBlock,
});

const getProductSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
}
