import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import taskService from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState({
    urgent: [],
    high: [],
    medium: [],
    low: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks(1, 100);
      const tasksArray = response.data || [];
      const grouped = {
        urgent: tasksArray.filter(task => task.priority === 'urgent'),
        high: tasksArray.filter(task => task.priority === 'high'),
        medium: tasksArray.filter(task => task.priority === 'medium'),
        low: tasksArray.filter(task => task.priority === 'low'),
      };
      
      setTasks(grouped);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      alert('Task status updated!');
      fetchTasks(); 
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update task status.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tasks by priority</p>
          </div>
          <Link
            to="/tasks/create"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span>New Task</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-purple-600 rounded-full mr-2"></span>
                Urgent
              </h2>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                {tasks.urgent.length}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {tasks.urgent.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No urgent tasks</p>
                </div>
              ) : (
                tasks.urgent.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                High Priority
              </h2>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                {tasks.high.length}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {tasks.high.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No high priority tasks</p>
                </div>
              ) : (
                tasks.high.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Medium Priority
              </h2>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                {tasks.medium.length}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {tasks.medium.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No medium priority tasks</p>
                </div>
              ) : (
                tasks.medium.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Low Priority
              </h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {tasks.low.length}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {tasks.low.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No low priority tasks</p>
                </div>
              ) : (
                tasks.low.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;