const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//rotas
app.use('/api/users', require('./app/controllers/authController'));
app.use('/api/projects', require('./app/controllers/projectController'));

app.listen(PORT);