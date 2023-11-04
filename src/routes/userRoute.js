const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /users/profile - Endpoint for getting the logged-in user's profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// PUT /users/profile - Endpoint for updating the logged-in user's profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// GET /users/classroom/:classroomId - Endpoint for listing users in a specific classroom
router.get('/classroom/:classroomId', authMiddleware, userController.listUsersInClassroom);

module.exports = router;
