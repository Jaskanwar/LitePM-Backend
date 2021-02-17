const express = require("express");
const Projects = require("../Models/Projects");
const router = express.Router();

router.get(`/:projectId?`, async (req,res)=>{
    try{
        let searchId = req.params.projectId;
        const project = await Projects.findOne({projectId: searchId});
        
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error");
    }

});















module.exports = router;
