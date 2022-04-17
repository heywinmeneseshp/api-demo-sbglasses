const express = require('express');
const cors = require('cors'); //Permite que otros dominios se conecten a la api
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //este middleware se usa para ppoder resivir informacion en formato JSON
/*
 //Codigo para restringir el ingreso a otros dominios
const whiteList = ['htpps://heywin.co', 'http:/localhost:3000'];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('No permitido'));
    }
  }
}
app.use(cors(options));
*/
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola, soy un servidor en express')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port ' + port);
})

