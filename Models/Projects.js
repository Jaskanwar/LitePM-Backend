const { Double } = require("mongodb");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type:String,
    required:true
  },
  Duration: {
    type:String
  },
  Description:{
    type:String
  },
  projectId: {
    type:String
  },
  Task:[{
    taskId:{
      type:String,
      required: true
    },
    title:{
      type:String
    },
    status:{
      type:String,
      enum: ['todo', 'inProgress','completed'],
      default: 'todo'
    },
    duration:{
      type:String
    },
    description:{
      type:String
    },
    userId:{
      type:String
    },
    startTime:{
      type:String
    }
  }],
  Member:[{
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    phone:{
      type:String
    },
    userId:{
      type:String
    },
    github:{
      type:String
    }
  }],
  Document:[{
    title:{
      type:String
    },
    link:{
      type:String
    },
    documentId:{
      type:String
    }
  }]
});

const project = mongoose.model("project", projectSchema);

module.exports = project;
