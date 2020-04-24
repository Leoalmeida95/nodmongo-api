const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const router = express.Router();

function generateToken(user_id){
    return jwt.sign({id: user_id}, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async(req,res)=>{
    try{

        const {email} = req.body;

        if(await User.findOne({email}))
            return res.status(400).send({error: 'User already exists.'});

        const user = await User.create(req.body);

        user.password = undefined; //não retorna a senha no json

        return res.status(201).send({user,token:generateToken(user.id)});

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

        user.password = undefined;

        return res.status(200).send({user,token:generateToken(user.id)});
        
    }catch(err){
        return res.status(500).send({error:'Authentication failure.'});
    }
});

router.post('/forgot-password', async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user)
            return res.status(400).send({error:'Uset not found.'});
        
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, 
                                    {
                                        '$set':{
                                            passwordResetToken: token,
                                            passwordResetExpires: now
                                        }
                                    }, 
                                    {useFindAndModify: false});

        mailer.sendMail({
            to: email,
            from: 'wofsystem@gmail.com',
            template: '/forgot-password',
            context: {token: token, userName: user.name}
        });

        return res.status(200).send({message: 'Email send!'});
    }
    catch (err){
        return res.status(500).send({error:'Error on forgot password. Try again.' + err});
    }
})


module.exports = router;