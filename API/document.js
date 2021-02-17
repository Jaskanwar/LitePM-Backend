const express = require("express");
const Projects = require("../Models/Projects");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get(`/:projectId?`, async (req,res)=>{
    try{
        let searchId = req.params.projectId;
        const project = await Projects.findOne({projectId: searchId});
        if (!project){
            res.status(400).send("No project with ID");
        }
        project.Document.push(
            {
                title: "Test Title",
                link: "https://docs.google.com/document/d/1LPkwpnhy-18gzczJLjH3bshFYaBXhx68QGZyfUjMt0w/edit#",
                documentId:  uuidv4()
            }
        )
        await project.save();
        res.status(200).send("Document Created");   
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error");
    }

});


module.exports = router;
