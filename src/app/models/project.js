const mongoose = require('../../connection');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    task:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }],
    createdAt:{
      type: Date,
      default: Date.now
    }
  });
  
module.exports = mongoose.model('Project', ProjectSchema);