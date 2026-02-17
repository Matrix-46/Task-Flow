const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
    try {
        let query = {};

        if (req.user.role === 'user') {
            query.userId = req.user._id;
        }

        if (req.query.status) {
            query.status = req.query.status;
        }

        const tasks = await Task.find(query)
            .populate('userId', 'email role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: { tasks }
        });
    } catch (error) {
        next(error);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('userId', 'email role');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (req.user.role === 'user' && task.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.status(200).json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        req.body.userId = req.user._id;

        const task = await Task.create(req.body);

        await task.populate('userId', 'email role');

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (req.user.role === 'user' && task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('userId', 'email role');

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (req.user.role === 'user' && task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
