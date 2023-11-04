const Classroom = require('../models/Classroom');
const User = require('../models/User');

const createClassroom = async (classroomData, userId) => {
  try {
    // Create a new classroom with the user as the creator
    const classroom = new Classroom({
      ...classroomData,
      createdBy: userId
    });

    await classroom.save();
    return classroom;
  } catch (error) {
    throw error;
  }
};

const joinClassroom = async (classroomId, userId) => {
  try {
    // Find the classroom and add the user to the students array
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      throw new Error('Classroom not found');
    }

    // Check if user is already in the classroom
    if (classroom.students.includes(userId)) {
      throw new Error('User already joined the classroom');
    }

    classroom.students.push(userId);
    await classroom.save();
    return classroom;
  } catch (error) {
    throw error;
  }
};

const getClassroomDetails = async (classroomId) => {
  try {
    // Retrieve classroom details along with the creator and students information
    const classroom = await Classroom.findById(classroomId)
      .populate('createdBy', 'name email')
      .populate('students', 'name email');

    if (!classroom) {
      throw new Error('Classroom not found');
    }

    return classroom;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createClassroom,
  joinClassroom,
  getClassroomDetails
};
