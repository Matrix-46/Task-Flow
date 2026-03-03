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

router.use(protect);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: {type: string, enum: [pending, in-progress, completed]}
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: {type: string}
 *               description: {type: string}
 *               status: {type: string, enum: [pending, in-progress, completed]}
 *               priority: {type: string, enum: [low, medium, high]}
 *               dueDate: {type: string, format: date}
 *     responses:
 *       201:
 *         description: Task created
 */
router.route('/')
    .get(getTasks)
    .post(createTaskValidation, createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: string}
 *     responses:
 *       200:
 *         description: Task details
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: string}
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title: {type: string}
 *               description: {type: string}
 *               status: {type: string, enum: [pending, in-progress, completed]}
 *     responses:
 *       200:
 *         description: Task updated
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: string}
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.route('/:id')
    .get(getTask)
    .put(updateTaskValidation, updateTask)
    .delete(deleteTask);

module.exports = router;
