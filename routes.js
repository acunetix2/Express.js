const Task = require('./Task');
const express = require('express');
const router = express.Router()

//create new task
router.post('/tasks', async (req, res) => {
    try{
        const task = new Task(req.body); //request the body
        await task.save(); //save task
        res.status(201).send(task); //confirm task saved
    } catch  (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }   catch (error) {
        res.status(500).send(error);
    }
});

//fetch one item
router.get('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send();
            res.send(task);
        }  catch (error) 
    {
        res.status(500).send(error);
    }
});

//Update task
router.put('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true, runValidators: true});
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete task
router.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete((req.params.id));
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }  
});
module.exports = router;