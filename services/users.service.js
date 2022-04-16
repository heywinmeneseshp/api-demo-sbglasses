const faker = require('faker'); //libreria para crear data fake al azar

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 4; i++) {
      this.users.push(
        {
          id: faker.datatype.uuid(),
          username: (faker.name.firstName()).toLowerCase(), //Nombre al azar
          password: 'admin123', //Numero al azar
          image: faker.image.avatar(), //imagen al azar
        }
      )
    }
  };

  async create(body) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...body
    }
    this.users.push(newUser);
    return { message: 'Usuario creado', data: newUser, status: '201' };
  };

  find() {
    return this.users;
  }

  findOne(username) {
    return this.users.find(item => item.username === username);
  }

  async update(username, changes) {
    const index = this.users.findIndex(item => item.username === username);
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return { message: 'Usuario actualizado', data: this.users[index], status: '201' };
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    this.users.splice(index, 1);
    return { message: 'Usuario eliminado', status: '201' };
  }

}

module.exports = UsersService;
