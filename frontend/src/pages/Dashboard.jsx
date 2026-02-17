import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import '../App.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await taskAPI.getTasks(filter);
            setTasks(response.data.data.tasks);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            setError('');
            const response = await taskAPI.createTask(taskData);
            setTasks([response.data.data.task, ...tasks]);
            setShowForm(false);
            showSuccess('Task created successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            setError('');
            const response = await taskAPI.updateTask(id, taskData);
            setTasks(tasks.map(task => task._id === id ? response.data.data.task : task));
            setEditingTask(null);
            showSuccess('Task updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            setError('');
            await taskAPI.deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
            showSuccess('Task deleted successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <motion.div
                    className="dashboard-header"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div>
                        <h1>My Workspace</h1>
                        <p className="dashboard-subtitle">
                            Welcome back, <span style={{ color: 'var(--primary-glow)' }}>{user?.email}</span>
                        </p>
                    </div>
                    <button
                        className="btn-primary"
                        onClick={() => setShowForm(!showForm)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Plus size={20} />
                        New Task
                    </button>
                </motion.div>

                {error && <div className="error-message">{error}</div>}

                <AnimatePresence>
                    {success && (
                        <motion.div
                            className="success-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                <div className="filter-tabs">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginRight: '1rem' }}>
                        <Filter size={16} />
                        <span>Filter:</span>
                    </div>
                    {['', 'pending', 'in-progress', 'completed'].map((f) => (
                        <button
                            key={f}
                            className={filter === f ? 'tab-active' : 'tab'}
                            onClick={() => setFilter(f)}
                        >
                            {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <motion.div
                        className="empty-state glass-panel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p>No tasks found. Start by creating a new one!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        className="tasks-grid"
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <AnimatePresence>
                            {tasks.map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={() => setEditingTask(task)}
                                    onDelete={() => handleDeleteTask(task._id)}
                                    onUpdate={handleUpdateTask}
                                    isEditing={editingTask?._id === task._id}
                                    onCancelEdit={() => setEditingTask(null)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
