const express = require("express");
const router = express.Router();
const Projects = require("../Models/Projects");
const { v4: uuidv4 } = require('uuid');

//create new member
router.post("/create", async (req, res) => {
  try {
    const { projectId, name, email, phone, github } = req.body;
    let userId = uuidv4();
    let project = await Projects.findOne({ projectId });
    console.log(JSON.stringify(project.Member._id));
    if (!project) {
      return res.status(400).send("Project does not exist!");
    }

    project.Member.push({
      name: name,
      email: email,
      phone: phone,
      userId: userId,
      github: github,
    });

    await project.save();
    project = await Projects.findOne({ projectId });
    console.log(project.Member._id);
    return res.status(200).send("Member was added succesfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete member
router.post("/delete", async (req, res) => {
    try {
      const { projectId, userId } = req.body;
      let project = await Projects.findOne({ projectId });
      for (let i = 0; i < project.Member.length; i++) {
        if (project.Member[i].userId === userId) {
          project.Member.splice(i, i + 1);
        }
      }
      await project.save();
  
      return res.status(200).send("Member was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;
