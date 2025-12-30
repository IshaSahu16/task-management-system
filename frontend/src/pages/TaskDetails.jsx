import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Edit, Trash2, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ConfirmDialog from '../components/ConfirmDialog';
import taskService from '../services/taskService';
import { formatDate, getPriorityColor, getStatusColor, isOverdue } from '../utils/helpers';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskService.getTaskById(id);
      const taskData = response.data || response;
      setTask(taskData);
    } catch (error) {
      console.error('Failed to load task:', error);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await taskService.deleteTask(id);
      setShowDeleteConfirm(false);
      navigate('/home');
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await taskService.updateTaskStatus(id, newStatus);
      alert('Status updated!');
      fetchTask();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) return <Loader />;
  if (!task) return <div>Task not found</div>;

  const overdueStatus = isOverdue(task.dueDate, task.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{task.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()} PRIORITY
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </span>
              {overdueStatus && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white">
                  OVERDUE
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold text-gray-800">{formatDate(task.dueDate)}</p>
              </div>
            </div>

            {task.assignedTo && (
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-semibold text-gray-800">{task.assignedTo.name}</p>
                  <p className="text-sm text-gray-600">{task.assignedTo.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Created By</p>
                <p className="font-semibold text-gray-800">{task.createdBy.name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {task.status !== 'completed' && (
              <button
                onClick={() => handleStatusUpdate('completed')}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Mark as Complete</span>
              </button>
            )}

            {task.status === 'completed' && (
              <button
                onClick={() => handleStatusUpdate('pending')}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                <span>Reopen Task</span>
              </button>
            )}

            <Link
              to={`/tasks/${id}/edit`}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Task</span>
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Task</span>
            </button>
          </div>
        </div>
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          title="Delete Task"
          message={`Are you sure you want to delete "${task?.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
};

export default TaskDetails;