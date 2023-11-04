const User = require('../models/User'); // Importing the User model

// Controller for getting the current user's profile
exports.getProfile = async (req, res) => {
  try {
    // The user's ID is stored in req.userId, which is set by the authentication middleware
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Send back the user details, excluding the password
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Controller for updating the current user's profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req; // Extracting userId from the request object
    const { email, ...otherDetails } = req.body; // Destructuring to separate email from other user details

    // Check if the email is being updated to a new one
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(userId, { email, ...otherDetails }, { new: true });

    // Send back the updated user details
    res.status(200).json({ result: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
