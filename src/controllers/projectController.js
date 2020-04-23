const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req,res)=>{
    res.status(200).send({ok: true});
  })
  
module.exports = router;