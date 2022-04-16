const faker = require('faker');

class CategoriesService {

    constructor() {
        this.categories = [];
        this.generate();
    };

    generate(){
        for(let i = 0;i < 6; i++) {
          this.categories.push(
            {
              categoryId: faker.datatype.uuid(),
              categoryName: faker.commerce.department(),
            }
          )
        }
    };

    find(){
      return this.categories;
    }

    findOne(id){
      return this.categories.findIndex(item => item.categoryId === id);
    }

    create(body){
      const category = {
        categoryId: faker.datatype.uuid(),
        ...body
      }
      this.categories.push(category);
      return { message: 'Categoría creada', data: category, status: '201' };
    };

    update(id, changes){
      const index = this.categories.findIndex(item => item.categoryId === id);
      const category = this.categories[index];
      this.categories[index] = {
        ...category,
        ...changes
      };
      return { message: 'Categoría actualizada', data: this.categories[index], status: '201' };
    }

    delete(id){
      const index = this.categories.findIndex(item => item.categoryId === id);
      this.categories.splice(index, 1);
      return { message: 'Categoría eliminada', status: '201' };
    }
}

module.exports = CategoriesService;
