const express = require("express");
const router = express.Router();
const Projects = require("../Models/Projects");
import { nanoid } from 'nanoid'

//create new task
router.post("/create", async (req, res) => {
  try {
    const { projectId, title, duration, description } = req.body;

    let project = await Projects.findOne({ projectId });
    let taskid = nanoid(8);
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

//assign task to designated user
router.post("/assign", async (req, res) => {
  try {
    const { projectId, startTime, userId, taskId } = req.body;
    await Projects.updateOne(
      { "Task.taskId": taskId },
      {
        $set: {
          "Task.$.startTime": startTime,
          "Task.$.userId": userId,
          "Task.$.status": "inProgress",
        },
      }
    );

    return res.status(200).send("Task was assigned!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//edit specified task
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

    await Projects.updateOne(
      { projectId: projectId, "Task.taskId": taskId },
      {
        $set: {
          "Task.$.title": title,
          "Task.$.duration": duration,
          "Task.$.description": description,
          "Task.$.status": status,
        },
      }
    );

    return res.status(200).send("Task was edited!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//complete a task
router.post("/complete", async (req, res) => {
  try {
    const { taskId } = req.body;
    await Projects.updateOne(
      { "Task.taskId": taskId },
      {
        $set: {
          "Task.$.status": "completed",
        },
      }
    );

    return res.status(200).send("Task was completed!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//delete a task
router.post("/delete", async (req, res) => {
  try {
    const { projectId, taskId } = req.body;
    let project = await Projects.findOne({ projectId });
    for (let i = 0; i < project.Task.length; i++) {
      if (project.Task[i].taskId === taskId) {
        project.Task.splice(i, i + 1);
      }
    }
    await project.save();

    return res.status(200).send("Task was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
