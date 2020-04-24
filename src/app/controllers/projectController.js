const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);//solicita token de autenticação para realizar requisições nesse controller

router.get('/', async (req,res)=>{
  try {

    const projects = await Project.find().populate('user');
    
    return res.status(200).send({projects: projects});

  } catch (error) {
    return res.status(500).send({error:'An error occurred while loading projects.'});
  }
});

router.get('/:projectId', async (req,res)=>{
  try {
    const project = await Project.findById(req.params.projectId).populate('user');
    
    return res.status(200).send({project: project});

  } catch (error) {
    return res.status(500).send({error:'An error occurred while loading a project.'});
  }
});

router.post('/', async (req,res)=>{
  try {
    const project = await Project.create({...req.body, user: req.userId});

    return res.status(200).send(project);
    
  } catch (error) {
    return res.status(500).send({error:'An error ocurred.'});
  }
});

router.put('/:projectId', async (req,res)=>{
  res.status(200).send({userId: req.userId});
});

router.delete('/:projectId', async (req,res)=>{
  res.status(200).send({userId: req.userId});
});
  
module.exports = router;