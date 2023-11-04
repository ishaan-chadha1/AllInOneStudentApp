const Classroom = require('../models/Classroom'); // Importing the Classroom model
const User = require('../models/User'); // Importing the User model

// Controller for creating a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId;

    // Creating a new classroom
    const classroom = await Classroom.create({ name, description, createdBy: userId });

    // Adding the classroom to the user's list of classrooms
    await User.findByIdAndUpdate(userId, { $push: { classrooms: classroom._id } });

    res.status(201).json({ result: classroom });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Controller for joining a classroom
exports.joinClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const userId = req.userId;

    // Adding the user to the classroom's list of students
    const classroom = await Classroom.findByIdAndUpdate(classroomId, { $push: { students: userId } }, { new: true });

    // Adding the classroom to the user's list of classrooms
    await User.findByIdAndUpdate(userId, { $push: { classrooms: classroomId } });

    res.status(200).json({ result: classroom });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Controller for fetching classroom details
exports.getClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    // Fetching classroom details
    const classroom = await Classroom.findById(classroomId).populate('createdBy', 'name').populate('students', 'name');

    if (!classroom) return res.status(404).json({ message: "Classroom not found" });

    res.status(200).json({ result: classroom });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
