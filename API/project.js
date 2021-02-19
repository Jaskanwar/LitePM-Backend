const express = require("express");
const Projects = require("../Models/Projects");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//Get the Project in Mongo that matches the requested ID
router.get(`/get/:projectId?`, async (req,res)=>{
    try{
        let searchId = req.params.projectId;
        const project = await Projects.findOne({projectId: searchId});
        const jsonProject = project.toJSON()
        res.send(jsonProject);
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});
    

//Create a new Project with a unique ID (CHANGE FROM GET ONCE DONE TESTING)
router.post(`/create`, async (req,res)=>{
    let newProjectId = uuidv4();
    const {newName, newDuration, newDescription } = req.body;
    let project = new Projects({
        projectName: newName,
        Duration: newDuration,
        Description: newDescription,
        projectId: newProjectId
    });
    res.send(newProjectId);
    project.save();

})

module.exports = router;

