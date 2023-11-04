const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /classrooms/create - Endpoint for creating a new classroom
router.post('/create', [
  authMiddleware,
  // Validation middleware
  check('name', 'Classroom name is required').not().isEmpty(),
  check('description', 'Classroom description is required').not().isEmpty()
], classroomController.createClassroom);

// POST /classrooms/join/:classroomId - Endpoint for joining a classroom
router.post('/join/:classroomId', authMiddleware, classroomController.joinClassroom);

// GET /classrooms/:classroomId - Endpoint for getting classroom details
router.get('/:classroomId', authMiddleware, classroomController.getClassroom);

module.exports = router;
