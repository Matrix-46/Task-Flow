import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import { useSocket } from '../context/SocketContext';
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
    const [search, setSearch] = useState('');
    const [success, setSuccess] = useState('');
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('task:created', (newTask) => {
            // Check if it matches current filter
            if (!filter || newTask.status === filter) {
                setTasks(prev => [newTask, ...prev]);
            }
        });

        socket.on('task:updated', (updatedTask) => {
            setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
        });

        socket.on('task:deleted', (taskId) => {
            setTasks(prev => prev.filter(t => t._id !== taskId));
        });

        return () => {
            socket.off('task:created');
            socket.off('task:updated');
            socket.off('task:deleted');
        };
    }, [socket, filter, search]);

    useEffect(() => {
        setPage(1);
        fetchTasks(true);
    }, [filter, search]);

    useEffect(() => {
        if (page > 1) {
            fetchTasks(false);
        }
    }, [page]);

    const fetchTasks = async (reset = false) => {
        try {
            setLoading(true);
            setError('');
            const currentPage = reset ? 1 : page;
            const response = await taskAPI.getTasks(filter, search, currentPage);
            const newTasks = response.data.data.tasks;

            if (reset) {
                setTasks(newTasks);
            } else {
                setTasks(prev => [...prev, ...newTasks]);
            }

            setHasMore(response.data.pagination.page < response.data.pagination.pages);
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

                <div className="filter-area" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div className="search-bar glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.25rem', borderRadius: '16px' }}>
                        <Plus size={20} style={{ transform: 'rotate(45deg)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Find a task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '1rem' }}
                        />
                    </div>

                    <div className="filter-tabs">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginRight: '0.75rem', marginLeft: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            <Filter size={14} />
                            <span>Filter</span>
                        </div>
                        {['', 'pending', 'in-progress', 'completed'].map((f) => (
                            <button
                                key={f}
                                className={filter === f ? 'tab tab-active' : 'tab'}
                                onClick={() => setFilter(f)}
                                style={{ position: 'relative' }}
                            >
                                <span style={{ position: 'relative', zIndex: 2 }}>
                                    {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </span>
                                {filter === f && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="active-tab-indicator"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35
                                        }}
                                        style={{
                                            position: 'absolute',
                                            inset: '4px',
                                            zIndex: 1
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <motion.div
                        className="empty-state glass-panel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p>No tasks found. Start by creating a new one!</p>
                        <button
                            className="btn-secondary"
                            onClick={() => setShowForm(true)}
                            style={{ marginTop: '0.5rem' }}
                        >
                            Create your first task
                        </button>
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

                {hasMore && !loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => setPage(prev => prev + 1)}
                            style={{ padding: '0.75rem 2rem' }}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
