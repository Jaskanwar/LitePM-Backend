const express = require("express");
const router = express.Router();
const Projects = require("../Models/Projects");

//create new task
router.post("/create", async (req, res) => {
  try {
    const { projectId, title, duration, description } = req.body;

    let project = await Projects.findOne({ projectId });
    let taskid = 6;
    console.log(project);
    if (!project) {
      return res.status(400).send("Project does not exist!");
    }

    project.Task.push({ taskId: taskid, title: title, duration: duration, description: description });

    await project.save();

    return res.status(200).send("Task was created succesfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/assign", async (req, res) =>{
    try {
        const {} = req.body;
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
