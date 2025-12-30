import { Trash2, CheckCircle, Circle, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TaskCard = ({ task, onDelete, onStatusUpdate }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';

  const truncatedDescription = (() => {
    if (!task.description) return '';
    const words = task.description.trim().split(/\s+/);
    const limit = 25;
    if (words.length <= limit) return task.description;
    return `${words.slice(0, limit).join(' ')}...`;
  })();

  const handleStatusToggle = () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    onStatusUpdate(task._id, newStatus);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await onDelete(task._id);
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  return (
    <Link
      to={`/tasks/${task._id}`}
      className={`p-4 rounded-lg border-l-4 ${
        task.priority === 'urgent' ? 'border-l-purple-600 bg-purple-50' :
        task.priority === 'high' ? 'border-l-red-500 bg-red-50' :
        task.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
        'border-l-green-500 bg-green-50'
      } hover:shadow-sm hover:scale-[1.001] transition-transform duration-150 transform-gpu cursor-pointer block no-underline`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleStatusToggle();
              }}
              className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition"
              title="Toggle task status"
            >
              {task.status === 'completed' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <h4 className={`font-semibold text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h4>
          </div>

          <p className="text-gray-600 text-sm mt-2 ml-7">{truncatedDescription}</p>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 ml-7 text-sm text-gray-600">
            <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600 font-semibold' : ''}`}>
              <Calendar className="h-4 w-4" />
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue && <span className="text-red-600">⚠ Overdue</span>}
            </div>

            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default TaskCard;
