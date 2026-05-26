const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },

    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Task",
  taskSchema
);