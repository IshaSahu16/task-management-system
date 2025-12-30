import api from './api';

const taskService = {
  getAllTasks: async (page = 1, limit = 10, status = '', priority = '') => {
    const params = { page, limit };
    if (status) params.status = status;
    if (priority) params.priority = priority;
    
    const response = await api.get('/tasks', { params });
    return response.data;
  },
  getMyTasks: async (page = 1, limit = 10) => {
    const response = await api.get('/tasks', {
      params: { page, limit }
    });
    return response.data;
  },
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
  updateTaskStatus: async (taskId, status) => {
    const response = await api.patch(`/tasks/${taskId}/status`, { status });
    return response.data;
  },
  assignTask: async (taskId, userId) => {
    const response = await api.patch(`/tasks/${taskId}/assign`, { assignedTo: userId });
    return response.data;
  },
};

export default taskService;