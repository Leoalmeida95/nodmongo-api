const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.send('OK');
})

mongoose
  .connect('mongodb://db:27017/crud-node-mongo-docker', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });


app.listen(PORT, () => console.log('Server ativo na porta 3000'));