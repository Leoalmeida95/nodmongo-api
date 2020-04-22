const express = require('express');
const User = require('../models/user');
const router = express.Router();



router.post('/register', async(req,res)=>{
    try{

        const {email} = req.body;

        if(await User.findOne({email}))
            return res.status(400).send({error: 'User already exists.'});

        const user = await User.create(req.body);

        user.password = undefined; //não retorna a senha no json

        return res.send({user});

    }catch(err){
        return res.status(400).send({error:'Registrantion failure.'});
    }
});


module.exports = router;