const mongoose = require('../../connection');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    project:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    complete:{
      type: Boolean,
      required: true,
      default: false
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
  });
  
module.exports = mongoose.model('Task', TaskSchema);