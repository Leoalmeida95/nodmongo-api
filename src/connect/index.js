const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/crud-node-mongo-docker', {
    useNewUrlParser: true,
    useMongoClient:true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;