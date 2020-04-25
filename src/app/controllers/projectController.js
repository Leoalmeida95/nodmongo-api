const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);//solicita token de autenticação para realizar requisições nesse controller

router.get('/', async (req,res)=>{
  try {

    const projects = await Project.find().populate(['user','tasks']);
    // await projects.populate('tasks').execPopulate();
    
    return res.status(200).send({projects: projects});

  } catch (error) {
    return res.status(500).send({error:'An error occurred while loading projects.'});
  }
});

router.get('/:projectId', async (req,res)=>{
  try {
    const project = await Project.findById(req.params.projectId).populate(['user','tasks']);

    if(!project)
      return res.status(400).send({message:'Project not find.'});
    
    return res.status(200).send({project: project});

  } catch (error) {
    return res.status(500).send({error:'An error occurred while loading a project.'});
  }
});

router.post('/', async (req,res)=>{
  try {

    const {title, description, tasks} = req.body;

    const project = await Project.create({title,description, user: req.userId});

    await Promise.all(tasks.map(async task =>{// o await PRomise espera todas as tasks serem salvas antes de salvar o projeto abaixo
        const projectTask = new Task({...task, project:project._id});

        await projectTask.save();

        project.tasks.push(projectTask);
    }));
   
    await project.save();

    return res.status(200).send({project});
    
  } catch (error) {
    return res.status(500).send({error:'An error ocurred when create a project.'});
  }
});

router.put('/:projectId', async (req,res)=>{
  try {

    const {title,description,tasks} = req.body;
   
    const project = await Project.findByIdAndUpdate(req.params.projectId, 
                                                    {title,
                                                      description,
                                                    }, {new:true});
      
      if(!project)
        return res.status(400).send({message:'Project not find.'});

    //remove as tasks antigas para posteriormente adicionar as novas
    project.tasks = [];
    await Task.remove({project: project._id});

    await Promise.all(tasks.map(async task =>{// o await PRomise espera todas as tasks serem salvas antes de salvar o projeto abaixo
        const projectTask = new Task({...task, project:project._id});

        await projectTask.save();

        project.tasks.push(projectTask);
    }));
   
    await project.save();

    return res.status(200).send({project});
    
  } catch (error) {
    return res.status(500).send({error:'An error ocurred when create a project.' + error});
  }
});

router.delete('/:projectId', async (req,res)=>{
  try {

    const project = await Project.findById(req.params.projectId);
    
    if(!project)
      return res.status(400).send({message:'Project not find.'});

    await Project.deleteOne({_id:req.params.projectId});
    
    return res.status(200).send({message:'Project deleted successfully!'});

  } catch (error) {
    return res.status(500).send({error:'An error occurred while delete a project.'});
  }
});
  
module.exports = router;