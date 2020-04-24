const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);//solicita token de autenticação para realizar requisições nesse controller

router.get('/', (req,res)=>{
    res.status(200).send({ok: true, userId: req.userId});
  })
  
module.exports = router;