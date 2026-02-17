import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description || '',
                status: initialData.status
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.div
            className={initialData ? "" : "modal-overlay"}
            initial={!initialData ? { opacity: 0 } : false}
            animate={!initialData ? { opacity: 1 } : false}
        >
            <motion.div
                className={initialData ? "" : "modal-content glass-panel"}
                initial={!initialData ? { scale: 0.5, opacity: 0 } : false}
                animate={!initialData ? { scale: 1, opacity: 1 } : false}
            >
                {!initialData && (
                    <div className="modal-header">
                        <h2>Create New Task</h2>
                        <button onClick={onCancel} className="btn-close">&times;</button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Task title"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add details..."
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'var(--bg-dark)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white'
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {initialData ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default TaskForm;
