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

    project.Task.push({
      taskId: taskid,
      title: title,
      duration: duration,
      description: description,
    });

    await project.save();

    return res.status(200).send("Task was created succesfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/assign", async (req, res) => {
  try {
    const { projectId, startTime, userId, taskId } = req.body;
    let project = await Projects.findOne({ projectId });
    for (let i = 0; i < project.Task.length; i++) {
      await project.update(
        { "project.Task.taskId" : taskId },
        { $set: { startTime: startTime, userId: userId, status: "inProgress" } }
      );
      await project.save();
    }
    return res.status(200).send("Task was assigned!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const {
      projectId,
      taskId,
      title,
      duration,
      description,
      status,
    } = req.body;
    let project = await Projects.findOne({ projectId });
    for (let i = 0; i < project.Task.length; i++) {
      if (project.Task[i].taskId === taskId) {
        project.Task[i].push({
          title: title,
          duration: duration,
          description: description,
          status: status,
        });
      }
    }
    return res.status(200).send("Task was edited!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
