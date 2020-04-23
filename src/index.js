const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const auth = require('./app/controllers/authController');
const project = require('./app/controllers/projectController');
app.use('/api/user', auth);
app.use('/api', project);

app.listen(PORT);