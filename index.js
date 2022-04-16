const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json()); //este middleware se usa para ppoder resivir informacion en formato JSON

app.get('/', (req, res) => {
  res.send('Hola, soy un servidor en express')
});

app.listen(port, () => {
  console.log('My port ' + port);
})

routerApi(app)