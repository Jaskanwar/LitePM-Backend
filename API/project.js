const express = require("express");
const Projects = require("../Models/Projects");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//Get the Project in Mongo that matches the requested ID
router.get(`/:projectId?`, async (req,res)=>{
    try{
        let searchId = req.params.projectId;
        const project = await Projects.findOne({projectId: searchId});
        res.send("success");
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error");
    }

});
    

//Create a new Project with a unique ID (CHANGE FROM GET ONCE DONE TESTING)
router.get(`/createProject`, (req,res)=>{
    let projectId = uuidv4();
    let projectName = "Test1"
    let Duration = "2 weeks"
    let Description = "Testing description"
    let project = new Projects({
        projectName,
        Duration,
        Description,
        projectId
    });
    res.send("Added Project");
    project.save();

})

module.exports = router;