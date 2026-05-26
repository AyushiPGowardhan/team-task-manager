const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "title");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});


// UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;