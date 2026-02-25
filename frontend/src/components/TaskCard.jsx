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
            className="task-card"
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.95 }}
        >
            <div className="task-body">
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-status status-${task.status}`}>
                        {getStatusIcon(task.status)}
                        <span style={{ marginLeft: '6px' }}>{task.status}</span>
                    </span>
                </div>
                <p className="task-desc">{task.description}</p>
            </div>

            <div className="task-actions">
                <button onClick={onEdit} className="btn-icon" title="Edit">
                    <Edit2 size={16} strokeWidth={2.5} />
                </button>
                <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
                <button onClick={onDelete} className="btn-icon delete" title="Delete">
                    <Trash2 size={16} strokeWidth={2.5} />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
