const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async(req,res)=>{
    try{

        const {email} = req.body;

        if(await User.findOne({email}))
            return res.status(400).send({error: 'User already exists.'});

        const user = await User.create(req.body);

        user.password = undefined; //não retorna a senha no json

        return res.status(201).send({user});

    }catch(err){
        return res.status(500).send({error:'Registrantion failure.'});
    }
});

router.post('/authenticate', async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password'); //busca o usuário e explicita a necessidade do retorno da senha (select false)

        if(!user)
            return res.status(400).send({error:'Uset not found.'});

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error:'Invalid password'});

        return res.status(200).send({user});

    }catch(err){
        return res.status(500).send({error:'Authentication failure.'});
    }
});


module.exports = router;