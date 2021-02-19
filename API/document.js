const express = require("express");
const Projects = require("../Models/Projects");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post(`/create`, async (req,res)=>{
    try{
        const { projectId, title, link } = req.body;
        const project = await Projects.findOne({projectId: projectId});
        if (!project){
            res.status(400).send("No project with ID");
        }
        project.Document.push(
            {
                title: title,
                link: link,
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

router.post(`/delete`, async (req,res)=>{
    try{
        const { projectId, documentId } = req.body;
        const project = await Projects.findOne({projectId: projectId});
        let foundDoc = false;
        for (let i = 0; i<project.Document.length; i++) {
            if (project.Document[i].documentId === documentId) {
                project.Document.splice(i, i+1);
                console.log("Removed");
                foundDoc = true;
            }
        }
        await project.save();
        if(foundDoc){
            res.status(200).send("Removed Document"); 
        } else {
            res.status(500).send("Document Not Found"); 
        }
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;
