const express = require('express');
const { protect } = require('../middleware/auth');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const {
    createTaskValidation,
    updateTaskValidation
} = require('../middleware/validation');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Task routes
router.route('/')
    .get(getTasks)
    .post(createTaskValidation, createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTaskValidation, updateTask)
    .delete(deleteTask);

module.exports = router;
