const User = require('../models/User');
const Classroom = require('../models/Classroom');

const getUserProfile = async (userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (userId, updateData) => {
  try {
    // Find the user and update their profile
    const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const listUsersInClassroom = async (classroomId) => {
  try {
    // Find the classroom and populate the students
    const classroom = await Classroom.findById(classroomId).populate('students', 'name email');
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    return classroom.students;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  listUsersInClassroom
};
