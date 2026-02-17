import { motion } from 'framer-motion';
import { Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskCard = ({ task, onEdit, onDelete, onUpdate, isEditing, onCancelEdit }) => {
    if (isEditing) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="task-card glass-panel"
            >
                <TaskForm
                    initialData={task}
                    onSubmit={(data) => onUpdate(task._id, data)}
                    onCancel={onCancelEdit}
                />
            </motion.div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={14} />;
            case 'in-progress': return <Clock size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <motion.div
            layout
            className="task-card glass-panel"
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            <div>
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-status status-${task.status}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {getStatusIcon(task.status)}
                            {task.status}
                        </span>
                    </span>
                </div>
                <p className="task-desc">{task.description}</p>
            </div>

            <div className="task-actions">
                <button onClick={onEdit} className="btn-icon" title="Edit">
                    <Edit2 size={18} />
                </button>
                <button onClick={onDelete} className="btn-icon delete" title="Delete">
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
