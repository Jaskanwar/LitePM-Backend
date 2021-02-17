const express = require("express");

const Projects = require("../Models/Projects");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


//Get the Project in Mongo that matches the requested ID
router.get(`/api/project/:projectId?`, (req,res)=>{
    const findProject = db.Projects.find({
        projectId: req.params.projectId
    });
    res.send(findProject);
})
//Create a new Project with a unique ID (CHANGE FROM GET ONCE DONE TESTING)
router.put(`/createProject`, (req,res)=>{
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
    //res.send("Success");

})

module.exports = router;