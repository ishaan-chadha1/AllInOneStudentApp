const mongoose = require('mongoose');

// Schema for the Assignment
const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attachments: [{
    fileName: String,
    filePath: String,
    uploadedDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Model for the Assignment, using the schema defined above
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
