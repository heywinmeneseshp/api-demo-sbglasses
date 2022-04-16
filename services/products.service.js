const faker = require('faker'); //libreria para crear data fake al azar

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
    return this.products.find(item => item.id === id);
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('Product not found')
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
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return {
      message: 'Product deleted'
    }
  }

}

module.exports = ProductsService;
