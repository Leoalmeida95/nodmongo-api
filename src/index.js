const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
  res.send('v8');
})

const auth = require('./controllers/authController');
app.use('/api/user', auth);

app.listen(PORT);