import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import taskService from '../services/taskService';
import { ArrowLeft } from 'lucide-react';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskService.getTaskById(id);
      const taskData = response.data || response;
      
      const formattedTask = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : '',
        assignedTo: typeof taskData.assignedTo === 'object' 
          ? taskData.assignedTo._id 
          : taskData.assignedTo
      };
      
      setTask(formattedTask);
    } catch (error) {
      console.error('Failed to load task:', error);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await taskService.updateTask(id, formData);
      navigate(`/tasks/${id}`);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Task</h1>
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            submitLabel="Update Task"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTask;