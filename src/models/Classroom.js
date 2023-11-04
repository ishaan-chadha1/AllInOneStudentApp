const mongoose = require('mongoose');

// Schema for the Classroom
const classroomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Model for the Classroom, using the schema defined above
const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
