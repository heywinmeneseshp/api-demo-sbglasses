const faker = require('faker'); //libreria para crear data fake al azar
const boom = require('@hapi/boom'); //libreria para manejar errores

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(), //Nombre al azar
          price: parseInt(faker.commerce.price()), //Numero al azar
          image: faker.image.imageUrl(), //imagen al azar
          category: 'default',
          isBlock: faker.datatype.boolean(),
        }
      )
    }
  };

  create(body) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...body
    }
    this.products.push(newProduct);
    return { message: 'Product created', data: newProduct, status: '201' };
  };

  find() {
    return this.products;
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('No se encuentra el producto');
    }
    if (product.isBlock) {
      throw boom.conflict('Producto bloqueado');
    }
    return product;
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('No se encuentra en el producto');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return { message: 'Producto actualizado', data: this.products[index], status: '201' }
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('No se encuentra en el producto');
    }
    this.products.splice(index, 1);
    return {
      message: 'Product deleted'
    }
  }

}

module.exports = ProductsService;
